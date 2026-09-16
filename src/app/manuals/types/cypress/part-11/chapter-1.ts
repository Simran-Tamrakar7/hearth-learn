import type { ChapterRecord } from "../../../types";

/** 11.1 Running Cypress in GitHub Actions / GitLab CI / Jenkins */
export const chapter = {
  "id": "cy-11-1-running-cypress-in-github-actions-gitlab-ci-jenk",
  "title": "11.1 Running Cypress in GitHub Actions / GitLab CI / Jenkins",
  "minutes": 32,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "CI runs cypress run, not cypress open. The official GitHub Action (cypress-io/github-action) installs dependencies, caches Cypress, can start the app, wait-on a URL, and then run. GitLab and Jenkins do the same steps as shell. Parallelism is extra jobs or Cloud --parallel (9.8), not a browser matrix inside one step.",
  "why": "A green local App means nothing if PRs never run the suite. Interviewers often ask you to sketch the GitHub workflow — including start/wait-on, browser, and artifacts.",
  "when": "When the suite exists and you need a merge gate; when adding staging env vars (10.2); when splitting smoke vs nightly (10.1).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Every pull request must run @smoke against a booted HRM stack; main runs the full suite nightly.",
    "pass": "You use cypress-io/github-action with start, wait-on, browser chrome, and CYPRESS_grepTags=@smoke on PRs. You do not SSH into a laptop to click cypress open.",
    "fail": "You commit node_modules, skip wait-on so Cypress visits before Next.js is up, or you call cypress open in CI."
  },
  "tools": [],
  "customSummary": "- GitHub: cypress-io/github-action — install, cache, start, wait-on, run.\n- Always cypress run; never cypress open on the runner.\n- Boot the app (start: npm run start / wait-on http://localhost:3000) or point baseUrl at a deployed staging.\n- GitLab/Jenkins: same commands in YAML/Groovy; Docker image from 11.2.\n- Artifacts and Cloud record come in later chapters — first make a single job green.",
  "contentMarkdown": "## GitHub Actions — the pattern to memorize\n\n```yaml\nname: cypress-smoke\non: [pull_request]\njobs:\n  smoke:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: cypress-io/github-action@v6\n        with:\n          browser: chrome\n          start: npm run start\n          wait-on: 'http://localhost:3000'\n          spec: cypress/e2e/**/*.cy.ts\n        env:\n          CYPRESS_grepTags: '@smoke'\n          CYPRESS_BASE_URL: 'http://localhost:3000'\n          CYPRESS_apiUrl: 'http://localhost:4000'\n```\n\nWhat the action does: npm ci (or yarn), cache the Cypress binary, run `start` in the background, poll `wait-on` until the HRM UI responds, then `cypress run --browser chrome`. If you already deploy staging, drop `start`/`wait-on` and set `CYPRESS_BASE_URL` to staging (10.2) with secrets for users.\n\n## GitLab CI\n\n```yaml\ncypress:\n  image: cypress/browsers:latest\n  script:\n    - npm ci\n    - npm run start & npx wait-on http://localhost:3000\n    - npx cypress run --browser chrome\n  artifacts:\n    when: always\n    paths:\n      - cypress/screenshots\n      - cypress/videos\n```\n\nSame story: image with browsers (11.2), install, boot, run.\n\n## Jenkins\n\nA pipeline stage with the same shell, or a Docker agent `cypress/included` so `cypress` is on PATH. Inject credentials as masked env (`CYPRESS_`). Do not store `cypress.env.json` on the agent disk with prod passwords.\n\n## Parallel and browsers\n\nTwo browsers = two jobs (or a matrix). Spec sharding = matrix of spec globs or Cloud `--parallel` (9.8, 11.3). One step cannot \"run Chrome and Firefox in parallel inside Cypress.\"\n\n## Versus Playwright and Selenium\n\nPlaywright's GitHub action / `npx playwright install --with-deps` is the cousin. Selenium needs drivers or a Grid — more moving parts. Cypress's official action is a genuine DX advantage; still pin action major versions.\n\nInterview line: \"I use `cypress-io/github-action` with `start` + `wait-on` + `browser: chrome`. CI is `cypress run`. Smoke is `CYPRESS_grepTags`.\"",
  "advantages": [
    "11.1 Running Cypress in GitHub Actions / GitLab CI / Jenkins — A green local App means nothing if PRs never run the suite."
  ],
  "limitations": [
    "11.1 Running Cypress in GitHub Actions / GitLab CI / Jenkins is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
