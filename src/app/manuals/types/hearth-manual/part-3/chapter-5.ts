import type { ChapterRecord } from "../../../types";

/** 4.5 Library */
export const chapter = {
  id: "hm-4-5",
  title: "4.5 Library",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Library: Outbound bibliography of ~78 books with save-to-shelf in localStorage. Also lists manuals. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Library behavior or documenting it for users.",
  practical: {"app":"Library bug report","scenario":"User says Library behaves unexpectedly.","pass":"You read 4.5.2 for file paths and 4.5.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Library with cited file paths","Five-part template matches other features"],
  limitations: ["Some Library edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.5.1 What It Does (User View)\n\nOutbound bibliography of ~78 books with save-to-shelf in localStorage. Also lists manuals.\n\n## 4.5.2 How It's Implemented (Dev View)\n\nsrc/app/library/page.tsx, library/_content/_registry.ts.\n\n## 4.5.3 Data Touched\n\nlocalStorage hearth_library_saved. Prisma Book models unused.\n\n## 4.5.4 Edge Cases & Known Limitations\n\nNot an in-app book reader.\n\n## 4.5.5 Related Chapters\n\nhm-3-3",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
