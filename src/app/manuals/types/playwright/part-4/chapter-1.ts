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
  "contentMarkdown": "page.route() basics page.route() intercepts network requests matching a URL pattern before they reach the server, letting you inspect, modify, block, or fully replace the response. def handle_route(route): route.continue_() # let it through unchanged page.route(\"**/*.png\", handle_route) page.route(url_pattern, handler) What it does: Registers an interceptor for any request matching a URL pattern.\n\n## Overview\n\nthe server, letting you inspect, modify, block, or fully replace the response.\n\n```\npage.route() basics\n\npage.route() intercepts network requests matching a URL pattern before they reach\n\ndef handle_route(route):\n    route.continue_()   # let it through unchanged\n```\n\n## page.route(url_pattern, handler)\n\nWhat it does: Registers an interceptor for any request matching a URL pattern.\n\nTypes/params:\n\nPointers: Every matched request must be resolved by the handler (continue/fulfill/abort) or the request hangs indefinitely. Register routes before the navigation/action that triggers the request.\n\n```\nroute.continue_(), route.fulfill(), or route.abort()\n```\n\n## Mocking API responses\n\nThis lets you test UI behavior for scenarios that are hard to trigger naturally — server errors, empty states, slow responses — without needing the actual backend to cooperate.\n\nWhat it does: Responds to the intercepted request with custom data instead of letting it reach the real server.\n\nTypes/params:\n\n```\ndef mock_users_api(route):\n    route.fulfill(\n        status=200,\n        content_type=\"application/json\",\n        body='{\"users\": [{\"id\": 1, \"name\": \"Test User\"}]}'\n    )\n\npage.route(\"**/api/users\", mock_users_api)\npage.goto(\"https://app.example.com/users\")\n\nroute.fulfill(status=..., content_type=..., body=...)\n```\n\n## 500 for error-state testing\n\nPointers: Use json= instead of manually building a body JSON string where possible\n\n— less error-prone. Mocking error statuses (500, 403) is one of the highest-value uses here, since these are notoriously hard to trigger from a real backend on demand.\n\nWhat it does: Lets the request proceed to the real server, optionally with modifications.\n\nTypes/params:\n\nPointers: Use this when you only want to observe or slightly tweak a request (e.g., inject a test header) rather than fully replace the response.\n\nWhat it does: Blocks the request entirely, simulating a network failure.\n\nTypes/params:\n\n\"timedout\", \"connectionrefused\"\n\nPointers: Useful for testing how the UI handles total network failure (not just an error response, but no response at all) — a distinct code path from a mocked 500.\n\n```\nroute.abort(error_code=...)\n\nroute.continue_(...)\n```\n\n## Blocking resources (images, ads) for speed\n\n\n\n```\ndef block_images(route):\n    if route.request.resource_type == \"image\":\n        route.abort()\n    else:\n        route.continue_()\n```\n\n## route.request.resource_type\n\nWhat it does: Read-only property identifying the category of the intercepted request.\n\nTypes/params:\n\n\"xhr\", \"fetch\", \"font\", \"media\"\n\nPointers: Blocking images/fonts/ad-tracker scripts on tests that don't need to visually verify them can meaningfully speed up a large suite — but don't block resources your test actually depends on rendering correctly (defeats visual regression testing in Chapter 19).",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
