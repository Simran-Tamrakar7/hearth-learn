#!/usr/bin/env node
/** Patch contentMarkdown (and optional resourceLinks) on existing Playwright chapter .ts files. */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualDir = path.join(root, "src/app/manuals/types/playwright");
const dataDir = path.join(root, "scripts/playwright-manual-data");

function replaceJsonStringField(source, fieldName, newValue) {
  const key = `"${fieldName}": `;
  const idx = source.indexOf(key);
  if (idx < 0) return { source, changed: false };
  let pos = idx + key.length;
  if (source[pos] !== '"') return { source, changed: false };
  pos++;
  while (pos < source.length) {
    if (source[pos] === "\\") {
      pos += 2;
      continue;
    }
    if (source[pos] === '"') {
      pos++;
      break;
    }
    pos++;
  }
  const next = source.slice(0, idx + key.length) + JSON.stringify(newValue) + source.slice(pos);
  return { source: next, changed: true };
}

function replaceJsonArrayField(source, fieldName, newValue) {
  const key = `"${fieldName}": `;
  const idx = source.indexOf(key);
  if (idx < 0) return { source, changed: false };
  let pos = idx + key.length;
  if (source[pos] !== "[") return { source, changed: false };
  let depth = 0;
  const start = pos;
  while (pos < source.length) {
    const ch = source[pos];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) {
        pos++;
        break;
      }
    } else if (ch === '"') {
      pos++;
      while (pos < source.length) {
        if (source[pos] === "\\") {
          pos += 2;
          continue;
        }
        if (source[pos] === '"') {
          pos++;
          break;
        }
        pos++;
      }
      continue;
    }
    pos++;
  }
  const next = source.slice(0, idx + key.length) + JSON.stringify(newValue, null, 2).replace(/\n/g, "\n  ") + source.slice(pos);
  return { source: next, changed: true };
}

async function loadPartData(partNo) {
  const file = path.join(dataDir, `part${partNo}.mjs`);
  if (!fs.existsSync(file)) return null;
  return import(pathToFileURL(file).href);
}

let patched = 0;
for (let partNo = 0; partNo <= 8; partNo++) {
  const mod = await loadPartData(partNo);
  if (!mod?.chapters) continue;
  const partDir = path.join(manualDir, `part-${partNo}`);
  mod.chapters.forEach((data, i) => {
    const chapterFile = path.join(partDir, `chapter-${i + 1}.ts`);
    if (!fs.existsSync(chapterFile)) return;
    if (!data?.contentMarkdown && !data?.resourceLinks) return;

    let src = fs.readFileSync(chapterFile, "utf8");
    if (data.contentMarkdown) {
      const r = replaceJsonStringField(src, "contentMarkdown", data.contentMarkdown);
      src = r.source;
      if (r.changed) patched++;
    }
    if (data.resourceLinks) {
      const r = replaceJsonArrayField(src, "resourceLinks", data.resourceLinks);
      src = r.source;
    }
    fs.writeFileSync(chapterFile, src);
  });
}

console.log(`Patched ${patched} Playwright chapter contentMarkdown fields.`);
