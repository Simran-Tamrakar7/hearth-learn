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
  "contentMarkdown": "Playwright Inspector PWDEBUG=1 pytest test_login.py What it does: Opens a GUI tool that pauses test execution and lets you step through actions one at a time, inspect the current page state, and even generate locator code by pointing at elements live. Pointers: Invaluable while first writing a new test or diagnosing exactly where an existing one breaks — far faster than repeatedly adding print sta\n\n## PWDEBUG=1 pytest test_login.py\n\nWhat it does: Opens a GUI tool that pauses test execution and lets you step through actions one at a time, inspect the current page state, and even generate locator code by pointing at elements live.\n\nPointers: Invaluable while first writing a new test or diagnosing exactly where an existing one breaks — far faster than repeatedly adding print statements and re-running.\n\n## Trace Viewer\n\nsources=...)\n\nWhat it does: Begins recording a full timeline of the test session — DOM snapshots, network activity, console logs, and optionally screenshots at each step.\n\nTypes/params:\n\nWhat it does: Stops recording and saves the trace to a .zip file.\n\nTypes/params:\n\nPointers: Essential once tests run in CI where you can't watch them live — a failed CI run's trace file, opened locally with playwright show-trace, lets you replay exactly what happened step by step, including hovering over any point in time to see the DOM as it was at that instant. A common pattern is only saving traces on failure (context.tracing.stop() conditionally, or via a pytest hook) to avoid massive artifact storage costs across an entire suite.\n\nCodegen\n\nWhat it does: Opens a browser and records your manual clicks/typing as generated Playwright code in real time, in your language/framework of choice.\n\nPointers: Genuinely useful for quickly drafting locators for a new page, especially when you're unsure exactly what selector Playwright would generate for a tricky element — but the generated code usually needs cleanup afterward to fit your POM structure (Chapter 14) rather than being committed as-is; codegen optimizes for \"works right now,\" not for long-term maintainability.\n\n```\ncontext.tracing.start(screenshots=True, snapshots=True, sources=True)\n\n# ... test steps ...\ncontext.tracing.stop(path=\"trace.zip\")\n\nplaywright show-trace trace.zip\n\ncontext.tracing.start(screenshots=..., snapshots=...,\n\nplaywright codegen https://app.example.com\n\ncontext.tracing.stop(path=...)\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
