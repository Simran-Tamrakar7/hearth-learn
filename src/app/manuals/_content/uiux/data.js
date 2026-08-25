/** Chapter body for /manuals/uiux. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "uiux",
  "title": "UI/UX Foundations",
  "tagline": "Make interfaces usable — research light, flows clear, friction low.",
  "category": "design",
  "accent": "#9A3412",
  "cover": "covers/uiux-cover.png",
  "duration": "4–6 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Builders, designers, and QA who want products people can actually finish tasks in.",
  "outcomes": [
    "Frame problems with Jobs to Be Done and map user flows",
    "Evaluate interfaces with heuristics and lightweight usability tests",
    "Design IA, UI states, and accessible patterns that hold up in review"
  ],
  "chapters": [
    {
      "id": "ux-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this UX path",
      "minutes": 20,
      "overview": "UX is evidence over taste. This path: JTBD → flows → heuristics → tests → IA → states → a11y. Pick one app to analyze all 6 weeks — consistency beats novelty.",
      "learn": [
        "Pick a subject app",
        "Evidence notebook habit",
        "4–6 week map"
      ],
      "steps": [
        {
          "title": "Choose subject app",
          "body": "Real app you use weekly: banking, food delivery, learning platform. You will map, test, and redesign parts of it.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create FigJam or Notion “UX Evidence Notebook”. Paste app name and primary job users hire it for.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Rules",
          "body": "Never say “I don’t like it.” Say “User may not see X because Y.” Test with 3 people minimum before calling a redesign done.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 3 rules in notebook header.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Observations ≠ solutions (capture both separately)",
            "Test the design, not the person",
            "Fix the worst friction first — not the prettiest screen"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Subject app chosen",
        "Evidence notebook created",
        "Week map skimmed"
      ],
      "practice": {
        "title": "First observation",
        "brief": "Use app for 10 min. Log 5 observations — no solutions yet."
      },
      "durationLabel": null,
      "parentId": null,
      "overviewText": "UX is evidence over taste. This path: JTBD → flows → heuristics → tests → IA → states → a11y. Pick one app to analyze all 6 weeks — consistency beats novelty.",
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
      "id": "ux-jtbd",
      "phase": "A · Understand",
      "level": "beginner",
      "title": "Jobs to Be Done",
      "minutes": 40,
      "durationLabel": "Week 1",
      "overview": "Users hire products to make progress. JTBD frames motivation: “When ___, I want to ___, so I can ___.” Better than persona fiction for beginners.",
      "learn": [
        "JTBD format",
        "Main job vs related jobs",
        "Competing with non-app alternatives"
      ],
      "steps": [
        {
          "title": "Write 3 jobs",
          "body": "One functional, one emotional, one social if applicable.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "For subject app, write 3 JTBD statements.",
          "tip": null,
          "code": "When I finish work hungry,\nI want to order food quickly,\nso I can eat without cooking.",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Forces diagram (lite)",
          "body": "Push: pain with status quo. Pull: appeal of new. Anxiety: fear of change. Habit: inertia.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List 2 items per force for switching to / from your app.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Non-app competition",
          "body": "Sometimes “call the restaurant” or “spreadsheet” is the real competitor.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Name 2 non-digital alternatives users might choose instead.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "3 JTBD statements",
        "Forces diagram",
        "2 non-app competitors noted"
      ],
      "practice": {
        "title": "Interview lite",
        "brief": "Ask one friend their last time doing the job — not about your app features."
      },
      "resources": [
        {
          "type": "book",
          "name": "Jobs to Be Done — Intercom summary",
          "url": "https://www.intercom.com/blog/jobs-to-be-done",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Laws of UX",
          "url": "https://lawsofux.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Users hire products to make progress. JTBD frames motivation: “When ___, I want to ___, so I can ___.” Better than persona fiction for beginners.",
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
      "id": "ux-flows",
      "phase": "A · Understand",
      "level": "beginner",
      "title": "User flows & friction mapping",
      "minutes": 45,
      "durationLabel": "Week 1",
      "overview": "Map the happy path and sad paths. Boxes and arrows expose drop-off risks before pixels.",
      "learn": [
        "Flow notation",
        "Happy vs edge paths",
        "Friction scoring",
        "Time-on-task intuition"
      ],
      "steps": [
        {
          "title": "Happy path",
          "body": "Start → key steps → success outcome. One primary job only.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Map signup → first value for subject app in FigJam.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Sad paths",
          "body": "Error, empty, timeout, permission denied, payment fail.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add 3 sad path branches to your flow.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Friction score",
          "body": "Rate each step 1–5 friction (5 = worst). Fix lowest-scoring step first in later chapters.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Score every step. Circle the worst two.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Happy path mapped",
        "3 sad paths added",
        "Friction scores assigned"
      ],
      "practice": {
        "title": "Timed task",
        "brief": "Time yourself completing happy path. Note every hesitation >3 seconds."
      },
      "resources": [
        {
          "type": "book",
          "name": "Don't Make Me Think — Steve Krug",
          "url": "https://sensible.com/dont-make-me-think/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "FigJam",
          "url": "https://www.figma.com/figjam/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Map the happy path and sad paths. Boxes and arrows expose drop-off risks before pixels.",
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
      "id": "ux-heuristics",
      "phase": "B · Evaluate",
      "level": "intermediate",
      "title": "Usability heuristics in practice",
      "minutes": 50,
      "durationLabel": "Week 2",
      "overview": "Nielsen’s 10 heuristics are a structured critique lens. Score flows, prioritize fixes, avoid “redesign everything” paralysis.",
      "learn": [
        "10 heuristics (practical subset)",
        "Severity rating",
        "Heuristic walkthrough"
      ],
      "steps": [
        {
          "title": "Heuristic pass",
          "body": "Focus on: visibility of status, match to real world, user control, consistency, error prevention.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rate your app’s happy path 1–5 on 5 heuristics. Document one violation each.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Visibility of system status",
            "Match between system and real world",
            "User control and freedom",
            "Consistency and standards",
            "Error prevention"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Severity 0–4",
          "body": "0 cosmetic → 4 catastrophic. Fix 3–4 before 1–2.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Assign severity to each violation. Pick top 2 to fix this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Quick fix sketch",
          "body": "Low-fi before hi-fi. Paper or FigJam.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sketch fix for highest-severity issue.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "5 heuristic scores",
        "Severity on each violation",
        "Fix sketch for #1 issue"
      ],
      "practice": {
        "title": "Government site audit",
        "brief": "Heuristic pass on any .gov site — practice cruelty with compassion."
      },
      "resources": [
        {
          "type": "doc",
          "name": "NN/g — 10 Usability Heuristics",
          "url": "https://www.nngroup.com/articles/ten-usability-heuristics/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Laws of UX — Heuristics",
          "url": "https://lawsofux.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Nielsen’s 10 heuristics are a structured critique lens. Score flows, prioritize fixes, avoid “redesign everything” paralysis.",
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
      "id": "ux-testing",
      "phase": "B · Evaluate",
      "level": "intermediate",
      "title": "Lightweight usability testing",
      "minutes": 50,
      "durationLabel": "Week 2–3",
      "overview": "3–5 users find most glaring issues. Task-based, think-aloud optional, you stay quiet. Notes → prioritized changes.",
      "learn": [
        "Test script",
        "Recruiting lite",
        "Note-taking",
        "Synthesis → backlog"
      ],
      "steps": [
        {
          "title": "Write test script",
          "body": "Welcome, tasks (3 max), post questions. No leading questions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Script with 2 tasks for your subject app flow.",
          "tip": null,
          "code": "Task 1: You want to [job]. Start from home. Talk aloud.\nTask 2: Handle [error scenario].\n\nPost: What was confusing? What would you change?",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Run 3 sessions",
          "body": "15 minutes each. Screen record if permitted. Same tasks for all.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Complete 3 tests. Capture quotes verbatim.",
          "tip": "You’re testing the design, not the person.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Affinity lite",
          "body": "Group observations: confusion, delight, blocker. Count frequency.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sticky notes by theme. Top 3 issues become redesign backlog.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Script written",
        "3 tests completed",
        "Top 3 issues synthesized"
      ],
      "practice": {
        "title": "Before/after",
        "brief": "Redesign one step from test findings. Run 1 confirmatory test."
      },
      "resources": [
        {
          "type": "doc",
          "name": "NN/g — Running a Usability Test",
          "url": "https://www.nngroup.com/articles/usability-testing-101/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "Maze (optional remote)",
          "url": "https://maze.co/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "3–5 users find most glaring issues. Task-based, think-aloud optional, you stay quiet. Notes → prioritized changes.",
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
      "id": "ux-cp-a",
      "kind": "checkpoint",
      "phase": "B · Evaluate",
      "level": "intermediate",
      "title": "Checkpoint A — Evidence pack",
      "minutes": 30,
      "durationLabel": "Gate · Week 3",
      "overview": "Prove problem understanding before IA and UI work.",
      "learn": [
        "Evidence completeness"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bundle in notebook or PDF.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "3+ JTBD statements",
            "Flow with happy + sad paths",
            "Heuristic evaluation with severities",
            "3 usability tests with synthesis",
            "Prioritized backlog (≥5 items)"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Evidence pack complete"
      ],
      "parentId": null,
      "overviewText": "Prove problem understanding before IA and UI work.",
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
      "id": "ux-ia",
      "phase": "C · Structure",
      "level": "intermediate",
      "title": "Information architecture",
      "minutes": 45,
      "durationLabel": "Week 3–4",
      "overview": "Labeling, grouping, navigation depth. Card sort lite and sitemap for your subject app problem area.",
      "learn": [
        "Sitemap",
        "Card sort (lite)",
        "Navigation patterns",
        "Label clarity"
      ],
      "steps": [
        {
          "title": "Current IA audit",
          "body": "List top-level nav items. Map depth to any task from your flow.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Sitemap of subject app (main areas only). Mark where your job lives (clicks deep?).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Card sort lite",
          "body": "Write 12 content/feature labels on cards. Ask 2 people to group. Look for mismatches with your app.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run card sort with 2 participants. Photo results.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Proposed IA fix",
          "body": "One change max for learning — merge tabs, rename label, flatten depth.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Revised sitemap with one IA improvement justified by card sort or tests.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Current sitemap",
        "Card sort with 2 people",
        "One IA improvement proposed"
      ],
      "practice": {
        "title": "Tree test (optional)",
        "brief": "Use Optimal Workshop tree test free tier OR ask “where would you find X?” on paper."
      },
      "resources": [
        {
          "type": "doc",
          "name": "NN/g — IA Basics",
          "url": "https://www.nngroup.com/articles/ia-vs-navigation/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "book",
          "name": "Information Architecture — Rosenfeld (skim)",
          "url": "https://www.usability.gov/how-to-and-tools/methods/information-architecture.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Labeling, grouping, navigation depth. Card sort lite and sitemap for your subject app problem area.",
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
      "id": "ux-wire-ui",
      "phase": "C · Structure",
      "level": "intermediate",
      "title": "Wireframes to UI",
      "minutes": 45,
      "durationLabel": "Week 4",
      "overview": "Low-fi → mid-fi → UI. Match mental models. Apply existing design system or simple type/color from Graphic Design path.",
      "learn": [
        "Wireframe fidelity",
        "Content priority",
        "UI patterns catalog",
        "Consistency with platform"
      ],
      "steps": [
        {
          "title": "Low-fi wireframe",
          "body": "Boxes and labels only for worst friction step from backlog.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Paper or FigJam wireframe — 1 screen, 10 min max.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Mid-fi in Figma",
          "body": "Real copy (no lorem), real hierarchy, gray boxes OK.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Mid-fi for same screen in Figma.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "UI polish pass",
          "body": "Apply type, color, spacing. One primary action per screen.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Hi-fi version OR annotate what stays mid-fi for test.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Low-fi + mid-fi done",
        "Real copy used",
        "One primary CTA clear"
      ],
      "practice": {
        "title": "Pattern library note",
        "brief": "List 5 UI patterns you reused (modal, toast, empty state, etc.) and from where."
      },
      "resources": [
        {
          "type": "tool",
          "name": "Mobbin — pattern reference",
          "url": "https://mobbin.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Material Design — Components",
          "url": "https://m3.material.io/components",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Low-fi → mid-fi → UI. Match mental models. Apply existing design system or simple type/color from Graphic Design path.",
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
      "id": "ux-states",
      "phase": "C · Structure",
      "level": "advanced",
      "title": "Empty, loading, error & success states",
      "minutes": 45,
      "durationLabel": "Week 4–5",
      "overview": "Production UI is mostly edge states. Design all four for one feature — reviewers notice missing error paths.",
      "learn": [
        "Four state model",
        "Skeleton vs spinner",
        "Error copy that helps",
        "Success confirmation"
      ],
      "steps": [
        {
          "title": "State inventory",
          "body": "For one list or form feature: default, loading, empty, error, success.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Table in notebook: state × user need × UI treatment.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Design four frames",
          "body": "Notifications list or order history — design loading, empty, error, success in Figma.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "4 Figma frames with consistent layout shell.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Error copy",
          "body": "Say what happened + what to do. No “Error 422”.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite 2 error messages from your app into human copy.",
          "tip": null,
          "code": "Bad: \"Something went wrong.\"\nGood: \"Payment didn't go through. Check card number or try another card.\"",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "State inventory table",
        "4 frames designed",
        "2 error messages rewritten"
      ],
      "practice": {
        "title": "Trigger states",
        "brief": "Use DevTools network throttle or airplane mode to screenshot real app states — compare to yours."
      },
      "resources": [
        {
          "type": "doc",
          "name": "NN/g — Empty State Design",
          "url": "https://www.nngroup.com/articles/empty-state-interface-design/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Production UI is mostly edge states. Design all four for one feature — reviewers notice missing error paths.",
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
      "id": "ux-a11y",
      "phase": "D · Ship quality",
      "level": "advanced",
      "title": "Accessibility as UX",
      "minutes": 50,
      "durationLabel": "Week 5",
      "overview": "Accessibility is usability for everyone — and a hiring signal. Keyboard, contrast, labels, focus order on your redesigned screen.",
      "learn": [
        "WCAG AA basics",
        "Keyboard navigation",
        "Screen reader labels",
        "Focus management"
      ],
      "steps": [
        {
          "title": "Keyboard pass",
          "body": "Tab through your app flow. Can you complete the job without a mouse?",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Keyboard-only test on subject app. Log blockers.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Contrast & touch targets",
          "body": "Text 4.5:1, large text 3:1. Touch targets ~44×44px minimum.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Audit your hi-fi screen with Stark or WebAIM.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Annotate for dev",
          "body": "Focus order numbers, aria-label for icon buttons, heading hierarchy.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Annotation layer on Figma redesign.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Keyboard audit done",
        "Contrast passes on hi-fi",
        "Focus order annotated"
      ],
      "practice": {
        "title": "VoiceOver / NVDA lite",
        "brief": "5-min screen reader pass on one flow. Note unlabeled controls."
      },
      "resources": [
        {
          "type": "doc",
          "name": "WCAG 2.2 Quick Reference",
          "url": "https://www.w3.org/WAI/WCAG22/quickref/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "WebAIM — Keyboard Accessibility",
          "url": "https://webaim.org/techniques/keyboard/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "axe DevTools",
          "url": "https://www.deque.com/axe/devtools/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Accessibility is usability for everyone — and a hiring signal. Keyboard, contrast, labels, focus order on your redesigned screen.",
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
      "id": "ux-critique",
      "phase": "D · Ship quality",
      "level": "advanced",
      "title": "Design critique & stakeholder communication",
      "minutes": 40,
      "durationLabel": "Week 5–6",
      "overview": "Present flows with evidence. Receive critique without defensiveness. Write concise PRDs or one-pagers eng can use.",
      "learn": [
        "Critique format",
        "Presenting tradeoffs",
        "One-pager structure"
      ],
      "steps": [
        {
          "title": "Present with evidence",
          "body": "Problem → test quote → proposed change → expected outcome. 5 slides max.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Build 5-slide deck for your redesign.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Critique session",
          "body": "Feedback on work, not person. Capture “consider” vs “must fix”.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run 20-min critique with peer. Document decisions.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "One-pager for eng",
          "body": "Scope, states, a11y notes, open questions, out of scope.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write one-pager markdown for your redesign.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "5-slide deck",
        "Critique notes captured",
        "Eng one-pager written"
      ],
      "practice": {
        "title": "Mock review",
        "brief": "Explain your IA change to someone non-design in 2 minutes."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Basecamp — Shape Up (pitch format)",
          "url": "https://basecamp.com/shapeup",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Present flows with evidence. Receive critique without defensiveness. Write concise PRDs or one-pagers eng can use.",
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
      "id": "ux-cp-b",
      "kind": "checkpoint",
      "phase": "D · Ship quality",
      "level": "advanced",
      "title": "Checkpoint B — UX case study ready",
      "minutes": 40,
      "durationLabel": "Gate · Week 6",
      "overview": "Job-ready UX portfolio piece: problem, evidence, solution, states, a11y — not just pretty screens.",
      "learn": [
        "UX portfolio criteria"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish or export case study.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "JTBD + flow + test synthesis in case study",
            "Before/after or clear problem screen",
            "Hi-fi with 4 states for one feature",
            "A11y annotations or audit summary",
            "5-min presentation recorded"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Case study live",
        "Presentation recorded"
      ],
      "practice": {
        "title": "Apply UX lens elsewhere",
        "brief": "Heuristic pass on a different product — 30 min — to prove transferable skill."
      },
      "parentId": null,
      "overviewText": "Job-ready UX portfolio piece: problem, evidence, solution, states, a11y — not just pretty screens.",
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
      "id": "ux-reference",
      "kind": "guide",
      "phase": "Reference",
      "level": "beginner",
      "title": "Timeline & method cheat sheet",
      "minutes": 15,
      "overview": "Return here when lost. Week map + methods at a glance.",
      "learn": [
        "6-week map",
        "Method picker"
      ],
      "steps": [
        {
          "title": "Week map",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Week 1 — JTBD + flows",
            "Week 2 — Heuristics + testing start",
            "Week 3 — Checkpoint A + IA",
            "Week 4 — Wireframes + states",
            "Week 5 — A11y + critique",
            "Week 6 — Checkpoint B + case study"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Which method when",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "JTBD — why users show up",
            "Flow map — where they get stuck",
            "Heuristic — fast expert review",
            "Usability test — validate with real users",
            "Card sort — labeling/grouping",
            "A11y audit — ship quality"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Bookmark this chapter"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Return here when lost. Week map + methods at a glance.",
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
  ],
  "resources": {
    "docs": [
      {
        "name": "Laws of UX",
        "url": "https://lawsofux.com/"
      },
      {
        "name": "NN/g Articles",
        "url": "https://www.nngroup.com/articles/"
      },
      {
        "name": "WCAG 2.2 Quickref",
        "url": "https://www.w3.org/WAI/WCAG22/quickref/"
      },
      {
        "name": "Usability.gov Methods",
        "url": "https://www.usability.gov/how-to-and-tools/methods/index.html"
      }
    ],
    "tools": [
      "Figma",
      "FigJam",
      "Maze / Useberry (optional)",
      "Stark",
      "Mobbin"
    ],
    "books": [
      "Don't Make Me Think (Krug)",
      "About Face (Cooper) — skim",
      "The Design of Everyday Things (Norman) — skim"
    ],
    "practice": [
      "Heuristic audit of a government website",
      "Weekly 15-min usability test on any app",
      "Redesign one flow from Mobbin case"
    ],
    "videos": [
      {
        "name": "NN/g (YouTube)",
        "url": "https://www.youtube.com/user/NNGroup"
      },
      {
        "name": "AJ&Smart — Design Sprint",
        "url": "https://www.youtube.com/c/AJSmart"
      }
    ]
  }
};
