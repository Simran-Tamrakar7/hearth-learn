import type { ChapterRecord } from "../../../types";

/** 9.5 Maintenance Notes */
export const chapter = {
  id: "hm-9-5",
  title: "9.5 Maintenance Notes",
  minutes: 20,
  level: "intermediate",
  phase: "Part 9 · Meta",
  partName: "Part 9 · Meta",
  overviewText: "Manual ownership: contributors who touch a feature should update its Part 4 chapter and API index. Request re-run via issue labeled documentation. Report stale sections by citing chapter id (e.g. hm-4-3) and file path that changed.",
  why: "Long-term hygiene for this manual.",
  when: "Reference in CONTRIBUTING or team wiki.",
  practical: {"app":"Stale API list","scenario":"New route added without doc update.","pass":"File issue: hm-6-1 missing /api/foo — or submit PR updating part-5/chapter-1.ts.","fail":"Silent drift until next full regen."},
  advantages: ["Chapter ids stable for issue references","In-app manual readable by all audiences"],
  limitations: ["No assigned doc owner in repo — ⚠️ Needs confirmation"],
  tools: [],
  contentMarkdown: "## Ownership\n\n⚠️ Needs confirmation: assign a doc maintainer on the team.\n\n## Request a re-run\n\n1. Open GitHub issue: \"Doc regen: [Part X]\"\n2. Paste Chapter 9.4 prompt with scope (full or partial)\n3. Run in Cursor Agent on latest main\n\n## Report stale content\n\nFormat: `[hm-X-Y] Claim wrong — actual behavior in path/to/file.ts`\n\n## Updating this manual\n\nEdit `src/app/manuals/types/hearth-manual/part-N/chapter-M.ts`, then:\n\n```bash\nnode scripts/generate-chapter-index.mjs\nnpx tsx scripts/check-chapter-independence.ts\n```\n\nMirror major changes in `docs/README.md`.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
