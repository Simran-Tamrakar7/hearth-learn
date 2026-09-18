import type { ChapterRecord } from "../../../types";

/** 1.6 cypress.env.json & Config Overrides */
export const chapter = {
  "id": "cy-1-6-cypress-env-json-config-overrides",
  "title": "1.6 cypress.env.json & Config Overrides",
  "minutes": 30,
  "level": "beginner",
  "phase": "Part 1 · Setup & Project Structure",
  "partName": "Part 1 · Setup & Project Structure",
  "overviewText": "Cypress.env holds strings (and JSON-serializable values) for credentials, feature flags, and environment-specific IDs — not the same as Cypress.config. Values load from five layers, lowest to highest: env in cypress.config, cypress.env.json, CYPRESS_* OS variables, --env CLI, then Cypress.env() at runtime. Never commit cypress.env.json. This chapter shows HRM admin credentials, precedence experiments, and how overrides differ from --config.",
  "why": "Leaking passwords in git, confusing --env with --config, and not knowing why CI 'ignores cypress.env.json' are classic review findings. Precedence is an interview question because it is easy to get wrong under pressure.",
  "when": "Adding the first login helper, wiring CI secrets, debugging 'this env var works locally but not in GitHub Actions', and creating cypress.env.json.example.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Tests must log in as a seeded admin without putting the password in spec files or in git, and CI must override that password from a GitHub secret.",
    "pass": "You gitignore cypress.env.json, read Cypress.env('adminPassword') in a command, set CYPRESS_adminPassword in CI, and can recite config < env.json < CYPRESS_* < --env < Cypress.env runtime.",
    "fail": "You hardcode the password in login.cy.ts, commit cypress.env.json, or set ADMIN_PASSWORD without the CYPRESS_ prefix and expect Cypress.env('ADMIN_PASSWORD') to fill in."
  },
  "tools": [],
  "customSummary": "- Cypress.env ≠ Cypress.config. Env is data for tests; config is runner behavior (timeouts, baseUrl, video).\n- Precedence low→high: env in cypress.config < cypress.env.json < CYPRESS_* < --env < Cypress.env() runtime.\n- gitignore cypress.env.json; commit cypress.env.json.example with fake values.\n- OS vars must be prefixed CYPRESS_ (CYPRESS_adminPassword → Cypress.env('adminPassword')).\n- --config changes config keys; --env changes env keys — not interchangeable.\n- Cypress.env() in a spec or support file wins for the rest of that run (runtime).",
  "contentMarkdown": "## Two namespaces: `config` vs `env`\n\n| | `Cypress.config` | `Cypress.env` |\n|---|---|---|\n| Purpose | How the runner behaves | Data your tests read |\n| Examples | `baseUrl`, `defaultCommandTimeout`, `video` | `adminEmail`, `adminPassword`, `seedUserId` |\n| File | `cypress.config.js` | `env` block in that file **and/or** `cypress.env.json` |\n| CLI | `--config key=value` | `--env key=value` |\n| OS env | not automatic* | `CYPRESS_key` |\n\n\\*You can copy `process.env` into config yourself inside `setupNodeEvents`. Cypress does not magically turn `BASE_URL=...` into `baseUrl` unless you write that mapping.\n\nSpecs should read secrets from **env**:\n\n```ts\ncy.get('#email').type(Cypress.env('adminEmail'));\ncy.get('#password').type(Cypress.env('adminPassword'), { log: false });\n```\n\n`{ log: false }` keeps the password out of the Command Log and screenshots' log text.\n\n## The five-layer precedence (low to high)\n\nMemorize this order. **Later layers override earlier ones.**\n\n1. **`env` in `cypress.config.js`** — committed, non-secret defaults\n2. **`cypress.env.json`** — local/dev secrets, **gitignored**\n3. **`CYPRESS_*` environment variables** — CI secrets, shells, Docker\n4. **`--env` CLI flags** — one-off runs, npm scripts\n5. **`Cypress.env(key, value)` at runtime** — support file or spec, highest\n\n```text\nconfig.env  <  cypress.env.json  <  CYPRESS_*  <  --env  <  Cypress.env() runtime\n```\n\n### Layer 1 — config file\n\n```ts\nexport default defineConfig({\n  env: {\n    apiUrl: '/api',\n    adminEmail: 'admin@bizlevate.test',\n    // do NOT put real passwords here if the file is committed\n  },\n  e2e: { baseUrl: 'http://localhost:3000' },\n});\n```\n\nGood for **non-secret** defaults that every environment shares.\n\n### Layer 2 — `cypress.env.json`\n\nProject root, **next to** `cypress.config.js` (not inside `cypress/`):\n\n```json\n{\n  \"adminEmail\": \"admin@bizlevate.test\",\n  \"adminPassword\": \"local-only-password\"\n}\n```\n\n```gitignore\ncypress.env.json\n```\n\nCommit `cypress.env.json.example`:\n\n```json\n{\n  \"adminEmail\": \"admin@bizlevate.test\",\n  \"adminPassword\": \"replace-me\"\n}\n```\n\nIf a value exists in both config `env` and `cypress.env.json`, **json wins**.\n\n### Layer 3 — `CYPRESS_*` OS environment variables\n\nCypress strips the prefix and the first underscore:\n\n```bash\nexport CYPRESS_adminPassword='from-the-shell'\nnpx cypress run\n```\n\nInside tests: `Cypress.env('adminPassword')` === `'from-the-shell'`.\n\nGitHub Actions:\n\n```yaml\nenv:\n  CYPRESS_adminPassword: ${{ secrets.HRM_ADMIN_PASSWORD }}\n  CYPRESS_adminEmail: admin@bizlevate.test\n```\n\n**Gotcha:** `adminPassword=foo` without `CYPRESS_` does **nothing** to `Cypress.env`. **Gotcha:** `CYPRESS_BASE_URL` does **not** set `baseUrl` config; it sets `Cypress.env('BASE_URL')` (note Cypress's exact key casing). For `baseUrl`, use `--config baseUrl=...` or assign `config.baseUrl` in `setupNodeEvents`.\n\nNested keys: `CYPRESS_foo=bar` is a string. For objects, prefer json file or `--env` JSON.\n\nThis layer **overrides** `cypress.env.json`. That is how CI uses a different password than a laptop without editing files.\n\n### Layer 4 — `--env` on the CLI\n\n```bash\nnpx cypress run --env adminEmail=ci-admin@bizlevate.test,adminPassword=from-cli\n```\n\nMultiple keys: comma-separated. Values with commas need a different strategy (JSON file).\n\n`--env` **overrides** `CYPRESS_*` for the same key.\n\n```bash\n# NOT the same\nnpx cypress run --config video=true\nnpx cypress run --env video=true   # sets Cypress.env('video'), does NOT enable recording\n```\n\n### Layer 5 — runtime `Cypress.env()`\n\n```ts\n// support/e2e.ts or a spec\nCypress.env('adminPassword', 'overridden-in-browser');\n```\n\nThis wins until the run ends. Use sparingly (debug, or a helper that computes a token). Do not scatter runtime overrides so precedence becomes impossible to debug.\n\nRead:\n\n```ts\nCypress.env('adminPassword');\nCypress.env(); // all env as an object snapshot\n```\n\n## Demonstration you can actually run\n\nConfig:\n\n```ts\nenv: { color: 'from-config' }\n```\n\n`cypress.env.json`: `{ \"color\": \"from-json\" }`\n\nShell: `CYPRESS_color=from-os`\n\nCLI: `npx cypress open --env color=from-cli`\n\nSpec:\n\n```ts\nit('shows precedence', () => {\n  cy.log(Cypress.env('color')); // from-cli, unless you then:\n  Cypress.env('color', 'from-runtime');\n  expect(Cypress.env('color')).to.eq('from-runtime');\n});\n```\n\nRemove layers from the top of the stack to see the next one appear.\n\n## What belongs in env vs fixtures vs config\n\n| Data | Where |\n|---|---|\n| Viewport, timeouts, `baseUrl`, `video` | **config** |\n| Admin password, API tokens | **env** (json / `CYPRESS_*`) |\n| 50 dummy employee names | **fixture** |\n| Leave type labels used as assertions | fixture or constants in `support` |\n| Feature flag for \"new payroll UI\" | env (`Cypress.env('featurePayrollV2')`) |\n\n## Security rules for HRM\n\n1. Never commit real passwords, session cookies, or Okta client secrets.\n2. `type(..., { log: false })` for secrets.\n3. Rotate anything that was ever committed.\n4. Prefer CI-injected `CYPRESS_*` over a shared `cypress.env.json` on a USB stick.\n5. Seeded test users (`cypress@bizlevate.test`) beat sharing a production admin.\n\n## Playwright / Selenium comparison\n\nPlaywright: `process.env` in config `use` / `storageState`, plus dotenv. There is no `playwright.env.json` with a five-layer Cypress-specific chain.\n\nSelenium: same as any app — properties files, env vars, CI secrets. Cypress's twist is the **documented precedence** and the `CYPRESS_` prefix convention.\n\n## Mapping OS `BASE_URL` into real `baseUrl` (common HRM CI)\n\n```ts\nsetupNodeEvents(on, config) {\n  if (process.env.BASE_URL) {\n    config.baseUrl = process.env.BASE_URL;\n  }\n  return config; // required when mutating config\n}\n```\n\nThat is **config** mutation, not env precedence. Keep the two concepts separate in interviews.\n\nNext: `cypress open` vs `cypress run` — headed GUI versus headless CI.\n## Full precedence lab (do this once)\n\n`cypress.config.ts`:\n\n```ts\nenv: { layer: 'config', shared: 'from-config' }\n```\n\n`cypress.env.json`:\n\n```json\n{ \"layer\": \"json\", \"secret\": \"file\" }\n```\n\nShell:\n\n```bash\nexport CYPRESS_layer=os\nexport CYPRESS_secret=from-os\nnpx cypress open --env layer=cli\n```\n\nSpec:\n\n```ts\nit('lab', () => {\n  cy.log(JSON.stringify(Cypress.env()));\n  expect(Cypress.env('layer')).to.eq('cli');      // --env beats OS\n  expect(Cypress.env('secret')).to.eq('from-os'); // OS beats json\n  expect(Cypress.env('shared')).to.eq('from-config');\n  Cypress.env('layer', 'runtime');\n  expect(Cypress.env('layer')).to.eq('runtime');\n});\n```\n\nRemove `--env` and re-run: `layer` becomes `os`. Unset `CYPRESS_layer`: `layer` becomes `json`. Delete json key: `layer` becomes `config`. That is the chain:\n\n**config < env.json < CYPRESS_* < --env < Cypress.env runtime**\n\n## `CYPRESS_` key rewriting\n\n`CYPRESS_adminPassword` → `adminPassword`.\n`CYPRESS_ADMIN_PASSWORD` → `ADMIN_PASSWORD` (Cypress keeps the rest of the name).\n\nPick one convention (`adminPassword`) and use it in config, json, OS, and specs. Mixing `admin_password` and `adminPassword` is two env keys.\n\n## `--env` JSON file\n\n```bash\nnpx cypress run --env \"$(cat ci-env.json)\"\n```\n\nAwkward quoting on Windows. Prefer `CYPRESS_*` in CI or `cypress.env.json` generated in a job step that is not committed.\n\n## Config vs env in one CLI\n\n```bash\nnpx cypress run \\\n  --config baseUrl=https://preview.example,video=true \\\n  --env adminEmail=ci@bizlevate.test\n```\n\n`--config` does not set `Cypress.env('baseUrl')`. `--env` does not set `Cypress.config('video')`.\n\n## Logging hygiene\n\n```ts\ncy.get('#password').type(Cypress.env('adminPassword'), { log: false });\n```\n\nScreenshots still show the DOM; do not put secrets in visible inputs in recorded Cloud videos if the password is production-like. Use seeded test-only users.\n\n## Interview drill\n\nWrite the five layers in order. Given a conflict between json and `CYPRESS_foo`, which wins? (`CYPRESS_*`). Given `--env foo=1` and `Cypress.env('foo', 2)` in the spec, which wins? (runtime). Why gitignore `cypress.env.json`?\n## Reading env in Node vs browser\n\n`setupNodeEvents` sees `config.env` (merged layers 1–4). Specs see `Cypress.env()`. A value you set only via `Cypress.env('x', 1)` in a spec is **not** visible to Node tasks unless you pass it as a task argument:\n\n```ts\ncy.task('seedEmployee', { email: Cypress.env('adminEmail') });\n```\n\nDo not expect the task to call `Cypress.env` — `Cypress` is a browser global.\n\n## Boolean and number coercion\n\nOS env vars are **strings**. `CYPRESS_featureLeave=true` yields the string `'true'`, not boolean `true`.\n\n```ts\nconst on = Cypress.env('featureLeave') === true || Cypress.env('featureLeave') === 'true';\n```\n\nOr parse in `setupNodeEvents` and `return config` with real booleans. `--env` JSON can pass types; `CYPRESS_*` cannot.\n\n## Multiple `--env` keys and commas\n\n```bash\nnpx cypress run --env host=h,port=3000\n```\n\nValues that contain commas break this parser. Use `cypress.env.json` or `CYPRESS_*` for messy strings (passwords with commas).\n\n## Example GitHub Actions block\n\n```yaml\n- name: Cypress\n  env:\n    CYPRESS_adminEmail: admin@bizlevate.test\n    CYPRESS_adminPassword: ${{ secrets.HRM_ADMIN_PASSWORD }}\n  run: npx cypress run --browser chrome --config baseUrl=http://localhost:3000\n```\n\nNote `baseUrl` is `--config`, password is `CYPRESS_*`. Mixing those two is the whole chapter.\n\n## `.env` files\n\nCypress does not load `.env` unless **you** load it in `cypress.config.ts` (`dotenv`). If you do, map into `config.env` and still **never commit** production secrets. `cypress.env.json` is the native mechanism; dotenv is optional sugar.\n## `Cypress.env()` in custom commands\n\n```ts\nCypress.Commands.add('login', (email?: string, password?: string) => {\n  const e = email ?? Cypress.env('adminEmail');\n  const p = password ?? Cypress.env('adminPassword');\n  if (!e || !p) {\n    throw new Error('adminEmail/adminPassword missing — check cypress.env.json or CYPRESS_*');\n  }\n  cy.visit('/login');\n  cy.get('#email').type(e);\n  cy.get('#password').type(p, { log: false });\n  cy.get('[data-cy=login-submit]').click();\n  cy.location('pathname').should('not.eq', '/login');\n});\n```\n\nThrowing in a command during phase 2 fails the test with a clear message. That is better than typing `undefined` into the email field.\n\n## Local vs CI matrix\n\n| Source | Local laptop | GitHub Actions |\n|---|---|---|\n| Non-secret `apiUrl` | config `env` | config `env` |\n| Password | `cypress.env.json` (gitignored) | `CYPRESS_adminPassword` from secrets |\n| One-off user | `--env adminEmail=other@...` | rarely |\n| Debug override | `Cypress.env('x', y)` in spec | avoid |\n\nNever copy a teammate's `cypress.env.json` from Slack. Use the example file and personal seeded users.\n\n## `env` in `cypress.config` is committed — keep it boring\n\n```ts\nenv: {\n  apiPrefix: '/api',\n  featureLeave: true,\n}\n```\n\nBooleans in the config file are real booleans. The same key from `CYPRESS_featureLeave=true` becomes a string and **overrides** the boolean (OS beats config). Then `if (Cypress.env('featureLeave'))` is still truthy (`'true'` is truthy; `'false'` is also truthy!). Parse explicitly when OS might override.\n\n```ts\nfunction flag(name: string) {\n  const v = Cypress.env(name);\n  return v === true || v === 'true';\n}\n```\n\nThis is the env-precedence bug that burns teams after they \"just added a CYPRESS_ flag.\"\n## `Cypress.env()` dump in open mode\n\nIn a debug spec, `cy.log(JSON.stringify(Cypress.env()))` prints merged env **without** OS process secrets that you never mapped. Do not leave this `cy.log` in production specs — passwords may be in the object. Delete before merge.\n",
  "blocks": [
    {
      "id": "cy-1-6-md-0",
      "type": "overview",
      "heading": "Two namespaces: `config` vs `env`",
      "content": "| | `Cypress.config` | `Cypress.env` |\n|---|---|---|\n| Purpose | How the runner behaves | Data your tests read |\n| Examples | `baseUrl`, `defaultCommandTimeout`, `video` | `adminEmail`, `adminPassword`, `seedUserId` |\n| File | `cypress.config.js` | `env` block in that file **and/or** `cypress.env.json` |\n| CLI | `--config key=value` | `--env key=value` |\n| OS env | not automatic* | `CYPRESS_key` |\n\n\\*You can copy `process.env` into config yourself inside `setupNodeEvents`. Cypress does not magically turn `BASE_URL=...` into `baseUrl` unless you write that mapping.\n\nSpecs should read secrets from **env**:\n\n```ts\ncy.get('#email').type(Cypress.env('adminEmail'));\ncy.get('#password').type(Cypress.env('adminPassword'), { log: false });\n```\n\n`{ log: false }` keeps the password out of the Command Log and screenshots' log text.",
      "order": 0
    },
    {
      "id": "cy-1-6-md-1",
      "type": "overview",
      "heading": "The five-layer precedence (low to high)",
      "content": "Memorize this order. **Later layers override earlier ones.**\n\n1. **`env` in `cypress.config.js`** — committed, non-secret defaults\n2. **`cypress.env.json`** — local/dev secrets, **gitignored**\n3. **`CYPRESS_*` environment variables** — CI secrets, shells, Docker\n4. **`--env` CLI flags** — one-off runs, npm scripts\n5. **`Cypress.env(key, value)` at runtime** — support file or spec, highest\n\n```text\nconfig.env  <  cypress.env.json  <  CYPRESS_*  <  --env  <  Cypress.env() runtime\n```\n\n### Layer 1 — config file\n\n```ts\nexport default defineConfig({\n  env: {\n    apiUrl: '/api',\n    adminEmail: 'admin@bizlevate.test',\n    // do NOT put real passwords here if the file is committed\n  },\n  e2e: { baseUrl: 'http://localhost:3000' },\n});\n```\n\nGood for **non-secret** defaults that every environment shares.\n\n### Layer 2 — `cypress.env.json`\n\nProject root, **next to** `cypress.config.js` (not inside `cypress/`):\n\n```json\n{\n  \"adminEmail\": \"admin@bizlevate.test\",\n  \"adminPassword\": \"local-only-password\"\n}\n```\n\n```gitignore\ncypress.env.json\n```\n\nCommit `cypress.env.json.example`:\n\n```json\n{\n  \"adminEmail\": \"admin@bizlevate.test\",\n  \"adminPassword\": \"replace-me\"\n}\n```\n\nIf a value exists in both config `env` and `cypress.env.json`, **json wins**.\n\n### Layer 3 — `CYPRESS_*` OS environment variables\n\nCypress strips the prefix and the first underscore:\n\n```bash\nexport CYPRESS_adminPassword='from-the-shell'\nnpx cypress run\n```\n\nInside tests: `Cypress.env('adminPassword')` === `'from-the-shell'`.\n\nGitHub Actions:\n\n```yaml\nenv:\n  CYPRESS_adminPassword: ${{ secrets.HRM_ADMIN_PASSWORD }}\n  CYPRESS_adminEmail: admin@bizlevate.test\n```\n\n**Gotcha:** `adminPassword=foo` without `CYPRESS_` does **nothing** to `Cypress.env`. **Gotcha:** `CYPRESS_BASE_URL` does **not** set `baseUrl` config; it sets `Cypress.env('BASE_URL')` (note Cypress's exact key casing). For `baseUrl`, use `--config baseUrl=...` or assign `config.baseUrl` in `setupNodeEvents`.\n\nNested keys: `CYPRESS_foo=bar` is a string. For objects, prefer json file or `--env` JSON.\n\nThis layer **overrides** `cypress.env.json`. That is how CI uses a different password than a laptop without editing files.\n\n### Layer 4 — `--env` on the CLI\n\n```bash\nnpx cypress run --env adminEmail=ci-admin@bizlevate.test,adminPassword=from-cli\n```\n\nMultiple keys: comma-separated. Values with commas need a different strategy (JSON file).\n\n`--env` **overrides** `CYPRESS_*` for the same key.\n\n```bash\n# NOT the same\nnpx cypress run --config video=true\nnpx cypress run --env video=true   # sets Cypress.env('video'), does NOT enable recording\n```\n\n### Layer 5 — runtime `Cypress.env()`\n\n```ts\n// support/e2e.ts or a spec\nCypress.env('adminPassword', 'overridden-in-browser');\n```\n\nThis wins until the run ends. Use sparingly (debug, or a helper that computes a token). Do not scatter runtime overrides so precedence becomes impossible to debug.\n\nRead:\n\n```ts\nCypress.env('adminPassword');\nCypress.env(); // all env as an object snapshot\n```",
      "order": 1
    },
    {
      "id": "cy-1-6-md-2",
      "type": "overview",
      "heading": "Demonstration you can actually run",
      "content": "Config:\n\n```ts\nenv: { color: 'from-config' }\n```\n\n`cypress.env.json`: `{ \"color\": \"from-json\" }`\n\nShell: `CYPRESS_color=from-os`\n\nCLI: `npx cypress open --env color=from-cli`\n\nSpec:\n\n```ts\nit('shows precedence', () => {\n  cy.log(Cypress.env('color')); // from-cli, unless you then:\n  Cypress.env('color', 'from-runtime');\n  expect(Cypress.env('color')).to.eq('from-runtime');\n});\n```\n\nRemove layers from the top of the stack to see the next one appear.",
      "order": 2
    },
    {
      "id": "cy-1-6-md-3",
      "type": "table",
      "headers": [
        "Data",
        "Where"
      ],
      "rows": [
        [
          "Viewport, timeouts, `baseUrl`, `video`",
          "**config**"
        ],
        [
          "Admin password, API tokens",
          "**env** (json / `CYPRESS_*`)"
        ],
        [
          "50 dummy employee names",
          "**fixture**"
        ],
        [
          "Leave type labels used as assertions",
          "fixture or constants in `support`"
        ],
        [
          "Feature flag for \"new payroll UI\"",
          "env (`Cypress.env('featurePayrollV2')`)"
        ]
      ],
      "caption": "What belongs in env vs fixtures vs config",
      "order": 3
    },
    {
      "id": "cy-1-6-md-4",
      "type": "overview",
      "heading": "Security rules for HRM",
      "content": "1. Never commit real passwords, session cookies, or Okta client secrets.\n2. `type(..., { log: false })` for secrets.\n3. Rotate anything that was ever committed.\n4. Prefer CI-injected `CYPRESS_*` over a shared `cypress.env.json` on a USB stick.\n5. Seeded test users (`cypress@bizlevate.test`) beat sharing a production admin.",
      "order": 4
    },
    {
      "id": "cy-1-6-md-5",
      "type": "overview",
      "heading": "Playwright / Selenium comparison",
      "content": "Playwright: `process.env` in config `use` / `storageState`, plus dotenv. There is no `playwright.env.json` with a five-layer Cypress-specific chain.\n\nSelenium: same as any app — properties files, env vars, CI secrets. Cypress's twist is the **documented precedence** and the `CYPRESS_` prefix convention.",
      "order": 5
    },
    {
      "id": "cy-1-6-md-6",
      "type": "overview",
      "heading": "Mapping OS `BASE_URL` into real `baseUrl` (common HRM CI)",
      "content": "```ts\nsetupNodeEvents(on, config) {\n  if (process.env.BASE_URL) {\n    config.baseUrl = process.env.BASE_URL;\n  }\n  return config; // required when mutating config\n}\n```\n\nThat is **config** mutation, not env precedence. Keep the two concepts separate in interviews.\n\nNext: `cypress open` vs `cypress run` — headed GUI versus headless CI.",
      "order": 6
    },
    {
      "id": "cy-1-6-md-7",
      "type": "overview",
      "heading": "Full precedence lab (do this once)",
      "content": "`cypress.config.ts`:\n\n```ts\nenv: { layer: 'config', shared: 'from-config' }\n```\n\n`cypress.env.json`:\n\n```json\n{ \"layer\": \"json\", \"secret\": \"file\" }\n```\n\nShell:\n\n```bash\nexport CYPRESS_layer=os\nexport CYPRESS_secret=from-os\nnpx cypress open --env layer=cli\n```\n\nSpec:\n\n```ts\nit('lab', () => {\n  cy.log(JSON.stringify(Cypress.env()));\n  expect(Cypress.env('layer')).to.eq('cli');      // --env beats OS\n  expect(Cypress.env('secret')).to.eq('from-os'); // OS beats json\n  expect(Cypress.env('shared')).to.eq('from-config');\n  Cypress.env('layer', 'runtime');\n  expect(Cypress.env('layer')).to.eq('runtime');\n});\n```\n\nRemove `--env` and re-run: `layer` becomes `os`. Unset `CYPRESS_layer`: `layer` becomes `json`. Delete json key: `layer` becomes `config`. That is the chain:\n\n**config < env.json < CYPRESS_* < --env < Cypress.env runtime**",
      "order": 7
    },
    {
      "id": "cy-1-6-md-8",
      "type": "overview",
      "heading": "`CYPRESS_` key rewriting",
      "content": "`CYPRESS_adminPassword` → `adminPassword`.\n`CYPRESS_ADMIN_PASSWORD` → `ADMIN_PASSWORD` (Cypress keeps the rest of the name).\n\nPick one convention (`adminPassword`) and use it in config, json, OS, and specs. Mixing `admin_password` and `adminPassword` is two env keys.",
      "order": 8
    },
    {
      "id": "cy-1-6-md-9",
      "type": "overview",
      "heading": "`--env` JSON file",
      "content": "```bash\nnpx cypress run --env \"$(cat ci-env.json)\"\n```\n\nAwkward quoting on Windows. Prefer `CYPRESS_*` in CI or `cypress.env.json` generated in a job step that is not committed.",
      "order": 9
    },
    {
      "id": "cy-1-6-md-10",
      "type": "overview",
      "heading": "Config vs env in one CLI",
      "content": "```bash\nnpx cypress run \\\n  --config baseUrl=https://preview.example,video=true \\\n  --env adminEmail=ci@bizlevate.test\n```\n\n`--config` does not set `Cypress.env('baseUrl')`. `--env` does not set `Cypress.config('video')`.",
      "order": 10
    },
    {
      "id": "cy-1-6-md-11",
      "type": "overview",
      "heading": "Logging hygiene",
      "content": "```ts\ncy.get('#password').type(Cypress.env('adminPassword'), { log: false });\n```\n\nScreenshots still show the DOM; do not put secrets in visible inputs in recorded Cloud videos if the password is production-like. Use seeded test-only users.",
      "order": 11
    },
    {
      "id": "cy-1-6-md-12",
      "type": "overview",
      "heading": "Interview drill",
      "content": "Write the five layers in order. Given a conflict between json and `CYPRESS_foo`, which wins? (`CYPRESS_*`). Given `--env foo=1` and `Cypress.env('foo', 2)` in the spec, which wins? (runtime). Why gitignore `cypress.env.json`?",
      "order": 12
    },
    {
      "id": "cy-1-6-md-13",
      "type": "overview",
      "heading": "Reading env in Node vs browser",
      "content": "`setupNodeEvents` sees `config.env` (merged layers 1–4). Specs see `Cypress.env()`. A value you set only via `Cypress.env('x', 1)` in a spec is **not** visible to Node tasks unless you pass it as a task argument:\n\n```ts\ncy.task('seedEmployee', { email: Cypress.env('adminEmail') });\n```\n\nDo not expect the task to call `Cypress.env` — `Cypress` is a browser global.",
      "order": 13
    },
    {
      "id": "cy-1-6-md-14",
      "type": "overview",
      "heading": "Boolean and number coercion",
      "content": "OS env vars are **strings**. `CYPRESS_featureLeave=true` yields the string `'true'`, not boolean `true`.\n\n```ts\nconst on = Cypress.env('featureLeave') === true || Cypress.env('featureLeave') === 'true';\n```\n\nOr parse in `setupNodeEvents` and `return config` with real booleans. `--env` JSON can pass types; `CYPRESS_*` cannot.",
      "order": 14
    },
    {
      "id": "cy-1-6-md-15",
      "type": "overview",
      "heading": "Multiple `--env` keys and commas",
      "content": "```bash\nnpx cypress run --env host=h,port=3000\n```\n\nValues that contain commas break this parser. Use `cypress.env.json` or `CYPRESS_*` for messy strings (passwords with commas).",
      "order": 15
    },
    {
      "id": "cy-1-6-md-16",
      "type": "overview",
      "heading": "Example GitHub Actions block",
      "content": "```yaml\n- name: Cypress\n  env:\n    CYPRESS_adminEmail: admin@bizlevate.test\n    CYPRESS_adminPassword: ${{ secrets.HRM_ADMIN_PASSWORD }}\n  run: npx cypress run --browser chrome --config baseUrl=http://localhost:3000\n```\n\nNote `baseUrl` is `--config`, password is `CYPRESS_*`. Mixing those two is the whole chapter.",
      "order": 16
    },
    {
      "id": "cy-1-6-md-17",
      "type": "overview",
      "heading": "`.env` files",
      "content": "Cypress does not load `.env` unless **you** load it in `cypress.config.ts` (`dotenv`). If you do, map into `config.env` and still **never commit** production secrets. `cypress.env.json` is the native mechanism; dotenv is optional sugar.",
      "order": 17
    },
    {
      "id": "cy-1-6-md-18",
      "type": "overview",
      "heading": "`Cypress.env()` in custom commands",
      "content": "```ts\nCypress.Commands.add('login', (email?: string, password?: string) => {\n  const e = email ?? Cypress.env('adminEmail');\n  const p = password ?? Cypress.env('adminPassword');\n  if (!e || !p) {\n    throw new Error('adminEmail/adminPassword missing — check cypress.env.json or CYPRESS_*');\n  }\n  cy.visit('/login');\n  cy.get('#email').type(e);\n  cy.get('#password').type(p, { log: false });\n  cy.get('[data-cy=login-submit]').click();\n  cy.location('pathname').should('not.eq', '/login');\n});\n```\n\nThrowing in a command during phase 2 fails the test with a clear message. That is better than typing `undefined` into the email field.",
      "order": 18
    },
    {
      "id": "cy-1-6-md-19",
      "type": "overview",
      "heading": "Local vs CI matrix",
      "content": "| Source | Local laptop | GitHub Actions |\n|---|---|---|\n| Non-secret `apiUrl` | config `env` | config `env` |\n| Password | `cypress.env.json` (gitignored) | `CYPRESS_adminPassword` from secrets |\n| One-off user | `--env adminEmail=other@...` | rarely |\n| Debug override | `Cypress.env('x', y)` in spec | avoid |\n\nNever copy a teammate's `cypress.env.json` from Slack. Use the example file and personal seeded users.",
      "order": 19
    },
    {
      "id": "cy-1-6-md-20",
      "type": "overview",
      "heading": "`env` in `cypress.config` is committed — keep it boring",
      "content": "```ts\nenv: {\n  apiPrefix: '/api',\n  featureLeave: true,\n}\n```\n\nBooleans in the config file are real booleans. The same key from `CYPRESS_featureLeave=true` becomes a string and **overrides** the boolean (OS beats config). Then `if (Cypress.env('featureLeave'))` is still truthy (`'true'` is truthy; `'false'` is also truthy!). Parse explicitly when OS might override.\n\n```ts\nfunction flag(name: string) {\n  const v = Cypress.env(name);\n  return v === true || v === 'true';\n}\n```\n\nThis is the env-precedence bug that burns teams after they \"just added a CYPRESS_ flag.\"",
      "order": 20
    },
    {
      "id": "cy-1-6-md-21",
      "type": "overview",
      "heading": "`Cypress.env()` dump in open mode",
      "content": "In a debug spec, `cy.log(JSON.stringify(Cypress.env()))` prints merged env **without** OS process secrets that you never mapped. Do not leave this `cy.log` in production specs — passwords may be in the object. Delete before merge.",
      "order": 21
    }
  ],
  "advantages": [
    "1.6 cypress.env.json & Config Overrides — Leaking passwords in git, confusing --env with --config, and not knowing why CI 'ignores cypress."
  ],
  "limitations": [
    "1.6 cypress.env.json & Config Overrides is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
