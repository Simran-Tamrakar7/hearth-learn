import type { ChapterRecord } from "../../../types";

/** 9.13 Flaky Test Management */
export const chapter = {
  "id": "cy-9-13-flaky-test-management",
  "title": "9.13 Flaky Test Management",
  "minutes": 30,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "A flaky test is one that fails without a product change. Cypress retries (Part 10.3) and Cloud flake charts can hide the fire — a test that passes on retry is still broken. Detect via history, quarantine with an owner, then fix root causes (timing, isolation, data, origin/tab workarounds). Playwright's retries and pytest-rerunfailures have the same moral hazard.",
  "why": "Once Bizlevate's team says 'just re-run CI,' the suite has stopped being a gate. Flake management is process plus architecture, not a retries: 2 config flex.",
  "when": "When a spec is red then green on the same commit, when Cloud marks a test flaky, or when you are tempted to raise retries to make the PR green.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "leave-balance.cy.ts fails ~1 in 8 on CI, always passes locally. Retries are set to 2 so PRs merge.",
    "pass": "You treat retries as a detector, quarantine or fix the spec (session, intercept, clock, isolation), and you do not raise retries to hide it.",
    "fail": "You set retries: 5 and delete the Slack alert."
  },
  "tools": [],
  "customSummary": "- Flake = intermittent fail without code change; retries hide it unless you still track retry-pass as a smell.\n- Detect with history (Cloud analytics or CI logs), not one red run.\n- Quarantine is temporary and owned — not a parking lot.\n- Usual Cypress causes: hard waits, shared state, animations, origin/tab substitutes, CI vs local timing.\n- Playwright/Selenium retries have the same trap. Fix the test or the app.",
  "contentMarkdown": "## Definition and the retries trap\n\nIf the spec is green on the second attempt, Cypress (and GitHub's \"re-run failed jobs\") will show a green check. **The flake is still there.** Part 10.3 covers the `retries` config. This chapter is the policy: retries are a shock absorber, not a root-cause tool.\n\nCypress Cloud flake detection (paid) plots pass rate over time. Without Cloud, grep CI for \"because the test retried\" / Mocha retry output, or require a dashboard alternative (11.5).\n\n## Causes that show up in HRM suites\n\n1. **Time** — `cy.wait(2000)` instead of `cy.wait('@getLeave')` or `.should('be.visible')`.\n2. **Isolation** — `testIsolation: false` leftover leave drafts; order-dependent specs.\n3. **Data** — two jobs creating \"Ava Sharma\" unique-constraint collisions.\n4. **Animation / overlay** — click hitting a toast that is exiting.\n5. **Architecture substitutes** — SSO without a stable `cy.origin` block; PDF tab tests that sometimes race the download.\n6. **Environment** — local SSD vs CI CPU; missing `TZ`; video encoding load.\n\n## Process that actually works\n\n- **Detect:** tag metrics; a test that retried is a ticket, not a win.\n- **Quarantine:** `it.skip` or grep-plugin tag `@flake` excluded from the merge gate (10.1), with an assignee and a date.\n- **Fix:** intercept, `cy.session`, clock, unique test data, fewer visits.\n- **Re-enable:** history goes back to 100% or the test is deleted.\n\nPlaywright Trace Viewer makes flake *easier to inspect* after the fact. Cypress OSS needs video + time-travel locally + Cloud Replay if you have it (9.12). The process is the same.\n\n## Versus Playwright and Selenium\n\nAll three ecosystems invented retries because UI is timing-sensitive. None of them make retries a virtue. Selenium Grid even more so (session drops). Senior answer: \"I use retries to *surface* flake in reports, then I fix isolation or waiting. I do not ship retries as the fix.\"\n\nInterview line: \"Retries hide flake. I track retry-passes as failures of the suite's trust, quarantine with an owner, and fix waits/data/isolation.\"",
  "advantages": [
    "9.13 Flaky Test Management — Once Bizlevate's team says 'just re-run CI,' the suite has stopped being a gate."
  ],
  "limitations": [
    "9.13 Flaky Test Management is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
