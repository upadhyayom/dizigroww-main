// Cloud persistence layer for invoices (Supabase).
// This mirrors every localStorage write to a Postgres table so invoices are
// durable across devices/browsers. localStorage stays the synchronous working
// cache the UI reads from; these functions run async in the background.
//
// If Supabase isn't configured, every function is a safe no-op.

import { supabase } from "./supabaseClient";
import type { Invoice } from "./invoices";

const TABLE = "invoices";

// Map an Invoice into a table row. The full object is stored in `data` (jsonb);
// the flat columns exist for indexing / querying / dashboards.
function toRow(inv: Invoice) {
  return {
    id: inv.id,
    number: inv.number,
    status: inv.status,
    issue_date: inv.issueDate || null,
    to_name: inv.toName || null,
    to_company: inv.toCompany || null,
    currency: inv.currency,
    data: inv,
    updated_at: new Date().toISOString(),
  };
}

export async function pushInvoiceToCloud(inv: Invoice): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).upsert(toRow(inv), { onConflict: "id" });
  if (error) console.warn("[invoices] cloud upsert failed:", error.message);
}

export async function deleteInvoiceFromCloud(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) console.warn("[invoices] cloud delete failed:", error.message);
}

export async function fetchAllFromCloud(): Promise<Invoice[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("[invoices] cloud fetch failed:", error.message);
    return null;
  }
  return (data || []).map((r: { data: Invoice }) => r.data);
}

// Push every invoice currently in `local` up to the cloud. Used to backfill
// existing (pre-cloud) invoices the first time you connect a database.
export async function pushManyToCloud(local: Invoice[]): Promise<number> {
  if (!supabase || local.length === 0) return 0;
  const rows = local.map(toRow);
  // chunk to stay well under payload limits
  const CHUNK = 200;
  let pushed = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const { error } = await supabase.from(TABLE).upsert(slice, { onConflict: "id" });
    if (error) {
      console.warn("[invoices] backfill chunk failed:", error.message);
      break;
    }
    pushed += slice.length;
  }
  return pushed;
}
