/** Chapter body for /manuals/nocode-automation. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "nocode-automation",
  "title": "No-code Automation",
  "tagline": "Zapier & Make basics — triggers, actions, and automations that don’t need a repo.",
  "category": "automation",
  "accent": "#FF4A00",
  "cover": "covers/cicd-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Ops, founders, PMs, and anyone tired of copy-pasting between apps.",
  "outcomes": [
    "Map a workflow as trigger → filter → action",
    "Ship a Zap/Scenario safely",
    "Know when to graduate to code"
  ],
  "pace": {
    "hoursPerDay": "30–60 min/day",
    "recommended": "~2–4 weeks",
    "accelerated": "~10 days",
    "slow": "~6 weeks"
  },
  "chapters": [
    {
      "id": "nc-map",
      "phase": "Start",
      "level": "beginner",
      "title": "Map the boring work",
      "minutes": 25,
      "overview": "Good automation starts with a written flow, not a blank Zap canvas.",
      "learn": [
        "Trigger",
        "Action",
        "Happy path"
      ],
      "steps": [
        {
          "title": "Write the recipe in plain English",
          "body": "One sentence: “When X happens in App A, do Y in App B.” If you can’t say it, you can’t automate it.",
          "learnMore": "List edge cases: empty attachments, duplicate emails, weekends.",
          "image": null,
          "resources": [],
          "quiz": {
            "question": "The first step of a solid Zap is…",
            "options": [
              "Pick a fancy AI step",
              "Name the trigger and outcome in words",
              "Connect every app you own",
              "Skip filters forever"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 automations you want in that format.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Trigger → filter → action",
          "body": "Triggers start the flow. Filters stop junk. Actions do the work. Keep one Zap to one job.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://zapier.com/learn",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sketch one flow with those three boxes.",
          "tip": "Prefer “new item” triggers over polling “updated” unless you must.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three recipes written",
        "One flow sketched"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Good automation starts with a written flow, not a blank Zap canvas.",
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
      "id": "nc-build",
      "phase": "Build",
      "level": "beginner",
      "title": "Ship your first Zap/Scenario",
      "minutes": 40,
      "overview": "Connect accounts, test with sample data, then turn it on.",
      "learn": [
        "Auth",
        "Test",
        "Naming"
      ],
      "steps": [
        {
          "title": "Connect & test",
          "body": "Use sample payloads. Confirm the action created exactly one thing. Name Zaps like verbs: “Invoice → Drive”.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://www.make.com/en/help",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": {
            "prompt": "Checklist before ON",
            "code": "1. Sample run OK\n2. Filter excludes junk\n3. Error email to you\n4. Name is searchable",
            "result": "You can turn it on without fear."
          },
          "doThis": "Build one automation end-to-end.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When not to no-code",
          "body": "Complex branching, heavy transforms, or regulated data often want a script or proper backend.",
          "learnMore": "No-code is glue. Code is a factory.",
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List one workflow you’d keep human or code instead.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One live automation",
        "Error notification set"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Connect accounts, test with sample data, then turn it on.",
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
      "id": "nc-ops",
      "phase": "Steady",
      "level": "beginner",
      "title": "Keep automations healthy",
      "minutes": 30,
      "overview": "Ownership, versioning of recipes, and kill switches.",
      "learn": [
        "Ownership",
        "Logs",
        "Kill switch"
      ],
      "steps": [
        {
          "title": "Own the bot",
          "body": "Every Zap needs an owner, a purpose line, and a “turn off if…” rule.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add owner + purpose to your Zap description.",
          "tip": "Review failed runs weekly — silence is a smell.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Owner documented"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Ownership, versioning of recipes, and kill switches.",
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
