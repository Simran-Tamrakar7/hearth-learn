import type { ChapterRecord } from "../../../types";

/** 12.1 Debugging Tools */
export const chapter = {
  "id": "cy-12-1-debugging-tools",
  "title": "12.1 Debugging Tools",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 12 · Debugging & Best Practices",
  "partName": "Part 12 · Debugging & Best Practices",
  "overviewText": "Start with the Command Log and time-travel in cypress open. Then .pause(), .debug(), debugger, DEBUG=cypress:* for driver logs, cy.log vs cy.task (11.7), and screenshots/videos (11.8). Cypress has no Trace Viewer. Playwright Inspector + show-trace cover live vs post-mortem; Selenium is IDE breakpoints + vendor video.",
  "why": "Most 'Cypress is flaky' tickets are undebugged waits. Knowing the order of tools — GUI first, Node logs second, Cloud Replay last — is faster than adding cy.wait(10000).",
  "when": "Any red spec, especially CI-only. Before you change production code.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "cy.get('[data-cy=approve]') times out on CI. You need a methodical debug path.",
    "pass": "You reproduce in open mode, time-travel to the prior command, inspect overlay/intercept, add cy.task logs if it is CI-only, and you do not start with a fixed wait.",
    "fail": "You only re-run the GitHub job until it passes, or you search for show-trace."
  },
  "tools": [],
  "customSummary": "- Live: Cypress App time-travel, .pause(), .debug(), debugger.\n- Node/CI: DEBUG=cypress:*, cy.task('log'), artifacts.\n- No Trace Viewer — Cloud Replay if paid (9.12).\n- Selector Playground is a hint, not a locator strategy.\n- Playwright Inspector/Trace vs Cypress GUI/video is the comparison to memorize.",
  "contentMarkdown": "## Order of operations\n\n1. **Reproduce headed locally** at CI viewport/browser (10.4).\n2. **Click the failing command** — read the error (covered, detached, disabled).\n3. **Time-travel to the previous command** — is the modal open? Is a spinner there?\n4. **Open DevTools on the restored DOM** — computed style, overlapping element.\n5. **Check the intercept** — did `@getLeave` fire?\n6. If it *won't* fail locally: artifacts + `cy.task` + Cloud Replay.\n\n## Commands that halt you\n\n```js\ncy.get('[data-cy=approve]').pause().click();\ncy.get('[data-cy=total]').debug();\ncy.get('[data-cy=total]').then(() => { debugger; });\n```\n\n`.pause()` stops the queue in `open` mode (you click resume). `.debug()` logs the subject to the console. `debugger` only stops if DevTools is open. None of these belong in CI specs — guard with `if (Cypress.config('isInteractive'))` if you must leave them in.\n\n## Environment debug\n\n```bash\nDEBUG=cypress:server:spec npx cypress run --browser chrome\n```\n\nUseful when the binary, browser path, or preprocessor is the bug, not the DOM.\n\n## Versus Playwright and Selenium\n\n| Need | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Live step | App + time-travel | Inspector / UI Mode | debugger in IDE |\n| CI post-mortem | video/PNG; Cloud Replay | **trace.zip** | vendor video |\n| Log in CI | `cy.task` | `console.log` in Node | test framework logs |\n\nInterview line: \"I debug in the App with time-travel first. For CI I use artifacts and `cy.task`. There is no Trace Viewer.\"",
  "blocks": [
    {
      "id": "cy-12-1-md-0",
      "type": "overview",
      "heading": "Order of operations",
      "content": "1. **Reproduce headed locally** at CI viewport/browser (10.4).\n2. **Click the failing command** — read the error (covered, detached, disabled).\n3. **Time-travel to the previous command** — is the modal open? Is a spinner there?\n4. **Open DevTools on the restored DOM** — computed style, overlapping element.\n5. **Check the intercept** — did `@getLeave` fire?\n6. If it *won't* fail locally: artifacts + `cy.task` + Cloud Replay.",
      "order": 0
    },
    {
      "id": "cy-12-1-md-1",
      "type": "overview",
      "heading": "Commands that halt you",
      "content": "```js\ncy.get('[data-cy=approve]').pause().click();\ncy.get('[data-cy=total]').debug();\ncy.get('[data-cy=total]').then(() => { debugger; });\n```\n\n`.pause()` stops the queue in `open` mode (you click resume). `.debug()` logs the subject to the console. `debugger` only stops if DevTools is open. None of these belong in CI specs — guard with `if (Cypress.config('isInteractive'))` if you must leave them in.",
      "order": 1
    },
    {
      "id": "cy-12-1-md-2",
      "type": "overview",
      "heading": "Environment debug",
      "content": "```bash\nDEBUG=cypress:server:spec npx cypress run --browser chrome\n```\n\nUseful when the binary, browser path, or preprocessor is the bug, not the DOM.",
      "order": 2
    },
    {
      "id": "cy-12-1-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "| Need | Cypress | Playwright | Selenium |\n|---|---|---|---|\n| Live step | App + time-travel | Inspector / UI Mode | debugger in IDE |\n| CI post-mortem | video/PNG; Cloud Replay | **trace.zip** | vendor video |\n| Log in CI | `cy.task` | `console.log` in Node | test framework logs |\n\nInterview line: \"I debug in the App with time-travel first. For CI I use artifacts and `cy.task`. There is no Trace Viewer.\"",
      "order": 3
    }
  ],
  "advantages": [
    "12.1 Debugging Tools — Most 'Cypress is flaky' tickets are undebugged waits."
  ],
  "limitations": [
    "12.1 Debugging Tools is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
