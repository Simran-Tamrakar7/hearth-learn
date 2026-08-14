import { ch, r } from '../helpers.js'

export const aiManuals = [
  {
    id: 'prompt-engineering',
    title: 'Prompt Engineering',
    tagline: 'Talk to models so they do useful, reliable work — not vibe-based guessing.',
    category: 'ai',
    accent: '#0F5C4C',
    cover: 'covers/prompt-engineering-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Anyone using ChatGPT, Claude, or Cursor who wants consistent, verifiable results.',
    outcomes: [
      'Write prompts with role, context, constraints, and format',
      'Iterate with rubrics and evals instead of random re-rolls',
      'Build reusable prompt patterns for work and coding',
    ],
    chapters: [
      ch({
        id: 'pe-start',
        phase: 'Start',
        level: 'beginner',
        title: 'How LLMs actually work',
        minutes: 25,
        overview:
          'Models predict the next token — they do not "know" facts. Treat every output as a draft until verified. This mental model saves you from trusting confident nonsense.',
        learn: ['Token prediction', 'Hallucination risk', 'Temperature & sampling'],
        steps: [
          {
            title: 'Predict vs retrieve',
            body: 'LLMs generate plausible text. They are not search engines. Ask the same factual question twice — note when answers drift.',
            doThis: 'Ask a model for a citation to a real paper. Verify the URL exists.',
            tip: 'If accuracy matters, require sources you can click.',
          },
          {
            title: 'Temperature intuition',
            body: 'Low temperature = more deterministic. High = more creative. Match setting to task.',
            doThis: 'Run the same creative prompt at temp 0.2 vs 1.0. Compare.',
          },
        ],
        checklist: ['Verified one model claim manually', 'Understand temp tradeoff'],
        practice: { title: 'Skeptic log', brief: 'Log 3 outputs you verified and 1 you caught as wrong.' },
        resources: [
          r('doc', 'OpenAI — How models work', 'https://platform.openai.com/docs/guides/prompt-engineering', 'EN'),
          r('doc', 'Anthropic — Claude overview', 'https://docs.anthropic.com/en/docs/overview', 'EN'),
        ],
      }),

      ch({
        id: 'pe-anatomy',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'Prompt anatomy: role, goal, context, constraints, format',
        minutes: 30,
        overview:
          'Structure beats adjectives. A good prompt names who the model is, what it must produce, what context it has, what it must not do, and how output should look.',
        learn: ['Prompt anatomy', 'Specificity', 'Output schemas'],
        steps: [
          {
            title: 'Rewrite a vague prompt',
            body: 'Turn "write about testing" into a structured brief: audience, length, tone, format, constraints.',
            doThis: 'Side-by-side: vague vs structured. Compare outputs on the same topic.',
            tip: 'One concrete example beats three adjectives.',
          },
          {
            title: 'Add output format',
            body: 'JSON, markdown table, bullet list, numbered steps — tell the model exactly how to shape the answer.',
            doThis: 'Ask for the same summary as JSON and as markdown. Note which is easier to use downstream.',
            code: `# Structured prompt template
Role: You are a senior QA engineer reviewing test plans.
Goal: Review the test plan below and list gaps.
Context: [paste test plan]
Constraints: No generic advice. Reference specific sections.
Format: Markdown table with columns: Gap | Risk | Suggested test`,
          },
        ],
        checklist: ['Anatomy template saved', 'One vague→structured comparison done'],
        practice: { title: 'Work prompt', brief: 'Take a real task from your week; structure it; ship the output.' },
        resources: [
          r('doc', 'OpenAI Prompt Engineering', 'https://platform.openai.com/docs/guides/prompt-engineering', 'EN'),
          r('doc', 'Anthropic Prompt Library', 'https://docs.anthropic.com/en/prompt-library/library', 'EN'),
        ],
      }),

      ch({
        id: 'pe-context',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'Context windows & token economy',
        minutes: 30,
        overview:
          'Every model has a context limit. Long prompts cost money and attention. Put the most important info first and last — models sometimes lose the middle.',
        learn: ['Context limits', 'Token budgeting', 'Lost-in-the-middle'],
        steps: [
          {
            title: 'Budget your context',
            body: 'Estimate: system instructions + examples + user task + expected output. Trim fluff.',
            doThis: 'Take a long doc you paste into chat. Summarize it first, then ask questions on the summary.',
            tip: 'For code: paste the relevant function, not the whole repo.',
          },
          {
            title: 'Chunking strategy',
            body: 'Split large inputs. Process in passes. Merge results with a final synthesis prompt.',
            doThis: 'Process a 10-page doc in 3 chunks. Synthesize with a fourth prompt.',
          },
        ],
        checklist: ['Chunking workflow documented', 'Trimmed one bloated prompt by 40%'],
        practice: { title: 'Context audit', brief: 'Review your last 5 prompts. Cut unnecessary context from one.' },
        resources: [
          r('article', 'Lost in the Middle (paper)', 'https://arxiv.org/abs/2307.03172', 'EN'),
          r('tool', 'OpenAI Tokenizer', 'https://platform.openai.com/tokenizer', 'EN'),
        ],
      }),

      ch({
        id: 'pe-fewshot',
        phase: 'A · Structure',
        level: 'intermediate',
        title: 'Few-shot examples & negative constraints',
        minutes: 35,
        overview:
          'Show 1–3 input→output examples for the pattern you want. Also say what NOT to do — models respond well to explicit boundaries.',
        learn: ['Few-shot prompting', 'Negative constraints', 'Edge case examples'],
        steps: [
          {
            title: 'Build a 3-example set',
            body: 'Pick a repetitive task (bug titles, test case names, commit messages). Write 3 gold examples.',
            doThis: 'Prompt with examples. Compare output quality vs zero-shot.',
          },
          {
            title: 'Add "do not" rules',
            body: '"Do not invent features. Do not use passive voice. Do not exceed 100 words."',
            doThis: 'Add 3 negative constraints to a prompt. Measure violation rate on 5 runs.',
          },
        ],
        checklist: ['3-example set saved', 'Negative constraints tested'],
        practice: { title: 'Test case generator', brief: 'Few-shot prompt that turns user stories into Given/When/Then cases.' },
        resources: [
          r('doc', 'Prompting Guide — Few-shot', 'https://www.promptingguide.ai/techniques/fewshot', 'EN'),
        ],
      }),

      ch({
        id: 'pe-cp-a',
        kind: 'checkpoint',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'Checkpoint A — Structured prompts',
        minutes: 20,
        durationLabel: 'Gate',
        overview: 'Prove you can write structured, verifiable prompts before moving to advanced patterns.',
        learn: ['Self-review', 'Pass criteria'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'All must be true before Phase B.',
            doThis: 'Verify each item. Fix gaps today.',
            items: [
              'Saved prompt anatomy template (role/goal/context/constraints/format)',
              'One side-by-side comparison: vague vs structured prompt',
              'One prompt with 3 few-shot examples that works reliably',
              'One output you manually verified for factual accuracy',
            ],
          },
        ],
        checklist: ['All 4 criteria verified', 'Template file saved in your notes'],
        practice: { title: 'Share one prompt', brief: 'Give a teammate your best structured prompt. Get feedback.' },
        note: 'Pace: 1 week on Phase A is normal. Do not rush past verification habits.',
      }),

      ch({
        id: 'pe-patterns',
        phase: 'B · Patterns',
        level: 'intermediate',
        title: 'Decompose, rubric, chain-of-thought',
        minutes: 40,
        overview:
          'Complex tasks fail in one shot. Outline → draft → critique → revise. Score outputs with rubrics. Ask models to think step-by-step for reasoning tasks.',
        learn: ['Task decomposition', 'Rubrics', 'Chain-of-thought'],
        steps: [
          {
            title: 'Build a rubric',
            body: 'Criteria with 1–5 scores: accuracy, completeness, clarity, actionability. Improve the prompt until scores rise.',
            doThis: 'Code-review prompt + rubric. Score 3 outputs. Iterate once.',
          },
          {
            title: 'Chain-of-thought for hard problems',
            body: '"Think step by step" or "show your reasoning before the final answer." Useful for debugging, math, logic.',
            doThis: 'Compare direct answer vs step-by-step on a tricky QA scenario question.',
            tip: 'For production: ask for reasoning in a separate block you can discard.',
          },
        ],
        checklist: ['Rubric used on 3 outputs', 'CoT comparison done'],
        practice: { title: 'Template library', brief: '3 reusable prompts: summarize, critique, plan.' },
        resources: [
          r('doc', 'Prompting Guide — CoT', 'https://www.promptingguide.ai/techniques/cot', 'EN'),
          r('tool', 'PromptFoo', 'https://www.promptfoo.dev/', 'EN'),
        ],
      }),

      ch({
        id: 'pe-system',
        phase: 'B · Patterns',
        level: 'intermediate',
        title: 'System prompts & multi-turn conversations',
        minutes: 35,
        overview:
          'System prompts set stable behavior. User messages carry variable tasks. Design conversations that do not drift across turns.',
        learn: ['System vs user', 'Conversation state', 'Drift prevention'],
        steps: [
          {
            title: 'Write a system prompt',
            body: 'Persona, expertise boundaries, output rules, safety rails. Keep it under 500 tokens.',
            doThis: 'System prompt for a "QA mentor" persona. Test across 5 different questions.',
          },
          {
            title: 'Combat drift',
            body: 'Long chats forget instructions. Re-inject constraints every 5–10 turns or start fresh with a summary.',
            doThis: 'Run a 15-turn conversation. Note when the model stops following rules.',
          },
        ],
        checklist: ['System prompt saved', 'Drift test documented'],
        practice: { title: 'Agent-ready brief', brief: 'Write a Cursor-style task brief: paths, constraints, acceptance criteria.' },
        resources: [
          r('doc', 'Anthropic — System prompts', 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/system-prompts', 'EN'),
        ],
      }),

      ch({
        id: 'pe-structured-output',
        phase: 'B · Patterns',
        level: 'intermediate',
        title: 'Structured output: JSON mode & schemas',
        minutes: 35,
        overview:
          'When downstream code consumes model output, free text is fragile. Use JSON mode, schemas, or XML tags for parseable results.',
        learn: ['JSON mode', 'Schema validation', 'XML tags'],
        steps: [
          {
            title: 'JSON extraction prompt',
            body: 'Define the exact schema. Ask for JSON only. Validate with a parser.',
            doThis: 'Extract test cases from a paragraph into JSON array. Parse with JSON.parse().',
            code: `{
  "test_cases": [
    {
      "id": "TC-001",
      "title": "Login with valid credentials",
      "steps": ["Navigate to /login", "Enter valid user/pass", "Click Submit"],
      "expected": "Dashboard loads"
    }
  ]
}`,
          },
          {
            title: 'Handle parse failures',
            body: 'Models sometimes wrap JSON in markdown fences. Strip fences. Retry with "JSON only, no markdown."',
            doThis: 'Write a 5-line parser that handles fenced and raw JSON.',
          },
        ],
        checklist: ['JSON prompt works 4/5 times', 'Parser handles fences'],
        practice: { title: 'Bug report extractor', brief: 'Prompt that turns Slack messages into structured bug reports.' },
        resources: [
          r('doc', 'OpenAI — Structured outputs', 'https://platform.openai.com/docs/guides/structured-outputs', 'EN'),
        ],
      }),

      ch({
        id: 'pe-cp-b',
        kind: 'checkpoint',
        phase: 'B · Patterns',
        level: 'intermediate',
        title: 'Checkpoint B — Patterns in production',
        minutes: 25,
        durationLabel: 'Gate',
        overview: 'Prove you can decompose tasks, score outputs, and produce structured results.',
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify all before Phase C.',
            items: [
              'Rubric with 4+ criteria used on real outputs',
              'System prompt tested across 5+ turns',
              'JSON extraction prompt that parses cleanly 4/5 times',
              '3 reusable prompt templates in a personal library',
            ],
          },
        ],
        checklist: ['All 4 criteria green', 'Template library file exists'],
        practice: { title: 'Peer review', brief: 'Swap prompts with a colleague. Score each other\'s with your rubric.' },
      }),

      ch({
        id: 'pe-evals',
        phase: 'C · Production',
        level: 'advanced',
        title: 'Evals, golden sets & failure modes',
        minutes: 45,
        overview:
          'Ship prompts like code: version them, test on golden cases, track regressions. Know the failure modes: hallucination, sycophancy, prompt injection.',
        learn: ['Eval harnesses', 'Golden sets', 'Failure modes'],
        steps: [
          {
            title: 'Build a 10-case eval set',
            body: 'Mix easy, medium, adversarial. Run before/after prompt changes. No vibes-only shipping.',
            doThis: '10 cases for one prompt. Baseline score. Improve prompt. Re-score.',
          },
          {
            title: 'Failure mode checklist',
            body: 'Hallucination (invents facts), sycophancy (agrees with wrong premise), injection (ignores instructions), drift (forgets format).',
            doThis: 'Deliberately trigger each failure mode once. Document the trigger.',
          },
        ],
        checklist: ['10-case eval set', '4 failure modes documented'],
        practice: { title: 'Regression test', brief: 'Change a prompt. Run eval set. Ensure score did not drop.' },
        resources: [
          r('doc', 'PromptFoo — Getting started', 'https://www.promptfoo.dev/docs/getting-started/', 'EN'),
          r('doc', 'OWASP — LLM Top 10', 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', 'EN'),
        ],
      }),

      ch({
        id: 'pe-team',
        phase: 'C · Production',
        level: 'advanced',
        title: 'Team libraries, versioning & privacy',
        minutes: 40,
        overview:
          'Prompts at scale need ownership, changelogs, and privacy review. Never paste secrets, PII, or proprietary code into public models.',
        learn: ['Prompt versioning', 'Team workflows', 'Privacy & compliance'],
        steps: [
          {
            title: 'Prompt README',
            body: 'Purpose, owner, version, eval score, known failures, change log. Treat like API docs.',
            doThis: 'Write a README for one team prompt. Include eval score and last tested date.',
          },
          {
            title: 'Privacy checklist',
            body: 'No API keys, passwords, customer data, or unreleased features in prompts. Use redaction or local models for sensitive work.',
            doThis: 'Audit your last 10 prompts for sensitive data. Redact one.',
          },
        ],
        checklist: ['Prompt README written', 'Privacy audit done'],
        practice: { title: 'Team contribution', brief: 'Propose adding one prompt to a shared library with eval results.' },
        resources: [
          r('doc', 'Anthropic — Privacy & data', 'https://docs.anthropic.com/en/docs/legal/privacy', 'EN'),
          r('book', 'Co-Intelligence — Ethan Mollick', 'https://www.wharton.upenn.edu/story/ethan-mollick-co-intelligence/', 'EN'),
        ],
      }),

      ch({
        id: 'pe-cp-c',
        kind: 'checkpoint',
        phase: 'C · Production',
        level: 'advanced',
        title: 'Checkpoint C — Prompt engineer capstone',
        minutes: 30,
        durationLabel: 'Capstone',
        overview: 'Final gate: you can design, test, and maintain prompts like production software.',
        steps: [
          {
            title: 'Capstone deliverables',
            doThis: 'Complete all before marking this path done.',
            items: [
              'Personal prompt library with 5+ templates, each with a rubric',
              '10-case eval set with documented baseline score',
              'One prompt README with version and owner',
              'Privacy audit checklist you reuse',
              'One real work output produced and verified with a structured prompt',
            ],
          },
        ],
        checklist: ['All 5 deliverables complete', 'Shared learnings with one teammate'],
        practice: { title: 'Teach someone', brief: 'Walk a colleague through your anatomy template in 15 minutes.' },
        note: 'Pace: 3–5 weeks total is sustainable. Quality beats speed.',
      }),
    ],
    resources: {
      docs: [
        { name: 'OpenAI Prompting', url: 'https://platform.openai.com/docs/guides/prompt-engineering' },
        { name: 'Anthropic Library', url: 'https://docs.anthropic.com/en/prompt-library/library' },
        { name: 'Prompting Guide', url: 'https://www.promptingguide.ai/' },
      ],
      tools: ['ChatGPT / Claude', 'Cursor', 'PromptFoo'],
      books: ['Prompting Guide (DAIR.AI)', 'Co-Intelligence (Mollick)'],
      practice: ['Daily: one real task, one structured prompt, one rubric score'],
      videos: [],
    },
  },

  {
    id: 'ai-coding',
    title: 'AI Coding with Cursor',
    tagline: 'Ship faster with agents — without shipping bugs you did not read.',
    category: 'ai',
    accent: '#1E3A5F',
    cover: 'covers/javascript-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Developers and QA engineers using Cursor, Copilot, or similar AI coding tools.',
    outcomes: [
      'Write task briefs agents can execute reliably',
      'Review AI-generated code with a systematic checklist',
      'Build safe workflows: test, diff, commit, iterate',
    ],
    chapters: [
      ch({
        id: 'ac-start',
        phase: 'Start',
        level: 'beginner',
        title: 'Cursor mental model: chat vs agent vs inline',
        minutes: 25,
        overview:
          'Cursor is an IDE with LLM superpowers. Chat for questions. Agent for multi-file tasks. Inline (Tab/Cmd+K) for local edits. Pick the right mode or waste tokens.',
        learn: ['Chat vs Agent vs Inline', 'Context awareness', '@ references'],
        steps: [
          {
            title: 'Three modes, three tasks',
            body: 'Chat: "Explain this function." Inline: rename a variable across a file. Agent: "Add a login test."',
            doThis: 'Do one task in each mode. Note which felt fastest and safest.',
          },
          {
            title: '@ references',
            body: '@file, @folder, @codebase, @docs — control what the model sees.',
            doThis: 'Ask about a function using @file vs pasting manually. Compare accuracy.',
          },
        ],
        checklist: ['Used all 3 modes', 'Tried @file reference'],
        practice: { title: 'Mode cheat sheet', brief: 'Write a personal rule: when to use chat vs agent vs inline.' },
        resources: [
          r('doc', 'Cursor Docs', 'https://docs.cursor.com/', 'EN'),
          r('doc', 'Cursor — @ symbols', 'https://docs.cursor.com/context/@-symbols', 'EN'),
        ],
      }),

      ch({
        id: 'ac-briefs',
        phase: 'A · Task Design',
        level: 'beginner',
        title: 'Writing agent task briefs',
        minutes: 35,
        overview:
          'Agents fail on vague tasks. A good brief: goal, scope (files/paths), constraints, acceptance criteria, and what NOT to touch.',
        learn: ['Task briefs', 'Scope control', 'Acceptance criteria'],
        steps: [
          {
            title: 'Brief template',
            body: 'Goal / Files / Constraints / Acceptance / Do-not-touch.',
            doThis: 'Write a brief for "add input validation to the login form." Run it.',
            code: `## Goal
Add client-side email validation to LoginForm.jsx

## Files
- src/components/LoginForm.jsx
- src/components/LoginForm.test.jsx (create if missing)

## Constraints
- Use existing form library (react-hook-form)
- Show inline error below field
- No new dependencies

## Acceptance
- Invalid email shows "Enter a valid email"
- Valid email clears error
- Test covers both cases

## Do NOT touch
- Auth logic in src/api/auth.js
- Routing`,
          },
          {
            title: 'Scope creep prevention',
            body: '"Do NOT touch" is as important as the goal. Agents love to refactor neighboring code.',
            doThis: 'Run a brief with and without do-not-touch. Compare diff size.',
          },
        ],
        checklist: ['Brief template saved', 'One agent task completed from brief'],
        practice: { title: 'Bug fix brief', brief: 'Write a brief for a real bug. Execute. Review diff before accepting.' },
        resources: [
          r('doc', 'Cursor — Agent mode', 'https://docs.cursor.com/agent', 'EN'),
        ],
      }),

      ch({
        id: 'ac-context',
        phase: 'A · Task Design',
        level: 'beginner',
        title: 'Context management for code agents',
        minutes: 30,
        overview:
          'Agents work best with focused context. Open relevant files, use .cursorrules, and keep conversations scoped to one feature at a time.',
        learn: ['.cursorrules', 'Focused context', 'Conversation scoping'],
        steps: [
          {
            title: 'Write .cursorrules',
            body: 'Project conventions the agent should always follow: test framework, naming, lint rules, commit style.',
            doThis: 'Create .cursorrules with 5 project-specific rules. Run an agent task.',
            code: `# .cursorrules
- Use Vitest for tests, not Jest
- Components in PascalCase, hooks in camelCase with "use" prefix
- All API calls go through src/api/client.ts
- Prefer functional components with TypeScript
- Run \`npm run lint\` before considering a task done`,
          },
          {
            title: 'One feature per conversation',
            body: 'Long agent threads accumulate confusion. Start fresh for each feature or bug.',
            doThis: 'Compare: one long thread vs two fresh threads for two small tasks.',
          },
        ],
        checklist: ['.cursorrules file created', 'Fresh-thread habit started'],
        practice: { title: 'Rules iteration', brief: 'After 3 agent tasks, update .cursorrules with one new rule.' },
        resources: [
          r('doc', 'Cursor — Rules', 'https://docs.cursor.com/context/rules', 'EN'),
        ],
      }),

      ch({
        id: 'ac-cp-a',
        kind: 'checkpoint',
        phase: 'A · Task Design',
        level: 'beginner',
        title: 'Checkpoint A — Agent basics',
        minutes: 20,
        durationLabel: 'Gate',
        overview: 'Prove you can brief and scope agent tasks before advanced workflows.',
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify all before Phase B.',
            items: [
              'Used chat, inline, and agent modes at least once each',
              'Task brief template with acceptance criteria saved',
              '.cursorrules file with 5+ project rules',
              'One agent task completed; diff reviewed before accept',
            ],
          },
        ],
        checklist: ['All 4 criteria green'],
        note: 'Pace: spend a full week here if agent diffs still surprise you.',
      }),

      ch({
        id: 'ac-review',
        phase: 'B · Review & Test',
        level: 'intermediate',
        title: 'Reviewing AI-generated code',
        minutes: 40,
        overview:
          'Never accept agent output blindly. Read every line. Check edge cases, security, tests, and style. You own the code, not the model.',
        learn: ['Diff review', 'Security checklist', 'Test verification'],
        steps: [
          {
            title: 'Review checklist',
            body: 'Logic correct? Edge cases? Tests exist and pass? Secrets leaked? Dependencies justified? Style matches project?',
            doThis: 'Review an agent diff with the checklist. Find at least one issue to fix.',
            items: [
              'Logic handles null/empty/error paths',
              'No hardcoded secrets or API keys',
              'Tests cover happy path + one failure path',
              'No unnecessary new dependencies',
              'Matches existing naming and patterns',
            ],
          },
          {
            title: 'Run tests before accept',
            body: 'Agent says "done" but tests may not exist or may fail. Always run the test suite.',
            doThis: 'Accept an agent change only after npm test / pytest passes green.',
          },
        ],
        checklist: ['Review checklist saved', 'Caught one agent mistake in review'],
        practice: { title: 'Red team', brief: 'Ask agent to add a feature. Deliberately find 2 bugs in its output.' },
        resources: [
          r('doc', 'OWASP Code Review Guide', 'https://owasp.org/www-project-code-review-guide/', 'EN'),
        ],
      }),

      ch({
        id: 'ac-tdd',
        phase: 'B · Review & Test',
        level: 'intermediate',
        title: 'Test-driven prompting',
        minutes: 35,
        overview:
          'Write tests first, then ask the agent to make them pass. TDD + AI = fewer hallucinated implementations.',
        learn: ['TDD with agents', 'Test-first briefs', 'Red-green-refactor'],
        steps: [
          {
            title: 'Test-first workflow',
            body: '1) Write failing test. 2) Brief agent: "Make this test pass. Do not change the test." 3) Review. 4) Refactor.',
            doThis: 'Write a failing test for a utility function. Agent makes it pass.',
            code: `// You write this test first:
import { describe, it, expect } from 'vitest'
import { formatCurrency } from './format'

describe('formatCurrency', () => {
  it('formats USD with 2 decimals', () => {
    expect(formatCurrency(1234.5, 'USD')).toBe('$1,234.50')
  })
  it('handles zero', () => {
    expect(formatCurrency(0, 'USD')).toBe('$0.00')
  })
})

// Then brief agent: "Implement formatCurrency to pass these tests."`,
          },
          {
            title: 'Guard the test file',
            body: 'Tell agent explicitly: "Do not modify test files." Prevents cheated passes.',
            doThis: 'Run test-first workflow on 2 functions.',
          },
        ],
        checklist: ['Test-first workflow done twice', 'Agent did not modify tests'],
        practice: { title: 'Page object TDD', brief: 'Write a Playwright test first. Agent builds the page object.' },
        resources: [
          r('doc', 'Vitest — Getting Started', 'https://vitest.dev/guide/', 'EN'),
        ],
      }),

      ch({
        id: 'ac-debug',
        phase: 'B · Review & Test',
        level: 'intermediate',
        title: 'Debugging with AI: paste errors, not vibes',
        minutes: 30,
        overview:
          'When stuck, paste the exact error, the relevant code, and what you already tried. "It does not work" produces garbage.',
        learn: ['Error-driven debugging', 'Minimal repro', 'Iterative fix loops'],
        steps: [
          {
            title: 'Error sandwich prompt',
            body: 'Error message + relevant code + expected behavior + what you tried.',
            doThis: 'Take a real error from your terminal. Use the sandwich. Compare to "fix this."',
            code: `## Error
TypeError: Cannot read properties of undefined (reading 'map')
  at UserList.jsx:14

## Code (UserList.jsx lines 1-20)
[paste]

## Expected
List renders user names from API response

## Tried
- Added optional chaining on line 14
- Still fails on first render before data loads`,
          },
          {
            title: 'Minimal repro',
            body: 'If error persists, ask agent to create the smallest file that reproduces it.',
            doThis: 'Isolate one bug to a single-file repro with agent help.',
          },
        ],
        checklist: ['Error sandwich template saved', 'Fixed one bug with structured debug prompt'],
        practice: { title: 'Debug log', brief: 'Log 3 bugs you fixed with AI. Note which prompt structure worked best.' },
        resources: [
          r('doc', 'Cursor — Chat', 'https://docs.cursor.com/chat', 'EN'),
        ],
      }),

      ch({
        id: 'ac-cp-b',
        kind: 'checkpoint',
        phase: 'B · Review & Test',
        level: 'intermediate',
        title: 'Checkpoint B — Safe agent workflows',
        minutes: 25,
        durationLabel: 'Gate',
        overview: 'Prove you review, test, and debug agent output systematically.',
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify all before Phase C.',
            items: [
              'Review checklist used on 3+ agent diffs',
              'Test-first workflow completed at least once',
              'Fixed one bug using error sandwich prompt',
              'Zero unreviewed agent commits on main branch',
            ],
          },
        ],
        checklist: ['All 4 criteria green'],
      }),

      ch({
        id: 'ac-workflows',
        phase: 'C · Production',
        level: 'advanced',
        title: 'Production workflows: branches, commits, CI',
        minutes: 40,
        overview:
          'Agent code goes through the same git hygiene as human code. Feature branches, small commits, CI gates, PR review.',
        learn: ['Git workflow with agents', 'Commit discipline', 'CI integration'],
        steps: [
          {
            title: 'Agent branch workflow',
            body: '1) Create feature branch. 2) Agent task on branch. 3) Review diff. 4) Run tests + lint. 5) Commit with descriptive message. 6) PR.',
            doThis: 'Complete one full feature using this workflow.',
          },
          {
            title: 'Commit message quality',
            body: 'Agent commits can be vague. Rewrite messages to explain WHY, not just WHAT.',
            doThis: 'Review last 5 agent commits. Rewrite 2 messages.',
          },
        ],
        checklist: ['Full branch workflow done once', '2 commit messages improved'],
        practice: { title: 'PR description', brief: 'Write a PR description that explains agent vs human contributions.' },
        resources: [
          r('doc', 'GitHub Flow', 'https://docs.github.com/en/get-started/using-github/github-flow', 'EN'),
        ],
      }),

      ch({
        id: 'ac-refactor',
        phase: 'C · Production',
        level: 'advanced',
        title: 'Refactoring & codebase navigation with agents',
        minutes: 40,
        overview:
          'Agents excel at mechanical refactors (rename, extract, migrate). Guide them with search results and explicit file lists.',
        learn: ['Guided refactors', 'Codemods vs agents', 'Large-scale changes'],
        steps: [
          {
            title: 'Scoped refactor brief',
            body: '"Rename UserService to AccountService in src/services/ only. Update imports. Run tests."',
            doThis: 'Execute a rename refactor with agent. Verify with grep that no old name remains.',
          },
          {
            title: 'When NOT to use agents',
            body: 'Architecture decisions, security-critical changes, and performance optimization need human judgment first.',
            doThis: 'List 3 tasks you would NOT delegate to an agent. Explain why.',
          },
        ],
        checklist: ['One scoped refactor done', '3 agent-unsafe tasks documented'],
        practice: { title: 'Migration assist', brief: 'Use agent to migrate one file from JS to TS. Review types manually.' },
        resources: [
          r('doc', 'Cursor — Codebase indexing', 'https://docs.cursor.com/context/codebase-indexing', 'EN'),
        ],
      }),

      ch({
        id: 'ac-cp-c',
        kind: 'checkpoint',
        phase: 'C · Production',
        level: 'advanced',
        title: 'Checkpoint C — AI coding capstone',
        minutes: 30,
        durationLabel: 'Capstone',
        overview: 'Final gate: you ship agent-assisted code safely and systematically.',
        steps: [
          {
            title: 'Capstone deliverables',
            doThis: 'Complete all before marking this path done.',
            items: [
              '.cursorrules file refined over 5+ agent sessions',
              'Task brief template used on 3+ real features',
              'Review checklist with at least one caught agent bug',
              'One full feature shipped via branch → review → test → PR workflow',
              'Personal doc: when to use agent vs write code yourself',
            ],
          },
        ],
        checklist: ['All 5 deliverables complete'],
        practice: { title: 'Team share', brief: 'Share your .cursorrules and review checklist with your team.' },
        note: 'Pace: 2–4 weeks. The habit of reviewing diffs matters more than speed.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Cursor Docs', url: 'https://docs.cursor.com/' },
        { name: 'Cursor Rules', url: 'https://docs.cursor.com/context/rules' },
      ],
      tools: ['Cursor', 'Vitest / pytest', 'Git'],
      books: [],
      practice: ['One agent task per day with mandatory diff review'],
      videos: [],
    },
  },
]

export const softSkillManuals = [
  {
    id: 'communication',
    title: 'Communication',
    tagline: 'Say the thing clearly — updates, feedback, and docs that people finish.',
    category: 'soft-skills',
    accent: '#166534',
    cover: 'covers/communication-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Anyone whose work needs other humans to understand them.',
    outcomes: [
      'Write crisp status updates and explicit asks',
      'Give and receive feedback without fog',
      'Run short meetings that end with decisions',
    ],
    chapters: [
      ch({
        id: 'com-start',
        phase: 'Start',
        level: 'beginner',
        title: 'Why clarity beats cleverness',
        minutes: 20,
        overview: 'Most workplace friction is unclear communication, not bad intent. Clarity is a skill you can practice daily.',
        learn: ['Clarity as craft', 'Audience awareness', 'Attention economics'],
        steps: [
          { title: 'Audit your last message', body: 'Find one Slack/email you sent this week. Could a stranger understand the ask in 10 seconds?', doThis: 'Rewrite it in half the words.' },
        ],
        checklist: ['One message rewritten shorter'],
        practice: { title: 'Clarity journal', brief: 'Log 3 moments this week where clearer words would have helped.' },
        resources: [r('doc', 'Google — Technical Writing', 'https://developers.google.com/tech-writing', 'EN')],
      }),
      ch({
        id: 'com-bluf',
        phase: 'A · Writing',
        level: 'beginner',
        title: 'BLUF: bottom line up front',
        minutes: 25,
        overview: 'Lead with the point. Context after. Explicit asks. Respect that everyone is skimming.',
        learn: ['BLUF structure', 'Explicit asks', 'Subject lines that work'],
        steps: [
          { title: 'BLUF template', body: 'Decision/update → why it matters → ask/risk → next step.', doThis: 'Rewrite a long update as 5-line BLUF.' },
          { title: 'Subject line test', body: 'Reader should know the topic without opening. "Quick question" fails.', doThis: 'Rewrite 3 subject lines to be specific.' },
        ],
        checklist: ['BLUF template saved', 'One BLUF update sent'],
        practice: { title: 'Weekly update', brief: 'Send one BLUF status update to a teammate.' },
        resources: [r('doc', 'Google — Tech Writing One', 'https://developers.google.com/tech-writing/one', 'EN')],
      }),
      ch({
        id: 'com-async',
        phase: 'A · Writing',
        level: 'beginner',
        title: 'Async communication: Slack, email, docs',
        minutes: 30,
        overview: 'Async is default in remote teams. Write self-contained messages. Use threads. Link to docs, not walls of text.',
        learn: ['Self-contained messages', 'Threading', 'Doc-first culture'],
        steps: [
          { title: 'Self-contained rule', body: 'Reader should not need 5 prior messages to understand yours.', doThis: 'Fix one reply that assumes too much context.' },
          { title: 'Doc vs message', body: 'If it takes >10 sentences, write a doc and link it.', doThis: 'Convert one long Slack thread into a one-page doc.' },
        ],
        checklist: ['One thread converted to doc', 'Self-contained message habit'],
        practice: { title: 'Status doc', brief: 'Write a weekly status as a doc, not a Slack novel.' },
        resources: [r('article', 'Basecamp — Group Chat Problems', 'https://basecamp.com/articles/group-chat-problems', 'EN')],
      }),
      ch({
        id: 'com-feedback',
        phase: 'B · Conversations',
        level: 'intermediate',
        title: 'Feedback with SBI',
        minutes: 35,
        overview: 'Situation, Behavior, Impact — then a clear request. Curiosity before judgment. Feedback is a gift when specific.',
        learn: ['SBI framework', 'Receiving feedback', 'Timing'],
        steps: [
          { title: 'Write 2 SBI notes', body: 'One positive, one constructive. Behavior + impact + request.', doThis: 'Draft both. Read aloud — does it sound human?' },
          { title: 'Receive without defending', body: '"Thank you. Tell me more." Pause before explaining.', doThis: 'Next feedback you receive: listen fully, ask one clarifying question.' },
        ],
        checklist: ['2 SBI drafts written', 'Received feedback gracefully once'],
        practice: { title: 'Peer feedback', brief: 'Give one piece of SBI feedback to a colleague this week.' },
        resources: [r('book', 'Radical Candor — Kim Scott', 'https://www.radicalcandor.com/', 'EN')],
      }),
      ch({
        id: 'com-meetings',
        phase: 'B · Conversations',
        level: 'intermediate',
        title: 'Meetings that decide something',
        minutes: 30,
        overview: 'Every meeting needs an agenda, a decision or outcome, and a note with owners and dates. Default to no meeting when async works.',
        learn: ['Agenda design', 'Decision notes', 'Meeting hygiene'],
        steps: [
          { title: 'Agenda template', body: 'Goal (1 sentence) → topics with time boxes → desired outcome.', doThis: 'Write an agenda for your next meeting.' },
          { title: 'Decision note', body: 'What we decided / who owns what / by when / what we deferred.', doThis: 'End one meeting with a decision note in 3 bullets.' },
        ],
        checklist: ['Agenda template saved', 'One decision note sent'],
        practice: { title: 'Cancel one', brief: 'Identify one meeting that could be a doc. Propose the swap.' },
        resources: [r('article', 'Manager Tools — Meeting Model', 'https://www.manager-tools.com/', 'EN')],
      }),
      ch({
        id: 'com-cp-a',
        kind: 'checkpoint',
        phase: 'B · Conversations',
        level: 'intermediate',
        title: 'Checkpoint A — Communication foundations',
        minutes: 20,
        durationLabel: 'Gate',
        overview: 'Prove daily communication habits before advanced stakeholder work.',
        steps: [
          { title: 'Pass criteria', doThis: 'Verify all.', items: ['BLUF template used on 3+ messages', 'One SBI feedback given or received', 'One meeting ended with decision note', 'One long thread converted to doc'] },
        ],
        checklist: ['All 4 criteria green'],
        note: 'Pace: 2 weeks on Phases A–B is normal.',
      }),
      ch({
        id: 'com-stakeholders',
        phase: 'C · Influence',
        level: 'advanced',
        title: 'Stakeholder communication & options memos',
        minutes: 35,
        overview: 'Executives want options with tradeoffs, not open-ended problems. One-page memos beat 30-slide decks.',
        learn: ['Options memos', 'Stakeholder mapping', 'Executive summaries'],
        steps: [
          { title: 'Options one-pager', body: 'Problem → 2–3 options → recommendation → risks → ask.', doThis: 'Write a one-pager for a real or fictional decision.' },
          { title: 'Stakeholder map', body: 'Who cares? Who decides? Who blocks? Tailor message to each.', doThis: 'Map 4 stakeholders for a current project.' },
        ],
        checklist: ['One-pager done', 'Stakeholder map drawn'],
        practice: { title: 'Present in 5', brief: 'Deliver the one-pager verbally in five minutes.' },
        resources: [r('article', 'Amazon — Narrative memos', 'https://www.allthingsdistributed.com/', 'EN')],
      }),
      ch({
        id: 'com-docs',
        phase: 'C · Influence',
        level: 'advanced',
        title: 'Documentation people actually read',
        minutes: 35,
        overview: 'Good docs: short, scannable, task-oriented. Start with what reader needs to DO, not background history.',
        learn: ['Task-oriented docs', 'Scannable structure', 'Docs as product'],
        steps: [
          { title: 'Rewrite a README', body: 'Lead with quickstart. Move architecture to bottom. Add troubleshooting.', doThis: 'Rewrite a README following Google tech writing principles.' },
          { title: 'Diataxis check', body: 'Tutorials (learning), how-to (tasks), reference (lookup), explanation (understanding). Pick the right type.', doThis: 'Classify 4 docs in your project by Diataxis type.' },
        ],
        checklist: ['README rewritten', '4 docs classified'],
        practice: { title: 'Runbook', brief: 'Write a 1-page runbook for a common on-call or deploy task.' },
        resources: [r('doc', 'Diataxis Framework', 'https://diataxis.fr/', 'EN')],
      }),
      ch({
        id: 'com-cp-b',
        kind: 'checkpoint',
        phase: 'C · Influence',
        level: 'advanced',
        title: 'Checkpoint B — Communication capstone',
        minutes: 25,
        durationLabel: 'Capstone',
        overview: 'Final gate: you communicate clearly in writing, feedback, meetings, and stakeholder contexts.',
        steps: [
          { title: 'Capstone deliverables', doThis: 'Complete all.', items: ['Personal BLUF + SBI templates', 'One options one-pager delivered', 'One README or runbook rewritten', 'Feedback from a colleague on your communication'] },
        ],
        checklist: ['All 4 deliverables complete'],
        practice: { title: 'Teach BLUF', brief: 'Explain BLUF to someone in 5 minutes with a live rewrite.' },
      }),
    ],
    resources: {
      docs: [{ name: 'Google Tech Writing', url: 'https://developers.google.com/tech-writing' }],
      tools: ['Notion / Docs', 'FigJam for agendas'],
      books: ['Radical Candor (Scott)', 'On Writing Well (Zinsser)'],
      practice: ['Rewrite your last 3 messages BLUF-style daily'],
      videos: [],
    },
  },

  {
    id: 'problem-solving',
    title: 'Problem Solving',
    tagline: 'Slow down, frame the problem, then cut a path through the maze.',
    category: 'soft-skills',
    accent: '#0F766E',
    cover: 'covers/problem-solving-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'People who jump to solutions too fast (most of us).',
    outcomes: [
      'Frame problems before solving them',
      'Break work into testable slices',
      'Debug with hypotheses, not panic',
    ],
    chapters: [
      ch({
        id: 'ps-start',
        phase: 'Start',
        level: 'beginner',
        title: 'The solving trap',
        minutes: 20,
        overview: 'A wrong problem well-solved wastes weeks. The first skill is noticing when you are solving the wrong thing.',
        learn: ['Solution bias', 'Problem vs symptom', 'Pause habit'],
        steps: [
          { title: 'Symptom vs root', body: '"Tests are flaky" is a symptom. "We don\'t isolate test data" might be the problem.', doThis: 'Take one current annoyance. Write symptom vs possible root cause.' },
        ],
        checklist: ['One symptom/root analysis done'],
        practice: { title: 'Pause log', brief: 'Before your next fix, write the problem in one sentence.' },
        resources: [r('book', 'Are Your Lights On? — Gause & Weinberg', 'https://en.wikipedia.org/wiki/Are_Your_Lights_On%3F', 'EN')],
      }),
      ch({
        id: 'ps-frame',
        phase: 'A · Frame',
        level: 'beginner',
        title: 'Problem cards & success tests',
        minutes: 25,
        overview: 'What / for whom / why now / how we will know it worked. If success is not observable, you cannot know when to stop.',
        learn: ['Problem statements', 'Constraints', 'Success tests'],
        steps: [
          { title: 'Fill a problem card', body: 'Problem / user / context / constraints / success test.', doThis: 'Problem card for a real annoyance this week.' },
          { title: '5 Whys lite', body: 'Ask "why" up to 5 times to dig past symptoms.', doThis: 'Run 5 Whys on one bug or process pain.' },
        ],
        checklist: ['Problem card filled', 'Success test is observable', '5 Whys done once'],
        practice: { title: 'Two framings', brief: 'Write two different framings for the same issue. Pick one deliberately.' },
        resources: [r('article', 'Toyota — 5 Whys', 'https://en.wikipedia.org/wiki/Five_whys', 'EN')],
      }),
      ch({
        id: 'ps-decompose',
        phase: 'A · Frame',
        level: 'beginner',
        title: 'Decompose into smallest testable slices',
        minutes: 30,
        overview: 'Big problems paralyze. Cut vertical slices that each teach something. Ship the thinnest slice first.',
        learn: ['Vertical slicing', 'INVEST stories', 'Thin MVP'],
        steps: [
          { title: 'Slice a big task', body: 'Take something that feels like "2 weeks." Cut a 2-hour slice that proves one assumption.', doThis: 'Decompose one task into 3 slices. Do slice 1 today.' },
        ],
        checklist: ['3 slices defined', 'Slice 1 completed'],
        practice: { title: 'Slice log', brief: 'For one week, start every task by writing the thinnest slice first.' },
        resources: [r('article', 'INVEST criteria', 'https://en.wikipedia.org/wiki/INVEST_(mnemonic)', 'EN')],
      }),
      ch({
        id: 'ps-hypothesis',
        phase: 'B · Experiment',
        level: 'intermediate',
        title: 'Hypothesize, test, learn',
        minutes: 35,
        overview: 'If X is true, we should see Y. Run the cheapest experiment first. Invalidate fast.',
        learn: ['Hypothesis format', 'Cheap experiments', 'Timeboxes'],
        steps: [
          { title: '3 hypotheses for a bug', body: 'Write 3 possible causes. Rank by likelihood × cost to test.', doThis: 'Pick a bug. Write 3 hypotheses. Test the cheapest.' },
          { title: 'Timebox rabbit holes', body: 'Set a 30-minute timer. If no progress, write what you learned and switch hypothesis.', doThis: 'Timebox one debugging session.' },
        ],
        checklist: ['3 hypotheses written', 'One validated or invalidated', 'One timebox used'],
        practice: { title: 'Rubber duck log', brief: 'Explain a stuck problem out loud. Note what unlocked it.' },
        resources: [r('article', 'Scientific Method', 'https://en.wikipedia.org/wiki/Scientific_method', 'EN')],
      }),
      ch({
        id: 'ps-debug',
        phase: 'B · Experiment',
        level: 'intermediate',
        title: 'Systematic debugging',
        minutes: 35,
        overview: 'Reproduce → isolate → fix → verify. Change one variable at a time. Binary search through git history.',
        learn: ['Reproduce first', 'Binary search', 'One change rule'],
        steps: [
          { title: 'Reproduction script', body: 'If you cannot reproduce it, you cannot verify the fix.', doThis: 'Write minimal steps to reproduce a recent bug.' },
          { title: 'Git bisect', body: 'Find the commit that introduced a regression.', doThis: 'Run git bisect on a known good/bad pair (or simulate with log reading).' },
        ],
        checklist: ['Reproduction steps written', 'Git bisect attempted'],
        practice: { title: 'Debug journal', brief: 'Log your next 3 debug sessions: hypothesis, test, result.' },
        resources: [r('doc', 'Git Bisect', 'https://git-scm.com/docs/git-bisect', 'EN')],
      }),
      ch({
        id: 'ps-cp-a',
        kind: 'checkpoint',
        phase: 'B · Experiment',
        level: 'intermediate',
        title: 'Checkpoint A — Problem solving foundations',
        minutes: 20,
        durationLabel: 'Gate',
        overview: 'Prove framing and experimentation habits.',
        steps: [
          { title: 'Pass criteria', doThis: 'Verify all.', items: ['3+ problem cards written', 'One task decomposed into slices with slice 1 done', 'One bug debugged with 3 hypotheses', 'One reproduction script written'] },
        ],
        checklist: ['All 4 criteria green'],
      }),
      ch({
        id: 'ps-tradeoffs',
        phase: 'C · Systems',
        level: 'advanced',
        title: 'Tradeoff tables & decision records',
        minutes: 35,
        overview: 'Tradeoff tables beat opinions. Write down what you chose, what you rejected, and why. Future-you will thank you.',
        learn: ['Tradeoff tables', 'ADRs', 'Second-order effects'],
        steps: [
          { title: 'Tradeoff table', body: '3 options × 4 criteria (speed, cost, risk, maintainability). Score 1–5.', doThis: 'Table for Cypress vs Playwright vs Selenium (or any tool choice).' },
          { title: 'ADR lite', body: 'Context, decision, consequences. 1 page max.', doThis: 'Write one ADR for a recent tool or process choice.' },
        ],
        checklist: ['Tradeoff table done', 'One ADR written'],
        practice: { title: 'Postmortem lite', brief: 'Blameless 5-bullet note on a past miss.' },
        resources: [r('doc', 'Architecture Decision Records', 'https://adr.github.io/', 'EN')],
      }),
      ch({
        id: 'ps-systems',
        phase: 'C · Systems',
        level: 'advanced',
        title: 'Systems thinking & second-order effects',
        minutes: 35,
        overview: 'Every fix has side effects. "We added retries" → "now we mask real failures." Map feedback loops before committing.',
        learn: ['Feedback loops', 'Second-order effects', 'Unintended consequences'],
        steps: [
          { title: 'Second-order brainstorm', body: 'For a proposed fix, ask "and then what?" three times.', doThis: 'Apply to one current proposal at work.' },
          { title: 'Causal loop sketch', body: 'Draw arrows: A affects B affects C affects A. Find the loop.', doThis: 'Sketch one feedback loop in your team\'s process.' },
        ],
        checklist: ['Second-order analysis done', 'One loop sketched'],
        practice: { title: 'Pre-mortem', brief: 'Before starting a project, imagine it failed. Why?' },
        resources: [r('book', 'Thinking in Systems — Donella Meadows', 'https://en.wikipedia.org/wiki/Thinking_in_Systems', 'EN')],
      }),
      ch({
        id: 'ps-cp-b',
        kind: 'checkpoint',
        phase: 'C · Systems',
        level: 'advanced',
        title: 'Checkpoint B — Problem solving capstone',
        minutes: 25,
        durationLabel: 'Capstone',
        overview: 'Final gate: you frame, experiment, decide, and learn systematically.',
        steps: [
          { title: 'Capstone deliverables', doThis: 'Complete all.', items: ['Problem card template you reuse weekly', 'One tradeoff table + ADR', 'Debug journal with 5+ entries', 'One pre-mortem or postmortem written'] },
        ],
        checklist: ['All 4 deliverables complete'],
        note: 'Pace: 2–4 weeks. The habit of framing beats any framework.',
      }),
    ],
    resources: {
      docs: [{ name: 'Architecture Decision Records', url: 'https://adr.github.io/' }],
      tools: ['Paper / FigJam', 'Timer for timeboxes'],
      books: ['Are Your Lights On? (Gause & Weinberg)'],
      practice: ['One problem card per week for a month'],
      videos: [],
    },
  },

  {
    id: 'interview-craft',
    title: 'Interview Craft',
    tagline: 'Show how you think — stories, systems, and calm under pressure.',
    category: 'soft-skills',
    accent: '#9A3412',
    cover: 'covers/interview-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'People preparing for tech, QA, or design interviews.',
    outcomes: [
      'Tell clear STAR stories that land in 2 minutes',
      'Practice aloud with structured feedback',
      'Handle unknowns and negotiate offers calmly',
    ],
    chapters: [
      ch({
        id: 'iv-start',
        phase: 'Start',
        level: 'beginner',
        title: 'What interviewers actually assess',
        minutes: 20,
        overview: 'Skills, culture fit, communication, and how you handle ambiguity. They are not trying to trick you — they want signal.',
        learn: ['Interview dimensions', 'Signal vs noise', 'Preparation ROI'],
        steps: [
          { title: 'Read 5 job descriptions', body: 'Highlight repeated requirements. Those become your story themes.', doThis: 'Extract top 5 themes from 3 JDs you target.' },
        ],
        checklist: ['5 themes extracted from JDs'],
        practice: { title: 'Role map', brief: 'Write what "good" looks like in the role you want.' },
        resources: [r('tool', 'Levels.fyi', 'https://www.levels.fyi/', 'EN')],
      }),
      ch({
        id: 'iv-stories',
        phase: 'A · Stories',
        level: 'beginner',
        title: 'STAR story bank',
        minutes: 30,
        overview: 'Situation, Task, Action, Result. Quantify when possible. Build a bank of 8 stories covering common themes.',
        learn: ['STAR format', 'Story bank', 'Quantification'],
        steps: [
          { title: 'Build 6 STAR outlines', body: 'Themes: conflict, failure, leadership, debugging, collaboration, learning fast.', doThis: 'Write 6 STAR bullets (not essays). 2 minutes aloud each.' },
          { title: '60-second intro', body: 'Present → past → future → why this role. No resume recitation.', doThis: 'Record yourself. Watch once. Note one improvement.' },
        ],
        checklist: ['6 STAR outlines', '60-second intro recorded'],
        practice: { title: 'Story swap', brief: 'Tell one story to a friend. Ask: "What was my result?"' },
        resources: [r('article', 'STAR Method', 'https://en.wikipedia.org/wiki/Situation,_task,_action,_result', 'EN')],
      }),
      ch({
        id: 'iv-behavioral',
        phase: 'A · Stories',
        level: 'beginner',
        title: 'Behavioral deep dives',
        minutes: 30,
        overview: '"Tell me about a time…" questions map to competencies. Learn to pivot any story to fit the question.',
        learn: ['Competency mapping', 'Story pivoting', 'Follow-up handling'],
        steps: [
          { title: 'Map stories to competencies', body: 'Leadership, conflict, failure, initiative, teamwork, quality, deadline pressure.', doThis: 'Spreadsheet: story × competency coverage. Find gaps.' },
          { title: 'Follow-up prep', body: '"What would you do differently?" Have an honest answer ready.', doThis: 'Add a "lessons learned" line to each STAR outline.' },
        ],
        checklist: ['Story-competency map done', 'Lessons learned added'],
        practice: { title: 'Random question', brief: 'Pull a random behavioral question. Answer in 2 minutes.' },
        resources: [r('article', 'interviewing.io blog', 'https://interviewing.io/blog', 'EN')],
      }),
      ch({
        id: 'iv-technical',
        phase: 'B · Practice',
        level: 'intermediate',
        title: 'Technical & QA interview questions',
        minutes: 40,
        overview: 'QA interviews: test design, automation architecture, bug investigation, API basics. Think aloud — they assess process, not just answers.',
        learn: ['Think-aloud', 'Test design questions', 'Architecture questions'],
        steps: [
          { title: 'Test design prompt', body: '"How would you test a login page?" Structure: requirements → risks → test types → priorities → sample cases.', doThis: 'Answer aloud in 5 minutes. Record.' },
          { title: 'Architecture question', body: '"How would you structure an automation framework?" Layers, config, reporting, CI.', doThis: 'Whiteboard a framework diagram in 5 minutes.' },
        ],
        checklist: ['One test design answer recorded', 'One architecture diagram drawn'],
        practice: { title: 'QA question bank', brief: 'Answer 5 common QA interview questions aloud.' },
        resources: [r('article', 'Test Automation University', 'https://testautomationu.applitools.com/', 'EN')],
      }),
      ch({
        id: 'iv-mocks',
        phase: 'B · Practice',
        level: 'intermediate',
        title: 'Mock interviews & take-homes',
        minutes: 40,
        overview: 'Practice aloud with real feedback. Treat take-homes as product samples — README, tests, clean commits.',
        learn: ['Mock interview loop', 'Take-home craft', 'Feedback integration'],
        steps: [
          { title: 'One mock interview', body: '45 minutes with a friend or Pramp/Interviewing.io. Notes after. One improvement next time.', doThis: 'Schedule and complete one mock this week.' },
          { title: 'Take-home checklist', body: 'README, setup instructions, tests, clean git history, scope respected, polish.', doThis: 'Review a past take-home against the checklist.' },
        ],
        checklist: ['One mock completed', 'Take-home checklist saved'],
        practice: { title: 'Unknown question drill', brief: 'Practice: "I don\'t know yet — here\'s how I\'d find out…"' },
        resources: [r('tool', 'Pramp', 'https://www.pramp.com/', 'EN')],
      }),
      ch({
        id: 'iv-cp-a',
        kind: 'checkpoint',
        phase: 'B · Practice',
        level: 'intermediate',
        title: 'Checkpoint A — Interview readiness',
        minutes: 25,
        durationLabel: 'Gate',
        overview: 'Prove story bank and practice habits before negotiation phase.',
        steps: [
          { title: 'Pass criteria', doThis: 'Verify all.', items: ['8+ STAR story outlines', '60-second intro under 70 seconds', 'One mock interview completed', 'One technical question answered think-aloud'] },
        ],
        checklist: ['All 4 criteria green'],
        note: 'Pace: 2 weeks minimum on Phases A–B. Stories need repetition to feel natural.',
      }),
      ch({
        id: 'iv-questions',
        phase: 'C · Close',
        level: 'advanced',
        title: 'Questions you should ask them',
        minutes: 30,
        overview: 'Interview them too. Team dynamics, success metrics, on-call, growth, why the role is open. Good questions signal seniority.',
        learn: ['Question categories', 'Red flags', 'Signal through curiosity'],
        steps: [
          { title: 'Build your question list', body: 'Team, role, culture, growth, process — 10 questions you actually care about.', doThis: 'Write 10 questions. Rank top 5 for your next interview.' },
          { title: 'Red flag watch', body: 'Vague answers about on-call, turnover, or "we need a hero" are data.', doThis: 'Note 3 red flags to watch for.' },
        ],
        checklist: ['10 questions written', '3 red flags documented'],
        practice: { title: 'Reverse interview', brief: 'In your next mock, spend 10 minutes asking questions.' },
        resources: [r('article', 'Questions to ask', 'https://www.keyvalues.com/culture-queries', 'EN')],
      }),
      ch({
        id: 'iv-negotiate',
        phase: 'C · Close',
        level: 'advanced',
        title: 'Offers & negotiation lite',
        minutes: 30,
        overview: 'Get the offer in writing. Compare total comp, not just salary. Negotiate with data and gratitude, not ultimatums.',
        learn: ['Total comp', 'Negotiation scripts', 'Decision framework'],
        steps: [
          { title: 'Comp spreadsheet', body: 'Base, bonus, equity, benefits, learning budget, remote, PTO. Rank what matters to you.', doThis: 'Build a comparison sheet for 2 hypothetical offers.' },
          { title: 'Negotiation script', body: '"I\'m excited about this role. Based on my research and experience, I was hoping for X. Is there flexibility?"', doThis: 'Write your script. Practice aloud.' },
        ],
        checklist: ['Comp spreadsheet built', 'Negotiation script practiced'],
        practice: { title: 'Thank-you note', brief: 'Write a post-interview thank-you template.' },
        resources: [r('tool', 'Levels.fyi', 'https://www.levels.fyi/', 'EN'), r('book', 'Never Split the Difference — Chris Voss', 'https://www.blackswanltd.com/never-split-the-difference', 'EN')],
      }),
      ch({
        id: 'iv-cp-b',
        kind: 'checkpoint',
        phase: 'C · Close',
        level: 'advanced',
        title: 'Checkpoint B — Interview capstone',
        minutes: 25,
        durationLabel: 'Capstone',
        overview: 'Final gate: you are ready to interview with stories, practice, and negotiation tools.',
        steps: [
          { title: 'Capstone deliverables', doThis: 'Complete all.', items: ['8+ STAR stories practiced aloud 3+ times each', '3+ mock interviews completed', 'Question list ready', 'Comp comparison framework built', 'Thank-you note template saved'] },
        ],
        checklist: ['All 5 deliverables complete'],
        note: 'Pace: 3–5 weeks of consistent practice beats cramming.',
      }),
    ],
    resources: {
      docs: [{ name: 'interviewing.io blog', url: 'https://interviewing.io/blog' }],
      tools: ['Voice memos', 'Whiteboard / Excalidraw', 'Pramp'],
      books: ['Cracking the Coding Interview — selective chapters'],
      practice: ['2 mocks per week for 3 weeks'],
      videos: [],
    },
  },

  {
    id: 'focus',
    title: 'Focus & Time',
    tagline: 'Protect attention — the scarce resource behind every skill.',
    category: 'soft-skills',
    accent: '#A16207',
    cover: 'covers/focus-cover.png',
    duration: '2–3 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Anyone drowning in tabs, pings, and half-finished paths.',
    outcomes: [
      'Plan a realistic week with energy awareness',
      'Run deep-work blocks that actually produce',
      'Review and adjust pace without guilt spirals',
    ],
    chapters: [
      ch({
        id: 'fo-start',
        phase: 'Start',
        level: 'beginner',
        title: 'Attention is the bottleneck',
        minutes: 20,
        overview: 'You do not have a time problem — you have an attention allocation problem. Every ping steals recovery time.',
        learn: ['Attention economics', 'Context switching cost', 'Energy cycles'],
        steps: [
          { title: 'Interruption audit', body: 'Log every interruption for one work session. Count and categorize.', doThis: 'One 2-hour audit. Tally: self, others, phone, slack.' },
        ],
        checklist: ['One interruption audit completed'],
        practice: { title: 'Baseline', brief: 'Note your peak energy hours for 3 days.' },
        resources: [r('book', 'Deep Work — Cal Newport', 'https://www.calnewport.com/books/deep-work/', 'EN')],
      }),
      ch({
        id: 'fo-plan',
        phase: 'A · Plan',
        level: 'beginner',
        title: 'Daily 3 and timeboxing',
        minutes: 25,
        overview: 'Three outcomes max per day. Calendar is truth. Todo lists without time blocks are wish lists.',
        learn: ['Daily 3', 'Timeboxing', 'Calendar as contract'],
        steps: [
          { title: 'Plan tomorrow tonight', body: 'Pick 3 outcomes. Block time on calendar. Everything else is bonus.', doThis: 'Plan tomorrow before bed. Execute.' },
          { title: 'Shutdown ritual', body: '5 minutes: what got done / tomorrow\'s 3 / what\'s stuck.', doThis: 'Run shutdown ritual for 3 consecutive days.' },
        ],
        checklist: ['One planned day lived', '3 shutdown rituals done'],
        practice: { title: 'Calendar truth', brief: 'If it is not on the calendar, it does not happen today.' },
        resources: [r('article', 'Cal Newport — Time Blocking', 'https://www.calnewport.com/blog/', 'EN')],
      }),
      ch({
        id: 'fo-energy',
        phase: 'A · Plan',
        level: 'beginner',
        title: 'Energy management, not just time',
        minutes: 25,
        overview: 'Hard work in low-energy hours produces garbage. Match task difficulty to energy level.',
        learn: ['Energy mapping', 'Task-energy fit', 'Recovery'],
        steps: [
          { title: 'Energy map', body: 'Track energy 1–5 at 9am, 12pm, 3pm, 6pm for 3 days.', doThis: 'Block hard tasks in peak hours. Admin in troughs.' },
        ],
        checklist: ['Energy map for 3 days', 'One schedule adjusted to energy'],
        practice: { title: 'Protect peak', brief: 'Block your best hour for deep work only. No meetings.' },
        resources: [r('book', 'When — Daniel Pink', 'https://www.danpink.com/books/when/', 'EN')],
      }),
      ch({
        id: 'fo-deep',
        phase: 'B · Focus',
        level: 'intermediate',
        title: 'Deep work blocks & environment design',
        minutes: 30,
        overview: 'Phone in another room. Notifications off. Single task. Make focus the default, not willpower.',
        learn: ['Deep blocks', 'Environment design', 'Break design'],
        steps: [
          { title: '50/10 blocks', body: '50 minutes focus, 10 minute real break (walk, stretch — not social media).', doThis: 'Two deep blocks on a Pathwise chapter.' },
          { title: 'Distraction list', body: 'Write your top 5 distractions. Kill or defer each one.', doThis: 'Disable 3 notification sources today.' },
        ],
        checklist: ['2 deep blocks completed', '3 notifications disabled'],
        practice: { title: 'Focus score', brief: 'Rate focus 1–5 after each block. Track for a week.' },
        resources: [r('article', 'Pomodoro Technique', 'https://francescocirillo.com/pages/pomodoro-technique', 'EN')],
      }),
      ch({
        id: 'fo-learning',
        phase: 'B · Focus',
        level: 'intermediate',
        title: 'Learning sprints for skill paths',
        minutes: 30,
        overview: 'Skill acquisition needs spaced repetition and deliberate practice, not binge-reading. Plan sprints with review days.',
        learn: ['Spaced repetition', 'Deliberate practice', 'Sprint planning'],
        steps: [
          { title: 'Plan a 2-week sprint', body: 'Mon–Thu: new chapters. Fri: review + checkpoint. Weekend: rest or catch-up.', doThis: 'Schedule your next 2 weeks of Pathwise on a calendar.' },
          { title: 'Active recall', body: 'After each chapter, close the tab and write 3 things you learned from memory.', doThis: 'Active recall after your next 3 chapters.' },
        ],
        checklist: ['2-week sprint scheduled', 'Active recall on 3 chapters'],
        practice: { title: 'Teach-back', brief: 'Explain one chapter to someone (or a rubber duck) in 5 minutes.' },
        resources: [r('book', 'Make It Stick — Brown, Roediger, McDaniel', 'https://www.retrievalpractice.org/strategies/2021/books/make-it-stick', 'EN')],
      }),
      ch({
        id: 'fo-cp-a',
        kind: 'checkpoint',
        phase: 'B · Focus',
        level: 'intermediate',
        title: 'Checkpoint A — Focus foundations',
        minutes: 20,
        durationLabel: 'Gate',
        overview: 'Prove planning and deep-work habits.',
        steps: [
          { title: 'Pass criteria', doThis: 'Verify all.', items: ['Daily 3 used for 5+ days', '5+ deep work blocks completed', 'Energy map done', '2-week learning sprint scheduled'] },
        ],
        checklist: ['All 4 criteria green'],
      }),
      ch({
        id: 'fo-review',
        phase: 'C · Sustain',
        level: 'advanced',
        title: 'Weekly review & course correction',
        minutes: 30,
        overview: 'Review beats resolutions. 30 minutes weekly: wins, misses, next week\'s rocks, what to stop.',
        learn: ['Weekly review', 'Stop doing list', 'Capacity planning'],
        steps: [
          { title: 'Run a weekly review', body: 'Wins / misses / next 3 big rocks / stop doing / schedule review next week.', doThis: 'Complete one weekly review. Schedule the next.' },
          { title: 'Stop doing list', body: 'Every yes is a no to something else. Cut one commitment this week.', doThis: 'Identify and drop one low-value recurring task.' },
        ],
        checklist: ['Weekly review done', 'One thing stopped'],
        practice: { title: 'Capacity check', brief: 'If overcommitted, cut 20% this week.' },
        resources: [r('article', 'GTD Weekly Review', 'https://gettingthingsdone.com/', 'EN')],
      }),
      ch({
        id: 'fo-sustain',
        phase: 'C · Sustain',
        level: 'advanced',
        title: 'Sustainable pace & rest as strategy',
        minutes: 25,
        overview: 'Rest is not laziness — it is maintenance. Burnout destroys months of progress. Plan rest like you plan work.',
        learn: ['Rest as input', 'Burnout signals', 'Pace over sprint'],
        steps: [
          { title: 'Burnout check', body: 'Cynicism, exhaustion, reduced efficacy — note which you feel.', doThis: 'Honest self-check. Adjust load if 2+ signals present.' },
          { title: 'Rest blocks', body: 'Schedule non-negotiable rest: walks, sleep, social, hobbies.', doThis: 'Block 3 rest periods on next week\'s calendar.' },
        ],
        checklist: ['Burnout check done', '3 rest blocks scheduled'],
        practice: { title: 'Pace pledge', brief: 'Write: "I will finish this path in X weeks at Y hours/week." Be realistic.' },
        resources: [r('book', 'Rest — Alex Soojung-Kim Pang', 'https://www.pang.org/rest/', 'EN')],
      }),
      ch({
        id: 'fo-cp-b',
        kind: 'checkpoint',
        phase: 'C · Sustain',
        level: 'advanced',
        title: 'Checkpoint B — Focus capstone',
        minutes: 25,
        durationLabel: 'Capstone',
        overview: 'Final gate: you protect attention and sustain learning pace.',
        steps: [
          { title: 'Capstone deliverables', doThis: 'Complete all.', items: ['Daily 3 habit for 2+ weeks', '10+ deep work blocks logged', 'Weekly review run twice', 'Realistic pace pledge written', 'One rest block honored every day for a week'] },
        ],
        checklist: ['All 5 deliverables complete'],
        note: 'Pace: 2–3 weeks. Focus systems compound — start small, stay consistent.',
      }),
    ],
    resources: {
      docs: [{ name: 'Deep Work overview', url: 'https://www.calnewport.com/books/deep-work/' }],
      tools: ['Calendar', 'Forest / Focus mode', 'Paper notebook'],
      books: ['Deep Work (Newport)', 'Atomic Habits (Clear) — selective'],
      practice: ['Two deep blocks daily for 5 days'],
      videos: [],
    },
  },
]
