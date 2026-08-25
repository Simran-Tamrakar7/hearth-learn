/** Chapter body for /manuals/problem-solving. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "problem-solving",
  "title": "Problem Solving",
  "tagline": "Slow down, frame the problem, then cut a path through the maze.",
  "category": "soft-skills",
  "accent": "#0F766E",
  "cover": "covers/problem-solving-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "People who jump to solutions too fast (most of us).",
  "outcomes": [
    "Frame problems before solving them",
    "Break work into testable slices",
    "Debug with hypotheses, not panic"
  ],
  "chapters": [
    {
      "id": "ps-start",
      "phase": "Start",
      "level": "beginner",
      "title": "The solving trap",
      "minutes": 20,
      "overview": "A wrong problem well-solved wastes weeks. The first skill is noticing when you are solving the wrong thing.",
      "learn": [
        "Solution bias",
        "Problem vs symptom",
        "Pause habit"
      ],
      "steps": [
        {
          "title": "Symptom vs root",
          "body": "\"Tests are flaky\" is a symptom. \"We don't isolate test data\" might be the problem.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Take one current annoyance. Write symptom vs possible root cause.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One symptom/root analysis done"
      ],
      "practice": {
        "title": "Pause log",
        "brief": "Before your next fix, write the problem in one sentence."
      },
      "resources": [
        {
          "type": "book",
          "name": "Are Your Lights On? — Gause & Weinberg",
          "url": "https://en.wikipedia.org/wiki/Are_Your_Lights_On%3F",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "A wrong problem well-solved wastes weeks. The first skill is noticing when you are solving the wrong thing.",
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
      "id": "ps-frame",
      "phase": "A · Frame",
      "level": "beginner",
      "title": "Problem cards & success tests",
      "minutes": 25,
      "overview": "What / for whom / why now / how we will know it worked. If success is not observable, you cannot know when to stop.",
      "learn": [
        "Problem statements",
        "Constraints",
        "Success tests"
      ],
      "steps": [
        {
          "title": "Fill a problem card",
          "body": "Problem / user / context / constraints / success test.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Problem card for a real annoyance this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "5 Whys lite",
          "body": "Ask \"why\" up to 5 times to dig past symptoms.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run 5 Whys on one bug or process pain.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Problem card filled",
        "Success test is observable",
        "5 Whys done once"
      ],
      "practice": {
        "title": "Two framings",
        "brief": "Write two different framings for the same issue. Pick one deliberately."
      },
      "resources": [
        {
          "type": "article",
          "name": "Toyota — 5 Whys",
          "url": "https://en.wikipedia.org/wiki/Five_whys",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "What / for whom / why now / how we will know it worked. If success is not observable, you cannot know when to stop.",
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
      "id": "ps-decompose",
      "phase": "A · Frame",
      "level": "beginner",
      "title": "Decompose into smallest testable slices",
      "minutes": 30,
      "overview": "Big problems paralyze. Cut vertical slices that each teach something. Ship the thinnest slice first.",
      "learn": [
        "Vertical slicing",
        "INVEST stories",
        "Thin MVP"
      ],
      "steps": [
        {
          "title": "Slice a big task",
          "body": "Take something that feels like \"2 weeks.\" Cut a 2-hour slice that proves one assumption.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Decompose one task into 3 slices. Do slice 1 today.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "3 slices defined",
        "Slice 1 completed"
      ],
      "practice": {
        "title": "Slice log",
        "brief": "For one week, start every task by writing the thinnest slice first."
      },
      "resources": [
        {
          "type": "article",
          "name": "INVEST criteria",
          "url": "https://en.wikipedia.org/wiki/INVEST_(mnemonic)",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Big problems paralyze. Cut vertical slices that each teach something. Ship the thinnest slice first.",
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
      "id": "ps-hypothesis",
      "phase": "B · Experiment",
      "level": "intermediate",
      "title": "Hypothesize, test, learn",
      "minutes": 35,
      "overview": "If X is true, we should see Y. Run the cheapest experiment first. Invalidate fast.",
      "learn": [
        "Hypothesis format",
        "Cheap experiments",
        "Timeboxes"
      ],
      "steps": [
        {
          "title": "3 hypotheses for a bug",
          "body": "Write 3 possible causes. Rank by likelihood × cost to test.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick a bug. Write 3 hypotheses. Test the cheapest.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Timebox rabbit holes",
          "body": "Set a 30-minute timer. If no progress, write what you learned and switch hypothesis.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Timebox one debugging session.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "3 hypotheses written",
        "One validated or invalidated",
        "One timebox used"
      ],
      "practice": {
        "title": "Rubber duck log",
        "brief": "Explain a stuck problem out loud. Note what unlocked it."
      },
      "resources": [
        {
          "type": "article",
          "name": "Scientific Method",
          "url": "https://en.wikipedia.org/wiki/Scientific_method",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "If X is true, we should see Y. Run the cheapest experiment first. Invalidate fast.",
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
      "id": "ps-debug",
      "phase": "B · Experiment",
      "level": "intermediate",
      "title": "Systematic debugging",
      "minutes": 35,
      "overview": "Reproduce → isolate → fix → verify. Change one variable at a time. Binary search through git history.",
      "learn": [
        "Reproduce first",
        "Binary search",
        "One change rule"
      ],
      "steps": [
        {
          "title": "Reproduction script",
          "body": "If you cannot reproduce it, you cannot verify the fix.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write minimal steps to reproduce a recent bug.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Git bisect",
          "body": "Find the commit that introduced a regression.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run git bisect on a known good/bad pair (or simulate with log reading).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Reproduction steps written",
        "Git bisect attempted"
      ],
      "practice": {
        "title": "Debug journal",
        "brief": "Log your next 3 debug sessions: hypothesis, test, result."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Git Bisect",
          "url": "https://git-scm.com/docs/git-bisect",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Reproduce → isolate → fix → verify. Change one variable at a time. Binary search through git history.",
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
      "id": "ps-cp-a",
      "kind": "checkpoint",
      "phase": "B · Experiment",
      "level": "intermediate",
      "title": "Checkpoint A — Problem solving foundations",
      "minutes": 20,
      "durationLabel": "Gate",
      "overview": "Prove framing and experimentation habits.",
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify all.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "3+ problem cards written",
            "One task decomposed into slices with slice 1 done",
            "One bug debugged with 3 hypotheses",
            "One reproduction script written"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 4 criteria green"
      ],
      "parentId": null,
      "overviewText": "Prove framing and experimentation habits.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "learn": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "ps-tradeoffs",
      "phase": "C · Systems",
      "level": "advanced",
      "title": "Tradeoff tables & decision records",
      "minutes": 35,
      "overview": "Tradeoff tables beat opinions. Write down what you chose, what you rejected, and why. Future-you will thank you.",
      "learn": [
        "Tradeoff tables",
        "ADRs",
        "Second-order effects"
      ],
      "steps": [
        {
          "title": "Tradeoff table",
          "body": "3 options × 4 criteria (speed, cost, risk, maintainability). Score 1–5.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Table for Cypress vs Playwright vs Selenium (or any tool choice).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "ADR lite",
          "body": "Context, decision, consequences. 1 page max.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write one ADR for a recent tool or process choice.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Tradeoff table done",
        "One ADR written"
      ],
      "practice": {
        "title": "Postmortem lite",
        "brief": "Blameless 5-bullet note on a past miss."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Architecture Decision Records",
          "url": "https://adr.github.io/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Tradeoff tables beat opinions. Write down what you chose, what you rejected, and why. Future-you will thank you.",
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
      "id": "ps-systems",
      "phase": "C · Systems",
      "level": "advanced",
      "title": "Systems thinking & second-order effects",
      "minutes": 35,
      "overview": "Every fix has side effects. \"We added retries\" → \"now we mask real failures.\" Map feedback loops before committing.",
      "learn": [
        "Feedback loops",
        "Second-order effects",
        "Unintended consequences"
      ],
      "steps": [
        {
          "title": "Second-order brainstorm",
          "body": "For a proposed fix, ask \"and then what?\" three times.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Apply to one current proposal at work.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Causal loop sketch",
          "body": "Draw arrows: A affects B affects C affects A. Find the loop.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sketch one feedback loop in your team's process.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Second-order analysis done",
        "One loop sketched"
      ],
      "practice": {
        "title": "Pre-mortem",
        "brief": "Before starting a project, imagine it failed. Why?"
      },
      "resources": [
        {
          "type": "book",
          "name": "Thinking in Systems — Donella Meadows",
          "url": "https://en.wikipedia.org/wiki/Thinking_in_Systems",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Every fix has side effects. \"We added retries\" → \"now we mask real failures.\" Map feedback loops before committing.",
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
      "id": "ps-cp-b",
      "kind": "checkpoint",
      "phase": "C · Systems",
      "level": "advanced",
      "title": "Checkpoint B — Problem solving capstone",
      "minutes": 25,
      "durationLabel": "Capstone",
      "overview": "Final gate: you frame, experiment, decide, and learn systematically.",
      "steps": [
        {
          "title": "Capstone deliverables",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Complete all.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Problem card template you reuse weekly",
            "One tradeoff table + ADR",
            "Debug journal with 5+ entries",
            "One pre-mortem or postmortem written"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 4 deliverables complete"
      ],
      "note": "Pace: 2–4 weeks. The habit of framing beats any framework.",
      "parentId": null,
      "overviewText": "Final gate: you frame, experiment, decide, and learn systematically.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "learn": [],
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
        "name": "Architecture Decision Records",
        "url": "https://adr.github.io/"
      }
    ],
    "tools": [
      "Paper / FigJam",
      "Timer for timeboxes"
    ],
    "books": [
      "Are Your Lights On? (Gause & Weinberg)"
    ],
    "practice": [
      "One problem card per week for a month"
    ],
    "videos": []
  }
};
