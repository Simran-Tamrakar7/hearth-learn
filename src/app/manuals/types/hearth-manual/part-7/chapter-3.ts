import type { ChapterRecord } from "../../../types";

/** 8.3 PR Checklist */
export const chapter = {
  id: "hm-8-3",
  title: "8.3 PR Checklist",
  minutes: 20,
  level: "intermediate",
  phase: "Part 8 · Contributing",
  partName: "Part 8 · Contributing",
  overviewText: "Before merge: npm run lint, check-registry, check-chapter-independence (if manuals touched), check-library (if library touched), verify dev server loads changed routes, update docs/ if conventions changed.",
  why: "Minimum bar for safe merges.",
  when: "Run before opening PR.",
  practical: {"app":"Manual PR","scenario":"You added 10 chapters.","pass":"All check scripts pass; chapters-manifest regenerated and committed.","fail":"You commit chapters without running generate-chapter-index.mjs."},
  tools: [],
  contentMarkdown: "## PR checklist\n\n- [ ] `npm run lint`\n- [ ] `node --experimental-strip-types scripts/check-registry.ts`\n- [ ] If manual chapters: `npx tsx scripts/check-chapter-independence.ts`\n- [ ] If library: `node --experimental-strip-types scripts/check-library.ts`\n- [ ] Regenerated `chapters-manifest.ts` if chapter files added\n- [ ] Updated `docs/` if behavior or conventions changed\n- [ ] No secrets in commit (.env, API keys)\n- [ ] Tested affected routes in `npm run dev`\n\n⚠️ Needs confirmation: exact GitHub Actions workflow names if CI exists.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
