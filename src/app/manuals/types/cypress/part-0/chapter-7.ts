import type { ChapterRecord } from "../../../types";

/** 0.7 Cypress Test Runner / Cypress App Overview */
export const chapter = {
  "id": "cy-0-7-cypress-test-runner-cypress-app-overview",
  "title": "0.7 Cypress Test Runner / Cypress App Overview",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "npx cypress open launches the Cypress App: launchpad → testing type → browser → spec list → two-pane runner (Command Log left, live app right). Time-travel restores historical DOM. Selector Playground suggests selectors with a live match count. UI Mode (newer) adds persistent run history and richer spec navigation.",
  "why": "The Test Runner is the product of Cypress's DX bet. Knowing how to read a failed log entry and inspect the restored DOM is the core debugging skill of the whole manual.",
  "when": "First launch, and every time a test fails interactively. UI Mode matters once the suite is large enough that cross-run history helps.",
  "practical": {
    "app": "example.cypress.io or your first spec",
    "scenario": "A test fails on step 8 of 10. You need to see why the button wasn't clickable.",
    "pass": "You click step 7 in the Command Log, inspect the restored DOM in DevTools, and notice a covering overlay named in the error.",
    "fail": "You only read the terminal stack trace and add cy.wait(3000)."
  },
  "tools": [],
  "customSummary": "- cypress open → pick spec + browser → two-pane: Command Log (left), live app (right).\n- Every command logged, color-coded, with match counts; failed commands include plain-language why.\n- Time-travel: hover/click a log line to restore the exact DOM at that moment, fully DevTools-inspectable.\n- Selector Playground: click an element to get a suggested selector + live match count.\n- UI Mode (newer versions): persistent run history, richer spec navigation (Part 9.11).",
  "contentMarkdown": "## Getting from zero to the interface\n\nRunning `npx cypress open` for the first time in a project triggers a short setup wizard if no `cypress.config.js` exists yet — it asks whether you want E2E Testing or Component Testing (Part 1 covers this choice and the resulting scaffolded folder structure), then generates the config file and example spec files. Subsequent launches drop you straight into the main landing screen: a list of your spec files (grouped by folder if you have subfolders under `cypress/e2e/`), a browser-selection dropdown in the top right showing every browser Cypress detected, and a search box for filtering specs once your suite grows large.\n\n## Inside a running spec — the two-pane layout\n\nClicking a spec file opens an actual, real browser window (not a screenshot or simulation) split into the Command Log on the left and your live application on the right. The Command Log isn't just a static pass/fail summary — it's a nested, expandable tree. A single `cy.get('.item').click()` line can expand to show you exactly how many DOM elements the selector matched, which specific element was ultimately acted on if multiple matched, and how long Cypress spent retrying.\n\nFailed commands are marked in red. The log entry itself often includes a plain-language explanation of why it failed (e.g., \"expected `<button>` not to be disabled\" rather than a raw stack trace).\n\n## Time-travel in practice\n\nSay a test fails on step 8 of 10. Hovering over step 7 in the log rewinds the right-hand app pane to the DOM exactly as it existed right after step 7 completed — genuinely re-rendering that historical state, not a static image. You can right-click and \"Inspect\" that rewound DOM in real Chrome DevTools, check what CSS class was (or wasn't) applied, see if an element was present but visually hidden behind a modal overlay, or confirm a network request hadn't resolved yet at that point.\n\nThis is why debugging a failing Cypress test is often faster than debugging the equivalent Selenium failure even when both tools ultimately tell you \"the button wasn't found.\"\n\n## Selector Playground\n\nClicking the crosshair/target icon in the Command Log toolbar switches the app pane into selection mode: hovering over any element highlights it, and clicking it populates a small input box with Cypress's best-guess selector, alongside a live count like \"1 matched element.\" The live match count immediately tells you if a selector you're considering is dangerously non-unique (matching 6 elements when you only wanted 1) — a locator-strategy lesson (Part 4) you can learn interactively before you've even started writing test code.\n\n## UI Mode\n\nUI Mode extends this same foundation with a persistent sidebar showing run history across sessions (so you can compare \"did this test pass the last time I ran it\" without re-running everything), a spec-list view that survives across app restarts, and generally a more IDE-like feel than the original single-spec Test Runner window. Part 9.11 covers it fully once you're working with a large enough suite that this kind of persistent, cross-run visibility actually starts to matter.",
  "blocks": [
    {
      "id": "cy-0-7-md-0",
      "type": "overview",
      "heading": "Getting from zero to the interface",
      "content": "Running `npx cypress open` for the first time in a project triggers a short setup wizard if no `cypress.config.js` exists yet — it asks whether you want E2E Testing or Component Testing (Part 1 covers this choice and the resulting scaffolded folder structure), then generates the config file and example spec files. Subsequent launches drop you straight into the main landing screen: a list of your spec files (grouped by folder if you have subfolders under `cypress/e2e/`), a browser-selection dropdown in the top right showing every browser Cypress detected, and a search box for filtering specs once your suite grows large.",
      "order": 0
    },
    {
      "id": "cy-0-7-md-1",
      "type": "overview",
      "heading": "Inside a running spec — the two-pane layout",
      "content": "Clicking a spec file opens an actual, real browser window (not a screenshot or simulation) split into the Command Log on the left and your live application on the right. The Command Log isn't just a static pass/fail summary — it's a nested, expandable tree. A single `cy.get('.item').click()` line can expand to show you exactly how many DOM elements the selector matched, which specific element was ultimately acted on if multiple matched, and how long Cypress spent retrying.\n\nFailed commands are marked in red. The log entry itself often includes a plain-language explanation of why it failed (e.g., \"expected `<button>` not to be disabled\" rather than a raw stack trace).",
      "order": 1
    },
    {
      "id": "cy-0-7-md-2",
      "type": "overview",
      "heading": "Time-travel in practice",
      "content": "Say a test fails on step 8 of 10. Hovering over step 7 in the log rewinds the right-hand app pane to the DOM exactly as it existed right after step 7 completed — genuinely re-rendering that historical state, not a static image. You can right-click and \"Inspect\" that rewound DOM in real Chrome DevTools, check what CSS class was (or wasn't) applied, see if an element was present but visually hidden behind a modal overlay, or confirm a network request hadn't resolved yet at that point.\n\nThis is why debugging a failing Cypress test is often faster than debugging the equivalent Selenium failure even when both tools ultimately tell you \"the button wasn't found.\"",
      "order": 2
    },
    {
      "id": "cy-0-7-md-3",
      "type": "overview",
      "heading": "Selector Playground",
      "content": "Clicking the crosshair/target icon in the Command Log toolbar switches the app pane into selection mode: hovering over any element highlights it, and clicking it populates a small input box with Cypress's best-guess selector, alongside a live count like \"1 matched element.\" The live match count immediately tells you if a selector you're considering is dangerously non-unique (matching 6 elements when you only wanted 1) — a locator-strategy lesson (Part 4) you can learn interactively before you've even started writing test code.",
      "order": 3
    },
    {
      "id": "cy-0-7-md-4",
      "type": "overview",
      "heading": "UI Mode",
      "content": "UI Mode extends this same foundation with a persistent sidebar showing run history across sessions (so you can compare \"did this test pass the last time I ran it\" without re-running everything), a spec-list view that survives across app restarts, and generally a more IDE-like feel than the original single-spec Test Runner window. Part 9.11 covers it fully once you're working with a large enough suite that this kind of persistent, cross-run visibility actually starts to matter.",
      "order": 4
    }
  ],
  "advantages": [
    "0.7 Cypress Test Runner / Cypress App Overview — The Test Runner is the product of Cypress's DX bet."
  ],
  "limitations": [
    "0.7 Cypress Test Runner / Cypress App Overview is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
