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
  "contentMarkdown": "## The Authentication Problem\n\nLogging in through the UI before every test adds 5–15 seconds of overhead and breaks when the login form changes. **storage_state** saves cookies and localStorage after a single login, then replays them in every subsequent test — skipping the UI entirely.\n\n## Saving Storage State\n\nAuthenticate once and write the state to disk:\n\n```python\nfrom playwright.sync_api import sync_playwright\n\ndef save_auth_state():\n    with sync_playwright() as p:\n        browser = p.chromium.launch()\n        context = browser.new_context()\n        page = context.new_page()\n        page.goto(\"https://staging.example.com/login\")\n        page.get_by_label(\"Email\").fill(\"admin@example.com\")\n        page.get_by_label(\"Password\").fill(\"secret\")\n        page.get_by_role(\"button\", name=\"Sign in\").click()\n        page.wait_for_url(\"**/dashboard\")\n        context.storage_state(path=\"auth/admin.json\")\n        browser.close()\n\nif __name__ == \"__main__\":\n    save_auth_state()\n```\n\nThe JSON file contains cookies, origins, and localStorage entries.\n\n## Loading Storage State in Tests\n\nConfigure pytest-playwright to use the saved state for every test context:\n\n```python\n# tests/conftest.py\nimport pytest\n\n@pytest.fixture(scope=\"session\")\ndef browser_context_args(browser_context_args):\n    return {\n        **browser_context_args,\n        \"storage_state\": \"auth/admin.json\",\n    }\n```\n\nEvery test starts already authenticated:\n\n```python\ndef test_dashboard_widgets(page):\n    page.goto(\"/dashboard\")  # no login needed\n    expect(page.get_by_text(\"Leave balance\")).to_be_visible()\n```\n\n## Global Setup Fixture Pattern\n\nFor CI, generate auth state once before the suite runs. Use a session-scoped fixture with `autouse`:\n\n```python\nimport os\nimport pytest\nfrom playwright.sync_api import sync_playwright\n\nAUTH_FILE = \"auth/admin.json\"\n\n@pytest.fixture(scope=\"session\", autouse=True)\ndef ensure_auth_state(base_url):\n    if os.path.exists(AUTH_FILE):\n        return  # already generated\n\n    os.makedirs(\"auth\", exist_ok=True)\n    with sync_playwright() as p:\n        browser = p.chromium.launch()\n        context = browser.new_context()\n        page = context.new_page()\n        page.goto(f\"{base_url}/login\")\n        page.get_by_label(\"Email\").fill(os.environ[\"ADMIN_EMAIL\"])\n        page.get_by_label(\"Password\").fill(os.environ[\"ADMIN_PASSWORD\"])\n        page.get_by_role(\"button\", name=\"Sign in\").click()\n        page.wait_for_url(\"**/dashboard\")\n        context.storage_state(path=AUTH_FILE)\n        browser.close()\n```\n\nThis runs once per pytest session. If `auth/admin.json` already exists (cached in CI), it skips regeneration.\n\n## Multiple Roles\n\nDifferent user roles need separate storage state files:\n\n```python\nROLES = {\n    \"admin\": \"auth/admin.json\",\n    \"employee\": \"auth/employee.json\",\n    \"manager\": \"auth/manager.json\",\n}\n\n@pytest.fixture(params=[\"admin\", \"employee\"])\ndef authed_context(browser, base_url, request):\n    role = request.param\n    context = browser.new_context(storage_state=ROLES[role])\n    yield context\n    context.close()\n\ndef test_permissions(authed_context):\n    page = authed_context.new_page()\n    page.goto(\"/settings\")\n    # assertions differ per role via parametrize\n```\n\n## Token Refresh and Expiry\n\nStorage state captures cookies at a point in time. If sessions expire after 30 minutes and your suite runs longer, add a refresh step:\n\n```python\n@pytest.fixture(scope=\"session\", autouse=True)\ndef ensure_fresh_auth(base_url):\n    if not auth_is_expired(\"auth/admin.json\"):\n        return\n    regenerate_auth_state(base_url, \"auth/admin.json\")\n```\n\nCheck the cookie expiry timestamp in the JSON file before deciding to regenerate.\n\n## Security Notes\n\n- Add `auth/` to `.gitignore` — storage state contains session tokens.\n- In CI, generate auth state in a setup step using secrets, not committed files.\n- Never use production credentials in test storage state.\n\n## Key Takeaways\n\n- `context.storage_state(path=...)` saves cookies and localStorage to a JSON file.\n- Load it via `browser_context_args` to skip UI login in every test.\n- Use a session-scoped global setup fixture to generate auth state once per run.\n- Keep auth files out of version control; regenerate in CI with secrets.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
