import type { ChapterRecord } from "../../../types";

/** 4.1 Manuals */
export const chapter = {
  id: "hm-4-1",
  title: "4.1 Manuals",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Manuals: Browse structured lessons (Playwright, Testing Types, Hearth Manual). Read chapters, highlight text, export PDF/DOCX, take AI quiz, add margin notes. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Manuals behavior or documenting it for users.",
  practical: {"app":"Manuals bug report","scenario":"User says Manuals behaves unexpectedly.","pass":"You read 4.1.2 for file paths and 4.1.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Manuals with cited file paths","Five-part template matches other features"],
  limitations: ["Some Manuals edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.1.1 What It Does (User View)\n\nBrowse structured lessons (Playwright, Testing Types, Hearth Manual). Read chapters, highlight text, export PDF/DOCX, take AI quiz, add margin notes.\n\n## 4.1.2 How It's Implemented (Dev View)\n\nsrc/app/manuals/page.tsx, [slug]/page.tsx, features/reader.tsx, export.tsx, highlights.tsx. APIs: /api/highlights, /api/manuals/generate, /api/manuals/chapter, /api/ai/quiz.\n\n## 4.1.3 Data Touched\n\nChapter TS files (not Prisma). ManualHighlight model + localStorage dual-write.\n\n## 4.1.4 Edge Cases & Known Limitations\n\nOnly KEPT_BUILTIN_SLUGS save to disk via /api/manuals/chapter. User manuals in localStorage.\n\n## 4.1.5 Related Chapters\n\nPart 8.2, hm-3-4, hm-6-1",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
