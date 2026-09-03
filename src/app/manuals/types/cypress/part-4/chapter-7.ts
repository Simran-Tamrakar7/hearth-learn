import type { ChapterRecord } from "../../../types";

/** 29. Parallelization & Sharding — orchestration comparison, not Adv/Lim filler. */
export const chapter = {
  id: "cy-29-parallel",
  title: "29. Parallelization & Sharding",
  minutes: 28,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText:
    "Cloud dynamic load-balancing, free cypress-parallel on one machine, and CI matrix shards — same need as Playwright parallel workers, different knobs.",
  comparisons: [
    {
      lever: "Cypress Cloud --parallel (paid)",
      equivalent: "Playwright fullyParallel + shard / CI matrix",
      verdict: "Same idea — Cloud assigns specs by historical timing across machines",
    },
    {
      lever: "cypress-parallel (free, one machine)",
      equivalent: "workers on a single host",
      verdict: "Partial — bounded by one machine's CPU/memory",
    },
    {
      lever: "CI matrix manual --spec subsets",
      equivalent: "shard=1/N style matrix jobs",
      verdict: "Same principle — naive split without historical balancing",
    },
  ],
  keyDifferences: [
    "Cypress parallel speedups are usually won at machine-count / Cloud orchestration level; Playwright also exposes per-machine worker count. Don't mix those knobs when comparing CI minutes.",
  ],
  tools: [],
  customSummary:
    "- Cypress Cloud (paid) dynamically load-balances specs across CI machines by historical run time — smarter than naive even-splitting.\n- cypress-parallel (free) spawns multiple local processes on one machine — bounded by that machine's resources, still a real speedup.\n- CI-native matrix jobs (GitHub Actions, etc.) can distribute across real separate machines without Cloud, but with manual/naive splitting.",
  contentMarkdown: `## Cypress Cloud parallelization

\`\`\`bash
npx cypress run --record --key <your-record-key> --parallel
\`\`\`

Cloud assigns specs to free machines using historical durations.

## cypress-parallel (free)

Splits specs into groups and spawns multiple local Cypress processes on one machine.

## CI matrix without Cloud

Use platform matrix jobs with manual/naive spec subsets — real separate machines, but without dynamic balancing.`,
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
