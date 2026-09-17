import type { ChapterRecord } from "../../../types";

/** 10.2 Environment Variables & Multiple Environments */
export const chapter = {
  "id": "cy-10-2-environment-variables-multiple-environments",
  "title": "10.2 Environment Variables & Multiple Environments",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 10 · Test Organization & Execution",
  "partName": "Part 10 · Test Organization & Execution",
  "overviewText": "Cypress.env is the in-test key/value bag. Values arrive from cypress.config env, cypress.env.json (gitignored secrets), CYPRESS_* OS variables, and --env on the CLI — later sources override earlier ones in documented order. baseUrl plus env.apiUrl let the same spec hit staging vs local. Playwright uses projects + process.env; Selenium uses properties/system env. Do not hardcode https://staging.bizlevate.com in specs.",
  "why": "HRM always has local, staging, and sometimes a prod-read-only smoke. Baking staging URLs into cy.visit is how suites pass at home and attack the wrong host in CI.",
  "when": "First time you add a second deployment, when putting passwords in git, and when GitHub Actions must inject CYPRESS_RECORD_KEY without printing it.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "The same leave spec must run against localhost:3000 (dev) and https://staging.bizlevate.com (CI) with different API hosts and a secret test user.",
    "pass": "You set baseUrl per env, put secrets in CYPRESS_ or cypress.env.json (ignored), read Cypress.env('apiUrl') in the spec, and never commit real passwords.",
    "fail": "You cy.visit('https://staging.bizlevate.com/leave') with a password string in the repo."
  },
  "tools": [],
  "customSummary": "- Cypress.env('KEY') reads merged config: config.env < cypress.env.json < CYPRESS_KEY < --env.\n- CYPRESS_ prefix maps OS env automatically (CYPRESS_grepTags, CYPRESS_apiUrl).\n- baseUrl is config, not env — still override with CYPRESS_BASE_URL / --config baseUrl=.\n- cypress.env.json is for local secrets; gitignore it. CI uses Actions secrets.\n- Playwright projects vs Cypress: one config, many env files or CLI overrides — not browser projects.",
  "contentMarkdown": "## The merge order you must remember\n\n1. `env: {}` in `cypress.config.ts`\n2. `cypress.env.json` (if present)\n3. OS environment variables prefixed `CYPRESS_`\n4. `--env key=value` on the CLI (wins)\n\n```ts\n// cypress.config.ts\nexport default defineConfig({\n  e2e: {\n    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',\n    env: {\n      apiUrl: 'http://localhost:4000',\n      grepTags: '',\n    },\n  },\n});\n```\n\n```json\n// cypress.env.json  (gitignored)\n{\n  \"adminPassword\": \"local-only\"\n}\n```\n\n```js\ncy.request(`${Cypress.env('apiUrl')}/health`).its('status').should('eq', 200);\ncy.visit('/login');\ncy.get('[data-cy=password]').type(Cypress.env('adminPassword'), { log: false });\n```\n\n`{ log: false }` keeps the secret out of the Command Log and videos.\n\n## Mapping OS env\n\n`CYPRESS_apiUrl=https://api.staging.bizlevate.com` becomes `Cypress.env('apiUrl')`. `CYPRESS_BASE_URL` is special: it overrides `baseUrl` (config), not `env.baseUrl`. Record keys: `CYPRESS_RECORD_KEY` for Cloud (11.3).\n\n## Multiple environments without forking specs\n\n| Target | How |\n|---|---|\n| Local | default config + optional `cypress.env.json` |\n| Staging CI | Actions env: `CYPRESS_BASE_URL`, `CYPRESS_apiUrl`, secrets |\n| Prod smoke | separate job, read-only user, `@smoke` grep, never destructive payroll |\n\nOptional: `configFile` is one file; people use `cypress.config.staging.ts` only if process.env branching gets unreadable. Prefer one config that reads env.\n\n## Versus Playwright and Selenium\n\nPlaywright `projects` can encode `baseURL` + `storageState` per env in one file. Cypress typically uses **one** e2e project and lets CI mutate env. Selenium: `application.properties` / Maven profiles. Same rule: specs stay environment-agnostic.\n\nInterview line: \"Specs call `Cypress.env` and `baseUrl`. Secrets are `CYPRESS_*` or gitignored `cypress.env.json`. I never commit staging passwords or hardcode hosts.\"",
  "blocks": [
    {
      "id": "cy-10-2-md-0",
      "type": "overview",
      "heading": "The merge order you must remember",
      "content": "1. `env: {}` in `cypress.config.ts`\n2. `cypress.env.json` (if present)\n3. OS environment variables prefixed `CYPRESS_`\n4. `--env key=value` on the CLI (wins)\n\n```ts\n// cypress.config.ts\nexport default defineConfig({\n  e2e: {\n    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',\n    env: {\n      apiUrl: 'http://localhost:4000',\n      grepTags: '',\n    },\n  },\n});\n```\n\n```json\n// cypress.env.json  (gitignored)\n{\n  \"adminPassword\": \"local-only\"\n}\n```\n\n```js\ncy.request(`${Cypress.env('apiUrl')}/health`).its('status').should('eq', 200);\ncy.visit('/login');\ncy.get('[data-cy=password]').type(Cypress.env('adminPassword'), { log: false });\n```\n\n`{ log: false }` keeps the secret out of the Command Log and videos.",
      "order": 0
    },
    {
      "id": "cy-10-2-md-1",
      "type": "overview",
      "heading": "Mapping OS env",
      "content": "`CYPRESS_apiUrl=https://api.staging.bizlevate.com` becomes `Cypress.env('apiUrl')`. `CYPRESS_BASE_URL` is special: it overrides `baseUrl` (config), not `env.baseUrl`. Record keys: `CYPRESS_RECORD_KEY` for Cloud (11.3).",
      "order": 1
    },
    {
      "id": "cy-10-2-md-2",
      "type": "overview",
      "heading": "Multiple environments without forking specs",
      "content": "| Target | How |\n|---|---|\n| Local | default config + optional `cypress.env.json` |\n| Staging CI | Actions env: `CYPRESS_BASE_URL`, `CYPRESS_apiUrl`, secrets |\n| Prod smoke | separate job, read-only user, `@smoke` grep, never destructive payroll |\n\nOptional: `configFile` is one file; people use `cypress.config.staging.ts` only if process.env branching gets unreadable. Prefer one config that reads env.",
      "order": 2
    },
    {
      "id": "cy-10-2-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright `projects` can encode `baseURL` + `storageState` per env in one file. Cypress typically uses **one** e2e project and lets CI mutate env. Selenium: `application.properties` / Maven profiles. Same rule: specs stay environment-agnostic.\n\nInterview line: \"Specs call `Cypress.env` and `baseUrl`. Secrets are `CYPRESS_*` or gitignored `cypress.env.json`. I never commit staging passwords or hardcode hosts.\"",
      "order": 3
    }
  ],
  "advantages": [
    "10.2 Environment Variables & Multiple Environments — HRM always has local, staging, and sometimes a prod-read-only smoke."
  ],
  "limitations": [
    "10.2 Environment Variables & Multiple Environments is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
