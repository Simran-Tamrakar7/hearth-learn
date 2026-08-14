import { ch, r } from '../helpers.js'

export const foundationManuals = [
  {
    id: 'javascript',
    title: 'JavaScript',
    tagline: 'The language of the web — from values to async, modules, and the event loop.',
    category: 'foundations',
    accent: '#B8860B',
    cover: 'covers/javascript-cover.png',
    duration: '8–14 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Complete beginners, career switchers, and QA engineers who need JS fluency for front-end, automation, or reading real codebases.',
    outcomes: [
      'Read and write modern JavaScript with let/const, functions, arrays, objects, and modules',
      'Manipulate the DOM and handle events without a framework',
      'Work confidently with async/await, fetch, and error handling',
      'Write unit tests with Vitest and explain the event loop in interviews',
      'Navigate unfamiliar JS codebases with grep, debugger, and mental models',
    ],
    pace: {
      hoursPerDay: '1–1.5 hours/day (≈ 7–10 hrs/week)',
      recommended: '~8–14 weeks part-time',
      accelerated: '~5–6 weeks at 2–3 hrs/day',
      slow: '~16–20 weeks if busy',
    },
    chapters: [
      ch({
        id: 'js-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        overview:
          'JavaScript is learned by typing, not by watching. This path moves from values and functions through DOM and async to testing and the event loop — the mental models that unlock frameworks and automation. Block 1–1.5 hours most days. Checkpoints gate the next phase; do not skip them.',
        learn: [
          'Weekly rhythm and deliverables',
          'Tools you need (all free)',
          'What “job-ready JS” means at junior level',
        ],
        steps: [
          {
            title: 'Study pace',
            body: 'Plan 8–14 weeks at 8–12 hrs/week. Weeks 1–3: fundamentals and data. Weeks 4–6: DOM and async. Weeks 7–10: modules, testing, event loop. Weeks 11–14: reading codebases and polish.',
            doThis: 'Block calendar slots for the next 7 days. Create a GitHub repo named js-journey — you will push to it starting Chapter 2.',
            items: [
              'Recommended: 10–12 weeks at ~10 hrs/week',
              'Accelerated: 8 weeks at 2 hrs/day',
              'Slow track: 14 weeks — consistency beats speed',
            ],
          },
          {
            title: 'Tools setup',
            body: 'Node.js (LTS), VS Code or Cursor, Chrome or Firefox DevTools. No framework required until you finish this path.',
            doThis: 'Run node --version and npm --version in terminal. Install the ESLint extension. Bookmark MDN and javascript.info.',
            code: 'node --version   # v20+ recommended\nnpm --version',
          },
          {
            title: 'Rules of the road',
            body: 'Type every example — do not copy-paste blindly. Use === not ==. Prefer const. Checkpoints are gates: pass criteria before advancing. When stuck >30 min, read the doThis box and do only that.',
            doThis: 'Add a README to your repo with your target finish date and “done looks like…” paragraph.',
            tip: 'The browser console and Node REPL are your best friends. Run code constantly.',
          },
          {
            title: 'Checkpoints are contracts',
            body: 'Each checkpoint has pass criteria. Treat them like exam requirements. Employers probe the same skills in interviews.',
            doThis: 'Scroll ahead and read Checkpoint A and B pass criteria now. Note them in your README.',
          },
        ],
        checklist: [
          'Calendar blocks set for this week',
          'Node.js installed and verified',
          'GitHub repo created with README',
          'I read checkpoint pass criteria below',
        ],
        practice: {
          title: 'Day zero',
          brief: 'Open DevTools console. Run typeof 42, typeof "hello", typeof null. Write one sentence explaining the null surprise.',
        },
      }),

      ch({
        id: 'js-values',
        phase: 'A · Fundamentals',
        level: 'beginner',
        title: 'Values, variables & control flow',
        minutes: 50,
        durationLabel: 'Week 1',
        overview:
          'JavaScript has eight types (seven primitives + object). let and const replace var. Control flow — if/else, loops, switch — is how programs make decisions. Master ===, truthy/falsy, and template literals before moving on.',
        learn: ['Primitives vs objects', 'let/const and block scope', 'if/else, for, while', '=== vs ==', 'Template literals'],
        steps: [
          {
            title: 'Types and typeof',
            body: 'Primitives: string, number, boolean, null, undefined, symbol, bigint. Everything else is an object (including arrays and functions). typeof null returns "object" — a famous bug never fixed for compatibility.',
            doThis: 'In the console, test typeof on 10 different values. Write a comment explaining null and undefined.',
            code: 'typeof "hello"   // "string"\ntypeof 42        // "number"\ntypeof true      // "boolean"\ntypeof undefined // "undefined"\ntypeof null      // "object" (historical quirk)\ntypeof {}        // "object"\ntypeof []        // "object"\ntypeof (() => {}) // "function"',
          },
          {
            title: 'let, const, and naming',
            body: 'Use const by default. Use let when reassignment is required. Never use var in new code — function scope causes bugs. Names: camelCase for variables, UPPER_SNAKE for constants.',
            doThis: 'Create variables for a user profile: name, age, isActive. Use const where possible. Reassign isActive with let.',
            tip: 'If you never reassign, use const. Linters enforce this.',
          },
          {
            title: 'Comparison and truthiness',
            body: 'Always use === and !==. == coerces types and surprises beginners. Falsy values: false, 0, "", null, undefined, NaN. Everything else is truthy.',
            doThis: 'Predict then run: 0 == false, 0 === false, "" == false, null == undefined. Document results.',
            items: [
              '=== strict equality — no coercion',
              '== loose equality — avoid',
              'Falsy: false, 0, "", null, undefined, NaN',
              'Truthy: everything else including [] and {}',
            ],
          },
          {
            title: 'Control flow',
            body: 'if/else for branching. for...of for arrays (prefer over classic for). while for unknown iteration counts. switch for many discrete cases.',
            doThis: 'Write a function grade(score) returning A/B/C/D/F using if/else. Loop an array of scores and print each grade.',
            code: 'function grade(score) {\n  if (score >= 90) return "A"\n  if (score >= 80) return "B"\n  if (score >= 70) return "C"\n  if (score >= 60) return "D"\n  return "F"\n}\n\nfor (const s of [95, 72, 58]) {\n  console.log(`${s} → ${grade(s)}`)\n}',
          },
          {
            title: 'Template literals',
            body: 'Backticks allow ${expression} interpolation and multiline strings. Prefer over + concatenation.',
            doThis: 'Build a multiline HTML snippet for a user card using template literals and your profile variables.',
          },
        ],
        checklist: [
          'typeof exercises documented',
          'grade() function works for 5 scores',
          'Used === exclusively in new code',
          'Template literal example saved',
        ],
        practice: {
          title: 'FizzBuzz',
          brief: 'Print 1–20. Multiples of 3 → "Fizz", 5 → "Buzz", both → "FizzBuzz". Use a loop and if/else.',
        },
        resources: [
          r('doc', 'javascript.info — JavaScript Fundamentals', 'https://javascript.info/first-steps', 'EN'),
          r('doc', 'MDN — JavaScript data types', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures', 'EN'),
          r('practice', 'javascript.info tasks — Fundamentals', 'https://javascript.info/task', 'EN'),
        ],
      }),

      ch({
        id: 'js-functions',
        phase: 'A · Fundamentals',
        level: 'beginner',
        title: 'Functions & scope',
        minutes: 55,
        durationLabel: 'Week 1–2',
        overview:
          'Functions are first-class: assign them, pass them, return them. Arrow functions vs function declarations. Scope (block vs function), hoisting intuition, and default parameters. Pure functions — same input, same output, no side effects — are the foundation of testable code.',
        learn: ['Function declarations vs expressions', 'Arrow functions', 'Parameters & defaults', 'Block scope', 'Return early pattern'],
        steps: [
          {
            title: 'Three ways to write functions',
            body: 'Declaration: function foo() {} — hoisted. Expression: const foo = function() {} — not hoisted. Arrow: const foo = () => {} — concise, no own this (important later).',
            doThis: 'Write isEven(n) three ways. Verify all return the same results.',
            code: 'function isEven(n) { return n % 2 === 0 }\n\nconst isEvenExpr = function(n) { return n % 2 === 0 }\n\nconst isEvenArrow = (n) => n % 2 === 0',
          },
          {
            title: 'Parameters and defaults',
            body: 'Default parameters replace undefined. Rest params (...args) collect remaining arguments into an array.',
            doThis: 'Write greet(name = "Guest", greeting = "Hello") and sum(...numbers) that adds any count of args.',
            code: 'function greet(name = "Guest", greeting = "Hello") {\n  return `${greeting}, ${name}!`\n}\n\nfunction sum(...numbers) {\n  return numbers.reduce((a, b) => a + b, 0)\n}\n\nsum(1, 2, 3, 4) // 10',
          },
          {
            title: 'Scope rules',
            body: 'Variables declared with let/const are block-scoped — visible only inside {}. Functions create their own scope. Inner functions can read outer variables (closure preview).',
            doThis: 'Write nested functions where inner reads an outer variable. Try accessing it outside — confirm ReferenceError.',
            tip: 'If a variable is only used inside one block, declare it inside that block.',
          },
          {
            title: 'Pure functions and early return',
            body: 'Pure functions: no mutation of external state, no I/O. Return early on invalid input instead of deep nesting.',
            doThis: 'Write titleCase(str) — capitalize first letter of each word. Return "" for empty input. No side effects.',
          },
          {
            title: 'Higher-order functions preview',
            body: 'Functions that take or return functions. Array methods (next chapter) are built on this. Callbacks are everywhere in async code.',
            doThis: 'Write repeat(n, fn) that calls fn n times. Use it to print "tick" three times.',
          },
        ],
        checklist: [
          'isEven in three styles',
          'greet and sum with defaults/rest',
          'titleCase handles empty string',
          'repeat() callback works',
        ],
        practice: {
          title: 'String utilities module',
          brief: 'Create utils.js with titleCase, truncate(str, max), and slugify(str). Test each in Node or console.',
        },
        resources: [
          r('doc', 'javascript.info — Functions', 'https://javascript.info/function-basics', 'EN'),
          r('doc', 'MDN — Functions', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions', 'EN'),
          r('book', 'Eloquent JavaScript — Functions', 'https://eloquentjavascript.net/03_functions.html', 'EN'),
        ],
      }),

      ch({
        id: 'js-arrays-objects',
        phase: 'A · Fundamentals',
        level: 'beginner',
        title: 'Arrays, objects & destructuring',
        minutes: 55,
        durationLabel: 'Week 2',
        overview:
          'Arrays hold ordered lists. Objects hold keyed records. map, filter, find, reduce, and some replace index loops for most tasks. Destructuring and spread make copying and unpacking elegant. JSON.parse/stringify connects JS to APIs.',
        learn: ['Array methods', 'Object literals & shorthand', 'Destructuring & spread', 'JSON', 'Optional chaining'],
        steps: [
          {
            title: 'Array essentials',
            body: 'push/pop/shift/unshift mutate. map/filter/reduce return new arrays — prefer these. find returns first match; some/every return booleans.',
            doThis: 'Given users = [{name:"Ava",active:true},{name:"Ben",active:false}], filter active, map names, find first active.',
            code: 'const users = [\n  { name: "Ava", active: true },\n  { name: "Ben", active: false },\n  { name: "Cal", active: true },\n]\n\nconst activeNames = users\n  .filter(u => u.active)\n  .map(u => u.name)\n\nconst firstActive = users.find(u => u.active)',
          },
          {
            title: 'reduce for aggregation',
            body: 'reduce accumulates a single value — sums, counts, grouping. The Swiss Army knife when map/filter are not enough.',
            doThis: 'Use reduce to count how many users are active. Then group users by active status into {true: [...], false: [...]}.',
          },
          {
            title: 'Objects and shorthand',
            body: 'Property shorthand: {name} instead of {name: name}. Computed keys: {[key]: value}. Object spread {...obj} for shallow copy.',
            doThis: 'Create a product object with id, name, price. Clone it with spread, change price on clone, verify original unchanged.',
            code: 'const product = { id: 1, name: "Widget", price: 9.99 }\nconst updated = { ...product, price: 12.99 }\n// product.price still 9.99',
          },
          {
            title: 'Destructuring',
            body: 'Unpack arrays: const [first, ...rest] = arr. Unpack objects: const {name, age} = user. Default values in destructuring prevent undefined surprises.',
            doThis: 'Destructure name and email from a user object. Swap two variables using destructuring.',
          },
          {
            title: 'JSON and optional chaining',
            body: 'JSON.stringify(obj) and JSON.parse(str) for serialization. Optional chaining ?. and nullish coalescing ?? prevent "cannot read property of undefined" crashes.',
            doThis: 'Serialize users to JSON, parse back, access user?.address?.city ?? "Unknown".',
            code: 'const json = JSON.stringify(users)\nconst parsed = JSON.parse(json)\nconst city = parsed[0]?.address?.city ?? "Unknown"',
          },
        ],
        checklist: [
          'filter/map/find on users array',
          'reduce count and group exercises',
          'Spread clone without mutation',
          'Destructuring swap works',
          'JSON round-trip tested',
        ],
        practice: {
          title: 'Data transformer',
          brief: 'Given a JSON array of orders, return {totalRevenue, orderCount, topCustomer} using map/filter/reduce only.',
        },
        resources: [
          r('doc', 'javascript.info — Arrays', 'https://javascript.info/array-methods', 'EN'),
          r('doc', 'MDN — Working with objects', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects', 'EN'),
          r('practice', 'Exercism — JavaScript track', 'https://exercism.org/tracks/javascript', 'EN'),
        ],
      }),

      ch({
        id: 'js-dom',
        phase: 'B · Browser',
        level: 'beginner',
        title: 'DOM basics & events',
        minutes: 60,
        durationLabel: 'Week 3',
        overview:
          'The DOM is the browser\'s tree representation of HTML. querySelector finds elements. textContent and classList update them. addEventListener handles clicks, input, and keyboard. Build a todo app without React — this is how frameworks work under the hood.',
        learn: ['querySelector / querySelectorAll', 'Creating & removing nodes', 'Events & delegation', 'classList & data attributes', 'localStorage preview'],
        steps: [
          {
            title: 'Select and modify',
            body: 'document.querySelector(".class") returns first match. querySelectorAll returns NodeList. Prefer textContent over innerHTML for user text (XSS safety).',
            doThis: 'Create index.html with a heading and button. JS changes heading text on click.',
            code: '<!-- index.html -->\n<h1 id="title">Hello</h1>\n<button id="btn">Change</button>\n\n<script>\n  document.getElementById("btn").addEventListener("click", () => {\n    document.getElementById("title").textContent = "Updated!"\n  })\n</script>',
          },
          {
            title: 'Create and remove elements',
            body: 'document.createElement("li"), appendChild, remove. Template strings help build HTML snippets — sanitize if using innerHTML with user data.',
            doThis: 'Build a list where typing in an input and pressing Enter adds a new li.',
          },
          {
            title: 'Event delegation',
            body: 'Attach one listener on a parent instead of many on children. event.target identifies which child was clicked. Essential for dynamic lists.',
            doThis: 'Add delete buttons to each todo item. One listener on ul handles all delete clicks via event.target.closest("li").',
            tip: 'event.preventDefault() stops form submit or link navigation when you handle it in JS.',
          },
          {
            title: 'Forms and input events',
            body: 'input fires on every keystroke; change fires on blur/select. Form submit — preventDefault, read FormData or individual fields.',
            doThis: 'Add a filter input that hides todos not matching the search string in real time.',
          },
          {
            title: 'Persist with localStorage',
            body: 'localStorage.setItem(key, JSON.stringify(data)) survives refresh. Load on page init. No server needed for practice projects.',
            doThis: 'Save todos to localStorage on every change. Load on DOMContentLoaded.',
            code: 'const save = (todos) => localStorage.setItem("todos", JSON.stringify(todos))\nconst load = () => JSON.parse(localStorage.getItem("todos") ?? "[]")',
          },
        ],
        checklist: [
          'Click handler changes DOM text',
          'Add todo via Enter key works',
          'Delete via event delegation works',
          'Filter input hides non-matching todos',
          'Todos persist after refresh',
        ],
        practice: {
          title: 'Todo app v1',
          brief: 'Full todo: add, toggle complete (classList), delete, filter, localStorage. No framework. One HTML file or small module split.',
        },
        resources: [
          r('doc', 'MDN — Document Object Model', 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model', 'EN'),
          r('doc', 'javascript.info — Browser: Document, Events', 'https://javascript.info/document', 'EN'),
          r('doc', 'MDN — Event reference', 'https://developer.mozilla.org/en-US/docs/Web/Events', 'EN'),
        ],
      }),

      ch({
        id: 'js-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Browser',
        level: 'beginner',
        title: 'Checkpoint A — Fundamentals + DOM',
        minutes: 35,
        durationLabel: 'Gate · Week 3–4',
        overview:
          'Before async and modules, prove you can write clean functions, transform data with array methods, and ship a working DOM app. Pass criteria are non-negotiable — fix gaps before Phase C.',
        learn: ['Self-assessment checklist', 'Portfolio habit: commit early'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'You pass when all six are true. Audit your work. Fix failures before continuing.',
            doThis: 'Go through each criterion. Mark pass/fail in your README. Fix failures this week.',
            items: [
              '5+ pure utility functions (no DOM, no I/O) with clear names',
              'Used map/filter/reduce on real data — not index loops',
              'Todo app: add, toggle, delete, filter, localStorage persist',
              'No var, no == in new code',
              'Code pushed to GitHub with meaningful commits',
              'Can explain block scope vs function scope aloud in 60 seconds',
            ],
          },
          {
            title: 'Code review yourself',
            body: 'Re-read your todo app. Rename vague variables. Extract repeated DOM logic into functions. Remove dead code.',
            doThis: 'Spend 30 minutes refactoring. Commit with message "refactor: checkpoint A cleanup".',
          },
          {
            title: 'Explain it',
            body: 'If you cannot explain event delegation or why const is default, you are not ready for async. Teach a rubber duck.',
            doThis: 'Record a 2-minute voice memo walking through your todo app architecture.',
          },
        ],
        checklist: [
          'All 6 pass criteria met',
          'Refactor commit pushed',
          'Can explain event delegation without notes',
        ],
        practice: {
          title: 'Checkpoint bundle',
          brief: 'Ensure repo has utils.js, todo app, and README with pass criteria checklist marked complete.',
        },
      }),

      ch({
        id: 'js-async',
        phase: 'C · Async',
        level: 'intermediate',
        title: 'Promises & async/await',
        minutes: 55,
        durationLabel: 'Week 4–5',
        overview:
          'JavaScript is single-threaded but non-blocking. Promises represent future values. async/await is syntactic sugar over Promises — readable sequential async code. Promise.all for parallel, Promise.race for first-wins. Always handle rejections.',
        learn: ['Callback → Promise mental model', 'then/catch/finally', 'async/await', 'Promise.all / Promise.allSettled', 'Error propagation'],
        steps: [
          {
            title: 'Promise basics',
            body: 'new Promise((resolve, reject) => ...) wraps async work. .then handles success, .catch handles failure. A Promise is pending → fulfilled or rejected once.',
            doThis: 'Wrap setTimeout in a delay(ms) function returning a Promise. Chain .then to print "done" after 1 second.',
            code: 'function delay(ms) {\n  return new Promise(resolve => setTimeout(resolve, ms))\n}\n\ndelay(1000).then(() => console.log("done"))',
          },
          {
            title: 'async/await',
            body: 'async function always returns a Promise. await pauses until Promise settles. Use try/catch for errors instead of .catch chains.',
            doThis: 'Rewrite delay chain using async/await. Write async function pauseAndGreet(name) that waits 500ms then logs greeting.',
            code: 'async function pauseAndGreet(name) {\n  await delay(500)\n  console.log(`Hello, ${name}!`)\n}',
          },
          {
            title: 'Parallel vs sequential',
            body: 'Sequential: await a; await b — total time = a + b. Parallel: await Promise.all([a, b]) — total time = max(a, b).',
            doThis: 'Fetch two URLs sequentially, time it. Fetch in parallel with Promise.all, time again. Compare.',
            tip: 'Do not await inside a map if tasks are independent — use Promise.all(items.map(fn)).',
          },
          {
            title: 'Error handling',
            body: 'Unhandled rejections crash Node and warn in browsers. Always try/catch around await or .catch on chains. Re-throw or return error states — never swallow silently.',
            doThis: 'Write fetchWithRetry(url, retries=3) that catches failures and retries with delay.',
          },
          {
            title: 'Promise.allSettled',
            body: 'Unlike Promise.all, allSettled waits for all regardless of failures. Useful when partial success is acceptable.',
            doThis: 'Fetch 3 URLs with allSettled. Log which succeeded and which failed.',
          },
        ],
        checklist: [
          'delay() Promise works',
          'async/await version written',
          'Parallel faster than sequential (timed)',
          'fetchWithRetry handles failures',
          'allSettled exercise done',
        ],
        practice: {
          title: 'Async pipeline',
          brief: 'Load user IDs from a JSON file, fetch each user from JSONPlaceholder in parallel (max 3 concurrent), aggregate results.',
        },
        resources: [
          r('doc', 'javascript.info — Promises, async/await', 'https://javascript.info/async', 'EN'),
          r('doc', 'MDN — Using Promises', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises', 'EN'),
          r('video', 'Fireship — Async JS in 10 min', 'https://www.youtube.com/watch?v=PoRJizFvM7s', 'EN'),
        ],
      }),

      ch({
        id: 'js-fetch',
        phase: 'C · Async',
        level: 'intermediate',
        title: 'Fetch, HTTP & error UX',
        minutes: 50,
        durationLabel: 'Week 5',
        overview:
          'fetch(url) returns a Promise resolving to Response. Check response.ok — fetch does not reject on 404. Parse JSON with .json(). Build loading, success, and error UI states. Same patterns apply in Node with fetch (built-in since v18).',
        learn: ['fetch API', 'HTTP status codes', 'Loading/error UI states', 'Headers & POST bodies', 'AbortController'],
        steps: [
          {
            title: 'GET request',
            body: 'const res = await fetch(url). if (!res.ok) throw new Error(res.status). const data = await res.json().',
            doThis: 'Fetch https://jsonplaceholder.typicode.com/posts/1 and log title.',
            code: 'async function getPost(id) {\n  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)\n  if (!res.ok) throw new Error(`HTTP ${res.status}`)\n  return res.json()\n}',
          },
          {
            title: 'POST with JSON',
            body: 'fetch(url, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(data) }).',
            doThis: 'Create a new post via POST. Log the returned id.',
          },
          {
            title: 'Three UI states',
            body: 'Every async UI needs: loading (spinner/skeleton), success (data rendered), error (message + retry). Model as state object or simple flags.',
            doThis: 'Add a "Load posts" button to a page. Show loading text, then list titles, or error with retry button.',
            items: [
              'idle — before fetch',
              'loading — fetch in flight',
              'success — data rendered',
              'error — message shown, retry available',
            ],
          },
          {
            title: 'AbortController',
            body: 'Cancel in-flight fetch when user navigates away or types a new search. Pass signal in fetch options.',
            doThis: 'Add search that aborts previous fetch when user types again.',
            code: 'const controller = new AbortController()\nfetch(url, { signal: controller.signal })\n// later: controller.abort()',
          },
          {
            title: 'Error messages for humans',
            body: 'Log technical details to console. Show friendly messages to users. Distinguish network errors from 404/500.',
            doThis: 'Write getErrorMessage(err) returning user-friendly strings for common failure modes.',
          },
        ],
        checklist: [
          'GET post works',
          'POST creates resource',
          'Loading/success/error UI implemented',
          'AbortController cancels stale requests',
          'Friendly error messages displayed',
        ],
        practice: {
          title: 'Post browser',
          brief: 'Small app: fetch posts list, click to view detail, search with debounced fetch, full loading/error states.',
        },
        resources: [
          r('doc', 'MDN — Using Fetch', 'https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch', 'EN'),
          r('doc', 'JSONPlaceholder — fake REST API', 'https://jsonplaceholder.typicode.com/', 'EN'),
          r('tool', 'HTTP Cats — status code reference', 'https://http.cat/', 'EN'),
        ],
      }),

      ch({
        id: 'js-modules',
        phase: 'D · Modules & Testing',
        level: 'intermediate',
        title: 'ES modules & project structure',
        minutes: 45,
        durationLabel: 'Week 6',
        overview:
          'ES modules (import/export) replace script-tag soup. Named exports for utilities, default export for main component. Split by responsibility: api.js, render.js, main.js. Vite or native Node "type": "module" for local dev without bundler pain.',
        learn: ['export / import', 'Default vs named exports', 'Module scope', 'Vite setup', 'Barrel files lite'],
        steps: [
          {
            title: 'Named exports',
            body: 'export function foo() {} and export const BAR = 1. Import with import { foo, BAR } from "./utils.js". Extensions required in browser and Node ESM.',
            doThis: 'Move your utility functions to utils.js. Import them in main.js.',
            code: '// utils.js\nexport function titleCase(str) { /* ... */ }\nexport function slugify(str) { /* ... */ }\n\n// main.js\nimport { titleCase, slugify } from "./utils.js"',
          },
          {
            title: 'Default export',
            body: 'One default per module: export default function App() {}. Import: import App from "./App.js". Use for main component; named exports for everything else.',
            doThis: 'Create api.js with default export fetchPosts and named export getPost.',
          },
          {
            title: 'Vite project setup',
            body: 'npm create vite@latest my-app -- --template vanilla. npm install && npm run dev. Hot reload, native ESM, zero config for learning.',
            doThis: 'Scaffold Vite vanilla project. Port your fetch app into src/ modules. Verify dev server runs.',
            code: 'npm create vite@latest js-fetch-app -- --template vanilla\ncd js-fetch-app\nnpm install\nnpm run dev',
          },
          {
            title: 'Separation of concerns',
            body: 'api.js — fetch functions, no DOM. render.js — DOM updates, no fetch. main.js — wire events, call api, call render. Test api and utils without browser.',
            doThis: 'Refactor post browser into api.js, render.js, main.js. main.js under 50 lines.',
          },
          {
            title: 'Environment variables (preview)',
            body: 'Vite exposes import.meta.env.VITE_* to client code. Never put secrets in frontend env vars — they ship to browsers.',
            doThis: 'Add VITE_API_BASE to .env. Use it in api.js. Document in README.',
          },
        ],
        checklist: [
          'Utils in separate module',
          'Vite project runs',
          'api/render/main split complete',
          'main.js is thin orchestrator',
          'Env var pattern documented',
        ],
        practice: {
          title: 'Module refactor',
          brief: 'Take any script >100 lines. Split into 3+ modules with clear boundaries. No circular imports.',
        },
        resources: [
          r('doc', 'MDN — JavaScript modules', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules', 'EN'),
          r('doc', 'Vite — Getting Started', 'https://vite.dev/guide/', 'EN'),
          r('doc', 'javascript.info — Modules', 'https://javascript.info/modules-intro', 'EN'),
        ],
      }),

      ch({
        id: 'js-vitest',
        phase: 'D · Modules & Testing',
        level: 'intermediate',
        title: 'Unit testing with Vitest',
        minutes: 50,
        durationLabel: 'Week 7',
        overview:
          'Tests encode expectations so refactors do not break behavior. Vitest is fast, Vite-native, Jest-compatible. Arrange-Act-Assert. Test pure functions first. Mock fetch for API modules. Coverage is a guide, not a goal.',
        learn: ['Vitest setup', 'describe/it/expect', 'Testing pure functions', 'Mocking fetch', 'Test-driven habit'],
        steps: [
          {
            title: 'Install Vitest',
            body: 'npm install -D vitest. Add "test": "vitest" to package.json scripts. Co-locate tests as *.test.js or in __tests__/.',
            doThis: 'Add Vitest to your Vite project. Write one passing test to verify setup.',
            code: 'npm install -D vitest\n\n// package.json\n"scripts": { "test": "vitest", "test:run": "vitest run" }',
          },
          {
            title: 'First tests',
            body: 'describe groups tests. it (or test) is one case. expect(value).toBe(expected) for primitives, .toEqual for objects/arrays.',
            doThis: 'Test titleCase: normal input, empty string, single word, multiple spaces.',
            code: 'import { describe, it, expect } from "vitest"\nimport { titleCase } from "./utils.js"\n\ndescribe("titleCase", () => {\n  it("capitalizes each word", () => {\n    expect(titleCase("hello world")).toBe("Hello World")\n  })\n  it("returns empty for empty input", () => {\n    expect(titleCase("")).toBe("")\n  })\n})',
          },
          {
            title: 'Test edge cases',
            body: 'Empty, null-ish, boundary values, error paths. Tests document intended behavior for the next reader.',
            doThis: 'Add 5+ tests for your data transformer from the arrays chapter.',
            items: [
              'Happy path — typical input',
              'Empty input',
              'Single item',
              'Invalid input (if applicable)',
              'Boundary values',
            ],
          },
          {
            title: 'Mock fetch',
            body: 'vi.fn() and global.fetch = vi.fn() for API tests. Return mock Response with ok and json(). Reset mocks in beforeEach.',
            doThis: 'Test getPost(id) with mocked fetch returning fake JSON and throwing on 404.',
            code: 'import { vi } from "vitest"\n\nvi.stubGlobal("fetch", vi.fn())\n\nfetch.mockResolvedValue({\n  ok: true,\n  json: () => Promise.resolve({ title: "Test" }),\n})',
          },
          {
            title: 'When to test',
            body: 'Always: pure business logic, parsers, validators. Sometimes: integration with mocked I/O. Rarely: DOM (use E2E tools later).',
            doThis: 'Aim for 10+ tests across utils and api modules. npm run test:run green.',
            tip: 'Red-green-refactor: write failing test, make it pass, clean up.',
          },
        ],
        checklist: [
          'Vitest installed and running',
          'titleCase has 4+ test cases',
          'Data transformer tested',
          'API module tested with mocked fetch',
          'All tests green in CI-ready run',
        ],
        practice: {
          title: 'Test coverage push',
          brief: 'Add tests until utils.js and api.js core functions are covered. Document how to run tests in README.',
        },
        resources: [
          r('doc', 'Vitest — Getting Started', 'https://vitest.dev/guide/', 'EN'),
          r('doc', 'Vitest — Mocking', 'https://vitest.dev/guide/mocking.html', 'EN'),
          r('practice', 'Test Automation University — JS testing intro', 'https://testautomationu.applitools.com/', 'EN'),
        ],
      }),

      ch({
        id: 'js-event-loop',
        phase: 'E · Deep JS',
        level: 'advanced',
        title: 'Event loop, closures & this',
        minutes: 55,
        durationLabel: 'Week 8–9',
        overview:
          'The event loop processes call stack, microtasks (Promises), and macrotasks (setTimeout) in a specific order — interview gold. Closures capture outer variables. this binding depends on call site (arrow functions inherit lexical this). These models explain flaky tests and framework behavior.',
        learn: ['Call stack & task queues', 'Microtasks vs macrotasks', 'Closures in practice', 'this binding rules', 'Common interview snippets'],
        steps: [
          {
            title: 'Event loop order',
            body: 'Run sync code first. Drain all microtasks (Promise callbacks). Then one macrotask (setTimeout). Repeat. That is why Promise.then runs before setTimeout(0).',
            doThis: 'Predict output, then run: console.log(1); setTimeout(()=>console.log(2)); Promise.resolve().then(()=>console.log(3)); console.log(4).',
            code: 'console.log("1 sync")\nsetTimeout(() => console.log("2 macrotask"), 0)\nPromise.resolve().then(() => console.log("3 microtask"))\nconsole.log("4 sync")\n// Output: 1, 4, 3, 2',
          },
          {
            title: 'Three more snippets',
            body: 'Practice until predictions are reliable. Draw the queue on paper if needed.',
            doThis: 'Run 3 async snippets from javascript.info or Lydia Hallie\'s visual. Write predicted vs actual in notes.',
            items: [
              'Nested setTimeout + Promise chains',
              'async function with await vs bare Promise.then',
              'Multiple Promise.then in sequence',
            ],
          },
          {
            title: 'Closures',
            body: 'Inner function closes over outer variables even after outer returns. Classic: loop with var + setTimeout bug; fix with let or IIFE.',
            doThis: 'Write createCounter() returning {increment, getCount} using closure. Count is private.',
            code: 'function createCounter() {\n  let count = 0\n  return {\n    increment: () => ++count,\n    getCount: () => count,\n  }\n}',
          },
          {
            title: 'this binding',
            body: 'Regular function: this = call site (obj.method()). Arrow function: this = enclosing lexical scope. bind/call/apply override.',
            doThis: 'Demonstrate obj.getName() vs const fn = obj.getName; fn() losing this. Fix with arrow method or bind.',
          },
          {
            title: 'Why tests flake',
            body: 'Missing await, race between assertion and microtask, setTimeout without waiting. Event loop literacy prevents automation pain.',
            doThis: 'Write a flaky-looking test that fails without await and passes with it. Comment why.',
          },
        ],
        checklist: [
          'Event loop snippet predictions correct',
          'createCounter closure works',
          'this binding demo documented',
          'Flaky test example with explanation',
        ],
        practice: {
          title: 'Event loop quiz',
          brief: 'Create 5 code snippets with mixed sync/async. Quiz a friend or future self. Answer key in comments.',
        },
        resources: [
          r('video', 'Philip Roberts — What the heck is the event loop?', 'https://www.youtube.com/watch?v=8aGhZQkoFbQ', 'EN'),
          r('doc', 'Loupe — Event loop visualizer', 'http://latentflip.com/loupe/', 'EN'),
          r('book', 'You Don\'t Know JS — Scope & Closures', 'https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures', 'EN'),
        ],
      }),

      ch({
        id: 'js-checkpoint-b',
        kind: 'checkpoint',
        phase: 'E · Deep JS',
        level: 'advanced',
        title: 'Checkpoint B — Async, modules & tests',
        minutes: 40,
        durationLabel: 'Gate · Week 9–10',
        overview:
          'Prove you can ship a modular async app with tests and explain the event loop. This is the bar for "I know JavaScript" on a resume or in a QA automation interview.',
        learn: ['Integration readiness', 'Interview prep'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify every item. Fix gaps this week.',
            items: [
              'Vite project with api/render/main module split',
              'Fetch app with loading, success, error, retry states',
              '10+ Vitest tests, all green via npm run test:run',
              'Can explain event loop order (sync → microtasks → macrotask) without notes',
              'Can explain closure with createCounter example',
              'GitHub repo with README, meaningful commit history',
            ],
          },
          {
            title: 'Mock interview',
            body: 'Practice aloud: "What happens when you await fetch?" "Difference between == and ===?" "What is event delegation?"',
            doThis: 'Record 5-minute answers to those three questions. Re-record until smooth.',
          },
          {
            title: 'Code quality pass',
            body: 'Run ESLint if configured. Remove console.logs except intentional ones. Ensure no hardcoded URLs without env var.',
            doThis: 'Final polish commit: "chore: checkpoint B ready".',
          },
        ],
        checklist: [
          'All 6 pass criteria met',
          'Mock interview recorded',
          'Polish commit pushed',
        ],
        practice: {
          title: 'Green demo',
          brief: 'Screen record: run dev server, demo fetch app, run tests green. Save link or file for portfolio.',
        },
      }),

      ch({
        id: 'js-reading',
        phase: 'F · Pro',
        level: 'advanced',
        title: 'Reading unfamiliar codebases',
        minutes: 45,
        durationLabel: 'Week 10–11',
        overview:
          'Professional work is mostly reading, not writing. Start from entry point (main.js, index.html). Follow imports. Use grep/search for symbols. Debugger breakpoints beat console.log spam. Read tests to learn intended behavior. Leave code better — small rename PRs build trust.',
        learn: ['Entry point tracing', 'Search strategies', 'Debugger usage', 'Reading tests as docs', 'Safe refactoring'],
        steps: [
          {
            title: 'Find the entry point',
            body: 'package.json "main" or "module". index.html script tags. src/main.js in Vite. Start there; follow one user action end-to-end.',
            doThis: 'Clone a small open-source vanilla JS or Vite project (<500 lines). Identify entry point in 10 minutes.',
          },
          {
            title: 'Search with intent',
            body: 'Ripgrep/IDE search for function names, error strings, CSS classes. "Find references" on symbols. Read call hierarchy upward.',
            doThis: 'Pick one feature (e.g. "add todo"). Trace from button click to data save using search only.',
          },
          {
            title: 'Debugger over console',
            body: 'Breakpoints pause execution with full scope. Step over/into/out. Conditional breakpoints for loops. Network tab for fetch debugging.',
            doThis: 'Set breakpoint in fetch handler. Inspect response in debugger. Step through render path.',
          },
          {
            title: 'Tests as documentation',
            body: 'When behavior is unclear, read tests first. They show inputs, outputs, and edge cases the author cared about.',
            doThis: 'In your cloned repo, find test files. List 5 behaviors you learned from tests without reading implementation.',
          },
          {
            title: 'First contribution',
            body: 'Fix a typo, improve error message, add one test. Small PRs get merged. Read CONTRIBUTING.md if present.',
            doThis: 'Open a draft PR or local branch with one improvement to the cloned repo. Write clear commit message.',
            tip: 'If repo is too large, use GitHub code search or filter by path:src.',
          },
        ],
        checklist: [
          'Entry point identified in foreign repo',
          'One feature traced click-to-data',
          'Debugger session completed',
          '5 behaviors learned from tests',
          'One improvement drafted or PR opened',
        ],
        practice: {
          title: 'Architecture sketch',
          brief: 'Draw a one-page diagram: modules, data flow, external APIs. No code — boxes and arrows only.',
        },
        resources: [
          r('doc', 'GitHub — Searching code', 'https://docs.github.com/en/search-github/searching-on-github/searching-code', 'EN'),
          r('doc', 'Chrome DevTools — Sources panel', 'https://developer.chrome.com/docs/devtools/javascript/', 'EN'),
          r('tool', 'Sourcegraph — code search', 'https://sourcegraph.com/', 'EN'),
        ],
      }),

      ch({
        id: 'js-reference',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Timeline, tools & cheat sheet',
        minutes: 20,
        overview:
          'Return here when lost. Week map, daily tools, and quick-reference patterns for interviews and daily work.',
        learn: ['14-week map', 'Tool bookmarks', 'Interview quick hits'],
        steps: [
          {
            title: 'Week map',
            body: 'Weeks 1–2: values, functions, arrays. Week 3: DOM + Checkpoint A. Weeks 4–5: async, fetch. Week 6–7: modules, Vitest. Weeks 8–9: event loop + Checkpoint B. Weeks 10–11: reading codebases.',
            items: [
              'Weeks 1–2 — Fundamentals (values, functions, data)',
              'Week 3 — DOM + Checkpoint A',
              'Weeks 4–5 — Async & fetch',
              'Weeks 6–7 — Modules & Vitest',
              'Weeks 8–9 — Event loop + Checkpoint B',
              'Weeks 10–11 — Reading codebases',
            ],
          },
          {
            title: 'Daily tools',
            body: 'MDN for API reference. javascript.info for tutorials. DevTools console + debugger. Node REPL for quick experiments. Vitest for regression safety.',
            doThis: 'Bookmark this chapter. Pin MDN and javascript.info in browser.',
          },
          {
            title: 'Interview quick hits',
            body: '== vs ===, event loop order, closure definition, event delegation, Promise vs async/await, var/let/const, map vs forEach.',
            doThis: 'Write one-sentence answers for each. Update after mock interviews.',
          },
        ],
        checklist: ['Week map understood', 'Bookmarks saved', 'Interview answers drafted'],
      }),
    ],
    resources: {
      docs: [
        { name: 'javascript.info', url: 'https://javascript.info/' },
        { name: 'MDN JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
        { name: 'MDN Web API', url: 'https://developer.mozilla.org/en-US/docs/Web/API' },
        { name: 'Vitest Documentation', url: 'https://vitest.dev/' },
      ],
      tools: ['Node.js (LTS)', 'VS Code / Cursor', 'Chrome DevTools', 'Vite', 'Vitest', 'ESLint'],
      books: [
        'Eloquent JavaScript (Haverbeke)',
        'You Don\'t Know JS (Simpson)',
        'JavaScript: The Good Parts (Crockford) — skim',
      ],
      practice: [
        'https://javascript.info/task',
        'https://exercism.org/tracks/javascript',
        'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/',
      ],
      videos: [
        { name: 'Philip Roberts — Event Loop', url: 'https://www.youtube.com/watch?v=8aGhZQkoFbQ' },
        { name: 'Fireship — JavaScript in 100 seconds', url: 'https://www.youtube.com/watch?v=DHjqpvDnNGE' },
        { name: 'Traversy Media — JS Crash Course', url: 'https://www.youtube.com/watch?v=hdI2bqOjy3c' },
      ],
    },
  },

  {
    id: 'typescript',
    title: 'TypeScript',
    tagline: 'Types as documentation — catch bugs before runtime, migrate JS without drama.',
    category: 'foundations',
    accent: '#1D4E89',
    cover: 'covers/typescript-cover.png',
    duration: '4–8 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'JavaScript developers ready for safer, clearer code — front-end, Node, and QA automation engineers adopting typed tooling.',
    outcomes: [
      'Configure strict TypeScript and understand compiler errors',
      'Model data with types, interfaces, unions, and generics',
      'Apply utility types (Partial, Pick, Omit) in real code',
      'Type API responses and function signatures usefully',
      'Migrate a JavaScript project to TypeScript incrementally',
    ],
    pace: {
      hoursPerDay: '1 hour/day (≈ 5–7 hrs/week)',
      recommended: '~4–8 weeks part-time',
      accelerated: '~2–3 weeks at 2 hrs/day',
      slow: '~10–12 weeks if busy',
    },
    chapters: [
      ch({
        id: 'ts-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this path',
        minutes: 20,
        overview:
          'TypeScript is JavaScript plus static types — compiles away to JS. Complete the JavaScript path first (or equivalent). This path moves from strict setup through types and unions to generics, utility types, and migration. Types should help you, not fight you.',
        learn: [
          'Prerequisites and pace',
          'When types pay rent vs when to skip',
          'Migration mindset',
        ],
        steps: [
          {
            title: 'Prerequisites',
            body: 'Comfortable with JS: functions, objects, arrays, async/await, ES modules. If not, finish JavaScript Checkpoint A first.',
            doThis: 'Self-check: can you write a fetch + render app in vanilla JS modules? If no, pause and complete that.',
          },
          {
            title: 'Study pace',
            body: 'Plan 4–8 weeks at 6–10 hrs/week after JS fluency. Weeks 1–2: strict, types, unions. Weeks 3–4: generics, utilities, API typing. Weeks 5–6: migration + Checkpoint B.',
            doThis: 'Add a ts-journey folder or branch in your existing JS repo. You will migrate it incrementally.',
            items: [
              'Recommended: 6 weeks at ~8 hrs/week',
              'Accelerated: 4 weeks at 2 hrs/day',
              'Slow track: 8 weeks alongside other work',
            ],
          },
          {
            title: 'Rules of the road',
            body: 'strict: true always. Prefer inference — annotate when compiler cannot or when API clarity helps. never use any unless escaping hatch with comment. Read errors — they teach.',
            doThis: 'Read Checkpoint A and B criteria now. Note in README.',
            tip: 'TypeScript errors are suggestions, not insults. Hover in VS Code for plain-English hints.',
          },
        ],
        checklist: [
          'JS fundamentals solid (Checkpoint A equivalent)',
          'Repo or branch ready for TS',
          'Checkpoint criteria noted',
        ],
        practice: {
          title: 'Day zero',
          brief: 'Run npx tsc --version. In VS Code, open a .js file and confirm TypeScript language service works.',
        },
      }),

      ch({
        id: 'ts-strict',
        phase: 'A · Setup',
        level: 'beginner',
        title: 'Strict setup & compiler basics',
        minutes: 45,
        durationLabel: 'Week 1',
        overview:
          'tsconfig.json controls compilation. strict: true enables the checks that matter. tsc type-checks; Vite/esbuild bundle. Understand .ts vs .tsx. JSDoc @ts-check as a bridge from JS.',
        learn: ['tsconfig.json', 'strict flags', 'tsc vs bundler', 'VS Code TS features', 'JSDoc @ts-check bridge'],
        steps: [
          {
            title: 'Initialize TypeScript',
            body: 'npm install -D typescript. npx tsc --init. Set "strict": true, "module": "ESNext", "moduleResolution": "bundler", "outDir": "dist", "rootDir": "src".',
            doThis: 'Create tsconfig.json in your project. Add "typecheck": "tsc --noEmit" script.',
            code: 'npm install -D typescript\nnpx tsc --init\n\n// tsconfig.json highlights\n{\n  "compilerOptions": {\n    "strict": true,\n    "target": "ES2022",\n    "module": "ESNext",\n    "moduleResolution": "bundler",\n    "noEmit": true,\n    "skipLibCheck": true\n  },\n  "include": ["src"]\n}',
          },
          {
            title: 'First .ts file',
            body: 'Rename utils.js → utils.ts. Run tsc. Fix errors one at a time. Start with parameter types on exported functions.',
            doThis: 'Convert one utility file. Add types to all exported function params and returns.',
          },
          {
            title: 'Strict flags that matter',
            body: 'strict enables: noImplicitAny, strictNullChecks, strictFunctionTypes, etc. strictNullChecks alone prevents most null reference bugs.',
            doThis: 'Intentionally write let x: string = null — see error. Fix with string | null or ensure never null.',
            items: [
              'noImplicitAny — no untyped params',
              'strictNullChecks — null/undefined explicit',
              'strictFunctionTypes — safer callbacks',
              'noUncheckedIndexedAccess — array access may be undefined',
            ],
          },
          {
            title: 'VS Code superpowers',
            body: 'Hover for types. Cmd+click to definition. Quick fix lightbulb. Organize imports. Problems panel lists all errors.',
            doThis: 'Fix 5 errors using hover + quick fix only — no guessing.',
          },
          {
            title: 'JSDoc bridge',
            body: '// @ts-check at top of .js file enables checking without rename. Good for gradual migration.',
            doThis: 'Add @ts-check to one .js file. Add JSDoc @param types. Fix resulting errors.',
            code: '// @ts-check\n\n/**\n * @param {string} str\n * @returns {string}\n */\nfunction titleCase(str) { /* ... */ }',
          },
        ],
        checklist: [
          'tsconfig.json with strict: true',
          'One file converted to .ts',
          'npm run typecheck passes (or errors understood)',
          '@ts-check tried on one .js file',
        ],
        practice: {
          title: 'Strict or bust',
          brief: 'Convert utils.js fully to utils.ts with explicit exports typed. Zero implicit any.',
        },
        resources: [
          r('doc', 'TS Handbook — The Basics', 'https://www.typescriptlang.org/docs/handbook/2/basic-types.html', 'EN'),
          r('doc', 'TS tsconfig reference', 'https://www.typescriptlang.org/tsconfig', 'EN'),
          r('tool', 'TypeScript Playground', 'https://www.typescriptlang.org/play', 'EN'),
        ],
      }),

      ch({
        id: 'ts-types-interfaces',
        phase: 'A · Setup',
        level: 'beginner',
        title: 'Types, interfaces & inference',
        minutes: 50,
        durationLabel: 'Week 1–2',
        overview:
          'type and interface define object shapes. Use interface for object contracts, type for unions and computed shapes. Inference fills types when obvious. Annotate public API boundaries; let inference handle locals.',
        learn: ['type vs interface', 'Optional & readonly', 'Type inference', 'Function types', 'Literal types'],
        steps: [
          {
            title: 'Object shapes',
            body: 'interface User { id: number; name: string; email?: string }. Optional with ?. readonly for immutability hints.',
            doThis: 'Define User, Product, and Order interfaces for a shop domain. Include optional fields.',
            code: 'interface User {\n  id: number\n  name: string\n  email?: string\n  readonly createdAt: string\n}',
          },
          {
            title: 'type vs interface',
            body: 'Interface: extend with extends, merge declarations. Type: unions, intersections, mapped types. For object-only shapes, either works — pick one style per project.',
            doThis: 'Write same shape as interface and type alias. Extend both with AdminUser adding role.',
          },
          {
            title: 'Function types',
            body: 'type Handler = (event: MouseEvent) => void. Or inline: function greet(name: string): string.',
            doThis: 'Type your utils: titleCase(str: string): string, sum(...nums: number[]): number.',
          },
          {
            title: 'Inference in action',
            body: 'const x = [1, 2, 3] infers number[]. let the compiler infer locals; annotate function returns at module boundaries.',
            doThis: 'Remove explicit types from one function body. Confirm hover shows correct inferred type.',
            tip: 'If inference result is too wide (string instead of "admin"|"user"), add as const or explicit annotation.',
          },
          {
            title: 'Literal and template types',
            body: 'type Status = "pending" | "active" | "archived". Template: type EventName = `on${Capitalize<string>}`.',
            doThis: 'Define OrderStatus union. Function setStatus(id: number, status: OrderStatus) with exhaustiveness.',
          },
        ],
        checklist: [
          'User/Product/Order interfaces defined',
          'Function types on all utils exports',
          'OrderStatus literal union used',
          'Inference understood — not over-annotating locals',
        ],
        practice: {
          title: 'Typed models',
          brief: 'Create types/models.ts with 5+ interfaces for your fetch app domain. Use them in api.ts.',
        },
        resources: [
          r('doc', 'TS Handbook — Objects', 'https://www.typescriptlang.org/docs/handbook/2/objects.html', 'EN'),
          r('doc', 'TS Handbook — Functions', 'https://www.typescriptlang.org/docs/handbook/2/functions.html', 'EN'),
          r('book', 'Effective TypeScript — Item 13: type vs interface', 'https://effectivetypescript.com/', 'EN'),
        ],
      }),

      ch({
        id: 'ts-unions',
        phase: 'B · Modeling',
        level: 'intermediate',
        title: 'Unions, narrowing & discriminated unions',
        minutes: 50,
        durationLabel: 'Week 2',
        overview:
          'Union types model "A or B". Narrowing refines unions with typeof, instanceof, in, and truthiness checks. Discriminated unions add a shared literal field for exhaustive switch — the pattern for API states and UI machines.',
        learn: ['Union types', 'Type narrowing', 'Discriminated unions', 'Exhaustiveness checking', 'never type'],
        steps: [
          {
            title: 'Basic unions',
            body: 'type Id = string | number. Functions accepting unions must handle all cases or narrow first.',
            doThis: 'Write formatId(id: string | number): string handling both.',
          },
          {
            title: 'Narrowing techniques',
            body: 'typeof for primitives. instanceof for classes. "field" in obj for object shapes. Truthiness for null/undefined.',
            doThis: 'Write printValue(val: string | number | boolean) using typeof narrowing.',
            code: 'function printValue(val: string | number | boolean) {\n  if (typeof val === "string") console.log(val.toUpperCase())\n  else if (typeof val === "number") console.log(val.toFixed(2))\n  else console.log(val ? "yes" : "no")\n}',
          },
          {
            title: 'Discriminated unions',
            body: 'Shared literal field (kind/status) enables exhaustive switch. Compiler warns on missing cases with never.',
            doThis: 'Model fetch state: idle | loading | success | error with discriminated union. Render function with switch.',
            code: 'type FetchState<T> =\n  | { status: "idle" }\n  | { status: "loading" }\n  | { status: "success"; data: T }\n  | { status: "error"; message: string }',
          },
          {
            title: 'Exhaustiveness check',
            body: 'default: const _exhaustive: never = state catches unhandled cases at compile time.',
            doThis: 'Add a new status to union. See compiler error until switch updated.',
          },
          {
            title: 'Result type pattern',
            body: 'type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }. Safer than throw for expected failures.',
            doThis: 'Wrap getPost in Result<Post> instead of throwing. Caller narrows on ok.',
          },
        ],
        checklist: [
          'formatId handles string | number',
          'FetchState discriminated union defined',
          'Render switch is exhaustive',
          'Result type used in one API function',
        ],
        practice: {
          title: 'UI state machine',
          brief: 'Type a modal flow: closed | confirming | submitting | success | error. One renderModal(state) with exhaustive switch.',
        },
        resources: [
          r('doc', 'TS Handbook — Narrowing', 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html', 'EN'),
          r('doc', 'TS Handbook — Discriminated Unions', 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions', 'EN'),
          r('doc', 'Total TypeScript — Discriminated Unions', 'https://www.totaltypescript.com/discriminated-unions-are-a-devs-best-friend', 'EN'),
        ],
      }),

      ch({
        id: 'ts-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Modeling',
        level: 'intermediate',
        title: 'Checkpoint A — Strict types & unions',
        minutes: 30,
        durationLabel: 'Gate · Week 2–3',
        overview:
          'Before generics and utilities, prove strict setup works and you can model real states with unions. Fix gaps before Phase C.',
        learn: ['Type safety self-check'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Audit each criterion. Fix failures before continuing.',
            items: [
              'tsconfig strict: true, npm run typecheck script works',
              'Core utils converted to .ts with typed params and returns',
              'Domain models (User, Post, etc.) in types/models.ts',
              'FetchState or Result discriminated union in use',
              'Zero any (or each any has // ponytail: escape hatch comment)',
              'Can explain type vs interface in one sentence',
            ],
          },
          {
            title: 'Error reading drill',
            body: 'Copy 3 compiler errors into notes. Write plain English for each. Fix without Stack Overflow if possible.',
            doThis: 'Intentionally break types. Fix from error messages alone.',
          },
        ],
        checklist: [
          'All 6 pass criteria met',
          '3 errors decoded and fixed',
        ],
        practice: {
          title: 'Typecheck green',
          brief: 'npm run typecheck && npm run test:run both green on your project.',
        },
      }),

      ch({
        id: 'ts-generics',
        phase: 'C · Reuse',
        level: 'intermediate',
        title: 'Generics',
        minutes: 50,
        durationLabel: 'Week 3',
        overview:
          'Generics are type parameters — reusable functions and types that work across shapes while preserving type relationships. <T> on functions, interfaces, and classes. Constraints with extends. Avoid generic abuse — if T appears once, skip it.',
        learn: ['Generic functions', 'Generic interfaces', 'Constraints (extends)', 'Default type params', 'Generic pitfalls'],
        steps: [
          {
            title: 'Generic functions',
            body: 'function first<T>(arr: T[]): T | undefined returns element type matching input. Caller picks T via argument.',
            doThis: 'Write first, last, and findById<T>(items: T[], id: number, key: keyof T).',
            code: 'function first<T>(arr: T[]): T | undefined {\n  return arr[0]\n}\n\nconst n = first([1, 2, 3])     // number | undefined\nconst s = first(["a", "b"])   // string | undefined',
          },
          {
            title: 'Generic interfaces',
            body: 'interface ApiResponse<T> { data: T; status: number; }. Fetch functions return ApiResponse<Post>.',
            doThis: 'Wrap your fetch helpers to return ApiResponse<T>. Type JSONPlaceholder posts and users.',
          },
          {
            title: 'Constraints',
            body: 'function longest<T extends { length: number }>(a: T, b: T): T accesses .length safely.',
            doThis: 'Write sortByKey<T, K extends keyof T>(items: T[], key: K): T[].',
          },
          {
            title: 'Default type parameters',
            body: 'type ApiResult<T = unknown> = ... — fallback when caller omits T.',
            doThis: 'Add default to ApiResponse generic. Use with and without explicit type arg.',
          },
          {
            title: 'When NOT to generic',
            body: 'If function only works with User, type User — do not genericize for vanity. Generics when shape repeats across types.',
            doThis: 'Review your generics. Remove any where T is used only once and never constrained.',
            tip: 'Hover generic calls in VS Code — verify T inferred correctly.',
          },
        ],
        checklist: [
          'first/last/findById generics work',
          'ApiResponse<T> wraps fetch results',
          'sortByKey with keyof constraint',
          'Removed unnecessary generics',
        ],
        practice: {
          title: 'Generic cache',
          brief: 'Create Cache<T> class with get(key: string): T | undefined, set(key: string, value: T). Type-safe for any T.',
        },
        resources: [
          r('doc', 'TS Handbook — Generics', 'https://www.typescriptlang.org/docs/handbook/2/generics.html', 'EN'),
          r('doc', 'Total TypeScript — Generics', 'https://www.totaltypescript.com/tutorials/beginners-typescript/generics', 'EN'),
          r('video', 'Fireship — TypeScript in 100 seconds', 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA', 'EN'),
        ],
      }),

      ch({
        id: 'ts-utility',
        phase: 'C · Reuse',
        level: 'intermediate',
        title: 'Utility types',
        minutes: 45,
        durationLabel: 'Week 3–4',
        overview:
          'Built-in type transformers: Partial, Required, Pick, Omit, Record, Readonly, ReturnType, Parameters. Compose them for DRY API types. keyof and indexed access types unlock advanced patterns.',
        learn: ['Partial & Required', 'Pick & Omit', 'Record & Readonly', 'ReturnType & Parameters', 'keyof patterns'],
        steps: [
          {
            title: 'Partial and Required',
            body: 'Partial<User> makes all fields optional — update DTOs. Required<User> opposite — after validation.',
            doThis: 'Create UpdateUserInput = Partial<Pick<User, "name" | "email">>.',
          },
          {
            title: 'Pick and Omit',
            body: 'Pick<User, "id" | "name"> for list views. Omit<User, "password"> for public API.',
            doThis: 'Define PublicUser = Omit<User, "email"> and UserSummary = Pick<User, "id" | "name">.',
            code: 'type PublicUser = Omit<User, "password">\ntype UserSummary = Pick<User, "id" | "name">',
          },
          {
            title: 'Record and Readonly',
            body: 'Record<string, number> for dictionaries. Readonly<User> prevents mutation at type level.',
            doThis: 'Type a scores map: Record<string, number>. Function accept Readonly<User>.',
          },
          {
            title: 'ReturnType and Parameters',
            body: 'Extract function return: ReturnType<typeof getPost>. Extract args: Parameters<typeof getPost>[0].',
            doThis: 'type Post = Awaited<ReturnType<typeof getPost>>. Use instead of duplicating interface.',
          },
          {
            title: 'Compose utilities',
            body: 'Real patterns combine: Partial<Pick<...>>, Readonly<Record<...>>. Do not hand-write what utilities provide.',
            doThis: 'Refactor 2 duplicated types to use Pick/Omit/Partial composition.',
          },
        ],
        checklist: [
          'UpdateUserInput uses Partial + Pick',
          'PublicUser and UserSummary defined',
          'ReturnType extracts Post from getPost',
          '2 types refactored to utility composition',
        ],
        practice: {
          title: 'Form types',
          brief: 'CreateUserForm = Omit<User, "id"|"createdAt">. UpdateUserForm = Partial<CreateUserForm>. Wire to mock handlers.',
        },
        resources: [
          r('doc', 'TS Handbook — Utility Types', 'https://www.typescriptlang.org/docs/handbook/utility-types.html', 'EN'),
          r('doc', 'Type Challenges — easy utilities', 'https://github.com/type-challenges/type-challenges', 'EN'),
          r('tool', 'Utility Types visualizer (search)', 'https://www.typescriptlang.org/play', 'EN'),
        ],
      }),

      ch({
        id: 'ts-typing-apis',
        phase: 'D · Integration',
        level: 'intermediate',
        title: 'Typing APIs & external data',
        minutes: 50,
        durationLabel: 'Week 4',
        overview:
          'API responses are unknown until validated. Type fetch JSON with interfaces. Zod or manual guards for runtime check. unknown vs any — always prefer unknown for external data. Typed environment variables and module augmentation preview.',
        learn: ['Typing fetch responses', 'unknown vs any', 'Type guards', 'Zod lite', 'Env typing'],
        steps: [
          {
            title: 'Type API responses',
            body: 'Define Post interface matching JSONPlaceholder. getPost(id: number): Promise<Post>. Trust but verify at boundaries.',
            doThis: 'Type all fetch functions with explicit return types. No bare Promise<any>.',
            code: 'interface Post {\n  id: number\n  userId: number\n  title: string\n  body: string\n}\n\nasync function getPost(id: number): Promise<Post> {\n  const res = await fetch(`${BASE}/posts/${id}`)\n  if (!res.ok) throw new Error(`HTTP ${res.status}`)\n  return res.json() as Promise<Post> // trust + validate in prod\n}',
          },
          {
            title: 'unknown over any',
            body: 'any disables checking. unknown requires narrowing before use. JSON.parse returns any by default — cast to unknown first.',
            doThis: 'Write parseJson(raw: string): unknown. Narrow with typeof/object check before use.',
          },
          {
            title: 'Type guards',
            body: 'function isPost(val: unknown): val is Post { return typeof val === "object" && val !== null && "title" in val }.',
            doThis: 'Implement isPost guard. Use in getPost before return.',
          },
          {
            title: 'Zod lite (optional)',
            body: 'npm install zod. PostSchema = z.object({...}). PostSchema.parse(data) throws on mismatch — runtime + static types.',
            doThis: 'Add Zod schema for Post. Parse response in getPost. Export type Post = z.infer<typeof PostSchema>.',
            code: 'import { z } from "zod"\n\nconst PostSchema = z.object({\n  id: z.number(),\n  userId: z.number(),\n  title: z.string(),\n  body: z.string(),\n})\n\ntype Post = z.infer<typeof PostSchema>',
          },
          {
            title: 'Typed environment',
            body: 'declare ImportMetaEnv in vite-env.d.ts. Validate env at startup. Fail fast on missing VITE_API_BASE.',
            doThis: 'Add vite-env.d.ts with interface ImportMetaEnv { readonly VITE_API_BASE: string }.',
          },
        ],
        checklist: [
          'All fetch returns explicitly typed',
          'isPost type guard implemented',
          'Zod or manual validation at boundary',
          'Env types in vite-env.d.ts',
        ],
        practice: {
          title: 'API client module',
          brief: 'Typed api/client.ts: getPosts(): Promise<Post[]>, createPost(input: CreatePostInput): Promise<Post>. Validated responses.',
        },
        resources: [
          r('doc', 'TS Handbook — Narrowing with type predicates', 'https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates', 'EN'),
          r('doc', 'Zod — Introduction', 'https://zod.dev/', 'EN'),
          r('doc', 'Vite — Env variables', 'https://vite.dev/guide/env-and-mode.html', 'EN'),
        ],
      }),

      ch({
        id: 'ts-migration',
        phase: 'D · Integration',
        level: 'advanced',
        title: 'Migration strategy',
        minutes: 45,
        durationLabel: 'Week 5',
        overview:
          'Migrate incrementally — never big-bang rewrite. allowJs + checkJs → rename leaves → tighten strict → delete any. JavaScript consumes TypeScript; TypeScript compiles to JS. Keep shipping throughout.',
        learn: ['allowJs / checkJs', 'Rename order (leaves first)', 'JSDoc migration path', 'Incremental strict', 'Team rollout'],
        steps: [
          {
            title: 'Enable allowJs',
            body: 'tsconfig: allowJs: true, checkJs: true (optional). .ts and .js coexist. TypeScript checks JSDoc-annotated JS.',
            doThis: 'Add allowJs to tsconfig. Run typecheck — note JS + TS errors together.',
          },
          {
            title: 'Migration order',
            body: '1) Utils (no dependencies). 2) Types/models. 3) API layer. 4) UI/DOM last. Each step: rename, fix errors, commit, ship.',
            doThis: 'Write 5-step migration plan for your js-journey repo. Mark step 1 complete.',
            items: [
              'Step 1 — utils + types (leaf nodes)',
              'Step 2 — api module',
              'Step 3 — render/DOM module',
              'Step 4 — main entry + tests',
              'Step 5 — remove allowJs, all .ts',
            ],
          },
          {
            title: 'JSDoc first path',
            body: 'For large legacy: add @ts-check + JSDoc types before rename. Lower risk, slower payoff.',
            doThis: 'Pick one .js file not yet migrated. Add @ts-check and JSDoc. Fix errors without rename.',
          },
          {
            title: 'Handling any debt',
            body: '// @ts-expect-error with ticket link for known debt. Never silent @ts-ignore. Track any count — should decrease weekly.',
            doThis: 'Grep for any in project. List each with plan to remove. Fix one today.',
          },
          {
            title: 'CI typecheck gate',
            body: 'Add npm run typecheck to CI before tests. PRs cannot merge with type errors.',
            doThis: 'Add typecheck step to GitHub Actions or document local pre-push ritual.',
            code: '# .github/workflows/ci.yml snippet\n- run: npm run typecheck\n- run: npm run test:run',
          },
        ],
        checklist: [
          '5-step migration plan written',
          'allowJs enabled, coexistence working',
          'any inventory with removal plan',
          'typecheck in CI or pre-push ritual',
        ],
        practice: {
          title: 'Migration sprint',
          brief: 'Complete migration steps 1–3 this week. All utils, types, api in .ts. typecheck green.',
        },
        resources: [
          r('doc', 'TS Handbook — Migrating from JavaScript', 'https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html', 'EN'),
          r('doc', 'Microsoft — TS Migration Guide', 'https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API', 'EN'),
          r('article', 'Incremental TS migration at scale', 'https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html', 'EN'),
        ],
      }),

      ch({
        id: 'ts-checkpoint-b',
        kind: 'checkpoint',
        phase: 'E · Job-ready',
        level: 'advanced',
        title: 'Checkpoint B — Typed project ready',
        minutes: 35,
        durationLabel: 'Gate · Week 5–6',
        overview:
          'Final gate: a strictly typed project with generics, utilities, typed API, and migration complete enough to demo in an interview.',
        learn: ['Interview TS topics', 'Portfolio readiness'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify every item. Fix gaps this week.',
            items: [
              'strict: true, typecheck + tests green in CI or locally',
              'Domain models + discriminated union (FetchState/Result)',
              'Generic ApiResponse or equivalent in use',
              'Utility types (Pick/Omit/Partial) — not hand-duplicated shapes',
              'API responses typed with guard or Zod validation',
              'Migration plan step 4+ complete (main + tests in TS)',
              'Can explain generic <T> and narrowing in 2 minutes',
            ],
          },
          {
            title: 'Interview drill',
            body: 'Common questions: any vs unknown, type vs interface, what strictNullChecks fixes, how infer works, example discriminated union.',
            doThis: 'Record 5-minute answers. Demo typed project in VS Code — hover types, go to definition.',
          },
          {
            title: 'What next',
            body: 'Apply TS to test automation (Playwright/Cypress typed page objects), React/Vue with TS, or Node backend. This library has paths for each.',
            doThis: 'Write 3 next-skill goals for 90 days.',
          },
        ],
        checklist: [
          'All 7 pass criteria met',
          'Interview drill recorded',
          '90-day goals written',
        ],
        practice: {
          title: 'Typed demo',
          brief: 'Screen record: typecheck, tests, quick code walk showing generics + discriminated union. Portfolio ready.',
        },
      }),

      ch({
        id: 'ts-reference',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Cheat sheet & interview topics',
        minutes: 15,
        overview:
          'Quick reference for daily TS work and common interview questions. Return when stuck.',
        learn: ['6-week map', 'Utility quick ref', 'Interview answers'],
        steps: [
          {
            title: 'Week map',
            items: [
              'Week 1 — Strict setup, types/interfaces',
              'Week 2 — Unions, narrowing + Checkpoint A',
              'Week 3 — Generics, utility types',
              'Week 4 — Typing APIs',
              'Week 5 — Migration strategy',
              'Week 6 — Checkpoint B + polish',
            ],
          },
          {
            title: 'Utility quick ref',
            body: 'Partial<T> optional all. Required<T> required all. Pick<T,K> subset. Omit<T,K> exclude. Record<K,V> dict. ReturnType<F> extract return.',
            doThis: 'Bookmark TS Handbook utility types page.',
          },
          {
            title: 'Interview one-liners',
            body: 'any: opt out of checking. unknown: safe top type, narrow first. interface: extend/merge. type: unions/intersections. never: exhaustiveness sink.',
            doThis: 'Maintain living doc of TS interview Q&A in repo docs/ts-interview.md.',
          },
        ],
        checklist: ['Cheat sheet bookmarked', 'Interview doc started'],
      }),
    ],
    resources: {
      docs: [
        { name: 'TypeScript Handbook', url: 'https://www.typescriptlang.org/docs/handbook/intro.html' },
        { name: 'Total TypeScript', url: 'https://www.totaltypescript.com/' },
        { name: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play' },
        { name: 'Zod Documentation', url: 'https://zod.dev/' },
      ],
      tools: ['TypeScript (tsc)', 'VS Code', 'Vite', 'Vitest', 'Zod', 'ESLint + typescript-eslint'],
      books: [
        'Effective TypeScript (Vanderkam)',
        'Programming TypeScript (Boris Cherny) — skim',
      ],
      practice: [
        'https://github.com/type-challenges/type-challenges',
        'Convert a todo app from JS to TS',
        'Type a Playwright page object',
      ],
      videos: [
        { name: 'Fireship — TypeScript in 100 seconds', url: 'https://www.youtube.com/watch?v=zQnBQ4tB3ZA' },
        { name: 'Matt Pocock — Total TypeScript tips', url: 'https://www.youtube.com/@mattpocockuk' },
      ],
    },
  },

  {
    id: 'python',
    title: 'Python',
    tagline: 'Readable power — venv, pytest, and httpx for automation glue.',
    category: 'foundations',
    accent: '#3F6212',
    cover: 'covers/python-cover.png',
    duration: '8–14 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Beginners and QA/devs building Python fluency before or alongside the Playwright + Python path — not data science, not Django.',
    outcomes: [
      'Create venv per project, manage dependencies with requirements.txt, and avoid global pip pollution',
      'Write readable functions, modules, and JSON/file helpers with type hints lite',
      'Test with pytest — fixtures, parametrize, conftest.py — the same stack Playwright uses',
      'Call REST APIs with httpx, handle errors with logging, and ship small CLI glue scripts',
      'Package scripts for reuse with pyproject.toml basics — enough to share tools across repos',
    ],
    pace: {
      hoursPerDay: '1–1.5 hours/day (≈ 7–10 hrs/week)',
      recommended: '~5–8 weeks part-time',
      accelerated: '~3–4 weeks at 2–3 hrs/day',
      slow: '~10–12 weeks if busy',
    },
    chapters: [
      ch({
        id: 'py-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this Python path',
        minutes: 20,
        overview:
          'This path builds Python fluency for automation — not data science, not web frameworks. It complements the Playwright + Python roadmap: master venv, syntax, pytest, and httpx here; browser automation lives there. Do not duplicate Playwright chapters.',
        learn: [
          'How this path fits the Playwright curriculum',
          'venv-first workflow',
          'Stop rules before moving on',
        ],
        steps: [
          {
            title: 'Complement, not duplicate',
            body: 'Playwright path covers browser tests end-to-end. This path covers Python itself: environments, syntax, pytest, httpx. If you are on the Playwright roadmap, treat this as a parallel foundation track.',
            doThis: 'Create py-journey/ repo. Note in README: "Foundation track — pairs with Playwright path."',
          },
          {
            title: 'Study pace',
            body: '1–1.5 hrs/day. Finish venv + syntax before deep pytest. httpx after you can write functions and read JSON.',
            doThis: 'Block calendar slots. Target finish date in README.',
            items: [
              'Weeks 1–2: venv, syntax, functions',
              'Weeks 3–4: files, JSON, pytest',
              'Weeks 5–6: httpx, logging, checkpoint',
            ],
          },
          {
            title: 'Job-ready definition',
            body: 'You are ready when you can: create/activate venv, write tested pure functions, load JSON config, call an API with httpx, and explain why global pip installs are avoided.',
            doThis: 'Add checklist to README.',
          },
        ],
        checklist: ['py-journey repo created', 'Python 3.11+ verified', 'README with timeline'],
        practice: { title: 'Hello venv', brief: 'python -m venv .venv, activate, python --version in README.' },
        resources: [
          r('doc', 'Python Tutorial (official)', 'https://docs.python.org/3/tutorial/', 'EN'),
          r('doc', 'Real Python — venv', 'https://realpython.com/python-virtual-environments-a-primer/', 'EN'),
        ],
      }),

      ch({
        id: 'py-venv',
        phase: 'A · Setup',
        level: 'beginner',
        title: 'Virtual environments & toolchain',
        minutes: 40,
        durationLabel: 'Week 1',
        overview: 'Never pollute global Python. venv per project. pip install inside venv. requirements.txt for reproducibility.',
        learn: ['python -m venv', 'activate/deactivate', 'pip install', 'requirements.txt'],
        steps: [
          {
            title: 'Create and activate venv',
            body: 'python -m venv .venv creates an isolated environment. Activate before every session.',
            doThis: 'Create .venv in py-journey. Activate. Run which python (or where python on Windows).',
            code: 'python -m venv .venv\n\n# macOS / Linux\nsource .venv/bin/activate\n\n# Windows\n.venv\\Scripts\\activate\n\npython --version\npip --version',
          },
          {
            title: 'Install packages',
            body: 'pip install httpx pytest. pip freeze > requirements.txt commits exact versions.',
            doThis: 'pip install httpx pytest. pip freeze > requirements.txt. Commit both.',
          },
          {
            title: 'Editor setup',
            body: 'VS Code / Cursor: select .venv interpreter. Python extension enables run/debug.',
            doThis: 'Open py-journey in editor. Confirm interpreter points to .venv.',
            tip: 'Forgot to activate? Symptoms: ModuleNotFoundError for packages you "installed".',
          },
        ],
        checklist: ['venv activates cleanly', 'requirements.txt committed', 'Editor uses .venv interpreter'],
        practice: { title: 'Fresh clone drill', brief: 'Delete .venv, recreate, pip install -r requirements.txt — still works.' },
        resources: [r('doc', 'venv — official docs', 'https://docs.python.org/3/library/venv.html', 'EN')],
      }),

      ch({
        id: 'py-syntax',
        phase: 'A · Setup',
        level: 'beginner',
        title: 'Syntax, types & control flow',
        minutes: 50,
        durationLabel: 'Week 1–2',
        overview: 'Indentation, variables, strings, f-strings, if/for, lists, dicts. Enough to read test code and write helpers.',
        learn: ['Indentation rules', 'f-strings', 'if/elif/else', 'for loops', 'lists and dicts'],
        steps: [
          {
            title: 'Variables and f-strings',
            body: 'Dynamic typing — types exist at runtime. f-strings are the readable default for formatting.',
            doThis: 'Script that stores username/password and prints formatted login attempt.',
            code: 'username = "standard_user"\npassword = "secret_sauce"\nprint(f"Attempting login for {username}")',
          },
          {
            title: 'Control flow',
            body: 'if/elif/else for branching. for item in items for iteration. while sparingly.',
            doThis: 'Loop over 3 invalid passwords; print whether each is empty or too short.',
          },
          {
            title: 'Lists and dicts',
            body: 'Lists ordered, dicts keyed. List comprehensions when readable. dict.get(key, default) avoids KeyError.',
            doThis: 'users = [{"name":"A","role":"admin"},{"name":"B","role":"user"}]. Filter admins, print names.',
            code: 'admins = [u["name"] for u in users if u.get("role") == "admin"]',
          },
        ],
        checklist: ['f-strings used', 'for loop with if', 'dict .get used'],
        practice: { title: 'Password validator', brief: 'Function is_valid_password(s) → bool with length and empty checks.' },
        resources: [
          r('doc', 'Python — Control Flow', 'https://docs.python.org/3/tutorial/controlflow.html', 'EN'),
          r('lab', 'HackerRank — Python', 'https://www.hackerrank.com/domains/python', 'EN'),
        ],
      }),

      ch({
        id: 'py-functions',
        phase: 'B · Structure',
        level: 'beginner',
        title: 'Functions, modules & packages',
        minutes: 45,
        durationLabel: 'Week 2',
        overview: 'def, return, default args, type hints lite, import, project layout with src/ and tests/.',
        learn: ['Functions and returns', 'Default arguments', 'Modules and imports', 'Type hints lite'],
        steps: [
          {
            title: 'Write functions',
            body: 'Pure functions first — same input, same output, no side effects. Easier to test.',
            doThis: 'Write is_valid_email(s), normalize_phone(s), build_url(base, path).',
            code: 'def is_valid_email(s: str) -> bool:\n    return "@" in s and "." in s.split("@")[-1]',
          },
          {
            title: 'Modules and imports',
            body: 'One file = one module. from helpers import foo or import helpers. Avoid circular imports.',
            doThis: 'Split helpers into src/helpers.py. Import from src/main.py.',
          },
          {
            title: 'Project layout',
            body: 'src/ for code, tests/ for pytest, requirements.txt at root. Standard layout employers recognize.',
            doThis: 'Restructure py-journey: src/, tests/, move helpers.',
            code: 'py-journey/\n  src/\n    helpers.py\n    main.py\n  tests/\n    test_helpers.py\n  requirements.txt',
          },
        ],
        checklist: ['3+ functions in src/', 'tests/ folder exists', 'Imports work from main'],
        practice: { title: 'Config loader', brief: 'load_config(path) → dict with try/except for missing file.' },
        resources: [r('doc', 'Python — Modules', 'https://docs.python.org/3/tutorial/modules.html', 'EN')],
      }),

      ch({
        id: 'py-files',
        phase: 'B · Structure',
        level: 'intermediate',
        title: 'Files, JSON & pathlib',
        minutes: 40,
        durationLabel: 'Week 2–3',
        overview: 'with open(...) for files. json.load/dump. pathlib.Path for cross-platform paths. Test data lives in JSON.',
        learn: ['with open context manager', 'json module', 'pathlib.Path', 'Reading test fixtures'],
        steps: [
          {
            title: 'Read and write files',
            body: 'with open(path) as f: always closes the file. Specify encoding="utf-8" on Windows.',
            doThis: 'Write users.json with 3 users. Load in Python and print usernames.',
            code: 'import json\n\nwith open("users.json", encoding="utf-8") as f:\n    users = json.load(f)\n\nfor u in users:\n    print(u["username"])',
          },
          {
            title: 'pathlib',
            body: 'Path("data/users.json") / "subdir" — cleaner than os.path.join.',
            doThis: 'Refactor file paths to use pathlib.Path.',
          },
          {
            title: 'Write JSON output',
            body: 'json.dump(data, f, indent=2) for readable output files from glue scripts.',
            doThis: 'Script: read CSV or JSON → transform → write summary.json.',
          },
        ],
        checklist: ['JSON load/save works', 'pathlib used', 'utf-8 encoding explicit'],
        practice: { title: 'Fixture reader', brief: 'load_fixture(name) loads tests/fixtures/{name}.json.' },
        resources: [r('doc', 'Python — json', 'https://docs.python.org/3/library/json.html', 'EN')],
      }),

      ch({
        id: 'py-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Structure',
        level: 'beginner',
        title: 'Checkpoint A — Syntax, modules & files',
        minutes: 30,
        durationLabel: 'Gate · Week 3–4',
        overview:
          'Before pytest and httpx, prove you can write clean Python in a proper project layout. Fix gaps before Phase C — the Playwright path assumes this baseline.',
        learn: ['Self-assessment', 'Project layout readiness'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'You pass when all six are true. Audit py-journey. Fix failures this week.',
            doThis: 'Mark pass/fail for each criterion in README. Fix failures before continuing.',
            items: [
              'venv activates; requirements.txt committed; no global pip installs for project deps',
              'src/ + tests/ layout with 5+ pure helper functions (no I/O in unit-testable ones)',
              'List comprehensions and dict .get used — not index errors on missing keys',
              'JSON load/save with pathlib.Path and encoding="utf-8"',
              'Can explain why indentation matters and what a module is in 60 seconds',
              'Code pushed to GitHub with 3+ meaningful commits',
            ],
          },
          {
            title: 'Code review yourself',
            body: 'Re-read helpers.py. Rename vague variables. Extract repeated logic. Remove dead code and print statements.',
            doThis: '30-minute refactor pass. Commit: "refactor: checkpoint A cleanup".',
          },
          {
            title: 'Playwright bridge',
            body: 'Playwright path uses the same venv, pytest, and src/ layout. If checkpoint A is shaky, browser tests will hurt.',
            doThis: 'Note in README: "Checkpoint A passed on [date]. Next: pytest chapter, then Playwright path for E2E."',
          },
        ],
        checklist: [
          'All 6 pass criteria met',
          'Refactor commit pushed',
          'README updated with checkpoint date',
        ],
        practice: {
          title: 'Rubber duck',
          brief: 'Explain venv, import, and json.load to an imaginary teammate in 3 minutes — no notes.',
        },
      }),

      ch({
        id: 'py-pytest',
        phase: 'C · Testing',
        level: 'intermediate',
        title: 'pytest fundamentals',
        minutes: 45,
        durationLabel: 'Week 3',
        overview: 'Arrange-act-assert. test_ prefix. assert directly. pytest discovers tests/ automatically.',
        learn: ['pytest discovery', 'assert style', 'Running pytest', 'Test naming'],
        steps: [
          {
            title: 'First tests',
            body: 'test_is_valid_email_true(), test_is_valid_email_false(). No unittest boilerplate.',
            doThis: '5 pytest tests for helpers from earlier chapters. pytest -v.',
            code: '# tests/test_helpers.py\nfrom src.helpers import is_valid_email\n\ndef test_valid_email():\n    assert is_valid_email("a@b.com") is True\n\ndef test_invalid_email():\n    assert is_valid_email("nope") is False',
          },
          {
            title: 'Arrange-act-assert',
            body: 'Setup data, call function, assert outcome. One logical assertion per test when possible.',
            doThis: 'Refactor one vague test into three focused tests.',
          },
          {
            title: 'Run and debug failures',
            body: 'pytest shows assertion diffs. pytest -k email runs subset. pytest --lf reruns last failures.',
            doThis: 'Break a test on purpose. Read failure output. Fix it.',
            tip: 'Keep tests fast — no network in unit tests. Mock or fixture files instead.',
          },
        ],
        checklist: ['5+ tests green', 'pytest -v passes', 'No network in unit tests'],
        practice: { title: 'Config tests', brief: 'Test load_config with missing file raises or returns default.' },
        resources: [r('doc', 'pytest — Getting Started', 'https://docs.pytest.org/en/stable/getting-started.html', 'EN')],
      }),

      ch({
        id: 'py-fixtures',
        phase: 'C · Testing',
        level: 'intermediate',
        title: 'Fixtures & parametrization',
        minutes: 40,
        durationLabel: 'Week 3–4',
        overview: '@pytest.fixture for shared setup. @pytest.mark.parametrize for data-driven tests. conftest.py for shared fixtures.',
        learn: ['@pytest.fixture', 'parametrize', 'conftest.py', 'Fixture scope'],
        steps: [
          {
            title: 'Fixtures',
            body: 'Fixture functions provide test data or clients. pytest injects by parameter name.',
            doThis: 'Create sample_users fixture returning list of dicts. Use in 2 tests.',
            code: 'import pytest\n\n@pytest.fixture\ndef sample_users():\n    return [{"username": "a"}, {"username": "b"}]\n\ndef test_user_count(sample_users):\n    assert len(sample_users) == 2',
          },
          {
            title: 'Parametrize',
            body: 'Run same test logic with multiple inputs. Great for validation functions.',
            doThis: 'Parametrize is_valid_password with 4 cases: valid, empty, short, long.',
            code: '@pytest.mark.parametrize("pwd,expected", [\n    ("secret123", True),\n    ("", False),\n    ("ab", False),\n])\ndef test_password(pwd, expected):\n    assert is_valid_password(pwd) == expected',
          },
          {
            title: 'conftest.py',
            body: 'Shared fixtures live in tests/conftest.py — auto-discovered, no imports needed.',
            doThis: 'Move sample_users fixture to conftest.py.',
          },
        ],
        checklist: ['Fixture used', 'Parametrize with 3+ cases', 'conftest.py exists'],
        practice: { title: 'URL builder tests', brief: 'Parametrize build_url with trailing slash edge cases.' },
        resources: [r('doc', 'pytest — Fixtures', 'https://docs.pytest.org/en/stable/explanation/fixtures.html', 'EN')],
      }),

      ch({
        id: 'py-httpx',
        phase: 'D · HTTP',
        level: 'intermediate',
        title: 'httpx for API calls',
        minutes: 45,
        durationLabel: 'Week 4–5',
        overview: 'Sync httpx for scripts; async httpx pairs with Playwright later. Status codes, JSON bodies, timeouts, basic auth headers.',
        learn: ['httpx.Client', 'GET/POST', 'Status codes', 'Timeouts and errors'],
        steps: [
          {
            title: 'GET request',
            body: 'httpx.get(url) or with Client() for connection reuse. response.raise_for_status() on errors.',
            doThis: 'Fetch jsonplaceholder users. Assert 200 and len(users) == 10.',
            code: 'import httpx\n\nresp = httpx.get("https://jsonplaceholder.typicode.com/users", timeout=10.0)\nresp.raise_for_status()\nusers = resp.json()\nassert len(users) == 10',
          },
          {
            title: 'POST and headers',
            body: 'client.post(url, json={...}) sends JSON body. headers={"Authorization": "Bearer ..."} when needed.',
            doThis: 'POST a new todo to jsonplaceholder. Print returned id.',
          },
          {
            title: 'Test API helpers',
            body: 'Extract fetch_users(client) → list. Unit test with httpx mock or fixture JSON — not live network.',
            doThis: 'Write fetch_users using httpx. Test parsing with fixture file.',
            tip: 'Playwright path uses httpx for API-only tests — this chapter prepares you for that.',
          },
        ],
        checklist: ['GET script works', 'POST tried once', 'API helper has unit test'],
        practice: { title: 'Health check script', brief: 'CLI: check_urls.txt → GET each → print OK/FAIL with status.' },
        resources: [
          r('doc', 'httpx — QuickStart', 'https://www.python-httpx.org/quickstart/', 'EN'),
          r('doc', 'JSONPlaceholder', 'https://jsonplaceholder.typicode.com/', 'EN'),
        ],
      }),

      ch({
        id: 'py-logging',
        phase: 'D · HTTP',
        level: 'intermediate',
        title: 'Errors, logging & CLI glue',
        minutes: 40,
        durationLabel: 'Week 5',
        overview: 'try/except specific exceptions. logging module over print. argparse for CLI tools. ruff for lint/format.',
        learn: ['try/except/else/finally', 'logging levels', 'argparse basics', 'ruff format'],
        steps: [
          {
            title: 'Specific exceptions',
            body: 'Catch FileNotFoundError, httpx.HTTPStatusError — not bare except. Re-raise when you cannot handle.',
            doThis: 'Wrap httpx call: catch timeout and HTTP errors with clear messages.',
            code: 'try:\n    resp = httpx.get(url, timeout=5.0)\n    resp.raise_for_status()\nexcept httpx.TimeoutException:\n    logging.error("Timeout fetching %s", url)\nexcept httpx.HTTPStatusError as e:\n    logging.error("HTTP %s for %s", e.response.status_code, url)',
          },
          {
            title: 'logging over print',
            body: 'logging.info/warning/error with format. Control level via LOG_LEVEL env or flag.',
            doThis: 'Replace prints in glue script with logging.',
          },
          {
            title: 'argparse CLI',
            body: 'argparse.ArgumentParser for --url, --verbose. Entry point if __name__ == "__main__".',
            doThis: 'Add CLI to health check: python -m src.health_check --file urls.txt -v',
          },
        ],
        checklist: ['Specific except used', 'logging configured', 'CLI with argparse'],
        practice: { title: 'Retry wrapper', brief: 'retry(fn, attempts=3, delay=1) with logging on failure.' },
        resources: [
          r('doc', 'Python — logging', 'https://docs.python.org/3/library/logging.html', 'EN'),
          r('tool', 'ruff', 'https://docs.astral.sh/ruff/', 'EN'),
        ],
      }),

      ch({
        id: 'py-packaging',
        phase: 'E · Ship',
        level: 'intermediate',
        title: 'Packaging lite — pyproject.toml & entry points',
        minutes: 40,
        durationLabel: 'Week 6–7',
        overview:
          'You do not need to publish to PyPI yet. pyproject.toml declares project metadata and dependencies. pip install -e . makes your package importable. Entry points turn modules into CLI commands.',
        learn: ['pyproject.toml basics', 'pip install -e .', 'Console scripts entry points', 'src layout packaging'],
        steps: [
          {
            title: 'Minimal pyproject.toml',
            body: 'PEP 621 project table: name, version, dependencies. Build backend can be hatchling or setuptools — keep it minimal.',
            doThis: 'Add pyproject.toml to py-journey with project name, version 0.1.0, dependencies from requirements.txt.',
            code: '[project]\nname = "py-journey"\nversion = "0.1.0"\ndependencies = ["httpx>=0.27", "pytest>=8.0"]\n\n[build-system]\nrequires = ["hatchling"]\nbuild-backend = "hatchling.build"',
          },
          {
            title: 'Editable install',
            body: 'pip install -e . installs package in development mode — imports work without PYTHONPATH hacks.',
            doThis: 'Run pip install -e . in venv. Import from helpers without sys.path manipulation.',
            tip: 'Playwright frameworks use this pattern — src/ package + editable install in CI.',
          },
          {
            title: 'CLI entry point',
            body: '[project.scripts] health-check = "py_journey.health_check:main" maps command to function.',
            doThis: 'Wire health_check CLI as console script. Run health-check --help after install.',
            code: '[project.scripts]\nhealth-check = "py_journey.health_check:main"',
          },
          {
            title: 'What you are not doing yet',
            body: 'No PyPI publish, no complex monorepos, no poetry vs pip debate. Just enough structure to share a tool across repos.',
            doThis: 'Document in README: how to clone, venv, pip install -e ., run tests.',
          },
        ],
        checklist: [
          'pyproject.toml committed',
          'pip install -e . works',
          'CLI entry point runs',
          'README documents install steps',
        ],
        practice: {
          title: 'Shareable tool',
          brief: 'Extract retry() helper into installable subpackage. Friend clones repo and runs pip install -e . successfully.',
        },
        resources: [
          r('doc', 'Python Packaging User Guide', 'https://packaging.python.org/en/latest/tutorials/packaging-projects/', 'EN'),
          r('doc', 'Hatchling — pyproject.toml', 'https://hatch.pypa.io/latest/config/project/', 'EN'),
        ],
      }),

      ch({
        id: 'py-checkpoint-b',
        kind: 'checkpoint',
        phase: 'E · Ship',
        level: 'advanced',
        title: 'Checkpoint B — Python automation-ready',
        minutes: 35,
        durationLabel: 'Gate · Week 8–10',
        overview:
          'Final gate: tested helpers, httpx literacy, logging, and packaging — the Python bar before claiming automation readiness or starting Playwright in earnest.',
        learn: ['Portfolio readiness', 'Interview Python topics'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify every item. Fix gaps this week.',
            items: [
              'py-journey: venv, pyproject.toml, src/ + tests/, 15+ pytest tests all green',
              'Fixtures + @pytest.mark.parametrize used; conftest.py for shared setup',
              'httpx helper with timeout, raise_for_status, and specific exception handling',
              'logging configured (not print) in at least one CLI script',
              'pip install -e . documented; health-check or equivalent entry point works',
              'Can explain list vs dict, fixture scope, and why venv in 2 minutes',
              'README links Playwright path as next step — browser automation not duplicated here',
            ],
          },
          {
            title: 'Mock interview',
            body: 'Common QA Python questions: difference list/dict, what pytest fixture does, how to avoid global pip, sync vs async httpx (awareness).',
            doThis: 'Record 5-minute answers. Demo pytest -v and one httpx script live.',
          },
          {
            title: 'What next',
            body: 'Playwright + Python path for browser tests. API-only tests combine httpx here with pytest patterns you already know.',
            doThis: 'Write 3 ninety-day goals: Playwright POM, API test suite, CI green run.',
          },
        ],
        checklist: [
          'All 7 pass criteria met',
          'Mock interview recorded',
          '90-day goals written',
        ],
        practice: {
          title: 'Green demo',
          brief: 'Screen record: pytest -v, run CLI tool, show pyproject.toml. Portfolio-ready.',
        },
      }),

      ch({
        id: 'py-reference',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Timeline, tools & cheat sheet',
        minutes: 15,
        overview:
          'Return when lost. Week map, daily tools, and interview quick hits for Python automation foundations.',
        learn: ['10-week map', 'Tool bookmarks', 'Interview one-liners'],
        steps: [
          {
            title: 'Week map',
            items: [
              'Weeks 1–2 — venv, syntax, functions',
              'Weeks 3–4 — files, JSON + Checkpoint A',
              'Weeks 5–6 — pytest, fixtures, httpx',
              'Weeks 7–8 — logging, packaging',
              'Weeks 9–10 — Checkpoint B + polish',
            ],
          },
          {
            title: 'Daily tools',
            body: 'Official tutorial for syntax. pytest -v for regression. ruff check/format. httpx docs for API calls. venv always activated.',
            doThis: 'Bookmark this chapter. Pin docs.python.org and docs.pytest.org.',
          },
          {
            title: 'Interview quick hits',
            body: 'list vs tuple (mutable vs not). dict vs set. GIL awareness (lite). fixture vs setup method. why venv. try/except specific exceptions.',
            doThis: 'Maintain living doc docs/python-interview.md in repo.',
          },
          {
            title: 'Playwright pairing',
            body: 'This path = language + pytest + httpx. Playwright path = browser + POM + CI. Do not repeat browser chapters here.',
            doThis: 'When Checkpoint B passes, open Playwright path at Chapter 1 or parallel track.',
          },
        ],
        checklist: ['Week map understood', 'Bookmarks saved', 'Interview doc started'],
      }),
    ],
    resources: {
      docs: [
        { name: 'Python Tutorial', url: 'https://docs.python.org/3/tutorial/' },
        { name: 'pytest docs', url: 'https://docs.pytest.org/' },
        { name: 'httpx docs', url: 'https://www.python-httpx.org/' },
        { name: 'Real Python', url: 'https://realpython.com/' },
        { name: 'Python Packaging Guide', url: 'https://packaging.python.org/' },
      ],
      tools: ['CPython 3.11+', 'venv', 'pytest', 'httpx', 'ruff', 'hatchling'],
      books: [
        'Python Crash Course (Matthes) — Part I',
        'Automate the Boring Stuff (Sweigart) — selective chapters',
      ],
      practice: [
        'https://www.hackerrank.com/domains/python',
        'https://exercism.org/tracks/python',
        'Automate a folder rename script with pytest coverage',
      ],
      videos: [
        { name: 'Corey Schafer — Python Playlist', url: 'https://www.youtube.com/playlist?list=PL-osiE80TeTt2P9rFLY6bfsImaqv0vDi-' },
        { name: 'Fireship — Python in 100 seconds', url: 'https://www.youtube.com/watch?v=x7X9w_GIm1s' },
      ],
    },
  },

  {
    id: 'sql',
    title: 'SQL',
    tagline: 'Ask questions of data — SELECT through transactions and indexes.',
    category: 'foundations',
    accent: '#0F766E',
    cover: 'covers/sql-cover.png',
    duration: '8–14 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'QA engineers validating data, developers writing backend queries, and analysts who need SQL fluency for debugging and test oracles.',
    outcomes: [
      'Write SELECT queries with filters, sorting, and pagination confidently',
      'Join multiple tables with INNER, LEFT, and anti-join patterns',
      'Aggregate with GROUP BY, HAVING, subqueries, and CTEs',
      'Insert, update, and delete safely inside transactions with a preview ritual',
      'Read EXPLAIN plans and reason about indexes for slow queries',
    ],
    pace: {
      hoursPerDay: '45–60 min/day (≈ 5–7 hrs/week)',
      recommended: '~2–4 weeks part-time',
      accelerated: '~1–2 weeks at 1.5 hrs/day',
      slow: '~5–6 weeks if busy',
    },
    chapters: [
      ch({
        id: 'sql-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this SQL path',
        minutes: 15,
        overview:
          'SQL is read-first: master SELECT before writing mutations. Use SQLBolt or SQLite locally. Checkpoints ensure you can join and aggregate before touching transactions.',
        learn: ['Sandbox setup', 'Read before write', 'Safety rituals for mutations'],
        steps: [
          {
            title: 'Pick a sandbox',
            body: 'SQLBolt in browser, or sqlite3 CLI with a sample .db file. Postgres later — syntax is 95% the same for basics.',
            doThis: 'Complete SQLBolt lesson 1 today. Bookmark the site.',
          },
          {
            title: 'Study pace',
            body: '45–60 min/day. Week 1: SELECT/WHERE. Week 2: JOINs/agg. Week 3: mutations/transactions/indexes.',
            doThis: 'Create sql-notes/ repo with queries/ folder for saved .sql files.',
          },
          {
            title: 'Job-ready definition',
            body: 'You are ready when you can: write a 3-table join, aggregate with GROUP BY, wrap updates in a transaction, and explain what an index does.',
            doThis: 'Add checklist to sql-notes README.',
          },
        ],
        checklist: ['Sandbox chosen', 'sql-notes repo created', 'SQLBolt lesson 1 done'],
        practice: { title: 'First query', brief: 'SELECT * FROM users LIMIT 5; — save as queries/01_select.sql.' },
        resources: [
          r('lab', 'SQLBolt', 'https://sqlbolt.com/', 'EN'),
          r('doc', 'SQLite CLI', 'https://sqlite.org/cli.html', 'EN'),
        ],
      }),

      ch({
        id: 'sql-select',
        phase: 'A · Query',
        level: 'beginner',
        title: 'SELECT basics — reading rows',
        minutes: 30,
        durationLabel: 'Week 1',
        overview: 'Every query starts with SELECT. Name columns explicitly in production. DISTINCT removes duplicates. Aliases rename columns or tables.',
        learn: ['SELECT columns', 'DISTINCT', 'Column aliases', 'FROM and table names'],
        steps: [
          {
            title: 'Basic SELECT',
            body: 'SELECT col1, col2 FROM table. Avoid SELECT * in production — it hides schema changes and fetches unnecessary data.',
            doThis: 'SQLBolt lesson 1. Save query as queries/01_select.sql.',
            code: 'SELECT id, name, email\nFROM users;',
          },
          {
            title: 'DISTINCT and aliases',
            body: 'SELECT DISTINCT country FROM customers. SELECT total AS order_total — aliases clarify output headers.',
            doThis: 'List unique product categories. Alias a computed column: quantity * price AS line_total.',
          },
          {
            title: 'Explore schema first',
            body: 'Before querying: .schema in SQLite, \\d in psql, or DESCRIBE in MySQL. Know column names and types.',
            doThis: 'Document your sandbox schema in sql-notes/SCHEMA.md — tables, keys, sample row counts.',
            tip: 'QA tip: schema docs become test oracle references.',
          },
        ],
        checklist: ['SQLBolt lesson 1 complete', 'SCHEMA.md started', 'DISTINCT query written'],
        practice: { title: 'Column audit', brief: 'For each table: list columns, types, and one sample value.' },
        resources: [r('lab', 'SQLBolt — SELECT', 'https://sqlbolt.com/lesson/select_queries_introduction', 'EN')],
      }),

      ch({
        id: 'sql-where-order',
        phase: 'A · Query',
        level: 'beginner',
        title: 'WHERE, ORDER BY & LIMIT',
        minutes: 35,
        durationLabel: 'Week 1–2',
        overview: 'Filter rows with WHERE. Sort with ORDER BY. Paginate with LIMIT/OFFSET. The bread and butter of exploratory queries.',
        learn: ['WHERE conditions', 'ORDER BY', 'LIMIT/OFFSET', 'AND/OR with parentheses'],
        steps: [
          {
            title: 'WHERE operators',
            body: '=, !=, <, >, BETWEEN, IN, LIKE, IS NULL. AND/OR — use parentheses when mixing.',
            doThis: 'SQLBolt lessons 2–5. Save each to sql-notes/queries/.',
            code: 'SELECT id, name, email\nFROM users\nWHERE active = 1\n  AND created_at >= \'2024-01-01\'\nORDER BY name ASC\nLIMIT 10;',
          },
          {
            title: 'LIKE and NULL',
            body: 'LIKE \'A%\' prefix match. IS NULL / IS NOT NULL — never = NULL (always unknown).',
            doThis: 'Find users with NULL phone. Find emails ending in @company.com.',
          },
          {
            title: 'Sort and paginate',
            body: 'ORDER BY created_at DESC, id ASC for tie-break. LIMIT 20 OFFSET 40 = page 3 at size 20.',
            doThis: 'Query: newest 10 orders over $100. Second query: page 2 of active users.',
          },
        ],
        checklist: ['SQLBolt 2–5 complete', '5 original WHERE queries', 'NULL and LIKE used once each'],
        practice: { title: 'Exploratory questions', brief: 'Answer 5 business questions with SELECT + WHERE only.' },
        resources: [
          r('lab', 'SQLBolt — WHERE', 'https://sqlbolt.com/lesson/select_queries_with_expressions', 'EN'),
          r('doc', 'Mode — SQL WHERE', 'https://mode.com/sql-tutorial/sql-where/', 'EN'),
        ],
      }),

      ch({
        id: 'sql-joins',
        phase: 'A · Query',
        level: 'beginner',
        title: 'JOINs — inner, left, and relationships',
        minutes: 45,
        durationLabel: 'Week 1–2',
        overview: 'Relational power: combine tables on keys. INNER JOIN keeps matches. LEFT JOIN keeps all left rows.',
        learn: ['INNER JOIN', 'LEFT JOIN', 'Join conditions', 'Table aliases'],
        steps: [
          {
            title: 'INNER JOIN',
            body: 'customers INNER JOIN orders ON customers.id = orders.customer_id — only customers with orders.',
            doThis: 'SQLBolt lessons 6–8. List order id, customer name, total for each order.',
            code: 'SELECT o.id, c.name, o.total\nFROM orders o\nINNER JOIN customers c ON c.id = o.customer_id;',
          },
          {
            title: 'LEFT JOIN',
            body: 'LEFT JOIN finds rows in left table with no match — WHERE right.id IS NULL is the anti-join pattern.',
            doThis: 'Find customers who never placed an order.',
            code: 'SELECT c.id, c.name\nFROM customers c\nLEFT JOIN orders o ON o.customer_id = c.id\nWHERE o.id IS NULL;',
          },
          {
            title: 'Multi-table joins',
            body: 'Chain joins: orders → customers, orders → products. Alias tables (o, c, p) for readability.',
            doThis: '3-table join: order line items with product name and customer email.',
          },
        ],
        checklist: ['INNER and LEFT JOIN written', 'Anti-join query works', '3-table join attempted'],
        practice: { title: 'Join diagram', brief: 'Sketch ER diagram for your sandbox tables on paper.' },
        resources: [
          r('doc', 'Mode — SQL Joins', 'https://mode.com/sql-tutorial/sql-joins/', 'EN'),
          r('lab', 'SQLBolt — JOINs', 'https://sqlbolt.com/lesson/filters_on_columns', 'EN'),
        ],
      }),

      ch({
        id: 'sql-checkpoint-a',
        kind: 'checkpoint',
        phase: 'A · Query',
        level: 'beginner',
        title: 'Checkpoint A — SELECT & JOINs',
        minutes: 30,
        durationLabel: 'Gate · Week 3–4',
        overview:
          'Before aggregations and mutations, prove you can read relational data with filters and joins. Fix gaps before Phase B.',
        learn: ['Read-path self-check'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'All six must be true. Fix failures before GROUP BY chapter.',
            doThis: 'Audit sql-notes repo. Mark pass/fail in README.',
            items: [
              '10+ saved queries in sql-notes/queries/ with descriptive filenames',
              'SCHEMA.md documents all sandbox tables and relationships',
              'WHERE query with AND/OR, NULL check, and LIKE pattern',
              'INNER JOIN and LEFT JOIN each used correctly',
              'Anti-join query: rows in A with no match in B (LEFT JOIN + IS NULL)',
              'Can draw a 3-table ER diagram and explain join keys aloud',
            ],
          },
          {
            title: 'Query review',
            body: 'Re-read saved queries. Add comments explaining business question each answers. Remove SELECT * where present.',
            doThis: 'Add -- comment header to each .sql file: purpose, date, author.',
          },
          {
            title: 'Explain joins',
            body: 'Interview staple: "Explain INNER vs LEFT JOIN." Use customers/orders example.',
            doThis: 'Record 90-second explanation without notes.',
          },
        ],
        checklist: [
          'All 6 pass criteria met',
          'Query comments added',
          'Join explanation recorded',
        ],
        practice: {
          title: 'QA oracle query',
          brief: 'Write query verifying: every order has a valid customer_id. What result means bug?',
        },
      }),

      ch({
        id: 'sql-agg',
        phase: 'B · Analyze',
        level: 'intermediate',
        title: 'Aggregations & GROUP BY',
        minutes: 40,
        durationLabel: 'Week 2',
        overview: 'COUNT, SUM, AVG, MIN, MAX. GROUP BY for per-category stats. HAVING filters groups after aggregation.',
        learn: ['Aggregate functions', 'GROUP BY', 'HAVING vs WHERE', 'Query grain'],
        steps: [
          {
            title: 'Aggregates',
            body: 'COUNT(*), SUM(amount), AVG(price). Non-aggregated columns must appear in GROUP BY.',
            doThis: 'Total revenue, order count, average order value from orders table.',
            code: 'SELECT\n  COUNT(*) AS order_count,\n  SUM(total) AS revenue,\n  AVG(total) AS avg_order\nFROM orders;',
          },
          {
            title: 'GROUP BY',
            body: 'Grain of the question: per customer? per day? per product category? Match GROUP BY to that grain.',
            doThis: 'Revenue per customer. Top 5 customers by order count.',
          },
          {
            title: 'HAVING',
            body: 'WHERE filters rows before aggregation. HAVING filters groups after. HAVING COUNT(*) > 5 for frequent buyers.',
            doThis: 'Customers with more than 3 orders and total spend over $500.',
          },
        ],
        checklist: ['GROUP BY query written', 'HAVING used once', 'Can explain query grain'],
        practice: { title: 'Funnel counts', brief: 'Group events by step_name; count users per step.' },
        resources: [r('doc', 'Mode — Aggregations', 'https://mode.com/sql-tutorial/sql-aggregations/', 'EN')],
      }),

      ch({
        id: 'sql-subqueries',
        phase: 'B · Analyze',
        level: 'intermediate',
        title: 'Subqueries & CTEs',
        minutes: 40,
        durationLabel: 'Week 2',
        overview: 'Subqueries in WHERE/FROM. WITH clause (CTE) for readable multi-step queries. Prefer CTEs over nested subqueries when clarity matters.',
        learn: ['Subqueries in WHERE', 'Subqueries in FROM', 'WITH ... AS (CTE)', 'EXISTS'],
        steps: [
          {
            title: 'Subquery in WHERE',
            body: 'WHERE id IN (SELECT customer_id FROM orders WHERE total > 1000) — find high-value customers.',
            doThis: 'Products never ordered: NOT IN or NOT EXISTS pattern.',
          },
          {
            title: 'CTEs',
            body: 'WITH high_value AS (SELECT ... ) SELECT * FROM high_value — name intermediate results.',
            doThis: 'Rewrite a nested subquery as a CTE.',
            code: 'WITH monthly_revenue AS (\n  SELECT DATE_TRUNC(\'month\', created_at) AS month,\n         SUM(total) AS revenue\n  FROM orders\n  GROUP BY 1\n)\nSELECT * FROM monthly_revenue ORDER BY month;',
          },
          {
            title: 'EXISTS',
            body: 'EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id) — often faster than IN for large sets.',
            doThis: 'Customers with at least one order using EXISTS.',
          },
        ],
        checklist: ['CTE query written', 'EXISTS tried', 'Subquery vs JOIN tradeoff noted'],
        practice: { title: 'Month-over-month', brief: 'CTE: revenue by month, compare to previous month.' },
        resources: [r('doc', 'Mode — Subqueries', 'https://mode.com/sql-tutorial/sql-subqueries/', 'EN')],
      }),

      ch({
        id: 'sql-mutations',
        phase: 'C · Write',
        level: 'intermediate',
        title: 'INSERT, UPDATE, DELETE safely',
        minutes: 35,
        durationLabel: 'Week 3',
        overview: 'Never UPDATE/DELETE without WHERE. SELECT first to preview rows. Use transactions for multi-step changes.',
        learn: ['INSERT', 'UPDATE ... WHERE', 'DELETE ... WHERE', 'Safety ritual'],
        steps: [
          {
            title: 'INSERT',
            body: 'INSERT INTO users (name, email) VALUES (...). INSERT ... SELECT for bulk copies.',
            doThis: 'Insert 3 test rows into a sandbox table.',
            code: 'INSERT INTO users (name, email, active)\nVALUES (\'Test User\', \'test@example.com\', 1);',
          },
          {
            title: 'Safety ritual',
            body: '1) SELECT with same WHERE. 2) Check row count. 3) UPDATE/DELETE in transaction. 4) COMMIT or ROLLBACK.',
            doThis: 'Document your 4-step ritual in sql-notes/SAFETY.md.',
            items: [
              'SELECT preview with identical WHERE',
              'Confirm expected row count',
              'BEGIN transaction',
              'COMMIT if correct, ROLLBACK if not',
            ],
          },
          {
            title: 'UPDATE and DELETE',
            body: 'UPDATE users SET active = 0 WHERE id = 5. DELETE FROM sessions WHERE expired_at < NOW(). Always WHERE.',
            doThis: 'Practice UPDATE + ROLLBACK on toy data.',
            tip: 'Production horror story: UPDATE without WHERE updates every row.',
          },
        ],
        checklist: ['SAFETY.md written', 'UPDATE with ROLLBACK practiced', 'Never ran bare DELETE'],
        practice: { title: 'Soft delete', brief: 'UPDATE active=0 instead of DELETE; query active users only.' },
        resources: [r('doc', 'PostgreSQL — DML', 'https://www.postgresql.org/docs/current/dml.html', 'EN')],
      }),

      ch({
        id: 'sql-transactions',
        phase: 'C · Write',
        level: 'advanced',
        title: 'Transactions & isolation',
        minutes: 40,
        durationLabel: 'Week 3',
        overview: 'BEGIN / COMMIT / ROLLBACK. ACID guarantees. Transfer money mental model: debit and credit must both succeed or both fail.',
        learn: ['BEGIN/COMMIT/ROLLBACK', 'ACID intuition', 'Isolation levels lite', 'Deadlocks awareness'],
        steps: [
          {
            title: 'Transaction basics',
            body: 'BEGIN; multiple statements; COMMIT if all good, ROLLBACK on error. SQLite: BEGIN IMMEDIATE for writes.',
            doThis: 'Transfer script: decrement account A, increment B — wrap in transaction.',
            code: 'BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\n-- inspect; then COMMIT or ROLLBACK\nCOMMIT;',
          },
          {
            title: 'ACID',
            body: 'Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent sessions), Durability (committed survives crash).',
            doThis: 'Write one sentence each for A-C-I-D in your notes.',
          },
          {
            title: 'When transactions matter for QA',
            body: 'Test data setup/teardown, verifying rollback on validation failure, reproducing race conditions.',
            doThis: 'List 2 test scenarios where transaction rollback should be verified.',
          },
        ],
        checklist: ['Transfer transaction written', 'ACID notes', 'ROLLBACK demonstrated'],
        practice: { title: 'Failed insert rollback', brief: 'Insert valid row + invalid row in txn; ROLLBACK; verify neither persisted.' },
        resources: [r('doc', 'PostgreSQL — Transactions', 'https://www.postgresql.org/docs/current/tutorial-transactions.html', 'EN')],
      }),

      ch({
        id: 'sql-indexes',
        phase: 'D · Performance',
        level: 'advanced',
        title: 'Indexes & EXPLAIN',
        minutes: 40,
        durationLabel: 'Week 3–4',
        overview: 'Indexes speed reads, slow writes. B-tree default. EXPLAIN shows query plan. Index columns in WHERE and JOIN.',
        learn: ['CREATE INDEX', 'EXPLAIN / EXPLAIN ANALYZE', 'When to index', 'Covering indexes lite'],
        steps: [
          {
            title: 'Why indexes',
            body: 'Without index: full table scan. With index on customer_id: fast lookup for JOINs and WHERE customer_id = ?.',
            doThis: 'Read Use The Index, Luke — chapter 1. Note one insight.',
          },
          {
            title: 'EXPLAIN',
            body: 'EXPLAIN SELECT ... shows plan. Seq Scan = full scan. Index Scan = using index. Compare before/after index.',
            doThis: 'EXPLAIN a slow query. CREATE INDEX. EXPLAIN again. Compare.',
            code: 'EXPLAIN SELECT * FROM orders WHERE customer_id = 42;\n\nCREATE INDEX idx_orders_customer ON orders(customer_id);\n\nEXPLAIN SELECT * FROM orders WHERE customer_id = 42;',
          },
          {
            title: 'Index discipline',
            body: 'Index foreign keys and frequent WHERE columns. Do not index every column — writes get slower.',
            doThis: 'Hypothesis: which column to index on your sandbox? Test with EXPLAIN.',
          },
        ],
        checklist: ['EXPLAIN before/after', 'One index created', 'Index tradeoff documented'],
        practice: { title: 'Composite index', brief: 'Index (status, created_at) for WHERE status=? ORDER BY created_at.' },
        resources: [
          r('doc', 'Use The Index, Luke', 'https://use-the-index-luke.com/', 'EN'),
          r('doc', 'PostgreSQL — EXPLAIN', 'https://www.postgresql.org/docs/current/sql-explain.html', 'EN'),
        ],
      }),

      ch({
        id: 'sql-checkpoint-b',
        kind: 'checkpoint',
        phase: 'D · Performance',
        level: 'advanced',
        title: 'Checkpoint B — SQL job-ready',
        minutes: 30,
        durationLabel: 'Gate · Week 8–10',
        overview:
          'Final gate: read path through write path, transactions, and index literacy — the bar for "I can query databases" in QA or dev interviews.',
        learn: ['Interview SQL topics', 'Portfolio of saved queries'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify every item. Fix gaps this week.',
            items: [
              '20+ saved queries covering SELECT, JOIN, GROUP BY, CTE, mutation',
              '3-table JOIN query with correct grain documented in comment',
              'GROUP BY + HAVING aggregation answering a real business question',
              'SAFETY.md ritual followed on UPDATE practice (SELECT preview → txn → ROLLBACK)',
              'Transfer transaction script with COMMIT and ROLLBACK demonstrated',
              'EXPLAIN before/after index with written conclusion in notes',
              'Can explain ACID and when to use a transaction in 2 minutes',
            ],
          },
          {
            title: 'Interview drill',
            body: 'Common questions: INNER vs LEFT JOIN, WHERE vs HAVING, what an index does, how to update safely, N+1 query problem (awareness).',
            doThis: 'Record 5-minute answers. Walk through best saved query live.',
          },
          {
            title: 'What next',
            body: 'Apply SQL to test data setup, API response validation against DB, or backend development paths in this library.',
            doThis: 'Write 3 next-skill goals for 90 days.',
          },
        ],
        checklist: [
          'All 7 pass criteria met',
          'Interview drill recorded',
          '90-day goals written',
        ],
        practice: {
          title: 'Query portfolio',
          brief: 'Curate 5 best queries in sql-notes/portfolio/ with README explaining each.',
        },
      }),

      ch({
        id: 'sql-reference',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Timeline, tools & cheat sheet',
        minutes: 15,
        overview: 'Return when stuck. Week map, safety ritual, and interview quick hits.',
        learn: ['10-week map', 'Safety ritual', 'Interview one-liners'],
        steps: [
          {
            title: 'Week map',
            items: [
              'Weeks 1–2 — SELECT, WHERE, ORDER BY',
              'Weeks 3–4 — JOINs + Checkpoint A',
              'Weeks 5–6 — GROUP BY, subqueries, CTEs',
              'Weeks 7–8 — mutations, transactions',
              'Weeks 9–10 — indexes, EXPLAIN + Checkpoint B',
            ],
          },
          {
            title: 'Safety ritual (always)',
            body: 'SELECT with same WHERE → count rows → BEGIN → mutate → verify → COMMIT or ROLLBACK.',
            doThis: 'Pin SAFETY.md. Never UPDATE/DELETE without WHERE in production.',
          },
          {
            title: 'Interview one-liners',
            body: 'JOIN: match rows on keys. GROUP BY: aggregate grain. HAVING: filter groups. Index: speeds reads, costs writes. Transaction: all-or-nothing.',
            doThis: 'Maintain docs/sql-interview.md in sql-notes repo.',
          },
        ],
        checklist: ['Week map understood', 'SAFETY.md pinned', 'Interview doc started'],
      }),
    ],
    resources: {
      docs: [
        { name: 'SQLBolt', url: 'https://sqlbolt.com/' },
        { name: 'Mode SQL Tutorial', url: 'https://mode.com/sql-tutorial' },
        { name: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/' },
        { name: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/' },
        { name: 'SQLite Documentation', url: 'https://sqlite.org/docs.html' },
      ],
      tools: ['SQLite', 'PostgreSQL', 'DBeaver', 'TablePlus', 'pgAdmin'],
      books: [
        'Learning SQL (Beaulieu)',
        'SQL for Data Analysis (DeBarros) — selective',
      ],
      practice: [
        'https://sqlbolt.com/ — complete all lessons',
        'https://pgexercises.com/',
        'Weekly: one exploratory query on sanitized sample data',
      ],
      videos: [
        { name: 'freeCodeCamp — SQL Full Course', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY' },
        { name: 'Fireship — SQL in 100 seconds', url: 'https://www.youtube.com/watch?v=zsjvFFsV1Q8' },
      ],
    },
  },

  {
    id: 'git',
    title: 'Git & GitHub',
    tagline: 'Version control without fear — daily loop through hooks and recovery.',
    category: 'foundations',
    accent: '#3D5A5B',
    cover: 'covers/git-cover.png',
    duration: '8–14 weeks',
    levelSpan: 'Beginner → Pro',
    who: 'Anyone who writes or reviews code — solo learners, QA engineers, and developers who need confident daily Git, clean PRs, and recovery skills.',
    outcomes: [
      'Run the daily loop: status, diff, add, commit, push, pull without hesitation',
      'Branch, open pull requests, and participate in code review with clear descriptions',
      'Rebase and merge with judgment — know when each is appropriate',
      'Recover lost work with reflog, resolve conflicts, and bisect regressions',
      'Install and use pre-commit hooks locally before CI catches mistakes',
    ],
    pace: {
      hoursPerDay: '30–45 min/day (≈ 4–5 hrs/week)',
      recommended: '~1–2 weeks part-time',
      accelerated: '~3–5 days intensive',
      slow: '~3 weeks if busy',
    },
    chapters: [
      ch({
        id: 'git-guide',
        kind: 'guide',
        phase: 'Start',
        level: 'beginner',
        title: 'How to use this Git path',
        minutes: 15,
        overview:
          'Git is learned by doing in a throwaway repo, then applied daily. Path order: daily loop → branches/PRs → rebase → recovery (reflog/bisect) → hooks. Learn Git Branching visualizer is your friend.',
        learn: ['Throwaway repo practice', 'Daily loop habit', 'Never rewrite shared history casually'],
        steps: [
          {
            title: 'Create practice repo',
            body: 'github.com/new → git-practice. You will break things here on purpose.',
            doThis: 'Create git-practice repo. Clone locally. First commit: README.',
          },
          {
            title: 'Study pace',
            body: '30–45 min/day for 1–2 weeks. Do every exercise in a practice repo, not on work main.',
            doThis: 'Bookmark learngitbranching.js.org. Schedule 15 min/day on it.',
          },
          {
            title: 'Golden rules',
            body: 'Commit small and often. Pull before push. Never force-push shared branches. Read diff before commit.',
            doThis: 'Write 3 personal Git rules in practice repo README.',
            items: [
              'Small, focused commits',
              'Pull --rebase before push (team policy varies)',
              'No force-push to main/shared branches',
            ],
          },
        ],
        checklist: ['git-practice repo cloned', 'Git name/email configured', 'Learn Git Branching bookmarked'],
        practice: { title: 'First commit', brief: 'README + .gitignore for OS files. git log --oneline.' },
        resources: [
          r('book', 'Pro Git', 'https://git-scm.com/book/en/v2', 'EN'),
          r('lab', 'Learn Git Branching', 'https://learngitbranching.js.org/', 'EN'),
        ],
      }),

      ch({
        id: 'git-daily',
        phase: 'A · Daily',
        level: 'beginner',
        title: 'Daily loop: status, diff, add, commit',
        minutes: 35,
        durationLabel: 'Day 1–2',
        overview: 'Working tree → staging (index) → local history → remote. status and diff before every commit.',
        learn: ['Working tree vs staging vs history', 'git status / diff', 'git add / commit', 'Commit messages'],
        steps: [
          {
            title: 'Three trees',
            body: 'Working directory (edited files), staging area (git add), repository (git commit). status shows all three.',
            doThis: 'Edit README. status. diff. add. diff --staged. commit. log --oneline.',
            code: 'git status\ngit diff\ngit add README.md\ngit diff --staged\ngit commit -m "docs: explain three trees"\ngit log --oneline -5',
          },
          {
            title: 'Commit messages',
            body: 'Imperative subject: "Add login form" not "Added". Body explains why. Conventional commits help: feat:, fix:, docs:.',
            doThis: 'Make 3 commits with clear messages on git-practice.',
          },
          {
            title: 'git add patterns',
            body: 'git add file, git add -p (patch — choose hunks), git add . (careful — review status first).',
            doThis: 'Use git add -p once to stage part of a file.',
            tip: 'Never commit secrets — .env belongs in .gitignore.',
          },
        ],
        checklist: ['3 commits with good messages', 'Used status and diff habitually', '.gitignore includes .env'],
        practice: { title: 'Commit hygiene', brief: 'Fix typo in separate commit from feature work.' },
        resources: [r('doc', 'Git — git-add', 'https://git-scm.com/docs/git-add', 'EN')],
      }),

      ch({
        id: 'git-branches',
        phase: 'A · Daily',
        level: 'beginner',
        title: 'Branches, remotes & push',
        minutes: 40,
        durationLabel: 'Day 2–3',
        overview: 'Branches are cheap pointers. main stays stable. Feature branches isolate work. Remote tracks GitHub.',
        learn: ['branch / checkout / switch', 'push -u origin', 'pull / fetch', 'Tracking branches'],
        steps: [
          {
            title: 'Create and switch branches',
            body: 'git switch -c feature/login. Work. commit. main unchanged until merge.',
            doThis: 'Create feature branch, add file, commit, switch back to main — file gone (expected).',
            code: 'git switch -c feature/hello\necho "hello" > hello.txt\ngit add hello.txt\ngit commit -m "feat: add hello"\ngit switch main\n# hello.txt not here\ngit switch feature/hello\n# hello.txt back',
          },
          {
            title: 'Push and set upstream',
            body: 'git push -u origin feature/hello first time. Later git push suffices.',
            doThis: 'Push feature branch to GitHub. Verify on github.com.',
          },
          {
            title: 'Fetch and pull',
            body: 'git fetch downloads remote changes without merging. git pull = fetch + merge (or rebase with --rebase).',
            doThis: 'Edit on GitHub web UI. fetch. pull. See local update.',
          },
        ],
        checklist: ['Feature branch pushed', 'Upstream set', 'Pull from remote works'],
        practice: { title: 'Branch naming', brief: 'Adopt pattern: feature/, fix/, docs/ — use consistently.' },
        resources: [r('doc', 'GitHub — About branches', 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-branches', 'EN')],
      }),

      ch({
        id: 'git-pr',
        phase: 'B · Collaborate',
        level: 'beginner',
        title: 'Pull requests & code review',
        minutes: 40,
        durationLabel: 'Day 3–4',
        overview: 'PRs are conversation + integration. Clear description, test plan, small diffs. Review others generously.',
        learn: ['Open PR from branch', 'PR description template', 'Review comments', 'Merge strategies'],
        steps: [
          {
            title: 'Open your first PR',
            body: 'Push branch → GitHub "Compare & pull request" → fill title, summary, test plan.',
            doThis: 'Open PR on git-practice. Self-merge after checking diff.',
            items: [
              'Title: imperative summary',
              'Body: what changed and why',
              'Test plan: how you verified',
            ],
          },
          {
            title: 'PR hygiene',
            body: 'Small PRs review faster. One logical change. Link issue if applicable. Draft PR for WIP.',
            doThis: 'Revise a PR description to include test plan checklist.',
          },
          {
            title: 'Merge on GitHub',
            body: 'Merge commit vs Squash vs Rebase — team policy varies. Squash keeps main history clean for small teams.',
            doThis: 'Merge your PR. Delete branch on GitHub. git pull locally.',
          },
        ],
        checklist: ['First PR merged', 'Test plan in description', 'Branch deleted after merge'],
        practice: { title: 'PR template', brief: 'Add .github/pull_request_template.md to a repo.' },
        resources: [r('doc', 'GitHub — About pull requests', 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests', 'EN')],
      }),

      ch({
        id: 'git-checkpoint-a',
        kind: 'checkpoint',
        phase: 'B · Collaborate',
        level: 'beginner',
        title: 'Checkpoint A — Daily loop & PRs',
        minutes: 30,
        durationLabel: 'Gate · Week 3–4',
        overview:
          'Before rebase, reflog, and bisect, prove the daily loop and PR workflow are muscle memory. Fix gaps before Phase C recovery topics.',
        learn: ['Daily habit check', 'PR readiness'],
        steps: [
          {
            title: 'Pass criteria',
            body: 'All six must be true. Practice in git-practice repo only.',
            doThis: 'Mark pass/fail in README. Fix failures before rebase chapter.',
            items: [
              'git-practice repo with 5+ meaningful commits and descriptive messages',
              'Can run status → diff → add → commit without looking up commands',
              'Feature branch created, pushed with -u origin, and merged via PR',
              'PR description includes summary and test plan checklist',
              '.gitignore includes .env, OS junk, and build artifacts',
              'Can explain working tree vs staging vs repository in 60 seconds',
            ],
          },
          {
            title: 'Commit message audit',
            body: 'Re-read git log --oneline. Squash or amend only unpushed WIP commits. Rewrite messages mentally for vague entries.',
            doThis: 'Make one docs: commit improving README based on audit.',
          },
          {
            title: 'Learn Git Branching progress',
            body: 'Complete Intro and Merge sections on learngitbranching.js.org before advancing.',
            doThis: 'Screenshot completion badge. Link in README.',
          },
        ],
        checklist: [
          'All 6 pass criteria met',
          'Commit audit done',
          'Learn Git Branching Intro + Merge complete',
        ],
        practice: {
          title: 'PR from scratch',
          brief: 'New branch → 2 commits → push → PR → self-review diff → merge → pull main. No notes.',
        },
      }),

      ch({
        id: 'git-rebase',
        phase: 'B · Collaborate',
        level: 'intermediate',
        title: 'Rebase vs merge & history hygiene',
        minutes: 45,
        durationLabel: 'Day 4–5',
        overview: 'Merge preserves branch topology. Rebase replays commits for linear history. Never rebase pushed shared branches without team agreement.',
        learn: ['git merge', 'git rebase', 'Interactive rebase lite', 'When to use each'],
        steps: [
          {
            title: 'Merge feature into main',
            body: 'git checkout main && git merge feature/x — creates merge commit if diverged.',
            doThis: 'Learn Git Branching: merge levels. Replay in git-practice.',
          },
          {
            title: 'Rebase onto main',
            body: 'git switch feature && git rebase main — replays your commits on top of latest main. Cleaner log.',
            doThis: 'Rebase feature branch onto updated main. Resolve conflict if prompted.',
            code: 'git switch main\ngit pull\ngit switch feature/login\ngit rebase main\n# fix conflicts if any\ngit add .\ngit rebase --continue',
            tip: 'Rule: rebase local branches; merge (or squash-merge) into shared main.',
          },
          {
            title: 'Interactive rebase',
            body: 'git rebase -i HEAD~3 — squash fixup commits, reword messages. Only on unpushed history.',
            doThis: 'Squash 2 WIP commits into one before opening PR.',
          },
        ],
        checklist: ['Merge and rebase both tried', 'Conflict resolved during rebase', 'Knows when NOT to rebase shared'],
        practice: { title: 'Linear history', brief: 'Rebase feature onto main before PR; verify git log --oneline.' },
        resources: [r('doc', 'Git — git-rebase', 'https://git-scm.com/docs/git-rebase', 'EN')],
      }),

      ch({
        id: 'git-stash',
        phase: 'B · Collaborate',
        level: 'intermediate',
        title: 'Stash & conflict resolution',
        minutes: 35,
        durationLabel: 'Day 5',
        overview: 'git stash saves WIP without committing. Conflicts: read markers, choose wisely, test after resolve.',
        learn: ['git stash / pop', 'Conflict markers', 'Merge tool basics', 'Post-resolve verification'],
        steps: [
          {
            title: 'Stash WIP',
            body: 'git stash push -m "wip login". Switch branches. git stash pop to restore.',
            doThis: 'Start edit, stash, switch branch, return, pop.',
            code: 'git stash push -m "wip"\ngit switch main\n# do other work\ngit switch feature\ngit stash pop',
          },
          {
            title: 'Force a conflict',
            body: 'Edit same line on two branches. merge or rebase → conflict markers <<<<<<< ======= >>>>>>>.',
            doThis: 'Create conflict in git-practice. Resolve manually. git add. Continue merge/rebase.',
          },
          {
            title: 'After resolve',
            body: 'Run tests. Read full diff. Commit or continue rebase. Never leave conflict markers in code.',
            doThis: 'Document your conflict resolution checklist in README.',
          },
        ],
        checklist: ['Stash used once', 'Conflict resolved manually', 'Tests/run after resolve'],
        practice: { title: 'Stash list', brief: 'Create 2 stashes. git stash list. Apply selectively.' },
        resources: [r('doc', 'Git — git-stash', 'https://git-scm.com/docs/git-stash', 'EN')],
      }),

      ch({
        id: 'git-reflog',
        phase: 'C · Recover',
        level: 'advanced',
        title: 'reflog, reset & recovery',
        minutes: 40,
        durationLabel: 'Day 6',
        overview: 'reflog records HEAD movements — undo "disasters." reset --soft/mixed/hard — know blast radius before using.',
        learn: ['git reflog', 'reset --soft/mixed/hard', 'Recovering "lost" commits', 'cherry-pick lite'],
        steps: [
          {
            title: 'reflog is your safety net',
            body: 'git reflog shows where HEAD was. git reset --hard HEAD@{1} goes back — if you act before GC.',
            doThis: 'Make commit, reset --hard HEAD~1, panic, reflog, recover.',
            code: 'git commit -m "important work"\ngit reset --hard HEAD~1\ngit reflog\n# find lost commit hash\ngit reset --hard abc1234',
          },
          {
            title: 'Reset modes',
            body: '--soft: keep staging and working tree. --mixed (default): keep working tree. --hard: destroy changes.',
            doThis: 'Try --soft reset: commit undone but changes still staged.',
            tip: '--hard is destructive — use only in throwaway repos or when certain.',
          },
          {
            title: 'cherry-pick',
            body: 'git cherry-pick <hash> applies one commit elsewhere. Useful for hotfixes.',
            doThis: 'Cherry-pick a commit from feature branch onto main in practice repo.',
          },
        ],
        checklist: ['Recovered commit via reflog', 'Can explain reset modes', 'cherry-pick tried'],
        practice: { title: 'Disaster drill', brief: 'Script: commit → bad reset → recover via reflog. Time yourself.' },
        resources: [r('doc', 'Git — git-reflog', 'https://git-scm.com/docs/git-reflog', 'EN')],
      }),

      ch({
        id: 'git-bisect',
        phase: 'C · Recover',
        level: 'advanced',
        title: 'git bisect — find the breaking commit',
        minutes: 35,
        durationLabel: 'Day 6–7',
        overview: 'Binary search through history. Mark good and bad commits. Git checks out middle. O(log n) instead of manual.',
        learn: ['git bisect start/good/bad', 'Automated bisect run', 'bisect reset'],
        steps: [
          {
            title: 'Manual bisect',
            body: 'git bisect start. git bisect bad (current broken). git bisect good <old-good-hash>. Test. git bisect good/bad until found.',
            doThis: 'Plant a bug in commit 3 of 8 in practice repo. Bisect to find it.',
            code: 'git bisect start\ngit bisect bad\ngit bisect good v1.0-tag\n# test each checkout\ngit bisect good   # or bad\ngit bisect reset   # when done',
          },
          {
            title: 'Automated bisect',
            body: 'git bisect run ./test.sh — script exits 0 for good, 1 for bad. Git automates the search.',
            doThis: 'Write test.sh checking for planted bug. bisect run test.sh.',
          },
          {
            title: 'When QA uses bisect',
            body: 'Regression found in release? bisect between last good build and bad build narrows the culprit commit.',
            doThis: 'Write when-you-would-bisect note for your team context.',
          },
        ],
        checklist: ['Manual bisect completed', 'bisect reset after', 'Understands binary search benefit'],
        practice: { title: 'Bisect story', brief: 'Blog-post length note: "How I found the regression in 10 minutes."' },
        resources: [r('doc', 'Git — git-bisect', 'https://git-scm.com/docs/git-bisect', 'EN')],
      }),

      ch({
        id: 'git-hooks',
        phase: 'D · Automate',
        level: 'advanced',
        title: 'Git hooks — pre-commit & pre-push',
        minutes: 40,
        durationLabel: 'Day 7–8',
        overview: 'Hooks run scripts at Git lifecycle events. pre-commit: lint/format. pre-push: tests. Husky or plain .git/hooks.',
        learn: ['Hook scripts in .git/hooks', 'pre-commit framework', 'Husky for Node projects', 'CI vs local hooks'],
        steps: [
          {
            title: 'Simple pre-commit hook',
            body: 'Executable script in .git/hooks/pre-commit. Exit 1 blocks commit. Test in practice repo.',
            doThis: 'Hook that rejects commits if README is empty.',
            code: '#!/bin/sh\n# .git/hooks/pre-commit\nif ! grep -q "." README.md 2>/dev/null; then\n  echo "README must not be empty"\n  exit 1\nfi',
          },
          {
            title: 'pre-commit framework',
            body: 'pip install pre-commit. .pre-commit-config.yaml with ruff, trailing-whitespace. pre-commit install.',
            doThis: 'Add pre-commit to py-journey or git-practice with trailing-whitespace hook.',
          },
          {
            title: 'Husky for JS projects',
            body: 'npx husky init. pre-commit runs lint-staged. Complements CI — catches issues before push.',
            doThis: 'If you have a JS project: add Husky pre-commit running npm test or lint.',
            tip: 'Hooks are local — CI is the enforcement layer for teams. Both matter.',
          },
        ],
        checklist: ['Manual hook tried', 'pre-commit or Husky installed once', 'Understands exit 1 blocks commit'],
        practice: { title: 'pre-push tests', brief: 'pre-push hook runs pytest or npm test before push.' },
        resources: [
          r('doc', 'Git — githooks', 'https://git-scm.com/docs/githooks', 'EN'),
          r('tool', 'pre-commit.com', 'https://pre-commit.com/', 'EN'),
        ],
      }),

      ch({
        id: 'git-checkpoint-b',
        kind: 'checkpoint',
        phase: 'D · Automate',
        level: 'advanced',
        title: 'Checkpoint B — Git job-ready',
        minutes: 35,
        durationLabel: 'Gate · Week 8–10',
        overview:
          'Final gate: daily loop, PR craft, rebase judgment, recovery skills, bisect, and hooks — the bar for professional Git literacy.',
        learn: ['Interview Git topics', 'Recovery confidence'],
        steps: [
          {
            title: 'Pass criteria',
            doThis: 'Verify every item. Fix gaps this week.',
            items: [
              'git-practice repo with merged PR, rebase onto main completed successfully',
              'Recovered a "lost" commit using reflog in throwaway drill',
              'Resolved a merge or rebase conflict manually — no leftover markers',
              'Completed one git bisect (manual or run) and reset afterward',
              'One hook installed (manual, pre-commit framework, or Husky) and tested',
              'Learn Git Branching: Remote + Rebase sections complete',
              'Can explain rebase vs merge and when NOT to force-push in 2 minutes',
            ],
          },
          {
            title: 'Interview drill',
            body: 'Common questions: three trees, merge vs rebase, what reflog does, how to undo last commit, what pre-commit hook does.',
            doThis: 'Record 5-minute answers. Demo reflog recovery live in practice repo.',
          },
          {
            title: 'What next',
            body: 'Apply Git daily on real projects — JS, Python, Playwright repos in this library all assume this baseline.',
            doThis: 'Write 3 habits for 90 days: pull before push, small commits, PR template on every repo.',
          },
        ],
        checklist: [
          'All 7 pass criteria met',
          'Interview drill recorded',
          '90-day habits written',
        ],
        practice: {
          title: 'Disaster recovery demo',
          brief: 'Screen record: bad reset → reflog → recover → bisect → hook blocks bad commit.',
        },
      }),

      ch({
        id: 'git-reference',
        kind: 'guide',
        phase: 'Reference',
        level: 'beginner',
        title: 'Timeline, tools & cheat sheet',
        minutes: 15,
        overview: 'Return when stuck. Week map, golden rules, and interview quick hits.',
        learn: ['10-week map', 'Golden rules', 'Command quick ref'],
        steps: [
          {
            title: 'Week map',
            items: [
              'Weeks 1–2 — daily loop, branches, remotes',
              'Weeks 3–4 — PRs + Checkpoint A',
              'Weeks 5–6 — rebase, stash, conflicts',
              'Weeks 7–8 — reflog, bisect',
              'Weeks 9–10 — hooks + Checkpoint B',
            ],
          },
          {
            title: 'Golden rules',
            body: 'Small commits. Pull before push. Read diff before commit. Never force-push shared branches. Never commit secrets.',
            doThis: 'Pin Pro Git Chapter 1 and Learn Git Branching.',
          },
          {
            title: 'Command quick ref',
            body: 'status, diff, add -p, commit, push -u, pull --rebase, switch -c, merge, rebase, stash, reflog, bisect, cherry-pick.',
            doThis: 'Maintain docs/git-cheatsheet.md in git-practice repo.',
          },
          {
            title: 'Interview one-liners',
            body: 'Three trees: working, staging, repo. Merge preserves topology. Rebase replays commits. Reflog is local safety net. Bisect is binary search.',
            doThis: 'Update cheatsheet after each mock interview.',
          },
        ],
        checklist: ['Week map understood', 'Cheatsheet started', 'Golden rules memorized'],
      }),
    ],
    resources: {
      docs: [
        { name: 'Pro Git Book', url: 'https://git-scm.com/book/en/v2' },
        { name: 'GitHub Docs', url: 'https://docs.github.com/en/get-started' },
        { name: 'Git Reference', url: 'https://git-scm.com/docs' },
        { name: 'Learn Git Branching', url: 'https://learngitbranching.js.org/' },
      ],
      tools: ['Git CLI', 'GitHub', 'pre-commit', 'Husky', 'lazygit', 'GitHub Desktop'],
      books: [
        'Pro Git (free online — Chapters 1–3 essential)',
        'Head First Git (Parker) — optional',
      ],
      practice: [
        'https://learngitbranching.js.org/ — complete all sections',
        'Daily: pull before push on every active project',
        'Contribute one small PR to an open-source repo',
      ],
      videos: [
        { name: 'GitHub — Git Overview', url: 'https://www.youtube.com/watch?v=RGOj5ycpR8k' },
        { name: 'Fireship — Git in 100 seconds', url: 'https://www.youtube.com/watch?v=hwP7WQkmECE' },
      ],
    },
  },
]
