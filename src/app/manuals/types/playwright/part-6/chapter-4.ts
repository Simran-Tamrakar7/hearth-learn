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
  "contentMarkdown": "## Auth reuse — the biggest performance win\n\nLogging in through the UI before every test is the most common source of wasted suite runtime. Authenticate once, save state, reuse across tests.\n\n```python\n# conftest.py\nimport pytest\nfrom pathlib import Path\n\nAUTH_STATE = Path(\"test_data/.auth/user.json\")\n\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args):\n    if AUTH_STATE.exists():\n        return {**browser_context_args, \"storage_state\": str(AUTH_STATE)}\n    return browser_context_args\n\n@pytest.fixture(scope=\"session\", autouse=True)\ndef save_auth_state(browser):\n    if not AUTH_STATE.exists():\n        AUTH_STATE.parent.mkdir(parents=True, exist_ok=True)\n        context = browser.new_context()\n        page = context.new_page()\n        page.goto(\"/login\")\n        page.get_by_label(\"Email\").fill(\"testuser@example.com\")\n        page.get_by_label(\"Password\").fill(\"TestPass123!\")\n        page.get_by_role(\"button\", name=\"Sign in\").click()\n        page.wait_for_url(\"**/dashboard\")\n        context.storage_state(path=str(AUTH_STATE))\n        context.close()\n```\n\n```python\n# Faster — authenticate via API, skip UI entirely\n@pytest.fixture(scope=\"session\", autouse=True)\ndef save_auth_state(api_client):\n    if not AUTH_STATE.exists():\n        token = api_client.login(\"testuser@example.com\", \"TestPass123!\")\n        # Write storage state manually or use browser context once\n        ...\n```\n\nA 47-test suite that logs in via UI each time adds ~15 seconds per test. Auth reuse cuts that to near zero.\n\n## API setup instead of UI navigation\n\nCreate test preconditions via API calls, then use the UI only for what you are actually testing.\n\n```python\ndef test_admin_approves_leave_request(page, api_client, leave_page):\n    # Setup via API — milliseconds\n    leave = api_client.create_leave_request(\n        employee_id=42, leave_type=\"Annual\", status=\"pending\"\n    )\n\n    # Test the UI flow — seconds, but only the part under test\n    leave_page.open_pending_queue()\n    leave_page.approve_request(leave[\"employeeName\"])\n    leave_page.assert_request_status(leave[\"id\"], \"Approved\")\n```\n\nRule of thumb: if the test name does not contain \"login\" or \"register\", do not walk through login in that test.\n\n## Parallel execution tuning\n\npytest-xdist runs tests across multiple workers. Playwright tests are I/O-bound, so parallelization yields near-linear speedup until you hit shared resource limits.\n\n```bash\npip install pytest-xdist\n```\n\n```bash\n# Auto-detect CPU cores\npytest -n auto\n\n# Fixed worker count\npytest -n 4\n\n# Distribute by file — keeps module tests together\npytest -n 4 --dist loadfile\n```\n\n```python\n# conftest.py — isolate browser per worker\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args):\n    import os\n    worker_id = os.environ.get(\"PYTEST_XDIST_WORKER\", \"gw0\")\n    return {\n        **browser_context_args,\n        \"storage_state\": f\"test_data/.auth/{worker_id}.json\",\n    }\n```\n\nParallel pitfalls: shared test data (two workers creating the same email), shared auth state files (use per-worker paths), and database connection limits (cap workers or use isolated schemas).\n\n## Locator optimization\n\nSlow locators slow every interaction. Prefer Playwright's built-in locators in this order:\n\n1. `get_by_role()` — fastest, most resilient\n2. `get_by_label()` / `get_by_placeholder()`\n3. `get_by_test_id()`\n4. `get_by_text()` — use with exact match when possible\n5. CSS/XPath — last resort\n\n```python\n# Slow — scans entire DOM with CSS\npage.locator(\"div.container > ul.list > li:nth-child(3) > a\").click()\n\n# Fast — uses accessibility tree\npage.get_by_role(\"link\", name=\"Leave Requests\").click()\n```\n\n```python\n# Chain locators to narrow scope\ntable = page.get_by_role(\"table\", name=\"Pending Requests\")\ntable.get_by_role(\"row\", name=\"Jane Doe\").get_by_role(\"button\", name=\"Approve\").click()\n```\n\nAvoid `page.locator(\"text=Approve\")` on pages with multiple \"Approve\" buttons — scope to a row or section first.\n\n## Browser and context reuse\n\n```python\n# Session-scoped browser — one browser launch for entire run\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args):\n    return {**browser_context_args, \"viewport\": {\"width\": 1280, \"height\": 720}}\n\n# Function-scoped context — fresh cookies per test (default, safest)\n# Session-scoped context — faster but risks state leakage between tests\n```\n\nDefault to function-scoped contexts. Move to session-scoped only for read-only smoke tests where isolation is not required.\n\n## Measuring and setting budgets\n\n```bash\n# Show slowest tests\npytest --durations=10\n\n# Fail if suite exceeds time budget (pytest-timeout)\npip install pytest-timeout\npytest --timeout=120\n```\n\nSet CI time budgets per marker: smoke < 5 minutes, regression < 45 minutes. If a marker exceeds its budget, investigate auth reuse, API setup, and parallel worker count before adding more hardware.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
