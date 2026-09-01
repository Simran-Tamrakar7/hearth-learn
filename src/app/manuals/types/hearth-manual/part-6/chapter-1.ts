import type { ChapterRecord } from "../../../types";

/** 7.1 Account & Access */
export const chapter = {
  id: "hm-7-1",
  title: "7.1 Account & Access",
  minutes: 20,
  level: "intermediate",
  phase: "Part 7 · User FAQ",
  partName: "Part 7 · User FAQ",
  overviewText: "Q&A for login, signup approval, Google OAuth, password reset, and admin accounts — answered from auth code behavior.",
  why: "User-facing answers without jargon.",
  when: "Link users here from support threads.",
  practical: {"app":"Signup stuck","scenario":"User cannot log in after registering.","pass":"Explain PENDING status until admin approves in /admin.","fail":"You say account is broken without checking User.status."},
  advantages: ["Based on src/lib/auth.ts and login pages","Password reset via 6-digit email code"],
  limitations: ["Email delivery requires RESEND_API_KEY on production"],
  tools: [],
  contentMarkdown: "## Q: How do I sign up?\n**A:** /login/signup → POST /api/auth/register. New users get status PENDING until an admin approves (src/app/admin/page.tsx).\n\n## Q: Can I use Google sign-in?\n**A:** Only if GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are configured (src/lib/auth.ts). Otherwise the button is hidden.\n\n## Q: I forgot my password.\n**A:** /login/forgot-password → 6-digit code via email (or devCode locally without Resend).\n\n## Q: Who is admin?\n**A:** Seeded admin/admin, demo@hearth.study, and optional ADMIN_EMAIL env (src/lib/permissions.ts).\n\n⚠️ Needs confirmation from product owner: exact approval SLA messaging in UI.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
