import type { ChapterRecord } from "../../../types";

/** 24. Debugging Tools */
export const chapter = {
  "id": "pw-4-debug",
  "title": "24. Debugging Tools",
  "minutes": 45,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "Playwright provides three complementary debugging tools for when tests fail or during initial test authoring. Playwright Inspector (PWDEBUG=1 pytest test_login.py) opens a GUI that pauses execution, lets you step through actions one at a time, inspect page state, and generate locator code by pointing at elements. Trace Viewer records a full timeline — DOM snapshots, network activity, console logs, and screenshots at each step — saved to a .zip file viewable with playwright show-trace trace.zip; essential for diagnosing CI failures you cannot watch live. Codegen (playwright codegen URL) opens a browser and records manual clicks as generated Playwright code in real time — useful for drafting locators but output needs cleanup to fit POM structure.",
  "why": "A test that fails in CI with 'Timeout waiting for locator' gives zero context about what the page looked like at failure time. Trace Viewer replays the exact sequence — hover over any step to see the DOM as it was, inspect network requests, read console errors. Without tracing, debugging CI failures means adding print statements and re-pushing, a slow loop. Inspector accelerates initial test writing by letting you click elements and copy the locator Playwright would generate.",
  "when": "Use PWDEBUG=1 Inspector while writing new tests or diagnosing exactly where an existing test breaks. Enable tracing on CI with save-on-failure to capture artifacts only when needed — full tracing on every test produces massive storage costs. Use codegen to draft locators for unfamiliar pages, then refactor output into page objects before committing. Open trace files locally with playwright show-trace after any CI failure.",
  "practical": {
    "app": "HRMS — Flaky login test in CI",
    "scenario": "test_login_works passes locally but fails in CI with a timeout on the welcome message. Without tracing, the developer adds time.sleep(5) and re-pushes three times. With trace-on-failure enabled, the CI artifact shows the login succeeded but a loading spinner overlay blocked the welcome text for 8 seconds — the fix is waiting for the spinner to detach, not adding arbitrary sleeps.",
    "pass": "playwright show-trace ci-failure-trace.zip reveals spinner overlay at failure point; fix uses expect(spinner).to_be_hidden() before asserting welcome text.",
    "fail": "Developer adds time.sleep(10) as a blind fix; test passes sometimes, fails when CI is slower."
  },
  "advantages": [
    "Inspector provides live step-through debugging with locator generation",
    "Trace Viewer replays CI failures with DOM snapshots at every step",
    "Codegen accelerates locator discovery on unfamiliar pages",
    "Trace-on-failure pattern captures artifacts only when needed — controlled storage cost",
    "All three tools are built into Playwright — no external debugging setup"
  ],
  "limitations": [
    "Inspector requires headed mode — cannot use on headless CI runners directly",
    "Full tracing on every test produces large artifacts — use conditional save-on-failure",
    "Codegen output is procedural, not POM-structured — needs manual refactoring",
    "Trace files require local playwright show-trace to view — not web-based",
    "Inspector pauses block CI — local debugging tool only"
  ],
  "tools": [
    {
      "name": "Playwright Inspector",
      "sub": "Interactive debugger",
      "url": "https://playwright.dev/python/docs/debug",
      "desc": "Playwright Inspector is a GUI debugging tool activated by setting PWDEBUG=1 before running tests. It pauses test execution at each action, displays the current page state, and allows stepping forward one action at a time. You can hover over elements in the page to see the locator Playwright would generate, then copy it directly into your test. Invaluable for writing new tests and pinpointing exactly where existing tests break.",
      "adv": [
        "Step-through execution shows exactly what happens at each action",
        "Point-and-click locator generation from live page elements",
        "Inspect page state, network, and console at any pause point",
        "Zero setup — just set PWDEBUG=1 environment variable"
      ],
      "lim": [
        "Requires headed (visible) browser — not usable in headless CI",
        "Manual stepping is slow for long test flows",
        "One test at a time — cannot inspect parallel workers simultaneously",
        "Must be run locally — CI failures need Trace Viewer instead"
      ],
      "steps": [
        {
          "t": "Step 1 — Launch Inspector on a test",
          "p": "Set PWDEBUG=1 and run a single test:",
          "c": "PWDEBUG=1 pytest test_login.py::test_login_works -s"
        },
        {
          "t": "Step 2 — Step through and pick locators",
          "p": "Use the Inspector GUI to advance actions and copy locators:",
          "c": "# Inspector opens automatically\n# Click 'Step over' to advance one action\n# Hover over page elements to see generated locator code\n# Copy locator into your test or page object"
        }
      ]
    },
    {
      "name": "Trace Viewer",
      "sub": "CI failure replay",
      "url": "https://playwright.dev/python/docs/trace-viewer",
      "desc": "Trace Viewer records a complete timeline of a test session including DOM snapshots at each step, network requests, console logs, and screenshots. Start recording with context.tracing.start(), stop with context.tracing.stop(path='trace.zip'), and view with playwright show-trace trace.zip. The recommended pattern is save-on-failure: only capture traces when a test fails, avoiding massive artifact storage. In CI, configure pytest hooks or fixtures to start tracing before each test and stop conditionally on failure.",
      "adv": [
        "Replays exact test execution with DOM state at every step",
        "Network and console logs included — see API failures and JS errors",
        "Works for CI failures — download artifact and replay locally",
        "Save-on-failure pattern keeps storage costs manageable"
      ],
      "lim": [
        "Trace files can be 5–50MB per test — storage adds up without save-on-failure",
        "Requires playwright show-trace locally to view — not browser-based",
        "Full tracing adds overhead to test execution time",
        "Must be configured in fixtures or hooks — not automatic"
      ],
      "steps": [
        {
          "t": "Step 1 — Record a trace manually",
          "p": "Start and stop tracing around test steps:",
          "c": "context = browser.new_context()\ncontext.tracing.start(screenshots=True, snapshots=True, sources=True)\npage = context.new_page()\n\npage.goto(\"https://app.example.com/login\")\npage.get_by_label(\"Username\").fill(\"testuser\")\npage.get_by_role(\"button\", name=\"Log in\").click()\n\ncontext.tracing.stop(path=\"trace.zip\")\ncontext.close()"
        },
        {
          "t": "Step 2 — View the trace",
          "p": "Open the trace file in Trace Viewer:",
          "c": "playwright show-trace trace.zip"
        },
        {
          "t": "Step 3 — Save-on-failure fixture",
          "p": "In conftest.py, capture traces only when tests fail:",
          "c": "import pytest\n\n@pytest.fixture(autouse=True)\ndef capture_trace_on_failure(context, request):\n    context.tracing.start(screenshots=True, snapshots=True)\n    yield\n    if request.node.rep_call.failed:\n        trace_path = f\"traces/{request.node.name}.zip\"\n        context.tracing.stop(path=trace_path)\n    else:\n        context.tracing.stop()"
        }
      ]
    },
    {
      "name": "Codegen",
      "sub": "Locator recorder",
      "url": "https://playwright.dev/python/docs/codegen",
      "desc": "Codegen opens a browser and records your manual interactions as generated Playwright Python code in real time. Run playwright codegen https://app.example.com to start. Every click, fill, and navigation produces the corresponding Playwright API call in a side panel. Useful for quickly discovering locators on unfamiliar pages, especially complex forms or dynamic components. Output is procedural and needs refactoring into page objects before committing to the suite.",
      "adv": [
        "Instant locator discovery by clicking elements on the live page",
        "Generates working Playwright code — not pseudocode",
        "Supports Python output directly",
        "Fast way to draft a test skeleton for a new page"
      ],
      "lim": [
        "Output is procedural — not POM-structured, needs cleanup",
        "Generates CSS/XPath locators when role-based ones would be better",
        "No assertions generated — only actions",
        "Recorded flows may include unnecessary waits or redundant steps"
      ],
      "steps": [
        {
          "t": "Step 1 — Launch codegen for a page",
          "p": "Open the recorder against your application:",
          "c": "playwright codegen https://app.example.com/login"
        },
        {
          "t": "Step 2 — Interact and copy generated code",
          "p": "Click, fill, and navigate — copy output into your test:",
          "c": "# Codegen generates code like:\npage.goto(\"https://app.example.com/login\")\npage.get_by_label(\"Username\").fill(\"testuser\")\npage.get_by_label(\"Password\").fill(\"testpass\")\npage.get_by_role(\"button\", name=\"Log in\").click()\n\n# Refactor into page object before committing"
        }
      ]
    }
  ],
  "contentMarkdown": "## Debugging Failing Tests\n\nPlaywright failures often leave you staring at a timeout message with no visual context. The debugging toolkit — **PWDEBUG**, the **Trace Viewer**, and **Codegen** — turns opaque timeouts into actionable screenshots, network logs, and recorded traces.\n\n## PWDEBUG — Interactive Debugger\n\nSet the environment variable to pause execution and open the Playwright Inspector:\n\n```bash\nPWDEBUG=1 pytest tests/e2e/test_login.py::test_valid_login -s\n```\n\nThe Inspector shows:\n\n- The current page state with a live screenshot.\n- Every locator query and its match count.\n- Step-by-step execution controls (step over, resume, explore).\n\nUse PWDEBUG when a locator matches zero or too many elements and you need to experiment interactively.\n\n## Playwright Inspector (headed + slowmo)\n\nAn alternative to PWDEBUG for quick local debugging:\n\n```bash\npytest --headed --slowmo 1000 tests/e2e/test_login.py -s\n```\n\n`--headed` opens a visible browser window. `--slowmo 1000` adds a one-second pause between actions so you can watch what happens. The `-s` flag shows `print()` output in the terminal.\n\n## Trace Viewer — Post-Mortem Analysis\n\nTraces record every action, network request, console message, and DOM snapshot. Enable tracing in config or CLI:\n\n```ini\n# pytest.ini\n[pytest]\naddopts = --tracing retain-on-failure\n```\n\n```bash\npytest --tracing on                    # trace every test\npytest --tracing retain-on-failure     # trace only failures (recommended)\n```\n\nAfter a failure, open the trace:\n\n```bash\nplaywright show-trace test-results/tests-e2e-test-login-chromium/trace.zip\n```\n\nThe Trace Viewer timeline shows:\n\n- **Actions** — clicks, fills, navigations with before/after DOM snapshots.\n- **Network** — every request and response with headers and body.\n- **Console** — JavaScript errors and `console.log` output.\n- **Source** — test source code with the failing line highlighted.\n\nTraces are the single most useful artifact for debugging CI failures you cannot reproduce locally.\n\n## Screenshots and Video on Failure\n\n```bash\npytest --screenshot only-on-failure --video retain-on-failure\n```\n\nArtifacts land in `test-results/`. Attach them to CI job output for quick visual inspection without downloading traces.\n\n## Codegen — Record Tests Interactively\n\nCodegen opens a browser and records your actions as Playwright code:\n\n```bash\nplaywright codegen https://staging.example.com/login\n```\n\nClick through the flow; codegen writes locators and actions in real time. Copy the generated code into a test file, then refactor into page objects.\n\nCodegen is excellent for:\n\n- Discovering the correct locator for a tricky element.\n- Bootstrapping a new test quickly.\n- Exploring an unfamiliar application.\n\nIt is not a substitute for structured tests — recorded scripts need cleanup, assertions, and fixture integration.\n\n## page.pause() — Inline Breakpoint\n\nAdd a programmatic pause anywhere in a test:\n\n```python\ndef test_checkout_flow(page):\n    page.goto(\"/cart\")\n    page.get_by_role(\"button\", name=\"Checkout\").click()\n    page.pause()  # opens Inspector; remove before committing\n    expect(page.get_by_text(\"Order confirmed\")).to_be_visible()\n```\n\n`page.pause()` works with `PWDEBUG=1` or `--headed`. Remove it before pushing — it will hang headless CI.\n\n## Console and Network Logging\n\nCapture browser console output in tests:\n\n```python\ndef test_no_console_errors(page):\n    errors = []\n    page.on(\"console\", lambda msg: errors.append(msg.text) if msg.type == \"error\" else None)\n    page.goto(\"/dashboard\")\n    assert errors == [], f\"Console errors: {errors}\"\n```\n\n## Debugging Checklist\n\n1. **Re-run locally with `--headed --slowmo 500`** — watch the failure happen.\n2. **Check the trace** — `playwright show-trace <path>`.\n3. **Use PWDEBUG** for locator experimentation.\n4. **Use codegen** to find the right selector for a new element.\n5. **Check screenshots** in `test-results/` for visual state at failure time.\n\n## Key Takeaways\n\n- `PWDEBUG=1` opens the interactive Inspector for step-by-step debugging.\n- `--tracing retain-on-failure` records traces you open with `playwright show-trace`.\n- `playwright codegen` bootstraps tests by recording browser actions.\n- Remove `page.pause()` before committing — it hangs CI.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
