import type { ChapterRecord } from "../../../types";

/** 2.4 Retry-ability */
export const chapter = {
  "id": "cy-2-4-retry-ability",
  "title": "2.4 Retry-ability",
  "minutes": 32,
  "level": "beginner",
  "phase": "Part 2 · Core Syntax & Commands",
  "partName": "Part 2 · Core Syntax & Commands",
  "overviewText": "Cypress retries queries and assertions together until they pass or defaultCommandTimeout fires. Retry is driven by assertions: get().should('have.length', 3) re-queries until three rows exist, then the chain continues. Clicks and type wait for actionability (visible, enabled, not covered, not animating), while .then() never retries. This chapter is the difference between Cypress and a Selenium implicit wait, and between Cypress should and a Playwright expect.",
  "why": "Flakes are usually assertions that were written as .then, clicks that miss actionability, or global timeouts used as a blunt instrument. Interviews: 'what does Cypress retry?' — not 'everything', and not '.then'.",
  "when": "Any time a list populates asynchronously, a button is covered by a spinner, or a test passes only with cy.wait(ms). Also when converting expect() in a then() that needed to retry.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "The leave table is empty, then three rows arrive from GET /api/leave. You must click the last row once all three exist, without a fixed wait.",
    "pass": "cy.get('[data-cy=leave-table] tbody tr').should('have.length', 3).last().click(); you know .then(($rows) => expect($rows).to.have.length(3)) would flake; you wait for actionability on the click.",
    "fail": "You cy.wait(2000), or assert length inside .then, or click before the overlay spinner is gone and disable retry by wrapping in .then."
  },
  "tools": [],
  "customSummary": "- Retry is assertion-driven: should/and retry the preceding query until pass or timeout.\n- Actions retry until actionability: visible, enabled, not disabled, not covered, not animating.\n- .then() never retries — snapshot the subject once. Put retryable checks in .should.\n- defaultCommandTimeout (4s) bounds DOM retries; do not raise it globally (Part 1.5).\n- cy.wait(ms) is not retry-ability. cy.wait('@alias') waits on network, then UI still needs should.\n- Playwright expect(locator) retries similarly; Selenium implicit wait does not retry assertions.",
  "contentMarkdown": "## Retry is not \"Cypress waits 4 seconds then clicks\"\n\nA command **re-runs its query** (and its assertion, if any) until:\n\n- the assertion passes, or\n- the command's timeout hits (`defaultCommandTimeout` 4000 ms unless overridden)\n\n```ts\ncy.get('[data-cy=leave-table] tbody tr')\n  .should('have.length', 3)\n  .last()\n  .click();\n```\n\nTimeline:\n\n1. `get` finds 0 rows → `should` fails internally → **retry get + should**\n2. 1 row appears → still fail → retry\n3. 3 rows → `should` passes → subject is the 3 rows → `.last()` → `.click()`\n\n`.click()` then applies **actionability** retries (covered below).\n\nWithout `should('have.length', 3)`, `get('tr').last().click()` might click the only row that exists at t=0, then the table re-renders — flake. **The assertion is what defines the wait.**\n\n## Assertions drive retries\n\n| Pattern | Retries? |\n|---|---|\n| `cy.get('.x').should('be.visible')` | Yes — query + assertion |\n| `cy.get('.x').should('have.length', 3)` | Yes |\n| `cy.get('.x').and('contain.text', 'Ada')` | Yes (`and` is `should`) |\n| `cy.contains('Ada').should('exist')` | Yes |\n| `cy.get('.x').then(($el) => { expect($el).to.have.length(3); })` | **No** |\n| `cy.get('.x').should(($el) => { expect($el).to.have.length(3); })` | **Yes** (function assertion) |\n\nThe `.then` vs `.should` distinction is the most important in this chapter.\n\n```ts\n// FLAKY — then does not retry\ncy.get('tr').then(($rows) => {\n  expect($rows).to.have.length(3);\n});\n\n// STABLE — should retries\ncy.get('tr').should('have.length', 3);\n\n// STABLE — should with function still retries the get\ncy.get('tr').should(($rows) => {\n  expect($rows.length).to.eq(3);\n});\n```\n\nInside a `.should(fn)`, throwing (or failing `expect`) triggers retry. Do not `cy.*` inside `.should(fn)` — Cypress documents that as unsupported. Use `.then` for nested commands.\n\n## `.then` never retries\n\n`.then` means: **the previous command has yielded; run this callback once.**\n\n```ts\ncy.get('[data-cy=status]').then(($el) => {\n  const text = $el.text(); // snapshot NOW\n  expect(text).to.eq('Pending'); // if still \"Loading\", fail immediately\n});\n```\n\nUse `.then` for:\n\n- branching (`if`)\n- parsing once you already `.should`'d readiness\n- kicking off more `cy` commands after a guaranteed subject\n\nDo not use `.then` as a waiting assertion.\n\n## Actionability (clicks, type, check, select)\n\nBefore `.click()`, `.type()`, `.clear()`, `.check()`, Cypress asserts the element is **actionable**:\n\n- **visible** (not `display:none`, not zero size, not `visibility:hidden` in the Cypress sense)\n- **not disabled** (`disabled` attribute / `aria-disabled` depending on command)\n- **not covered** by another element (spinner overlay, modal backdrop, sticky header)\n- **not animating** (waits for animation to finish)\n- inside a scrollable container: Cypress **scrolls it into view**\n\nIf a spinner covers **Submit**, `.click()` retries until the spinner is gone or timeout. The error is famous:\n\n```text\ncy.click() failed because this element is being covered by another element:\n<div class=\"spinner-overlay\">...\n```\n\nFix the overlay (or `cy.get('[data-cy=leave-table]').should('be.visible')` first), do not `{ force: true }` by habit. `force: true` skips actionability — valid for hidden file inputs, a last resort otherwise.\n\nPlaywright also has actionability (visible, stable, enabled, receives events). Selenium clicks the coordinates the driver has — **no** cover check. Cypress/Playwright catch \"click intercepted\" class bugs; Selenium often \"clicks\" the overlay.\n\n## Timeouts: layered, local first\n\n```ts\ncy.get('[data-cy=payroll-grid]', { timeout: 15000 }).should('be.visible');\n```\n\nPer-command `timeout` overrides `defaultCommandTimeout` for **that** command. Visit uses `pageLoadTimeout`. Tasks use `taskTimeout`.\n\n**Never** set `defaultCommandTimeout: 30000` in config to make this grid pass (Part 1.5). You hide locator bugs in every other command.\n\n## What does *not* retry\n\n| Command / pattern | Behavior |\n|---|---|\n| `.then()` | Once |\n| `.spread()` | Once |\n| Most `cy.wrap(plainObject)` + immediate sync read | No DOM retry unless `.should` is attached |\n| `cy.wait(1000)` | Sleep, then continue |\n| `expect(x).to.eq(1)` in the `it` body (phase 1) | Runs before the app exists — useless |\n| `cy.request` | HTTP; not DOM retry (has its own request/response timeouts) |\n\n`cy.wrap($el).should('have.class', 'ready')` **does** retry if `$el` is a DOM/jQuery subject that Cypress can re-query — wrap of a **detached snapshot** may not re-query. Prefer `cy.get` over wrapping a stale node.\n\n## `cy.wait` vs retry-ability\n\n```ts\ncy.wait(5000);                 // always 5s — slow and still racy\ncy.wait('@getLeave');          // wait for intercept alias (Part 5)\ncy.get('tr').should('have.length', 3); // wait for UI truth\n```\n\nBest HRM pattern: intercept the list API, `cy.wait('@getLeave')`, **then** `should('have.length', n)` if you still care about render. Network done ≠ DOM painted.\n\n## Playwright / Selenium comparison\n\n| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Retry assertions | `should` with the query | `expect(locator).toHaveCount(3)` | Manual `WebDriverWait` + ExpectedConditions |\n| Click cover check | Yes (actionability) | Yes | No (usually) |\n| Non-retrying hook | `.then` | reading `await locator.count()` without expect can be a snapshot | `findElements` size now |\n| Global implicit wait | Discouraged (`defaultCommandTimeout` keep 4s) | `timeout` in config, still used more narrowly | Implicit wait — classic footgun |\n\nPlaywright's `await expect(locator).toHaveCount(3)` is the cousin of `cy.get().should('have.length', 3)`. Playwright's `await locator.count()` **without** expect is the cousin of `.then` — a snapshot.\n\n## HRM example: spinner then table\n\n```ts\nit('shows three leave rows after load', () => {\n  cy.visit('/leave');\n  cy.get('[data-cy=leave-table] tbody tr')\n    .should('have.length', 3)\n    .last()\n    .find('[data-cy=open]')\n    .click();\n  cy.contains('h1', 'Leave detail').should('be.visible');\n});\n```\n\nIf the click still fails as covered:\n\n```ts\ncy.get('[data-cy=spinner]').should('not.exist');\n```\n\nThat assertion retries until the spinner is gone — then click.\n\n## Debugging retries in the GUI\n\nThe Command Log shows a **pinwheel** on the command while it retries, then a match count. Click the command: see the DOM at attempts. If it \"tried for 4s and 0 matched\", your selector is wrong. If it matched 1 then 3, you needed `have.length`.\n\nNext: **aliases** — naming subjects, intercepts, and data so later commands can reuse them without illegal `const`.\n## Retry diagram (leave table)\n\n```text\nt=0ms   get tr → 0 nodes → should length 3 fail → retry\nt=200   get tr → 0 nodes (spinner) → retry\nt=800   get tr → 3 nodes → should pass → last() → click\nt=800+  click waits until not covered by spinner\n```\n\nIf you had used `.then(expect length 3)` at t=0, the test fails immediately.\n\n## `{ timeout, interval }`\n\n```ts\ncy.get('tr', { timeout: 10000, interval: 200 }).should('have.length', 3);\n```\n\n`interval` is how often Cypress re-queries (default ~50–60ms). You almost never change it. You sometimes change `timeout`.\n\n## `force: true` catalog\n\nAcceptable: `<input type=\"file\">` hidden, custom widgets that never become \"visible\" but are the real control. Unacceptable: covering modal, disabled button, off-screen tab you should open first.\n\n## Animations\n\nCypress waits for CSS animations to finish (actionability). If HRM uses perpetual skeleton shimmer, actionability may wait until `defaultCommandTimeout`. Assert `data-cy=table-ready` or wait for intercept instead of clicking the shimmer.\n\n## `cy.clock` interaction (preview)\n\nIf you freeze clocks, animations and timeouts in the **app** may never finish. Actionability can then hang. Unlock the clock before clicking, or do not freeze for that spec.\n\n## Interview drill\n\nWhat drives retry? Does `.then` retry? Name four actionability checks. How do you wait for 3 rows then click the last? Why not `cy.wait(2000)`?\n## `should('exist')` after get is weak\n\n`cy.get('.x')` already retries until the element exists. Adding `.should('exist')` rarely changes the wait. Adding `.should('be.visible')` or length/text **does**.\n\n## Request vs DOM retry\n\n`cy.wait('@getLeave')` retries until the intercept fires (`requestTimeout` / wait timeout). It does not retry your table assertion. Always follow with a DOM `should` if the user cares about rows.\n\n## Flake recipe and the fix\n\nRecipe: click Submit, `then` read toast text, `expect` equals Saved. Toast appears at 300ms; `then` ran at 20ms. Fix: `cy.contains('[data-cy=toast]', 'Saved').should('be.visible')`.\n\n## `{ force: true }` on type\n\n`cy.get('input').type('x', { force: true })` types even if covered. You may hide that a date picker overlay is eating clicks. Prefer closing the overlay.\n\n## Comparison sentence for interviews\n\n\"Cypress retries the **query plus assertion** until timeout; `.then` is a snapshot. Playwright retries `expect(locator)`. Selenium retries only if I wrote a wait. Actionability means Cypress refuses to click covered/disabled/animating elements.\"\n## `defaultCommandTimeout` vs assertion message\n\nWhen a `should('have.length', 3)` fails, the error includes \"tried for 4000ms\" (or your timeout). That number is the knob you overrode — or the global you should **not** have raised. Read it before editing config.\n\n## `cy.get` with `{ timeout: 0 }`\n\n```ts\ncy.get('.toast', { timeout: 0 }).should('not.exist');\n```\n\nZero timeout means one attempt. Useful after you already waited for a positive signal and want a cheap negative check. Dangerous as a first assertion on a slow page.\n\n## Covered-by error — HRM spinner\n\nLeave table specs should either wait for `[data-cy=leave-table]` visible **and** `[data-cy=spinner]` not exist, or `should('have.length', n)` on rows (rows imply spinner gone if the UI is built that way). Know which your frontend does.\n## `should('be.visible')` vs opacity 0\n\nA modal with `opacity: 0` may still \"exist.\" Cypress visibility rules are documented (no zero size, no `display:none`, not `visibility:hidden`, not covered — coverage is actionability for clicks more than `be.visible`). If a designer uses opacity animations, assert a `data-state=open` attribute the component already has.\n## `requestTimeout` on `cy.wait('@alias')`\n\nIf the intercept never fires, you wait until the wait timeout (related to `requestTimeout`), not `defaultCommandTimeout`. Wrong layer again. Register the intercept **before** `visit`.\n## Summary card\n\nRetry = query + `should`/`and`/`should(fn)` + actionability on actions. No retry = `.then`, phase-1 `expect`, `cy.wait(ms)`. Fix flakes with a better assertion, an intercept wait, or a local `{ timeout }`, never a 30s global `defaultCommandTimeout`.\n",
  "blocks": [
    {
      "id": "cy-2-4-md-0",
      "type": "overview",
      "heading": "Retry is not \"Cypress waits 4 seconds then clicks\"",
      "content": "A command **re-runs its query** (and its assertion, if any) until:\n\n- the assertion passes, or\n- the command's timeout hits (`defaultCommandTimeout` 4000 ms unless overridden)\n\n```ts\ncy.get('[data-cy=leave-table] tbody tr')\n  .should('have.length', 3)\n  .last()\n  .click();\n```\n\nTimeline:\n\n1. `get` finds 0 rows → `should` fails internally → **retry get + should**\n2. 1 row appears → still fail → retry\n3. 3 rows → `should` passes → subject is the 3 rows → `.last()` → `.click()`\n\n`.click()` then applies **actionability** retries (covered below).\n\nWithout `should('have.length', 3)`, `get('tr').last().click()` might click the only row that exists at t=0, then the table re-renders — flake. **The assertion is what defines the wait.**",
      "order": 0
    },
    {
      "id": "cy-2-4-md-1",
      "type": "overview",
      "heading": "Assertions drive retries",
      "content": "| Pattern | Retries? |\n|---|---|\n| `cy.get('.x').should('be.visible')` | Yes — query + assertion |\n| `cy.get('.x').should('have.length', 3)` | Yes |\n| `cy.get('.x').and('contain.text', 'Ada')` | Yes (`and` is `should`) |\n| `cy.contains('Ada').should('exist')` | Yes |\n| `cy.get('.x').then(($el) => { expect($el).to.have.length(3); })` | **No** |\n| `cy.get('.x').should(($el) => { expect($el).to.have.length(3); })` | **Yes** (function assertion) |\n\nThe `.then` vs `.should` distinction is the most important in this chapter.\n\n```ts\n// FLAKY — then does not retry\ncy.get('tr').then(($rows) => {\n  expect($rows).to.have.length(3);\n});\n\n// STABLE — should retries\ncy.get('tr').should('have.length', 3);\n\n// STABLE — should with function still retries the get\ncy.get('tr').should(($rows) => {\n  expect($rows.length).to.eq(3);\n});\n```\n\nInside a `.should(fn)`, throwing (or failing `expect`) triggers retry. Do not `cy.*` inside `.should(fn)` — Cypress documents that as unsupported. Use `.then` for nested commands.",
      "order": 1
    },
    {
      "id": "cy-2-4-md-2",
      "type": "overview",
      "heading": "`.then` never retries",
      "content": "`.then` means: **the previous command has yielded; run this callback once.**\n\n```ts\ncy.get('[data-cy=status]').then(($el) => {\n  const text = $el.text(); // snapshot NOW\n  expect(text).to.eq('Pending'); // if still \"Loading\", fail immediately\n});\n```\n\nUse `.then` for:\n\n- branching (`if`)\n- parsing once you already `.should`'d readiness\n- kicking off more `cy` commands after a guaranteed subject\n\nDo not use `.then` as a waiting assertion.",
      "order": 2
    },
    {
      "id": "cy-2-4-md-3",
      "type": "overview",
      "heading": "Actionability (clicks, type, check, select)",
      "content": "Before `.click()`, `.type()`, `.clear()`, `.check()`, Cypress asserts the element is **actionable**:\n\n- **visible** (not `display:none`, not zero size, not `visibility:hidden` in the Cypress sense)\n- **not disabled** (`disabled` attribute / `aria-disabled` depending on command)\n- **not covered** by another element (spinner overlay, modal backdrop, sticky header)\n- **not animating** (waits for animation to finish)\n- inside a scrollable container: Cypress **scrolls it into view**\n\nIf a spinner covers **Submit**, `.click()` retries until the spinner is gone or timeout. The error is famous:\n\n```text\ncy.click() failed because this element is being covered by another element:\n<div class=\"spinner-overlay\">...\n```\n\nFix the overlay (or `cy.get('[data-cy=leave-table]').should('be.visible')` first), do not `{ force: true }` by habit. `force: true` skips actionability — valid for hidden file inputs, a last resort otherwise.\n\nPlaywright also has actionability (visible, stable, enabled, receives events). Selenium clicks the coordinates the driver has — **no** cover check. Cypress/Playwright catch \"click intercepted\" class bugs; Selenium often \"clicks\" the overlay.",
      "order": 3
    },
    {
      "id": "cy-2-4-md-4",
      "type": "overview",
      "heading": "Timeouts: layered, local first",
      "content": "```ts\ncy.get('[data-cy=payroll-grid]', { timeout: 15000 }).should('be.visible');\n```\n\nPer-command `timeout` overrides `defaultCommandTimeout` for **that** command. Visit uses `pageLoadTimeout`. Tasks use `taskTimeout`.\n\n**Never** set `defaultCommandTimeout: 30000` in config to make this grid pass (Part 1.5). You hide locator bugs in every other command.",
      "order": 4
    },
    {
      "id": "cy-2-4-md-5",
      "type": "overview",
      "heading": "What does *not* retry",
      "content": "| Command / pattern | Behavior |\n|---|---|\n| `.then()` | Once |\n| `.spread()` | Once |\n| Most `cy.wrap(plainObject)` + immediate sync read | No DOM retry unless `.should` is attached |\n| `cy.wait(1000)` | Sleep, then continue |\n| `expect(x).to.eq(1)` in the `it` body (phase 1) | Runs before the app exists — useless |\n| `cy.request` | HTTP; not DOM retry (has its own request/response timeouts) |\n\n`cy.wrap($el).should('have.class', 'ready')` **does** retry if `$el` is a DOM/jQuery subject that Cypress can re-query — wrap of a **detached snapshot** may not re-query. Prefer `cy.get` over wrapping a stale node.",
      "order": 5
    },
    {
      "id": "cy-2-4-md-6",
      "type": "overview",
      "heading": "`cy.wait` vs retry-ability",
      "content": "```ts\ncy.wait(5000);                 // always 5s — slow and still racy\ncy.wait('@getLeave');          // wait for intercept alias (Part 5)\ncy.get('tr').should('have.length', 3); // wait for UI truth\n```\n\nBest HRM pattern: intercept the list API, `cy.wait('@getLeave')`, **then** `should('have.length', n)` if you still care about render. Network done ≠ DOM painted.",
      "order": 6
    },
    {
      "id": "cy-2-4-md-7",
      "type": "overview",
      "heading": "Playwright / Selenium comparison",
      "content": "| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Retry assertions | `should` with the query | `expect(locator).toHaveCount(3)` | Manual `WebDriverWait` + ExpectedConditions |\n| Click cover check | Yes (actionability) | Yes | No (usually) |\n| Non-retrying hook | `.then` | reading `await locator.count()` without expect can be a snapshot | `findElements` size now |\n| Global implicit wait | Discouraged (`defaultCommandTimeout` keep 4s) | `timeout` in config, still used more narrowly | Implicit wait — classic footgun |\n\nPlaywright's `await expect(locator).toHaveCount(3)` is the cousin of `cy.get().should('have.length', 3)`. Playwright's `await locator.count()` **without** expect is the cousin of `.then` — a snapshot.",
      "order": 7
    },
    {
      "id": "cy-2-4-md-8",
      "type": "overview",
      "heading": "HRM example: spinner then table",
      "content": "```ts\nit('shows three leave rows after load', () => {\n  cy.visit('/leave');\n  cy.get('[data-cy=leave-table] tbody tr')\n    .should('have.length', 3)\n    .last()\n    .find('[data-cy=open]')\n    .click();\n  cy.contains('h1', 'Leave detail').should('be.visible');\n});\n```\n\nIf the click still fails as covered:\n\n```ts\ncy.get('[data-cy=spinner]').should('not.exist');\n```\n\nThat assertion retries until the spinner is gone — then click.",
      "order": 8
    },
    {
      "id": "cy-2-4-md-9",
      "type": "overview",
      "heading": "Debugging retries in the GUI",
      "content": "The Command Log shows a **pinwheel** on the command while it retries, then a match count. Click the command: see the DOM at attempts. If it \"tried for 4s and 0 matched\", your selector is wrong. If it matched 1 then 3, you needed `have.length`.\n\nNext: **aliases** — naming subjects, intercepts, and data so later commands can reuse them without illegal `const`.",
      "order": 9
    },
    {
      "id": "cy-2-4-md-10",
      "type": "overview",
      "heading": "Retry diagram (leave table)",
      "content": "```text\nt=0ms   get tr → 0 nodes → should length 3 fail → retry\nt=200   get tr → 0 nodes (spinner) → retry\nt=800   get tr → 3 nodes → should pass → last() → click\nt=800+  click waits until not covered by spinner\n```\n\nIf you had used `.then(expect length 3)` at t=0, the test fails immediately.",
      "order": 10
    },
    {
      "id": "cy-2-4-md-11",
      "type": "overview",
      "heading": "`{ timeout, interval }`",
      "content": "```ts\ncy.get('tr', { timeout: 10000, interval: 200 }).should('have.length', 3);\n```\n\n`interval` is how often Cypress re-queries (default ~50–60ms). You almost never change it. You sometimes change `timeout`.",
      "order": 11
    },
    {
      "id": "cy-2-4-md-12",
      "type": "overview",
      "heading": "`force: true` catalog",
      "content": "Acceptable: `<input type=\"file\">` hidden, custom widgets that never become \"visible\" but are the real control. Unacceptable: covering modal, disabled button, off-screen tab you should open first.",
      "order": 12
    },
    {
      "id": "cy-2-4-md-13",
      "type": "overview",
      "heading": "Animations",
      "content": "Cypress waits for CSS animations to finish (actionability). If HRM uses perpetual skeleton shimmer, actionability may wait until `defaultCommandTimeout`. Assert `data-cy=table-ready` or wait for intercept instead of clicking the shimmer.",
      "order": 13
    },
    {
      "id": "cy-2-4-md-14",
      "type": "overview",
      "heading": "`cy.clock` interaction (preview)",
      "content": "If you freeze clocks, animations and timeouts in the **app** may never finish. Actionability can then hang. Unlock the clock before clicking, or do not freeze for that spec.",
      "order": 14
    },
    {
      "id": "cy-2-4-md-15",
      "type": "overview",
      "heading": "Interview drill",
      "content": "What drives retry? Does `.then` retry? Name four actionability checks. How do you wait for 3 rows then click the last? Why not `cy.wait(2000)`?",
      "order": 15
    },
    {
      "id": "cy-2-4-md-16",
      "type": "overview",
      "heading": "`should('exist')` after get is weak",
      "content": "`cy.get('.x')` already retries until the element exists. Adding `.should('exist')` rarely changes the wait. Adding `.should('be.visible')` or length/text **does**.",
      "order": 16
    },
    {
      "id": "cy-2-4-md-17",
      "type": "overview",
      "heading": "Request vs DOM retry",
      "content": "`cy.wait('@getLeave')` retries until the intercept fires (`requestTimeout` / wait timeout). It does not retry your table assertion. Always follow with a DOM `should` if the user cares about rows.",
      "order": 17
    },
    {
      "id": "cy-2-4-md-18",
      "type": "overview",
      "heading": "Flake recipe and the fix",
      "content": "Recipe: click Submit, `then` read toast text, `expect` equals Saved. Toast appears at 300ms; `then` ran at 20ms. Fix: `cy.contains('[data-cy=toast]', 'Saved').should('be.visible')`.",
      "order": 18
    },
    {
      "id": "cy-2-4-md-19",
      "type": "overview",
      "heading": "`{ force: true }` on type",
      "content": "`cy.get('input').type('x', { force: true })` types even if covered. You may hide that a date picker overlay is eating clicks. Prefer closing the overlay.",
      "order": 19
    },
    {
      "id": "cy-2-4-md-20",
      "type": "overview",
      "heading": "Comparison sentence for interviews",
      "content": "\"Cypress retries the **query plus assertion** until timeout; `.then` is a snapshot. Playwright retries `expect(locator)`. Selenium retries only if I wrote a wait. Actionability means Cypress refuses to click covered/disabled/animating elements.\"",
      "order": 20
    },
    {
      "id": "cy-2-4-md-21",
      "type": "overview",
      "heading": "`defaultCommandTimeout` vs assertion message",
      "content": "When a `should('have.length', 3)` fails, the error includes \"tried for 4000ms\" (or your timeout). That number is the knob you overrode — or the global you should **not** have raised. Read it before editing config.",
      "order": 21
    },
    {
      "id": "cy-2-4-md-22",
      "type": "overview",
      "heading": "`cy.get` with `{ timeout: 0 }`",
      "content": "```ts\ncy.get('.toast', { timeout: 0 }).should('not.exist');\n```\n\nZero timeout means one attempt. Useful after you already waited for a positive signal and want a cheap negative check. Dangerous as a first assertion on a slow page.",
      "order": 22
    },
    {
      "id": "cy-2-4-md-23",
      "type": "overview",
      "heading": "Covered-by error — HRM spinner",
      "content": "Leave table specs should either wait for `[data-cy=leave-table]` visible **and** `[data-cy=spinner]` not exist, or `should('have.length', n)` on rows (rows imply spinner gone if the UI is built that way). Know which your frontend does.",
      "order": 23
    },
    {
      "id": "cy-2-4-md-24",
      "type": "overview",
      "heading": "`should('be.visible')` vs opacity 0",
      "content": "A modal with `opacity: 0` may still \"exist.\" Cypress visibility rules are documented (no zero size, no `display:none`, not `visibility:hidden`, not covered — coverage is actionability for clicks more than `be.visible`). If a designer uses opacity animations, assert a `data-state=open` attribute the component already has.",
      "order": 24
    },
    {
      "id": "cy-2-4-md-25",
      "type": "overview",
      "heading": "`requestTimeout` on `cy.wait('@alias')`",
      "content": "If the intercept never fires, you wait until the wait timeout (related to `requestTimeout`), not `defaultCommandTimeout`. Wrong layer again. Register the intercept **before** `visit`.",
      "order": 25
    },
    {
      "id": "cy-2-4-md-26",
      "type": "overview",
      "heading": "Summary card",
      "content": "Retry = query + `should`/`and`/`should(fn)` + actionability on actions. No retry = `.then`, phase-1 `expect`, `cy.wait(ms)`. Fix flakes with a better assertion, an intercept wait, or a local `{ timeout }`, never a 30s global `defaultCommandTimeout`.",
      "order": 26
    }
  ],
  "advantages": [
    "2.4 Retry-ability — Flakes are usually assertions that were written as."
  ],
  "limitations": [
    "2.4 Retry-ability is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
