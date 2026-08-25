/** Chapter body for /manuals/excel-data. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "excel-data",
  "title": "Spreadsheets for QA & Analysis",
  "tagline": "Filters, pivots, and clean tables — the underrated automation skill.",
  "category": "foundations",
  "accent": "#16A34A",
  "cover": "covers/sql-cover.png",
  "duration": "2–5 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Manual QAs and PMs who live in sheets and want fewer mistakes.",
  "outcomes": [
    "Clean tabular data",
    "Pivot for insight",
    "VLOOKUP/XLOOKUP basics"
  ],
  "pace": {
    "hoursPerDay": "45–90 min/day",
    "recommended": "~3–5 weeks",
    "accelerated": "~2 weeks",
    "slow": "~6–8 weeks"
  },
  "chapters": [
    {
      "id": "sheet-tables",
      "phase": "Start",
      "level": "beginner",
      "title": "Clean tables",
      "minutes": 25,
      "overview": "One header row, no merged cells, consistent types.",
      "learn": [
        "Tables",
        "Filters",
        "Data validation"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Merged cells and mixed types break filters and pivots. Use a proper Table object.",
          "learnMore": "Validate dropdowns for status fields used in bug triage.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://support.microsoft.com/excel",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Merged cells are…",
            "options": [
              "Great for pivots",
              "Usually harmful for analysis",
              "Required for CSV",
              "A SQL feature"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Clean tables.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Convert a messy export into a filtered Table.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Clean tables\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Clean tables.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One clean Table"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "One header row, no merged cells, consistent types.",
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
      "id": "sheet-pivot",
      "phase": "Core",
      "level": "beginner",
      "title": "Pivot tables",
      "minutes": 35,
      "overview": "Summarize defects by severity/component without writing code.",
      "learn": [
        "Pivot",
        "Counts",
        "Charts"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Pivots group and aggregate. Perfect for weekly QA reports.",
          "learnMore": "Refresh when source data changes — don’t screenshot stale pivots.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://support.microsoft.com/en-us/office/create-a-pivottable-to-analyze-worksheet-data",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Pivots need…",
            "options": [
              "Merged titles",
              "Tabular source data",
              "Only images",
              "No headers"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Pivots.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Build a severity × component pivot from sample bug data.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Pivots\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Pivots.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Pivot answers one real question"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Summarize defects by severity/component without writing code.",
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
      "id": "sheet-lookup",
      "phase": "Core",
      "level": "intermediate",
      "title": "Lookups",
      "minutes": 35,
      "overview": "XLOOKUP/VLOOKUP to join id → name without a database.",
      "learn": [
        "XLOOKUP",
        "Errors",
        "When to use SQL instead"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Lookups join tables by key. Prefer XLOOKUP when available.",
          "learnMore": "If sheets become a second database, graduate to SQL/real tools.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://support.microsoft.com/en-us/office/xlookup-function",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "When sheets hurt…",
            "options": [
              "Always",
              "When multiple writers need integrity + history",
              "Never",
              "Only on Fridays"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Lookups.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Join a case-id sheet to an owner sheet.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "=XLOOKUP(A2, Owners!A:A, Owners!B:B, \"missing\")",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Lookups.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Working XLOOKUP"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "XLOOKUP/VLOOKUP to join id → name without a database.",
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
