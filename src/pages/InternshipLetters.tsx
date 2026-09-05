import React, { useEffect, useMemo, useRef, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
import { Checkbox } from "@/components/ui/checkbox";
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
  Search,
  Trash2,
  Upload,
  Copy,
} from "lucide-react";

import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminNav } from "@/components/admin/AdminNav";
import { BRAND } from "@/lib/brand";
import { CURRENCY_SYMBOL, type Currency, todayIso } from "@/lib/invoices";
import { cloudEnabled } from "@/lib/supabaseClient";
import {
  internshipLetterStore,
  blankInternshipLetter,
  formatStipend,
  formatDateLong,
  LETTER_STATUS_LABEL,
  type InternshipLetterData,
  type LetterStatus,
  type WorkMode,
  type StipendPeriod,
} from "@/lib/letters";

export default function InternshipLetters() {
  return (
    <AdminAuthGate title="Internship Letters">
      <InternshipLettersApp />
    </AdminAuthGate>
  );
}

function InternshipLettersApp() {
  const [letters, setLetters] = useState<InternshipLetterData[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editing, setEditing] = useState<InternshipLetterData | null>(null);
  const [previewing, setPreviewing] = useState<InternshipLetterData | null>(null);

  useEffect(() => {
    document.title = "Internship Letters · DiziGroww";
    setLetters(internshipLetterStore.list());
    if (cloudEnabled()) {
      internshipLetterStore
        .hydrateFromCloud()
        .then((ok) => {
          if (ok) setLetters(internshipLetterStore.list());
          return internshipLetterStore.backfillToCloud();
        })
        .catch(() => {
          /* offline — stay on local cache, retry silently next load */
        });
    }
  }, []);

  useEffect(() => {
    if (!cloudEnabled()) return;
    const onFocus = () => {
      internshipLetterStore
        .hydrateFromCloud()
        .then((ok) => ok && setLetters(internshipLetterStore.list()))
        .catch(() => {});
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const refresh = () => setLetters(internshipLetterStore.list());

  const handleBackfill = async () => {
    if (!cloudEnabled()) {
      toast.error("Cloud database not connected — add your Supabase keys and redeploy");
      return;
    }
    if (internshipLetterStore.list().length === 0) {
      toast("No internship letters in this browser to sync");
      return;
    }
    try {
      const n = await internshipLetterStore.backfillToCloud();
      toast.success(`Synced ${n} internship letter${n > 1 ? "s" : ""} to the cloud database`);
    } catch {
      toast.error("Cloud sync failed — check the table exists and RLS policy is set");
    }
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return letters.filter((l) => {
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.number.toLowerCase().includes(q) ||
        l.candidateName.toLowerCase().includes(q) ||
        l.role.toLowerCase().includes(q) ||
        l.candidateEmail.toLowerCase().includes(q)
      );
    });
  }, [letters, search, statusFilter]);

  const handleNew = () => setEditing(blankInternshipLetter(BRAND));

  const handleSave = (letter: InternshipLetterData, isNew: boolean) => {
    const toSave: InternshipLetterData = { ...letter };
    if (isNew) {
      toSave.number = internshipLetterStore.nextNumber(new Date(letter.issueDate + "T00:00:00"));
    }
    internshipLetterStore.save(toSave);
    refresh();
    setEditing(null);
    toast.success(isNew ? `Internship letter ${toSave.number} created` : `Internship letter ${toSave.number} updated`);
  };

  const handleDelete = (letter: InternshipLetterData) => {
    if (!window.confirm(`Delete ${letter.number}? This cannot be undone.`)) return;
    internshipLetterStore.remove(letter.id);
    refresh();
    toast.success("Internship letter deleted");
  };

  const handleDuplicate = (letter: InternshipLetterData) => {
    const copy = internshipLetterStore.duplicate(letter.id);
    if (copy) {
      refresh();
      toast.success(`Duplicated as ${copy.number}`);
    }
  };

  const handleExport = () => {
    const blob = new Blob([internshipLetterStore.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dizigroww-internship-letters-${todayIso()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        internshipLetterStore.importJson(String(reader.result || ""));
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
      <AdminNav />
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="flex-1">
            <h1 className="text-lg font-semibold leading-tight">Internship Letters</h1>
            <p className="text-xs text-slate-500">Enter the role, duration and stipend, get a ready-to-send PDF internship letter.</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-1" /> Backup
          </Button>
          <Button variant="outline" size="sm" onClick={handleBackfill} title="Push all internship letters to the cloud database">
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
          <Button onClick={handleNew}>
            <FilePlus2 className="w-4 h-4 mr-1" /> New internship letter
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by candidate, role, email, letter #"
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
              {(Object.keys(LETTER_STATUS_LABEL) as LetterStatus[]).map((s) => (
                <SelectItem key={s} value={s}>{LETTER_STATUS_LABEL[s]}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={refresh} title="Refresh">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>

        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>#</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Stipend</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-slate-500 py-10">
                      No internship letters yet. Click <span className="font-medium">New internship letter</span> to create your first one.
                    </TableCell>
                  </TableRow>
                )}
                {filtered.map((l) => (
                  <TableRow key={l.id}>
                    <TableCell className="font-mono text-xs">{l.number}</TableCell>
                    <TableCell>
                      <div className="font-medium">{l.candidateName || "—"}</div>
                      <div className="text-xs text-slate-500">{l.candidateEmail}</div>
                    </TableCell>
                    <TableCell>{l.role || "—"}</TableCell>
                    <TableCell className="text-xs">{l.startDate} → {l.endDate}</TableCell>
                    <TableCell className="font-medium">
                      {formatStipend(l.stipendAmount, l.currency, l.stipendPeriod)}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={l.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="inline-flex gap-1">
                        <Button size="icon" variant="ghost" title="Preview / PDF" onClick={() => setPreviewing(l)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Edit" onClick={() => setEditing(l)}>
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Duplicate" onClick={() => handleDuplicate(l)}>
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" title="Delete" onClick={() => handleDelete(l)}>
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {editing && (
        <InternshipLetterEditor
          letter={editing}
          isNew={!letters.find((l) => l.id === editing.id)}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      {previewing && (
        <InternshipLetterPreviewDialog letter={previewing} onClose={() => setPreviewing(null)} />
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: LetterStatus }) {
  const variant: Record<LetterStatus, string> = {
    draft: "bg-slate-200 text-slate-700",
    sent: "bg-amber-100 text-amber-800",
    accepted: "bg-green-100 text-green-700",
    declined: "bg-red-100 text-red-700",
    expired: "bg-slate-200 text-slate-500",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${variant[status]}`}>
      {LETTER_STATUS_LABEL[status]}
    </span>
  );
}

// ============================================================================
// Editor
// ============================================================================
function InternshipLetterEditor({
  letter,
  isNew,
  onCancel,
  onSave,
}: {
  letter: InternshipLetterData;
  isNew: boolean;
  onCancel: () => void;
  onSave: (letter: InternshipLetterData, isNew: boolean) => void;
}) {
  const [draft, setDraft] = useState<InternshipLetterData>({ ...letter });

  const update = <K extends keyof InternshipLetterData>(k: K, v: InternshipLetterData[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  return (
    <Dialog open onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "New internship letter" : `Edit ${draft.number}`}</DialogTitle>
          <DialogDescription>
            {isNew
              ? `Will be saved as ${draft.number}. Fill in the candidate and internship details below.`
              : "Edit and save to update this internship letter."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Candidate name">
              <Input value={draft.candidateName} onChange={(e) => update("candidateName", e.target.value)} placeholder="Jane Doe" />
            </Field>
            <Field label="Candidate email">
              <Input type="email" value={draft.candidateEmail} onChange={(e) => update("candidateEmail", e.target.value)} placeholder="jane@example.com" />
            </Field>
            <Field label="Candidate address (optional)" className="md:col-span-2">
              <Textarea rows={2} value={draft.candidateAddress || ""} onChange={(e) => update("candidateAddress", e.target.value)} placeholder="Street, City, State, PIN" />
            </Field>
          </div>

          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Role / internship title">
              <Input value={draft.role} onChange={(e) => update("role", e.target.value)} placeholder="e.g. Performance Marketing Intern" />
            </Field>
            <Field label="Department (optional)">
              <Input value={draft.department || ""} onChange={(e) => update("department", e.target.value)} placeholder="e.g. Growth Marketing" />
            </Field>
            <Field label="Mode">
              <Select value={draft.mode} onValueChange={(v) => update("mode", v as WorkMode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Work location">
              <Input value={draft.workLocation || ""} onChange={(e) => update("workLocation", e.target.value)} placeholder="Office address or 'Remote'" />
            </Field>
            <Field label="Mentor / reporting manager (optional)" className="md:col-span-2">
              <Input value={draft.mentor || ""} onChange={(e) => update("mentor", e.target.value)} placeholder="Name" />
            </Field>
          </div>

          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Stipend amount">
              <Input
                type="number"
                min={0}
                step="any"
                disabled={draft.stipendPeriod === "unpaid"}
                value={draft.stipendAmount}
                onChange={(e) => update("stipendAmount", Number(e.target.value))}
              />
            </Field>
            <Field label="Currency">
              <Select value={draft.currency} onValueChange={(v) => update("currency", v as Currency)} disabled={draft.stipendPeriod === "unpaid"}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(CURRENCY_SYMBOL).map((c) => (
                    <SelectItem key={c} value={c}>{c} ({CURRENCY_SYMBOL[c as Currency]})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Period">
              <Select
                value={draft.stipendPeriod}
                onValueChange={(v) => update("stipendPeriod", v as StipendPeriod)}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="per month">per month</SelectItem>
                  <SelectItem value="lump sum">lump sum</SelectItem>
                  <SelectItem value="unpaid">unpaid</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="md:col-span-3 text-xs text-slate-500">
              Preview: <span className="font-medium text-slate-700">{formatStipend(draft.stipendAmount, draft.currency, draft.stipendPeriod)}</span>
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Issue date">
              <Input type="date" value={draft.issueDate} onChange={(e) => update("issueDate", e.target.value)} />
            </Field>
            <Field label="Start date">
              <Input type="date" value={draft.startDate} onChange={(e) => update("startDate", e.target.value)} />
            </Field>
            <Field label="End date">
              <Input type="date" value={draft.endDate} onChange={(e) => update("endDate", e.target.value)} />
            </Field>
            <Field label="Status">
              <Select value={draft.status} onValueChange={(v) => update("status", v as LetterStatus)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {(Object.keys(LETTER_STATUS_LABEL) as LetterStatus[]).map((s) => (
                    <SelectItem key={s} value={s}>{LETTER_STATUS_LABEL[s]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Certificate on completion" className="md:col-span-2 flex flex-row items-center gap-2 mt-1">
              <div className="flex items-center gap-2 mt-5">
                <Checkbox
                  id="cert"
                  checked={draft.certificateOnCompletion}
                  onCheckedChange={(v) => update("certificateOnCompletion", Boolean(v))}
                />
                <Label htmlFor="cert" className="text-sm font-normal cursor-pointer">
                  Mention that a certificate will be issued on successful completion
                </Label>
              </div>
            </Field>
          </div>

          <Field label="Additional terms (optional — appears as its own paragraph on the letter)">
            <Textarea
              rows={3}
              value={draft.additionalTerms || ""}
              onChange={(e) => update("additionalTerms", e.target.value)}
              placeholder="e.g. working hours, confidentiality, evaluation criteria..."
            />
          </Field>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSave(draft, isNew)}>{isNew ? "Create internship letter" : "Save changes"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <Label className="text-xs text-slate-600">{label}</Label>
      <div className="mt-1">{children}</div>
    </div>
  );
}

// ============================================================================
// Preview + PDF dialog
// ============================================================================
function InternshipLetterPreviewDialog({ letter, onClose }: { letter: InternshipLetterData; onClose: () => void }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const downloadPdf = async () => {
    const container = printRef.current;
    if (!container) return;
    setBusy(true);
    const spacerEl = container.querySelector('[data-pdf-spacer="closing"]') as HTMLElement | null;
    const closingEl = container.querySelector('[data-pdf-block="closing"]') as HTMLElement | null;
    try {
      // The PDF is a single rasterized image sliced into A4-height pages by
      // pure pixel position — it has no idea where the signature block is.
      // Before rasterizing, insert an invisible spacer to push the closing
      // block past whatever page boundary it would otherwise be sliced
      // across, so "For DiziGroww / Authorised Signatory" never gets cut
      // in half between two pages.
      if (spacerEl) spacerEl.style.height = "0px";

      if (spacerEl && closingEl) {
        const A4_RATIO = 297 / 210; // mm height / width, matches jsPDF's "a4"
        const pageHeightPx = container.offsetWidth * A4_RATIO;
        const containerTop = container.getBoundingClientRect().top;
        const blockTop = closingEl.getBoundingClientRect().top - containerTop;
        const blockBottom = closingEl.getBoundingClientRect().bottom - containerTop;
        const startPage = Math.floor(blockTop / pageHeightPx);
        const endPage = Math.floor((blockBottom - 1) / pageHeightPx);
        if (startPage !== endPage) {
          const nextPageStart = (startPage + 1) * pageHeightPx;
          spacerEl.style.height = `${Math.ceil(nextPageStart - blockTop)}px`;
        }
      }

      const canvas = await html2canvas(container, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidthMm = pdf.internal.pageSize.getWidth();
      const pageHeightMm = pdf.internal.pageSize.getHeight();

      // Crop a fresh canvas per page and paste each at y=0 on its own page,
      // instead of re-pasting the same full-height image at a negative
      // offset on every page — that approach is what caused a hairline
      // black seam across the page break in the exported PDF. Cropping
      // means every page's image data physically ends exactly where that
      // page ends, so there's nothing left to seam.
      const pxPerMm = canvas.width / pageWidthMm;
      const canvasPageHeightPx = Math.max(1, Math.floor(pageHeightMm * pxPerMm));
      let renderedPx = 0;
      let pageIndex = 0;
      while (renderedPx < canvas.height) {
        const sliceHeightPx = Math.min(canvasPageHeightPx, canvas.height - renderedPx);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeightPx;
        const ctx = pageCanvas.getContext("2d");
        if (!ctx) break;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
        ctx.drawImage(canvas, 0, renderedPx, canvas.width, sliceHeightPx, 0, 0, canvas.width, sliceHeightPx);
        const sliceImgData = pageCanvas.toDataURL("image/png");
        if (pageIndex > 0) pdf.addPage();
        const sliceHeightMm = sliceHeightPx / pxPerMm;
        pdf.addImage(sliceImgData, "PNG", 0, 0, pageWidthMm, sliceHeightMm);
        renderedPx += sliceHeightPx;
        pageIndex++;
      }
      pdf.save(`${letter.number}-${(letter.candidateName || "internship-letter").replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error(err);
      toast.error("PDF generation failed");
    } finally {
      if (spacerEl) spacerEl.style.height = "0px";
      setBusy(false);
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{letter.number}</DialogTitle>
          <DialogDescription>Preview below — click Download PDF to save a copy for this intern.</DialogDescription>
        </DialogHeader>

        <div className="border rounded-md overflow-hidden">
          <PrintableInternshipLetter letter={letter} ref={printRef} />
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
// Printable letter — a standard, formal internship-letter layout on
// DiziGroww letterhead. Also what gets rasterized into the PDF.
// ----------------------------------------------------------------------------
const PrintableInternshipLetter = React.forwardRef<HTMLDivElement, { letter: InternshipLetterData }>(
  ({ letter }, ref) => {
    const firstName = letter.candidateName.trim().split(/\s+/)[0] || "Candidate";
    const dateLabel = formatDateLong(letter.issueDate);
    const startLabel = formatDateLong(letter.startDate);
    const endLabel = formatDateLong(letter.endDate);

    return (
      <div
        ref={ref}
        style={{
          background: "white",
          color: "#0f172a",
          padding: "40px",
          fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
          fontSize: "12.5px",
          lineHeight: 1.65,
          width: "100%",
        }}
      >
        {/* Letterhead */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
          <img src={BRAND.logo} alt={BRAND.name} style={{ height: 52, width: "auto" }} crossOrigin="anonymous" />
          <div style={{ textAlign: "right", color: "#64748b", fontSize: 11 }}>
            <div style={{ whiteSpace: "pre-line" }}>{BRAND.address}</div>
            <div>{BRAND.email} · {BRAND.phone}</div>
          </div>
        </div>
        <div style={{ borderTop: "2px solid #0f172a", marginBottom: 24 }} />

        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>INTERNSHIP OFFER LETTER</div>
          <div style={{ color: "#64748b", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{letter.number}</div>
        </div>

        <div style={{ marginBottom: 16 }}>Date: {dateLabel}</div>

        <div style={{ marginBottom: 16 }}>
          <div>To,</div>
          <div style={{ fontWeight: 600 }}>{letter.candidateName || "—"}</div>
          {letter.candidateAddress && <div style={{ whiteSpace: "pre-line", color: "#334155" }}>{letter.candidateAddress}</div>}
          {letter.candidateEmail && <div style={{ color: "#334155" }}>{letter.candidateEmail}</div>}
        </div>

        <div style={{ marginBottom: 16, fontWeight: 600 }}>
          Subject: Offer of Internship — {letter.role || "—"}
        </div>

        <div style={{ marginBottom: 14 }}>Dear {firstName},</div>

        <div style={{ marginBottom: 14 }}>
          We are pleased to offer you an internship as <strong>{letter.role || "—"}</strong> at {BRAND.name}
          {letter.department ? `, with our ${letter.department} team` : ""}. We were impressed by your skills and
          enthusiasm through the selection process, and we look forward to having you on board.
        </div>

        <div style={{ marginBottom: 10 }}>The key terms of your internship are set out below:</div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <tbody>
            <TermRow label="Role" value={letter.role || "—"} />
            {letter.department && <TermRow label="Department" value={letter.department} />}
            <TermRow label="Mode" value={`${letter.mode}${letter.workLocation ? ` — ${letter.workLocation}` : ""}`} />
            <TermRow label="Duration" value={`${startLabel} to ${endLabel}`} />
            <TermRow label="Stipend" value={formatStipend(letter.stipendAmount, letter.currency, letter.stipendPeriod)} />
            {letter.mentor && <TermRow label="Mentor / reporting manager" value={letter.mentor} />}
          </tbody>
        </table>

        {letter.certificateOnCompletion && (
          <div style={{ marginBottom: 14 }}>
            Upon successful completion of the internship, you will be issued a certificate of internship
            confirming the role, duration and your contributions during the tenure.
          </div>
        )}

        {letter.additionalTerms && (
          <div style={{ marginBottom: 14, whiteSpace: "pre-line" }}>{letter.additionalTerms}</div>
        )}

        <div style={{ marginBottom: 14 }}>
          We look forward to welcoming you to the {BRAND.name} team. Please sign and return a copy of this
          letter as confirmation of your acceptance of the above terms.
        </div>

        {/* Kept together on one page — see the measurement pass in
            downloadPdf(), which pushes this whole block past a page break
            rather than letting the signature get sliced across two pages. */}
        <div data-pdf-spacer="closing" style={{ height: 0 }} />
        <div data-pdf-block="closing">
          <div style={{ marginBottom: 32 }}>Congratulations, and welcome aboard!</div>

          <div style={{ marginBottom: 40 }}>Sincerely,</div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minHeight: 100 }}>
            {BRAND.signatureImage && (
              <img
                src={BRAND.signatureImage}
                alt="Signature"
                style={{ height: 60, width: "auto", maxWidth: 180, objectFit: "contain", marginBottom: -6 }}
                crossOrigin="anonymous"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
            )}
            <div style={{ borderTop: "1px solid #0f172a", paddingTop: 6, minWidth: 200 }}>
              <div style={{ fontWeight: 600 }}>{BRAND.signatoryLabel}</div>
              <div style={{ color: "#64748b", fontSize: 10 }}>Authorised Signatory</div>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: 32,
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
PrintableInternshipLetter.displayName = "PrintableInternshipLetter";

function TermRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td style={{ padding: "4px 10px 4px 0", color: "#64748b", width: 190, verticalAlign: "top" }}>{label}</td>
      <td style={{ padding: "4px 0", fontWeight: 500 }}>{value}</td>
    </tr>
  );
}
