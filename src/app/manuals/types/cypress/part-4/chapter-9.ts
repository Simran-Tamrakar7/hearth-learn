import type { ChapterRecord } from "../../../types";

/** 31. Debugging Tools */
export const chapter = {
  id: "cy-31-debug",
  title: "31. Debugging Tools",
  minutes: 30,
  level: "advanced",
  phase: "Part 4 · Advanced",
  partName: "Part 4 · Advanced",
  overviewText: "Comprehensive coverage of Debugging Tools in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering Debugging Tools in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging debugging tools in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around debugging tools — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["Command Log time-travel","cy.pause interactive","cy.debug console","cy.log narrative","auto screenshot fail","video for CI"],
  limitations: ["pause must not ship","no time-travel headless","debug less than Inspector","verbose log clutters","video large files","no trace zip portable"],
  tools: [],
  customSummary: "- Time-travel (Command Log clicking) is the first, zero-code debugging tool.\n- .debug() logs the current subject to DevTools console and pauses; .pause() gives step-through play/next controls in the Test Runner (Cypress's version of Playwright's Inspector).\n- Real DevTools work directly against the live test run (no separate recorded-trace step needed) since test and app share the same tab.\n- cy.log() interleaves custom messages directly into the Command Log timeline — better for post-hoc review than a plain console.log().",
  contentMarkdown: "## Time-travel\n\nAlready covered in depth (Part 0, Chapter 7) — your first debugging tool to reach for. Click entries in the Command Log to restore DOM snapshots at any step — zero extra setup.\n\n## .debug()\n\n```javascript\ncy.get('[data-cy=total-price]').debug().should('contain', '$49.99');\n```\n\n`.debug()` logs the yielded subject to DevTools and pauses execution — inspect the jQuery-wrapped element before the chain continues.\n\n## .pause()\n\n```javascript\ncy.get('[data-cy=submit]').click();\ncy.pause();\ncy.get('[data-cy=confirmation]').should('be.visible');\n```\n\n`.pause()` halts the test and shows play/step controls in the Test Runner — closest to Playwright's PWDEBUG=1 Inspector, but inserted as a command in your spec.\n\n## DevTools integration\n\nBecause Cypress runs in the same browser tab as your app, real DevTools (Network, Console, Elements, breakpoints in app source) work live — no separate trace file required.\n\n## cy.log()\n\n```javascript\ncy.log('Starting leave request submission flow');\ncy.get('[data-cy=leave-type]').select('Annual');\ncy.log('Selected leave type: Annual');\n```\n\n`cy.log()` queues messages into the Command Log chronologically — better than `console.log()` for narrating where a failed CI run got to.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
