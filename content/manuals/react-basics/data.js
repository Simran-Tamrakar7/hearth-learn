/** Chapter body for /manuals/react-basics. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "react-basics",
  "title": "React Basics",
  "tagline": "Components, props, state, and effects — enough to read and ship simple UIs.",
  "category": "foundations",
  "accent": "#0EA5E9",
  "cover": "covers/javascript-cover.png",
  "duration": "2–5 weeks",
  "levelSpan": "Beginner → Useful",
  "who": "JS learners who want to build interactive UIs without drowning in the ecosystem.",
  "outcomes": [
    "Build components with props/state",
    "Fetch data with effects",
    "Lift state without panic"
  ],
  "pace": {
    "hoursPerDay": "45–90 min/day",
    "recommended": "~3–5 weeks",
    "accelerated": "~2 weeks",
    "slow": "~6–8 weeks"
  },
  "chapters": [
    {
      "id": "react-why",
      "phase": "Start",
      "level": "beginner",
      "title": "Why React",
      "minutes": 25,
      "overview": "UI as a function of state — the mental model that unlocks everything else.",
      "learn": [
        "Components",
        "Declarative UI",
        "When not to use React"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "React lets you describe UI from state instead of manually mutating the DOM. Components compose like Lego.",
          "learnMore": "You still need HTML/CSS/JS fundamentals. React is not a substitute for the platform.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://react.dev/learn",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "React is primarily about…",
            "options": [
              "Replacing CSS",
              "UI as a function of state",
              "Only class components forever",
              "Skipping JavaScript"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Why React.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Create a Vite React app and render a Hello component.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "export default function Hello({ name }) {\n  return <h1>Hello {name}</h1>\n}",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Why React.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Vite app runs",
        "One component rendered"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "UI as a function of state — the mental model that unlocks everything else.",
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
      "id": "react-state",
      "phase": "Core",
      "level": "beginner",
      "title": "Props & state",
      "minutes": 40,
      "overview": "Props in, state inside, events up.",
      "learn": [
        "useState",
        "Props",
        "Controlled inputs"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Props are inputs from parents. State is data that changes over time inside a component.",
          "learnMore": "Don’t mutate state — setState with a new value. Controlled inputs keep value in state.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://react.dev/reference/react/useState",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Updating state should…",
            "options": [
              "Mutate the array in place",
              "Replace with a new value",
              "Use document.write",
              "Skip renders forever"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Props & state.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Build a counter and a controlled text field.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "const [n, setN] = useState(0)\nreturn <button onClick={() => setN(n + 1)}>{n}</button>",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Props & state.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Counter works",
        "Input is controlled"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Props in, state inside, events up.",
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
      "id": "react-effects",
      "phase": "Core",
      "level": "intermediate",
      "title": "Effects & fetching",
      "minutes": 45,
      "overview": "useEffect for syncing with the outside world — carefully.",
      "learn": [
        "useEffect",
        "Dependency arrays",
        "Cleanup"
      ],
      "steps": [
        {
          "title": "Key idea",
          "body": "Effects run after paint to talk to APIs, subscriptions, or the DOM. Dependency arrays decide when they re-run.",
          "learnMore": "Fetching in effects needs ignore flags or abort to avoid race conditions.",
          "image": null,
          "resources": [
            {
              "label": "Docs",
              "url": "https://react.dev/reference/react/useEffect",
              "kind": "Docs"
            }
          ],
          "quiz": {
            "question": "Empty dependency array means…",
            "options": [
              "Run every keystroke",
              "Run once after mount (plus Strict Mode double in dev)",
              "Never run",
              "Delete the component"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Write 3 notes on: Effects.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Practice",
          "body": "Fetch a public JSON API into state and render a list.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": {
            "prompt": "Starter",
            "code": "useEffect(() => {\n  let on = true\n  fetch(url).then(r => r.json()).then(d => { if (on) setData(d) })\n  return () => { on = false }\n}, [url])",
            "result": "You have a green or fixable failure — both count."
          },
          "doThis": "Commit one file practicing Effects.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "List from API renders",
        "You handled loading state"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "useEffect for syncing with the outside world — carefully.",
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
      "id": "react-cp",
      "kind": "checkpoint",
      "phase": "Gate",
      "level": "checkpoint",
      "title": "Checkpoint — React mini app",
      "minutes": 60,
      "overview": "Ship a tiny app: list + filter + detail from public API.",
      "learn": [
        "Composition",
        "State lift",
        "README"
      ],
      "steps": [
        {
          "title": "Ship it",
          "body": "Deploy or record a demo of list/filter/detail. README with run steps.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": {
            "question": "Checkpoint passes when…",
            "options": [
              "You watched a tutorial",
              "App runs and README explains it",
              "You bookmarked React docs",
              "You used 12 libraries"
            ],
            "answer": 1,
            "explain": null
          },
          "tryIt": null,
          "doThis": "Push to GitHub and link it from your portfolio notes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Repo public",
        "Demo recorded or GIF"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Ship a tiny app: list + filter + detail from public API.",
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
