/** Chapter body for /manuals/jira-work. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "jira-work",
  "title": "Work Tracking",
  "tagline": "Tickets that don’t suck — Jira, Linear, GitHub Issues, boards, and bugs vs stories.",
  "category": "delivery",
  "accent": "#0F5C4C",
  "cover": "covers/git-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "Anyone drowning in vague tickets, drive-by bugs, or boards that lie about progress.",
  "outcomes": [
    "Write tickets with context, AC, and test notes others can pick up",
    "Design boards that match real workflow",
    "Separate bugs, stories, and chores without taxonomy religion"
  ],
  "chapters": [
    {
      "id": "jw-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 15,
      "durationLabel": "Day 0",
      "overview": "Tools differ; hygiene rhymes. Practice in whatever tracker your team uses — Jira, Linear, GitHub Issues, or Azure Boards.",
      "learn": [
        "Pick your tool",
        "Hygiene over fields"
      ],
      "steps": [
        {
          "title": "Audit one ticket",
          "body": "Find the worst recent ticket. Keep it as your before/after specimen.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Save a link to a bad ticket. You’ll rewrite it by chapter 3.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Bad ticket specimen saved"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "GitHub Issues",
          "url": "https://docs.github.com/en/issues",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Linear method",
          "url": "https://linear.app/method",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Jira Software guide",
          "url": "https://www.atlassian.com/software/jira/guides",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Tools differ; hygiene rhymes. Practice in whatever tracker your team uses — Jira, Linear, GitHub Issues, or Azure Boards.",
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
      "id": "jw-anatomy",
      "phase": "A · Tickets",
      "level": "beginner",
      "title": "Anatomy of a useful ticket",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "Title that searches well, context, acceptance/repro, attachments, and owner. Empty description is how work stalls.",
      "learn": [
        "Title craft",
        "Context links",
        "AC / repro",
        "Labels without chaos"
      ],
      "steps": [
        {
          "title": "Story template",
          "body": "Problem, why now, acceptance, test notes, links to design/spec.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fill the template for one upcoming story.",
          "tip": null,
          "code": "Title: <verb> <object> — <context>\nWhy: …\nScope / AC:\n- …\nOut of scope: …\nDesign / spec: <link>\nTest notes: …\nDeps: …",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Bug template",
          "body": "Environment, steps, expected vs actual, evidence, severity guess, regressions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "File or rewrite one bug with evidence attached.",
          "tip": "One bug per ticket. Split hydras.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Story template used",
        "Bug with evidence"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Linear — Issue writing",
          "url": "https://linear.app/method/write-useful-issues",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Title that searches well, context, acceptance/repro, attachments, and owner. Empty description is how work stalls.",
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
      "id": "jw-rewrite",
      "phase": "A · Tickets",
      "level": "beginner",
      "title": "Rewrite tickets that don’t suck",
      "minutes": 30,
      "overview": "Take your specimen. Make it pick-up-able by a teammate on Monday morning.",
      "learn": [
        "Clarity edits",
        "Splitting",
        "Removing noise"
      ],
      "steps": [
        {
          "title": "Before → after",
          "body": "Cut novel-length pastes; link instead. Add the missing AC.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish the rewrite. Ask: “Could you start this with zero Slack?”",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Specimen rewritten",
        "Peer yes/no captured"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Take your specimen. Make it pick-up-able by a teammate on Monday morning.",
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
      "id": "jw-types",
      "phase": "A · Tickets",
      "level": "intermediate",
      "title": "Bugs vs stories vs chores",
      "minutes": 30,
      "overview": "Story = user value. Bug = broken expectation. Chore/task = maintenance. Mislabeling warps metrics and priority.",
      "learn": [
        "Type heuristics",
        "When a bug is a story",
        "Tech debt tickets"
      ],
      "steps": [
        {
          "title": "Sorting hat",
          "body": "“Never built” usually isn’t a bug. “Used to work” usually is.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sort 10 recent tickets into bug/story/chore. Fix 2 mislabels.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Bug — unintended behavior vs documented/prior behavior",
            "Story — new or changed user-facing value",
            "Chore — refactor, dependency bump, CI flake fix"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Ten tickets sorted",
        "Two mislabels fixed"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Story = user value. Bug = broken expectation. Chore/task = maintenance. Mislabeling warps metrics and priority.",
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
      "id": "jw-boards",
      "phase": "B · Flow",
      "level": "intermediate",
      "title": "Boards that match reality",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "Columns are states of work, not org chart. Too many columns = fog. WIP limits beat infinite “In Progress.”",
      "learn": [
        "Column design",
        "WIP",
        "Swimlanes",
        "Done means Done"
      ],
      "steps": [
        {
          "title": "Simplify columns",
          "body": "Typical: Backlog → Ready → In progress → In review → Done. Add only if a handoff is real.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Propose a column set for your team. Note what you’d delete.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Policies on the wall",
          "body": "What does “Ready” require? What does “In review” mean?",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write entry criteria for Ready and Done in 5 bullets total.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Column proposal",
        "Ready/Done policies"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "GitHub Projects",
          "url": "https://docs.github.com/en/issues/planning-and-tracking-with-projects",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Jira boards",
          "url": "https://support.atlassian.com/jira-software-cloud/docs/configure-boards/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Columns are states of work, not org chart. Too many columns = fog. WIP limits beat infinite “In Progress.”",
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
      "id": "jw-priority",
      "phase": "B · Flow",
      "level": "intermediate",
      "title": "Priority, severity, and SLAs",
      "minutes": 30,
      "overview": "Severity = user impact. Priority = what we do next. Don’t conflate them. P0 everything is noise.",
      "learn": [
        "Sev vs pri",
        "Escalation",
        "Quiet backlog hygiene"
      ],
      "steps": [
        {
          "title": "Define scales",
          "body": "Sev-1 through Sev-4 with examples from your product.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write the scale on a wiki page. Re-triage 5 open bugs against it.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Severity scale published",
        "Five bugs re-triaged"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Severity = user impact. Priority = what we do next. Don’t conflate them. P0 everything is noise.",
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
      "id": "jw-cp1",
      "kind": "checkpoint",
      "phase": "B · Flow",
      "level": "intermediate",
      "title": "Checkpoint: tracker makeover",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Deliver rewritten tickets + board/policy proposal + severity scale.",
      "learn": [
        "Team adoption"
      ],
      "steps": [
        {
          "title": "Share the pack",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Get one engineer and one QA/PM to comment. Capture objections.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Pack shared",
        "Objections listed"
      ],
      "parentId": null,
      "overviewText": "Deliver rewritten tickets + board/policy proposal + severity scale.",
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
      "id": "jw-automation",
      "phase": "C · Scale",
      "level": "advanced",
      "title": "Automation & etiquette",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "Auto-close stale, templates on create, PR ↔ issue links. Automation should reduce chores, not create notification hell.",
      "learn": [
        "Templates",
        "Issue–PR links",
        "Stale bots carefully"
      ],
      "steps": [
        {
          "title": "Add one template",
          "body": "Bug and story templates in GitHub/Jira/Linear.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ship one template your team will actually use. Delete an unused field.",
          "tip": "Every required field has a cost. Justify it.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Link work to code",
          "body": "Commits/PRs reference tickets. Closing keywords where appropriate.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Demonstrate one PR that auto-links or closes an issue.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Template live",
        "PR–issue link demo"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "GitHub issue templates",
          "url": "https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Linking PRs to issues",
          "url": "https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Auto-close stale, templates on create, PR ↔ issue links. Automation should reduce chores, not create notification hell.",
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
      "id": "jw-cp2",
      "kind": "checkpoint",
      "phase": "C · Scale",
      "level": "advanced",
      "title": "Checkpoint: week of clean tickets",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "For one week, every ticket you touch meets the template bar. Log exceptions.",
      "learn": [
        "Habit formation"
      ],
      "steps": [
        {
          "title": "Hygiene week",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "End with a short retro: what slowed you down, what to automate next.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "All created tickets use template",
            "No ticket without owner > 48h",
            "Board columns match agreed policy",
            "At least 3 old tickets cleaned or closed"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Hygiene week complete",
        "Retro note written"
      ],
      "note": "Pace: 2–4 weeks. Clarity in tickets compounds into fewer meetings.",
      "parentId": null,
      "overviewText": "For one week, every ticket you touch meets the template bar. Log exceptions.",
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
        "name": "Linear Method",
        "url": "https://linear.app/method"
      },
      {
        "name": "GitHub Issues docs",
        "url": "https://docs.github.com/en/issues"
      },
      {
        "name": "Jira guides",
        "url": "https://www.atlassian.com/software/jira/guides"
      }
    ],
    "tools": [
      "Jira",
      "Linear",
      "GitHub Issues + Projects",
      "Azure Boards"
    ],
    "books": [
      "Managing the Unmanageable (for people chaos context) — selective"
    ],
    "practice": [
      "Rewrite 10 tickets",
      "Facilitate one triage session"
    ],
    "videos": [
      {
        "name": "Atlassian Jira tutorials",
        "url": "https://www.atlassian.com/software/jira/guides/getting-started/introduction"
      }
    ]
  }
};
