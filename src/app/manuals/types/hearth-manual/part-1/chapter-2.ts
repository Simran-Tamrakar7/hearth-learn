import type { ChapterRecord } from "../../../types";

/** 2.2 Environment Variables */
export const chapter = {
  id: "hm-2-2",
  title: "2.2 Environment Variables",
  minutes: 20,
  level: "intermediate",
  phase: "Part 2 · Getting Started",
  partName: "Part 2 · Getting Started",
  overviewText: "There is no .env.example in the repo. Variables are documented in docs/local-dev.md and referenced in src/lib/auth.ts, src/lib/mail.ts, src/lib/openai.ts, src/lib/databaseUrl.ts, and src/lib/permissions.ts.",
  why: "Never invent env vars — only document what code reads. Missing keys disable features gracefully (Google hidden, AI returns errors, email logs devCode locally).",
  when: "Reference when deploying to Vercel or debugging auth/email/AI.",
  practical: {"app":"Google sign-in 401","scenario":"Sign in with Google fails on Vercel.","pass":"You set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET and add callback URL {NEXTAUTH_URL}/api/auth/callback/google.","fail":"You enable Google with placeholder demo-google-client-id."},
  tools: [],
  contentMarkdown: "## Environment variables (verified in code)\n\n| Variable | Purpose | Source |\n|----------|---------|--------|\n| DATABASE_URL | SQLite path | prisma/schema.prisma, src/lib/databaseUrl.ts — default file:./dev.db; Vercel: file:/tmp/hearth.db |\n| NEXTAUTH_SECRET | JWT signing | src/lib/auth.ts, src/proxy.ts |\n| NEXTAUTH_URL | Auth + email links | src/lib/mail.ts |\n| OPENAI_API_KEY | AI coach, CV, quiz, life-lab, manual generate | src/lib/openai.ts |\n| RESEND_API_KEY | Signup approval + password reset | src/lib/mail.ts |\n| EMAIL_FROM | From header | src/lib/mail.ts — default Hearth <noreply@hearth.study> |\n| GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET | Optional OAuth | src/lib/auth.ts |\n| ADMIN_EMAIL | Extra admin account | src/lib/permissions.ts |\n| NEXT_PUBLIC_BASE_PATH | Asset URLs for GitHub Pages | src/app/manuals/registry.ts |\n| VERCEL | DB path selection | src/lib/databaseUrl.ts |\n\n## Local template (from docs/local-dev.md)\n\n```\nDATABASE_URL=\"file:./dev.db\"\nNEXTAUTH_URL=\"http://localhost:3000\"\nNEXTAUTH_SECRET=\"any-long-string\"\n```",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
