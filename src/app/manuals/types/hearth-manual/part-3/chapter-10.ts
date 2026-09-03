import type { ChapterRecord } from "../../../types";

/** 4.10 AI Coach & CV */
export const chapter = {
  id: "hm-4-10",
  title: "4.10 AI Coach & CV",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "AI Coach & CV: AI study coach and CV maker at /ai. (see sub-chapters below for user/dev/data/edge/related views).",
  when: "Open when changing AI Coach & CV behavior or documenting it for users.",
  practical: {"app":"AI Coach & CV bug report","scenario":"User says AI Coach & CV behaves unexpectedly.","pass":"You read 4.10.2 for file paths and 4.10.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.10.1 What It Does (User View)\n\nAI study coach and CV maker at /ai. Changing mode or editing input clears the previous result so stale answers are not shown.\n\n## 4.10.2 How It's Implemented (Dev View)\n\nsrc/app/ai/page.tsx, /api/ai/coach, /api/ai/cv, src/lib/openai.ts.\n\n## 4.10.3 Data Touched\n\nNo persistent model — session requests only.\n\n## 4.10.4 Edge Cases & Known Limitations\n\nGated by permissions.canUseAI.\n\n## 4.10.5 Related Chapters\n\nhm-4-7, hm-2-2",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
