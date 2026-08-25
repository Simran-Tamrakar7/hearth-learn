/** Chapter body for /manuals/ai-coding. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "ai-coding",
  "title": "AI Coding with Cursor",
  "tagline": "Ship faster with agents — without shipping bugs you did not read.",
  "category": "ai",
  "accent": "#1E3A5F",
  "cover": "covers/javascript-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Developers and QA engineers using Cursor, Copilot, or similar AI coding tools.",
  "outcomes": [
    "Write task briefs agents can execute reliably",
    "Review AI-generated code with a systematic checklist",
    "Build safe workflows: test, diff, commit, iterate"
  ],
  "chapters": [
    {
      "id": "ac-start",
      "phase": "Start",
      "level": "beginner",
      "title": "Cursor mental model: chat vs agent vs inline",
      "minutes": 25,
      "overview": "Cursor is an IDE with LLM superpowers. Chat for questions. Agent for multi-file tasks. Inline (Tab/Cmd+K) for local edits. Pick the right mode or waste tokens.",
      "learn": [
        "Chat vs Agent vs Inline",
        "Context awareness",
        "@ references"
      ],
      "steps": [
        {
          "title": "Three modes, three tasks",
          "body": "Chat: \"Explain this function.\" Inline: rename a variable across a file. Agent: \"Add a login test.\"",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Do one task in each mode. Note which felt fastest and safest.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "@ references",
          "body": "@file, @folder, @codebase, @docs — control what the model sees.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ask about a function using @file vs pasting manually. Compare accuracy.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Used all 3 modes",
        "Tried @file reference"
      ],
      "practice": {
        "title": "Mode cheat sheet",
        "brief": "Write a personal rule: when to use chat vs agent vs inline."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cursor Docs",
          "url": "https://docs.cursor.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Cursor — @ symbols",
          "url": "https://docs.cursor.com/context/@-symbols",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Cursor is an IDE with LLM superpowers. Chat for questions. Agent for multi-file tasks. Inline (Tab/Cmd+K) for local edits. Pick the right mode or waste tokens.",
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
      "id": "ac-briefs",
      "phase": "A · Task Design",
      "level": "beginner",
      "title": "Writing agent task briefs",
      "minutes": 35,
      "overview": "Agents fail on vague tasks. A good brief: goal, scope (files/paths), constraints, acceptance criteria, and what NOT to touch.",
      "learn": [
        "Task briefs",
        "Scope control",
        "Acceptance criteria"
      ],
      "steps": [
        {
          "title": "Brief template",
          "body": "Goal / Files / Constraints / Acceptance / Do-not-touch.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a brief for \"add input validation to the login form.\" Run it.",
          "tip": null,
          "code": "## Goal\nAdd client-side email validation to LoginForm.jsx\n\n## Files\n- src/components/LoginForm.jsx\n- src/components/LoginForm.test.jsx (create if missing)\n\n## Constraints\n- Use existing form library (react-hook-form)\n- Show inline error below field\n- No new dependencies\n\n## Acceptance\n- Invalid email shows \"Enter a valid email\"\n- Valid email clears error\n- Test covers both cases\n\n## Do NOT touch\n- Auth logic in src/api/auth.js\n- Routing",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Scope creep prevention",
          "body": "\"Do NOT touch\" is as important as the goal. Agents love to refactor neighboring code.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run a brief with and without do-not-touch. Compare diff size.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Brief template saved",
        "One agent task completed from brief"
      ],
      "practice": {
        "title": "Bug fix brief",
        "brief": "Write a brief for a real bug. Execute. Review diff before accepting."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cursor — Agent mode",
          "url": "https://docs.cursor.com/agent",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Agents fail on vague tasks. A good brief: goal, scope (files/paths), constraints, acceptance criteria, and what NOT to touch.",
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
      "id": "ac-context",
      "phase": "A · Task Design",
      "level": "beginner",
      "title": "Context management for code agents",
      "minutes": 30,
      "overview": "Agents work best with focused context. Open relevant files, use .cursorrules, and keep conversations scoped to one feature at a time.",
      "learn": [
        ".cursorrules",
        "Focused context",
        "Conversation scoping"
      ],
      "steps": [
        {
          "title": "Write .cursorrules",
          "body": "Project conventions the agent should always follow: test framework, naming, lint rules, commit style.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create .cursorrules with 5 project-specific rules. Run an agent task.",
          "tip": null,
          "code": "# .cursorrules\n- Use Vitest for tests, not Jest\n- Components in PascalCase, hooks in camelCase with \"use\" prefix\n- All API calls go through src/api/client.ts\n- Prefer functional components with TypeScript\n- Run `npm run lint` before considering a task done",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "One feature per conversation",
          "body": "Long agent threads accumulate confusion. Start fresh for each feature or bug.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Compare: one long thread vs two fresh threads for two small tasks.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        ".cursorrules file created",
        "Fresh-thread habit started"
      ],
      "practice": {
        "title": "Rules iteration",
        "brief": "After 3 agent tasks, update .cursorrules with one new rule."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cursor — Rules",
          "url": "https://docs.cursor.com/context/rules",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Agents work best with focused context. Open relevant files, use .cursorrules, and keep conversations scoped to one feature at a time.",
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
      "id": "ac-cp-a",
      "kind": "checkpoint",
      "phase": "A · Task Design",
      "level": "beginner",
      "title": "Checkpoint A — Agent basics",
      "minutes": 20,
      "durationLabel": "Gate",
      "overview": "Prove you can brief and scope agent tasks before advanced workflows.",
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Verify all before Phase B.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Used chat, inline, and agent modes at least once each",
            "Task brief template with acceptance criteria saved",
            ".cursorrules file with 5+ project rules",
            "One agent task completed; diff reviewed before accept"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 4 criteria green"
      ],
      "note": "Pace: spend a full week here if agent diffs still surprise you.",
      "parentId": null,
      "overviewText": "Prove you can brief and scope agent tasks before advanced workflows.",
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
    },
    {
      "id": "ac-review",
      "phase": "B · Review & Test",
      "level": "intermediate",
      "title": "Reviewing AI-generated code",
      "minutes": 40,
      "overview": "Never accept agent output blindly. Read every line. Check edge cases, security, tests, and style. You own the code, not the model.",
      "learn": [
        "Diff review",
        "Security checklist",
        "Test verification"
      ],
      "steps": [
        {
          "title": "Review checklist",
          "body": "Logic correct? Edge cases? Tests exist and pass? Secrets leaked? Dependencies justified? Style matches project?",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Review an agent diff with the checklist. Find at least one issue to fix.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Logic handles null/empty/error paths",
            "No hardcoded secrets or API keys",
            "Tests cover happy path + one failure path",
            "No unnecessary new dependencies",
            "Matches existing naming and patterns"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Run tests before accept",
          "body": "Agent says \"done\" but tests may not exist or may fail. Always run the test suite.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Accept an agent change only after npm test / pytest passes green.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Review checklist saved",
        "Caught one agent mistake in review"
      ],
      "practice": {
        "title": "Red team",
        "brief": "Ask agent to add a feature. Deliberately find 2 bugs in its output."
      },
      "resources": [
        {
          "type": "doc",
          "name": "OWASP Code Review Guide",
          "url": "https://owasp.org/www-project-code-review-guide/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Never accept agent output blindly. Read every line. Check edge cases, security, tests, and style. You own the code, not the model.",
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
      "id": "ac-tdd",
      "phase": "B · Review & Test",
      "level": "intermediate",
      "title": "Test-driven prompting",
      "minutes": 35,
      "overview": "Write tests first, then ask the agent to make them pass. TDD + AI = fewer hallucinated implementations.",
      "learn": [
        "TDD with agents",
        "Test-first briefs",
        "Red-green-refactor"
      ],
      "steps": [
        {
          "title": "Test-first workflow",
          "body": "1) Write failing test. 2) Brief agent: \"Make this test pass. Do not change the test.\" 3) Review. 4) Refactor.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a failing test for a utility function. Agent makes it pass.",
          "tip": null,
          "code": "// You write this test first:\nimport { describe, it, expect } from 'vitest'\nimport { formatCurrency } from './format'\n\ndescribe('formatCurrency', () => {\n  it('formats USD with 2 decimals', () => {\n    expect(formatCurrency(1234.5, 'USD')).toBe('$1,234.50')\n  })\n  it('handles zero', () => {\n    expect(formatCurrency(0, 'USD')).toBe('$0.00')\n  })\n})\n\n// Then brief agent: \"Implement formatCurrency to pass these tests.\"",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Guard the test file",
          "body": "Tell agent explicitly: \"Do not modify test files.\" Prevents cheated passes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run test-first workflow on 2 functions.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Test-first workflow done twice",
        "Agent did not modify tests"
      ],
      "practice": {
        "title": "Page object TDD",
        "brief": "Write a Playwright test first. Agent builds the page object."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Vitest — Getting Started",
          "url": "https://vitest.dev/guide/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Write tests first, then ask the agent to make them pass. TDD + AI = fewer hallucinated implementations.",
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
      "id": "ac-debug",
      "phase": "B · Review & Test",
      "level": "intermediate",
      "title": "Debugging with AI: paste errors, not vibes",
      "minutes": 30,
      "overview": "When stuck, paste the exact error, the relevant code, and what you already tried. \"It does not work\" produces garbage.",
      "learn": [
        "Error-driven debugging",
        "Minimal repro",
        "Iterative fix loops"
      ],
      "steps": [
        {
          "title": "Error sandwich prompt",
          "body": "Error message + relevant code + expected behavior + what you tried.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Take a real error from your terminal. Use the sandwich. Compare to \"fix this.\"",
          "tip": null,
          "code": "## Error\nTypeError: Cannot read properties of undefined (reading 'map')\n  at UserList.jsx:14\n\n## Code (UserList.jsx lines 1-20)\n[paste]\n\n## Expected\nList renders user names from API response\n\n## Tried\n- Added optional chaining on line 14\n- Still fails on first render before data loads",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Minimal repro",
          "body": "If error persists, ask agent to create the smallest file that reproduces it.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Isolate one bug to a single-file repro with agent help.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Error sandwich template saved",
        "Fixed one bug with structured debug prompt"
      ],
      "practice": {
        "title": "Debug log",
        "brief": "Log 3 bugs you fixed with AI. Note which prompt structure worked best."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cursor — Chat",
          "url": "https://docs.cursor.com/chat",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "When stuck, paste the exact error, the relevant code, and what you already tried. \"It does not work\" produces garbage.",
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
      "id": "ac-cp-b",
      "kind": "checkpoint",
      "phase": "B · Review & Test",
      "level": "intermediate",
      "title": "Checkpoint B — Safe agent workflows",
      "minutes": 25,
      "durationLabel": "Gate",
      "overview": "Prove you review, test, and debug agent output systematically.",
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
            "Review checklist used on 3+ agent diffs",
            "Test-first workflow completed at least once",
            "Fixed one bug using error sandwich prompt",
            "Zero unreviewed agent commits on main branch"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 4 criteria green"
      ],
      "parentId": null,
      "overviewText": "Prove you review, test, and debug agent output systematically.",
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
      "id": "ac-workflows",
      "phase": "C · Production",
      "level": "advanced",
      "title": "Production workflows: branches, commits, CI",
      "minutes": 40,
      "overview": "Agent code goes through the same git hygiene as human code. Feature branches, small commits, CI gates, PR review.",
      "learn": [
        "Git workflow with agents",
        "Commit discipline",
        "CI integration"
      ],
      "steps": [
        {
          "title": "Agent branch workflow",
          "body": "1) Create feature branch. 2) Agent task on branch. 3) Review diff. 4) Run tests + lint. 5) Commit with descriptive message. 6) PR.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Complete one full feature using this workflow.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Commit message quality",
          "body": "Agent commits can be vague. Rewrite messages to explain WHY, not just WHAT.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Review last 5 agent commits. Rewrite 2 messages.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Full branch workflow done once",
        "2 commit messages improved"
      ],
      "practice": {
        "title": "PR description",
        "brief": "Write a PR description that explains agent vs human contributions."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GitHub Flow",
          "url": "https://docs.github.com/en/get-started/using-github/github-flow",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Agent code goes through the same git hygiene as human code. Feature branches, small commits, CI gates, PR review.",
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
      "id": "ac-refactor",
      "phase": "C · Production",
      "level": "advanced",
      "title": "Refactoring & codebase navigation with agents",
      "minutes": 40,
      "overview": "Agents excel at mechanical refactors (rename, extract, migrate). Guide them with search results and explicit file lists.",
      "learn": [
        "Guided refactors",
        "Codemods vs agents",
        "Large-scale changes"
      ],
      "steps": [
        {
          "title": "Scoped refactor brief",
          "body": "\"Rename UserService to AccountService in src/services/ only. Update imports. Run tests.\"",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Execute a rename refactor with agent. Verify with grep that no old name remains.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When NOT to use agents",
          "body": "Architecture decisions, security-critical changes, and performance optimization need human judgment first.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "List 3 tasks you would NOT delegate to an agent. Explain why.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One scoped refactor done",
        "3 agent-unsafe tasks documented"
      ],
      "practice": {
        "title": "Migration assist",
        "brief": "Use agent to migrate one file from JS to TS. Review types manually."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Cursor — Codebase indexing",
          "url": "https://docs.cursor.com/context/codebase-indexing",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Agents excel at mechanical refactors (rename, extract, migrate). Guide them with search results and explicit file lists.",
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
      "id": "ac-cp-c",
      "kind": "checkpoint",
      "phase": "C · Production",
      "level": "advanced",
      "title": "Checkpoint C — AI coding capstone",
      "minutes": 30,
      "durationLabel": "Capstone",
      "overview": "Final gate: you ship agent-assisted code safely and systematically.",
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
            ".cursorrules file refined over 5+ agent sessions",
            "Task brief template used on 3+ real features",
            "Review checklist with at least one caught agent bug",
            "One full feature shipped via branch → review → test → PR workflow",
            "Personal doc: when to use agent vs write code yourself"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 5 deliverables complete"
      ],
      "practice": {
        "title": "Team share",
        "brief": "Share your .cursorrules and review checklist with your team."
      },
      "note": "Pace: 2–4 weeks. The habit of reviewing diffs matters more than speed.",
      "parentId": null,
      "overviewText": "Final gate: you ship agent-assisted code safely and systematically.",
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
        "name": "Cursor Docs",
        "url": "https://docs.cursor.com/"
      },
      {
        "name": "Cursor Rules",
        "url": "https://docs.cursor.com/context/rules"
      }
    ],
    "tools": [
      "Cursor",
      "Vitest / pytest",
      "Git"
    ],
    "books": [],
    "practice": [
      "One agent task per day with mandatory diff review"
    ],
    "videos": []
  }
};
