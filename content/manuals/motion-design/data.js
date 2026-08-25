/** Chapter body for /manuals/motion-design. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "motion-design",
  "title": "Motion for Product",
  "tagline": "Hierarchy, easing, micro-interactions — and knowing when NOT to animate.",
  "category": "design",
  "accent": "#B45309",
  "cover": "covers/uiux-cover.png",
  "duration": "3–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "Product designers and front-end folks who want motion that clarifies, not distracts.",
  "outcomes": [
    "Use motion to show hierarchy, continuity, and feedback",
    "Choose easing and duration with intention",
    "Cut animation that harms usability or performance"
  ],
  "chapters": [
    {
      "id": "mo-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "durationLabel": "Day 0",
      "overview": "Product motion is functional: it explains state change. You will critique real apps, prototype in Figma or CSS, and write a “when not to animate” checklist.",
      "learn": [
        "Functional motion",
        "Tooling",
        "Accessibility baseline"
      ],
      "steps": [
        {
          "title": "Setup",
          "body": "Figma Smart Animate and/or CSS transitions. Prefer one stack for practice.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create a Figma file “Motion Lab” with 3 blank frames for experiments.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Motion Lab file created"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Material Design — Motion",
          "url": "https://m3.material.io/styles/motion/overview",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Apple HIG — Motion",
          "url": "https://developer.apple.com/design/human-interface-guidelines/motion",
          "lang": "EN",
          "free": true
        }
      ],
      "parentId": null,
      "overviewText": "Product motion is functional: it explains state change. You will critique real apps, prototype in Figma or CSS, and write a “when not to animate” checklist.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mo-purpose",
      "phase": "A · Principles",
      "level": "beginner",
      "title": "Why motion exists in product UI",
      "minutes": 30,
      "durationLabel": "Week 1",
      "overview": "Orient, continuity, feedback, delight (last). If it doesn’t serve one of the first three, question it.",
      "learn": [
        "Four jobs of motion",
        "State change storytelling"
      ],
      "steps": [
        {
          "title": "Audit an app",
          "body": "Pick an app you use daily. Capture 5 animations. Label their job.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Table: animation → job → helpful/noise.",
          "tip": "Delight without clarity is decoration tax.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Five animations labeled"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Orient, continuity, feedback, delight (last). If it doesn’t serve one of the first three, question it.",
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
      "id": "mo-hierarchy",
      "phase": "A · Principles",
      "level": "beginner",
      "title": "Hierarchy & choreography",
      "minutes": 35,
      "overview": "What moves first matters. Stagger with purpose. Shared-element transitions beat unrelated fades.",
      "learn": [
        "Enter/exit",
        "Shared elements",
        "Stagger"
      ],
      "steps": [
        {
          "title": "Choreograph a list",
          "body": "Parent moves, then children — or the reverse if focusing detail.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Prototype a list → detail transition with one shared element.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "List→detail prototype"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "Material — Transitions",
          "url": "https://m3.material.io/styles/motion/transitions/overview",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "What moves first matters. Stagger with purpose. Shared-element transitions beat unrelated fades.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mo-easing",
      "phase": "A · Principles",
      "level": "intermediate",
      "title": "Timing, easing, duration",
      "minutes": 35,
      "overview": "Duration ~150–300ms for most UI. Ease-out for enters, ease-in for exits (common pattern). Linear feels mechanical; bounce is usually wrong for productivity UI.",
      "learn": [
        "Duration ranges",
        "Easing curves",
        "Spring caution"
      ],
      "steps": [
        {
          "title": "Same motion, three easings",
          "body": "Compare linear, ease-out, overshoot on a drawer.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record or screenshot the three. Pick one and justify in one sentence.",
          "tip": null,
          "code": "/* typical product defaults */\n.enter { transition: transform 200ms ease-out, opacity 150ms ease-out; }\n.exit  { transition: transform 150ms ease-in,  opacity 100ms ease-in; }",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three-easing comparison done"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "web.dev — Animation",
          "url": "https://web.dev/articles/animations-overview",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "Easing functions cheat sheet",
          "url": "https://easings.net/",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Duration ~150–300ms for most UI. Ease-out for enters, ease-in for exits (common pattern). Linear feels mechanical; bounce is usually wrong for productivity UI.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mo-micro",
      "phase": "B · Patterns",
      "level": "intermediate",
      "title": "Micro-interactions",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "Buttons, toggles, toasts, pull-to-refresh. Feedback should be immediate and proportional. Don’t animate every hover.",
      "learn": [
        "Feedback loops",
        "Loading states",
        "Error motion"
      ],
      "steps": [
        {
          "title": "Design three micros",
          "body": "Toggle, successful save, failed save.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Prototype all three. Ensure failure is clearer than success.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Pressed/active state within 100ms feel",
            "Success confirmation not longer than needed",
            "Error draws attention without panic strobe"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Three micro-interactions prototyped"
      ],
      "resources": [
        {
          "type": "book",
          "name": "Microinteractions (Saffer) overview",
          "url": "https://microinteractions.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Buttons, toggles, toasts, pull-to-refresh. Feedback should be immediate and proportional. Don’t animate every hover.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mo-a11y",
      "phase": "B · Patterns",
      "level": "intermediate",
      "title": "Accessibility & performance",
      "minutes": 30,
      "overview": "prefers-reduced-motion is mandatory. Vestibular triggers (large zooms, parallax) can harm. Prefer transform/opacity for perf.",
      "learn": [
        "Reduced motion",
        "Vestibular safety",
        "Compositor-friendly props"
      ],
      "steps": [
        {
          "title": "Respect reduced motion",
          "body": "Replace motion with instant state or simplified fade.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add a reduced-motion variant to one prototype or CSS snippet.",
          "tip": null,
          "code": "@media (prefers-reduced-motion: reduce) {\n  * {\n    animation: none !important;\n    transition: none !important;\n  }\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Reduced-motion path implemented"
      ],
      "resources": [
        {
          "type": "doc",
          "name": "MDN — prefers-reduced-motion",
          "url": "https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "WCAG — Animation from interactions",
          "url": "https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html",
          "lang": "EN",
          "free": true
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "prefers-reduced-motion is mandatory. Vestibular triggers (large zooms, parallax) can harm. Prefer transform/opacity for perf.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mo-cp1",
      "kind": "checkpoint",
      "phase": "B · Patterns",
      "level": "intermediate",
      "title": "Checkpoint: motion critique + fix",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Critique one product flow’s motion; propose and prototype a clearer version.",
      "learn": [
        "Before/after"
      ],
      "steps": [
        {
          "title": "Ship critique",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "1-pager + prototype. Peer rates clarity 1–5.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Critique + prototype",
        "Peer score captured"
      ],
      "parentId": null,
      "overviewText": "Critique one product flow’s motion; propose and prototype a clearer version.",
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
      "id": "mo-dont",
      "phase": "C · Judgment",
      "level": "advanced",
      "title": "When NOT to animate",
      "minutes": 30,
      "durationLabel": "Week 3",
      "overview": "Dense data, urgent errors, reduced-motion users, low-end devices, rapid repetitive actions — stillness can be the feature.",
      "learn": [
        "Kill criteria",
        "Motion budget"
      ],
      "steps": [
        {
          "title": "Don’t-animate checklist",
          "body": "Write team rules. Examples: no animation on table sort for >100 rows; no page-wide parallax.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish a 8–10 line checklist. Apply it to kill one existing animation.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Checklist published",
        "One animation removed"
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Dense data, urgent errors, reduced-motion users, low-end devices, rapid repetitive actions — stillness can be the feature.",
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
      "id": "mo-cp2",
      "kind": "checkpoint",
      "phase": "C · Judgment",
      "level": "advanced",
      "title": "Checkpoint: motion guidelines",
      "minutes": 45,
      "durationLabel": "Capstone",
      "overview": "A short motion guideline for your product: purposes, durations, easing, a11y, don’ts, examples.",
      "learn": [
        "Systematizing"
      ],
      "steps": [
        {
          "title": "Guidelines doc",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Include 2 good examples and 2 anti-examples with rationale.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Purpose principles",
            "Duration/easing tokens",
            "Micro-interaction patterns",
            "Reduced motion",
            "Don’t-animate list"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Guidelines published"
      ],
      "note": "Pace: 3–4 weeks. Clarity over spectacle.",
      "parentId": null,
      "overviewText": "A short motion guideline for your product: purposes, durations, easing, a11y, don’ts, examples.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "Material 3 Motion",
        "url": "https://m3.material.io/styles/motion/overview"
      },
      {
        "name": "Apple HIG Motion",
        "url": "https://developer.apple.com/design/human-interface-guidelines/motion"
      },
      {
        "name": "web.dev animations",
        "url": "https://web.dev/articles/animations-overview"
      }
    ],
    "tools": [
      "Figma Smart Animate",
      "easings.net",
      "CSS / Motion One / Framer Motion",
      "Browser reduced-motion setting"
    ],
    "books": [
      "Microinteractions (Saffer)",
      "The Animators Survival Kit — selective for timing feel"
    ],
    "practice": [
      "Weekly motion audit of one app",
      "Ship one reduced-motion path"
    ],
    "videos": [
      {
        "name": "Google Material motion talks",
        "url": "https://m3.material.io/styles/motion/overview"
      }
    ]
  }
};
