/** Chapter body for /manuals/javascript. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "javascript",
  "title": "JavaScript",
  "tagline": "The language of the web — from values to async, modules, and the event loop.",
  "category": "foundations",
  "accent": "#B8860B",
  "cover": "covers/javascript-cover.png",
  "duration": "8–14 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "Complete beginners, career switchers, and QA engineers who need JS fluency for front-end, automation, or reading real codebases.",
  "outcomes": [
    "Read and write modern JavaScript with let/const, functions, arrays, objects, and modules",
    "Manipulate the DOM and handle events without a framework",
    "Work confidently with async/await, fetch, and error handling",
    "Write unit tests with Vitest and explain the event loop in interviews",
    "Navigate unfamiliar JS codebases with grep, debugger, and mental models"
  ],
  "pace": {
    "hoursPerDay": "1–1.5 hours/day (≈ 7–10 hrs/week)",
    "recommended": "~8–14 weeks part-time",
    "accelerated": "~5–6 weeks at 2–3 hrs/day",
    "slow": "~16–20 weeks if busy"
  },
  "chapters": [
    {
      "id": "js-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "overview": "JavaScript is learned by typing, not by watching. This path moves from values and functions through DOM and async to testing and the event loop — the mental models that unlock frameworks and automation. Block 1–1.5 hours most days. Checkpoints gate the next phase; do not skip them.",
      "learn": [
        "Weekly rhythm and deliverables",
        "Tools you need (all free)",
        "What “job-ready JS” means at junior level"
      ],
      "steps": [
        {
          "title": "Study pace",
          "body": "Plan 8–14 weeks at 8–12 hrs/week. Weeks 1–3: fundamentals and data. Weeks 4–6: DOM and async. Weeks 7–10: modules, testing, event loop. Weeks 11–14: reading codebases and polish.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Block calendar slots for the next 7 days. Create a GitHub repo named js-journey — you will push to it starting Chapter 2.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: 10–12 weeks at ~10 hrs/week",
            "Accelerated: 8 weeks at 2 hrs/day",
            "Slow track: 14 weeks — consistency beats speed"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Tools setup",
          "body": "Node.js (LTS), VS Code or Cursor, Chrome or Firefox DevTools. No framework required until you finish this path.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run node --version and npm --version in terminal. Install the ESLint extension. Bookmark MDN and javascript.info.",
          "tip": null,
          "code": "node --version   # v20+ recommended\nnpm --version",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Rules of the road",
          "body": "Type every example — do not copy-paste blindly. Use === not ==. Prefer const. Checkpoints are gates: pass criteria before advancing. When stuck >30 min, read the doThis box and do only that.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add a README to your repo with your target finish date and “done looks like…” paragraph.",
          "tip": "The browser console and Node REPL are your best friends. Run code constantly.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Checkpoints are contracts",
          "body": "Each checkpoint has pass criteria. Treat them like exam requirements. Employers probe the same skills in interviews.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Scroll ahead and read Checkpoint A and B pass criteria now. Note them in your README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Calendar blocks set for this week",
        "Node.js installed and verified",
        "GitHub repo created with README",
        "I read checkpoint pass criteria below"
      ],
      "practice": {
        "title": "Day zero",
        "brief": "Open DevTools console. Run typeof 42, typeof \"hello\", typeof null. Write one sentence explaining the null surprise."
      },
      "durationLabel": null,
      "parentId": null,
      "overviewText": "JavaScript is learned by typing, not by watching. This path moves from values and functions through DOM and async to testing and the event loop — the mental models that unlock frameworks and automation. Block 1–1.5 hours most days. Checkpoints gate the next phase; do not skip them.",
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
      "id": "js-values",
      "phase": "A · Fundamentals",
      "level": "beginner",
      "title": "Values, variables & control flow",
      "minutes": 50,
      "durationLabel": "Week 1",
      "overview": "JavaScript has eight types (seven primitives + object). let and const replace var. Control flow — if/else, loops, switch — is how programs make decisions. Master ===, truthy/falsy, and template literals before moving on.",
      "learn": [
        "Primitives vs objects",
        "let/const and block scope",
        "if/else, for, while",
        "=== vs ==",
        "Template literals"
      ],
      "steps": [
        {
          "title": "Types and typeof",
          "body": "Primitives: string, number, boolean, null, undefined, symbol, bigint. Everything else is an object (including arrays and functions). typeof null returns \"object\" — a famous bug never fixed for compatibility.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "In the console, test typeof on 10 different values. Write a comment explaining null and undefined.",
          "tip": null,
          "code": "typeof \"hello\"   // \"string\"\ntypeof 42        // \"number\"\ntypeof true      // \"boolean\"\ntypeof undefined // \"undefined\"\ntypeof null      // \"object\" (historical quirk)\ntypeof {}        // \"object\"\ntypeof []        // \"object\"\ntypeof (() => {}) // \"function\"",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "let, const, and naming",
          "body": "Use const by default. Use let when reassignment is required. Never use var in new code — function scope causes bugs. Names: camelCase for variables, UPPER_SNAKE for constants.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create variables for a user profile: name, age, isActive. Use const where possible. Reassign isActive with let.",
          "tip": "If you never reassign, use const. Linters enforce this.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Comparison and truthiness",
          "body": "Always use === and !==. == coerces types and surprises beginners. Falsy values: false, 0, \"\", null, undefined, NaN. Everything else is truthy.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Predict then run: 0 == false, 0 === false, \"\" == false, null == undefined. Document results.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "=== strict equality — no coercion",
            "== loose equality — avoid",
            "Falsy: false, 0, \"\", null, undefined, NaN",
            "Truthy: everything else including [] and {}"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Control flow",
          "body": "if/else for branching. for...of for arrays (prefer over classic for). while for unknown iteration counts. switch for many discrete cases.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a function grade(score) returning A/B/C/D/F using if/else. Loop an array of scores and print each grade.",
          "tip": null,
          "code": "function grade(score) {\n  if (score >= 90) return \"A\"\n  if (score >= 80) return \"B\"\n  if (score >= 70) return \"C\"\n  if (score >= 60) return \"D\"\n  return \"F\"\n}\n\nfor (const s of [95, 72, 58]) {\n  console.log(`${s} → ${grade(s)}`)\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Template literals",
          "body": "Backticks allow ${expression} interpolation and multiline strings. Prefer over + concatenation.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Build a multiline HTML snippet for a user card using template literals and your profile variables.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "typeof exercises documented",
        "grade() function works for 5 scores",
        "Used === exclusively in new code",
        "Template literal example saved"
      ],
      "practice": {
        "title": "FizzBuzz",
        "brief": "Print 1–20. Multiples of 3 → \"Fizz\", 5 → \"Buzz\", both → \"FizzBuzz\". Use a loop and if/else."
      },
      "resources": [
        {
          "type": "doc",
          "name": "javascript.info — JavaScript Fundamentals",
          "url": "https://javascript.info/first-steps",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "MDN — JavaScript data types",
          "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures",
          "lang": "EN",
          "free": true
        },
        {
          "type": "practice",
          "name": "javascript.info tasks — Fundamentals",
          "url": "https://javascript.info/task",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "JavaScript has eight types (seven primitives + object). let and const replace var. Control flow — if/else, loops, switch — is how programs make decisions. Master ===, truthy/falsy, and template literals before moving on.",
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
      "id": "js-functions",
      "phase": "A · Fundamentals",
      "level": "beginner",
      "title": "Functions & scope",
      "minutes": 55,
      "durationLabel": "Week 1–2",
      "overview": "Functions are first-class: assign them, pass them, return them. Arrow functions vs function declarations. Scope (block vs function), hoisting intuition, and default parameters. Pure functions — same input, same output, no side effects — are the foundation of testable code.",
      "learn": [
        "Function declarations vs expressions",
        "Arrow functions",
        "Parameters & defaults",
        "Block scope",
        "Return early pattern"
      ],
      "steps": [
        {
          "title": "Three ways to write functions",
          "body": "Declaration: function foo() {} — hoisted. Expression: const foo = function() {} — not hoisted. Arrow: const foo = () => {} — concise, no own this (important later).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write isEven(n) three ways. Verify all return the same results.",
          "tip": null,
          "code": "function isEven(n) { return n % 2 === 0 }\n\nconst isEvenExpr = function(n) { return n % 2 === 0 }\n\nconst isEvenArrow = (n) => n % 2 === 0",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Parameters and defaults",
          "body": "Default parameters replace undefined. Rest params (...args) collect remaining arguments into an array.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write greet(name = \"Guest\", greeting = \"Hello\") and sum(...numbers) that adds any count of args.",
          "tip": null,
          "code": "function greet(name = \"Guest\", greeting = \"Hello\") {\n  return `${greeting}, ${name}!`\n}\n\nfunction sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0)\n}\n\nsum(1, 2, 3, 4) // 10",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Scope rules",
          "body": "Variables declared with let/const are block-scoped — visible only inside {}. Functions create their own scope. Inner functions can read outer variables (closure preview).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write nested functions where inner reads an outer variable. Try accessing it outside — confirm ReferenceError.",
          "tip": "If a variable is only used inside one block, declare it inside that block.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Pure functions and early return",
          "body": "Pure functions: no mutation of external state, no I/O. Return early on invalid input instead of deep nesting.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write titleCase(str) — capitalize first letter of each word. Return \"\" for empty input. No side effects.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Higher-order functions preview",
          "body": "Functions that take or return functions. Array methods (next chapter) are built on this. Callbacks are everywhere in async code.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write repeat(n, fn) that calls fn n times. Use it to print \"tick\" three times.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "isEven in three styles",
        "greet and sum with defaults/rest",
        "titleCase handles empty string",
        "repeat() callback works"
      ],
      "practice": {
        "title": "String utilities module",
        "brief": "Create utils.js with titleCase, truncate(str, max), and slugify(str). Test each in Node or console."
      },
      "resources": [
        {
          "type": "doc",
          "name": "javascript.info — Functions",
          "url": "https://javascript.info/function-basics",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "MDN — Functions",
          "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
          "lang": "EN",
          "free": true
        },
        {
          "type": "book",
          "name": "Eloquent JavaScript — Functions",
          "url": "https://eloquentjavascript.net/03_functions.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Functions are first-class: assign them, pass them, return them. Arrow functions vs function declarations. Scope (block vs function), hoisting intuition, and default parameters. Pure functions — same input, same output, no side effects — are the foundation of testable code.",
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
      "id": "js-arrays-objects",
      "phase": "A · Fundamentals",
      "level": "beginner",
      "title": "Arrays, objects & destructuring",
      "minutes": 55,
      "durationLabel": "Week 2",
      "overview": "Arrays hold ordered lists. Objects hold keyed records. map, filter, find, reduce, and some replace index loops for most tasks. Destructuring and spread make copying and unpacking elegant. JSON.parse/stringify connects JS to APIs.",
      "learn": [
        "Array methods",
        "Object literals & shorthand",
        "Destructuring & spread",
        "JSON",
        "Optional chaining"
      ],
      "steps": [
        {
          "title": "Array essentials",
          "body": "push/pop/shift/unshift mutate. map/filter/reduce return new arrays — prefer these. find returns first match; some/every return booleans.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Given users = [{name:\"Ava\",active:true},{name:\"Ben\",active:false}], filter active, map names, find first active.",
          "tip": null,
          "code": "const users = [\n  { name: \"Ava\", active: true },\n  { name: \"Ben\", active: false },\n  { name: \"Cal\", active: true },\n]\n\nconst activeNames = users\n  .filter(u => u.active)\n  .map(u => u.name)\n\nconst firstActive = users.find(u => u.active)",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "reduce for aggregation",
          "body": "reduce accumulates a single value — sums, counts, grouping. The Swiss Army knife when map/filter are not enough.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Use reduce to count how many users are active. Then group users by active status into {true: [...], false: [...]}.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Objects and shorthand",
          "body": "Property shorthand: {name} instead of {name: name}. Computed keys: {[key]: value}. Object spread {...obj} for shallow copy.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create a product object with id, name, price. Clone it with spread, change price on clone, verify original unchanged.",
          "tip": null,
          "code": "const product = { id: 1, name: \"Widget\", price: 9.99 }\nconst updated = { ...product, price: 12.99 }\n// product.price still 9.99",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Destructuring",
          "body": "Unpack arrays: const [first, ...rest] = arr. Unpack objects: const {name, age} = user. Default values in destructuring prevent undefined surprises.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Destructure name and email from a user object. Swap two variables using destructuring.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "JSON and optional chaining",
          "body": "JSON.stringify(obj) and JSON.parse(str) for serialization. Optional chaining ?. and nullish coalescing ?? prevent \"cannot read property of undefined\" crashes.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Serialize users to JSON, parse back, access user?.address?.city ?? \"Unknown\".",
          "tip": null,
          "code": "const json = JSON.stringify(users)\nconst parsed = JSON.parse(json)\nconst city = parsed[0]?.address?.city ?? \"Unknown\"",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "filter/map/find on users array",
        "reduce count and group exercises",
        "Spread clone without mutation",
        "Destructuring swap works",
        "JSON round-trip tested"
      ],
      "practice": {
        "title": "Data transformer",
        "brief": "Given a JSON array of orders, return {totalRevenue, orderCount, topCustomer} using map/filter/reduce only."
      },
      "resources": [
        {
          "type": "doc",
          "name": "javascript.info — Arrays",
          "url": "https://javascript.info/array-methods",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "MDN — Working with objects",
          "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects",
          "lang": "EN",
          "free": true
        },
        {
          "type": "practice",
          "name": "Exercism — JavaScript track",
          "url": "https://exercism.org/tracks/javascript",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Arrays hold ordered lists. Objects hold keyed records. map, filter, find, reduce, and some replace index loops for most tasks. Destructuring and spread make copying and unpacking elegant. JSON.parse/stringify connects JS to APIs.",
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
      "id": "js-dom",
      "phase": "B · Browser",
      "level": "beginner",
      "title": "DOM basics & events",
      "minutes": 60,
      "durationLabel": "Week 3",
      "overview": "The DOM is the browser's tree representation of HTML. querySelector finds elements. textContent and classList update them. addEventListener handles clicks, input, and keyboard. Build a todo app without React — this is how frameworks work under the hood.",
      "learn": [
        "querySelector / querySelectorAll",
        "Creating & removing nodes",
        "Events & delegation",
        "classList & data attributes",
        "localStorage preview"
      ],
      "steps": [
        {
          "title": "Select and modify",
          "body": "document.querySelector(\".class\") returns first match. querySelectorAll returns NodeList. Prefer textContent over innerHTML for user text (XSS safety).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create index.html with a heading and button. JS changes heading text on click.",
          "tip": null,
          "code": "<!-- index.html -->\n<h1 id=\"title\">Hello</h1>\n<button id=\"btn\">Change</button>\n\n<script>\n  document.getElementById(\"btn\").addEventListener(\"click\", () => {\n    document.getElementById(\"title\").textContent = \"Updated!\"\n  })\n</script>",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Create and remove elements",
          "body": "document.createElement(\"li\"), appendChild, remove. Template strings help build HTML snippets — sanitize if using innerHTML with user data.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Build a list where typing in an input and pressing Enter adds a new li.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Event delegation",
          "body": "Attach one listener on a parent instead of many on children. event.target identifies which child was clicked. Essential for dynamic lists.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add delete buttons to each todo item. One listener on ul handles all delete clicks via event.target.closest(\"li\").",
          "tip": "event.preventDefault() stops form submit or link navigation when you handle it in JS.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Forms and input events",
          "body": "input fires on every keystroke; change fires on blur/select. Form submit — preventDefault, read FormData or individual fields.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add a filter input that hides todos not matching the search string in real time.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Persist with localStorage",
          "body": "localStorage.setItem(key, JSON.stringify(data)) survives refresh. Load on page init. No server needed for practice projects.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Save todos to localStorage on every change. Load on DOMContentLoaded.",
          "tip": null,
          "code": "const save = (todos) => localStorage.setItem(\"todos\", JSON.stringify(todos))\nconst load = () => JSON.parse(localStorage.getItem(\"todos\") ?? \"[]\")",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Click handler changes DOM text",
        "Add todo via Enter key works",
        "Delete via event delegation works",
        "Filter input hides non-matching todos",
        "Todos persist after refresh"
      ],
      "practice": {
        "title": "Todo app v1",
        "brief": "Full todo: add, toggle complete (classList), delete, filter, localStorage. No framework. One HTML file or small module split."
      },
      "resources": [
        {
          "type": "doc",
          "name": "MDN — Document Object Model",
          "url": "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "javascript.info — Browser: Document, Events",
          "url": "https://javascript.info/document",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "MDN — Event reference",
          "url": "https://developer.mozilla.org/en-US/docs/Web/Events",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "The DOM is the browser's tree representation of HTML. querySelector finds elements. textContent and classList update them. addEventListener handles clicks, input, and keyboard. Build a todo app without React — this is how frameworks work under the hood.",
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
      "id": "js-checkpoint-a",
      "kind": "checkpoint",
      "phase": "B · Browser",
      "level": "beginner",
      "title": "Checkpoint A — Fundamentals + DOM",
      "minutes": 35,
      "durationLabel": "Gate · Week 3–4",
      "overview": "Before async and modules, prove you can write clean functions, transform data with array methods, and ship a working DOM app. Pass criteria are non-negotiable — fix gaps before Phase C.",
      "learn": [
        "Self-assessment checklist",
        "Portfolio habit: commit early"
      ],
      "steps": [
        {
          "title": "Pass criteria",
          "body": "You pass when all six are true. Audit your work. Fix failures before continuing.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Go through each criterion. Mark pass/fail in your README. Fix failures this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "5+ pure utility functions (no DOM, no I/O) with clear names",
            "Used map/filter/reduce on real data — not index loops",
            "Todo app: add, toggle, delete, filter, localStorage persist",
            "No var, no == in new code",
            "Code pushed to GitHub with meaningful commits",
            "Can explain block scope vs function scope aloud in 60 seconds"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Code review yourself",
          "body": "Re-read your todo app. Rename vague variables. Extract repeated DOM logic into functions. Remove dead code.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Spend 30 minutes refactoring. Commit with message \"refactor: checkpoint A cleanup\".",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Explain it",
          "body": "If you cannot explain event delegation or why const is default, you are not ready for async. Teach a rubber duck.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record a 2-minute voice memo walking through your todo app architecture.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 pass criteria met",
        "Refactor commit pushed",
        "Can explain event delegation without notes"
      ],
      "practice": {
        "title": "Checkpoint bundle",
        "brief": "Ensure repo has utils.js, todo app, and README with pass criteria checklist marked complete."
      },
      "parentId": null,
      "overviewText": "Before async and modules, prove you can write clean functions, transform data with array methods, and ship a working DOM app. Pass criteria are non-negotiable — fix gaps before Phase C.",
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
      "id": "js-async",
      "phase": "C · Async",
      "level": "intermediate",
      "title": "Promises & async/await",
      "minutes": 55,
      "durationLabel": "Week 4–5",
      "overview": "JavaScript is single-threaded but non-blocking. Promises represent future values. async/await is syntactic sugar over Promises — readable sequential async code. Promise.all for parallel, Promise.race for first-wins. Always handle rejections.",
      "learn": [
        "Callback → Promise mental model",
        "then/catch/finally",
        "async/await",
        "Promise.all / Promise.allSettled",
        "Error propagation"
      ],
      "steps": [
        {
          "title": "Promise basics",
          "body": "new Promise((resolve, reject) => ...) wraps async work. .then handles success, .catch handles failure. A Promise is pending → fulfilled or rejected once.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Wrap setTimeout in a delay(ms) function returning a Promise. Chain .then to print \"done\" after 1 second.",
          "tip": null,
          "code": "function delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms))\n}\n\ndelay(1000).then(() => console.log(\"done\"))",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "async/await",
          "body": "async function always returns a Promise. await pauses until Promise settles. Use try/catch for errors instead of .catch chains.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Rewrite delay chain using async/await. Write async function pauseAndGreet(name) that waits 500ms then logs greeting.",
          "tip": null,
          "code": "async function pauseAndGreet(name) {\n  await delay(500)\n  console.log(`Hello, ${name}!`)\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Parallel vs sequential",
          "body": "Sequential: await a; await b — total time = a + b. Parallel: await Promise.all([a, b]) — total time = max(a, b).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fetch two URLs sequentially, time it. Fetch in parallel with Promise.all, time again. Compare.",
          "tip": "Do not await inside a map if tasks are independent — use Promise.all(items.map(fn)).",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Error handling",
          "body": "Unhandled rejections crash Node and warn in browsers. Always try/catch around await or .catch on chains. Re-throw or return error states — never swallow silently.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write fetchWithRetry(url, retries=3) that catches failures and retries with delay.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Promise.allSettled",
          "body": "Unlike Promise.all, allSettled waits for all regardless of failures. Useful when partial success is acceptable.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fetch 3 URLs with allSettled. Log which succeeded and which failed.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "delay() Promise works",
        "async/await version written",
        "Parallel faster than sequential (timed)",
        "fetchWithRetry handles failures",
        "allSettled exercise done"
      ],
      "practice": {
        "title": "Async pipeline",
        "brief": "Load user IDs from a JSON file, fetch each user from JSONPlaceholder in parallel (max 3 concurrent), aggregate results."
      },
      "resources": [
        {
          "type": "doc",
          "name": "javascript.info — Promises, async/await",
          "url": "https://javascript.info/async",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "MDN — Using Promises",
          "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises",
          "lang": "EN",
          "free": true
        },
        {
          "type": "video",
          "name": "Fireship — Async JS in 10 min",
          "url": "https://www.youtube.com/watch?v=PoRJizFvM7s",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "JavaScript is single-threaded but non-blocking. Promises represent future values. async/await is syntactic sugar over Promises — readable sequential async code. Promise.all for parallel, Promise.race for first-wins. Always handle rejections.",
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
      "id": "js-fetch",
      "phase": "C · Async",
      "level": "intermediate",
      "title": "Fetch, HTTP & error UX",
      "minutes": 50,
      "durationLabel": "Week 5",
      "overview": "fetch(url) returns a Promise resolving to Response. Check response.ok — fetch does not reject on 404. Parse JSON with .json(). Build loading, success, and error UI states. Same patterns apply in Node with fetch (built-in since v18).",
      "learn": [
        "fetch API",
        "HTTP status codes",
        "Loading/error UI states",
        "Headers & POST bodies",
        "AbortController"
      ],
      "steps": [
        {
          "title": "GET request",
          "body": "const res = await fetch(url). if (!res.ok) throw new Error(res.status). const data = await res.json().",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fetch https://jsonplaceholder.typicode.com/posts/1 and log title.",
          "tip": null,
          "code": "async function getPost(id) {\n  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)\n  if (!res.ok) throw new Error(`HTTP ${res.status}`)\n  return res.json()\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "POST with JSON",
          "body": "fetch(url, { method: \"POST\", headers: {\"Content-Type\": \"application/json\"}, body: JSON.stringify(data) }).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create a new post via POST. Log the returned id.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Three UI states",
          "body": "Every async UI needs: loading (spinner/skeleton), success (data rendered), error (message + retry). Model as state object or simple flags.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add a \"Load posts\" button to a page. Show loading text, then list titles, or error with retry button.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "idle — before fetch",
            "loading — fetch in flight",
            "success — data rendered",
            "error — message shown, retry available"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "AbortController",
          "body": "Cancel in-flight fetch when user navigates away or types a new search. Pass signal in fetch options.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add search that aborts previous fetch when user types again.",
          "tip": null,
          "code": "const controller = new AbortController()\nfetch(url, { signal: controller.signal })\n// later: controller.abort()",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Error messages for humans",
          "body": "Log technical details to console. Show friendly messages to users. Distinguish network errors from 404/500.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write getErrorMessage(err) returning user-friendly strings for common failure modes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "GET post works",
        "POST creates resource",
        "Loading/success/error UI implemented",
        "AbortController cancels stale requests",
        "Friendly error messages displayed"
      ],
      "practice": {
        "title": "Post browser",
        "brief": "Small app: fetch posts list, click to view detail, search with debounced fetch, full loading/error states."
      },
      "resources": [
        {
          "type": "doc",
          "name": "MDN — Using Fetch",
          "url": "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "JSONPlaceholder — fake REST API",
          "url": "https://jsonplaceholder.typicode.com/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "HTTP Cats — status code reference",
          "url": "https://http.cat/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "fetch(url) returns a Promise resolving to Response. Check response.ok — fetch does not reject on 404. Parse JSON with .json(). Build loading, success, and error UI states. Same patterns apply in Node with fetch (built-in since v18).",
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
      "id": "js-modules",
      "phase": "D · Modules & Testing",
      "level": "intermediate",
      "title": "ES modules & project structure",
      "minutes": 45,
      "durationLabel": "Week 6",
      "overview": "ES modules (import/export) replace script-tag soup. Named exports for utilities, default export for main component. Split by responsibility: api.js, render.js, main.js. Vite or native Node \"type\": \"module\" for local dev without bundler pain.",
      "learn": [
        "export / import",
        "Default vs named exports",
        "Module scope",
        "Vite setup",
        "Barrel files lite"
      ],
      "steps": [
        {
          "title": "Named exports",
          "body": "export function foo() {} and export const BAR = 1. Import with import { foo, BAR } from \"./utils.js\". Extensions required in browser and Node ESM.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Move your utility functions to utils.js. Import them in main.js.",
          "tip": null,
          "code": "// utils.js\nexport function titleCase(str) { /* ... */ }\nexport function slugify(str) { /* ... */ }\n\n// main.js\nimport { titleCase, slugify } from \"./utils.js\"",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Default export",
          "body": "One default per module: export default function App() {}. Import: import App from \"./App.js\". Use for main component; named exports for everything else.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create api.js with default export fetchPosts and named export getPost.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Vite project setup",
          "body": "npm create vite@latest my-app -- --template vanilla. npm install && npm run dev. Hot reload, native ESM, zero config for learning.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Scaffold Vite vanilla project. Port your fetch app into src/ modules. Verify dev server runs.",
          "tip": null,
          "code": "npm create vite@latest js-fetch-app -- --template vanilla\ncd js-fetch-app\nnpm install\nnpm run dev",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Separation of concerns",
          "body": "api.js — fetch functions, no DOM. render.js — DOM updates, no fetch. main.js — wire events, call api, call render. Test api and utils without browser.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Refactor post browser into api.js, render.js, main.js. main.js under 50 lines.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Environment variables (preview)",
          "body": "Vite exposes import.meta.env.VITE_* to client code. Never put secrets in frontend env vars — they ship to browsers.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add VITE_API_BASE to .env. Use it in api.js. Document in README.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Utils in separate module",
        "Vite project runs",
        "api/render/main split complete",
        "main.js is thin orchestrator",
        "Env var pattern documented"
      ],
      "practice": {
        "title": "Module refactor",
        "brief": "Take any script >100 lines. Split into 3+ modules with clear boundaries. No circular imports."
      },
      "resources": [
        {
          "type": "doc",
          "name": "MDN — JavaScript modules",
          "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Vite — Getting Started",
          "url": "https://vite.dev/guide/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "javascript.info — Modules",
          "url": "https://javascript.info/modules-intro",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "ES modules (import/export) replace script-tag soup. Named exports for utilities, default export for main component. Split by responsibility: api.js, render.js, main.js. Vite or native Node \"type\": \"module\" for local dev without bundler pain.",
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
      "id": "js-vitest",
      "phase": "D · Modules & Testing",
      "level": "intermediate",
      "title": "Unit testing with Vitest",
      "minutes": 50,
      "durationLabel": "Week 7",
      "overview": "Tests encode expectations so refactors do not break behavior. Vitest is fast, Vite-native, Jest-compatible. Arrange-Act-Assert. Test pure functions first. Mock fetch for API modules. Coverage is a guide, not a goal.",
      "learn": [
        "Vitest setup",
        "describe/it/expect",
        "Testing pure functions",
        "Mocking fetch",
        "Test-driven habit"
      ],
      "steps": [
        {
          "title": "Install Vitest",
          "body": "npm install -D vitest. Add \"test\": \"vitest\" to package.json scripts. Co-locate tests as *.test.js or in __tests__/.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add Vitest to your Vite project. Write one passing test to verify setup.",
          "tip": null,
          "code": "npm install -D vitest\n\n// package.json\n\"scripts\": { \"test\": \"vitest\", \"test:run\": \"vitest run\" }",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "First tests",
          "body": "describe groups tests. it (or test) is one case. expect(value).toBe(expected) for primitives, .toEqual for objects/arrays.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Test titleCase: normal input, empty string, single word, multiple spaces.",
          "tip": null,
          "code": "import { describe, it, expect } from \"vitest\"\nimport { titleCase } from \"./utils.js\"\n\ndescribe(\"titleCase\", () => {\n  it(\"capitalizes each word\", () => {\n    expect(titleCase(\"hello world\")).toBe(\"Hello World\")\n  })\n  it(\"returns empty for empty input\", () => {\n    expect(titleCase(\"\")).toBe(\"\")\n  })\n})",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Test edge cases",
          "body": "Empty, null-ish, boundary values, error paths. Tests document intended behavior for the next reader.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add 5+ tests for your data transformer from the arrays chapter.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Happy path — typical input",
            "Empty input",
            "Single item",
            "Invalid input (if applicable)",
            "Boundary values"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Mock fetch",
          "body": "vi.fn() and global.fetch = vi.fn() for API tests. Return mock Response with ok and json(). Reset mocks in beforeEach.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Test getPost(id) with mocked fetch returning fake JSON and throwing on 404.",
          "tip": null,
          "code": "import { vi } from \"vitest\"\n\nvi.stubGlobal(\"fetch\", vi.fn())\n\nfetch.mockResolvedValue({\n  ok: true,\n  json: () => Promise.resolve({ title: \"Test\" }),\n})",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When to test",
          "body": "Always: pure business logic, parsers, validators. Sometimes: integration with mocked I/O. Rarely: DOM (use E2E tools later).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Aim for 10+ tests across utils and api modules. npm run test:run green.",
          "tip": "Red-green-refactor: write failing test, make it pass, clean up.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Vitest installed and running",
        "titleCase has 4+ test cases",
        "Data transformer tested",
        "API module tested with mocked fetch",
        "All tests green in CI-ready run"
      ],
      "practice": {
        "title": "Test coverage push",
        "brief": "Add tests until utils.js and api.js core functions are covered. Document how to run tests in README."
      },
      "resources": [
        {
          "type": "doc",
          "name": "Vitest — Getting Started",
          "url": "https://vitest.dev/guide/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Vitest — Mocking",
          "url": "https://vitest.dev/guide/mocking.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "practice",
          "name": "Test Automation University — JS testing intro",
          "url": "https://testautomationu.applitools.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Tests encode expectations so refactors do not break behavior. Vitest is fast, Vite-native, Jest-compatible. Arrange-Act-Assert. Test pure functions first. Mock fetch for API modules. Coverage is a guide, not a goal.",
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
      "id": "js-event-loop",
      "phase": "E · Deep JS",
      "level": "advanced",
      "title": "Event loop, closures & this",
      "minutes": 55,
      "durationLabel": "Week 8–9",
      "overview": "The event loop processes call stack, microtasks (Promises), and macrotasks (setTimeout) in a specific order — interview gold. Closures capture outer variables. this binding depends on call site (arrow functions inherit lexical this). These models explain flaky tests and framework behavior.",
      "learn": [
        "Call stack & task queues",
        "Microtasks vs macrotasks",
        "Closures in practice",
        "this binding rules",
        "Common interview snippets"
      ],
      "steps": [
        {
          "title": "Event loop order",
          "body": "Run sync code first. Drain all microtasks (Promise callbacks). Then one macrotask (setTimeout). Repeat. That is why Promise.then runs before setTimeout(0).",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Predict output, then run: console.log(1); setTimeout(()=>console.log(2)); Promise.resolve().then(()=>console.log(3)); console.log(4).",
          "tip": null,
          "code": "console.log(\"1 sync\")\nsetTimeout(() => console.log(\"2 macrotask\"), 0)\nPromise.resolve().then(() => console.log(\"3 microtask\"))\nconsole.log(\"4 sync\")\n// Output: 1, 4, 3, 2",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Three more snippets",
          "body": "Practice until predictions are reliable. Draw the queue on paper if needed.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Run 3 async snippets from javascript.info or Lydia Hallie's visual. Write predicted vs actual in notes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Nested setTimeout + Promise chains",
            "async function with await vs bare Promise.then",
            "Multiple Promise.then in sequence"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Closures",
          "body": "Inner function closes over outer variables even after outer returns. Classic: loop with var + setTimeout bug; fix with let or IIFE.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write createCounter() returning {increment, getCount} using closure. Count is private.",
          "tip": null,
          "code": "function createCounter() {\n  let count = 0\n  return {\n    increment: () => ++count,\n    getCount: () => count,\n  }\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "this binding",
          "body": "Regular function: this = call site (obj.method()). Arrow function: this = enclosing lexical scope. bind/call/apply override.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Demonstrate obj.getName() vs const fn = obj.getName; fn() losing this. Fix with arrow method or bind.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Why tests flake",
          "body": "Missing await, race between assertion and microtask, setTimeout without waiting. Event loop literacy prevents automation pain.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write a flaky-looking test that fails without await and passes with it. Comment why.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Event loop snippet predictions correct",
        "createCounter closure works",
        "this binding demo documented",
        "Flaky test example with explanation"
      ],
      "practice": {
        "title": "Event loop quiz",
        "brief": "Create 5 code snippets with mixed sync/async. Quiz a friend or future self. Answer key in comments."
      },
      "resources": [
        {
          "type": "video",
          "name": "Philip Roberts — What the heck is the event loop?",
          "url": "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Loupe — Event loop visualizer",
          "url": "http://latentflip.com/loupe/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "book",
          "name": "You Don't Know JS — Scope & Closures",
          "url": "https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "The event loop processes call stack, microtasks (Promises), and macrotasks (setTimeout) in a specific order — interview gold. Closures capture outer variables. this binding depends on call site (arrow functions inherit lexical this). These models explain flaky tests and framework behavior.",
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
      "id": "js-checkpoint-b",
      "kind": "checkpoint",
      "phase": "E · Deep JS",
      "level": "advanced",
      "title": "Checkpoint B — Async, modules & tests",
      "minutes": 40,
      "durationLabel": "Gate · Week 9–10",
      "overview": "Prove you can ship a modular async app with tests and explain the event loop. This is the bar for \"I know JavaScript\" on a resume or in a QA automation interview.",
      "learn": [
        "Integration readiness",
        "Interview prep"
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
          "doThis": "Verify every item. Fix gaps this week.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Vite project with api/render/main module split",
            "Fetch app with loading, success, error, retry states",
            "10+ Vitest tests, all green via npm run test:run",
            "Can explain event loop order (sync → microtasks → macrotask) without notes",
            "Can explain closure with createCounter example",
            "GitHub repo with README, meaningful commit history"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Mock interview",
          "body": "Practice aloud: \"What happens when you await fetch?\" \"Difference between == and ===?\" \"What is event delegation?\"",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record 5-minute answers to those three questions. Re-record until smooth.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Code quality pass",
          "body": "Run ESLint if configured. Remove console.logs except intentional ones. Ensure no hardcoded URLs without env var.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Final polish commit: \"chore: checkpoint B ready\".",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 6 pass criteria met",
        "Mock interview recorded",
        "Polish commit pushed"
      ],
      "practice": {
        "title": "Green demo",
        "brief": "Screen record: run dev server, demo fetch app, run tests green. Save link or file for portfolio."
      },
      "parentId": null,
      "overviewText": "Prove you can ship a modular async app with tests and explain the event loop. This is the bar for \"I know JavaScript\" on a resume or in a QA automation interview.",
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
      "id": "js-reading",
      "phase": "F · Pro",
      "level": "advanced",
      "title": "Reading unfamiliar codebases",
      "minutes": 45,
      "durationLabel": "Week 10–11",
      "overview": "Professional work is mostly reading, not writing. Start from entry point (main.js, index.html). Follow imports. Use grep/search for symbols. Debugger breakpoints beat console.log spam. Read tests to learn intended behavior. Leave code better — small rename PRs build trust.",
      "learn": [
        "Entry point tracing",
        "Search strategies",
        "Debugger usage",
        "Reading tests as docs",
        "Safe refactoring"
      ],
      "steps": [
        {
          "title": "Find the entry point",
          "body": "package.json \"main\" or \"module\". index.html script tags. src/main.js in Vite. Start there; follow one user action end-to-end.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Clone a small open-source vanilla JS or Vite project (<500 lines). Identify entry point in 10 minutes.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Search with intent",
          "body": "Ripgrep/IDE search for function names, error strings, CSS classes. \"Find references\" on symbols. Read call hierarchy upward.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick one feature (e.g. \"add todo\"). Trace from button click to data save using search only.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Debugger over console",
          "body": "Breakpoints pause execution with full scope. Step over/into/out. Conditional breakpoints for loops. Network tab for fetch debugging.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Set breakpoint in fetch handler. Inspect response in debugger. Step through render path.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Tests as documentation",
          "body": "When behavior is unclear, read tests first. They show inputs, outputs, and edge cases the author cared about.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "In your cloned repo, find test files. List 5 behaviors you learned from tests without reading implementation.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "First contribution",
          "body": "Fix a typo, improve error message, add one test. Small PRs get merged. Read CONTRIBUTING.md if present.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Open a draft PR or local branch with one improvement to the cloned repo. Write clear commit message.",
          "tip": "If repo is too large, use GitHub code search or filter by path:src.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Entry point identified in foreign repo",
        "One feature traced click-to-data",
        "Debugger session completed",
        "5 behaviors learned from tests",
        "One improvement drafted or PR opened"
      ],
      "practice": {
        "title": "Architecture sketch",
        "brief": "Draw a one-page diagram: modules, data flow, external APIs. No code — boxes and arrows only."
      },
      "resources": [
        {
          "type": "doc",
          "name": "GitHub — Searching code",
          "url": "https://docs.github.com/en/search-github/searching-on-github/searching-code",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Chrome DevTools — Sources panel",
          "url": "https://developer.chrome.com/docs/devtools/javascript/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "Sourcegraph — code search",
          "url": "https://sourcegraph.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Professional work is mostly reading, not writing. Start from entry point (main.js, index.html). Follow imports. Use grep/search for symbols. Debugger breakpoints beat console.log spam. Read tests to learn intended behavior. Leave code better — small rename PRs build trust.",
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
      "id": "js-reference",
      "kind": "guide",
      "phase": "Reference",
      "level": "beginner",
      "title": "Timeline, tools & cheat sheet",
      "minutes": 20,
      "overview": "Return here when lost. Week map, daily tools, and quick-reference patterns for interviews and daily work.",
      "learn": [
        "14-week map",
        "Tool bookmarks",
        "Interview quick hits"
      ],
      "steps": [
        {
          "title": "Week map",
          "body": "Weeks 1–2: values, functions, arrays. Week 3: DOM + Checkpoint A. Weeks 4–5: async, fetch. Week 6–7: modules, Vitest. Weeks 8–9: event loop + Checkpoint B. Weeks 10–11: reading codebases.",
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
            "Weeks 1–2 — Fundamentals (values, functions, data)",
            "Week 3 — DOM + Checkpoint A",
            "Weeks 4–5 — Async & fetch",
            "Weeks 6–7 — Modules & Vitest",
            "Weeks 8–9 — Event loop + Checkpoint B",
            "Weeks 10–11 — Reading codebases"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Daily tools",
          "body": "MDN for API reference. javascript.info for tutorials. DevTools console + debugger. Node REPL for quick experiments. Vitest for regression safety.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bookmark this chapter. Pin MDN and javascript.info in browser.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview quick hits",
          "body": "== vs ===, event loop order, closure definition, event delegation, Promise vs async/await, var/let/const, map vs forEach.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write one-sentence answers for each. Update after mock interviews.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Week map understood",
        "Bookmarks saved",
        "Interview answers drafted"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Return here when lost. Week map, daily tools, and quick-reference patterns for interviews and daily work.",
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
        "name": "javascript.info",
        "url": "https://javascript.info/"
      },
      {
        "name": "MDN JavaScript Guide",
        "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide"
      },
      {
        "name": "MDN Web API",
        "url": "https://developer.mozilla.org/en-US/docs/Web/API"
      },
      {
        "name": "Vitest Documentation",
        "url": "https://vitest.dev/"
      }
    ],
    "tools": [
      "Node.js (LTS)",
      "VS Code / Cursor",
      "Chrome DevTools",
      "Vite",
      "Vitest",
      "ESLint"
    ],
    "books": [
      "Eloquent JavaScript (Haverbeke)",
      "You Don't Know JS (Simpson)",
      "JavaScript: The Good Parts (Crockford) — skim"
    ],
    "practice": [
      "https://javascript.info/task",
      "https://exercism.org/tracks/javascript",
      "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/"
    ],
    "videos": [
      {
        "name": "Philip Roberts — Event Loop",
        "url": "https://www.youtube.com/watch?v=8aGhZQkoFbQ"
      },
      {
        "name": "Fireship — JavaScript in 100 seconds",
        "url": "https://www.youtube.com/watch?v=DHjqpvDnNGE"
      },
      {
        "name": "Traversy Media — JS Crash Course",
        "url": "https://www.youtube.com/watch?v=hdI2bqOjy3c"
      }
    ]
  }
};
