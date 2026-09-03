import type { ChapterRecord } from "../../../types";

/** 33. Cross-browser & Cross-device Testing (Cypress) */
export const chapter = {
  id: "cy-33-cross-browser",
  title: "33. Cross-browser & Cross-device Testing (Cypress)",
  minutes: 28,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Cypress supports Chrome, Firefox, Edge, and Electron via --browser. There is no WebKit. cy.viewport presets resize the window but do not set user-agent or touch; geolocation has no built-in stub — mock manually.",
  why: "Teams often assume viewport equals mobile or that Safari is a flag away. Knowing the real browser matrix and emulation limits avoids false confidence.",
  when: "Before claiming multi-browser coverage; when product analytics show Safari/mobile traffic that Cypress cannot exercise.",
  practical: {"app":"Responsive SaaS","scenario":"Need Chrome + Firefox CI jobs and honest mobile coverage story.","pass":"--browser chrome/firefox/edge matrix; real device or Playwright for WebKit.","fail":"cy.viewport(iPhone) treated as real iOS/Safari coverage."},
  tools: [],
  customSummary: "- --browser chrome/firefox/edge/electron no WebKit; cy.viewport presets don't set UA/touch; no geolocation API stub manually",
  contentMarkdown: "## Supported browsers\n\n```bash\nnpx cypress run --browser chrome\nnpx cypress run --browser firefox\nnpx cypress run --browser edge\nnpx cypress run --browser electron   # default\n```\n\nThere is **no** `--browser webkit`. That is architectural, not a missing option — pair with Playwright/Safari if WebKit matters.\n\n## before:browser:launch\n\nUse `on('before:browser:launch', ...)` in `setupNodeEvents` for Chrome flags (e.g. `--disable-gpu` in CI).\n\n## Viewport ≠ device\n\n`cy.viewport('iphone-x')` only sets dimensions. It does **not** change user-agent, touch events, or device APIs. Treat it as layout stress, not device coverage.\n\n## Geolocation\n\nCypress has no first-class geolocation stub. Stub `navigator.geolocation` in `onBeforeLoad` / `cy.visit` callbacks, or drive location via app test hooks.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
