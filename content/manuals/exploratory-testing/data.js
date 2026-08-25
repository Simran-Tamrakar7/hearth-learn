/** Chapter body for /manuals/exploratory-testing. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "exploratory-testing",
  "title": "Exploratory Testing",
  "tagline": "Charters, sessions, notes, and heuristics — structured freedom that finds real bugs.",
  "category": "quality",
  "accent": "#0B3D2E",
  "cover": "covers/test-automation-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "QA and builders who want exploration that is rigorous — not random clicking.",
  "outcomes": [
    "Design charters and run session-based exploratory tests",
    "Take notes that become bugs, risks, and coverage insight",
    "Apply heuristics (SFDIPOT, etc.) under timeboxes"
  ],
  "chapters": [
    {
      "id": "et-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Exploratory testing is simultaneous learning, test design, and execution. It is not “ad hoc with vibes.” You will practice on a real app (staging, demo, or open site) with timers and charters.",
      "learn": [
        "Mindset",
        "Practice app",
        "Session rhythm"
      ],
      "steps": [
        {
          "title": "Pick the target",
          "body": "Prefer an app you can break safely. Sauce Demo, your staging env, or a public sandbox.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Name the app + primary user goal you’ll explore for the next 3 weeks.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: 3–5 weeks, 2–3 sessions/week",
            "Each session: 45–90 minutes timeboxed",
            "Debrief within 15 minutes of ending"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Target app chosen",
        "Calendar blocks for 3 sessions"
      ],
      "practice": {
        "title": "Baseline wander",
        "brief": "15 minutes unguided click-around. Note what felt confusing — then stop. Charters come next."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Ministry of Testing — Exploratory",
          "url": "https://www.ministryoftesting.com/coverage/exploratory-testing",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Bach — Exploratory testing",
          "url": "https://www.satisfice.com/blog/archives/46",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Exploratory testing is simultaneous learning, test design, and execution. It is not “ad hoc with vibes.” You will practice on a real app (staging, demo, or open site) with timers and charters.",
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
      "id": "et-charters",
      "phase": "A · Structure",
      "level": "beginner",
      "title": "Charters that focus freedom",
      "minutes": 30,
      "durationLabel": "Week 1",
      "overview": "A charter says where to explore and why — not step-by-step scripts. Too vague = wandering. Too tight = scripted testing in disguise.",
      "learn": [
        "Charter format",
        "Scope & risks",
        "Good vs mushy"
      ],
      "steps": [
        {
          "title": "Write charters",
          "body": "Explore <target> with <resources> to discover <information>.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 5 charters for your app. Star the two you’ll run this week.",
          "tip": "Include a risk or question. “Explore the app” is not a charter.",
          "code": "Explore checkout with invalid coupons and currency changes\nto discover price calculation and error-handling risks.\n\nExplore settings permissions as a new user\nto discover authorization gaps and confusing defaults.",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Five charters written",
        "Two scheduled"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Charters (HTSM)",
          "url": "https://www.satisfice.com/download/useful-test-heuristics",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "A charter says where to explore and why — not step-by-step scripts. Too vague = wandering. Too tight = scripted testing in disguise.",
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
      "id": "et-sbtm",
      "phase": "A · Structure",
      "level": "intermediate",
      "title": "Session-based test management",
      "minutes": 40,
      "overview": "Timebox a session (e.g. 90 min). Charter, notes, bugs, risks, leftover questions. Debrief. This makes exploration reportable.",
      "learn": [
        "Session sheets",
        "Timeboxes",
        "Debrief questions"
      ],
      "steps": [
        {
          "title": "Run a scored session",
          "body": "Start timer. Stay on charter unless a thread is clearly higher risk — then note the diversion.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Complete one 60–90 min session with a session sheet.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Charter + timebox",
            "Notes / transcripts",
            "Bugs filed or drafted",
            "% on charter vs opportunity",
            "Follow-ups"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Debrief",
          "body": "What did you cover? What’s still risky? What should automation or next session take?",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 5-bullet debrief within 15 minutes of stopping.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One full SBTM session",
        "Debrief written"
      ],
      "practice": {
        "title": "Peer debrief",
        "brief": "Walk a peer through your notes for 10 minutes. Fix one unclear note habit."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Session-Based Test Management",
          "url": "https://www.satisfice.com/sbtm/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Timebox a session (e.g. 90 min). Charter, notes, bugs, risks, leftover questions. Debrief. This makes exploration reportable.",
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
      "id": "et-notes",
      "phase": "A · Structure",
      "level": "beginner",
      "title": "Note-taking that survives the session",
      "minutes": 30,
      "overview": "Notes are your product. Future-you and teammates need paths, data used, observations, and open questions — not a novel.",
      "learn": [
        "Threaded notes",
        "Evidence capture",
        "Promoting to bugs"
      ],
      "steps": [
        {
          "title": "Note structure",
          "body": "Timestamps, area, action, observation, question/bug seed.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Adopt a template. Use it in your next session.",
          "tip": null,
          "code": "[12:04] Cart — changed qty 1→0 — button stayed enabled — Q: empty cart state?\n[12:11] BUG? — promo code \"SAVE\" applies twice — screenshot.png",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Evidence hygiene",
          "body": "Screenshots, HAR, console, user id, build number. File bugs same day.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Promote at least 2 note seeds into proper bugs or risk notes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Template adopted",
        "Two promotions done"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Notes are your product. Future-you and teammates need paths, data used, observations, and open questions — not a novel.",
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
      "id": "et-heuristics",
      "phase": "B · Thinking tools",
      "level": "intermediate",
      "title": "Heuristics: SFDIPOT & friends",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "Heuristics are mental checklists that spark ideas under pressure. They are not complete test cases.",
      "learn": [
        "SFDIPOT",
        "CRUSSPIC STMP",
        "Consistency heuristics"
      ],
      "steps": [
        {
          "title": "SFDIPOT tour",
          "body": "Structure, Function, Data, Interfaces, Platform, Operations, Time.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "For your app, write one question per SFDIPOT letter.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Structure — files, configs, hidden fields",
            "Function — features, error handling",
            "Data — inputs, defaults, migrations",
            "Interfaces — API, UI, imports",
            "Platform — browsers, locales, mobile",
            "Operations — install, permissions, logs",
            "Time — timeouts, schedules, TZ"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Heuristic-driven session",
          "body": "Pick one letter (e.g. Data or Time) as the lens for a charter.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run a 45-min session with an explicit heuristic lens. Log ideas generated.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "SFDIPOT questions written",
        "Heuristic session run"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "HTSM / heuristics",
          "url": "https://www.satisfice.com/download/useful-test-heuristics",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Test Heuristics Cheat Sheet (Gojko)",
          "url": "https://gojko.net/2021/03/09/test-heuristics/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Heuristics are mental checklists that spark ideas under pressure. They are not complete test cases.",
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
      "id": "et-oracles",
      "phase": "B · Thinking tools",
      "level": "intermediate",
      "title": "Oracles & recognizing bugs",
      "minutes": 30,
      "overview": "An oracle is how you know something is wrong: consistency, standards, user expectations, history, claims in docs.",
      "learn": [
        "FEW HICCUPPS",
        "Consistency oracles",
        "When “weird” isn’t a bug"
      ],
      "steps": [
        {
          "title": "Name your oracle",
          "body": "Every bug report implies an oracle. Make it explicit.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "For 3 bugs you’ve filed (or will file), write the oracle in one line.",
          "tip": "“I don’t like it” is taste. “Violates stated pricing rules” is an oracle.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three oracles named"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Oracles (Bach)",
          "url": "https://www.satisfice.com/blog/archives/168",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "An oracle is how you know something is wrong: consistency, standards, user expectations, history, claims in docs.",
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
      "id": "et-cp1",
      "kind": "checkpoint",
      "phase": "B · Thinking tools",
      "level": "intermediate",
      "title": "Checkpoint: three sessions",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Evidence pack: 3 session sheets, charters, debriefs, and bugs/risks found.",
      "learn": [
        "Reporting exploration"
      ],
      "steps": [
        {
          "title": "Ship the pack",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Summarize coverage vs residual risk on one page for a stakeholder.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three sessions documented",
        "One-pager risk summary"
      ],
      "practice": {
        "title": "Stakeholder read",
        "brief": "Ask: what would you want explored next? Adjust charters."
      },
      "parentId": null,
      "overviewText": "Evidence pack: 3 session sheets, charters, debriefs, and bugs/risks found.",
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
      "id": "et-pair",
      "phase": "C · Team craft",
      "level": "advanced",
      "title": "Pairing, tours & automation handshake",
      "minutes": 35,
      "durationLabel": "Week 3",
      "overview": "Pair exploration multiplies insight. Tours (feature, claims, emotional…) diversify paths. Feed findings into automation where ROI is clear.",
      "learn": [
        "Pair roles",
        "Tours",
        "Automation candidates"
      ],
      "steps": [
        {
          "title": "Pair session",
          "body": "Driver / navigator. Switch every 15–20 minutes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run one paired session. Compare notes styles after.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Automation handoff",
          "body": "Stable, high-value, regressions → automate. Fleeting UI experiments → don’t.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List 3 findings: automate / monitor / re-explore later.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Pair session done",
        "Three handoff decisions"
      ],
      "resources": [
        {
          "type": "article",
          "name": "Tours (Kohl / Kelly)",
          "url": "https://www.satisfice.com/download/tours",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Pair exploration multiplies insight. Tours (feature, claims, emotional…) diversify paths. Feed findings into automation where ROI is clear.",
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
      "id": "et-cp2",
      "kind": "checkpoint",
      "phase": "C · Team craft",
      "level": "advanced",
      "title": "Checkpoint: exploration playbook",
      "minutes": 50,
      "durationLabel": "Capstone",
      "overview": "Write a one-team playbook: charter bank, session template, heuristic cheatsheet, debrief ritual.",
      "learn": [
        "Institutionalizing craft"
      ],
      "steps": [
        {
          "title": "Playbook deliverable",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish in wiki/repo. Run one session using only the playbook.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Charter bank (10+)",
            "Session sheet template",
            "Heuristic list tailored to product",
            "Debrief agenda (5 questions)"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Playbook live",
        "Validation session done"
      ],
      "note": "Pace: 3–5 weeks. Skill grows with debriefs, not hours of silent clicking.",
      "parentId": null,
      "overviewText": "Write a one-team playbook: charter bank, session template, heuristic cheatsheet, debrief ritual.",
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
        "name": "Session-Based Test Management",
        "url": "https://www.satisfice.com/sbtm/"
      },
      {
        "name": "Ministry of Testing — Exploratory",
        "url": "https://www.ministryoftesting.com/coverage/exploratory-testing"
      }
    ],
    "tools": [
      "Timer",
      "Note app / markdown",
      "Screenshot + HAR capture",
      "Session sheet (spreadsheet)"
    ],
    "books": [
      "Explore It! (Hendrickson)",
      "Lessons Learned in Software Testing (Kaner, Bach, Pettichord) — selective"
    ],
    "practice": [
      "3 timed sessions/week",
      "Build a charter bank for your product"
    ],
    "videos": [
      {
        "name": "MoT exploratory talks",
        "url": "https://www.ministryoftesting.com/"
      }
    ]
  }
};
