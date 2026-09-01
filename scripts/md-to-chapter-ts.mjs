#!/usr/bin/env node
/** Convert part-N/chapter-M.md → part-N/chapter-M.ts (one self-contained module per chapter) */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualsRoot = path.join(root, "src/app/manuals");
const SLUGS = ["testing-types", "playwright"];

function parseValue(raw) {
  const v = raw.trim();
  if (!v) return "";
  if (v.startsWith("[") || v.startsWith("{")) {
    try {
      return JSON.parse(v);
    } catch {
      return v;
    }
  }
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    try {
      return JSON.parse(v);
    } catch {
      return v.slice(1, -1);
    }
  }
  return v;
}

function parseFrontmatter(raw) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!m) return { meta: {}, body: raw.trim() };
  const meta = {};
  for (const line of m[1].split("\n")) {
    const kv = /^([\w]+):\s*(.+)$/.exec(line.trim());
    if (!kv) continue;
    meta[kv[1]] = parseValue(kv[2]);
  }
  return { meta, body: m[2].trim() };
}

function chapterObject(meta, body, slug) {
  const phase = meta.partName || meta.phase;
  return {
    id: meta.id || `${slug}-chapter`,
    overlayNo: meta.overlayNo != null ? Number(meta.overlayNo) : undefined,
    title: meta.title || "Untitled",
    minutes: meta.minutes != null ? Number(meta.minutes) : 20,
    level: meta.level || "beginner",
    phase: phase || undefined,
    partName: phase || undefined,
    overviewText: meta.overviewText || "",
    why: meta.why || undefined,
    when: meta.when || undefined,
    practical: meta.practical || undefined,
    advantages: meta.advantages || undefined,
    limitations: meta.limitations || undefined,
    tools: Array.isArray(meta.tools) ? meta.tools : [],
    contentMarkdown: body,
    exercises: [],
    resourceLinks: [],
    steps: [],
    learn: [],
  };
}

function toTsFile(obj, relImport) {
  const json = JSON.stringify(obj, null, 2);
  return `import type { ChapterRecord } from "${relImport}";\n\n/** ${obj.title} */\nexport const chapter = ${json} as ChapterRecord;\n`;
}

function relTypesImport(manualDir, partDir, file) {
  const from = path.join(manualDir, partDir, file);
  const types = path.join(manualDir, "..", "types.ts");
  let rel = path.relative(path.dirname(from), types).replace(/\\/g, "/");
  if (!rel.startsWith(".")) rel = "./" + rel;
  return rel.replace(/\.ts$/, "");
}

for (const slug of SLUGS) {
  const manualDir = path.join(manualsRoot, "types", slug);
  let count = 0;
  for (const partDir of fs.readdirSync(manualDir).filter((d) => /^part-\d+$/.test(d))) {
    const fullPart = path.join(manualDir, partDir);
    for (const file of fs.readdirSync(fullPart).filter((f) => f.endsWith(".md"))) {
      const mdPath = path.join(fullPart, file);
      const tsPath = mdPath.replace(/\.md$/, ".ts");
      const { meta, body } = parseFrontmatter(fs.readFileSync(mdPath, "utf8"));
      const obj = chapterObject(meta, body, slug);
      const rel = relTypesImport(manualDir, partDir, file.replace(".md", ".ts"));
      fs.writeFileSync(tsPath, toTsFile(obj, rel), "utf8");
      fs.unlinkSync(mdPath);
      count++;
    }
  }
  console.log(`${slug}: converted ${count} chapters md→ts`);
}
