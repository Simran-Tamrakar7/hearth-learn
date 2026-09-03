import type { ChapterRecord } from "../../../types";

/** 39. CI/CD Integration (Cypress) */
export const chapter = {
  id: "cy-39-cicd",
  title: "39. CI/CD Integration (Cypress)",
  minutes: 32,
  level: "advanced",
  phase: "Part 5 · CI/CD & Reporting",
  partName: "Part 5 · CI/CD & Reporting",
  overviewText: "Official cypress-io/github-action; upload artifacts with if: always(); turn video off for CI cost; split smoke vs regression; cache the Cypress binary.",
  why: "A green local suite that fails silently in CI wastes the whole investment. Artifact and cache patterns are non-optional.",
  when: "Wiring first pipeline or optimizing CI minutes/storage.",
  practical: {"app":"GitHub Actions monorepo","scenario":"Need PR smoke + nightly full suite.","pass":"github-action + binary cache; smoke on PR; artifacts always().","fail":"npx cypress run with no cache redownloading every job."},
  tools: [],
  customSummary: "- github-action; if always() artifacts; video false for CI cost; smoke vs regression; cache Cypress binary",
  contentMarkdown: "## Official GitHub Action\n\n```yaml\n- uses: cypress-io/github-action@v6\n  with:\n    build: npm run build\n    start: npm start\n    browser: chrome\n```\n\nHandles install, binary cache, and run conventions.\n\n## Artifacts\n\n```yaml\n- uses: actions/upload-artifact@v4\n  if: always()\n  with:\n    name: cypress-videos\n    path: cypress/videos\n```\n\nUse `if: always()` so failures still upload videos/screenshots.\n\n## Cost & scope\n\n- `video: false` in CI when storage/minutes hurt; keep screenshots on fail\n- **Smoke** (critical paths) on every PR; **full regression** nightly\n- Cache `~/.cache/Cypress` (action does this) to avoid re-download",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
