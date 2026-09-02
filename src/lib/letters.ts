// Offer letter + internship letter storage + types.
// Mirrors src/lib/invoices.ts: localStorage-backed today, mirrored to
// Supabase in the background when configured (see ./lettersCloud). The page
// components only talk to the functions exported here.

import { cryptoId, todayIso, CURRENCY_SYMBOL, type Currency } from "./invoices";
import {
  pushLetterToCloud,
  deleteLetterFromCloud,
  fetchAllLettersFromCloud,
  pushManyLettersToCloud,
} from "./lettersCloud";

export type LetterKind = "offer" | "internship";
export type LetterStatus = "draft" | "sent" | "accepted" | "declined" | "expired";

export const LETTER_STATUS_LABEL: Record<LetterStatus, string> = {
  draft: "Draft",
  sent: "Sent",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
};

interface LetterBase {
  id: string;
  number: string; // OL-YYYY-0001 / IL-YYYY-0001
  issueDate: string; // ISO yyyy-mm-dd
  status: LetterStatus;

  candidateName: string;
  candidateEmail: string;
  candidateAddress?: string;

  additionalTerms?: string; // free text, appended as its own paragraph on the PDF

  createdAt: string;
  updatedAt: string;
}

export type EmploymentType = "Full-time" | "Part-time" | "Contract";
export type WorkMode = "Onsite" | "Remote" | "Hybrid";
export type PackagePeriod = "per annum" | "per month" | "lump sum";
export type StipendPeriod = "per month" | "lump sum" | "unpaid";

export interface OfferLetterData extends LetterBase {
  kind: "offer";
  position: string;
  department?: string;

  packageAmount: number;
  currency: Currency;
  packagePeriod: PackagePeriod;

  employmentType: EmploymentType;
  workMode: WorkMode;
  workLocation?: string;

  joiningDate: string; // start date
  // Fixed-term / contract roles: an explicit end date for the duration,
  // shown as "Start date — End date" instead of just a start date when set.
  // Leave blank for an open-ended (permanent) offer.
  endDate?: string;
  probationPeriod?: string; // e.g. "3 months"
  noticePeriod?: string; // e.g. "30 days"

  reportingManager?: string;
  offerValidTill?: string;
}

export interface InternshipLetterData extends LetterBase {
  kind: "internship";
  role: string;
  department?: string;

  stipendAmount: number;
  currency: Currency;
  stipendPeriod: StipendPeriod;

  mode: WorkMode;
  workLocation?: string;

  startDate: string;
  endDate: string;
  mentor?: string;
  certificateOnCompletion: boolean;
}

export type AnyLetterData = OfferLetterData | InternshipLetterData;

// --- factory: one implementation shared by both letter kinds ---------------

interface StoreConfig {
  storageKey: string;
  counterKey: string;
  prefix: string; // "OL" | "IL"
  kind: LetterKind;
}

function makeStore<T extends LetterBase>(cfg: StoreConfig) {
  function readAll(): T[] {
    try {
      const raw = localStorage.getItem(cfg.storageKey);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  function writeAll(items: T[]) {
    localStorage.setItem(cfg.storageKey, JSON.stringify(items));
  }

  function readCounter(): Record<string, number> {
    try {
      const raw = localStorage.getItem(cfg.counterKey);
      if (!raw) return {};
      return JSON.parse(raw);
    } catch {
      return {};
    }
  }

  function writeCounter(c: Record<string, number>) {
    localStorage.setItem(cfg.counterKey, JSON.stringify(c));
  }

  function nextNumber(date = new Date()): string {
    const year = date.getFullYear();
    const counter = readCounter();
    const next = (counter[String(year)] ?? 0) + 1;
    counter[String(year)] = next;
    writeCounter(counter);
    return `${cfg.prefix}-${year}-${String(next).padStart(4, "0")}`;
  }

  function peekNextNumber(date = new Date()): string {
    const year = date.getFullYear();
    const counter = readCounter();
    const next = (counter[String(year)] ?? 0) + 1;
    return `${cfg.prefix}-${year}-${String(next).padStart(4, "0")}`;
  }

  function list(): T[] {
    return readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
  }

  function get(id: string): T | undefined {
    return readAll().find((l) => l.id === id);
  }

  function save(item: T): T {
    const all = readAll();
    const idx = all.findIndex((l) => l.id === item.id);
    const stamped: T = { ...item, updatedAt: new Date().toISOString() };
    if (idx >= 0) {
      all[idx] = stamped;
    } else {
      all.push(stamped);
    }
    writeAll(all);
    // Fire-and-forget cloud mirror, same pattern as invoices.ts.
    void pushLetterToCloud(stamped as unknown as AnyLetterData).catch(() => {});
    return stamped;
  }

  function remove(id: string) {
    const all = readAll().filter((l) => l.id !== id);
    writeAll(all);
    void deleteLetterFromCloud(id).catch(() => {});
  }

  function duplicate(id: string): T | undefined {
    const src = get(id);
    if (!src) return undefined;
    const copy: T = {
      ...src,
      id: cryptoId(),
      number: nextNumber(),
      issueDate: todayIso(),
      status: "draft",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return save(copy);
  }

  async function hydrateFromCloud(): Promise<boolean> {
    const cloud = await fetchAllLettersFromCloud(cfg.kind);
    if (!cloud) return false;
    const byId = new Map<string, T>();
    readAll().forEach((l) => byId.set(l.id, l));
    (cloud as T[]).forEach((l) => byId.set(l.id, l));
    writeAll(Array.from(byId.values()));
    return true;
  }

  async function backfillToCloud(): Promise<number> {
    return pushManyLettersToCloud(readAll() as unknown as AnyLetterData[]);
  }

  function exportJson(): string {
    return JSON.stringify(
      { items: readAll(), counter: readCounter(), exportedAt: new Date().toISOString() },
      null,
      2
    );
  }

  function importJson(json: string) {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed?.items)) writeAll(parsed.items);
    if (parsed?.counter && typeof parsed.counter === "object") writeCounter(parsed.counter);
  }

  return {
    list,
    get,
    save,
    remove,
    duplicate,
    nextNumber,
    peekNextNumber,
    hydrateFromCloud,
    backfillToCloud,
    exportJson,
    importJson,
  };
}

export const offerLetterStore = makeStore<OfferLetterData>({
  storageKey: "dizi_offer_letters_v1",
  counterKey: "dizi_offer_letter_counter_v1",
  prefix: "OL",
  kind: "offer",
});

export const internshipLetterStore = makeStore<InternshipLetterData>({
  storageKey: "dizi_internship_letters_v1",
  counterKey: "dizi_internship_letter_counter_v1",
  prefix: "IL",
  kind: "internship",
});

// --- shared blank factories --------------------------------------------

export function blankOfferLetter(brand: {
  name: string;
  address: string;
  email: string;
  phone: string;
}): OfferLetterData {
  return {
    kind: "offer",
    id: cryptoId(),
    number: offerLetterStore.peekNextNumber(),
    issueDate: todayIso(),
    status: "draft",

    candidateName: "",
    candidateEmail: "",
    candidateAddress: "",

    position: "",
    department: "",

    packageAmount: 0,
    currency: "INR",
    packagePeriod: "per annum",

    employmentType: "Full-time",
    workMode: "Onsite",
    workLocation: brand.address,

    joiningDate: todayIso(),
    endDate: "",
    probationPeriod: "",
    noticePeriod: "",
    reportingManager: "",
    offerValidTill: "",

    additionalTerms: "",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function blankInternshipLetter(brand: {
  name: string;
  address: string;
  email: string;
  phone: string;
}): InternshipLetterData {
  return {
    kind: "internship",
    id: cryptoId(),
    number: internshipLetterStore.peekNextNumber(),
    issueDate: todayIso(),
    status: "draft",

    candidateName: "",
    candidateEmail: "",
    candidateAddress: "",

    role: "",
    department: "",

    stipendAmount: 0,
    currency: "INR",
    stipendPeriod: "per month",

    mode: "Onsite",
    workLocation: brand.address,

    startDate: todayIso(),
    endDate: todayIso(),
    mentor: "",
    certificateOnCompletion: true,

    additionalTerms: "",

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// --- formatting helpers ------------------------------------------------

export function formatPackage(amount: number, currency: Currency, period: PackagePeriod): string {
  const symbol = CURRENCY_SYMBOL[currency] ?? "";
  const n = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${period}`;
}

export function formatStipend(amount: number, currency: Currency, period: StipendPeriod): string {
  if (period === "unpaid") return "Unpaid";
  const symbol = CURRENCY_SYMBOL[currency] ?? "";
  const n = Number.isFinite(amount) ? amount : 0;
  return `${symbol}${n.toLocaleString(undefined, { maximumFractionDigits: 0 })} ${period}`;
}

// "2026-09-02" -> "2 September 2026" — used on both letter PDFs.
export function formatDateLong(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
