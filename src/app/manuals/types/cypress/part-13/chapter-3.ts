import type { ChapterRecord } from "../../../types";

/** 13.3 Interview Prep */
export const chapter = {
  "id": "cy-13-3-interview-prep",
  "title": "13.3 Interview Prep",
  "minutes": 30,
  "level": "advanced",
  "phase": "Part 13 · Real-World Project & Job Readiness",
  "partName": "Part 13 · Real-World Project & Job Readiness",
  "overviewText": "Interview answers for Cypress are architecture sentences with a Bizlevate example, not command lists. Drill: command queue vs Promises, cy.origin args/return, no switchToTab, includeShadowDom, CT vs E2E, no built-in visual, cypress-axe, parallel = machines, no first-class WebKit, no Trace Viewer, retries hide flake, grep plugin, GitHub action, cypress/browsers, Sorry Cypress/Currents, Mochawesome two-part, cy.task vs cy.log, Appium for native.",
  "why": "A whiteboard 'compare Cypress and Playwright' is the most common senior screen. This chapter is the cheat sheet you earned in Parts 0–12.",
  "when": "The week before interviews, and after any chapter you could not explain to a rubber duck.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "An interviewer says: 'SSO, a PDF tab, Safari, and a native app — how do you test Bizlevate?' You have 8 minutes.",
    "pass": "You split tools: cy.origin+args for SSO, href/request for PDF, Playwright or cloud Safari for WebKit, Appium for native, Cypress CT for the form, GHA+grep for CI. You never say Cypress does all four.",
    "fail": "You recite cy.get/cy.click and say Cypress is just faster Selenium."
  },
  "tools": [],
  "customSummary": "- Lead with execution model (in-page vs driver), then limits, then substitutes.\n- Memorize the must-teach list in this chapter's drills.\n- Prefer one HRM story over ten APIs.\n- Code pairing: write a session+intercept spec, not a sleep.\n- Compare Playwright/Selenium without trashing them — you might need all three.",
  "contentMarkdown": "## Drill questions (answer out loud)\n\n**Why aren't Cypress commands Promises?** Queue + retry-ability. `await cy.get` is wrong.\n\n**SSO?** `cy.origin(url, { args }, cb)`; args serializable; yield to return data. Playwright: transparent. Selenium: transparent (`get` on the IdP URL).\n\n**PDF new tab?** No `cy.switchToTab`. Assert href or `cy.request`. Playwright: popup Page. Selenium: window handles.\n\n**Shadow DOM?** `includeShadowDom` or `.shadow()`. Playwright pierces open shadow by default. Selenium: `getShadowRoot()`.\n\n**CT vs E2E?** `cy.mount` isolation vs real journeys. Playwright CT exists (JS); Selenium has none.\n\n**Visual?** No built-in matcher. Plugin/SaaS. Playwright `toHaveScreenshot`. Selenium: plugin/SaaS.\n\n**a11y?** `cypress-axe` / axe-core. `injectAxe` then `checkA11y`.\n\n**Parallel?** Machines sharding specs, one browser each — not Chrome+Firefox in one process. Playwright workers; Selenium Grid.\n\n**Safari?** No first-class WebKit.\n\n**Trace?** Cypress has no Trace Viewer. Video/PNG; Cloud Debug/Replay paid. Playwright `trace.zip`.\n\n**Retries?** Hide flake. Command retry ≠ test retry.\n\n**Tags?** Grep plugin, not native.\n\n**CI?** `cypress-io/github-action`, `cypress run`, wait-on.\n\n**Docker?** `cypress/browsers` / `included`.\n\n**No Cloud?** Sorry Cypress / Currents / Mochawesome two-part.\n\n**Logs in CI?** `cy.task` not `cy.log`.\n\n**Native mobile?** Appium — same answer if they say Playwright or Selenium.\n\n## Live coding expectations\n\n```js\ncy.session('emp', () => { /* request or UI */ });\ncy.intercept('GET', '/api/leave', { fixture: 'leave.json' }).as('leave');\ncy.visit('/leave');\ncy.wait('@leave');\ncy.get('[data-cy=new-request]').click();\n```\n\nTalk while you type: intercept **before** visit, session before visit, data-cy. If they ask you to `await` it, explain the queue. If they ask for `driver.switchTo()`, explain 9.3.\n\n## Behavioral\n\n\"Tell me about flake\" → 9.13 + 12.3 story with a metric (retries, then a fix).\n\"Disagreement on tool\" → 9.2 senior split Cypress / Playwright / Selenium.\n\nInterview line: \"I explain the iframe architecture, then I map each Bizlevate risk to origin, request, Playwright, Selenium Grid, or Appium.\"",
  "blocks": [
    {
      "id": "cy-13-3-md-0",
      "type": "overview",
      "heading": "Drill questions (answer out loud)",
      "content": "**Why aren't Cypress commands Promises?** Queue + retry-ability. `await cy.get` is wrong.\n\n**SSO?** `cy.origin(url, { args }, cb)`; args serializable; yield to return data. Playwright: transparent. Selenium: transparent (`get` on the IdP URL).\n\n**PDF new tab?** No `cy.switchToTab`. Assert href or `cy.request`. Playwright: popup Page. Selenium: window handles.\n\n**Shadow DOM?** `includeShadowDom` or `.shadow()`. Playwright pierces open shadow by default. Selenium: `getShadowRoot()`.\n\n**CT vs E2E?** `cy.mount` isolation vs real journeys. Playwright CT exists (JS); Selenium has none.\n\n**Visual?** No built-in matcher. Plugin/SaaS. Playwright `toHaveScreenshot`. Selenium: plugin/SaaS.\n\n**a11y?** `cypress-axe` / axe-core. `injectAxe` then `checkA11y`.\n\n**Parallel?** Machines sharding specs, one browser each — not Chrome+Firefox in one process. Playwright workers; Selenium Grid.\n\n**Safari?** No first-class WebKit.\n\n**Trace?** Cypress has no Trace Viewer. Video/PNG; Cloud Debug/Replay paid. Playwright `trace.zip`.\n\n**Retries?** Hide flake. Command retry ≠ test retry.\n\n**Tags?** Grep plugin, not native.\n\n**CI?** `cypress-io/github-action`, `cypress run`, wait-on.\n\n**Docker?** `cypress/browsers` / `included`.\n\n**No Cloud?** Sorry Cypress / Currents / Mochawesome two-part.\n\n**Logs in CI?** `cy.task` not `cy.log`.\n\n**Native mobile?** Appium — same answer if they say Playwright or Selenium.",
      "order": 0
    },
    {
      "id": "cy-13-3-md-1",
      "type": "overview",
      "heading": "Live coding expectations",
      "content": "```js\ncy.session('emp', () => { /* request or UI */ });\ncy.intercept('GET', '/api/leave', { fixture: 'leave.json' }).as('leave');\ncy.visit('/leave');\ncy.wait('@leave');\ncy.get('[data-cy=new-request]').click();\n```\n\nTalk while you type: intercept **before** visit, session before visit, data-cy. If they ask you to `await` it, explain the queue. If they ask for `driver.switchTo()`, explain 9.3.",
      "order": 1
    },
    {
      "id": "cy-13-3-md-2",
      "type": "overview",
      "heading": "Behavioral",
      "content": "\"Tell me about flake\" → 9.13 + 12.3 story with a metric (retries, then a fix).\n\"Disagreement on tool\" → 9.2 senior split Cypress / Playwright / Selenium.\n\nInterview line: \"I explain the iframe architecture, then I map each Bizlevate risk to origin, request, Playwright, Selenium Grid, or Appium.\"",
      "order": 2
    }
  ],
  "advantages": [
    "13.3 Interview Prep — A whiteboard 'compare Cypress and Playwright' is the most common senior screen."
  ],
  "limitations": [
    "13.3 Interview Prep is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
