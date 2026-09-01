import type { ChapterRecord } from "../../../types";

/** 7.3 Streaks & Habit Tracking */
export const chapter = {
  id: "hm-7-3",
  title: "7.3 Streaks & Habit Tracking",
  minutes: 20,
  level: "intermediate",
  phase: "Part 7 · User FAQ",
  partName: "Part 7 · User FAQ",
  overviewText: "Streaks increment when you complete a Prisma trail chapter via /api/progress/toggle on a new calendar day. Reading manual chapters does not increment the server streak.",
  why: "Sets correct expectations for habit features.",
  when: "Answer streak questions from this chapter.",
  practical: {"app":"Streak did not increase","scenario":"User read a manual chapter all day.","pass":"Explain streak ties to dashboard Prisma chapter completion, not manual reader.","fail":"You change code without explaining two progress systems."},
  advantages: ["Behavior verified in progress/toggle route","Badges: first_chapter, streak_5, etc. in seed"],
  limitations: ["Manual daily habit not tied to streak — ⚠️ product gap?"],
  tools: [],
  contentMarkdown: "## Q: What happens if I miss a day?\n**A:** Streak logic in /api/progress/toggle compares lastCheckIn date. Missing a day resets currentCount (read route for exact rules).\n\n## Q: Do manual chapters count for streaks?\n**A:** No — only Prisma Progress completions via dashboard toggle.\n\n## Q: Where do I see my streak?\n**A:** Dashboard and profile (/api/user/dashboard).\n\n⚠️ Needs confirmation from product owner: whether manual reading should future-count toward streaks.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
