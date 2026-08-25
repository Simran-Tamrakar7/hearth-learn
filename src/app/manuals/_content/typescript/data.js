/** Chapter body for /manuals/typescript. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "typescript",
  "title": "TypeScript",
  "tagline": "Types as documentation — catch bugs before runtime, migrate JS without drama.",
  "category": "foundations",
  "accent": "#1D4E89",
  "cover": "covers/typescript-cover.png",
  "duration": "4–8 weeks",
  "levelSpan": "Beginner → Pro",
  "who": "JavaScript developers ready for safer, clearer code — front-end, Node, and QA automation engineers adopting typed tooling.",
  "outcomes": [
    "Configure strict TypeScript and understand compiler errors",
    "Model data with types, interfaces, unions, and generics",
    "Apply utility types (Partial, Pick, Omit) in real code",
    "Type API responses and function signatures usefully",
    "Migrate a JavaScript project to TypeScript incrementally"
  ],
  "pace": {
    "hoursPerDay": "1 hour/day (≈ 5–7 hrs/week)",
    "recommended": "~4–8 weeks part-time",
    "accelerated": "~2–3 weeks at 2 hrs/day",
    "slow": "~10–12 weeks if busy"
  },
  "chapters": [
    {
      "id": "ts-guide",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "How to use this path",
      "minutes": 20,
      "overview": "TypeScript is JavaScript plus static types — compiles away to JS. Complete the JavaScript path first (or equivalent). This path moves from strict setup through types and unions to generics, utility types, and migration. Types should help you, not fight you.",
      "learn": [
        "Prerequisites and pace",
        "When types pay rent vs when to skip",
        "Migration mindset"
      ],
      "steps": [
        {
          "title": "Prerequisites",
          "body": "Comfortable with JS: functions, objects, arrays, async/await, ES modules. If not, finish JavaScript Checkpoint A first.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Self-check: can you write a fetch + render app in vanilla JS modules? If no, pause and complete that.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Study pace",
          "body": "Plan 4–8 weeks at 6–10 hrs/week after JS fluency. Weeks 1–2: strict, types, unions. Weeks 3–4: generics, utilities, API typing. Weeks 5–6: migration + Checkpoint B.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add a ts-journey folder or branch in your existing JS repo. You will migrate it incrementally.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Recommended: 6 weeks at ~8 hrs/week",
            "Accelerated: 4 weeks at 2 hrs/day",
            "Slow track: 8 weeks alongside other work"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Rules of the road",
          "body": "strict: true always. Prefer inference — annotate when compiler cannot or when API clarity helps. never use any unless escaping hatch with comment. Read errors — they teach.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Read Checkpoint A and B criteria now. Note in README.",
          "tip": "TypeScript errors are suggestions, not insults. Hover in VS Code for plain-English hints.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "JS fundamentals solid (Checkpoint A equivalent)",
        "Repo or branch ready for TS",
        "Checkpoint criteria noted"
      ],
      "practice": {
        "title": "Day zero",
        "brief": "Run npx tsc --version. In VS Code, open a .js file and confirm TypeScript language service works."
      },
      "durationLabel": null,
      "parentId": null,
      "overviewText": "TypeScript is JavaScript plus static types — compiles away to JS. Complete the JavaScript path first (or equivalent). This path moves from strict setup through types and unions to generics, utility types, and migration. Types should help you, not fight you.",
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
      "id": "ts-strict",
      "phase": "A · Setup",
      "level": "beginner",
      "title": "Strict setup & compiler basics",
      "minutes": 45,
      "durationLabel": "Week 1",
      "overview": "tsconfig.json controls compilation. strict: true enables the checks that matter. tsc type-checks; Vite/esbuild bundle. Understand .ts vs .tsx. JSDoc @ts-check as a bridge from JS.",
      "learn": [
        "tsconfig.json",
        "strict flags",
        "tsc vs bundler",
        "VS Code TS features",
        "JSDoc @ts-check bridge"
      ],
      "steps": [
        {
          "title": "Initialize TypeScript",
          "body": "npm install -D typescript. npx tsc --init. Set \"strict\": true, \"module\": \"ESNext\", \"moduleResolution\": \"bundler\", \"outDir\": \"dist\", \"rootDir\": \"src\".",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create tsconfig.json in your project. Add \"typecheck\": \"tsc --noEmit\" script.",
          "tip": null,
          "code": "npm install -D typescript\nnpx tsc --init\n\n// tsconfig.json highlights\n{\n  \"compilerOptions\": {\n    \"strict\": true,\n    \"target\": \"ES2022\",\n    \"module\": \"ESNext\",\n    \"moduleResolution\": \"bundler\",\n    \"noEmit\": true,\n    \"skipLibCheck\": true\n  },\n  \"include\": [\"src\"]\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "First .ts file",
          "body": "Rename utils.js → utils.ts. Run tsc. Fix errors one at a time. Start with parameter types on exported functions.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Convert one utility file. Add types to all exported function params and returns.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Strict flags that matter",
          "body": "strict enables: noImplicitAny, strictNullChecks, strictFunctionTypes, etc. strictNullChecks alone prevents most null reference bugs.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Intentionally write let x: string = null — see error. Fix with string | null or ensure never null.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "noImplicitAny — no untyped params",
            "strictNullChecks — null/undefined explicit",
            "strictFunctionTypes — safer callbacks",
            "noUncheckedIndexedAccess — array access may be undefined"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "VS Code superpowers",
          "body": "Hover for types. Cmd+click to definition. Quick fix lightbulb. Organize imports. Problems panel lists all errors.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Fix 5 errors using hover + quick fix only — no guessing.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "JSDoc bridge",
          "body": "// @ts-check at top of .js file enables checking without rename. Good for gradual migration.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add @ts-check to one .js file. Add JSDoc @param types. Fix resulting errors.",
          "tip": null,
          "code": "// @ts-check\n\n/**\n * @param {string} str\n * @returns {string}\n */\nfunction titleCase(str) { /* ... */ }",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "tsconfig.json with strict: true",
        "One file converted to .ts",
        "npm run typecheck passes (or errors understood)",
        "@ts-check tried on one .js file"
      ],
      "practice": {
        "title": "Strict or bust",
        "brief": "Convert utils.js fully to utils.ts with explicit exports typed. Zero implicit any."
      },
      "resources": [
        {
          "type": "doc",
          "name": "TS Handbook — The Basics",
          "url": "https://www.typescriptlang.org/docs/handbook/2/basic-types.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "TS tsconfig reference",
          "url": "https://www.typescriptlang.org/tsconfig",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "TypeScript Playground",
          "url": "https://www.typescriptlang.org/play",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "tsconfig.json controls compilation. strict: true enables the checks that matter. tsc type-checks; Vite/esbuild bundle. Understand .ts vs .tsx. JSDoc @ts-check as a bridge from JS.",
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
      "id": "ts-types-interfaces",
      "phase": "A · Setup",
      "level": "beginner",
      "title": "Types, interfaces & inference",
      "minutes": 50,
      "durationLabel": "Week 1–2",
      "overview": "type and interface define object shapes. Use interface for object contracts, type for unions and computed shapes. Inference fills types when obvious. Annotate public API boundaries; let inference handle locals.",
      "learn": [
        "type vs interface",
        "Optional & readonly",
        "Type inference",
        "Function types",
        "Literal types"
      ],
      "steps": [
        {
          "title": "Object shapes",
          "body": "interface User { id: number; name: string; email?: string }. Optional with ?. readonly for immutability hints.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Define User, Product, and Order interfaces for a shop domain. Include optional fields.",
          "tip": null,
          "code": "interface User {\n  id: number\n  name: string\n  email?: string\n  readonly createdAt: string\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "type vs interface",
          "body": "Interface: extend with extends, merge declarations. Type: unions, intersections, mapped types. For object-only shapes, either works — pick one style per project.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write same shape as interface and type alias. Extend both with AdminUser adding role.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Function types",
          "body": "type Handler = (event: MouseEvent) => void. Or inline: function greet(name: string): string.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Type your utils: titleCase(str: string): string, sum(...nums: number[]): number.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Inference in action",
          "body": "const x = [1, 2, 3] infers number[]. let the compiler infer locals; annotate function returns at module boundaries.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Remove explicit types from one function body. Confirm hover shows correct inferred type.",
          "tip": "If inference result is too wide (string instead of \"admin\"|\"user\"), add as const or explicit annotation.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Literal and template types",
          "body": "type Status = \"pending\" | \"active\" | \"archived\". Template: type EventName = `on${Capitalize<string>}`.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Define OrderStatus union. Function setStatus(id: number, status: OrderStatus) with exhaustiveness.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "User/Product/Order interfaces defined",
        "Function types on all utils exports",
        "OrderStatus literal union used",
        "Inference understood — not over-annotating locals"
      ],
      "practice": {
        "title": "Typed models",
        "brief": "Create types/models.ts with 5+ interfaces for your fetch app domain. Use them in api.ts."
      },
      "resources": [
        {
          "type": "doc",
          "name": "TS Handbook — Objects",
          "url": "https://www.typescriptlang.org/docs/handbook/2/objects.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "TS Handbook — Functions",
          "url": "https://www.typescriptlang.org/docs/handbook/2/functions.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "book",
          "name": "Effective TypeScript — Item 13: type vs interface",
          "url": "https://effectivetypescript.com/",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "type and interface define object shapes. Use interface for object contracts, type for unions and computed shapes. Inference fills types when obvious. Annotate public API boundaries; let inference handle locals.",
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
      "id": "ts-unions",
      "phase": "B · Modeling",
      "level": "intermediate",
      "title": "Unions, narrowing & discriminated unions",
      "minutes": 50,
      "durationLabel": "Week 2",
      "overview": "Union types model \"A or B\". Narrowing refines unions with typeof, instanceof, in, and truthiness checks. Discriminated unions add a shared literal field for exhaustive switch — the pattern for API states and UI machines.",
      "learn": [
        "Union types",
        "Type narrowing",
        "Discriminated unions",
        "Exhaustiveness checking",
        "never type"
      ],
      "steps": [
        {
          "title": "Basic unions",
          "body": "type Id = string | number. Functions accepting unions must handle all cases or narrow first.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write formatId(id: string | number): string handling both.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Narrowing techniques",
          "body": "typeof for primitives. instanceof for classes. \"field\" in obj for object shapes. Truthiness for null/undefined.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write printValue(val: string | number | boolean) using typeof narrowing.",
          "tip": null,
          "code": "function printValue(val: string | number | boolean) {\n  if (typeof val === \"string\") console.log(val.toUpperCase())\n  else if (typeof val === \"number\") console.log(val.toFixed(2))\n  else console.log(val ? \"yes\" : \"no\")\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Discriminated unions",
          "body": "Shared literal field (kind/status) enables exhaustive switch. Compiler warns on missing cases with never.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Model fetch state: idle | loading | success | error with discriminated union. Render function with switch.",
          "tip": null,
          "code": "type FetchState<T> =\n  | { status: \"idle\" }\n  | { status: \"loading\" }\n  | { status: \"success\"; data: T }\n  | { status: \"error\"; message: string }",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Exhaustiveness check",
          "body": "default: const _exhaustive: never = state catches unhandled cases at compile time.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add a new status to union. See compiler error until switch updated.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Result type pattern",
          "body": "type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E }. Safer than throw for expected failures.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Wrap getPost in Result<Post> instead of throwing. Caller narrows on ok.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "formatId handles string | number",
        "FetchState discriminated union defined",
        "Render switch is exhaustive",
        "Result type used in one API function"
      ],
      "practice": {
        "title": "UI state machine",
        "brief": "Type a modal flow: closed | confirming | submitting | success | error. One renderModal(state) with exhaustive switch."
      },
      "resources": [
        {
          "type": "doc",
          "name": "TS Handbook — Narrowing",
          "url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "TS Handbook — Discriminated Unions",
          "url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Total TypeScript — Discriminated Unions",
          "url": "https://www.totaltypescript.com/discriminated-unions-are-a-devs-best-friend",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Union types model \"A or B\". Narrowing refines unions with typeof, instanceof, in, and truthiness checks. Discriminated unions add a shared literal field for exhaustive switch — the pattern for API states and UI machines.",
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
      "id": "ts-checkpoint-a",
      "kind": "checkpoint",
      "phase": "B · Modeling",
      "level": "intermediate",
      "title": "Checkpoint A — Strict types & unions",
      "minutes": 30,
      "durationLabel": "Gate · Week 2–3",
      "overview": "Before generics and utilities, prove strict setup works and you can model real states with unions. Fix gaps before Phase C.",
      "learn": [
        "Type safety self-check"
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
          "doThis": "Audit each criterion. Fix failures before continuing.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "tsconfig strict: true, npm run typecheck script works",
            "Core utils converted to .ts with typed params and returns",
            "Domain models (User, Post, etc.) in types/models.ts",
            "FetchState or Result discriminated union in use",
            "Zero any (or each any has // ponytail: escape hatch comment)",
            "Can explain type vs interface in one sentence"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Error reading drill",
          "body": "Copy 3 compiler errors into notes. Write plain English for each. Fix without Stack Overflow if possible.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Intentionally break types. Fix from error messages alone.",
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
        "3 errors decoded and fixed"
      ],
      "practice": {
        "title": "Typecheck green",
        "brief": "npm run typecheck && npm run test:run both green on your project."
      },
      "parentId": null,
      "overviewText": "Before generics and utilities, prove strict setup works and you can model real states with unions. Fix gaps before Phase C.",
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
      "id": "ts-generics",
      "phase": "C · Reuse",
      "level": "intermediate",
      "title": "Generics",
      "minutes": 50,
      "durationLabel": "Week 3",
      "overview": "Generics are type parameters — reusable functions and types that work across shapes while preserving type relationships. <T> on functions, interfaces, and classes. Constraints with extends. Avoid generic abuse — if T appears once, skip it.",
      "learn": [
        "Generic functions",
        "Generic interfaces",
        "Constraints (extends)",
        "Default type params",
        "Generic pitfalls"
      ],
      "steps": [
        {
          "title": "Generic functions",
          "body": "function first<T>(arr: T[]): T | undefined returns element type matching input. Caller picks T via argument.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write first, last, and findById<T>(items: T[], id: number, key: keyof T).",
          "tip": null,
          "code": "function first<T>(arr: T[]): T | undefined {\n  return arr[0]\n}\n\nconst n = first([1, 2, 3])     // number | undefined\nconst s = first([\"a\", \"b\"])   // string | undefined",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Generic interfaces",
          "body": "interface ApiResponse<T> { data: T; status: number; }. Fetch functions return ApiResponse<Post>.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Wrap your fetch helpers to return ApiResponse<T>. Type JSONPlaceholder posts and users.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Constraints",
          "body": "function longest<T extends { length: number }>(a: T, b: T): T accesses .length safely.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write sortByKey<T, K extends keyof T>(items: T[], key: K): T[].",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Default type parameters",
          "body": "type ApiResult<T = unknown> = ... — fallback when caller omits T.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add default to ApiResponse generic. Use with and without explicit type arg.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "When NOT to generic",
          "body": "If function only works with User, type User — do not genericize for vanity. Generics when shape repeats across types.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Review your generics. Remove any where T is used only once and never constrained.",
          "tip": "Hover generic calls in VS Code — verify T inferred correctly.",
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "first/last/findById generics work",
        "ApiResponse<T> wraps fetch results",
        "sortByKey with keyof constraint",
        "Removed unnecessary generics"
      ],
      "practice": {
        "title": "Generic cache",
        "brief": "Create Cache<T> class with get(key: string): T | undefined, set(key: string, value: T). Type-safe for any T."
      },
      "resources": [
        {
          "type": "doc",
          "name": "TS Handbook — Generics",
          "url": "https://www.typescriptlang.org/docs/handbook/2/generics.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Total TypeScript — Generics",
          "url": "https://www.totaltypescript.com/tutorials/beginners-typescript/generics",
          "lang": "EN",
          "free": true
        },
        {
          "type": "video",
          "name": "Fireship — TypeScript in 100 seconds",
          "url": "https://www.youtube.com/watch?v=zQnBQ4tB3ZA",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Generics are type parameters — reusable functions and types that work across shapes while preserving type relationships. <T> on functions, interfaces, and classes. Constraints with extends. Avoid generic abuse — if T appears once, skip it.",
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
      "id": "ts-utility",
      "phase": "C · Reuse",
      "level": "intermediate",
      "title": "Utility types",
      "minutes": 45,
      "durationLabel": "Week 3–4",
      "overview": "Built-in type transformers: Partial, Required, Pick, Omit, Record, Readonly, ReturnType, Parameters. Compose them for DRY API types. keyof and indexed access types unlock advanced patterns.",
      "learn": [
        "Partial & Required",
        "Pick & Omit",
        "Record & Readonly",
        "ReturnType & Parameters",
        "keyof patterns"
      ],
      "steps": [
        {
          "title": "Partial and Required",
          "body": "Partial<User> makes all fields optional — update DTOs. Required<User> opposite — after validation.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Create UpdateUserInput = Partial<Pick<User, \"name\" | \"email\">>.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Pick and Omit",
          "body": "Pick<User, \"id\" | \"name\"> for list views. Omit<User, \"password\"> for public API.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Define PublicUser = Omit<User, \"email\"> and UserSummary = Pick<User, \"id\" | \"name\">.",
          "tip": null,
          "code": "type PublicUser = Omit<User, \"password\">\ntype UserSummary = Pick<User, \"id\" | \"name\">",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Record and Readonly",
          "body": "Record<string, number> for dictionaries. Readonly<User> prevents mutation at type level.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Type a scores map: Record<string, number>. Function accept Readonly<User>.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "ReturnType and Parameters",
          "body": "Extract function return: ReturnType<typeof getPost>. Extract args: Parameters<typeof getPost>[0].",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "type Post = Awaited<ReturnType<typeof getPost>>. Use instead of duplicating interface.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Compose utilities",
          "body": "Real patterns combine: Partial<Pick<...>>, Readonly<Record<...>>. Do not hand-write what utilities provide.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Refactor 2 duplicated types to use Pick/Omit/Partial composition.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "UpdateUserInput uses Partial + Pick",
        "PublicUser and UserSummary defined",
        "ReturnType extracts Post from getPost",
        "2 types refactored to utility composition"
      ],
      "practice": {
        "title": "Form types",
        "brief": "CreateUserForm = Omit<User, \"id\"|\"createdAt\">. UpdateUserForm = Partial<CreateUserForm>. Wire to mock handlers."
      },
      "resources": [
        {
          "type": "doc",
          "name": "TS Handbook — Utility Types",
          "url": "https://www.typescriptlang.org/docs/handbook/utility-types.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Type Challenges — easy utilities",
          "url": "https://github.com/type-challenges/type-challenges",
          "lang": "EN",
          "free": true
        },
        {
          "type": "tool",
          "name": "Utility Types visualizer (search)",
          "url": "https://www.typescriptlang.org/play",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Built-in type transformers: Partial, Required, Pick, Omit, Record, Readonly, ReturnType, Parameters. Compose them for DRY API types. keyof and indexed access types unlock advanced patterns.",
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
      "id": "ts-typing-apis",
      "phase": "D · Integration",
      "level": "intermediate",
      "title": "Typing APIs & external data",
      "minutes": 50,
      "durationLabel": "Week 4",
      "overview": "API responses are unknown until validated. Type fetch JSON with interfaces. Zod or manual guards for runtime check. unknown vs any — always prefer unknown for external data. Typed environment variables and module augmentation preview.",
      "learn": [
        "Typing fetch responses",
        "unknown vs any",
        "Type guards",
        "Zod lite",
        "Env typing"
      ],
      "steps": [
        {
          "title": "Type API responses",
          "body": "Define Post interface matching JSONPlaceholder. getPost(id: number): Promise<Post>. Trust but verify at boundaries.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Type all fetch functions with explicit return types. No bare Promise<any>.",
          "tip": null,
          "code": "interface Post {\n  id: number\n  userId: number\n  title: string\n  body: string\n}\n\nasync function getPost(id: number): Promise<Post> {\n  const res = await fetch(`${BASE}/posts/${id}`)\n  if (!res.ok) throw new Error(`HTTP ${res.status}`)\n  return res.json() as Promise<Post> // trust + validate in prod\n}",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "unknown over any",
          "body": "any disables checking. unknown requires narrowing before use. JSON.parse returns any by default — cast to unknown first.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write parseJson(raw: string): unknown. Narrow with typeof/object check before use.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Type guards",
          "body": "function isPost(val: unknown): val is Post { return typeof val === \"object\" && val !== null && \"title\" in val }.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Implement isPost guard. Use in getPost before return.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Zod lite (optional)",
          "body": "npm install zod. PostSchema = z.object({...}). PostSchema.parse(data) throws on mismatch — runtime + static types.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add Zod schema for Post. Parse response in getPost. Export type Post = z.infer<typeof PostSchema>.",
          "tip": null,
          "code": "import { z } from \"zod\"\n\nconst PostSchema = z.object({\n  id: z.number(),\n  userId: z.number(),\n  title: z.string(),\n  body: z.string(),\n})\n\ntype Post = z.infer<typeof PostSchema>",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Typed environment",
          "body": "declare ImportMetaEnv in vite-env.d.ts. Validate env at startup. Fail fast on missing VITE_API_BASE.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add vite-env.d.ts with interface ImportMetaEnv { readonly VITE_API_BASE: string }.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All fetch returns explicitly typed",
        "isPost type guard implemented",
        "Zod or manual validation at boundary",
        "Env types in vite-env.d.ts"
      ],
      "practice": {
        "title": "API client module",
        "brief": "Typed api/client.ts: getPosts(): Promise<Post[]>, createPost(input: CreatePostInput): Promise<Post>. Validated responses."
      },
      "resources": [
        {
          "type": "doc",
          "name": "TS Handbook — Narrowing with type predicates",
          "url": "https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Zod — Introduction",
          "url": "https://zod.dev/",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Vite — Env variables",
          "url": "https://vite.dev/guide/env-and-mode.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "API responses are unknown until validated. Type fetch JSON with interfaces. Zod or manual guards for runtime check. unknown vs any — always prefer unknown for external data. Typed environment variables and module augmentation preview.",
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
      "id": "ts-migration",
      "phase": "D · Integration",
      "level": "advanced",
      "title": "Migration strategy",
      "minutes": 45,
      "durationLabel": "Week 5",
      "overview": "Migrate incrementally — never big-bang rewrite. allowJs + checkJs → rename leaves → tighten strict → delete any. JavaScript consumes TypeScript; TypeScript compiles to JS. Keep shipping throughout.",
      "learn": [
        "allowJs / checkJs",
        "Rename order (leaves first)",
        "JSDoc migration path",
        "Incremental strict",
        "Team rollout"
      ],
      "steps": [
        {
          "title": "Enable allowJs",
          "body": "tsconfig: allowJs: true, checkJs: true (optional). .ts and .js coexist. TypeScript checks JSDoc-annotated JS.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add allowJs to tsconfig. Run typecheck — note JS + TS errors together.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Migration order",
          "body": "1) Utils (no dependencies). 2) Types/models. 3) API layer. 4) UI/DOM last. Each step: rename, fix errors, commit, ship.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 5-step migration plan for your js-journey repo. Mark step 1 complete.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": [
            "Step 1 — utils + types (leaf nodes)",
            "Step 2 — api module",
            "Step 3 — render/DOM module",
            "Step 4 — main entry + tests",
            "Step 5 — remove allowJs, all .ts"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "JSDoc first path",
          "body": "For large legacy: add @ts-check + JSDoc types before rename. Lower risk, slower payoff.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Pick one .js file not yet migrated. Add @ts-check and JSDoc. Fix errors without rename.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Handling any debt",
          "body": "// @ts-expect-error with ticket link for known debt. Never silent @ts-ignore. Track any count — should decrease weekly.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Grep for any in project. List each with plan to remove. Fix one today.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "CI typecheck gate",
          "body": "Add npm run typecheck to CI before tests. PRs cannot merge with type errors.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Add typecheck step to GitHub Actions or document local pre-push ritual.",
          "tip": null,
          "code": "# .github/workflows/ci.yml snippet\n- run: npm run typecheck\n- run: npm run test:run",
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "5-step migration plan written",
        "allowJs enabled, coexistence working",
        "any inventory with removal plan",
        "typecheck in CI or pre-push ritual"
      ],
      "practice": {
        "title": "Migration sprint",
        "brief": "Complete migration steps 1–3 this week. All utils, types, api in .ts. typecheck green."
      },
      "resources": [
        {
          "type": "doc",
          "name": "TS Handbook — Migrating from JavaScript",
          "url": "https://www.typescriptlang.org/docs/handbook/migrating-from-javascript.html",
          "lang": "EN",
          "free": true
        },
        {
          "type": "doc",
          "name": "Microsoft — TS Migration Guide",
          "url": "https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API",
          "lang": "EN",
          "free": true
        },
        {
          "type": "article",
          "name": "Incremental TS migration at scale",
          "url": "https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html",
          "lang": "EN",
          "free": true
        }
      ],
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Migrate incrementally — never big-bang rewrite. allowJs + checkJs → rename leaves → tighten strict → delete any. JavaScript consumes TypeScript; TypeScript compiles to JS. Keep shipping throughout.",
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
      "id": "ts-checkpoint-b",
      "kind": "checkpoint",
      "phase": "E · Job-ready",
      "level": "advanced",
      "title": "Checkpoint B — Typed project ready",
      "minutes": 35,
      "durationLabel": "Gate · Week 5–6",
      "overview": "Final gate: a strictly typed project with generics, utilities, typed API, and migration complete enough to demo in an interview.",
      "learn": [
        "Interview TS topics",
        "Portfolio readiness"
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
            "strict: true, typecheck + tests green in CI or locally",
            "Domain models + discriminated union (FetchState/Result)",
            "Generic ApiResponse or equivalent in use",
            "Utility types (Pick/Omit/Partial) — not hand-duplicated shapes",
            "API responses typed with guard or Zod validation",
            "Migration plan step 4+ complete (main + tests in TS)",
            "Can explain generic <T> and narrowing in 2 minutes"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview drill",
          "body": "Common questions: any vs unknown, type vs interface, what strictNullChecks fixes, how infer works, example discriminated union.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Record 5-minute answers. Demo typed project in VS Code — hover types, go to definition.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "What next",
          "body": "Apply TS to test automation (Playwright/Cypress typed page objects), React/Vue with TS, or Node backend. This library has paths for each.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Write 3 next-skill goals for 90 days.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "All 7 pass criteria met",
        "Interview drill recorded",
        "90-day goals written"
      ],
      "practice": {
        "title": "Typed demo",
        "brief": "Screen record: typecheck, tests, quick code walk showing generics + discriminated union. Portfolio ready."
      },
      "parentId": null,
      "overviewText": "Final gate: a strictly typed project with generics, utilities, typed API, and migration complete enough to demo in an interview.",
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
      "id": "ts-reference",
      "kind": "guide",
      "phase": "Reference",
      "level": "beginner",
      "title": "Cheat sheet & interview topics",
      "minutes": 15,
      "overview": "Quick reference for daily TS work and common interview questions. Return when stuck.",
      "learn": [
        "6-week map",
        "Utility quick ref",
        "Interview answers"
      ],
      "steps": [
        {
          "title": "Week map",
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
            "Week 1 — Strict setup, types/interfaces",
            "Week 2 — Unions, narrowing + Checkpoint A",
            "Week 3 — Generics, utility types",
            "Week 4 — Typing APIs",
            "Week 5 — Migration strategy",
            "Week 6 — Checkpoint B + polish"
          ],
          "callout": null,
          "aside": null
        },
        {
          "title": "Utility quick ref",
          "body": "Partial<T> optional all. Required<T> required all. Pick<T,K> subset. Omit<T,K> exclude. Record<K,V> dict. ReturnType<F> extract return.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Bookmark TS Handbook utility types page.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        },
        {
          "title": "Interview one-liners",
          "body": "any: opt out of checking. unknown: safe top type, narrow first. interface: extend/merge. type: unions/intersections. never: exhaustiveness sink.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Maintain living doc of TS interview Q&A in repo docs/ts-interview.md.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Cheat sheet bookmarked",
        "Interview doc started"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "Quick reference for daily TS work and common interview questions. Return when stuck.",
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
        "name": "TypeScript Handbook",
        "url": "https://www.typescriptlang.org/docs/handbook/intro.html"
      },
      {
        "name": "Total TypeScript",
        "url": "https://www.totaltypescript.com/"
      },
      {
        "name": "TypeScript Playground",
        "url": "https://www.typescriptlang.org/play"
      },
      {
        "name": "Zod Documentation",
        "url": "https://zod.dev/"
      }
    ],
    "tools": [
      "TypeScript (tsc)",
      "VS Code",
      "Vite",
      "Vitest",
      "Zod",
      "ESLint + typescript-eslint"
    ],
    "books": [
      "Effective TypeScript (Vanderkam)",
      "Programming TypeScript (Boris Cherny) — skim"
    ],
    "practice": [
      "https://github.com/type-challenges/type-challenges",
      "Convert a todo app from JS to TS",
      "Type a Playwright page object"
    ],
    "videos": [
      {
        "name": "Fireship — TypeScript in 100 seconds",
        "url": "https://www.youtube.com/watch?v=zQnBQ4tB3ZA"
      },
      {
        "name": "Matt Pocock — Total TypeScript tips",
        "url": "https://www.youtube.com/@mattpocockuk"
      }
    ]
  }
};
