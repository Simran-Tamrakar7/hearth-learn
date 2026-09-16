import type { ChapterRecord } from "../../../types";

/** 14.9 Browser Extensions & Developer Tools */
export const chapter = {
  "id": "cy-14-9-browser-extensions-developer-tools",
  "title": "14.9 Browser Extensions & Developer Tools",
  "minutes": 16,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Chrome DevTools is still the debugger: accessibility tree, event listeners, network. Cypress Selector Playground and time-travel complement it. axe DevTools / WAVE help you interpret cypress-axe failures (9.7). React/Vue DevTools help CT. None of these replace data-cy. Playwright has a pick-locator in UI Mode; Selenium IDE is not the same as Cypress App.",
  "why": "You will spend more time in DevTools than in any plugin. Knowing which panel answers 'why isn't this clickable' is the job.",
  "when": "When a click times out, when axe reports a node you cannot see, and when choosing a locator.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "checkA11y fails on a contrast issue in the leave modal. You need to see the computed color.",
    "pass": "You time-travel to the check, inspect the element in DevTools, confirm contrast, then fix CSS or disable the rule with a ticket — not by deleting axe.",
    "fail": "You only use Selector Playground CSS and ignore the a11y tree."
  },
  "tools": [],
  "customSummary": "- DevTools + Cypress time-travel together.\n- Selector Playground is a suggestion; prefer data-cy.\n- axe DevTools/WAVE complement cypress-axe.\n- Framework DevTools for CT (9.5).\n- Playwright locator picker / Selenium IDE are different products.",
  "contentMarkdown": "## The pairing\n\nCypress restores a historical DOM; Chrome DevTools inspects that restored DOM (Part 0.7, 9.11). Use **Elements** (coverage, `pointer-events`), **Console** (app errors — 11.7), **Network** (compare to `cy.intercept`). The Accessibility pane: name, role, contrast — same issues `cypress-axe` fails on (9.7).\n\nSelector Playground is a suggestion with a live match count. Prefer `data-cy`. Treating Playground CSS as strategy is how HRM suites rot.\n\n## Extensions worth installing\n\n- axe DevTools / WAVE — interactive a11y, complement CI `cy.checkA11y`.\n- React / Vue / Angular DevTools — props that CT should `cy.mount` (9.5).\n- Do not rely on recorder extensions as your framework (Studio / Selenium IDE class tools).\n\n## Versus Playwright and Selenium\n\nPlaywright UI Mode pick-locator is excellent; still verify in DevTools. Playwright Trace Viewer is a **file** you open after CI (9.12) — not an extension. Selenium IDE recorders produce the same brittle CSS Cypress Studio does. For native, the inspector is Appium Inspector, not Chrome DevTools.\n\nInterview line: \"I inspect the time-traveled DOM in Chrome DevTools. Playground selectors are guesses. axe extensions complement `cypress-axe`. Playwright's locator picker and Selenium IDE are different products.\"",
  "advantages": [
    "14.9 Browser Extensions & Developer Tools — You will spend more time in DevTools than in any plugin."
  ],
  "limitations": [
    "14.9 Browser Extensions & Developer Tools is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
