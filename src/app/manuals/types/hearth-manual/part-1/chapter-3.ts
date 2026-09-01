import type { ChapterRecord } from "../../../types";

/** 2.3 Running the Project */
export const chapter = {
  id: "hm-2-3",
  title: "2.3 Running the Project",
  minutes: 20,
  level: "intermediate",
  phase: "Part 2 · Getting Started",
  partName: "Part 2 · Getting Started",
  overviewText: "Development uses npm run dev. Production build runs prisma generate, prisma db push, and next build. Lint is npm run lint (eslint). There is no npm test script — validation uses node/tsx check scripts listed in docs/local-dev.md.",
  why: "Contributors must know what to run before opening a PR.",
  when: "Run checks locally before pushing; CI expectations mirror docs/local-dev.md.",
  practical: {"app":"Pre-PR validation","scenario":"You edited registry.ts.","pass":"You run node --experimental-strip-types scripts/check-registry.ts and npx tsx scripts/check-chapter-independence.ts.","fail":"You only run npm run lint and miss registry drift."},
  advantages: ["Check scripts catch manual registry errors","build script ensures schema synced"],
  limitations: ["No automated test suite in package.json"],
  tools: [],
  contentMarkdown: "## Commands\n\n| Task | Command |\n|------|---------|\n| Dev server | `npm run dev` |\n| Production build | `npm run build` |\n| Start prod | `npm run start` |\n| Lint | `npm run lint` |\n| Regenerate manual index | `node scripts/generate-chapter-index.mjs` |\n\n## Validation (no test runner)\n\n```bash\nnode --experimental-strip-types scripts/check-registry.ts\nnpx tsx scripts/check-chapter-independence.ts\nnode --experimental-strip-types scripts/check-library.ts\n```\n\nFull list: `docs/local-dev.md`.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
