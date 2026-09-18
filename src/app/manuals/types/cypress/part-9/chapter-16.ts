import type { ChapterRecord } from "../../../types";

/** 9.16 Migrating from Protractor/Selenium to Cypress */
export const chapter = {
  "id": "cy-9-16-migrating-from-protractor-selenium-to-cypress",
  "title": "9.16 Migrating from Protractor/Selenium to Cypress",
  "minutes": 32,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Protractor is dead (Angular dropped it); Selenium remains a valid external-driver stack. Migration is not findElement → cy.get line substitution. You move from awaited WebDriver calls and window handles to a command queue, from multi-tab/SOP freedom to cy.origin and no switchToTab, and from Java/Python to JS/TS. Rewrite critical journeys; do not transpile tests.",
  "why": "Many HRM estates still have Protractor or TestNG+Selenium. Interviewers ask how you would migrate without a six-month freeze. The answer is architecture mapping plus a thin parallel run, not a regex.",
  "when": "When a team is stuck on Protractor, when Selenium tests are unmaintainable, or when a JS frontend team wants ownership of E2E.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Bizlevate has 200 Protractor specs (including Okta and a PDF tab) and wants Cypress for the React rewrite.",
    "pass": "You rewrite leave/payroll happy paths in Cypress with data-cy, map SSO to cy.origin, move PDF-tab cases to request/href or keep them in Selenium/Playwright, and you do not mechanically rewrite browser.switchTo().",
    "fail": "You search-replace element(by.css) with cy.get and ship it, including switchTo().window."
  },
  "tools": [],
  "customSummary": "- Protractor is discontinued — migrate; do not 'upgrade Protractor.'\n- Selenium→Cypress is an execution-model change (external driver → in-page queue), not an API rename.\n- No 1:1 for window handles, implicit waits, or Java DataProviders (see 9.14).\n- Keep Playwright/Selenium for WebKit/multi-tab if those paths are critical.\n- Parallel run + rewrite highest-value journeys; kill the old suite in slices.",
  "contentMarkdown": "## Protractor is not \"old Cypress\"\n\nProtractor wrapped WebDriver + Angular-specific waiting. It died with Angular's official support. Cypress is not its successor by vendor; it is a different architecture that *also* lives in JS. Treat Protractor migration as a green-field Cypress suite informed by the old scenarios, not as a port.\n\n## Mechanical maps that *do* help\n\n| Legacy | Cypress |\n|---|---|\n| `element(by.css('[data-cy=x]'))` | `cy.get('[data-cy=x]')` |\n| `browser.get(url)` | `cy.visit(url)` |\n| `ExpectedConditions.visibilityOf` | `.should('be.visible')` (retry-ability) |\n| `browser.sleep(2000)` | delete; wait on UI or `@alias` |\n| TestNG DataProvider | generated `it()` (9.14) |\n| `browser.switchTo().frame` | `cy.get(iframe).its('0.contentDocument.body')` then `cy.wrap` — or `cy.origin` if the iframe is another origin |\n| `switchTo().window` | **no equivalent** — 9.3 |\n| `driver.get('https://okta...')` after app | `cy.origin` — 9.1 |\n\n## Maps that will hurt you\n\n- **Implicit waits + explicit waits stacked** → Cypress retry-ability already waits; adding `cy.wait(5000)` re-imports Selenium slowness.\n- **Page objects that return WebElements** → return chainables or use app actions (Part 8).\n- **`async/await` around every get** → Cypress commands are not Promises (Part 0.3). `await cy.get()` is a bug.\n- **Keeping Java** — Cypress is JS/TS only. A Java Selenium org is often a better Playwright-Java or stay-Selenium decision than a language rewrite.\n\n## Suggested migration slices for Bizlevate\n\n1. Install Cypress, agree `data-cy` on the React rewrite.\n2. Port **login + dashboard** (session, not UI login every test).\n3. Port **leave submit/approve** — highest regression cost.\n4. SSO: write `cy.origin` once, wrap with `cy.session`.\n5. PDF/new-tab: do not port `switchTo`; use 9.3 or leave those few tests in Selenium/Playwright.\n6. Turn off the equivalent Protractor specs as each slice goes green in CI (Part 11).\n\n## Versus Playwright as the destination\n\nIf the remaining Selenium suite is Python, multi-tab heavy, or Safari-critical, Playwright may be the better *target* than Cypress. Cypress is the better target when the owners are frontend engineers and CT matters (9.5). Tool choice is who maintains the tests.\n\nInterview line: \"I don't regex Protractor into Cypress. I rewrite journeys onto the command queue, map SSO to `cy.origin`, and I refuse to port `switchTo().window`.\"",
  "blocks": [
    {
      "id": "cy-9-16-md-0",
      "type": "overview",
      "heading": "Protractor is not \"old Cypress\"",
      "content": "Protractor wrapped WebDriver + Angular-specific waiting. It died with Angular's official support. Cypress is not its successor by vendor; it is a different architecture that *also* lives in JS. Treat Protractor migration as a green-field Cypress suite informed by the old scenarios, not as a port.",
      "order": 0
    },
    {
      "id": "cy-9-16-md-1",
      "type": "table",
      "headers": [
        "Legacy",
        "Cypress"
      ],
      "rows": [
        [
          "`element(by.css('[data-cy=x]'))`",
          "`cy.get('[data-cy=x]')`"
        ],
        [
          "`browser.get(url)`",
          "`cy.visit(url)`"
        ],
        [
          "`ExpectedConditions.visibilityOf`",
          "`.should('be.visible')` (retry-ability)"
        ],
        [
          "`browser.sleep(2000)`",
          "delete; wait on UI or `@alias`"
        ],
        [
          "TestNG DataProvider",
          "generated `it()` (9.14)"
        ],
        [
          "`browser.switchTo().frame`",
          "`cy.get(iframe).its('0.contentDocument.body')` then `cy.wrap` — or `cy.origin` if the iframe is another origin"
        ],
        [
          "`switchTo().window`",
          "**no equivalent** — 9.3"
        ],
        [
          "`driver.get('https://okta...')` after app",
          "`cy.origin` — 9.1"
        ]
      ],
      "caption": "Mechanical maps that *do* help",
      "order": 1
    },
    {
      "id": "cy-9-16-md-2",
      "type": "overview",
      "heading": "Maps that will hurt you",
      "content": "- **Implicit waits + explicit waits stacked** → Cypress retry-ability already waits; adding `cy.wait(5000)` re-imports Selenium slowness.\n- **Page objects that return WebElements** → return chainables or use app actions (Part 8).\n- **`async/await` around every get** → Cypress commands are not Promises (Part 0.3). `await cy.get()` is a bug.\n- **Keeping Java** — Cypress is JS/TS only. A Java Selenium org is often a better Playwright-Java or stay-Selenium decision than a language rewrite.",
      "order": 2
    },
    {
      "id": "cy-9-16-md-3",
      "type": "overview",
      "heading": "Suggested migration slices for Bizlevate",
      "content": "1. Install Cypress, agree `data-cy` on the React rewrite.\n2. Port **login + dashboard** (session, not UI login every test).\n3. Port **leave submit/approve** — highest regression cost.\n4. SSO: write `cy.origin` once, wrap with `cy.session`.\n5. PDF/new-tab: do not port `switchTo`; use 9.3 or leave those few tests in Selenium/Playwright.\n6. Turn off the equivalent Protractor specs as each slice goes green in CI (Part 11).",
      "order": 3
    },
    {
      "id": "cy-9-16-md-4",
      "type": "overview",
      "heading": "Versus Playwright as the destination",
      "content": "If the remaining Selenium suite is Python, multi-tab heavy, or Safari-critical, Playwright may be the better *target* than Cypress. Cypress is the better target when the owners are frontend engineers and CT matters (9.5). Tool choice is who maintains the tests.\n\nInterview line: \"I don't regex Protractor into Cypress. I rewrite journeys onto the command queue, map SSO to `cy.origin`, and I refuse to port `switchTo().window`.\"",
      "order": 4
    }
  ],
  "advantages": [
    "9.16 Migrating from Protractor/Selenium to Cypress — Many HRM estates still have Protractor or TestNG+Selenium."
  ],
  "limitations": [
    "9.16 Migrating from Protractor/Selenium to Cypress is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
