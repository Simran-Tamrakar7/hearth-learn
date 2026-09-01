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
  "contentMarkdown": "request context (APIRequestContext) Playwright ships a full HTTP client independent of any browser — meaning you can make API calls without opening a page at all, useful both for pure API testing and for fast test-data setup (create data via API instead of clicking through slow UI forms). import pytest from playwright.sync_api import sync_playwright with sync_playwright() as p: request_context = p\n\n## Overview\n\nrequest context (APIRequestContext)\n\nPlaywright ships a full HTTP client independent of any browser — meaning you can make API calls without opening a page at all, useful both for pure API testing and for fast test-data setup (create data via API instead of clicking through slow UI forms).\n\nOr via the pytest-playwright plugin's built-in request fixture:\n\nextra_http_headers=...)\n\nWhat it does: Creates an APIRequestContext — an isolated HTTP client session for making API calls.\n\nTypes/params:\n\ncalls, e.g. set once instead of repeating the full domain every call\n\nthis context, commonly used for auth tokens: {\"Authorization\": \"Bearer\n\n<token>\"}\n\ndirectly into Chapter 20)\n\nPointers: Like BrowserContext, an APIRequestContext is isolated — separate contexts don't share cookies/headers, letting you cleanly simulate different authenticated users in the same test file.\n\n```\nimport pytest\nfrom playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    request_context = p.request.new_context(base_url=\"https://api.example.com\")\n\ndef test_api_example(request):\n    response = request.get(\"/users/1\")\n\nplaywright.request.new_context(base_url=...,\n```\n\n## GET/POST/PUT/DELETE calls — full detail\n\nWhat it does: Sends an HTTP GET request — used to retrieve data without modifying anything on the server.\n\nTypes/params:\n\n\"limit\": 10} becomes ?page=1&limit=10\n\nresponse = request.get(\"/users\", params={\"page\": 1, \"limit\": 10})\n\ndata = response.json()\n\nPointers: GET requests should be idempotent and side-effect-free by REST convention — a well-behaved API should let you call GET repeatedly with zero risk of changing data.\n\nIf a \"GET\" endpoint you're testing does change server state, that's worth flagging as a design smell, not something to just work around in your test.\n\nWhat it does: Sends an HTTP POST request — used to create a new resource or trigger an action on the server.\n\nTypes/params:\n\n```\nrequest.post(url, data=..., json=..., headers=...)\n\nrequest.get(url, params=..., headers=...)\n\nassert len(data[\"users\"]) <= 10\n```\n\n## Content-Type: application/json header for you\n\nresponse = request.post(\"/users\", data={ \"name\": \"Test User\",\n\n\"email\": \"testuser@example.com\"\n\n})\n\n```\nassert response.status == 201   # 201 Created is the conventional success status for\n```\n\n## POST new_user = response.json()\n\nPointers: A successful POST conventionally returns 201 Created (not 200 OK) along with the newly created resource's data (including its generated ID) — worth asserting on that ID since you'll typically need it for cleanup (Chapter 16) or for follow-up requests (e.g., GET that same user to verify persistence). POST is not\n\nidempotent by default — calling it twice with the same data typically creates two separate resources, which matters when writing retry logic around it.\n\nWhat it does: Sends an HTTP PUT request — used to replace an existing resource entirely with the data provided.\n\nTypes/params: Same shape as .post() — url, data/json, headers.\n\nresponse = request.put(f\"/users/{user_id}\", json={ \"name\": \"Updated Name\",\n\n\"email\": \"updated@example.com\"\n\n})\n\nPointers: PUT is conventionally idempotent — sending the exact same PUT request multiple times should leave the resource in the same final state each time (unlike POST). PUT typically expects the full resource representation in the body — if you omit a field the resource currently has, a strictly RESTful API may null it out, since PUT means \"replace,\" not \"merge.\" This is the detail that most often trips people up moving from POST to PUT.\n\nWhat it does: Sends an HTTP PATCH request — used to make a partial update to an existing resource (only the fields provided change; everything else stays as-is).\n\nTypes/params: Same shape as .post()/.put().\n\nresponse = request.patch(f\"/users/{user_id}\", json={\"email\": \"newemail@example.com\"})\n\nPointers: Worth knowing alongside PUT even though it wasn't explicitly listed in your TOC, since real-world APIs frequently offer PATCH specifically to avoid PUT's \"must send the whole object\" requirement — and mixing the two up in tests is a common source of confusing failures (a PATCH-shaped body sent to a PUT endpoint wiping out fields you didn't intend to touch).\n\nWhat it does: Sends an HTTP DELETE request — used to remove a resource from the server.\n\nTypes/params:\n\nallows one)\n\nresponse = request.delete(f\"/users/{user_id}\")\n\ndeletes\n\nfollow_up = request.get(f\"/users/{user_id}\")\n\nPointers: A successful DELETE commonly returns 204 No Content (success, but no\n\nbody to return) rather than 200 — check your specific API's convention rather than assuming. DELETE is conventionally idempotent too — deleting an already-deleted resource should ideally return a 404 (not found) rather than erroring in a confusing way, and that's worth testing as its own case, not just the \"happy path\" single delete.\n\n```\nassert response.status == 200\n\n# Other fields like \"name\" remain untouched, unlike a PUT with the same partial body\n\nassert response.status in (200, 204)   # 204 No Content is common for successful\n\nrequest.patch(url, data=..., json=..., headers=...)\n```\n\n## Shared response object reference (response)\n\nEvery call above (.get(), .post(), .put(), .patch(), .delete()) returns an\n\nAPIResponse object with the same interface:\n\nWhat it does: Exposes the numeric HTTP status code, and a boolean shortcut for \"was it successful.\"\n\nTypes/params:\n\nPointers: .ok is a convenient quick check, but explicit status code assertions (assert\n\nexpected behavior rather than just \"some success code.\"\n\nWhat it does: Parses the response body as JSON and returns it as a Python dict/list.\n\nTypes/params: No parameters.\n\nPointers: Will raise an error if the response body isn't valid JSON (e.g., an HTML error page returned instead) — worth wrapping in a try/except or checking content_type first if you're testing error scenarios where the response shape might vary.\n\nWhat it does: .text() returns the raw response body as a string; .headers exposes response headers as a dict.\n\nTypes/params: No parameters for .text(); .headers is a plain dict-like property.\n\nPointers: Use .text() for non-JSON responses (HTML, plain text errors); check\n\n.headers when testing things like caching behavior, rate-limit headers, or content-type correctness.\n\n```\nresponse.status == 201) are usually better in tests since they pin down the exact\n\nresponse.text() / response.headers\n\nresponse.status / response.ok\n```\n\n## Combining UI + API tests\n\nThe powerful pattern: use the API to quickly set up state (create a user, seed data) instead of a slow UI flow, then test the UI layer on top of that pre-seeded state — and optionally clean up via API afterward too.\n\n\"jane@example.com\"})\n\nuser_id = response.json()[\"id\"]\n\n# Cleanup via API — fast, doesn't depend on UI delete flow working correctly\n\nPointers: This pattern dramatically speeds up test suites where the thing you actually want to test is deep in the app (e.g., \"does an admin see the user in a list\") but getting there via pure UI would require a slow, flake-prone signup flow every single test run.\n\n```\ndef test_new_user_appears_in_admin_list(page, request):\n\n# Fast setup via API instead of clicking through a signup form\n    response = request.post(\"/users\", json={\"name\": \"Jane Doe\", \"email\":\n\n# Now test the actual UI behavior\n    page.goto(\"https://app.example.com/admin/users\")\n    expect(page.get_by_text(\"Jane Doe\")).to_be_visible()\n\nrequest.delete(f\"/users/{user_id}\")\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
