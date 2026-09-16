import type { ChapterRecord } from "../../../types";

/** 12.2 Common Anti-Patterns */
export const chapter = {
  "id": "cy-12-2-common-anti-patterns",
  "title": "12.2 Common Anti-Patterns",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 12 · Debugging & Best Practices",
  "partName": "Part 12 · Debugging & Best Practices",
  "overviewText": "The classics: cy.wait(milliseconds) as a strategy, awaiting cy.get, assigning a command to a const outside .then, conditional testing on the DOM, UI login in every test, CSS-hash locators, chromeWebSecurity: false as default, blanket uncaught:exception, retries as a fix, and targeting a second tab. Each one maps to a better Cypress idiom or to 'use Playwright for that path.'",
  "why": "Interview whiteboards are often 'what's wrong with this spec?' Recognizing anti-patterns is how you read a junior's PR in five minutes.",
  "when": "Code review, rewriting a Selenium port (9.16), and whenever flake appears (12.3).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A spec does cy.wait(5000), const btn = cy.get('button'), then clicks if the button exists, after a full UI login, then tries to switch tabs.",
    "pass": "You replace wait with an assertion or @alias, use .then/aliases, always assert the button, use cy.session, and drop the tab switch for href/request.",
    "fail": "You add another cy.wait and retries: 4."
  },
  "tools": [],
  "customSummary": "- Hard cy.wait(n) vs retry-ability / cy.wait('@alias').\n- Commands are not Promises — no await cy.get, no const el = cy.get.\n- No if (element exists) happy paths; no switchToTab.\n- Login via cy.session; locators via data-cy; don't globally kill web security or exceptions.\n- Playwright anti-patterns differ (missing await); do not 'fix' Cypress with Playwright syntax.",
  "contentMarkdown": "## Gallery with replacements\n\n**Sleep**\n```js\ncy.wait(5000);\n// instead:\ncy.get('[data-cy=approve]').should('be.enabled');\ncy.wait('@getBalance');\n```\n\n**Treating commands as values**\n```js\nconst el = cy.get('[data-cy=total]'); // chainable, not a DOM node\nel.text(); // not a string\n// instead:\ncy.get('[data-cy=total]').invoke('text').then((t) => { /* t is a string */ });\ncy.get('[data-cy=total]').as('total');\n```\n\n**`await cy.get`**\nCypress commands are not Promises. `async/await` around them is a first-week bug (Part 0.3). Playwright *does* await locators — do not mix the models.\n\n**Conditional testing**\n```js\ncy.get('body').then(($b) => {\n  if ($b.find('[data-cy=cookie-banner]').length) {\n    cy.get('[data-cy=cookie-accept]').click();\n  }\n});\n```\nCookie banners are a rare legitimate branch. Do **not** `if` the approve button — then you are not testing the product. Prefer `cy.get(...).should('not.exist')` when absence is the requirement.\n\n**Login UI every test** — `cy.session` (Part 7).\n\n**`.btn-primary > span:nth-child(2)`** — `data-cy`.\n\n**Second tab** — 9.3, there is no `switchToTab`.\n\n**`chromeWebSecurity: false`** as a default — 9.1, use `cy.origin`.\n\n**`uncaught:exception => false`** — 11.7.\n\n**`retries: 5`** — 10.3 / 9.13.\n\n## Versus Playwright and Selenium\n\nPlaywright anti-pattern: missing `await`, overly strict screenshots, sharing one page across tests. Selenium: implicit+explicit waits, Thread.sleep, stale element retries-by-hand. Cypress anti-patterns are **queue and architecture** flavored.\n\nInterview line: \"The big ones: hard waits, using commands as values, DOM if-else, UI login every test, and pretending tabs exist.\"",
  "advantages": [
    "12.2 Common Anti-Patterns — Interview whiteboards are often 'what's wrong with this spec?' Recognizing anti-patterns is how you read a junior's PR in five minutes."
  ],
  "limitations": [
    "12.2 Common Anti-Patterns is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
