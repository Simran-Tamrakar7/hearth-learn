import type { ChapterRecord } from "../../../types";

/** 9.15 cy.screenshot() API */
export const chapter = {
  "id": "cy-9-15-cy-screenshot-api",
  "title": "9.15 cy.screenshot() API",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "cy.screenshot() captures the current app iframe (or an element, or the runner) to cypress/screenshots. It is an artifact API — naming, capture, blackout, overwrite, onAfterScreenshot — not visual regression. Automatic failure screenshots are configured separately (screenshotOnRunFailure). Playwright splits page.screenshot vs expect().toHaveScreenshot; Cypress puts capture here and comparison in plugins (9.6).",
  "why": "You will use this in CI artifacts, in docs, and when blacking out PII on payroll screens before a PNG leaves the runner. Confusing it with matchImageSnapshot causes false confidence.",
  "when": "On failure (automatic), at explicit checkpoints, and when a report needs a still. Not as your visual-diff strategy.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Payroll run confirmation shows bank account numbers. You need a screenshot for the failure report with the account blacked out.",
    "pass": "You cy.get(card).screenshot({ blackout: ['[data-cy=iban]'] }) and know this does not compare to a baseline.",
    "fail": "You use cy.screenshot() as a visual assertion, or you screenshot the whole runner including the Command Log when you meant the app only."
  },
  "tools": [],
  "customSummary": "- cy.screenshot() writes PNG artifacts; it does not diff.\n- Capture modes: fullPage, viewport, runner, or element via cy.get().screenshot().\n- blackout hides secrets; overwrite avoids timestamp clutter.\n- Failure screenshots: screenshotOnRunFailure (distinct from calling the command).\n- Playwright: screenshot vs toHaveScreenshot are different APIs — Cypress only ships the first.",
  "contentMarkdown": "## Command vs config\n\n```js\ncy.screenshot('payroll-confirm'); // cypress/screenshots/<spec>/payroll-confirm.png\n\ncy.get('[data-cy=pay-run-card]').screenshot('pay-run-card', {\n  padding: 16,\n  blackout: ['[data-cy=iban]', '[data-cy=ssn]'],\n  overwrite: true,\n});\n```\n\n```js\n// cypress.config.ts\nexport default defineConfig({\n  screenshotOnRunFailure: true, // default true\n  screenshotsFolder: 'cypress/screenshots',\n  e2e: {\n    setupNodeEvents(on) {\n      on('after:screenshot', (details) => details);\n    },\n  },\n});\n```\n\nAutomatic failure shots do not need a command in the spec. Explicit `cy.screenshot()` is for checkpoints and documentation.\n\n## Useful options\n\n| Option | Why |\n|---|---|\n| `capture: 'fullPage' \\| 'viewport' \\| 'runner'` | `runner` includes the Command Log — rarely what you want in a product bug ticket |\n| `blackout` | CSS selectors covered before capture — payroll PII |\n| `overwrite` | stable filename for docs |\n| `onAfterScreenshot` | copy/resize in Node via task if you must |\n\n## Not visual testing\n\nThere is no threshold, no baseline, no fail-on-diff. Pair with 9.6 if you need comparison. Pair with 11.8 if you need the PNG as a CI artifact.\n\n## Versus Playwright and Selenium\n\nPlaywright: `page.screenshot({ path })` ≈ this chapter; `expect(page).toHaveScreenshot()` ≈ 9.6. Selenium: `getScreenshotAs`. All three can leak PII in CI artifacts — blackout is an HRM-specific discipline, not a Cypress novelty.\n\nInterview line: \"`cy.screenshot()` is capture. Visual regression is a plugin. I blackout IBAN on payroll shots so artifacts are safe to store.\"",
  "blocks": [
    {
      "id": "cy-9-15-md-0",
      "type": "overview",
      "heading": "Command vs config",
      "content": "```js\ncy.screenshot('payroll-confirm'); // cypress/screenshots/<spec>/payroll-confirm.png\n\ncy.get('[data-cy=pay-run-card]').screenshot('pay-run-card', {\n  padding: 16,\n  blackout: ['[data-cy=iban]', '[data-cy=ssn]'],\n  overwrite: true,\n});\n```\n\n```js\n// cypress.config.ts\nexport default defineConfig({\n  screenshotOnRunFailure: true, // default true\n  screenshotsFolder: 'cypress/screenshots',\n  e2e: {\n    setupNodeEvents(on) {\n      on('after:screenshot', (details) => details);\n    },\n  },\n});\n```\n\nAutomatic failure shots do not need a command in the spec. Explicit `cy.screenshot()` is for checkpoints and documentation.",
      "order": 0
    },
    {
      "id": "cy-9-15-md-1",
      "type": "table",
      "headers": [
        "Option",
        "Why"
      ],
      "rows": [
        [
          "`capture: 'fullPage' \\",
          "'viewport' \\"
        ],
        [
          "`blackout`",
          "CSS selectors covered before capture — payroll PII"
        ],
        [
          "`overwrite`",
          "stable filename for docs"
        ],
        [
          "`onAfterScreenshot`",
          "copy/resize in Node via task if you must"
        ]
      ],
      "caption": "Useful options",
      "order": 1
    },
    {
      "id": "cy-9-15-md-2",
      "type": "overview",
      "heading": "Not visual testing",
      "content": "There is no threshold, no baseline, no fail-on-diff. Pair with 9.6 if you need comparison. Pair with 11.8 if you need the PNG as a CI artifact.",
      "order": 2
    },
    {
      "id": "cy-9-15-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright: `page.screenshot({ path })` ≈ this chapter; `expect(page).toHaveScreenshot()` ≈ 9.6. Selenium: `getScreenshotAs`. All three can leak PII in CI artifacts — blackout is an HRM-specific discipline, not a Cypress novelty.\n\nInterview line: \"`cy.screenshot()` is capture. Visual regression is a plugin. I blackout IBAN on payroll shots so artifacts are safe to store.\"",
      "order": 3
    }
  ],
  "advantages": [
    "9.15 cy.screenshot() API — You will use this in CI artifacts, in docs, and when blacking out PII on payroll screens before a PNG leaves the runner."
  ],
  "limitations": [
    "9.15 cy.screenshot() API is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
