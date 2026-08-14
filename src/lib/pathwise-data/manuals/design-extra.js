import { ch, r } from '../helpers.js'

/** Extra design craft — design thinking, motion, presentations. */
export const designExtraManuals = [
  {
    id: 'design-thinking',
    title: 'Design Thinking',
    tagline: 'Empathize → define → ideate → prototype → test — workshops that produce decisions.',
    category: 'design',
    accent: '#C45C26',
    cover: 'covers/figma-cover.png',
    duration: '3–5 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Builders, QA, and PMs who want structured creative problem-solving without fluffy offsites.',
    outcomes: [
      'Run a lightweight design-thinking loop on a real problem',
      'Facilitate empathy and ideation workshops that end with prototypes',
      'Test prototypes and feed learning back into the backlog',
    ],
    chapters: [
      ch({
        id: 'dt-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Design thinking is a loop for reducing risk on fuzzy human problems. Pick one problem at work or a personal product idea. You will leave with a tested prototype — not a wall of sticky notes.',
        learn: ['Problem selection', 'Timeboxes', 'Bias to prototypes'],
        steps: [
          {
            title: 'Pick the problem',
            body: 'Must involve real users and uncertainty. “Make the logo bigger” is not a DT problem.',
            doThis: 'Write the problem in one sentence + who hurts today.',
            items: [
              'Recommended: 3–5 weeks, one loop',
              'Workshop blocks: 60–90 minutes',
              'Prototype within week 2 — don’t ideate forever',
            ],
          },
        ],
        checklist: ['Problem sentence written'],
        practice: { title: 'Stakeholder map', brief: 'List users, buyers, and blockers for this problem.' },
        resources: [
          r('doc', 'IDEO Design Kit', 'https://www.designkit.org/', 'EN'),
          r('doc', 'Stanford d.school resources', 'https://dschool.stanford.edu/resources', 'EN'),
        ],
      }),

      ch({
        id: 'dt-empathize',
        phase: 'A · Understand',
        level: 'beginner',
        title: 'Empathize: talk to humans',
        minutes: 40,
        durationLabel: 'Week 1',
        overview:
          'Interviews, observation, and journey sketches. Seek stories and workarounds — not feature requests as gospel.',
        learn: ['Interview prompts', 'Observation', 'Empathy maps'],
        steps: [
          {
            title: 'Interview guide',
            body: 'Open with recent stories. Dig into last time they struggled. Avoid leading “would you use X?”',
            doThis: 'Run 3 interviews (15–20 min). Capture quotes verbatim.',
            tip: 'Ask “show me how you do it today” when possible.',
          },
          {
            title: 'Empathy map',
            body: 'Says / Thinks / Does / Feels — one map per primary user.',
            doThis: 'Build one empathy map from your interviews.',
          },
        ],
        checklist: ['Three interviews', 'One empathy map'],
        resources: [
          r('doc', 'IDEO — Interview', 'https://www.designkit.org/methods/2', 'EN'),
          r('article', 'NN/g — Empathy mapping', 'https://www.nngroup.com/articles/empathy-mapping/', 'EN'),
        ],
      }),

      ch({
        id: 'dt-define',
        phase: 'A · Understand',
        level: 'beginner',
        title: 'Define: point of view',
        minutes: 30,
        overview:
          'Turn research into a POV: user + need + insight. A good problem statement focuses the team; a bad one is a solution in disguise.',
        learn: ['POV statements', 'HMWs', 'Problem vs solution'],
        steps: [
          {
            title: 'POV + HMW',
            body: '[User] needs [need] because [insight]. Then: How Might We …?',
            doThis: 'Write 1 POV and 5 HMW questions. Vote the top 2 HMWs.',
            code: `POV: On-call engineers need a faster way to find the last known-good config
because they waste critical minutes grepping Slack during incidents.

HMW: How might we surface last-known-good config at the moment of triage?`,
          },
        ],
        checklist: ['POV + top HMWs'],
        resources: [
          r('doc', 'd.school — POV', 'https://dschool.stanford.edu/resources', 'EN'),
        ],
      }),

      ch({
        id: 'dt-ideate',
        phase: 'B · Make',
        level: 'intermediate',
        title: 'Ideate: quantity then critique',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Diverge first. Defer judgment. Then converge with criteria. Sticky-note storms need facilitation or they become loudest-voice wins.',
        learn: ['Crazy 8s', 'Dot voting', 'Selection criteria'],
        steps: [
          {
            title: 'Crazy 8s',
            body: '8 ideas in 8 minutes — sketches, not essays.',
            doThis: 'Run Crazy 8s solo or with 2+ people on your top HMW.',
          },
          {
            title: 'Converge',
            body: 'Criteria: impact, feasibility, learnability this week.',
            doThis: 'Pick 1–2 ideas to prototype. Kill charming impossibles explicitly.',
            items: [
              'Silent sketching before discussion',
              'Dot vote independently',
              'Decide with criteria, not vibes alone',
            ],
          },
        ],
        checklist: ['Crazy 8s done', 'Prototype candidates chosen'],
        resources: [
          r('doc', 'GV — Crazy 8s', 'https://designsprintkit.withgoogle.com/methodology/phase3-sketch/crazy-8s', 'EN'),
        ],
      }),

      ch({
        id: 'dt-prototype',
        phase: 'B · Make',
        level: 'intermediate',
        title: 'Prototype to learn',
        minutes: 40,
        overview:
          'Fidelity matches the question. Paper, Figma click-through, or concierge. The prototype exists to get feedback — not to impress.',
        learn: ['Fidelity choice', 'Happy path + one edge', 'Facade honesty'],
        steps: [
          {
            title: 'Build the smallest prototype',
            body: 'If you’re testing navigation, don’t pixel-polish illustrations.',
            doThis: 'Ship a prototype in <1 day of effort that answers your riskiest assumption.',
            tip: 'Tell testers what’s fake so they don’t fight the facade.',
          },
        ],
        checklist: ['Prototype ready for 3 testers'],
        resources: [
          r('doc', 'Figma — Prototyping', 'https://help.figma.com/hc/en-us/articles/360040328614', 'EN'),
          r('article', 'NN/g — Prototyping', 'https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/', 'EN'),
        ],
      }),

      ch({
        id: 'dt-test',
        phase: 'B · Make',
        level: 'intermediate',
        title: 'Test & learn',
        minutes: 40,
        overview:
          'Watch users try the prototype. Tasks over tours. Note behaviors and quotes. Decide: persevere, pivot, or park.',
        learn: ['Task-based tests', 'Note-taking', 'Synthesis'],
        steps: [
          {
            title: 'Three tests',
            body: 'Same tasks each time. Don’t demo — observe.',
            doThis: 'Run 3 tests. Capture: completed? struggled where? surprise?',
          },
          {
            title: 'Synthesize',
            body: 'Patterns > outliers. Update POV if reality disagrees.',
            doThis: 'Half-page learning: what we’ll build / change / drop.',
          },
        ],
        checklist: ['Three tests', 'Learning note'],
        practice: { title: 'Backlog impact', brief: 'Turn learnings into 3 tickets or explicit won’t-dos.' },
        resources: [
          r('article', 'NN/g — Usability testing', 'https://www.nngroup.com/articles/usability-testing-101/', 'EN'),
        ],
      }),

      ch({
        id: 'dt-cp1',
        kind: 'checkpoint',
        phase: 'B · Make',
        level: 'intermediate',
        title: 'Checkpoint: one full loop',
        minutes: 45,
        durationLabel: 'Gate',
        overview: 'Evidence of empathize → test for your problem. Artifacts or it didn’t happen.',
        learn: ['Packaging the loop'],
        steps: [
          {
            title: 'Loop pack',
            doThis: 'Share with a peer: empathy map, POV, prototype link, test notes, decision.',
          },
        ],
        checklist: ['Loop pack shared', 'Decision recorded'],
      }),

      ch({
        id: 'dt-workshop',
        phase: 'C · Facilitate',
        level: 'advanced',
        title: 'Facilitate workshops',
        minutes: 35,
        durationLabel: 'Week 3',
        overview:
          'Agenda, roles, timeboxes, parking lot, decision capture. Facilitation is a skill — energy without outcomes is a party.',
        learn: ['Agenda design', 'Inclusion', 'Decision logging'],
        steps: [
          {
            title: 'Workshop plan',
            body: 'Goal, attendees, exercises, outputs, timeboxes.',
            doThis: 'Write a 90-min workshop agenda for ideation or synthesis. Run it or dry-run aloud.',
            items: [
              'Start with purpose + success lookslike',
              'Silent work before debate',
              'End with owners + dates',
            ],
          },
        ],
        checklist: ['Agenda written', 'Dry-run or live run'],
        resources: [
          r('doc', 'Hyper Island toolbox', 'https://toolbox.hyperisland.com/', 'EN'),
          r('doc', 'Atlassian Team Playbook', 'https://www.atlassian.com/team-playbook', 'EN'),
        ],
      }),

      ch({
        id: 'dt-cp2',
        kind: 'checkpoint',
        phase: 'C · Facilitate',
        level: 'advanced',
        title: 'Checkpoint: facilitate & close',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Facilitate one session and close the loop into product/engineering work.',
        learn: ['From workshop to backlog'],
        steps: [
          {
            title: 'Capstone',
            doThis: 'Deliver workshop notes + prototype decision + next experiments.',
            items: [
              'Facilitated session (or recorded dry-run with critique)',
              'Artifacts from full DT loop',
              'Three backlog items or explicit kills',
              'Retro: what to change next workshop',
            ],
          },
        ],
        checklist: ['Capstone complete'],
        note: 'Pace: 3–5 weeks. One tested idea beats a mural of abandoned stickies.',
      }),
    ],
    resources: {
      docs: [
        { name: 'IDEO Design Kit', url: 'https://www.designkit.org/' },
        { name: 'Stanford d.school', url: 'https://dschool.stanford.edu/resources' },
        { name: 'Google Design Sprint Kit', url: 'https://designsprintkit.withgoogle.com/' },
      ],
      tools: ['FigJam / Miro', 'Figma', 'Timer', 'Interview notes doc'],
      books: [
        'Creative Confidence (Kelley & Kelley)',
        'Sprint (Knapp) — for timeboxed variants',
        'The Mom Test (Fitzpatrick) — for interviews',
      ],
      practice: ['One interview per week', 'One Crazy 8s before any big feature debate'],
      videos: [{ name: 'IDEO design thinking overview', url: 'https://designthinking.ideo.com/' }],
    },
  },

  {
    id: 'motion-design',
    title: 'Motion for Product',
    tagline: 'Hierarchy, easing, micro-interactions — and knowing when NOT to animate.',
    category: 'design',
    accent: '#B45309',
    cover: 'covers/uiux-cover.png',
    duration: '3–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Product designers and front-end folks who want motion that clarifies, not distracts.',
    outcomes: [
      'Use motion to show hierarchy, continuity, and feedback',
      'Choose easing and duration with intention',
      'Cut animation that harms usability or performance',
    ],
    chapters: [
      ch({
        id: 'mo-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        durationLabel: 'Day 0',
        overview:
          'Product motion is functional: it explains state change. You will critique real apps, prototype in Figma or CSS, and write a “when not to animate” checklist.',
        learn: ['Functional motion', 'Tooling', 'Accessibility baseline'],
        steps: [
          {
            title: 'Setup',
            body: 'Figma Smart Animate and/or CSS transitions. Prefer one stack for practice.',
            doThis: 'Create a Figma file “Motion Lab” with 3 blank frames for experiments.',
          },
        ],
        checklist: ['Motion Lab file created'],
        resources: [
          r('doc', 'Material Design — Motion', 'https://m3.material.io/styles/motion/overview', 'EN'),
          r('doc', 'Apple HIG — Motion', 'https://developer.apple.com/design/human-interface-guidelines/motion', 'EN'),
        ],
      }),

      ch({
        id: 'mo-purpose',
        phase: 'A · Principles',
        level: 'beginner',
        title: 'Why motion exists in product UI',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Orient, continuity, feedback, delight (last). If it doesn’t serve one of the first three, question it.',
        learn: ['Four jobs of motion', 'State change storytelling'],
        steps: [
          {
            title: 'Audit an app',
            body: 'Pick an app you use daily. Capture 5 animations. Label their job.',
            doThis: 'Table: animation → job → helpful/noise.',
            tip: 'Delight without clarity is decoration tax.',
          },
        ],
        checklist: ['Five animations labeled'],
      }),

      ch({
        id: 'mo-hierarchy',
        phase: 'A · Principles',
        level: 'beginner',
        title: 'Hierarchy & choreography',
        minutes: 35,
        overview:
          'What moves first matters. Stagger with purpose. Shared-element transitions beat unrelated fades.',
        learn: ['Enter/exit', 'Shared elements', 'Stagger'],
        steps: [
          {
            title: 'Choreograph a list',
            body: 'Parent moves, then children — or the reverse if focusing detail.',
            doThis: 'Prototype a list → detail transition with one shared element.',
          },
        ],
        checklist: ['List→detail prototype'],
        resources: [
          r('doc', 'Material — Transitions', 'https://m3.material.io/styles/motion/transitions/overview', 'EN'),
        ],
      }),

      ch({
        id: 'mo-easing',
        phase: 'A · Principles',
        level: 'intermediate',
        title: 'Timing, easing, duration',
        minutes: 35,
        overview:
          'Duration ~150–300ms for most UI. Ease-out for enters, ease-in for exits (common pattern). Linear feels mechanical; bounce is usually wrong for productivity UI.',
        learn: ['Duration ranges', 'Easing curves', 'Spring caution'],
        steps: [
          {
            title: 'Same motion, three easings',
            body: 'Compare linear, ease-out, overshoot on a drawer.',
            doThis: 'Record or screenshot the three. Pick one and justify in one sentence.',
            code: `/* typical product defaults */
.enter { transition: transform 200ms ease-out, opacity 150ms ease-out; }
.exit  { transition: transform 150ms ease-in,  opacity 100ms ease-in; }`,
          },
        ],
        checklist: ['Three-easing comparison done'],
        resources: [
          r('doc', 'web.dev — Animation', 'https://web.dev/articles/animations-overview', 'EN'),
          r('tool', 'Easing functions cheat sheet', 'https://easings.net/', 'EN'),
        ],
      }),

      ch({
        id: 'mo-micro',
        phase: 'B · Patterns',
        level: 'intermediate',
        title: 'Micro-interactions',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Buttons, toggles, toasts, pull-to-refresh. Feedback should be immediate and proportional. Don’t animate every hover.',
        learn: ['Feedback loops', 'Loading states', 'Error motion'],
        steps: [
          {
            title: 'Design three micros',
            body: 'Toggle, successful save, failed save.',
            doThis: 'Prototype all three. Ensure failure is clearer than success.',
            items: [
              'Pressed/active state within 100ms feel',
              'Success confirmation not longer than needed',
              'Error draws attention without panic strobe',
            ],
          },
        ],
        checklist: ['Three micro-interactions prototyped'],
        resources: [
          r('book', 'Microinteractions (Saffer) overview', 'https://microinteractions.com/', 'EN'),
        ],
      }),

      ch({
        id: 'mo-a11y',
        phase: 'B · Patterns',
        level: 'intermediate',
        title: 'Accessibility & performance',
        minutes: 30,
        overview:
          'prefers-reduced-motion is mandatory. Vestibular triggers (large zooms, parallax) can harm. Prefer transform/opacity for perf.',
        learn: ['Reduced motion', 'Vestibular safety', 'Compositor-friendly props'],
        steps: [
          {
            title: 'Respect reduced motion',
            body: 'Replace motion with instant state or simplified fade.',
            doThis: 'Add a reduced-motion variant to one prototype or CSS snippet.',
            code: `@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}`,
          },
        ],
        checklist: ['Reduced-motion path implemented'],
        resources: [
          r('doc', 'MDN — prefers-reduced-motion', 'https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion', 'EN'),
          r('doc', 'WCAG — Animation from interactions', 'https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html', 'EN'),
        ],
      }),

      ch({
        id: 'mo-cp1',
        kind: 'checkpoint',
        phase: 'B · Patterns',
        level: 'intermediate',
        title: 'Checkpoint: motion critique + fix',
        minutes: 40,
        durationLabel: 'Gate',
        overview: 'Critique one product flow’s motion; propose and prototype a clearer version.',
        learn: ['Before/after'],
        steps: [
          {
            title: 'Ship critique',
            doThis: '1-pager + prototype. Peer rates clarity 1–5.',
          },
        ],
        checklist: ['Critique + prototype', 'Peer score captured'],
      }),

      ch({
        id: 'mo-dont',
        phase: 'C · Judgment',
        level: 'advanced',
        title: 'When NOT to animate',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Dense data, urgent errors, reduced-motion users, low-end devices, rapid repetitive actions — stillness can be the feature.',
        learn: ['Kill criteria', 'Motion budget'],
        steps: [
          {
            title: 'Don’t-animate checklist',
            body: 'Write team rules. Examples: no animation on table sort for >100 rows; no page-wide parallax.',
            doThis: 'Publish a 8–10 line checklist. Apply it to kill one existing animation.',
          },
        ],
        checklist: ['Checklist published', 'One animation removed'],
      }),

      ch({
        id: 'mo-cp2',
        kind: 'checkpoint',
        phase: 'C · Judgment',
        level: 'advanced',
        title: 'Checkpoint: motion guidelines',
        minutes: 45,
        durationLabel: 'Capstone',
        overview: 'A short motion guideline for your product: purposes, durations, easing, a11y, don’ts, examples.',
        learn: ['Systematizing'],
        steps: [
          {
            title: 'Guidelines doc',
            doThis: 'Include 2 good examples and 2 anti-examples with rationale.',
            items: [
              'Purpose principles',
              'Duration/easing tokens',
              'Micro-interaction patterns',
              'Reduced motion',
              'Don’t-animate list',
            ],
          },
        ],
        checklist: ['Guidelines published'],
        note: 'Pace: 3–4 weeks. Clarity over spectacle.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Material 3 Motion', url: 'https://m3.material.io/styles/motion/overview' },
        { name: 'Apple HIG Motion', url: 'https://developer.apple.com/design/human-interface-guidelines/motion' },
        { name: 'web.dev animations', url: 'https://web.dev/articles/animations-overview' },
      ],
      tools: ['Figma Smart Animate', 'easings.net', 'CSS / Motion One / Framer Motion', 'Browser reduced-motion setting'],
      books: ['Microinteractions (Saffer)', 'The Animators Survival Kit — selective for timing feel'],
      practice: ['Weekly motion audit of one app', 'Ship one reduced-motion path'],
      videos: [{ name: 'Google Material motion talks', url: 'https://m3.material.io/styles/motion/overview' }],
    },
  },

  {
    id: 'presentation-design',
    title: 'Presentation Design',
    tagline: 'Slides that don’t kill rooms — one idea per slide, hierarchy, and rehearsal.',
    category: 'design',
    accent: '#9A3412',
    cover: 'covers/graphic-design-cover.png',
    duration: '2–4 weeks',
    levelSpan: 'Beginner → Intermediate',
    who: 'Anyone who presents status, demos, or proposals and wants slides that support talking — not replace thinking.',
    outcomes: [
      'Structure a talk as a story with one idea per slide',
      'Design readable slides with hierarchy and restraint',
      'Rehearse and adapt for live rooms vs async decks',
    ],
    chapters: [
      ch({
        id: 'pd-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 15,
        durationLabel: 'Day 0',
        overview:
          'You will rebuild one real talk (demo, proposal, retro) into a sharp deck. Pick the talk now.',
        learn: ['Case talk', 'Live vs leave-behind'],
        steps: [
          {
            title: 'Pick the talk',
            body: '10–20 minutes. Real audience. Stakes optional but better if real.',
            doThis: 'Write audience, goal decision, and timebox.',
          },
        ],
        checklist: ['Talk chosen'],
        resources: [
          r('article', 'NN/g — Presentation tips', 'https://www.nngroup.com/articles/presentation-tips/', 'EN'),
        ],
      }),

      ch({
        id: 'pd-story',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'Story before slides',
        minutes: 30,
        durationLabel: 'Week 1',
        overview:
          'Outline on paper: context → tension → options → ask. Slides come last. If the outline is mush, slides won’t save you.',
        learn: ['Narrative arc', 'The ask', 'Cut list'],
        steps: [
          {
            title: 'Outline only',
            body: 'No slideware yet. Bullet the beats.',
            doThis: 'One-page outline with a single explicit ask at the end.',
            tip: 'If you can’t say the ask in one sentence, you’re not ready to design.',
          },
        ],
        checklist: ['Outline + ask'],
      }),

      ch({
        id: 'pd-one-idea',
        phase: 'A · Structure',
        level: 'beginner',
        title: 'One idea per slide',
        minutes: 30,
        overview:
          'Each slide earns one sentence. Dense slides are leave-behinds — label them so, or split them.',
        learn: ['Slide sentences', 'Appendix strategy', 'Title as headline'],
        steps: [
          {
            title: 'Headline titles',
            body: 'Titles claim something (“Latency dropped 40%”) not label something (“Metrics”).',
            doThis: 'Turn your outline into slide headlines only — no body yet. Aim ≤12 slides for 15 min.',
          },
        ],
        checklist: ['Headline-only deck'],
      }),

      ch({
        id: 'pd-visual',
        phase: 'B · Design',
        level: 'intermediate',
        title: 'Visual hierarchy on slides',
        minutes: 35,
        durationLabel: 'Week 2',
        overview:
          'Type size, contrast, whitespace. One focal point. Charts need a takeaway annotation. Screenshots need crop + callouts.',
        learn: ['Type scale', 'Crop & callout', 'Chart takeaways'],
        steps: [
          {
            title: 'Build the slides',
            body: 'Fill bodies under headlines. Ruthlessly delete.',
            doThis: 'Design the deck. Squint test: can you see hierarchy?',
            items: [
              'Body text ≥18–20pt for rooms',
              'Max ~6 lines when you must use bullets',
              'One chart → one annotated takeaway',
            ],
          },
        ],
        checklist: ['Full draft deck'],
        resources: [
          r('doc', 'Practical Typography — presentations', 'https://practicaltypography.com/presentation-documents.html', 'EN'),
        ],
      }),

      ch({
        id: 'pd-data',
        phase: 'B · Design',
        level: 'intermediate',
        title: 'Data & demos on slides',
        minutes: 30,
        overview:
          'Live demos fail — have screenshots. Data slides: start with the conclusion. Avoid 3D charts and rainbow legends.',
        learn: ['Backup stills', 'Annotation', 'Progressive disclosure'],
        steps: [
          {
            title: 'Demo backup',
            body: '3 screenshots with numbered steps for the critical path.',
            doThis: 'Add a backup section. Practice switching if live fails.',
          },
        ],
        checklist: ['Demo backup slides ready'],
      }),

      ch({
        id: 'pd-cp1',
        kind: 'checkpoint',
        phase: 'B · Design',
        level: 'intermediate',
        title: 'Checkpoint: cold read',
        minutes: 35,
        durationLabel: 'Gate',
        overview: 'Give the deck to someone without you talking. Can they get the ask?',
        learn: ['Async clarity'],
        steps: [
          {
            title: 'Cold read test',
            doThis: 'Fix the top 3 misunderstandings. Note what only works live vs async.',
          },
        ],
        checklist: ['Cold read done', 'Three fixes'],
      }),

      ch({
        id: 'pd-rehearse',
        phase: 'C · Delivery',
        level: 'intermediate',
        title: 'Rehearse like it matters',
        minutes: 30,
        durationLabel: 'Week 3',
        overview:
          'Out loud, timed, with clicker. Plan opening 30 seconds and closing ask. Cut until under time.',
        learn: ['Timing', 'Opening/close', 'Q&A parking'],
        steps: [
          {
            title: 'Full rehearsal',
            body: 'Record yourself once. Cringe once. Improve.',
            doThis: 'Two timed rehearsals. Cut slides until you finish with 1–2 min buffer.',
          },
        ],
        checklist: ['Two rehearsals logged'],
      }),

      ch({
        id: 'pd-room',
        phase: 'C · Delivery',
        level: 'advanced',
        title: 'Room craft & remote',
        minutes: 25,
        overview:
          'Face the audience, not the slide. Laser sparingly. Remote: larger type, slower pace, narrate cursor.',
        learn: ['Presence', 'Remote adaptations'],
        steps: [
          {
            title: 'Environment checklist',
            body: 'Display test, fonts embedded, backup PDF, link permissions.',
            doThis: 'Run through a pre-flight checklist for your next talk.',
          },
        ],
        checklist: ['Pre-flight checklist used once'],
      }),

      ch({
        id: 'pd-cp2',
        kind: 'checkpoint',
        phase: 'C · Delivery',
        level: 'advanced',
        title: 'Checkpoint: deliver the talk',
        minutes: 50,
        durationLabel: 'Capstone',
        overview: 'Deliver to a real audience (team meeting counts). Collect one piece of feedback on clarity of the ask.',
        learn: ['Close the loop'],
        steps: [
          {
            title: 'Ship it',
            doThis: 'After: note what you’d cut next time. Save before/after decks.',
            items: [
              'Outline',
              'Final deck',
              'Backup demo stills',
              'Feedback on the ask',
              'Personal cut list for next time',
            ],
          },
        ],
        checklist: ['Talk delivered', 'Feedback captured'],
        note: 'Pace: 2–4 weeks. One clear ask beats twenty beautiful slides.',
      }),
    ],
    resources: {
      docs: [
        { name: 'Practical Typography — presentations', url: 'https://practicaltypography.com/presentation-documents.html' },
        { name: 'NN/g presentation tips', url: 'https://www.nngroup.com/articles/presentation-tips/' },
      ],
      tools: ['Keynote / Google Slides / PowerPoint', 'Figma for diagrams', 'Recorder for rehearsal'],
      books: ['Resonate (Duarte)', 'Presentation Zen (Reynolds) — selective'],
      practice: ['Rebuild one status update as headline-only slides', 'Cold-read every leave-behind deck'],
      videos: [{ name: 'Duarte resources', url: 'https://www.duarte.com/resources/' }],
    },
  },
]
