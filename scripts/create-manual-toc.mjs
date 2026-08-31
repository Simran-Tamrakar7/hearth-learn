#!/usr/bin/env node
/** Regenerate playwright/toc.ts from part folders (testing-types/toc.ts is hand-maintained). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualsRoot = path.join(root, "src/app/manuals");

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/.exec(raw);
  if (!m) return {};
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([\w]+):\s*(.+)$/.exec(line.trim());
    if (!kv) continue;
    try {
      meta[kv[1]] = JSON.parse(kv[2]);
    } catch {
      meta[kv[1]] = kv[2].replace(/^"|"$/g, "");
    }
  }
  return meta;
}

const pwDir = path.join(manualsRoot, "playwright");
const partDirs = fs
  .readdirSync(pwDir)
  .filter((d) => /^part-\d+$/.test(d))
  .sort((a, b) => parseInt(a.split("-")[1], 10) - parseInt(b.split("-")[1], 10));

const parts = [];
for (const partDir of partDirs) {
  const pn = parseInt(partDir.split("-")[1], 10);
  const fullPart = path.join(pwDir, partDir);
  const chapters = fs
    .readdirSync(fullPart)
    .filter((f) => /^chapter-\d+\.md$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  let partName = `Part ${pn}`;
  const items = [];
  for (const file of chapters) {
    const raw = fs.readFileSync(path.join(fullPart, file), "utf8");
    const fm = parseFrontmatter(raw);
    if (fm.partName && partName === `Part ${pn}`) partName = fm.partName;
    items.push({ title: fm.title || file.replace(".md", "") });
  }
  parts.push({ name: partName.replace(/^Part \d+\s*[·•:\-–—]\s*/, "").trim() || partName, partNo: pn, items });
}

const pwToc = `/* Playwright manual TOC — ordering only. Content lives in part-N/chapter-M.md */

export const PLAYWRIGHT_TOC_VERSION = 1;

export type PlaywrightTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const PLAYWRIGHT_TOC: PlaywrightTocPart[] = ${JSON.stringify(
  parts.map((p) => ({ partNo: p.partNo, name: p.name, items: p.items })),
  null,
  2
)};
`;
fs.writeFileSync(path.join(pwDir, "toc.ts"), pwToc, "utf8");
console.log(`wrote playwright/toc.ts (${parts.length} parts, ${parts.reduce((n, p) => n + p.items.length, 0)} chapters)`);
