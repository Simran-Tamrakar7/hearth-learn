import type { ManualChapter, ManualItem } from "./manualsData";
import { groupChaptersIntoParts } from "./manualParts";

function groupTitle(index: number, name: string) {
  return `Part ${index + 1} · ${name}`;
}

export type ExportSection = {
  partTitle: string;
  chapters: { title: string; body: string }[];
};

export function buildManualExportSections(manual: Pick<ManualItem, "title" | "chapters">): ExportSection[] {
  const groups = groupChaptersIntoParts(manual.chapters);
  return groups.map((g) => ({
    partTitle: groupTitle(g.index, g.name),
    chapters: g.chapterIndices
      .map((i) => manual.chapters[i])
      .filter((ch): ch is ManualChapter => Boolean(ch) && !ch.parentId)
      .map((ch) => ({
        title: ch.title,
        body: ch.contentMarkdown || "",
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
    } else if (line.trim() === "") {
      out.push("<br/>");
    } else {
      out.push(`<p>${escapeHtml(line)}</p>`);
    }
  }
  return out.join("\n");
}

export function buildManualExportHtml(manual: Pick<ManualItem, "title" | "description" | "chapters">) {
  const sections = buildManualExportSections(manual);
  const body = sections
    .map(
      (s) =>
        `<section class="export-part"><h1>${escapeHtml(s.partTitle)}</h1>${s.chapters
          .map(
            (c) =>
              `<article class="export-chapter"><h2>${escapeHtml(c.title)}</h2><div class="export-body">${mdToSimpleHtml(c.body)}</div></article>`
          )
          .join("")}</section>`
    )
    .join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${escapeHtml(manual.title)}</title>
<style>
  @page { margin: 2cm; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #1a1a1a; line-height: 1.55; max-width: 720px; margin: 0 auto; padding: 1rem; }
  h1 { font-size: 1.35rem; margin: 2rem 0 0.75rem; page-break-before: always; }
  h1:first-of-type { page-break-before: avoid; }
  h2 { font-size: 1.1rem; margin: 1.25rem 0 0.5rem; color: #333; }
  p { margin: 0.4rem 0; }
  pre { background: #f4f4f4; padding: 0.75rem; overflow-x: auto; font-size: 0.8rem; border-radius: 4px; }
  .export-chapter { margin-bottom: 1.5rem; page-break-inside: avoid; }
</style></head><body>
<header><h1 style="page-break-before:avoid;font-size:1.75rem">${escapeHtml(manual.title)}</h1>
<p style="color:#555">${escapeHtml(manual.description || "")}</p></header>
${body}
</body></html>`;
}

export async function downloadManualDocx(manual: Pick<ManualItem, "title" | "chapters">, filename: string) {
  const { Document, Packer, Paragraph, HeadingLevel, TextRun } = await import("docx");
  const { saveAs } = await import("file-saver");
  const sections = buildManualExportSections(manual);
  const children: InstanceType<typeof Paragraph>[] = [
    new Paragraph({ text: manual.title, heading: HeadingLevel.TITLE }),
  ];
  for (const part of sections) {
    children.push(new Paragraph({ text: part.partTitle, heading: HeadingLevel.HEADING_1 }));
    for (const ch of part.chapters) {
      children.push(new Paragraph({ text: ch.title, heading: HeadingLevel.HEADING_2 }));
      for (const para of ch.body.split(/\n{2,}/).filter(Boolean)) {
        children.push(new Paragraph({ children: [new TextRun(para.replace(/\n/g, " "))] }));
      }
    }
  }
  const doc = new Document({ sections: [{ children }] });
  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename);
}

export async function downloadManualPdf(manual: Pick<ManualItem, "title" | "description" | "chapters">, filename: string) {
  const html2pdf = (await import("html2pdf.js")).default;
  const wrapper = document.createElement("div");
  wrapper.innerHTML = buildManualExportHtml(manual);
  wrapper.style.position = "fixed";
  wrapper.style.left = "-9999px";
  document.body.appendChild(wrapper);
  try {
    await html2pdf()
      .set({
        margin: 15,
        filename,
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(wrapper)
      .save();
  } finally {
    document.body.removeChild(wrapper);
  }
}

export function openManualPrintView(manual: Pick<ManualItem, "title" | "description" | "chapters">) {
  const html = buildManualExportHtml(manual);
  const w = window.open("", "_blank", "noopener,noreferrer");
  if (!w) return;
  w.document.write(html);
  w.document.close();
  w.focus();
  w.onload = () => w.print();
}
