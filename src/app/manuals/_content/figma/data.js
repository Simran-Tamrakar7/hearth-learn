/** Chapter body for /manuals/figma. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "figma",
  "title": "Figma",
  "tagline": "Design, prototype, and hand off — the tool product teams live in.",
  "category": "design",
  "accent": "#A34A28",
  "cover": "covers/figma-cover.png",
  "duration": "2–3 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Beginners learning interface design, design systems, and developer handoff in a team context.",
  "outcomes": [
    "Build responsive screens with frames and Auto Layout",
    "Ship component libraries with variants and variables",
    "Prototype flows and hand off specs developers trust in Dev Mode"
  ],
  "chapters": [
    {
      "id": "fig-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this Figma path",
      "minutes": 20,
      "overview": "Figma is the industry default for product UI. This path goes frames → Auto Layout → components → variants → variables → libraries → handoff. Do every exercise in one “Figma Journey” file unless noted.",
      "learn": [
        "2–3 week pace",
        "File hygiene habits",
        "Keyboard shortcuts worth learning day 1"
      ],
      "steps": [
        {
          "title": "Pace",
          "body": "2–3 weeks at 1–2 hrs/day. Week 1: layout. Week 2: components + variables. Week 3: libraries + handoff.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Duplicate Figma Community “Simple Design System” file as reference — do not merge with your exercises yet.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "File hygiene",
          "body": "Pages: Cover, WIP, Components, Archive. Name layers. Future teammates will judge you on this.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create file with those 4 pages. Enable “Outline icons” and “Snap to geometry” in preferences.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Rename layers (no “Frame 427”)",
            "Use pages for separation",
            "Publish components only from Components page"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Journey file created",
        "4 pages set up",
        "Community reference saved"
      ],
      "practice": {
        "title": "Shortcut drill",
        "brief": "Practice 10 min: F (frame), R (rectangle), T (text), K (scale), Cmd+D (duplicate), Cmd+G (group), Shift+A (Auto Layout)."
      },
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Figma is the industry default for product UI. This path goes frames → Auto Layout → components → variants → variables → libraries → handoff. Do every exercise in one “Figma Journey” file unless noted.",
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
      "id": "fig-frames",
      "phase": "A · Layout",
      "level": "beginner",
      "title": "Frames, shapes & constraints",
      "minutes": 40,
      "durationLabel": "Days 1–2",
      "overview": "Frames are artboards — not groups. Constraints control resize behavior. Build a mobile login + home shell before Auto Layout.",
      "learn": [
        "Frames vs groups",
        "Constraints",
        "Device presets",
        "Layout grids on frames"
      ],
      "steps": [
        {
          "title": "Frame first",
          "body": "Always draw a frame (F) for screens. iPhone 14 preset is fine for mobile exercises.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Build login screen: logo area, 2 inputs, primary button, footer link. Use frames for each section.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Constraints preview",
          "body": "Pin elements left/right/center/scale. Test by resizing the frame.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pin header left+right, center logo, pin button bottom. Resize — nothing should float randomly.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Home shell",
          "body": "Tab bar or nav + content area + FAB optional. Same file, second frame.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Build home screen shell matching login width. Link visually (same header style).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Login + home frames",
        "Constraints tested on resize",
        "Layers named"
      ],
      "practice": {
        "title": "Tablet frame",
        "brief": "Duplicate mobile home to iPad frame. Adjust constraints — content should reflow sensibly."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Frames",
          "url": "https://help.figma.com/hc/en-us/articles/360041061214",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Figma Academy — Getting Started",
          "url": "https://www.figma.com/academy/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Frames are artboards — not groups. Constraints control resize behavior. Build a mobile login + home shell before Auto Layout.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-autolayout",
      "phase": "A · Layout",
      "level": "beginner",
      "title": "Auto Layout mastery",
      "minutes": 50,
      "durationLabel": "Days 3–5",
      "overview": "Auto Layout is how Figma layouts resize like CSS flexbox. Hug vs fill, padding, gaps, nested stacks — the skill that separates amateur from hireable.",
      "learn": [
        "Horizontal/vertical stacks",
        "Hug vs fill",
        "Padding & gap",
        "Nested Auto Layout",
        "Min/max width"
      ],
      "steps": [
        {
          "title": "First stack",
          "body": "Select elements → Shift+A. Direction, gap, padding. Hug contents on buttons; fill on inputs in a form.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rebuild login form as vertical Auto Layout: 16px gap, 24px padding.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Hug vs fill",
          "body": "Buttons hug. Inputs fill container width. Cards hug height but fill width in a list.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Build a card component: image, title, subtitle, CTA — all in nested stacks.",
          "tip": null,
          "code": "Typical card stack:\n[Vertical AL, gap 12, padding 16]\n  Image — fill width, fixed height\n  Title — hug\n  Subtitle — hug\n  Button row — horizontal AL, gap 8",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Responsive card list",
          "body": "Parent vertical stack of cards. Resize frame — cards stretch, internal spacing holds.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "3 cards in a scrollable frame. Resize from 320px to 400px width.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Login uses Auto Layout",
        "Card with nested stacks",
        "Resize test passed"
      ],
      "practice": {
        "title": "Pricing table",
        "brief": "3 pricing columns with Auto Layout. Collapse to single column under 600px width."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Auto Layout",
          "url": "https://help.figma.com/hc/en-us/articles/5731384053159",
          "lang": "EN",
          "free": true
        },
        {
          "type": "video",
          "name": "Figma — Auto Layout (YouTube)",
          "url": "https://www.youtube.com/@Figma",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Auto Layout is how Figma layouts resize like CSS flexbox. Hug vs fill, padding, gaps, nested stacks — the skill that separates amateur from hireable.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-styles",
      "phase": "A · Layout",
      "level": "beginner",
      "title": "Color, text & effect styles",
      "minutes": 35,
      "durationLabel": "Week 1",
      "overview": "Styles are the bridge to variables and design tokens. Centralize color and typography before component explosion.",
      "learn": [
        "Color styles",
        "Text styles",
        "Effect styles",
        "Style naming convention"
      ],
      "steps": [
        {
          "title": "Color styles",
          "body": "Name: color/bg/default, color/text/primary, color/brand/accent. Avoid hex in layer names.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create 6 color styles. Apply to login + home — zero detached hex on text fills.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Text styles",
          "body": "Map display, heading, body, caption. Include size, weight, line height.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "5 text styles applied across both screens.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Effect styles (lite)",
          "body": "Shadow/elevation for cards. One subtle shadow style beats five random drops.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add elevation/shadow style to card. Document in Components page.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "6 color styles",
        "5 text styles",
        "1 effect style on card"
      ],
      "practice": {
        "title": "Style swap",
        "brief": "Change brand accent color style once — confirm all screens update."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Styles",
          "url": "https://help.figma.com/hc/en-us/articles/360039832134",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Styles are the bridge to variables and design tokens. Centralize color and typography before component explosion.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-cp-a",
      "kind": "checkpoint",
      "phase": "A · Layout",
      "level": "beginner",
      "title": "Checkpoint A — Responsive screens",
      "minutes": 25,
      "durationLabel": "Gate · Week 1",
      "overview": "Pass before components: two screens, Auto Layout throughout, styles applied, resize-safe.",
      "learn": [
        "Layout gate criteria"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fix any failure before Phase B.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Login + home (or equivalent 2 screens)",
            "Auto Layout on all major containers",
            "Color + text styles — no rogue hex on text",
            "Resize 320→400px without broken overlap",
            "Layers named semantically"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 5 criteria pass"
      ],
      "parentId": null,
      "overviewText": "Pass before components: two screens, Auto Layout throughout, styles applied, resize-safe.",
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
      "id": "fig-components",
      "phase": "B · Components",
      "level": "intermediate",
      "title": "Components & instances",
      "minutes": 45,
      "durationLabel": "Days 8–9",
      "overview": "Components are reusable source-of-truth elements. Instances inherit updates. Build button, input, card as components before variants.",
      "learn": [
        "Create component",
        "Instances & overrides",
        "Organizing components",
        "Boolean layers lite"
      ],
      "steps": [
        {
          "title": "Button component",
          "body": "Primary button as component on Components page. Instances on screens.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Button: default + hover states as separate components OR prepare for variants next chapter.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Input component",
          "body": "Label optional, field, helper text, error text layers. Use visibility or variants later.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Input component with 4 layers. Place 2 instances on login.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Override discipline",
          "body": "Override text and icons on instances — not structure. Reset overrides when main component updates wrong.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Change main button padding. Confirm instances update. Reset one broken override.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Button + input + card components",
        "Instances on screens",
        "Override test done"
      ],
      "practice": {
        "title": "Mini library",
        "brief": "Add avatar, badge, and tag components. Document on Components page."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Components",
          "url": "https://help.figma.com/hc/en-us/articles/360037931751",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Figma Best Practices",
          "url": "https://www.figma.com/best-practices/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Components are reusable source-of-truth elements. Instances inherit updates. Build button, input, card as components before variants.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-variants",
      "phase": "B · Components",
      "level": "intermediate",
      "title": "Variants & component properties",
      "minutes": 50,
      "durationLabel": "Days 10–11",
      "overview": "Variants collapse related components into one set with properties (size, state, type). This is how real design systems scale.",
      "learn": [
        "Variant properties",
        "Component properties",
        "Boolean props",
        "Instance swap"
      ],
      "steps": [
        {
          "title": "Button variant set",
          "body": "Properties: Type=Primary|Secondary, Size=Sm|Md|Lg, State=Default|Hover|Disabled.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "One button component set with 12 variants (or sensible subset).",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Input states",
          "body": "State=Default|Focus|Error|Disabled. Swap helper for error message via variant or boolean.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Input variant set with 4 states on login form instances.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Icon instance swap",
          "body": "Component property for leading/trailing icon swap without detaching.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add icon slot to button via instance swap property.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Button variant set live",
        "Input states working",
        "Icon swap on one component"
      ],
      "practice": {
        "title": "Chip component",
        "brief": "Chip with variants: selected, disabled, with icon optional."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Variants",
          "url": "https://help.figma.com/hc/en-us/articles/360055139333",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Variants collapse related components into one set with properties (size, state, type). This is how real design systems scale.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-variables",
      "phase": "B · Components",
      "level": "intermediate",
      "title": "Variables & modes (design tokens)",
      "minutes": 50,
      "durationLabel": "Week 2",
      "overview": "Variables replace static styles for tokens that change (light/dark, brand themes). Bind to fills, spacing, and component properties.",
      "learn": [
        "Variable collections",
        "Light/dark modes",
        "Binding to properties",
        "Spacing variables"
      ],
      "steps": [
        {
          "title": "Color variables",
          "body": "Collection: Brand. Variables: bg/default, text/primary, brand/accent. Modes: Light, Dark.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create light + dark values for 6 color variables. Apply to login screen.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Spacing variables",
          "body": "space/4, space/8, space/16, space/24 bound to Auto Layout padding and gap.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Replace hardcoded padding on card with variables.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Typography variables (if available)",
          "body": "Bind font size variables to text styles or use string/number variables per team workflow.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "At minimum: document token table on Cover page mapping name → value.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Light/dark color modes",
        "Spacing variables on one layout",
        "Token table on Cover"
      ],
      "practice": {
        "title": "Theme flip",
        "brief": "Toggle mode to dark on all screens. Fix any unbound colors."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Variables",
          "url": "https://help.figma.com/hc/en-us/articles/15339657135383",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Tokens Studio (optional plugin)",
          "url": "https://tokens.studio/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Variables replace static styles for tokens that change (light/dark, brand themes). Bind to fills, spacing, and component properties.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-libraries",
      "phase": "C · Systems",
      "level": "advanced",
      "title": "Libraries: publish, consume, update",
      "minutes": 45,
      "durationLabel": "Days 14–15",
      "overview": "Foundation file publishes library. Product file consumes instances. Update flow is how teams stay synced — master this before job interviews.",
      "learn": [
        "Publish library",
        "Enable in team files",
        "Review updates",
        "Breaking vs safe changes"
      ],
      "steps": [
        {
          "title": "Two-file setup",
          "body": "File A: Design System (publish). File B: App Screens (consume).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Move components to File A. Publish library. Enable in File B.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Push an update",
          "body": "Change button radius in A. B gets update notification. Accept and verify instances.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Change one token. Publish. Accept update in B. Screenshot before/after.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Documentation frame",
          "body": "Usage, anatomy, do/don’t for button and input on Components page.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add documentation section for 2 components.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Two-file library flow works",
        "Update accepted in consumer file",
        "2 component docs"
      ],
      "practice": {
        "title": "Simulated team change",
        "brief": "Partner renames a variable — you merge update and fix broken bindings."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Team libraries",
          "url": "https://help.figma.com/hc/en-us/articles/360041003114",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Foundation file publishes library. Product file consumes instances. Update flow is how teams stay synced — master this before job interviews.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-prototype",
      "phase": "C · Systems",
      "level": "intermediate",
      "title": "Prototyping flows",
      "minutes": 40,
      "durationLabel": "Week 2",
      "overview": "Prototype to communicate — not to impress. Link login → home, error states, simple overlay. Smart animate optional.",
      "learn": [
        "Connections",
        "Interaction details",
        "Overlays",
        "Flow starting points"
      ],
      "steps": [
        {
          "title": "Happy path",
          "body": "Login button → navigate to home. Use dissolve or smart animate 200ms.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Prototype login → home. Set flow start on login.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Error path",
          "body": "Invalid login → error variant on input + toast or inline message.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add second connection for error demo on prototype.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Share for feedback",
          "body": "Prototype link for stakeholders. Comments for async review.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Generate share link. Leave one comment on your own flow noting a friction point.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Happy path prototype",
        "Error state linked",
        "Share link generated"
      ],
      "practice": {
        "title": "User test lite",
        "brief": "Ask one person to complete login in prototype. Note where they hesitate."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Prototyping",
          "url": "https://help.figma.com/hc/en-us/articles/360040328594",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Prototype to communicate — not to impress. Link login → home, error states, simple overlay. Smart animate optional.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-handoff",
      "phase": "C · Systems",
      "level": "advanced",
      "title": "Dev Mode & developer handoff",
      "minutes": 50,
      "durationLabel": "Week 3",
      "overview": "Developers need spacing, tokens, assets, and states — not pretty pictures. Dev Mode, specs, export rules, and annotation habits.",
      "learn": [
        "Dev Mode inspection",
        "CSS/iOS/Android code snippets",
        "Export settings",
        "Redlines & annotations"
      ],
      "steps": [
        {
          "title": "Dev Mode tour",
          "body": "Inspect spacing, copy CSS variables, download SVGs. Compare token names to your variables.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Developer hat: write down 5 CSS custom properties dev would create from your tokens.",
          "tip": null,
          "code": "/* Example handoff mapping */\n:root {\n  --color-bg-default: #FAFAF8;\n  --color-text-primary: #1A1A1A;\n  --space-16: 16px;\n  --radius-md: 8px;\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Export hygiene",
          "body": "Icons @1x SVG. Images @2x PNG if raster. Name files button-primary-default.svg.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Export icon set (3 icons) with consistent naming.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Annotate a11y",
          "body": "Note focus order, aria labels for icon-only buttons, contrast on primary CTA.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Annotation layer on login: tab order 1–4, label for password toggle.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "5 CSS vars mapped",
        "3 SVGs exported",
        "A11y annotations on one screen"
      ],
      "practice": {
        "title": "Handoff packet",
        "brief": "One-page PDF or Notion: tokens, component list, prototype link, open questions for eng."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Figma — Dev Mode",
          "url": "https://help.figma.com/hc/en-us/articles/15023124644247",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "Stark — contrast in Figma",
          "url": "https://www.getstark.co/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Developers need spacing, tokens, assets, and states — not pretty pictures. Dev Mode, specs, export rules, and annotation habits.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "fig-cp-b",
      "kind": "checkpoint",
      "phase": "C · Systems",
      "level": "advanced",
      "title": "Checkpoint B — Job-ready Figma portfolio",
      "minutes": 35,
      "durationLabel": "Gate · Week 3",
      "overview": "Prove you can operate like a junior product designer: system file, app file, prototype, handoff doc.",
      "learn": [
        "Interview demo checklist"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record 5-min Loom walking through all items.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Published library with button + input variants",
            "Variables with light/dark modes",
            "Consumer file with 2+ screens",
            "Working prototype (happy + error path)",
            "Handoff doc or Dev Mode annotations"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All criteria met",
        "5-min walkthrough recorded"
      ],
      "practice": {
        "title": "Interview drill",
        "brief": "Explain “how you’d add a new button size” without opening Figma — then demo live."
      },
      "parentId": null,
      "overviewText": "Prove you can operate like a junior product designer: system file, app file, prototype, handoff doc.",
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
      "id": "fig-reference",
      "kind": "guide",
      "phase": "Reference",
      "level": "beginner",
      "title": "Shortcuts, plugins & interview topics",
      "minutes": 15,
      "overview": "Quick reference for daily Figma work and common interview questions.",
      "learn": [
        "Keyboard shortcuts",
        "Useful plugins",
        "Interview prompts"
      ],
      "steps": [
        {
          "title": "Shortcuts",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Shift+A — Auto Layout",
            "Cmd+Option+K — Create component",
            "Cmd+Option+B — Detach instance",
            "Option+drag — measure distance",
            "Cmd+/ — search actions"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Plugins (optional)",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Stark — contrast",
            "Unsplash — placeholders",
            "Content Reel — realistic copy",
            "Tokens Studio — token export"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview questions",
          "body": "",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": null,
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Difference between styles and variables?",
            "When use variants vs separate components?",
            "How do you hand off to developers?",
            "How handle design system updates across files?"
          ],
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Shortcuts practiced once"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Quick reference for daily Figma work and common interview questions.",
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
  ],
  "resources": {
    "docs": [
      {
        "name": "Figma Academy",
        "url": "https://www.figma.com/academy/"
      },
      {
        "name": "Figma Best Practices",
        "url": "https://www.figma.com/best-practices/"
      },
      {
        "name": "Figma Help Center",
        "url": "https://help.figma.com/"
      },
      {
        "name": "Dev Mode Guide",
        "url": "https://help.figma.com/hc/en-us/articles/15023124644247"
      }
    ],
    "tools": [
      "Figma",
      "FigJam",
      "Phosphor Icons",
      "Stark",
      "Tokens Studio"
    ],
    "books": [
      "Refactoring UI (Wathan & Schoger)"
    ],
    "practice": [
      "Rebuild a familiar app screen from memory",
      "Copy one screen from Mobbin — reverse engineer with Auto Layout",
      "Publish a mini library to Community (optional)"
    ],
    "videos": [
      {
        "name": "Figma (YouTube)",
        "url": "https://www.youtube.com/@Figma"
      },
      {
        "name": "DesignCourse — Figma",
        "url": "https://www.youtube.com/c/DesignCourse"
      }
    ]
  }
};
