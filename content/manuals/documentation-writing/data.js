/** Chapter body for /manuals/documentation-writing. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "documentation-writing",
  "title": "Writing Better Documentation",
  "tagline": "Docs people finish — jobs-to-be-done, examples first, keep them alive.",
  "category": "ops",
  "accent": "#1D4ED8",
  "cover": "covers/communication-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Engineers, PMs, and support folks who write READMEs, runbooks, and how-tos.",
  "outcomes": [
    "Structure a how-to",
    "Write a runnable example",
    "Own a freshness date"
  ],
  "pace": {
    "hoursPerDay": "30–60 min/day",
    "recommended": "~2–4 weeks",
    "accelerated": "~10 days",
    "slow": "~6 weeks"
  },
  "chapters": [
    {
      "id": "doc-job",
      "phase": "Start",
      "level": "beginner",
      "title": "Docs serve a job",
      "minutes": 25,
      "overview": "“Install X”, “Debug Y”, “Understand Z” — pick one job per page.",
      "learn": [
        "Audience",
        "Job"
      ],
      "steps": [
        {
          "title": "One page, one job",
          "body": "Tutorials teach. How-tos accomplish. References look up. Explanations deepen. Don’t mash them.",
          "learnMore": "Diátaxis framework is a useful map.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://diataxis.fr/",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Label your last doc as tutorial / how-to / reference / explanation.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One doc labeled"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "“Install X”, “Debug Y”, “Understand Z” — pick one job per page.",
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
      "id": "doc-example",
      "phase": "Craft",
      "level": "beginner",
      "title": "Example first",
      "minutes": 35,
      "overview": "Show the happy path command or snippet before the theory.",
      "learn": [
        "Examples",
        "Failure modes"
      ],
      "steps": [
        {
          "title": "Copy-pasteable wins",
          "body": "If someone can’t paste and succeed, the doc failed. Include expected output.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "How-to skeleton",
            "code": "## Goal\n## Prerequisites\n## Steps\n## Expected result\n## If it fails",
            "result": "A page someone can finish in one sitting."
          },
          "doThis": "Rewrite one paragraph as numbered steps + expected result.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One how-to rewritten"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Show the happy path command or snippet before the theory.",
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
      "id": "doc-alive",
      "phase": "Steady",
      "level": "beginner",
      "title": "Keep docs alive",
      "minutes": 20,
      "overview": "Owner, last-reviewed date, and a link from the thing it documents.",
      "learn": [
        "Ownership",
        "Review"
      ],
      "steps": [
        {
          "title": "Stale docs are lies",
          "body": "Add “Last reviewed” and an owner. Delete pages nobody owns.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add last-reviewed + owner to one doc today.",
          "tip": "Link docs from error messages and UI empty states.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Owner + date added"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Owner, last-reviewed date, and a link from the thing it documents.",
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
