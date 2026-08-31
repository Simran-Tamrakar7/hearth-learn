import assert from "node:assert/strict";
import { chapterBodyForExport, buildManualExportSections } from "./manualExport.ts";
import type { ManualChapter } from "./manualsData.ts";

const ch: ManualChapter = {
  id: "t",
  order: 1,
  slug: "t",
  title: "Unit Testing",
  estimatedMinutes: 10,
  overviewText: "Overview here.",
  why: "Because bugs.",
  contentMarkdown: "## Section\n\nBody text.",
  tools: [{ name: "JUnit", sub: "Java", desc: "Framework", adv: ["Fast"], lim: ["Java only"] }],
  exercises: [],
  resourceLinks: [],
};

const body = chapterBodyForExport(ch);
assert.ok(body.includes("Overview here."));
assert.ok(body.includes("Because bugs."));
assert.ok(body.includes("## Section"));
assert.ok(body.includes("JUnit"));

const sections = buildManualExportSections({
  title: "Test Manual",
  chapters: [
    ch,
    { ...ch, id: "sub", parentId: "t", title: "Nested", slug: "sub-1", contentMarkdown: "Nested body." },
  ],
});
assert.equal(sections[0].chapters.length, 2);
assert.ok(sections[0].chapters[1].body.includes("Nested body."));

console.log("manualExport.check: ok");
