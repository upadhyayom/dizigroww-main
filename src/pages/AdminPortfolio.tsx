import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2, Save, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminNav } from "@/components/admin/AdminNav";
import { cloudEnabled } from "@/lib/supabaseClient";
import {
  DEFAULT_PROJECTS,
  screenshotUrl,
  type PortfolioProject,
  type ProjectType,
} from "@/data/portfolio";
import {
  fetchPortfolioFromCloud,
  savePortfolioProject,
  savePortfolioMany,
  deletePortfolioProject,
} from "@/lib/portfolioCloud";

const TYPES: ProjectType[] = ["E-commerce", "Landing Pages", "Corporate"];

const blank = (): PortfolioProject => ({
  id: crypto.randomUUID(),
  title: "",
  type: "E-commerce",
  stack: "Shopify",
  result: "",
  image: "",
  link: "https://",
});

const errMsg = (e: unknown) => (e as { message?: string })?.message || "unknown error";

export default function AdminPortfolio() {
  return (
    <AdminAuthGate title="Portfolio">
      <Inner />
    </AdminAuthGate>
  );
}

function Inner() {
  const [items, setItems] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const rows = await fetchPortfolioFromCloud();
      setItems(rows || []);
    } catch (e) {
      toast.error(`Could not load portfolio: ${errMsg(e)} (did you run supabase/portfolio_schema.sql?)`);
    }
    setLoading(false);
  };

  useEffect(() => {
    document.title = "Portfolio · DiziGroww";
    if (cloudEnabled()) load();
    else setLoading(false);
  }, []);

  const patch = (id: string, p: Partial<PortfolioProject>) =>
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));

  const save = async (p: PortfolioProject) => {
    if (!p.title.trim() || !p.link.trim()) {
      toast.error("Title and website URL are required");
      return;
    }
    // Auto-generate the screenshot from the URL if no image was provided.
    const toSave = { ...p, image: p.image.trim() || screenshotUrl(p.link.trim()) };
    setSavingId(p.id);
    try {
      await savePortfolioProject(toSave, items.findIndex((x) => x.id === p.id));
      patch(p.id, { image: toSave.image });
      toast.success(`${p.title} saved — live on the site`);
    } catch (e) {
      toast.error(`Save failed: ${errMsg(e)}`);
    }
    setSavingId(null);
  };

  const remove = async (p: PortfolioProject) => {
    if (!window.confirm(`Remove ${p.title || "this project"} from the portfolio?`)) return;
    try {
      await deletePortfolioProject(p.id);
      setItems((prev) => prev.filter((x) => x.id !== p.id));
      toast.success("Removed");
    } catch (e) {
      toast.error(`Delete failed: ${errMsg(e)}`);
    }
  };

  const seed = async () => {
    try {
      await savePortfolioMany(DEFAULT_PROJECTS);
      toast.success("Current projects loaded into the database");
      load();
    } catch (e) {
      toast.error(`Failed: ${errMsg(e)}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminNav />
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Portfolio projects</h1>
            <p className="text-xs text-slate-500">
              Changes go live on /portfolio instantly. Leave Image blank to auto-generate a screenshot.
            </p>
          </div>
          {items.length === 0 && (
            <Button variant="outline" size="sm" onClick={seed}>
              <Download className="w-4 h-4 mr-1" /> Load current projects
            </Button>
          )}
          <Button size="sm" onClick={() => setItems((p) => [blank(), ...p])}>
            <Plus className="w-4 h-4 mr-1" /> Add project
          </Button>
        </div>

        {!cloudEnabled() && (
          <p className="text-sm text-red-600">
            Supabase isn't configured (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY) — portfolio admin needs it.
          </p>
        )}
        {loading && <p className="text-sm text-slate-500">Loading…</p>}
        {!loading && cloudEnabled() && items.length === 0 && (
          <p className="text-sm text-slate-500">
            Database is empty, so the site shows the built-in list. Click "Load current projects" to start editing them.
          </p>
        )}

        {items.map((p) => (
          <Card key={p.id}>
            <CardContent className="p-4 grid md:grid-cols-2 gap-3">
              <div>
                <Label>Title</Label>
                <Input value={p.title} onChange={(e) => patch(p.id, { title: e.target.value })} />
              </div>
              <div>
                <Label>Website URL</Label>
                <Input value={p.link} onChange={(e) => patch(p.id, { link: e.target.value })} />
              </div>
              <div>
                <Label>Type</Label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm"
                  value={p.type}
                  onChange={(e) => patch(p.id, { type: e.target.value as ProjectType })}
                >
                  {TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Stack</Label>
                <Input value={p.stack} onChange={(e) => patch(p.id, { stack: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>Result line</Label>
                <Input value={p.result} onChange={(e) => patch(p.id, { result: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>Image URL (optional)</Label>
                <Input value={p.image} onChange={(e) => patch(p.id, { image: e.target.value })} />
              </div>
              <div className="md:col-span-2 flex gap-2 justify-end">
                <Button variant="outline" size="sm" onClick={() => remove(p)}>
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
                <Button size="sm" disabled={savingId === p.id} onClick={() => save(p)}>
                  <Save className="w-4 h-4 mr-1" /> {savingId === p.id ? "Saving…" : "Save"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
