import type { ChapterRecord } from "../../../types";

/** 4.7 Life Lab */
export const chapter = {
  id: "hm-4-7",
  title: "4.7 Life Lab",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Life Lab: Six scenario arenas (interview, bughunt, founder, crisis, negotiation, refactor) with AI-generated prompts and scoring. (see sub-chapters below for user/dev/data/edge/related views).",
  why: "Feature chapters use a fixed template so you can compare implementation patterns across Hearth.",
  when: "Open when changing Life Lab behavior or documenting it for users.",
  practical: {"app":"Life Lab bug report","scenario":"User says Life Lab behaves unexpectedly.","pass":"You read 4.7.2 for file paths and 4.7.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  advantages: ["Dedicated chapter for Life Lab with cited file paths","Five-part template matches other features"],
  limitations: ["Some Life Lab edge cases may need product confirmation"],
  tools: [],
  contentMarkdown: "## 4.7.1 What It Does (User View)\n\nSix scenario arenas with AI-generated prompts and scoring. Clear error message when not signed in or when the API fails.\n\n## 4.7.2 How It's Implemented (Dev View)\n\nsrc/app/life-simulator/_ui/ArenaStudio.tsx, /api/life-lab, LifeLabAttempt model.\n\n## 4.7.3 Data Touched\n\nLifeLabAttempt in SQLite.\n\n## 4.7.4 Edge Cases & Known Limitations\n\nRequires OPENAI_API_KEY and canUseAI permission. Errors shown inline in the arena.\n\n## 4.7.5 Related Chapters\n\nhm-4-10, hm-6-1",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
