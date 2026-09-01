import type { ChapterRecord } from "../../../types";

/** 18. API Testing with Playwright */
export const chapter = {
  "id": "pw-4-api",
  "title": "18. API Testing with Playwright",
  "minutes": 50,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "Playwright ships a full HTTP client (APIRequestContext) independent of any browser — you can make GET/POST/PUT/PATCH/DELETE calls without opening a page. The pytest-playwright request fixture provides this client in any test function. API testing with Playwright means asserting on response.status, response.json(), and response.ok without launching a browser at all, or combining API setup with UI verification in the same test. The powerful hybrid pattern: create test data via API (fast, reliable), then test the UI layer on pre-seeded state, then clean up via API. POST conventionally returns 201 Created with the new resource ID; DELETE returns 204 No Content. PUT replaces an entire resource (idempotent); PATCH updates only provided fields.",
  "why": "Creating test data through UI forms is slow (15–30 seconds per user) and flake-prone (a loading spinner blocks the submit button). API setup takes milliseconds and does not depend on frontend rendering. When the test's actual goal is 'does admin see the new user in the list', spending 20 seconds on a signup form is wasted time. API cleanup is similarly faster and does not break when the UI delete button moves. Pure API tests also catch backend regressions that no browser test would surface.",
  "when": "Use the request fixture for test-data setup and teardown whenever the API endpoints exist — default choice over UI for create/delete operations. Write pure API tests for backend endpoints that have no UI (webhooks, internal APIs). Combine API setup + UI assertion when the thing under test is a UI behavior that depends on server state. Assert explicit status codes (201, 204, 404) rather than relying on response.ok alone.",
  "practical": {
    "app": "HRMS — Admin user list test",
    "scenario": "Testing that a newly created employee appears in the admin user list. Pure UI approach: navigate to signup, fill 8 fields, submit, log in as admin, navigate to user list — 45 seconds. API hybrid: POST /users with test data (200ms), page.goto admin list, assert name visible, DELETE /users/{id} — 5 seconds total.",
    "pass": "response = request.post('/users', json={'name': 'Jane Doe', 'email': 'jane@example.com'}); assert response.status == 201; user_id = response.json()['id'] — setup in milliseconds.",
    "fail": "Every test clicks through a 6-step signup form; suite takes 40 minutes; one test fails on a CAPTCHA that appeared on the signup page."
  },
  "advantages": [
    "API setup/teardown is 10–100x faster than equivalent UI flows",
    "request fixture works with no browser launch — pure API tests need no page",
    "Hybrid API+UI tests focus browser time on what actually needs a browser",
    "Isolated APIRequestContext per fixture — simulate different authenticated users",
    "Same pytest framework for API and UI — one report, one CI pipeline"
  ],
  "limitations": [
    "Requires backend API endpoints to exist and be documented",
    "API contract changes break tests silently if response shape is not asserted",
    "Cannot test purely visual behavior via API alone",
    "Auth tokens for API calls need separate setup (not automatically shared with browser cookies)",
    "POST is not idempotent — retry logic can create duplicate resources"
  ],
  "tools": [
    {
      "name": "APIRequestContext",
      "sub": "Playwright HTTP client",
      "url": "https://playwright.dev/python/docs/api/class-apirequestcontext",
      "desc": "APIRequestContext is Playwright's built-in HTTP client for making API requests without a browser. Created via playwright.request.new_context(base_url=...) or available as the request fixture from pytest-playwright. Supports GET, POST, PUT, PATCH, DELETE with params, json, data, and headers. Returns an APIResponse with .status, .ok, .json(), .text(), and .headers. Each context is isolated — separate contexts do not share cookies or auth headers.",
      "adv": [
        "Full HTTP client inside Playwright — no requests/httpx dependency needed",
        "request fixture available in any pytest test with zero setup",
        "base_url set once — relative paths in all subsequent calls",
        "extra_http_headers for auth tokens applied to every request in the context"
      ],
      "lim": [
        "Not a full REST client library — no built-in retry, pagination helpers",
        "Separate from browser cookies unless explicitly shared via storage_state",
        "response.json() raises if body is not valid JSON (e.g., HTML error pages)",
        "No built-in request/response logging — add manually for debugging"
      ],
      "steps": [
        {
          "t": "Step 1 — Pure API test with request fixture",
          "p": "Test an endpoint without opening a browser:",
          "c": "def test_get_users(request):\n    response = request.get(\"/users\", params={\"page\": 1, \"limit\": 10})\n    assert response.status == 200\n    data = response.json()\n    assert len(data[\"users\"]) <= 10"
        },
        {
          "t": "Step 2 — Create a resource via POST",
          "p": "Assert 201 Created and capture the new ID:",
          "c": "def test_create_user(request):\n    response = request.post(\"/users\", json={\n        \"name\": \"Test User\",\n        \"email\": \"testuser@example.com\"\n    })\n    assert response.status == 201\n    new_user = response.json()\n    assert \"id\" in new_user"
        },
        {
          "t": "Step 3 — Hybrid API setup + UI verification",
          "p": "Seed data via API, verify in browser:",
          "c": "def test_new_user_in_admin_list(page, request):\n    response = request.post(\"/users\", json={\n        \"name\": \"Jane Doe\", \"email\": \"jane@example.com\"\n    })\n    user_id = response.json()[\"id\"]\n\n    page.goto(\"https://app.example.com/admin/users\")\n    expect(page.get_by_text(\"Jane Doe\")).to_be_visible()\n\n    request.delete(f\"/users/{user_id}\")"
        },
        {
          "t": "Step 4 — Verify deletion with follow-up GET",
          "p": "Confirm resource is gone after DELETE:",
          "c": "def test_delete_user(request):\n    create = request.post(\"/users\", json={\"name\": \"Temp\", \"email\": \"temp@test.com\"})\n    user_id = create.json()[\"id\"]\n\n    delete = request.delete(f\"/users/{user_id}\")\n    assert delete.status in (200, 204)\n\n    follow_up = request.get(f\"/users/{user_id}\")\n    assert follow_up.status == 404"
        }
      ]
    }
  ],
  "contentMarkdown": "## API Testing with Playwright\n\nPlaywright is not only a browser tool. The **APIRequestContext** sends HTTP requests directly — no browser window needed. Use it for fast API contract tests, data seeding, and hybrid flows that combine API setup with UI verification.\n\n## Creating a Request Context\n\nThe `playwright` fixture (session-scoped) can create standalone API contexts:\n\n```python\nimport pytest\nfrom playwright.sync_api import Playwright, APIRequestContext\n\n@pytest.fixture(scope=\"session\")\ndef api_context(playwright: Playwright, base_url) -> APIRequestContext:\n    context = playwright.request.new_context(\n        base_url=base_url,\n        extra_http_headers={\"Authorization\": f\"Bearer {os.environ['API_TOKEN']}\"},\n    )\n    yield context\n    context.dispose()\n```\n\nOr use the built-in `request` fixture from pytest-playwright for per-test contexts.\n\n## GET — Read Resources\n\n```python\ndef test_list_employees(api_context):\n    response = api_context.get(\"/api/employees\")\n    assert response.ok\n    data = response.json()\n    assert isinstance(data, list)\n    assert len(data) > 0\n    assert \"id\" in data[0]\n    assert \"name\" in data[0]\n```\n\nInspect the response object:\n\n```python\nresponse = api_context.get(\"/api/employees/42\")\nassert response.status == 200\nassert response.headers[\"content-type\"] == \"application/json\"\nbody = response.json()\nassert body[\"name\"] == \"Alice\"\ntext = response.text()       # raw string body\n```\n\n## POST — Create Resources\n\n```python\ndef test_create_employee(api_context, fake):\n    payload = {\n        \"name\": fake.name(),\n        \"email\": fake.unique.email(),\n        \"department\": \"Engineering\",\n    }\n    response = api_context.post(\"/api/employees\", data=payload)\n    assert response.status == 201\n    created = response.json()\n    assert created[\"id\"]\n    assert created[\"email\"] == payload[\"email\"]\n\n    # cleanup\n    api_context.delete(f\"/api/employees/{created['id']}\")\n```\n\nPass JSON with `data=` (auto-serialized) or raw body with `json=`.\n\n## PUT — Full Replacement\n\n```python\ndef test_replace_employee(api_context):\n    response = api_context.put(\n        \"/api/employees/42\",\n        data={\"name\": \"Bob Updated\", \"email\": \"bob@example.com\", \"department\": \"Sales\"},\n    )\n    assert response.ok\n    assert response.json()[\"department\"] == \"Sales\"\n```\n\nPUT replaces the entire resource. Missing fields may be cleared depending on API design.\n\n## PATCH — Partial Update\n\n```python\ndef test_patch_employee_department(api_context):\n    response = api_context.patch(\n        \"/api/employees/42\",\n        data={\"department\": \"Quality Assurance\"},\n    )\n    assert response.ok\n    assert response.json()[\"department\"] == \"Quality Assurance\"\n```\n\nPATCH sends only the changed fields — preferred for partial updates.\n\n## DELETE — Remove Resources\n\n```python\ndef test_delete_employee(api_context, fake):\n    # create first\n    create_resp = api_context.post(\"/api/employees\", data={\n        \"name\": fake.name(), \"email\": fake.unique.email(),\n    })\n    emp_id = create_resp.json()[\"id\"]\n\n    # delete\n    delete_resp = api_context.delete(f\"/api/employees/{emp_id}\")\n    assert delete_resp.status == 204\n\n    # verify gone\n    get_resp = api_context.get(f\"/api/employees/{emp_id}\")\n    assert get_resp.status == 404\n```\n\n## Response Object Reference\n\n| Property / Method | Description |\n|-------------------|-------------|\n| `response.status` | HTTP status code (200, 404, 500, …) |\n| `response.ok` | `True` if status is 2xx |\n| `response.headers` | Response headers dict |\n| `response.json()` | Parse body as JSON |\n| `response.text()` | Raw body as string |\n| `response.body()` | Raw body as bytes |\n\n## UI + API Hybrid Pattern\n\nSeed data via API, verify in the browser:\n\n```python\ndef test_employee_appears_in_ui(api_context, page, base_url, fake):\n    # API: create employee\n    resp = api_context.post(\"/api/employees\", data={\n        \"name\": \"Carol\", \"email\": fake.unique.email(),\n    })\n    emp_id = resp.json()[\"id\"]\n\n    # UI: verify employee visible\n    page.goto(f\"{base_url}/employees\")\n    expect(page.get_by_text(\"Carol\")).to_be_visible()\n\n    # API: cleanup\n    api_context.delete(f\"/api/employees/{emp_id}\")\n```\n\nThis pattern is faster and more reliable than clicking through a multi-step UI form just to set up test state.\n\n## Error Handling\n\n```python\ndef test_unauthorized_returns_401(api_context):\n    unauth = api_context  # context without auth header\n    response = unauth.get(\"/api/admin/settings\")\n    assert response.status == 401\n```\n\nTest both happy paths and error responses. API tests run in milliseconds — add them liberally.\n\n## Key Takeaways\n\n- `APIRequestContext` sends GET/POST/PUT/PATCH/DELETE without a browser.\n- Use API calls to seed and clean up test data; use the browser to verify UI behavior.\n- Inspect `response.status`, `.json()`, and `.ok` for assertions.\n- Hybrid API + UI tests are faster and more stable than UI-only setup.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
