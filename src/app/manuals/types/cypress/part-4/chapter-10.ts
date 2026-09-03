import type { ChapterRecord } from "../../../types";

/** 32. Parallel Execution & Sharding (Cypress) */
export const chapter = {
  id: "cy-32-parallel",
  title: "32. Parallel Execution & Sharding (Cypress)",
  minutes: 30,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Cypress parallelizes at the spec-file level. Cypress Cloud dynamically load-balances; cypress-parallel is the free local option; CI matrix jobs are a naive free alternative. Fewer, well-organized specs reduce launch overhead.",
  why: "Suite wall-clock time dominates CI feedback. Understanding Cypress's spec-file granularity (not test-case) prevents wasted parallel capacity and wrong expectations from Playwright ports.",
  when: "Enable when sequential cypress run exceeds ~15 minutes. Prefer Cloud when paying; cypress-parallel or CI matrix otherwise.",
  practical: {"app":"Web app under test","scenario":"200+ specs take 90+ minutes sequentially on CI.","pass":"Cloud --parallel or cypress-parallel with balanced specs; each spec independent.","fail":"Giant monolithic specs that serialize work; shared mutable fixtures across specs."},
  tools: [],
  customSummary: "- Cypress parallelizes at spec-file level; Cloud dynamic load-balance; cypress-parallel free local; CI matrix naive; fewer well-organized specs reduce launch overhead",
  contentMarkdown: "## Spec-file parallelization\n\nCypress assigns work at the **spec file** boundary — not individual `it()` blocks. One large `checkout.cy.js` with 40 tests still runs on a single machine/process. Split by product area so parallel workers stay busy.\n\n## Cypress Cloud (--parallel)\n\n```bash\nnpx cypress run --record --key $CYPRESS_RECORD_KEY --parallel\n```\n\nMultiple CI machines with the same record key + `--parallel` get specs assigned dynamically from Cloud based on historical durations — smarter than equal file-count splits.\n\n## cypress-parallel (free, local)\n\n```bash\nnpm install -D cypress-parallel\n# package.json: \"test:parallel\": \"cypress-parallel -s cy:run -t 4 -d cypress/e2e\"\n```\n\nSpawns multiple Cypress processes on **one** machine. Bounded by that machine's CPU/RAM, but free and effective for mid-size suites.\n\n## CI matrix (naive)\n\nGitHub Actions / GitLab matrix jobs can shard `--spec` globs across machines without Cloud. You own the split — uneven runtimes leave capacity idle.\n\n## Spec organization tip\n\nFewer, coherent specs beat hundreds of tiny one-test files: each Cypress launch has fixed overhead. Aim for logical feature slices that still finish in similar wall-clock time.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
