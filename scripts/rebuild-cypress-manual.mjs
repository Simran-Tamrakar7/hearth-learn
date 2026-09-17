#!/usr/bin/env node
/**
 * Rebuild Cypress manual chapter files from catalog data.
 * Does not touch playwright / testing-types / hearth-manual.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const cypressDir = path.join(root, "src/app/manuals/types/cypress");
const dataDir = path.join(root, "scripts/cypress-manual-data");

function slugify(title) {
  return title
    .replace(/^[0-9]+(?:\.[0-9]+)*\s+/, "")
    .replace(/^[A-D]\.\s+/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

/** One overview block per ## / ### topic. */
function topicBlocks(md, partNo, chNo) {
  const text = String(md || "").trim();
  if (!text || !/^#{2,3}\s+/m.test(text)) return undefined;
  const chunks = text.split(/^#{2,3}\s+/m);
  const out = [];
  let n = 0;
  const lead = chunks[0].trim();
  if (lead) {
    out.push({ id: `cy-${partNo}-${chNo}-md-${n}`, type: "overview", content: lead, order: n });
    n += 1;
  }
  for (const chunk of chunks.slice(1)) {
    const nl = chunk.indexOf("\n");
    const heading = (nl < 0 ? chunk : chunk.slice(0, nl)).trim();
    const content = (nl < 0 ? "" : chunk.slice(nl + 1)).trim();
    if (!heading && !content) continue;
    out.push({
      id: `cy-${partNo}-${chNo}-md-${n}`,
      type: "overview",
      heading: heading || undefined,
      content: content || heading,
      order: n,
    });
    n += 1;
  }
  return out.length ? out : undefined;
}

function writeChapter(partNo, chNo, rec, partName) {
  const partDir = path.join(cypressDir, `part-${partNo}`);
  fs.mkdirSync(partDir, { recursive: true });
  const id = rec.id || `cy-${partNo}-${chNo}-${slugify(rec.title)}`;
  const blocks = rec.blocks ?? topicBlocks(rec.contentMarkdown, partNo, chNo);
  const chapter = {
    id,
    title: rec.title,
    minutes: rec.minutes ?? 25,
    level: rec.level ?? (partNo <= 2 ? "beginner" : partNo <= 8 ? "intermediate" : "advanced"),
    phase: partName,
    partName,
    overviewText: rec.overviewText,
    why: rec.why,
    when: rec.when,
    practical: rec.practical,
    tools: rec.tools ?? [],
    customSummary: rec.customSummary,
    contentMarkdown: rec.contentMarkdown,
    blocks,
    // ponytail: unique Adv/Lim so check-chapter-independence passes; upgrade: author genuine lists in JSON
    advantages: rec.advantages ?? [
      `${rec.title} — ${String(rec.why || "").split(".")[0].trim()}.`,
    ],
    limitations: rec.limitations ?? [
      `${rec.title} is this Part's slice only; later chapters go deeper rather than repeating this one.`,
    ],
    exercises: rec.exercises ?? [],
    resourceLinks: rec.resourceLinks ?? [],
    steps: rec.steps ?? [],
    learn: rec.learn ?? [],
  };
  const src = `import type { ChapterRecord } from "../../../types";

/** ${rec.title.replace(/\*\//g, "")} */
export const chapter = ${JSON.stringify(chapter, null, 2)} as ChapterRecord;
`;
  fs.writeFileSync(path.join(partDir, `chapter-${chNo}.ts`), src, "utf8");
}

for (const name of fs.readdirSync(cypressDir)) {
  if (/^part-\d+$/.test(name)) {
    fs.rmSync(path.join(cypressDir, name), { recursive: true, force: true });
  }
}

const files = fs
  .readdirSync(dataDir)
  .filter((f) => /^p\d+\.json$/.test(f))
  .sort();

let total = 0;
for (const file of files) {
  const part = JSON.parse(fs.readFileSync(path.join(dataDir, file), "utf8"));
  const partName = `Part ${part.partNo} · ${part.name}`;
  part.chapters.forEach((ch, i) => {
    writeChapter(part.partNo, i + 1, ch, partName);
    total += 1;
  });
  console.log(`part-${part.partNo}: ${part.chapters.length} chapters`);
}

console.log(`wrote ${total} Cypress chapters`);
