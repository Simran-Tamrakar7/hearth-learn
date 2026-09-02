#!/usr/bin/env node
/** Regenerate Playwright manual chapter files from scripts/playwright-manual-data/part*.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chapters as part0 } from "./playwright-manual-data/part0.mjs";
import { chapters as part1 } from "./playwright-manual-data/part1.mjs";
import { chapters as part2 } from "./playwright-manual-data/part2.mjs";
import { chapters as part3 } from "./playwright-manual-data/part3.mjs";
import { chapters as part4 } from "./playwright-manual-data/part4.mjs";
import { chapters as part5 } from "./playwright-manual-data/part5.mjs";
import { chapters as part6 } from "./playwright-manual-data/part6.mjs";
import { chapters as part7 } from "./playwright-manual-data/part7.mjs";
import { chapters as part8 } from "./playwright-manual-data/part8.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualDir = path.join(root, "src/app/manuals/types/playwright");

const PARTS = [
  { dir: "part-0", name: "Background & Context", data: part0 },
  { dir: "part-1", name: "Foundations", data: part1 },
  { dir: "part-2", name: "Core Interactions", data: part2 },
  { dir: "part-3", name: "Test Structure & Framework", data: part3 },
  { dir: "part-4", name: "Advanced Techniques", data: part4 },
  { dir: "part-5", name: "CI/CD & Reporting", data: part5 },
  { dir: "part-6", name: "Pro-Level Practices", data: part6 },
  { dir: "part-7", name: "Real-World Project & Job Readiness", data: part7 },
  { dir: "part-8", name: "Resources, Citations & Reference Library", data: part8 },
];

function esc(v) {
  return JSON.stringify(v);
}

function writeChapter(partDir, chapterNum, data) {
  const dir = path.join(manualDir, partDir);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `chapter-${chapterNum}.ts`);
  const phase = data.phase || `Part ${partDir.split("-")[1]} · ${PARTS.find((p) => p.dir === partDir)?.name || ""}`;
  const lines = [
    `  id: ${esc(data.id)},`,
    `  title: ${esc(data.title)},`,
    `  minutes: ${data.minutes ?? 25},`,
    `  level: ${esc(data.level ?? "beginner")},`,
    `  phase: ${esc(phase)},`,
    `  partName: ${esc(data.partName ?? phase)},`,
    `  overviewText: ${esc(data.overviewText)},`,
    `  why: ${esc(data.why)},`,
    `  when: ${esc(data.when)},`,
  ];
  const p = data.practical;
  lines.push(
    `  practical: { app: ${esc(p.app)}, scenario: ${esc(p.scenario)}, pass: ${esc(p.pass)}, fail: ${esc(p.fail)} },`
  );
  lines.push(`  advantages: ${esc(data.advantages)},`);
  lines.push(`  limitations: ${esc(data.limitations)},`);
  lines.push("  tools: [],");
  lines.push(`  contentMarkdown: ${esc(data.contentMarkdown)},`);
  if (data.customSummary) {
    lines.push(`  customSummary: ${esc(data.customSummary)},`);
  }
  lines.push("  exercises: [],");
  lines.push(`  resourceLinks: ${esc(data.resourceLinks ?? [])},`);
  lines.push("  steps: [],");
  lines.push("  learn: [],");

  const content = `import type { ChapterRecord } from "../../../types";

/** ${data.title} */
export const chapter = {
${lines.join("\n")}
} as ChapterRecord;
`;
  fs.writeFileSync(file, content);
  return `${partDir}/chapter-${chapterNum}.ts`;
}

// Remove stale chapter files from prior layouts (checkpoints, old part counts)
for (const part of fs.readdirSync(manualDir).filter((d) => /^part-\d+$/.test(d))) {
  const partPath = path.join(manualDir, part);
  if (!PARTS.some((p) => p.dir === part)) {
    fs.rmSync(partPath, { recursive: true, force: true });
  }
}
for (const { dir, data } of PARTS) {
  const partPath = path.join(manualDir, dir);
  if (!fs.existsSync(partPath)) continue;
  const keep = new Set(data.map((_, i) => `chapter-${i + 1}.ts`));
  for (const f of fs.readdirSync(partPath)) {
    if (/^chapter-\d+\.ts$/.test(f) && !keep.has(f)) {
      fs.unlinkSync(path.join(partPath, f));
    }
  }
}

fs.mkdirSync(manualDir, { recursive: true });
fs.writeFileSync(
  path.join(manualDir, "meta.json"),
  JSON.stringify(
    {
      id: "playwright",
      title: "Playwright Test Automation (Python)",
      tagline:
        "Python + pytest-playwright from architecture to CI — expanded manual with Full Content and Summary per chapter.",
      category: "automation",
      who: "QA engineers learning Playwright with Python/pytest for web E2E automation.",
      outcomes: [
        "Explain Playwright architecture vs Selenium and Cypress",
        "Write stable locators, actions, and expect() assertions in Python",
        "Structure suites with pytest fixtures, POM, CI, and reporting",
      ],
      duration: "8–12 weeks",
      levelSpan: "Beginner → Advanced",
    },
    null,
    2
  ) + "\n"
);

const tocEntries = PARTS.map(
  (p) => `  {
    partNo: ${parseInt(p.dir.split("-")[1], 10)},
    name: ${esc(p.name)},
    items: [
${p.data.map((ch) => `      { title: ${esc(ch.title)} },`).join("\n")}
    ],
  }`
).join(",\n");

fs.writeFileSync(
  path.join(manualDir, "toc.ts"),
  `/* Playwright manual TOC — ordering only. Content lives in part-N/chapter-M.ts */

export const PLAYWRIGHT_TOC_VERSION = 2;

export type PlaywrightTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const PLAYWRIGHT_TOC: PlaywrightTocPart[] = [
${tocEntries}
];
`
);

const written = [];
for (const { dir, data } of PARTS) {
  data.forEach((ch, i) => {
    written.push(writeChapter(dir, i + 1, { ...ch, chapterNum: i + 1 }));
  });
}

console.log(`Playwright manual: wrote ${written.length} chapters + meta.json + toc.ts`);
