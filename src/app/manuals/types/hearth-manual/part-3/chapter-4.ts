import type { ChapterRecord } from "../../../types";

/** 4.4 Streaks & Badges */
export const chapter = {
  id: "hm-4-4",
  title: "4.4 Streaks & Badges",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Streaks & Badges: Streak increments when you complete a Prisma chapter on a new day. Badges like first_chapter, streak_5. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Streaks & Badges behavior or documenting it for users.",
  practical: {"app":"Streaks & Badges bug report","scenario":"User says Streaks & Badges behaves unexpectedly.","pass":"You read 4.4.2 for file paths and 4.4.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Streaks & Badges with cited file paths","Five-part template matches other features"],
  limitations: ["Some Streaks & Badges edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.4.1 What It Does (User View)\n\nStreak increments when you complete a Prisma chapter on a new day. Badges like first_chapter, streak_5.\n\n## 4.4.2 How It's Implemented (Dev View)\n\n/api/progress/toggle/route.ts, /api/user/dashboard.\n\n## 4.4.3 Data Touched\n\nStreak (1:1 User), Badge.\n\n## 4.4.4 Edge Cases & Known Limitations\n\nManual reading does NOT update Prisma streak — localStorage only for manual progress.\n\n## 4.4.5 Related Chapters\n\nhm-7-3",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
