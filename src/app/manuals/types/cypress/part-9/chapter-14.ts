import type { ChapterRecord } from "../../../types";

/** 9.14 Data-Driven / Looped Tests */
export const chapter = {
  "id": "cy-9-14-data-driven-looped-tests",
  "title": "9.14 Data-Driven / Looped Tests",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Data-driven Cypress means generating it() blocks from an array or fixture — each row is its own test title, screenshot, and retry — not a for-loop of cy.get inside one it(). Mocha/Cypress collect tests synchronously; if you cy.fixture inside it() and loop there, you get one test and opaque failures. Playwright's for (const data of list) test() pattern is the same idea with different syntax.",
  "why": "Leave types, roles, and payroll countries explode combinatorially. One looped it() that fails on row 6 reports as a single failed test named 'validates leave types'.",
  "when": "When the same journey must run for many roles, locales, or CSV rows. Not when the rows are steps of one user journey (those stay one it).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You must assert the leave-type dropdown contains Annual, Sick, Bereavement, Unpaid for both admin and employee fixtures.",
    "pass": "You load a static fixture/array at spec top level (or require JSON) and forEach to emit separate it() titles. Failure names the row.",
    "fail": "You nest cy.fixture().then(rows => rows.forEach(... cy.get ...)) inside a single it() and call it data-driven."
  },
  "tools": [],
  "customSummary": "- Generate it() from a synchronous array/require(fixture), not a for-loop of commands inside one test.\n- Each row = one test name, one retry, one screenshot.\n- cy.fixture is async — too late to register tests if you call it inside it().\n- Playwright: loop calling test(); Selenium: TestNG DataProvider / pytest parametrize.\n- Keep combinatorial explosion in CT (9.5) when it is prop-level, not full E2E.",
  "contentMarkdown": "## The anti-pattern\n\n```js\nit('validates leave types', () => {\n  cy.fixture('leave-types.json').then((rows) => {\n    rows.forEach((row) => {\n      cy.get('[data-cy=leave-type]').select(row.label); // one test, six behaviors\n    });\n  });\n});\n```\n\nOne failure, useless title, one screenshot, retries repeat *all* rows.\n\n## The pattern\n\nTests are registered when the spec file evaluates. Use synchronous data:\n\n```js\nconst rows = require('../fixtures/leave-types.json');\n\ndescribe('leave type dropdown', () => {\n  rows.forEach(({ code, label }) => {\n    it(`shows ${code} as ${label}`, () => {\n      cy.visit('/leave/new');\n      cy.get('[data-cy=leave-type]').select(label);\n      cy.get('[data-cy=leave-type]').should('have.value', code);\n    });\n  });\n});\n```\n\nOr `import rows from '../fixtures/leave-types.json'` with the right TS resolveJsonModule. If you insist on `cy.fixture`, import/require instead, or use a plugin — do not discover rows after the test started.\n\n## Roles × journeys\n\n```js\n['employee', 'manager', 'payroll-admin'].forEach((role) => {\n  it(`hides approve button for ${role} when not permitted`, () => {\n    cy.loginAs(role);\n    cy.visit('/leave/123');\n    // ...\n  });\n});\n```\n\nPrefer `cy.session` inside `loginAs` so you are not paying full UI login per row (Part 7).\n\n## Versus Playwright and Selenium\n\nPlaywright: `for (const role of roles) { test(`${role} cannot approve`, async ({ page }) => { ... }) }`. pytest: `@pytest.mark.parametrize`. TestNG: `@DataProvider`. Same rule: **the runner must see N tests**, not N loops inside one test.\n\nInterview line: \"I parametrize by generating `it()` from JSON at load time. I do not for-loop Cypress commands inside one test and call it data-driven.\"",
  "blocks": [
    {
      "id": "cy-9-14-md-0",
      "type": "overview",
      "heading": "The anti-pattern",
      "content": "```js\nit('validates leave types', () => {\n  cy.fixture('leave-types.json').then((rows) => {\n    rows.forEach((row) => {\n      cy.get('[data-cy=leave-type]').select(row.label); // one test, six behaviors\n    });\n  });\n});\n```\n\nOne failure, useless title, one screenshot, retries repeat *all* rows.",
      "order": 0
    },
    {
      "id": "cy-9-14-md-1",
      "type": "overview",
      "heading": "The pattern",
      "content": "Tests are registered when the spec file evaluates. Use synchronous data:\n\n```js\nconst rows = require('../fixtures/leave-types.json');\n\ndescribe('leave type dropdown', () => {\n  rows.forEach(({ code, label }) => {\n    it(`shows ${code} as ${label}`, () => {\n      cy.visit('/leave/new');\n      cy.get('[data-cy=leave-type]').select(label);\n      cy.get('[data-cy=leave-type]').should('have.value', code);\n    });\n  });\n});\n```\n\nOr `import rows from '../fixtures/leave-types.json'` with the right TS resolveJsonModule. If you insist on `cy.fixture`, import/require instead, or use a plugin — do not discover rows after the test started.",
      "order": 1
    },
    {
      "id": "cy-9-14-md-2",
      "type": "overview",
      "heading": "Roles × journeys",
      "content": "```js\n['employee', 'manager', 'payroll-admin'].forEach((role) => {\n  it(`hides approve button for ${role} when not permitted`, () => {\n    cy.loginAs(role);\n    cy.visit('/leave/123');\n    // ...\n  });\n});\n```\n\nPrefer `cy.session` inside `loginAs` so you are not paying full UI login per row (Part 7).",
      "order": 2
    },
    {
      "id": "cy-9-14-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright: `for (const role of roles) { test(`${role} cannot approve`, async ({ page }) => { ... }) }`. pytest: `@pytest.mark.parametrize`. TestNG: `@DataProvider`. Same rule: **the runner must see N tests**, not N loops inside one test.\n\nInterview line: \"I parametrize by generating `it()` from JSON at load time. I do not for-loop Cypress commands inside one test and call it data-driven.\"",
      "order": 3
    }
  ],
  "advantages": [
    "9.14 Data-Driven / Looped Tests — Leave types, roles, and payroll countries explode combinatorially."
  ],
  "limitations": [
    "9.14 Data-Driven / Looped Tests is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
