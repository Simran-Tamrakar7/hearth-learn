import type { ManualChapter, ManualItem } from "./manualsData";
import { groupChaptersIntoParts } from "./manualParts";
import { isTestingTypesSlug } from "@/app/manuals/_ui/TestingTypesGuide";

function groupTitle(index: number, name: string) {
  return `Part ${index + 1} · ${name}`;
}

export type ExportSection = {
  partTitle: string;
  chapters: { title: string; body: string; isSubchapter?: boolean }[];
};

/** Testing Types chapters already carry full fields from MD frontmatter — pass through. */
export function prepareManualForExport(
  manual: Pick<ManualItem, "title" | "description" | "chapters">,
  slug: string
): Pick<ManualItem, "title" | "description" | "chapters"> {
  const testing =
    slug === "testing-types" ||
    slug === "testing-types-manual" ||
    isTestingTypesSlug(slug);
  if (!testing) return manual;
  return manual;
}

async function loadHtml2Pdf(): Promise<(opts?: object) => { set: (o: object) => unknown; from: (el: HTMLElement) => { save: () => Promise<void> } }> {
  const mod = await import("html2pdf.js");
  const fn = mod.default ?? mod;
  if (typeof fn !== "function") {
    throw new Error("PDF library failed to load");
  }
  return fn as (opts?: object) => {
    set: (o: object) => unknown;
    from: (el: HTMLElement) => { save: () => Promise<void> };
  };
}

async function loadSaveAs() {
  const mod = await import("file-saver");
  const saveAs = mod.saveAs ?? (mod as { default?: { saveAs?: (b: Blob, n: string) => void } }).default?.saveAs;
  if (!saveAs) throw new Error("Download helper failed to load");
  return saveAs;
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
  .export-chapter { margin-bottom: 1.5rem; page-break-inside: avoid; }
`;

export function buildManualExportHtml(manual: Pick<ManualItem, "title" | "description" | "chapters">) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>${escapeHtml(manual.title)}</title>
<style>${EXPORT_CSS}</style></head><body>
${buildManualExportInnerHtml(manual)}
</body></html>`;
}

export async function downloadManualDocx(
  manual: Pick<ManualItem, "title" | "chapters">,
  filename: string,
  slug = ""
) {
  const ready = prepareManualForExport(manual, slug);
  const { Document, Packer, Paragraph, HeadingLevel, TextRun } = await import("docx");
  const saveAs = await loadSaveAs();
  const sections = buildManualExportSections(ready);
  const children: InstanceType<typeof Paragraph>[] = [
    new Paragraph({ text: ready.title, heading: HeadingLevel.TITLE }),
  ];
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
  saveAs(blob, filename);
}

export async function downloadManualPdf(
  manual: Pick<ManualItem, "title" | "description" | "chapters">,
  filename: string,
  slug = ""
) {
  const ready = prepareManualForExport(manual, slug);
  const html2pdf = await loadHtml2Pdf();
  const html = buildManualExportHtml(ready);

  const iframe = document.createElement("iframe");
  iframe.setAttribute("aria-hidden", "true");
  iframe.style.cssText =
    "position:fixed;left:-10000px;top:0;width:720px;height:100vh;border:0;opacity:1;background:#fff;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument;
  if (!doc) {
    document.body.removeChild(iframe);
    throw new Error("Could not create print frame");
  }
  doc.open();
  doc.write(html);
  doc.close();

  await new Promise<void>((resolve) => {
    iframe.onload = () => resolve();
    setTimeout(resolve, 300);
  });

  try {
    await html2pdf()
      .set({
        margin: 12,
        filename,
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
        html2canvas: { scale: 1.25, useCORS: true, logging: false, scrollY: 0 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      })
      .from(doc.body)
      .save();
  } finally {
    document.body.removeChild(iframe);
  }
}

export function openManualPrintView(
  manual: Pick<ManualItem, "title" | "description" | "chapters">,
  slug = ""
) {
  const ready = prepareManualForExport(manual, slug);
  const html = buildManualExportHtml(ready);
  const w = window.open("", "_blank");
  if (!w) return false;
  w.document.write(html);
  w.document.close();
  w.focus();
  window.setTimeout(() => {
    try {
      w.print();
    } catch {
      /* print may be blocked until user focuses tab */
    }
  }, 400);
  return true;
}
