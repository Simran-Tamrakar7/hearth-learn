import { ch, r } from '../helpers.js'

/** Delivery craft — agile, PM, product sense, work tracking. */
export const deliveryManuals = [
  {
    id: 'agile-scrum',
    title: 'Agile & Scrum',
    tagline: 'Run delivery that adapts — manifesto, Scrum events, Kanban, and ceremonies without cargo cult.',
    category: 'delivery',
    accent: '#0B3D2E',
    cover: 'covers/cicd-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA, engineers, and anyone joining a Scrum or Kanban team who wants the why, not just the calendar.',
    outcomes: [
      'Explain Agile values and when Scrum vs Kanban fits',
      'Participate in events with purpose — not theater',
      'Write user stories and a Definition of Done that actually gates quality',
    ],
    chapters: [
      ch({
        id: 'ag-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Agile is a mindset; Scrum and Kanban are tools. This path teaches you to spot cargo-cult ceremonies and replace them with feedback loops that ship value. Practice on a real team board if you have one — otherwise invent a small product and run the rituals yourself.',
        learn: ['Path rhythm', 'What “done” looks like here', 'Cargo cult vs craft'],
        steps: [
          {
            title: 'Set your practice field',
            body: 'Pick one: your current team, an open-source project, or a fictional product (e.g. “habit tracker for runners”). You will write stories and run a mock sprint against it.',
            doThis: 'Name the product and one user outcome you want to deliver in 2 weeks.',
            items: [
              'Recommended: 3–5 weeks at ~5 hrs/week',
              'Accelerated: 2 weeks if you already sit in standups daily',
              'Slow track: shadow one full sprint before leading anything',
            ],
          },
          {
            title: 'Rules of the road',
            body: 'Every ceremony must answer: what decision or feedback does this create? If none — cut or redesign it.',
            doThis: 'Write one sentence: “The worst Agile habit I’ve seen is ___.” Keep it for the final checkpoint.',
            tip: 'Velocity is a capacity signal, not a performance score. Never weaponize it.',
          },
        ],
        checklist: ['Practice field chosen', 'One outcome named', 'Cargo-cult pet peeve written'],
        practice: { title: 'Day zero', brief: 'Screenshot your current board (or sketch one). Label columns in plain language.' },
        resources: [
          r('doc', 'Agile Manifesto', 'https://agilemanifesto.org/', 'EN'),
          r('doc', 'Manifesto principles', 'https://agilemanifesto.org/principles.html', 'EN'),
        ],
      }),

      ch({
        id: 'ag-manifesto',
        phase: 'A · Mindset',
        level: 'beginner',
        title: 'Manifesto: values over theater',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Individuals and interactions, working software, customer collaboration, responding to change. The right side still matters — the left side matters more when they conflict.',
        learn: ['Four values', 'Twelve principles (skim)', 'Tradeoff language'],
        steps: [
          {
            title: 'Value conflicts in the wild',
            body: 'Map a recent team fight to a manifesto tension (e.g. comprehensive docs vs working software).',
            doThis: 'Write 4 bullets: one real example per Agile value — when you chose the left side and why.',
          },
          {
            title: 'Principle spot-check',
            body: '“Welcome changing requirements” is not “no plan.” It means short feedback loops so change is cheap.',
            doThis: 'Pick 3 principles. For each: one team habit that supports it, one that violates it.',
            tip: 'Sustainable pace is a principle. Heroics are a smell.',
          },
        ],
        checklist: ['Four value examples written', 'Three principles mapped to habits'],
        practice: { title: 'Team retro seed', brief: 'Bring one manifesto tension to your next retro as a discussion prompt.' },
        resources: [
          r('doc', 'Agile Alliance — What is Agile?', 'https://www.agilealliance.org/agile101/', 'EN'),
        ],
      }),

      ch({
        id: 'ag-scrum-flow',
        phase: 'A · Mindset',
        level: 'beginner',
        title: 'Scrum in one page',
        minutes: 35,
        overview:
          'Roles (PO, SM, Developers), artifacts (Product Backlog, Sprint Backlog, Increment), events (Sprint, Planning, Daily, Review, Retro). Learn the skeleton before debating flavors.',
        learn: ['Roles', 'Artifacts', 'Sprint as a container'],
        steps: [
          {
            title: 'Draw the loop',
            body: 'Sprint Planning → Daily Scrum → work → Sprint Review → Retrospective → next Planning. The Increment is the point.',
            doThis: 'Sketch the Scrum loop on one page. Annotate who owns each artifact.',
            items: [
              'Product Owner — value & backlog order',
              'Scrum Master — effectiveness of the process',
              'Developers — how to deliver the Increment',
            ],
          },
          {
            title: 'Increment ≠ “we coded stuff”',
            body: 'A Done Increment is usable and meets DoD. “Almost done” is not an Increment.',
            doThis: 'Define “usable” for your practice product in one sentence.',
          },
        ],
        checklist: ['One-page Scrum sketch', 'Usable Increment defined'],
        resources: [
          r('doc', 'Scrum Guide (2020)', 'https://scrumguides.org/scrum-guide.html', 'EN'),
        ],
      }),

      ch({
        id: 'ag-events',
        phase: 'B · Practice',
        level: 'intermediate',
        title: 'Events that earn their time',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Each event has a purpose and a timebox. Cargo cult is when you keep the calendar invite but lose the purpose.',
        learn: ['Planning outcomes', 'Daily as plan re-sync', 'Review vs status', 'Retro as experiment lab'],
        steps: [
          {
            title: 'Planning: forecast, not fantasy',
            body: 'Select Product Backlog items that can become a Done Increment. Negotiate scope with capacity and DoD in mind.',
            doThis: 'Draft a Sprint Goal for your practice product (one sentence). List 3–5 backlog items that serve it.',
            tip: 'If Planning runs over timebox, the backlog was not ready — fix refinement, not the clock.',
          },
          {
            title: 'Daily: inspect the plan',
            body: 'Not a status report to a manager. Developers sync on progress toward the Sprint Goal and unblock each other.',
            doThis: 'Rewrite a bad standup (“yesterday I coded”) into goal-oriented updates for three people.',
          },
          {
            title: 'Review & Retro',
            body: 'Review = stakeholders see the Increment and adapt the backlog. Retro = team improves how they work. Separate rooms in your head.',
            doThis: 'Write one Retro experiment with a measurable “we will try X for one sprint.”',
          },
        ],
        checklist: ['Sprint Goal drafted', 'Daily rewrite done', 'One Retro experiment named'],
        practice: { title: 'Event autopsy', brief: 'Sit in (or recall) one event. Note purpose achieved: yes / partial / no — and why.' },
        resources: [
          r('doc', 'Scrum Guide — Events', 'https://scrumguides.org/scrum-guide.html#events', 'EN'),
          r('article', 'Mountain Goat — Sprint Goals', 'https://www.mountaingoatsoftware.com/blog/the-sprint-goal-a-key-but-often-missed-scrum-component', 'EN'),
        ],
      }),

      ch({
        id: 'ag-kanban',
        phase: 'B · Practice',
        level: 'intermediate',
        title: 'Kanban: flow over sprints',
        minutes: 35,
        overview:
          'Visualize work, limit WIP, manage flow, make policies explicit. Use when interrupt-driven work or continuous delivery fits better than fixed sprints.',
        learn: ['WIP limits', 'Cycle time', 'Classes of service', 'Scrum + Kanban hybrids'],
        steps: [
          {
            title: 'Map the workflow',
            body: 'Columns should match reality (Ready → In progress → Review → Done), not aspirational theater.',
            doThis: 'Draw a board with WIP limits on In progress and Review. Justify each limit in one line.',
          },
          {
            title: 'Measure flow lightly',
            body: 'Cycle time (start → Done) beats story-point cosplay for interrupt-heavy teams.',
            doThis: 'Estimate cycle time for your last 5 finished tickets. Spot the outlier and name the cause.',
            tip: 'Start with sticky WIP limits before buying expensive flow tools.',
          },
        ],
        checklist: ['Board + WIP limits drawn', 'Five cycle times estimated'],
        resources: [
          r('doc', 'Kanban Guide', 'https://kanbanguides.org/', 'EN'),
          r('doc', 'Atlassian — Kanban', 'https://www.atlassian.com/agile/kanban', 'EN'),
        ],
      }),

      ch({
        id: 'ag-stories',
        phase: 'B · Practice',
        level: 'intermediate',
        title: 'User stories & acceptance',
        minutes: 40,
        overview:
          'Stories are promises of conversation, not mini-specs. “As a… I want… so that…” plus clear acceptance criteria beats a novel in the description.',
        learn: ['INVEST', 'Acceptance criteria', 'Splitting large work', 'Spikes'],
        steps: [
          {
            title: 'Write INVEST stories',
            body: 'Independent, Negotiable, Valuable, Estimable, Small, Testable. If it fails Small or Testable, split or spike.',
            doThis: 'Write 5 stories for your practice product. Mark each INVEST letter that fails.',
            code: `As a <user>
I want <capability>
So that <outcome>

Acceptance:
- Given … When … Then …
- Given … When … Then …`,
          },
          {
            title: 'Split vertically',
            body: 'Prefer end-to-end thin slices over “frontend this sprint, backend next.”',
            doThis: 'Take one epic-sized story and split it into 3 vertical slices.',
          },
        ],
        checklist: ['Five INVEST stories', 'One epic split vertically'],
        practice: { title: 'AC review', brief: 'Have a peer try to misinterpret your acceptance criteria. Tighten the loopholes.' },
        resources: [
          r('article', 'Mountain Goat — User Stories', 'https://www.mountaingoatsoftware.com/agile/user-stories', 'EN'),
          r('article', 'Splitting user stories', 'https://www.mountaingoatsoftware.com/blog/the-humanizing-work-guide-to-splitting-user-stories', 'EN'),
        ],
      }),

      ch({
        id: 'ag-dod',
        phase: 'C · Quality gates',
        level: 'intermediate',
        title: 'Definition of Done that bites',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'DoD is the quality contract for every Increment. If “tested” is vague, bugs escape. Make DoD checkable and shared.',
        learn: ['DoD vs acceptance criteria', 'Team vs org DoD', 'Undone work'],
        steps: [
          {
            title: 'Draft a real DoD',
            body: 'Include: code reviewed, tests at agreed level, a11y/security notes if relevant, docs/runbook updates, deployed to staging.',
            doThis: 'Write a 6–10 item DoD checklist your team could adopt next sprint.',
            items: [
              'Acceptance criteria met',
              'Unit/integration/E2E as agreed for the change',
              'No new Sev-1/2 known issues',
              'Feature flag / rollback path if needed',
              'Observability: log/metric/trace touch if user-facing',
            ],
          },
          {
            title: 'Name undone work',
            body: 'If you “finish” without meeting DoD, you created technical debt with a smile.',
            doThis: 'List undone work from your last release. Put it on the backlog explicitly.',
          },
        ],
        checklist: ['DoD checklist drafted', 'Undone work listed'],
        resources: [
          r('doc', 'Scrum Guide — Definition of Done', 'https://scrumguides.org/scrum-guide.html#definition-of-done', 'EN'),
        ],
      }),

      ch({
        id: 'ag-cp1',
        kind: 'checkpoint',
        phase: 'C · Quality gates',
        level: 'intermediate',
        title: 'Checkpoint: ceremony without cargo cult',
        minutes: 45,
        durationLabel: 'Gate',
        overview:
          'Prove you can diagnose empty ritual and redesign it. Deliver a short “Agile health” note for a real or fictional team.',
        learn: ['Diagnosis', 'Experiment design'],
        steps: [
          {
            title: 'Health note',
            body: '2 pages max. Cover: which events create feedback, which don’t, proposed DoD, one Retro experiment.',
            doThis: 'Publish the note. Get one peer +1 or written critique.',
            items: [
              'Sprint Goal quality: clear / mushy',
              'Daily: plan sync vs status theater',
              'Review: stakeholders present? Increment demoed?',
              'WIP / cycle time awareness',
            ],
          },
        ],
        checklist: ['Health note published', 'Peer feedback captured', 'One experiment scheduled'],
        practice: { title: 'Run one experiment', brief: 'Try the Retro change for a full sprint (or one week on Kanban). Log what changed.' },
      }),

      ch({
        id: 'ag-anti',
        phase: 'C · Quality gates',
        level: 'advanced',
        title: 'Anti-patterns & recovery',
        minutes: 35,
        overview:
          'Story-point theater, zombie Scrums, “ScrumBut,” and managers using Daily as interrogation. Spot them early; fix with experiments, not slogans.',
        learn: ['Common smells', 'Scaling caution', 'When to drop Scrum'],
        steps: [
          {
            title: 'Smell catalog',
            body: 'Carry-over forever, no Sprint Goal, QA as a column after “Dev Done,” retro actions that never happen.',
            doThis: 'Match 3 smells to a fix that costs less than one sprint of pain.',
          },
          {
            title: 'Choose the method',
            body: 'Interrupt-heavy support? Lean Kanban. Clear product increments? Scrum. Regulated big-bang? Hybrid with honesty.',
            doThis: 'Recommend Scrum, Kanban, or hybrid for your practice field — with 3 reasons.',
          },
        ],
        checklist: ['Three smells + fixes', 'Method recommendation written'],
        resources: [
          r('article', 'Zombie Scrum symptoms', 'https://www.Scrum.org/resources/blog/zombie-scrum-symptoms', 'EN'),
        ],
      }),

      ch({
        id: 'ag-cp2',
        kind: 'checkpoint',
        phase: 'C · Quality gates',
        level: 'advanced',
        title: 'Checkpoint: mini-sprint delivery',
        minutes: 60,
        durationLabel: 'Capstone',
        overview:
          'Run a 1-week mini-sprint (or Kanban week): goal, backlog, DoD, review demo notes, retro experiment result.',
        learn: ['End-to-end practice'],
        steps: [
          {
            title: 'Ship the package',
            doThis: 'Assemble the capstone folder.',
            items: [
              'Sprint/Kanban Goal',
              'Backlog with acceptance criteria',
              'DoD checklist used on each item',
              'Demo script or recording notes',
              'Retro: what we tried, what we’ll keep',
            ],
          },
        ],
        checklist: ['All five artifacts complete', 'At least one Done Increment (even tiny)'],
        practice: { title: 'Teach-back', brief: 'Explain Scrum vs Kanban to a junior in 10 minutes using your artifacts.' },
        note: 'Pace: 3–5 weeks. Prefer one real team improvement over perfect theory notes.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Agile Manifesto', url: 'https://agilemanifesto.org/' },
        { name: 'Scrum Guide', url: 'https://scrumguides.org/scrum-guide.html' },
        { name: 'Kanban Guide', url: 'https://kanbanguides.org/' },
      ],
      tools: ['Jira / Linear / GitHub Projects', 'Miro / FigJam', 'Physical sticky board'],
      books: [
        'Scrum: The Art of Doing Twice the Work in Half the Time (Sutherland) — skim critically',
        'Kanban (Anderson)',
        'User Stories Applied (Cohn)',
      ],
      practice: ['Run one mini-sprint with DoD', 'Shadow a Sprint Review and write a critique'],
      videos: [
        { name: 'Scrum.org learning path', url: 'https://www.scrum.org/resources' },
      ],
    },
  },

  {
    id: 'project-management',
    title: 'Project Management for Tech',
    tagline: 'Scope, risks, stakeholders, and status that keep delivery honest.',
    category: 'delivery',
    accent: '#145C4A',
    cover: 'covers/problem-solving-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Tech leads, QA leads, and ICs who suddenly own a timeline and need lightweight PM without PMP cosplay.',
    outcomes: [
      'Frame scope, milestones, and delivery plans people can follow',
      'Run a living RAID log and risk conversations',
      'Write status that surfaces truth early',
    ],
    chapters: [
      ch({
        id: 'pm-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'You are not becoming a full-time PM. You are learning enough structure to ship tech work without silent scope creep. Pick one real initiative (migration, release, tool rollout) as your case study.',
        learn: ['Case study setup', 'Artifacts you’ll produce', 'Lightweight > heavy process'],
        steps: [
          {
            title: 'Pick the initiative',
            body: 'Something with a date, more than one person, and ambiguity. Perfect.',
            doThis: 'Write: goal, success metric, hard deadline (or “none — flow”), constraints.',
          },
        ],
        checklist: ['Initiative one-pager started'],
        practice: { title: 'Stakeholder list', brief: 'List everyone who can say yes, no, or “surprise change.”' },
        resources: [
          r('doc', 'Atlassian — Project management', 'https://www.atlassian.com/work-management/project-management', 'EN'),
        ],
      }),

      ch({
        id: 'pm-scope',
        phase: 'A · Frame the work',
        level: 'beginner',
        title: 'Scope that can say no',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'Scope is a boundary. In-scope / out-of-scope / later. Ambiguous scope is how timelines die.',
        learn: ['In/out lists', 'Assumptions', 'Change control lite'],
        steps: [
          {
            title: 'Three boxes',
            body: 'Must ship / nice / explicitly out. Out-of-scope is a gift to future-you.',
            doThis: 'Fill three lists for your initiative. Get a stakeholder to initial the “out” list.',
            tip: 'If everything is Must, you don’t have priorities — you have a wish.',
          },
          {
            title: 'Assumptions log',
            body: '“API will be ready,” “legal will approve copy,” “staging mirrors prod.” Write them; invalidate early.',
            doThis: 'List 5 assumptions. Mark owner + date to validate each.',
          },
        ],
        checklist: ['In/out/later lists', 'Five assumptions with owners'],
        resources: [
          r('article', 'NN/g — Scope creep', 'https://www.nngroup.com/articles/scope-creep/', 'EN'),
        ],
      }),

      ch({
        id: 'pm-plan',
        phase: 'A · Frame the work',
        level: 'beginner',
        title: 'Delivery plans & milestones',
        minutes: 40,
        overview:
          'A plan is a bet with checkpoints. Prefer milestones tied to demos or decisions over Gantt vanity.',
        learn: ['Milestones', 'Dependencies', 'Buffers', 'Critical path intuition'],
        steps: [
          {
            title: 'Milestone map',
            body: 'Each milestone = something visible (demo, migration complete, flag on). Dates are hypotheses.',
            doThis: 'Create 4–6 milestones with exit criteria for each.',
            items: [
              'Kickoff / aligned scope',
              'Thin vertical slice working',
              'Hardening / test gate',
              'Launch / handoff',
            ],
          },
          {
            title: 'Dependency sketch',
            body: 'Who blocks whom? External teams are the usual silent killers.',
            doThis: 'Draw arrows between workstreams. Highlight one external dependency and a mitigation.',
          },
        ],
        checklist: ['Milestone map with exit criteria', 'Dependency sketch'],
        practice: { title: 'Buffer honesty', brief: 'Add explicit buffer where uncertainty is high. Tell stakeholders why.' },
      }),

      ch({
        id: 'pm-stakeholders',
        phase: 'B · People & risk',
        level: 'intermediate',
        title: 'Stakeholders & communication',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Map power × interest. Communicate differently to sponsors, users, and doers. Silence is not alignment.',
        learn: ['Power/interest grid', 'RACI lite', 'Cadence'],
        steps: [
          {
            title: 'Map the humans',
            body: 'Sponsor, users, builders, blockers, informed-only.',
            doThis: 'Place 6–10 people on a power/interest grid. Note preferred channel for each.',
          },
          {
            title: 'Lightweight RACI',
            body: 'Responsible / Accountable / Consulted / Informed — only for decisions that hurt when unclear.',
            doThis: 'RACI three decisions: scope change, go-live, deferring a risk.',
          },
        ],
        checklist: ['Stakeholder grid', 'RACI for three decisions'],
        resources: [
          r('article', 'Atlassian — RACI', 'https://www.atlassian.com/team-playbook/plays/raci', 'EN'),
        ],
      }),

      ch({
        id: 'pm-raid',
        phase: 'B · People & risk',
        level: 'intermediate',
        title: 'RAID: risks, assumptions, issues, decisions',
        minutes: 40,
        overview:
          'A living RAID log beats a risk slide that died in week one. Risks have owners, triggers, and mitigations.',
        learn: ['Risk vs issue', 'Probability × impact', 'Decision log'],
        steps: [
          {
            title: 'Start the RAID',
            body: 'Risks = maybe. Issues = now. Assumptions = believed true. Decisions = locked choices with date/owner.',
            doThis: 'Create a RAID table with at least 3 risks, 2 assumptions, 1 open issue, 2 decisions.',
            code: `Risk | Prob | Impact | Owner | Trigger | Mitigation | Status
Issue | Owner | Impact | Next action | Due
Assumption | Owner | Validate by | Status
Decision | Date | Decider | Alternatives considered`,
          },
          {
            title: 'Pre-mortem',
            body: 'Imagine the project failed. List why. Convert top reasons into risks with mitigations.',
            doThis: '10-minute pre-mortem. Promote top 3 failure modes into the RAID.',
            tip: 'Watch “unknown unknowns” — schedule discovery spikes before baking dates.',
          },
        ],
        checklist: ['RAID started', 'Pre-mortem done'],
        practice: { title: 'Weekly RAID hygiene', brief: 'Update RAID once this week in a real standup or async note.' },
        resources: [
          r('article', 'Atlassian — Risk management', 'https://www.atlassian.com/work-management/project-management/risk-management', 'EN'),
        ],
      }),

      ch({
        id: 'pm-status',
        phase: 'B · People & risk',
        level: 'intermediate',
        title: 'Status that tells the truth',
        minutes: 30,
        overview:
          'Good status: goal, progress, risks, asks. Bad status: activity diary and green slides for red work.',
        learn: ['RAG honesty', 'Ask clearly', 'Async-first'],
        steps: [
          {
            title: 'Status template',
            body: 'Lead with outcome. Then variance. Then risks. End with explicit asks and owners.',
            doThis: 'Write this week’s status for your initiative using the template.',
            code: `## Status — <initiative> — <date>
Goal: …
Progress: … (vs plan)
RAG: Green / Amber / Red — because …
Risks / issues needing eyes: …
Decisions needed by <date>: …
Asks: @person — …`,
          },
          {
            title: 'No surprise Reds',
            body: 'Amber early is kindness. Red on launch week is malpractice.',
            doThis: 'Rewrite a fake “all green” status into an honest Amber with one ask.',
          },
        ],
        checklist: ['One real status shipped', 'Honest Amber practice done'],
      }),

      ch({
        id: 'pm-cp1',
        kind: 'checkpoint',
        phase: 'C · Integrate',
        level: 'intermediate',
        title: 'Checkpoint: delivery pack',
        minutes: 45,
        durationLabel: 'Gate',
        overview: 'Package scope, milestones, stakeholder map, and RAID into one shareable brief.',
        learn: ['Packaging for alignment'],
        steps: [
          {
            title: 'Ship the brief',
            body: '5 pages max or a tight Notion/Confluence page.',
            doThis: 'Get a sponsor or peer to mark: clear / confusing on each section.',
          },
        ],
        checklist: ['Brief shared', 'Feedback captured'],
        practice: { title: 'Fix the top confusion', brief: 'Revise the murkiest section within 48 hours.' },
      }),

      ch({
        id: 'pm-change',
        phase: 'C · Integrate',
        level: 'advanced',
        title: 'Change, cut, and recover',
        minutes: 35,
        durationLabel: 'Week 3',
        overview:
          'When reality hits, renegotiate scope/date/quality explicitly. Hope is not a plan.',
        learn: ['Triple constraint', 'Cut lists', 'Incident-style recovery'],
        steps: [
          {
            title: 'Tradeoff conversation',
            body: 'Show options: cut scope, move date, add people (rarely helps short-term), accept risk.',
            doThis: 'Write a 3-option decision memo for a slipped milestone.',
          },
          {
            title: 'Cut list ready',
            body: 'Pre-agree what drops first when time compresses.',
            doThis: 'Rank your nice-to-haves as cut order 1…n with stakeholder awareness.',
          },
        ],
        checklist: ['Decision memo drafted', 'Cut list ranked'],
      }),

      ch({
        id: 'pm-cp2',
        kind: 'checkpoint',
        phase: 'C · Integrate',
        level: 'advanced',
        title: 'Checkpoint: run a week of PM',
        minutes: 60,
        durationLabel: 'Capstone',
        overview: 'For one week, you own status, RAID updates, and one decision log entry — on a real or practice initiative.',
        learn: ['Operating rhythm'],
        steps: [
          {
            title: 'Ops week evidence',
            doThis: 'Collect artifacts.',
            items: [
              '3 status updates (daily or 3× week)',
              'RAID updated at least twice',
              'One decision recorded with alternatives',
              'One risk mitigation executed or scheduled',
            ],
          },
        ],
        checklist: ['All four evidence items', 'Retrospective note: what you’d automate next'],
        note: 'Pace: 3–5 weeks. Lightweight artifacts that people read beat perfect templates nobody opens.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Atlassian Project Management Guide', url: 'https://www.atlassian.com/work-management/project-management' },
        { name: 'Team Playbook', url: 'https://www.atlassian.com/team-playbook' },
      ],
      tools: ['Notion / Confluence', 'Jira / Linear', 'Spreadsheet RAID', 'FigJam'],
      books: [
        'The Deadline (DeMarco) — narrative lessons',
        'Making Things Happen (Berkun)',
        'Shape Up (Basecamp) — for alternative planning',
      ],
      practice: ['Own status for one initiative for 2 weeks', 'Facilitate one risk review'],
      videos: [{ name: 'Google Project Management (Coursera overview)', url: 'https://www.coursera.org/professional-certificates/google-project-management' }],
    },
  },

  {
    id: 'product-sense',
    title: 'Product Thinking',
    tagline: 'Outcomes over output — JTBD, prioritization, and discovery lite for builders.',
    category: 'delivery',
    accent: '#1A4A3A',
    cover: 'covers/uiux-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'QA, engineers, and designers who want to influence what gets built — not only how.',
    outcomes: [
      'Separate outcomes from feature output',
      'Prioritize with RICE and MoSCoW without false precision',
      'Run lightweight discovery before big bets',
    ],
    chapters: [
      ch({
        id: 'ps-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Product sense is pattern recognition about users and value. You will practice on one product you use weekly (or your team’s). No MBA required.',
        learn: ['Case product', 'Outcome vocabulary'],
        steps: [
          {
            title: 'Pick a product lens',
            body: 'App, internal tool, or your team’s feature area.',
            doThis: 'Write the primary user and the job they hire the product for — in one sentence.',
          },
        ],
        checklist: ['Case product + job sentence'],
        resources: [
          r('doc', 'SVPG — Product', 'https://www.svpg.com/articles/', 'EN'),
        ],
      }),

      ch({
        id: 'ps-outcomes',
        phase: 'A · Value',
        level: 'beginner',
        title: 'Outcomes vs output',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Output = shipped features. Outcome = changed user/business behavior. Teams drown in output metrics.',
        learn: ['Outcome examples', 'Proxy metrics', 'Feature factory smell'],
        steps: [
          {
            title: 'Rewrite the roadmap line',
            body: '“Ship dark mode” → “Reduce night-session bounce by making reading comfortable.”',
            doThis: 'Convert 5 feature requests into outcome hypotheses.',
          },
          {
            title: 'Success metric',
            body: 'Leading vs lagging. Pick one metric you’d watch for 30 days after ship.',
            doThis: 'For one outcome, name metric, baseline guess, and target direction.',
            tip: 'If you can’t measure, define a qualitative signal and a review date.',
          },
        ],
        checklist: ['Five outcome rewrites', 'One metric hypothesis'],
        resources: [
          r('article', 'Outcome-based roadmaps', 'https://www.producttalk.org/outcome-based-roadmaps/', 'EN'),
        ],
      }),

      ch({
        id: 'ps-jtbd',
        phase: 'A · Value',
        level: 'intermediate',
        title: 'Jobs To Be Done lite',
        minutes: 35,
        overview:
          'Users hire products to make progress in a circumstance. Focus on the job, not the persona costume.',
        learn: ['Job stories', 'Push/pull forces', 'Competition for the job'],
        steps: [
          {
            title: 'Job story format',
            body: 'When <situation>, I want to <motivation>, so I can <outcome>.',
            doThis: 'Write 3 job stories for your case product. Identify what they use today instead.',
            code: `When I’m onboarding a new teammate,
I want a single checklist of access + tools,
so I can get them productive without Slack archaeology.`,
          },
          {
            title: 'Switch interview (lite)',
            body: 'Ask someone when they last switched tools. What pushed them away? What pulled them in?',
            doThis: 'Do one 15-minute conversation. Capture push/pull notes.',
          },
        ],
        checklist: ['Three job stories', 'One switch interview'],
        resources: [
          r('article', 'JTBD canon (Christensen overview)', 'https://hbr.org/2016/09/know-your-customers-jobs-to-be-done', 'EN'),
          r('article', 'Job stories', 'https://www.thenextweb.com/news/intercom-job-stories', 'EN'),
        ],
      }),

      ch({
        id: 'ps-discovery',
        phase: 'B · Learning',
        level: 'intermediate',
        title: 'Discovery lite',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Before building big, reduce risk: value, usability, feasibility, viability. Small tests beat big debates.',
        learn: ['Risk types', 'Assumption mapping', 'Cheap experiments'],
        steps: [
          {
            title: 'Assumption map',
            body: 'List what must be true. Rank by risk × ignorance.',
            doThis: 'Map 8 assumptions. Circle the top 2 to test this week.',
          },
          {
            title: 'Pick an experiment',
            body: 'Interview, prototype test, concierge MVP, analytics check, technical spike.',
            doThis: 'Design one experiment: method, sample, success/fail signal, timebox.',
            tip: 'Discovery is not endless research. Timebox learning.',
          },
        ],
        checklist: ['Assumption map', 'One experiment designed'],
        practice: { title: 'Run it', brief: 'Execute the experiment. Write what you learned in half a page.' },
        resources: [
          r('article', 'SVPG — Discovery', 'https://www.svpg.com/product-discovery-basics/', 'EN'),
          r('doc', 'IDEO — Design Kit methods', 'https://www.designkit.org/methods', 'EN'),
        ],
      }),

      ch({
        id: 'ps-rice',
        phase: 'B · Learning',
        level: 'intermediate',
        title: 'Prioritization: RICE',
        minutes: 35,
        overview:
          'Reach × Impact × Confidence / Effort. Useful for relative ranking — dangerous if you pretend the numbers are science.',
        learn: ['RICE factors', 'Confidence as honesty', 'Scoring hygiene'],
        steps: [
          {
            title: 'Score a backlog',
            body: 'Same scale for everyone. Debate Impact and Confidence more than Reach.',
            doThis: 'Score 6 items with RICE. Note where Confidence is low — those need discovery.',
            code: `RICE = (Reach * Impact * Confidence) / Effort
Reach: users/quarter
Impact: 0.25–3 scale
Confidence: %
Effort: person-months`,
          },
        ],
        checklist: ['Six items scored', 'Low-confidence items flagged'],
        resources: [
          r('article', 'Intercom — RICE', 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/', 'EN'),
        ],
      }),

      ch({
        id: 'ps-moscow',
        phase: 'B · Learning',
        level: 'beginner',
        title: 'Prioritization: MoSCoW',
        minutes: 25,
        overview:
          'Must / Should / Could / Won’t (this time). Excellent for release scoping and stakeholder alignment.',
        learn: ['MoSCoW categories', 'Won’t as a feature', 'Must inflation'],
        steps: [
          {
            title: 'Force the Won’t',
            body: 'If there is no Won’t, Must will eat the release.',
            doThis: 'Classify 10 backlog items. Cap Must at 40% of the list.',
            tip: 'Must = release fails without it. Be ruthless.',
          },
        ],
        checklist: ['Ten items classified', 'Must capped'],
        resources: [
          r('doc', 'Agile Business Consortium — MoSCoW', 'https://www.agilebusiness.org/dsdm-project-framework/moscow-prioritisation.html', 'EN'),
        ],
      }),

      ch({
        id: 'ps-cp1',
        kind: 'checkpoint',
        phase: 'C · Influence',
        level: 'intermediate',
        title: 'Checkpoint: opportunity brief',
        minutes: 45,
        durationLabel: 'Gate',
        overview: 'Write a one-page opportunity brief: job, outcome, risks, proposed bet, how we’ll know.',
        learn: ['Briefing PMs/leads'],
        steps: [
          {
            title: 'Ship the brief',
            doThis: 'Share with a PM, designer, or tech lead. Ask: would you fund a spike?',
          },
        ],
        checklist: ['Brief shared', 'Feedback noted'],
      }),

      ch({
        id: 'ps-influence',
        phase: 'C · Influence',
        level: 'advanced',
        title: 'Influence without authority',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Bring evidence, options, and user pain — not “I think.” QA and ICs can shape product by framing risk and opportunity clearly.',
        learn: ['Evidence packs', 'Option framing', 'Saying no constructively'],
        steps: [
          {
            title: 'Options, not blockers',
            body: '“We can’t” loses. “Here are three paths with risk” wins.',
            doThis: 'Turn one complaint into a 3-option memo with recommendation.',
          },
        ],
        checklist: ['Options memo written'],
      }),

      ch({
        id: 'ps-cp2',
        kind: 'checkpoint',
        phase: 'C · Influence',
        level: 'advanced',
        title: 'Checkpoint: prioritized bet',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Deliver a ranked list (RICE or MoSCoW), one discovery experiment result, and a recommended next bet.',
        learn: ['Closing the loop'],
        steps: [
          {
            title: 'Capstone pack',
            doThis: 'Assemble and present in 10 minutes.',
            items: [
              'Job stories (3)',
              'Prioritized list with method noted',
              'Experiment result',
              'Recommended bet + success metric',
            ],
          },
        ],
        checklist: ['Pack complete', '10-minute teach-back done'],
        note: 'Pace: 3–4 weeks. Bias to small evidence over perfect strategy decks.',
      }),
    ],
    resources: {
      docs: [
        { name: 'SVPG articles', url: 'https://www.svpg.com/articles/' },
        { name: 'Intercom RICE', url: 'https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/' },
        { name: 'Product Talk — outcomes', url: 'https://www.producttalk.org/' },
      ],
      tools: ['FigJam / Miro', 'Dovetail / notes doc', 'Spreadsheet for RICE', 'Prototype tool (Figma)'],
      books: [
        'Inspired (Cagan)',
        'The Mom Test (Fitzpatrick)',
        'Continuous Discovery Habits (Torres)',
      ],
      practice: ['One user conversation per week', 'Rewrite your team’s next feature as an outcome'],
      videos: [{ name: 'Reforge product sense (concepts overview)', url: 'https://www.reforge.com/' }],
    },
  },

  {
    id: 'jira-work',
    title: 'Work Tracking',
    tagline: 'Tickets that don’t suck — Jira, Linear, GitHub Issues, boards, and bugs vs stories.',
    category: 'delivery',
    accent: '#0F5C4C',
    cover: 'covers/git-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Anyone drowning in vague tickets, drive-by bugs, or boards that lie about progress.',
    outcomes: [
      'Write tickets with context, AC, and test notes others can pick up',
      'Design boards that match real workflow',
      'Separate bugs, stories, and chores without taxonomy religion',
    ],
    chapters: [
      ch({
        id: 'jw-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'Tools differ; hygiene rhymes. Practice in whatever tracker your team uses — Jira, Linear, GitHub Issues, or Azure Boards.',
        learn: ['Pick your tool', 'Hygiene over fields'],
        steps: [
          {
            title: 'Audit one ticket',
            body: 'Find the worst recent ticket. Keep it as your before/after specimen.',
            doThis: 'Save a link to a bad ticket. You’ll rewrite it by chapter 3.',
          },
        ],
        checklist: ['Bad ticket specimen saved'],
        resources: [
          r('doc', 'GitHub Issues', 'https://docs.github.com/en/issues', 'EN'),
          r('doc', 'Linear method', 'https://linear.app/method', 'EN'),
          r('doc', 'Jira Software guide', 'https://www.atlassian.com/software/jira/guides', 'EN'),
        ],
      }),

      ch({
        id: 'jw-anatomy',
        phase: 'A · Tickets',
        level: 'beginner',
        title: 'Anatomy of a useful ticket',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'Title that searches well, context, acceptance/repro, attachments, and owner. Empty description is how work stalls.',
        learn: ['Title craft', 'Context links', 'AC / repro', 'Labels without chaos'],
        steps: [
          {
            title: 'Story template',
            body: 'Problem, why now, acceptance, test notes, links to design/spec.',
            doThis: 'Fill the template for one upcoming story.',
            code: `Title: <verb> <object> — <context>
Why: …
Scope / AC:
- …
Out of scope: …
Design / spec: <link>
Test notes: …
Deps: …`,
          },
          {
            title: 'Bug template',
            body: 'Environment, steps, expected vs actual, evidence, severity guess, regressions.',
            doThis: 'File or rewrite one bug with evidence attached.',
            tip: 'One bug per ticket. Split hydras.',
          },
        ],
        checklist: ['Story template used', 'Bug with evidence'],
        resources: [
          r('article', 'Linear — Issue writing', 'https://linear.app/method/write-useful-issues', 'EN'),
        ],
      }),

      ch({
        id: 'jw-rewrite',
        phase: 'A · Tickets',
        level: 'beginner',
        title: 'Rewrite tickets that don’t suck',
        minutes: 30,
        overview: 'Take your specimen. Make it pick-up-able by a teammate on Monday morning.',
        learn: ['Clarity edits', 'Splitting', 'Removing noise'],
        steps: [
          {
            title: 'Before → after',
            body: 'Cut novel-length pastes; link instead. Add the missing AC.',
            doThis: 'Publish the rewrite. Ask: “Could you start this with zero Slack?”',
          },
        ],
        checklist: ['Specimen rewritten', 'Peer yes/no captured'],
      }),

      ch({
        id: 'jw-types',
        phase: 'A · Tickets',
        level: 'intermediate',
        title: 'Bugs vs stories vs chores',
        minutes: 30,
        overview:
          'Story = user value. Bug = broken expectation. Chore/task = maintenance. Mislabeling warps metrics and priority.',
        learn: ['Type heuristics', 'When a bug is a story', 'Tech debt tickets'],
        steps: [
          {
            title: 'Sorting hat',
            body: '“Never built” usually isn’t a bug. “Used to work” usually is.',
            doThis: 'Sort 10 recent tickets into bug/story/chore. Fix 2 mislabels.',
            items: [
              'Bug — unintended behavior vs documented/prior behavior',
              'Story — new or changed user-facing value',
              'Chore — refactor, dependency bump, CI flake fix',
            ],
          },
        ],
        checklist: ['Ten tickets sorted', 'Two mislabels fixed'],
      }),

      ch({
        id: 'jw-boards',
        phase: 'B · Flow',
        level: 'intermediate',
        title: 'Boards that match reality',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Columns are states of work, not org chart. Too many columns = fog. WIP limits beat infinite “In Progress.”',
        learn: ['Column design', 'WIP', 'Swimlanes', 'Done means Done'],
        steps: [
          {
            title: 'Simplify columns',
            body: 'Typical: Backlog → Ready → In progress → In review → Done. Add only if a handoff is real.',
            doThis: 'Propose a column set for your team. Note what you’d delete.',
          },
          {
            title: 'Policies on the wall',
            body: 'What does “Ready” require? What does “In review” mean?',
            doThis: 'Write entry criteria for Ready and Done in 5 bullets total.',
          },
        ],
        checklist: ['Column proposal', 'Ready/Done policies'],
        resources: [
          r('doc', 'GitHub Projects', 'https://docs.github.com/en/issues/planning-and-tracking-with-projects', 'EN'),
          r('doc', 'Jira boards', 'https://support.atlassian.com/jira-software-cloud/docs/configure-boards/', 'EN'),
        ],
      }),

      ch({
        id: 'jw-priority',
        phase: 'B · Flow',
        level: 'intermediate',
        title: 'Priority, severity, and SLAs',
        minutes: 30,
        overview:
          'Severity = user impact. Priority = what we do next. Don’t conflate them. P0 everything is noise.',
        learn: ['Sev vs pri', 'Escalation', 'Quiet backlog hygiene'],
        steps: [
          {
            title: 'Define scales',
            body: 'Sev-1 through Sev-4 with examples from your product.',
            doThis: 'Write the scale on a wiki page. Re-triage 5 open bugs against it.',
          },
        ],
        checklist: ['Severity scale published', 'Five bugs re-triaged'],
      }),

      ch({
        id: 'jw-cp1',
        kind: 'checkpoint',
        phase: 'B · Flow',
        level: 'intermediate',
        title: 'Checkpoint: tracker makeover',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Deliver rewritten tickets + board/policy proposal + severity scale.',
        learn: ['Team adoption'],
        steps: [
          {
            title: 'Share the pack',
            doThis: 'Get one engineer and one QA/PM to comment. Capture objections.',
          },
        ],
        checklist: ['Pack shared', 'Objections listed'],
      }),

      ch({
        id: 'jw-automation',
        phase: 'C · Scale',
        level: 'advanced',
        title: 'Automation & etiquette',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Auto-close stale, templates on create, PR ↔ issue links. Automation should reduce chores, not create notification hell.',
        learn: ['Templates', 'Issue–PR links', 'Stale bots carefully'],
        steps: [
          {
            title: 'Add one template',
            body: 'Bug and story templates in GitHub/Jira/Linear.',
            doThis: 'Ship one template your team will actually use. Delete an unused field.',
            tip: 'Every required field has a cost. Justify it.',
          },
          {
            title: 'Link work to code',
            body: 'Commits/PRs reference tickets. Closing keywords where appropriate.',
            doThis: 'Demonstrate one PR that auto-links or closes an issue.',
          },
        ],
        checklist: ['Template live', 'PR–issue link demo'],
        resources: [
          r('doc', 'GitHub issue templates', 'https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests', 'EN'),
          r('doc', 'Linking PRs to issues', 'https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue', 'EN'),
        ],
      }),

      ch({
        id: 'jw-cp2',
        kind: 'checkpoint',
        phase: 'C · Scale',
        level: 'advanced',
        title: 'Checkpoint: week of clean tickets',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'For one week, every ticket you touch meets the template bar. Log exceptions.',
        learn: ['Habit formation'],
        steps: [
          {
            title: 'Hygiene week',
            doThis: 'End with a short retro: what slowed you down, what to automate next.',
            items: [
              'All created tickets use template',
              'No ticket without owner > 48h',
              'Board columns match agreed policy',
              'At least 3 old tickets cleaned or closed',
            ],
          },
        ],
        checklist: ['Hygiene week complete', 'Retro note written'],
        note: 'Pace: 2–4 weeks. Clarity in tickets compounds into fewer meetings.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Linear Method', url: 'https://linear.app/method' },
        { name: 'GitHub Issues docs', url: 'https://docs.github.com/en/issues' },
        { name: 'Jira guides', url: 'https://www.atlassian.com/software/jira/guides' },
      ],
      tools: ['Jira', 'Linear', 'GitHub Issues + Projects', 'Azure Boards'],
      books: ['Managing the Unmanageable (for people chaos context) — selective'],
      practice: ['Rewrite 10 tickets', 'Facilitate one triage session'],
      videos: [{ name: 'Atlassian Jira tutorials', url: 'https://www.atlassian.com/software/jira/guides/getting-started/introduction' }],
    },
  },
]
