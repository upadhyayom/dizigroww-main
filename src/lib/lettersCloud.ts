// Cloud persistence layer for offer letters + internship letters (Supabase).
// Mirrors src/lib/invoicesCloud.ts. Both letter kinds live in one `letters`
// table distinguished by a `kind` column so both share one file. If Supabase
// isn't configured, every function is a safe no-op.

import { supabase } from "./supabaseClient";
import type { AnyLetterData, LetterKind } from "./letters";

const TABLE = "letters";

function toRow(letter: AnyLetterData) {
  return {
    id: letter.id,
    kind: letter.kind,
    number: letter.number,
    status: letter.status,
    issue_date: letter.issueDate || null,
    candidate_name: letter.candidateName || null,
    data: letter,
    updated_at: new Date().toISOString(),
  };
}

export async function pushLetterToCloud(letter: AnyLetterData): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).upsert(toRow(letter), { onConflict: "id" });
  if (error) {
    console.warn("[letters] cloud upsert failed:", error.message);
    throw error;
  }
}

export async function deleteLetterFromCloud(id: string): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) {
    console.warn("[letters] cloud delete failed:", error.message);
    throw error;
  }
}

export async function fetchAllLettersFromCloud(kind: LetterKind): Promise<AnyLetterData[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("data")
    .eq("kind", kind)
    .order("created_at", { ascending: false });
  if (error) {
    console.warn("[letters] cloud fetch failed:", error.message);
    return null;
  }
  return (data || []).map((r: { data: AnyLetterData }) => r.data);
}

// Push every letter currently in `local` up to the cloud. Used to backfill
// existing (pre-cloud) letters the first time you connect a database.
export async function pushManyLettersToCloud(local: AnyLetterData[]): Promise<number> {
  if (!supabase || local.length === 0) return 0;
  const rows = local.map(toRow);
  const CHUNK = 200;
  let pushed = 0;
  for (let i = 0; i < rows.length; i += CHUNK) {
    const slice = rows.slice(i, i + CHUNK);
    const { error } = await supabase.from(TABLE).upsert(slice, { onConflict: "id" });
    if (error) {
      console.warn("[letters] backfill chunk failed:", error.message);
      break;
    }
    pushed += slice.length;
  }
  return pushed;
}
