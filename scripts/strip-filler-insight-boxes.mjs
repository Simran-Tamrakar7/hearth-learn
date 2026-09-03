#!/usr/bin/env node
/**
 * Strip template-driven filler insight boxes from chapter files.
 * Keeps Testing Types Adv/Lim (genuine trade-offs). Strips keyword Adv/Lim
 * from Cypress / Playwright / Hearth. Removes Cypress boilerplate Why/When/Practical.
 *
 * ponytail: regex rewrite of TS object literals — fine for our chapter file shape;
 * upgrade to ts-morph if field shapes get more nested.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve("src/app/manuals/types");
const TARGETS = ["cypress", "playwright", "hearth-manual"];

function listChapters(slug) {
  const out = [];
  const base = path.join(ROOT, slug);
  for (const part of fs.readdirSync(base)) {
    if (!part.startsWith("part-")) continue;
    const dir = path.join(base, part);
    for (const f of fs.readdirSync(dir)) {
      if (/^chapter-\d+\.ts$/.test(f)) out.push(path.join(dir, f));
    }
  }
  return out;
}

/** Remove `field: [ ... ],` including nested brackets in strings (none expected).
 * ponytail: non-greedy `*?` stops at first `]` — breaks if a string value contains `]`.
 * Upgrade to ts-morph / JSON export if chapter strings start embedding brackets.
 */
function stripArrayField(src, field) {
  const re = new RegExp(`\\n[ \\t]*${field}:\\s*\\[[\\s\\S]*?\\],?`, "g");
  return src.replace(re, "");
}

function stripStringField(src, field) {
  const re = new RegExp(`\\n[ \\t]*${field}:\\s*(?:"(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*'),?`, "g");
  return src.replace(re, "");
}

function stripPractical(src) {
  // practical: { ... }, single or multi-line
  return src.replace(/\n[ \t]*practical:\s*\{[\s\S]*?\},?/, "");
}

function isCypressBoilerplate(src) {
  return (
    /why:\s*"Mastering /.test(src) ||
    /when:\s*"Read when implementing/.test(src) ||
    /practical:\s*\{\s*app:\s*"Web application under test"/.test(src) ||
    /overviewText:\s*"Comprehensive coverage of /.test(src)
  );
}

function processFile(file, slug) {
  let src = fs.readFileSync(file, "utf8");
  const before = src;

  // Never strip ch46 — already rewritten with comparisons
  if (file.endsWith(`${path.sep}cypress${path.sep}part-6${path.sep}chapter-4.ts`)) {
    return false;
  }

  src = stripArrayField(src, "advantages");
  src = stripArrayField(src, "limitations");

  if (slug === "cypress" && isCypressBoilerplate(src)) {
    src = stripStringField(src, "why");
    src = stripStringField(src, "when");
    src = stripPractical(src);
  }

  // Collapse accidental blank double newlines inside object (cosmetic)
  src = src.replace(/\n{3,}/g, "\n\n");

  if (src === before) return false;
  fs.writeFileSync(file, src);
  return true;
}

let changed = 0;
for (const slug of TARGETS) {
  for (const file of listChapters(slug)) {
    if (processFile(file, slug)) {
      changed++;
      console.log("updated", path.relative(process.cwd(), file));
    }
  }
}
console.log(`done — ${changed} files`);
