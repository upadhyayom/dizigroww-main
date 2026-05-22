// Invoice storage + types + recurring scheduler
// Backed by localStorage today. To migrate to Supabase / a backend later,
// keep this module's exported function signatures the same and swap the
// internals — the page component only talks to these functions.

export type Currency = "INR" | "USD" | "AED" | "SGD" | "PHP" | "EUR" | "GBP";

export const CURRENCY_SYMBOL: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  AED: "د.إ",
  SGD: "S$",
  PHP: "₱",
  EUR: "€",
  GBP: "£",
};

export type RecurrenceInterval = "none" | "weekly" | "monthly" | "quarterly" | "yearly";

export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface InvoiceRecurrence {
  interval: RecurrenceInterval;
  // ISO date string for the next time we should auto-generate the next invoice
  // for this recurring series. null = not active / paused.
  nextRunAt: string | null;
  // The id of the original "template" invoice for this series. When the
  // scheduler creates a child invoice it sets `parentId` to this value.
  parentId?: string;
}

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue" | "cancelled";

export interface Invoice {
  id: string;                    // uuid-ish
  number: string;                // INV-YYYY-0001
  issueDate: string;             // ISO yyyy-mm-dd
  dueDate: string;               // ISO yyyy-mm-dd
  status: InvoiceStatus;
  currency: Currency;
  taxPercent: number;            // e.g. 18 for 18% GST
  discountPercent: number;       // 0-100
  notes: string;

  // Seller (your company)
  fromName: string;
  fromAddress: string;
  fromEmail: string;
  fromPhone: string;
  fromTaxId: string;

  // Client
  toName: string;
  toCompany: string;
  toAddress: string;
  toEmail: string;
  toPhone: string;

  items: InvoiceLineItem[];

  recurrence: InvoiceRecurrence;

  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "dizi_invoices_v1";
const COUNTER_KEY = "dizi_invoice_counter_v1"; // map of year -> last number used

// --- low-level storage ----------------------------------------------------

function readAll(): Invoice[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(invoices: Invoice[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
}

// --- numbering ------------------------------------------------------------

function readCounter(): Record<string, number> {
  try {
    const raw = localStorage.getItem(COUNTER_KEY);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeCounter(c: Record<string, number>) {
  localStorage.setItem(COUNTER_KEY, JSON.stringify(c));
}

export function nextInvoiceNumber(date = new Date()): string {
  const year = date.getFullYear();
  const counter = readCounter();
  const next = (counter[String(year)] ?? 0) + 1;
  counter[String(year)] = next;
  writeCounter(counter);
  return `INV-${year}-${String(next).padStart(4, "0")}`;
}

// Peek without incrementing
export function peekNextInvoiceNumber(date = new Date()): string {
  const year = date.getFullYear();
  const counter = readCounter();
  const next = (counter[String(year)] ?? 0) + 1;
  return `INV-${year}-${String(next).padStart(4, "0")}`;
}

// --- CRUD -----------------------------------------------------------------

export function listInvoices(): Invoice[] {
  return readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getInvoice(id: string): Invoice | undefined {
  return readAll().find((i) => i.id === id);
}

export function saveInvoice(invoice: Invoice): Invoice {
  const all = readAll();
  const idx = all.findIndex((i) => i.id === invoice.id);
  const stamped: Invoice = { ...invoice, updatedAt: new Date().toISOString() };
  if (idx >= 0) {
    all[idx] = stamped;
  } else {
    all.push(stamped);
  }
  writeAll(all);
  return stamped;
}

export function deleteInvoice(id: string) {
  const all = readAll().filter((i) => i.id !== id);
  writeAll(all);
}

export function duplicateInvoice(id: string): Invoice | undefined {
  const src = getInvoice(id);
  if (!src) return undefined;
  const copy: Invoice = {
    ...src,
    id: cryptoId(),
    number: nextInvoiceNumber(),
    issueDate: todayIso(),
    dueDate: addDaysIso(todayIso(), 14),
    status: "draft",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    recurrence: { interval: "none", nextRunAt: null },
  };
  return saveInvoice(copy);
}

// --- helpers --------------------------------------------------------------

export function cryptoId(): string {
  // crypto.randomUUID exists in all modern browsers we care about
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function todayIso(): string {
  const d = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addDaysIso(iso: string, days: number): string {
  const d = new Date(iso + "T00:00:00");
  d.setDate(d.getDate() + days);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function addIntervalIso(iso: string, interval: RecurrenceInterval): string {
  const d = new Date(iso + "T00:00:00");
  switch (interval) {
    case "weekly":
      d.setDate(d.getDate() + 7);
      break;
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      break;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      break;
    case "yearly":
      d.setFullYear(d.getFullYear() + 1);
      break;
    default:
      return iso;
  }
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// --- totals ---------------------------------------------------------------

export function computeTotals(invoice: Invoice) {
  const subtotal = invoice.items.reduce(
    (sum, it) => sum + Number(it.quantity || 0) * Number(it.unitPrice || 0),
    0
  );
  const discount = subtotal * (Number(invoice.discountPercent || 0) / 100);
  const taxed = subtotal - discount;
  const tax = taxed * (Number(invoice.taxPercent || 0) / 100);
  const total = taxed + tax;
  return { subtotal, discount, tax, total };
}

export function formatMoney(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? "";
  const n = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// --- recurring scheduler --------------------------------------------------
// Runs on page load. For every invoice with an active recurrence whose
// nextRunAt has passed, it stamps out a fresh child invoice and advances
// the parent's nextRunAt. Returns the list of newly created invoices.

export function runRecurringScheduler(): Invoice[] {
  const all = readAll();
  const created: Invoice[] = [];
  const now = new Date();

  all.forEach((parent) => {
    if (!parent.recurrence || parent.recurrence.interval === "none") return;
    if (!parent.recurrence.nextRunAt) return;
    // Loop in case multiple intervals have passed since last open
    while (
      parent.recurrence.nextRunAt &&
      new Date(parent.recurrence.nextRunAt + "T00:00:00") <= now &&
      parent.recurrence.interval !== "none"
    ) {
      const issue = parent.recurrence.nextRunAt;
      const child: Invoice = {
        ...parent,
        id: cryptoId(),
        number: nextInvoiceNumber(new Date(issue + "T00:00:00")),
        issueDate: issue,
        dueDate: addDaysIso(issue, 14),
        status: "sent",
        notes:
          (parent.notes ? parent.notes + "\n" : "") +
          `Auto-generated from recurring series ${parent.number}.`,
        recurrence: {
          interval: "none",
          nextRunAt: null,
          parentId: parent.id,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      all.push(child);
      created.push(child);
      parent.recurrence.nextRunAt = addIntervalIso(issue, parent.recurrence.interval);
    }
  });

  if (created.length) writeAll(all);
  return created;
}

// --- export / import (backup) --------------------------------------------

export function exportAllJson(): string {
  return JSON.stringify(
    { invoices: readAll(), counter: readCounter(), exportedAt: new Date().toISOString() },
    null,
    2
  );
}

export function importAllJson(json: string) {
  const parsed = JSON.parse(json);
  if (Array.isArray(parsed?.invoices)) writeAll(parsed.invoices);
  if (parsed?.counter && typeof parsed.counter === "object") writeCounter(parsed.counter);
}
