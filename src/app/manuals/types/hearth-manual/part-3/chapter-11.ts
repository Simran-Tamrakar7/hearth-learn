import type { ChapterRecord } from "../../../types";

/** 4.11 Showcase Wall */
export const chapter = {
  id: "hm-4-11",
  title: "4.11 Showcase Wall",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Showcase Wall: Portfolio gallery: 17 featured GitHub repos + user-submitted items. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Showcase Wall behavior or documenting it for users.",
  practical: {"app":"Showcase Wall bug report","scenario":"User says Showcase Wall behaves unexpectedly.","pass":"You read 4.11.2 for file paths and 4.11.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Showcase Wall with cited file paths","Five-part template matches other features"],
  limitations: ["Some Showcase Wall edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.11.1 What It Does (User View)\n\nPortfolio gallery: 17 featured GitHub repos + user-submitted items.\n\n## 4.11.2 How It's Implemented (Dev View)\n\nsrc/app/showcase-wall/page.tsx, showcase-wall/_content/_registry.ts, /api/showcase.\n\n## 4.11.3 Data Touched\n\nShowcaseItem model.\n\n## 4.11.4 Edge Cases & Known Limitations\n\nNo /showcase route — only /showcase-wall.\n\n## 4.11.5 Related Chapters\n\nhm-3-3",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
