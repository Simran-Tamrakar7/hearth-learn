import type { ChapterRecord } from "../../types";

/** Regression Testing */
export const chapter = {
  "id": "tt-regression-testing",
  "overlayNo": 10,
  "title": "Regression Testing",
  "minutes": 30,
  "level": "intermediate",
  "phase": "Part 3 · Functional",
  "partName": "Part 3 · Functional",
  "overviewText": "Regression testing re-runs previously passing tests after a code change to confirm that nothing that used to work has quietly broken — the opposite direction from sanity testing: instead of narrowly checking the new change, it broadly re-checks everything that was already known to be correct.",
  "why": "Software is interconnected — a change meant to fix one thing can silently break something completely unrelated through a shared dependency, a reused component, or an overlooked side effect. Without regression testing, those breakages aren't discovered until a user (or worse, a customer in production) stumbles into them. A strong regression suite is what lets a team ship frequently without fear.",
  "when": "Before every release, after every significant merge to the main branch, and ideally on every pull request via CI/CD. The regression suite grows over time as new features are added — each new feature's tests become part of the suite that protects everything built after it.",
  "practical": {
    "app": "HRMS Regression Before a Release",
    "scenario": "Ahead of a monthly release, the full 120-test regression suite runs against the release candidate. A recent refactor of the date-formatting utility, done to fix a display bug on the payroll page, subtly changes how dates are parsed on the leave request form.",
    "pass": "All 120 tests green — release proceeds.",
    "fail": "4 leave-request tests fail with date-parsing errors, tracing back to the shared utility — a regression that had nothing to do with what the refactor was meant to touch, caught before it reached users."
  },
  "advantages": [
    "Catches breakage in old, unrelated functionality that no one thought to manually re-check",
    "Enables frequent releases with confidence instead of dread",
    "Suite grows automatically in value over time as more features are covered",
    "Runs unattended in CI, giving continuous protection with no ongoing manual effort"
  ],
  "limitations": [
    "Suite maintenance is a real, ongoing cost — tests need updates as the app legitimately changes",
    "Large suites can become slow without parallelization, becoming a release bottleneck",
    "Flaky tests erode trust fast — once a team starts ignoring 'failures,' the suite stops protecting anything",
    "Doesn't replace exploratory or new-feature testing — it only re-checks what's already scripted"
  ],
  "tools": [
    {
      "name": "Selenium",
      "sub": "Grid Parallelized Suites",
      "url": "https://selenium.dev",
      "seeChapter": 6,
      "desc": "A common home for legacy regression suites (see Chapter 6); its maturity and Grid-based parallelization make large, long-running regression suites practical to execute quickly across many browsers.",
      "adv": [
        "Broadest browser and language support of any automation tool",
        "Selenium Grid parallelizes large regression suites across machines",
        "Deepest CI/CD and test-management tool integration in the industry",
        "Best fit for teams with existing Java/C#/Python Selenium investment"
      ],
      "lim": [
        "No auto-waiting — flaky without disciplined explicit waits",
        "More verbose to write and maintain than Playwright or Cypress",
        "Slower feedback loop during local development than Cypress's live reload",
        "Debugging failures takes more manual digging without a built-in trace tool"
      ],
      "steps": [
        {
          "t": "Step 1 — Organize test suites into regression groups",
          "p": "Tag tests with pytest markers: @pytest.mark.regression, @pytest.mark.core_auth, @pytest.mark.payroll.",
          "c": "@pytest.mark.regression\n@pytest.mark.leaves\ndef test_leave_approval_workflow(driver):\n    # Full 4-step approval flow\n    pass"
        },
        {
          "t": "Step 2 — Distribute execution across Selenium Grid",
          "p": "Run tests in parallel across multiple browser nodes.",
          "c": "pytest -m regression -n 8 --dist loadscope --html=reports/full-regression.html"
        },
        {
          "t": "Step 3 — Investigate failures individually",
          "p": "Every regression failure is a critical signal that previously working code broke.",
          "c": "FAILURES: test_leave_request_dates -> AttributeError in dateFormatter.ts line 42"
        }
      ]
    },
    {
      "name": "Playwright",
      "sub": "Flake-Free CI Suite",
      "url": "https://playwright.dev",
      "seeChapter": 6,
      "desc": "Its auto-waiting and Trace Viewer (see Chapter 6) make it well suited for regression suites specifically because flaky regression failures (false positives) are one of the most damaging things a team can have — a suite nobody trusts stops getting acted on.",
      "adv": [
        "Auto-waiting removes most flaky, timing-based failures",
        "One API for Chromium, Firefox, and WebKit",
        "Trace Viewer gives a step-by-step replay of any failed run",
        "Network interception mocks specific states without needing real backend data"
      ],
      "lim": [
        "Smaller legacy tooling footprint than Selenium",
        "A real learning curve for teams migrating existing Selenium suites",
        "Modern-language-first — weaker fit for older tech stacks",
        "Traces add storage overhead on large CI runs"
      ],
      "steps": [
        {
          "t": "Step 1 — Add newly shipped features to regression directory",
          "p": "Keep tests organized by domain: tests/regression/auth/, tests/regression/payroll/.",
          "c": "tests/\n├── regression/\n│   ├── test_auth.py\n│   ├── test_employees.py\n│   ├── test_leaves.py\n│   └── test_payroll.py"
        },
        {
          "t": "Step 2 — Run regression with parallel workers",
          "p": "Execute 120 tests across 4 worker processes in under 3 minutes.",
          "c": "pytest tests/regression/ --numprocesses 4 --tracing=retain-on-failure"
        },
        {
          "t": "Step 3 — Inspect Trace Viewer on regression failure",
          "p": "Replay exact network requests and DOM states leading to regression failure.",
          "c": "playwright show-trace test-results/test_leaves-failed/trace.zip"
        }
      ]
    },
    {
      "name": "BugBug",
      "sub": "No-Code Regression Suite",
      "url": "https://bugbug.io",
      "seeChapter": 7,
      "desc": "Since regression suites accumulate dozens or hundreds of recorded scenarios over time (see Chapter 7), BugBug's no-code recording lets non-developer QA staff keep contributing new regression cases without bottlenecking on engineering time to write them.",
      "adv": [
        "No coding required — QA testers without dev skills can create real automated tests",
        "Recording is fast — a working test exists minutes after the manual walkthrough",
        "Visual editing makes maintaining tests approachable for non-engineers",
        "Built-in cloud scheduling and reporting without separate CI setup"
      ],
      "lim": [
        "Less flexible than code-based tools for complex logic or conditional flows",
        "Free tier has limits on test runs and team size",
        "Recorded selectors can be brittle if the UI changes structurally",
        "Less control over test architecture than a hand-written Playwright/Cypress suite"
      ],
      "steps": [
        {
          "t": "Step 1 — Accumulate recorded test cases",
          "p": "Every completed sprint ticket gets a corresponding recorded scenario added to BugBug.",
          "c": "Suite: \"Main Release Regression Suite\" (74 recorded flows)"
        },
        {
          "t": "Step 2 — Schedule nightly regression runs",
          "p": "Configure cloud runner to execute the full suite every night at 2:00 AM.",
          "c": "Schedule: Daily @ 02:00 UTC -> Notify Slack #qa-alerts on failure"
        },
        {
          "t": "Step 3 — Prune outdated tests during redesigns",
          "p": "Update recorded steps visually when UI workflows change intentionally.",
          "c": "Action: Re-record Step 3 (New multi-step leave modal) -> Save suite version"
        }
      ]
    }
  ],
  "contentMarkdown": "## Automated Regression Suite Maintenance\n\nConstruct resilient regression pipelines triggered on pull requests and release tags.\n\n```\npytest tests/regression/ -n auto\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
