/** Chapter body for /manuals/postman-api. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "postman-api",
  "title": "Postman & API Exploration",
  "tagline": "Collections, environments, and assertions before you automate.",
  "category": "automation",
  "accent": "#F97316",
  "cover": "covers/api-testing-cover.png",
  "duration": "2–5 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "QA and devs who need to explore APIs fast and share requests.",
  "outcomes": [
    "Organize collections",
    "Use environments",
    "Write basic tests"
  ],
  "pace": {
    "hoursPerDay": "45–90 min/day",
    "recommended": "~3–5 weeks",
    "accelerated": "~2 weeks",
    "slow": "~6–8 weeks"
  },
  "chapters": [
    {
      "id": "pm-intro",
      "phase": "Start",
      "level": "beginner",
      "title": "Requests & collections",
      "minutes": 30,
      "overview": "GET/POST in Postman, save into a collection, name things clearly.",
      "learn": [
        "Methods",
        "Collections",
        "Examples"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "A collection is a folder of requests you can share and run together.",
          "learnMore": "Save examples of successful responses for teammates.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://learning.postman.com/docs/getting-started/overview/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Collections are for…",
            "options": [
              "Hiding errors",
              "Grouping and sharing requests",
              "Replacing git",
              "Only GraphQL"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Postman requests.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Hit a public API (e.g. JSONPlaceholder) and save 3 requests.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Postman requests\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Postman requests.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "3 requests saved"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "GET/POST in Postman, save into a collection, name things clearly.",
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
      "id": "pm-env",
      "phase": "Core",
      "level": "beginner",
      "title": "Environments & variables",
      "minutes": 35,
      "overview": "baseUrl and tokens per env — never hardcode secrets in shared collections.",
      "learn": [
        "env vars",
        "Secrets",
        "{{baseUrl}}"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Environments swap baseUrl and credentials between local/staging/prod.",
          "learnMore": "Use secret type for tokens. Don’t commit real prod keys.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://learning.postman.com/docs/sending-requests/variables/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Best place for an API token…",
            "options": [
              "In the collection name",
              "Environment secret variable",
              "A public gist",
              "Screenshot"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Environments.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Create local + staging envs and parameterize URLs.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Environments\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Environments.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Two envs work"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "baseUrl and tokens per env — never hardcode secrets in shared collections.",
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
      "id": "pm-tests",
      "phase": "Core",
      "level": "intermediate",
      "title": "Tests & monitors",
      "minutes": 40,
      "overview": "pm.test assertions and collection runner basics.",
      "learn": [
        "pm.test",
        "Runner",
        "Newman intro"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Assert status and JSON fields in the Tests tab so regressions show up in the runner.",
          "learnMore": "Newman runs collections in CI — same idea as Playwright smoke.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://learning.postman.com/docs/writing-scripts/test-scripts/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "pm.test runs…",
            "options": [
              "Only in production browsers",
              "After the response returns",
              "Instead of sending",
              "On CSS only"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Postman tests.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Add status + schema-ish asserts to two requests.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "pm.test(\"status 200\", () => pm.response.to.have.status(200))",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Postman tests.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Runner green on happy path"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "pm.test assertions and collection runner basics.",
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
