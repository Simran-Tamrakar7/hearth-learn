import type { ChapterRecord } from "../../../types";

/** 3.9 Handling alert, confirm, prompt */
export const chapter = {
  "id": "cy-3-9-handling-alert-confirm-prompt",
  "title": "3.9 Handling alert, confirm, prompt",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "Cypress auto-accepts window.alert and window.confirm — the opposite of Playwright, which fails if a dialog is unhandled. Override with cy.on('window:confirm') and return false to simulate Cancel. There is no prompt event; stub window.prompt so it returns a string.",
  "why": "Delete-employee and cancel-payroll flows use confirm(). If you only ever exercise the auto-OK path, the Cancel path is untested. Stubbing prompt is a Sinon skill that also appears in 3.13. Never confuse native dialogs with in-app modal divs.",
  "when": "Native window.alert/confirm/prompt only. Styled 'Are you sure?' modals are ordinary DOM (3.1). Revisit when a test hangs on Playwright muscle-memory or when Cancel never runs.",
  "practical": {
    "app": "Bizlevate HRM — delete employee (confirm) and rename department (prompt)",
    "scenario": "Delete with default OK, delete with Cancel, and rename via prompt returning 'People Ops'.",
    "pass": "You rely on auto-accept for OK; cy.on('window:confirm', () => false) for Cancel; cy.stub(win, 'prompt').returns('People Ops') before the click. You assert the dialog message text.",
    "fail": "You look for a Cypress .alert() command, or you cy.get the native dialog as if it were DOM, or you leave prompt unstubbed and hope."
  },
  "tools": [],
  "customSummary": "- alert() and confirm() are auto-accepted; the message is logged — opposite of Playwright's fail-if-unhandled default.\n- cy.on('window:alert'|'window:confirm', handler) to assert text; return false from confirm to click Cancel.\n- prompt() has no dedicated event — cy.stub(win, 'prompt').returns('...').\n- In-app modal dialogs are not window.confirm — use normal clicks.",
  "contentMarkdown": "## Auto-accept is the default\n\nIf the app calls `window.confirm('Delete this employee?')`, Cypress clicks OK for you. `window.alert()` is dismissed automatically and the text is logged in the Command Log. You need **zero** dialog code for the happy path:\n\n```js\ncy.get('[data-cy=delete-employee]').click();\ncy.get('[data-cy=employee-deleted]').should('be.visible');\n```\n\nPlaywright does the opposite: an unhandled dialog blocks and fails the test. Cypress optimizes for not hanging the suite on an unexpected alert; Playwright optimizes for not silently clicking through a confirm you did not know about. Both defaults can hide bugs — know which tool you are in.\n\nNative dialogs are **not** in the DOM. `cy.get('.confirm')` will not find `window.confirm`. Design-system \"modals\" (`role=dialog`) are regular elements — treat them with `.click()` (3.1), not `window:confirm`.\n\n## Assert the message and simulate Cancel\n\n```js\ncy.on('window:confirm', (text) => {\n  expect(text).to.eq('Are you sure you want to delete this employee?');\n  return false; // Cancel\n});\n\ncy.get('[data-cy=delete-employee]').click();\ncy.get('[data-cy=employee-still-active]').should('be.visible');\n```\n\n```js\ncy.on('window:alert', (text) => {\n  expect(text).to.contain('Payroll submitted');\n});\n```\n\n`cy.on` is **test-scoped** (3.14) — it unbinds when the test ends. Returning `false` from `window:confirm` is Cancel; returning `true` or `undefined` keeps OK. Register the handler **before** the click that opens the dialog.\n\n## `prompt()` — stub it\n\nThere is no `window:prompt` event analogue that yields the typed string. Replace the function with Sinon:\n\n```js\ncy.window().then((win) => {\n  cy.stub(win, 'prompt').returns('People Ops');\n});\ncy.get('[data-cy=rename-department]').click();\ncy.contains('People Ops').should('be.visible');\n```\n\nCall the stub **before** the prompt fires. If the app reads `prompt` at module load, stub in `cy.visit({ onBeforeLoad })` (same timing rule as `cy.clock` in 3.12).\n\n## vs Playwright\n\n| | Cypress | Playwright |\n|---|---|---|\n| Unhandled `alert`/`confirm` | Auto-accept | Test failure / block |\n| Cancel confirm | `cy.on('window:confirm', () => false)` | `dialog.dismiss()` |\n| Prompt value | `cy.stub(win, 'prompt')` | `dialog.accept('text')` |\n\nInterview-safe: \"Cypress auto-accepts alert and confirm. I stub prompt. I do not confuse native dialogs with modal components.\"\"",
  "blocks": [
    {
      "id": "cy-3-9-md-0",
      "type": "overview",
      "heading": "Auto-accept is the default",
      "content": "If the app calls `window.confirm('Delete this employee?')`, Cypress clicks OK for you. `window.alert()` is dismissed automatically and the text is logged in the Command Log. You need **zero** dialog code for the happy path:\n\n```js\ncy.get('[data-cy=delete-employee]').click();\ncy.get('[data-cy=employee-deleted]').should('be.visible');\n```\n\nPlaywright does the opposite: an unhandled dialog blocks and fails the test. Cypress optimizes for not hanging the suite on an unexpected alert; Playwright optimizes for not silently clicking through a confirm you did not know about. Both defaults can hide bugs — know which tool you are in.\n\nNative dialogs are **not** in the DOM. `cy.get('.confirm')` will not find `window.confirm`. Design-system \"modals\" (`role=dialog`) are regular elements — treat them with `.click()` (3.1), not `window:confirm`.",
      "order": 0
    },
    {
      "id": "cy-3-9-md-1",
      "type": "overview",
      "heading": "Assert the message and simulate Cancel",
      "content": "```js\ncy.on('window:confirm', (text) => {\n  expect(text).to.eq('Are you sure you want to delete this employee?');\n  return false; // Cancel\n});\n\ncy.get('[data-cy=delete-employee]').click();\ncy.get('[data-cy=employee-still-active]').should('be.visible');\n```\n\n```js\ncy.on('window:alert', (text) => {\n  expect(text).to.contain('Payroll submitted');\n});\n```\n\n`cy.on` is **test-scoped** (3.14) — it unbinds when the test ends. Returning `false` from `window:confirm` is Cancel; returning `true` or `undefined` keeps OK. Register the handler **before** the click that opens the dialog.",
      "order": 1
    },
    {
      "id": "cy-3-9-md-2",
      "type": "overview",
      "heading": "`prompt()` — stub it",
      "content": "There is no `window:prompt` event analogue that yields the typed string. Replace the function with Sinon:\n\n```js\ncy.window().then((win) => {\n  cy.stub(win, 'prompt').returns('People Ops');\n});\ncy.get('[data-cy=rename-department]').click();\ncy.contains('People Ops').should('be.visible');\n```\n\nCall the stub **before** the prompt fires. If the app reads `prompt` at module load, stub in `cy.visit({ onBeforeLoad })` (same timing rule as `cy.clock` in 3.12).",
      "order": 2
    },
    {
      "id": "cy-3-9-md-3",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "| | Cypress | Playwright |\n|---|---|---|\n| Unhandled `alert`/`confirm` | Auto-accept | Test failure / block |\n| Cancel confirm | `cy.on('window:confirm', () => false)` | `dialog.dismiss()` |\n| Prompt value | `cy.stub(win, 'prompt')` | `dialog.accept('text')` |\n\nInterview-safe: \"Cypress auto-accepts alert and confirm. I stub prompt. I do not confuse native dialogs with modal components.\"\"",
      "order": 3
    }
  ],
  "advantages": [
    "3.9 Handling alert, confirm, prompt — Delete-employee and cancel-payroll flows use confirm()."
  ],
  "limitations": [
    "3.9 Handling alert, confirm, prompt is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
