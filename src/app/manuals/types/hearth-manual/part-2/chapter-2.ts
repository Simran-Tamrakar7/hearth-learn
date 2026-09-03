import type { ChapterRecord } from "../../../types";

/** 3.2 File-Level Reference (Key Files) */
export const chapter = {
  id: "hm-3-2",
  title: "3.2 File-Level Reference (Key Files)",
  minutes: 20,
  level: "intermediate",
  phase: "Part 3 · Codebase Map",
  partName: "Part 3 · Codebase Map",
  overviewText: "Critical files: src/proxy.ts (auth gate), src/lib/auth.ts (NextAuth config), src/app/manuals/registry.ts (manual catalog), src/app/manuals/features/reader.tsx (reader UI), prisma/schema.prisma (all models). Each feature folder often has page_details-code_routes.md.",
  why: "Deep reference for files you touch repeatedly.",
  when: "Use when implementing a feature change, not for first-day orientation.",
  practical: {"app":"Change streak logic","scenario":"Streak should not increment twice same day.","pass":"Edit src/app/api/progress/toggle/route.ts — read Streak model update logic.","fail":"You search for streak in a non-existent src/lib/streaks.ts."},
  tools: [],
  contentMarkdown: "## Core files\n\n| File | Exports / role | Depends on |\n|------|----------------|------------|\n| src/proxy.ts | Auth middleware | next-auth/jwt |\n| src/lib/auth.ts | authOptions, providers | prisma, bcrypt |\n| src/lib/prisma.ts | prisma client singleton | DATABASE_URL |\n| src/app/manuals/registry.ts | MANUALS, genres, helpers | chapters-manifest imports |\n| src/app/manuals/features/reader.tsx | Reader UI, MANUALS_DATA | registry |\n| src/app/manuals/types.ts | ChapterRecord type | — |\n| prisma/schema.prisma | All DB models | — |\n\n## API route pattern\n\nEach `src/app/api/<name>/route.ts` exports HTTP handlers (GET, POST, …). Index: Part 6.\n\n## Per-page maps\n\nSearch for `page_details-code_routes.md` under src/ — 25+ files.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
