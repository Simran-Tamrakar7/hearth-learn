import type { ChapterRecord } from "../../../types";

/** 1.1 What Hearth Is */
export const chapter = {
  id: "hm-1-1",
  title: "1.1 What Hearth Is",
  minutes: 20,
  level: "intermediate",
  phase: "Part 1 · Overview",
  partName: "Part 1 · Overview",
  overviewText: "Hearth is a personal skill-trail and daily learning-habit app deployed at hearth-learn.vercel.app. The landing page frames it as learning technical skills in bite-sized trails, quietly every day — a study cabin metaphor with trails, streaks, manuals, and rest breaks.",
  why: "This chapter orients all three audiences: users learning the vocabulary, developers mapping concepts to code, and contributors understanding product scope before editing.",
  when: "Read first if you are new to the repo or onboarding someone. Revisit when UI copy uses a term you do not recognize.",
  practical: {"app":"Onboarding a friend","scenario":"They ask what Hearth does versus a generic LMS.","pass":"You explain: structured manuals (Playwright, Testing Types), a dashboard with streaks, notes, AI coach, library links, toolkits, Life Lab scenarios, and a Break Room — all in one Next.js app.","fail":"You describe features that do not exist (courses marketplace, mobile app) because you did not read the codebase."},
  advantages: ["Covers real UI terms from src/app/page.tsx and navbar","Distinguishes Prisma trails from TypeScript manuals","Points to live deployment URL"],
  limitations: ["Two parallel trail systems can confuse newcomers — see Part 4.3","Some marketing copy on / still references demo trail slugs not in the manual catalog"],
  tools: [],
  contentMarkdown: "## Plain-language description\n\nHearth is a **study cabin** for technical learning: read structured **manuals**, track **streaks** on the **dashboard**, take **notes**, use **AI Coach**, browse a **library** of external books, copy **toolkit** snippets, practice in **Life Lab**, and take breaks in the **Break Room**.\n\n## Core vocabulary (from UI + code)\n\n| Term | Meaning | Where defined |\n|------|---------|---------------|\n| **Manual** | Structured multi-chapter lesson (Playwright, Testing Types, this manual) | `src/app/manuals/registry.ts`, `types/<slug>/part-N/chapter-M.ts` |\n| **Trail (Prisma)** | Seeded SQLite course with chapters + progress checkboxes | `prisma/schema.prisma` → `Trail`, `Chapter`, `Progress` |\n| **Trail (URL)** | `/trails/*` redirects to `/manuals/*` — manual slugs only | `src/app/trails/[slug]/page.tsx` |\n| **Streak** | Daily check-in count when completing Prisma trail chapters | `Streak` model, `/api/progress/toggle` |\n| **Session / Cabin** | Signed-in study context; dashboard is the hub | `/dashboard`, `/api/user/dashboard` |\n| **Pin** | Pinned manual or item on dashboard | localStorage via `/api/me/prefs` |\n| **Highlight** | Text marked in manual reader | `ManualHighlight` + localStorage |\n| **Break Room** | Rest timer, games, cookbook, retro | `/rest` |\n| **Showcase Wall** | Portfolio of projects | `/showcase-wall`, `ShowcaseItem` |\n\n## What Hearth is NOT (verified from code)\n\n- Not a hosted video course platform\n- Not a native mobile app\n- Library books are **outbound links**, not in-app readers (see `src/app/library/_content/_registry.ts`)",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
