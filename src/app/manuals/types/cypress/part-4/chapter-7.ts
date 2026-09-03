import type { ChapterRecord } from "../../../types";

/** 29. Parallelization & Sharding */
export const chapter = {
  id: "cy-29-parallel",
  title: "29. Parallelization & Sharding",
  minutes: 28,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Comprehensive coverage of Parallelization & Sharding in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering Parallelization & Sharding in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging parallelization & sharding in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around parallelization & sharding — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["Cloud parallel balance","cypress-parallel free","CI matrix shards","--spec subsets","timing distribution","record key dashboard"],
  limitations: ["Cloud is paid","manual shard balance","shard overhead","spec granularity","flakes worse parallel","record key secrets"],
  tools: [],
  customSummary: "- Cypress Cloud (paid) dynamically load-balances specs across CI machines by historical run time — smarter than naive even-splitting.\n- cypress-parallel (free) spawns multiple local processes on one machine — bounded by that machine's resources, still a real speedup.\n- CI-native matrix jobs (GitHub Actions, etc.) can distribute across real separate machines without Cloud, but with manual/naive splitting.",
  contentMarkdown: "## Cypress Cloud parallelization — go deeper on how the load-balancing actually works\n\n```bash\nnpx cypress run --record --key <your-record-key> --parallel\nOnce a project is connected to Cypress Cloud and multiple CI machines run this same command simultaneously (each connecting with the same --record --key and --parallel flags), Cypress Cloud's servers dynamically assign individual spec files to whichever machine becomes free next, based on each spec's historical run duration — genuinely smarter than a naive \"split the file list into N equal chunks\" approach, since spec files rarely take equal time to run and a naive even split often leaves one machine finishing dramatically earlier than another, wasting available parallel capacity.\n```\n\n## cypress-parallel — go deeper on the free-alternative mechanism\n\n```bash\nnpm install -D cypress-parallel\njson\n// package.json\n\"scripts\": {\n  \"test:parallel\": \"cypress-parallel -s cy:run -t 4 -d cypress/e2e -a '**/*.cy.js'\"\n}\ncypress-parallel (a free, community alternative to Cypress Cloud's paid parallelization) works differently — it typically pre-splits your spec files into roughly equal-sized groups (by count or, in more sophisticated configurations, by weighting based on your own historical timing data you supply) and spawns multiple local Cypress processes to run them concurrently on the same machine, rather than orchestrating genuinely separate CI machines. This is a meaningfully more limited form of parallelization than Cypress Cloud's cross-machine orchestration — it's bounded by a single machine's CPU/memory capacity — but it's free and still delivers a real speed-up over fully sequential execution, a reasonable choice for a smaller team or project not yet at the scale where paying for Cloud is worthwhile.\n```\n\n## Load balancing specs across CI runners without either tool — the manual approach\n\nyaml\n## # GitHub Actions matrix example — manual splitting across 4 jobs\n\nstrategy:\n  matrix:\n    containers: [1, 2, 3, 4]\nsteps:\n  - run: npx cypress run --spec \"cypress/e2e/**/*.cy.js\" --record --parallel --ci-build-id ${{ github.run_id }}\nEven without Cypress Cloud, most CI platforms' own matrix-job features (GitHub Actions matrix, GitLab CI parallel jobs) can spin up genuinely separate machines each running a subset of specs — though without Cloud's dynamic assignment, you're back to manually or semi-manually deciding which specs run on which machine, the same \"naive even split\" limitation cypress-parallel has, just distributed across real separate machines instead of one machine's process pool.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
