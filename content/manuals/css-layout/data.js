/** Chapter body for /manuals/css-layout. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "css-layout",
  "title": "CSS Layout",
  "tagline": "Flexbox, Grid, and responsive layouts that don’t fight you.",
  "category": "design",
  "accent": "#7C3AED",
  "cover": "covers/uiux-cover.png",
  "duration": "2–5 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "Anyone shipping UI who still guesses at centering.",
  "outcomes": [
    "Flex and Grid confidently",
    "Responsive without panic",
    "Debug layout with DevTools"
  ],
  "pace": {
    "hoursPerDay": "45–90 min/day",
    "recommended": "~3–5 weeks",
    "accelerated": "~2 weeks",
    "slow": "~6–8 weeks"
  },
  "chapters": [
    {
      "id": "css-box",
      "phase": "Start",
      "level": "beginner",
      "title": "Box model & flow",
      "minutes": 30,
      "overview": "Margin, border, padding, content — and normal flow.",
      "learn": [
        "Box model",
        "display",
        "DevTools"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Every element is a box. box-sizing: border-box makes sizes predictable.",
          "learnMore": "Normal flow stacks block elements; inline sits in lines.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/The_box_model",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "border-box includes…",
            "options": [
              "Only content",
              "Padding and border in the width",
              "Only margin",
              "JavaScript"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Box model.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Inspect three elements and sketch their boxes on paper.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "# Box model\n# try one small experiment",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Box model.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "You use border-box globally"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Margin, border, padding, content — and normal flow.",
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
      "id": "css-flex",
      "phase": "Core",
      "level": "beginner",
      "title": "Flexbox",
      "minutes": 40,
      "overview": "One-dimensional layouts: rows and columns that distribute space.",
      "learn": [
        "justify/align",
        "gap",
        "flex"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "flex container controls direction and distribution; items can grow/shrink.",
          "learnMore": "gap beats margin hacks for spacing between siblings.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://css-tricks.com/snippets/css/a-guide-to-flexbox/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Main axis is controlled by…",
            "options": [
              "align-items",
              "justify-content (with flex-direction)",
              "z-index",
              "float"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Flexbox.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Rebuild a nav and a card row with flex only.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": ".row { display: flex; gap: 1rem; justify-content: space-between; }",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Flexbox.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Nav + card row without floats"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "One-dimensional layouts: rows and columns that distribute space.",
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
      "id": "css-grid",
      "phase": "Core",
      "level": "intermediate",
      "title": "CSS Grid",
      "minutes": 45,
      "overview": "Two-dimensional layouts for pages and dashboards.",
      "learn": [
        "tracks",
        "areas",
        "minmax"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Grid defines rows and columns. Place items by line or area names.",
          "learnMore": "minmax(0, 1fr) prevents stubborn overflow in nested grids.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://css-tricks.com/snippets/css/complete-guide-grid/",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "fr units represent…",
            "options": [
              "Fixed pixels only",
              "Fractions of free space",
              "Font size",
              "Flex only"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Grid.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Build a header/main/sidebar layout with grid-template-areas.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "grid-template-areas: \"header header\" \"side main\";",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Grid.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Holy grail layout works"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Two-dimensional layouts for pages and dashboards.",
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
    }
  ]
};
