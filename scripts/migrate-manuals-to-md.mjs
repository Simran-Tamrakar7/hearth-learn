#!/usr/bin/env node
/** One-time (re-runnable): data.js chapters → part-N/chapter-M.md + meta.json */
import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const contentRoot = path.join(root, "src/app/manuals/_content");

function partNumFromPhase(phase) {
  const m = /Part\s+(\d+)/i.exec(String(phase || ""));
  return m ? parseInt(m[1], 10) : 0;
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

function chapterMarkdown(ch) {
  const steps = Array.isArray(ch.steps) ? ch.steps : [];
  const overview = String(ch.overview || ch.overviewText || "");
  const learn = Array.isArray(ch.learn) ? ch.learn : [];
  const parts = [
    overview,
    ...steps.map((s) => {
      const title = String(s.title || "Step");
      const body = String(s.body || "");
      const code = s.code ? `\n\n\`\`\`\n${String(s.code)}\n\`\`\`` : "";
      return `## ${title}\n\n${body}${code}`.trim();
    }),
  ].filter(Boolean);
  if (parts.length) return parts.join("\n\n");
  return String(ch.contentMarkdown || `# ${ch.title || "Chapter"}\n\n`);
}

function writeChapterFile(dir, idx, ch, partName) {
  const file = path.join(dir, `chapter-${idx}.md`);
  const fm = [
    "---",
    `id: ${JSON.stringify(String(ch.id))}`,
    `title: ${JSON.stringify(String(ch.title || `Chapter ${idx}`))}`,
    `minutes: ${Number(ch.minutes) || 20}`,
    `partName: ${JSON.stringify(partName)}`,
    ...(ch.level ? [`level: ${JSON.stringify(String(ch.level))}`] : []),
    "---",
    "",
    chapterMarkdown(ch),
  ].join("\n");
  fs.writeFileSync(file, fm, "utf8");
}

async function migrateSlug(slug) {
  const mod = await import(pathToFileURL(path.join(contentRoot, slug, "data.js")).href);
  const raw = mod.pathwiseManual;
  if (!raw?.chapters?.length) {
    console.warn(`skip ${slug}: no chapters`);
    return;
  }
  const manualDir = path.join(contentRoot, slug);
  fs.writeFileSync(
    path.join(manualDir, "meta.json"),
    JSON.stringify(
      {
        id: raw.id,
        title: raw.title,
        tagline: raw.tagline,
        category: raw.category,
        who: raw.who,
        outcomes: raw.outcomes,
        duration: raw.duration,
        levelSpan: raw.levelSpan,
      },
      null,
      2
    ),
    "utf8"
  );

  const byPart = new Map();
  for (const ch of raw.chapters) {
    const pn = partNumFromPhase(ch.phase || ch.subtitle);
    if (!byPart.has(pn)) byPart.set(pn, { name: ch.phase || ch.subtitle || `Part ${pn}`, chapters: [] });
    byPart.get(pn).chapters.push(ch);
  }

  for (const [pn, group] of [...byPart.entries()].sort((a, b) => a[0] - b[0])) {
    const partDir = path.join(manualDir, `part-${pn}`);
    fs.mkdirSync(partDir, { recursive: true });
    group.chapters.forEach((ch, i) => writeChapterFile(partDir, i + 1, ch, group.name));
  }
  console.log(`migrated ${slug}: ${raw.chapters.length} chapters → ${byPart.size} parts`);
}

for (const slug of ["playwright", "testing-types"]) {
  await migrateSlug(slug);
}
