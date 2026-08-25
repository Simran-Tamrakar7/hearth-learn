/** Chapter body for /manuals/docker-qa. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "docker-qa",
  "title": "Docker for QA",
  "tagline": "Reproducible environments so “works on my machine” dies quietly.",
  "category": "quality",
  "accent": "#145C4A",
  "cover": "covers/cicd-cover.png",
  "duration": "2–3 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "Testers who need local stacks, CI parity, and less env thrash.",
  "outcomes": [
    "Run a service stack with Compose",
    "Understand images, volumes, and networking enough to debug",
    "Use containers in test pipelines thoughtfully"
  ],
  "chapters": [
    {
      "id": "dk-why",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "Why containers help QA",
      "minutes": 20,
      "overview": "Same bits everywhere. Isolate dependencies. Spin up DBs without polluting your laptop forever.",
      "learn": [
        "Image vs container",
        "When not to containerize"
      ],
      "steps": [
        {
          "title": "Mental model",
          "body": "Image = recipe. Container = running instance. Volume = durable data.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Explain the three terms to a rubber duck in writing.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Terms clear",
        "One use-case for your team named"
      ],
      "links": [
        {
          "name": "Docker overview",
          "url": "https://docs.docker.com/get-started/overview/",
          "kind": "doc"
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Same bits everywhere. Isolate dependencies. Spin up DBs without polluting your laptop forever.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "dk-compose",
      "phase": "A · Hands-on",
      "level": "beginner",
      "title": "Compose a test stack",
      "minutes": 40,
      "overview": "docker compose up should be the onboarding sentence for your test env.",
      "learn": [
        "compose.yml",
        "Ports & healthchecks",
        "Logs"
      ],
      "steps": [
        {
          "title": "Bring something up",
          "body": "Use a sample stack (web + db) or your team’s compose file.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "compose up, hit a health endpoint, compose down.",
          "tip": "Read logs before restarting blindly.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Stack started cleanly",
        "I can find logs"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "docker compose up should be the onboarding sentence for your test env.",
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
      "id": "dk-debug",
      "phase": "A · Hands-on",
      "level": "intermediate",
      "title": "Debug like a grown-up",
      "minutes": 35,
      "overview": "exec into containers, check networks, reset volumes without panic.",
      "learn": [
        "docker exec",
        "Networks",
        "Volume gotchas"
      ],
      "steps": [
        {
          "title": "Break and fix",
          "body": "Wrong env var or port clash. Diagnose with ps, logs, and inspect.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document the failure mode and the fix in three bullets.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Used exec or logs to diagnose",
        "Wrote the three-bullet postmortem"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "exec into containers, check networks, reset volumes without panic.",
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
      "id": "dk-cp",
      "kind": "checkpoint",
      "phase": "B · CI mindset",
      "level": "intermediate",
      "title": "Checkpoint: reproducible demo",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Hand someone a README: clone, compose up, run one test command, compose down.",
      "learn": [
        "Onboarding clarity"
      ],
      "steps": [
        {
          "title": "README or it didn’t happen",
          "body": "Prereqs, commands, expected output, teardown.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Get a peer to follow it without Slack help.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Peer succeeded from README",
        "Teardown documented"
      ],
      "practice": {
        "title": "Peer dry-run",
        "brief": "Complete the checkpoint with a friend or future-you tomorrow."
      },
      "parentId": null,
      "overviewText": "Hand someone a README: clone, compose up, run one test command, compose down.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "Docker docs",
        "url": "https://docs.docker.com/"
      },
      {
        "name": "Compose specification",
        "url": "https://docs.docker.com/compose/compose-file/"
      }
    ],
    "tools": [
      "Docker Desktop / Engine",
      "Dive (optional)"
    ],
    "books": [],
    "practice": [
      "https://docs.docker.com/get-started/"
    ],
    "videos": []
  }
};
