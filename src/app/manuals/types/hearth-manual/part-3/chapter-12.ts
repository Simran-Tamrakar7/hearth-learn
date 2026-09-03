import type { ChapterRecord } from "../../../types";

/** 4.12 Auth & Profile */
export const chapter = {
  id: "hm-4-12",
  title: "4.12 Auth & Profile",
  minutes: 20,
  level: "intermediate",
  phase: "Part 4 · Features",
  partName: "Part 4 · Features",
  overviewText: "Auth & Profile: Email/password login, optional Google, signup approval, password reset, profile editing. (see sub-chapters below for user/dev/data/edge/related views).",
  when: "Open when changing Auth & Profile behavior or documenting it for users.",
  practical: {"app":"Auth & Profile bug report","scenario":"User says Auth & Profile behaves unexpectedly.","pass":"You read 4.12.2 for file paths and 4.12.4 for known limitations before coding.","fail":"You grep randomly without checking the feature chapter."},
  tools: [],
  contentMarkdown: "## 4.12.1 What It Does (User View)\n\nEmail/password login, optional Google, signup approval, password reset, profile editing. Profile waits for session before showing signed-out state (no flash).\n\n## 4.12.2 How It's Implemented (Dev View)\n\nsrc/lib/auth.ts, login/*, profile/page.tsx (session loading skeleton).\n\n## 4.12.3 Data Touched\n\nUser, PasswordResetToken.\n\n## 4.12.4 Edge Cases & Known Limitations\n\nNew signups PENDING until admin approves.\n\n## 4.12.5 Related Chapters\n\nhm-4-13, hm-7-1",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
