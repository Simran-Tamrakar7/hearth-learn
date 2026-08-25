/** Chapter body for /manuals/chatgpt-workflows. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "chatgpt-workflows",
  "title": "ChatGPT Workflows for Learners",
  "tagline": "Repeatable prompts for studying, debugging, and reviewing — without outsourcing your brain.",
  "category": "ai",
  "accent": "#0D9488",
  "cover": "covers/prompt-engineering-cover.png",
  "duration": "2–5 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Students and QAs who want AI as a tutor, not a crutch.",
  "outcomes": [
    "Study loops",
    "Debug prompts",
    "Review checklists"
  ],
  "pace": {
    "hoursPerDay": "45–90 min/day",
    "recommended": "~3–5 weeks",
    "accelerated": "~2 weeks",
    "slow": "~6–8 weeks"
  },
  "chapters": [
    {
      "id": "cg-study",
      "phase": "Start",
      "level": "beginner",
      "title": "Study loop prompts",
      "minutes": 25,
      "overview": "Explain → quiz me → correct me. Keep ownership of answers.",
      "learn": [
        "Tutor mode",
        "Active recall",
        "Limits"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Ask for a quiz on a chapter, answer first, then reveal. AI is the tutor, you are the student.",
          "learnMore": "Never paste secrets. Never submit AI text as your portfolio voice unedited.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://platform.openai.com/docs/guides/prompt-engineering",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Best use of AI for learning…",
            "options": [
              "Copy final answers blindly",
              "Active recall + feedback",
              "Skip practice",
              "Generate fake experience"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Study loops.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Run a 5-question quiz on yesterday’s chapter.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Study loops\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Study loops.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One quiz session done"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Explain → quiz me → correct me. Keep ownership of answers.",
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
      "id": "cg-debug",
      "phase": "Core",
      "level": "intermediate",
      "title": "Debug prompts",
      "minutes": 30,
      "overview": "Paste error + minimal repro + what you tried.",
      "learn": [
        "Minimal repro",
        "Hypothesis",
        "Verify"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Structure: expected vs actual, snippet, stack, what you already tried.",
          "learnMore": "Ask for 2 hypotheses ranked, not 20 random fixes.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://platform.openai.com/docs/guides/prompt-engineering",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Include in a debug prompt…",
            "options": [
              "Only “fix it”",
              "Error + repro + attempts",
              "Your password",
              "Entire node_modules"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Debug prompts.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Debug one real error using that template.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Debug prompts\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Debug prompts.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Template saved in notes"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Paste error + minimal repro + what you tried.",
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
      "id": "cg-review",
      "phase": "Core",
      "level": "intermediate",
      "title": "Review & critique",
      "minutes": 30,
      "overview": "Have AI review your test plan or README against a checklist you own.",
      "learn": [
        "Rubrics",
        "Diff review",
        "Voice"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Give a rubric first (clarity, risks, missing cases). Ask for gaps only.",
          "learnMore": "You decide what to accept — AI doesn’t own quality.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://platform.openai.com/docs/guides/prompt-engineering",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Rubrics help because…",
            "options": [
              "They waste time",
              "They focus critique on what you care about",
              "They replace tests",
              "They hide bugs"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Review prompts.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Review your latest README with a 5-point rubric.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Review prompts\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Review prompts.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Rubric reused twice"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Have AI review your test plan or README against a checklist you own.",
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
  ]
};
