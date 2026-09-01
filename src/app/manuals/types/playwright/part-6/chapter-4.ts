import type { ChapterRecord } from "../../../types";

/** 32. Performance Considerations */
export const chapter = {
  "id": "pw-6-perf",
  "title": "32. Performance Considerations",
  "minutes": 40,
  "level": "pro",
  "phase": "Part 6 · Pro-Level Practices",
  "partName": "Part 6 · Pro-Level Practices",
  "overviewText": "Performance in Playwright test automation is about reducing total suite execution time without sacrificing coverage or reliability. The biggest wins, roughly in order of impact: auth session reuse via storage_state (Chapter 20) skips repeated UI logins across the suite; API-based test data setup (Chapter 18) skips slow UI flows for state that isn't the thing being tested; parallel execution via pytest-xdist (Chapter 22) runs independent tests concurrently; and blocking unnecessary resources like images, fonts, and ad trackers (Chapter 17) removes network weight the test doesn't need. Locator choice also matters — role-based locators (get_by_role) are generally faster to resolve than deeply nested CSS selectors because Playwright's accessibility-tree lookup avoids walking a long DOM chain. Worker count tuning is empirical: more workers isn't strictly better past a certain point when memory pressure from simultaneous browser instances becomes the tighter constraint.",
  "why": "A suite that takes 60 minutes to run will not be run on every pull request — it will be run weekly, or before releases, or not at all. Slow suites create a feedback loop: developers skip running them, bugs reach production, and the team's confidence in automation erodes. Performance optimization is not premature optimization for test suites — it is the difference between a suite that protects every merge and one that protects quarterly releases. The four high-impact optimizations (session reuse, API setup, parallelization, resource blocking) can collectively reduce a 60-minute suite to under 10 minutes without removing a single test.",
  "when": "Optimize when suite execution time exceeds what your CI pipeline can tolerate on every pull request — typically 15–20 minutes. Apply optimizations in order of impact: session reuse first (biggest win, lowest effort), then API setup for test data, then parallelization, then resource blocking. Measure before and after each change — optimization without measurement is guessing. Revisit worker count tuning when CI hardware changes or when parallel tests start failing due to shared resource contention.",
  "practical": {
    "app": "Bizlevate HRMS — 120-test regression suite",
    "scenario": "The full regression suite takes 55 minutes sequentially. The team applies auth session reuse (saves 8 minutes of login time), API-based user creation (saves 5 minutes of UI setup), and pytest-xdist with 4 workers (brings total to 12 minutes).",
    "pass": "Suite runs in 12 minutes with pytest -n 4. All 120 tests pass. CI pull request feedback arrives within 15 minutes of push. Developers run the smoke subset locally before pushing because the full suite is fast enough to not be avoided.",
    "fail": "The team adds pytest -n 8 without session reuse or API setup. Tests fail due to shared login state conflicts between workers. The team reduces to -n 1, suite takes 55 minutes again, and developers stop running tests before pushing."
  },
  "advantages": [
    "Auth session reuse eliminates repeated UI logins — often the single biggest time saving",
    "API-based setup creates test data in milliseconds vs minutes of UI navigation",
    "pytest-xdist parallel execution scales suite speed roughly linearly up to the memory ceiling",
    "Resource blocking (images, fonts, ads) removes network weight with zero coverage loss for functional tests",
    "Role-based locators are faster to resolve than deeply nested CSS selectors",
    "Measured optimization produces data-backed decisions rather than guesswork"
  ],
  "limitations": [
    "Parallel execution requires test isolation — shared state between tests causes worker conflicts",
    "Session reuse fixtures add complexity — token expiry mid-run requires proactive refresh logic",
    "Resource blocking breaks visual regression tests that depend on images rendering",
    "More workers increases memory usage — browser instances are memory-heavy",
    "API setup requires backend API access — not available for all test environments",
    "Optimization effort has diminishing returns — the last 20% of speed gains cost disproportionate effort"
  ],
  "tools": [
    {
      "name": "pytest-xdist",
      "sub": "Parallel Execution",
      "url": "https://github.com/pytest-dev/pytest-xdist",
      "desc": "pytest-xdist is a pytest plugin that distributes tests across multiple CPU workers, running them concurrently. pytest -n 4 runs tests across 4 parallel workers. Each worker is a separate Python process with its own browser instance. Tests must be isolated — no shared state, no test interdependencies — for parallel execution to work correctly. Worker count should be tuned empirically on actual CI hardware rather than assumed to match CPU core count.",
      "adv": [
        "Near-linear speed improvement up to the memory/CPU ceiling",
        "Simple CLI flag — pytest -n 4 requires no code changes",
        "Works with all pytest markers and fixtures",
        "Each worker is fully isolated — no shared browser state between tests"
      ],
      "lim": [
        "Requires test isolation — interdependent tests fail under parallel execution",
        "Memory usage scales with worker count — each worker runs a full browser instance",
        "Shared external resources (rate-limited APIs, shared databases) impose real ceilings",
        "Debugging parallel failures is harder — which worker ran which test requires -v output"
      ],
      "steps": [
        {
          "t": "Step 1 — Install pytest-xdist",
          "p": "Add to requirements.txt:",
          "c": "pip install pytest-xdist"
        },
        {
          "t": "Step 2 — Run with parallel workers",
          "p": "Start with worker count matching CPU cores, then tune:",
          "c": "pytest -n 4     # 4 workers\npytest -n auto  # auto-detect CPU count"
        },
        {
          "t": "Step 3 — Measure and tune on CI hardware",
          "p": "Compare total suite time at different worker counts:",
          "c": "pytest -n 2  # e.g. 28 min\npytest -n 4  # e.g. 15 min\npytest -n 8  # e.g. 14 min — diminishing returns, more memory"
        },
        {
          "t": "Step 4 — Add to CI workflow",
          "p": "Use the tuned worker count in GitHub Actions:",
          "c": "- name: Run tests\n  run: pytest -n 4 --browser chromium"
        }
      ]
    },
    {
      "name": "Playwright storage_state",
      "sub": "Auth Session Reuse",
      "url": "https://playwright.dev/python/docs/auth",
      "desc": "Playwright's storage_state feature saves browser cookies and local storage after a login action to a JSON file, then loads that state into subsequent browser contexts — skipping the login UI flow entirely. A session-scoped pytest fixture performs login once per test run, saves the state, and injects it into every test's browser context. This eliminates repeated login UI flows across the suite, often saving 5–10 seconds per test multiplied by hundreds of tests.",
      "adv": [
        "Login happens once per run, not once per test — largest single time saving available",
        "storage_state JSON is reusable across test runs until tokens expire",
        "Session-scoped fixture integrates cleanly with pytest's fixture system",
        "Works with any authentication mechanism that uses cookies or local storage"
      ],
      "lim": [
        "Token expiry mid-run requires proactive refresh logic in the fixture",
        "Saved state files must not be committed to git if they contain session tokens",
        "Role-based tests (different user permissions) need separate storage_state files per role",
        "Does not work for auth mechanisms that require per-request token generation"
      ],
      "steps": [
        {
          "t": "Step 1 — Create a session-scoped auth fixture",
          "p": "Login once and save state:",
          "c": "@pytest.fixture(scope=\"session\")\ndef auth_state(browser):\n    context = browser.new_context()\n    page = context.new_page()\n    page.goto(\"/login\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"password123\")\n    page.get_by_role(\"button\", name=\"Sign in\").click()\n    context.storage_state(path=\"auth_state.json\")\n    context.close()\n    return \"auth_state.json\""
        },
        {
          "t": "Step 2 — Inject saved state into each test",
          "p": "Load auth_state in a function-scoped fixture:",
          "c": "@pytest.fixture\ndef authenticated_page(browser, auth_state):\n    context = browser.new_context(storage_state=auth_state)\n    page = context.new_page()\n    yield page\n    context.close()"
        }
      ]
    }
  ],
  "contentMarkdown": "Reducing test execution time The biggest wins, roughly in order of impact: 1. Auth session reuse (storage_state, Chapter 20) — skip repeated UI logins across the suite.\n\n## Reducing test execution time\n\nThe biggest wins, roughly in order of impact:\n\n1. Auth session reuse (storage_state, Chapter 20) — skip repeated UI logins\n across the suite.\n\n## 2. API-based test data setup (Chapter 18) — skip slow UI flows for state that\n\nisn't the thing being tested.\n 3. Parallel execution (pytest-xdist, Chapter 22) — run independent tests\n concurrently.\n 4. Blocking unnecessary resources (images/fonts/ads, Chapter 17) — skip\n network weight the test doesn't need.\n\n## Optimizing locators and waits\n\n# Slower — CSS selector requiring more DOM traversal, less resilient\n\n# Faster and clearer — role-based, resilient\n\nPointers: Role-based locators aren't just more resilient (Chapter 5) — they're also generally faster to resolve than deeply nested CSS selectors, since Playwright's accessibility-tree lookup avoids walking a long DOM chain. Avoid unnecessary explicit waits stacked on top of already-auto-waiting actions (Chapter 8) — redundant waits (wait_for_timeout() \"just in case\" before a click that already auto-waits) add pure dead time across a whole suite for zero benefit.\n\n```\npage.locator(\"div.container > ul.list > li:nth-child(3) > button\").click()\n\npage.get_by_role(\"button\", name=\"Delete\").nth(2).click()\n```\n\n## Worker/parallelization tuning\n\nPointers: More workers isn't strictly better past a certain point — CPU core count, memory available for multiple simultaneous browser instances, and any shared external resource (a rate-limited test API, a shared staging database) all impose real ceilings. The right worker count is something to measure on your actual CI hardware (try a few values, compare total suite time) rather than guess — a common mistake is assuming worker count should always match CPU core count exactly, when memory pressure from many simultaneous browser instances is often the tighter constraint in practice.\n\n```\npytest -n 4     # 4 workers\n\npytest -n 8     # 8 workers — not necessarily 2x faster\n```\n\n## Part 7: Real-World Project & Job\n\n(Explanations + Function Reference)",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
