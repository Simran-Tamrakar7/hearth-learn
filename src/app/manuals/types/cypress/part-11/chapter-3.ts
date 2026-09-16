import type { ChapterRecord } from "../../../types";

/** 11.3 Cypress Cloud — Recorded Runs, Dashboards, Analytics */
export const chapter = {
  "id": "cy-11-3-cypress-cloud-recorded-runs-dashboards-analytics",
  "title": "11.3 Cypress Cloud — Recorded Runs, Dashboards, Analytics",
  "minutes": 26,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "Cypress Cloud is the paid dashboard: record a run with --record --key, upload videos/screenshots, see spec timing, flake history, and (with enough machines) intelligent --parallel spec assignment. It does not unlock cy.origin or CT. Open-source Cypress can already run tests; Cloud is orchestration and visibility (Part 0.1).",
  "why": "Procurement will ask what you are buying. The honest answer is historical load-balancing, hosted artifacts, and flake analytics — not a new assertion API.",
  "when": "When CI has three runners and naive shards are unbalanced, when you need a PR status check with a URL, and when comparing Cloud to Sorry Cypress/Currents (11.5).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Leadership wants a link in the GitHub PR showing which leave spec failed, plus parallelization that does not require hand-maintained globs.",
    "pass": "You set projectId, inject CYPRESS_RECORD_KEY, and cypress run --record --parallel --ci-build-id. You explain Cloud is not extra commands.",
    "fail": "You tell them Cloud is required to run Cypress in CI at all."
  },
  "tools": [],
  "customSummary": "- Cloud = record + dashboard + flake analytics + smart --parallel. Not extra test APIs.\n- --record --key / CYPRESS_RECORD_KEY; projectId in config.\n- --parallel requires record and a shared ci-build-id across machines (9.8).\n- OSS already has local video/screenshot; Cloud hosts them and graphs history.\n- Playwright Trace is a zip; Cloud Replay is hosted (9.12). Selenium vendors sell similar dashboards.",
  "contentMarkdown": "## What you configure\n\n```js\nexport default defineConfig({\n  projectId: 'abc123', // from the Cloud UI\n  e2e: { /* ... */ },\n});\n```\n\n```bash\nnpx cypress run --record --key \"$CYPRESS_RECORD_KEY\" --parallel --ci-build-id \"$GITHUB_RUN_ID\"\n```\n\nNever commit the record key. GitHub secret → env `CYPRESS_RECORD_KEY` (the action also accepts `record: true` + the secret). All parallel machines **must** share the same `ci-build-id` or Cloud treats them as separate runs and cannot balance specs (9.8).\n\n## What you get\n\n- A URL per run (paste into the PR).\n- Spec duration history → **smarter shards** than folder globs.\n- Flake detection across attempts (pairs with 9.13 / 10.3 — still fix the test).\n- Hosted screenshots/videos/Test Replay depending on plan (9.12, 11.4).\n\n## What you do not get\n\n- WebKit, multi-tab, or a Trace Viewer zip.\n- Permission to skip `wait-on` or `data-cy`.\n- Extra assertions. Cloud is orchestration and visibility (Part 0.1).\n\n## Privacy\n\nPayroll videos are compensation data. Legal may forbid `--record` to Cypress.io. Then use 11.5 (Sorry Cypress / Currents) or no record + artifacts (11.8).\n\n## Versus Playwright and Selenium\n\nPlaywright OSS already shards and ships `trace.zip` without a Cypress-like paywall for *balancing*. Selenium + Sauce/BrowserStack is the old vendor-dashboard model. Cypress Cloud is closer to \"a dashboard that speaks Cypress spec files\" plus flake UI. Do not tell a Playwright team they \"need Cloud to see traces.\"\n\nInterview line: \"Cloud records runs and load-balances specs across machines. I can run 100% of Cypress without it. I pay when CI orchestration and hosted replay matter — not because the runner is incomplete.\"",
  "advantages": [
    "11.3 Cypress Cloud — Recorded Runs, Dashboards, Analytics — Procurement will ask what you are buying."
  ],
  "limitations": [
    "11.3 Cypress Cloud — Recorded Runs, Dashboards, Analytics is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
