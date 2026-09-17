import type { ChapterRecord } from "../../../types";

/** 3.11 Waiting Strategies */
export const chapter = {
  "id": "cy-3-11-waiting-strategies",
  "title": "3.11 Waiting Strategies",
  "minutes": 30,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "Wait hierarchy: (1) retrying commands and .should() (2) cy.wait('@alias') after cy.intercept (3) per-command timeout (4) cy.wait(ms) last, with a comment. cy.wait(3000) and cy.wait('@getUsers') share a name and mean opposite things. Timeouts: defaultCommandTimeout, requestTimeout, responseTimeout, pageLoadTimeout.",
  "why": "Numeric waits are the leading cause of Cypress flakes and slow suites. Interviewers want the hierarchy recited in order — not 'I always intercept' and not 'I always wait 2 seconds.'",
  "when": "Any test that feels racy: tables populating, buttons enabling, navigations. Revisit when someone pastes cy.wait(5000) as a 'fix.'",
  "practical": {
    "app": "Bizlevate HRM — dashboard widgets + leave submit",
    "scenario": "Visit dashboard (GET /api/dashboard), submit leave (POST), then see the success toast.",
    "pass": "You intercept+wait the dashboard GET if you care about the network; you let .should('be.visible') retry the toast; you never lead with cy.wait(3000).",
    "fail": "You cy.wait(3000) after every click, or you confuse cy.wait('@alias') with a sleep, or you wrap a DOM expect inside .then() and lose retries."
  },
  "tools": [],
  "customSummary": "- Hierarchy: retrying .should() → cy.wait('@alias') → longer command timeout → cy.wait(ms) last resort.\n- cy.wait(ms) is a sleep; cy.wait('@alias') waits for a named intercept — same command, different argument.\n- Timeouts: defaultCommandTimeout (commands), requestTimeout/responseTimeout (network), pageLoadTimeout (visit).\n- .should() retries the preceding query; expect() inside .then() does not.",
  "contentMarkdown": "## The hierarchy (internalize this order)\n\n1. **Retrying assertions** — `cy.get(...).should('be.visible')` re-queries until pass or `defaultCommandTimeout`. Default for \"wait until the UI says X\".\n2. **Named network wait** — `cy.intercept().as('x')` then `cy.wait('@x')` when you must synchronize on a request (or assert its body). Part 5 covers intercept depth; the *strategy* belongs here.\n3. **Tighten or loosen one command** — `{ timeout: 10000 }` on a slow widget, not a global 30s timeout.\n4. **`cy.wait(ms)`** — fixed sleep. Last resort, always with a comment naming the thing you cannot observe (e.g. a CSS animation with no hook). Treat as a smell in review.\n\n```js\n// Anti-pattern\ncy.get('[data-cy=submit]').click();\ncy.wait(3000);\ncy.get('[data-cy=success]').should('be.visible');\n\n// Default: no explicit wait\ncy.get('[data-cy=submit]').click();\ncy.get('[data-cy=success]').should('be.visible');\n\n// When the network itself is the contract\ncy.intercept('POST', '/api/leave-requests').as('createLeave');\ncy.get('[data-cy=submit]').click();\ncy.wait('@createLeave').its('response.statusCode').should('eq', 201);\ncy.get('[data-cy=success]').should('be.visible');\n```\n\n## Same name, two meanings\n\n`cy.wait(3000)` sleeps 3 seconds. `cy.wait('@createLeave')` waits until that intercept fires (up to `requestTimeout` / `responseTimeout`). Newcomers see `cy.wait` in a passing spec and copy a number. In code review, the argument type is the whole story: **number = smell; alias = idiomatic**.\n\n## Timeouts — which knob\n\n| Config | What it bounds |\n|---|---|\n| `defaultCommandTimeout` | `cy.get`, `.click`, `.should` retries (default 4000) |\n| `requestTimeout` | waiting for an intercept to *start* (`cy.wait('@alias')`) |\n| `responseTimeout` | waiting for that request to *finish* |\n| `pageLoadTimeout` | `cy.visit` / `cy.go` load |\n\nRaising `defaultCommandTimeout` globally to hide a slow dashboard makes every failure slower. Prefer `{ timeout: 15000 }` on the one `cy.get('[data-cy=payroll-grid]')`.\n\n## Do not drop off the retry train\n\n```js\n// Retries\ncy.get('[data-cy=rows]').should('have.length', 3);\n\n// Does NOT retry the query — length is a snapshot inside then\ncy.get('[data-cy=rows]').then(($rows) => {\n  expect($rows.length).to.eq(3);\n});\n```\n\nOnce you are in `.then()`, you have a frozen jQuery value. Use `.should()` for DOM that is still settling.\n\n## vs Playwright\n\nPlaywright auto-waits on expect(locator) similarly. Playwright's `page.wait_for_timeout(3000)` is the same anti-pattern. Cypress uniquely pairs **named** intercept waits (`@alias`) as everyday syntax; Playwright uses `wait_for_response` with a URL predicate. Interview-safe: \"I wait on assertions, then on aliased intercepts, never on a guessed number.\"\"",
  "blocks": [
    {
      "id": "cy-3-11-md-0",
      "type": "overview",
      "heading": "The hierarchy (internalize this order)",
      "content": "1. **Retrying assertions** — `cy.get(...).should('be.visible')` re-queries until pass or `defaultCommandTimeout`. Default for \"wait until the UI says X\".\n2. **Named network wait** — `cy.intercept().as('x')` then `cy.wait('@x')` when you must synchronize on a request (or assert its body). Part 5 covers intercept depth; the *strategy* belongs here.\n3. **Tighten or loosen one command** — `{ timeout: 10000 }` on a slow widget, not a global 30s timeout.\n4. **`cy.wait(ms)`** — fixed sleep. Last resort, always with a comment naming the thing you cannot observe (e.g. a CSS animation with no hook). Treat as a smell in review.\n\n```js\n// Anti-pattern\ncy.get('[data-cy=submit]').click();\ncy.wait(3000);\ncy.get('[data-cy=success]').should('be.visible');\n\n// Default: no explicit wait\ncy.get('[data-cy=submit]').click();\ncy.get('[data-cy=success]').should('be.visible');\n\n// When the network itself is the contract\ncy.intercept('POST', '/api/leave-requests').as('createLeave');\ncy.get('[data-cy=submit]').click();\ncy.wait('@createLeave').its('response.statusCode').should('eq', 201);\ncy.get('[data-cy=success]').should('be.visible');\n```",
      "order": 0
    },
    {
      "id": "cy-3-11-md-1",
      "type": "overview",
      "heading": "Same name, two meanings",
      "content": "`cy.wait(3000)` sleeps 3 seconds. `cy.wait('@createLeave')` waits until that intercept fires (up to `requestTimeout` / `responseTimeout`). Newcomers see `cy.wait` in a passing spec and copy a number. In code review, the argument type is the whole story: **number = smell; alias = idiomatic**.",
      "order": 1
    },
    {
      "id": "cy-3-11-md-2",
      "type": "overview",
      "heading": "Timeouts — which knob",
      "content": "| Config | What it bounds |\n|---|---|\n| `defaultCommandTimeout` | `cy.get`, `.click`, `.should` retries (default 4000) |\n| `requestTimeout` | waiting for an intercept to *start* (`cy.wait('@alias')`) |\n| `responseTimeout` | waiting for that request to *finish* |\n| `pageLoadTimeout` | `cy.visit` / `cy.go` load |\n\nRaising `defaultCommandTimeout` globally to hide a slow dashboard makes every failure slower. Prefer `{ timeout: 15000 }` on the one `cy.get('[data-cy=payroll-grid]')`.",
      "order": 2
    },
    {
      "id": "cy-3-11-md-3",
      "type": "overview",
      "heading": "Do not drop off the retry train",
      "content": "```js\n// Retries\ncy.get('[data-cy=rows]').should('have.length', 3);\n\n// Does NOT retry the query — length is a snapshot inside then\ncy.get('[data-cy=rows]').then(($rows) => {\n  expect($rows.length).to.eq(3);\n});\n```\n\nOnce you are in `.then()`, you have a frozen jQuery value. Use `.should()` for DOM that is still settling.",
      "order": 3
    },
    {
      "id": "cy-3-11-md-4",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright auto-waits on expect(locator) similarly. Playwright's `page.wait_for_timeout(3000)` is the same anti-pattern. Cypress uniquely pairs **named** intercept waits (`@alias`) as everyday syntax; Playwright uses `wait_for_response` with a URL predicate. Interview-safe: \"I wait on assertions, then on aliased intercepts, never on a guessed number.\"\"",
      "order": 4
    }
  ],
  "advantages": [
    "3.11 Waiting Strategies — Numeric waits are the leading cause of Cypress flakes and slow suites."
  ],
  "limitations": [
    "3.11 Waiting Strategies is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
