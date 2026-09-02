import type { ChapterRecord } from "../../../types";

/** 4.1 Manuals */
export const chapter = {
  id: "hm-4-1",
  title: "4.1 Manuals",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Manuals: Browse structured lessons (Playwright, Testing Types, Cypress, Hearth Manual). Three chapter tabs — Full Content, Summary (markdown toolbar), Quiz & Activities. Export PDF/DOCX/Print. Highlights per tab.",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Manuals behavior or documenting it for users.",
  practical: {"app":"Manuals bug report","scenario":"User says Manuals behaves unexpectedly.","pass":"You read 4.1.2 for file paths and 4.1.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Manuals with cited file paths","Five-part template matches other features"],
  limitations: ["Some Manuals edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.1.1 What It Does (User View)\n\nBrowse structured manuals (Playwright, Testing Types, Cypress, Hearth Manual). Each chapter has **Full Content**, **Summary** (markdown with formatting toolbar when editing), and **Quiz & Activities** (saved exercises + AI quiz generator). Export whole manual as PDF, DOCX, or Print. Highlight text per tab. Edit chapter with pencil icon; reorder/delete chapters from side TOC edit mode.\n\n## 4.1.2 How It's Implemented (Dev View)\n\nsrc/app/manuals/page.tsx, [slug]/page.tsx, features/ChapterFullContent.tsx, ChapterReaderPanels.tsx, features/edit/ChapterContentEditor.tsx, export.tsx, highlights.tsx. APIs: /api/highlights, /api/manuals/chapter, /api/ai/quiz.\n\n## 4.1.3 Data Touched\n\nChapter TS files (builtins) + localStorage for user manuals and edits. ManualHighlight model when signed in.\n\n## 4.1.4 Edge Cases & Known Limitations\n\nOnly KEPT_BUILTIN_SLUGS save chapter files to disk via /api/manuals/chapter. User manuals stay in localStorage. Export PDF is a text PDF (long manuals used to fail when html2pdf screenshotted the whole book). Use Print for a styled page; DOCX keeps chapter text.\n\n## 4.1.5 Related Chapters\n\nPart 8.2, hm-3-4, hm-6-1",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
