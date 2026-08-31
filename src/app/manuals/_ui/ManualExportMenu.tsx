"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, FileDown, FileText, Printer } from "lucide-react";
import type { ManualItem } from "@/app/manuals/_lib/manualsData";
import { downloadManualDocx, downloadManualPdf, openManualPrintView } from "@/app/manuals/_lib/manualExport";
import { useToast } from "@/components/ui/Toast";

type ExportKind = "pdf" | "docx" | "print";

export function ManualExportMenu({ manual, slug }: { manual: ManualItem; slug: string }) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<ExportKind | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const run = async (kind: ExportKind) => {
    if (!manual.chapters?.length) {
      toast({ type: "error", title: "Nothing to export", description: "This manual has no chapters yet." });
      return;
    }
    setBusy(kind);
    try {
      const base = slug.replace(/[^a-z0-9-]+/gi, "-");
      if (kind === "pdf") await downloadManualPdf(manual, `${base}.pdf`, slug);
      else if (kind === "docx") await downloadManualDocx(manual, `${base}.docx`, slug);
      else {
        const opened = openManualPrintView(manual, slug);
        if (!opened) {
          toast({
            type: "error",
            title: "Pop-up blocked",
            description: "Allow pop-ups for this site to open the print view.",
          });
          return;
        }
      }
      setOpen(false);
    } catch (err) {
      console.error("Manual export failed:", err);
      toast({
        type: "error",
        title: "Export failed",
        description: err instanceof Error ? err.message : "Could not generate the file. Try Print instead.",
      });
    } finally {
      setBusy(null);
    }
  };

  const items: { kind: ExportKind; label: string; icon: React.ReactNode }[] = [
    { kind: "pdf", label: "Download as PDF", icon: <FileDown className="w-3.5 h-3.5" /> },
    { kind: "docx", label: "Download as Docs (.docx)", icon: <FileText className="w-3.5 h-3.5" /> },
    { kind: "print", label: "Print", icon: <Printer className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-1.5 rounded-lg border border-[#E7E0D3] bg-white text-[#1C2A26] hover:border-[#D97706]"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        Export
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 z-50 min-w-[200px] rounded-xl border border-[#E7E0D3] bg-white shadow-lg py-1"
        >
          {items.map((item) => (
            <button
              key={item.kind}
              type="button"
              role="menuitem"
              disabled={busy !== null}
              onClick={() => void run(item.kind)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-xs font-semibold text-[#1C2A26] hover:bg-[#FAF7F2] disabled:opacity-50"
            >
              {item.icon}
              <span>{busy === item.kind ? "Generating…" : item.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
