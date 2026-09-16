import type { ChapterRecord } from "../../../types";

/** 14.8 Social & Real-Time Communities */
export const chapter = {
  "id": "cy-14-8-social-real-time-communities",
  "title": "14.8 Social & Real-Time Communities",
  "minutes": 14,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Official Cypress Discord/GitHub discussions, Stack Overflow (tag cypress), and a few practitioner Discords. Twitter/X and Reddit are noisy. Paste minimal repros: Cypress version, browser, whether origin/iframe/shadow is involved. Do not paste payroll PII or record keys. Playwright Discord is the right place for WebKit questions — not Cypress Discord.",
  "why": "You will get stuck on origin serialization or a GitHub Action cache. Communities save hours if you ask with versions.",
  "when": "When docs and this manual do not match a weird error (Appendix D), and when a plugin (grep, axe) breaks on a new Cypress major.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "cy.origin callback cannot see a custom command. You need a known-good answer.",
    "pass": "You post Cypress version, a 15-line spec, and ask about Cypress.require / args. You do not dump the whole HRM repo.",
    "fail": "You ask 'why is Cypress flaky?' with no spec, or you paste CYPRESS_RECORD_KEY."
  },
  "tools": [],
  "customSummary": "- Cypress Discord/GitHub + Stack Overflow.\n- Minimal repro + version + browser.\n- Secrets stay out of pastes.\n- WebKit/native questions go to Playwright/Appium communities.\n- Be kind; search first.",
  "contentMarkdown": "## A good question\n\n\"Cypress 13.7, Chrome, `cy.origin('https://login.example', { args: { user } }, ...)` — `user` is missing if I close over it without args. I passed args; the callback still does not see `user`. Here's a 15-line spec.\"\n\nThat is answerable. \"SSO doesn't work\" is not. \"Why is Cypress flaky?\" with no spec is not.\n\n## Where to ask\n\n- Official Cypress Discord / GitHub Discussions — runner, origin, CT.\n- Stack Overflow tag `cypress` — durable answers; search first.\n- Plugin repos (`@cypress/grep`, `cypress-axe`) issues — version peerDependency problems.\n- Playwright Discord / Stack Overflow `playwright` — WebKit, traces, popups (not Cypress Discord).\n- Selenium / Appium Slack or GitHub — Grid, SafariDriver, native.\n\nReddit r/QualityAssurance and Twitter/X are noisy. Tool wars belong in 9.2's table, not in a comment thread.\n\n## Hygiene\n\nPaste Cypress version, browser, whether origin/iframe/shadow is involved. Do not paste payroll PII, `CYPRESS_RECORD_KEY`, or `cypress.env.json`. Minimize the spec.\n\nInterview line: \"I ask versioned minimal repros in Cypress communities. I take WebKit/trace questions to Playwright, and native questions to Appium/Selenium communities.\"",
  "advantages": [
    "14.8 Social & Real-Time Communities — You will get stuck on origin serialization or a GitHub Action cache."
  ],
  "limitations": [
    "14.8 Social & Real-Time Communities is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
