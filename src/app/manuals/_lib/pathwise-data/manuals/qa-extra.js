import { ch, r } from '../helpers.js'

/** Extra quality craft — exploratory, planning, bug advocacy, performance. */
export const qaExtraManuals = [
  {
    id: 'exploratory-testing',
    title: 'Exploratory Testing',
    tagline: 'Charters, sessions, notes, and heuristics — structured freedom that finds real bugs.',
    category: 'quality',
    accent: '#0B3D2E',
    cover: 'covers/test-automation-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'QA and builders who want exploration that is rigorous — not random clicking.',
    outcomes: [
      'Design charters and run session-based exploratory tests',
      'Take notes that become bugs, risks, and coverage insight',
      'Apply heuristics (SFDIPOT, etc.) under timeboxes',
    ],
    chapters: [
      ch({
        id: 'et-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Exploratory testing is simultaneous learning, test design, and execution. It is not “ad hoc with vibes.” You will practice on a real app (staging, demo, or open site) with timers and charters.',
        learn: ['Mindset', 'Practice app', 'Session rhythm'],
        steps: [
          {
            title: 'Pick the target',
            body: 'Prefer an app you can break safely. Sauce Demo, your staging env, or a public sandbox.',
            doThis: 'Name the app + primary user goal you’ll explore for the next 3 weeks.',
            items: [
              'Recommended: 3–5 weeks, 2–3 sessions/week',
              'Each session: 45–90 minutes timeboxed',
              'Debrief within 15 minutes of ending',
            ],
          },
        ],
        checklist: ['Target app chosen', 'Calendar blocks for 3 sessions'],
        practice: { title: 'Baseline wander', brief: '15 minutes unguided click-around. Note what felt confusing — then stop. Charters come next.' },
        resources: [
          r('doc', 'Ministry of Testing — Exploratory', 'https://www.ministryoftesting.com/coverage/exploratory-testing', 'EN'),
          r('article', 'Bach — Exploratory testing', 'https://www.satisfice.com/blog/archives/46', 'EN'),
        ],
      }),

      ch({
        id: 'et-charters',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'Charters that focus freedom',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'A charter says where to explore and why — not step-by-step scripts. Too vague = wandering. Too tight = scripted testing in disguise.',
        learn: ['Charter format', 'Scope & risks', 'Good vs mushy'],
        steps: [
          {
            title: 'Write charters',
            body: 'Explore <target> with <resources> to discover <information>.',
            doThis: 'Write 5 charters for your app. Star the two you’ll run this week.',
            code: `Explore checkout with invalid coupons and currency changes
to discover price calculation and error-handling risks.

Explore settings permissions as a new user
to discover authorization gaps and confusing defaults.`,
            tip: 'Include a risk or question. “Explore the app” is not a charter.',
          },
        ],
        checklist: ['Five charters written', 'Two scheduled'],
        resources: [
          r('article', 'Charters (HTSM)', 'https://www.satisfice.com/download/useful-test-heuristics', 'EN'),
        ],
      }),

      ch({
        id: 'et-sbtm',
        phase: 'A · Structure',
        level: 'intermediate',
        title: 'Session-based test management',
        minutes: 40,
        overview:
          'Timebox a session (e.g. 90 min). Charter, notes, bugs, risks, leftover questions. Debrief. This makes exploration reportable.',
        learn: ['Session sheets', 'Timeboxes', 'Debrief questions'],
        steps: [
          {
            title: 'Run a scored session',
            body: 'Start timer. Stay on charter unless a thread is clearly higher risk — then note the diversion.',
            doThis: 'Complete one 60–90 min session with a session sheet.',
            items: [
              'Charter + timebox',
              'Notes / transcripts',
              'Bugs filed or drafted',
              '% on charter vs opportunity',
              'Follow-ups',
            ],
          },
          {
            title: 'Debrief',
            body: 'What did you cover? What’s still risky? What should automation or next session take?',
            doThis: 'Write a 5-bullet debrief within 15 minutes of stopping.',
          },
        ],
        checklist: ['One full SBTM session', 'Debrief written'],
        practice: { title: 'Peer debrief', brief: 'Walk a peer through your notes for 10 minutes. Fix one unclear note habit.' },
        resources: [
          r('doc', 'Session-Based Test Management', 'https://www.satisfice.com/sbtm/', 'EN'),
        ],
      }),

      ch({
        id: 'et-notes',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'Note-taking that survives the session',
        minutes: 30,
        overview:
          'Notes are your product. Future-you and teammates need paths, data used, observations, and open questions — not a novel.',
        learn: ['Threaded notes', 'Evidence capture', 'Promoting to bugs'],
        steps: [
          {
            title: 'Note structure',
            body: 'Timestamps, area, action, observation, question/bug seed.',
            doThis: 'Adopt a template. Use it in your next session.',
            code: `[12:04] Cart — changed qty 1→0 — button stayed enabled — Q: empty cart state?
[12:11] BUG? — promo code "SAVE" applies twice — screenshot.png`,
          },
          {
            title: 'Evidence hygiene',
            body: 'Screenshots, HAR, console, user id, build number. File bugs same day.',
            doThis: 'Promote at least 2 note seeds into proper bugs or risk notes.',
          },
        ],
        checklist: ['Template adopted', 'Two promotions done'],
      }),

      ch({
        id: 'et-heuristics',
        phase: 'B · Thinking tools',
        level: 'intermediate',
        title: 'Heuristics: SFDIPOT & friends',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Heuristics are mental checklists that spark ideas under pressure. They are not complete test cases.',
        learn: ['SFDIPOT', 'CRUSSPIC STMP', 'Consistency heuristics'],
        steps: [
          {
            title: 'SFDIPOT tour',
            body: 'Structure, Function, Data, Interfaces, Platform, Operations, Time.',
            doThis: 'For your app, write one question per SFDIPOT letter.',
            items: [
              'Structure — files, configs, hidden fields',
              'Function — features, error handling',
              'Data — inputs, defaults, migrations',
              'Interfaces — API, UI, imports',
              'Platform — browsers, locales, mobile',
              'Operations — install, permissions, logs',
              'Time — timeouts, schedules, TZ',
            ],
          },
          {
            title: 'Heuristic-driven session',
            body: 'Pick one letter (e.g. Data or Time) as the lens for a charter.',
            doThis: 'Run a 45-min session with an explicit heuristic lens. Log ideas generated.',
          },
        ],
        checklist: ['SFDIPOT questions written', 'Heuristic session run'],
        resources: [
          r('doc', 'HTSM / heuristics', 'https://www.satisfice.com/download/useful-test-heuristics', 'EN'),
          r('article', 'Test Heuristics Cheat Sheet (Gojko)', 'https://gojko.net/2021/03/09/test-heuristics/', 'EN'),
        ],
      }),

      ch({
        id: 'et-oracles',
        phase: 'B · Thinking tools',
        level: 'intermediate',
        title: 'Oracles & recognizing bugs',
        minutes: 30,
        overview:
          'An oracle is how you know something is wrong: consistency, standards, user expectations, history, claims in docs.',
        learn: ['FEW HICCUPPS', 'Consistency oracles', 'When “weird” isn’t a bug'],
        steps: [
          {
            title: 'Name your oracle',
            body: 'Every bug report implies an oracle. Make it explicit.',
            doThis: 'For 3 bugs you’ve filed (or will file), write the oracle in one line.',
            tip: '“I don’t like it” is taste. “Violates stated pricing rules” is an oracle.',
          },
        ],
        checklist: ['Three oracles named'],
        resources: [
          r('article', 'Oracles (Bach)', 'https://www.satisfice.com/blog/archives/168', 'EN'),
        ],
      }),

      ch({
        id: 'et-cp1',
        kind: 'checkpoint',
        phase: 'B · Thinking tools',
        level: 'intermediate',
        title: 'Checkpoint: three sessions',
        minutes: 45,
        durationLabel: 'Gate',
        overview: 'Evidence pack: 3 session sheets, charters, debriefs, and bugs/risks found.',
        learn: ['Reporting exploration'],
        steps: [
          {
            title: 'Ship the pack',
            doThis: 'Summarize coverage vs residual risk on one page for a stakeholder.',
          },
        ],
        checklist: ['Three sessions documented', 'One-pager risk summary'],
        practice: { title: 'Stakeholder read', brief: 'Ask: what would you want explored next? Adjust charters.' },
      }),

      ch({
        id: 'et-pair',
        phase: 'C · Team craft',
        level: 'advanced',
        title: 'Pairing, tours & automation handshake',
        minutes: 35,
        durationLabel: 'Week 3',
        overview:
          'Pair exploration multiplies insight. Tours (feature, claims, emotional…) diversify paths. Feed findings into automation where ROI is clear.',
        learn: ['Pair roles', 'Tours', 'Automation candidates'],
        steps: [
          {
            title: 'Pair session',
            body: 'Driver / navigator. Switch every 15–20 minutes.',
            doThis: 'Run one paired session. Compare notes styles after.',
          },
          {
            title: 'Automation handoff',
            body: 'Stable, high-value, regressions → automate. Fleeting UI experiments → don’t.',
            doThis: 'List 3 findings: automate / monitor / re-explore later.',
          },
        ],
        checklist: ['Pair session done', 'Three handoff decisions'],
        resources: [
          r('article', 'Tours (Kohl / Kelly)', 'https://www.satisfice.com/download/tours', 'EN'),
        ],
      }),

      ch({
        id: 'et-cp2',
        kind: 'checkpoint',
        phase: 'C · Team craft',
        level: 'advanced',
        title: 'Checkpoint: exploration playbook',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Write a one-team playbook: charter bank, session template, heuristic cheatsheet, debrief ritual.',
        learn: ['Institutionalizing craft'],
        steps: [
          {
            title: 'Playbook deliverable',
            doThis: 'Publish in wiki/repo. Run one session using only the playbook.',
            items: [
              'Charter bank (10+)',
              'Session sheet template',
              'Heuristic list tailored to product',
              'Debrief agenda (5 questions)',
            ],
          },
        ],
        checklist: ['Playbook live', 'Validation session done'],
        note: 'Pace: 3–5 weeks. Skill grows with debriefs, not hours of silent clicking.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Session-Based Test Management', url: 'https://www.satisfice.com/sbtm/' },
        { name: 'Ministry of Testing — Exploratory', url: 'https://www.ministryoftesting.com/coverage/exploratory-testing' },
      ],
      tools: ['Timer', 'Note app / markdown', 'Screenshot + HAR capture', 'Session sheet (spreadsheet)'],
      books: [
        'Explore It! (Hendrickson)',
        'Lessons Learned in Software Testing (Kaner, Bach, Pettichord) — selective',
      ],
      practice: ['3 timed sessions/week', 'Build a charter bank for your product'],
      videos: [{ name: 'MoT exploratory talks', url: 'https://www.ministryoftesting.com/' }],
    },
  },

  {
    id: 'test-planning',
    title: 'Test Planning & Strategy',
    tagline: 'Risk-based plans, entry/exit criteria, and environments that match the bet.',
    category: 'quality',
    accent: '#145C4A',
    cover: 'covers/api-testing-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA leads and ICs who need a plan stakeholders trust — without a 40-page binder nobody reads.',
    outcomes: [
      'Build risk-based test strategies for a release or feature',
      'Write lean test plans with entry/exit and clear scope',
      'Reason about environments and test data constraints',
    ],
    chapters: [
      ch({
        id: 'tp-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'A test plan is a decision document: what we will test, what we won’t, and why that’s acceptable. Pick an upcoming release or feature as your case.',
        learn: ['Case selection', 'Lean docs'],
        steps: [
          {
            title: 'Pick the release',
            body: 'Something with a date and stakeholders. Perfect.',
            doThis: 'Write goal, ship date, and the scariest failure mode in one paragraph.',
          },
        ],
        checklist: ['Case paragraph written'],
        resources: [
          r('doc', 'ISTQB — Test planning overview', 'https://istqb.org/', 'EN'),
          r('article', 'Ministry of Testing — Test strategy', 'https://www.ministryoftesting.com/coverage/test-strategy', 'EN'),
        ],
      }),

      ch({
        id: 'tp-risk',
        phase: 'A · Strategy',
        level: 'beginner',
        title: 'Risk-based testing',
        minutes: 40,
        durationLabel: 'Week 1',
        overview:
          'You never have enough time. Spend it where failure hurts most: likelihood × impact, informed by change and history.',
        learn: ['Risk catalog', 'Scoring lite', 'Coverage vs confidence'],
        steps: [
          {
            title: 'Build a risk list',
            body: 'Product risks (user harm, money, trust) and project risks (env, data, skills).',
            doThis: 'List 10 risks. Score impact and likelihood 1–5. Sort.',
            tip: 'Talk to support and on-call — they know the real dragons.',
          },
          {
            title: 'Map tests to risks',
            body: 'Each top risk needs a mitigation: test idea, monitoring, feature flag, etc.',
            doThis: 'For top 5 risks, write the test approach in one line each.',
          },
        ],
        checklist: ['Ten risks scored', 'Top 5 mitigations'],
        resources: [
          r('article', 'Risk-based testing (MoT)', 'https://www.ministryoftesting.com/articles/risk-based-testing', 'EN'),
        ],
      }),

      ch({
        id: 'tp-strategy',
        phase: 'A · Strategy',
        level: 'intermediate',
        title: 'Strategy: levels & types',
        minutes: 35,
        overview:
          'Unit, integration, API, UI, exploratory, a11y, security, performance — choose the cheapest level that finds the risk.',
        learn: ['Test pyramid judgment', 'Shift-left/right', 'Who owns what'],
        steps: [
          {
            title: 'Level map',
            body: 'For your feature, assign risks to levels. Avoid “everything in E2E.”',
            doThis: 'Draw a simple pyramid/map with example tests at each level.',
            items: [
              'Unit — logic & pure functions',
              'API/contract — integrations',
              'UI E2E — critical journeys only',
              'Exploratory — unknowns & UX',
              'Prod checks — monitoring / synthetics',
            ],
          },
        ],
        checklist: ['Level map drawn'],
        resources: [
          r('article', 'Test pyramid (Fowler)', 'https://martinfowler.com/articles/practical-test-pyramid.html', 'EN'),
        ],
      }),

      ch({
        id: 'tp-plan',
        phase: 'B · The plan',
        level: 'intermediate',
        title: 'Lean test plan',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Scope, risks, approach, environments, data, schedule, entry/exit, responsibilities. Keep it scannable.',
        learn: ['Plan sections', 'Living docs', 'Sign-off lite'],
        steps: [
          {
            title: 'Draft the plan',
            body: '2–4 pages. Link out to charters and suites instead of pasting everything.',
            doThis: 'Write the plan for your case release.',
            code: `# Test plan — <feature/release>
Scope / out of scope
Risks & focus areas
Approach (levels, exploratory, automation)
Environments & data
Entry / exit criteria
Schedule & owners
Residual risk & asks`,
          },
        ],
        checklist: ['Draft plan complete'],
        practice: { title: 'Peer review', brief: 'Have eng + PM skim. Fix the top confusion.' },
      }),

      ch({
        id: 'tp-entry-exit',
        phase: 'B · The plan',
        level: 'intermediate',
        title: 'Entry & exit criteria',
        minutes: 30,
        overview:
          'Entry = when testing can start honestly. Exit = when shipping risk is acceptable — not “zero bugs.”',
        learn: ['Entry gates', 'Exit / ship criteria', 'Waivers'],
        steps: [
          {
            title: 'Write criteria',
            body: 'Build stability, data ready, known Sev-1 policy, coverage of Must journeys, stakeholder sign-off path.',
            doThis: 'Publish entry and exit lists. Add a waiver template for exceptions.',
            tip: 'Exit criteria without RAG honesty become theater.',
          },
        ],
        checklist: ['Entry/exit published', 'Waiver template exists'],
      }),

      ch({
        id: 'tp-envs',
        phase: 'B · The plan',
        level: 'intermediate',
        title: 'Environments & test data',
        minutes: 35,
        overview:
          'Wrong env = false confidence. Know prod parity gaps, secrets, PII rules, and data refresh habits.',
        learn: ['Parity gaps', 'Data strategies', 'Service virtualization lite'],
        steps: [
          {
            title: 'Env matrix',
            body: 'What differs: versions, feature flags, third parties, volume.',
            doThis: 'Table: env × purpose × known gaps × who owns refresh.',
          },
          {
            title: 'Data plan',
            body: 'Synthetic vs anonymized prod. Seed scripts. Cleanup.',
            doThis: 'Document how you’ll get accounts/data for top 3 journeys — legally.',
          },
        ],
        checklist: ['Env matrix', 'Data approach for 3 journeys'],
        resources: [
          r('article', 'Test environments (Thoughtworks)', 'https://www.thoughtworks.com/insights/blog/testing/test-environments', 'EN'),
        ],
      }),

      ch({
        id: 'tp-cp1',
        kind: 'checkpoint',
        phase: 'B · The plan',
        level: 'intermediate',
        title: 'Checkpoint: plan review',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Walk stakeholders through the plan in 15 minutes. Capture decisions.',
        learn: ['Facilitation'],
        steps: [
          {
            title: 'Review meeting',
            doThis: 'Leave with: agreed scope cuts, risk acceptance, and open asks with owners.',
          },
        ],
        checklist: ['Review held', 'Decisions logged'],
      }),

      ch({
        id: 'tp-adapt',
        phase: 'C · Operate',
        level: 'advanced',
        title: 'Living strategy & change',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Plans rot. Update when scope shifts. Daily/weekly risk re-rank beats clinging to week-one fiction.',
        learn: ['Change triggers', 'Status of testing', 'Lessons into next plan'],
        steps: [
          {
            title: 'Change protocol',
            body: 'When Must scope changes, re-enter planning for 30 minutes — don’t silently absorb.',
            doThis: 'Write a 5-line change protocol for your team.',
          },
        ],
        checklist: ['Change protocol written'],
      }),

      ch({
        id: 'tp-cp2',
        kind: 'checkpoint',
        phase: 'C · Operate',
        level: 'advanced',
        title: 'Checkpoint: strategy + plan pack',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Final pack: risk list, strategy map, lean plan, entry/exit, env/data matrix.',
        learn: ['Portfolio of artifacts'],
        steps: [
          {
            title: 'Capstone',
            doThis: 'Store in repo/wiki. Use it on the real release or a postmortem of a past one.',
            items: [
              'Risk-ranked list',
              'Level/strategy map',
              'Lean test plan',
              'Entry/exit + waiver',
              'Env & data matrix',
            ],
          },
        ],
        checklist: ['All five artifacts', 'One real use or postmortem apply'],
        note: 'Pace: 3–4 weeks. A short plan that drives decisions beats a perfect unread PDF.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Practical test pyramid', url: 'https://martinfowler.com/articles/practical-test-pyramid.html' },
        { name: 'MoT — Test strategy', url: 'https://www.ministryoftesting.com/coverage/test-strategy' },
      ],
      tools: ['Confluence / Notion', 'Risk spreadsheet', 'Feature flags dashboard', 'Env inventory'],
      books: [
        'Agile Testing (Crispin & Gregory) — strategy chapters',
        'Explore It! — for exploratory sections of plans',
      ],
      practice: ['Plan one real release leanly', 'Facilitate one plan review'],
      videos: [],
    },
  },

  {
    id: 'bug-advocacy',
    title: 'Bug Reporting & Advocacy',
    tagline: 'Repro, severity, evidence, and negotiating fixes without becoming “the blocker.”',
    category: 'quality',
    accent: '#1A4A3A',
    cover: 'covers/communication-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'QA and anyone who files defects and wants them fixed for the right reasons.',
    outcomes: [
      'Write bugs that engineers can reproduce in minutes',
      'Separate severity from priority and argue with evidence',
      'Advocate for fixes without escalating personality wars',
    ],
    chapters: [
      ch({
        id: 'ba-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'A bug report is a persuasive document. Your job: make the problem undeniable and the impact clear. Collect 3 of your past bugs as specimens.',
        learn: ['Specimens', 'Advocacy mindset'],
        steps: [
          {
            title: 'Gather specimens',
            body: 'One good, one mediocre, one that got “can’t repro.”',
            doThis: 'Save links to three bugs. You’ll rewrite the weak ones.',
          },
        ],
        checklist: ['Three specimens saved'],
        resources: [
          r('article', 'How to write a bug report', 'https://www.ministryoftesting.com/articles/how-to-write-a-bug-report', 'EN'),
        ],
      }),

      ch({
        id: 'ba-repro',
        phase: 'A · Craft',
        level: 'beginner',
        title: 'Repro steps that work',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'Numbered steps, starting state, test data, environment. If you can’t repro twice, say so — and what varies.',
        learn: ['Minimal repro', 'Starting state', 'Flake honesty'],
        steps: [
          {
            title: 'Minimal path',
            body: 'Strip irrelevant clicks. One path, one bug.',
            doThis: 'Rewrite your weakest bug’s steps. Time a teammate reproducing.',
            code: `Environment: staging, Chrome 128, user role X, build abc123
Preconditions: account with … / flag ON
Steps:
1. …
2. …
Expected: …
Actual: …
Frequency: 3/3 (or 1/5 — flake)`,
            tip: 'Video helps; it does not replace steps.',
          },
        ],
        checklist: ['Weak bug rewritten', 'Teammate repro timed'],
      }),

      ch({
        id: 'ba-evidence',
        phase: 'A · Craft',
        level: 'beginner',
        title: 'Evidence packs',
        minutes: 30,
        overview:
          'Screenshots, screen recordings, console errors, network HAR, logs, correlation ids. Attach what proves Actual.',
        learn: ['What to capture', 'PII caution', 'Redaction'],
        steps: [
          {
            title: 'Evidence checklist',
            body: 'Match evidence to bug type: UI visual vs API 500 vs race.',
            doThis: 'Add missing evidence to one open bug. Redact PII.',
          },
        ],
        checklist: ['One bug upgraded with evidence'],
        resources: [
          r('doc', 'Chrome DevTools Network', 'https://developer.chrome.com/docs/devtools/network/', 'EN'),
        ],
      }),

      ch({
        id: 'ba-sev-pri',
        phase: 'A · Craft',
        level: 'intermediate',
        title: 'Severity vs priority',
        minutes: 30,
        overview:
          'Severity = impact on users/system. Priority = order of work. You recommend; product/eng own priority.',
        learn: ['Scales', 'User impact stories', 'Avoiding P0 spam'],
        steps: [
          {
            title: 'Impact narrative',
            body: 'Who is hurt, how often, workarounds, blast radius.',
            doThis: 'Write severity rationale for 3 bugs in two sentences each.',
            items: [
              'Sev-1 — blocker / data loss / security / no workaround',
              'Sev-2 — major feature broken, limited workaround',
              'Sev-3 — partial / annoying / edge',
              'Sev-4 — cosmetic / polish',
            ],
          },
        ],
        checklist: ['Three rationales written'],
      }),

      ch({
        id: 'ba-title',
        phase: 'A · Craft',
        level: 'beginner',
        title: 'Titles & taxonomy',
        minutes: 25,
        overview:
          'Searchable titles: component + failure. Labels for area. Don’t bury the lede in “weird issue.”',
        learn: ['Title patterns', 'Duplicates', 'Components'],
        steps: [
          {
            title: 'Title clinic',
            body: 'Bad: “Button broken.” Better: “Checkout — Pay CTA disabled after applying expired coupon.”',
            doThis: 'Rewrite 5 titles for clarity + search.',
          },
        ],
        checklist: ['Five titles rewritten'],
      }),

      ch({
        id: 'ba-cp1',
        kind: 'checkpoint',
        phase: 'B · Advocacy',
        level: 'intermediate',
        title: 'Checkpoint: gold-standard bug',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'One bug with perfect repro, evidence, sev rationale, and clean title — peer-reviewed.',
        learn: ['Bar setting'],
        steps: [
          {
            title: 'Ship gold',
            doThis: 'Peer rates: repro clarity 1–5. Iterate until ≥4.',
          },
        ],
        checklist: ['Gold bug ≥4/5', 'Template updated from lessons'],
      }),

      ch({
        id: 'ba-advocate',
        phase: 'B · Advocacy',
        level: 'advanced',
        title: 'Negotiating fixes',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Advocacy: connect bug to user/business risk, offer options (fix now / flag / monitor / defer with date). Stay curious, not adversarial.',
        learn: ['Options framing', 'Data & support tickets', 'When to escalate'],
        steps: [
          {
            title: 'Options memo',
            body: 'For a contested bug: fix now / mitigate / accept risk until date.',
            doThis: 'Write a short options note for one deferred bug. Share with owner.',
            tip: 'Ask “what would change your mind?” — genuine curiosity.',
          },
          {
            title: 'Escalation path',
            body: 'Know when safety/security/legal overrides backlog preference.',
            doThis: 'Document your team’s escalation path in 5 bullets.',
          },
        ],
        checklist: ['Options memo shared', 'Escalation path written'],
        resources: [
          r('article', 'Bug advocacy (Kaner)', 'http://www.kaner.com/pdfs/bugadvoc.pdf', 'EN'),
        ],
      }),

      ch({
        id: 'ba-tone',
        phase: 'B · Advocacy',
        level: 'intermediate',
        title: 'Tone, ego, and relationships',
        minutes: 25,
        overview:
          'Attack the defect, not the developer. Assume competence. Celebrate fixes. Your reputation is compounding capital.',
        learn: ['Feedback hygiene', 'Public vs private', 'Credit'],
        steps: [
          {
            title: 'Rewrite heat',
            body: 'Remove sarcasm and absolute language from one heated comment.',
            doThis: 'Before/after of a comment. Prefer questions and impact.',
          },
        ],
        checklist: ['One comment rewritten'],
      }),

      ch({
        id: 'ba-cp2',
        kind: 'checkpoint',
        phase: 'B · Advocacy',
        level: 'advanced',
        title: 'Checkpoint: advocacy case study',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Document one bug from find → report → negotiate → outcome. What worked?',
        learn: ['Reflection'],
        steps: [
          {
            title: 'Case study',
            doThis: '1–2 pages: timeline, artifacts, what you’d do differently.',
            items: [
              'Initial report link',
              'Evidence & sev rationale',
              'Pushback faced',
              'Resolution / risk acceptance',
              'Lesson for the team template',
            ],
          },
        ],
        checklist: ['Case study published', 'One template improvement merged'],
        note: 'Pace: 2–4 weeks. Clarity and respect move more bugs than volume.',
      }),
    ],
    resources: {
      docs: [
        { name: 'MoT — Bug reports', url: 'https://www.ministryoftesting.com/articles/how-to-write-a-bug-report' },
        { name: 'Chrome DevTools', url: 'https://developer.chrome.com/docs/devtools/' },
      ],
      tools: ['Issue tracker templates', 'Loom / QuickTime', 'HAR export', 'Log search'],
      books: ['Lessons Learned in Software Testing — bug advocacy chapters'],
      practice: ['Rewrite 10 bugs', 'Peer repro challenge weekly'],
      videos: [],
    },
  },

  {
    id: 'performance-testing',
    title: 'Performance Testing Basics',
    tagline: 'k6/JMeter lite, SLIs, load vs soak, and reading graphs without lying to yourself.',
    category: 'quality',
    accent: '#0F5C4C',
    cover: 'covers/cicd-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA and engineers adding performance checks without becoming full-time SREs.',
    outcomes: [
      'Define SLIs/SLOs for a critical journey',
      'Run basic load and soak tests with k6 or JMeter',
      'Interpret latency, error rate, and saturation graphs',
    ],
    chapters: [
      ch({
        id: 'pf-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Performance work is dangerous on production. Prefer staging with prod-like data shape. You’ll define user-centric metrics first, tools second.',
        learn: ['Safety rules', 'Tool choice', 'Case journey'],
        steps: [
          {
            title: 'Pick journey + tool',
            body: 'k6 is script-friendly; JMeter is GUI-heavy. Either works for basics.',
            doThis: 'Name one critical API or page journey. Install k6 or JMeter locally.',
            tip: 'Never load-test production without explicit written approval.',
          },
        ],
        checklist: ['Journey named', 'Tool installed'],
        resources: [
          r('doc', 'k6 docs', 'https://grafana.com/docs/k6/latest/', 'EN'),
          r('doc', 'JMeter Getting Started', 'https://jmeter.apache.org/usermanual/get-started.html', 'EN'),
        ],
      }),

      ch({
        id: 'pf-sli',
        phase: 'A · Define good',
        level: 'beginner',
        title: 'SLIs, SLOs & user perception',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'SLI = what you measure. SLO = target. Latency percentiles (p95/p99) beat averages. Errors and saturation complete the picture.',
        learn: ['Latency percentiles', 'Availability', 'Apdex lite'],
        steps: [
          {
            title: 'Define SLIs',
            body: 'For your journey: success rate, latency p95, maybe throughput.',
            doThis: 'Write SLIs + draft SLO (e.g. p95 < 500ms at X RPS). Note confidence.',
            items: [
              'Latency — p50/p95/p99',
              'Errors — 5xx / business failures',
              'Saturation — CPU, pool, queue depth',
            ],
          },
        ],
        checklist: ['SLI/SLO draft'],
        resources: [
          r('doc', 'Google SRE — SLIs/SLOs', 'https://sre.google/sre-book/service-level-objectives/', 'EN'),
        ],
      }),

      ch({
        id: 'pf-types',
        phase: 'A · Define good',
        level: 'beginner',
        title: 'Load, stress, soak, spike',
        minutes: 30,
        overview:
          'Load = expected traffic. Stress = find breaking point. Soak = endurance/leaks. Spike = sudden surge. Pick the question first.',
        learn: ['Test types', 'Arrival patterns', 'Warm-up'],
        steps: [
          {
            title: 'Match question → type',
            body: '“Can we handle Black Friday?” vs “Do we leak over 4 hours?”',
            doThis: 'Write one question for each of the four types for your product.',
          },
        ],
        checklist: ['Four questions written'],
      }),

      ch({
        id: 'pf-k6',
        phase: 'B · Execute',
        level: 'intermediate',
        title: 'Script a load test (k6 lite)',
        minutes: 45,
        durationLabel: 'Week 2',
        overview:
          'Virtual users, thresholds, stages. Start tiny. Grow. Watch errors before celebrating RPS.',
        learn: ['VUs & iterations', 'Thresholds', 'Stages'],
        steps: [
          {
            title: 'First script',
            body: 'HIT a safe endpoint. Check status. Threshold on http_req_failed and p95.',
            doThis: 'Run a 1-minute smoke. Then a small load stage.',
            code: `import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },
    { duration: '1m', target: 5 },
    { duration: '30s', target: 0 },
  ],
  thresholds: {
    http_req_failed: ['rate<0.01'],
    http_req_duration: ['p(95)<800'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');
  check(res, { 'status 200': (r) => r.status === 200 });
  sleep(1);
}`,
            tip: 'Use test.k6.io or your staging — not random public sites at scale.',
          },
        ],
        checklist: ['Smoke + small load run saved'],
        resources: [
          r('doc', 'k6 — Thresholds', 'https://grafana.com/docs/k6/latest/using-k6/thresholds/', 'EN'),
          r('doc', 'k6 — Stages', 'https://grafana.com/docs/k6/latest/using-k6/stages-options/', 'EN'),
        ],
      }),

      ch({
        id: 'pf-jmeter',
        phase: 'B · Execute',
        level: 'intermediate',
        title: 'JMeter lite alternative',
        minutes: 35,
        overview:
          'Thread groups, HTTP samplers, listeners. Same ideas as k6 — different UI. Skim if you already prefer k6.',
        learn: ['Thread groups', 'Assertions', 'Reporting'],
        steps: [
          {
            title: 'Minimal plan',
            body: 'One thread group, one sampler, one assertion, summary report.',
            doThis: 'Run an equivalent smoke to your k6 script (or primary tool only).',
          },
        ],
        checklist: ['JMeter smoke OR deliberate skip logged'],
        resources: [
          r('doc', 'JMeter best practices', 'https://jmeter.apache.org/usermanual/best-practices.html', 'EN'),
        ],
      }),

      ch({
        id: 'pf-graphs',
        phase: 'B · Execute',
        level: 'intermediate',
        title: 'Reading graphs honestly',
        minutes: 35,
        overview:
          'Correlate latency, errors, and system metrics. Averages hide pain. Coordinate drops. Watch for coordinated omission and client-side bottlenecks.',
        learn: ['Percentile graphs', 'Error correlation', 'Bottleneck hypotheses'],
        steps: [
          {
            title: 'Read a run',
            body: 'When p95 climbs, do errors climb? Is CPU maxed? DB locks?',
            doThis: 'Annotate one test run: hypothesis for the bottleneck in 3 bullets.',
            tip: 'If the load generator is saturated, you’re measuring your laptop.',
          },
        ],
        checklist: ['Annotated run with hypothesis'],
        resources: [
          r('article', 'Latency numbers & percentiles', 'https://bravenewgeek.com/everything-you-know-about-latency-is-wrong/', 'EN'),
        ],
      }),

      ch({
        id: 'pf-cp1',
        kind: 'checkpoint',
        phase: 'B · Execute',
        level: 'intermediate',
        title: 'Checkpoint: load report',
        minutes: 45,
        durationLabel: 'Gate',
        overview: 'Deliver a short report: setup, SLOs, results graphs, pass/fail, next risks.',
        learn: ['Reporting'],
        steps: [
          {
            title: 'Write the report',
            doThis: '2 pages max. Include command/script link and env notes.',
          },
        ],
        checklist: ['Report shared', 'Pass/fail vs SLO explicit'],
      }),

      ch({
        id: 'pf-soak',
        phase: 'C · Deeper',
        level: 'advanced',
        title: 'Soak & regression habits',
        minutes: 35,
        durationLabel: 'Week 3',
        overview:
          'Soak finds leaks and degradation. Baseline regularly. Gate CI with smoke thresholds, not full Black Friday sims.',
        learn: ['Soak design', 'Baseline', 'CI smoke perf'],
        steps: [
          {
            title: 'Design a soak',
            body: 'Modest load, long duration, watch memory and p95 drift.',
            doThis: 'Write a soak plan (even if you only run 20 min as practice).',
          },
          {
            title: 'CI smoke',
            body: 'Tiny VU count, strict fail on errors — catch obvious regressions.',
            doThis: 'Propose one CI performance smoke for a critical endpoint.',
          },
        ],
        checklist: ['Soak plan', 'CI smoke proposal'],
      }),

      ch({
        id: 'pf-cp2',
        kind: 'checkpoint',
        phase: 'C · Deeper',
        level: 'advanced',
        title: 'Checkpoint: perf starter kit',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Kit: SLIs/SLOs, script, one load report, soak plan, graph-reading notes.',
        learn: ['Team handoff'],
        steps: [
          {
            title: 'Publish kit',
            doThis: 'Put in repo README. Demo a run live or recorded.',
            items: [
              'SLI/SLO doc',
              'Runnable script',
              'Load report',
              'Soak plan',
              'Safety / approval notes',
            ],
          },
        ],
        checklist: ['Kit published', 'Demo done'],
        note: 'Pace: 3–5 weeks. Correct questions beat fancy tools.',
      }),
    ],
    resources: {
      docs: [
        { name: 'k6 documentation', url: 'https://grafana.com/docs/k6/latest/' },
        { name: 'JMeter user manual', url: 'https://jmeter.apache.org/usermanual/get-started.html' },
        { name: 'Google SRE — SLOs', url: 'https://sre.google/sre-book/service-level-objectives/' },
      ],
      tools: ['k6', 'Apache JMeter', 'Grafana / Cloud observability', 'Browser DevTools Performance'],
      books: ['Systems Performance (Gregg) — selective', 'Site Reliability Engineering (Google) — SLO chapters'],
      practice: ['Weekly smoke load on staging', 'Compare p95 week over week'],
      videos: [{ name: 'k6 YouTube intro', url: 'https://www.youtube.com/@k6io' }],
    },
  },
]
