import { ch, r } from '../helpers.js'

export const designManuals = [
  {
    id: 'graphic-design',
    title: 'Graphic Design',
    tagline: 'Hierarchy, type, color, and composition — from blank page to clear message.',
    category: 'design',
    accent: '#C45C26',
    cover: 'covers/graphic-design-cover.png',
    duration: '6–8 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Absolute beginners who want work that looks intentional — posters, brand pieces, and portfolio-ready case studies.',
    outcomes: [
      'Compose layouts with clear visual hierarchy and contrast',
      'Choose type and color systems with purpose, not decoration',
      'Build brand kits and multi-piece campaigns that feel cohesive',
      'Present work in portfolio case studies employers and clients understand',
    ],
    chapters: [
      ch({
        id: 'gd-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        overview:
          'Graphic design is learned by doing — not by collecting inspiration boards. This path moves from seeing hierarchy to shipping a campaign and portfolio case. Block 1–1.5 hours most days. Each week has a deliverable; checkpoints gate the next phase.',
        learn: [
          'Weekly rhythm and deliverables',
          'Tools you need (mostly free)',
          'What “job-ready” graphic design means at junior level',
        ],
        steps: [
          {
            title: 'Study pace',
            body: 'Plan 6–8 weeks at 8–10 hrs/week. Week 1–2: eyes and type. Week 3–4: color and grid. Week 5–6: brand. Week 7–8: campaign + portfolio.',
            doThis: 'Block calendar slots for the next 7 days. Pick one fictional client (café, festival, SaaS) you will design for all 8 weeks.',
            items: [
              'Recommended: 8 weeks at ~10 hrs/week',
              'Accelerated: 5–6 weeks at 2 hrs/day',
              'Slow track: 10–12 weeks — consistency beats speed',
            ],
          },
          {
            title: 'Tools setup',
            body: 'Figma (free tier) covers 90% of this path. Optional: Affinity Designer or Illustrator for print export. You do not need Adobe Creative Cloud to start.',
            doThis: 'Create a Figma file named “Graphic Design Journey”. Add a cover page with your fictional client name and 8-week goal.',
          },
          {
            title: 'Rules of the road',
            body: 'One message per piece. Critique with hierarchy language, not “I don’t like it.” Save every iteration — portfolio case studies need process, not just finals.',
            doThis: 'Create a folder: Process/. You will screenshot every draft there.',
            tip: 'If a layout feels busy, remove one element before adding anything new.',
          },
        ],
        checklist: [
          'Calendar blocks set for this week',
          'Fictional client chosen',
          'Figma file created with Process folder',
          'I read checkpoint pass criteria below',
        ],
        practice: {
          title: 'Day zero',
          brief: 'Screenshot 5 ads or posters you admire. Write one sentence each: what reads first, second, third?',
        },
      }),

      ch({
        id: 'gd-hierarchy',
        phase: 'A · See',
        level: 'beginner',
        title: 'Learn to see: hierarchy & contrast',
        minutes: 45,
        durationLabel: 'Week 1',
        overview:
          'Design starts with eyes, not tools. Train yourself to notice what appears first, second, third — then control that order on purpose. Contrast (size, weight, color, space) is how you steer the eye.',
        learn: ['Visual hierarchy', 'Contrast types', 'Squint test', 'One-message layouts'],
        steps: [
          {
            title: 'Squint test',
            body: 'Squint at a poster until details blur. Blobs of contrast reveal hierarchy. If everything screams, nothing speaks.',
            doThis: 'Screenshot 3 ads from Behance or Instagram. Mark 1st / 2nd / 3rd read with numbered circles.',
          },
          {
            title: 'Four contrast levers',
            body: 'Size, weight (bold vs regular), color (light vs dark), and whitespace. Pros rarely need more than two levers on one element.',
            doThis: 'Take one cluttered flyer. Rewrite it with one headline, one support line, one CTA. Use only size + weight for hierarchy.',
            items: [
              'Size — bigger reads first',
              'Weight — bold pulls attention',
              'Color — saturated or dark against light ground',
              'Space — isolation creates importance',
            ],
          },
          {
            title: 'Reduce to one message',
            body: 'Beginners overstuff. Pros cut. Ask: if the viewer remembers one thing, what should it be?',
            doThis: 'Design a 1080×1080 social post for your fictional client with exactly one focal point.',
            tip: 'If removing an element does not hurt understanding, remove it.',
          },
        ],
        checklist: [
          '3 hierarchy markups saved in Process/',
          'One reduced flyer draft',
          'One social post with single focal point',
        ],
        practice: {
          title: 'Quiet poster',
          brief: 'Design a poster for a fictional night market. One headline, one date/location line, one CTA. No clip art.',
        },
        resources: [
          r('book', 'Refactoring UI', 'https://www.refactoringui.com/', 'EN'),
          r('doc', 'Thinking with Type — Ellen Lupton', 'https://www.thinkingwithtype.com/', 'EN'),
          r('tool', 'Behance — inspiration with critique', 'https://www.behance.net/', 'EN'),
        ],
      }),

      ch({
        id: 'gd-contrast-depth',
        phase: 'A · See',
        level: 'beginner',
        title: 'Contrast deep dive: figure & ground',
        minutes: 40,
        durationLabel: 'Week 1',
        overview:
          'Figure-ground relationships, alignment as invisible glue, and proximity grouping — the Gestalt basics that make layouts feel “designed” without decoration.',
        learn: ['Figure/ground', 'Proximity & alignment', 'Visual tension vs harmony'],
        steps: [
          {
            title: 'Figure and ground',
            body: 'Every layout has a ground (background) and figures (content). Flip them intentionally — dark mode posters use light type on dark ground.',
            doThis: 'Redesign your night market poster in two versions: light ground and dark ground. Same hierarchy, different mood.',
          },
          {
            title: 'Alignment grid (informal)',
            body: 'Before a formal grid, align edges. Misaligned elements look amateur even with good type.',
            doThis: 'Turn on Figma layout guides. Align every text block to a shared left or center axis.',
          },
          {
            title: 'Proximity groups meaning',
            body: 'Things close together relate. Space separates sections. Do not rely on boxes and lines when space can do the job.',
            doThis: 'Add a second content block (e.g. lineup or menu items). Group with proximity only — no divider lines.',
          },
        ],
        checklist: ['Light + dark poster versions', 'All elements edge-aligned', 'Proximity grouping on one layout'],
        practice: {
          title: 'Before / after',
          brief: 'Find a bad local flyer online. Redesign only hierarchy and alignment — keep their words.',
        },
        resources: [
          r('doc', 'Gestalt Principles — Interaction Design Foundation', 'https://www.interaction-design.org/literature/article/gestalt-principles', 'EN'),
          r('video', 'The Futur — Hierarchy in Design', 'https://www.youtube.com/@thefuturishere', 'EN'),
        ],
      }),

      ch({
        id: 'gd-type',
        phase: 'B · Type & Color',
        level: 'beginner',
        title: 'Typography fundamentals',
        minutes: 50,
        durationLabel: 'Week 2',
        overview:
          'One display face + one body face. A type scale (not random sizes). Leading, measure, and alignment — the 80% of typography that matters for graphic work.',
        learn: ['Type pairing', 'Type scale', 'Leading & measure', 'OpenType features lite'],
        steps: [
          {
            title: 'Pick a pair',
            body: 'Contrast in weight or genre, not chaos. Display for headlines, body for paragraphs. Avoid two similar serifs or two geometric sans competing.',
            doThis: 'Choose 2 Google Fonts. Set a 4-step scale: 12 / 16 / 24 / 40 (adjust for your project).',
            items: [
              'Display + body (classic combo)',
              'Same family, different weights (safe combo)',
              'Avoid: two decorative faces fighting',
            ],
          },
          {
            title: 'Measure and leading',
            body: 'Body text: 45–75 characters per line. Leading ~1.4–1.6× font size for body. Headlines can be tighter.',
            doThis: 'Set a 200-word blurb for your client. Fix measure with column width. Adjust leading until it breathes.',
          },
          {
            title: 'Hierarchy with type alone',
            body: 'Size + weight + spacing can carry a whole poster without color yet.',
            doThis: 'Rebuild your night market poster using only black, white, and gray — type hierarchy only.',
            tip: 'Use Typewolf or Google Fonts pairing suggestions when stuck.',
          },
        ],
        checklist: ['Type pair documented in Figma', '4-step scale applied', 'Grayscale hierarchy poster'],
        practice: {
          title: 'Menu redesign',
          brief: 'Restyle a local café menu PDF (or screenshot) into clean hierarchy with your type pair.',
        },
        resources: [
          r('doc', 'Practical Typography — Matthew Butterick', 'https://practicaltypography.com/', 'EN'),
          r('tool', 'Typewolf — font pairing', 'https://www.typewolf.com/', 'EN'),
          r('tool', 'Google Fonts', 'https://fonts.google.com/', 'EN'),
          r('book', 'The Elements of Typographic Style — Bringhurst', 'https://en.wikipedia.org/wiki/The_Elements_of_Typographic_Style', 'EN'),
        ],
      }),

      ch({
        id: 'gd-color',
        phase: 'B · Type & Color',
        level: 'beginner',
        title: 'Color with restraint: roles & 60-30-10',
        minutes: 45,
        durationLabel: 'Week 3',
        overview:
          'Color is a system, not a decoration buffet. Define roles: background, text, accent. Use 60–30–10 as a starting ratio. Check contrast for accessibility.',
        learn: ['Color roles', '60–30–10 rule', 'HSL thinking', 'Contrast basics'],
        steps: [
          {
            title: 'Name your roles',
            body: 'Background, surface, text primary, text muted, accent. Do not invent a new hex per section.',
            doThis: 'Build a 5-color kit in Figma. Name each swatch by role, not “blue 2”.',
          },
          {
            title: '60–30–10 applied',
            body: '~60% dominant (often neutral), ~30% secondary, ~10% accent. Accent earns attention — overuse kills it.',
            doThis: 'Apply your kit to the poster. Count approximate area coverage. Adjust if accent dominates.',
          },
          {
            title: 'Contrast check',
            body: 'Text on backgrounds needs readable contrast. Aim WCAG AA for body text (4.5:1). Stark plugin or WebAIM checker.',
            doThis: 'Run contrast check on headline and body over your background. Fix failures.',
            code: 'Roles example:\n- bg: #FAFAF8\n- text: #1A1A1A\n- muted: #6B6B6B\n- accent: #C45C26\n- surface: #FFFFFF',
          },
        ],
        checklist: ['5-color kit named by role', 'Poster uses 60–30–10', 'Contrast passes on text pairings'],
        practice: {
          title: 'Seasonal variant',
          brief: 'Same layout, two color themes (summer / winter) using the same role names — swap hex values only.',
        },
        resources: [
          r('tool', 'Huetone — accessible palettes', 'https://huetone.ardov.me/', 'EN'),
          r('tool', 'WebAIM Contrast Checker', 'https://webaim.org/resources/contrastchecker/', 'EN'),
          r('doc', 'Refactoring UI — Color chapters', 'https://www.refactoringui.com/', 'EN'),
        ],
      }),

      ch({
        id: 'gd-cp-a',
        kind: 'checkpoint',
        phase: 'B · Type & Color',
        level: 'beginner',
        title: 'Checkpoint A — Hierarchy + type + color',
        minutes: 30,
        durationLabel: 'Gate · Week 3',
        overview:
          'Before grids and brand systems, prove you can control one message with type and color alone. Pass criteria are non-negotiable — fix gaps before Phase C.',
        learn: ['Self-critique checklist', 'Portfolio habit: save process'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'You pass when all five are true on one poster (any subject).',
            doThis: 'Audit your best poster against this list. Fix failures before continuing.',
            items: [
              'One clear first read within 2 seconds',
              'Type scale documented (4+ steps)',
              'Only 2 font families used',
              'Color roles named; accent ≤ ~10% of area',
              'Body text contrast passes WCAG AA',
            ],
          },
          {
            title: 'Critique swap',
            body: 'Ask a friend or post in a design Discord: “What reads first?” Do not explain — listen.',
            doThis: 'Write 3 critique notes you received. Fix at least one.',
          },
        ],
        checklist: [
          'All 5 pass criteria met',
          'Process folder has 3+ iterations',
          'External critique captured',
        ],
        practice: {
          title: 'Checkpoint poster',
          brief: 'Final polish on your checkpoint poster. Export PNG + save Figma link in Process/checkpoint-a.md.',
        },
      }),

      ch({
        id: 'gd-grid',
        phase: 'C · Grid & Layout',
        level: 'intermediate',
        title: 'Grids, spacing & rhythm',
        minutes: 50,
        durationLabel: 'Week 4',
        overview:
          'Invisible grids and consistent spacing beat decoration. Learn column grids, margins, gutters, and 8pt spacing systems that scale from poster to social to print.',
        learn: ['Column grids', 'Margins & gutters', '8pt spacing', 'Baseline rhythm lite'],
        steps: [
          {
            title: 'Lay a 12-column grid',
            body: 'Margins define safe zone. Columns + gutters align content. Most marketing layouts use 4, 6, or 12 columns.',
            doThis: 'Rebuild your poster on a 12-column grid in Figma. Snap text and images to columns.',
          },
          {
            title: '8pt spacing system',
            body: 'Use multiples of 4 or 8 for padding and gaps: 8, 16, 24, 32, 48, 64. Random 13px gaps look accidental.',
            doThis: 'Audit spacing on your poster. Replace odd values with 8pt multiples.',
            code: 'Spacing scale:\n4  — hairline gaps\n8  — tight\n16 — default padding\n24 — section gap\n32 — major section\n48 — hero breathing room',
          },
          {
            title: 'Responsive thinking (print + social)',
            body: 'Same grid logic applies to IG story (9:16) and poster (A3). Reflow, do not squash.',
            doThis: 'Duplicate poster to 1080×1920 story format. Reflow using same grid logic.',
          },
        ],
        checklist: ['12-column grid used', '8pt spacing throughout', 'Story format reflowed'],
        practice: {
          title: 'Grid breakdown',
          brief: 'Export one layout with grid visible. Annotate columns used for each block — learning artifact for portfolio.',
        },
        resources: [
          r('book', 'Grid Systems — Müller-Brockmann', 'https://en.wikipedia.org/wiki/Grid_Systems_in_Graphic_Design', 'EN'),
          r('doc', 'Figma — Layout Grids', 'https://help.figma.com/hc/en-us/articles/360040328753-Create-layout-grids', 'EN'),
          r('video', 'The Futur — Grid Systems', 'https://www.youtube.com/@thefuturishere', 'EN'),
        ],
      }),

      ch({
        id: 'gd-brand',
        phase: 'D · Brand',
        level: 'intermediate',
        title: 'Brand identity basics',
        minutes: 50,
        durationLabel: 'Week 5',
        overview:
          'A brand is a promise made visual. Logo mark, wordmark, color, type, voice — condensed into a mini identity for your fictional client.',
        learn: ['Logo types', 'Clearspace & minimum size', 'Brand voice one-liner', 'Do / don\'t examples'],
        steps: [
          {
            title: 'Mark vs wordmark',
            body: 'Many strong brands use a simple mark + wordmark lockup. Start simple — letterform, monogram, or abstract mark tied to the client story.',
            doThis: 'Sketch 10 rough marks on paper. Digitize top 3 in Figma.',
          },
          {
            title: 'Clearspace & misuse',
            body: 'Define padding around logo equal to cap height of wordmark (or x-height rule). Show 2 “don’t” examples (stretch, wrong color).',
            doThis: 'Brand page in Figma: logo, clearspace diagram, 2 don’ts.',
          },
          {
            title: 'Voice in one sentence',
            body: '“Sounds like ___ , not like ___.” Guides copy on posters and social.',
            doThis: 'Write voice line for your client. Apply to headline rewrite on your poster.',
          },
        ],
        checklist: ['3 mark explorations', 'Clearspace diagram', 'Voice line + headline rewrite'],
        practice: {
          title: 'Business card',
          brief: 'Design a business card using mark, type pair, and color kit only.',
        },
        resources: [
          r('book', 'Logo Modernism — Jens Müller', 'https://www.logo-modernism.com/', 'EN'),
          r('doc', 'Brand Guidelines examples — Brand New', 'https://www.underconsideration.com/brandnew/', 'EN'),
        ],
      }),

      ch({
        id: 'gd-brand-kit',
        phase: 'D · Brand',
        level: 'intermediate',
        title: 'Brand kit & guidelines page',
        minutes: 45,
        durationLabel: 'Week 6',
        overview:
          'Scale your taste into a system teammates (or future-you) can reuse. One Figma page: logo, colors, type, spacing, example applications.',
        learn: ['Brand kit structure', 'Component thinking for brand', 'Export for dev/marketing handoff'],
        steps: [
          {
            title: 'Kit frame structure',
            body: 'Cover → Logo → Color → Typography → Spacing → Components (buttons, tags) → Examples.',
            doThis: 'Build brand kit frame for your fictional café / client with all sections.',
          },
          {
            title: 'Type roles locked',
            body: 'Display / H1 / H2 / Body / Caption — map to your scale with size, weight, line height.',
            doThis: 'Typography table: role, font, size, weight, line-height, example string.',
          },
          {
            title: 'Three applications',
            body: 'Prove the kit works beyond one poster.',
            doThis: 'Apply kit to poster, IG story, and loyalty stamp card in one file.',
          },
        ],
        checklist: ['Full brand kit page', 'Typography table complete', '3 applications consistent'],
        practice: {
          title: 'Kit stress test',
          brief: 'Design a fourth piece (email header or ticket stub) in 30 minutes using only kit elements.',
        },
        resources: [
          r('doc', 'Figma — Create and share brand assets', 'https://help.figma.com/hc/en-us/articles/360039832134', 'EN'),
          r('tool', 'Coolors — palette exploration', 'https://coolors.co/', 'EN'),
        ],
      }),

      ch({
        id: 'gd-campaign',
        phase: 'E · Campaign & Portfolio',
        level: 'advanced',
        title: 'Art direction & campaign design',
        minutes: 55,
        durationLabel: 'Week 7',
        overview:
          'One idea, many executions. Mood → constraints → 3+ pieces that clearly belong together. Art direction is consistency of feeling, not copying layouts.',
        learn: ['Mood boards', 'Campaign constraints', 'Visual system vs template', 'Motion as hierarchy lite'],
        steps: [
          {
            title: 'Mood → adjectives → rules',
            body: 'Collect 8–12 references. Extract 3 adjectives (e.g. “warm, noisy, handmade”). Write 3 rules (e.g. “always one rotated element”).',
            doThis: 'FigJam mood board + 3 written rules for your campaign.',
          },
          {
            title: 'Three-piece campaign',
            body: 'Poster + social + landing hero (or billboard + story + flyer). Same system, different formats.',
            doThis: 'Ship 3 pieces for one campaign moment (launch, sale, event).',
          },
          {
            title: 'Optional motion pass',
            body: 'Simple Figma prototype or 3-frame GIF: motion reinforces hierarchy (headline enters last, CTA pulses once).',
            doThis: 'Add motion to one piece OR annotate motion intent on a static frame.',
            tip: 'If motion does not clarify hierarchy, remove it.',
          },
        ],
        checklist: ['Mood board + 3 rules', '3 campaign pieces', 'Motion noted or prototyped'],
        practice: {
          title: 'Campaign critique',
          brief: 'Swap with a peer. Ask: do these three belong to the same brand without seeing the logo?',
        },
        resources: [
          r('doc', 'Inclusive Design Principles', 'https://inclusivedesignprinciples.org/', 'EN'),
          r('video', 'The Futur — Art Direction', 'https://www.youtube.com/@thefuturishere', 'EN'),
        ],
      }),

      ch({
        id: 'gd-portfolio',
        phase: 'E · Campaign & Portfolio',
        level: 'advanced',
        title: 'Portfolio case studies & presentation',
        minutes: 50,
        durationLabel: 'Week 8',
        overview:
          'Problem → constraints → process → outcome. Not a dump of pretty frames. Write case studies recruiters and clients actually read.',
        learn: ['Case study structure', 'Process screenshots', 'Outcome metrics (even fictional)', 'Presentation narrative'],
        steps: [
          {
            title: 'Case study skeleton',
            body: 'Title, client/context, problem, constraints, process (3–5 images), outcome, learnings. 300–500 words.',
            doThis: 'Write case study draft for your campaign in Notion or markdown.',
            items: [
              'Problem — what needed solving?',
              'Constraints — time, audience, medium',
              'Process — sketches, iterations, grid/type decisions',
              'Outcome — what shipped; what you would do next',
            ],
          },
          {
            title: 'Process over polish',
            body: 'Hiring managers trust messy middle screenshots. Show the squint test markup, failed color attempt, grid overlay.',
            doThis: 'Add 4 process images to case study from your Process/ folder.',
          },
          {
            title: 'Present aloud in 3 minutes',
            body: 'Interviewers ask you to walk through one project. Practice clock.',
            doThis: 'Record yourself (phone OK) presenting the case. Watch once. Cut filler.',
          },
        ],
        checklist: ['Case study 300+ words', '4 process images included', '3-minute presentation recorded'],
        practice: {
          title: 'Portfolio page',
          brief: 'Publish case study on Behance, Notion public page, or PDF — one project live.',
        },
        resources: [
          r('doc', 'Bestfolios — case study examples', 'https://www.bestfolios.com/', 'EN'),
          r('video', 'The Futur — Portfolio Reviews', 'https://www.youtube.com/@thefuturishere', 'EN'),
        ],
      }),

      ch({
        id: 'gd-cp-b',
        kind: 'checkpoint',
        phase: 'E · Campaign & Portfolio',
        level: 'advanced',
        title: 'Checkpoint B — Job-ready graphic design pack',
        minutes: 40,
        durationLabel: 'Gate · Week 8',
        overview:
          'Final gate: you should have a cohesive brand, 3-piece campaign, and one written case study — the minimum viable graphic design portfolio for junior roles or freelance pitches.',
        learn: ['Portfolio completeness check', 'Next steps after this path'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify every item. Fix gaps this week.',
            items: [
              'Brand kit with logo, color, type, spacing',
              '3+ campaign pieces same visual system',
              'One case study published or export-ready',
              'All text meets contrast AA on primary layouts',
              'Figma file organized with named pages',
            ],
          },
          {
            title: 'What next',
            body: 'Specialize: motion, packaging, editorial, or UI handoff. Take the Figma and UI/UX paths in this library to go product-side.',
            doThis: 'Write 3 next-skill goals for the next 90 days.',
          },
        ],
        checklist: ['All pass criteria met', 'Portfolio link saved', '90-day goals written'],
        practice: {
          title: 'Peer review',
          brief: 'Post portfolio link in a design community. Implement one piece of feedback.',
        },
      }),

      ch({
        id: 'gd-timeline',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Timeline, tools & weekly rhythm',
        minutes: 20,
        overview: 'Reference chapter: week map, tool stack, daily habits. Return when overwhelmed.',
        learn: ['8-week map', 'Tool list', 'Critique vocabulary'],
        steps: [
          {
            title: 'Week-by-week',
            items: [
              'Week 1 — Hierarchy & contrast',
              'Week 2 — Typography',
              'Week 3 — Color + Checkpoint A',
              'Week 4 — Grid & spacing',
              'Week 5 — Brand identity',
              'Week 6 — Brand kit',
              'Week 7 — Campaign',
              'Week 8 — Portfolio + Checkpoint B',
            ],
          },
          {
            title: 'Critique vocabulary',
            items: [
              'Hierarchy — what reads first?',
              'Contrast — enough separation?',
              'Alignment — edges line up?',
              'Rhythm — spacing consistent?',
              'Restraint — what can we remove?',
            ],
          },
        ],
        checklist: ['I know which week I am on', 'Tool bookmarks saved'],
      }),
    ],
    resources: {
      docs: [
        { name: 'Practical Typography', url: 'https://practicaltypography.com/' },
        { name: 'Thinking with Type', url: 'https://www.thinkingwithtype.com/' },
        { name: 'Figma Learn', url: 'https://help.figma.com/' },
        { name: 'Inclusive Design Principles', url: 'https://inclusivedesignprinciples.org/' },
      ],
      tools: ['Figma', 'Affinity Designer / Illustrator', 'Huetone', 'Typewolf', 'Coolors', 'Stark (contrast)'],
      books: [
        'Thinking with Type (Lupton)',
        'The Elements of Typographic Style (Bringhurst)',
        'Grid Systems (Müller-Brockmann)',
        'Refactoring UI (Wathan & Schoger)',
      ],
      practice: [
        'Daily logo challenge (personal brief)',
        'Redesign a local menu or flyer',
        'Behance — critique 1 project weekly',
      ],
      videos: [
        { name: 'The Futur (YouTube)', url: 'https://www.youtube.com/@thefuturishere' },
        { name: 'Flux Academy', url: 'https://www.youtube.com/@FluxAcademy' },
      ],
    },
  },

  {
    id: 'figma',
    title: 'Figma',
    tagline: 'Design, prototype, and hand off — the tool product teams live in.',
    category: 'design',
    accent: '#A34A28',
    cover: 'covers/figma-cover.png',
    duration: '2–3 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Beginners learning interface design, design systems, and developer handoff in a team context.',
    outcomes: [
      'Build responsive screens with frames and Auto Layout',
      'Ship component libraries with variants and variables',
      'Prototype flows and hand off specs developers trust in Dev Mode',
    ],
    chapters: [
      ch({
        id: 'fig-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this Figma path',
        minutes: 20,
        overview:
          'Figma is the industry default for product UI. This path goes frames → Auto Layout → components → variants → variables → libraries → handoff. Do every exercise in one “Figma Journey” file unless noted.',
        learn: ['2–3 week pace', 'File hygiene habits', 'Keyboard shortcuts worth learning day 1'],
        steps: [
          {
            title: 'Pace',
            body: '2–3 weeks at 1–2 hrs/day. Week 1: layout. Week 2: components + variables. Week 3: libraries + handoff.',
            doThis: 'Duplicate Figma Community “Simple Design System” file as reference — do not merge with your exercises yet.',
          },
          {
            title: 'File hygiene',
            body: 'Pages: Cover, WIP, Components, Archive. Name layers. Future teammates will judge you on this.',
            doThis: 'Create file with those 4 pages. Enable “Outline icons” and “Snap to geometry” in preferences.',
            items: ['Rename layers (no “Frame 427”)', 'Use pages for separation', 'Publish components only from Components page'],
          },
        ],
        checklist: ['Journey file created', '4 pages set up', 'Community reference saved'],
        practice: {
          title: 'Shortcut drill',
          brief: 'Practice 10 min: F (frame), R (rectangle), T (text), K (scale), Cmd+D (duplicate), Cmd+G (group), Shift+A (Auto Layout).',
        },
      }),

      ch({
        id: 'fig-frames',
        phase: 'A · Layout',
        level: 'beginner',
        title: 'Frames, shapes & constraints',
        minutes: 40,
        durationLabel: 'Days 1–2',
        overview:
          'Frames are artboards — not groups. Constraints control resize behavior. Build a mobile login + home shell before Auto Layout.',
        learn: ['Frames vs groups', 'Constraints', 'Device presets', 'Layout grids on frames'],
        steps: [
          {
            title: 'Frame first',
            body: 'Always draw a frame (F) for screens. iPhone 14 preset is fine for mobile exercises.',
            doThis: 'Build login screen: logo area, 2 inputs, primary button, footer link. Use frames for each section.',
          },
          {
            title: 'Constraints preview',
            body: 'Pin elements left/right/center/scale. Test by resizing the frame.',
            doThis: 'Pin header left+right, center logo, pin button bottom. Resize — nothing should float randomly.',
          },
          {
            title: 'Home shell',
            body: 'Tab bar or nav + content area + FAB optional. Same file, second frame.',
            doThis: 'Build home screen shell matching login width. Link visually (same header style).',
          },
        ],
        checklist: ['Login + home frames', 'Constraints tested on resize', 'Layers named'],
        practice: {
          title: 'Tablet frame',
          brief: 'Duplicate mobile home to iPad frame. Adjust constraints — content should reflow sensibly.',
        },
        resources: [
          r('doc', 'Figma — Frames', 'https://help.figma.com/hc/en-us/articles/360041061214', 'EN'),
          r('doc', 'Figma Academy — Getting Started', 'https://www.figma.com/academy/', 'EN'),
        ],
      }),

      ch({
        id: 'fig-autolayout',
        phase: 'A · Layout',
        level: 'beginner',
        title: 'Auto Layout mastery',
        minutes: 50,
        durationLabel: 'Days 3–5',
        overview:
          'Auto Layout is how Figma layouts resize like CSS flexbox. Hug vs fill, padding, gaps, nested stacks — the skill that separates amateur from hireable.',
        learn: ['Horizontal/vertical stacks', 'Hug vs fill', 'Padding & gap', 'Nested Auto Layout', 'Min/max width'],
        steps: [
          {
            title: 'First stack',
            body: 'Select elements → Shift+A. Direction, gap, padding. Hug contents on buttons; fill on inputs in a form.',
            doThis: 'Rebuild login form as vertical Auto Layout: 16px gap, 24px padding.',
          },
          {
            title: 'Hug vs fill',
            body: 'Buttons hug. Inputs fill container width. Cards hug height but fill width in a list.',
            doThis: 'Build a card component: image, title, subtitle, CTA — all in nested stacks.',
            code: 'Typical card stack:\n[Vertical AL, gap 12, padding 16]\n  Image — fill width, fixed height\n  Title — hug\n  Subtitle — hug\n  Button row — horizontal AL, gap 8',
          },
          {
            title: 'Responsive card list',
            body: 'Parent vertical stack of cards. Resize frame — cards stretch, internal spacing holds.',
            doThis: '3 cards in a scrollable frame. Resize from 320px to 400px width.',
          },
        ],
        checklist: ['Login uses Auto Layout', 'Card with nested stacks', 'Resize test passed'],
        practice: {
          title: 'Pricing table',
          brief: '3 pricing columns with Auto Layout. Collapse to single column under 600px width.',
        },
        resources: [
          r('doc', 'Figma — Auto Layout', 'https://help.figma.com/hc/en-us/articles/5731384053159', 'EN'),
          r('video', 'Figma — Auto Layout (YouTube)', 'https://www.youtube.com/@Figma', 'EN'),
        ],
      }),

      ch({
        id: 'fig-styles',
        phase: 'A · Layout',
        level: 'beginner',
        title: 'Color, text & effect styles',
        minutes: 35,
        durationLabel: 'Week 1',
        overview:
          'Styles are the bridge to variables and design tokens. Centralize color and typography before component explosion.',
        learn: ['Color styles', 'Text styles', 'Effect styles', 'Style naming convention'],
        steps: [
          {
            title: 'Color styles',
            body: 'Name: color/bg/default, color/text/primary, color/brand/accent. Avoid hex in layer names.',
            doThis: 'Create 6 color styles. Apply to login + home — zero detached hex on text fills.',
          },
          {
            title: 'Text styles',
            body: 'Map display, heading, body, caption. Include size, weight, line height.',
            doThis: '5 text styles applied across both screens.',
          },
          {
            title: 'Effect styles (lite)',
            body: 'Shadow/elevation for cards. One subtle shadow style beats five random drops.',
            doThis: 'Add elevation/shadow style to card. Document in Components page.',
          },
        ],
        checklist: ['6 color styles', '5 text styles', '1 effect style on card'],
        practice: {
          title: 'Style swap',
          brief: 'Change brand accent color style once — confirm all screens update.',
        },
        resources: [
          r('doc', 'Figma — Styles', 'https://help.figma.com/hc/en-us/articles/360039832134', 'EN'),
        ],
      }),

      ch({
        id: 'fig-cp-a',
        kind: 'checkpoint',
        phase: 'A · Layout',
        level: 'beginner',
        title: 'Checkpoint A — Responsive screens',
        minutes: 25,
        durationLabel: 'Gate · Week 1',
        overview: 'Pass before components: two screens, Auto Layout throughout, styles applied, resize-safe.',
        learn: ['Layout gate criteria'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Fix any failure before Phase B.',
            items: [
              'Login + home (or equivalent 2 screens)',
              'Auto Layout on all major containers',
              'Color + text styles — no rogue hex on text',
              'Resize 320→400px without broken overlap',
              'Layers named semantically',
            ],
          },
        ],
        checklist: ['All 5 criteria pass'],
      }),

      ch({
        id: 'fig-components',
        phase: 'B · Components',
        level: 'intermediate',
        title: 'Components & instances',
        minutes: 45,
        durationLabel: 'Days 8–9',
        overview:
          'Components are reusable source-of-truth elements. Instances inherit updates. Build button, input, card as components before variants.',
        learn: ['Create component', 'Instances & overrides', 'Organizing components', 'Boolean layers lite'],
        steps: [
          {
            title: 'Button component',
            body: 'Primary button as component on Components page. Instances on screens.',
            doThis: 'Button: default + hover states as separate components OR prepare for variants next chapter.',
          },
          {
            title: 'Input component',
            body: 'Label optional, field, helper text, error text layers. Use visibility or variants later.',
            doThis: 'Input component with 4 layers. Place 2 instances on login.',
          },
          {
            title: 'Override discipline',
            body: 'Override text and icons on instances — not structure. Reset overrides when main component updates wrong.',
            doThis: 'Change main button padding. Confirm instances update. Reset one broken override.',
          },
        ],
        checklist: ['Button + input + card components', 'Instances on screens', 'Override test done'],
        practice: {
          title: 'Mini library',
          brief: 'Add avatar, badge, and tag components. Document on Components page.',
        },
        resources: [
          r('doc', 'Figma — Components', 'https://help.figma.com/hc/en-us/articles/360037931751', 'EN'),
          r('doc', 'Figma Best Practices', 'https://www.figma.com/best-practices/', 'EN'),
        ],
      }),

      ch({
        id: 'fig-variants',
        phase: 'B · Components',
        level: 'intermediate',
        title: 'Variants & component properties',
        minutes: 50,
        durationLabel: 'Days 10–11',
        overview:
          'Variants collapse related components into one set with properties (size, state, type). This is how real design systems scale.',
        learn: ['Variant properties', 'Component properties', 'Boolean props', 'Instance swap'],
        steps: [
          {
            title: 'Button variant set',
            body: 'Properties: Type=Primary|Secondary, Size=Sm|Md|Lg, State=Default|Hover|Disabled.',
            doThis: 'One button component set with 12 variants (or sensible subset).',
          },
          {
            title: 'Input states',
            body: 'State=Default|Focus|Error|Disabled. Swap helper for error message via variant or boolean.',
            doThis: 'Input variant set with 4 states on login form instances.',
          },
          {
            title: 'Icon instance swap',
            body: 'Component property for leading/trailing icon swap without detaching.',
            doThis: 'Add icon slot to button via instance swap property.',
          },
        ],
        checklist: ['Button variant set live', 'Input states working', 'Icon swap on one component'],
        practice: {
          title: 'Chip component',
          brief: 'Chip with variants: selected, disabled, with icon optional.',
        },
        resources: [
          r('doc', 'Figma — Variants', 'https://help.figma.com/hc/en-us/articles/360055139333', 'EN'),
        ],
      }),

      ch({
        id: 'fig-variables',
        phase: 'B · Components',
        level: 'intermediate',
        title: 'Variables & modes (design tokens)',
        minutes: 50,
        durationLabel: 'Week 2',
        overview:
          'Variables replace static styles for tokens that change (light/dark, brand themes). Bind to fills, spacing, and component properties.',
        learn: ['Variable collections', 'Light/dark modes', 'Binding to properties', 'Spacing variables'],
        steps: [
          {
            title: 'Color variables',
            body: 'Collection: Brand. Variables: bg/default, text/primary, brand/accent. Modes: Light, Dark.',
            doThis: 'Create light + dark values for 6 color variables. Apply to login screen.',
          },
          {
            title: 'Spacing variables',
            body: 'space/4, space/8, space/16, space/24 bound to Auto Layout padding and gap.',
            doThis: 'Replace hardcoded padding on card with variables.',
          },
          {
            title: 'Typography variables (if available)',
            body: 'Bind font size variables to text styles or use string/number variables per team workflow.',
            doThis: 'At minimum: document token table on Cover page mapping name → value.',
          },
        ],
        checklist: ['Light/dark color modes', 'Spacing variables on one layout', 'Token table on Cover'],
        practice: {
          title: 'Theme flip',
          brief: 'Toggle mode to dark on all screens. Fix any unbound colors.',
        },
        resources: [
          r('doc', 'Figma — Variables', 'https://help.figma.com/hc/en-us/articles/15339657135383', 'EN'),
          r('doc', 'Tokens Studio (optional plugin)', 'https://tokens.studio/', 'EN'),
        ],
      }),

      ch({
        id: 'fig-libraries',
        phase: 'C · Systems',
        level: 'advanced',
        title: 'Libraries: publish, consume, update',
        minutes: 45,
        durationLabel: 'Days 14–15',
        overview:
          'Foundation file publishes library. Product file consumes instances. Update flow is how teams stay synced — master this before job interviews.',
        learn: ['Publish library', 'Enable in team files', 'Review updates', 'Breaking vs safe changes'],
        steps: [
          {
            title: 'Two-file setup',
            body: 'File A: Design System (publish). File B: App Screens (consume).',
            doThis: 'Move components to File A. Publish library. Enable in File B.',
          },
          {
            title: 'Push an update',
            body: 'Change button radius in A. B gets update notification. Accept and verify instances.',
            doThis: 'Change one token. Publish. Accept update in B. Screenshot before/after.',
          },
          {
            title: 'Documentation frame',
            body: 'Usage, anatomy, do/don’t for button and input on Components page.',
            doThis: 'Add documentation section for 2 components.',
          },
        ],
        checklist: ['Two-file library flow works', 'Update accepted in consumer file', '2 component docs'],
        practice: {
          title: 'Simulated team change',
          brief: 'Partner renames a variable — you merge update and fix broken bindings.',
        },
        resources: [
          r('doc', 'Figma — Team libraries', 'https://help.figma.com/hc/en-us/articles/360041003114', 'EN'),
        ],
      }),

      ch({
        id: 'fig-prototype',
        phase: 'C · Systems',
        level: 'intermediate',
        title: 'Prototyping flows',
        minutes: 40,
        durationLabel: 'Week 2',
        overview:
          'Prototype to communicate — not to impress. Link login → home, error states, simple overlay. Smart animate optional.',
        learn: ['Connections', 'Interaction details', 'Overlays', 'Flow starting points'],
        steps: [
          {
            title: 'Happy path',
            body: 'Login button → navigate to home. Use dissolve or smart animate 200ms.',
            doThis: 'Prototype login → home. Set flow start on login.',
          },
          {
            title: 'Error path',
            body: 'Invalid login → error variant on input + toast or inline message.',
            doThis: 'Add second connection for error demo on prototype.',
          },
          {
            title: 'Share for feedback',
            body: 'Prototype link for stakeholders. Comments for async review.',
            doThis: 'Generate share link. Leave one comment on your own flow noting a friction point.',
          },
        ],
        checklist: ['Happy path prototype', 'Error state linked', 'Share link generated'],
        practice: {
          title: 'User test lite',
          brief: 'Ask one person to complete login in prototype. Note where they hesitate.',
        },
        resources: [
          r('doc', 'Figma — Prototyping', 'https://help.figma.com/hc/en-us/articles/360040328594', 'EN'),
        ],
      }),

      ch({
        id: 'fig-handoff',
        phase: 'C · Systems',
        level: 'advanced',
        title: 'Dev Mode & developer handoff',
        minutes: 50,
        durationLabel: 'Week 3',
        overview:
          'Developers need spacing, tokens, assets, and states — not pretty pictures. Dev Mode, specs, export rules, and annotation habits.',
        learn: ['Dev Mode inspection', 'CSS/iOS/Android code snippets', 'Export settings', 'Redlines & annotations'],
        steps: [
          {
            title: 'Dev Mode tour',
            body: 'Inspect spacing, copy CSS variables, download SVGs. Compare token names to your variables.',
            doThis: 'Developer hat: write down 5 CSS custom properties dev would create from your tokens.',
            code: '/* Example handoff mapping */\n:root {\n  --color-bg-default: #FAFAF8;\n  --color-text-primary: #1A1A1A;\n  --space-16: 16px;\n  --radius-md: 8px;\n}',
          },
          {
            title: 'Export hygiene',
            body: 'Icons @1x SVG. Images @2x PNG if raster. Name files button-primary-default.svg.',
            doThis: 'Export icon set (3 icons) with consistent naming.',
          },
          {
            title: 'Annotate a11y',
            body: 'Note focus order, aria labels for icon-only buttons, contrast on primary CTA.',
            doThis: 'Annotation layer on login: tab order 1–4, label for password toggle.',
          },
        ],
        checklist: ['5 CSS vars mapped', '3 SVGs exported', 'A11y annotations on one screen'],
        practice: {
          title: 'Handoff packet',
          brief: 'One-page PDF or Notion: tokens, component list, prototype link, open questions for eng.',
        },
        resources: [
          r('doc', 'Figma — Dev Mode', 'https://help.figma.com/hc/en-us/articles/15023124644247', 'EN'),
          r('tool', 'Stark — contrast in Figma', 'https://www.getstark.co/', 'EN'),
        ],
      }),

      ch({
        id: 'fig-cp-b',
        kind: 'checkpoint',
        phase: 'C · Systems',
        level: 'advanced',
        title: 'Checkpoint B — Job-ready Figma portfolio',
        minutes: 35,
        durationLabel: 'Gate · Week 3',
        overview:
          'Prove you can operate like a junior product designer: system file, app file, prototype, handoff doc.',
        learn: ['Interview demo checklist'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Record 5-min Loom walking through all items.',
            items: [
              'Published library with button + input variants',
              'Variables with light/dark modes',
              'Consumer file with 2+ screens',
              'Working prototype (happy + error path)',
              'Handoff doc or Dev Mode annotations',
            ],
          },
        ],
        checklist: ['All criteria met', '5-min walkthrough recorded'],
        practice: {
          title: 'Interview drill',
          brief: 'Explain “how you’d add a new button size” without opening Figma — then demo live.',
        },
      }),

      ch({
        id: 'fig-reference',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Shortcuts, plugins & interview topics',
        minutes: 15,
        overview: 'Quick reference for daily Figma work and common interview questions.',
        learn: ['Keyboard shortcuts', 'Useful plugins', 'Interview prompts'],
        steps: [
          {
            title: 'Shortcuts',
            items: [
              'Shift+A — Auto Layout',
              'Cmd+Option+K — Create component',
              'Cmd+Option+B — Detach instance',
              'Option+drag — measure distance',
              'Cmd+/ — search actions',
            ],
          },
          {
            title: 'Plugins (optional)',
            items: [
              'Stark — contrast',
              'Unsplash — placeholders',
              'Content Reel — realistic copy',
              'Tokens Studio — token export',
            ],
          },
          {
            title: 'Interview questions',
            items: [
              'Difference between styles and variables?',
              'When use variants vs separate components?',
              'How do you hand off to developers?',
              'How handle design system updates across files?',
            ],
          },
        ],
        checklist: ['Shortcuts practiced once'],
      }),
    ],
    resources: {
      docs: [
        { name: 'Figma Academy', url: 'https://www.figma.com/academy/' },
        { name: 'Figma Best Practices', url: 'https://www.figma.com/best-practices/' },
        { name: 'Figma Help Center', url: 'https://help.figma.com/' },
        { name: 'Dev Mode Guide', url: 'https://help.figma.com/hc/en-us/articles/15023124644247' },
      ],
      tools: ['Figma', 'FigJam', 'Phosphor Icons', 'Stark', 'Tokens Studio'],
      books: ['Refactoring UI (Wathan & Schoger)'],
      practice: [
        'Rebuild a familiar app screen from memory',
        'Copy one screen from Mobbin — reverse engineer with Auto Layout',
        'Publish a mini library to Community (optional)',
      ],
      videos: [
        { name: 'Figma (YouTube)', url: 'https://www.youtube.com/@Figma' },
        { name: 'DesignCourse — Figma', url: 'https://www.youtube.com/c/DesignCourse' },
      ],
    },
  },

  {
    id: 'uiux',
    title: 'UI/UX Foundations',
    tagline: 'Make interfaces usable — research light, flows clear, friction low.',
    category: 'design',
    accent: '#9A3412',
    cover: 'covers/uiux-cover.png',
    duration: '4–6 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Builders, designers, and QA who want products people can actually finish tasks in.',
    outcomes: [
      'Frame problems with Jobs to Be Done and map user flows',
      'Evaluate interfaces with heuristics and lightweight usability tests',
      'Design IA, UI states, and accessible patterns that hold up in review',
    ],
    chapters: [
      ch({
        id: 'ux-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this UX path',
        minutes: 20,
        overview:
          'UX is evidence over taste. This path: JTBD → flows → heuristics → tests → IA → states → a11y. Pick one app to analyze all 6 weeks — consistency beats novelty.',
        learn: ['Pick a subject app', 'Evidence notebook habit', '4–6 week map'],
        steps: [
          {
            title: 'Choose subject app',
            body: 'Real app you use weekly: banking, food delivery, learning platform. You will map, test, and redesign parts of it.',
            doThis: 'Create FigJam or Notion “UX Evidence Notebook”. Paste app name and primary job users hire it for.',
          },
          {
            title: 'Rules',
            body: 'Never say “I don’t like it.” Say “User may not see X because Y.” Test with 3 people minimum before calling a redesign done.',
            doThis: 'Write 3 rules in notebook header.',
            items: [
              'Observations ≠ solutions (capture both separately)',
              'Test the design, not the person',
              'Fix the worst friction first — not the prettiest screen',
            ],
          },
        ],
        checklist: ['Subject app chosen', 'Evidence notebook created', 'Week map skimmed'],
        practice: {
          title: 'First observation',
          brief: 'Use app for 10 min. Log 5 observations — no solutions yet.',
        },
      }),

      ch({
        id: 'ux-jtbd',
        phase: 'A · Understand',
        level: 'beginner',
        title: 'Jobs to Be Done',
        minutes: 40,
        durationLabel: 'Week 1',
        overview:
          'Users hire products to make progress. JTBD frames motivation: “When ___, I want to ___, so I can ___.” Better than persona fiction for beginners.',
        learn: ['JTBD format', 'Main job vs related jobs', 'Competing with non-app alternatives'],
        steps: [
          {
            title: 'Write 3 jobs',
            body: 'One functional, one emotional, one social if applicable.',
            doThis: 'For subject app, write 3 JTBD statements.',
            code: 'When I finish work hungry,\nI want to order food quickly,\nso I can eat without cooking.',
          },
          {
            title: 'Forces diagram (lite)',
            body: 'Push: pain with status quo. Pull: appeal of new. Anxiety: fear of change. Habit: inertia.',
            doThis: 'List 2 items per force for switching to / from your app.',
          },
          {
            title: 'Non-app competition',
            body: 'Sometimes “call the restaurant” or “spreadsheet” is the real competitor.',
            doThis: 'Name 2 non-digital alternatives users might choose instead.',
          },
        ],
        checklist: ['3 JTBD statements', 'Forces diagram', '2 non-app competitors noted'],
        practice: {
          title: 'Interview lite',
          brief: 'Ask one friend their last time doing the job — not about your app features.',
        },
        resources: [
          r('book', 'Jobs to Be Done — Intercom summary', 'https://www.intercom.com/blog/jobs-to-be-done', 'EN'),
          r('doc', 'Laws of UX', 'https://lawsofux.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ux-flows',
        phase: 'A · Understand',
        level: 'beginner',
        title: 'User flows & friction mapping',
        minutes: 45,
        durationLabel: 'Week 1',
        overview:
          'Map the happy path and sad paths. Boxes and arrows expose drop-off risks before pixels.',
        learn: ['Flow notation', 'Happy vs edge paths', 'Friction scoring', 'Time-on-task intuition'],
        steps: [
          {
            title: 'Happy path',
            body: 'Start → key steps → success outcome. One primary job only.',
            doThis: 'Map signup → first value for subject app in FigJam.',
          },
          {
            title: 'Sad paths',
            body: 'Error, empty, timeout, permission denied, payment fail.',
            doThis: 'Add 3 sad path branches to your flow.',
          },
          {
            title: 'Friction score',
            body: 'Rate each step 1–5 friction (5 = worst). Fix lowest-scoring step first in later chapters.',
            doThis: 'Score every step. Circle the worst two.',
          },
        ],
        checklist: ['Happy path mapped', '3 sad paths added', 'Friction scores assigned'],
        practice: {
          title: 'Timed task',
          brief: 'Time yourself completing happy path. Note every hesitation >3 seconds.',
        },
        resources: [
          r('book', "Don't Make Me Think — Steve Krug", 'https://sensible.com/dont-make-me-think/', 'EN'),
          r('tool', 'FigJam', 'https://www.figma.com/figjam/', 'EN'),
        ],
      }),

      ch({
        id: 'ux-heuristics',
        phase: 'B · Evaluate',
        level: 'intermediate',
        title: 'Usability heuristics in practice',
        minutes: 50,
        durationLabel: 'Week 2',
        overview:
          'Nielsen’s 10 heuristics are a structured critique lens. Score flows, prioritize fixes, avoid “redesign everything” paralysis.',
        learn: ['10 heuristics (practical subset)', 'Severity rating', 'Heuristic walkthrough'],
        steps: [
          {
            title: 'Heuristic pass',
            body: 'Focus on: visibility of status, match to real world, user control, consistency, error prevention.',
            doThis: 'Rate your app’s happy path 1–5 on 5 heuristics. Document one violation each.',
            items: [
              'Visibility of system status',
              'Match between system and real world',
              'User control and freedom',
              'Consistency and standards',
              'Error prevention',
            ],
          },
          {
            title: 'Severity 0–4',
            body: '0 cosmetic → 4 catastrophic. Fix 3–4 before 1–2.',
            doThis: 'Assign severity to each violation. Pick top 2 to fix this week.',
          },
          {
            title: 'Quick fix sketch',
            body: 'Low-fi before hi-fi. Paper or FigJam.',
            doThis: 'Sketch fix for highest-severity issue.',
          },
        ],
        checklist: ['5 heuristic scores', 'Severity on each violation', 'Fix sketch for #1 issue'],
        practice: {
          title: 'Government site audit',
          brief: 'Heuristic pass on any .gov site — practice cruelty with compassion.',
        },
        resources: [
          r('doc', 'NN/g — 10 Usability Heuristics', 'https://www.nngroup.com/articles/ten-usability-heuristics/', 'EN'),
          r('doc', 'Laws of UX — Heuristics', 'https://lawsofux.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ux-testing',
        phase: 'B · Evaluate',
        level: 'intermediate',
        title: 'Lightweight usability testing',
        minutes: 50,
        durationLabel: 'Week 2–3',
        overview:
          '3–5 users find most glaring issues. Task-based, think-aloud optional, you stay quiet. Notes → prioritized changes.',
        learn: ['Test script', 'Recruiting lite', 'Note-taking', 'Synthesis → backlog'],
        steps: [
          {
            title: 'Write test script',
            body: 'Welcome, tasks (3 max), post questions. No leading questions.',
            doThis: 'Script with 2 tasks for your subject app flow.',
            code: 'Task 1: You want to [job]. Start from home. Talk aloud.\nTask 2: Handle [error scenario].\n\nPost: What was confusing? What would you change?',
          },
          {
            title: 'Run 3 sessions',
            body: '15 minutes each. Screen record if permitted. Same tasks for all.',
            doThis: 'Complete 3 tests. Capture quotes verbatim.',
            tip: 'You’re testing the design, not the person.',
          },
          {
            title: 'Affinity lite',
            body: 'Group observations: confusion, delight, blocker. Count frequency.',
            doThis: 'Sticky notes by theme. Top 3 issues become redesign backlog.',
          },
        ],
        checklist: ['Script written', '3 tests completed', 'Top 3 issues synthesized'],
        practice: {
          title: 'Before/after',
          brief: 'Redesign one step from test findings. Run 1 confirmatory test.',
        },
        resources: [
          r('doc', 'NN/g — Running a Usability Test', 'https://www.nngroup.com/articles/usability-testing-101/', 'EN'),
          r('tool', 'Maze (optional remote)', 'https://maze.co/', 'EN'),
        ],
      }),

      ch({
        id: 'ux-cp-a',
        kind: 'checkpoint',
        phase: 'B · Evaluate',
        level: 'intermediate',
        title: 'Checkpoint A — Evidence pack',
        minutes: 30,
        durationLabel: 'Gate · Week 3',
        overview: 'Prove problem understanding before IA and UI work.',
        learn: ['Evidence completeness'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Bundle in notebook or PDF.',
            items: [
              '3+ JTBD statements',
              'Flow with happy + sad paths',
              'Heuristic evaluation with severities',
              '3 usability tests with synthesis',
              'Prioritized backlog (≥5 items)',
            ],
          },
        ],
        checklist: ['Evidence pack complete'],
      }),

      ch({
        id: 'ux-ia',
        phase: 'C · Structure',
        level: 'intermediate',
        title: 'Information architecture',
        minutes: 45,
        durationLabel: 'Week 3–4',
        overview:
          'Labeling, grouping, navigation depth. Card sort lite and sitemap for your subject app problem area.',
        learn: ['Sitemap', 'Card sort (lite)', 'Navigation patterns', 'Label clarity'],
        steps: [
          {
            title: 'Current IA audit',
            body: 'List top-level nav items. Map depth to any task from your flow.',
            doThis: 'Sitemap of subject app (main areas only). Mark where your job lives (clicks deep?).',
          },
          {
            title: 'Card sort lite',
            body: 'Write 12 content/feature labels on cards. Ask 2 people to group. Look for mismatches with your app.',
            doThis: 'Run card sort with 2 participants. Photo results.',
          },
          {
            title: 'Proposed IA fix',
            body: 'One change max for learning — merge tabs, rename label, flatten depth.',
            doThis: 'Revised sitemap with one IA improvement justified by card sort or tests.',
          },
        ],
        checklist: ['Current sitemap', 'Card sort with 2 people', 'One IA improvement proposed'],
        practice: {
          title: 'Tree test (optional)',
          brief: 'Use Optimal Workshop tree test free tier OR ask “where would you find X?” on paper.',
        },
        resources: [
          r('doc', 'NN/g — IA Basics', 'https://www.nngroup.com/articles/ia-vs-navigation/', 'EN'),
          r('book', 'Information Architecture — Rosenfeld (skim)', 'https://www.usability.gov/how-to-and-tools/methods/information-architecture.html', 'EN'),
        ],
      }),

      ch({
        id: 'ux-wire-ui',
        phase: 'C · Structure',
        level: 'intermediate',
        title: 'Wireframes to UI',
        minutes: 45,
        durationLabel: 'Week 4',
        overview:
          'Low-fi → mid-fi → UI. Match mental models. Apply existing design system or simple type/color from Graphic Design path.',
        learn: ['Wireframe fidelity', 'Content priority', 'UI patterns catalog', 'Consistency with platform'],
        steps: [
          {
            title: 'Low-fi wireframe',
            body: 'Boxes and labels only for worst friction step from backlog.',
            doThis: 'Paper or FigJam wireframe — 1 screen, 10 min max.',
          },
          {
            title: 'Mid-fi in Figma',
            body: 'Real copy (no lorem), real hierarchy, gray boxes OK.',
            doThis: 'Mid-fi for same screen in Figma.',
          },
          {
            title: 'UI polish pass',
            body: 'Apply type, color, spacing. One primary action per screen.',
            doThis: 'Hi-fi version OR annotate what stays mid-fi for test.',
          },
        ],
        checklist: ['Low-fi + mid-fi done', 'Real copy used', 'One primary CTA clear'],
        practice: {
          title: 'Pattern library note',
          brief: 'List 5 UI patterns you reused (modal, toast, empty state, etc.) and from where.',
        },
        resources: [
          r('tool', 'Mobbin — pattern reference', 'https://mobbin.com/', 'EN'),
          r('doc', 'Material Design — Components', 'https://m3.material.io/components', 'EN'),
        ],
      }),

      ch({
        id: 'ux-states',
        phase: 'C · Structure',
        level: 'advanced',
        title: 'Empty, loading, error & success states',
        minutes: 45,
        durationLabel: 'Week 4–5',
        overview:
          'Production UI is mostly edge states. Design all four for one feature — reviewers notice missing error paths.',
        learn: ['Four state model', 'Skeleton vs spinner', 'Error copy that helps', 'Success confirmation'],
        steps: [
          {
            title: 'State inventory',
            body: 'For one list or form feature: default, loading, empty, error, success.',
            doThis: 'Table in notebook: state × user need × UI treatment.',
          },
          {
            title: 'Design four frames',
            body: 'Notifications list or order history — design loading, empty, error, success in Figma.',
            doThis: '4 Figma frames with consistent layout shell.',
          },
          {
            title: 'Error copy',
            body: 'Say what happened + what to do. No “Error 422”.',
            doThis: 'Rewrite 2 error messages from your app into human copy.',
            code: 'Bad: "Something went wrong."\nGood: "Payment didn\'t go through. Check card number or try another card."',
          },
        ],
        checklist: ['State inventory table', '4 frames designed', '2 error messages rewritten'],
        practice: {
          title: 'Trigger states',
          brief: 'Use DevTools network throttle or airplane mode to screenshot real app states — compare to yours.',
        },
        resources: [
          r('doc', 'NN/g — Empty State Design', 'https://www.nngroup.com/articles/empty-state-interface-design/', 'EN'),
        ],
      }),

      ch({
        id: 'ux-a11y',
        phase: 'D · Ship quality',
        level: 'advanced',
        title: 'Accessibility as UX',
        minutes: 50,
        durationLabel: 'Week 5',
        overview:
          'Accessibility is usability for everyone — and a hiring signal. Keyboard, contrast, labels, focus order on your redesigned screen.',
        learn: ['WCAG AA basics', 'Keyboard navigation', 'Screen reader labels', 'Focus management'],
        steps: [
          {
            title: 'Keyboard pass',
            body: 'Tab through your app flow. Can you complete the job without a mouse?',
            doThis: 'Keyboard-only test on subject app. Log blockers.',
          },
          {
            title: 'Contrast & touch targets',
            body: 'Text 4.5:1, large text 3:1. Touch targets ~44×44px minimum.',
            doThis: 'Audit your hi-fi screen with Stark or WebAIM.',
          },
          {
            title: 'Annotate for dev',
            body: 'Focus order numbers, aria-label for icon buttons, heading hierarchy.',
            doThis: 'Annotation layer on Figma redesign.',
          },
        ],
        checklist: ['Keyboard audit done', 'Contrast passes on hi-fi', 'Focus order annotated'],
        practice: {
          title: 'VoiceOver / NVDA lite',
          brief: '5-min screen reader pass on one flow. Note unlabeled controls.',
        },
        resources: [
          r('doc', 'WCAG 2.2 Quick Reference', 'https://www.w3.org/WAI/WCAG22/quickref/', 'EN'),
          r('doc', 'WebAIM — Keyboard Accessibility', 'https://webaim.org/techniques/keyboard/', 'EN'),
          r('tool', 'axe DevTools', 'https://www.deque.com/axe/devtools/', 'EN'),
        ],
      }),

      ch({
        id: 'ux-critique',
        phase: 'D · Ship quality',
        level: 'advanced',
        title: 'Design critique & stakeholder communication',
        minutes: 40,
        durationLabel: 'Week 5–6',
        overview:
          'Present flows with evidence. Receive critique without defensiveness. Write concise PRDs or one-pagers eng can use.',
        learn: ['Critique format', 'Presenting tradeoffs', 'One-pager structure'],
        steps: [
          {
            title: 'Present with evidence',
            body: 'Problem → test quote → proposed change → expected outcome. 5 slides max.',
            doThis: 'Build 5-slide deck for your redesign.',
          },
          {
            title: 'Critique session',
            body: 'Feedback on work, not person. Capture “consider” vs “must fix”.',
            doThis: 'Run 20-min critique with peer. Document decisions.',
          },
          {
            title: 'One-pager for eng',
            body: 'Scope, states, a11y notes, open questions, out of scope.',
            doThis: 'Write one-pager markdown for your redesign.',
          },
        ],
        checklist: ['5-slide deck', 'Critique notes captured', 'Eng one-pager written'],
        practice: {
          title: 'Mock review',
          brief: 'Explain your IA change to someone non-design in 2 minutes.',
        },
        resources: [
          r('doc', 'Basecamp — Shape Up (pitch format)', 'https://basecamp.com/shapeup', 'EN'),
        ],
      }),

      ch({
        id: 'ux-cp-b',
        kind: 'checkpoint',
        phase: 'D · Ship quality',
        level: 'advanced',
        title: 'Checkpoint B — UX case study ready',
        minutes: 40,
        durationLabel: 'Gate · Week 6',
        overview:
          'Job-ready UX portfolio piece: problem, evidence, solution, states, a11y — not just pretty screens.',
        learn: ['UX portfolio criteria'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Publish or export case study.',
            items: [
              'JTBD + flow + test synthesis in case study',
              'Before/after or clear problem screen',
              'Hi-fi with 4 states for one feature',
              'A11y annotations or audit summary',
              '5-min presentation recorded',
            ],
          },
        ],
        checklist: ['Case study live', 'Presentation recorded'],
        practice: {
          title: 'Apply UX lens elsewhere',
          brief: 'Heuristic pass on a different product — 30 min — to prove transferable skill.',
        },
      }),

      ch({
        id: 'ux-reference',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Timeline & method cheat sheet',
        minutes: 15,
        overview: 'Return here when lost. Week map + methods at a glance.',
        learn: ['6-week map', 'Method picker'],
        steps: [
          {
            title: 'Week map',
            items: [
              'Week 1 — JTBD + flows',
              'Week 2 — Heuristics + testing start',
              'Week 3 — Checkpoint A + IA',
              'Week 4 — Wireframes + states',
              'Week 5 — A11y + critique',
              'Week 6 — Checkpoint B + case study',
            ],
          },
          {
            title: 'Which method when',
            items: [
              'JTBD — why users show up',
              'Flow map — where they get stuck',
              'Heuristic — fast expert review',
              'Usability test — validate with real users',
              'Card sort — labeling/grouping',
              'A11y audit — ship quality',
            ],
          },
        ],
        checklist: ['Bookmark this chapter'],
      }),
    ],
    resources: {
      docs: [
        { name: 'Laws of UX', url: 'https://lawsofux.com/' },
        { name: 'NN/g Articles', url: 'https://www.nngroup.com/articles/' },
        { name: 'WCAG 2.2 Quickref', url: 'https://www.w3.org/WAI/WCAG22/quickref/' },
        { name: 'Usability.gov Methods', url: 'https://www.usability.gov/how-to-and-tools/methods/index.html' },
      ],
      tools: ['Figma', 'FigJam', 'Maze / Useberry (optional)', 'Stark', 'Mobbin'],
      books: [
        "Don't Make Me Think (Krug)",
        'About Face (Cooper) — skim',
        'The Design of Everyday Things (Norman) — skim',
      ],
      practice: [
        'Heuristic audit of a government website',
        'Weekly 15-min usability test on any app',
        'Redesign one flow from Mobbin case',
      ],
      videos: [
        { name: 'NN/g (YouTube)', url: 'https://www.youtube.com/user/NNGroup' },
        { name: 'AJ&Smart — Design Sprint', url: 'https://www.youtube.com/c/AJSmart' },
      ],
    },
  },
]
