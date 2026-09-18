#!/usr/bin/env node
/**
 * Rebuild JMeter manual chapter files from catalog data.
 * Does not touch playwright / cypress / testing-types / hearth-manual.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { topicBlocks as buildTopicBlocks } from "./topic-blocks.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const jmeterDir = path.join(root, "src/app/manuals/types/jmeter");
const dataDir = path.join(root, "scripts/jmeter-manual-data");

function slugify(title) {
  return title
    .replace(/^[0-9]+(?:\.[0-9]+)*\s+/, "")
    .replace(/^[A-D]\.\s+/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);
}

function topicBlocks(md, partNo, chNo) {
  return buildTopicBlocks(md, (n) => `jm-${partNo}-${chNo}-md-${n}`);
}

function writeChapter(partNo, chNo, rec, partName) {
  const partDir = path.join(jmeterDir, `part-${partNo}`);
  fs.mkdirSync(partDir, { recursive: true });
  const id = rec.id || `jm-${partNo}-${chNo}-${slugify(rec.title)}`;
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

fs.mkdirSync(jmeterDir, { recursive: true });
for (const name of fs.readdirSync(jmeterDir)) {
  if (/^part-\d+$/.test(name)) {
    fs.rmSync(path.join(jmeterDir, name), { recursive: true, force: true });
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

console.log(`wrote ${total} JMeter chapters`);
