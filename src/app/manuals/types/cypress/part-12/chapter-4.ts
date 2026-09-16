import type { ChapterRecord } from "../../../types";

/** 12.4 Performance — Speeding Up Suites */
export const chapter = {
  "id": "cy-12-4-performance-speeding-up-suites",
  "title": "12.4 Performance — Speeding Up Suites",
  "minutes": 26,
  "level": "advanced",
  "phase": "Part 12 · Debugging & Best Practices",
  "partName": "Part 12 · Debugging & Best Practices",
  "overviewText": "The biggest Cypress speedups are fewer full visits, cy.session for login, intercepting away unused APIs, more Component Tests for combinatorial UI (9.5), and sharding across machines (9.8) — not micro-optimizing cy.get. Videos, screenshots, and headed mode are CI taxes. Playwright workers on one machine are cheaper parallelism; Cypress wants more machines or fewer E2E tests.",
  "why": "A 50-minute PR gate will be disabled. Speed is a design problem (pyramid + session + parallel), not a faster selector.",
  "when": "When PR CI exceeds ~10 minutes, before buying Cloud, and when adding another E2E for a prop-level case that belongs in CT.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "The suite is 42 minutes: every spec UI-logs in, visits the huge dashboard, records video, and tests LeaveRequestForm edge cases via E2E.",
    "pass": "You add cy.session, move prop-matrix to CT, grep @smoke on PRs, turn video off or failure-only, and shard remaining E2E.",
    "fail": "You buy more retries and higher video compression as the speed plan."
  },
  "tools": [],
  "customSummary": "- cy.session + API setup beat UI login and UI seeding.\n- CT for component combinatorics; E2E for journeys.\n- Parallel = machines/spec shards (9.8), not more browsers in one process.\n- video/screenshot/headed cost CI minutes; Cypress 13 video default false helps.\n- Playwright: more workers per box; Cypress: more boxes or smaller suite.",
  "contentMarkdown": "## Where minutes actually go\n\n1. **Login UI** — replace with `cy.session` + `cy.request` login if the API allows.\n2. **Visit + hydrate dashboard** — visit the *deep link* you need; intercept widgets you will not assert.\n3. **E2E for every validation message** — move to CT `cy.mount`.\n4. **Serial specs on one runner** — shard (9.8 / 11.3).\n5. **Video encode** — disable or retain-on-failure (11.8).\n6. **Firefox + Chrome on PR** — Chrome only on PR; Firefox nightly (9.9).\n\n## Concrete snippets\n\n```js\nbeforeEach(() => {\n  cy.session('employee', () => {\n    cy.request('POST', '/api/test-login', { role: 'employee' });\n  });\n  cy.intercept('GET', '/api/notifications*', { fixture: 'empty-notifications.json' }).as('n');\n  cy.visit('/leave/new');\n});\n```\n\nPR: `CYPRESS_grepTags=@smoke` (10.1). Nightly: full suite, maybe `--parallel`.\n\n## What not to do\n\n- `testIsolation: false` as a speed hack — you will pay in flake (12.3).\n- One giant spec file so Cloud \"has fewer specs\" — you lose sharding granularity.\n- `chromeWebSecurity: false` to skip origin blocks — wrong layer.\n\n## Versus Playwright and Selenium\n\nPlaywright: `fullyParallel`, many workers, storageState. Selenium Grid: more nodes. Cypress Cloud's selling point is historical spec balancing *because* one process cannot worker-parallel the same way. You can still go fast without Cloud using session + CT + smoke tags + a naive matrix.\n\nInterview line: \"I speed Cypress with session, intercepts, component tests, and machine sharding — not with sleeps removed one by one while videos record everything.\"",
  "advantages": [
    "12.4 Performance — Speeding Up Suites — A 50-minute PR gate will be disabled."
  ],
  "limitations": [
    "12.4 Performance — Speeding Up Suites is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
