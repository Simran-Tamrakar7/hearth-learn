import type { ChapterRecord } from "../../../types";

/** 1.3 Samplers (HTTP Request Being the Main One) */
export const chapter = {
  "id": "jm-1-3-samplers-http-request-being-the-main-one",
  "title": "1.3 Samplers (HTTP Request Being the Main One)",
  "minutes": 26,
  "level": "beginner",
  "phase": "Part 1 · Core Building Blocks",
  "partName": "Part 1 · Core Building Blocks",
  "overviewText": "Samplers are where actual network traffic gets generated — the doing part of the test. The HTTP Request sampler is what you'll use for the overwhelming majority of web and API load testing. A sampler only sends and records; it does not assert success the way Playwright expect() does.",
  "why": "Hardcoded employee IDs and missing assertions make a 'green' sampler lie. ${variable} and ${__time()} are how you stop all 100 threads from being the same person.",
  "when": "Building any REST call (leave apply, attendance check-in) and whenever you assume a green icon means the leave row was created.",
  "practical": {
    "app": "POST /api/v1/attendance/checkin",
    "scenario": "You add an HTTP Request for check-in with a JSON body.",
    "pass": "You fill Protocol/Server/Port/Method/Path/Body, use ${employeeId} and ${__time()}, and plan a nested Assertion (Part 4) — sampler ≠ expect().",
    "fail": "You treat a 200 as success with no body check, or send the same EMP1042 from every thread."
  },
  "tools": [],
  "customSummary": "- Samplers = the \"doing\" part; HTTP Request is the dominant sampler for web/API load testing.\n- Core fields: Protocol, Server, Port, Method, Path, Body Data/Parameters.\n- Uses ${variable} syntax for parameterization and ${__function()} syntax for dynamic values (timestamps, UUIDs).\n- Sampler only sends/records — it does NOT assert success; that's a separate nested Assertion element (unlike Playwright's inline expect()).",
  "contentMarkdown": "## HTTP Request fields\n\nSamplers are where actual network traffic gets generated — the \"doing\" part of the test, equivalent to the `page.click()` or `request.post()` calls in Playwright. While JMeter supports dozens of sampler types, the HTTP Request sampler is what you'll use for the overwhelming majority of web and API load testing, since most modern applications — including something like the HRM system's REST endpoints — communicate over HTTP/HTTPS.\n\nAn HTTP Request sampler's core fields are: Protocol (http/https), Server Name or IP, Port, Method (GET, POST, PUT, DELETE, PATCH, etc.), and Path (the endpoint, e.g., `/api/employees/attendance`). For methods that send a body (POST/PUT/PATCH), you have a \"Body Data\" tab where you paste raw JSON, or a \"Parameters\" tab for form-encoded data — this maps directly to what you already know from API testing with Playwright's request fixture or Postman, just represented as GUI fields instead of code.\n\nExample HTTP Request sampler:\n\n```\nMethod: POST\nServer: api.bizlevate.com\nPort: 443\nProtocol: https\nPath: /api/v1/attendance/checkin\nBody Data:\n  {\n    \"employeeId\": \"${employeeId}\",\n    \"timestamp\": \"${__time()}\"\n  }\n```\n\n## Variables and functions\n\nNote the `${employeeId}` and `${__time()}` syntax above — these are JMeter Variables and Functions respectively. Variables let you parameterize requests (tying directly into CSV Data Set Config in Part 3, where you'd feed in hundreds of different employee IDs so each virtual user simulates a different real employee rather than all 100 threads hitting the API as the exact same person, which would be unrealistic and could also trigger false duplicate-detection logic on the backend). Functions like `__time()` are built-in dynamic value generators (timestamps, random numbers, UUIDs) — conceptually similar to using faker.js or `Date.now()` inline in a Playwright test.\n\n## Playwright equivalent — and the assertion split\n\n```js\nconst response = await request.post('https://api.bizlevate.com/api/v1/attendance/checkin', {\n  data: { employeeId: employeeId, timestamp: Date.now() }\n});\nexpect(response.status()).toBe(200);\n```\n\nThe functional intent is identical — POST a body to an endpoint and check the outcome — but JMeter's HTTP Request sampler on its own only sends the request and records timing/status; it doesn't inherently \"assert\" success the way `expect()` does. That's the job of Assertions (Part 4), which you attach as child elements under the sampler. This separation (sampler = action, assertion = verification, both as separate tree nodes) is a deliberate JMeter design pattern that differs from Playwright's inline assertion style, and it's worth getting comfortable with early since nearly every sampler you build from here on will have assertions and extractors nested beneath it.",
  "blocks": [
    {
      "id": "jm-1-3-md-0",
      "type": "overview",
      "heading": "HTTP Request fields",
      "content": "Samplers are where actual network traffic gets generated — the \"doing\" part of the test, equivalent to the `page.click()` or `request.post()` calls in Playwright. While JMeter supports dozens of sampler types, the HTTP Request sampler is what you'll use for the overwhelming majority of web and API load testing, since most modern applications — including something like the HRM system's REST endpoints — communicate over HTTP/HTTPS.\n\nAn HTTP Request sampler's core fields are: Protocol (http/https), Server Name or IP, Port, Method (GET, POST, PUT, DELETE, PATCH, etc.), and Path (the endpoint, e.g., `/api/employees/attendance`). For methods that send a body (POST/PUT/PATCH), you have a \"Body Data\" tab where you paste raw JSON, or a \"Parameters\" tab for form-encoded data — this maps directly to what you already know from API testing with Playwright's request fixture or Postman, just represented as GUI fields instead of code.\n\nExample HTTP Request sampler:\n\n```\nMethod: POST\nServer: api.bizlevate.com\nPort: 443\nProtocol: https\nPath: /api/v1/attendance/checkin\nBody Data:\n  {\n    \"employeeId\": \"${employeeId}\",\n    \"timestamp\": \"${__time()}\"\n  }\n```",
      "order": 0
    },
    {
      "id": "jm-1-3-md-1",
      "type": "overview",
      "heading": "Variables and functions",
      "content": "Note the `${employeeId}` and `${__time()}` syntax above — these are JMeter Variables and Functions respectively. Variables let you parameterize requests (tying directly into CSV Data Set Config in Part 3, where you'd feed in hundreds of different employee IDs so each virtual user simulates a different real employee rather than all 100 threads hitting the API as the exact same person, which would be unrealistic and could also trigger false duplicate-detection logic on the backend). Functions like `__time()` are built-in dynamic value generators (timestamps, random numbers, UUIDs) — conceptually similar to using faker.js or `Date.now()` inline in a Playwright test.",
      "order": 1
    },
    {
      "id": "jm-1-3-md-2",
      "type": "overview",
      "heading": "Playwright equivalent — and the assertion split",
      "content": "```js\nconst response = await request.post('https://api.bizlevate.com/api/v1/attendance/checkin', {\n  data: { employeeId: employeeId, timestamp: Date.now() }\n});\nexpect(response.status()).toBe(200);\n```\n\nThe functional intent is identical — POST a body to an endpoint and check the outcome — but JMeter's HTTP Request sampler on its own only sends the request and records timing/status; it doesn't inherently \"assert\" success the way `expect()` does. That's the job of Assertions (Part 4), which you attach as child elements under the sampler. This separation (sampler = action, assertion = verification, both as separate tree nodes) is a deliberate JMeter design pattern that differs from Playwright's inline assertion style, and it's worth getting comfortable with early since nearly every sampler you build from here on will have assertions and extractors nested beneath it.",
      "order": 2
    }
  ],
  "advantages": [
    "1.3 Samplers (HTTP Request Being the Main One) — Hardcoded employee IDs and missing assertions make a 'green' sampler lie."
  ],
  "limitations": [
    "1.3 Samplers (HTTP Request Being the Main One) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
