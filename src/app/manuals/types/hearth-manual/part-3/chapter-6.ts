import type { ChapterRecord } from "../../../types";

/** 4.6 Toolkits */
export const chapter = {
  id: "hm-4-6",
  title: "4.6 Toolkits",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Toolkits: Four cheat sheets with copy-to-clipboard snippets. (see sub-chapters below for user/dev/data/edge/related views).",
  when: "Open when changing Toolkits behavior or documenting it for users.",
  practical: {"app":"Toolkits bug report","scenario":"User says Toolkits behaves unexpectedly.","pass":"You read 4.6.2 for file paths and 4.6.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.6.1 What It Does (User View)\n\nFour cheat sheets with copy-to-clipboard snippets.\n\n## 4.6.2 How It's Implemented (Dev View)\n\nsrc/app/toolkits/page.tsx, toolkits/_content/_registry.ts, 4 meta.ts folders.\n\n## 4.6.3 Data Touched\n\nNone — static TS content.\n\n## 4.6.4 Edge Cases & Known Limitations\n\nNone significant.\n\n## 4.6.5 Related Chapters\n\nhm-8-2",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
