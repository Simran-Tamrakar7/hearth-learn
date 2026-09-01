import type { ChapterRecord } from "../../../types";

/** 4.8 Break Room */
export const chapter = {
  id: "hm-4-8",
  title: "4.8 Break Room",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Break Room: Rest timer, games shelf, cookbook, retro vibes at /rest/*. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Break Room behavior or documenting it for users.",
  practical: {"app":"Break Room bug report","scenario":"User says Break Room behaves unexpectedly.","pass":"You read 4.8.2 for file paths and 4.8.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Break Room with cited file paths","Five-part template matches other features"],
  limitations: ["Some Break Room edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.8.1 What It Does (User View)\n\nRest timer, games shelf, cookbook, retro vibes at /rest/*.\n\n## 4.8.2 How It's Implemented (Dev View)\n\nsrc/app/rest/, games/_content.ts, cookbook/_content.ts.\n\n## 4.8.3 Data Touched\n\nSiteConfig feature flags breakRoom, cookbook.\n\n## 4.8.4 Edge Cases & Known Limitations\n\nGames/recipes are procedurally generated datasets, not individually curated files.\n\n## 4.8.5 Related Chapters\n\nhm-4-2",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
