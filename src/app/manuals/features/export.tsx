"use client";

import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, FileDown, FileText, Printer } from "lucide-react";
import type { ManualChapter, ManualItem } from "@/app/manuals/types";
import { groupChaptersIntoParts } from "@/app/manuals/features/reader";
import { useToast } from "@/components/ui/Toast";

function groupTitle(index: number, name: string) {
  return `Part ${index + 1} · ${name}`;
}

export type ExportSection = {
  partTitle: string;
  chapters: { title: string; body: string; isSubchapter?: boolean }[];
};

/** Catalog chapters already carry full fields — pass through. */
export function prepareManualForExport(
  manual: Pick<ManualItem, "title" | "description" | "chapters">,
  _slug = ""
): Pick<ManualItem, "title" | "description" | "chapters"> {
  return manual;
}

function practicalBlock(p: NonNullable<ManualChapter["practical"]>) {
  const lines = [`**${p.app}** — ${p.scenario}`];
  if (p.fail) lines.push(`Fail: ${p.fail}`);
  if (p.pass) lines.push(`Pass: ${p.pass}`);
  if (p.value) lines.push(`Value: ${p.value}`);
  return lines.join("\n\n");
}

function toolsBlock(tools: NonNullable<ManualChapter["tools"]>) {
  return tools
    .map((t) => {
      const bits = [`### ${t.name}${t.sub ? ` (${t.sub})` : ""}`, t.desc];
      if (t.adv?.length) bits.push("Advantages:\n" + t.adv.map((a) => `- ${a}`).join("\n"));
      if (t.lim?.length) bits.push("Limitations:\n" + t.lim.map((l) => `- ${l}`).join("\n"));
      if (t.steps?.length) {
        for (const s of t.steps) {
          bits.push(`**${s.t}**${s.p ? `\n${s.p}` : ""}${s.c ? `\n\`\`\`\n${s.c}\n\`\`\`` : ""}`);
        }
      }
      return bits.join("\n\n");
    })
    .join("\n\n---\n\n");
}

/** Plain-text export body for one chapter — MD frontmatter fields + markdown body. */
export function chapterBodyForExport(ch: ManualChapter): string {
  const parts: string[] = [];
  if (ch.overviewText?.trim()) parts.push(ch.overviewText.trim());
  if (ch.why?.trim()) parts.push(`**Why it matters**\n\n${ch.why.trim()}`);
  if (ch.when?.trim()) parts.push(`**When to use it**\n\n${ch.when.trim()}`);
  if (ch.practical) parts.push(`**Practical example**\n\n${practicalBlock(ch.practical)}`);
  if (ch.advantages?.length) parts.push(`**Advantages**\n\n${ch.advantages.map((a) => `- ${a}`).join("\n")}`);
  if (ch.limitations?.length) parts.push(`**Limitations**\n\n${ch.limitations.map((l) => `- ${l}`).join("\n")}`);
  if (ch.contentMarkdown?.trim()) parts.push(ch.contentMarkdown.trim());
  if (ch.customSummary?.trim()) parts.push(ch.customSummary.trim());
  if (ch.exercises?.length) {
    const quiz = ch.exercises
      .filter((ex) => ex.prompt.trim())
      .map((ex, i) => `**Activity ${i + 1}:** ${ex.prompt.trim()}${ex.solutionCode.trim() ? `\n*Answer:* ${ex.solutionCode.trim()}` : ""}`)
      .join("\n\n");
    if (quiz) parts.push(`**Quiz & Activities**\n\n${quiz}`);
  }
  if (ch.tools?.length) parts.push(`**Tools**\n\n${toolsBlock(ch.tools)}`);
  if (ch.codeSnippet?.trim()) parts.push("```\n" + ch.codeSnippet.trim() + "\n```");
  if (ch.sections?.length) {
    for (const s of ch.sections) parts.push(`**${s.title}**\n\n${s.body}`);
  }
  const joined = parts.join("\n\n");
  return joined || ch.title;
}

export function buildManualExportSections(manual: Pick<ManualItem, "title" | "chapters">): ExportSection[] {
  const groups = groupChaptersIntoParts(manual.chapters);
  return groups.map((g) => ({
    partTitle: groupTitle(g.index, g.name),
    chapters: g.chapterIndices
      .map((i) => manual.chapters[i])
      .filter((ch): ch is ManualChapter => Boolean(ch))
      .map((ch) => ({
        title: ch.parentId ? `↳ ${ch.title}` : ch.title,
        body: chapterBodyForExport(ch),
        isSubchapter: Boolean(ch.parentId),
      })),
  }));
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function mdToSimpleHtml(md: string) {
  const lines = md.split("\n");
  const out: string[] = [];
  let inPre = false;
  for (const line of lines) {
    if (line.startsWith("```")) {
      inPre = !inPre;
      if (inPre) out.push("<pre><code>");
      else out.push("</code></pre>");
      continue;
    }
    if (inPre) {
      out.push(escapeHtml(line));
      continue;
    }
    if (/^#{1,3}\s+/.test(line)) {
      const lvl = line.match(/^#+/)![0].length;
      const text = line.replace(/^#+\s+/, "");
      out.push(`<h${Math.min(lvl + 2, 4)}>${escapeHtml(text)}</h${Math.min(lvl + 2, 4)}>`);
    } else if (/^\*\*(.+)\*\*$/.test(line.trim())) {
      out.push(`<p><strong>${escapeHtml(line.trim().slice(2, -2))}</strong></p>`);
    } else if (line.trim() === "") {
      out.push("<br/>");
    } else {
      out.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  return out.join("\n");
}

function buildManualExportInnerHtml(manual: Pick<ManualItem, "title" | "description" | "chapters">) {
  const sections = buildManualExportSections(manual);
  const body = sections
    .map(
      (s) =>
        `<section class="export-part"><h1>${escapeHtml(s.partTitle)}</h1>${s.chapters
          .map(
            (c) =>
              `<article class="export-chapter${c.isSubchapter ? " export-sub" : ""}"><h2>${escapeHtml(c.title)}</h2><div class="export-body">${mdToSimpleHtml(c.body)}</div></article>`
          )
          .join("")}</section>`
    )
    .join("");
  return `<header><h1 class="export-title">${escapeHtml(manual.title)}</h1>
<p class="export-desc">${escapeHtml(manual.description || "")}</p></header>
${body}`;
}

const EXPORT_CSS = `
  @page { margin: 2cm; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; line-height: 1.55; max-width: 720px; margin: 0 auto; padding: 1rem; }
  .export-title { font-size: 1.75rem; page-break-before: avoid; margin: 0 0 0.5rem; }
  .export-desc { color: #555; margin: 0 0 1.5rem; }
  h1 { font-size: 1.35rem; margin: 2rem 0 0.75rem; page-break-before: always; }
  h1:first-of-type { page-break-before: avoid; }
  h2 { font-size: 1.1rem; margin: 1.25rem 0 0.5rem; color: #333; }
  .export-sub h2 { font-size: 1rem; margin-left: 1rem; color: #444; }
  p { margin: 0.4rem 0; }
  pre { background: #f4f4f4; padding: 0.75rem; overflow-x: auto; font-size: 0.8rem; border-radius: 4px; white-space: pre-wrap; }
  .export-chapter { margin-bottom: 1.5rem; }
`;

export function buildManualExportHtml(manual: Pick<ManualItem, "title" | "description" | "chapters">) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${escapeHtml(manual.title)}</title>
<style>${EXPORT_CSS}</style></head><body>
${buildManualExportInnerHtml(manual)}
</body></html>`;
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function pdfEscape(s: string) {
  return s.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function toWinAnsi(s: string) {
  return s
    .replace(/\u2018|\u2019|\u201A/g, "'")
    .replace(/\u201C|\u201D|\u201E/g, '"')
    .replace(/\u2013|\u2014|\u2212/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\u00A0/g, " ")
    .replace(/\u2192/g, "->")
    .replace(/[^\t\n\r\x20-\x7E]/g, "?");
}

function wrapWords(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (!words.length) return [""];
  const lines: string[] = [];
  let cur = "";
  for (const w of words) {
    if (w.length > maxChars) {
      if (cur) {
        lines.push(cur);
        cur = "";
      }
      for (let i = 0; i < w.length; i += maxChars) lines.push(w.slice(i, i + maxChars));
      continue;
    }
    const next = cur ? `${cur} ${w}` : w;
    if (next.length > maxChars) {
      lines.push(cur);
      cur = w;
    } else {
      cur = next;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

type PdfLine = { text: string; size: number };

function maxCharsFor(size: number) {
  return Math.max(24, Math.floor(487 / (size * 0.5)));
}

function pushWrapped(out: PdfLine[], text: string, size: number) {
  const clean = toWinAnsi(text);
  for (const chunk of clean.split("\n")) {
    for (const w of wrapWords(chunk, maxCharsFor(size))) out.push({ text: w, size });
  }
}

function collectPdfLines(manual: Pick<ManualItem, "title" | "description" | "chapters">): PdfLine[] {
  const lines: PdfLine[] = [];
  pushWrapped(lines, manual.title, 18);
  lines.push({ text: "", size: 11 });
  if (manual.description?.trim()) {
    pushWrapped(lines, manual.description.trim(), 11);
    lines.push({ text: "", size: 11 });
  }
  for (const part of buildManualExportSections(manual)) {
    lines.push({ text: "", size: 11 });
    pushWrapped(lines, part.partTitle, 14);
    for (const ch of part.chapters) {
      lines.push({ text: "", size: 11 });
      pushWrapped(lines, ch.title, 12);
      pushWrapped(lines, ch.body, 11);
    }
  }
  return lines;
}

/** Text PDF (Helvetica). html2pdf/html2canvas dies on long manuals — canvas height cap. */
export function buildManualPdfBytes(manual: Pick<ManualItem, "title" | "description" | "chapters">): Uint8Array {
  const PAGE_W = 595.28;
  const PAGE_H = 841.89;
  const MARGIN = 54;
  const usable = PAGE_H - MARGIN * 2;
  const all = collectPdfLines(manual);
  const pages: PdfLine[][] = [];
  let page: PdfLine[] = [];
  let used = 0;
  const gap = (size: number) => size + 4;
  for (const line of all) {
    const h = gap(line.size);
    if (page.length && used + h > usable) {
      pages.push(page);
      page = [];
      used = 0;
    }
    page.push(line);
    used += h;
  }
  if (page.length) pages.push(page);
  if (!pages.length) pages.push([{ text: manual.title || "Manual", size: 12 }]);

  const encoder = new TextEncoder();
  const chunks: Uint8Array[] = [];
  let pos = 0;
  const write = (s: string) => {
    const b = encoder.encode(s);
    chunks.push(b);
    pos += b.length;
  };
  const offsets = [0];
  const addObj = (body: string) => {
    offsets.push(pos);
    write(`${offsets.length - 1} 0 obj\n${body}\nendobj\n`);
  };

  write("%PDF-1.4\n");
  addObj("<< /Type /Catalog /Pages 2 0 R >>");
  const pageCount = pages.length;
  const pageObjNums = pages.map((_, i) => 4 + i * 2);
  addObj(`<< /Type /Pages /Kids [${pageObjNums.map((n) => `${n} 0 R`).join(" ")}] /Count ${pageCount} >>`);
  addObj("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");

  for (const lines of pages) {
    let stream = "BT\n/F1 11 Tf\n";
    let y = PAGE_H - MARGIN;
    let curSize = 11;
    for (const line of lines) {
      if (line.size !== curSize) {
        stream += `/F1 ${line.size} Tf\n`;
        curSize = line.size;
      }
      y -= gap(line.size);
      stream += `1 0 0 1 ${MARGIN.toFixed(2)} ${y.toFixed(2)} Tm\n(${pdfEscape(line.text)}) Tj\n`;
    }
    stream += "ET\n";
    const streamBytes = encoder.encode(stream);
    addObj(
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Contents ${offsets.length + 1} 0 R /Resources << /Font << /F1 3 0 R >> >> >>`
    );
    offsets.push(pos);
    write(`${offsets.length - 1} 0 obj\n<< /Length ${streamBytes.length} >>\nstream\n`);
    chunks.push(streamBytes);
    pos += streamBytes.length;
    write("\nendstream\nendobj\n");
  }

  const xrefAt = pos;
  write(`xref\n0 ${offsets.length}\n`);
  write("0000000000 65535 f \n");
  for (let i = 1; i < offsets.length; i++) {
    write(`${String(offsets[i]).padStart(10, "0")} 00000 n \n`);
  }
  write(`trailer\n<< /Size ${offsets.length} /Root 1 0 R >>\nstartxref\n${xrefAt}\n%%EOF\n`);

  const out = new Uint8Array(pos);
  let o = 0;
  for (const c of chunks) {
    out.set(c, o);
    o += c.length;
  }
  return out;
}

export async function downloadManualDocx(
  manual: Pick<ManualItem, "title" | "chapters"> & { description?: string },
  filename: string,
  slug = ""
) {
  const ready = prepareManualForExport({ description: manual.description ?? "", ...manual }, slug);
  const { Document, Packer, Paragraph, HeadingLevel, TextRun } = await import("docx");
  const sections = buildManualExportSections(ready);
  const children: InstanceType<typeof Paragraph>[] = [new Paragraph({ text: ready.title, heading: HeadingLevel.TITLE })];
  for (const part of sections) {
    children.push(new Paragraph({ text: part.partTitle, heading: HeadingLevel.HEADING_1 }));
    for (const ch of part.chapters) {
      children.push(
        new Paragraph({
          text: ch.title,
          heading: ch.isSubchapter ? HeadingLevel.HEADING_3 : HeadingLevel.HEADING_2,
        })
      );
      for (const para of ch.body.split(/\n{2,}/).filter(Boolean)) {
        const text = para.replace(/\n/g, " ").slice(0, 12000);
        children.push(new Paragraph({ children: [new TextRun(text)] }));
      }
    }
  }
  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  saveBlob(blob, filename);
}

export async function downloadManualPdf(
  manual: Pick<ManualItem, "title" | "description" | "chapters">,
  filename: string,
  slug = ""
) {
  const ready = prepareManualForExport(manual, slug);
  const bytes = buildManualPdfBytes(ready);
  saveBlob(new Blob([bytes], { type: "application/pdf" }), filename);
}

export function openManualPrintView(
  manual: Pick<ManualItem, "title" | "description" | "chapters">,
  slug = ""
) {
  const ready = prepareManualForExport(manual, slug);
  const html = buildManualExportHtml(ready);
  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0;";
  document.body.appendChild(iframe);
  const doc = iframe.contentDocument;
  if (!doc) {
    iframe.remove();
    return false;
  }
  doc.open();
  doc.write(html);
  doc.close();
  window.setTimeout(() => {
    try {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
    } catch {
      /* user can print from the dialog if it opened */
    }
    window.setTimeout(() => iframe.remove(), 60_000);
  }, 400);
  return true;
}

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
      const base = slug.replace(/[^a-z0-9-]+/gi, "-") || "manual";
      if (kind === "pdf") {
        await downloadManualPdf(manual, `${base}.pdf`, slug);
        toast({ type: "success", title: "Downloaded", description: `${base}.pdf saved.` });
      } else if (kind === "docx") {
        await downloadManualDocx(manual, `${base}.docx`, slug);
        toast({ type: "success", title: "Downloaded", description: `${base}.docx saved.` });
      } else {
        const opened = openManualPrintView(manual, slug);
        if (!opened) {
          toast({
            type: "error",
            title: "Print failed",
            description: "Could not open the print view. Try Download as PDF instead.",
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
