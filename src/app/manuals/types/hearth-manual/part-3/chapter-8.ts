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
  when: "Open when changing Break Room behavior or documenting it for users.",
  practical: {"app":"Break Room bug report","scenario":"User says Break Room behaves unexpectedly.","pass":"You read 4.8.2 for file paths and 4.8.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.8.1 What It Does (User View)\n\nRest timer, games shelf, cookbook, retro radio. Users can add/edit/delete custom games and recipes. Retro volume slider controls playback gain.\n\n## 4.8.2 How It's Implemented (Dev View)\n\nsrc/app/rest/games/page.tsx + user-games.ts, cookbook/page.tsx + user-recipes.ts, retro/page.tsx. Shared storage: src/lib/userCatalog.ts.\n\n## 4.8.3 Data Touched\n\nlocalStorage user lists; SiteConfig feature flags breakRoom, cookbook.\n\n## 4.8.4 Edge Cases & Known Limitations\n\nBuilt-in games/recipes remain in _content registries; user items merge at runtime.\n\n## 4.8.5 Related Chapters\n\nhm-4-2",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
