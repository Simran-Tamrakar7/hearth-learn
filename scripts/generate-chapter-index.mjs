#!/usr/bin/env node
/** Append chapter imports + CHAPTER_RECORDS + CHAPTER_PATHS to each manual folder */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const manualsRoot = path.join(root, "src/app/manuals");
const SLUGS = ["testing-types", "playwright"];

for (const slug of SLUGS) {
  const manualDir = path.join(manualsRoot, slug);
  const imports = [];
  const refs = [];
  const pathEntries = [];
  const partDirs = fs
    .readdirSync(manualDir)
    .filter((d) => /^part-\d+$/.test(d))
    .sort((a, b) => parseInt(a.split("-")[1], 10) - parseInt(b.split("-")[1], 10));

  for (const partDir of partDirs) {
    const files = fs
      .readdirSync(path.join(manualDir, partDir))
      .filter((f) => /^chapter-\d+\.ts$/.test(f))
      .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));
    for (const file of files) {
      const rel = `${partDir}/${file}`;
      const full = path.join(manualDir, rel);
      const raw = fs.readFileSync(full, "utf8");
      const idMatch = raw.match(/"id"\s*:\s*"([^"]+)"/);
      const id = idMatch?.[1];
      if (id) pathEntries.push([id, rel]);

      const base = file.replace(".ts", "").replace("-", "_");
      const varName = `${partDir.replace("-", "_")}_${base}`;
      imports.push(`import { chapter as ${varName} } from "./${partDir}/${file.replace(".ts", "")}";`);
      refs.push(varName);
    }
  }

  const indexOut = `/** Auto-generated — one import per part-N/chapter-M.ts. Re-run: node scripts/generate-chapter-index.mjs */
import type { ChapterRecord } from "../types";

${imports.join("\n")}

export const CHAPTER_RECORDS: ChapterRecord[] = [
  ${refs.join(",\n  ")}
];
`;
  fs.writeFileSync(path.join(manualDir, "chapters-index.ts"), indexOut, "utf8");

  const pathsOut = `/** Auto-generated chapter id → disk path. Re-run: node scripts/generate-chapter-index.mjs */
export const CHAPTER_PATHS: Record<string, string> = {
${pathEntries.map(([id, rel]) => `  ${JSON.stringify(id)}: ${JSON.stringify(rel)},`).join("\n")}
};
`;
  fs.writeFileSync(path.join(manualDir, "chapter-paths.ts"), pathsOut, "utf8");
  console.log(`${slug}: chapters-index.ts + chapter-paths.ts (${refs.length} chapters)`);
}
