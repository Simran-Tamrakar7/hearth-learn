import type { ChapterRecord } from "../../../types";

/** API Testing */
export const chapter = {
  "id": "tt-api-testing",
  "overlayNo": 34,
  "title": "API Testing",
  "minutes": 25,
  "level": "beginner",
  "phase": "Part 9 · Modern Engineering & Integrations",
  "partName": "Part 9 · Modern Engineering & Integrations",
  "overviewText": "API testing verifies an API's behavior directly at the request/response level — checking endpoints, methods, payloads, status codes, headers, and response bodies — independent of any UI, working with the API exactly as any consuming client (frontend, mobile app, third-party integration) actually would.",
  "why": "Modern applications are built on APIs, often consumed by more than one client (web, mobile, partner integrations) — testing only through one UI never fully validates the API itself, and a bug fixed for one consumer can remain broken for the others. API testing catches issues earlier and faster than UI-driven testing, since there's no rendering, no browser, and no waiting on frontend behavior — just the request and response themselves.",
  "when": "As soon as an endpoint exists and is ready to be called — often the very first testing possible on new backend work, well before any UI is built against it — and continuously afterward in CI, since API tests run fast and catch backend regressions immediately.",
  "practical": {
    "app": "HRMS Leave Request API",
    "scenario": "The POST /leave-requests endpoint is tested directly, independent of the leave request form UI that will eventually call it.",
    "pass": "A valid request returns 201 with the created leave request object, matching the documented schema exactly.",
    "fail": "Submitting a request with start_date after end_date returns 201 (success) instead of the expected 400 validation error — a backend gap caught in API testing weeks before the UI is even built against this endpoint."
  },
  "advantages": [
    "Faster and more direct than UI-driven testing — no browser rendering or frontend overhead",
    "Validates the API for every consumer (web, mobile, third-party), not just whichever UI happens to be tested",
    "Catches backend issues at the earliest possible point, often before any frontend is built",
    "Free tools cover everything from quick browser checks (Hoppscotch) to full CI suites (Postman/Newman)"
  ],
  "limitations": [
    "Doesn't verify how the API is consumed and rendered by a real UI — pair with E2E testing",
    "Assertions are only as good as the understanding of the intended contract — untested edge cases stay invisible",
    "Doesn't catch issues that only manifest from real concurrent, UI-driven usage patterns"
  ],
  "tools": [
    {
      "name": "Postman",
      "sub": "Complete API Lifecycle, Mocking & CI Runner",
      "url": "https://www.postman.com",
      "seeChapter": 2,
      "desc": "The most widely used API client (see Chapter 2 and Chapter 11) for manual and automated API testing, with collections, environments, and scripted assertions covering everything from quick checks to CI suites via Newman.",
      "adv": [
        "Environment variable chaining across multiple API calls",
        "Automated collection runner via Newman CLI in CI pipelines"
      ],
      "lim": [
        "Free tier limits cloud collection sharing in large teams"
      ],
      "steps": [
        {
          "t": "Step 1 — Create request and environment variables",
          "p": "Configure authorization bearer tokens and base URLs.",
          "c": "POST {{baseUrl}}/api/v1/leave-requests\nHeaders: { \"Authorization\": \"Bearer {{jwtToken}}\" }"
        },
        {
          "t": "Step 2 — Write test script assertions in Postman",
          "p": "Verify status code, response time (<200ms), and JSON schema.",
          "c": "pm.test(\"Status code is 201\", () => pm.response.to.have.status(201));\npm.test(\"Returns valid leave ID\", () => {\n  pm.expect(pm.response.json().data).to.have.property('id');\n});"
        },
        {
          "t": "Step 3 — Run in CI pipeline via Newman",
          "p": "Automate entire collection run on every backend pull request.",
          "c": "npx newman run collections/hrms-api.json -e env/staging.json --reporters cli,junit"
        }
      ]
    },
    {
      "name": "Insomnia",
      "sub": "Lightweight REST & GraphQL Developer Client",
      "url": "https://insomnia.rest",
      "desc": "A lightweight, developer-focused REST/GraphQL API client — a leaner alternative to Postman, well suited to developers who want a fast, low-friction way to build and test requests.",
      "adv": [
        "Extremely fast and lightweight native desktop client",
        "First-class GraphQL schema introspection and code generation",
        "Git-based collection sync with repository branches"
      ],
      "lim": [
        "Fewer team collaboration features on free tier"
      ],
      "steps": [
        {
          "t": "Step 1 — Build request in Insomnia workspace",
          "p": "Construct payload with syntax-highlighted JSON editor.",
          "c": "POST https://api.hrms.internal/graphql\nQuery: mutation { applyLeave(days: 3, type: SICK) { id status } }"
        },
        {
          "t": "Step 2 — Inspect response headers and timings",
          "p": "Check 200 OK, latency breakdown, and JSON body structure.",
          "c": "Response: 200 OK | Time: 42ms | Size: 180 B"
        }
      ]
    },
    {
      "name": "Hoppscotch",
      "sub": "Open-Source Browser & WebSocket API Playground",
      "url": "https://hoppscotch.io",
      "desc": "A free, open-source, browser-based API testing tool — needs no installation at all, runs directly at hoppscotch.io, and supports REST, GraphQL, and WebSocket testing with a clean, fast interface.",
      "adv": [
        "Zero install — runs instantly in any web browser",
        "Supports REST, GraphQL, WebSocket, SSE, and MQTT in one interface",
        "100% free and open-source with offline PWA support"
      ],
      "lim": [
        "Browser CORS restrictions require Hoppscotch browser extension for local APIs"
      ],
      "steps": [
        {
          "t": "Step 1 — Open Hoppscotch in browser",
          "p": "Navigate to https://hoppscotch.io and select REST or WebSocket tab.",
          "c": "Target: https://api.hrms.internal/api/v1/health"
        },
        {
          "t": "Step 2 — Send real-time SSE or WebSocket messages",
          "p": "Test server-sent notifications for leave request approvals in real time.",
          "c": "Connected: wss://api.hrms.internal/notifications/feed\nReceived: {\"event\": \"LEAVE_APPROVED\", \"id\": \"lr_9012\"}"
        }
      ]
    }
  ],
  "contentMarkdown": "## Automated REST and GraphQL Contract Validation\n\nExecute comprehensive HTTP assertions validating status codes, JSON schema structures, and headers.\n\n```\nnpx newman run hrms-api.json -e env-staging.json --bail\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
