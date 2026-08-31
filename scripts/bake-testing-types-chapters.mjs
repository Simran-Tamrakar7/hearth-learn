#!/usr/bin/env node
/** One-time / on-demand: copy full chapter records from data.js into part-N/chapter-M.md frontmatter */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualDir = path.join(root, "src/app/manuals/_content/testing-types");

const dataSrc = fs.readFileSync(path.join(manualDir, "data.js"), "utf8");
const manual = eval(`(${dataSrc.replace(/^[\s\S]*?=\s*/, "").replace(/;\s*$/, "")})`);
const chapters = manual.chapters;
if (chapters.length !== 92) {
  console.warn(`expected 92 chapters in data.js, got ${chapters.length}`);
}

function fmLine(key, value) {
  if (value === undefined || value === null) return null;
  if (Array.isArray(value) && value.length === 0) return null;
  if (typeof value === "object" && !Array.isArray(value) && Object.keys(value).length === 0) return null;
  return `${key}: ${JSON.stringify(value)}`;
}

function buildMd(ch, body, overlayNo) {
  const lines = [
    "---",
    fmLine("id", ch.id),
    fmLine("overlayNo", overlayNo),
    fmLine("title", ch.title),
    fmLine("minutes", ch.minutes || 25),
    fmLine("partName", ch.phase),
    fmLine("level", ch.level || "beginner"),
    fmLine("overviewText", ch.overviewText || ""),
    fmLine("why", ch.why),
    fmLine("when", ch.when),
    fmLine("practical", ch.practical),
    fmLine("advantages", ch.advantages),
    fmLine("limitations", ch.limitations),
    fmLine("tools", ch.tools),
    "---",
    "",
    body.trim(),
    "",
  ].filter((l) => l !== null);
  return lines.join("\n");
}

/** Strip leading overview paragraph if it duplicates overviewText frontmatter */
function cleanBody(body, overviewText) {
  const b = body.trim();
  const o = (overviewText || "").trim();
  if (!o || !b.startsWith(o)) return b;
  const rest = b.slice(o.length).replace(/^\s*\n+/, "").trim();
  return rest || b;
}

let idx = 0;
let written = 0;
for (let p = 1; p <= 23; p++) {
  const partDir = path.join(manualDir, `part-${p}`);
  if (!fs.existsSync(partDir)) continue;
  const files = fs
    .readdirSync(partDir)
    .filter((f) => /^chapter-\d+\.md$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  for (const file of files) {
    const ch = chapters[idx];
    if (!ch) break;
    idx += 1;
    const filePath = path.join(partDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const bodyMatch = /^---\r?\n[\s\S]*?\r?\n---\r?\n([\s\S]*)$/.exec(raw);
    const existingBody = bodyMatch ? bodyMatch[1] : raw;
    const body = cleanBody(existingBody, ch.overviewText);
    fs.writeFileSync(filePath, buildMd(ch, body, idx), "utf8");
    written += 1;
  }
}

console.log(`baked ${written} testing-types chapter files from data.js`);
