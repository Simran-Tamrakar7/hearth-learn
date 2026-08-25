/** Chapter body for /manuals/api-testing. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "api-testing",
  "title": "API Testing",
  "tagline": "Postman → Newman CI → code automation → OpenAPI contracts → security basics.",
  "category": "automation",
  "accent": "#1A535C",
  "cover": "covers/api-testing-cover.png",
  "duration": "8–10 weeks (part-time)",
  "levelSpan": "Beginner → Job-ready",
  "who": "QA and developers who want solid backend coverage — manual testers moving to API automation welcome.",
  "outcomes": [
    "Design API tests from HTTP basics through schema validation and negative cases",
    "Automate Postman collections in CI with Newman and code-based runners",
    "Apply OpenAPI contract thinking and OWASP API security smoke checks"
  ],
  "pace": {
    "hoursPerDay": "1–1.5 hours/day (≈ 7–10 hrs/week)",
    "recommended": "~8–10 weeks",
    "accelerated": "~5–6 weeks at 2–3 hrs/day",
    "slow": "~12 weeks if busy"
  },
  "chapters": [
    {
      "id": "api-how",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this roadmap",
      "minutes": 25,
      "overview": "API tests give faster feedback than UI and catch contract breaks early. This path goes Postman → Newman → code → OpenAPI → security — with checkpoints and a public portfolio repo.",
      "learn": [
        "8–10 week pacing",
        "Tools you will touch",
        "Job-ready API portfolio definition"
      ],
      "steps": [
        {
          "title": "Study pace",
          "body": "Plan 1–1.5 hours daily. API testing rewards consistency — HTTP vocabulary becomes second nature.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create api-testing-journey repo on GitHub. Block calendar for 7 days.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: ~8–10 weeks at 7–10 hrs/week",
            "Accelerated: ~5–6 weeks at 2–3 hrs/day",
            "Slow: ~12 weeks"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Lab APIs",
          "body": "JSONPlaceholder, httpbin, ReqRes, and Petstore OpenAPI are your sandboxes. Do not wait for a job to give you an API.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bookmark jsonplaceholder.typicode.com and httpbin.org. Send first GET in browser or curl.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Checkpoints",
          "body": "Gate 1: Postman collection with tests. Gate 2: Newman in CI. Gate 3: code + OpenAPI + security portfolio.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read checkpoint chapters. Copy pass criteria to README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Repo created",
        "Postman or Insomnia installed",
        "curl works in terminal"
      ],
      "practice": {
        "title": "Day zero",
        "brief": "README with goal, timeline, first commit."
      },
      "resources": [
        {
          "type": "doc",
          "name": "MDN — HTTP Overview",
          "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "JSONPlaceholder",
          "url": "https://jsonplaceholder.typicode.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "API tests give faster feedback than UI and catch contract breaks early. This path goes Postman → Newman → code → OpenAPI → security — with checkpoints and a public portfolio repo.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-http",
      "phase": "A · HTTP Foundations",
      "level": "beginner",
      "title": "HTTP vocabulary & manual exploration",
      "minutes": 55,
      "durationLabel": "Week 1",
      "overview": "Methods, status codes, headers, JSON bodies, auth headers. Explore with curl and browser DevTools before you automate — vocabulary prevents guessing.",
      "learn": [
        "GET/POST/PUT/PATCH/DELETE",
        "2xx/4xx/5xx meaning",
        "Headers: Content-Type, Authorization"
      ],
      "steps": [
        {
          "title": "Speak HTTP",
          "body": "GET reads (safe, idempotent). POST creates. PUT replaces. PATCH partial update. DELETE removes. Idempotency matters for retries.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Hit httpbin.org/get with curl. Inspect response headers and JSON body.",
          "tip": null,
          "code": "curl -i https://httpbin.org/get\ncurl -X POST https://httpbin.org/post -H \"Content-Type: application/json\" -d '{\"name\":\"qa\"}'",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Status codes that matter",
          "body": "200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 422 Validation, 500 Server Error.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Trigger 404 and 401 on httpbin or a public API. Write expected status for 5 scenarios.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "JSON request and response bodies",
          "body": "APIs speak JSON. Content-Type: application/json. Parse nested objects — data.user.email patterns.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "GET jsonplaceholder/users/1. List 5 JSON paths you would assert (id, name, email, etc.).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Auth basics",
          "body": "Bearer token in Authorization header. API keys in header or query (prefer header). Never commit secrets.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read httpbin.org/bearer docs. Send request with dummy Authorization header.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain 6 status codes",
        "curl GET and POST work",
        "I read JSON response paths"
      ],
      "practice": {
        "title": "HTTP cheat sheet",
        "brief": "Commit HTTP-NOTES.md: methods, codes, headers you use daily."
      },
      "resources": [
        {
          "type": "doc",
          "name": "MDN — HTTP Methods",
          "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "httpbin.org",
          "url": "https://httpbin.org/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "JSONPlaceholder Guide",
          "url": "https://jsonplaceholder.typicode.com/guide/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Methods, status codes, headers, JSON bodies, auth headers. Explore with curl and browser DevTools before you automate — vocabulary prevents guessing.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-postman",
      "phase": "A · HTTP Foundations",
      "level": "beginner",
      "title": "Postman collections & environments",
      "minutes": 60,
      "durationLabel": "Week 1–2",
      "overview": "Postman is the industry default for API exploration. Collections, environments, variables, and test scripts — organized like a real QA team.",
      "learn": [
        "Collections and folders",
        "Environment variables",
        "Pre-request scripts",
        "Tests tab assertions"
      ],
      "steps": [
        {
          "title": "Build a collection",
          "body": "Folder by resource: /users, /posts. Name requests as verbs: Get User, Create Post. Variables: {{baseUrl}}, {{userId}}.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create JSONPlaceholder collection with 8 requests across users and posts.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Environment setup",
          "body": "Dev/staging/prod environments swap baseUrl without duplicating requests.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create environments local and staging (same baseUrl for lab). Switch and re-run.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Tests tab assertions",
          "body": "pm.test(\"status is 200\", () => pm.response.to.have.status(200)); pm.expect(json.id).to.eql(1);",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add 3 tests per request on GET user: status, content-type, body fields.",
          "tip": null,
          "code": "pm.test(\"Status is 200\", function () {\n  pm.response.to.have.status(200);\n});\npm.test(\"User has email\", function () {\n  var json = pm.response.json();\n  pm.expect(json.email).to.include(\"@\");\n});",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Chain variables",
          "body": "Create post → save id from response → use in GET /posts/{{postId}}.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "POST new post, parse pm.response.json().id into pm.environment.set(\"postId\", id).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Collection with 8+ requests",
        "Environment with baseUrl",
        "Tests on every request"
      ],
      "practice": {
        "title": "CRUD folder",
        "brief": "Full CRUD on /posts: create, read, update, delete with chained postId."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Postman Learning Center",
          "url": "https://learning.postman.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Postman — Writing Tests",
          "url": "https://learning.postman.com/docs/tests-and-scripts/test-scripts/test-examples/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Postman is the industry default for API exploration. Collections, environments, variables, and test scripts — organized like a real QA team.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-negative",
      "phase": "B · Test Design",
      "level": "intermediate",
      "title": "Negative tests & edge cases",
      "minutes": 55,
      "durationLabel": "Week 2–3",
      "overview": "Happy paths are table stakes. Pro API testers ship negative cases: invalid payloads, missing auth, wrong methods, boundary values.",
      "learn": [
        "Negative case categories",
        "Error body assertions",
        "Boundary testing"
      ],
      "steps": [
        {
          "title": "Negative categories",
          "body": "Invalid JSON, missing required fields, wrong types, unauthorized, forbidden, not found, method not allowed.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add 5 negative requests to collection. Assert 4xx status AND error message shape.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Assert error contracts",
          "body": "Errors should be predictable: { \"error\": \"...\", \"code\": \"...\" }. Assert keys exist, not just status.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document expected error schema for 401 and 404 in ERROR-CONTRACTS.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Boundary values",
          "body": "Empty string, max length, zero, negative numbers, special characters in strings.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Test POST with empty title, 10k character body (if API allows), invalid email format.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Test data isolation",
          "body": "Unique titles with timestamp prevent collisions. Delete in teardown or use disposable resources.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pre-request script: pm.environment.set(\"uniqueTitle\", \"post-\" + Date.now());",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "5+ negative tests",
        "Error body assertions",
        "Unique data per run"
      ],
      "practice": {
        "title": "Negative matrix",
        "brief": "Table in NEGATIVE-TESTS.md: scenario, request, expected status, expected body keys."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Postman — Test Scripts",
          "url": "https://learning.postman.com/docs/tests-and-scripts/test-scripts/intro-to-test-scripts/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "ReqRes API",
          "url": "https://reqres.in/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Happy paths are table stakes. Pro API testers ship negative cases: invalid payloads, missing auth, wrong methods, boundary values.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-checkpoint-a",
      "kind": "checkpoint",
      "phase": "B · Test Design",
      "level": "intermediate",
      "title": "Checkpoint A — Postman collection portfolio",
      "minutes": 30,
      "durationLabel": "Gate",
      "overview": "Prove Postman mastery before CI and code chapters.",
      "learn": [
        "Collection checkpoint criteria"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "Export and commit collection JSON to repo.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify all items.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Collection: 15+ requests with folders",
            "Every request has 2+ tests in Tests tab",
            "5+ negative / edge case tests",
            "Environment file exported",
            "Chained create → read flow works",
            "Collection exported to repo postman/"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All criteria met",
        "Collection runs green in Postman runner"
      ],
      "practice": {
        "title": "Export commit",
        "brief": "git add postman/*.json with clear commit message."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Postman — Export Collections",
          "url": "https://learning.postman.com/docs/getting-started/importing-and-exporting/exporting-data/",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Prove Postman mastery before CI and code chapters.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-newman",
      "phase": "C · Automation & CI",
      "level": "intermediate",
      "title": "Newman — CLI & GitHub Actions",
      "minutes": 60,
      "durationLabel": "Week 3–4",
      "overview": "Collections that only run in Postman GUI are hobbies. Newman runs them headless in CI on every PR.",
      "learn": [
        "newman run",
        "Reporters (cli, htmlextra)",
        "CI integration",
        "Secrets in CI"
      ],
      "steps": [
        {
          "title": "Newman local",
          "body": "npm install -g newman (or npx newman). newman run collection.json -e environment.json.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run collection locally via Newman. Fix any failures Postman runner hid.",
          "tip": null,
          "code": "npm install newman newman-reporter-htmlextra --save-dev\nnpx newman run postman/collection.json -e postman/environment.json",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "HTML report",
          "body": "newman-reporter-htmlextra gives shareable reports — attach to CI artifacts.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Generate HTML report. Open and find a failed assertion in under 30 seconds.",
          "tip": null,
          "code": "npx newman run postman/collection.json -r htmlextra --reporter-htmlextra-export reports/api-report.html",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "GitHub Actions",
          "body": "Run Newman on pull_request. Upload report on failure.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add .github/workflows/api-tests.yml. Green on main.",
          "tip": null,
          "code": "name: API Tests\non: [push, pull_request]\njobs:\n  newman:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n      - run: npm ci\n      - run: npx newman run postman/collection.json -e postman/environment.json -r cli,htmlextra\n      - uses: actions/upload-artifact@v4\n        if: failure()\n        with:\n          name: newman-report\n          path: newman/",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Secrets for real APIs",
          "body": "GitHub Secrets for API_KEY. Never hardcode in collection — use {{apiKey}} from env.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document secret setup in README even if lab API needs no key.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Newman green locally",
        "CI workflow green",
        "Report artifact on failure"
      ],
      "practice": {
        "title": "Break and fix CI",
        "brief": "Intentional test failure on branch. Confirm CI fails and uploads report."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Newman CLI",
          "url": "https://learning.postman.com/docs/collections/using-newman-cli/command-line-integration-with-newman/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "GitHub Actions — Encrypted Secrets",
          "url": "https://docs.github.com/en/actions/security-guides/encrypted-secrets",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Collections that only run in Postman GUI are hobbies. Newman runs them headless in CI on every PR.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-code",
      "phase": "C · Automation & CI",
      "level": "intermediate",
      "title": "Code-based API automation",
      "minutes": 70,
      "durationLabel": "Week 4–6",
      "overview": "Postman scales to a point; code scales further. Automate with Python requests, JavaScript fetch/axios, or Playwright APIRequestContext — pick one stack.",
      "learn": [
        "requests / fetch patterns",
        "pytest or Jest structure",
        "Setup and teardown",
        "Assertions on JSON"
      ],
      "steps": [
        {
          "title": "Pick your stack",
          "body": "Python: requests + pytest. JS: fetch + Jest/Vitest. Playwright: request fixture for hybrid UI+API teams.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Install stack. One test: GET users/1, assert status 200 and email contains @.",
          "tip": null,
          "code": "# Python + pytest + requests\nimport requests\n\ndef test_get_user():\n    r = requests.get(\"https://jsonplaceholder.typicode.com/users/1\")\n    assert r.status_code == 200\n    assert \"@\" in r.json()[\"email\"]",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CRUD test module",
          "body": "test_create_post, test_get_post, test_update_post, test_delete_post — isolated, order-independent.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Automate full CRUD for /posts. Use unique title per run.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Fixtures for base URL and session",
          "body": "conftest.py or beforeAll sets base_url and auth headers once.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Extract BASE_URL from env var. Document in README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When Postman vs code",
          "body": "Postman: exploration, manual QA, quick sharing. Code: CI-native, version control, complex logic, hybrid suites.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write TOOLING.md: when your team uses Postman vs code (2 paragraphs).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "5+ code tests green",
        "CRUD automated",
        "BASE_URL from env"
      ],
      "practice": {
        "title": "Hybrid awareness",
        "brief": "Read Playwright API testing doc. Sketch one UI test that seeds via API."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Playwright — API Testing",
          "url": "https://playwright.dev/docs/api-testing",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Python requests",
          "url": "https://requests.readthedocs.io/en/latest/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "pytest",
          "url": "https://docs.pytest.org/en/stable/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Postman scales to a point; code scales further. Automate with Python requests, JavaScript fetch/axios, or Playwright APIRequestContext — pick one stack.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-openapi",
      "phase": "D · Contracts",
      "level": "intermediate",
      "title": "OpenAPI, schemas & contract testing",
      "minutes": 65,
      "durationLabel": "Week 6–7",
      "overview": "OpenAPI (Swagger) describes API contracts. Validate responses against schemas — catch drift before production.",
      "learn": [
        "OpenAPI structure",
        "JSON Schema validation",
        "Contract vs E2E",
        "Consumer-driven contracts intro"
      ],
      "steps": [
        {
          "title": "Read an OpenAPI spec",
          "body": "paths, components/schemas, responses. Petstore is the hello world.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Open swagger.io petstore spec. Map 3 endpoints to tests you already wrote.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "JSON Schema validation",
          "body": "Assert response matches schema — required fields, types, enums. jsonschema library (Python) or ajv (JS).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Validate GET /users/1 response against a hand-written JSON Schema.",
          "tip": null,
          "code": "import jsonschema\nschema = {\"type\": \"object\", \"required\": [\"id\", \"email\"], \"properties\": {\"id\": {\"type\": \"number\"}, \"email\": {\"type\": \"string\"}}}\njsonschema.validate(instance=response.json(), schema=schema)",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Contract testing concept",
          "body": "Consumer defines expected shape. Provider verifies. Pact and similar tools — know the idea for interviews.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write CONTRACTS.md: what your tests guarantee about API shape.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "OpenAPI diff awareness",
          "body": "Breaking changes: removed fields, type changes, new required fields. CI can diff specs on PR.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read about openapi-diff or oasdiff. Note 3 breaking change examples.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Schema validation on 2 endpoints",
        "CONTRACTS.md written",
        "I can explain contract vs E2E"
      ],
      "practice": {
        "title": "Schema break drill",
        "brief": "Remove required field from schema temporarily. Confirm test fails. Restore."
      },
      "resources": [
        {
          "type": "doc",
          "name": "OpenAPI Specification",
          "url": "https://swagger.io/specification/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "Swagger Petstore",
          "url": "https://petstore.swagger.io/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "JSON Schema",
          "url": "https://json-schema.org/learn/getting-started-step-by-step",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "OpenAPI (Swagger) describes API contracts. Validate responses against schemas — catch drift before production.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-security",
      "phase": "D · Contracts",
      "level": "advanced",
      "title": "OWASP API security smoke tests",
      "minutes": 60,
      "durationLabel": "Week 7–8",
      "overview": "API security is not optional. OWASP API Top 10 gives a checklist — broken auth, excessive data exposure, rate limits, injection.",
      "learn": [
        "OWASP API Top 10 overview",
        "AuthZ vs AuthN tests",
        "IDOR probes",
        "Security smoke in CI"
      ],
      "steps": [
        {
          "title": "OWASP API Top 10 skim",
          "body": "Broken Object Level Authorization (BOLA/IDOR), broken auth, excessive data exposure, lack of rate limiting.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List Top 10. Pick 5 relevant to REST APIs you test.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "AuthZ probe",
          "body": "Call endpoint as User A with User B resource id. Expect 403, not 200 with wrong data.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "If lab API supports auth, test wrong-role access. Else document probe pattern in SECURITY-SMOKE.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Sensitive data in responses",
          "body": "Passwords, tokens, internal IDs should not leak. Assert response excludes forbidden keys.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add test: user response must not contain password or passwordHash field.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Security smoke in suite",
          "body": "5–10 security smokes run every CI — not full pentest, but catch obvious regressions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add security/ folder with 3 smoke tests or Postman folder. Document scope.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SECURITY-SMOKE.md with 5 checks",
        "3 security tests in suite",
        "AuthZ pattern documented"
      ],
      "practice": {
        "title": "IDOR write-up",
        "brief": "Explain IDOR in 3 sentences with example URL pattern."
      },
      "resources": [
        {
          "type": "doc",
          "name": "OWASP API Security Top 10",
          "url": "https://owasp.org/API-Security/editions/2023/en/0x00-header/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "OWASP REST Security Cheat Sheet",
          "url": "https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "API security is not optional. OWASP API Top 10 gives a checklist — broken auth, excessive data exposure, rate limits, injection.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-graphql",
      "phase": "E · Advanced",
      "level": "advanced",
      "title": "GraphQL testing basics",
      "minutes": 45,
      "durationLabel": "Week 8",
      "overview": "Many teams use GraphQL. Testing differs from REST — queries, mutations, errors array, and no over-fetching assertions.",
      "learn": [
        "Query vs mutation",
        "GraphQL errors format",
        "Postman GraphQL",
        "When REST vs GraphQL tests differ"
      ],
      "steps": [
        {
          "title": "First GraphQL query",
          "body": "POST to /graphql with { \"query\": \"{ users { id name } }\" }. Single endpoint, typed schema.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Use Postman GraphQL mode or curl against a public GraphQL API (e.g. SpaceX demo).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Assert data and errors",
          "body": "Response: { data: {...}, errors: [...] }. Assert both paths — partial errors are common.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Send invalid query. Assert errors array non-empty and data null or partial.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Strategy note",
          "body": "Same pyramid applies — test resolvers at unit level when possible, integration at GraphQL layer.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add GraphQL section to STRATEGY.md (half page).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One GraphQL query in Postman",
        "One error case tested",
        "STRATEGY.md updated"
      ],
      "practice": {
        "title": "Mutation test",
        "brief": "If API supports mutation, create and verify resource."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GraphQL — Official Learn",
          "url": "https://graphql.org/learn/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "lab",
          "name": "SpaceX GraphQL API",
          "url": "https://spacex-production.up.railway.app/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Many teams use GraphQL. Testing differs from REST — queries, mutations, errors array, and no over-fetching assertions.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-checkpoint-b",
      "kind": "checkpoint",
      "phase": "E · Advanced",
      "level": "advanced",
      "title": "Checkpoint B — Job-ready API portfolio",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Final gate: Postman + Newman CI + code tests + schema + security — demo-ready repo.",
      "learn": [
        "API portfolio pass criteria"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "Verify on GitHub live.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Demo in under 5 minutes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Postman collection 15+ requests exported in repo",
            "Newman green in GitHub Actions with HTML report artifact",
            "Code test suite 10+ tests (pytest or Jest)",
            "JSON Schema validation on 2+ endpoints",
            "SECURITY-SMOKE.md + 3 security tests",
            "STRATEGY.md explains API vs UI test split"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 criteria met",
        "INTERVIEW.md with API Q&A started"
      ],
      "practice": {
        "title": "Interview drill",
        "brief": "Answer: \"How do you test APIs without UI?\" from your repo."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Postman — API Testing Best Practices",
          "url": "https://learning.postman.com/docs/tests-and-scripts/test-scripts/api-testing-best-practices/",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Final gate: Postman + Newman CI + code tests + schema + security — demo-ready repo.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    }
  ]
};
