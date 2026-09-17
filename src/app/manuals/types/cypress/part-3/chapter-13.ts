import type { ChapterRecord } from "../../../types";

/** 3.13 Spies & Stubs */
export const chapter = {
  "id": "cy-3-13-spies-stubs",
  "title": "3.13 Spies & Stubs",
  "minutes": 30,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "cy.spy wraps a function and records calls but still runs the original. cy.stub replaces the function (unless callsThrough). cy.intercept spies or stubs network (fetch/XHR), not arbitrary functions. All three are Sinon under the hood; Sinon-Chai gives called / calledWith. Pick the layer: function vs HTTP.",
  "why": "Interviewers ask 'spy vs stub vs mock vs intercept' to see if you know the layer. Stubbing window.open, spying console.error, and intercepting POST /api/leave are three different tools. Using intercept to 'spy' a method — or stub to fake an API — is the mix-up.",
  "when": "window.print, window.open, analytics.track, Date (prefer cy.clock), prompt (3.9), console.error. Network belongs to intercept (Part 5) even though the vocabulary overlaps \"stub the endpoint.\"",
  "practical": {
    "app": "Bizlevate HRM — payslip print + leave submit + analytics",
    "scenario": "Click Print without a dialog, prove analytics.track('leave_submitted') fired with leaveType Annual, and still let GET /api/leave-requests hit the real server while recording it.",
    "pass": "You stub window.print, spy analytics.track (or stub if you must not send), intercept GET without a fixture to spy the network. You assert calledOnce / calledWith.",
    "fail": "You use cy.intercept to fake window.print, or cy.stub to fake an HTTP response, or you wrap a spy after the app already captured the original function reference."
  },
  "tools": [],
  "customSummary": "- spy: wrap + record + call through. stub: replace + record (optionally returns/throws).\n- intercept: HTTP fetch/XHR only — spy (no fixture) or stub (fixture/status).\n- Install spies/stubs before the code path runs (onBeforeLoad / before click).\n- Sinon-Chai: should('have.been.calledOnce'), calledWith — aliases via .as('print').",
  "contentMarkdown": "## Three layers\n\n| Tool | Layer | Calls original? | Typical use |\n|---|---|---|---|\n| `cy.spy(obj, 'fn')` | JS function | Yes | Assert `analytics.track` fired |\n| `cy.stub(obj, 'fn')` | JS function | No (unless `.callsThrough()`) | `window.print`, `window.open`, `prompt` |\n| `cy.intercept(route)` | Network | Optional | Spy POST body or stub GET with a fixture |\n\n\"Mock\" in conversation usually means stub + fake return value. Cypress does not have a separate `cy.mock()`.\n\n```js\ncy.window().then((win) => {\n  cy.stub(win, 'print').as('print');\n});\ncy.get('[data-cy=print-payslip]').click();\ncy.get('@print').should('have.been.calledOnce');\n```\n\n```js\ncy.window().then((win) => {\n  cy.spy(win.console, 'error').as('consoleError');\n});\ncy.get('[data-cy=submit]').click();\ncy.get('@consoleError').should('not.have.been.called');\n```\n\n```js\ncy.intercept('POST', '/api/leave-requests').as('createLeave'); // spy: real backend\ncy.intercept('GET', '/api/leave-requests', { fixture: 'leave-list.json' }).as('list'); // stub\n```\n\n## Timing — wrap the function the app will call\n\nIf `LeaveForm.js` does `const track = analytics.track.bind(analytics)` at import time, spying `analytics.track` later will not see those calls. Stub/spy in `onBeforeLoad` or before the component's event:\n\n```js\ncy.visit('/leave', {\n  onBeforeLoad(win) {\n    win.analytics = { track: cy.stub().as('track') };\n  },\n});\n```\n\nFor `window.open` (payslip in new tab — Part 0.6), stub `open` and assert the URL argument instead of chasing a second tab:\n\n```js\ncy.window().then((win) => {\n  cy.stub(win, 'open').as('open');\n});\ncy.get('[data-cy=view-payslip]').click();\ncy.get('@open').should('have.been.calledWithMatch', /payslips\\/\\d+/);\n```\n\n## Sinon-Chai assertions\n\nBundled with Cypress:\n\n```js\ncy.get('@track').should('have.been.calledWith', 'leave_submitted', { leaveType: 'Annual' });\ncy.get('@track').should('have.been.calledOnce');\n```\n\n`.as('track')` puts the spy on the alias API. You can also `expect(stub).to.be.calledOnce` inside `.then()` — that does not retry; prefer `.should` on the alias when the call is asynchronous.\n\n## What not to do\n\n- Do not `cy.stub` `fetch` by hand — `cy.intercept` already patched it (Part 0.5) and will fight you.\n- Do not confuse a network stub (`intercept` + fixture) with a function stub. The leave API is intercept; `window.confirm` is stub/event (3.9).\n- Do not leave stubs on `Cypress` globals across tests; `cy.stub` is restored at the end of the test.\n\n## vs Playwright\n\nPlaywright `page.expose_function` / route / `page.evaluate` to patch window. Sinon is not built-in. Cypress's spy/stub/clock/intercept package is the \"all-in-one\" from Part 0.1.",
  "blocks": [
    {
      "id": "cy-3-13-md-0",
      "type": "overview",
      "heading": "Three layers",
      "content": "| Tool | Layer | Calls original? | Typical use |\n|---|---|---|---|\n| `cy.spy(obj, 'fn')` | JS function | Yes | Assert `analytics.track` fired |\n| `cy.stub(obj, 'fn')` | JS function | No (unless `.callsThrough()`) | `window.print`, `window.open`, `prompt` |\n| `cy.intercept(route)` | Network | Optional | Spy POST body or stub GET with a fixture |\n\n\"Mock\" in conversation usually means stub + fake return value. Cypress does not have a separate `cy.mock()`.\n\n```js\ncy.window().then((win) => {\n  cy.stub(win, 'print').as('print');\n});\ncy.get('[data-cy=print-payslip]').click();\ncy.get('@print').should('have.been.calledOnce');\n```\n\n```js\ncy.window().then((win) => {\n  cy.spy(win.console, 'error').as('consoleError');\n});\ncy.get('[data-cy=submit]').click();\ncy.get('@consoleError').should('not.have.been.called');\n```\n\n```js\ncy.intercept('POST', '/api/leave-requests').as('createLeave'); // spy: real backend\ncy.intercept('GET', '/api/leave-requests', { fixture: 'leave-list.json' }).as('list'); // stub\n```",
      "order": 0
    },
    {
      "id": "cy-3-13-md-1",
      "type": "overview",
      "heading": "Timing — wrap the function the app will call",
      "content": "If `LeaveForm.js` does `const track = analytics.track.bind(analytics)` at import time, spying `analytics.track` later will not see those calls. Stub/spy in `onBeforeLoad` or before the component's event:\n\n```js\ncy.visit('/leave', {\n  onBeforeLoad(win) {\n    win.analytics = { track: cy.stub().as('track') };\n  },\n});\n```\n\nFor `window.open` (payslip in new tab — Part 0.6), stub `open` and assert the URL argument instead of chasing a second tab:\n\n```js\ncy.window().then((win) => {\n  cy.stub(win, 'open').as('open');\n});\ncy.get('[data-cy=view-payslip]').click();\ncy.get('@open').should('have.been.calledWithMatch', /payslips\\/\\d+/);\n```",
      "order": 1
    },
    {
      "id": "cy-3-13-md-2",
      "type": "overview",
      "heading": "Sinon-Chai assertions",
      "content": "Bundled with Cypress:\n\n```js\ncy.get('@track').should('have.been.calledWith', 'leave_submitted', { leaveType: 'Annual' });\ncy.get('@track').should('have.been.calledOnce');\n```\n\n`.as('track')` puts the spy on the alias API. You can also `expect(stub).to.be.calledOnce` inside `.then()` — that does not retry; prefer `.should` on the alias when the call is asynchronous.",
      "order": 2
    },
    {
      "id": "cy-3-13-md-3",
      "type": "overview",
      "heading": "What not to do",
      "content": "- Do not `cy.stub` `fetch` by hand — `cy.intercept` already patched it (Part 0.5) and will fight you.\n- Do not confuse a network stub (`intercept` + fixture) with a function stub. The leave API is intercept; `window.confirm` is stub/event (3.9).\n- Do not leave stubs on `Cypress` globals across tests; `cy.stub` is restored at the end of the test.",
      "order": 3
    },
    {
      "id": "cy-3-13-md-4",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright `page.expose_function` / route / `page.evaluate` to patch window. Sinon is not built-in. Cypress's spy/stub/clock/intercept package is the \"all-in-one\" from Part 0.1.",
      "order": 4
    }
  ],
  "advantages": [
    "3.13 Spies & Stubs — Interviewers ask 'spy vs stub vs mock vs intercept' to see if you know the layer."
  ],
  "limitations": [
    "3.13 Spies & Stubs is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
