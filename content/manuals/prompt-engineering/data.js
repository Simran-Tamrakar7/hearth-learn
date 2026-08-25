/** Chapter body for /manuals/prompt-engineering. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "prompt-engineering",
  "title": "Prompt Engineering",
  "tagline": "Talk to models so they do useful, reliable work — not vibe-based guessing.",
  "category": "ai",
  "accent": "#0F5C4C",
  "cover": "covers/prompt-engineering-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Anyone using ChatGPT, Claude, or Cursor who wants consistent, verifiable results.",
  "outcomes": [
    "Write prompts with role, context, constraints, and format",
    "Iterate with rubrics and evals instead of random re-rolls",
    "Build reusable prompt patterns for work and coding"
  ],
  "chapters": [
    {
      "id": "pe-start",
      "phase": "Start",
      "level": "beginner",
      "title": "How LLMs actually work",
      "minutes": 25,
      "overview": "Models predict the next token — they do not \"know\" facts. Treat every output as a draft until verified. This mental model saves you from trusting confident nonsense.",
      "learn": [
        "Token prediction",
        "Hallucination risk",
        "Temperature & sampling"
      ],
      "steps": [
        {
          "title": "Predict vs retrieve",
          "body": "LLMs generate plausible text. They are not search engines. Ask the same factual question twice — note when answers drift.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ask a model for a citation to a real paper. Verify the URL exists.",
          "tip": "If accuracy matters, require sources you can click.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Temperature intuition",
          "body": "Low temperature = more deterministic. High = more creative. Match setting to task.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run the same creative prompt at temp 0.2 vs 1.0. Compare.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Verified one model claim manually",
        "Understand temp tradeoff"
      ],
      "practice": {
        "title": "Skeptic log",
        "brief": "Log 3 outputs you verified and 1 you caught as wrong."
      },
      "resources": [
        {
          "type": "doc",
          "name": "OpenAI — How models work",
          "url": "https://platform.openai.com/docs/guides/prompt-engineering",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Anthropic — Claude overview",
          "url": "https://docs.anthropic.com/en/docs/overview",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Models predict the next token — they do not \"know\" facts. Treat every output as a draft until verified. This mental model saves you from trusting confident nonsense.",
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
      "id": "pe-anatomy",
      "phase": "A · Structure",
      "level": "beginner",
      "title": "Prompt anatomy: role, goal, context, constraints, format",
      "minutes": 30,
      "overview": "Structure beats adjectives. A good prompt names who the model is, what it must produce, what context it has, what it must not do, and how output should look.",
      "learn": [
        "Prompt anatomy",
        "Specificity",
        "Output schemas"
      ],
      "steps": [
        {
          "title": "Rewrite a vague prompt",
          "body": "Turn \"write about testing\" into a structured brief: audience, length, tone, format, constraints.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Side-by-side: vague vs structured. Compare outputs on the same topic.",
          "tip": "One concrete example beats three adjectives.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Add output format",
          "body": "JSON, markdown table, bullet list, numbered steps — tell the model exactly how to shape the answer.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ask for the same summary as JSON and as markdown. Note which is easier to use downstream.",
          "tip": null,
          "code": "# Structured prompt template\nRole: You are a senior QA engineer reviewing test plans.\nGoal: Review the test plan below and list gaps.\nContext: [paste test plan]\nConstraints: No generic advice. Reference specific sections.\nFormat: Markdown table with columns: Gap | Risk | Suggested test",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Anatomy template saved",
        "One vague→structured comparison done"
      ],
      "practice": {
        "title": "Work prompt",
        "brief": "Take a real task from your week; structure it; ship the output."
      },
      "resources": [
        {
          "type": "doc",
          "name": "OpenAI Prompt Engineering",
          "url": "https://platform.openai.com/docs/guides/prompt-engineering",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Anthropic Prompt Library",
          "url": "https://docs.anthropic.com/en/prompt-library/library",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Structure beats adjectives. A good prompt names who the model is, what it must produce, what context it has, what it must not do, and how output should look.",
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
      "id": "pe-context",
      "phase": "A · Structure",
      "level": "beginner",
      "title": "Context windows & token economy",
      "minutes": 30,
      "overview": "Every model has a context limit. Long prompts cost money and attention. Put the most important info first and last — models sometimes lose the middle.",
      "learn": [
        "Context limits",
        "Token budgeting",
        "Lost-in-the-middle"
      ],
      "steps": [
        {
          "title": "Budget your context",
          "body": "Estimate: system instructions + examples + user task + expected output. Trim fluff.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Take a long doc you paste into chat. Summarize it first, then ask questions on the summary.",
          "tip": "For code: paste the relevant function, not the whole repo.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Chunking strategy",
          "body": "Split large inputs. Process in passes. Merge results with a final synthesis prompt.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Process a 10-page doc in 3 chunks. Synthesize with a fourth prompt.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Chunking workflow documented",
        "Trimmed one bloated prompt by 40%"
      ],
      "practice": {
        "title": "Context audit",
        "brief": "Review your last 5 prompts. Cut unnecessary context from one."
      },
      "resources": [
        {
          "type": "article",
          "name": "Lost in the Middle (paper)",
          "url": "https://arxiv.org/abs/2307.03172",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "OpenAI Tokenizer",
          "url": "https://platform.openai.com/tokenizer",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Every model has a context limit. Long prompts cost money and attention. Put the most important info first and last — models sometimes lose the middle.",
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
      "id": "pe-fewshot",
      "phase": "A · Structure",
      "level": "intermediate",
      "title": "Few-shot examples & negative constraints",
      "minutes": 35,
      "overview": "Show 1–3 input→output examples for the pattern you want. Also say what NOT to do — models respond well to explicit boundaries.",
      "learn": [
        "Few-shot prompting",
        "Negative constraints",
        "Edge case examples"
      ],
      "steps": [
        {
          "title": "Build a 3-example set",
          "body": "Pick a repetitive task (bug titles, test case names, commit messages). Write 3 gold examples.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Prompt with examples. Compare output quality vs zero-shot.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Add \"do not\" rules",
          "body": "\"Do not invent features. Do not use passive voice. Do not exceed 100 words.\"",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add 3 negative constraints to a prompt. Measure violation rate on 5 runs.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "3-example set saved",
        "Negative constraints tested"
      ],
      "practice": {
        "title": "Test case generator",
        "brief": "Few-shot prompt that turns user stories into Given/When/Then cases."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Prompting Guide — Few-shot",
          "url": "https://www.promptingguide.ai/techniques/fewshot",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Show 1–3 input→output examples for the pattern you want. Also say what NOT to do — models respond well to explicit boundaries.",
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
      "id": "pe-cp-a",
      "kind": "checkpoint",
      "phase": "A · Structure",
      "level": "beginner",
      "title": "Checkpoint A — Structured prompts",
      "minutes": 20,
      "durationLabel": "Gate",
      "overview": "Prove you can write structured, verifiable prompts before moving to advanced patterns.",
      "learn": [
        "Self-review",
        "Pass criteria"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "All must be true before Phase B.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify each item. Fix gaps today.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Saved prompt anatomy template (role/goal/context/constraints/format)",
            "One side-by-side comparison: vague vs structured prompt",
            "One prompt with 3 few-shot examples that works reliably",
            "One output you manually verified for factual accuracy"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 4 criteria verified",
        "Template file saved in your notes"
      ],
      "practice": {
        "title": "Share one prompt",
        "brief": "Give a teammate your best structured prompt. Get feedback."
      },
      "note": "Pace: 1 week on Phase A is normal. Do not rush past verification habits.",
      "parentId": null,
      "overviewText": "Prove you can write structured, verifiable prompts before moving to advanced patterns.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "partIntro": null
    },
    {
      "id": "pe-patterns",
      "phase": "B · Patterns",
      "level": "intermediate",
      "title": "Decompose, rubric, chain-of-thought",
      "minutes": 40,
      "overview": "Complex tasks fail in one shot. Outline → draft → critique → revise. Score outputs with rubrics. Ask models to think step-by-step for reasoning tasks.",
      "learn": [
        "Task decomposition",
        "Rubrics",
        "Chain-of-thought"
      ],
      "steps": [
        {
          "title": "Build a rubric",
          "body": "Criteria with 1–5 scores: accuracy, completeness, clarity, actionability. Improve the prompt until scores rise.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Code-review prompt + rubric. Score 3 outputs. Iterate once.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Chain-of-thought for hard problems",
          "body": "\"Think step by step\" or \"show your reasoning before the final answer.\" Useful for debugging, math, logic.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Compare direct answer vs step-by-step on a tricky QA scenario question.",
          "tip": "For production: ask for reasoning in a separate block you can discard.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Rubric used on 3 outputs",
        "CoT comparison done"
      ],
      "practice": {
        "title": "Template library",
        "brief": "3 reusable prompts: summarize, critique, plan."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Prompting Guide — CoT",
          "url": "https://www.promptingguide.ai/techniques/cot",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "PromptFoo",
          "url": "https://www.promptfoo.dev/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Complex tasks fail in one shot. Outline → draft → critique → revise. Score outputs with rubrics. Ask models to think step-by-step for reasoning tasks.",
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
      "id": "pe-system",
      "phase": "B · Patterns",
      "level": "intermediate",
      "title": "System prompts & multi-turn conversations",
      "minutes": 35,
      "overview": "System prompts set stable behavior. User messages carry variable tasks. Design conversations that do not drift across turns.",
      "learn": [
        "System vs user",
        "Conversation state",
        "Drift prevention"
      ],
      "steps": [
        {
          "title": "Write a system prompt",
          "body": "Persona, expertise boundaries, output rules, safety rails. Keep it under 500 tokens.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "System prompt for a \"QA mentor\" persona. Test across 5 different questions.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Combat drift",
          "body": "Long chats forget instructions. Re-inject constraints every 5–10 turns or start fresh with a summary.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run a 15-turn conversation. Note when the model stops following rules.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "System prompt saved",
        "Drift test documented"
      ],
      "practice": {
        "title": "Agent-ready brief",
        "brief": "Write a Cursor-style task brief: paths, constraints, acceptance criteria."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Anthropic — System prompts",
          "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "System prompts set stable behavior. User messages carry variable tasks. Design conversations that do not drift across turns.",
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
      "id": "pe-structured-output",
      "phase": "B · Patterns",
      "level": "intermediate",
      "title": "Structured output: JSON mode & schemas",
      "minutes": 35,
      "overview": "When downstream code consumes model output, free text is fragile. Use JSON mode, schemas, or XML tags for parseable results.",
      "learn": [
        "JSON mode",
        "Schema validation",
        "XML tags"
      ],
      "steps": [
        {
          "title": "JSON extraction prompt",
          "body": "Define the exact schema. Ask for JSON only. Validate with a parser.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Extract test cases from a paragraph into JSON array. Parse with JSON.parse().",
          "tip": null,
          "code": "{\n  \"test_cases\": [\n    {\n      \"id\": \"TC-001\",\n      \"title\": \"Login with valid credentials\",\n      \"steps\": [\"Navigate to /login\", \"Enter valid user/pass\", \"Click Submit\"],\n      \"expected\": \"Dashboard loads\"\n    }\n  ]\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Handle parse failures",
          "body": "Models sometimes wrap JSON in markdown fences. Strip fences. Retry with \"JSON only, no markdown.\"",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a 5-line parser that handles fenced and raw JSON.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "JSON prompt works 4/5 times",
        "Parser handles fences"
      ],
      "practice": {
        "title": "Bug report extractor",
        "brief": "Prompt that turns Slack messages into structured bug reports."
      },
      "resources": [
        {
          "type": "doc",
          "name": "OpenAI — Structured outputs",
          "url": "https://platform.openai.com/docs/guides/structured-outputs",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "When downstream code consumes model output, free text is fragile. Use JSON mode, schemas, or XML tags for parseable results.",
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
      "id": "pe-cp-b",
      "kind": "checkpoint",
      "phase": "B · Patterns",
      "level": "intermediate",
      "title": "Checkpoint B — Patterns in production",
      "minutes": 25,
      "durationLabel": "Gate",
      "overview": "Prove you can decompose tasks, score outputs, and produce structured results.",
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify all before Phase C.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Rubric with 4+ criteria used on real outputs",
            "System prompt tested across 5+ turns",
            "JSON extraction prompt that parses cleanly 4/5 times",
            "3 reusable prompt templates in a personal library"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 4 criteria green",
        "Template library file exists"
      ],
      "practice": {
        "title": "Peer review",
        "brief": "Swap prompts with a colleague. Score each other's with your rubric."
      },
      "parentId": null,
      "overviewText": "Prove you can decompose tasks, score outputs, and produce structured results.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "learn": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "pe-evals",
      "phase": "C · Production",
      "level": "advanced",
      "title": "Evals, golden sets & failure modes",
      "minutes": 45,
      "overview": "Ship prompts like code: version them, test on golden cases, track regressions. Know the failure modes: hallucination, sycophancy, prompt injection.",
      "learn": [
        "Eval harnesses",
        "Golden sets",
        "Failure modes"
      ],
      "steps": [
        {
          "title": "Build a 10-case eval set",
          "body": "Mix easy, medium, adversarial. Run before/after prompt changes. No vibes-only shipping.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "10 cases for one prompt. Baseline score. Improve prompt. Re-score.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Failure mode checklist",
          "body": "Hallucination (invents facts), sycophancy (agrees with wrong premise), injection (ignores instructions), drift (forgets format).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Deliberately trigger each failure mode once. Document the trigger.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "10-case eval set",
        "4 failure modes documented"
      ],
      "practice": {
        "title": "Regression test",
        "brief": "Change a prompt. Run eval set. Ensure score did not drop."
      },
      "resources": [
        {
          "type": "doc",
          "name": "PromptFoo — Getting started",
          "url": "https://www.promptfoo.dev/docs/getting-started/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "OWASP — LLM Top 10",
          "url": "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Ship prompts like code: version them, test on golden cases, track regressions. Know the failure modes: hallucination, sycophancy, prompt injection.",
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
      "id": "pe-team",
      "phase": "C · Production",
      "level": "advanced",
      "title": "Team libraries, versioning & privacy",
      "minutes": 40,
      "overview": "Prompts at scale need ownership, changelogs, and privacy review. Never paste secrets, PII, or proprietary code into public models.",
      "learn": [
        "Prompt versioning",
        "Team workflows",
        "Privacy & compliance"
      ],
      "steps": [
        {
          "title": "Prompt README",
          "body": "Purpose, owner, version, eval score, known failures, change log. Treat like API docs.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a README for one team prompt. Include eval score and last tested date.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Privacy checklist",
          "body": "No API keys, passwords, customer data, or unreleased features in prompts. Use redaction or local models for sensitive work.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Audit your last 10 prompts for sensitive data. Redact one.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Prompt README written",
        "Privacy audit done"
      ],
      "practice": {
        "title": "Team contribution",
        "brief": "Propose adding one prompt to a shared library with eval results."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Anthropic — Privacy & data",
          "url": "https://docs.anthropic.com/en/docs/legal/privacy",
          "lang": "EN",
          "free": true
        },
        {
          "type": "book",
          "name": "Co-Intelligence — Ethan Mollick",
          "url": "https://www.wharton.upenn.edu/story/ethan-mollick-co-intelligence/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Prompts at scale need ownership, changelogs, and privacy review. Never paste secrets, PII, or proprietary code into public models.",
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
      "id": "pe-cp-c",
      "kind": "checkpoint",
      "phase": "C · Production",
      "level": "advanced",
      "title": "Checkpoint C — Prompt engineer capstone",
      "minutes": 30,
      "durationLabel": "Capstone",
      "overview": "Final gate: you can design, test, and maintain prompts like production software.",
      "steps": [
        {
          "title": "Capstone deliverables",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Complete all before marking this path done.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Personal prompt library with 5+ templates, each with a rubric",
            "10-case eval set with documented baseline score",
            "One prompt README with version and owner",
            "Privacy audit checklist you reuse",
            "One real work output produced and verified with a structured prompt"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 5 deliverables complete",
        "Shared learnings with one teammate"
      ],
      "practice": {
        "title": "Teach someone",
        "brief": "Walk a colleague through your anatomy template in 15 minutes."
      },
      "note": "Pace: 3–5 weeks total is sustainable. Quality beats speed.",
      "parentId": null,
      "overviewText": "Final gate: you can design, test, and maintain prompts like production software.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "learn": [],
      "links": [],
      "citations": [],
      "resources": [],
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "OpenAI Prompting",
        "url": "https://platform.openai.com/docs/guides/prompt-engineering"
      },
      {
        "name": "Anthropic Library",
        "url": "https://docs.anthropic.com/en/prompt-library/library"
      },
      {
        "name": "Prompting Guide",
        "url": "https://www.promptingguide.ai/"
      }
    ],
    "tools": [
      "ChatGPT / Claude",
      "Cursor",
      "PromptFoo"
    ],
    "books": [
      "Prompting Guide (DAIR.AI)",
      "Co-Intelligence (Mollick)"
    ],
    "practice": [
      "Daily: one real task, one structured prompt, one rubric score"
    ],
    "videos": []
  }
};
