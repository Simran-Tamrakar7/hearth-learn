import type { ChapterRecord } from "../../../types";

/** 1.9 Node Event Setup — setupNodeEvents & Plugins */
export const chapter = {
  "id": "cy-1-9-node-event-setup-setupnodeevents-plugins",
  "title": "1.9 Node Event Setup — setupNodeEvents & Plugins",
  "minutes": 32,
  "level": "beginner",
  "phase": "Part 1 · Setup & Project Structure",
  "partName": "Part 1 · Setup & Project Structure",
  "overviewText": "setupNodeEvents(on, config) is the Cypress 10+ replacement for cypress/plugins/index.js. It runs in Node when the project opens, registers cy.task handlers, and can mutate config. Tasks must return JSON-serializable values (or a Promise of one); use null when there is nothing to yield, and always return config from the function if you change it. This chapter seeds HRM data from Node, contrasts tasks with browser commands, and shows why functions and Buffers fail.",
  "why": "cy.task is the sanctioned bridge to the filesystem, database, and OS. People treat it like a browser command, forget to return config, or return a Mongoose document and get a serialization error. Plugins/index.js answers in interviews signal a Cypress 9 mental model.",
  "when": "When a test must seed Postgres, read a downloaded payroll CSV from disk, or generate a one-time token Node-side. Also when migrating plugins/index.js to Cypress 10+.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Before leave tests, you must insert a clean employee row via Node (not the UI). The spec calls cy.task('seedEmployee', { email }) and then visits /login.",
    "pass": "You register on('task') in setupNodeEvents, return a plain object from the handler, return config from setupNodeEvents, and never try to return a function or a circular DB document.",
    "fail": "You leave plugins/index.js as the only hook on Cypress 13, or you forget return config after setting baseUrl, or the task returns undefined and Cypress errors."
  },
  "tools": [],
  "customSummary": "- Cypress 10: plugins/index.js → e2e.setupNodeEvents(on, config) in cypress.config.js/ts.\n- setupNodeEvents runs in Node, once per launch (open/run), not in the browser.\n- cy.task('name', arg) invokes on('task') handlers; return JSON-serializable data or null — never undefined, functions, Maps, or circular objects.\n- Always return config from setupNodeEvents when you mutate it (best practice: always return config).\n- Tasks vs Commands.add: tasks are Node; commands are browser chainables.\n- Events: task, before:browser:launch, after:spec, file:preprocessor — register with on().",
  "contentMarkdown": "## The v10 replacement for plugins\n\nCypress 9:\n\n```js\n// cypress/plugins/index.js\nmodule.exports = (on, config) => {\n  on('task', { /* ... */ });\n  return config;\n};\n```\n\nCypress 10+:\n\n```ts\n// cypress.config.ts\nimport { defineConfig } from 'cypress';\n\nexport default defineConfig({\n  e2e: {\n    setupNodeEvents(on, config) {\n      on('task', {\n        ping() {\n          return 'pong';\n        },\n      });\n      return config;\n    },\n  },\n});\n```\n\nDelete unused `cypress/plugins/` after migrating so nobody adds new code there.\n\n`setupNodeEvents` runs in **Node** when Cypress **opens the project** (each `cypress open` / `cypress run` process), not once per `it`. Closures can hold a DB pool. Do not assume a browser `window`.\n\n## Signature and `return config`\n\n```ts\nsetupNodeEvents(on, config) {\n  // on — register listeners\n  // config — resolved config (env already merged from files / CLI at this point)\n\n  if (process.env.BASE_URL) {\n    config.baseUrl = process.env.BASE_URL;\n  }\n\n  return config; // MUST return if you mutated; recommended even if you did not\n}\n```\n\nIf you mutate `config` and **do not return it**, Cypress keeps the pre-mutation object. Symptoms: `baseUrl` still localhost in CI, `env` flags ignored. **Always `return config`.**\n\n`config.env` is the merged env **as of process start**. `CYPRESS_*` and `--env` are already applied. Runtime `Cypress.env()` in a spec happens later in the browser and does not loop back here.\n\n## `cy.task` — the important plugin\n\nBrowser code cannot safely talk to Postgres or `fs`. A **task** is a named Node function Cypress invokes from the queue:\n\n```ts\n// setupNodeEvents\non('task', {\n  seedEmployee({ email }: { email: string }) {\n    // Node: insert into DB, or call an internal admin API with a server secret\n    return { id: 'emp_123', email }; // PLAIN object\n  },\n  resetLeaveTable() {\n    // ...\n    return null; // Cypress forbids undefined — use null\n  },\n});\n```\n\nSpec:\n\n```ts\ncy.task('seedEmployee', { email: 'ada@bizlevate.test' }).then((emp) => {\n  expect(emp.email).to.eq('ada@bizlevate.test');\n});\ncy.visit('/login');\n```\n\n`cy.task` **retries** until the function returns (subject to `taskTimeout`, default 60s). The handler may return a Promise:\n\n```ts\nasync seedEmployee({ email }) {\n  const row = await db.employees.create({ email });\n  return { id: row.id, email: row.email }; // serialize!\n}\n```\n\n### Serialization rules (memorize)\n\nThe return value crosses the **Node ↔ browser** boundary. It must be **JSON-serializable**:\n\n| Return | OK? |\n|---|---|\n| `null` | Yes — use instead of `undefined` |\n| `{ id: 1, name: 'Ada' }` | Yes |\n| `['a', 'b']` | Yes |\n| `'pong'` / `42` / `true` | Yes |\n| `undefined` (implicit empty return) | **No** — Cypress errors |\n| `() => {}` / class instance with methods | **No** |\n| `Buffer`, `Map`, `Set`, `Date` (Dates often become strings if JSON'd — prefer ISO strings) | Avoid raw `Buffer`/`Map` |\n| Mongoose document / Prisma object with circular refs | **No** — map to a plain object first |\n\n```ts\n// wrong\nreturn employeeDocument;\n\n// right\nreturn {\n  id: employeeDocument.id,\n  email: employeeDocument.email,\n};\n```\n\n**Interview line:** \"`cy.task` must return serializable data. If there is no payload, return `null`. `setupNodeEvents` must return `config`.\"\n\n## Tasks vs custom commands vs `cy.request`\n\n| | Runs in | Use for |\n|---|---|---|\n| `Cypress.Commands.add` | Browser | UI sequences: `cy.login`, `cy.fillLeaveForm` |\n| `cy.task` | Node | DB seed, filesystem, crypto, OS |\n| `cy.request` | Node HTTP from Cypress backend | Hit HRM HTTP APIs with cookies/session |\n| `cy.exec` | Node shell | Last resort scripts |\n\nPrefer `cy.request` for \"POST /api/test/seed\" if HRM exposes a **test-only** HTTP route. Prefer `cy.task` when you must use a DB URL that should never be in the browser.\n\nNever put database passwords in spec files. Task code can read `process.env.DATABASE_URL` in Node.\n\n## Other `on(...)` events you will see\n\n```ts\nsetupNodeEvents(on, config) {\n  on('before:browser:launch', (browser, launchOptions) => {\n    // launchOptions.args.push('--foo')\n    return launchOptions;\n  });\n\n  on('after:spec', (spec, results) => {\n    // delete passing videos, send metrics\n  });\n\n  on('task', { /* ... */ });\n\n  return config;\n}\n```\n\nPreprocessors (`file:preprocessor`) are how webpack/vite plugins used to work; modern Cypress has a default bundler. Do not add one until you need path aliases or Babel extras.\n\n## Plugin *packages*\n\n`setupNodeEvents` is also where you **call** npm plugins:\n\n```ts\nsetupNodeEvents(on, config) {\n  // example shape — grep the plugin's docs\n  // require('cypress-grep/src/plugin')(config);\n  return config;\n}\n```\n\nInstalling `cypress-image-snapshot` or similar still ends up registering here. You are not authoring a public plugin in this manual; you are **hooking Node events**.\n\n## Playwright comparison\n\nPlaywright fixtures (`globalSetup`, `request`, custom fixtures) run in Node beside the test runner. Cypress splits **browser commands** vs **Node tasks** more sharply because the test body lives in the browser. That split is why `cy.task` exists at all.\n\nSelenium: DB setup lives in `@Before` in Java — same process as the test language, no IPC serialization. Cypress tasks are IPC; serialization is the tax.\n\n## Minimal HRM seed example\n\n```ts\n// cypress.config.ts (sketch)\nsetupNodeEvents(on, config) {\n  on('task', {\n    log(message: string) {\n      console.log(message);\n      return null;\n    },\n  });\n  return config;\n}\n```\n\n```ts\ncy.task('log', 'seeding skipped in this chapter');\n```\n\nWhen you add a real DB task, unit-test the mapper that turns DB rows into `{ id, email }` so the serializable boundary stays boring.\n\n## Failure modes\n\n1. **`task` returned `undefined`** — add `return null`.\n2. **Config change ignored** — you forgot `return config`.\n3. **`cy.task('seedEmployee')` fails with \"still pending\"** — handler threw, or hung without resolving a Promise. Check terminal **Node** logs, not only the Command Log.\n4. **Works in open, not in run** — task used a relative path that depends on cwd. Use `path.join(__dirname, ...)`.\n\nNext chapter is a **quick steps** checklist: zero to first green HRM spec, including gitignore, env, and the rules from 1.1–1.9.\n## `on('task')` object merge\n\nYou can pass one object with many names:\n\n```ts\non('task', {\n  ping: () => 'pong',\n  resetDb: async () => {\n    await db.reset();\n    return null;\n  },\n  seedLeave: async ({ email }) => {\n    const row = await db.leave.create({ email, status: 'PENDING' });\n    return { id: String(row.id), email: row.email, status: row.status };\n  },\n});\n```\n\nRegistering `on('task', ...)` twice **replaces** rather than merges in some versions — put all tasks in one object.\n\n## Debugging tasks\n\n`console.log` in a task prints in the **terminal that launched Cypress**, not the browser console. The Command Log shows `task seedLeave` with the argument. If it hangs, you likely forgot to resolve a Promise or to `return null`.\n\n```ts\ncy.task('seedLeave', { email: 'ada@bizlevate.test' }, { timeout: 120000 });\n```\n\n`taskTimeout` default is 60s. DB migrations in a task are a smell — run migrations in CI setup, not per test.\n\n## `before:run` / `after:run`\n\n```ts\non('before:run', async (details) => {\n  console.log('browser', details.browser);\n});\n```\n\nUseful for printing env in CI logs. Do not seed the DB here if specs run in parallel on different machines with different DBs.\n\n## Security\n\nTasks run with **full Node filesystem and env access**. A spec calling `cy.task('exec', 'rm -rf /')` is only as safe as the handlers you register. Do not expose a generic `cy.task('exec', cmd)`. Allowlist named tasks (`resetDb`, `seedLeave`).\n\n## Interview drill\n\nWhere did `plugins/index.js` go? What happens if a task returns `undefined`? Why return `config`? Why not return a Mongoose document? Task vs `Commands.add` vs `cy.request`?\n## Passing `config.env` into tasks\n\n```ts\nsetupNodeEvents(on, config) {\n  const dbUrl = process.env.DATABASE_URL || config.env.DATABASE_URL;\n  on('task', {\n    pingDb() {\n      if (!dbUrl) throw new Error('DATABASE_URL missing');\n      return { ok: true };\n    },\n  });\n  return config;\n}\n```\n\nThe browser never sees `DATABASE_URL` unless you copy it into `config.env` (usually you should **not** — keep it Node-only).\n\n## `cy.task` argument must also serialize\n\n```ts\ncy.task('seed', { createdAt: new Date() }); // Date → string over IPC, maybe\ncy.task('seed', { createdAt: '2026-09-16' }); // explicit\n```\n\nFunctions in the argument throw. Keep payloads JSON.\n\n## `after:spec` video cleanup (Cypress 13 still useful)\n\n```ts\non('after:spec', (spec, results) => {\n  if (results && results.stats.failures === 0 && results.video) {\n    fs.unlinkSync(results.video);\n  }\n});\n```\n\nOnly relevant when `video: true`. Pattern: keep failure videos, delete passes. Playwright's `retain-on-failure` is this in one config key.\n\n## Plugin packages and `return config`\n\nMany plugins want:\n\n```ts\nsetupNodeEvents(on, config) {\n  grepPlugin(on, config);\n  return config;\n}\n```\n\nIf you forget to return after the plugin mutates `specPattern`, grep silently does nothing.\n\n## Interview one-liner\n\n\"`setupNodeEvents` is Node, replaces `plugins/index.js`, registers `cy.task` with serializable returns, and must return `config`.\"\n## `on('file:preprocessor')` — usually skip\n\nOlder plugins replaced the preprocessor to teach Cypress webpack aliases. Current Cypress bundles specs with its own pipeline (webpack or vite depending on version). Adding a preprocessor **replaces** that pipeline; get it wrong and every spec fails to compile. For HRM E2E, you do not need it.\n\n## Task timeout vs Mocha timeout\n\nA task that runs 90 seconds needs `{ timeout: 100000 }` on `cy.task` **and** a Mocha `this.timeout` higher than that. Otherwise Mocha kills the test while Node is still working. Prefer faster seeds.\n\n## Returning arrays\n\n```ts\non('task', {\n  listTempFiles() {\n    return fs.readdirSync('/tmp').filter((f) => f.startsWith('hrm-'));\n  },\n});\n```\n\nArrays of strings are serializable. Arrays of `fs.Dirent` objects may not be. Map to names.\n\n## `setupNodeEvents` async\n\n```ts\nasync setupNodeEvents(on, config) {\n  const secrets = await loadFromVault();\n  config.env.adminPassword = secrets.adminPassword;\n  on('task', { /* ... */ });\n  return config;\n}\n```\n\nSupported. Still return `config`. Do not put Vault tokens into `config.env` if specs could `cy.log` them — prefer Node-only closures inside tasks.\n",
  "blocks": [
    {
      "id": "cy-1-9-md-0",
      "type": "overview",
      "heading": "The v10 replacement for plugins",
      "content": "Cypress 9:\n\n```js\n// cypress/plugins/index.js\nmodule.exports = (on, config) => {\n  on('task', { /* ... */ });\n  return config;\n};\n```\n\nCypress 10+:\n\n```ts\n// cypress.config.ts\nimport { defineConfig } from 'cypress';\n\nexport default defineConfig({\n  e2e: {\n    setupNodeEvents(on, config) {\n      on('task', {\n        ping() {\n          return 'pong';\n        },\n      });\n      return config;\n    },\n  },\n});\n```\n\nDelete unused `cypress/plugins/` after migrating so nobody adds new code there.\n\n`setupNodeEvents` runs in **Node** when Cypress **opens the project** (each `cypress open` / `cypress run` process), not once per `it`. Closures can hold a DB pool. Do not assume a browser `window`.",
      "order": 0
    },
    {
      "id": "cy-1-9-md-1",
      "type": "overview",
      "heading": "Signature and `return config`",
      "content": "```ts\nsetupNodeEvents(on, config) {\n  // on — register listeners\n  // config — resolved config (env already merged from files / CLI at this point)\n\n  if (process.env.BASE_URL) {\n    config.baseUrl = process.env.BASE_URL;\n  }\n\n  return config; // MUST return if you mutated; recommended even if you did not\n}\n```\n\nIf you mutate `config` and **do not return it**, Cypress keeps the pre-mutation object. Symptoms: `baseUrl` still localhost in CI, `env` flags ignored. **Always `return config`.**\n\n`config.env` is the merged env **as of process start**. `CYPRESS_*` and `--env` are already applied. Runtime `Cypress.env()` in a spec happens later in the browser and does not loop back here.",
      "order": 1
    },
    {
      "id": "cy-1-9-md-2",
      "type": "overview",
      "heading": "`cy.task` — the important plugin",
      "content": "Browser code cannot safely talk to Postgres or `fs`. A **task** is a named Node function Cypress invokes from the queue:\n\n```ts\n// setupNodeEvents\non('task', {\n  seedEmployee({ email }: { email: string }) {\n    // Node: insert into DB, or call an internal admin API with a server secret\n    return { id: 'emp_123', email }; // PLAIN object\n  },\n  resetLeaveTable() {\n    // ...\n    return null; // Cypress forbids undefined — use null\n  },\n});\n```\n\nSpec:\n\n```ts\ncy.task('seedEmployee', { email: 'ada@bizlevate.test' }).then((emp) => {\n  expect(emp.email).to.eq('ada@bizlevate.test');\n});\ncy.visit('/login');\n```\n\n`cy.task` **retries** until the function returns (subject to `taskTimeout`, default 60s). The handler may return a Promise:\n\n```ts\nasync seedEmployee({ email }) {\n  const row = await db.employees.create({ email });\n  return { id: row.id, email: row.email }; // serialize!\n}\n```",
      "order": 2
    },
    {
      "id": "cy-1-9-md-3",
      "type": "overview",
      "heading": "Serialization rules (memorize)",
      "content": "The return value crosses the **Node ↔ browser** boundary. It must be **JSON-serializable**:\n\n| Return | OK? |\n|---|---|\n| `null` | Yes — use instead of `undefined` |\n| `{ id: 1, name: 'Ada' }` | Yes |\n| `['a', 'b']` | Yes |\n| `'pong'` / `42` / `true` | Yes |\n| `undefined` (implicit empty return) | **No** — Cypress errors |\n| `() => {}` / class instance with methods | **No** |\n| `Buffer`, `Map`, `Set`, `Date` (Dates often become strings if JSON'd — prefer ISO strings) | Avoid raw `Buffer`/`Map` |\n| Mongoose document / Prisma object with circular refs | **No** — map to a plain object first |\n\n```ts\n// wrong\nreturn employeeDocument;\n\n// right\nreturn {\n  id: employeeDocument.id,\n  email: employeeDocument.email,\n};\n```\n\n**Interview line:** \"`cy.task` must return serializable data. If there is no payload, return `null`. `setupNodeEvents` must return `config`.\"",
      "order": 3
    },
    {
      "id": "cy-1-9-md-4",
      "type": "overview",
      "heading": "Tasks vs custom commands vs `cy.request`",
      "content": "| | Runs in | Use for |\n|---|---|---|\n| `Cypress.Commands.add` | Browser | UI sequences: `cy.login`, `cy.fillLeaveForm` |\n| `cy.task` | Node | DB seed, filesystem, crypto, OS |\n| `cy.request` | Node HTTP from Cypress backend | Hit HRM HTTP APIs with cookies/session |\n| `cy.exec` | Node shell | Last resort scripts |\n\nPrefer `cy.request` for \"POST /api/test/seed\" if HRM exposes a **test-only** HTTP route. Prefer `cy.task` when you must use a DB URL that should never be in the browser.\n\nNever put database passwords in spec files. Task code can read `process.env.DATABASE_URL` in Node.",
      "order": 4
    },
    {
      "id": "cy-1-9-md-5",
      "type": "overview",
      "heading": "Other `on(...)` events you will see",
      "content": "```ts\nsetupNodeEvents(on, config) {\n  on('before:browser:launch', (browser, launchOptions) => {\n    // launchOptions.args.push('--foo')\n    return launchOptions;\n  });\n\n  on('after:spec', (spec, results) => {\n    // delete passing videos, send metrics\n  });\n\n  on('task', { /* ... */ });\n\n  return config;\n}\n```\n\nPreprocessors (`file:preprocessor`) are how webpack/vite plugins used to work; modern Cypress has a default bundler. Do not add one until you need path aliases or Babel extras.",
      "order": 5
    },
    {
      "id": "cy-1-9-md-6",
      "type": "overview",
      "heading": "Plugin *packages*",
      "content": "`setupNodeEvents` is also where you **call** npm plugins:\n\n```ts\nsetupNodeEvents(on, config) {\n  // example shape — grep the plugin's docs\n  // require('cypress-grep/src/plugin')(config);\n  return config;\n}\n```\n\nInstalling `cypress-image-snapshot` or similar still ends up registering here. You are not authoring a public plugin in this manual; you are **hooking Node events**.",
      "order": 6
    },
    {
      "id": "cy-1-9-md-7",
      "type": "overview",
      "heading": "Playwright comparison",
      "content": "Playwright fixtures (`globalSetup`, `request`, custom fixtures) run in Node beside the test runner. Cypress splits **browser commands** vs **Node tasks** more sharply because the test body lives in the browser. That split is why `cy.task` exists at all.\n\nSelenium: DB setup lives in `@Before` in Java — same process as the test language, no IPC serialization. Cypress tasks are IPC; serialization is the tax.",
      "order": 7
    },
    {
      "id": "cy-1-9-md-8",
      "type": "overview",
      "heading": "Minimal HRM seed example",
      "content": "```ts\n// cypress.config.ts (sketch)\nsetupNodeEvents(on, config) {\n  on('task', {\n    log(message: string) {\n      console.log(message);\n      return null;\n    },\n  });\n  return config;\n}\n```\n\n```ts\ncy.task('log', 'seeding skipped in this chapter');\n```\n\nWhen you add a real DB task, unit-test the mapper that turns DB rows into `{ id, email }` so the serializable boundary stays boring.",
      "order": 8
    },
    {
      "id": "cy-1-9-md-9",
      "type": "overview",
      "heading": "Failure modes",
      "content": "1. **`task` returned `undefined`** — add `return null`.\n2. **Config change ignored** — you forgot `return config`.\n3. **`cy.task('seedEmployee')` fails with \"still pending\"** — handler threw, or hung without resolving a Promise. Check terminal **Node** logs, not only the Command Log.\n4. **Works in open, not in run** — task used a relative path that depends on cwd. Use `path.join(__dirname, ...)`.\n\nNext chapter is a **quick steps** checklist: zero to first green HRM spec, including gitignore, env, and the rules from 1.1–1.9.",
      "order": 9
    },
    {
      "id": "cy-1-9-md-10",
      "type": "overview",
      "heading": "`on('task')` object merge",
      "content": "You can pass one object with many names:\n\n```ts\non('task', {\n  ping: () => 'pong',\n  resetDb: async () => {\n    await db.reset();\n    return null;\n  },\n  seedLeave: async ({ email }) => {\n    const row = await db.leave.create({ email, status: 'PENDING' });\n    return { id: String(row.id), email: row.email, status: row.status };\n  },\n});\n```\n\nRegistering `on('task', ...)` twice **replaces** rather than merges in some versions — put all tasks in one object.",
      "order": 10
    },
    {
      "id": "cy-1-9-md-11",
      "type": "overview",
      "heading": "Debugging tasks",
      "content": "`console.log` in a task prints in the **terminal that launched Cypress**, not the browser console. The Command Log shows `task seedLeave` with the argument. If it hangs, you likely forgot to resolve a Promise or to `return null`.\n\n```ts\ncy.task('seedLeave', { email: 'ada@bizlevate.test' }, { timeout: 120000 });\n```\n\n`taskTimeout` default is 60s. DB migrations in a task are a smell — run migrations in CI setup, not per test.",
      "order": 11
    },
    {
      "id": "cy-1-9-md-12",
      "type": "overview",
      "heading": "`before:run` / `after:run`",
      "content": "```ts\non('before:run', async (details) => {\n  console.log('browser', details.browser);\n});\n```\n\nUseful for printing env in CI logs. Do not seed the DB here if specs run in parallel on different machines with different DBs.",
      "order": 12
    },
    {
      "id": "cy-1-9-md-13",
      "type": "overview",
      "heading": "Security",
      "content": "Tasks run with **full Node filesystem and env access**. A spec calling `cy.task('exec', 'rm -rf /')` is only as safe as the handlers you register. Do not expose a generic `cy.task('exec', cmd)`. Allowlist named tasks (`resetDb`, `seedLeave`).",
      "order": 13
    },
    {
      "id": "cy-1-9-md-14",
      "type": "overview",
      "heading": "Interview drill",
      "content": "Where did `plugins/index.js` go? What happens if a task returns `undefined`? Why return `config`? Why not return a Mongoose document? Task vs `Commands.add` vs `cy.request`?",
      "order": 14
    },
    {
      "id": "cy-1-9-md-15",
      "type": "overview",
      "heading": "Passing `config.env` into tasks",
      "content": "```ts\nsetupNodeEvents(on, config) {\n  const dbUrl = process.env.DATABASE_URL || config.env.DATABASE_URL;\n  on('task', {\n    pingDb() {\n      if (!dbUrl) throw new Error('DATABASE_URL missing');\n      return { ok: true };\n    },\n  });\n  return config;\n}\n```\n\nThe browser never sees `DATABASE_URL` unless you copy it into `config.env` (usually you should **not** — keep it Node-only).",
      "order": 15
    },
    {
      "id": "cy-1-9-md-16",
      "type": "overview",
      "heading": "`cy.task` argument must also serialize",
      "content": "```ts\ncy.task('seed', { createdAt: new Date() }); // Date → string over IPC, maybe\ncy.task('seed', { createdAt: '2026-09-16' }); // explicit\n```\n\nFunctions in the argument throw. Keep payloads JSON.",
      "order": 16
    },
    {
      "id": "cy-1-9-md-17",
      "type": "overview",
      "heading": "`after:spec` video cleanup (Cypress 13 still useful)",
      "content": "```ts\non('after:spec', (spec, results) => {\n  if (results && results.stats.failures === 0 && results.video) {\n    fs.unlinkSync(results.video);\n  }\n});\n```\n\nOnly relevant when `video: true`. Pattern: keep failure videos, delete passes. Playwright's `retain-on-failure` is this in one config key.",
      "order": 17
    },
    {
      "id": "cy-1-9-md-18",
      "type": "overview",
      "heading": "Plugin packages and `return config`",
      "content": "Many plugins want:\n\n```ts\nsetupNodeEvents(on, config) {\n  grepPlugin(on, config);\n  return config;\n}\n```\n\nIf you forget to return after the plugin mutates `specPattern`, grep silently does nothing.",
      "order": 18
    },
    {
      "id": "cy-1-9-md-19",
      "type": "overview",
      "heading": "Interview one-liner",
      "content": "\"`setupNodeEvents` is Node, replaces `plugins/index.js`, registers `cy.task` with serializable returns, and must return `config`.\"",
      "order": 19
    },
    {
      "id": "cy-1-9-md-20",
      "type": "overview",
      "heading": "`on('file:preprocessor')` — usually skip",
      "content": "Older plugins replaced the preprocessor to teach Cypress webpack aliases. Current Cypress bundles specs with its own pipeline (webpack or vite depending on version). Adding a preprocessor **replaces** that pipeline; get it wrong and every spec fails to compile. For HRM E2E, you do not need it.",
      "order": 20
    },
    {
      "id": "cy-1-9-md-21",
      "type": "overview",
      "heading": "Task timeout vs Mocha timeout",
      "content": "A task that runs 90 seconds needs `{ timeout: 100000 }` on `cy.task` **and** a Mocha `this.timeout` higher than that. Otherwise Mocha kills the test while Node is still working. Prefer faster seeds.",
      "order": 21
    },
    {
      "id": "cy-1-9-md-22",
      "type": "overview",
      "heading": "Returning arrays",
      "content": "```ts\non('task', {\n  listTempFiles() {\n    return fs.readdirSync('/tmp').filter((f) => f.startsWith('hrm-'));\n  },\n});\n```\n\nArrays of strings are serializable. Arrays of `fs.Dirent` objects may not be. Map to names.",
      "order": 22
    },
    {
      "id": "cy-1-9-md-23",
      "type": "overview",
      "heading": "`setupNodeEvents` async",
      "content": "```ts\nasync setupNodeEvents(on, config) {\n  const secrets = await loadFromVault();\n  config.env.adminPassword = secrets.adminPassword;\n  on('task', { /* ... */ });\n  return config;\n}\n```\n\nSupported. Still return `config`. Do not put Vault tokens into `config.env` if specs could `cy.log` them — prefer Node-only closures inside tasks.",
      "order": 23
    }
  ],
  "advantages": [
    "1.9 Node Event Setup — setupNodeEvents & Plugins — cy."
  ],
  "limitations": [
    "1.9 Node Event Setup — setupNodeEvents & Plugins is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
