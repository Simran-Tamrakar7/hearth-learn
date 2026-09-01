import type { ChapterRecord } from "../../../types";

/** 8.1 Conventions */
export const chapter = {
  id: "hm-8-1",
  title: "8.1 Conventions",
  minutes: 20,
  level: "intermediate",
  phase: "Part 8 · Contributing",
  partName: "Part 8 · Contributing",
  overviewText: "Conventions: App Router colocation, one page.tsx per route, registries for catalogs, chapter independence for manuals, page_details-code_routes.md co-located docs, eslint without prettier, ponytail comments for intentional shortcuts.",
  why: "Keeps contributions consistent with existing code.",
  when: "Read before first PR.",
  practical: {"app":"New page","scenario":"You add /widgets.","pass":"Create src/app/widgets/page.tsx + optional page_details-code_routes.md.","fail":"You add components/widgets at repo root outside src/."},
  advantages: ["docs/where-to-edit.md maps URLs to folders","AGENTS.md notes Next 16 breaking changes"],
  limitations: ["Not all conventions enforced by CI"],
  tools: [],
  contentMarkdown: "## Naming & placement\n\n- Routes: `src/app/<segment>/page.tsx`\n- API: `src/app/api/<name>/route.ts`\n- Manual chapters: `types/<slug>/part-N/chapter-M.ts`\n- Catalog registries: `*_content/_registry.ts` or `manuals/registry.ts`\n\n## Manual chapter rules\n\n- Exactly one import: `ChapterRecord` type only\n- All content inline in chapter file\n- Run `npx tsx scripts/check-chapter-independence.ts`\n\n## Lint\n\n`npm run lint` — eslint.config.mjs + eslint-config-next",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
