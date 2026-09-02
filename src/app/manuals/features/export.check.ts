import assert from "node:assert/strict";
import {
  buildManualExportHtml,
  buildManualExportSections,
  buildManualPdfBytes,
  chapterBodyForExport,
} from "./export.tsx";
import { findHearthManual } from "./reader.tsx";
import type { ManualChapter, ManualItem } from "@/app/manuals/types";

const ch = (partial: Partial<ManualChapter> & Pick<ManualChapter, "id" | "title">): ManualChapter => ({
  order: 1,
  slug: partial.id,
  estimatedMinutes: 10,
  contentMarkdown: "",
  ...partial,
});

const sample: Pick<ManualItem, "title" | "description" | "chapters"> = {
  title: "Hearth — Repository Manual",
  description: "Export smoke test",
  chapters: [
    ch({
      id: "a",
      title: "1.1 What Hearth Is",
      subtitle: "Part 1 · Overview",
      overviewText: "Study cabin for technical learning.",
      contentMarkdown: "Playwright, Testing Types, Cypress, and this manual.",
    }),
    ch({
      id: "b",
      order: 2,
      title: "4.1 Manuals",
      subtitle: "Part 4 · Features",
      why: "Readers need a file, not a screenshot.",
      contentMarkdown: "Export PDF/DOCX/Print from the reader header.",
    }),
  ],
};

const body = chapterBodyForExport(sample.chapters[0]);
assert.match(body, /Study cabin/);
assert.match(body, /Cypress/);

const sections = buildManualExportSections(sample);
assert.equal(sections.length >= 2, true);
assert.equal(sections.some((s) => s.chapters.some((c) => c.body.includes("file, not a screenshot"))), true);

const html = buildManualExportHtml(sample);
assert.match(html, /Hearth — Repository Manual/);
assert.match(html, /<!DOCTYPE html>/);

const pdf = buildManualPdfBytes(sample);
const ascii = Buffer.from(pdf).toString("latin1");
assert.equal(ascii.slice(0, 5), "%PDF-");
assert.match(ascii, /%%EOF/);
assert.match(ascii, /Helvetica/);
assert.match(ascii, /Hearth/);
assert.equal(pdf.length > 500, true);

const manyChapters: ManualChapter[] = Array.from({ length: 80 }, (_, i) =>
  ch({
    id: `c${i}`,
    order: i + 1,
    title: `Chapter ${i + 1}`,
    subtitle: `Part ${Math.floor(i / 10) + 1}`,
    contentMarkdown: `Body for chapter ${i + 1}. `.repeat(40),
  })
);
const big = buildManualPdfBytes({ title: "Long manual", description: "", chapters: manyChapters });
assert.equal(Buffer.from(big).toString("latin1").slice(0, 5), "%PDF-");
assert.equal(big.length > 8000, true);

const live = findHearthManual("hearth-manual");
assert.ok(live, "hearth-manual must be in the catalog");
assert.equal(live.chapters.length >= 40, true);
const livePdf = buildManualPdfBytes(live);
assert.equal(Buffer.from(livePdf).toString("latin1").slice(0, 5), "%PDF-");
assert.match(chapterBodyForExport(live.chapters[0]), /Cypress/);

console.log("export.check: ok");
