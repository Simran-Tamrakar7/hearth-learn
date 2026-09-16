import type { ChapterRecord } from "../../../types";

/** 9.11 UI Mode */
export const chapter = {
  "id": "cy-9-11-ui-mode",
  "title": "9.11 UI Mode",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Cypress UI Mode is the modern Cypress App experience around cypress open: launchpad, spec list that persists, run history across sessions, and the two-pane Command Log + app preview. It is the local interactive product. Playwright's npx playwright test --ui is a different program (trace-like timeline, watch mode, locator picker) — do not use the same words as if they were one feature.",
  "why": "Junior engineers search for Playwright's UI Mode flags inside Cypress and conclude Cypress 'has no UI.' The GUI is the whole Cypress bet; knowing the newer App vs classic runner vs Playwright --ui prevents that confusion.",
  "when": "Daily local development, debugging a failed spec visually, and when someone coming from Playwright asks 'where's UI Mode?'",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A leave spec failed last night. You want to re-run just that spec, inspect the DOM at the failed command, and see whether it failed the previous local run too.",
    "pass": "You npx cypress open (E2E, Chrome), use the spec list + Command Log time-travel, and use run history if the App version provides it. You do not look for playwright test --ui.",
    "fail": "You try npx cypress test --ui or expect a Playwright-style trace timeline in the open GUI."
  },
  "tools": [],
  "customSummary": "- Cypress UI = cypress open / Cypress App (launchpad, spec list, Command Log, time-travel).\n- Newer App builds add persistent run history and richer spec navigation — that is 'UI Mode' in this manual.\n- Playwright --ui is watch mode + timeline; not available as a Cypress clone.\n- cypress run is headless CI; headed CI is --headed, still not the App.\n- Selenium has no equivalent first-party GUI runner.",
  "contentMarkdown": "## What you actually launch\n\n```bash\nnpx cypress open          # Cypress App / UI\nnpx cypress run           # headless (CI default)\nnpx cypress run --headed  # CI-style run but visible browser, no App sidebar\n```\n\n`cypress open` is the product: pick E2E vs Component, pick browser, pick spec. The window is split — Command Log left, the live HRM iframe right. Hover a log line to time-travel the DOM (Part 0.7). That live loop is why frontend teams tolerate Cypress's architectural limits.\n\n## What \"UI Mode\" means here\n\nNewer Cypress App versions keep:\n\n- a spec sidebar that does not vanish when a run ends\n- run history so you can see \"did `leave-submit.cy.ts` fail last time *on this machine*\"\n- search/filter across a large `cypress/e2e` tree\n\nTreat that as Cypress **UI Mode**: the App behaving more like an IDE for tests. It is still not Playwright's UI Mode.\n\n## Playwright UI Mode (so you can contrast)\n\n`npx playwright test --ui` opens a runner with watch mode, a timeline of actions, pick-locator, and often a path into traces. Post-mortem for CI is still `trace.zip` (9.12). Cypress's interactive story is live snapshots; Playwright's is live inspector **plus** a portable trace file.\n\n## Selenium\n\nNo first-party equivalent. People glue Teswell / vendor IDEs / IDE breakpoints on JUnit. Do not compare Cypress App to \"Selenium IDE\" record-and-playback as if they were the same generation of tool.\n\nInterview line: \"Cypress UI Mode is `cypress open` — live Command Log and time-travel. Playwright's `--ui` is a different runner. Cypress has no Trace Viewer in that window.\"",
  "advantages": [
    "9.11 UI Mode — Junior engineers search for Playwright's UI Mode flags inside Cypress and conclude Cypress 'has no UI."
  ],
  "limitations": [
    "9.11 UI Mode is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
