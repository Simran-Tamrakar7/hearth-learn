import type { ChapterRecord } from "../../../types";

/** 4.3 Prisma Trails & Progress */
export const chapter = {
  id: "hm-4-3",
  title: "4.3 Prisma Trails & Progress",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Prisma Trails & Progress: Eight seeded courses with chapter checkboxes on dashboard (not the manual reader). (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Prisma Trails & Progress behavior or documenting it for users.",
  practical: {"app":"Prisma Trails & Progress bug report","scenario":"User says Prisma Trails & Progress behaves unexpectedly.","pass":"You read 4.3.2 for file paths and 4.3.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Prisma Trails & Progress with cited file paths","Five-part template matches other features"],
  limitations: ["Some Prisma Trails & Progress edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.3.1 What It Does (User View)\n\nEight seeded courses with chapter checkboxes on dashboard (not the manual reader).\n\n## 4.3.2 How It's Implemented (Dev View)\n\nprisma/seed.ts, /api/trails, /api/progress/toggle, src/app/trails/_content/_registry.ts.\n\n## 4.3.3 Data Touched\n\nTrail, Chapter, Progress models.\n\n## 4.3.4 Edge Cases & Known Limitations\n\n/trails/[slug] redirects to /manuals/[slug] — Prisma slugs 404 there. ⚠️ Two systems coexist.\n\n## 4.3.5 Related Chapters\n\nhm-4-2, hm-5-2",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
