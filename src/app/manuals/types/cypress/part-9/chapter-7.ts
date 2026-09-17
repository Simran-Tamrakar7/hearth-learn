import type { ChapterRecord } from "../../../types";

/** 9.7 Accessibility Testing (cypress-axe) */
export const chapter = {
  "id": "cy-9-7-accessibility-testing-cypress-axe",
  "title": "9.7 Accessibility Testing (cypress-axe)",
  "minutes": 26,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "cypress-axe injects Deque's axe-core into the page and fails the spec on violations via cy.checkA11y(). It is the same engine Playwright teams wrap (axe-playwright / @axe-core/playwright). Selenium also uses axe via language bindings. None of these replace keyboard testing or screen-reader judgment; they catch a cheap, repeatable slice (contrast, labels, duplicate ids).",
  "why": "HRM UIs are full of forms and tables — axe catches missing labels on leave dates before a WCAG audit does. Interviewers like that you know inject-then-check order and that failures are axe violations, not Cypress core.",
  "when": "After a page reaches a stable, meaningful state (dashboard loaded, form open, modal visible). Not in beforeEach against a blank visit.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You must gate the Leave Request modal against axe serious/critical issues, ignoring a known color-contrast ticket on the banner.",
    "pass": "You cy.injectAxe() after the modal is open, then cy.checkA11y with a context selector and rules/impact filter. You do not skip axe because 'QA will test a11y later.'",
    "fail": "You call checkA11y before injectAxe, or you treat axe as a full WCAG certification."
  },
  "tools": [],
  "customSummary": "- cypress-axe wraps axe-core: cy.injectAxe() then cy.checkA11y().\n- inject after the DOM you care about exists; check can be scoped to a selector.\n- Default: violations fail the test; a callback can log-without-fail during a known-debt burn-down.\n- Same engine as Playwright/Selenium axe integrations — tool choice is wiring, not rules.\n- Complements, does not replace, keyboard and AT testing.",
  "contentMarkdown": "## Install and the two-command ritual\n\n```bash\nnpm install -D cypress-axe axe-core\n```\n\n```js\n// cypress/support/e2e.ts\nimport 'cypress-axe';\n\nit('leave modal meets axe serious+', () => {\n  cy.visit('/leave');\n  cy.get('[data-cy=new-request]').click();\n  cy.get('[data-cy=leave-modal]').should('be.visible');\n\n  cy.injectAxe();\n  cy.checkA11y('[data-cy=leave-modal]', {\n    includedImpacts: ['critical', 'serious'],\n    rules: { 'color-contrast': { enabled: false } }, // tracked in JIRA-4412\n  });\n});\n```\n\n**Order:** the page (or modal) must exist, then `injectAxe()`, then `checkA11y()`. Injecting on a previous page and navigating away wastes the injection.\n\n## What you get\n\naxe reports rule ids (`label`, `button-name`, `color-contrast`, `duplicate-id`), impact, and nodes. `cy.checkA11y()` **fails the Cypress test by default** when violations remain. Playwright examples often collect violations and `expect(count).toBe(0)` manually — same engine, different default posture.\n\nThird argument: a callback `(violations) => { cy.task('log', violations) }` if you need to log in CI without failing (short-term). Do not leave that as the permanent gate.\n\n## Scope like a product person\n\nFull-page axe on a dashboard with a third-party chart will drown you. Scope to `[data-cy=leave-modal]` or `main`. Disable individual rules only with a ticket id in a comment.\n\n## Versus Playwright and Selenium\n\nAll three should use **axe-core**, not a home-grown contrast checker.\n\n| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Typical wrapper | `cypress-axe` | `@axe-core/playwright` | `axe-selenium-*` / Deque |\n| Fail the test | `checkA11y()` default fail | you assert on results | you assert on results |\n| Browser | whatever Cypress launched | any Playwright browser including WebKit | any WebDriver browser |\n\nCypress still cannot run axe in real Safari the way Playwright WebKit can. If iOS VoiceOver-class bugs are the target, axe-in-Cypress is not the whole strategy.\n\nInterview line: \"I use `cypress-axe` — same axe-core as Playwright. Inject after the UI is up, `checkA11y` scoped, fail on serious/critical. It is not a WCAG certificate.\"",
  "blocks": [
    {
      "id": "cy-9-7-md-0",
      "type": "overview",
      "heading": "Install and the two-command ritual",
      "content": "```bash\nnpm install -D cypress-axe axe-core\n```\n\n```js\n// cypress/support/e2e.ts\nimport 'cypress-axe';\n\nit('leave modal meets axe serious+', () => {\n  cy.visit('/leave');\n  cy.get('[data-cy=new-request]').click();\n  cy.get('[data-cy=leave-modal]').should('be.visible');\n\n  cy.injectAxe();\n  cy.checkA11y('[data-cy=leave-modal]', {\n    includedImpacts: ['critical', 'serious'],\n    rules: { 'color-contrast': { enabled: false } }, // tracked in JIRA-4412\n  });\n});\n```\n\n**Order:** the page (or modal) must exist, then `injectAxe()`, then `checkA11y()`. Injecting on a previous page and navigating away wastes the injection.",
      "order": 0
    },
    {
      "id": "cy-9-7-md-1",
      "type": "overview",
      "heading": "What you get",
      "content": "axe reports rule ids (`label`, `button-name`, `color-contrast`, `duplicate-id`), impact, and nodes. `cy.checkA11y()` **fails the Cypress test by default** when violations remain. Playwright examples often collect violations and `expect(count).toBe(0)` manually — same engine, different default posture.\n\nThird argument: a callback `(violations) => { cy.task('log', violations) }` if you need to log in CI without failing (short-term). Do not leave that as the permanent gate.",
      "order": 1
    },
    {
      "id": "cy-9-7-md-2",
      "type": "overview",
      "heading": "Scope like a product person",
      "content": "Full-page axe on a dashboard with a third-party chart will drown you. Scope to `[data-cy=leave-modal]` or `main`. Disable individual rules only with a ticket id in a comment.",
      "order": 2
    },
    {
      "id": "cy-9-7-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "All three should use **axe-core**, not a home-grown contrast checker.\n\n| | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Typical wrapper | `cypress-axe` | `@axe-core/playwright` | `axe-selenium-*` / Deque |\n| Fail the test | `checkA11y()` default fail | you assert on results | you assert on results |\n| Browser | whatever Cypress launched | any Playwright browser including WebKit | any WebDriver browser |\n\nCypress still cannot run axe in real Safari the way Playwright WebKit can. If iOS VoiceOver-class bugs are the target, axe-in-Cypress is not the whole strategy.\n\nInterview line: \"I use `cypress-axe` — same axe-core as Playwright. Inject after the UI is up, `checkA11y` scoped, fail on serious/critical. It is not a WCAG certificate.\"",
      "order": 3
    }
  ],
  "advantages": [
    "9.7 Accessibility Testing (cypress-axe) — HRM UIs are full of forms and tables — axe catches missing labels on leave dates before a WCAG audit does."
  ],
  "limitations": [
    "9.7 Accessibility Testing (cypress-axe) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
