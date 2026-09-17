import type { ChapterRecord } from "../../../types";

/** 9.8 Parallelization & Sharding */
export const chapter = {
  "id": "cy-9-8-parallelization-sharding",
  "title": "9.8 Parallelization & Sharding",
  "minutes": 30,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "In Cypress, 'parallel' means multiple machines (or multiple OS processes), each running one browser against a subset of spec files — not one Cypress process juggling Chrome and Firefox, and not one process with many browser contexts like Playwright workers. Cloud --parallel assigns specs using historical timings. Free options: cypress-parallel on one host, or a CI matrix that shards --spec lists by hand.",
  "why": "Misunderstanding this word designs a broken CI: people set --browser chrome,firefox and expect concurrency, or they buy Cloud when a matrix of three GitHub runners would do. Interviewers listen for 'machines, not browsers.'",
  "when": "When the suite exceeds ~10 minutes, when you add a second CI job, or when someone asks for 'parallel browsers.'",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "The HRM suite is 40 minutes on one GitHub runner. Leadership wants 10-minute feedback on pull requests.",
    "pass": "You split specs across N machines (Cloud --parallel or a matrix with spec globs). Each job still uses one browser. Chrome vs Firefox is additional jobs, not extra parallelism inside one job.",
    "fail": "You pass multiple browsers to one cypress run and expect them to run at the same time, or you confuse Playwright worker processes with Cypress Cloud orchestration."
  },
  "tools": [],
  "customSummary": "- Parallel = many machines/processes × one browser × a shard of specs — never many browsers inside one Cypress run.\n- Cypress Cloud --record --parallel: smart historical load-balancing (paid).\n- Free: cypress-parallel (one machine, many processes) or CI matrix + --spec globs (naive split).\n- Playwright: workers on one machine + shard=1/N; Selenium Grid: many nodes. Different knobs, same goal (wall clock).\n- Firefox+Chrome coverage is extra full-suite runs, multiplied by shard count.",
  "contentMarkdown": "## Say the sentence out loud\n\n\"Cypress parallelization is spec-file sharding across machines, each machine running a single browser.\" If you cannot say that, do not draw the CI diagram yet.\n\nOne `cypress run --browser chrome` process = one browser. Two browsers = two invocations (or two jobs). Playwright can start N workers (browser contexts) in one machine more naturally; Cypress's unit of distribution is the **spec file**.\n\n## Paid: Cypress Cloud\n\n```bash\nnpx cypress run --record --key \"$CYPRESS_RECORD_KEY\" --parallel --ci-build-id \"$GITHUB_RUN_ID\"\n```\n\nAll machines share a build id. Cloud hands the next spec to a free machine based on **historical duration**, so a 4-minute payroll spec does not land on the same shard as three other slow specs. That orchestration is what you pay for (Part 11.3). Without Cloud, you can still run many machines — you just split specs yourself.\n\n## Free on one machine: cypress-parallel\n\nSpawns several Cypress processes on one runner, each with a subset of specs. Bounded by that runner's CPU/RAM. Real speedup for a beefy self-hosted runner; limited on a small GitHub-hosted box.\n\n## Free across machines: CI matrix (naive shard)\n\n```yaml\nstrategy:\n  fail-fast: false\n  matrix:\n    spec: ['cypress/e2e/leave/**', 'cypress/e2e/payroll/**', 'cypress/e2e/admin/**']\nsteps:\n  - uses: cypress-io/github-action@v6\n    with:\n      browser: chrome\n      spec: ${{ matrix.spec }}\n```\n\nThree machines, three folders. If leave is 5 minutes and payroll is 25, you wait 25. Cloud's balancer exists to fix that imbalance.\n\n## Versus Playwright and Selenium\n\n| Knob | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Unit of split | spec files | tests/workers + shard | tests across Grid nodes |\n| One process, many browsers | No | Projects/matrix, still separate launches | Grid |\n| Smart historical balance | Cloud paid | mostly DIY / third party | Grid labs / vendors |\n| Multi-browser | extra jobs | extra projects/jobs | extra capabilities |\n\nInterview line: \"Parallel in Cypress means more machines sharding specs, each with one browser. It does not mean one run drives Chrome and Firefox together.\"",
  "blocks": [
    {
      "id": "cy-9-8-md-0",
      "type": "overview",
      "heading": "Say the sentence out loud",
      "content": "\"Cypress parallelization is spec-file sharding across machines, each machine running a single browser.\" If you cannot say that, do not draw the CI diagram yet.\n\nOne `cypress run --browser chrome` process = one browser. Two browsers = two invocations (or two jobs). Playwright can start N workers (browser contexts) in one machine more naturally; Cypress's unit of distribution is the **spec file**.",
      "order": 0
    },
    {
      "id": "cy-9-8-md-1",
      "type": "overview",
      "heading": "Paid: Cypress Cloud",
      "content": "```bash\nnpx cypress run --record --key \"$CYPRESS_RECORD_KEY\" --parallel --ci-build-id \"$GITHUB_RUN_ID\"\n```\n\nAll machines share a build id. Cloud hands the next spec to a free machine based on **historical duration**, so a 4-minute payroll spec does not land on the same shard as three other slow specs. That orchestration is what you pay for (Part 11.3). Without Cloud, you can still run many machines — you just split specs yourself.",
      "order": 1
    },
    {
      "id": "cy-9-8-md-2",
      "type": "overview",
      "heading": "Free on one machine: cypress-parallel",
      "content": "Spawns several Cypress processes on one runner, each with a subset of specs. Bounded by that runner's CPU/RAM. Real speedup for a beefy self-hosted runner; limited on a small GitHub-hosted box.",
      "order": 2
    },
    {
      "id": "cy-9-8-md-3",
      "type": "overview",
      "heading": "Free across machines: CI matrix (naive shard)",
      "content": "```yaml\nstrategy:\n  fail-fast: false\n  matrix:\n    spec: ['cypress/e2e/leave/**', 'cypress/e2e/payroll/**', 'cypress/e2e/admin/**']\nsteps:\n  - uses: cypress-io/github-action@v6\n    with:\n      browser: chrome\n      spec: ${{ matrix.spec }}\n```\n\nThree machines, three folders. If leave is 5 minutes and payroll is 25, you wait 25. Cloud's balancer exists to fix that imbalance.",
      "order": 3
    },
    {
      "id": "cy-9-8-md-4",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "| Knob | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Unit of split | spec files | tests/workers + shard | tests across Grid nodes |\n| One process, many browsers | No | Projects/matrix, still separate launches | Grid |\n| Smart historical balance | Cloud paid | mostly DIY / third party | Grid labs / vendors |\n| Multi-browser | extra jobs | extra projects/jobs | extra capabilities |\n\nInterview line: \"Parallel in Cypress means more machines sharding specs, each with one browser. It does not mean one run drives Chrome and Firefox together.\"",
      "order": 4
    }
  ],
  "advantages": [
    "9.8 Parallelization & Sharding — Misunderstanding this word designs a broken CI: people set --browser chrome,firefox and expect concurrency, or they buy Cloud when a matrix of three GitHub runners would do."
  ],
  "limitations": [
    "9.8 Parallelization & Sharding is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
