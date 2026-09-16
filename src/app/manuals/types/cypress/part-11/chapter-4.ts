import type { ChapterRecord } from "../../../types";

/** 11.4 Cypress Cloud AI Features */
export const chapter = {
  "id": "cy-11-4-cypress-cloud-ai-features",
  "title": "11.4 Cypress Cloud AI Features",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 11 · CI/CD Integration",
  "partName": "Part 11 · CI/CD Integration",
  "overviewText": "Any 'AI' in the Cypress ecosystem sits on Cloud (failure clustering, debug assistance, Test Replay insights) — not in npm install cypress. It is not Playwright Trace Viewer, not a self-healing replacement for data-cy, and not a reason to skip cy.origin. Treat vendor AI as a helper on recorded runs; keep assertions deterministic.",
  "why": "Sales decks will blur AI, Test Replay, and 'self-healing locators.' Hiring managers want to hear you separate marketing from the runner you can git clone.",
  "when": "When evaluating a Cloud plan that lists AI/debug features, and when someone wants AI-generated specs as the suite.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A vendor demo auto-suggests a locator after a failure. You must decide if Bizlevate should rely on it.",
    "pass": "You use Cloud Debug/Replay to inspect a recorded failure, you still fix locators and waits in code, and you do not accept AI-suggested CSS as the strategy.",
    "fail": "You describe Cypress as having built-in AI self-healing like a magic Playwright Trace."
  },
  "tools": [],
  "customSummary": "- Cloud AI/debug features require recorded runs and a plan — not the OSS runner.\n- Test Replay / Debug ≠ Trace Viewer zip (9.12).\n- AI-suggested locators are hints; data-cy remains the strategy.\n- Generated tests still need review (flake, origin, tabs).\n- Playwright and Selenium vendors ship their own AI add-ons — same skepticism.",
  "contentMarkdown": "## What is real vs adjacent\n\n**Real, paid, Cypress-branded:** Cloud Test Replay / Debug (reconstruct a recorded run), analytics that group failures, and whatever \"AI\" assistant the current Cloud plan wraps around those artifacts. These need `--record`.\n\n**Not real in OSS Cypress:** a Trace Viewer, self-healing `cy.get('.css-x7k')` that silently retargets, or an offline zip you open with `show-trace`.\n\nIf the feature is not reproducible from `cypress run` without a key, it is Cloud, not Cypress-the-test-runner.\n\n## How to use it without lying to yourself\n\n1. Record CI (11.3).\n2. Open the failed run; watch Replay if you have it.\n3. Fix the spec: intercept, `data-cy`, `cy.origin` args (9.1), isolation.\n4. If an AI panel suggests a selector, treat it like Selector Playground — a guess, then apply Part 4 discipline.\n\nGenerated Studio / AI specs will not invent `{ args }` for Okta. Review like a junior PR.\n\n## Versus Playwright and Selenium vendors\n\nPlaywright's OSS trace is already a powerful post-mortem **without** AI. mabl, Testim, and some Selenium clouds have sold \"self-healing\" for years; it trades determinism for magic. Cypress Cloud AI is in that product category. Appium device clouds also sell analytics — still not a substitute for `data-cy`.\n\nInterview line: \"Cloud AI is dashboard assistance on recorded runs. The runner has no Trace Viewer and no self-healing I would bet payroll on. Playwright traces and Selenium vendor videos are the cousins.\"",
  "advantages": [
    "11.4 Cypress Cloud AI Features — Sales decks will blur AI, Test Replay, and 'self-healing locators."
  ],
  "limitations": [
    "11.4 Cypress Cloud AI Features is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
