import type { ChapterRecord } from "../../../types";

/** 44. Managing Test Suites at Scale (Cypress) */
export const chapter = {
  id: "cy-44-scale",
  title: "44. Managing Test Suites at Scale (Cypress)",
  minutes: 30,
  level: "advanced",
  phase: "Part 6 · Pro-Level Practices",
  partName: "Part 6 · Pro-Level Practices",
  overviewText: "Scale via spec-file parallelization, cypress-grep tags, Cloud flaky metrics, and tiered run frequency (smoke/PR/nightly).",
  why: "Hundreds of specs without tags and tiers become an always-red, always-slow gate.",
  when: "Suite runtime or flake rate threatens merge velocity.",
  practical: {"app":"Enterprise suite","scenario":"Full run 2h; PR feedback needed in 10m.","pass":"grep @smoke on PR; parallel nightly; Cloud flake dashboard.","fail":"Every PR runs everything sequentially."},
  advantages: ["spec-file parallel","cypress-grep tags","Cloud flaky metrics","tiered frequency","module folders","record analytics"],
  limitations: ["tag discipline needed","Cloud cost","grep plugin dep","shard imbalance","ownership gaps","quarantine rot"],
  tools: [],
  customSummary: "- spec-file parallel; cypress-grep tags; Cloud flaky metrics; tiered frequency",
  contentMarkdown: "## Parallel at scale\n\nKeep specs balanced and independent; use Cloud or cypress-parallel/CI matrix (Ch. 32).\n\n## Tags with cypress-grep\n\n```javascript\nit('checkout happy path', { tags: ['@smoke'] }, () => { ... });\n// CYPRESS_GREP=@smoke npx cypress run\n```\n\n## Flaky metrics\n\nCypress Cloud surfaces inconsistent tests across history — feed that into quarantine ownership.\n\n## Tiered frequency\n\n| Tier | When | Scope |\n|---|---|---|\n| Smoke | Every PR | @smoke critical paths |\n| Regression | Nightly | Full e2e |\n| Deep | Weekly | Cross-browser / slow |",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
