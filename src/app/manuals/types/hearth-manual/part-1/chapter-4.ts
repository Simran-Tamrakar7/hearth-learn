import type { ChapterRecord } from "../../../types";

/** 2.4 Local Data */
export const chapter = {
  id: "hm-2-4",
  title: "2.4 Local Data",
  minutes: 20,
  level: "intermediate",
  phase: "Part 2 · Getting Started",
  partName: "Part 2 · Getting Started",
  overviewText: "Local data lives in SQLite at DATABASE_URL (default ./dev.db). prisma db seed wipes and reloads demo user, 8 Prisma trails with chapters, streaks, and badges. Manual content is TypeScript files — not in the DB. User manuals and progress use localStorage keys prefixed hearth_.",
  why: "Developers need to know what seed affects vs what is file-based.",
  when: "Run seed when DB is corrupted; never expect seed to reset manual chapter files.",
  practical: {"app":"Empty dashboard trails","scenario":"Dashboard shows no trail progress after experiments.","pass":"npx prisma db seed — reloads 8 trails from prisma/seed.ts.","fail":"You delete src/app/manuals/types/ expecting seed to restore manuals."},
  advantages: ["Clear separation: Prisma data vs TS manual files vs localStorage"],
  limitations: ["Seed wipes ALL SQLite data","Vercel /tmp DB is ephemeral"],
  tools: [],
  contentMarkdown: "## SQLite (Prisma)\n\n- **Reset:** `npx prisma db seed` (see prisma/seed.ts)\n- **Schema push:** `npx prisma db push`\n- **8 seeded trails:** slugs like nextjs-server-components — listed in src/app/trails/_content/_registry.ts\n\n## File-based content\n\n- Manual chapters: `src/app/manuals/types/<slug>/part-N/chapter-M.ts`\n- Library books: `src/app/library/_content/_registry.ts`\n- Toolkits: `src/app/toolkits/_content/`\n\n## localStorage (browser)\n\nKeys via src/lib/userScope.ts — manual progress, pins, user-created manuals, library saves. Not cleared by prisma seed.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
