// Portfolio projects stored in Supabase so they can be managed from the admin
// panel (/portfolio-admin). Public site reads; only authenticated admins write.

import { supabase } from "./supabaseClient";
import type { PortfolioProject } from "@/data/portfolio";

const TABLE = "portfolio_projects";

function toRow(p: PortfolioProject, i: number) {
  return {
    id: p.id,
    title: p.title,
    type: p.type,
    stack: p.stack,
    result: p.result,
    image: p.image,
    link: p.link,
    sort_order: p.sortOrder ?? i,
    updated_at: new Date().toISOString(),
  };
}

export async function fetchPortfolioFromCloud(): Promise<PortfolioProject[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data || []).map((r: any) => ({
    id: r.id,
    title: r.title,
    type: r.type,
    stack: r.stack || "",
    result: r.result || "",
    image: r.image || "",
    link: r.link || "",
    sortOrder: r.sort_order,
  }));
}

export async function savePortfolioProject(p: PortfolioProject, index = 0): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from(TABLE).upsert(toRow(p, index), { onConflict: "id" });
  if (error) throw error;
}

export async function savePortfolioMany(list: PortfolioProject[]): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase
    .from(TABLE)
    .upsert(list.map(toRow), { onConflict: "id" });
  if (error) throw error;
}

export async function deletePortfolioProject(id: string): Promise<void> {
  if (!supabase) throw new Error("Supabase not configured");
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
