/** Chapter body for /manuals/agile-scrum. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "agile-scrum",
  "title": "Agile & Scrum",
  "tagline": "Run delivery that adapts — manifesto, Scrum events, Kanban, and ceremonies without cargo cult.",
  "category": "delivery",
  "accent": "#0B3D2E",
  "cover": "covers/cicd-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA, engineers, and anyone joining a Scrum or Kanban team who wants the why, not just the calendar.",
  "outcomes": [
    "Explain Agile values and when Scrum vs Kanban fits",
    "Participate in events with purpose — not theater",
    "Write user stories and a Definition of Done that actually gates quality"
  ],
  "chapters": [
    {
      "id": "ag-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Agile is a mindset; Scrum and Kanban are tools. This path teaches you to spot cargo-cult ceremonies and replace them with feedback loops that ship value. Practice on a real team board if you have one — otherwise invent a small product and run the rituals yourself.",
      "learn": [
        "Path rhythm",
        "What “done” looks like here",
        "Cargo cult vs craft"
      ],
      "steps": [
        {
          "title": "Set your practice field",
          "body": "Pick one: your current team, an open-source project, or a fictional product (e.g. “habit tracker for runners”). You will write stories and run a mock sprint against it.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Name the product and one user outcome you want to deliver in 2 weeks.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: 3–5 weeks at ~5 hrs/week",
            "Accelerated: 2 weeks if you already sit in standups daily",
            "Slow track: shadow one full sprint before leading anything"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Rules of the road",
          "body": "Every ceremony must answer: what decision or feedback does this create? If none — cut or redesign it.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write one sentence: “The worst Agile habit I’ve seen is ___.” Keep it for the final checkpoint.",
          "tip": "Velocity is a capacity signal, not a performance score. Never weaponize it.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Practice field chosen",
        "One outcome named",
        "Cargo-cult pet peeve written"
      ],
      "practice": {
        "title": "Day zero",
        "brief": "Screenshot your current board (or sketch one). Label columns in plain language."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Agile Manifesto",
          "url": "https://agilemanifesto.org/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Manifesto principles",
          "url": "https://agilemanifesto.org/principles.html",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Agile is a mindset; Scrum and Kanban are tools. This path teaches you to spot cargo-cult ceremonies and replace them with feedback loops that ship value. Practice on a real team board if you have one — otherwise invent a small product and run the rituals yourself.",
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
      "id": "ag-manifesto",
      "phase": "A · Mindset",
      "level": "beginner",
      "title": "Manifesto: values over theater",
      "minutes": 30,
      "durationLabel": "Week 1",
      "overview": "Individuals and interactions, working software, customer collaboration, responding to change. The right side still matters — the left side matters more when they conflict.",
      "learn": [
        "Four values",
        "Twelve principles (skim)",
        "Tradeoff language"
      ],
      "steps": [
        {
          "title": "Value conflicts in the wild",
          "body": "Map a recent team fight to a manifesto tension (e.g. comprehensive docs vs working software).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 4 bullets: one real example per Agile value — when you chose the left side and why.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Principle spot-check",
          "body": "“Welcome changing requirements” is not “no plan.” It means short feedback loops so change is cheap.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick 3 principles. For each: one team habit that supports it, one that violates it.",
          "tip": "Sustainable pace is a principle. Heroics are a smell.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Four value examples written",
        "Three principles mapped to habits"
      ],
      "practice": {
        "title": "Team retro seed",
        "brief": "Bring one manifesto tension to your next retro as a discussion prompt."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Agile Alliance — What is Agile?",
          "url": "https://www.agilealliance.org/agile101/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Individuals and interactions, working software, customer collaboration, responding to change. The right side still matters — the left side matters more when they conflict.",
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
      "id": "ag-scrum-flow",
      "phase": "A · Mindset",
      "level": "beginner",
      "title": "Scrum in one page",
      "minutes": 35,
      "overview": "Roles (PO, SM, Developers), artifacts (Product Backlog, Sprint Backlog, Increment), events (Sprint, Planning, Daily, Review, Retro). Learn the skeleton before debating flavors.",
      "learn": [
        "Roles",
        "Artifacts",
        "Sprint as a container"
      ],
      "steps": [
        {
          "title": "Draw the loop",
          "body": "Sprint Planning → Daily Scrum → work → Sprint Review → Retrospective → next Planning. The Increment is the point.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sketch the Scrum loop on one page. Annotate who owns each artifact.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Product Owner — value & backlog order",
            "Scrum Master — effectiveness of the process",
            "Developers — how to deliver the Increment"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Increment ≠ “we coded stuff”",
          "body": "A Done Increment is usable and meets DoD. “Almost done” is not an Increment.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Define “usable” for your practice product in one sentence.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One-page Scrum sketch",
        "Usable Increment defined"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Scrum Guide (2020)",
          "url": "https://scrumguides.org/scrum-guide.html",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Roles (PO, SM, Developers), artifacts (Product Backlog, Sprint Backlog, Increment), events (Sprint, Planning, Daily, Review, Retro). Learn the skeleton before debating flavors.",
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
      "id": "ag-events",
      "phase": "B · Practice",
      "level": "intermediate",
      "title": "Events that earn their time",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "Each event has a purpose and a timebox. Cargo cult is when you keep the calendar invite but lose the purpose.",
      "learn": [
        "Planning outcomes",
        "Daily as plan re-sync",
        "Review vs status",
        "Retro as experiment lab"
      ],
      "steps": [
        {
          "title": "Planning: forecast, not fantasy",
          "body": "Select Product Backlog items that can become a Done Increment. Negotiate scope with capacity and DoD in mind.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Draft a Sprint Goal for your practice product (one sentence). List 3–5 backlog items that serve it.",
          "tip": "If Planning runs over timebox, the backlog was not ready — fix refinement, not the clock.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Daily: inspect the plan",
          "body": "Not a status report to a manager. Developers sync on progress toward the Sprint Goal and unblock each other.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite a bad standup (“yesterday I coded”) into goal-oriented updates for three people.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Review & Retro",
          "body": "Review = stakeholders see the Increment and adapt the backlog. Retro = team improves how they work. Separate rooms in your head.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write one Retro experiment with a measurable “we will try X for one sprint.”",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Sprint Goal drafted",
        "Daily rewrite done",
        "One Retro experiment named"
      ],
      "practice": {
        "title": "Event autopsy",
        "brief": "Sit in (or recall) one event. Note purpose achieved: yes / partial / no — and why."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Scrum Guide — Events",
          "url": "https://scrumguides.org/scrum-guide.html#events",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Mountain Goat — Sprint Goals",
          "url": "https://www.mountaingoatsoftware.com/blog/the-sprint-goal-a-key-but-often-missed-scrum-component",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Each event has a purpose and a timebox. Cargo cult is when you keep the calendar invite but lose the purpose.",
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
      "id": "ag-kanban",
      "phase": "B · Practice",
      "level": "intermediate",
      "title": "Kanban: flow over sprints",
      "minutes": 35,
      "overview": "Visualize work, limit WIP, manage flow, make policies explicit. Use when interrupt-driven work or continuous delivery fits better than fixed sprints.",
      "learn": [
        "WIP limits",
        "Cycle time",
        "Classes of service",
        "Scrum + Kanban hybrids"
      ],
      "steps": [
        {
          "title": "Map the workflow",
          "body": "Columns should match reality (Ready → In progress → Review → Done), not aspirational theater.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Draw a board with WIP limits on In progress and Review. Justify each limit in one line.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Measure flow lightly",
          "body": "Cycle time (start → Done) beats story-point cosplay for interrupt-heavy teams.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Estimate cycle time for your last 5 finished tickets. Spot the outlier and name the cause.",
          "tip": "Start with sticky WIP limits before buying expensive flow tools.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Board + WIP limits drawn",
        "Five cycle times estimated"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Kanban Guide",
          "url": "https://kanbanguides.org/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Atlassian — Kanban",
          "url": "https://www.atlassian.com/agile/kanban",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Visualize work, limit WIP, manage flow, make policies explicit. Use when interrupt-driven work or continuous delivery fits better than fixed sprints.",
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
      "id": "ag-stories",
      "phase": "B · Practice",
      "level": "intermediate",
      "title": "User stories & acceptance",
      "minutes": 40,
      "overview": "Stories are promises of conversation, not mini-specs. “As a… I want… so that…” plus clear acceptance criteria beats a novel in the description.",
      "learn": [
        "INVEST",
        "Acceptance criteria",
        "Splitting large work",
        "Spikes"
      ],
      "steps": [
        {
          "title": "Write INVEST stories",
          "body": "Independent, Negotiable, Valuable, Estimable, Small, Testable. If it fails Small or Testable, split or spike.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 5 stories for your practice product. Mark each INVEST letter that fails.",
          "tip": null,
          "code": "As a <user>\nI want <capability>\nSo that <outcome>\n\nAcceptance:\n- Given … When … Then …\n- Given … When … Then …",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Split vertically",
          "body": "Prefer end-to-end thin slices over “frontend this sprint, backend next.”",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Take one epic-sized story and split it into 3 vertical slices.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Five INVEST stories",
        "One epic split vertically"
      ],
      "practice": {
        "title": "AC review",
        "brief": "Have a peer try to misinterpret your acceptance criteria. Tighten the loopholes."
      },
      "resources": [
        {
          "type": "article",
          "name": "Mountain Goat — User Stories",
          "url": "https://www.mountaingoatsoftware.com/agile/user-stories",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Splitting user stories",
          "url": "https://www.mountaingoatsoftware.com/blog/the-humanizing-work-guide-to-splitting-user-stories",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Stories are promises of conversation, not mini-specs. “As a… I want… so that…” plus clear acceptance criteria beats a novel in the description.",
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
      "id": "ag-dod",
      "phase": "C · Quality gates",
      "level": "intermediate",
      "title": "Definition of Done that bites",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "DoD is the quality contract for every Increment. If “tested” is vague, bugs escape. Make DoD checkable and shared.",
      "learn": [
        "DoD vs acceptance criteria",
        "Team vs org DoD",
        "Undone work"
      ],
      "steps": [
        {
          "title": "Draft a real DoD",
          "body": "Include: code reviewed, tests at agreed level, a11y/security notes if relevant, docs/runbook updates, deployed to staging.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 6–10 item DoD checklist your team could adopt next sprint.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Acceptance criteria met",
            "Unit/integration/E2E as agreed for the change",
            "No new Sev-1/2 known issues",
            "Feature flag / rollback path if needed",
            "Observability: log/metric/trace touch if user-facing"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Name undone work",
          "body": "If you “finish” without meeting DoD, you created technical debt with a smile.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List undone work from your last release. Put it on the backlog explicitly.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "DoD checklist drafted",
        "Undone work listed"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Scrum Guide — Definition of Done",
          "url": "https://scrumguides.org/scrum-guide.html#definition-of-done",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "DoD is the quality contract for every Increment. If “tested” is vague, bugs escape. Make DoD checkable and shared.",
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
      "id": "ag-cp1",
      "kind": "checkpoint",
      "phase": "C · Quality gates",
      "level": "intermediate",
      "title": "Checkpoint: ceremony without cargo cult",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Prove you can diagnose empty ritual and redesign it. Deliver a short “Agile health” note for a real or fictional team.",
      "learn": [
        "Diagnosis",
        "Experiment design"
      ],
      "steps": [
        {
          "title": "Health note",
          "body": "2 pages max. Cover: which events create feedback, which don’t, proposed DoD, one Retro experiment.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish the note. Get one peer +1 or written critique.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Sprint Goal quality: clear / mushy",
            "Daily: plan sync vs status theater",
            "Review: stakeholders present? Increment demoed?",
            "WIP / cycle time awareness"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Health note published",
        "Peer feedback captured",
        "One experiment scheduled"
      ],
      "practice": {
        "title": "Run one experiment",
        "brief": "Try the Retro change for a full sprint (or one week on Kanban). Log what changed."
      },
      "parentId": null,
      "overviewText": "Prove you can diagnose empty ritual and redesign it. Deliver a short “Agile health” note for a real or fictional team.",
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
      "id": "ag-anti",
      "phase": "C · Quality gates",
      "level": "advanced",
      "title": "Anti-patterns & recovery",
      "minutes": 35,
      "overview": "Story-point theater, zombie Scrums, “ScrumBut,” and managers using Daily as interrogation. Spot them early; fix with experiments, not slogans.",
      "learn": [
        "Common smells",
        "Scaling caution",
        "When to drop Scrum"
      ],
      "steps": [
        {
          "title": "Smell catalog",
          "body": "Carry-over forever, no Sprint Goal, QA as a column after “Dev Done,” retro actions that never happen.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Match 3 smells to a fix that costs less than one sprint of pain.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Choose the method",
          "body": "Interrupt-heavy support? Lean Kanban. Clear product increments? Scrum. Regulated big-bang? Hybrid with honesty.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Recommend Scrum, Kanban, or hybrid for your practice field — with 3 reasons.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three smells + fixes",
        "Method recommendation written"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Zombie Scrum symptoms",
          "url": "https://www.Scrum.org/resources/blog/zombie-scrum-symptoms",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Story-point theater, zombie Scrums, “ScrumBut,” and managers using Daily as interrogation. Spot them early; fix with experiments, not slogans.",
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
      "id": "ag-cp2",
      "kind": "checkpoint",
      "phase": "C · Quality gates",
      "level": "advanced",
      "title": "Checkpoint: mini-sprint delivery",
      "minutes": 60,
      "durationLabel": "Capstone",
      "overview": "Run a 1-week mini-sprint (or Kanban week): goal, backlog, DoD, review demo notes, retro experiment result.",
      "learn": [
        "End-to-end practice"
      ],
      "steps": [
        {
          "title": "Ship the package",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Assemble the capstone folder.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Sprint/Kanban Goal",
            "Backlog with acceptance criteria",
            "DoD checklist used on each item",
            "Demo script or recording notes",
            "Retro: what we tried, what we’ll keep"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All five artifacts complete",
        "At least one Done Increment (even tiny)"
      ],
      "practice": {
        "title": "Teach-back",
        "brief": "Explain Scrum vs Kanban to a junior in 10 minutes using your artifacts."
      },
      "note": "Pace: 3–5 weeks. Prefer one real team improvement over perfect theory notes.",
      "parentId": null,
      "overviewText": "Run a 1-week mini-sprint (or Kanban week): goal, backlog, DoD, review demo notes, retro experiment result.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "Agile Manifesto",
        "url": "https://agilemanifesto.org/"
      },
      {
        "name": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html"
      },
      {
        "name": "Kanban Guide",
        "url": "https://kanbanguides.org/"
      }
    ],
    "tools": [
      "Jira / Linear / GitHub Projects",
      "Miro / FigJam",
      "Physical sticky board"
    ],
    "books": [
      "Scrum: The Art of Doing Twice the Work in Half the Time (Sutherland) — skim critically",
      "Kanban (Anderson)",
      "User Stories Applied (Cohn)"
    ],
    "practice": [
      "Run one mini-sprint with DoD",
      "Shadow a Sprint Review and write a critique"
    ],
    "videos": [
      {
        "name": "Scrum.org learning path",
        "url": "https://www.scrum.org/resources"
      }
    ]
  }
};
