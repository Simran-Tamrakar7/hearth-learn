import type { ChapterRecord } from "../../../types";

/** 1.7 Opening the App: cypress open vs cypress run */
export const chapter = {
  "id": "cy-1-7-opening-the-app-cypress-open-vs-cypress-run",
  "title": "1.7 Opening the App: cypress open vs cypress run",
  "minutes": 24,
  "level": "beginner",
  "phase": "Part 1 · Setup & Project Structure",
  "partName": "Part 1 · Setup & Project Structure",
  "overviewText": "cypress open launches the Cypress App (launchpad → browser → spec list → two-pane runner). cypress run executes specs headlessly for CI, with optional --browser, --spec, and --record. They share the same config and specs; they differ in headedness, watch mode, video defaults, retries, and exit codes. This chapter is a decision table for HRM developers writing tests versus the pipeline that gates PRs.",
  "why": "Using only the GUI leaves you blind to CI-only failures (headless Electron vs Chrome, video, retries). Using only run mode while writing tests throws away time-travel. Knowing the flags is how you debug 'passes on my machine'.",
  "when": "Daily while authoring specs (open); on every CI job (run); when a spec passes in open and fails in run; when selecting Chrome vs Electron.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You wrote leave-request.cy.ts in the GUI. CI must run the whole e2e folder headlessly in Chrome and fail the PR if any spec fails.",
    "pass": "Local: npm run cypress:open. CI: npx cypress run --browser chrome with an npm script; you know open is headed/interactive and run is headless/exit-code driven.",
    "fail": "You document 'just use cypress open' for CI, or you pass --headed in CI as the only mode, or you confuse --record (Cloud) with video:true (local files)."
  },
  "tools": [],
  "customSummary": "- cypress open: interactive Cypress App, headed browser, time-travel, watch-and-re-run. For writing tests.\n- cypress run: headless by default, prints Mocha-like output, exit code 0/1, optional video. For CI.\n- Same specs, same config; differences: headedness, retries.openMode vs runMode, video consumption, no GUI.\n- --browser chrome|edge|firefox|electron; --spec path; --config; --env; --headed / --headless.\n- --record sends to Cypress Cloud (paid orchestration); it is not the same as local video files.\n- Parallel in Cypress means multiple run processes/machines, not one open window with two browsers.",
  "contentMarkdown": "## The two commands\n\n```bash\nnpx cypress open\nnpx cypress run\n```\n\nBoth read `cypress.config.*`, both load `support/e2e`, both execute `*.cy.*` files. **Open** is a GUI product. **Run** is a batch product.\n\n### `cypress open` — authoring\n\n1. Launchpad (if first time): E2E vs Component.\n2. Browser picker (Electron, Chrome, …).\n3. Spec list.\n4. Click a spec → **headed** window: Command Log | AUT iframe.\n5. Save a file → re-run (if `watchForFileChanges`).\n\nUse open when you are **writing** `leave-request.cy.ts`, picking selectors, and inspecting a failed `.click()`.\n\n```bash\nnpx cypress open --e2e --browser chrome\nnpx cypress open --config baseUrl=http://localhost:3000\n```\n\n`--e2e` skips the \"pick testing type\" click.\n\n### `cypress run` — CI and smoke\n\n```bash\nnpx cypress run\nnpx cypress run --browser chrome\nnpx cypress run --spec cypress/e2e/leave/submit-request.cy.ts\nnpx cypress run --headed                 # still run mode, but visible browser\nnpx cypress run --headless --browser chrome\n```\n\nDefault `run` is **headless**. Exit code **0** if all tests passed, **non-zero** if any failed (or the runner crashed). CI relies on that.\n\nVideos: only in **run** mode, and only if `video: true` (remember **Cypress 13 default false**). Open mode does not write `cypress/videos/` as your CI would.\n\n## Comparison table\n\n| | `cypress open` | `cypress run` |\n|---|---|---|\n| UI | Cypress App + real browser | Terminal; browser usually invisible |\n| Headed | Yes | No, unless `--headed` |\n| Time-travel | Yes | No (screenshots/videos instead) |\n| Watch files | Yes | No |\n| Typical user | Developer at a desk | GitHub Actions / Jenkins |\n| `retries.openMode` | Default 0 | n/a |\n| `retries.runMode` | n/a | Often 1 |\n| Video folder | Not the CI artifact path | Written if `video: true` |\n| Exit code | You quit the app | 0 / 1 for the pipeline |\n| `--record` | Unusual | Cypress Cloud upload |\n\n## Flags you will actually use\n\n```bash\n# subset of specs (glob OK)\nnpx cypress run --spec 'cypress/e2e/leave/**/*.cy.ts'\n\n# browser\nnpx cypress run --browser chrome\nnpx cypress run --browser /usr/bin/google-chrome\n\n# overlay config / env\nnpx cypress run --config video=true,baseUrl=https://staging.example\nnpx cypress run --env adminPassword=from-ci\n\n# reporter for CI\nnpx cypress run --reporter junit --reporter-options mochaFile=results/junit-[hash].xml\n\n# Cloud (optional, paid)\nnpx cypress run --record --key $CYPRESS_RECORD_KEY\n```\n\n`--record` is **Cypress Cloud**: upload videos, parallelization orchestration, dashboard. It is **not** required to get local videos (`video: true`). Teams can `cypress run` forever on the free runner.\n\n## Why a spec passes in open and fails in run\n\n1. **Different browser:** open used Chrome; run used Electron (default). Run `--browser chrome` to match.\n2. **Headless Chrome quirks:** rare, but `cypress run --headed` to compare.\n3. **Retries:** `runMode: 1` hid a flake locally in CI but you ran open with 0 retries — or the opposite.\n4. **Time:** open you waited for the app; CI started Cypress before `next dev` was ready. Use `start-server-and-test` or a health check.\n5. **Env:** laptop had `cypress.env.json`; CI did not, and `CYPRESS_*` was misspelled.\n6. **Viewport / focus:** open you clicked around; run is not hovering. Tests must not depend on \"I had DevTools open.\"\n\n## npm scripts for HRM\n\n```json\n{\n  \"scripts\": {\n    \"cypress:open\": \"cypress open --e2e --browser chrome\",\n    \"cypress:run\": \"cypress run --browser chrome\",\n    \"cypress:run:leave\": \"cypress run --browser chrome --spec 'cypress/e2e/leave/**/*.cy.ts'\"\n  }\n}\n```\n\nDevelopers: `npm run cypress:open`. CI: `npm run cypress:run`.\n\n## Playwright / Selenium comparison\n\n| Need | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Interactive debug | `cypress open` | `npx playwright test --ui` or headed `--debug` | IDE + browser window |\n| CI batch | `cypress run` | `npx playwright test` | `mvn test` / `pytest` |\n| Trace after CI | video/screenshot / Cloud | `trace.zip` + Trace Viewer | screenshots if you coded them |\n\nPlaywright's UI mode is the closest analog to `cypress open`. Selenium has no one official equivalent.\n\n## Parallelism reminder\n\n`cypress run` uses **one browser**. Two browsers means two invocations (or a CI matrix). Cloud `--parallel` assigns **specs** to machines, not tabs to a window.\n\n## Quick decision\n\n- Writing or debugging a selector → **open**\n- PR gate, nightly, \"does main pass?\" → **run**\n- Investigating a CI-only fail → **run --headed --browser chrome** on your laptop with CI's `CYPRESS_*` values\n\nNext: TypeScript — `tsconfig` **inside** `cypress/`, so `cy` and `describe` type-check without fighting the app's Next.js tsconfig.\n## Typical HRM developer day\n\n1. `npm run dev`\n2. `npm run cypress:open`\n3. Filter spec list to `leave`\n4. Run `submit-request.cy.ts`\n5. Fail on selector → Selector Playground → add `data-cy`\n6. Re-run from the GUI (or save the file)\n\nDo **not** start with `cypress run` while writing; you lose time-travel.\n\n## Typical CI job\n\n```bash\nnpm ci\nnpx cypress verify\nnpx start-server-and-test dev http://localhost:3000 \"cypress run --browser chrome\"\n```\n\nExit code non-zero fails the PR. Artifacts: upload `cypress/screenshots` (and `videos` if enabled).\n\n## `--headed` in CI\n\nUse it on a **debug job**, not the default gate. Headed on a Linux runner needs XVFB. Prefer downloading screenshots first.\n\n## Browser matrix\n\n```yaml\nstrategy:\n  matrix:\n    browser: [chrome, firefox]\nsteps:\n  - run: npx cypress run --browser ${{ matrix.browser }}\n```\n\nThat is two `cypress run` processes, not one process with two browsers. Electron is acceptable for smoke if Chrome is not in the image; match production users when you can (Chrome).\n\n## `--record` vs local video\n\n| | Local `video: true` | `--record` |\n|---|---|---|\n| Cost | Disk in CI | Cypress Cloud plan |\n| Where files go | `cypress/videos/` | Cloud dashboard |\n| Parallel spec assignment | No | Yes (Cloud) |\n\nYou can record video without Cloud. You can use Cloud without caring about the old \"video on by default\" behavior — still set `video` explicitly after Cypress 13.\n\n## Interview drill\n\nWhen do you use open vs run? Why might a spec pass in open/Chrome and fail in run/Electron? What does `--record` add that `video: true` does not?\n## Launchpad buttons (open)\n\nAfter `cypress open`: **E2E Testing** → browser tile (Chrome) → spec list. Component Testing is a different testing type with a different `supportFile`. Clicking it on an E2E-only HRM project is harmless but confusing — stay on E2E for this manual.\n\nThe spec search box filters by filename. Nested `leave/` folders collapse. \"Create new spec\" can scaffold a file; naming must still include `.cy.`.\n\n## Run-mode reporters\n\nDefault reporter is spec (dots/names in the terminal). JUnit for CI:\n\n```bash\nnpx cypress run --reporter junit --reporter-options mochaFile=results/junit-[hash].xml\n```\n\nMochawesome is a plugin you wire in `setupNodeEvents` — not required for Part 1. Screenshots still write independently of the reporter.\n\n## `--spec` glob quoting\n\n```bash\nnpx cypress run --spec 'cypress/e2e/leave/**/*.cy.ts'\n```\n\nUnquoted `**` is expanded by zsh and may pass the wrong argument list. Always quote globs in npm scripts too.\n\n## Exit codes\n\n| Code | Meaning |\n|---|---|\n| 0 | All tests passed |\n| 1 | Tests failed |\n| other | Runner crash, missing binary, no spec matched (verify the message) |\n\nCI should fail on any non-zero. \"0 tests\" with exit 0 is a misconfigured `specPattern` — catch it by asserting a minimum test count in a later pipeline step if needed.\n\n## Keyboard in open mode\n\n`r` re-runs the spec. Click a failed command for time-travel. The \"Open in IDE\" link jumps to the spec line — use it instead of `console.log`.\n\n## Interview: headed vs headless vs open\n\n- **open** = Cypress App + headed browser + watch\n- **run default** = headless, CI\n- **run --headed** = no App chrome (or limited), visible browser, still run-mode retries/video rules\n## `cypress run` browser not found\n\n```text\nCan't run because you've entered an invalid browser name.\n```\n\n`npx cypress info` lists names. CI Ubuntu images often have `chrome` after `browser-actions/setup-chrome` or a Cypress docker image. `--browser electron` always works if the binary verified.\n\n## Open mode: \"runs\" vs \"specs\"\n\nUI Mode (newer Cypress) keeps a run history in the sidebar. Classic Test Runner is one spec window. Either way you are still on **open**, not **run**. Config `retries.openMode` applies.\n\n## Recording a failing CI spec locally\n\n```bash\nexport CYPRESS_adminPassword=...   # same as CI\nnpx cypress run --browser chrome --spec cypress/e2e/leave/submit-request.cy.ts --headed\n```\n\n`--headed` plus CI env is the usual reproduction. Open is nicer once it fails the same way; start with run if the bug is headless-only.\n\n## Parallel local myth\n\n```bash\nnpx cypress run --spec a.cy.ts &\nnpx cypress run --spec b.cy.ts &\n```\n\nTwo processes, two browsers, two caches of the same user — they will clobber the HRM DB. Parallelism needs isolated data (Part 11). Do not \"speed up\" Part 1 this way.\n## `npx cypress run --help` worth scanning once\n\n`--browser`, `--spec`, `--config`, `--env`, `--headed`, `--record`, `--parallel`, `--group`, `--tag`, `--reporter`. You need the first five for Part 1. `--parallel` without Cloud still exists as a flag but orchestration is the paid part. Ignore it until Part 11.\n## npm script vs npx\n\n`npm run cypress:run` and `npx cypress run` both use `node_modules/.bin/cypress`. The script is easier to grep in `package.json`. Do not document a global `cypress run` in the HRM README.\n",
  "blocks": [
    {
      "id": "cy-1-7-md-0",
      "type": "overview",
      "heading": "The two commands",
      "content": "```bash\nnpx cypress open\nnpx cypress run\n```\n\nBoth read `cypress.config.*`, both load `support/e2e`, both execute `*.cy.*` files. **Open** is a GUI product. **Run** is a batch product.\n\n### `cypress open` — authoring\n\n1. Launchpad (if first time): E2E vs Component.\n2. Browser picker (Electron, Chrome, …).\n3. Spec list.\n4. Click a spec → **headed** window: Command Log | AUT iframe.\n5. Save a file → re-run (if `watchForFileChanges`).\n\nUse open when you are **writing** `leave-request.cy.ts`, picking selectors, and inspecting a failed `.click()`.\n\n```bash\nnpx cypress open --e2e --browser chrome\nnpx cypress open --config baseUrl=http://localhost:3000\n```\n\n`--e2e` skips the \"pick testing type\" click.\n\n### `cypress run` — CI and smoke\n\n```bash\nnpx cypress run\nnpx cypress run --browser chrome\nnpx cypress run --spec cypress/e2e/leave/submit-request.cy.ts\nnpx cypress run --headed                 # still run mode, but visible browser\nnpx cypress run --headless --browser chrome\n```\n\nDefault `run` is **headless**. Exit code **0** if all tests passed, **non-zero** if any failed (or the runner crashed). CI relies on that.\n\nVideos: only in **run** mode, and only if `video: true` (remember **Cypress 13 default false**). Open mode does not write `cypress/videos/` as your CI would.",
      "order": 0
    },
    {
      "id": "cy-1-7-md-1",
      "type": "table",
      "headers": [
        "",
        "`cypress open`",
        "`cypress run`"
      ],
      "rows": [
        [
          "UI",
          "Cypress App + real browser",
          "Terminal; browser usually invisible"
        ],
        [
          "Headed",
          "Yes",
          "No, unless `--headed`"
        ],
        [
          "Time-travel",
          "Yes",
          "No (screenshots/videos instead)"
        ],
        [
          "Watch files",
          "Yes",
          "No"
        ],
        [
          "Typical user",
          "Developer at a desk",
          "GitHub Actions / Jenkins"
        ],
        [
          "`retries.openMode`",
          "Default 0",
          "n/a"
        ],
        [
          "`retries.runMode`",
          "n/a",
          "Often 1"
        ],
        [
          "Video folder",
          "Not the CI artifact path",
          "Written if `video: true`"
        ],
        [
          "Exit code",
          "You quit the app",
          "0 / 1 for the pipeline"
        ],
        [
          "`--record`",
          "Unusual",
          "Cypress Cloud upload"
        ]
      ],
      "caption": "Comparison table",
      "order": 1
    },
    {
      "id": "cy-1-7-md-2",
      "type": "overview",
      "heading": "Flags you will actually use",
      "content": "```bash\n# subset of specs (glob OK)\nnpx cypress run --spec 'cypress/e2e/leave/**/*.cy.ts'\n\n# browser\nnpx cypress run --browser chrome\nnpx cypress run --browser /usr/bin/google-chrome\n\n# overlay config / env\nnpx cypress run --config video=true,baseUrl=https://staging.example\nnpx cypress run --env adminPassword=from-ci\n\n# reporter for CI\nnpx cypress run --reporter junit --reporter-options mochaFile=results/junit-[hash].xml\n\n# Cloud (optional, paid)\nnpx cypress run --record --key $CYPRESS_RECORD_KEY\n```\n\n`--record` is **Cypress Cloud**: upload videos, parallelization orchestration, dashboard. It is **not** required to get local videos (`video: true`). Teams can `cypress run` forever on the free runner.",
      "order": 2
    },
    {
      "id": "cy-1-7-md-3",
      "type": "overview",
      "heading": "Why a spec passes in open and fails in run",
      "content": "1. **Different browser:** open used Chrome; run used Electron (default). Run `--browser chrome` to match.\n2. **Headless Chrome quirks:** rare, but `cypress run --headed` to compare.\n3. **Retries:** `runMode: 1` hid a flake locally in CI but you ran open with 0 retries — or the opposite.\n4. **Time:** open you waited for the app; CI started Cypress before `next dev` was ready. Use `start-server-and-test` or a health check.\n5. **Env:** laptop had `cypress.env.json`; CI did not, and `CYPRESS_*` was misspelled.\n6. **Viewport / focus:** open you clicked around; run is not hovering. Tests must not depend on \"I had DevTools open.\"",
      "order": 3
    },
    {
      "id": "cy-1-7-md-4",
      "type": "overview",
      "heading": "npm scripts for HRM",
      "content": "```json\n{\n  \"scripts\": {\n    \"cypress:open\": \"cypress open --e2e --browser chrome\",\n    \"cypress:run\": \"cypress run --browser chrome\",\n    \"cypress:run:leave\": \"cypress run --browser chrome --spec 'cypress/e2e/leave/**/*.cy.ts'\"\n  }\n}\n```\n\nDevelopers: `npm run cypress:open`. CI: `npm run cypress:run`.",
      "order": 4
    },
    {
      "id": "cy-1-7-md-5",
      "type": "overview",
      "heading": "Playwright / Selenium comparison",
      "content": "| Need | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Interactive debug | `cypress open` | `npx playwright test --ui` or headed `--debug` | IDE + browser window |\n| CI batch | `cypress run` | `npx playwright test` | `mvn test` / `pytest` |\n| Trace after CI | video/screenshot / Cloud | `trace.zip` + Trace Viewer | screenshots if you coded them |\n\nPlaywright's UI mode is the closest analog to `cypress open`. Selenium has no one official equivalent.",
      "order": 5
    },
    {
      "id": "cy-1-7-md-6",
      "type": "overview",
      "heading": "Parallelism reminder",
      "content": "`cypress run` uses **one browser**. Two browsers means two invocations (or a CI matrix). Cloud `--parallel` assigns **specs** to machines, not tabs to a window.",
      "order": 6
    },
    {
      "id": "cy-1-7-md-7",
      "type": "overview",
      "heading": "Quick decision",
      "content": "- Writing or debugging a selector → **open**\n- PR gate, nightly, \"does main pass?\" → **run**\n- Investigating a CI-only fail → **run --headed --browser chrome** on your laptop with CI's `CYPRESS_*` values\n\nNext: TypeScript — `tsconfig` **inside** `cypress/`, so `cy` and `describe` type-check without fighting the app's Next.js tsconfig.",
      "order": 7
    },
    {
      "id": "cy-1-7-md-8",
      "type": "overview",
      "heading": "Typical HRM developer day",
      "content": "1. `npm run dev`\n2. `npm run cypress:open`\n3. Filter spec list to `leave`\n4. Run `submit-request.cy.ts`\n5. Fail on selector → Selector Playground → add `data-cy`\n6. Re-run from the GUI (or save the file)\n\nDo **not** start with `cypress run` while writing; you lose time-travel.",
      "order": 8
    },
    {
      "id": "cy-1-7-md-9",
      "type": "overview",
      "heading": "Typical CI job",
      "content": "```bash\nnpm ci\nnpx cypress verify\nnpx start-server-and-test dev http://localhost:3000 \"cypress run --browser chrome\"\n```\n\nExit code non-zero fails the PR. Artifacts: upload `cypress/screenshots` (and `videos` if enabled).",
      "order": 9
    },
    {
      "id": "cy-1-7-md-10",
      "type": "overview",
      "heading": "`--headed` in CI",
      "content": "Use it on a **debug job**, not the default gate. Headed on a Linux runner needs XVFB. Prefer downloading screenshots first.",
      "order": 10
    },
    {
      "id": "cy-1-7-md-11",
      "type": "overview",
      "heading": "Browser matrix",
      "content": "```yaml\nstrategy:\n  matrix:\n    browser: [chrome, firefox]\nsteps:\n  - run: npx cypress run --browser ${{ matrix.browser }}\n```\n\nThat is two `cypress run` processes, not one process with two browsers. Electron is acceptable for smoke if Chrome is not in the image; match production users when you can (Chrome).",
      "order": 11
    },
    {
      "id": "cy-1-7-md-12",
      "type": "overview",
      "heading": "`--record` vs local video",
      "content": "| | Local `video: true` | `--record` |\n|---|---|---|\n| Cost | Disk in CI | Cypress Cloud plan |\n| Where files go | `cypress/videos/` | Cloud dashboard |\n| Parallel spec assignment | No | Yes (Cloud) |\n\nYou can record video without Cloud. You can use Cloud without caring about the old \"video on by default\" behavior — still set `video` explicitly after Cypress 13.",
      "order": 12
    },
    {
      "id": "cy-1-7-md-13",
      "type": "overview",
      "heading": "Interview drill",
      "content": "When do you use open vs run? Why might a spec pass in open/Chrome and fail in run/Electron? What does `--record` add that `video: true` does not?",
      "order": 13
    },
    {
      "id": "cy-1-7-md-14",
      "type": "overview",
      "heading": "Launchpad buttons (open)",
      "content": "After `cypress open`: **E2E Testing** → browser tile (Chrome) → spec list. Component Testing is a different testing type with a different `supportFile`. Clicking it on an E2E-only HRM project is harmless but confusing — stay on E2E for this manual.\n\nThe spec search box filters by filename. Nested `leave/` folders collapse. \"Create new spec\" can scaffold a file; naming must still include `.cy.`.",
      "order": 14
    },
    {
      "id": "cy-1-7-md-15",
      "type": "overview",
      "heading": "Run-mode reporters",
      "content": "Default reporter is spec (dots/names in the terminal). JUnit for CI:\n\n```bash\nnpx cypress run --reporter junit --reporter-options mochaFile=results/junit-[hash].xml\n```\n\nMochawesome is a plugin you wire in `setupNodeEvents` — not required for Part 1. Screenshots still write independently of the reporter.",
      "order": 15
    },
    {
      "id": "cy-1-7-md-16",
      "type": "overview",
      "heading": "`--spec` glob quoting",
      "content": "```bash\nnpx cypress run --spec 'cypress/e2e/leave/**/*.cy.ts'\n```\n\nUnquoted `**` is expanded by zsh and may pass the wrong argument list. Always quote globs in npm scripts too.",
      "order": 16
    },
    {
      "id": "cy-1-7-md-17",
      "type": "overview",
      "heading": "Exit codes",
      "content": "| Code | Meaning |\n|---|---|\n| 0 | All tests passed |\n| 1 | Tests failed |\n| other | Runner crash, missing binary, no spec matched (verify the message) |\n\nCI should fail on any non-zero. \"0 tests\" with exit 0 is a misconfigured `specPattern` — catch it by asserting a minimum test count in a later pipeline step if needed.",
      "order": 17
    },
    {
      "id": "cy-1-7-md-18",
      "type": "overview",
      "heading": "Keyboard in open mode",
      "content": "`r` re-runs the spec. Click a failed command for time-travel. The \"Open in IDE\" link jumps to the spec line — use it instead of `console.log`.",
      "order": 18
    },
    {
      "id": "cy-1-7-md-19",
      "type": "overview",
      "heading": "Interview: headed vs headless vs open",
      "content": "- **open** = Cypress App + headed browser + watch\n- **run default** = headless, CI\n- **run --headed** = no App chrome (or limited), visible browser, still run-mode retries/video rules",
      "order": 19
    },
    {
      "id": "cy-1-7-md-20",
      "type": "overview",
      "heading": "`cypress run` browser not found",
      "content": "```text\nCan't run because you've entered an invalid browser name.\n```\n\n`npx cypress info` lists names. CI Ubuntu images often have `chrome` after `browser-actions/setup-chrome` or a Cypress docker image. `--browser electron` always works if the binary verified.",
      "order": 20
    },
    {
      "id": "cy-1-7-md-21",
      "type": "overview",
      "heading": "Open mode: \"runs\" vs \"specs\"",
      "content": "UI Mode (newer Cypress) keeps a run history in the sidebar. Classic Test Runner is one spec window. Either way you are still on **open**, not **run**. Config `retries.openMode` applies.",
      "order": 21
    },
    {
      "id": "cy-1-7-md-22",
      "type": "overview",
      "heading": "Recording a failing CI spec locally",
      "content": "```bash\nexport CYPRESS_adminPassword=...   # same as CI\nnpx cypress run --browser chrome --spec cypress/e2e/leave/submit-request.cy.ts --headed\n```\n\n`--headed` plus CI env is the usual reproduction. Open is nicer once it fails the same way; start with run if the bug is headless-only.",
      "order": 22
    },
    {
      "id": "cy-1-7-md-23",
      "type": "overview",
      "heading": "Parallel local myth",
      "content": "```bash\nnpx cypress run --spec a.cy.ts &\nnpx cypress run --spec b.cy.ts &\n```\n\nTwo processes, two browsers, two caches of the same user — they will clobber the HRM DB. Parallelism needs isolated data (Part 11). Do not \"speed up\" Part 1 this way.",
      "order": 23
    },
    {
      "id": "cy-1-7-md-24",
      "type": "overview",
      "heading": "`npx cypress run --help` worth scanning once",
      "content": "`--browser`, `--spec`, `--config`, `--env`, `--headed`, `--record`, `--parallel`, `--group`, `--tag`, `--reporter`. You need the first five for Part 1. `--parallel` without Cloud still exists as a flag but orchestration is the paid part. Ignore it until Part 11.",
      "order": 24
    },
    {
      "id": "cy-1-7-md-25",
      "type": "overview",
      "heading": "npm script vs npx",
      "content": "`npm run cypress:run` and `npx cypress run` both use `node_modules/.bin/cypress`. The script is easier to grep in `package.json`. Do not document a global `cypress run` in the HRM README.",
      "order": 25
    }
  ],
  "advantages": [
    "1.7 Opening the App: cypress open vs cypress run — Using only the GUI leaves you blind to CI-only failures (headless Electron vs Chrome, video, retries)."
  ],
  "limitations": [
    "1.7 Opening the App: cypress open vs cypress run is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
