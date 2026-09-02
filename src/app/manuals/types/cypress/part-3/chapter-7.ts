import type { ChapterRecord } from "../../../types";

/** 21. Cookies & Local Storage */
export const chapter = {
  id: "cy-21-cookies",
  title: "21. Cookies & Local Storage",
  minutes: 28,
  level: "intermediate",
  phase: "Part 3 · Actions",
  partName: "Part 3 · Actions",
  overviewText: "Comprehensive coverage of Cookies & Local Storage in Cypress with code examples, Playwright comparisons, and interview-ready depth paired with the Playwright manual.",
  why: "Mastering Cookies & Local Storage in Cypress's command-queue model prevents flaky specs and wrong Playwright ports.",
  when: "Read when implementing or debugging cookies & local storage in your suite.",
  practical: { app: "Web application under test", scenario: "Spec fails around cookies & local storage — need Cypress-native pattern.", pass: "Apply chapter patterns with retry semantics not bare cy.wait(ms).", fail: "Port Playwright await code or fixed delays." },
  advantages: ["setCookie getCookie","clearCookies isolation","localStorage via window","preserveOnce speed","HttpOnly via request","default isolation"],
  limitations: ["localStorage needs window","HttpOnly not setCookie","third-party cookie limits","preserveOnce leaks","session preferred Ch26","SameSite secure context"],
  tools: [],
  contentMarkdown: "## Cookies — go deeper on Cypress's built-in commands and the cross-test-isolation behavior\n\n```javascript\ncy.setCookie('session_token', 'abc123');\ncy.getCookie('session_token').should('have.property', 'value', 'abc123');\ncy.getCookies();          // all cookies for the current domain\ncy.clearCookie('session_token');\ncy.clearCookies();        // clears all\nCypress has built-in first-class cookie commands (cy.setCookie, cy.getCookie, cy.clearCookie, and their plural forms) — no plugin needed, similar in convenience to Playwright's context.add_cookies()/context.cookies(). Worth knowing the default isolation behavior: by default, Cypress automatically clears cookies before each test (configurable via testIsolation in newer Cypress versions), giving you test-to-test isolation similar in spirit to Playwright's fresh-BrowserContext-per-test default (Part 1, Ch. 3 of your Playwright manual) — just achieved through explicit cookie-clearing rather than Playwright's fuller context-level isolation (which also isolates localStorage, cache, and permissions, not just cookies).\n```\n\n## Local storage — go deeper on the historical gap and current built-in commands\n\nWorth knowing the history briefly: Cypress didn't have built-in localStorage commands for a long time, and directly manipulating window.localStorage via cy.window() was the standard workaround for years. Recent Cypress versions (12+) added first-class commands:\n```javascript\ncy.window().then((win) => {\n  win.localStorage.setItem('theme', 'dark');\n});\n\n// Newer built-in commands (Cypress 12+)\ncy.setLocalStorage('theme', 'dark');\ncy.getLocalStorage('theme').should('eq', 'dark');\ncy.clearLocalStorage();\nThe cy.window().then((win) => { win.localStorage... }) pattern is worth understanding even if you use the newer built-in commands going forward, since it's the more general escape hatch pattern (directly touching the real browser window object) that you'll reach for constantly elsewhere too — it's the same underlying technique used for the prompt() stubbing in Chapter 20 and for reading/writing anything else on window that Cypress doesn't have a dedicated command for.\n```\n\n## Tying forward to session reuse — brief preview of Chapter 26\n\nCookies and localStorage manipulation are the literal building blocks underneath Cypress's higher-level cy.session() command (Chapter 26) — cy.session() is essentially a smart wrapper that caches and restores exactly this kind of cookie/localStorage state between tests, similar in purpose to Playwright's storage_state (Part 4, Ch. 20 of your Playwright manual), so understanding the raw commands here directly sets up why cy.session() works the way it does later.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
