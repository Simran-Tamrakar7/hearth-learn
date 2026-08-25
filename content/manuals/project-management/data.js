/** Chapter body for /manuals/project-management. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "project-management",
  "title": "Project Management for Tech",
  "tagline": "Scope, risks, stakeholders, and status that keep delivery honest.",
  "category": "delivery",
  "accent": "#145C4A",
  "cover": "covers/problem-solving-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "Tech leads, QA leads, and ICs who suddenly own a timeline and need lightweight PM without PMP cosplay.",
  "outcomes": [
    "Frame scope, milestones, and delivery plans people can follow",
    "Run a living RAID log and risk conversations",
    "Write status that surfaces truth early"
  ],
  "chapters": [
    {
      "id": "pm-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "You are not becoming a full-time PM. You are learning enough structure to ship tech work without silent scope creep. Pick one real initiative (migration, release, tool rollout) as your case study.",
      "learn": [
        "Case study setup",
        "Artifacts you’ll produce",
        "Lightweight > heavy process"
      ],
      "steps": [
        {
          "title": "Pick the initiative",
          "body": "Something with a date, more than one person, and ambiguity. Perfect.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write: goal, success metric, hard deadline (or “none — flow”), constraints.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Initiative one-pager started"
      ],
      "practice": {
        "title": "Stakeholder list",
        "brief": "List everyone who can say yes, no, or “surprise change.”"
      },
      "resources": [
        {
          "type": "doc",
          "name": "Atlassian — Project management",
          "url": "https://www.atlassian.com/work-management/project-management",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "You are not becoming a full-time PM. You are learning enough structure to ship tech work without silent scope creep. Pick one real initiative (migration, release, tool rollout) as your case study.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pm-scope",
      "phase": "A · Frame the work",
      "level": "beginner",
      "title": "Scope that can say no",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "Scope is a boundary. In-scope / out-of-scope / later. Ambiguous scope is how timelines die.",
      "learn": [
        "In/out lists",
        "Assumptions",
        "Change control lite"
      ],
      "steps": [
        {
          "title": "Three boxes",
          "body": "Must ship / nice / explicitly out. Out-of-scope is a gift to future-you.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fill three lists for your initiative. Get a stakeholder to initial the “out” list.",
          "tip": "If everything is Must, you don’t have priorities — you have a wish.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Assumptions log",
          "body": "“API will be ready,” “legal will approve copy,” “staging mirrors prod.” Write them; invalidate early.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List 5 assumptions. Mark owner + date to validate each.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "In/out/later lists",
        "Five assumptions with owners"
      ],
      "resources": [
        {
          "type": "article",
          "name": "NN/g — Scope creep",
          "url": "https://www.nngroup.com/articles/scope-creep/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Scope is a boundary. In-scope / out-of-scope / later. Ambiguous scope is how timelines die.",
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
      "id": "pm-plan",
      "phase": "A · Frame the work",
      "level": "beginner",
      "title": "Delivery plans & milestones",
      "minutes": 40,
      "overview": "A plan is a bet with checkpoints. Prefer milestones tied to demos or decisions over Gantt vanity.",
      "learn": [
        "Milestones",
        "Dependencies",
        "Buffers",
        "Critical path intuition"
      ],
      "steps": [
        {
          "title": "Milestone map",
          "body": "Each milestone = something visible (demo, migration complete, flag on). Dates are hypotheses.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create 4–6 milestones with exit criteria for each.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Kickoff / aligned scope",
            "Thin vertical slice working",
            "Hardening / test gate",
            "Launch / handoff"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Dependency sketch",
          "body": "Who blocks whom? External teams are the usual silent killers.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Draw arrows between workstreams. Highlight one external dependency and a mitigation.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Milestone map with exit criteria",
        "Dependency sketch"
      ],
      "practice": {
        "title": "Buffer honesty",
        "brief": "Add explicit buffer where uncertainty is high. Tell stakeholders why."
      },
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "A plan is a bet with checkpoints. Prefer milestones tied to demos or decisions over Gantt vanity.",
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
      "id": "pm-stakeholders",
      "phase": "B · People & risk",
      "level": "intermediate",
      "title": "Stakeholders & communication",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "Map power × interest. Communicate differently to sponsors, users, and doers. Silence is not alignment.",
      "learn": [
        "Power/interest grid",
        "RACI lite",
        "Cadence"
      ],
      "steps": [
        {
          "title": "Map the humans",
          "body": "Sponsor, users, builders, blockers, informed-only.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Place 6–10 people on a power/interest grid. Note preferred channel for each.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Lightweight RACI",
          "body": "Responsible / Accountable / Consulted / Informed — only for decisions that hurt when unclear.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "RACI three decisions: scope change, go-live, deferring a risk.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Stakeholder grid",
        "RACI for three decisions"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Atlassian — RACI",
          "url": "https://www.atlassian.com/team-playbook/plays/raci",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Map power × interest. Communicate differently to sponsors, users, and doers. Silence is not alignment.",
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
      "id": "pm-raid",
      "phase": "B · People & risk",
      "level": "intermediate",
      "title": "RAID: risks, assumptions, issues, decisions",
      "minutes": 40,
      "overview": "A living RAID log beats a risk slide that died in week one. Risks have owners, triggers, and mitigations.",
      "learn": [
        "Risk vs issue",
        "Probability × impact",
        "Decision log"
      ],
      "steps": [
        {
          "title": "Start the RAID",
          "body": "Risks = maybe. Issues = now. Assumptions = believed true. Decisions = locked choices with date/owner.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create a RAID table with at least 3 risks, 2 assumptions, 1 open issue, 2 decisions.",
          "tip": null,
          "code": "Risk | Prob | Impact | Owner | Trigger | Mitigation | Status\nIssue | Owner | Impact | Next action | Due\nAssumption | Owner | Validate by | Status\nDecision | Date | Decider | Alternatives considered",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Pre-mortem",
          "body": "Imagine the project failed. List why. Convert top reasons into risks with mitigations.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "10-minute pre-mortem. Promote top 3 failure modes into the RAID.",
          "tip": "Watch “unknown unknowns” — schedule discovery spikes before baking dates.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "RAID started",
        "Pre-mortem done"
      ],
      "practice": {
        "title": "Weekly RAID hygiene",
        "brief": "Update RAID once this week in a real standup or async note."
      },
      "resources": [
        {
          "type": "article",
          "name": "Atlassian — Risk management",
          "url": "https://www.atlassian.com/work-management/project-management/risk-management",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "A living RAID log beats a risk slide that died in week one. Risks have owners, triggers, and mitigations.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pm-status",
      "phase": "B · People & risk",
      "level": "intermediate",
      "title": "Status that tells the truth",
      "minutes": 30,
      "overview": "Good status: goal, progress, risks, asks. Bad status: activity diary and green slides for red work.",
      "learn": [
        "RAG honesty",
        "Ask clearly",
        "Async-first"
      ],
      "steps": [
        {
          "title": "Status template",
          "body": "Lead with outcome. Then variance. Then risks. End with explicit asks and owners.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write this week’s status for your initiative using the template.",
          "tip": null,
          "code": "## Status — <initiative> — <date>\nGoal: …\nProgress: … (vs plan)\nRAG: Green / Amber / Red — because …\nRisks / issues needing eyes: …\nDecisions needed by <date>: …\nAsks: @person — …",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "No surprise Reds",
          "body": "Amber early is kindness. Red on launch week is malpractice.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite a fake “all green” status into an honest Amber with one ask.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One real status shipped",
        "Honest Amber practice done"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Good status: goal, progress, risks, asks. Bad status: activity diary and green slides for red work.",
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
      "id": "pm-cp1",
      "kind": "checkpoint",
      "phase": "C · Integrate",
      "level": "intermediate",
      "title": "Checkpoint: delivery pack",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Package scope, milestones, stakeholder map, and RAID into one shareable brief.",
      "learn": [
        "Packaging for alignment"
      ],
      "steps": [
        {
          "title": "Ship the brief",
          "body": "5 pages max or a tight Notion/Confluence page.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Get a sponsor or peer to mark: clear / confusing on each section.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Brief shared",
        "Feedback captured"
      ],
      "practice": {
        "title": "Fix the top confusion",
        "brief": "Revise the murkiest section within 48 hours."
      },
      "parentId": null,
      "overviewText": "Package scope, milestones, stakeholder map, and RAID into one shareable brief.",
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
      "id": "pm-change",
      "phase": "C · Integrate",
      "level": "advanced",
      "title": "Change, cut, and recover",
      "minutes": 35,
      "durationLabel": "Week 3",
      "overview": "When reality hits, renegotiate scope/date/quality explicitly. Hope is not a plan.",
      "learn": [
        "Triple constraint",
        "Cut lists",
        "Incident-style recovery"
      ],
      "steps": [
        {
          "title": "Tradeoff conversation",
          "body": "Show options: cut scope, move date, add people (rarely helps short-term), accept risk.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 3-option decision memo for a slipped milestone.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Cut list ready",
          "body": "Pre-agree what drops first when time compresses.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rank your nice-to-haves as cut order 1…n with stakeholder awareness.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Decision memo drafted",
        "Cut list ranked"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "When reality hits, renegotiate scope/date/quality explicitly. Hope is not a plan.",
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
      "id": "pm-cp2",
      "kind": "checkpoint",
      "phase": "C · Integrate",
      "level": "advanced",
      "title": "Checkpoint: run a week of PM",
      "minutes": 60,
      "durationLabel": "Capstone",
      "overview": "For one week, you own status, RAID updates, and one decision log entry — on a real or practice initiative.",
      "learn": [
        "Operating rhythm"
      ],
      "steps": [
        {
          "title": "Ops week evidence",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Collect artifacts.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "3 status updates (daily or 3× week)",
            "RAID updated at least twice",
            "One decision recorded with alternatives",
            "One risk mitigation executed or scheduled"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All four evidence items",
        "Retrospective note: what you’d automate next"
      ],
      "note": "Pace: 3–5 weeks. Lightweight artifacts that people read beat perfect templates nobody opens.",
      "parentId": null,
      "overviewText": "For one week, you own status, RAID updates, and one decision log entry — on a real or practice initiative.",
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
        "name": "Atlassian Project Management Guide",
        "url": "https://www.atlassian.com/work-management/project-management"
      },
      {
        "name": "Team Playbook",
        "url": "https://www.atlassian.com/team-playbook"
      }
    ],
    "tools": [
      "Notion / Confluence",
      "Jira / Linear",
      "Spreadsheet RAID",
      "FigJam"
    ],
    "books": [
      "The Deadline (DeMarco) — narrative lessons",
      "Making Things Happen (Berkun)",
      "Shape Up (Basecamp) — for alternative planning"
    ],
    "practice": [
      "Own status for one initiative for 2 weeks",
      "Facilitate one risk review"
    ],
    "videos": [
      {
        "name": "Google Project Management (Coursera overview)",
        "url": "https://www.coursera.org/professional-certificates/google-project-management"
      }
    ]
  }
};
