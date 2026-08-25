/** Chapter body for /manuals/design-thinking. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "design-thinking",
  "title": "Design Thinking",
  "tagline": "Empathize → define → ideate → prototype → test — workshops that produce decisions.",
  "category": "design",
  "accent": "#C45C26",
  "cover": "covers/figma-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "Builders, QA, and PMs who want structured creative problem-solving without fluffy offsites.",
  "outcomes": [
    "Run a lightweight design-thinking loop on a real problem",
    "Facilitate empathy and ideation workshops that end with prototypes",
    "Test prototypes and feed learning back into the backlog"
  ],
  "chapters": [
    {
      "id": "dt-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Design thinking is a loop for reducing risk on fuzzy human problems. Pick one problem at work or a personal product idea. You will leave with a tested prototype — not a wall of sticky notes.",
      "learn": [
        "Problem selection",
        "Timeboxes",
        "Bias to prototypes"
      ],
      "steps": [
        {
          "title": "Pick the problem",
          "body": "Must involve real users and uncertainty. “Make the logo bigger” is not a DT problem.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write the problem in one sentence + who hurts today.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: 3–5 weeks, one loop",
            "Workshop blocks: 60–90 minutes",
            "Prototype within week 2 — don’t ideate forever"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Problem sentence written"
      ],
      "practice": {
        "title": "Stakeholder map",
        "brief": "List users, buyers, and blockers for this problem."
      },
      "resources": [
        {
          "type": "doc",
          "name": "IDEO Design Kit",
          "url": "https://www.designkit.org/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Stanford d.school resources",
          "url": "https://dschool.stanford.edu/resources",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Design thinking is a loop for reducing risk on fuzzy human problems. Pick one problem at work or a personal product idea. You will leave with a tested prototype — not a wall of sticky notes.",
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
      "id": "dt-empathize",
      "phase": "A · Understand",
      "level": "beginner",
      "title": "Empathize: talk to humans",
      "minutes": 40,
      "durationLabel": "Week 1",
      "overview": "Interviews, observation, and journey sketches. Seek stories and workarounds — not feature requests as gospel.",
      "learn": [
        "Interview prompts",
        "Observation",
        "Empathy maps"
      ],
      "steps": [
        {
          "title": "Interview guide",
          "body": "Open with recent stories. Dig into last time they struggled. Avoid leading “would you use X?”",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run 3 interviews (15–20 min). Capture quotes verbatim.",
          "tip": "Ask “show me how you do it today” when possible.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Empathy map",
          "body": "Says / Thinks / Does / Feels — one map per primary user.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Build one empathy map from your interviews.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three interviews",
        "One empathy map"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "IDEO — Interview",
          "url": "https://www.designkit.org/methods/2",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "NN/g — Empathy mapping",
          "url": "https://www.nngroup.com/articles/empathy-mapping/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Interviews, observation, and journey sketches. Seek stories and workarounds — not feature requests as gospel.",
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
      "id": "dt-define",
      "phase": "A · Understand",
      "level": "beginner",
      "title": "Define: point of view",
      "minutes": 30,
      "overview": "Turn research into a POV: user + need + insight. A good problem statement focuses the team; a bad one is a solution in disguise.",
      "learn": [
        "POV statements",
        "HMWs",
        "Problem vs solution"
      ],
      "steps": [
        {
          "title": "POV + HMW",
          "body": "[User] needs [need] because [insight]. Then: How Might We …?",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 1 POV and 5 HMW questions. Vote the top 2 HMWs.",
          "tip": null,
          "code": "POV: On-call engineers need a faster way to find the last known-good config\nbecause they waste critical minutes grepping Slack during incidents.\n\nHMW: How might we surface last-known-good config at the moment of triage?",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "POV + top HMWs"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "d.school — POV",
          "url": "https://dschool.stanford.edu/resources",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Turn research into a POV: user + need + insight. A good problem statement focuses the team; a bad one is a solution in disguise.",
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
      "id": "dt-ideate",
      "phase": "B · Make",
      "level": "intermediate",
      "title": "Ideate: quantity then critique",
      "minutes": 35,
      "durationLabel": "Week 2",
      "overview": "Diverge first. Defer judgment. Then converge with criteria. Sticky-note storms need facilitation or they become loudest-voice wins.",
      "learn": [
        "Crazy 8s",
        "Dot voting",
        "Selection criteria"
      ],
      "steps": [
        {
          "title": "Crazy 8s",
          "body": "8 ideas in 8 minutes — sketches, not essays.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run Crazy 8s solo or with 2+ people on your top HMW.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Converge",
          "body": "Criteria: impact, feasibility, learnability this week.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick 1–2 ideas to prototype. Kill charming impossibles explicitly.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Silent sketching before discussion",
            "Dot vote independently",
            "Decide with criteria, not vibes alone"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Crazy 8s done",
        "Prototype candidates chosen"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "GV — Crazy 8s",
          "url": "https://designsprintkit.withgoogle.com/methodology/phase3-sketch/crazy-8s",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Diverge first. Defer judgment. Then converge with criteria. Sticky-note storms need facilitation or they become loudest-voice wins.",
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
      "id": "dt-prototype",
      "phase": "B · Make",
      "level": "intermediate",
      "title": "Prototype to learn",
      "minutes": 40,
      "overview": "Fidelity matches the question. Paper, Figma click-through, or concierge. The prototype exists to get feedback — not to impress.",
      "learn": [
        "Fidelity choice",
        "Happy path + one edge",
        "Facade honesty"
      ],
      "steps": [
        {
          "title": "Build the smallest prototype",
          "body": "If you’re testing navigation, don’t pixel-polish illustrations.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ship a prototype in <1 day of effort that answers your riskiest assumption.",
          "tip": "Tell testers what’s fake so they don’t fight the facade.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Prototype ready for 3 testers"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Prototyping",
          "url": "https://help.figma.com/hc/en-us/articles/360040328614",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "NN/g — Prototyping",
          "url": "https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Fidelity matches the question. Paper, Figma click-through, or concierge. The prototype exists to get feedback — not to impress.",
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
      "id": "dt-test",
      "phase": "B · Make",
      "level": "intermediate",
      "title": "Test & learn",
      "minutes": 40,
      "overview": "Watch users try the prototype. Tasks over tours. Note behaviors and quotes. Decide: persevere, pivot, or park.",
      "learn": [
        "Task-based tests",
        "Note-taking",
        "Synthesis"
      ],
      "steps": [
        {
          "title": "Three tests",
          "body": "Same tasks each time. Don’t demo — observe.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run 3 tests. Capture: completed? struggled where? surprise?",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Synthesize",
          "body": "Patterns > outliers. Update POV if reality disagrees.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Half-page learning: what we’ll build / change / drop.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three tests",
        "Learning note"
      ],
      "practice": {
        "title": "Backlog impact",
        "brief": "Turn learnings into 3 tickets or explicit won’t-dos."
      },
      "resources": [
        {
          "type": "article",
          "name": "NN/g — Usability testing",
          "url": "https://www.nngroup.com/articles/usability-testing-101/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Watch users try the prototype. Tasks over tours. Note behaviors and quotes. Decide: persevere, pivot, or park.",
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
      "id": "dt-cp1",
      "kind": "checkpoint",
      "phase": "B · Make",
      "level": "intermediate",
      "title": "Checkpoint: one full loop",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Evidence of empathize → test for your problem. Artifacts or it didn’t happen.",
      "learn": [
        "Packaging the loop"
      ],
      "steps": [
        {
          "title": "Loop pack",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Share with a peer: empathy map, POV, prototype link, test notes, decision.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Loop pack shared",
        "Decision recorded"
      ],
      "parentId": null,
      "overviewText": "Evidence of empathize → test for your problem. Artifacts or it didn’t happen.",
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
      "id": "dt-workshop",
      "phase": "C · Facilitate",
      "level": "advanced",
      "title": "Facilitate workshops",
      "minutes": 35,
      "durationLabel": "Week 3",
      "overview": "Agenda, roles, timeboxes, parking lot, decision capture. Facilitation is a skill — energy without outcomes is a party.",
      "learn": [
        "Agenda design",
        "Inclusion",
        "Decision logging"
      ],
      "steps": [
        {
          "title": "Workshop plan",
          "body": "Goal, attendees, exercises, outputs, timeboxes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 90-min workshop agenda for ideation or synthesis. Run it or dry-run aloud.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Start with purpose + success lookslike",
            "Silent work before debate",
            "End with owners + dates"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Agenda written",
        "Dry-run or live run"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Hyper Island toolbox",
          "url": "https://toolbox.hyperisland.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Atlassian Team Playbook",
          "url": "https://www.atlassian.com/team-playbook",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Agenda, roles, timeboxes, parking lot, decision capture. Facilitation is a skill — energy without outcomes is a party.",
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
      "id": "dt-cp2",
      "kind": "checkpoint",
      "phase": "C · Facilitate",
      "level": "advanced",
      "title": "Checkpoint: facilitate & close",
      "minutes": 50,
      "durationLabel": "Capstone",
      "overview": "Facilitate one session and close the loop into product/engineering work.",
      "learn": [
        "From workshop to backlog"
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
          "doThis": "Deliver workshop notes + prototype decision + next experiments.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Facilitated session (or recorded dry-run with critique)",
            "Artifacts from full DT loop",
            "Three backlog items or explicit kills",
            "Retro: what to change next workshop"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Capstone complete"
      ],
      "note": "Pace: 3–5 weeks. One tested idea beats a mural of abandoned stickies.",
      "parentId": null,
      "overviewText": "Facilitate one session and close the loop into product/engineering work.",
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
        "name": "IDEO Design Kit",
        "url": "https://www.designkit.org/"
      },
      {
        "name": "Stanford d.school",
        "url": "https://dschool.stanford.edu/resources"
      },
      {
        "name": "Google Design Sprint Kit",
        "url": "https://designsprintkit.withgoogle.com/"
      }
    ],
    "tools": [
      "FigJam / Miro",
      "Figma",
      "Timer",
      "Interview notes doc"
    ],
    "books": [
      "Creative Confidence (Kelley & Kelley)",
      "Sprint (Knapp) — for timeboxed variants",
      "The Mom Test (Fitzpatrick) — for interviews"
    ],
    "practice": [
      "One interview per week",
      "One Crazy 8s before any big feature debate"
    ],
    "videos": [
      {
        "name": "IDEO design thinking overview",
        "url": "https://designthinking.ideo.com/"
      }
    ]
  }
};
