import type { ChapterRecord } from "../../../types";

/** 3.14 Event Handling — Cypress.on() / cy.on() */
export const chapter = {
  "id": "cy-3-14-event-handling-cypress-on-cy-on",
  "title": "3.14 Event Handling — Cypress.on() / cy.on()",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "Cypress.on() binds Cypress-lifecycle events and is not auto-removed — put it in support files or always Cypress.off. cy.on() binds to the current AUT window and unbinds when the test ends. uncaught:exception can return false to swallow an error; never return false unconditionally or you will hide real product bugs.",
  "why": "A blanket Cypress.on('uncaught:exception', () => false) in support/e2e.js is one of the most damaging Cypress snippets on the internet. Interviewers treat it as a red flag. Knowing Cypress.on vs cy.on lifetime is how you avoid leaking a confirm handler into the next test.",
  "when": "Native dialogs (3.9), third-party ResizeObserver noise, fail hooks, window:before:load. Revisit whenever a support-file event handler makes later tests mysteriously pass or skip failures.",
  "practical": {
    "app": "Bizlevate HRM — SPA with ResizeObserver noise + delete confirm",
    "scenario": "Stop ResizeObserver loop errors from failing tests without swallowing TypeErrors from leave submit, and bind confirm Cancel only in one spec.",
    "pass": "You allowlist ResizeObserver in Cypress.on('uncaught:exception') by message; you cy.on('window:confirm') in the test. You never return false for all exceptions.",
    "fail": "You Cypress.on('uncaught:exception', () => false) in support, or you Cypress.on('window:confirm') in a test and leak Cancel into the rest of the suite."
  },
  "tools": [],
  "customSummary": "- Cypress.on: Cypress-level, persists until Cypress.off — use in support for process-wide handlers.\n- cy.on: AUT/window, test-scoped — dialogs, unload, before:load for one test.\n- uncaught:exception: return false only for a known allowlist; never blanket false.\n- Other events: fail, window:alert, window:confirm, window:before:load, uncaught:exception.",
  "contentMarkdown": "## Two APIs, two lifetimes\n\n**`Cypress.on(event, fn)`** — listens on the Cypress event bus. Handlers **persist across tests** until `Cypress.off`. That is correct for `support/e2e.js` (you want them every test) and a leak if you register inside `it()` and forget to off.\n\n**`cy.on(event, fn)`** — listens on the **current** application window / AUT. Cypress removes these when the test ends. Correct for `window:alert`, `window:confirm`, `window:before:unload` in a single spec.\n\n```js\n// support/e2e.js — process-wide, carefully filtered\nCypress.on('uncaught:exception', (err) => {\n  if (err.message.includes('ResizeObserver loop')) {\n    return false;\n  }\n  // undefined / true → Cypress fails the test (default)\n});\n\n// in a test — gone after this it()\ncy.on('window:confirm', () => false);\n```\n\nIf you must use `Cypress.on` inside a test, pair it with `afterEach(() => Cypress.off(...))` using the **same function reference**. That is easy to get wrong; prefer `cy.on`.\n\n## `uncaught:exception` — never blanket `false`\n\nWhen the AUT throws an error Cypress does not catch, the default is to **fail the test**. That is good: a click handler that throws is a product bug.\n\n```js\n// Forbidden — hides every frontend crash\nCypress.on('uncaught:exception', () => false);\n```\n\nAllowlist only third-party noise you have triaged (ResizeObserver loop, a known hydration warning with a ticket). Re-throw / return undefined for everything else. If leave submit throws `TypeError: Cannot read properties of undefined`, the test must fail.\n\nYou can also filter on `err.message` + `promise` (the second argument is the rejected promise for unhandled rejections in some versions). Keep the handler small and commented with the vendor bug URL.\n\n## Other events worth knowing\n\n```js\ncy.on('window:before:load', (win) => {\n  // too late for cy.clock's usual placement, but useful for last-second stubs\n});\n\nCypress.on('fail', (err) => {\n  // last-chance logging; rethrow err or the test is marked passed\n  throw err;\n});\n```\n\n`window:alert` / `window:confirm` — chapter 3.9. `uncaught:exception` from **your** `cy.stub().throws()` is still an exception — do not allowlist it away.\n\n`cy.once` exists for a single firing. Prefer it when a confirm should be handled once and then return to auto-accept.\n\n## vs Playwright\n\nPlaywright `page.on('dialog')` / `page.on('pageerror')` are similarly easy to register too broadly if you put them in a fixture without cleanup. Cypress makes the support-file vs test-file split more tempting because `Cypress.on` in support is the documented place for `uncaught:exception`. The discipline is the same: **narrow filters, no swallow-all.**\n\nInterview-safe: \"`Cypress.on` persists, `cy.on` does not. I never `return false` from `uncaught:exception` for all errors — only a named allowlist.\"\"",
  "advantages": [
    "3.14 Event Handling — Cypress.on() / cy.on() — A blanket Cypress."
  ],
  "limitations": [
    "3.14 Event Handling — Cypress.on() / cy.on() is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
