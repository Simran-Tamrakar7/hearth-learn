import type { ChapterRecord } from "../../../types";

/** 4.2 Dashboard */
export const chapter = {
  id: "hm-4-2",
  title: "4.2 Dashboard",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Dashboard: Hub after login: Prisma trail progress, streak, badges, pins, daily quote. (see sub-chapters below for user/dev/data/edge/related views).",
  when: "Open when changing Dashboard behavior or documenting it for users.",
  practical: {"app":"Dashboard bug report","scenario":"User says Dashboard behaves unexpectedly.","pass":"You read 4.2.2 for file paths and 4.2.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.2.1 What It Does (User View)\n\nHub after login: Prisma trail progress, streak, badges, pins, daily quote.\n\n## 4.2.2 How It's Implemented (Dev View)\n\nsrc/app/dashboard/page.tsx, /api/user/dashboard, /api/quote/daily.\n\n## 4.2.3 Data Touched\n\nProgress, Streak, Badge, Trail, Chapter (Prisma). Pins: localStorage.\n\n## 4.2.4 Edge Cases & Known Limitations\n\nDemo fallback to demo@hearth.study when no session.\n\n## 4.2.5 Related Chapters\n\nhm-4-3, hm-4-4",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
