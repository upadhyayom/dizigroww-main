// Invoice storage + types + recurring scheduler
// Backed by localStorage today. To migrate to Supabase / a backend later,
// keep this module's exported function signatures the same and swap the
// internals — the page component only talks to these functions.

import {
  pushInvoiceToCloud,
  deleteInvoiceFromCloud,
  fetchAllFromCloud,
  pushManyToCloud,
} from "./invoicesCloud";

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
  hsnSac: string; // HSN/SAC code (e.g. 998314 for IT/web services)
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

export type InvoiceStatus = "due" | "paid" | "overdue";

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
  toGstin: string;

  // GST: optional override; if blank, derived from client GSTIN state code
  placeOfSupply?: string;

  items: InvoiceLineItem[];

  // Manually-tracked balance still owed on this invoice. Undefined = treat
  // as "nothing paid yet" (falls back to the computed total via
  // balanceDue()). Lets you record partial payments without a separate
  // ledger — just edit this number down as payments come in.
  balanceRemaining?: number;

  // Full agreed project cost and advance received so far, tracked directly
  // on the invoice (not a separate ledger). Useful when this invoice is
  // just one installment of a bigger project — enter the full cost once,
  // update the advance as payments come in, and the remaining balance is
  // always auto-calculated from the two, never stored/typed directly.
  projectCost?: number;
  advanceReceived?: number;

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

// Make sure the counter for `year` is at least `floor`. Useful when starting
// invoicing partway through the year (e.g. seeding next invoice to be #273).
// Idempotent — safe to call on every page mount. Never rolls the counter back.
export function ensureCounterFloor(year: number, floor: number) {
  const counter = readCounter();
  const current = counter[String(year)] ?? 0;
  if (current < floor) {
    counter[String(year)] = floor;
    writeCounter(counter);
  }
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
  // Mirror to cloud (no-op if Supabase isn't configured). Fire-and-forget so
  // the synchronous UI flow isn't blocked on the network — failures here are
  // silent by design; callers that need to know whether the cloud push
  // actually succeeded (e.g. to warn the user) should await
  // pushInvoiceToCloud() themselves, imported from ./invoicesCloud.
  void pushInvoiceToCloud(stamped).catch(() => {});
  return stamped;
}

export function deleteInvoice(id: string) {
  const all = readAll().filter((i) => i.id !== id);
  writeAll(all);
  void deleteInvoiceFromCloud(id).catch(() => {});
}

// --- cloud sync -----------------------------------------------------------
// Pull all invoices from the backend and merge them into the local cache
// (cloud wins on conflicts). Returns true if the cloud was reachable.
export async function hydrateFromCloud(): Promise<boolean> {
  const cloud = await fetchAllFromCloud();
  if (!cloud) return false;
  const byId = new Map<string, Invoice>();
  readAll().forEach((i) => byId.set(i.id, i));
  cloud.forEach((i) => byId.set(i.id, i));
  writeAll(Array.from(byId.values()));
  return true;
}

// Push every locally-stored invoice up to the backend. Use this once to
// backfill invoices that were created before the database was connected.
export async function backfillToCloud(): Promise<number> {
  return pushManyToCloud(readAll());
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

// Balance still owed. Falls back to the full computed total when
// balanceRemaining was never set (i.e. nothing recorded as paid yet).
export function balanceDue(invoice: Invoice): number {
  const total = computeTotals(invoice).total;
  return typeof invoice.balanceRemaining === "number"
    ? invoice.balanceRemaining
    : total;
}

// Remaining on the full project cost (projectCost - advanceReceived). Purely
// derived — never stored — so it can never drift out of sync with the two
// numbers that define it. Can go negative if more advance came in than the
// agreed cost (overpaid); the UI is responsible for styling that.
export function projectRemaining(invoice: Invoice): number {
  return Number(invoice.projectCost || 0) - Number(invoice.advanceReceived || 0);
}

export function formatMoney(amount: number, currency: Currency): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? "";
  const n = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

// --- GST helpers ---------------------------------------------------------

// Indian GST state codes — first 2 digits of every GSTIN
export const INDIAN_STATE_CODES: Record<string, string> = {
  "01": "Jammu and Kashmir",
  "02": "Himachal Pradesh",
  "03": "Punjab",
  "04": "Chandigarh",
  "05": "Uttarakhand",
  "06": "Haryana",
  "07": "Delhi",
  "08": "Rajasthan",
  "09": "Uttar Pradesh",
  "10": "Bihar",
  "11": "Sikkim",
  "12": "Arunachal Pradesh",
  "13": "Nagaland",
  "14": "Manipur",
  "15": "Mizoram",
  "16": "Tripura",
  "17": "Meghalaya",
  "18": "Assam",
  "19": "West Bengal",
  "20": "Jharkhand",
  "21": "Odisha",
  "22": "Chhattisgarh",
  "23": "Madhya Pradesh",
  "24": "Gujarat",
  "26": "Dadra and Nagar Haveli and Daman and Diu",
  "27": "Maharashtra",
  "28": "Andhra Pradesh",
  "29": "Karnataka",
  "30": "Goa",
  "31": "Lakshadweep",
  "32": "Kerala",
  "33": "Tamil Nadu",
  "34": "Puducherry",
  "35": "Andaman and Nicobar Islands",
  "36": "Telangana",
  "37": "Andhra Pradesh (New)",
  "38": "Ladakh",
  "97": "Other Territory",
  "99": "Centre Jurisdiction",
};

export function stateFromGstin(gstin?: string): { code: string; name: string } | null {
  if (!gstin || gstin.length < 2) return null;
  const code = gstin.slice(0, 2);
  const name = INDIAN_STATE_CODES[code];
  return name ? { code, name } : null;
}

export interface TaxBreakdown {
  mode: "cgst_sgst" | "igst" | "none";
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
}

// Decide whether to split into CGST+SGST (intra-state) or IGST (inter-state)
// based on the two GSTIN state codes. If client GSTIN absent → treat as IGST
// (safest default for B2C / unregistered).
export function computeTaxBreakdown(invoice: Invoice): TaxBreakdown {
  const taxedBase =
    invoice.items.reduce(
      (s, i) => s + Number(i.quantity || 0) * Number(i.unitPrice || 0),
      0
    ) * (1 - Number(invoice.discountPercent || 0) / 100);
  const ratePct = Number(invoice.taxPercent || 0);
  const totalTax = taxedBase * (ratePct / 100);
  if (ratePct <= 0) {
    return { mode: "none", cgst: 0, sgst: 0, igst: 0, total: 0 };
  }
  const fromState = stateFromGstin(invoice.fromTaxId);
  const toState = stateFromGstin(invoice.toGstin);
  // intra-state: same state code on both GSTINs
  if (fromState && toState && fromState.code === toState.code) {
    return {
      mode: "cgst_sgst",
      cgst: totalTax / 2,
      sgst: totalTax / 2,
      igst: 0,
      total: totalTax,
    };
  }
  // default: IGST
  return { mode: "igst", cgst: 0, sgst: 0, igst: totalTax, total: totalTax };
}

// Indian numbering system (lakh, crore) → words. Up to ~99,99,99,999.99.
export function amountInIndianWords(amount: number): string {
  if (!Number.isFinite(amount) || amount < 0) return "";
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen",
  ];
  const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

  const below1000 = (n: number): string => {
    let r = "";
    if (n >= 100) {
      r += ones[Math.floor(n / 100)] + " hundred ";
      n %= 100;
    }
    if (n >= 20) {
      r += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n > 0) r += ones[n] + " ";
    return r.trim();
  };

  const rupees = Math.floor(amount);
  const paise = Math.round((amount - rupees) * 100);

  if (rupees === 0 && paise === 0) return "Zero rupees only";

  let words = "";
  const crore = Math.floor(rupees / 10000000);
  const lakh = Math.floor((rupees % 10000000) / 100000);
  const thousand = Math.floor((rupees % 100000) / 1000);
  const remainder = rupees % 1000;

  if (crore > 0) words += below1000(crore) + " crore ";
  if (lakh > 0) words += below1000(lakh) + " lakh ";
  if (thousand > 0) words += below1000(thousand) + " thousand ";
  if (remainder > 0) words += below1000(remainder) + " ";

  words = words.trim().replace(/\s+/g, " ");
  if (!words) words = "zero";
  let result = words.charAt(0).toUpperCase() + words.slice(1) + " rupees";
  if (paise > 0) {
    const p = below1000(paise);
    result += " and " + p.charAt(0).toUpperCase() + p.slice(1) + " paise";
  }
  result += " only";
  return result;
}

// --- migration -----------------------------------------------------------
// Translates older saved invoices (with status draft/sent/cancelled, no
// hsnSac on items) into the current shape. Safe to call repeatedly.
export function migrateInvoices() {
  const all = readAll();
  let changed = false;
  const fixed = all.map((inv) => {
    const next: Invoice = { ...inv };
    // status migration
    const oldStatus = (inv as unknown as { status: string }).status;
    if (oldStatus === "draft" || oldStatus === "sent") {
      next.status = "due";
      changed = true;
    } else if (oldStatus === "cancelled") {
      next.status = "due";
      changed = true;
    }
    // line items hsnSac default
    next.items = (inv.items || []).map((it) => {
      if (typeof (it as InvoiceLineItem).hsnSac === "string") return it;
      changed = true;
      return { ...it, hsnSac: "998314" };
    });
    // balanceRemaining backfill — older invoices predate this field.
    // Paid invoices start at 0 owed; everything else starts owing the full
    // total until you record a payment against it.
    if (typeof next.balanceRemaining !== "number") {
      next.balanceRemaining =
        next.status === "paid" ? 0 : computeTotals(next).total;
      changed = true;
    }
    return next;
  });
  if (changed) writeAll(fixed);
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
