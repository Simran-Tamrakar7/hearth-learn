/**
 * Enforce chapter independence rules for every manual under src/app/manuals/types/.
 * Run: npx tsx scripts/check-chapter-independence.ts
 */
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const typesRoot = path.join(repoRoot, "src/app/manuals/types");

const ALLOWED_IMPORT = 'import type { ChapterRecord } from "../../../types";';

function manualSlugs(): string[] {
  return readdirSync(typesRoot).filter((d) => {
    const p = path.join(typesRoot, d);
    return statSync(p).isDirectory() && existsSync(path.join(p, "meta.json"));
  });
}

function chapterFiles(manual: string): string[] {
  const root = path.join(typesRoot, manual);
  const out: string[] = [];
  for (const part of readdirSync(root).filter((d) => /^part-\d+$/.test(d))) {
    for (const f of readdirSync(path.join(root, part)).filter((x) => /^chapter-\d+\.ts$/.test(x))) {
      out.push(path.join(root, part, f));
    }
  }
  return out;
}

function parseChapterExport(raw: string): Record<string, unknown> | null {
  const m = raw.match(/export const chapter = ([\s\S]+?) as ChapterRecord;/);
  if (!m) return null;
  // ponytail: eval on trusted repo-owned chapter modules only — upgrade path: JSON5/TS parser
  return Function(`"use strict"; return (${m[1]});`)() as Record<string, unknown>;
}

function assertOnlyChapterRecordImport(file: string, raw: string, rel: string) {
  const imports = [...raw.matchAll(/^import .+$/gm)].map((x) => x[0]);
  assert.equal(imports.length, 1, `${rel}: must have exactly one import, got ${imports.length}`);
  assert.equal(imports[0], ALLOWED_IMPORT, `${rel}: forbidden import — ${imports[0]}`);
}

function assertCompleteness(ch: Record<string, unknown>, rel: string) {
  const missing: string[] = [];
  for (const k of ["overviewText", "why", "when", "contentMarkdown"] as const) {
    const v = ch[k];
    if (!v || String(v).trim().length < 20) missing.push(k);
  }
  const practical = ch.practical as { app?: string; scenario?: string; pass?: string; fail?: string } | undefined;
  if (!practical?.app || !practical?.scenario || !practical?.pass || !practical?.fail) {
    missing.push("practical");
  }
  const adv = ch.advantages;
  const lim = ch.limitations;
  if (!Array.isArray(adv) || adv.length === 0) missing.push("advantages");
  if (!Array.isArray(lim) || lim.length === 0) missing.push("limitations");
  assert.equal(missing.length, 0, `${rel} (${ch.id}): incomplete — ${missing.join(", ")}`);
}

function assertTocStructureOnly(manual: string) {
  const tocPath = path.join(typesRoot, manual, "toc.ts");
  assert.ok(existsSync(tocPath), `${manual}: missing toc.ts`);
  const toc = readFileSync(tocPath, "utf8");
  assert.ok(!/from ['"].*chapter-/.test(toc), `${manual}/toc.ts must not import chapter files`);
  assert.ok(!/export const chapter/.test(toc), `${manual}/toc.ts must not export chapter content`);
}

function assertNoDuplicateAdvantages(manual: string, chapters: { id: string; adv: string[] }[]) {
  const byKey = new Map<string, string[]>();
  for (const { id, adv } of chapters) {
    const key = JSON.stringify(adv);
    if (!byKey.has(key)) byKey.set(key, []);
    byKey.get(key)!.push(String(id));
  }
  for (const ids of byKey.values()) {
    assert.ok(ids.length === 1, `${manual}: duplicate advantages across ${ids.join(", ")}`);
  }
}

let totalChapters = 0;

for (const manual of manualSlugs()) {
  assertTocStructureOnly(manual);
  const advRows: { id: string; adv: string[] }[] = [];

  for (const file of chapterFiles(manual)) {
    const rel = path.relative(typesRoot, file);
    const raw = readFileSync(file, "utf8");
    assertOnlyChapterRecordImport(file, raw, rel);
    const ch = parseChapterExport(raw);
    assert.ok(ch, `${rel}: missing 'export const chapter = … as ChapterRecord'`);
    assertCompleteness(ch!, rel);
    advRows.push({ id: String(ch!.id), adv: (ch!.advantages as string[]) || [] });
    totalChapters++;
  }

  assertNoDuplicateAdvantages(manual, advRows);
  console.log(`${manual}: ${chapterFiles(manual).length} chapters ok`);
}

console.log(`scripts/check-chapter-independence: ok (${totalChapters} chapters across ${manualSlugs().length} manuals)`);
