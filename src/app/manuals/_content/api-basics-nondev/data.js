/** Chapter body for /manuals/api-basics-nondev. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "api-basics-nondev",
  "title": "API Basics for Non-Developers",
  "tagline": "Requests, responses, auth, and status codes — enough to debug integrations.",
  "category": "foundations",
  "accent": "#0F766E",
  "cover": "covers/api-testing-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "PMs, support, ops, and no-code builders who live next to APIs.",
  "outcomes": [
    "Read an endpoint docs page",
    "Call an API in a client",
    "Decode common errors"
  ],
  "pace": {
    "hoursPerDay": "30–60 min/day",
    "recommended": "~2–4 weeks",
    "accelerated": "~10 days",
    "slow": "~6 weeks"
  },
  "chapters": [
    {
      "id": "api-http",
      "phase": "Start",
      "level": "beginner",
      "title": "HTTP in plain words",
      "minutes": 25,
      "overview": "Client asks (request), server answers (response). Methods: GET read, POST create, PATCH update, DELETE remove.",
      "learn": [
        "Methods",
        "JSON"
      ],
      "steps": [
        {
          "title": "URL + method + body",
          "body": "GET usually has no body. POST/PATCH often send JSON. Responses are often JSON too.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": {
            "question": "GET is mainly for…",
            "options": [
              "Deleting records",
              "Reading data",
              "Logging in only",
              "Uploading videos only"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Open any public API docs and find one GET endpoint.",
          "tip": null,
          "code": "GET /customers/42\n→ 200 { \"id\": 42, \"name\": \"Ada\" }",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One GET found"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Client asks (request), server answers (response). Methods: GET read, POST create, PATCH update, DELETE remove.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-auth",
      "phase": "Build",
      "level": "beginner",
      "title": "Auth & status codes",
      "minutes": 35,
      "overview": "API keys and tokens prove who you are. Status codes tell what happened.",
      "learn": [
        "Auth",
        "Status"
      ],
      "steps": [
        {
          "title": "Keys are passwords",
          "body": "Never paste keys in public Slack or screenshots. Rotate if leaked.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://httpbin.org/",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Call a public demo API from Postman/Insomnia/Bruno.",
          "tip": "401 = who are you? 403 = I know you, but no. 404 = missing. 429 = slow down. 5xx = their problem.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One request sent"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "API keys and tokens prove who you are. Status codes tell what happened.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "api-debug",
      "phase": "Steady",
      "level": "beginner",
      "title": "Debug an integration",
      "minutes": 30,
      "overview": "Reproduce with the same headers/body. Compare docs vs what you sent. Check timestamps and idempotency.",
      "learn": [
        "Reproduce",
        "Compare"
      ],
      "steps": [
        {
          "title": "Same request twice",
          "body": "If the client fails, replay the exact request in an API client. Fix the delta.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 5-line incident note template for API failures.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Template written"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Reproduce with the same headers/body. Compare docs vs what you sent. Check timestamps and idempotency.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    }
  ]
};
