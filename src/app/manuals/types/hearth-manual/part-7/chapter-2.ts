import type { ChapterRecord } from "../../../types";

/** 8.2 Adding Manuals & Content Types */
export const chapter = {
  id: "hm-8-2",
  title: "8.2 Adding Manuals & Content Types",
  minutes: 20,
  level: "intermediate",
  phase: "Part 8 · Contributing",
  partName: "Part 8 · Contributing",
  overviewText: "Builtin manual: types/<slug>/meta.json, toc.ts, part-N/chapter-M.ts, add slug to generate-chapter-index.mjs, registry.ts, check-registry count. Library/toolkit/trail: edit respective _registry.ts. User manuals: localStorage only.",
  why: "Creator guide for content — the steps you followed for Cypress and this manual.",
  when: "Follow when adding Cypress, hearth-manual updates, or new catalogs.",
  practical: {"app":"Add Cypress manual","scenario":"Contributor adds automation manual.","pass":"Folder cypress/ not file Cypress; run generate-chapter-index; wire registry.","fail":"Create file named Cypress at types/ root."},
  tools: [],
  contentMarkdown: "## New builtin manual\n\n1. `src/app/manuals/types/<slug>/meta.json`\n2. `toc.ts` + `part-0/chapter-1.ts` (etc.)\n3. `scripts/generate-chapter-index.mjs` — add slug\n4. `node scripts/generate-chapter-index.mjs`\n5. `registry.ts` — import + MANUALS row + KEPT_BUILTIN_SLUGS\n6. `scripts/check-registry.ts` — bump count\n7. Run checks\n\n## Other content types\n\n| Type | Registry |\n|------|----------|\n| Library book | library/_content/_registry.ts |\n| Toolkit | toolkits/_content/_registry.ts |\n| Life Lab arena | life-simulator/_content/ |\n| Showcase featured | showcase-wall/_content/_registry.ts |\n| Prisma trail | prisma/seed.ts |",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
