import type { ChapterRecord } from "../../../types";

/** 20. Authentication & Session Reuse */
export const chapter = {
  "id": "pw-4-auth",
  "title": "20. Authentication & Session Reuse",
  "minutes": 45,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "storage_state saves a BrowserContext's cookies and localStorage to a JSON file (context.storage_state(path='auth_state.json')) and reloads them into a new context (browser.new_context(storage_state='auth_state.json')), skipping the UI login flow entirely. This is the primary speed optimization for authenticated test suites — log in once, reuse the session across hundreds of tests. A session-scoped auth_state fixture performs login once per test run; a function-scoped authenticated_page fixture creates a fresh context pre-loaded with saved state per test, combining speed with isolation. storage_state captures cookies and localStorage only — not sessionStorage or IndexedDB, so apps relying on those need alternative approaches.",
  "why": "A 15-second UI login repeated before every test in a 200-test suite adds 50 minutes of pure login time. storage_state reduces that to one login per run plus milliseconds per test to load saved cookies. Without session reuse, teams either accept slow suites or dangerously share a single logged-in context across tests (causing cross-test interference). The session-scoped auth_state + function-scoped authenticated_page pattern delivers both speed and per-test isolation simultaneously.",
  "when": "Implement storage_state as soon as more than five tests require authentication. Use session-scoped fixture for the login-and-save step; function-scoped fixture for the context that loads saved state. Regenerate auth_state.json when credentials or auth flow changes. Do not commit auth_state.json with production credentials — generate it in CI setup or local fixture.",
  "practical": {
    "app": "HRMS — Authenticated dashboard tests",
    "scenario": "120 dashboard and module tests each repeat a 12-second login. With storage_state, a session-scoped auth_state fixture logs in once (12 seconds total), and each test gets a fresh authenticated_page context in 200ms. Suite time drops from 24 minutes of login overhead to 12 seconds.",
    "pass": "authenticated_page fixture loads storage_state='auth_state.json'; test navigates directly to /dashboard without login steps — already authenticated.",
    "fail": "Every test inlines page.goto('/login') and credential fill; 120 tests × 12 seconds = 24 minutes of redundant login."
  },
  "advantages": [
    "Eliminates repeated UI login — one login per test run instead of per test",
    "Function-scoped context with saved state gives per-test isolation with session speed",
    "Works with any auth mechanism stored in cookies or localStorage",
    "auth_state.json is portable — generate once, reuse across local and CI runs",
    "Combines naturally with pytest fixture scopes from Chapter 12"
  ],
  "limitations": [
    "Only captures cookies and localStorage — not sessionStorage or IndexedDB",
    "Saved state expires when server-side sessions time out — must regenerate periodically",
    "Token refresh flows may invalidate saved state mid-run",
    "Does not help tests that need different user roles — each role needs its own state file",
    "Auth flow changes (new MFA step) require regenerating the saved state"
  ],
  "tools": [
    {
      "name": "storage_state",
      "sub": "Session persistence",
      "url": "https://playwright.dev/python/docs/auth",
      "desc": "storage_state is a Playwright BrowserContext method that serializes cookies and localStorage to a JSON file or returns them as a dict. Loading saved state into a new context via browser.new_context(storage_state=path) pre-authenticates that context without any UI interaction. The standard pytest pattern pairs a session-scoped fixture (login once, save state) with a function-scoped fixture (fresh context per test loaded from saved state).",
      "adv": [
        "Dramatic suite speed improvement for authenticated test suites",
        "Per-test isolation maintained via fresh context with shared auth cookies",
        "JSON format is human-readable and debuggable",
        "Official Playwright auth pattern — well-documented and supported"
      ],
      "lim": [
        "Cookies and localStorage only — sessionStorage-based auth not captured",
        "Server-side session expiry can invalidate saved state during long runs",
        "Each user role needs a separate saved state file",
        "Must regenerate when login flow or credentials change"
      ],
      "steps": [
        {
          "t": "Step 1 — Log in once and save state",
          "p": "Perform UI login and persist the session:",
          "c": "context = browser.new_context()\npage = context.new_page()\npage.goto(\"https://app.example.com/login\")\npage.get_by_label(\"Username\").fill(\"testuser\")\npage.get_by_label(\"Password\").fill(\"testpass\")\npage.get_by_role(\"button\", name=\"Log in\").click()\ncontext.storage_state(path=\"auth_state.json\")\ncontext.close()"
        },
        {
          "t": "Step 2 — Reuse saved state in a new context",
          "p": "Skip login — context starts authenticated:",
          "c": "context = browser.new_context(storage_state=\"auth_state.json\")\npage = context.new_page()\npage.goto(\"https://app.example.com/dashboard\")\n# Already logged in — no login steps needed"
        },
        {
          "t": "Step 3 — Session + function scoped pytest fixtures",
          "p": "In conftest.py — login once, fresh context per test:",
          "c": "import pytest\n\n@pytest.fixture(scope=\"session\")\ndef auth_state(browser):\n    context = browser.new_context()\n    page = context.new_page()\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"testpass\")\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    state_path = \"auth_state.json\"\n    context.storage_state(path=state_path)\n    context.close()\n    return state_path\n\n@pytest.fixture\ndef authenticated_page(browser, auth_state):\n    context = browser.new_context(storage_state=auth_state)\n    page = context.new_page()\n    yield page\n    context.close()"
        },
        {
          "t": "Step 4 — Write tests with authenticated_page",
          "p": "Tests skip login entirely:",
          "c": "def test_dashboard_loads(authenticated_page):\n    authenticated_page.goto(\"https://app.example.com/dashboard\")\n    expect(authenticated_page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()"
        }
      ]
    }
  ],
  "contentMarkdown": "storage_state — saving/reusing login sessions # Log in once, save the resulting session context = browser.new_context() page = context.new_page() page.goto(\"https://app.example.com/login\") page.get_by_label(\"Username\").fill(\"testuser\") page.get_by_label(\"Password\").fill(\"testpass\") page.get_by_role(\"button\", name=\"Log in\").click() context.storage_state(path=\"auth_state.json\") # Reuse the saved ses\n\n## Overview\n\nstorage_state — saving/reusing login sessions\n\ncontext = browser.new_context() page = context.new_page()\n\n# Reuse the saved session — no login steps needed context = browser.new_context(storage_state=\"auth_state.json\") page = context.new_page()\n\nWhat it does: Saves the current context's cookies and localStorage to a JSON file (or returns it as a dict if no path given).\n\nTypes/params:\n\nPointers: Only captures cookies/localStorage — not sessionStorage or IndexedDB, so if an app's auth relies on those, this approach needs adjustment.\n\nWhat it does: Creates a new context pre-loaded with previously saved cookies/localStorage, skipping the need to log in via UI again.\n\nTypes/params:\n\nstate from a prior context.storage_state() call\n\nPointers: This is a major speed win across a large suite — logging in via UI once and reusing the state across hundreds of tests versus repeating a slow UI login flow every single test.\n\n```\npage.goto(\"https://app.example.com/login\")\npage.get_by_label(\"Username\").fill(\"testuser\")\npage.get_by_label(\"Password\").fill(\"testpass\")\npage.get_by_role(\"button\", name=\"Log in\").click()\n\ncontext.storage_state(path=\"auth_state.json\")\n\npage.goto(\"https://app.example.com/dashboard\")   # already logged in\n\ncontext.storage_state(path=...)\n\n# Log in once, save the resulting session\n```\n\n## Global setup for auth (login once, reuse everywhere)\n\nA common pattern with pytest is a session-scoped fixture that performs the login exactly once per test run and hands out the saved state file path to every test that needs it:\n\nPointers: Note the two different scopes working together — auth_state is\n\nsession-scoped (login happens once for the whole run), while authenticated_page\n\nis function-scoped (a fresh context per test, for isolation) — reusing the saved state, not the context itself, across tests. This combination gets you both speed and isolation simultaneously.\n\n```\n# conftest.py\n@pytest.fixture(scope=\"session\")\ndef auth_state(browser):\n    context = browser.new_context()\n    page = context.new_page()\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"testpass\")\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    state_path = \"auth_state.json\"\n    context.storage_state(path=state_path)\n    context.close()\n    return state_path\n\n@pytest.fixture\ndef authenticated_page(browser, auth_state):\n    context = browser.new_context(storage_state=auth_state)\n    page = context.new_page()\n    yield page\n    context.close()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
