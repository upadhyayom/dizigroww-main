// Client project ledger — tracks the FULL project cost you agreed with a
// client, how much advance has been received, and the remaining balance,
// auto-calculated. This is intentionally separate from individual invoices:
// a client's total engagement often spans multiple invoices over time, and
// this ledger is the one place that tracks the big-picture number ("50,000
// total, 20,000 advance received, 30,000 left") regardless of how many
// invoices you've raised against it.
//
// Storage pattern mirrors invoices.ts: localStorage is the synchronous
// working cache; clientProjectsCloud mirrors it to Supabase in the
// background when configured.

import type { Currency } from "./invoices";
import { cryptoId } from "./invoices";
import {
  pushClientProjectToCloud,
  deleteClientProjectFromCloud,
  fetchAllClientProjectsFromCloud,
  pushManyClientProjectsToCloud,
} from "./clientProjectsCloud";

export interface ClientProject {
  id: string;
  clientName: string;
  currency: Currency;
  projectCost: number;
  advanceReceived: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

const STORAGE_KEY = "dizi_client_projects_v1";

function readAll(): ClientProject[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeAll(list: ClientProject[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function listClientProjects(): ClientProject[] {
  return readAll().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

// Remaining balance — can go negative if more was received than the agreed
// project cost (overpaid); the UI is responsible for styling that case.
export function remainingFor(p: ClientProject): number {
  return Number(p.projectCost || 0) - Number(p.advanceReceived || 0);
}

export function blankClientProject(): ClientProject {
  return {
    id: cryptoId(),
    clientName: "",
    currency: "INR",
    projectCost: 0,
    advanceReceived: 0,
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function saveClientProject(p: ClientProject): ClientProject {
  const all = readAll();
  const idx = all.findIndex((x) => x.id === p.id);
  const stamped: ClientProject = { ...p, updatedAt: new Date().toISOString() };
  if (idx >= 0) all[idx] = stamped;
  else all.push(stamped);
  writeAll(all);
  // Fire-and-forget mirror to cloud — same rationale as invoices.ts.
  // Callers that need to know whether it actually reached the cloud should
  // await pushClientProjectToCloud() themselves.
  void pushClientProjectToCloud(stamped).catch(() => {});
  return stamped;
}

export function deleteClientProject(id: string) {
  const all = readAll().filter((p) => p.id !== id);
  writeAll(all);
  void deleteClientProjectFromCloud(id).catch(() => {});
}

export async function hydrateClientProjectsFromCloud(): Promise<boolean> {
  const cloud = await fetchAllClientProjectsFromCloud();
  if (!cloud) return false;
  const byId = new Map<string, ClientProject>();
  readAll().forEach((p) => byId.set(p.id, p));
  cloud.forEach((p) => byId.set(p.id, p));
  writeAll(Array.from(byId.values()));
  return true;
}

export async function backfillClientProjectsToCloud(): Promise<number> {
  return pushManyClientProjectsToCloud(readAll());
}
