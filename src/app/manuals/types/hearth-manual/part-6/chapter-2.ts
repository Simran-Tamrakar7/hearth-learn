import type { ChapterRecord } from "../../../types";

/** 7.2 Manuals & Progress */
export const chapter = {
  id: "hm-7-2",
  title: "7.2 Manuals & Progress",
  minutes: 20,
  level: "intermediate",
  phase: "Part 7 · User FAQ",
  partName: "Part 7 · User FAQ",
  overviewText: "Manuals are long-form TypeScript lessons at /manuals/<slug>. Progress for manuals is stored in browser localStorage. Dashboard checkboxes track separate Prisma seed trails — not the same progress system.",
  why: "Clarifies the two progress systems users may confuse.",
  when: "Essential FAQ for support.",
  practical: {"app":"Progress lost","scenario":"User cleared browser data.","pass":"Manual progress in localStorage is gone; Prisma trail progress on server remains if logged in.","fail":"You promise manual progress syncs to cloud — it does not (except highlights via API)."},
  advantages: ["Honest about localStorage vs server","Highlights can sync via ManualHighlight API"],
  limitations: ["Dual systems are confusing — product may unify later"],
  tools: [],
  contentMarkdown: "## Q: Where are the learning trails?\n**A:** /manuals lists builtin manuals. /trails redirects to /manuals.\n\n## Q: How is manual progress saved?\n**A:** Mostly localStorage (keys via src/lib/userScope.ts). Highlights also POST to /api/highlights when signed in.\n\n## Q: What are dashboard checkboxes?\n**A:** Prisma seed trails (8 courses) — different from manual chapters.\n\n## Q: Can I export a manual?\n**A:** Yes — PDF, DOCX, Print from reader header (ManualExportMenu in features/export.tsx).\n\n⚠️ Needs confirmation: exact localStorage key names if documenting for users.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
