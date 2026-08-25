/** Chapter body for /manuals/data-viz-basics. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "data-viz-basics",
  "title": "Data Visualization Basics",
  "tagline": "Charts that tell the truth — pick the right mark, encode carefully, cut chartjunk.",
  "category": "foundations",
  "accent": "#0369A1",
  "cover": "covers/sql-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Analysts, PMs, and builders who ship dashboards people actually understand.",
  "outcomes": [
    "Match chart type to question",
    "Avoid misleading axes",
    "Annotate the takeaway"
  ],
  "pace": {
    "hoursPerDay": "30–60 min/day",
    "recommended": "~2–4 weeks",
    "accelerated": "~10 days",
    "slow": "~6 weeks"
  },
  "chapters": [
    {
      "id": "viz-q",
      "phase": "Start",
      "level": "beginner",
      "title": "Start from the question",
      "minutes": 25,
      "overview": "Comparison, composition, distribution, relationship — each wants a different chart.",
      "learn": [
        "Question types",
        "Marks"
      ],
      "steps": [
        {
          "title": "Question → chart",
          "body": "Compare categories → bars. Trend over time → line. Parts of whole → careful with pies. Correlation → scatter.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": {
            "question": "Best default for comparing categories?",
            "options": [
              "3D pie",
              "Bar chart",
              "Exploding donut",
              "Word cloud"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Rewrite one chart title as the question it answers.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One chart retitled as a question"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Comparison, composition, distribution, relationship — each wants a different chart.",
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
      "id": "viz-encode",
      "phase": "Craft",
      "level": "beginner",
      "title": "Encode without lying",
      "minutes": 35,
      "overview": "Start axes at zero for bars. Don’t dual-axis without labeling. Color is for meaning, not decoration.",
      "learn": [
        "Axes",
        "Color",
        "Annotation"
      ],
      "steps": [
        {
          "title": "Honest axes",
          "body": "Truncated bar axes exaggerate differences. Dual axes confuse. Prefer small multiples.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Find one chart online and note how it could mislead.",
          "tip": "Put the insight in a one-line annotation.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Less ink, more signal",
          "body": "Drop gridlines you don’t need. Label directly. Sort bars by value.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Redesign one busy chart on paper in 5 minutes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Misleading example noted",
        "One redesign sketch"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Start axes at zero for bars. Don’t dual-axis without labeling. Color is for meaning, not decoration.",
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
