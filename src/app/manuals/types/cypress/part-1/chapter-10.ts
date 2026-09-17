import type { ChapterRecord } from "../../../types";

/** 1.10 Quick Steps */
export const chapter = {
  "id": "cy-1-10-quick-steps",
  "title": "1.10 Quick Steps",
  "minutes": 18,
  "level": "beginner",
  "phase": "Part 1 · Setup & Project Structure",
  "partName": "Part 1 · Setup & Project Structure",
  "overviewText": "This chapter is a single ordered checklist: Node, install Cypress as a devDependency, verify the ~250MB binary, scaffold Cypress 10+ folders, gitignore artifacts and cypress.env.json, set baseUrl, write a .cy. spec without await, keep timeouts layered, and run open then run. Use it as a lab worksheet and as an interview 'how would you add Cypress to this repo' answer.",
  "why": "Setup knowledge that stays in ten separate chapters does not survive a Monday morning. A numbered path is how you onboard the next HRM engineer and how you catch skipped steps (global install, committed videos, Cypress 9 folders).",
  "when": "Starting a new repo, onboarding, or auditing an existing Cypress folder against current defaults (v10 config, v12 isolation, v13 video).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A teammate has a clean clone and one hour to get a login smoke test green locally and ready for CI.",
    "pass": "They follow the checklist: -D install, verify, e2e/*.cy.ts, gitignore, baseUrl, no await, cypress open then cypress run --browser chrome.",
    "fail": "They npm i -g cypress, create cypress/integration/login.spec.js, commit cypress.env.json, and set defaultCommandTimeout to 30s."
  },
  "tools": [],
  "customSummary": "- Install: npm i -D cypress — never --save, never -g; then npx cypress verify (Electron cache ~250MB).\n- Scaffold: Cypress 10+ cypress.config.js/ts, cypress/e2e, fixtures, support — not json/integration/plugins.\n- Gitignore: screenshots, videos, downloads, cypress.env.json. Specs use the .cy. infix.\n- Config: baseUrl; testIsolation true (v12); video false unless opted in (v13); do not inflate defaultCommandTimeout.\n- First spec: visit + should; command queue, no await cy.*.\n- Env: config < env.json < CYPRESS_* < --env < Cypress.env runtime.\n- Author with cypress open; CI with cypress run. TS: tsconfig inside cypress/. Tasks: serializable return + return config.",
  "contentMarkdown": "## Lab: zero → first green spec\n\nDo these in order on Bizlevate HRM. Skip a step only if it is already done (and verify it was done **correctly**).\n\n### 1. Runtime\n\n- [ ] Node LTS compatible with your Cypress major (`node -v`).\n- [ ] Same package manager as the repo (`npm ci` works).\n- [ ] HRM app starts (`npm run dev`) on the port you will put in `baseUrl`.\n\n### 2. Install (devDependency only)\n\n```bash\nnpm install cypress --save-dev\nnpx cypress verify\n```\n\n- [ ] `package.json` lists `cypress` under **`devDependencies`**.\n- [ ] You did **not** use `--save` or `-g`.\n- [ ] Verify downloaded the **~250MB** binary cache (macOS `~/Library/Caches/Cypress`).\n- [ ] `package.json` scripts: `\"cypress:open\": \"cypress open\"`, `\"cypress:run\": \"cypress run\"`.\n\n### 3. Scaffold Cypress 10+ layout\n\n```bash\nnpx cypress open --e2e\n```\n\nPick a browser, let Cypress write files, quit.\n\n- [ ] `cypress.config.js` or `cypress.config.ts` at **repo root** — **no** `cypress.json`.\n- [ ] Folders: `cypress/e2e`, `cypress/fixtures`, `cypress/support`.\n- [ ] **No** new work in `cypress/integration` or `cypress/plugins/index.js`.\n- [ ] Delete example specs if you do not want them.\n\n### 4. Gitignore artifacts and secrets\n\n```gitignore\ncypress/screenshots\ncypress/videos\ncypress/downloads\ncypress.env.json\n```\n\n- [ ] Example secrets file `cypress.env.json.example` committed; real `cypress.env.json` not committed.\n\n### 5. Config that will not embarrass you later\n\n```ts\nexport default defineConfig({\n  video: false, // Cypress 13 default — set true only if you want run-mode videos\n  screenshotOnRunFailure: true,\n  defaultCommandTimeout: 4000, // do not \"fix flakes\" by raising this globally\n  e2e: {\n    baseUrl: 'http://localhost:3000',\n    testIsolation: true, // Cypress 12 default — keep it\n    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',\n    setupNodeEvents(on, config) {\n      return config;\n    },\n  },\n});\n```\n\n- [ ] `baseUrl` matches running HRM.\n- [ ] Timeouts stay layered; no 30s global command timeout.\n- [ ] `setupNodeEvents` **returns `config`**.\n\n### 6. TypeScript (if specs are `.ts`)\n\n- [ ] `cypress/tsconfig.json` with `\"types\": [\"cypress\"]`.\n- [ ] Specs named `*.cy.ts` (infix required by default `specPattern`).\n\n### 7. First spec — queue, not await\n\n`cypress/e2e/login.cy.ts`:\n\n```ts\ndescribe('HRM login page', () => {\n  it('shows the sign-in heading', () => {\n    cy.visit('/login');\n    cy.contains(/sign in/i).should('be.visible');\n  });\n});\n```\n\n- [ ] No `await cy.*`.\n- [ ] No `const el = cy.get(...)` used as a DOM node.\n- [ ] Assertion present (`.should`).\n\n### 8. Env for the next login test (do not commit secrets)\n\n```json\n{\n  \"adminEmail\": \"admin@bizlevate.test\",\n  \"adminPassword\": \"local-dev-only\"\n}\n```\n\nPrecedence (low → high): **config `env` < `cypress.env.json` < `CYPRESS_*` < `--env` < `Cypress.env()` runtime**.\n\nCI: `CYPRESS_adminPassword` from a secret. Not `adminPassword` without prefix.\n\n### 9. Run both modes once\n\n```bash\n# app already running\nnpm run cypress:open     # click login.cy.ts, watch Command Log\nnpx cypress run --browser chrome --spec cypress/e2e/login.cy.ts\n```\n\n- [ ] Open: you can time-travel the visit.\n- [ ] Run: exit code 0; no surprise videos unless `video: true`.\n\n### 10. Node task rule (when you add one)\n\n- [ ] Handler returns a **serializable** object or **`null`**, never `undefined`.\n- [ ] `return config` from `setupNodeEvents`.\n\n---\n\n## Anti-checklist (if you did any of these, undo them)\n\n| Don't | Do |\n|---|---|\n| `npm i -g cypress` / `npm i cypress --save` | `npm i -D cypress` + `npx cypress` |\n| `cypress.json` + `integration/*.spec.js` | `cypress.config.*` + `e2e/*.cy.ts` |\n| Commit `videos/` or `cypress.env.json` | gitignore both |\n| `defaultCommandTimeout: 30000` | Fix the wait; use per-command `{ timeout }` |\n| `await cy.visit` | Queue + `.should` |\n| Assume videos always record | Cypress **13** default `video: false` |\n| Login in `before` only, rely on leftover cookies | `testIsolation: true` → `beforeEach` / `cy.session` |\n| `cy.task` returns a class instance | Plain object / `null` |\n\n## Interview recap (60 seconds)\n\n\"I'd add Cypress as a **devDependency**, verify the **Electron cache**, use **Cypress 10+** `cypress.config` with **e2e** and **setupNodeEvents**, keep specs under **`cypress/e2e` with a `.cy.` infix**, gitignore **artifacts and `cypress.env.json`**, set **`baseUrl`**, leave **`testIsolation` true** and **`video` explicit**, never raise **global** `defaultCommandTimeout`, and write the first test as **queued commands with `.should`**, not **`await`**. Env precedence is **config < env.json < CYPRESS_* < --env < runtime Cypress.env**. Open for authoring, run for CI.\"\n\n## What Part 2 will assume\n\nYou can `cy.visit` + `cy.get` + `.should` a page. Part 2 unpacks **Mocha structure**, **get vs contains vs find**, the **command queue**, **retry-ability**, **aliases**, **should vs expect**, and **`cy.wrap`**.\n\nYou are done with setup. Keep this checklist; do not keep a 30-second timeout.\n## Timed 45-minute lab (HRM)\n\n| Minute | Action |\n|---|---|\n| 0–5 | Confirm Node, app on :3000, `npm i -D cypress` |\n| 5–10 | `npx cypress verify` — note cache path |\n| 10–15 | `cypress open --e2e`, confirm `e2e/` + config, not json/integration |\n| 15–20 | gitignore artifacts + env json; add `baseUrl` |\n| 20–30 | Write `login.cy.ts` with visit + should, no await |\n| 30–35 | `cypress run --browser chrome --spec ...` |\n| 35–45 | Add `cypress/tsconfig.json` if using TS; recite env precedence and v12/v13 defaults |\n\nIf you skip gitignore, you will commit a screenshot of the first failure. If you skip `verify`, CI will download Electron on the test job.\n\n## \"Done\" definition for Part 1\n\nA reviewer can clone, `npm ci`, `npx cypress verify`, start HRM, `npx cypress run --spec cypress/e2e/login.cy.ts`, and see pass. `package.json` has Cypress under `devDependencies`. No secrets in git. No `await cy`. `testIsolation` still true. `video` is explicit if CI expects recordings.\n\n## 60-second install recap (again, because interviews)\n\ndevDependency; never `--save` or `-g`; ~250MB cache; v10 `cypress.config` / `e2e` / `setupNodeEvents`; `.cy.` infix; gitignore screenshots/videos/downloads/`cypress.env.json`; queue not await; `baseUrl`; layered timeouts; env **config < env.json < CYPRESS_* < --env < runtime**; open vs run; `tsconfig` inside `cypress/`; tasks serializable + `return config`; video false since 13; isolation true since 12.\n\n## Next part\n\nYou now have a green smoke spec. Part 2 teaches Mocha structure, `get`/`contains`/`find`, the queue, retry-ability, aliases, `should` vs `expect`, and `cy.wrap`.\n## Copy-paste package.json fragment\n\n```json\n{\n  \"devDependencies\": {\n    \"cypress\": \"13.17.0\"\n  },\n  \"scripts\": {\n    \"cypress:open\": \"cypress open --e2e --browser chrome\",\n    \"cypress:run\": \"cypress run --browser chrome\",\n    \"cypress:verify\": \"cypress verify\"\n  }\n}\n```\n\nConfirm this sits next to Next scripts, not instead of them. Production start scripts must not call Cypress.\n\n## Copy-paste `.gitignore` fragment\n\n```gitignore\ncypress/screenshots\ncypress/videos\ncypress/downloads\ncypress.env.json\n```\n\n## Copy-paste `cypress/tsconfig.json`\n\n```json\n{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2022\", \"DOM\"],\n    \"types\": [\"cypress\"],\n    \"noEmit\": true,\n    \"strict\": true\n  },\n  \"include\": [\"**/*.ts\"]\n}\n```\n\n## Red-flag review comments (use these)\n\n1. \"Cypress is in `dependencies` — move to `devDependencies`.\"\n2. \"This is `cypress.json` / `integration/` — we are on v10+.\"\n3. \"Missing `.cy.` — spec will not run.\"\n4. \"`await cy.visit` — queue, not Promises.\"\n5. \"`defaultCommandTimeout: 30000` — no.\"\n6. \"Committed `cypress.env.json` — rotate secrets.\"\n7. \"Assumed video on — Cypress 13 default is false.\"\n8. \"Login only in `before` — `testIsolation` is true.\"\n\nIf a PR has none of these, Part 1 did its job.\n## Verify script you can paste into onboarding docs\n\n```bash\nset -e\ntest -f cypress.config.ts -o -f cypress.config.js\ntest ! -f cypress.json\ntest -d cypress/e2e\ntest -f cypress/support/e2e.ts -o -f cypress/support/e2e.js\ngrep -q 'cypress/screenshots' .gitignore\ngrep -q 'cypress.env.json' .gitignore\nnode -e \"const p=require('./package.json'); if(!p.devDependencies.cypress) process.exit(1)\"\nnpx cypress verify\n```\n\nIf any line fails, the engineer is not done with Part 1.\n\n## FAQ\n\n**Do I need Cypress Cloud?** No.\n**Do I need Chrome installed?** Not for Electron; yes for `--browser chrome`.\n**Can I put Cypress in a sibling repo?** You can; you lose colocation. Prefer the HRM repo.\n**Can I use Jest's `describe` types?** Keep them out of `cypress/tsconfig.json`.\n## Files that should exist at the end of the lab\n\n```text\npackage.json                 # cypress in devDependencies\ncypress.config.ts            # baseUrl, setupNodeEvents returning config\ncypress/tsconfig.json        # types: [\"cypress\"]\ncypress/e2e/login.cy.ts\ncypress/support/e2e.ts\ncypress/support/commands.ts\ncypress/fixtures/.gitkeep    # or a real json\ncypress.env.json.example\n.gitignore                   # artifacts + cypress.env.json\n```\n\n`cypress.env.json` exists on disk locally, is gitignored, and is **not** on the remote.\n\n## If you only remember seven rules\n\n1. `-D`, not `--save`, not `-g`\n2. v10 config/e2e/setupNodeEvents\n3. `.cy.` infix\n4. gitignore videos/screenshots/downloads/env json\n5. no `await cy.*`\n6. env: config < env.json < CYPRESS_* < --env < runtime\n7. isolation true (v12), video false (v13) unless you opt in\n## Common first-run errors (cheat sheet)\n\n| Error | Fix |\n|---|---|\n| 0 specs found | Rename to `.cy.ts` / check `e2e/` not `integration/` |\n| `ERR_CONNECTION_REFUSED` | Start HRM; fix `baseUrl` |\n| `cypress.env.json` in the PR | gitignore; rotate if it had secrets |\n| `await cy.visit` | Delete await; use `.should` |\n| Videos missing after v13 | Set `video: true` if you want them |\n| Second test logged out | `beforeEach` login; isolation is on |\n| `task` undefined return | `return null` |\n| Config `baseUrl` ignored in CI | `--config baseUrl=` or `return config` after mutate |\n## You are done with Part 1 when\n\nA clean clone + `npm ci` + `npx cypress verify` + app up + `npx cypress run --spec cypress/e2e/login.cy.ts` is green without global Cypress, without `cypress.json`, and without committed secrets.\n",
  "blocks": [
    {
      "id": "cy-1-10-md-0",
      "type": "overview",
      "heading": "Lab: zero → first green spec",
      "content": "Do these in order on Bizlevate HRM. Skip a step only if it is already done (and verify it was done **correctly**).",
      "order": 0
    },
    {
      "id": "cy-1-10-md-1",
      "type": "overview",
      "heading": "1. Runtime",
      "content": "- [ ] Node LTS compatible with your Cypress major (`node -v`).\n- [ ] Same package manager as the repo (`npm ci` works).\n- [ ] HRM app starts (`npm run dev`) on the port you will put in `baseUrl`.",
      "order": 1
    },
    {
      "id": "cy-1-10-md-2",
      "type": "overview",
      "heading": "2. Install (devDependency only)",
      "content": "```bash\nnpm install cypress --save-dev\nnpx cypress verify\n```\n\n- [ ] `package.json` lists `cypress` under **`devDependencies`**.\n- [ ] You did **not** use `--save` or `-g`.\n- [ ] Verify downloaded the **~250MB** binary cache (macOS `~/Library/Caches/Cypress`).\n- [ ] `package.json` scripts: `\"cypress:open\": \"cypress open\"`, `\"cypress:run\": \"cypress run\"`.",
      "order": 2
    },
    {
      "id": "cy-1-10-md-3",
      "type": "overview",
      "heading": "3. Scaffold Cypress 10+ layout",
      "content": "```bash\nnpx cypress open --e2e\n```\n\nPick a browser, let Cypress write files, quit.\n\n- [ ] `cypress.config.js` or `cypress.config.ts` at **repo root** — **no** `cypress.json`.\n- [ ] Folders: `cypress/e2e`, `cypress/fixtures`, `cypress/support`.\n- [ ] **No** new work in `cypress/integration` or `cypress/plugins/index.js`.\n- [ ] Delete example specs if you do not want them.",
      "order": 3
    },
    {
      "id": "cy-1-10-md-4",
      "type": "overview",
      "heading": "4. Gitignore artifacts and secrets",
      "content": "```gitignore\ncypress/screenshots\ncypress/videos\ncypress/downloads\ncypress.env.json\n```\n\n- [ ] Example secrets file `cypress.env.json.example` committed; real `cypress.env.json` not committed.",
      "order": 4
    },
    {
      "id": "cy-1-10-md-5",
      "type": "overview",
      "heading": "5. Config that will not embarrass you later",
      "content": "```ts\nexport default defineConfig({\n  video: false, // Cypress 13 default — set true only if you want run-mode videos\n  screenshotOnRunFailure: true,\n  defaultCommandTimeout: 4000, // do not \"fix flakes\" by raising this globally\n  e2e: {\n    baseUrl: 'http://localhost:3000',\n    testIsolation: true, // Cypress 12 default — keep it\n    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',\n    setupNodeEvents(on, config) {\n      return config;\n    },\n  },\n});\n```\n\n- [ ] `baseUrl` matches running HRM.\n- [ ] Timeouts stay layered; no 30s global command timeout.\n- [ ] `setupNodeEvents` **returns `config`**.",
      "order": 5
    },
    {
      "id": "cy-1-10-md-6",
      "type": "overview",
      "heading": "6. TypeScript (if specs are `.ts`)",
      "content": "- [ ] `cypress/tsconfig.json` with `\"types\": [\"cypress\"]`.\n- [ ] Specs named `*.cy.ts` (infix required by default `specPattern`).",
      "order": 6
    },
    {
      "id": "cy-1-10-md-7",
      "type": "overview",
      "heading": "7. First spec — queue, not await",
      "content": "`cypress/e2e/login.cy.ts`:\n\n```ts\ndescribe('HRM login page', () => {\n  it('shows the sign-in heading', () => {\n    cy.visit('/login');\n    cy.contains(/sign in/i).should('be.visible');\n  });\n});\n```\n\n- [ ] No `await cy.*`.\n- [ ] No `const el = cy.get(...)` used as a DOM node.\n- [ ] Assertion present (`.should`).",
      "order": 7
    },
    {
      "id": "cy-1-10-md-8",
      "type": "overview",
      "heading": "8. Env for the next login test (do not commit secrets)",
      "content": "```json\n{\n  \"adminEmail\": \"admin@bizlevate.test\",\n  \"adminPassword\": \"local-dev-only\"\n}\n```\n\nPrecedence (low → high): **config `env` < `cypress.env.json` < `CYPRESS_*` < `--env` < `Cypress.env()` runtime**.\n\nCI: `CYPRESS_adminPassword` from a secret. Not `adminPassword` without prefix.",
      "order": 8
    },
    {
      "id": "cy-1-10-md-9",
      "type": "overview",
      "heading": "9. Run both modes once",
      "content": "```bash\n# app already running\nnpm run cypress:open     # click login.cy.ts, watch Command Log\nnpx cypress run --browser chrome --spec cypress/e2e/login.cy.ts\n```\n\n- [ ] Open: you can time-travel the visit.\n- [ ] Run: exit code 0; no surprise videos unless `video: true`.",
      "order": 9
    },
    {
      "id": "cy-1-10-md-10",
      "type": "overview",
      "heading": "10. Node task rule (when you add one)",
      "content": "- [ ] Handler returns a **serializable** object or **`null`**, never `undefined`.\n- [ ] `return config` from `setupNodeEvents`.\n\n---",
      "order": 10
    },
    {
      "id": "cy-1-10-md-11",
      "type": "overview",
      "heading": "Anti-checklist (if you did any of these, undo them)",
      "content": "| Don't | Do |\n|---|---|\n| `npm i -g cypress` / `npm i cypress --save` | `npm i -D cypress` + `npx cypress` |\n| `cypress.json` + `integration/*.spec.js` | `cypress.config.*` + `e2e/*.cy.ts` |\n| Commit `videos/` or `cypress.env.json` | gitignore both |\n| `defaultCommandTimeout: 30000` | Fix the wait; use per-command `{ timeout }` |\n| `await cy.visit` | Queue + `.should` |\n| Assume videos always record | Cypress **13** default `video: false` |\n| Login in `before` only, rely on leftover cookies | `testIsolation: true` → `beforeEach` / `cy.session` |\n| `cy.task` returns a class instance | Plain object / `null` |",
      "order": 11
    },
    {
      "id": "cy-1-10-md-12",
      "type": "overview",
      "heading": "Interview recap (60 seconds)",
      "content": "\"I'd add Cypress as a **devDependency**, verify the **Electron cache**, use **Cypress 10+** `cypress.config` with **e2e** and **setupNodeEvents**, keep specs under **`cypress/e2e` with a `.cy.` infix**, gitignore **artifacts and `cypress.env.json`**, set **`baseUrl`**, leave **`testIsolation` true** and **`video` explicit**, never raise **global** `defaultCommandTimeout`, and write the first test as **queued commands with `.should`**, not **`await`**. Env precedence is **config < env.json < CYPRESS_* < --env < runtime Cypress.env**. Open for authoring, run for CI.\"",
      "order": 12
    },
    {
      "id": "cy-1-10-md-13",
      "type": "overview",
      "heading": "What Part 2 will assume",
      "content": "You can `cy.visit` + `cy.get` + `.should` a page. Part 2 unpacks **Mocha structure**, **get vs contains vs find**, the **command queue**, **retry-ability**, **aliases**, **should vs expect**, and **`cy.wrap`**.\n\nYou are done with setup. Keep this checklist; do not keep a 30-second timeout.",
      "order": 13
    },
    {
      "id": "cy-1-10-md-14",
      "type": "overview",
      "heading": "Timed 45-minute lab (HRM)",
      "content": "| Minute | Action |\n|---|---|\n| 0–5 | Confirm Node, app on :3000, `npm i -D cypress` |\n| 5–10 | `npx cypress verify` — note cache path |\n| 10–15 | `cypress open --e2e`, confirm `e2e/` + config, not json/integration |\n| 15–20 | gitignore artifacts + env json; add `baseUrl` |\n| 20–30 | Write `login.cy.ts` with visit + should, no await |\n| 30–35 | `cypress run --browser chrome --spec ...` |\n| 35–45 | Add `cypress/tsconfig.json` if using TS; recite env precedence and v12/v13 defaults |\n\nIf you skip gitignore, you will commit a screenshot of the first failure. If you skip `verify`, CI will download Electron on the test job.",
      "order": 14
    },
    {
      "id": "cy-1-10-md-15",
      "type": "overview",
      "heading": "\"Done\" definition for Part 1",
      "content": "A reviewer can clone, `npm ci`, `npx cypress verify`, start HRM, `npx cypress run --spec cypress/e2e/login.cy.ts`, and see pass. `package.json` has Cypress under `devDependencies`. No secrets in git. No `await cy`. `testIsolation` still true. `video` is explicit if CI expects recordings.",
      "order": 15
    },
    {
      "id": "cy-1-10-md-16",
      "type": "overview",
      "heading": "60-second install recap (again, because interviews)",
      "content": "devDependency; never `--save` or `-g`; ~250MB cache; v10 `cypress.config` / `e2e` / `setupNodeEvents`; `.cy.` infix; gitignore screenshots/videos/downloads/`cypress.env.json`; queue not await; `baseUrl`; layered timeouts; env **config < env.json < CYPRESS_* < --env < runtime**; open vs run; `tsconfig` inside `cypress/`; tasks serializable + `return config`; video false since 13; isolation true since 12.",
      "order": 16
    },
    {
      "id": "cy-1-10-md-17",
      "type": "overview",
      "heading": "Next part",
      "content": "You now have a green smoke spec. Part 2 teaches Mocha structure, `get`/`contains`/`find`, the queue, retry-ability, aliases, `should` vs `expect`, and `cy.wrap`.",
      "order": 17
    },
    {
      "id": "cy-1-10-md-18",
      "type": "overview",
      "heading": "Copy-paste package.json fragment",
      "content": "```json\n{\n  \"devDependencies\": {\n    \"cypress\": \"13.17.0\"\n  },\n  \"scripts\": {\n    \"cypress:open\": \"cypress open --e2e --browser chrome\",\n    \"cypress:run\": \"cypress run --browser chrome\",\n    \"cypress:verify\": \"cypress verify\"\n  }\n}\n```\n\nConfirm this sits next to Next scripts, not instead of them. Production start scripts must not call Cypress.",
      "order": 18
    },
    {
      "id": "cy-1-10-md-19",
      "type": "overview",
      "heading": "Copy-paste `.gitignore` fragment",
      "content": "```gitignore\ncypress/screenshots\ncypress/videos\ncypress/downloads\ncypress.env.json\n```",
      "order": 19
    },
    {
      "id": "cy-1-10-md-20",
      "type": "overview",
      "heading": "Copy-paste `cypress/tsconfig.json`",
      "content": "```json\n{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"lib\": [\"ES2022\", \"DOM\"],\n    \"types\": [\"cypress\"],\n    \"noEmit\": true,\n    \"strict\": true\n  },\n  \"include\": [\"**/*.ts\"]\n}\n```",
      "order": 20
    },
    {
      "id": "cy-1-10-md-21",
      "type": "overview",
      "heading": "Red-flag review comments (use these)",
      "content": "1. \"Cypress is in `dependencies` — move to `devDependencies`.\"\n2. \"This is `cypress.json` / `integration/` — we are on v10+.\"\n3. \"Missing `.cy.` — spec will not run.\"\n4. \"`await cy.visit` — queue, not Promises.\"\n5. \"`defaultCommandTimeout: 30000` — no.\"\n6. \"Committed `cypress.env.json` — rotate secrets.\"\n7. \"Assumed video on — Cypress 13 default is false.\"\n8. \"Login only in `before` — `testIsolation` is true.\"\n\nIf a PR has none of these, Part 1 did its job.",
      "order": 21
    },
    {
      "id": "cy-1-10-md-22",
      "type": "overview",
      "heading": "Verify script you can paste into onboarding docs",
      "content": "```bash\nset -e\ntest -f cypress.config.ts -o -f cypress.config.js\ntest ! -f cypress.json\ntest -d cypress/e2e\ntest -f cypress/support/e2e.ts -o -f cypress/support/e2e.js\ngrep -q 'cypress/screenshots' .gitignore\ngrep -q 'cypress.env.json' .gitignore\nnode -e \"const p=require('./package.json'); if(!p.devDependencies.cypress) process.exit(1)\"\nnpx cypress verify\n```\n\nIf any line fails, the engineer is not done with Part 1.",
      "order": 22
    },
    {
      "id": "cy-1-10-md-23",
      "type": "overview",
      "heading": "FAQ",
      "content": "**Do I need Cypress Cloud?** No.\n**Do I need Chrome installed?** Not for Electron; yes for `--browser chrome`.\n**Can I put Cypress in a sibling repo?** You can; you lose colocation. Prefer the HRM repo.\n**Can I use Jest's `describe` types?** Keep them out of `cypress/tsconfig.json`.",
      "order": 23
    },
    {
      "id": "cy-1-10-md-24",
      "type": "overview",
      "heading": "Files that should exist at the end of the lab",
      "content": "```text\npackage.json                 # cypress in devDependencies\ncypress.config.ts            # baseUrl, setupNodeEvents returning config\ncypress/tsconfig.json        # types: [\"cypress\"]\ncypress/e2e/login.cy.ts\ncypress/support/e2e.ts\ncypress/support/commands.ts\ncypress/fixtures/.gitkeep    # or a real json\ncypress.env.json.example\n.gitignore                   # artifacts + cypress.env.json\n```\n\n`cypress.env.json` exists on disk locally, is gitignored, and is **not** on the remote.",
      "order": 24
    },
    {
      "id": "cy-1-10-md-25",
      "type": "overview",
      "heading": "If you only remember seven rules",
      "content": "1. `-D`, not `--save`, not `-g`\n2. v10 config/e2e/setupNodeEvents\n3. `.cy.` infix\n4. gitignore videos/screenshots/downloads/env json\n5. no `await cy.*`\n6. env: config < env.json < CYPRESS_* < --env < runtime\n7. isolation true (v12), video false (v13) unless you opt in",
      "order": 25
    },
    {
      "id": "cy-1-10-md-26",
      "type": "overview",
      "heading": "Common first-run errors (cheat sheet)",
      "content": "| Error | Fix |\n|---|---|\n| 0 specs found | Rename to `.cy.ts` / check `e2e/` not `integration/` |\n| `ERR_CONNECTION_REFUSED` | Start HRM; fix `baseUrl` |\n| `cypress.env.json` in the PR | gitignore; rotate if it had secrets |\n| `await cy.visit` | Delete await; use `.should` |\n| Videos missing after v13 | Set `video: true` if you want them |\n| Second test logged out | `beforeEach` login; isolation is on |\n| `task` undefined return | `return null` |\n| Config `baseUrl` ignored in CI | `--config baseUrl=` or `return config` after mutate |",
      "order": 26
    },
    {
      "id": "cy-1-10-md-27",
      "type": "overview",
      "heading": "You are done with Part 1 when",
      "content": "A clean clone + `npm ci` + `npx cypress verify` + app up + `npx cypress run --spec cypress/e2e/login.cy.ts` is green without global Cypress, without `cypress.json`, and without committed secrets.",
      "order": 27
    }
  ],
  "advantages": [
    "1.10 Quick Steps — Setup knowledge that stays in ten separate chapters does not survive a Monday morning."
  ],
  "limitations": [
    "1.10 Quick Steps is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
