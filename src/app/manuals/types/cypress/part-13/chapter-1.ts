import type { ChapterRecord } from "../../../types";

/** 13.1 Real-World Capstone Project */
export const chapter = {
  "id": "cy-13-1-real-world-capstone-project",
  "title": "13.1 Real-World Capstone Project",
  "minutes": 35,
  "level": "advanced",
  "phase": "Part 13 · Real-World Project & Job Readiness",
  "partName": "Part 13 · Real-World Project & Job Readiness",
  "overviewText": "The capstone is a public, CI-gated Cypress suite against a Bizlevate-like HRM (or a faithful demo): session login, leave submit/approve, at least one cy.origin SSO stub or real IdP, a component test for a form, axe on a modal, grep-tagged smoke, and GitHub Actions with artifacts. Multi-tab PDF is handled with href/request, not switchToTab. Native mobile is explicitly out of scope (Appium).",
  "why": "Employers hire evidence. A kitchen-sink clone of example.cypress.io is weaker than a domain suite that shows architecture judgment (origin, CT vs E2E, no fake WebKit).",
  "when": "After Parts 0–12, when you need one project that you can talk through in an interview for 15 minutes.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You must design and implement a capstone that would survive a staff-engineer code review at Bizlevate.",
    "pass": "You ship a repo with README, data-cy, cy.session, one origin (or documented stub), CT for LeaveRequestForm, @smoke in GHA, Mochawesome or artifacts, and a written 'what we did not test' (tabs, WebKit, native).",
    "fail": "You record a UI-login every test, sleep-based suite against the Cypress kitchen sink, and claim mobile native coverage."
  },
  "tools": [],
  "customSummary": "- Domain suite (leave/payroll/roles), not only example.cypress.io.\n- Must show: session, intercept or request, CT vs E2E, grep smoke, GHA action, artifacts.\n- Must show judgment: cy.origin args, no switchToTab, no built-in visual, no Trace Viewer, Appium for native.\n- README = the interview script.\n- Playwright/Selenium capstones can coexist — say why Cypress was the right tool for this app.",
  "contentMarkdown": "## Scope a capstone that fits a week, not a quarter\n\n**In:**\n\n- App: Bizlevate HRM demo or your clone (employees, leave, a manager queue). If you cannot use the real app, use a public HRM-like demo **plus** a README that maps features.\n- E2E: login via `cy.session`, employee submits leave, manager approves, list reflects status (intercept or real API — say which).\n- Cross-origin: either a real IdP in `cy.origin('https://...', { args }, cb)` or a documented fake IdP origin. Show `args` and a yielded value once.\n- CT: `LeaveRequestForm` zero-balance + submit disabled (9.5).\n- a11y: `cypress-axe` on the leave modal (9.7).\n- Org: `@smoke` / `@regression` with grep plugin (10.1).\n- CI: `cypress-io/github-action`, Chrome, wait-on, screenshots on failure (11.1, 11.8).\n\n**Out (and say so in README):**\n\n- Native iOS app — Appium.\n- Safari/WebKit first-class — Playwright if needed.\n- Two live tabs — href/`cy.request` only.\n- Visual AI — plugin or skip, do not pretend `cy.screenshot` diffs.\n\n## Suggested spec map\n\n| Spec | Tags | Notes |\n|---|---|---|\n| `login.cy.ts` | `@smoke` | session only after first |\n| `leave-submit.cy.ts` | `@smoke @leave` | intercept balance |\n| `leave-approve.cy.ts` | `@leave` | two sessions (employee, manager) |\n| `sso.cy.ts` | `@okta @nightly` | `cy.origin` + args |\n| `payslip-link.cy.ts` | `@payroll` | href + `cy.request` PDF |\n| `LeaveRequestForm.cy.tsx` | CT | props matrix |\n\n## Definition of done\n\n- `npx cypress run --browser chrome --env grepTags=@smoke` < 6 minutes locally.\n- GHA badge green on main.\n- No `cy.wait(n)` without a comment that you are ashamed of.\n- One paragraph in README: Cypress vs Playwright vs Selenium *for this product*.\n\nInterview line: \"My capstone is an HRM journey suite: session, origin with args, CT for the form, smoke in GitHub Actions. I did not fake tabs or native mobile.\"",
  "advantages": [
    "13.1 Real-World Capstone Project — Employers hire evidence."
  ],
  "limitations": [
    "13.1 Real-World Capstone Project is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
