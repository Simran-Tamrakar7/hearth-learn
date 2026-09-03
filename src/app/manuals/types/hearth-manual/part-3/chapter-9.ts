import type { ChapterRecord } from "../../../types";

/** 4.9 Notes & Tags */
export const chapter = {
  id: "hm-4-9",
  title: "4.9 Notes & Tags",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Notes & Tags: Personal notes optionally linked to a Prisma trail. Tag filtering page. (see sub-chapters below for user/dev/data/edge/related views).",
  when: "Open when changing Notes & Tags behavior or documenting it for users.",
  practical: {"app":"Notes & Tags bug report","scenario":"User says Notes & Tags behaves unexpectedly.","pass":"You read 4.9.2 for file paths and 4.9.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.9.1 What It Does (User View)\n\nPersonal notes optionally linked to a Prisma trail. Tag filtering page.\n\n## 4.9.2 How It's Implemented (Dev View)\n\nsrc/app/notes/page.tsx, /api/notes, Note model.\n\n## 4.9.3 Data Touched\n\nNote (optional trailId FK).\n\n## 4.9.4 Edge Cases & Known Limitations\n\nNotes are not manual-chapter-specific in schema.\n\n## 4.9.5 Related Chapters\n\nhm-4-1",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
