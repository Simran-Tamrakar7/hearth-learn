import type { ChapterRecord } from "../../../types";

/** 3.4 Start Here Lookup Table */
export const chapter = {
  id: "hm-3-4",
  title: "3.4 Start Here Lookup Table",
  minutes: 20,
  level: "intermediate",
  phase: "Part 3 · Codebase Map",
  partName: "Part 3 · Codebase Map",
  overviewText: "Quick routing table from intent to first file to open. Covers streaks, new manuals, auth, AI, notes, admin, and content registries.",
  why: "The fastest on-ramp for experienced devs who know what they want to change.",
  when: "Bookmark this chapter.",
  practical: {"app":"Add a new builtin manual","scenario":"You want a Cypress manual.","pass":"types/cypress/meta.json + toc.ts + part-0/chapter-1.ts → generate-chapter-index.mjs → registry.ts → check-registry.ts.","fail":"You only edit registry.ts without chapter files."},
  tools: [],
  contentMarkdown: "## I want to… → Start in…\n\n| I want to… | Start in… |\n|------------|-----------|\n| Change streak calculation | src/app/api/progress/toggle/route.ts |\n| Add a new manual | src/app/manuals/types/<slug>/, scripts/generate-chapter-index.mjs, registry.ts |\n| Change login / signup | src/lib/auth.ts, src/app/login/, src/app/api/auth/ |\n| Edit manual reader UI | src/app/manuals/features/reader.tsx, [slug]/page.tsx |\n| Add library book | src/app/library/_content/_registry.ts |\n| Add toolkit | src/app/toolkits/_content/<id>/meta.ts + _registry.ts |\n| Life Lab arena | src/app/life-simulator/_content/<arena>/meta.ts |\n| Admin approve users | src/app/admin/page.tsx, /api/admin/users |\n| Global feature flags | /api/admin/features, SiteConfig model |\n| Password reset email | src/lib/mail.ts, /api/auth/forgot |\n| AI coach prompt | src/app/api/ai/coach/route.ts |\n| Navbar links | src/components/layout/Navbar.tsx |\n| Theme / prefs | /api/me/prefs, src/lib/prefs.ts |",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
