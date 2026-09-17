import type { ChapterRecord } from "../../../types";

/** 11.7 Logging & Error Handling */
export const chapter = {
  "id": "cy-11-7-logging-error-handling",
  "title": "11.7 Logging & Error Handling",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "cy.log writes to the Command Log — great in cypress open, easy to miss in CI stdout. cy.task runs in Node and can console.log on the server, write files, or hit a logger — that is what you want in GitHub Actions. Failures: failOnStatusCode, uncaught:exception, unhandled rejections. Do not swallow every app exception globally to keep CI green.",
  "why": "Payroll bugs show up as uncaught exceptions in the app. A support file that returns false from uncaught:exception hides them. Interviewers distinguish cy.log from cy.task immediately.",
  "when": "When CI logs are empty besides Mocha errors, when a third-party widget throws, and when you need to print an axe violation list (9.7).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Axe violations and failed API seeds must appear in the GitHub job log, not only in the App Command Log.",
    "pass": "You register cy.task('log') in setupNodeEvents that console.logs in Node, call it from tests, and you only ignore uncaught:exception for a named third-party script with a comment.",
    "fail": "You cy.log the violations and return false from uncaught:exception for all errors."
  },
  "tools": [],
  "customSummary": "- cy.log → Command Log (GUI). cy.task → Node process (CI stdout/files).\n- Register tasks in setupNodeEvents; return a promise/value.\n- uncaught:exception: returning false skips the fail — use narrowly.\n- failOnStatusCode: false on cy.visit/request is opt-in, not default for happy paths.\n- Playwright: test.info().attach / console in the Node test process — closer to cy.task than cy.log.",
  "contentMarkdown": "## cy.log vs cy.task\n\n```js\ncy.log('now on step 3'); // Command Log only\n\n// cypress.config.ts\nsetupNodeEvents(on) {\n  on('task', {\n    log(message) {\n      console.log(message);\n      return null; // tasks must return null or a value\n    },\n  });\n}\n\ncy.task('log', { spec: 'leave', violations: 2 });\n```\n\nIn `cypress run` on GitHub, `cy.log` may never show in the job log. `cy.task('log')` prints from Node — that is the CI-visible channel. Same pattern for seeding the DB or reading a file you cannot see from the browser.\n\n## Error handling you should actually configure\n\n```js\nCypress.on('uncaught:exception', (err) => {\n  if (err.message.includes('ResizeObserver loop')) return false;\n  return true; // fail the test\n});\n```\n\nA blanket `return false` means Bizlevate production exceptions will not fail CI. Name the exception.\n\n`cy.visit('/missing', { failOnStatusCode: false })` is for asserting an error page. Do not set it globally.\n\n`cy.on('fail', ...)` can screenshot extra context; do not turn fails into passes.\n\n## Versus Playwright and Selenium\n\nPlaywright tests already run in Node — `console.log` shows in CI; `test.info().attach` puts files on the report. That is closer to **`cy.task`** than to `cy.log`. Selenium + TestNG/JUnit logs in the JVM. The Cypress-specific skill is remembering the **browser spec vs Node tasks** split.\n\nInterview line: \"`cy.log` is the GUI. `cy.task` logs in Node for CI. I do not globally swallow `uncaught:exception`. Playwright doesn't need this split because the test already lives in Node.\"",
  "blocks": [
    {
      "id": "cy-11-7-md-0",
      "type": "overview",
      "heading": "cy.log vs cy.task",
      "content": "```js\ncy.log('now on step 3'); // Command Log only\n\n// cypress.config.ts\nsetupNodeEvents(on) {\n  on('task', {\n    log(message) {\n      console.log(message);\n      return null; // tasks must return null or a value\n    },\n  });\n}\n\ncy.task('log', { spec: 'leave', violations: 2 });\n```\n\nIn `cypress run` on GitHub, `cy.log` may never show in the job log. `cy.task('log')` prints from Node — that is the CI-visible channel. Same pattern for seeding the DB or reading a file you cannot see from the browser.",
      "order": 0
    },
    {
      "id": "cy-11-7-md-1",
      "type": "overview",
      "heading": "Error handling you should actually configure",
      "content": "```js\nCypress.on('uncaught:exception', (err) => {\n  if (err.message.includes('ResizeObserver loop')) return false;\n  return true; // fail the test\n});\n```\n\nA blanket `return false` means Bizlevate production exceptions will not fail CI. Name the exception.\n\n`cy.visit('/missing', { failOnStatusCode: false })` is for asserting an error page. Do not set it globally.\n\n`cy.on('fail', ...)` can screenshot extra context; do not turn fails into passes.",
      "order": 1
    },
    {
      "id": "cy-11-7-md-2",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright tests already run in Node — `console.log` shows in CI; `test.info().attach` puts files on the report. That is closer to **`cy.task`** than to `cy.log`. Selenium + TestNG/JUnit logs in the JVM. The Cypress-specific skill is remembering the **browser spec vs Node tasks** split.\n\nInterview line: \"`cy.log` is the GUI. `cy.task` logs in Node for CI. I do not globally swallow `uncaught:exception`. Playwright doesn't need this split because the test already lives in Node.\"",
      "order": 2
    }
  ],
  "advantages": [
    "11.7 Logging & Error Handling — Payroll bugs show up as uncaught exceptions in the app."
  ],
  "limitations": [
    "11.7 Logging & Error Handling is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
