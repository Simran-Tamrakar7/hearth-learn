import type { ChapterRecord } from "../../../types";

/** 17. Network Interception & Mocking */
export const chapter = {
  "id": "pw-4-network",
  "title": "17. Network Interception & Mocking",
  "minutes": 50,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "page.route() intercepts network requests matching a URL pattern before they reach the server, letting you inspect, modify, block, or fully replace the response. This is Playwright's built-in network mocking layer — no external tools like WireMock or MSW required. Three handler actions resolve every intercepted request: route.continue_() passes the request through (optionally modified), route.fulfill() responds with custom status/body without hitting the server, and route.abort() blocks the request entirely simulating network failure. Mocking API responses with route.fulfill() lets you test UI behavior for server errors, empty states, and slow responses without backend cooperation. Blocking images and ad trackers via route.request.resource_type speeds up suites that do not need visual verification — but do not block resources your test depends on rendering.",
  "why": "Many UI states are nearly impossible to trigger from a real backend on demand: a 500 error on the users endpoint, an empty search result, a 30-second slow response. Without network mocking, testers wait for DevOps to inject faults or manually break staging. page.route() puts these scenarios under test control — deterministic, repeatable, and fast. Blocking non-essential resources (images, fonts, ad scripts) can cut per-test load time significantly in large suites.",
  "when": "Use route.fulfill() when testing error states, empty lists, or specific API payloads the backend cannot easily produce. Use route.continue_() when you need to inject headers or observe requests without replacing responses. Use route.abort() for network-failure UX testing. Block images/fonts only on tests that do not verify visual rendering (not visual regression tests in Chapter 19). Always register routes before the navigation or action that triggers the request.",
  "practical": {
    "app": "HRMS — Employee list error handling",
    "scenario": "The HRMS employee list page should show a friendly error banner when the /api/employees endpoint returns 500. Triggering a real 500 in staging requires DBA intervention. With page.route(), the test mocks a 500 response, verifies the error banner appears, and completes in 3 seconds.",
    "pass": "page.route('**/api/employees', lambda r: r.fulfill(status=500, body='{\"error\":\"Server error\"}')) — error banner visible, test deterministic.",
    "fail": "Test depends on staging backend being manually broken; fails when backend is healthy, passes when it happens to be down — non-deterministic."
  },
  "advantages": [
    "Test error states, empty data, and edge-case responses without backend changes",
    "Deterministic — same mock payload every run, no staging environment dependency",
    "Built into Playwright — no external mocking server or proxy setup",
    "Blocking non-essential resources speeds up large suites measurably",
    "route.request gives full access to method, headers, and post data for inspection"
  ],
  "limitations": [
    "Mocked responses may drift from real API contract if backend changes",
    "Every matched request must be resolved (continue/fulfill/abort) or it hangs indefinitely",
    "Does not mock WebSocket connections — only HTTP/HTTPS requests",
    "Over-mocking creates tests that pass against fake data but fail against real backend",
    "Routes must be registered before the triggering action — order matters"
  ],
  "tools": [
    {
      "name": "page.route()",
      "sub": "Network interception",
      "url": "https://playwright.dev/python/docs/network",
      "desc": "page.route(url_pattern, handler) registers a callback invoked for every network request matching the pattern. The handler receives a Route object with methods to continue, fulfill, or abort the request. URL patterns support glob syntax (** matches any path segment). The handler can inspect route.request for method, headers, post data, and resource_type before deciding how to resolve the request.",
      "adv": [
        "Intercept any HTTP request by URL pattern without external tools",
        "Fulfill with custom status, headers, and body for precise scenario control",
        "Inspect and modify outgoing requests before they reach the server",
        "Block resource types (image, font, media) for faster test execution"
      ],
      "lim": [
        "Unmatched requests that never get resolved hang until timeout",
        "WebSocket traffic is not interceptable via page.route()",
        "Glob patterns can accidentally match unintended URLs",
        "Handler runs in the browser context — complex logic should stay in test code"
      ],
      "steps": [
        {
          "t": "Step 1 — Mock an API response",
          "p": "Replace a real API call with custom JSON:",
          "c": "def mock_users_api(route):\n    route.fulfill(\n        status=200,\n        content_type=\"application/json\",\n        body='{\"users\": [{\"id\": 1, \"name\": \"Test User\"}]}'\n    )\n\npage.route(\"**/api/users\", mock_users_api)\npage.goto(\"https://app.example.com/users\")\nexpect(page.get_by_text(\"Test User\")).to_be_visible()"
        },
        {
          "t": "Step 2 — Mock an error response",
          "p": "Test UI error handling for server failures:",
          "c": "def mock_server_error(route):\n    route.fulfill(status=500, content_type=\"application/json\",\n                  body='{\"error\": \"Internal server error\"}')\n\npage.route(\"**/api/employees\", mock_server_error)\npage.goto(\"https://app.example.com/employees\")\nexpect(page.get_by_text(\"Something went wrong\")).to_be_visible()"
        },
        {
          "t": "Step 3 — Block images for speed",
          "p": "Abort image requests on tests that don't need them:",
          "c": "def block_images(route):\n    if route.request.resource_type == \"image\":\n        route.abort()\n    else:\n        route.continue_()\n\npage.route(\"**/*\", block_images)"
        },
        {
          "t": "Step 4 — Let requests through with modification",
          "p": "Inject a test header without replacing the response:",
          "c": "def add_test_header(route):\n    headers = {**route.request.headers, \"X-Test-Mode\": \"true\"}\n    route.continue_(headers=headers)\n\npage.route(\"**/api/**\", add_test_header)"
        }
      ]
    }
  ],
  "contentMarkdown": "## Intercepting Network Requests\n\n`page.route()` registers a handler that runs **before** a matching request leaves the browser. You can inspect the request, modify it, replace the response entirely, or block it. This is Playwright's built-in mocking layer — no external proxy or WireMock server required.\n\nRegister routes **before** the action that triggers the request:\n\n```python\ndef test_mocked_api_response(page):\n    def handle(route):\n        route.fulfill(\n            status=200,\n            content_type=\"application/json\",\n            body='{\"users\": [{\"id\": 1, \"name\": \"Alice\"}]}',\n        )\n\n    page.route(\"**/api/users\", handle)\n    page.goto(\"/users\")\n    expect(page.get_by_text(\"Alice\")).to_be_visible()\n```\n\n## Three Handler Actions\n\nEvery intercepted request must be resolved with exactly one action:\n\n| Action | Method | Effect |\n|--------|--------|--------|\n| Mock response | `route.fulfill(...)` | Return custom status/body without hitting the server |\n| Pass through | `route.continue_()` | Forward to the real server (optionally modified) |\n| Block | `route.abort()` | Cancel the request — simulates network failure |\n\n### fulfill — Replace the Response\n\n```python\ndef test_server_error_banner(page):\n    page.route(\n        \"**/api/employees\",\n        lambda route: route.fulfill(status=500, body='{\"error\": \"Internal server error\"}'),\n    )\n    page.goto(\"/employees\")\n    expect(page.get_by_role(\"alert\")).to_contain_text(\"Something went wrong\")\n```\n\nYou control `status`, `headers`, `content_type`, and `body`. Use this for error states, empty lists, and slow-response simulation.\n\n### continue_ — Modify and Forward\n\n```python\ndef test_adds_auth_header(page):\n    def handle(route):\n        headers = {**route.request.headers, \"X-Test-Mode\": \"true\"}\n        route.continue_(headers=headers)\n\n    page.route(\"**/api/**\", handle)\n    page.goto(\"/dashboard\")\n```\n\n`continue_()` sends the request to the real backend. Useful for injecting headers or logging without replacing responses.\n\n### abort — Simulate Network Failure\n\n```python\ndef test_offline_message(page):\n    page.route(\"**/api/**\", lambda route: route.abort(\"failed\"))\n    page.goto(\"/dashboard\")\n    expect(page.get_by_text(\"Unable to connect\")).to_be_visible()\n```\n\n## URL Patterns\n\nPatterns are glob-style strings or compiled regex:\n\n```python\npage.route(\"**/api/users\", handler)       # any host, path ending in /api/users\npage.route(\"https://cdn.example.com/**\", handler)  # specific CDN\npage.route(re.compile(r\"\\.png$\"), handler)        # regex: all PNG files\n```\n\n## Blocking Images and Trackers\n\nSpeed up suites that do not need visual rendering by aborting non-essential resources:\n\n```python\nBLOCKED_TYPES = {\"image\", \"media\", \"font\"}\n\ndef test_fast_load_without_images(page):\n    page.route(\"**/*\", lambda route: (\n        route.abort()\n        if route.request.resource_type in BLOCKED_TYPES\n        else route.continue_()\n    ))\n    page.goto(\"/dashboard\")\n    expect(page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()\n```\n\n**Do not block images** in visual regression tests (Chapter 19) — screenshots will be blank.\n\n## Inspecting Requests\n\n`route.request` exposes the full request object:\n\n```python\ndef test_posts_correct_payload(page):\n    captured = []\n\n    def handle(route):\n        captured.append(route.request.post_data_json)\n        route.continue_()\n\n    page.route(\"**/api/orders\", handle)\n    page.get_by_role(\"button\", name=\"Place order\").click()\n    assert captured[0][\"quantity\"] == 2\n```\n\n## Common Pitfalls\n\n- **Unresolved routes hang forever** — every matched request must call `fulfill`, `continue_`, or `abort`.\n- **Register before navigation** — routes set after `goto` miss the initial page load requests.\n- **Mock drift** — update mock payloads when the API contract changes.\n\n## Key Takeaways\n\n- `page.route()` intercepts requests before they leave the browser.\n- `fulfill` mocks responses; `continue_` forwards; `abort` blocks.\n- Block images/fonts to speed up non-visual tests.\n- Always resolve every intercepted request.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
