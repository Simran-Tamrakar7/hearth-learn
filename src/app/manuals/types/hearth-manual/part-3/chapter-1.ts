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
  when: "Open when changing Manuals behavior or documenting it for users.",
  practical: {"app":"Manuals bug report","scenario":"User says Manuals behaves unexpectedly.","pass":"You read 4.1.2 for file paths and 4.1.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.1.1 What It Does (User View)\n\nBrowse structured manuals (Playwright, Testing Types, Cypress, Hearth Manual). Each chapter has **Full Content**, **Summary** (markdown with formatting toolbar when editing), and **Quiz & Activities** (saved exercises + AI quiz generator). Export whole manual as PDF, DOCX, or Print. Highlight text per tab. Edit chapter with pencil icon; reorder/delete chapters from side TOC edit mode.\n\nFull Content insight boxes are **content-driven** via an ordered `blocks[]` array (Add Block menu in edit mode). Unused types stay omitted — no fixed template. Manual settings can restrict which types appear in Add Block without removing existing blocks.\n\n## 4.1.2 How It's Implemented (Dev View)\n\nsrc/app/manuals/page.tsx, [slug]/page.tsx, features/ChapterFullContent.tsx, features/blocks/{types,BlockViews,BlockEditor}.tsx, features/insightBoxes.tsx, ChapterReaderPanels.tsx, features/edit/ChapterContentEditor.tsx, export.tsx, highlights.tsx. APIs: /api/highlights, /api/manuals/chapter, /api/ai/quiz. See docs/content-model.md.\n\n## 4.1.3 Data Touched\n\nChapter TS files (builtins) + localStorage for user manuals and edits. ManualHighlight model when signed in.\n\n## 4.1.4 Edge Cases & Known Limitations\n\nOnly KEPT_BUILTIN_SLUGS save chapter files to disk via /api/manuals/chapter. User manuals stay in localStorage. Advantages/Limitations appear only when the chapter data has real trade-off content (e.g. Testing Types) — never auto-filled for layout consistency.\n\n## 4.1.5 Related Chapters\n\nPart 8.2, hm-3-4, hm-6-1",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
