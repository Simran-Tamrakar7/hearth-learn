import type { ChapterRecord } from "../../../types";

/** 2.1 Prerequisites & Local Setup */
export const chapter = {
  id: "hm-2-1",
  title: "2.1 Prerequisites & Local Setup",
  minutes: 20,
  level: "intermediate",
  phase: "Part 2 · Getting Started",
  partName: "Part 2 · Getting Started",
  overviewText: "Local setup requires Node.js (20+ per @types/node), npm, and git. Clone the repo, run npm install, prisma generate, optional prisma db seed, then npm run dev on http://localhost:3000.",
  why: "Every developer and contributor starts here. Skipping seed still works — demo fallbacks exist in several APIs.",
  when: "First step on a fresh machine. See docs/local-dev.md for the canonical short version.",
  practical: {"app":"New laptop setup","scenario":"You clone hearth-learn and open localhost:3000.","pass":"npm install && npx prisma generate && npx prisma db seed && npm run dev — login with seeded admin/admin.","fail":"You skip prisma generate and wonder why @prisma/client is missing."},
  tools: [],
  contentMarkdown: "## Tools needed\n\n- **Node.js** + **npm**\n- **Git**\n- Optional: **OpenAI** key for AI features, **Resend** for email, **Google OAuth** credentials\n\n## Install steps\n\n```bash\ngit clone https://github.com/Simran-Tamrakar7/hearth-learn.git\ncd hearth-learn\nnpm install\nnpx prisma generate\nnpx prisma db seed   # optional — wipes local DB\nnpm run dev\n```\n\nOpen http://localhost:3000.\n\n## Seed admin\n\n`prisma/seed.ts` creates admin user (email `admin`, password `admin`) via `ensureSeedAdmin()` in auth flow. See `src/lib/auth.ts`.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
