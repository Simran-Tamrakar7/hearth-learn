/** Chapter body for /manuals/tech-writing. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "tech-writing",
  "title": "Technical Writing",
  "tagline": "Docs people finish — READMEs, RFCs, runbooks, and bug-clear explanations.",
  "category": "soft-skills",
  "accent": "#14532D",
  "cover": "covers/git-cover.png",
  "duration": "3–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "Engineers and QA who write docs, RFCs, or explanations that currently get ignored.",
  "outcomes": [
    "Write task-oriented docs with clear structure",
    "Edit for clarity, audience, and skimability",
    "Ship a README or runbook others can follow unaided"
  ],
  "chapters": [
    {
      "id": "tw-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 15,
      "durationLabel": "Day 0",
      "overview": "Pick one doc to improve or create: README, how-to, RFC, or runbook. Audience first.",
      "learn": [
        "Doc pick",
        "Audience"
      ],
      "steps": [
        {
          "title": "Audience sentence",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "“This doc helps ___ do ___ without ___.”",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Audience sentence"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Google Technical Writing courses",
          "url": "https://developers.google.com/tech-writing",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Pick one doc to improve or create: README, how-to, RFC, or runbook. Audience first.",
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
      "id": "tw-structure",
      "phase": "A · Craft",
      "level": "beginner",
      "title": "Structure for skimmers",
      "minutes": 30,
      "durationLabel": "Week 1",
      "overview": "Purpose up top. Prerequisites. Numbered steps. Expected results. Troubleshooting. Links out.",
      "learn": [
        "Inverted pyramid",
        "Headings",
        "Task orientation"
      ],
      "steps": [
        {
          "title": "Outline first",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Outline your doc with H2s only. No paragraphs yet.",
          "tip": "Prefer verbs in headings: “Rotate the API key” not “API keys.”",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "H2 outline"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Google TW — structure",
          "url": "https://developers.google.com/tech-writing/one",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Purpose up top. Prerequisites. Numbered steps. Expected results. Troubleshooting. Links out.",
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
      "id": "tw-clarity",
      "phase": "A · Craft",
      "level": "beginner",
      "title": "Clarity edits",
      "minutes": 35,
      "overview": "Short sentences. Active voice. Defined jargon. Concrete examples. Cut throat-clearing.",
      "learn": [
        "Active voice",
        "Jargon budget",
        "Examples"
      ],
      "steps": [
        {
          "title": "Edit pass",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite one page with: ≤20-word average sentence target, examples for each abstract claim.",
          "tip": null,
          "code": "Weak: The system should be configured appropriately prior to execution.\nStrong: Before you run the job, set `ENV=staging` in `.env`.",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One page clarity-edited"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Short sentences. Active voice. Defined jargon. Concrete examples. Cut throat-clearing.",
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
      "id": "tw-procedure",
      "phase": "A · Craft",
      "level": "intermediate",
      "title": "Procedures & runbooks",
      "minutes": 35,
      "overview": "Each step: action + expected result. Call out danger. Include rollback.",
      "learn": [
        "Step design",
        "Verification",
        "Rollback"
      ],
      "steps": [
        {
          "title": "Write a procedure",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "5–12 steps someone else can follow cold. Include verify + rollback.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Procedure drafted"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Each step: action + expected result. Call out danger. Include rollback.",
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
      "id": "tw-cp1",
      "kind": "checkpoint",
      "phase": "B · Test",
      "level": "intermediate",
      "title": "Checkpoint: usability test the doc",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Watch a peer follow the doc without help. Note where they stall.",
      "learn": [
        "Doc testing"
      ],
      "steps": [
        {
          "title": "Silent test",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fix the top 3 stalls. Retest once if needed.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Peer test done",
        "Three fixes"
      ],
      "parentId": null,
      "overviewText": "Watch a peer follow the doc without help. Note where they stall.",
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
      "id": "tw-rfc",
      "phase": "B · Test",
      "level": "intermediate",
      "title": "RFCs & decision docs",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "Context, options, recommendation, consequences, open questions. Invite dissent early.",
      "learn": [
        "RFC anatomy",
        "Options tables",
        "Decision recording"
      ],
      "steps": [
        {
          "title": "Mini-RFC",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 1–2 page RFC for a real or practice decision.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Context",
            "Goals / non-goals",
            "Options",
            "Recommendation",
            "Open questions"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Mini-RFC written"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Rust RFC book (structure inspiration)",
          "url": "https://rust-lang.github.io/rfcs/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Amazon narrative memos (overview)",
          "url": "https://www.aboutamazon.com/news/workplace/a-quirky-amazon-meeting-practice",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Context, options, recommendation, consequences, open questions. Invite dissent early.",
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
      "id": "tw-style",
      "phase": "C · System",
      "level": "advanced",
      "title": "Style guides & maintenance",
      "minutes": 25,
      "durationLabel": "Week 3",
      "overview": "Docs rot. Assign owners, review dates, and “last verified” stamps. A thin style guide beats chaos.",
      "learn": [
        "Ownership",
        "Style lite",
        "Deprecation"
      ],
      "steps": [
        {
          "title": "Owner + verified",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add owner and last-verified date to your doc. Calendar a re-verify.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Owner + verified stamped"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Docs rot. Assign owners, review dates, and “last verified” stamps. A thin style guide beats chaos.",
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
      "id": "tw-cp2",
      "kind": "checkpoint",
      "phase": "C · System",
      "level": "advanced",
      "title": "Checkpoint: ship the doc",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "Publish the doc in the canonical place. Announce it. Collect one usage success.",
      "learn": [
        "Adoption"
      ],
      "steps": [
        {
          "title": "Ship",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Link from README index. Ask one person to use it for real.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Published doc",
            "Peer-tested",
            "Owner/verified",
            "Announcement",
            "One success story"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All items done"
      ],
      "note": "Pace: 3–4 weeks. A followed doc beats a beautiful unread one.",
      "parentId": null,
      "overviewText": "Publish the doc in the canonical place. Announce it. Collect one usage success.",
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
        "name": "Google Technical Writing",
        "url": "https://developers.google.com/tech-writing"
      },
      {
        "name": "Write the Docs",
        "url": "https://www.writethedocs.org/guide/"
      }
    ],
    "tools": [
      "Markdown",
      "Vale / spellcheck",
      "Screenshots with callouts",
      "Doc site (MkDocs/Docusaurus)"
    ],
    "books": [
      "Docs for Developers (Bhatti et al.)",
      "The Sense of Style (Pinker) — selective"
    ],
    "practice": [
      "Peer test every how-to",
      "One RFC this month"
    ],
    "videos": [
      {
        "name": "Write the Docs videos",
        "url": "https://www.writethedocs.org/videos/"
      }
    ]
  }
};
