import type { ChapterRecord } from "../../../types";

/** 1.2 Architecture */
export const chapter = {
  id: "hm-1-2",
  title: "1.2 Architecture",
  minutes: 20,
  level: "intermediate",
  phase: "Part 1 · Overview",
  partName: "Part 1 · Overview",
  overviewText: "Hearth is a Next.js 16 App Router application with React 19, SQLite via Prisma, NextAuth JWT sessions, optional OpenAI and Resend integrations, and static-plus-server-rendered pages. Auth gating lives in src/proxy.ts (not middleware.ts).",
  why: "Developers need the one-page mental model before diving into Part 3. Hosting is Vercel; build runs prisma db push.",
  when: "Read before changing routing, auth, or deployment. Pair with Chapter 1.3 for versions.",
  practical: {"app":"Debugging auth redirect loop","scenario":"Every page sends you to /login.","pass":"You check src/proxy.ts protected paths, NEXTAUTH_SECRET, and session strategy in src/lib/auth.ts.","fail":"You edit middleware.ts which does not exist in this repo."},
  tools: [],
  contentMarkdown: "## High-level diagram\n\n```\nBrowser\n  ↓\nNext.js 16 App Router (src/app/)\n  ├── Pages (dashboard, manuals, library, …)\n  ├── API routes (src/app/api/*)\n  └── proxy.ts → JWT session check → redirect /login\n  ↓\nPrisma → SQLite (DATABASE_URL, default file:./dev.db)\n  ↓\nExternal: OpenAI (AI features), Resend (email), Google OAuth (optional)\nHosting: Vercel (hearth-learn.vercel.app)\n```\n\n## Key paths\n\n| Layer | Path |\n|-------|------|\n| Pages | `src/app/<route>/page.tsx` |\n| API | `src/app/api/<name>/route.ts` |\n| Shared UI | `src/components/` |\n| Auth | `src/lib/auth.ts`, `src/proxy.ts` |\n| DB client | `src/lib/prisma.ts` |\n| Manual catalog | `src/app/manuals/registry.ts` |\n| Content registries | `src/app/*/_content/_registry.ts` |\n\nSee also: `docs/architecture.md` (partially stale on manual count).",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
