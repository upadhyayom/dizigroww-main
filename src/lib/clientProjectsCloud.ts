// Cloud persistence layer for the client project ledger (Supabase).
// Same pattern as invoicesCloud.ts: localStorage is the synchronous working
// cache the UI reads from; these functions mirror it to Postgres in the
// background so the ledger is durable across devices/browsers.
//
// If Supabase isn't configured, every function is a safe no-op.

import { supabase } from "./supabaseClient";
import type { ClientProject } from "./clientProjects";

const TABLE = "client_projects";

// Map a ClientProject into a table row. The full object is stored in `data`
// (jsonb); the flat columns exist for indexing / querying / dashboards.
function toRow(p: ClientProject) {
  return {
    id: p.id,
    client_name: p.clientName || null,
    currency: p.currency,
    project_cost: Number(p.projectCost || 0),
    advance_received: Number(p.advanceReceived || 0),
    data: p,
    updated_at: new Date().toISOString(),
  };
}

export async function pushClientProjectToCloud(p: ClientProject): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).upsert(toRow(p), { onConflict: "id" });
  if (error) {
    console.warn("[client-projects] cloud upsert failed:", error.message);
    throw error;
  }
}

export async function deleteClientProjectFromCloud(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) {
    console.warn("[client-projects] cloud delete failed:", error.message);
    throw error;
  }
}

export async function fetchAllClientProjectsFromCloud(): Promise<ClientProject[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("[client-projects] cloud fetch failed:", error.message);
    return null;
  }
  return (data || []).map((r: { data: ClientProject }) => r.data);
}

// Push every client project currently in `local` up to the cloud. Used to
// backfill existing (pre-cloud) records the first time you connect a
// database, and automatically on every load to keep devices in sync.
export async function pushManyClientProjectsToCloud(
  local: ClientProject[]
): Promise<number> {
  if (!supabase || local.length === 0) return 0;
  const rows = local.map(toRow);
  const CHUNK = 200;
  let pushed = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const { error } = await supabase.from(TABLE).upsert(slice, { onConflict: "id" });
    if (error) {
      console.warn("[client-projects] backfill chunk failed:", error.message);
      break;
    }
    pushed += slice.length;
  }
  return pushed;
}
