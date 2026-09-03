import type { ChapterRecord } from "../../../types";

/** 35. Debugging Tools Expanded (Cypress) */
export const chapter = {
  id: "cy-35-debug-expanded",
  title: "35. Debugging Tools Expanded (Cypress)",
  minutes: 32,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Beyond pause/debug: before:browser:launch, cy.clock/tick, console spies via window, cy.task for Node/DB, cucumber preprocessor, and OAuth via cy.session rather than full UI login every time.",
  why: "Day-to-day failures need more than .pause() — clock control, Node tasks, and session reuse are the advanced debugging and setup toolkit.",
  when: "Time-dependent UI, DB assertions, BDD migration, or SSO setups that drown suites in login UI.",
  practical: {"app":"App with timers + DB","scenario":"Toast expires in 5s; need DB row assert after API.","pass":"cy.clock/tick; cy.task query; cy.session for OAuth.","fail":"cy.wait(5000); real OAuth every test."},
  tools: [],
  customSummary: "- before:browser:launch; cy.clock/tick; console spy via window; cy.task for DB; cucumber preprocessor; OAuth prefer cy.session",
  contentMarkdown: "## before:browser:launch\n\nHook in `setupNodeEvents` to tweak Chrome/Firefox launch args for CI flakiness or debugging ports.\n\n## cy.clock / cy.tick\n\n```javascript\ncy.clock();\ncy.visit('/dashboard');\ncy.tick(5000); // advance timers without waiting wall clock\n```\n\nControls `setTimeout`/`setInterval`/`Date` in the app under test — ideal for countdowns and expiry UI.\n\n## Console spy\n\n```javascript\ncy.visit('/', {\n  onBeforeLoad(win) {\n    cy.stub(win.console, 'error').as('consoleError');\n  },\n});\ncy.get('@consoleError').should('not.be.called');\n```\n\n## cy.task for DB / Node\n\nRegister tasks in `setupNodeEvents` to query DB, seed data, or read files from Node — keep browser commands thin.\n\n## Cucumber preprocessor\n\n`@badeball/cypress-cucumber-preprocessor` (or community forks) maps Gherkin to Cypress — useful for BDD shops; adds build pipeline complexity.\n\n## OAuth / SSO\n\nPrefer `cy.session` (and `cy.origin` when needed) over clicking full IdP UI every test. Cache tokens/cookies once per role.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
