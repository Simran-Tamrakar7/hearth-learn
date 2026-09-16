import type { ChapterRecord } from "../../../types";

/** 10.3 Retries */
export const chapter = {
  "id": "cy-10-3-retries",
  "title": "10.3 Retries",
  "minutes": 24,
  "level": "advanced",
  "phase": "Part 10 · Test Organization & Execution",
  "partName": "Part 10 · Test Organization & Execution",
  "overviewText": "Cypress can retry a whole failed test in runMode (CI) and/or openMode (the App). retries: { runMode: 2 } means up to three attempts. A pass on attempt two is a green spec and a hidden flake (9.13). Playwright Test retries and pytest-rerunfailures work the same way. Use retries as a shock absorber while you fix isolation — not as the quality strategy.",
  "why": "Teams set runMode: 4 to make GitHub green. That trains everyone to ignore the first failure. Interviewers want you to know the config *and* the moral hazard.",
  "when": "When enabling CI for the first time, when Cloud reports flake, and when you are asked to 'just turn on retries' after a flaky payroll spec.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "CI is noisy on leave-approve. Someone proposes retries: 5. You must configure something safer and keep flake visible.",
    "pass": "You set a small runMode (1–2) if needed, leave openMode 0 so local failures stay loud, and you still ticket any test that used a retry.",
    "fail": "You set retries: 5 globally and call the suite stable."
  },
  "tools": [],
  "customSummary": "- retries.runMode vs openMode — CI vs App; a retry-pass is still flake.\n- Whole test retries; this is not the same as command retry-ability (Part 2).\n- Default is 0. Cypress 13+ keeps that unless you set it.\n- Playwright retries in config; Selenium TestNG retry analyzers — same trap.\n- Pair with grep @flake quarantine (10.1) rather than infinite retries.",
  "contentMarkdown": "## Two different \"retries\"\n\n**Command retry-ability** (Part 2): `cy.get('.row').should('have.length', 3)` re-queries until timeout. That is Cypress's core waiting model. It is good.\n\n**Test retries:** if the `it()` fails, Mocha/Cypress runs the entire test again.\n\n```js\n// cypress.config.ts\nexport default defineConfig({\n  retries: { runMode: 1, openMode: 0 },\n});\n\n// per-test override\nit('payroll csv export', { retries: 2 }, () => { /* ... */ });\n```\n\n`runMode: 1` ⇒ original + one retry (two attempts). `openMode: 0` ⇒ when you watch in the App, a fail stays a fail so you debug it.\n\n## Why retries hide flake\n\nAttempt 1: approve button covered by a toast. Fail. Attempt 2: toast gone. Pass. CI is green. The toast still races. Cloud (11.3) can mark this flaky *if you record*. Without Cloud, look for \"Attempt 2 of 2\" in the log and treat it as a defect.\n\n## Policy for Bizlevate\n\n- Default global retries **0** until the suite is honest.\n- If CI hardware is bursty, `runMode: 1` max as a shock absorber.\n- Never retry `@okta` 5 times to paper over a bad `cy.origin` (9.1).\n- Quarantine with `@flake` + grepInvert on PR (10.1, 9.13).\n\n## Versus Playwright and Selenium\n\nPlaywright: `retries: 2` in `playwright.config`. pytest-rerunfailures: `--reruns 2`. TestNG: `IRetryAnalyzer`. All of them can make a dashboard look healthy. Senior engineers report retry rate as a KPI.\n\nInterview line: \"Command retries are waiting. Test retries hide flake. I keep `openMode` at 0 and I never use retries as the fix.\"",
  "advantages": [
    "10.3 Retries — Teams set runMode: 4 to make GitHub green."
  ],
  "limitations": [
    "10.3 Retries is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
