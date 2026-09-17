import type { ChapterRecord } from "../../../types";

/** D. Common error messages & fixes */
export const chapter = {
  "id": "cy-15-4-common-error-messages-fixes",
  "title": "D. Common error messages & fixes",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 15 · Appendices",
  "partName": "Part 15 · Appendices",
  "overviewText": "Cypress errors are often English sentences: timed out retrying, detached from DOM, origin mismatch, Cypress detected you returned a promise, cy.then mixing, cross-origin iframe, failed to start (Docker libs), mochawesome overwrite, video folder empty after v13. This appendix maps message → cause → fix, with Playwright/Selenium cousins where the same product bug would look different.",
  "why": "Reading the error without adding a wait is a senior habit. Many messages name the architecture limit (origin, tab) rather than a bad selector.",
  "when": "Whenever a spec fails, and when onboarding someone who pastes stack traces into Slack.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A teammate pastes four Cypress errors from CI. You must triage without reproducing yet.",
    "pass": "You map each message to timeout vs detached vs origin vs promise vs reporter overwrite vs video default, and you propose the matching fix from this appendix.",
    "fail": "You reply 'add cy.wait(10000)' to all four."
  },
  "tools": [],
  "customSummary": "- Timeout: assertion/intercept, not sleep.\n- Detached: re-query (retry) or isolation.\n- Origin: wrap with cy.origin + args.\n- Promise/queue: don't return/await commands wrongly.\n- Infra: browsers image, video default, mochawesome two-part.",
  "contentMarkdown": "## \"Timed out retrying after 4000ms: Expected to find element\"\n\nElement never appeared, or selector is wrong, or you are on the wrong origin/tab. Fix: time-travel, correct `data-cy`, wait on `@alias`, increase timeout *once* if the API is slow. If the element is in Okta, you forgot `cy.origin` (9.1). If it is in a new tab, it will **never** appear (9.3).\n\nPlaywright cousin: `Timeout ... locator`. Selenium: `NoSuchElementException`.\n\n## \"cy.origin() must be passed a valid origin\" / cross-origin command failure\n\nYou interacted with `login.okta.com` without an origin block, or you closed over variables instead of `args`. Fix: 9.1. `chromeWebSecurity: false` is not the first fix.\n\n## \"The following error originated from your application code\" / uncaught:exception\n\nApp threw. Fix the app, or narrowly ignore a known third-party error (11.7). Do not `return false` globally.\n\n## \"detached from DOM\"\n\nThe node was found then React re-rendered. Cypress retries **queries**; if you cached a jQuery object in `.then` and clicked later, you went stale. Fix: `cy.get` again, or chain `.click()` on the query. Selenium: `StaleElementReferenceException`. Playwright: usually re-queries locators for you.\n\n## \"Cypress detected that you returned a promise from a command\"\n\nYou mixed `async/await` or returned a real Promise where the queue expected a chainable. Fix: stay in the queue (`.then`), do not `await cy.get`.\n\n## \"cy.wait() could not find a registered alias\"\n\n`cy.wait('@leave')` with no `cy.intercept(...).as('leave')`, or intercept registered **after** the request. Fix: intercept first (Part 5). Alias name collision with element aliases — network wait only works on intercept aliases.\n\n## \"Cypress could not verify that this server is running\"\n\nCI visited before the app bound the port. Fix: `wait-on` in `cypress-io/github-action` (11.1). Wrong `baseUrl` (10.2).\n\n## \"Failed to start\" / missing dependencies in Docker\n\nYou used `node:alpine` without Cypress system libs. Fix: `cypress/browsers` or `cypress/included` (11.2).\n\n## Empty videos / \"no videos recorded\"\n\nCypress 13+ `video: false` default (11.8). Set `video: true`.\n\n## Mochawesome report shows one spec\n\nOverwrite from per-spec Mocha (11.6). Two-part merge.\n\n## \"You specified a browser named webkit\"\n\nNot first-class (9.9). Use Chrome/Firefox/Electron, or Playwright for WebKit.\n\n## Shadow: 0 matches, but DevTools sees the node\n\nNeed `.shadow()` / `includeShadowDom: true` (9.4).\n\n## CI green after retries, red locally\n\nRetries hiding flake (10.3, 9.13). Fix the test.\n\n## Versus Playwright and Selenium messages\n\nPlaywright: `Error: locator.click: Target closed` (page/tab gone) — in Cypress that often looks like a timeout on the *original* tab. Selenium: `NoSuchWindowException` after a tab closed. Translate the product failure, not the string.\n\nInterview line: \"I read Cypress errors as timeout, detached, origin, queue, or infra. I don't sleep them away.\"",
  "blocks": [
    {
      "id": "cy-15-4-md-0",
      "type": "overview",
      "heading": "\"Timed out retrying after 4000ms: Expected to find element\"",
      "content": "Element never appeared, or selector is wrong, or you are on the wrong origin/tab. Fix: time-travel, correct `data-cy`, wait on `@alias`, increase timeout *once* if the API is slow. If the element is in Okta, you forgot `cy.origin` (9.1). If it is in a new tab, it will **never** appear (9.3).\n\nPlaywright cousin: `Timeout ... locator`. Selenium: `NoSuchElementException`.",
      "order": 0
    },
    {
      "id": "cy-15-4-md-1",
      "type": "overview",
      "heading": "\"cy.origin() must be passed a valid origin\" / cross-origin command failure",
      "content": "You interacted with `login.okta.com` without an origin block, or you closed over variables instead of `args`. Fix: 9.1. `chromeWebSecurity: false` is not the first fix.",
      "order": 1
    },
    {
      "id": "cy-15-4-md-2",
      "type": "overview",
      "heading": "\"The following error originated from your application code\" / uncaught:exception",
      "content": "App threw. Fix the app, or narrowly ignore a known third-party error (11.7). Do not `return false` globally.",
      "order": 2
    },
    {
      "id": "cy-15-4-md-3",
      "type": "overview",
      "heading": "\"detached from DOM\"",
      "content": "The node was found then React re-rendered. Cypress retries **queries**; if you cached a jQuery object in `.then` and clicked later, you went stale. Fix: `cy.get` again, or chain `.click()` on the query. Selenium: `StaleElementReferenceException`. Playwright: usually re-queries locators for you.",
      "order": 3
    },
    {
      "id": "cy-15-4-md-4",
      "type": "overview",
      "heading": "\"Cypress detected that you returned a promise from a command\"",
      "content": "You mixed `async/await` or returned a real Promise where the queue expected a chainable. Fix: stay in the queue (`.then`), do not `await cy.get`.",
      "order": 4
    },
    {
      "id": "cy-15-4-md-5",
      "type": "overview",
      "heading": "\"cy.wait() could not find a registered alias\"",
      "content": "`cy.wait('@leave')` with no `cy.intercept(...).as('leave')`, or intercept registered **after** the request. Fix: intercept first (Part 5). Alias name collision with element aliases — network wait only works on intercept aliases.",
      "order": 5
    },
    {
      "id": "cy-15-4-md-6",
      "type": "overview",
      "heading": "\"Cypress could not verify that this server is running\"",
      "content": "CI visited before the app bound the port. Fix: `wait-on` in `cypress-io/github-action` (11.1). Wrong `baseUrl` (10.2).",
      "order": 6
    },
    {
      "id": "cy-15-4-md-7",
      "type": "overview",
      "heading": "\"Failed to start\" / missing dependencies in Docker",
      "content": "You used `node:alpine` without Cypress system libs. Fix: `cypress/browsers` or `cypress/included` (11.2).",
      "order": 7
    },
    {
      "id": "cy-15-4-md-8",
      "type": "overview",
      "heading": "Empty videos / \"no videos recorded\"",
      "content": "Cypress 13+ `video: false` default (11.8). Set `video: true`.",
      "order": 8
    },
    {
      "id": "cy-15-4-md-9",
      "type": "overview",
      "heading": "Mochawesome report shows one spec",
      "content": "Overwrite from per-spec Mocha (11.6). Two-part merge.",
      "order": 9
    },
    {
      "id": "cy-15-4-md-10",
      "type": "overview",
      "heading": "\"You specified a browser named webkit\"",
      "content": "Not first-class (9.9). Use Chrome/Firefox/Electron, or Playwright for WebKit.",
      "order": 10
    },
    {
      "id": "cy-15-4-md-11",
      "type": "overview",
      "heading": "Shadow: 0 matches, but DevTools sees the node",
      "content": "Need `.shadow()` / `includeShadowDom: true` (9.4).",
      "order": 11
    },
    {
      "id": "cy-15-4-md-12",
      "type": "overview",
      "heading": "CI green after retries, red locally",
      "content": "Retries hiding flake (10.3, 9.13). Fix the test.",
      "order": 12
    },
    {
      "id": "cy-15-4-md-13",
      "type": "overview",
      "heading": "Versus Playwright and Selenium messages",
      "content": "Playwright: `Error: locator.click: Target closed` (page/tab gone) — in Cypress that often looks like a timeout on the *original* tab. Selenium: `NoSuchWindowException` after a tab closed. Translate the product failure, not the string.\n\nInterview line: \"I read Cypress errors as timeout, detached, origin, queue, or infra. I don't sleep them away.\"",
      "order": 13
    }
  ],
  "advantages": [
    "D. Common error messages & fixes — Reading the error without adding a wait is a senior habit."
  ],
  "limitations": [
    "D. Common error messages & fixes is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
