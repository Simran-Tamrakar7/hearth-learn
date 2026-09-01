#!/usr/bin/env node
/** One-shot generator for Cypress manual chapter files. Run: node scripts/generate-cypress-manual.mjs */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { chapters as part0 } from "./cypress-manual-data/part0.mjs";
import { chapters as part1 } from "./cypress-manual-data/part1.mjs";
import { chapters as part2 } from "./cypress-manual-data/part2.mjs";
import { chapters as part3 } from "./cypress-manual-data/part3.mjs";
import { chapters as part4 } from "./cypress-manual-data/part4.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualDir = path.join(root, "src/app/manuals/types/cypress");

const PARTS = [
  { dir: "part-0", chapters: part0 },
  { dir: "part-1", chapters: part1 },
  { dir: "part-2", chapters: part2 },
  { dir: "part-3", chapters: part3 },
  { dir: "part-4", chapters: part4 },
];

function esc(v) {
  return JSON.stringify(v);
}

function writeChapter(partDir, chapterNum, data) {
  const dir = path.join(manualDir, partDir);
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, `chapter-${chapterNum}.ts`);
  const scalarKeys = [
    "id",
    "title",
    "minutes",
    "level",
    "phase",
    "partName",
    "overviewText",
    "why",
    "when",
  ];
  const lines = scalarKeys.map((k) => `  ${k}: ${esc(data[k])},`);
  const p = data.practical;
  lines.push(
    `  practical: { app: ${esc(p.app)}, scenario: ${esc(p.scenario)}, pass: ${esc(p.pass)}, fail: ${esc(p.fail)} },`
  );
  lines.push(`  advantages: ${esc(data.advantages)},`);
  lines.push(`  limitations: ${esc(data.limitations)},`);
  lines.push("  tools: [],");
  lines.push(`  contentMarkdown: ${esc(data.contentMarkdown)},`);
  lines.push("  exercises: [],");
  lines.push("  resourceLinks: [],");
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

// --- meta.json ---
fs.mkdirSync(manualDir, { recursive: true });
fs.writeFileSync(
  path.join(manualDir, "meta.json"),
  JSON.stringify(
    {
      id: "cypress",
      title: "Cypress E2E Testing",
      tagline:
        "In-browser automation from architecture to CI — paired with the Playwright manual.",
      category: "automation",
      who: "QA engineers and frontend developers learning Cypress alongside Playwright.",
      outcomes: [
        "Explain Cypress in-browser architecture vs Selenium and Playwright",
        "Write specs with cy.visit, cy.get, intercepts, and cy.session",
        "Know when Cypress fits — and when to reach for Playwright instead",
      ],
      duration: "6–10 weeks",
      levelSpan: "Beginner → Advanced",
    },
    null,
    2
  ) + "\n"
);

// --- toc.ts ---
const tocParts = [
  { partNo: 0, name: "Background", data: part0 },
  { partNo: 1, name: "Foundations", data: part1 },
  { partNo: 2, name: "Core Commands", data: part2 },
  { partNo: 3, name: "Actions", data: part3 },
  { partNo: 4, name: "Advanced", data: part4 },
];

const tocEntries = tocParts
  .map(
    (p) => `  {
    partNo: ${p.partNo},
    name: ${esc(p.name)},
    items: [
${p.data.map((ch) => `      { title: ${esc(ch.title)} },`).join("\n")}
    ],
  }`
  )
  .join(",\n");

fs.writeFileSync(
  path.join(manualDir, "toc.ts"),
  `/* Cypress manual TOC — ordering only. Content lives in part-N/chapter-M.ts */

export const CYPRESS_TOC_VERSION = 1;

export type CypressTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const CYPRESS_TOC: CypressTocPart[] = [
${tocEntries}
];
`
);

// --- chapter files ---
const written = [];
for (const { dir, chapters } of PARTS) {
  for (const ch of chapters) {
    written.push(writeChapter(dir, ch.chapterNum, ch));
  }
}

console.log(`Cypress manual: wrote ${written.length} chapters + meta.json + toc.ts`);
