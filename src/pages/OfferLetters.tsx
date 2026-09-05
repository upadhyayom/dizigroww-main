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
  offerLetterStore,
  blankOfferLetter,
  formatPackage,
  formatDateLong,
  LETTER_STATUS_LABEL,
  type OfferLetterData,
  type LetterStatus,
  type EmploymentType,
  type WorkMode,
  type PackagePeriod,
} from "@/lib/letters";

export default function OfferLetters() {
  return (
    <AdminAuthGate title="Offer Letters">
      <OfferLettersApp />
    </AdminAuthGate>
  );
}

function OfferLettersApp() {
  const [letters, setLetters] = useState<OfferLetterData[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [editing, setEditing] = useState<OfferLetterData | null>(null);
  const [previewing, setPreviewing] = useState<OfferLetterData | null>(null);

  useEffect(() => {
    document.title = "Offer Letters · DiziGroww";
    setLetters(offerLetterStore.list());
    if (cloudEnabled()) {
      offerLetterStore
        .hydrateFromCloud()
        .then((ok) => {
          if (ok) setLetters(offerLetterStore.list());
          return offerLetterStore.backfillToCloud();
        })
        .catch(() => {
          /* offline — stay on local cache, retry silently next load */
        });
    }
  }, []);

  useEffect(() => {
    if (!cloudEnabled()) return;
    const onFocus = () => {
      offerLetterStore
        .hydrateFromCloud()
        .then((ok) => ok && setLetters(offerLetterStore.list()))
        .catch(() => {});
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const refresh = () => setLetters(offerLetterStore.list());

  const handleBackfill = async () => {
    if (!cloudEnabled()) {
      toast.error("Cloud database not connected — add your Supabase keys and redeploy");
      return;
    }
    if (offerLetterStore.list().length === 0) {
      toast("No offer letters in this browser to sync");
      return;
    }
    try {
      const n = await offerLetterStore.backfillToCloud();
      toast.success(`Synced ${n} offer letter${n > 1 ? "s" : ""} to the cloud database`);
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
        l.position.toLowerCase().includes(q) ||
        l.candidateEmail.toLowerCase().includes(q)
      );
    });
  }, [letters, search, statusFilter]);

  const handleNew = () => setEditing(blankOfferLetter(BRAND));

  const handleSave = (letter: OfferLetterData, isNew: boolean) => {
    const toSave: OfferLetterData = { ...letter };
    if (isNew) {
      toSave.number = offerLetterStore.nextNumber(new Date(letter.issueDate + "T00:00:00"));
    }
    offerLetterStore.save(toSave);
    refresh();
    setEditing(null);
    toast.success(isNew ? `Offer letter ${toSave.number} created` : `Offer letter ${toSave.number} updated`);
  };

  const handleDelete = (letter: OfferLetterData) => {
    if (!window.confirm(`Delete ${letter.number}? This cannot be undone.`)) return;
    offerLetterStore.remove(letter.id);
    refresh();
    toast.success("Offer letter deleted");
  };

  const handleDuplicate = (letter: OfferLetterData) => {
    const copy = offerLetterStore.duplicate(letter.id);
    if (copy) {
      refresh();
      toast.success(`Duplicated as ${copy.number}`);
    }
  };

  const handleExport = () => {
    const blob = new Blob([offerLetterStore.exportJson()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dizigroww-offer-letters-${todayIso()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        offerLetterStore.importJson(String(reader.result || ""));
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
            <h1 className="text-lg font-semibold leading-tight">Offer Letters</h1>
            <p className="text-xs text-slate-500">Enter the role and package, get a ready-to-send PDF offer letter.</p>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="w-4 h-4 mr-1" /> Backup
          </Button>
          <Button variant="outline" size="sm" onClick={handleBackfill} title="Push all offer letters to the cloud database">
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
            <FilePlus2 className="w-4 h-4 mr-1" /> New offer letter
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search by candidate, position, email, letter #"
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
                  <TableHead>Position</TableHead>
                  <TableHead>Package</TableHead>
                  <TableHead>Joining</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-slate-500 py-10">
                      No offer letters yet. Click <span className="font-medium">New offer letter</span> to create your first one.
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
                    <TableCell>{l.position || "—"}</TableCell>
                    <TableCell className="font-medium">
                      {formatPackage(l.packageAmount, l.currency, l.packagePeriod)}
                    </TableCell>
                    <TableCell>{l.joiningDate}</TableCell>
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
        <OfferLetterEditor
          letter={editing}
          isNew={!letters.find((l) => l.id === editing.id)}
          onCancel={() => setEditing(null)}
          onSave={handleSave}
        />
      )}

      {previewing && (
        <OfferLetterPreviewDialog letter={previewing} onClose={() => setPreviewing(null)} />
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
function OfferLetterEditor({
  letter,
  isNew,
  onCancel,
  onSave,
}: {
  letter: OfferLetterData;
  isNew: boolean;
  onCancel: () => void;
  onSave: (letter: OfferLetterData, isNew: boolean) => void;
}) {
  const [draft, setDraft] = useState<OfferLetterData>({ ...letter });

  const update = <K extends keyof OfferLetterData>(k: K, v: OfferLetterData[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  return (
    <Dialog open onOpenChange={(o) => !o && onCancel()}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "New offer letter" : `Edit ${draft.number}`}</DialogTitle>
          <DialogDescription>
            {isNew
              ? `Will be saved as ${draft.number}. Fill in the candidate and role details below.`
              : "Edit and save to update this offer letter."}
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
            <Field label="Position / designation">
              <Input value={draft.position} onChange={(e) => update("position", e.target.value)} placeholder="e.g. Performance Marketing Executive" />
            </Field>
            <Field label="Department (optional)">
              <Input value={draft.department || ""} onChange={(e) => update("department", e.target.value)} placeholder="e.g. Growth Marketing" />
            </Field>
            <Field label="Employment type">
              <Select value={draft.employmentType} onValueChange={(v) => update("employmentType", v as EmploymentType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Work mode">
              <Select value={draft.workMode} onValueChange={(v) => update("workMode", v as WorkMode)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Onsite">Onsite</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Work location" className="md:col-span-2">
              <Input value={draft.workLocation || ""} onChange={(e) => update("workLocation", e.target.value)} placeholder="Office address or 'Remote'" />
            </Field>
          </div>

          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Package amount (CTC)">
              <Input
                type="number"
                min={0}
                step="any"
                value={draft.packageAmount}
                onChange={(e) => update("packageAmount", Number(e.target.value))}
              />
            </Field>
            <Field label="Currency">
              <Select value={draft.currency} onValueChange={(v) => update("currency", v as Currency)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.keys(CURRENCY_SYMBOL).map((c) => (
                    <SelectItem key={c} value={c}>{c} ({CURRENCY_SYMBOL[c as Currency]})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Period">
              <Select value={draft.packagePeriod} onValueChange={(v) => update("packagePeriod", v as PackagePeriod)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="per annum">per annum</SelectItem>
                  <SelectItem value="per month">per month</SelectItem>
                  <SelectItem value="lump sum">lump sum</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="md:col-span-3 text-xs text-slate-500">
              Preview: <span className="font-medium text-slate-700">{formatPackage(draft.packageAmount, draft.currency, draft.packagePeriod)}</span>
            </div>
          </div>

          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            <Field label="Issue date">
              <Input type="date" value={draft.issueDate} onChange={(e) => update("issueDate", e.target.value)} />
            </Field>
            <Field label="Start date (joining date)">
              <Input type="date" value={draft.joiningDate} onChange={(e) => update("joiningDate", e.target.value)} />
            </Field>
            <Field label="End date (optional — for fixed-term / contract roles)">
              <Input type="date" value={draft.endDate || ""} onChange={(e) => update("endDate", e.target.value)} />
            </Field>
            <Field label="Offer valid till (optional)">
              <Input type="date" value={draft.offerValidTill || ""} onChange={(e) => update("offerValidTill", e.target.value)} />
            </Field>
            <Field label="Reporting manager (optional)">
              <Input value={draft.reportingManager || ""} onChange={(e) => update("reportingManager", e.target.value)} placeholder="Name" />
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
          </div>

          <div className="border-t pt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <Field label="Probation period (optional)">
              <Input value={draft.probationPeriod || ""} onChange={(e) => update("probationPeriod", e.target.value)} placeholder="e.g. 3 months" />
            </Field>
            <Field label="Notice period (optional)">
              <Input value={draft.noticePeriod || ""} onChange={(e) => update("noticePeriod", e.target.value)} placeholder="e.g. 30 days" />
            </Field>
          </div>

          <Field label="Additional terms (optional — appears as its own paragraph on the letter)">
            <Textarea
              rows={3}
              value={draft.additionalTerms || ""}
              onChange={(e) => update("additionalTerms", e.target.value)}
              placeholder="e.g. benefits, working hours, confidentiality..."
            />
          </Field>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button onClick={() => onSave(draft, isNew)}>{isNew ? "Create offer letter" : "Save changes"}</Button>
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
function OfferLetterPreviewDialog({ letter, onClose }: { letter: OfferLetterData; onClose: () => void }) {
  const printRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);

  const downloadPdf = async () => {
    const container = printRef.current;
    if (!container) return;
    setBusy(true);
    const pageBreakEl = container.querySelector('[data-pdf-page-break="true"]') as HTMLElement | null;
    const spacerEl = container.querySelector('[data-pdf-spacer="closing"]') as HTMLElement | null;
    const closingEl = container.querySelector('[data-pdf-block="closing"]') as HTMLElement | null;
    try {
      // The PDF is a single rasterized image sliced into A4-height pages by
      // pure pixel position — it has no idea where paragraphs or the
      // signature block are. So before rasterizing, insert invisible
      // spacers to (1) force "Terms and Conditions" to start at the top of
      // page 2, and (2) push the closing/signature block past whatever
      // page boundary it would otherwise be sliced across.
      if (pageBreakEl) pageBreakEl.style.height = "0px";
      if (spacerEl) spacerEl.style.height = "0px";

      const A4_RATIO = 297 / 210; // mm height / width, matches jsPDF's "a4"
      const domPageHeightPx = container.offsetWidth * A4_RATIO;
      const containerTop = () => container.getBoundingClientRect().top;

      if (pageBreakEl) {
        const markerTop = pageBreakEl.getBoundingClientRect().top - containerTop();
        const nextBoundary = Math.ceil(markerTop / domPageHeightPx) * domPageHeightPx;
        pageBreakEl.style.height = `${Math.max(0, Math.ceil(nextBoundary - markerTop))}px`;
      }

      if (spacerEl && closingEl) {
        const blockTop = closingEl.getBoundingClientRect().top - containerTop();
        const blockBottom = closingEl.getBoundingClientRect().bottom - containerTop();
        const startPage = Math.floor(blockTop / domPageHeightPx);
        const endPage = Math.floor((blockBottom - 1) / domPageHeightPx);
        if (startPage !== endPage) {
          const nextPageStart = (startPage + 1) * domPageHeightPx;
          spacerEl.style.height = `${Math.ceil(nextPageStart - blockTop)}px`;
        }
      }

      const canvas = await html2canvas(container, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
      const pdf = new jsPDF("p", "mm", "a4");
      const pageWidthMm = pdf.internal.pageSize.getWidth();
      const pageHeightMm = pdf.internal.pageSize.getHeight();

      // Crop a fresh canvas per page and paste each at y=0 on its own page,
      // instead of re-pasting the same full-height image at a negative
      // offset on every page. The negative-offset approach is what caused
      // the hairline black seam across the page break in the exported
      // PDF — each page reused the identical image, and sub-pixel
      // rounding at the overlap rendered as a dark line in some PDF
      // viewers. Cropping means every page's image data physically ends
      // exactly where that page ends, so there's nothing left to seam.
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
      pdf.save(`${letter.number}-${(letter.candidateName || "offer-letter").replace(/\s+/g, "_")}.pdf`);
    } catch (err) {
      console.error(err);
      toast.error("PDF generation failed");
    } finally {
      if (pageBreakEl) pageBreakEl.style.height = "0px";
      if (spacerEl) spacerEl.style.height = "0px";
      setBusy(false);
    }
  };

  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{letter.number}</DialogTitle>
          <DialogDescription>Preview below — click Download PDF to save a copy for this candidate.</DialogDescription>
        </DialogHeader>

        <div className="border rounded-md overflow-hidden">
          <PrintableOfferLetter letter={letter} ref={printRef} />
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
// Standard terms & conditions — page 2 of the offer letter, generic
// boilerplate (not tied to any one candidate's entered values).
// ----------------------------------------------------------------------------
const STANDARD_CLAUSES: { title: string; body: string }[] = [
  {
    title: "1. Probation & Confirmation",
    body: "You will be on probation from your date of joining for the probation period specified above. During this period, your performance, conduct and suitability for the role will be reviewed, and your employment may be confirmed, the probation period extended, or your services discontinued, at the sole discretion of the Company.",
  },
  {
    title: "2. Working Hours & Attendance",
    body: "You will be required to observe the working hours, holidays, and attendance and leave policies of the Company as communicated to you and as amended from time to time.",
  },
  {
    title: "3. Compensation & Statutory Deductions",
    body: "Your compensation will be paid on a monthly basis and is subject to applicable statutory deductions, including but not limited to Income Tax (TDS), Provident Fund and Professional Tax, as per prevailing law. Compensation is subject to periodic review at the Company's discretion.",
  },
  {
    title: "4. Confidentiality",
    body: "You shall not, either during your employment or after its cessation, disclose to any third party any confidential, proprietary or business-sensitive information belonging to the Company, its clients, partners or employees, except as required in the ordinary course of your duties or by law.",
  },
  {
    title: "5. Code of Conduct",
    body: "You are expected to maintain the highest standards of integrity, professionalism and discipline, and to comply with all Company policies, rules and codes of conduct in force from time to time.",
  },
  {
    title: "6. Notice Period & Termination",
    body: "This employment may be terminated by either party by providing written notice for the notice period specified above, or payment/recovery of salary in lieu thereof. The Company reserves the right to terminate your employment without notice in cases of proven misconduct, breach of policy, or unsatisfactory performance.",
  },
  {
    title: "7. Non-Solicitation",
    body: "During your employment with the Company and for a reasonable period thereafter, you agree not to solicit, for competing business purposes, any employee, client or vendor of the Company with whom you had contact during your employment.",
  },
  {
    title: "8. Leave Policy",
    body: "You will be entitled to leave in accordance with the Company's leave policy applicable to your role and location, details of which will be shared to you separately.",
  },
  {
    title: "9. Background Verification",
    body: "This offer of employment is extended on the basis of the information and documents provided by you, and remains subject to satisfactory verification of your credentials, employment history, and references.",
  },
  {
    title: "10. Governing Law",
    body: "This offer letter and your employment shall be governed by and construed in accordance with the applicable laws of India, and shall be subject to the exclusive jurisdiction of the courts having jurisdiction over the Company's registered office.",
  },
];

// ----------------------------------------------------------------------------
// Printable letter — a standard, formal two-page offer-letter layout on
// DiziGroww letterhead (page 1: role & compensation terms; page 2: terms &
// conditions and signatures). Also what gets rasterized into the PDF.
// ----------------------------------------------------------------------------
const PrintableOfferLetter = React.forwardRef<HTMLDivElement, { letter: OfferLetterData }>(
  ({ letter }, ref) => {
    const firstName = letter.candidateName.trim().split(/\s+/)[0] || "Candidate";
    const dateLabel = formatDateLong(letter.issueDate);
    const joiningLabel = formatDateLong(letter.joiningDate);
    const endLabel = letter.endDate ? formatDateLong(letter.endDate) : "";
    // "Start date" alone for an open-ended role; "Start date — End date" when
    // an end date is set (fixed-term / contract roles).
    const durationLabel = endLabel ? `${joiningLabel} — ${endLabel}` : joiningLabel;
    const validTillLabel = letter.offerValidTill ? formatDateLong(letter.offerValidTill) : "";

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
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: 0.5 }}>OFFER LETTER</div>
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
          Subject: Offer of Employment — {letter.position || "—"}
        </div>

        <div style={{ marginBottom: 14 }}>Dear {firstName},</div>

        <div style={{ marginBottom: 14 }}>
          We are pleased to offer you the position of <strong>{letter.position || "—"}</strong> at {BRAND.name}
          {letter.department ? `, in our ${letter.department} team` : ""}. We were impressed by your skills and
          enthusiasm through the interview process, and we believe you will be a valuable addition to our team.
        </div>

        <div style={{ marginBottom: 10 }}>The key terms of your employment are set out below:</div>

        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: 16 }}>
          <tbody>
            <TermRow label="Position" value={letter.position || "—"} />
            {letter.department && <TermRow label="Department" value={letter.department} />}
            <TermRow label="Employment type" value={letter.employmentType} />
            <TermRow label="Work mode" value={`${letter.workMode}${letter.workLocation ? ` — ${letter.workLocation}` : ""}`} />
            <TermRow label="Compensation (CTC)" value={formatPackage(letter.packageAmount, letter.currency, letter.packagePeriod)} />
            <TermRow label={endLabel ? "Duration" : "Date of joining"} value={durationLabel} />
            {letter.probationPeriod && <TermRow label="Probation period" value={letter.probationPeriod} />}
            {letter.noticePeriod && <TermRow label="Notice period" value={letter.noticePeriod} />}
            {letter.reportingManager && <TermRow label="Reporting manager" value={letter.reportingManager} />}
          </tbody>
        </table>

        {validTillLabel && (
          <div style={{ marginBottom: 14 }}>
            This offer is valid until <strong>{validTillLabel}</strong>. Kindly confirm your acceptance by
            replying to this letter or via email at {BRAND.email} before the validity date.
          </div>
        )}

        {letter.additionalTerms && (
          <div style={{ marginBottom: 14, whiteSpace: "pre-line" }}>{letter.additionalTerms}</div>
        )}

        {/* Forces everything below (Terms & Conditions onward) onto a
            fresh page — see the measurement pass in downloadPdf(). */}
        <div data-pdf-page-break="true" style={{ height: 0 }} />

        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>TERMS AND CONDITIONS</div>
        <div style={{ marginBottom: 16, color: "#64748b" }}>
          This offer of employment is subject to the following standard terms and conditions:
        </div>

        {STANDARD_CLAUSES.map((c) => (
          <div key={c.title} style={{ marginBottom: 12 }}>
            <div style={{ fontWeight: 600, marginBottom: 2 }}>{c.title}</div>
            <div style={{ color: "#334155" }}>{c.body}</div>
          </div>
        ))}

        {/* Kept together on one page — see the measurement pass in
            downloadPdf(), which pushes this whole block past a page break
            rather than letting the signature get sliced across two pages. */}
        <div data-pdf-spacer="closing" style={{ height: 0 }} />
        <div data-pdf-block="closing">
          <div style={{ marginTop: 8, marginBottom: 14 }}>
            We look forward to welcoming you to the {BRAND.name} team. Please sign and return a copy of
            this letter, along with the acceptance section below, as confirmation of your acceptance of
            the above terms and conditions.
          </div>

          <div style={{ marginBottom: 32 }}>Congratulations, and welcome aboard!</div>

          <div style={{ marginBottom: 40 }}>Sincerely,</div>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", minHeight: 100, marginBottom: 28 }}>
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

          <div style={{ borderTop: "1px dashed #cbd5e1", paddingTop: 16 }}>
            <div style={{ fontWeight: 600, marginBottom: 10 }}>Acceptance of Offer</div>
            <div style={{ marginBottom: 24, color: "#334155" }}>
              I, {letter.candidateName || "____________________"}, have read and understood the above
              terms and conditions of employment and hereby accept this offer.
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", gap: 40 }}>
              <div style={{ flex: 1, borderTop: "1px solid #0f172a", paddingTop: 6 }}>
                <div style={{ fontSize: 10, color: "#64748b" }}>Candidate Signature</div>
              </div>
              <div style={{ flex: 1, borderTop: "1px solid #0f172a", paddingTop: 6 }}>
                <div style={{ fontSize: 10, color: "#64748b" }}>Date</div>
              </div>
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
PrintableOfferLetter.displayName = "PrintableOfferLetter";

function TermRow({ label, value }: { label: string; value: string }) {
  return (
    <tr>
      <td style={{ padding: "4px 10px 4px 0", color: "#64748b", width: 190, verticalAlign: "top" }}>{label}</td>
      <td style={{ padding: "4px 0", fontWeight: 500 }}>{value}</td>
    </tr>
  );
}
