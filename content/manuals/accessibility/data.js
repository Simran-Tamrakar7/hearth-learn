/** Chapter body for /manuals/accessibility. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "accessibility",
  "title": "Accessibility Testing",
  "tagline": "Ship products everyone can use — keyboard, screen reader, contrast, and judgment.",
  "category": "quality",
  "accent": "#0B3D2E",
  "cover": "covers/uiux-cover.png",
  "duration": "3–5 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "QA and builders who want a11y to be a skill, not a checklist afterthought.",
  "outcomes": [
    "Audit a page with keyboard + one screen reader pass",
    "Write bugs that cite WCAG success criteria",
    "Partner with design/dev on remediations that stick"
  ],
  "chapters": [
    {
      "id": "a11y-why",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "Why accessibility is quality",
      "minutes": 25,
      "overview": "Accessibility is not “extra.” It’s whether people can complete the job. Legal risk matters; dignity matters more. This chapter sets the mindset before tools.",
      "learn": [
        "Who is affected",
        "POUR principles",
        "How a11y bugs differ"
      ],
      "steps": [
        {
          "title": "Meet real barriers",
          "body": "Name four barriers: vision, hearing, motor, cognitive. Map each to a product failure you’ve seen (or imagine).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick your product. List one barrier a user would hit today.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "POUR as a compass",
          "body": "Perceivable, Operable, Understandable, Robust. Use it to sort findings instead of dumping “a11y issue.”",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite one vague bug title using a POUR lens.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "I can explain POUR in one sentence each",
        "One product barrier written down"
      ],
      "practice": {
        "title": "Barrier memo",
        "brief": "Half-page note: who is blocked, where, and what “done” looks like."
      },
      "links": [
        {
          "name": "W3C WAI Introduction",
          "url": "https://www.w3.org/WAI/fundamentals/accessibility-intro/",
          "kind": "doc"
        }
      ],
      "citations": [
        {
          "name": "WCAG 2 Overview",
          "url": "https://www.w3.org/WAI/standards-guidelines/wcag/"
        }
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Accessibility is not “extra.” It’s whether people can complete the job. Legal risk matters; dignity matters more. This chapter sets the mindset before tools.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "a11y-keyboard",
      "phase": "A · Core audits",
      "level": "beginner",
      "title": "Keyboard & focus",
      "minutes": 35,
      "overview": "If you can’t tab through it, assistive tech usually can’t either. Focus order and visible rings are non-negotiable.",
      "learn": [
        "Tab order",
        "Focus visibility",
        "Skip links & traps"
      ],
      "steps": [
        {
          "title": "Unplug the mouse",
          "body": "Complete a primary flow with keyboard only. Note traps, missing focus, and weird order.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record a 60-second Loom (or notes) of the keyboard path.",
          "tip": "Escape should close modals. Focus should return to the opener.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Primary flow done keyboard-only",
        "Focus ring visible on interactive controls"
      ],
      "practice": {
        "title": "Keyboard bug",
        "brief": "File one keyboard defect with steps, expected, and severity."
      },
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "If you can’t tab through it, assistive tech usually can’t either. Focus order and visible rings are non-negotiable.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "a11y-sr",
      "phase": "A · Core audits",
      "level": "intermediate",
      "title": "Screen reader pass",
      "minutes": 40,
      "overview": "One structured pass beats endless tooling. Learn landmarks, names, and announcements.",
      "learn": [
        "Landmarks & headings",
        "Accessible names",
        "Live regions"
      ],
      "steps": [
        {
          "title": "Headings as map",
          "body": "Navigate by heading. If the outline is chaos, content is chaos for SR users.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Dump the heading outline. Fix or file the worst gap.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One SR pass on a key page",
        "Accessible name verified on icon buttons"
      ],
      "links": [
        {
          "name": "ARIA Authoring Practices",
          "url": "https://www.w3.org/WAI/ARIA/apg/",
          "kind": "doc"
        }
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "One structured pass beats endless tooling. Learn landmarks, names, and announcements.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "a11y-tools",
      "phase": "B · Tools & criteria",
      "level": "intermediate",
      "title": "Automated + manual balance",
      "minutes": 30,
      "overview": "axe finds ~30–50% of issues. Manual judgment finds the rest. Use both without worshipping either.",
      "learn": [
        "What automation catches",
        "False confidence",
        "WCAG mapping"
      ],
      "steps": [
        {
          "title": "Run axe, then distrust it",
          "body": "Fix criticals. Then find one issue automation missed (focus, name quality, cognitive load).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Side-by-side: automation report vs your manual find.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "axe (or similar) run saved",
        "One manual-only finding documented"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "axe finds ~30–50% of issues. Manual judgment finds the rest. Use both without worshipping either.",
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
      "id": "a11y-cp",
      "kind": "checkpoint",
      "phase": "B · Tools & criteria",
      "level": "intermediate",
      "title": "Checkpoint: a11y audit",
      "minutes": 45,
      "durationLabel": "Gate",
      "overview": "Deliver a short audit of one flow: keyboard, one SR pass, contrast notes, and WCAG-tagged bugs.",
      "learn": [
        "Audit packaging",
        "Severity with impact"
      ],
      "steps": [
        {
          "title": "Ship the audit",
          "body": "2–4 pages max. Findings with criteria IDs. Top 3 remediations ranked by user impact.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish the audit in your notes or GitHub.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Keyboard + SR covered",
        "At least 3 findings with criteria",
        "Remediation order clear"
      ],
      "practice": {
        "title": "Audit deliverable",
        "brief": "Complete the checkpoint package and share with a peer for feedback."
      },
      "parentId": null,
      "overviewText": "Deliver a short audit of one flow: keyboard, one SR pass, contrast notes, and WCAG-tagged bugs.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "a11y-pro",
      "phase": "C · Pro habits",
      "level": "advanced",
      "title": "Shift-left with design & CI",
      "minutes": 35,
      "overview": "Catch issues in Figma reviews and PR checks. Make a11y a team rhythm, not a release panic.",
      "learn": [
        "Design crit prompts",
        "CI linting limits",
        "Regression habits"
      ],
      "steps": [
        {
          "title": "Add one gate",
          "body": "Pick: design checklist item, component story a11y addon, or CI axe on a key route.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Propose the gate in writing. Get one +1.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One shift-left gate proposed",
        "Regression note for future releases"
      ],
      "practice": {
        "title": "Team ritual",
        "brief": "Add a11y to your definition of done for the next sprint."
      },
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Catch issues in Figma reviews and PR checks. Make a11y a team rhythm, not a release panic.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "WCAG 2.2",
        "url": "https://www.w3.org/TR/WCAG22/"
      },
      {
        "name": "axe DevTools",
        "url": "https://www.deque.com/axe/devtools/"
      }
    ],
    "tools": [
      "axe DevTools",
      "VoiceOver / NVDA",
      "Colour Contrast Analyser"
    ],
    "books": [
      "Inclusive Design Patterns — Heydon Pickering"
    ],
    "practice": [
      "https://www.w3.org/WAI/demos/bad/"
    ],
    "videos": [
      {
        "name": "a11y project resources",
        "url": "https://www.a11yproject.com/"
      }
    ]
  }
};
