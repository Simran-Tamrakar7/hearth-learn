/** Chapter body for /manuals/data-literacy. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "data-literacy",
  "title": "Data Literacy",
  "tagline": "Metrics, dashboards, and how charts lie — so you don’t ship on vibes.",
  "category": "ops",
  "accent": "#0F5C4C",
  "cover": "covers/sql-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA, PMs, and builders who read dashboards and need healthy skepticism.",
  "outcomes": [
    "Question metrics definitions and denominators",
    "Spot chart crimes and misleading aggregates",
    "Pull simple answers with SQL or a BI tool"
  ],
  "chapters": [
    {
      "id": "dl-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 15,
      "durationLabel": "Day 0",
      "overview": "Pick one product metric people argue about (conversion, error rate, NPS). You’ll interrogate it.",
      "learn": [
        "Metric pick"
      ],
      "steps": [
        {
          "title": "Pick the metric",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write the metric name and what decision it supposedly drives.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Metric chosen"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Calling Bullshit — home",
          "url": "https://callingbullshit.org/",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Pick one product metric people argue about (conversion, error rate, NPS). You’ll interrogate it.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "dl-define",
      "phase": "A · Metrics",
      "level": "beginner",
      "title": "Definitions & denominators",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "What counts as an event? Who’s in the denominator? Timezone? Bot traffic? Ambiguity is where “lies” start.",
      "learn": [
        "Operational definitions",
        "Coverage",
        "Windows"
      ],
      "steps": [
        {
          "title": "Definition sheet",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "For your metric: numerator, denominator, filters, owner, known caveats.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Definition sheet"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "What counts as an event? Who’s in the denominator? Timezone? Bot traffic? Ambiguity is where “lies” start.",
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
      "id": "dl-charts",
      "phase": "A · Metrics",
      "level": "beginner",
      "title": "How charts lie",
      "minutes": 35,
      "overview": "Truncated axes, dual axes, cherry-picked windows, averages hiding segments, cumulative vs rate confusion.",
      "learn": [
        "Chart crimes",
        "Segment checks",
        "Base rates"
      ],
      "steps": [
        {
          "title": "Crime scene",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Find 3 public or internal charts. Label the crime (or certify clean).",
          "tip": "Always ask: compared to what?",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three chart critiques"
      ],
      "resources": [
        {
          "type": "article",
          "name": "How to Lie with Charts (concepts)",
          "url": "https://callingbullshit.org/tools.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "book",
          "name": "How to Lie with Statistics (Huff) — classic",
          "url": "https://en.wikipedia.org/wiki/How_to_Lie_with_Statistics",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Truncated axes, dual axes, cherry-picked windows, averages hiding segments, cumulative vs rate confusion.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "dl-sql",
      "phase": "B · Query",
      "level": "intermediate",
      "title": "SQL lite for truth-seeking",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "SELECT, WHERE, GROUP BY, COUNT, averages. Enough to verify a dashboard number once.",
      "learn": [
        "Aggregations",
        "Joins caution",
        "Sampling"
      ],
      "steps": [
        {
          "title": "Reproduce a number",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Match (or explain mismatch of) one dashboard figure with a query or export.",
          "tip": null,
          "code": "SELECT date_trunc('day', created_at) AS day,\n       COUNT(*) FILTER (WHERE status = 'error') AS errors,\n       COUNT(*) AS total\nFROM events\nWHERE created_at >= now() - interval '7 days'\nGROUP BY 1\nORDER BY 1;",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One number reproduced or mismatch explained"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Mode SQL tutorial",
          "url": "https://mode.com/sql-tutorial/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "PostgreSQL aggregates",
          "url": "https://www.postgresql.org/docs/current/functions-aggregate.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "SELECT, WHERE, GROUP BY, COUNT, averages. Enough to verify a dashboard number once.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "dl-cp1",
      "kind": "checkpoint",
      "phase": "B · Query",
      "level": "intermediate",
      "title": "Checkpoint: metric autopsy",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Autopsy your chosen metric: definition, chart risks, verification attempt.",
      "learn": [
        "Communication"
      ],
      "steps": [
        {
          "title": "Autopsy doc",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Share with a PM/eng. Ask what they would change.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Autopsy shared"
      ],
      "parentId": null,
      "overviewText": "Autopsy your chosen metric: definition, chart risks, verification attempt.",
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
      "id": "dl-experiment",
      "phase": "C · Decisions",
      "level": "advanced",
      "title": "Experiments & causality caution",
      "minutes": 30,
      "overview": "Correlation ≠ causation. Novelty effects, seasonality, confounds. QA can challenge “the A/B won” narratives.",
      "learn": [
        "Confounds",
        "Peeking",
        "Practical significance"
      ],
      "steps": [
        {
          "title": "Challenge a claim",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Take one causal claim at work. List 3 alternative explanations.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three alternatives listed"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Correlation ≠ causation. Novelty effects, seasonality, confounds. QA can challenge “the A/B won” narratives.",
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
      "id": "dl-qa",
      "phase": "C · Decisions",
      "level": "intermediate",
      "title": "Data quality as a bug class",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "Missing events, duplicate sends, clock skew, timezone bugs — treat analytics defects as product defects when decisions depend on them.",
      "learn": [
        "Event QA",
        "Instrumentation reviews"
      ],
      "steps": [
        {
          "title": "Instrumentation check",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "For one flow, list expected events. Verify they fire once with expected props.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Event checklist verified"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Missing events, duplicate sends, clock skew, timezone bugs — treat analytics defects as product defects when decisions depend on them.",
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
      "id": "dl-cp2",
      "kind": "checkpoint",
      "phase": "C · Decisions",
      "level": "advanced",
      "title": "Checkpoint: data skepticism kit",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "Kit: definition template, chart checklist, SQL snippet, event QA list.",
      "learn": [
        "Team habit"
      ],
      "steps": [
        {
          "title": "Publish kit",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Use the chart checklist in one meeting this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Definition template",
            "Chart crime checklist",
            "Verification query",
            "Event QA list"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Kit published",
        "Used in a meeting"
      ],
      "note": "Pace: 2–4 weeks. Skepticism with curiosity, not cynicism.",
      "parentId": null,
      "overviewText": "Kit: definition template, chart checklist, SQL snippet, event QA list.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "Calling Bullshit",
        "url": "https://callingbullshit.org/"
      },
      {
        "name": "Mode SQL tutorial",
        "url": "https://mode.com/sql-tutorial/"
      }
    ],
    "tools": [
      "Metabase / Looker / Mode / BigQuery",
      "Spreadsheet",
      "SQL client"
    ],
    "books": [
      "How to Lie with Statistics (Huff)",
      "Thinking in Bets (Duke) — selective"
    ],
    "practice": [
      "Autopsy one metric per month",
      "Event QA on every analytics-heavy feature"
    ],
    "videos": [
      {
        "name": "Calling Bullshit lectures",
        "url": "https://callingbullshit.org/videos.html"
      }
    ]
  }
};
