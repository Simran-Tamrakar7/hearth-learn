/** Chapter body for /manuals/test-planning. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "test-planning",
  "title": "Test Planning & Strategy",
  "tagline": "Risk-based plans, entry/exit criteria, and environments that match the bet.",
  "category": "quality",
  "accent": "#145C4A",
  "cover": "covers/api-testing-cover.png",
  "duration": "3–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA leads and ICs who need a plan stakeholders trust — without a 40-page binder nobody reads.",
  "outcomes": [
    "Build risk-based test strategies for a release or feature",
    "Write lean test plans with entry/exit and clear scope",
    "Reason about environments and test data constraints"
  ],
  "chapters": [
    {
      "id": "tp-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "A test plan is a decision document: what we will test, what we won’t, and why that’s acceptable. Pick an upcoming release or feature as your case.",
      "learn": [
        "Case selection",
        "Lean docs"
      ],
      "steps": [
        {
          "title": "Pick the release",
          "body": "Something with a date and stakeholders. Perfect.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write goal, ship date, and the scariest failure mode in one paragraph.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Case paragraph written"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "ISTQB — Test planning overview",
          "url": "https://istqb.org/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Ministry of Testing — Test strategy",
          "url": "https://www.ministryoftesting.com/coverage/test-strategy",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "A test plan is a decision document: what we will test, what we won’t, and why that’s acceptable. Pick an upcoming release or feature as your case.",
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
      "id": "tp-risk",
      "phase": "A · Strategy",
      "level": "beginner",
      "title": "Risk-based testing",
      "minutes": 40,
      "durationLabel": "Week 1",
      "overview": "You never have enough time. Spend it where failure hurts most: likelihood × impact, informed by change and history.",
      "learn": [
        "Risk catalog",
        "Scoring lite",
        "Coverage vs confidence"
      ],
      "steps": [
        {
          "title": "Build a risk list",
          "body": "Product risks (user harm, money, trust) and project risks (env, data, skills).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List 10 risks. Score impact and likelihood 1–5. Sort.",
          "tip": "Talk to support and on-call — they know the real dragons.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Map tests to risks",
          "body": "Each top risk needs a mitigation: test idea, monitoring, feature flag, etc.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "For top 5 risks, write the test approach in one line each.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Ten risks scored",
        "Top 5 mitigations"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Risk-based testing (MoT)",
          "url": "https://www.ministryoftesting.com/articles/risk-based-testing",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "You never have enough time. Spend it where failure hurts most: likelihood × impact, informed by change and history.",
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
      "id": "tp-strategy",
      "phase": "A · Strategy",
      "level": "intermediate",
      "title": "Strategy: levels & types",
      "minutes": 35,
      "overview": "Unit, integration, API, UI, exploratory, a11y, security, performance — choose the cheapest level that finds the risk.",
      "learn": [
        "Test pyramid judgment",
        "Shift-left/right",
        "Who owns what"
      ],
      "steps": [
        {
          "title": "Level map",
          "body": "For your feature, assign risks to levels. Avoid “everything in E2E.”",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Draw a simple pyramid/map with example tests at each level.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Unit — logic & pure functions",
            "API/contract — integrations",
            "UI E2E — critical journeys only",
            "Exploratory — unknowns & UX",
            "Prod checks — monitoring / synthetics"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Level map drawn"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Test pyramid (Fowler)",
          "url": "https://martinfowler.com/articles/practical-test-pyramid.html",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Unit, integration, API, UI, exploratory, a11y, security, performance — choose the cheapest level that finds the risk.",
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
      "id": "tp-plan",
      "phase": "B · The plan",
      "level": "intermediate",
      "title": "Lean test plan",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "Scope, risks, approach, environments, data, schedule, entry/exit, responsibilities. Keep it scannable.",
      "learn": [
        "Plan sections",
        "Living docs",
        "Sign-off lite"
      ],
      "steps": [
        {
          "title": "Draft the plan",
          "body": "2–4 pages. Link out to charters and suites instead of pasting everything.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write the plan for your case release.",
          "tip": null,
          "code": "# Test plan — <feature/release>\nScope / out of scope\nRisks & focus areas\nApproach (levels, exploratory, automation)\nEnvironments & data\nEntry / exit criteria\nSchedule & owners\nResidual risk & asks",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Draft plan complete"
      ],
      "practice": {
        "title": "Peer review",
        "brief": "Have eng + PM skim. Fix the top confusion."
      },
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Scope, risks, approach, environments, data, schedule, entry/exit, responsibilities. Keep it scannable.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "tp-entry-exit",
      "phase": "B · The plan",
      "level": "intermediate",
      "title": "Entry & exit criteria",
      "minutes": 30,
      "overview": "Entry = when testing can start honestly. Exit = when shipping risk is acceptable — not “zero bugs.”",
      "learn": [
        "Entry gates",
        "Exit / ship criteria",
        "Waivers"
      ],
      "steps": [
        {
          "title": "Write criteria",
          "body": "Build stability, data ready, known Sev-1 policy, coverage of Must journeys, stakeholder sign-off path.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish entry and exit lists. Add a waiver template for exceptions.",
          "tip": "Exit criteria without RAG honesty become theater.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Entry/exit published",
        "Waiver template exists"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Entry = when testing can start honestly. Exit = when shipping risk is acceptable — not “zero bugs.”",
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
      "id": "tp-envs",
      "phase": "B · The plan",
      "level": "intermediate",
      "title": "Environments & test data",
      "minutes": 35,
      "overview": "Wrong env = false confidence. Know prod parity gaps, secrets, PII rules, and data refresh habits.",
      "learn": [
        "Parity gaps",
        "Data strategies",
        "Service virtualization lite"
      ],
      "steps": [
        {
          "title": "Env matrix",
          "body": "What differs: versions, feature flags, third parties, volume.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Table: env × purpose × known gaps × who owns refresh.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Data plan",
          "body": "Synthetic vs anonymized prod. Seed scripts. Cleanup.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Document how you’ll get accounts/data for top 3 journeys — legally.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Env matrix",
        "Data approach for 3 journeys"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Test environments (Thoughtworks)",
          "url": "https://www.thoughtworks.com/insights/blog/testing/test-environments",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Wrong env = false confidence. Know prod parity gaps, secrets, PII rules, and data refresh habits.",
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
      "id": "tp-cp1",
      "kind": "checkpoint",
      "phase": "B · The plan",
      "level": "intermediate",
      "title": "Checkpoint: plan review",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Walk stakeholders through the plan in 15 minutes. Capture decisions.",
      "learn": [
        "Facilitation"
      ],
      "steps": [
        {
          "title": "Review meeting",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Leave with: agreed scope cuts, risk acceptance, and open asks with owners.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Review held",
        "Decisions logged"
      ],
      "parentId": null,
      "overviewText": "Walk stakeholders through the plan in 15 minutes. Capture decisions.",
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
      "id": "tp-adapt",
      "phase": "C · Operate",
      "level": "advanced",
      "title": "Living strategy & change",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "Plans rot. Update when scope shifts. Daily/weekly risk re-rank beats clinging to week-one fiction.",
      "learn": [
        "Change triggers",
        "Status of testing",
        "Lessons into next plan"
      ],
      "steps": [
        {
          "title": "Change protocol",
          "body": "When Must scope changes, re-enter planning for 30 minutes — don’t silently absorb.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 5-line change protocol for your team.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Change protocol written"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Plans rot. Update when scope shifts. Daily/weekly risk re-rank beats clinging to week-one fiction.",
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
      "id": "tp-cp2",
      "kind": "checkpoint",
      "phase": "C · Operate",
      "level": "advanced",
      "title": "Checkpoint: strategy + plan pack",
      "minutes": 50,
      "durationLabel": "Capstone",
      "overview": "Final pack: risk list, strategy map, lean plan, entry/exit, env/data matrix.",
      "learn": [
        "Portfolio of artifacts"
      ],
      "steps": [
        {
          "title": "Capstone",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Store in repo/wiki. Use it on the real release or a postmortem of a past one.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Risk-ranked list",
            "Level/strategy map",
            "Lean test plan",
            "Entry/exit + waiver",
            "Env & data matrix"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All five artifacts",
        "One real use or postmortem apply"
      ],
      "note": "Pace: 3–4 weeks. A short plan that drives decisions beats a perfect unread PDF.",
      "parentId": null,
      "overviewText": "Final pack: risk list, strategy map, lean plan, entry/exit, env/data matrix.",
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
        "name": "Practical test pyramid",
        "url": "https://martinfowler.com/articles/practical-test-pyramid.html"
      },
      {
        "name": "MoT — Test strategy",
        "url": "https://www.ministryoftesting.com/coverage/test-strategy"
      }
    ],
    "tools": [
      "Confluence / Notion",
      "Risk spreadsheet",
      "Feature flags dashboard",
      "Env inventory"
    ],
    "books": [
      "Agile Testing (Crispin & Gregory) — strategy chapters",
      "Explore It! — for exploratory sections of plans"
    ],
    "practice": [
      "Plan one real release leanly",
      "Facilitate one plan review"
    ],
    "videos": []
  }
};
