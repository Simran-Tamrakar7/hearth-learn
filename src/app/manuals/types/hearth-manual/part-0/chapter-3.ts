import type { ChapterRecord } from "../../../types";

/** 1.3 Tech Stack */
export const chapter = {
  id: "hm-1-3",
  title: "1.3 Tech Stack",
  minutes: 20,
  level: "intermediate",
  phase: "Part 1 · Overview",
  partName: "Part 1 · Overview",
  overviewText: "The stack is defined in package.json: Next 16.3.0, React 19.2.8, Prisma 5.22, NextAuth 4.24, Tailwind 4, TypeScript 5, plus docx for manual .docx export and framer-motion for landing animations. PDF export is a text PDF built in features/export.tsx (no html2pdf).",
  why: "Contributors need exact versions when debugging compatibility or upgrading dependencies.",
  when: "Reference when adding packages or explaining stack choices in PRs.",
  practical: {"app":"Adding a date library","scenario":"You need formatting on the dashboard.","pass":"You check package.json — no date lib yet; pick one compatible with React 19 / Next 16.","fail":"You assume Next 14 patterns from blog posts without reading node_modules/next/dist/docs/."},
  advantages: ["Pinned versions in package.json","Prisma + SQLite = zero external DB for local dev","Tailwind 4 via @tailwindcss/postcss"],
  limitations: ["No test runner in package.json scripts — validation is check scripts","eslint only — no prettier in package.json"],
  tools: [],
  contentMarkdown: "## Stack table (from package.json)\n\n| Technology | Version | Role in Hearth |\n|------------|---------|----------------|\n| Next.js | 16.3.0 | App Router, SSR, API routes |\n| React | 19.2.8 | UI |\n| TypeScript | ^5 | Type safety |\n| Prisma | ^5.22.0 | ORM → SQLite |\n| next-auth | ^4.24.15 | Credentials + optional Google OAuth |\n| bcryptjs | ^3.0.3 | Password hashing |\n| Tailwind CSS | ^4 | Styling |\n| framer-motion | ^13.1.0 | Landing page motion |\n| lucide-react | ^1.31.0 | Icons |\n| docx | ^9.7 | Manual .docx export (PDF is generated in export.tsx) |\n| canvas-confetti | ^1.9.4 | Celebration UI |\n| eslint + eslint-config-next | ^9 / 16.3.0 | Lint |\n\n## Scripts\n\n| Script | Command |\n|--------|---------|\n| dev | `next dev` |\n| build | prisma generate + db push + next build |\n| start | `next start` |\n| lint | `eslint` |",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
