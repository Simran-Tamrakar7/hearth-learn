/** Chapter body for /manuals/ai-agents-workflows. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "ai-agents-workflows",
  "title": "AI Agents & Workflows",
  "tagline": "Beyond single prompts — tools, memory, loops, and safe handoffs.",
  "category": "ai",
  "accent": "#0D9488",
  "cover": "covers/prompt-engineering-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "People who already prompt and want multi-step agents without magic thinking.",
  "outcomes": [
    "Design a tool-using loop",
    "Add guardrails",
    "Know agent vs. workflow"
  ],
  "pace": {
    "hoursPerDay": "30–60 min/day",
    "recommended": "~2–4 weeks",
    "accelerated": "~10 days",
    "slow": "~6 weeks"
  },
  "chapters": [
    {
      "id": "ag-vs",
      "phase": "Start",
      "level": "beginner",
      "title": "Prompt vs agent vs workflow",
      "minutes": 25,
      "overview": "A prompt is one shot. A workflow is fixed steps. An agent chooses tools in a loop.",
      "learn": [
        "Definitions",
        "When each wins"
      ],
      "steps": [
        {
          "title": "Pick the right shape",
          "body": "Use a workflow when steps are known. Use an agent when the path depends on intermediate results.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": {
            "question": "An agent mainly differs by…",
            "options": [
              "Using bigger models only",
              "Choosing tools over multiple steps",
              "Never needing data",
              "Skipping evaluation"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Label 3 tasks as prompt / workflow / agent.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three tasks labeled"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "A prompt is one shot. A workflow is fixed steps. An agent chooses tools in a loop.",
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
      "id": "ag-loop",
      "phase": "Build",
      "level": "beginner",
      "title": "The tool loop",
      "minutes": 40,
      "overview": "Observe → think → act → observe. Cap steps. Log every tool call.",
      "learn": [
        "Tools",
        "Budgets",
        "Logs"
      ],
      "steps": [
        {
          "title": "Tools are APIs with manners",
          "body": "Give each tool a clear name, input schema, and “when to use” note in the system prompt.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a system prompt with 2 tools and a step budget.",
          "tip": "Prefer retrieval over inventing facts.",
          "code": "system: You may use search(), fetch_url(), draft_email().\nStop after 5 tool calls. Cite sources.",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Guardrails",
          "body": "Allow-lists, human approval for send/delete, and red-team prompts that try to escape.",
          "learnMore": "Never give an agent raw credentials in the prompt text.",
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add one “ask human before…” rule.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Tool list written",
        "Budget set"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Observe → think → act → observe. Cap steps. Log every tool call.",
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
      "id": "ag-eval",
      "phase": "Steady",
      "level": "beginner",
      "title": "Evaluate the loop",
      "minutes": 30,
      "overview": "Score task success, cost, and scary failures — not vibes.",
      "learn": [
        "Evals",
        "Cost"
      ],
      "steps": [
        {
          "title": "Tiny eval set",
          "body": "10 real tasks with expected outcomes. Run weekly when you change prompts/tools.",
          "learnMore": null,
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://platform.openai.com/docs/guides/agents",
              "kind": "Docs"
            }
          ],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 5 eval tasks for your agent idea.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Five evals drafted"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Score task success, cost, and scary failures — not vibes.",
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
