import type { ChapterRecord } from "../../../types";

/** 2.2 Manually Building an HTTP Request */
export const chapter = {
  "id": "jm-2-2-manually-building-an-http-request",
  "title": "2.2 Manually Building an HTTP Request",
  "minutes": 24,
  "level": "beginner",
  "phase": "Part 2 · Building Your First Test",
  "partName": "Part 2 · Building Your First Test",
  "overviewText": "For most real testing work — especially API-focused performance testing on HRM or TADA where you already know the endpoint contracts — building the HTTP Request sampler by hand is more common and more reliable than recording. You decide the unit of work: one endpoint, or login plus apply.",
  "why": "Manual build forces an intentional measurement unit. Recording dumps the network; you decide whether 'Submit Leave' includes auth.",
  "when": "You have a Postman collection or DevTools request for POST /api/v1/leave/apply and want a clean sampler, not 40 assets.",
  "practical": {
    "app": "hrms.bizlevate.com leave apply",
    "scenario": "Build Submit Leave Request from a known JSON contract.",
    "pass": "You set POST, https, 443, path, JSON body, Header Manager Content-Type, and leave ${authToken} for a prior login extractor (Part 5).",
    "fail": "You record the whole dashboard and keep every font request as 'the test.'"
  },
  "tools": [],
  "customSummary": "- More reliable/common than recording for intentional API-focused performance testing.\n- Steps: Thread Group → HTTP Request sampler → fill Method/Server/Port/Path/Body.\n- Add HTTP Header Manager as needed (e.g., Content-Type: application/json); auth tokens referenced via variables (${authToken}), set up via earlier login sampler + extractor.\n- Manual building forces a deliberate decision about what \"unit\" of work you're actually measuring — ties into Transaction Controllers later (Part 4).",
  "contentMarkdown": "## Prefer hand-built API samplers\n\nFor most real testing work — and especially for API-focused performance testing on something like the HRM or TADA systems where you already know the endpoint contracts from your QA/BA work — building the HTTP Request sampler by hand is more common and more reliable than recording, because you have full intentional control over exactly which calls are included and why.\n\nThe manual build process starts the same way regardless of what you're testing: add a Thread Group to your Test Plan, then right-click it to add a Sampler → HTTP Request. From there, you fill in the fields you learned in Part 1 — Method, Server, Port, Path — but now let's walk through building a complete, realistic example end-to-end, the way you'd actually do it for testing an HRM endpoint.\n\n## Example — submit leave request\n\nSay you want to load-test the \"submit leave request\" endpoint. You'd first confirm the endpoint contract (method, URL, required headers, body shape) the same way you would before writing a Playwright API test — from API documentation, Postman collection, or by inspecting a real request in browser DevTools. Then in JMeter:\n\n```\nHTTP Request sampler:\n  Name: Submit Leave Request\n  Method: POST\n  Server Name: hrms.bizlevate.com\n  Port: 443\n  Protocol: https\n  Path: /api/v1/leave/apply\n\nBody Data (raw JSON):\n  {\n    \"employeeId\": \"EMP1042\",\n    \"leaveType\": \"sick\",\n    \"startDate\": \"2026-09-25\",\n    \"endDate\": \"2026-09-26\",\n    \"reason\": \"Medical appointment\"\n  }\n```\n\n## Headers and auth as later tree pieces\n\nBecause most modern APIs expect a `Content-Type: application/json` header, you'd also add an HTTP Header Manager as a child element under this sampler (or higher up the tree if it should apply to multiple requests — recall the scoping rule from Part 1). If the endpoint requires authentication, you'd typically add a separate sampler earlier in the tree to log in and capture the auth token (using a Post-Processor extractor, covered in Part 5), then reference that token as a variable in this request's headers — e.g., `Authorization: Bearer ${authToken}`.\n\n## What unit are you measuring?\n\nIt's worth explicitly naming the mental shift here versus recording: when you build manually, you are the one deciding what constitutes a meaningful \"unit\" of load-testable work — is it just this one endpoint in isolation, or should it be wrapped with the login flow that precedes it in real usage? That decision directly shapes what your Thread Group actually measures, and it's a design judgment call you'll make constantly throughout the rest of this manual, especially once Transaction Controllers (Part 4) let you group related requests into named logical units for reporting.",
  "blocks": [
    {
      "id": "jm-2-2-md-0",
      "type": "overview",
      "heading": "Prefer hand-built API samplers",
      "content": "For most real testing work — and especially for API-focused performance testing on something like the HRM or TADA systems where you already know the endpoint contracts from your QA/BA work — building the HTTP Request sampler by hand is more common and more reliable than recording, because you have full intentional control over exactly which calls are included and why.\n\nThe manual build process starts the same way regardless of what you're testing: add a Thread Group to your Test Plan, then right-click it to add a Sampler → HTTP Request. From there, you fill in the fields you learned in Part 1 — Method, Server, Port, Path — but now let's walk through building a complete, realistic example end-to-end, the way you'd actually do it for testing an HRM endpoint.",
      "order": 0
    },
    {
      "id": "jm-2-2-md-1",
      "type": "overview",
      "heading": "Example — submit leave request",
      "content": "Say you want to load-test the \"submit leave request\" endpoint. You'd first confirm the endpoint contract (method, URL, required headers, body shape) the same way you would before writing a Playwright API test — from API documentation, Postman collection, or by inspecting a real request in browser DevTools. Then in JMeter:\n\n```\nHTTP Request sampler:\n  Name: Submit Leave Request\n  Method: POST\n  Server Name: hrms.bizlevate.com\n  Port: 443\n  Protocol: https\n  Path: /api/v1/leave/apply\n\nBody Data (raw JSON):\n  {\n    \"employeeId\": \"EMP1042\",\n    \"leaveType\": \"sick\",\n    \"startDate\": \"2026-09-25\",\n    \"endDate\": \"2026-09-26\",\n    \"reason\": \"Medical appointment\"\n  }\n```",
      "order": 1
    },
    {
      "id": "jm-2-2-md-2",
      "type": "overview",
      "heading": "Headers and auth as later tree pieces",
      "content": "Because most modern APIs expect a `Content-Type: application/json` header, you'd also add an HTTP Header Manager as a child element under this sampler (or higher up the tree if it should apply to multiple requests — recall the scoping rule from Part 1). If the endpoint requires authentication, you'd typically add a separate sampler earlier in the tree to log in and capture the auth token (using a Post-Processor extractor, covered in Part 5), then reference that token as a variable in this request's headers — e.g., `Authorization: Bearer ${authToken}`.",
      "order": 2
    },
    {
      "id": "jm-2-2-md-3",
      "type": "overview",
      "heading": "What unit are you measuring?",
      "content": "It's worth explicitly naming the mental shift here versus recording: when you build manually, you are the one deciding what constitutes a meaningful \"unit\" of load-testable work — is it just this one endpoint in isolation, or should it be wrapped with the login flow that precedes it in real usage? That decision directly shapes what your Thread Group actually measures, and it's a design judgment call you'll make constantly throughout the rest of this manual, especially once Transaction Controllers (Part 4) let you group related requests into named logical units for reporting.",
      "order": 3
    }
  ],
  "advantages": [
    "2.2 Manually Building an HTTP Request — Manual build forces an intentional measurement unit."
  ],
  "limitations": [
    "2.2 Manually Building an HTTP Request is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
