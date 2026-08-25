import { ch, r } from '../helpers.js'

/** Extra soft skills — EQ, conflict, stakeholders, writing, speaking, networking. */
export const softExtraManuals = [
  {
    id: 'emotional-intelligence',
    title: 'Emotional Intelligence',
    tagline: 'Notice feelings — yours and others’ — and choose responses that keep work sane.',
    category: 'soft-skills',
    accent: '#166534',
    cover: 'covers/focus-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Anyone who wants fewer regret-emails and better read on room dynamics.',
    outcomes: [
      'Name emotions with precision under pressure',
      'Regulate before responding in Slack/meetings',
      'Read social cues and adapt without people-pleasing',
    ],
    chapters: [
      ch({
        id: 'eq-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'EQ is a practice, not a personality tattoo. You’ll keep a short daily log and run experiments in real conversations. No forced vulnerability theater.',
        learn: ['Four domains', 'Log habit', 'Privacy'],
        steps: [
          {
            title: 'Four domains snapshot',
            body: 'Self-awareness, self-management, social awareness, relationship management.',
            doThis: 'Rate yourself 1–5 in each. Pick the lowest as your focus for 3 weeks.',
            tip: 'Private notes only. Don’t turn teammates into projects without consent.',
          },
        ],
        checklist: ['Self-rating done', 'Focus domain chosen'],
        resources: [
          r('article', 'Harvard Business Review — EQ', 'https://hbr.org/2004/01/what-makes-a-leader', 'EN'),
        ],
      }),

      ch({
        id: 'eq-aware',
        phase: 'A · Self',
        level: 'beginner',
        title: 'Self-awareness under load',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Body cues first: jaw, chest, temperature, urge to type fast. Name the feeling more precisely than “fine” or “stressed.”',
        learn: ['Body cues', 'Emotion vocabulary', 'Triggers'],
        steps: [
          {
            title: 'Precision naming',
            body: 'Annoyed ≠ betrayed. Tired ≠ disrespected.',
            doThis: 'For 5 work moments, write: cue → label → story you told yourself.',
            items: ['Use a feelings wheel if stuck', 'Separate fact from interpretation'],
          },
        ],
        checklist: ['Five cue→label entries'],
        resources: [
          r('tool', 'Feelings wheel (reference)', 'https://feelingswheel.com/', 'EN'),
        ],
      }),

      ch({
        id: 'eq-regulate',
        phase: 'A · Self',
        level: 'beginner',
        title: 'Self-management: pause tools',
        minutes: 30,
        overview:
          'Create space between stimulus and response. Breath, walk, draft-then-wait, ask for time.',
        learn: ['Pause rituals', 'Draft delay', 'Repair'],
        steps: [
          {
            title: 'Install a pause',
            body: 'Example: no reply to heated Slack for 10 minutes; write offline first.',
            doThis: 'Choose one pause rule. Use it 3 times this week. Log outcomes.',
            tip: '“Let me think and get back at 3pm” is professional, not weak.',
          },
        ],
        checklist: ['Pause rule chosen', 'Three uses logged'],
      }),

      ch({
        id: 'eq-social',
        phase: 'B · Others',
        level: 'intermediate',
        title: 'Social awareness',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Read energy, who’s silent, what’s unsaid. Curiosity over mind-reading. Check assumptions.',
        learn: ['Room reading', 'Hypothesis checks', 'Inclusion signals'],
        steps: [
          {
            title: 'Meeting scan',
            body: 'Who spoke? Who deferred? What topic got rushed?',
            doThis: 'After one meeting, write 5 observations (behaviors, not diagnoses).',
          },
          {
            title: 'Check a hypothesis',
            body: '“I might be wrong, but it seemed like X — how was that for you?”',
            doThis: 'Run one gentle check-in. Note what you learn.',
          },
        ],
        checklist: ['Meeting scan', 'One check-in'],
      }),

      ch({
        id: 'eq-relate',
        phase: 'B · Others',
        level: 'intermediate',
        title: 'Relationship management',
        minutes: 35,
        overview:
          'Feedback, appreciation, boundaries. Influence with clarity and respect — not manipulation.',
        learn: ['Appreciation specificity', 'Boundary scripts', 'Repair after rupture'],
        steps: [
          {
            title: 'Specific appreciation',
            body: 'Name the behavior and impact.',
            doThis: 'Send one specific thank-you this week.',
          },
          {
            title: 'Boundary script',
            body: '“I can do X by Thursday; Y needs to move or we cut scope.”',
            doThis: 'Write and use one boundary script in a real thread.',
          },
        ],
        checklist: ['Appreciation sent', 'Boundary used'],
      }),

      ch({
        id: 'eq-cp1',
        kind: 'checkpoint',
        phase: 'B · Others',
        level: 'intermediate',
        title: 'Checkpoint: two-week log review',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Review your log. Patterns in triggers? Which pause worked?',
        learn: ['Pattern spotting'],
        steps: [
          {
            title: 'Review',
            doThis: 'One-page summary: top trigger, best tool, next experiment.',
          },
        ],
        checklist: ['Summary written'],
      }),

      ch({
        id: 'eq-pressure',
        phase: 'C · Pressure',
        level: 'advanced',
        title: 'EQ in incidents & conflict',
        minutes: 35,
        durationLabel: 'Week 3',
        overview:
          'Incidents amplify emotion. Roles, facts, next actions beat blame. Park interpersonal repair until the fire is contained — then repair.',
        learn: ['Incident tone', 'Blame vs systems', 'After-action repair'],
        steps: [
          {
            title: 'Incident language',
            body: 'Replace “who broke it” with “what do we know / what next.”',
            doThis: 'Rewrite 3 blamey lines into useful incident updates.',
          },
        ],
        checklist: ['Three rewrites'],
        resources: [
          r('article', 'Google SRE — blameless', 'https://sre.google/sre-book/postmortem-culture/', 'EN'),
        ],
      }),

      ch({
        id: 'eq-cp2',
        kind: 'checkpoint',
        phase: 'C · Pressure',
        level: 'advanced',
        title: 'Checkpoint: personal EQ playbook',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'One-page playbook: cues, pause rules, check-in phrases, repair steps.',
        learn: ['Externalizing practice'],
        steps: [
          {
            title: 'Playbook',
            doThis: 'Keep it private or share with a mentor. Use for 1 more week.',
            items: ['Cue list', 'Pause rules', 'Check-in phrases', 'Repair script'],
          },
        ],
        checklist: ['Playbook complete'],
        note: 'Pace: 3–4 weeks. Consistency beats intensity.',
      }),
    ],
    resources: {
      docs: [
        { name: 'HBR — What Makes a Leader', url: 'https://hbr.org/2004/01/what-makes-a-leader' },
        { name: 'Blameless postmortems', url: 'https://sre.google/sre-book/postmortem-culture/' },
      ],
      tools: ['Private journal', 'Feelings wheel', 'Calendar pause reminders'],
      books: ['Emotional Intelligence (Goleman) — skim', 'Crucial Conversations — for conflict overlap'],
      practice: ['Daily 3-line EQ log', 'One boundary per week'],
      videos: [],
    },
  },

  {
    id: 'conflict-collaboration',
    title: 'Conflict & Collaboration',
    tagline: 'Disagree productively — surface tension early and leave with owners.',
    category: 'soft-skills',
    accent: '#15803D',
    cover: 'covers/communication-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'ICs and leads who avoid conflict until it explodes — or who win arguments and lose teammates.',
    outcomes: [
      'Diagnose conflict types (task vs relationship)',
      'Run disagreement conversations with structure',
      'Collaborate across functions without fake harmony',
    ],
    chapters: [
      ch({
        id: 'cc-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'Healthy conflict is about ideas and tradeoffs. Personal attacks are out. Pick one live tension at work as your practice case (keep names careful in notes).',
        learn: ['Case tension', 'Safety'],
        steps: [
          {
            title: 'Name the tension',
            body: 'What decision is stuck? Who are the parties? What’s at stake?',
            doThis: 'Write a neutral paragraph describing the conflict.',
          },
        ],
        checklist: ['Case paragraph'],
        resources: [
          r('article', 'HBR — How to handle conflict', 'https://hbr.org/2014/06/how-to-handle-conflict-in-the-workplace', 'EN'),
        ],
      }),

      ch({
        id: 'cc-types',
        phase: 'A · See it',
        level: 'beginner',
        title: 'Task vs relationship conflict',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Task conflict can improve decisions. Relationship conflict taxes trust. Don’t treat them the same.',
        learn: ['Conflict types', 'When to pause'],
        steps: [
          {
            title: 'Classify',
            body: 'Is this about the work product, the process, or the people?',
            doThis: 'Classify your case + 2 past conflicts. Note when relationship seeped in.',
          },
        ],
        checklist: ['Three classifications'],
      }),

      ch({
        id: 'cc-prep',
        phase: 'A · See it',
        level: 'beginner',
        title: 'Prepare before you talk',
        minutes: 30,
        overview:
          'Intent, desired outcome, facts, your contribution to the mess, asks. Enter curious.',
        learn: ['Prep sheet', 'Contribution', 'Best/worst outcome'],
        steps: [
          {
            title: 'Prep sheet',
            doThis: 'Fill before your next hard conversation.',
            code: `Facts we agree on:
Where we differ:
My contribution:
What I want (outcome):
What I want for them:
My ask:
What I’ll do if we don’t agree today:`,
          },
        ],
        checklist: ['Prep sheet filled'],
      }),

      ch({
        id: 'cc-converse',
        phase: 'B · Talk',
        level: 'intermediate',
        title: 'The disagreement conversation',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Share facts and impact. Ask for their view. Find interests under positions. End with decision or next experiment.',
        learn: ['Interest vs position', 'Reflective listening', 'Close cleanly'],
        steps: [
          {
            title: 'Script practice',
            body: '“When X happened, impact was Y. How did you see it?”',
            doThis: 'Role-play once with a peer OR write both sides of the dialogue.',
            tip: 'If emotions spike, name it and pause — don’t push through fog.',
          },
          {
            title: 'Live attempt',
            body: 'Use the prep sheet. Take notes on agreements.',
            doThis: 'Have the real conversation. Capture owners and dates.',
          },
        ],
        checklist: ['Role-play or dialogue', 'Live conversation attempted'],
        resources: [
          r('article', 'Crucial Conversations summary concepts', 'https://www.cruciallearning.com/crucial-conversations/', 'EN'),
        ],
      }),

      ch({
        id: 'cc-collab',
        phase: 'B · Talk',
        level: 'intermediate',
        title: 'Cross-functional collaboration',
        minutes: 35,
        overview:
          'Shared goals, explicit interfaces, working agreements. QA ↔ Eng ↔ Design friction is usually unclear ownership.',
        learn: ['Working agreements', 'Decision rights', 'Joint rituals'],
        steps: [
          {
            title: 'Working agreement draft',
            body: 'Response times, how we disagree, where decisions live.',
            doThis: 'Draft 5 bullets with one partner function. Get a +1.',
          },
        ],
        checklist: ['Agreement drafted +1'],
      }),

      ch({
        id: 'cc-cp1',
        kind: 'checkpoint',
        phase: 'B · Talk',
        level: 'intermediate',
        title: 'Checkpoint: conflict writeup',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Document prep → conversation → outcome. What moved?',
        learn: ['Reflection'],
        steps: [
          {
            title: 'Writeup',
            doThis: '1 page. Share with a mentor if safe.',
          },
        ],
        checklist: ['Writeup done'],
      }),

      ch({
        id: 'cc-repair',
        phase: 'C · Recover',
        level: 'advanced',
        title: 'Repair & mediation lite',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'When trust dents: acknowledge, own your part, ask what good looks like next. Sometimes bring a facilitator.',
        learn: ['Repair steps', 'When to escalate', 'Facilitator use'],
        steps: [
          {
            title: 'Repair script',
            doThis: 'Write (and ideally deliver) a repair message for a past dent.',
          },
        ],
        checklist: ['Repair script written'],
      }),

      ch({
        id: 'cc-cp2',
        kind: 'checkpoint',
        phase: 'C · Recover',
        level: 'advanced',
        title: 'Checkpoint: collaboration kit',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Kit: prep sheet, working agreement, disagreement agenda, repair script.',
        learn: ['Team assets'],
        steps: [
          {
            title: 'Publish kit',
            doThis: 'Put in team wiki. Use in one meeting.',
            items: ['Prep sheet', 'Working agreement', '30-min disagreement agenda', 'Repair script'],
          },
        ],
        checklist: ['Kit live', 'Used once'],
        note: 'Pace: 3–4 weeks. Early small conflicts beat late explosions.',
      }),
    ],
    resources: {
      docs: [
        { name: 'HBR conflict guidance', url: 'https://hbr.org/2014/06/how-to-handle-conflict-in-the-workplace' },
        { name: 'Atlassian — Difficult conversations', url: 'https://www.atlassian.com/blog/teamwork/difficult-conversations' },
      ],
      tools: ['Prep sheet', 'FigJam for options', 'Shared decision log'],
      books: ['Crucial Conversations', 'Thanks for the Feedback (Stone & Heen)'],
      practice: ['One structured disagreement per sprint', 'Working agreement with a partner team'],
      videos: [],
    },
  },

  {
    id: 'stakeholder-management',
    title: 'Stakeholder Management',
    tagline: 'Map power, set expectations, and keep trust when plans change.',
    category: 'soft-skills',
    accent: '#166534',
    cover: 'covers/interview-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Leads and ICs who present to managers, PMs, customers, or partner teams.',
    outcomes: [
      'Map stakeholders and tailor communication',
      'Set and renegotiate expectations explicitly',
      'Build a cadence that prevents surprise',
    ],
    chapters: [
      ch({
        id: 'sm-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'Stakeholders are anyone who can affect or is affected by your work. Pick one initiative and map humans around it.',
        learn: ['Initiative pick'],
        steps: [
          {
            title: 'Pick initiative',
            doThis: 'Name goal + deadline + your role in one paragraph.',
          },
        ],
        checklist: ['Initiative paragraph'],
        resources: [
          r('article', 'Atlassian — Stakeholders', 'https://www.atlassian.com/work-management/project-management/stakeholder-management', 'EN'),
        ],
      }),

      ch({
        id: 'sm-map',
        phase: 'A · Map',
        level: 'beginner',
        title: 'Stakeholder map',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'Power × interest. Manage closely, keep satisfied, keep informed, monitor.',
        learn: ['Grid', 'Channels', 'Sponsors vs users'],
        steps: [
          {
            title: 'Build the grid',
            doThis: 'Place 8–12 people. Note preferred channel and frequency for top 4.',
          },
        ],
        checklist: ['Grid complete'],
      }),

      ch({
        id: 'sm-expect',
        phase: 'A · Map',
        level: 'beginner',
        title: 'Expectation setting',
        minutes: 30,
        overview:
          'Say what you will deliver, by when, with what quality, and what you need. Ambiguity breeds disappointment.',
        learn: ['Expectation briefs', 'Dependencies', 'No-surprise rule'],
        steps: [
          {
            title: 'Expectation brief',
            doThis: 'Send one brief to a key stakeholder this week.',
            code: `We will deliver: …
By: …
Looks like success: …
Out of scope: …
We need from you: …
Risks you should know: …`,
          },
        ],
        checklist: ['Brief sent'],
      }),

      ch({
        id: 'sm-cadence',
        phase: 'B · Operate',
        level: 'intermediate',
        title: 'Cadence & updates',
        minutes: 30,
        durationLabel: 'Week 2',
        overview:
          'Right altitude for the audience. Execs want decisions/risks; peers want details. Async first.',
        learn: ['Altitude', 'RAG honesty', 'Ask clearly'],
        steps: [
          {
            title: 'Two altitudes',
            doThis: 'Write the same update for exec and for peer eng — side by side.',
          },
        ],
        checklist: ['Two-altitude update'],
      }),

      ch({
        id: 'sm-change',
        phase: 'B · Operate',
        level: 'intermediate',
        title: 'Renegotiating when reality hits',
        minutes: 30,
        overview:
          'Bring options early. Never hide Amber until it’s Red. Trade scope/date/quality explicitly.',
        learn: ['Options memos', 'Early Amber'],
        steps: [
          {
            title: 'Options memo',
            doThis: 'Draft 3 options for a slip. Recommend one.',
          },
        ],
        checklist: ['Options memo drafted'],
      }),

      ch({
        id: 'sm-cp1',
        kind: 'checkpoint',
        phase: 'B · Operate',
        level: 'intermediate',
        title: 'Checkpoint: stakeholder pack',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Map + expectation brief + sample updates + options memo.',
        learn: ['Pack review'],
        steps: [
          {
            title: 'Review',
            doThis: 'Get feedback from a manager or mentor on clarity.',
          },
        ],
        checklist: ['Pack reviewed'],
      }),

      ch({
        id: 'sm-trust',
        phase: 'C · Trust',
        level: 'advanced',
        title: 'Trust deposits & difficult stakeholders',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Keep promises small and visible. For difficult stakeholders: listen for underlying interest, set boundaries, document agreements.',
        learn: ['Trust deposits', 'Difficult dynamics', 'Documentation'],
        steps: [
          {
            title: 'Trust plan',
            doThis: 'List 3 small promises you can keep this week. Keep them.',
          },
        ],
        checklist: ['Three promises kept'],
      }),

      ch({
        id: 'sm-cp2',
        kind: 'checkpoint',
        phase: 'C · Trust',
        level: 'advanced',
        title: 'Checkpoint: two-week cadence',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Run your cadence for two weeks. Retro what to keep.',
        learn: ['Habit'],
        steps: [
          {
            title: 'Evidence',
            doThis: 'Collect updates sent, decisions logged, one renegotiation.',
            items: ['Map kept current', 'Updates on cadence', 'One renegotiation handled', 'Retro note'],
          },
        ],
        checklist: ['Two-week run complete'],
        note: 'Pace: 2–4 weeks. Trust is built in boring consistency.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Atlassian stakeholder management', url: 'https://www.atlassian.com/work-management/project-management/stakeholder-management' },
      ],
      tools: ['RACI lite', 'Status template', 'Decision log'],
      books: ['The Trusted Advisor (Maister) — selective', 'Making Things Happen (Berkun)'],
      practice: ['Weekly stakeholder update', 'Expectation brief on every new initiative'],
      videos: [],
    },
  },

  {
    id: 'tech-writing',
    title: 'Technical Writing',
    tagline: 'Docs people finish — READMEs, RFCs, runbooks, and bug-clear explanations.',
    category: 'soft-skills',
    accent: '#14532D',
    cover: 'covers/git-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Engineers and QA who write docs, RFCs, or explanations that currently get ignored.',
    outcomes: [
      'Write task-oriented docs with clear structure',
      'Edit for clarity, audience, and skimability',
      'Ship a README or runbook others can follow unaided',
    ],
    chapters: [
      ch({
        id: 'tw-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'Pick one doc to improve or create: README, how-to, RFC, or runbook. Audience first.',
        learn: ['Doc pick', 'Audience'],
        steps: [
          {
            title: 'Audience sentence',
            doThis: '“This doc helps ___ do ___ without ___.”',
          },
        ],
        checklist: ['Audience sentence'],
        resources: [
          r('doc', 'Google Technical Writing courses', 'https://developers.google.com/tech-writing', 'EN'),
        ],
      }),

      ch({
        id: 'tw-structure',
        phase: 'A · Craft',
        level: 'beginner',
        title: 'Structure for skimmers',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Purpose up top. Prerequisites. Numbered steps. Expected results. Troubleshooting. Links out.',
        learn: ['Inverted pyramid', 'Headings', 'Task orientation'],
        steps: [
          {
            title: 'Outline first',
            doThis: 'Outline your doc with H2s only. No paragraphs yet.',
            tip: 'Prefer verbs in headings: “Rotate the API key” not “API keys.”',
          },
        ],
        checklist: ['H2 outline'],
        resources: [
          r('doc', 'Google TW — structure', 'https://developers.google.com/tech-writing/one', 'EN'),
        ],
      }),

      ch({
        id: 'tw-clarity',
        phase: 'A · Craft',
        level: 'beginner',
        title: 'Clarity edits',
        minutes: 35,
        overview:
          'Short sentences. Active voice. Defined jargon. Concrete examples. Cut throat-clearing.',
        learn: ['Active voice', 'Jargon budget', 'Examples'],
        steps: [
          {
            title: 'Edit pass',
            doThis: 'Rewrite one page with: ≤20-word average sentence target, examples for each abstract claim.',
            code: `Weak: The system should be configured appropriately prior to execution.
Strong: Before you run the job, set \`ENV=staging\` in \`.env\`.`,
          },
        ],
        checklist: ['One page clarity-edited'],
      }),

      ch({
        id: 'tw-procedure',
        phase: 'A · Craft',
        level: 'intermediate',
        title: 'Procedures & runbooks',
        minutes: 35,
        overview:
          'Each step: action + expected result. Call out danger. Include rollback.',
        learn: ['Step design', 'Verification', 'Rollback'],
        steps: [
          {
            title: 'Write a procedure',
            doThis: '5–12 steps someone else can follow cold. Include verify + rollback.',
          },
        ],
        checklist: ['Procedure drafted'],
      }),

      ch({
        id: 'tw-cp1',
        kind: 'checkpoint',
        phase: 'B · Test',
        level: 'intermediate',
        title: 'Checkpoint: usability test the doc',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Watch a peer follow the doc without help. Note where they stall.',
        learn: ['Doc testing'],
        steps: [
          {
            title: 'Silent test',
            doThis: 'Fix the top 3 stalls. Retest once if needed.',
          },
        ],
        checklist: ['Peer test done', 'Three fixes'],
      }),

      ch({
        id: 'tw-rfc',
        phase: 'B · Test',
        level: 'intermediate',
        title: 'RFCs & decision docs',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Context, options, recommendation, consequences, open questions. Invite dissent early.',
        learn: ['RFC anatomy', 'Options tables', 'Decision recording'],
        steps: [
          {
            title: 'Mini-RFC',
            doThis: 'Write a 1–2 page RFC for a real or practice decision.',
            items: ['Context', 'Goals / non-goals', 'Options', 'Recommendation', 'Open questions'],
          },
        ],
        checklist: ['Mini-RFC written'],
        resources: [
          r('article', 'Rust RFC book (structure inspiration)', 'https://rust-lang.github.io/rfcs/', 'EN'),
          r('article', 'Amazon narrative memos (overview)', 'https://www.aboutamazon.com/news/workplace/a-quirky-amazon-meeting-practice', 'EN'),
        ],
      }),

      ch({
        id: 'tw-style',
        phase: 'C · System',
        level: 'advanced',
        title: 'Style guides & maintenance',
        minutes: 25,
        durationLabel: 'Week 3',
        overview:
          'Docs rot. Assign owners, review dates, and “last verified” stamps. A thin style guide beats chaos.',
        learn: ['Ownership', 'Style lite', 'Deprecation'],
        steps: [
          {
            title: 'Owner + verified',
            doThis: 'Add owner and last-verified date to your doc. Calendar a re-verify.',
          },
        ],
        checklist: ['Owner + verified stamped'],
      }),

      ch({
        id: 'tw-cp2',
        kind: 'checkpoint',
        phase: 'C · System',
        level: 'advanced',
        title: 'Checkpoint: ship the doc',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Publish the doc in the canonical place. Announce it. Collect one usage success.',
        learn: ['Adoption'],
        steps: [
          {
            title: 'Ship',
            doThis: 'Link from README index. Ask one person to use it for real.',
            items: ['Published doc', 'Peer-tested', 'Owner/verified', 'Announcement', 'One success story'],
          },
        ],
        checklist: ['All items done'],
        note: 'Pace: 3–4 weeks. A followed doc beats a beautiful unread one.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Google Technical Writing', url: 'https://developers.google.com/tech-writing' },
        { name: 'Write the Docs', url: 'https://www.writethedocs.org/guide/' },
      ],
      tools: ['Markdown', 'Vale / spellcheck', 'Screenshots with callouts', 'Doc site (MkDocs/Docusaurus)'],
      books: ['Docs for Developers (Bhatti et al.)', 'The Sense of Style (Pinker) — selective'],
      practice: ['Peer test every how-to', 'One RFC this month'],
      videos: [{ name: 'Write the Docs videos', url: 'https://www.writethedocs.org/videos/' }],
    },
  },

  {
    id: 'public-speaking',
    title: 'Public Speaking & Demo Skills',
    tagline: 'Present and demo with calm structure — live or remote.',
    category: 'soft-skills',
    accent: '#15803D',
    cover: 'covers/interview-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Anyone who freezes in demos, standups, or conference rooms and wants reps with a method.',
    outcomes: [
      'Structure talks with a strong open and clear ask',
      'Run product demos that survive failure',
      'Manage nerves with rehearsal systems',
    ],
    chapters: [
      ch({
        id: 'pspk-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'Speaking improves with reps. Schedule three micro-talks (5–10 min) over the next weeks — team meeting counts.',
        learn: ['Rep plan', 'Recording'],
        steps: [
          {
            title: 'Book the reps',
            doThis: 'Put 3 talk slots on the calendar. Pick topics.',
          },
        ],
        checklist: ['Three slots booked'],
        resources: [
          r('article', 'Toastmasters — speaking tips', 'https://www.toastmasters.org/resources/public-speaking-tips', 'EN'),
        ],
      }),

      ch({
        id: 'pspk-structure',
        phase: 'A · Craft',
        level: 'beginner',
        title: 'Structure: open, body, ask',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Hook, context, 2–3 points, demo or proof, ask/Q&A. Timebox each.',
        learn: ['Hook types', 'Signposting', 'The ask'],
        steps: [
          {
            title: 'Card outline',
            doThis: 'One card per section with time budgets totaling your slot.',
          },
        ],
        checklist: ['Card outline'],
      }),

      ch({
        id: 'pspk-nerves',
        phase: 'A · Craft',
        level: 'beginner',
        title: 'Nerves are data',
        minutes: 25,
        overview:
          'Physiological arousal ≠ failure. Breath, grounding, first 30 seconds memorized, friendly face in the room.',
        learn: ['Breath', 'First 30', 'Reframe'],
        steps: [
          {
            title: 'First 30 seconds',
            doThis: 'Script and memorize the opening. Practice until boring.',
          },
        ],
        checklist: ['Opening memorized'],
      }),

      ch({
        id: 'pspk-demo',
        phase: 'B · Demos',
        level: 'intermediate',
        title: 'Demo craft',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Script the path. Reset data. Hide the messy tabs. Narrate intent. Have screenshots when live fails.',
        learn: ['Happy path', 'Narration', 'Failure recovery'],
        steps: [
          {
            title: 'Demo script',
            doThis: 'Write click-by-click script + backup screenshots for a 5-min demo.',
            tip: 'Never demo on untested prod right before the meeting.',
          },
          {
            title: 'Failure drill',
            body: 'Practice saying “I’ll switch to screenshots” smoothly.',
            doThis: 'Record one recovery once.',
          },
        ],
        checklist: ['Script + backups', 'Recovery recorded'],
      }),

      ch({
        id: 'pspk-remote',
        phase: 'B · Demos',
        level: 'intermediate',
        title: 'Remote presence',
        minutes: 25,
        overview:
          'Camera, light, mic, slower pace, say when you’ll share screen. Check chat.',
        learn: ['AV basics', 'Pace', 'Engagement'],
        steps: [
          {
            title: 'AV check',
            doThis: 'Record 2 minutes. Fix the worst AV issue before next talk.',
          },
        ],
        checklist: ['AV issue fixed'],
      }),

      ch({
        id: 'pspk-cp1',
        kind: 'checkpoint',
        phase: 'B · Demos',
        level: 'intermediate',
        title: 'Checkpoint: recorded talk',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Record a 5–8 min talk. Self-review with a rubric.',
        learn: ['Self-feedback'],
        steps: [
          {
            title: 'Rubric review',
            doThis: 'Score open, clarity, pace, ask (1–5). Re-record the weakest minute.',
            items: ['Clear open', 'Signposted points', 'Pace', 'Ask / close', 'Demo recovery if any'],
          },
        ],
        checklist: ['Recording + scores', 'Weak minute redone'],
      }),

      ch({
        id: 'pspk-qa',
        phase: 'C · Live',
        level: 'advanced',
        title: 'Q&A without panic',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Listen fully. Repeat the question. Answer short. Park unknowns. Don’t bluff.',
        learn: ['Listen/repeat', 'Bridge', 'Parking lot'],
        steps: [
          {
            title: 'Q&A drill',
            doThis: 'Have a peer fire 10 questions. Practice “I don’t know — I’ll follow up by ___.”',
          },
        ],
        checklist: ['Q&A drill done'],
      }),

      ch({
        id: 'pspk-cp2',
        kind: 'checkpoint',
        phase: 'C · Live',
        level: 'advanced',
        title: 'Checkpoint: three live reps',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Deliver the three booked talks. Collect one feedback note each.',
        learn: ['Volume of practice'],
        steps: [
          {
            title: 'Rep log',
            doThis: 'Log date, audience, what improved, next focus.',
          },
        ],
        checklist: ['Three reps logged'],
        note: 'Pace: 3–5 weeks. Reps > theory.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Toastmasters tips', url: 'https://www.toastmasters.org/resources/public-speaking-tips' },
      ],
      tools: ['Recorder', 'Timer', 'Demo reset scripts', 'Backup PDF/screenshots'],
      books: ['Talk Like TED (Gallo) — selective', 'Resonate (Duarte)'],
      practice: ['5-min talk weekly', 'Demo failure drill monthly'],
      videos: [],
    },
  },

  {
    id: 'networking-career',
    title: 'Professional Networking',
    tagline: 'Build real relationships — not sleazy LinkedIn spam.',
    category: 'soft-skills',
    accent: '#166534',
    cover: 'covers/communication-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'People who hate “networking” but still need a professional community and warm paths to opportunities.',
    outcomes: [
      'Start and maintain genuine professional relationships',
      'Write outreach that respects time and offers value',
      'Use communities and events without transactional vibes',
    ],
    chapters: [
      ch({
        id: 'nw-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Networking is helping people over time and being findable when opportunities appear. You’ll set a light weekly cadence — not a spray campaign.',
        learn: ['Mindset', 'Cadence', 'Anti-spam rules'],
        steps: [
          {
            title: 'Anti-spam rules',
            body: 'No mass identical DMs. No “pick your brain” without context. No fake compliments.',
            doThis: 'Write your personal rules. Stick them above your desk.',
            items: [
              'Personalized note referencing specific work',
              'Clear, small ask or pure give',
              'Easy out for them',
              'Follow up once max unless they engage',
            ],
          },
        ],
        checklist: ['Anti-spam rules written'],
        resources: [
          r('article', 'HBR — Networking', 'https://hbr.org/2016/05/learn-to-love-networking', 'EN'),
        ],
      }),

      ch({
        id: 'nw-map',
        phase: 'A · Foundation',
        level: 'beginner',
        title: 'Map your existing network',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'You already know people. Weak ties matter. List alumni, ex-colleagues, community members.',
        learn: ['Strong/weak ties', 'Warm paths'],
        steps: [
          {
            title: 'Inventory',
            doThis: 'List 20 humans worth staying in touch with. Tag: peer / mentor / mentee / community.',
          },
        ],
        checklist: ['List of 20'],
      }),

      ch({
        id: 'nw-give',
        phase: 'A · Foundation',
        level: 'beginner',
        title: 'Give first',
        minutes: 30,
        overview:
          'Share a useful link, make an intro, amplify someone’s work, send a specific compliment with proof.',
        learn: ['Give ideas', 'Intros etiquette'],
        steps: [
          {
            title: 'Three gives',
            doThis: 'This week: three no-ask gives to three different people.',
            tip: 'Double opt-in for intros: ask both sides first.',
          },
        ],
        checklist: ['Three gives sent'],
      }),

      ch({
        id: 'nw-outreach',
        phase: 'B · Reach out',
        level: 'intermediate',
        title: 'Outreach that isn’t gross',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Short, specific, respectful. Say why them, why now, and a tiny ask (15–20 min) or no ask.',
        learn: ['Message structure', 'Follow-up', 'Rejection grace'],
        steps: [
          {
            title: 'Write templates (then customize)',
            doThis: 'Draft 2 templates. Send 3 customized notes this week.',
            code: `Hi <Name> —
I read/watched <specific thing> and especially liked <detail>.
I’m working on <brief>. If you’re open, I’d value 15 minutes on <one question>.
Totally fine if now’s busy — either way, thanks for <their work>.
— <You>`,
          },
        ],
        checklist: ['Three customized outreaches'],
        resources: [
          r('article', 'Laura Roeder / common outreach advice', 'https://www.linkedin.com/pulse/topics/career-development-s76492/', 'EN'),
        ],
      }),

      ch({
        id: 'nw-community',
        phase: 'B · Reach out',
        level: 'intermediate',
        title: 'Communities & events',
        minutes: 30,
        overview:
          'Show up consistently. Ask good questions. Volunteer. Quality > badge collecting.',
        learn: ['Community pick', 'Event goals', 'Follow-up'],
        steps: [
          {
            title: 'Join one',
            body: 'MoT, local meetup, open-source Discord, alumni group — pick one you’ll actually attend.',
            doThis: 'Attend one event or async discussion. Follow up with one human after.',
          },
        ],
        checklist: ['One community touch + follow-up'],
      }),

      ch({
        id: 'nw-cp1',
        kind: 'checkpoint',
        phase: 'B · Reach out',
        level: 'intermediate',
        title: 'Checkpoint: relationship review',
        minutes: 35,
        durationLabel: 'Gate',
        overview: 'Review outreach results. What got replies? Adjust tone.',
        learn: ['Iteration'],
        steps: [
          {
            title: 'Review',
            doThis: 'Note reply rate and one lesson. Rewrite your weakest message.',
          },
        ],
        checklist: ['Review note', 'Rewrite done'],
      }),

      ch({
        id: 'nw-maintain',
        phase: 'C · Maintain',
        level: 'advanced',
        title: 'Maintain without being weird',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Lightweight CRM: birthday optional, project updates rare, share wins/asks occasionally. Quarterly hello beats annual panic.',
        learn: ['Light CRM', 'Reconnect scripts'],
        steps: [
          {
            title: 'Quarterly list',
            doThis: 'Pick 10 people for a quarterly hello. Send 3 this week.',
          },
        ],
        checklist: ['Quarterly list', 'Three hellos'],
      }),

      ch({
        id: 'nw-offer',
        phase: 'C · Maintain',
        level: 'advanced',
        title: 'Being findable',
        minutes: 30,
        overview:
          'Clear LinkedIn/GitHub/portfolio story. Public writing or talks optional but powerful. Make it easy to refer you.',
        learn: ['Public proof', 'Referral readiness'],
        steps: [
          {
            title: 'Referral blurb',
            doThis: 'Write a 3-sentence blurb someone could paste to recommend you. Align LinkedIn headline.',
          },
        ],
        checklist: ['Referral blurb + headline aligned'],
      }),

      ch({
        id: 'nw-cp2',
        kind: 'checkpoint',
        phase: 'C · Maintain',
        level: 'advanced',
        title: 'Checkpoint: 30-day network habit',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'Evidence of gives, outreaches, community, and maintenance — without spam.',
        learn: ['Sustainable habit'],
        steps: [
          {
            title: 'Habit pack',
            doThis: 'Log 30 days: weekly give, monthly event, quarterly list started.',
            items: [
              'Anti-spam rules',
              '20-person map',
              '≥6 gives',
              '≥5 customized outreaches',
              '1 community + follow-ups',
              'Referral blurb',
            ],
          },
        ],
        checklist: ['Habit pack complete'],
        note: 'Pace: 3–5 weeks to install habits; relationships compound over years.',
      }),
    ],
    resources: {
      docs: [
        { name: 'HBR — Learn to Love Networking', url: 'https://hbr.org/2016/05/learn-to-love-networking' },
      ],
      tools: ['Simple spreadsheet CRM', 'LinkedIn (used sparingly)', 'Community Discord/Slack', 'Calendar reminders'],
      books: ['Never Eat Alone (Ferrazzi) — skim critically', 'Give and Take (Grant)'],
      practice: ['One give per week', 'One community event per month'],
      videos: [],
    },
  },
]
