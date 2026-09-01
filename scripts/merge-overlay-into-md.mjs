#!/usr/bin/env node
/** Merge full overlay chapter records into part-N/chapter-M.md frontmatter (overlay wins). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualDir = path.join(root, "src/app/manuals/types/testing-types");

function stripTs(src) {
  return src
    .replace(/^import[\s\S]*?;\s*$/gm, "")
    .replace(/^export type[\s\S]*?;\s*$/gm, "")
    .replace(/export const (\w+):\s*\w+\[\]\s*=/g, "const $1 =")
    .replace(/export const (\w+)\s*=/g, "const $1 =");
}

function loadPartArray(file, constName) {
  const raw = fs.readFileSync(path.join(manualDir, file), "utf8");
  const body = stripTs(raw);
  // eslint-disable-next-line no-eval
  return eval(`${body}; ${constName};`);
}

function loadMainOverlayBase() {
  let raw = fs.readFileSync(path.join(manualDir, "overlay.ts"), "utf8");
  raw = stripTs(raw);
  const cut = raw.indexOf("...TESTING_TYPES_PARTS_17_18");
  const truncated = `${raw.slice(0, cut).replace(/,\s*$/, "")}\n];`;
  // eslint-disable-next-line no-eval
  return eval(`${truncated}; TESTING_TYPES_CHAPTERS;`);
}

function loadAllOverlayChapters() {
  const p17 = loadPartArray("overlay-part17-18.ts", "TESTING_TYPES_PARTS_17_18");
  const p19 = loadPartArray("overlay-part19-22.ts", "TESTING_TYPES_PARTS_19_22");
  const p23 = loadPartArray("overlay-part23.ts", "TESTING_TYPES_PARTS_23");
  const base = loadMainOverlayBase();
  return [...base, ...p17, ...p19, ...p23];
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
    fmLine("id", ch.id || `tt-ch-${overlayNo}`),
    fmLine("overlayNo", overlayNo),
    fmLine("title", ch.title),
    fmLine("minutes", ch.minutes || 25),
    fmLine("partName", ch.phase || ch.partName),
    fmLine("level", ch.level || "beginner"),
    fmLine("overviewText", ch.overviewText || ch.desc || ""),
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

function cleanBody(body, overviewText) {
  const b = body.trim();
  const o = (overviewText || "").trim();
  if (!o || !b.startsWith(o)) return b;
  const rest = b.slice(o.length).replace(/^\s*\n+/, "").trim();
  return rest || b;
}

const byNo = new Map();
for (const ch of loadAllOverlayChapters()) {
  byNo.set(Number(ch.no), ch);
}
console.log(`loaded ${byNo.size} overlay chapters`);

let written = 0;
for (let p = 1; p <= 23; p++) {
  const partDir = path.join(manualDir, `part-${p}`);
  if (!fs.existsSync(partDir)) continue;
  const files = fs
    .readdirSync(partDir)
    .filter((f) => /^chapter-\d+\.md$/.test(f))
    .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
  for (const file of files) {
    const filePath = path.join(partDir, file);
    const raw = fs.readFileSync(filePath, "utf8");
    const fmMatch = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
    const existingFm = {};
    if (fmMatch) {
      for (const line of fmMatch[1].split("\n")) {
        const kv = /^([\w]+):\s*(.+)$/.exec(line.trim());
        if (kv) {
          try {
            existingFm[kv[1]] = JSON.parse(kv[2]);
          } catch {
            existingFm[kv[1]] = kv[2];
          }
        }
      }
    }
    const existingBody = fmMatch ? fmMatch[2] : raw;
    const overlayNo = Number(existingFm.overlayNo) || written + 1;
    const overlay = byNo.get(overlayNo);
    if (!overlay) {
      console.warn(`no overlay for overlayNo=${overlayNo} (${filePath})`);
      continue;
    }
    const merged = {
      ...overlay,
      id: existingFm.id,
      phase: existingFm.partName,
      minutes: existingFm.minutes,
      level: existingFm.level,
      overviewText: overlay.desc,
    };
    const body = cleanBody(existingBody, overlay.desc);
    fs.writeFileSync(filePath, buildMd(merged, body, overlayNo), "utf8");
    written += 1;
  }
}
console.log(`merged overlay into ${written} chapter MD files`);
