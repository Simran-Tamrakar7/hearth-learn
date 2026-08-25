import { ch } from '../helpers.js'

/** Ten practical paths: no-code, agents, viz, productivity, docs, UX research, Git for humans, APIs, email, branding. */

function mini({ id, title, tagline, category, accent, cover, who, outcomes, chapters }) {
  return {
    id,
    title,
    tagline,
    category,
    accent,
    cover,
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Useful',
    who,
    outcomes,
    pace: {
      hoursPerDay: '30–60 min/day',
      recommended: '~2–4 weeks',
      accelerated: '~10 days',
      slow: '~6 weeks',
    },
    chapters,
  }
}

function card(title, body, extras = {}) {
  return {
    title,
    body,
    learnMore: extras.more || null,
    resources: extras.url ? [{ label: extras.linkLabel || 'Docs', url: extras.url, kind: 'Docs' }] : [],
    quiz: extras.quiz || null,
    tryIt: extras.tryIt || null,
    doThis: extras.doThis || null,
    tip: extras.tip || null,
    code: extras.code || null,
  }
}

function chapter(id, phase, title, minutes, overview, learn, steps, checklist) {
  return ch({
    id,
    phase,
    level: 'beginner',
    title,
    minutes,
    overview,
    learn,
    steps,
    checklist,
  })
}

export const practicalPackManuals = [
  mini({
    id: 'nocode-automation',
    title: 'No-code Automation',
    tagline: 'Zapier & Make basics — triggers, actions, and automations that don’t need a repo.',
    category: 'automation',
    accent: '#FF4A00',
    cover: 'covers/cicd-cover.png',
    who: 'Ops, founders, PMs, and anyone tired of copy-pasting between apps.',
    outcomes: ['Map a workflow as trigger → filter → action', 'Ship a Zap/Scenario safely', 'Know when to graduate to code'],
    chapters: [
      chapter(
        'nc-map',
        'Start',
        'Map the boring work',
        25,
        'Good automation starts with a written flow, not a blank Zap canvas.',
        ['Trigger', 'Action', 'Happy path'],
        [
          card('Write the recipe in plain English', 'One sentence: “When X happens in App A, do Y in App B.” If you can’t say it, you can’t automate it.', {
            more: 'List edge cases: empty attachments, duplicate emails, weekends.',
            doThis: 'Write 3 automations you want in that format.',
            quiz: {
              question: 'The first step of a solid Zap is…',
              options: ['Pick a fancy AI step', 'Name the trigger and outcome in words', 'Connect every app you own', 'Skip filters forever'],
              answer: 1,
            },
          }),
          card('Trigger → filter → action', 'Triggers start the flow. Filters stop junk. Actions do the work. Keep one Zap to one job.', {
            url: 'https://zapier.com/learn',
            tip: 'Prefer “new item” triggers over polling “updated” unless you must.',
            doThis: 'Sketch one flow with those three boxes.',
          }),
        ],
        ['Three recipes written', 'One flow sketched'],
      ),
      chapter(
        'nc-build',
        'Build',
        'Ship your first Zap/Scenario',
        40,
        'Connect accounts, test with sample data, then turn it on.',
        ['Auth', 'Test', 'Naming'],
        [
          card('Connect & test', 'Use sample payloads. Confirm the action created exactly one thing. Name Zaps like verbs: “Invoice → Drive”.', {
            url: 'https://www.make.com/en/help',
            tryIt: {
              prompt: 'Checklist before ON',
              code: '1. Sample run OK\n2. Filter excludes junk\n3. Error email to you\n4. Name is searchable',
              result: 'You can turn it on without fear.',
            },
            doThis: 'Build one automation end-to-end.',
          }),
          card('When not to no-code', 'Complex branching, heavy transforms, or regulated data often want a script or proper backend.', {
            more: 'No-code is glue. Code is a factory.',
            doThis: 'List one workflow you’d keep human or code instead.',
          }),
        ],
        ['One live automation', 'Error notification set'],
      ),
      chapter(
        'nc-ops',
        'Steady',
        'Keep automations healthy',
        30,
        'Ownership, versioning of recipes, and kill switches.',
        ['Ownership', 'Logs', 'Kill switch'],
        [
          card('Own the bot', 'Every Zap needs an owner, a purpose line, and a “turn off if…” rule.', {
            doThis: 'Add owner + purpose to your Zap description.',
            tip: 'Review failed runs weekly — silence is a smell.',
          }),
        ],
        ['Owner documented'],
      ),
    ],
  }),

  mini({
    id: 'ai-agents-workflows',
    title: 'AI Agents & Workflows',
    tagline: 'Beyond single prompts — tools, memory, loops, and safe handoffs.',
    category: 'ai',
    accent: '#0D9488',
    cover: 'covers/prompt-engineering-cover.png',
    who: 'People who already prompt and want multi-step agents without magic thinking.',
    outcomes: ['Design a tool-using loop', 'Add guardrails', 'Know agent vs. workflow'],
    chapters: [
      chapter(
        'ag-vs',
        'Start',
        'Prompt vs agent vs workflow',
        25,
        'A prompt is one shot. A workflow is fixed steps. An agent chooses tools in a loop.',
        ['Definitions', 'When each wins'],
        [
          card('Pick the right shape', 'Use a workflow when steps are known. Use an agent when the path depends on intermediate results.', {
            quiz: {
              question: 'An agent mainly differs by…',
              options: ['Using bigger models only', 'Choosing tools over multiple steps', 'Never needing data', 'Skipping evaluation'],
              answer: 1,
            },
            doThis: 'Label 3 tasks as prompt / workflow / agent.',
          }),
        ],
        ['Three tasks labeled'],
      ),
      chapter(
        'ag-loop',
        'Build',
        'The tool loop',
        40,
        'Observe → think → act → observe. Cap steps. Log every tool call.',
        ['Tools', 'Budgets', 'Logs'],
        [
          card('Tools are APIs with manners', 'Give each tool a clear name, input schema, and “when to use” note in the system prompt.', {
            code: 'system: You may use search(), fetch_url(), draft_email().\nStop after 5 tool calls. Cite sources.',
            doThis: 'Write a system prompt with 2 tools and a step budget.',
            tip: 'Prefer retrieval over inventing facts.',
          }),
          card('Guardrails', 'Allow-lists, human approval for send/delete, and red-team prompts that try to escape.', {
            more: 'Never give an agent raw credentials in the prompt text.',
            doThis: 'Add one “ask human before…” rule.',
          }),
        ],
        ['Tool list written', 'Budget set'],
      ),
      chapter(
        'ag-eval',
        'Steady',
        'Evaluate the loop',
        30,
        'Score task success, cost, and scary failures — not vibes.',
        ['Evals', 'Cost'],
        [
          card('Tiny eval set', '10 real tasks with expected outcomes. Run weekly when you change prompts/tools.', {
            doThis: 'Write 5 eval tasks for your agent idea.',
            url: 'https://platform.openai.com/docs/guides/agents',
          }),
        ],
        ['Five evals drafted'],
      ),
    ],
  }),

  mini({
    id: 'data-viz-basics',
    title: 'Data Visualization Basics',
    tagline: 'Charts that tell the truth — pick the right mark, encode carefully, cut chartjunk.',
    category: 'foundations',
    accent: '#0369A1',
    cover: 'covers/sql-cover.png',
    who: 'Analysts, PMs, and builders who ship dashboards people actually understand.',
    outcomes: ['Match chart type to question', 'Avoid misleading axes', 'Annotate the takeaway'],
    chapters: [
      chapter(
        'viz-q',
        'Start',
        'Start from the question',
        25,
        'Comparison, composition, distribution, relationship — each wants a different chart.',
        ['Question types', 'Marks'],
        [
          card('Question → chart', 'Compare categories → bars. Trend over time → line. Parts of whole → careful with pies. Correlation → scatter.', {
            quiz: {
              question: 'Best default for comparing categories?',
              options: ['3D pie', 'Bar chart', 'Exploding donut', 'Word cloud'],
              answer: 1,
            },
            doThis: 'Rewrite one chart title as the question it answers.',
          }),
        ],
        ['One chart retitled as a question'],
      ),
      chapter(
        'viz-encode',
        'Craft',
        'Encode without lying',
        35,
        'Start axes at zero for bars. Don’t dual-axis without labeling. Color is for meaning, not decoration.',
        ['Axes', 'Color', 'Annotation'],
        [
          card('Honest axes', 'Truncated bar axes exaggerate differences. Dual axes confuse. Prefer small multiples.', {
            tip: 'Put the insight in a one-line annotation.',
            doThis: 'Find one chart online and note how it could mislead.',
          }),
          card('Less ink, more signal', 'Drop gridlines you don’t need. Label directly. Sort bars by value.', {
            doThis: 'Redesign one busy chart on paper in 5 minutes.',
          }),
        ],
        ['Misleading example noted', 'One redesign sketch'],
      ),
    ],
  }),

  mini({
    id: 'productivity-systems',
    title: 'Personal Productivity Systems',
    tagline: 'Tasks and notes that survive real weeks — capture, clarify, review.',
    category: 'soft-skills',
    accent: '#15803D',
    cover: 'covers/focus-cover.png',
    who: 'Anyone drowning in tabs, chats, and half-finished lists.',
    outcomes: ['One capture inbox', 'A weekly review ritual', 'Notes linked to projects'],
    chapters: [
      chapter(
        'prod-capture',
        'Start',
        'One inbox to rule them',
        25,
        'Capture fast everywhere; process later. Multiple inboxes = lost work.',
        ['Capture', 'Clarify'],
        [
          card('Capture ≠ organize', 'Phone notes, email-to-self, and chat pins dump into ONE inbox you empty daily.', {
            doThis: 'Pick your single inbox tool and stick a sticky note on your monitor.',
            quiz: {
              question: 'Capture’s job is to…',
              options: ['Organize forever', 'Get stuff out of your head fast', 'Replace calendars', 'Skip reviews'],
              answer: 1,
            },
          }),
        ],
        ['Inbox chosen'],
      ),
      chapter(
        'prod-clarify',
        'Build',
        'Clarify into next actions',
        35,
        'Each item: trash, reference, someday, or next action with a verb.',
        ['Next actions', 'Projects'],
        [
          card('Verb + context', '“Email Priya about invoice” beats “Invoice”. Projects are outcomes with >1 action.', {
            tip: 'Calendar is for time-bound; list is for next actions.',
            doThis: 'Process 10 inbox items into next actions.',
            code: 'Inbox → Trash | Reference | Someday | Next action (verb)',
          }),
        ],
        ['Ten items processed'],
      ),
      chapter(
        'prod-review',
        'Steady',
        'Weekly review',
        30,
        '30–45 minutes: clear inbox, scan projects, pick Big 3 for the week.',
        ['Review', 'Big 3'],
        [
          card('The loop that keeps the system honest', 'Without a weekly review, lists rot. Protect the slot like a meeting.', {
            doThis: 'Put a recurring weekly review on your calendar.',
            url: 'https://gettingthingsdone.com/',
            linkLabel: 'GTD ideas',
          }),
        ],
        ['Review scheduled'],
      ),
    ],
  }),

  mini({
    id: 'documentation-writing',
    title: 'Writing Better Documentation',
    tagline: 'Docs people finish — jobs-to-be-done, examples first, keep them alive.',
    category: 'ops',
    accent: '#1D4ED8',
    cover: 'covers/communication-cover.png',
    who: 'Engineers, PMs, and support folks who write READMEs, runbooks, and how-tos.',
    outcomes: ['Structure a how-to', 'Write a runnable example', 'Own a freshness date'],
    chapters: [
      chapter(
        'doc-job',
        'Start',
        'Docs serve a job',
        25,
        '“Install X”, “Debug Y”, “Understand Z” — pick one job per page.',
        ['Audience', 'Job'],
        [
          card('One page, one job', 'Tutorials teach. How-tos accomplish. References look up. Explanations deepen. Don’t mash them.', {
            more: 'Diátaxis framework is a useful map.',
            url: 'https://diataxis.fr/',
            doThis: 'Label your last doc as tutorial / how-to / reference / explanation.',
          }),
        ],
        ['One doc labeled'],
      ),
      chapter(
        'doc-example',
        'Craft',
        'Example first',
        35,
        'Show the happy path command or snippet before the theory.',
        ['Examples', 'Failure modes'],
        [
          card('Copy-pasteable wins', 'If someone can’t paste and succeed, the doc failed. Include expected output.', {
            tryIt: {
              prompt: 'How-to skeleton',
              code: '## Goal\n## Prerequisites\n## Steps\n## Expected result\n## If it fails',
              result: 'A page someone can finish in one sitting.',
            },
            doThis: 'Rewrite one paragraph as numbered steps + expected result.',
          }),
        ],
        ['One how-to rewritten'],
      ),
      chapter(
        'doc-alive',
        'Steady',
        'Keep docs alive',
        20,
        'Owner, last-reviewed date, and a link from the thing it documents.',
        ['Ownership', 'Review'],
        [
          card('Stale docs are lies', 'Add “Last reviewed” and an owner. Delete pages nobody owns.', {
            doThis: 'Add last-reviewed + owner to one doc today.',
            tip: 'Link docs from error messages and UI empty states.',
          }),
        ],
        ['Owner + date added'],
      ),
    ],
  }),

  mini({
    id: 'ux-research-basics',
    title: 'Basic UX Research Methods',
    tagline: 'Talk to users without theater — interviews, usability tests, and synthesis.',
    category: 'design',
    accent: '#B45309',
    cover: 'covers/uiux-cover.png',
    who: 'Designers, PMs, and builders shipping features without a research team.',
    outcomes: ['Run a 5-user test', 'Write a discussion guide', 'Turn notes into insights'],
    chapters: [
      chapter(
        'uxr-ask',
        'Start',
        'Ask better questions',
        25,
        'Past behavior > hypotheticals. “Tell me about the last time…” beats “Would you use…?”',
        ['Questions', 'Bias'],
        [
          card('Avoid leading', 'Don’t pitch your solution in the question. Sit in silence. Follow the story.', {
            quiz: {
              question: 'Strongest interview prompt?',
              options: ['Would you buy this?', 'Tell me about the last time you…', 'Don’t you hate the old UI?', 'On a scale of 1–10 only'],
              answer: 1,
            },
            doThis: 'Write 5 non-leading questions for your product.',
          }),
        ],
        ['Five questions written'],
      ),
      chapter(
        'uxr-test',
        'Build',
        'Usability in an afternoon',
        40,
        '5 users, same tasks, think-aloud. You’re hunting friction, not validating your ego.',
        ['Tasks', 'Think-aloud'],
        [
          card('Task scripts', 'Give a goal, not clicks: “Find the refund policy and start a request.” Note where they stall.', {
            tip: 'Recruit people like your users — coworkers who built it don’t count.',
            doThis: 'Draft 3 tasks for a 20-minute test.',
            url: 'https://www.nngroup.com/articles/usability-testing-101/',
          }),
        ],
        ['Three tasks drafted'],
      ),
      chapter(
        'uxr-synth',
        'Steady',
        'Synthesize',
        30,
        'Affinity map quotes → themes → one insight per theme → decision.',
        ['Themes', 'Decisions'],
        [
          card('Insight = evidence + implication', '“3/5 couldn’t find X → move X above the fold and rename the nav.”', {
            doThis: 'Write one insight with a product implication from a past support ticket.',
          }),
        ],
        ['One insight written'],
      ),
    ],
  }),

  mini({
    id: 'git-for-humans',
    title: 'Version Control (Git) for Non-Engineers',
    tagline: 'Clone, branch, commit, PR — enough Git to collaborate without fear.',
    category: 'foundations',
    accent: '#A16207',
    cover: 'covers/git-cover.png',
    who: 'Writers, designers, PMs, and analysts who touch repos or GitHub.',
    outcomes: ['Clone and commit', 'Open a pull request', 'Recover from “oh no” safely'],
    chapters: [
      chapter(
        'git-why',
        'Start',
        'Why Git exists',
        20,
        'Time machine + collaboration. Commits are snapshots with messages for humans.',
        ['Snapshot', 'History'],
        [
          card('Commit = save point', 'Message in present tense: “Add pricing FAQ.” Small commits beat giant mystery dumps.', {
            doThis: 'Write 3 good commit messages for imaginary changes.',
            quiz: {
              question: 'A commit is best thought of as…',
              options: ['A Zoom recording', 'A snapshot with a note', 'A Slack thread', 'A database backup only'],
              answer: 1,
            },
          }),
        ],
        ['Three messages written'],
      ),
      chapter(
        'git-loop',
        'Build',
        'The happy loop',
        40,
        'pull → branch → edit → add → commit → push → pull request.',
        ['Branch', 'PR'],
        [
          card('Branch for the change', 'Never edit main directly on a team. Name branches like `docs/refund-faq`.', {
            code: 'git pull\ngit checkout -b docs/refund-faq\n# edit files\ngit add .\ngit commit -m "Add refund FAQ"\ngit push -u origin HEAD',
            url: 'https://docs.github.com/en/get-started',
            doThis: 'Make a tiny edit on a branch and open a PR (or practice on a personal repo).',
          }),
          card('Review is the product', 'PRs are for humans: summary, screenshots, “how to test”.', {
            tip: 'Ask for review from the person who owns the area.',
            doThis: 'Write a PR description template you like.',
          }),
        ],
        ['One practice PR'],
      ),
      chapter(
        'git-oops',
        'Steady',
        'Undo without panic',
        25,
        'Know discard vs revert. Don’t force-push shared main.',
        ['Undo', 'Safety'],
        [
          card('Safe undos', 'Uncommitted? discard in the GUI. Committed locally? amend or new commit. Shared history? revert.', {
            more: 'When unsure, copy the folder, then ask an engineer.',
            doThis: 'Bookmark your Git client’s “discard changes” docs.',
          }),
        ],
        ['Undo path bookmarked'],
      ),
    ],
  }),

  mini({
    id: 'api-basics-nondev',
    title: 'API Basics for Non-Developers',
    tagline: 'Requests, responses, auth, and status codes — enough to debug integrations.',
    category: 'foundations',
    accent: '#0F766E',
    cover: 'covers/api-testing-cover.png',
    who: 'PMs, support, ops, and no-code builders who live next to APIs.',
    outcomes: ['Read an endpoint docs page', 'Call an API in a client', 'Decode common errors'],
    chapters: [
      chapter(
        'api-http',
        'Start',
        'HTTP in plain words',
        25,
        'Client asks (request), server answers (response). Methods: GET read, POST create, PATCH update, DELETE remove.',
        ['Methods', 'JSON'],
        [
          card('URL + method + body', 'GET usually has no body. POST/PATCH often send JSON. Responses are often JSON too.', {
            code: 'GET /customers/42\n→ 200 { "id": 42, "name": "Ada" }',
            quiz: {
              question: 'GET is mainly for…',
              options: ['Deleting records', 'Reading data', 'Logging in only', 'Uploading videos only'],
              answer: 1,
            },
            doThis: 'Open any public API docs and find one GET endpoint.',
          }),
        ],
        ['One GET found'],
      ),
      chapter(
        'api-auth',
        'Build',
        'Auth & status codes',
        35,
        'API keys and tokens prove who you are. Status codes tell what happened.',
        ['Auth', 'Status'],
        [
          card('Keys are passwords', 'Never paste keys in public Slack or screenshots. Rotate if leaked.', {
            tip: '401 = who are you? 403 = I know you, but no. 404 = missing. 429 = slow down. 5xx = their problem.',
            doThis: 'Call a public demo API from Postman/Insomnia/Bruno.',
            url: 'https://httpbin.org/',
          }),
        ],
        ['One request sent'],
      ),
      chapter(
        'api-debug',
        'Steady',
        'Debug an integration',
        30,
        'Reproduce with the same headers/body. Compare docs vs what you sent. Check timestamps and idempotency.',
        ['Reproduce', 'Compare'],
        [
          card('Same request twice', 'If the client fails, replay the exact request in an API client. Fix the delta.', {
            doThis: 'Write a 5-line incident note template for API failures.',
          }),
        ],
        ['Template written'],
      ),
    ],
  }),

  mini({
    id: 'email-marketing-automation',
    title: 'Email & Marketing Automation',
    tagline: 'Welcome flows, segments, and ethical sends — automation that doesn’t spam.',
    category: 'delivery',
    accent: '#C2410C',
    cover: 'covers/communication-cover.png',
    who: 'Founders, marketers, and community folks running lifecycle email.',
    outcomes: ['Design a welcome flow', 'Segment without creepiness', 'Measure opens/clicks honestly'],
    chapters: [
      chapter(
        'em-flow',
        'Start',
        'Lifecycle > blasts',
        25,
        'Welcome, activate, retain, win-back. One job per email.',
        ['Lifecycle', 'One job'],
        [
          card('Map the journey', 'Day 0 welcome, Day 2 tip, Day 7 invite to the key action. Stop when they convert or unsubscribe.', {
            doThis: 'Sketch a 3-email welcome flow with one CTA each.',
            quiz: {
              question: 'Best default for a welcome email?',
              options: ['Hard sell everything', 'One clear next step', '20 product links', 'No unsubscribe'],
              answer: 1,
            },
          }),
        ],
        ['Three-email sketch'],
      ),
      chapter(
        'em-segment',
        'Build',
        'Segments & consent',
        35,
        'Send to people who opted in for that topic. Suppress recent purchasers from “buy now” nags.',
        ['Consent', 'Suppressions'],
        [
          card('Permission is the product', 'Double opt-in where required. Easy unsubscribe. Honor it fast.', {
            tip: 'Automation without suppressions is how brands get hated.',
            doThis: 'List 3 suppression rules for your list.',
          }),
        ],
        ['Three suppressions listed'],
      ),
      chapter(
        'em-measure',
        'Steady',
        'Measure what matters',
        25,
        'Clicks and downstream action beat vanity opens (especially with privacy protection).',
        ['Metrics', 'Tests'],
        [
          card('Test one variable', 'Subject line OR send time OR CTA — not all at once.', {
            doThis: 'Write one A/B test hypothesis for your next send.',
          }),
        ],
        ['Hypothesis written'],
      ),
    ],
  }),

  mini({
    id: 'personal-branding-portfolio',
    title: 'Personal Branding & Portfolio Building',
    tagline: 'Show your work — a tight story, proof, and a portfolio that loads fast.',
    category: 'career',
    accent: '#BE123C',
    cover: 'covers/interview-cover.png',
    who: 'Job seekers and freelancers who need proof, not buzzwords.',
    outcomes: ['Positioning one-liner', '3 case studies', 'A shareable portfolio page'],
    chapters: [
      chapter(
        'pb-position',
        'Start',
        'Positioning',
        25,
        'Who you help + what outcome + proof. One sentence.',
        ['Audience', 'Outcome'],
        [
          card('The one-liner', '“I help X do Y so they can Z.” Example: “I help startups ship reliable Playwright suites so releases stop being scary.”', {
            doThis: 'Write your one-liner and say it out loud twice.',
            quiz: {
              question: 'Strong positioning focuses on…',
              options: ['Every tool you touched', 'Who you help and the outcome', 'Vague passion only', 'Salary history'],
              answer: 1,
            },
          }),
        ],
        ['One-liner written'],
      ),
      chapter(
        'pb-case',
        'Build',
        'Case studies that prove it',
        40,
        'Context → your role → actions → result (numbers if honest) → what you’d do next.',
        ['STAR', 'Proof'],
        [
          card('Three stories max', 'Depth beats a wall of thumbnails. Link artifacts: PRs, designs, dashboards, posts.', {
            tryIt: {
              prompt: 'Case outline',
              code: 'Context\nRole\nActions (3 bullets)\nResult\nArtifact link',
              result: 'A case a hiring manager can skim in 90 seconds.',
            },
            doThis: 'Draft one case study outline with an artifact link.',
          }),
        ],
        ['One case drafted'],
      ),
      chapter(
        'pb-ship',
        'Steady',
        'Ship the portfolio',
        30,
        'One page is enough: about, selected work, contact. Fast, mobile, accessible.',
        ['Ship', 'Share'],
        [
          card('Done > perfect', 'GitHub Pages, Notion public page, Framer — pick boring and publish.', {
            tip: 'Ask a friend: “What do I do?” after 10 seconds on your site.',
            doThis: 'Publish a v1 and share the link with one person for feedback.',
          }),
        ],
        ['v1 published or scheduled'],
      ),
    ],
  }),
]
