import type { ChapterRecord } from "../../../types";

/** 13.2 Portfolio Building */
export const chapter = {
  "id": "cy-13-2-portfolio-building",
  "title": "13.2 Portfolio Building",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 13 · Real-World Project & Job Readiness",
  "partName": "Part 13 · Real-World Project & Job Readiness",
  "overviewText": "A Cypress portfolio is a GitHub repo a stranger can clone: README with architecture decisions, how to run, CI badge, sample report/screenshot, and honest limits. One excellent HRM project beats ten tutorial repos. Link CT and E2E. Do not commit cypress.env.json secrets, videos of real payroll, or node_modules.",
  "why": "Recruiters open the README first. Cypress vs Playwright vs Appium sentences in that README do more than a certificate (14.6).",
  "when": "When the capstone is green, before you apply, and when you add Playwright/Appium repos — they should cross-link.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You have a working capstone and a Playwright Python repo. You need a portfolio that looks like one engineer, not two random tutorials.",
    "pass": "You publish the Cypress HRM repo with README (architecture + run + CI), hide secrets, add a short 'related: Playwright / Appium' section, and pin it on GitHub.",
    "fail": "You push .env with passwords and a README that only says npm install."
  },
  "tools": [],
  "customSummary": "- README: what the app is, how to run, CI, what is not covered (WebKit, tabs, native).\n- Evidence: GHA badge, HTML report or screenshots in docs/, not a 200MB video in git.\n- Secrets never committed; use env examples.\n- Cross-link Playwright + Appium as breadth (13.4).\n- Quality over count — one domain suite wins.",
  "contentMarkdown": "## README outline (steal this)\n\n1. **Problem** — HRM leave/payroll needs E2E + CT.\n2. **Why Cypress** — JS frontend team, CT, in-page intercepts. Why *not* only Cypress — no WebKit, no tabs, native is Appium.\n3. **How to run** — Node version, `npm ci`, `npm run start`, `npx cypress open`, CI command with grep.\n4. **Architecture** — `cy.session`, fixtures, grep tags, origin helper with `args`.\n5. **CI** — link to the GitHub Action workflow file (`cypress-io/github-action`).\n6. **Limits** — PDF new tab tested via `cy.request`; no Trace Viewer; visual not in OSS core.\n\n## What to show besides code\n\n- A 60-second GIF of the App time-travel on a failed command (not a 40-minute 4K video).\n- Mochawesome HTML hosted as GitHub Pages **if** it contains no PII (two-part merge, 11.6).\n- Issues/PRs on your own repo showing you fixed flake (12.3) — process evidence.\n\n## Hygiene\n\n`cypress.env.json`, `videos/`, real employee exports: gitignore. Provide `cypress.env.json.example`. Never commit `CYPRESS_RECORD_KEY`.\n\n## Versus a Playwright-only or Selenium-only portfolio\n\nIf you already have Playwright+Python, the Cypress repo should **not** clone the same tests line-for-line. Show CT, grep plugin, `cy.origin` args — the Cypress-shaped skills. A Selenium/JUnit repo still helps for enterprises that live on Grid; cross-link it as \"WebDriver family + Appium\" rather than competing with Cypress for the same screenshots.\n\nPlaywright portfolios usually show `trace.zip` and WebKit; Cypress portfolios should show the App GUI and CT. Interviewers who know both will ask why you chose each (Appendix A).\n\nInterview line: \"The README states why Cypress, how CI runs smoke, and what I refused to fake — tabs, WebKit, native. Playwright and Selenium repos are linked as breadth, not duplicates.\"",
  "advantages": [
    "13.2 Portfolio Building — Recruiters open the README first."
  ],
  "limitations": [
    "13.2 Portfolio Building is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
