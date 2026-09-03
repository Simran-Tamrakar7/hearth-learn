import type { ChapterRecord } from "../../../types";

/** 5.2 Relationships */
export const chapter = {
  id: "hm-5-2",
  title: "5.2 Relationships",
  minutes: 20,
  level: "intermediate",
  phase: "Part 5 · Data Model",
  partName: "Part 5 · Data Model",
  overviewText: "Trail has many Chapters (cascade delete). User has many Progress, Notes, Badges; one Streak. Progress links User+Chapter uniquely. Notes optionally link Trail. ShowcaseItem optionally links Trail. TrailCertificate unique per user+trail.",
  why: "Foreign keys determine what deletes cascade and what APIs can join.",
  when: "Reference when writing Prisma queries with include/select.",
  practical: {"app":"Delete a trail","scenario":"Admin removes a trail from seed.","pass":"Cascade deletes Chapters, Progress, certificates referencing it.","fail":"You delete Trail row without checking ShowcaseItem.trailId orphans."},
  tools: [],
  contentMarkdown: "## Relationship diagram (text)\n\n```\nUser 1──* Progress *──1 Chapter *──1 Trail\nUser 1──1 Streak\nUser 1──* Badge\nUser 1──* Note ──?──1 Trail\nUser 1──* ShowcaseItem ──?──1 Trail\nUser 1──* TrailCertificate *──1 Trail\nUser 1──* ManualHighlight (chapterId is string — manual chapter id, not Prisma Chapter)\nUser 1──* LifeLabAttempt\n```\n\n## Uniques worth knowing\n\n- Progress: @@unique([userId, chapterId])\n- Chapter: @@unique([trailId, order])\n- TrailCertificate: @@unique([userId, trailId])\n- Streak: userId @unique",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
