import type { ChapterRecord } from "../../../types";

/** 10.1 Tags, Grep Plugin, Conditional Test Running */
export const chapter = {
  "id": "cy-10-1-tags-grep-plugin-conditional-test-running",
  "title": "10.1 Tags, Grep Plugin, Conditional Test Running",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 10 · Test Organization & Execution",
  "partName": "Part 10 · Test Organization & Execution",
  "overviewText": "Cypress does not ship first-party test tags. The ecosystem standard is the grep plugin (@cypress/grep, historically cypress-grep): you annotate it('...', { tags: ['@smoke'] }) and select with CYPRESS_grepTags or --env grepTags= at run time. That is how you run smoke on PR, @payroll nightly, and @flake never on the merge gate. Playwright has grep/grepInvert in config; Selenium/Java uses JUnit categories or TestNG groups.",
  "why": "A 40-minute suite that cannot run a 4-minute smoke set will be skipped by developers. Tags are how Bizlevate keeps the PR gate honest without deleting coverage.",
  "when": "When CI time hurts, when you quarantine flake (9.13), and when you need @smoke vs @regression vs @okta without splitting repos.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "PRs must run a fast smoke set (login, leave submit, dashboard). Nightly runs everything except @flake. You must not maintain two copy-paste spec trees.",
    "pass": "You install @cypress/grep, register it in e2e.ts and setupNodeEvents, tag tests, and invoke CYPRESS_grepTags=@smoke on the PR job.",
    "fail": "You wrap tests in if (Cypress.env('SMOKE')) it(...) inside the spec, or you comment out tests before each release."
  },
  "tools": [],
  "customSummary": "- No built-in tags — use @cypress/grep (grep plugin), not ad-hoc if (env).\n- Tag it/describe via { tags: ['@smoke'] }; filter with grepTags / grep / grepInvert.\n- Register the plugin in support + setupNodeEvents or tags are ignored.\n- Playwright: config grep. Selenium: groups/categories. Same idea, different knob.\n- Conditional running of *commands* based on DOM (if $el.length) is still an anti-pattern (12.2).",
  "contentMarkdown": "## Why not `if (Cypress.env('SMOKE'))`\n\n```js\nif (Cypress.env('SMOKE')) {\n  it('login', () => { /* ... */ });\n}\n```\n\nMocha registers tests at load. Env-gated registration is brittle (tests vanish from the App, counts lie, you forget a flag). A grep plugin **filters** registered tests and reports skips/omits consistently.\n\nDOM-conditional tests (`if (cy.get(...))` — which does not even work) are a different sin: they hide product bugs. Tags select *which tests to run*; they do not replace assertions.\n\n## Install the grep plugin\n\n```bash\nnpm install -D @cypress/grep\n```\n\n```js\n// cypress/support/e2e.ts\nimport registerCypressGrep from '@cypress/grep';\nregisterCypressGrep();\n\n// cypress.config.ts\nimport { defineConfig } from 'cypress';\nimport cypressGrep from '@cypress/grep/src/plugin';\n\nexport default defineConfig({\n  e2e: {\n    setupNodeEvents(on, config) {\n      cypressGrep(config);\n      return config;\n    },\n  },\n});\n```\n\nIf you only import in support *or* only in Node, tags silently do nothing. Both sides are required.\n\n## Annotate and select\n\n```js\nit('employee can submit leave', { tags: ['@smoke', '@leave'] }, () => {\n  /* ... */\n});\n\nit('okta round-trip', { tags: ['@okta', '@nightly'] }, () => {\n  /* ... */\n});\n\nit('flaky balance widget', { tags: ['@flake'] }, () => {\n  /* ... */\n});\n```\n\n```bash\n# PR job\nnpx cypress run --env grepTags=@smoke\n\n# nightly: everything except flake\nnpx cypress run --env grepTags=-@flake\n# or grepInvert=@flake depending on plugin version — read the README for the invert syntax you installed\n\n# title grep (not tags)\nnpx cypress run --env grep=\"submit leave\"\n```\n\nGitHub Actions: pass `env: CYPRESS_grepTags: '@smoke'` into `cypress-io/github-action` (11.1). The `CYPRESS_` prefix is how Cypress maps OS env to `Cypress.env` (10.2).\n\n## Versus Playwright and Selenium\n\nPlaywright Test: `grep: /@smoke/` in config or `--grep @smoke`. pytest: `-m smoke`. JUnit 5: `@Tag(\"smoke\")` + surefire. Learn one tagging model; the Cypress-specific part is **the grep plugin is not built-in**.\n\nInterview line: \"Cypress has no native tags. I use the grep plugin, register it in support and Node, and filter with `grepTags`. I do not `if (env)` my tests.\"",
  "blocks": [
    {
      "id": "cy-10-1-md-0",
      "type": "overview",
      "heading": "Why not `if (Cypress.env('SMOKE'))`",
      "content": "```js\nif (Cypress.env('SMOKE')) {\n  it('login', () => { /* ... */ });\n}\n```\n\nMocha registers tests at load. Env-gated registration is brittle (tests vanish from the App, counts lie, you forget a flag). A grep plugin **filters** registered tests and reports skips/omits consistently.\n\nDOM-conditional tests (`if (cy.get(...))` — which does not even work) are a different sin: they hide product bugs. Tags select *which tests to run*; they do not replace assertions.",
      "order": 0
    },
    {
      "id": "cy-10-1-md-1",
      "type": "overview",
      "heading": "Install the grep plugin",
      "content": "```bash\nnpm install -D @cypress/grep\n```\n\n```js\n// cypress/support/e2e.ts\nimport registerCypressGrep from '@cypress/grep';\nregisterCypressGrep();\n\n// cypress.config.ts\nimport { defineConfig } from 'cypress';\nimport cypressGrep from '@cypress/grep/src/plugin';\n\nexport default defineConfig({\n  e2e: {\n    setupNodeEvents(on, config) {\n      cypressGrep(config);\n      return config;\n    },\n  },\n});\n```\n\nIf you only import in support *or* only in Node, tags silently do nothing. Both sides are required.",
      "order": 1
    },
    {
      "id": "cy-10-1-md-2",
      "type": "overview",
      "heading": "Annotate and select",
      "content": "```js\nit('employee can submit leave', { tags: ['@smoke', '@leave'] }, () => {\n  /* ... */\n});\n\nit('okta round-trip', { tags: ['@okta', '@nightly'] }, () => {\n  /* ... */\n});\n\nit('flaky balance widget', { tags: ['@flake'] }, () => {\n  /* ... */\n});\n```\n\n```bash\n# PR job\nnpx cypress run --env grepTags=@smoke\n\n# nightly: everything except flake\nnpx cypress run --env grepTags=-@flake\n# or grepInvert=@flake depending on plugin version — read the README for the invert syntax you installed\n\n# title grep (not tags)\nnpx cypress run --env grep=\"submit leave\"\n```\n\nGitHub Actions: pass `env: CYPRESS_grepTags: '@smoke'` into `cypress-io/github-action` (11.1). The `CYPRESS_` prefix is how Cypress maps OS env to `Cypress.env` (10.2).",
      "order": 2
    },
    {
      "id": "cy-10-1-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright Test: `grep: /@smoke/` in config or `--grep @smoke`. pytest: `-m smoke`. JUnit 5: `@Tag(\"smoke\")` + surefire. Learn one tagging model; the Cypress-specific part is **the grep plugin is not built-in**.\n\nInterview line: \"Cypress has no native tags. I use the grep plugin, register it in support and Node, and filter with `grepTags`. I do not `if (env)` my tests.\"",
      "order": 3
    }
  ],
  "advantages": [
    "10.1 Tags, Grep Plugin, Conditional Test Running — A 40-minute suite that cannot run a 4-minute smoke set will be skipped by developers."
  ],
  "limitations": [
    "10.1 Tags, Grep Plugin, Conditional Test Running is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
