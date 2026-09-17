import type { ChapterRecord } from "../../../types";

/** 3.4 Hover, Drag-and-Drop, Scrolling */
export const chapter = {
  "id": "cy-3-4-hover-drag-and-drop-scrolling",
  "title": "3.4 Hover, Drag-and-Drop, Scrolling",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 3 · Interacting with Elements",
  "partName": "Part 3 · Interacting with Elements",
  "overviewText": "Cypress has no .hover() command. CSS :hover is not reliably triggered by .trigger('mouseover'). Drag-and-drop is not one API: HTML5 drag uses dataTransfer events, mouse-based DnD uses mousedown/mousemove/mouseup, and libraries like dnd-kit often need cypress-real-events or a dedicated plugin. Scrolling is usually automatic for actionability; cy.scrollTo and .scrollIntoView cover the rest.",
  "why": "Interviewers use hover and drag as architecture questions: Cypress runs in-page JS and cannot synthesize OS-level mouse the way Playwright's CDP can. Knowing the mechanisms — and when to reach for cypress-real-events — is the senior answer, not 'Cypress cannot hover.'",
  "when": "Tooltip/popover menus, kanban leave-approval boards, infinite payroll tables, sticky headers covering a button. Revisit when :hover CSS never appears in snapshots.",
  "practical": {
    "app": "Bizlevate HRM — leave kanban plus overflow table",
    "scenario": "Reveal a tooltip on the leave-balance badge, drag a request card from Pending to Approved, then click a Submit that sits below the fold under a sticky header.",
    "pass": "You use .trigger('mouseover') or .realHover() for the tooltip; you pick an HTML5 or mouse-event drag mechanism (or a plugin) that matches the board library; you .scrollIntoView() or rely on actionability rather than a fixed cy.wait.",
    "fail": "You write cy.get(el).hover(), or a single .trigger('drop') with no dataTransfer on an HTML5 board, or you { force: true } the covered Submit."
  },
  "tools": [],
  "customSummary": "- There is no cy.hover() / .hover() in core Cypress.\n- .trigger('mouseover'|'mouseenter') fires JS events but often does not apply CSS :hover; cypress-real-events .realHover() is the usual workaround.\n- Drag mechanisms: HTML5 dataTransfer events, mouse down/move/up, @4tw/cypress-drag-drop, cypress-real-events — match the app's library.\n- Actionability auto-scrolls the subject into view; cy.scrollTo / .scrollIntoView for windows and nested overflow panes.",
  "contentMarkdown": "## There is no `.hover()`\n\nCypress docs are explicit: there is no `.hover()` command. Internally, Cypress does not drive a real OS cursor. CSS `:hover` is applied by the browser when the *pointer* is over an element — synthetic `mouseover` events from JavaScript often **do not** flip `:hover`.\n\n```js\n// Core approximation — works if the tooltip listens for mouseover JS:\ncy.get('[data-cy=leave-balance]').trigger('mouseover');\ncy.get('[data-cy=balance-tooltip]').should('be.visible');\n\n// Does not reliably apply CSS :hover { display: block } menus.\n```\n\nIf the UI is pure CSS `:hover`, install `cypress-real-events` and use `.realHover()`, which dispatches Chrome DevTools-style real mouse movement. Playwright's `locator.hover()` is closer to that real-pointer model because Playwright is an external driver.\n\n```js\ncy.get('[data-cy=nav-admin]').realHover();\ncy.contains('Payroll settings').should('be.visible').click();\n```\n\nDo not invent `cy.get(x).hover()`. It is not a Cypress API.\n\n## Drag-and-drop — pick the mechanism the app uses\n\nThere is no universal `.drag()`. Identify how the widget is implemented, then pick a matching driver:\n\n**1. HTML5 drag-and-drop** (`draggable=true`, `ondrop`). Needs a `dataTransfer` object on `dragstart` / `drop`. A bare `.trigger('drop')` without `dataTransfer` is silently ignored by the browser.\n\n```js\nconst dt = new DataTransfer();\ncy.get('[data-cy=leave-card-42]').trigger('dragstart', { dataTransfer: dt });\ncy.get('[data-cy=column-approved]').trigger('dragenter', { dataTransfer: dt });\ncy.get('[data-cy=column-approved]').trigger('drop', { dataTransfer: dt });\ncy.get('[data-cy=leave-card-42]').trigger('dragend');\n```\n\n**2. Mouse-based DnD** (listen to `mousedown` / `mousemove` / `mouseup`, common in older jQuery UI). Sequence those events with coordinates.\n\n**3. Modern libraries** (dnd-kit, react-beautiful-dnd, pragmatic-drag-and-drop). Synthetic HTML5 events often miss pointer sensors. `cypress-real-events` (`.realMouseDown` / move / up) or `@4tw/cypress-drag-drop` (`cy.get('.source').drag('.target')`) are the practical options. If a library exposes a test id hook or a non-DnD \"move to column\" control, prefer that over fighting sensors — the same substitution mindset as Cypress multi-tab workarounds (Part 9).\n\n**4. Sortable lists** — same three mechanisms; assert order with `.eq(0).should('contain', ...)` after the drop (3.5).\n\n## Scrolling\n\nActionability already scrolls the element into view before clicking. You rarely need an explicit scroll just to click a below-the-fold button.\n\n```js\ncy.scrollTo('bottom');\ncy.scrollTo(0, 800);\ncy.get('[data-cy=year-end-summary]').scrollIntoView();\ncy.get('[data-cy=payroll-table]').scrollTo('right'); // nested overflow container\n```\n\n`cy.scrollTo` on `cy.window()` (or with no prior subject in some versions) moves the window; chained on an overflow element it moves that pane. Infinite-scroll tables: scroll, then assert more rows (combine with intercept waits — 3.11). Sticky headers that cover a control are an actionability-covered failure: scroll so the subject is free, or close the sticky, do not `force`.\n\n## vs Playwright\n\nPlaywright has first-class `hover()`, `drag_to()`, and mouse APIs because it owns the cursor. Cypress documents the gap and points you at events + plugins. Interview-safe: \"No `.hover()`; I trigger mouseover or use real events. For drag I name the app's mechanism — HTML5 dataTransfer vs mouse vs library plugin — rather than one magic command.\"\"",
  "blocks": [
    {
      "id": "cy-3-4-md-0",
      "type": "overview",
      "heading": "There is no `.hover()`",
      "content": "Cypress docs are explicit: there is no `.hover()` command. Internally, Cypress does not drive a real OS cursor. CSS `:hover` is applied by the browser when the *pointer* is over an element — synthetic `mouseover` events from JavaScript often **do not** flip `:hover`.\n\n```js\n// Core approximation — works if the tooltip listens for mouseover JS:\ncy.get('[data-cy=leave-balance]').trigger('mouseover');\ncy.get('[data-cy=balance-tooltip]').should('be.visible');\n\n// Does not reliably apply CSS :hover { display: block } menus.\n```\n\nIf the UI is pure CSS `:hover`, install `cypress-real-events` and use `.realHover()`, which dispatches Chrome DevTools-style real mouse movement. Playwright's `locator.hover()` is closer to that real-pointer model because Playwright is an external driver.\n\n```js\ncy.get('[data-cy=nav-admin]').realHover();\ncy.contains('Payroll settings').should('be.visible').click();\n```\n\nDo not invent `cy.get(x).hover()`. It is not a Cypress API.",
      "order": 0
    },
    {
      "id": "cy-3-4-md-1",
      "type": "overview",
      "heading": "Drag-and-drop — pick the mechanism the app uses",
      "content": "There is no universal `.drag()`. Identify how the widget is implemented, then pick a matching driver:\n\n**1. HTML5 drag-and-drop** (`draggable=true`, `ondrop`). Needs a `dataTransfer` object on `dragstart` / `drop`. A bare `.trigger('drop')` without `dataTransfer` is silently ignored by the browser.\n\n```js\nconst dt = new DataTransfer();\ncy.get('[data-cy=leave-card-42]').trigger('dragstart', { dataTransfer: dt });\ncy.get('[data-cy=column-approved]').trigger('dragenter', { dataTransfer: dt });\ncy.get('[data-cy=column-approved]').trigger('drop', { dataTransfer: dt });\ncy.get('[data-cy=leave-card-42]').trigger('dragend');\n```\n\n**2. Mouse-based DnD** (listen to `mousedown` / `mousemove` / `mouseup`, common in older jQuery UI). Sequence those events with coordinates.\n\n**3. Modern libraries** (dnd-kit, react-beautiful-dnd, pragmatic-drag-and-drop). Synthetic HTML5 events often miss pointer sensors. `cypress-real-events` (`.realMouseDown` / move / up) or `@4tw/cypress-drag-drop` (`cy.get('.source').drag('.target')`) are the practical options. If a library exposes a test id hook or a non-DnD \"move to column\" control, prefer that over fighting sensors — the same substitution mindset as Cypress multi-tab workarounds (Part 9).\n\n**4. Sortable lists** — same three mechanisms; assert order with `.eq(0).should('contain', ...)` after the drop (3.5).",
      "order": 1
    },
    {
      "id": "cy-3-4-md-2",
      "type": "overview",
      "heading": "Scrolling",
      "content": "Actionability already scrolls the element into view before clicking. You rarely need an explicit scroll just to click a below-the-fold button.\n\n```js\ncy.scrollTo('bottom');\ncy.scrollTo(0, 800);\ncy.get('[data-cy=year-end-summary]').scrollIntoView();\ncy.get('[data-cy=payroll-table]').scrollTo('right'); // nested overflow container\n```\n\n`cy.scrollTo` on `cy.window()` (or with no prior subject in some versions) moves the window; chained on an overflow element it moves that pane. Infinite-scroll tables: scroll, then assert more rows (combine with intercept waits — 3.11). Sticky headers that cover a control are an actionability-covered failure: scroll so the subject is free, or close the sticky, do not `force`.",
      "order": 2
    },
    {
      "id": "cy-3-4-md-3",
      "type": "overview",
      "heading": "vs Playwright",
      "content": "Playwright has first-class `hover()`, `drag_to()`, and mouse APIs because it owns the cursor. Cypress documents the gap and points you at events + plugins. Interview-safe: \"No `.hover()`; I trigger mouseover or use real events. For drag I name the app's mechanism — HTML5 dataTransfer vs mouse vs library plugin — rather than one magic command.\"\"",
      "order": 3
    }
  ],
  "advantages": [
    "3.4 Hover, Drag-and-Drop, Scrolling — Interviewers use hover and drag as architecture questions: Cypress runs in-page JS and cannot synthesize OS-level mouse the way Playwright's CDP can."
  ],
  "limitations": [
    "3.4 Hover, Drag-and-Drop, Scrolling is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
