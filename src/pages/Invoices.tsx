import React, { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Download,
  Eye,
  FilePlus2,
  Pencil,
  Plus,
  RefreshCw,
  Repeat,
  Search,
  Trash2,
  Upload,
  Lock,
  Copy,
} from "lucide-react";

import {
  CURRENCY_SYMBOL,
  Invoice,
  InvoiceLineItem,
  InvoiceRecurrence,
  RecurrenceInterval,
  Currency,
  InvoiceStatus,
  addDaysIso,
  amountInIndianWords,
  computeTaxBreakdown,
  computeTotals,
  cryptoId,
  deleteInvoice,
  duplicateInvoice,
  ensureCounterFloor,
  exportAllJson,
  formatMoney,
  importAllJson,
  listInvoices,
  hydrateFromCloud,
  backfillToCloud,
  migrateInvoices,
  nextInvoiceNumber,
  peekNextInvoiceNumber,
  runRecurringScheduler,
  saveInvoice,
  stateFromGstin,
  todayIso,
} from "@/lib/invoices";
import { cloudEnabled } from "@/lib/supabaseClient";

// ----------------------------------------------------------------------------
// Brand defaults (DiziGroww). Change here once if you rebrand.
// ----------------------------------------------------------------------------
const BRAND = {
  name: "DiziGroww",
  email: "info@dizigroww.in",
  phone: "+91 94500 10826",
  address: "Plot 19, KP, Greater Noida, Uttar Pradesh, India",
  taxId: "09AMVPU5948E1Z4", // DiziGroww GSTIN
  website: "dizigroww.in",
  logo: "/logo.png",
  // Payment block — shown on the PDF only if at least one field is non-empty.
  // Fill these in when you have the values.
  bank: {
    accountName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branch: "",
    upiId: "",
  },
  signatoryLabel: "For DiziGroww",
  signatureImage: "/signature.png", // transparent PNG dropped in /public/
};

// Seed: the very next invoice number for the current year. Set once so the
// counter floor is bumped on app boot without rolling back any later numbers.
const NEXT_NUMBER_SEED = { year: 2026, nextNumber: 273 };

// Password gate. Set VITE_INVOICE_PASSWORD in .env to override.
const INVOICE_PASSWORD =
  (import.meta as any).env?.VITE_INVOICE_PASSWORD || "dizi-admin";

const PASS_STORAGE_KEY = "dizi_invoice_auth_v1";

// ----------------------------------------------------------------------------
// Preset services — quick-add common line items instead of typing them.
// Edit / add rows here to manage your standard offerings.
// ----------------------------------------------------------------------------
const SERVICE_PRESETS: { label: string; item: Omit<InvoiceLineItem, "id"> }[] = [
  {
    label: "Meta Ads Campaign Management — ₹10,000",
    item: { description: "Meta Ads Campaign Management", hsnSac: "998314", quantity: 1, unitPrice: 10000 },
  },
  {
    label: "Website Maintenance & Management — ₹5,000",
    item: { description: "Website Maintenance & Management", hsnSac: "998314", quantity: 1, unitPrice: 5000 },
  },
  {
    label: "Meta Ads Creative Package — ₹5,000",
    item: { description: "Meta Ads Creative Package", hsnSac: "998314", quantity: 1, unitPrice: 5000 },
  },
];

// ----------------------------------------------------------------------------
// Empty invoice factory
// ----------------------------------------------------------------------------
function blankInvoice(): Invoice {
  return {
    id: cryptoId(),
    number: peekNextInvoiceNumber(),
    issueDate: todayIso(),
    dueDate: addDaysIso(todayIso(), 14),
    status: "due",
    currency: "INR",
    taxPercent: 18,
    discountPercent: 0,
    notes: "Thank you for your business. Please remit payment within the due date.",

    fromName: BRAND.name,
    fromAddress: BRAND.address,
    fromEmail: BRAND.email,
    fromPhone: BRAND.phone,
    fromTaxId: BRAND.taxId,

    toName: "",
    toCompany: "",
    toAddress: "",
    toEmail: "",
    toPhone: "",
    toGstin: "",

    placeOfSupply: "",

    items: [
      { id: cryptoId(), description: "", hsnSac: "998314", quantity: 1, unitPrice: 0 },
    ],

    recurrence: { interval: "none", nextRunAt: null },

    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

// ============================================================================
// Page
// ============================================================================
export default function Invoices() {
  const [authed, setAuthed] = useState<boolean>(
    typeof window !== "undefined" &&
      localStorage.getItem(PASS_STORAGE_KEY) === "yes"
  );

  if (!authed) return <PasswordGate onPass={() => setAuthed(true)} />;
  return <InvoiceApp />;
}

// ----------------------------------------------------------------------------
// Password gate
// ----------------------------------------------------------------------------
function PasswordGate({ onPass }: { onPass: () => void }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    document.title = "Invoices · DiziGroww";
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === INVOICE_PASSWORD) {
      localStorage.setItem(PASS_STORAGE_KEY, "yes");
      onPass();
    } else {
      setErr("Wrong password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
            <Lock className="w-5 h-5 text-slate-600" />
          </div>
          <CardTitle>Invoice Admin</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-3">
            <Label htmlFor="pw">Password</Label>
            <Input
              id="pw"
              type="password"
              autoFocus
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="Enter password"
            />
            {err && <p className="text-sm text-red-600">{err}</p>}
            <Button type="submit" className="w-full">Unlock</Button>
            <p className="text-xs text-slate-500 text-center">
              Default password is set in code. Override with VITE_INVOICE_PASSWORD.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// ============================================================================
// Main app
// ============================================================================
function InvoiceApp() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [previewing, setPreviewing] = useState<Invoice | null>(null);

  // Load + run recurring scheduler on mount
  useEffect(() => {
    document.title = "Invoices · DiziGroww";
    // One-time migration of older invoice records (status names, hsnSac field).
    migrateInvoices();
    // Seed counter floor so the next invoice is at least NEXT_NUMBER_SEED.
    ensureCounterFloor(NEXT_NUMBER_SEED.year, NEXT_NUMBER_SEED.nextNumber - 1);
    const created = runRecurringScheduler();
    setInvoices(listInvoices());
    if (created.length) {
      toast.success(
        `Auto-generated ${created.length} recurring invoice${created.length > 1 ? "s" : ""}`
      );
    }
    // Pull any invoices stored in the cloud (other devices) and merge them in.
    hydrateFromCloud()
      .then((ok) => {
        if (ok) setInvoices(listInvoices());
      })
      .catch(() => {
        /* offline / not configured — stay on local cache */
      });
  }, []);

  const refresh = () => setInvoices(listInvoices());

  const handleBackfill = async () => {
    if (!cloudEnabled()) {
      toast.error("Cloud database not connected — add your Supabase keys and redeploy");
      return;
    }
    const localCount = listInvoices().length;
    if (localCount === 0) {
      toast("No invoices in this browser to sync");
      return;
    }
    try {
      const n = await backfillToCloud();
      toast.success(`Synced ${n} invoice${n > 1 ? "s" : ""} to the cloud database`);
    } catch {
      toast.error("Cloud sync failed — check the table exists and RLS policy is set");
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return invoices.filter((inv) => {
      if (statusFilter !== "all" && inv.status !== statusFilter) return false;
      if (!q) return true;
      return (
        inv.number.toLowerCase().includes(q) ||
        inv.toName.toLowerCase().includes(q) ||
        inv.toCompany.toLowerCase().includes(q) ||
        inv.toEmail.toLowerCase().includes(q)
      );
    });
  }, [invoices, search, statusFilter]);

  // unique client list for quick re-use across multiple invoices
  const recentClients = useMemo(() => {
    const seen = new Map<string, Invoice>();
    invoices.forEach((inv) => {
      const key = (inv.toEmail || inv.toName).toLowerCase().trim();
      if (key && !seen.has(key)) seen.set(key, inv);
    });
    return Array.from(seen.values()).slice(0, 12);
  }, [invoices]);

  const handleNew = (prefillFromClient?: Invoice) => {
    const inv = blankInvoice();
    if (prefillFromClient) {
      inv.toName = prefillFromClient.toName;
      inv.toCompany = prefillFromClient.toCompany;
      inv.toAddress = prefillFromClient.toAddress;
      inv.toEmail = prefillFromClient.toEmail;
      inv.toPhone = prefillFromClient.toPhone;
      inv.toGstin = prefillFromClient.toGstin || "";
      inv.currency = prefillFromClient.currency;
    }
    setEditing(inv);
  };

  const handleSave = (inv: Invoice, isNew: boolean) => {
    const toSave: Invoice = { ...inv };
    if (isNew) {
      // commit the reserved number now (peek became real)
      toSave.number = nextInvoiceNumber(new Date(inv.issueDate + "T00:00:00"));
      toSave.createdAt = new Date().toISOString();
    }
    // If recurrence set and nextRunAt missing, seed from issueDate
    if (toSave.recurrence.interval !== "none" && !toSave.recurrence.nextRunAt) {
      toSave.recurrence.nextRunAt = toSave.issueDate;
    }
    if (toSave.recurrence.interval === "none") {
      toSave.recurrence.nextRunAt = null;
    }
    saveInvoice(toSave);
    refresh();
    setEditing(null);
    toast.success(isNew ? `Invoice ${toSave.number} created` : `Invoice ${toSave.number} updated`);
  };

  const handleDelete = (inv: Invoice) => {
    if (!window.confirm(`Delete ${inv.number}? This cannot be undone.`)) return;
    deleteInvoice(inv.id);
    refresh();
    toast.success("Invoice deleted");
  };

  const handleDuplicate = (inv: Invoice) => {
    const copy = duplicateInvoice(inv.id);
    if (copy) {
      refresh();
      toast.success(`Duplicated as ${copy.number}`);
    }
  };

  const handleExport = () => {
    const blob = new Blob([exportAllJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dizigroww-invoices-${todayIso()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        importAllJson(String(reader.result || ""));
        refresh();
        toast.success("Imported successfully");
      } catch {
        toast.error("Failed to import — check JSON");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <img src={BRAND.logo} alt="DiziGroww" className="h-9 w-auto" />
          <div className="flex-1">
            <h1 className="text-lg font-semibold leading-tight">Invoices</h1>
            <p className="text-xs text-slate-500">Generate, track and auto-recur invoices for any client.</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-1" /> Backup
          </Button>
          <Button variant="outline" size="sm" onClick={handleBackfill} title="Push all invoices to the cloud database">
            <Upload className="w-4 h-4 mr-1" /> Sync to Cloud
          </Button>
          <label className="inline-flex">
            <input
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleImport(f);
                e.currentTarget.value = "";
              }}
            />
            <span className="inline-flex items-center px-3 py-1.5 text-sm border rounded-md cursor-pointer hover:bg-slate-50">
              <Upload className="w-4 h-4 mr-1" /> Restore
            </span>
          </label>
          <Button onClick={() => handleNew()}>
            <FilePlus2 className="w-4 h-4 mr-1" /> New invoice
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Stats */}
        <StatsRow invoices={invoices} />

        {/* Month-wise revenue */}
        <MonthlyRevenue invoices={invoices} />

        {/* Recent clients quick pick */}
        {recentClients.length > 0 && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Quick re-bill an existing client</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {recentClients.map((c) => (
                <Button
                  key={c.id}
                  variant="outline"
                  size="sm"
                  onClick={() => handleNew(c)}
                  className="text-xs"
                >
                  <Plus className="w-3 h-3 mr-1" />
                  {c.toCompany || c.toName || c.toEmail || "Client"}
                </Button>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by client, company, email, invoice #"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-44">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="due">Due</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refresh} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        {/* Invoice table */}
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Due</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Recurring</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-slate-500 py-10">
                      No invoices yet. Click <span className="font-medium">New invoice</span> to create your first one.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((inv) => {
                  const totals = computeTotals(inv);
                  return (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-xs">{inv.number}</TableCell>
                      <TableCell>
                        <div className="font-medium">{inv.toCompany || inv.toName || "—"}</div>
                        {inv.toName && inv.toCompany && (
                          <div className="text-xs text-slate-500">{inv.toName}</div>
                        )}
                      </TableCell>
                      <TableCell>{inv.issueDate}</TableCell>
                      <TableCell>{inv.dueDate}</TableCell>
                      <TableCell className="font-medium">
                        {formatMoney(totals.total, inv.currency)}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={inv.status} />
                      </TableCell>
                      <TableCell>
                        {inv.recurrence.interval !== "none" ? (
                          <Badge variant="secondary" className="gap-1">
                            <Repeat className="w-3 h-3" />
                            {inv.recurrence.interval}
                          </Badge>
                        ) : (
                          <span className="text-slate-400 text-xs">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="inline-flex gap-1">
                          <Button size="icon" variant="ghost" title="View / PDF" onClick={() => setPreviewing(inv)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" title="Edit" onClick={() => setEditing(inv)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" title="Duplicate" onClick={() => handleDuplicate(inv)}>
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button size="icon" variant="ghost" title="Delete" onClick={() => handleDelete(inv)}>
                            <Trash2 className="w-4 h-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Editor dialog */}
      {editing && (
        <InvoiceEditor
          invoice={editing}
          isNew={!invoices.find((i) => i.id === editing.id)}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      {/* Preview / PDF dialog */}
      {previewing && (
        <InvoicePreviewDialog
          invoice={previewing}
          onClose={() => setPreviewing(null)}
        />
      )}
    </div>
  );
}

// ----------------------------------------------------------------------------
function StatsRow({ invoices }: { invoices: Invoice[] }) {
  const stats = useMemo(() => {
    const totalsByCur: Record<string, number> = {};
    const paidByCur: Record<string, number> = {};
    invoices.forEach((inv) => {
      const t = computeTotals(inv).total;
      totalsByCur[inv.currency] = (totalsByCur[inv.currency] || 0) + t;
      if (inv.status === "paid") paidByCur[inv.currency] = (paidByCur[inv.currency] || 0) + t;
    });
    return {
      count: invoices.length,
      recurring: invoices.filter((i) => i.recurrence.interval !== "none").length,
      outstanding: invoices.filter((i) => i.status === "sent" || i.status === "overdue").length,
      totalsByCur,
      paidByCur,
    };
  }, [invoices]);

  const totalLine = Object.entries(stats.totalsByCur)
    .map(([c, v]) => formatMoney(v, c as Currency))
    .join(" · ") || "—";
  const paidLine = Object.entries(stats.paidByCur)
    .map(([c, v]) => formatMoney(v, c as Currency))
    .join(" · ") || "—";

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <Stat label="Invoices" value={String(stats.count)} />
      <Stat label="Recurring series" value={String(stats.recurring)} />
      <Stat label="Outstanding" value={String(stats.outstanding)} />
      <Stat label="Billed total" value={totalLine} small />
    </div>
  );
}

// ----------------------------------------------------------------------------
// Month-wise revenue breakdown
// ----------------------------------------------------------------------------
function MonthlyRevenue({ invoices }: { invoices: Invoice[] }) {
  const rows = useMemo(() => {
    const map: Record<
      string,
      { count: number; billed: Record<string, number>; collected: Record<string, number> }
    > = {};
    invoices.forEach((inv) => {
      const key = (inv.issueDate || "").slice(0, 7); // YYYY-MM
      if (!key) return;
      const total = computeTotals(inv).total;
      const m = (map[key] ||= { count: 0, billed: {}, collected: {} });
      m.count += 1;
      m.billed[inv.currency] = (m.billed[inv.currency] || 0) + total;
      if (inv.status === "paid")
        m.collected[inv.currency] = (m.collected[inv.currency] || 0) + total;
    });
    return Object.entries(map).sort((a, b) => (a[0] < b[0] ? 1 : -1));
  }, [invoices]);

  const fmt = (rec: Record<string, number>) =>
    Object.entries(rec)
      .map(([c, v]) => formatMoney(v, c as Currency))
      .join(" · ") || "—";

  const monthLabel = (key: string) => {
    const [y, m] = key.split("-").map(Number);
    return new Date(y, m - 1, 1).toLocaleString("en-US", { month: "long", year: "numeric" });
  };

  if (rows.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Revenue by month</CardTitle>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wide text-slate-500 border-b">
              <th className="py-2.5 px-4 text-left font-medium">Month</th>
              <th className="py-2.5 px-4 text-center font-medium">Invoices</th>
              <th className="py-2.5 px-4 text-right font-medium">Billed</th>
              <th className="py-2.5 px-4 text-right font-medium">Collected</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([key, v]) => (
              <tr key={key} className="border-b last:border-0 hover:bg-slate-50">
                <td className="py-2.5 px-4 font-medium">{monthLabel(key)}</td>
                <td className="py-2.5 px-4 text-center text-slate-600">{v.count}</td>
                <td className="py-2.5 px-4 text-right tabular-nums">{fmt(v.billed)}</td>
                <td className="py-2.5 px-4 text-right tabular-nums font-semibold text-emerald-600">
                  {fmt(v.collected)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}

function Stat({ label, value, small }: { label: string; value: string; small?: boolean }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
        <div className={small ? "text-sm font-semibold mt-1" : "text-2xl font-semibold mt-1"}>
          {value}
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: InvoiceStatus }) {
  const variant: Record<InvoiceStatus, string> = {
    due: "bg-amber-100 text-amber-800",
    paid: "bg-green-100 text-green-700",
    overdue: "bg-red-100 text-red-700",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${variant[status] || "bg-slate-200 text-slate-700"}`}>
      {status}
    </span>
  );
}

// ============================================================================
// Invoice editor (Dialog with form)
// ============================================================================
function InvoiceEditor({
  invoice,
  isNew,
  onCancel,
  onSave,
}: {
  invoice: Invoice;
  isNew: boolean;
  onCancel: () => void;
  onSave: (inv: Invoice, isNew: boolean) => void;
}) {
  const [draft, setDraft] = useState<Invoice>({ ...invoice });

  const update = <K extends keyof Invoice>(k: K, v: Invoice[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  const updateItem = (id: string, patch: Partial<InvoiceLineItem>) =>
    setDraft((d) => ({
      ...d,
      items: d.items.map((it) => (it.id === id ? { ...it, ...patch } : it)),
    }));

  const addItem = () =>
    setDraft((d) => ({
      ...d,
      items: [...d.items, { id: cryptoId(), description: "", hsnSac: "998314", quantity: 1, unitPrice: 0 }],
    }));

  const addPreset = (idx: number) => {
    const preset = SERVICE_PRESETS[idx];
    if (!preset) return;
    setDraft((d) => {
      // Drop a single leftover blank row so presets land cleanly.
      const kept = d.items.filter(
        (it) => it.description.trim() !== "" || it.unitPrice > 0
      );
      return { ...d, items: [...kept, { id: cryptoId(), ...preset.item }] };
    });
  };

  const removeItem = (id: string) =>
    setDraft((d) => ({ ...d, items: d.items.filter((it) => it.id !== id) }));

  const totals = computeTotals(draft);

  return (
    <Dialog open onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-4xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "New invoice" : `Edit ${draft.number}`}</DialogTitle>
          <DialogDescription>
            {isNew
              ? `Will be saved as ${draft.number}. Fill the client and line items below.`
              : "Edit and save to update this invoice."}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="client" className="mt-2">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="items">Items</TabsTrigger>
            <TabsTrigger value="meta">Tax & dates</TabsTrigger>
            <TabsTrigger value="recur">Recurring</TabsTrigger>
          </TabsList>

          {/* CLIENT TAB */}
          <TabsContent value="client" className="space-y-3 pt-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Client name">
                <Input
                  value={draft.toName}
                  onChange={(e) => update("toName", e.target.value)}
                  placeholder="John Doe"
                />
              </Field>
              <Field label="Company">
                <Input
                  value={draft.toCompany}
                  onChange={(e) => update("toCompany", e.target.value)}
                  placeholder="Acme Pvt. Ltd."
                />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={draft.toEmail}
                  onChange={(e) => update("toEmail", e.target.value)}
                  placeholder="client@example.com"
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={draft.toPhone}
                  onChange={(e) => update("toPhone", e.target.value)}
                  placeholder="+91 ..."
                />
              </Field>
              <Field label="Client GSTIN" className="md:col-span-2">
                <Input
                  value={draft.toGstin}
                  onChange={(e) => update("toGstin", e.target.value.toUpperCase())}
                  placeholder="e.g. 09ABCDE1234F1Z5 (leave blank if unregistered)"
                  maxLength={15}
                  className="font-mono uppercase tracking-wider"
                />
              </Field>
              <Field label="Billing address" className="md:col-span-2">
                <Textarea
                  value={draft.toAddress}
                  onChange={(e) => update("toAddress", e.target.value)}
                  rows={2}
                  placeholder="Street, City, State, PIN"
                />
              </Field>
            </div>
          </TabsContent>

          {/* ITEMS TAB */}
          <TabsContent value="items" className="space-y-3 pt-3">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-left text-xs text-slate-500">
                  <tr>
                    <th className="py-1 pr-2">Description</th>
                    <th className="py-1 pr-2 w-24">HSN / SAC</th>
                    <th className="py-1 pr-2 w-20">Qty</th>
                    <th className="py-1 pr-2 w-32">Unit price</th>
                    <th className="py-1 pr-2 w-32 text-right">Amount</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {draft.items.map((it) => (
                    <tr key={it.id} className="border-t">
                      <td className="py-1 pr-2">
                        <Input
                          value={it.description}
                          onChange={(e) => updateItem(it.id, { description: e.target.value })}
                          placeholder="Service or product"
                        />
                      </td>
                      <td className="py-1 pr-2">
                        <Input
                          value={it.hsnSac}
                          onChange={(e) => updateItem(it.id, { hsnSac: e.target.value })}
                          placeholder="998314"
                          className="font-mono text-xs"
                        />
                      </td>
                      <td className="py-1 pr-2">
                        <Input
                          type="number"
                          min={0}
                          step="any"
                          value={it.quantity}
                          onChange={(e) =>
                            updateItem(it.id, { quantity: Number(e.target.value) })
                          }
                        />
                      </td>
                      <td className="py-1 pr-2">
                        <Input
                          type="number"
                          min={0}
                          step="any"
                          value={it.unitPrice}
                          onChange={(e) =>
                            updateItem(it.id, { unitPrice: Number(e.target.value) })
                          }
                        />
                      </td>
                      <td className="py-1 pr-2 text-right">
                        {formatMoney(
                          Number(it.quantity || 0) * Number(it.unitPrice || 0),
                          draft.currency
                        )}
                      </td>
                      <td className="py-1 pr-2 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(it.id)}
                          disabled={draft.items.length <= 1}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-slate-500">
                Default SAC <span className="font-mono">998314</span> is "IT design &amp; development services". Override per line if needed.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" size="sm" onClick={addItem}>
                <Plus className="w-4 h-4 mr-1" /> Add line item
              </Button>
              <select
                value=""
                onChange={(e) => {
                  const i = Number(e.target.value);
                  if (!Number.isNaN(i)) addPreset(i);
                  e.currentTarget.value = "";
                }}
                className="text-sm border rounded-md px-3 py-[7px] bg-white hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/30"
                title="Quick-add a standard service"
              >
                <option value="">+ Add preset service…</option>
                {SERVICE_PRESETS.map((p, i) => (
                  <option key={i} value={i}>{p.label}</option>
                ))}
              </select>
            </div>

            <TotalsPanel totals={totals} currency={draft.currency} />
          </TabsContent>

          {/* META TAB */}
          <TabsContent value="meta" className="space-y-3 pt-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Field label="Issue date">
                <Input
                  type="date"
                  value={draft.issueDate}
                  onChange={(e) => {
                    const v = e.target.value;
                    update("issueDate", v);
                    if (!draft.dueDate || draft.dueDate < v) {
                      update("dueDate", addDaysIso(v, 14));
                    }
                  }}
                />
              </Field>
              <Field label="Due date">
                <Input
                  type="date"
                  value={draft.dueDate}
                  onChange={(e) => update("dueDate", e.target.value)}
                />
              </Field>
              <Field label="Status">
                <Select
                  value={draft.status}
                  onValueChange={(v) => update("status", v as InvoiceStatus)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="due">Due</SelectItem>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Currency">
                <Select
                  value={draft.currency}
                  onValueChange={(v) => update("currency", v as Currency)}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {Object.keys(CURRENCY_SYMBOL).map((c) => (
                      <SelectItem key={c} value={c}>
                        {c} ({CURRENCY_SYMBOL[c as Currency]})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Tax %">
                <Input
                  type="number"
                  min={0}
                  step="any"
                  value={draft.taxPercent}
                  onChange={(e) => update("taxPercent", Number(e.target.value))}
                />
              </Field>
              <Field label="Discount %">
                <Input
                  type="number"
                  min={0}
                  max={100}
                  step="any"
                  value={draft.discountPercent}
                  onChange={(e) => update("discountPercent", Number(e.target.value))}
                />
              </Field>
              <Field label="Place of Supply (override)" className="md:col-span-3">
                <Input
                  value={draft.placeOfSupply || ""}
                  onChange={(e) => update("placeOfSupply", e.target.value)}
                  placeholder={
                    stateFromGstin(draft.toGstin)
                      ? `Auto-detected: ${stateFromGstin(draft.toGstin)!.name} (${stateFromGstin(draft.toGstin)!.code})`
                      : "Leave blank to auto-derive from client GSTIN"
                  }
                />
              </Field>
            </div>
            <Field label="Notes / payment terms">
              <Textarea
                rows={3}
                value={draft.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </Field>
          </TabsContent>

          {/* RECURRING TAB */}
          <TabsContent value="recur" className="space-y-3 pt-3">
            <p className="text-sm text-slate-600">
              Turn this into a recurring series. Every time you open the Invoices
              page after the next run date, a fresh invoice is auto-generated
              for the same client and amount, numbered in sequence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Field label="Recurrence">
                <Select
                  value={draft.recurrence.interval}
                  onValueChange={(v) =>
                    update("recurrence", {
                      ...draft.recurrence,
                      interval: v as RecurrenceInterval,
                    })
                  }
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (one-time)</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Next run on">
                <Input
                  type="date"
                  disabled={draft.recurrence.interval === "none"}
                  value={draft.recurrence.nextRunAt || ""}
                  onChange={(e) =>
                    update("recurrence", {
                      ...draft.recurrence,
                      nextRunAt: e.target.value || null,
                    })
                  }
                />
              </Field>
            </div>
            <p className="text-xs text-slate-500">
              Tip: leave Next run blank to default to the issue date.
            </p>
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSave(draft, isNew)}>
            {isNew ? "Create invoice" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <Label className="text-xs text-slate-600">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

function TotalsPanel({
  totals,
  currency,
}: {
  totals: ReturnType<typeof computeTotals>;
  currency: Currency;
}) {
  return (
    <div className="ml-auto w-full md:w-72 text-sm border rounded-md p-3 bg-slate-50">
      <Row label="Subtotal" value={formatMoney(totals.subtotal, currency)} />
      <Row label="Discount" value={`- ${formatMoney(totals.discount, currency)}`} />
      <Row label="Tax" value={formatMoney(totals.tax, currency)} />
      <div className="border-t my-2" />
      <Row label="Total" value={formatMoney(totals.total, currency)} bold />
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "font-semibold text-base" : ""}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

// ============================================================================
// Preview + PDF dialog
// ============================================================================
function InvoicePreviewDialog({
  invoice,
  onClose,
}: {
  invoice: Invoice;
  onClose: () => void;
}) {
  const printRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const downloadPdf = async () => {
    if (!printRef.current) return;
    setBusy(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      let heightLeft = imgHeight;
      let position = 0;
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(`${invoice.number}-${(invoice.toCompany || invoice.toName || "invoice").replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error(err);
      toast.error("PDF generation failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{invoice.number}</DialogTitle>
          <DialogDescription>
            Preview below — click Download PDF to save a copy for this client.
          </DialogDescription>
        </DialogHeader>

        <div className="border rounded-md overflow-hidden">
          <PrintableInvoice invoice={invoice} ref={printRef} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={downloadPdf} disabled={busy}>
            <Download className="w-4 h-4 mr-1" />
            {busy ? "Generating…" : "Download PDF"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ----------------------------------------------------------------------------
// Printable invoice (also what gets rasterized into the PDF)
// ----------------------------------------------------------------------------
const PrintableInvoice = React.forwardRef<HTMLDivElement, { invoice: Invoice }>(
  ({ invoice }, ref) => {
    const totals = computeTotals(invoice);
    const tax = computeTaxBreakdown(invoice);
    const isTaxInvoice = !!invoice.fromTaxId;
    const isInr = invoice.currency === "INR";

    // Place of Supply — explicit override, or derived from client GSTIN
    const derivedPos = stateFromGstin(invoice.toGstin);
    const placeOfSupply =
      invoice.placeOfSupply ||
      (derivedPos ? `${derivedPos.name} (${derivedPos.code})` : "");

    const bank = BRAND.bank;
    const hasPaymentBlock =
      bank.accountNumber || bank.ifsc || bank.bankName || bank.upiId;

    const amountWords = isInr ? amountInIndianWords(totals.total) : "";

    return (
      <div
        ref={ref}
        style={{
          background: "white",
          color: "#0f172a",
          padding: "32px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          fontSize: "12px",
          width: "100%",
        }}
      >
        {/* Header — single DiziGroww mention via logo + title */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={BRAND.logo} alt={BRAND.name} style={{ height: 56, width: "auto" }} crossOrigin="anonymous" />
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1 }}>
              {isTaxInvoice ? "TAX INVOICE" : "INVOICE"}
            </div>
            <div style={{ color: "#64748b", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", marginTop: 2 }}>
              {invoice.number}
            </div>
          </div>
        </div>

        {/* From / To / Meta */}
        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1.1fr 0.9fr", gap: 20, marginBottom: 24 }}>
          {/* From — no redundant brand name; the header already states it */}
          <div>
            <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>From</div>
            <div style={{ whiteSpace: "pre-line", color: "#334155", lineHeight: 1.5 }}>{invoice.fromAddress}</div>
            <div style={{ color: "#334155" }}>{invoice.fromEmail}</div>
            <div style={{ color: "#334155" }}>{invoice.fromPhone}</div>
            {invoice.fromTaxId && (
              <div style={{ color: "#0f172a", marginTop: 6 }}>
                <span style={{ color: "#64748b" }}>GSTIN: </span>
                <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontWeight: 600 }}>
                  {invoice.fromTaxId}
                </span>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Bill to</div>
            <div style={{ fontWeight: 600 }}>{invoice.toCompany || invoice.toName || "—"}</div>
            {invoice.toCompany && invoice.toName && <div>{invoice.toName}</div>}
            <div style={{ whiteSpace: "pre-line", color: "#334155", lineHeight: 1.5 }}>{invoice.toAddress}</div>
            <div style={{ color: "#334155" }}>{invoice.toEmail}</div>
            <div style={{ color: "#334155" }}>{invoice.toPhone}</div>
            {invoice.toGstin && (
              <div style={{ color: "#0f172a", marginTop: 6 }}>
                <span style={{ color: "#64748b" }}>GSTIN: </span>
                <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontWeight: 600 }}>
                  {invoice.toGstin}
                </span>
              </div>
            )}
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Details</div>
            <MetaRow label="Issue date" value={invoice.issueDate} />
            <MetaRow label="Due date" value={invoice.dueDate} />
            <MetaRow label="Status" value={invoice.status.toUpperCase()} />
            {placeOfSupply && <MetaRow label="Place of supply" value={placeOfSupply} />}
            {invoice.recurrence.interval !== "none" && (
              <MetaRow label="Recurs" value={invoice.recurrence.interval} />
            )}
          </div>
        </div>

        {/* Items table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <thead>
            <tr style={{ background: "#0f172a", color: "white" }}>
              <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600 }}>Description</th>
              <th style={{ textAlign: "left", padding: "8px 10px", fontWeight: 600, width: 80 }}>HSN/SAC</th>
              <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, width: 50 }}>Qty</th>
              <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, width: 95 }}>Unit price</th>
              <th style={{ textAlign: "right", padding: "8px 10px", fontWeight: 600, width: 95 }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((it, idx) => (
              <tr key={it.id} style={{ background: idx % 2 === 0 ? "#f8fafc" : "white" }}>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0" }}>
                  {it.description || "—"}
                </td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 11 }}>
                  {it.hsnSac || "—"}
                </td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", textAlign: "right" }}>
                  {it.quantity}
                </td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", textAlign: "right" }}>
                  {formatMoney(Number(it.unitPrice || 0), invoice.currency)}
                </td>
                <td style={{ padding: "8px 10px", borderBottom: "1px solid #e2e8f0", textAlign: "right" }}>
                  {formatMoney(Number(it.quantity || 0) * Number(it.unitPrice || 0), invoice.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <table style={{ width: 300, borderCollapse: "collapse" }}>
            <tbody>
              <SumRow label="Subtotal" value={formatMoney(totals.subtotal, invoice.currency)} />
              {invoice.discountPercent > 0 && (
                <SumRow
                  label={`Discount (${invoice.discountPercent}%)`}
                  value={`- ${formatMoney(totals.discount, invoice.currency)}`}
                />
              )}
              {tax.mode === "cgst_sgst" && (
                <>
                  <SumRow
                    label={`CGST (${(invoice.taxPercent / 2).toFixed(2)}%)`}
                    value={formatMoney(tax.cgst, invoice.currency)}
                  />
                  <SumRow
                    label={`SGST (${(invoice.taxPercent / 2).toFixed(2)}%)`}
                    value={formatMoney(tax.sgst, invoice.currency)}
                  />
                </>
              )}
              {tax.mode === "igst" && (
                <SumRow
                  label={`IGST (${invoice.taxPercent}%)`}
                  value={formatMoney(tax.igst, invoice.currency)}
                />
              )}
              <tr>
                <td
                  style={{
                    padding: "10px",
                    fontWeight: 700,
                    fontSize: 14,
                    borderTop: "2px solid #0f172a",
                  }}
                >
                  Total due
                </td>
                <td
                  style={{
                    padding: "10px",
                    textAlign: "right",
                    fontWeight: 700,
                    fontSize: 14,
                    borderTop: "2px solid #0f172a",
                  }}
                >
                  {formatMoney(totals.total, invoice.currency)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Amount in words */}
        {amountWords && (
          <div style={{ marginTop: 8, color: "#334155", fontStyle: "italic" }}>
            <span style={{ color: "#64748b", fontStyle: "normal" }}>Amount in words: </span>
            {amountWords}
          </div>
        )}

        {/* Payment + Notes block */}
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 20, marginTop: 24 }}>
          <div>
            {hasPaymentBlock && (
              <>
                <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Payment details</div>
                <div style={{ color: "#334155", lineHeight: 1.6 }}>
                  {bank.accountName && <div><span style={{ color: "#64748b" }}>Account name: </span>{bank.accountName}</div>}
                  {bank.bankName && <div><span style={{ color: "#64748b" }}>Bank: </span>{bank.bankName}{bank.branch ? `, ${bank.branch}` : ""}</div>}
                  {bank.accountNumber && <div><span style={{ color: "#64748b" }}>A/C no: </span><span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{bank.accountNumber}</span></div>}
                  {bank.ifsc && <div><span style={{ color: "#64748b" }}>IFSC: </span><span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{bank.ifsc}</span></div>}
                  {bank.upiId && <div><span style={{ color: "#64748b" }}>UPI: </span><span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{bank.upiId}</span></div>}
                </div>
              </>
            )}
            {invoice.notes && (
              <div style={{ marginTop: hasPaymentBlock ? 14 : 0 }}>
                <div style={{ fontSize: 10, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Notes</div>
                <div style={{ whiteSpace: "pre-line", color: "#334155" }}>{invoice.notes}</div>
              </div>
            )}
          </div>

          {/* Authorised signatory */}
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", minHeight: 110 }}>
            {BRAND.signatureImage && (
              <img
                src={BRAND.signatureImage}
                alt="Signature"
                style={{
                  height: 60,
                  width: "auto",
                  maxWidth: 180,
                  objectFit: "contain",
                  marginBottom: -6,
                }}
                crossOrigin="anonymous"
                onError={(e) => {
                  // hide image if file is missing — fall back to text only
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div style={{ borderTop: "1px solid #0f172a", paddingTop: 6, display: "inline-block", minWidth: 180 }}>
              <div style={{ fontWeight: 600 }}>{BRAND.signatoryLabel}</div>
              <div style={{ color: "#64748b", fontSize: 10 }}>Authorised Signatory</div>
            </div>
          </div>
        </div>

        {/* Footer — contact only, no brand name (already on top via logo) */}
        <div
          style={{
            marginTop: 28,
            paddingTop: 10,
            borderTop: "1px solid #e2e8f0",
            color: "#64748b",
            fontSize: 10,
            textAlign: "center",
          }}
        >
          {BRAND.website} · {BRAND.email} · {BRAND.phone}
        </div>
      </div>
    );
  }
);
PrintableInvoice.displayName = "PrintableInvoice";

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
      <span style={{ color: "#64748b" }}>{label}</span>
      <span style={{ fontWeight: 500 }}>{value}</span>
    </div>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td style={{ padding: "6px 10px", color: "#334155" }}>{label}</td>
      <td style={{ padding: "6px 10px", textAlign: "right" }}>{value}</td>
    </tr>
  );
}
