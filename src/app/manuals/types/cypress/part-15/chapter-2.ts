import type { ChapterRecord } from "../../../types";

/** B. Useful plugins */
export const chapter = {
  "id": "cy-15-2-useful-plugins",
  "title": "B. Useful plugins",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 15 · Appendices",
  "partName": "Part 15 · Appendices",
  "overviewText": "Cypress stays small; plugins fill tags, a11y, reports, images, grep, parallel-on-one-machine, Testing Library queries, and real events. Core already has selectFile, intercept, session, origin — do not install fossils (cypress-file-upload, cy.server helpers). Pin plugins to your Cypress major. Playwright needs fewer plugins because more is first-party (visual, HTML report, grep).",
  "why": "A plugin is a dependency you will debug on upgrade day. This list is the ones this manual already taught plus a short bench.",
  "when": "When starting a repo, when replacing Cloud (11.5), and when a blog recommends five overlapping plugins.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You are scaffolding Bizlevate's Cypress repo and must pick a minimum plugin set.",
    "pass": "You add @cypress/grep, cypress-axe, a Mochawesome two-part reporter, and only then image-snapshot or Testing Library if the team wants them.",
    "fail": "You install cypress-file-upload, cypress-wait-until for every get, and three reporters that overwrite each other."
  },
  "tools": [],
  "customSummary": "- grep plugin, cypress-axe, mochawesome pipeline, optional image-snapshot.\n- @testing-library/cypress if you prefer role queries.\n- cypress-real-events for hover closer to OS; still not iOS.\n- Sorry Cypress/Currents are services, not npm-only.\n- Prefer built-in: selectFile, intercept, session, origin, includeShadowDom.",
  "contentMarkdown": "## Taught in this manual (install these when you need the chapter)\n\n| Plugin / package | Chapter | Role |\n|---|---|---|\n| `@cypress/grep` | 10.1 | Tags / smoke |\n| `cypress-axe` + `axe-core` | 9.7 | a11y |\n| `cypress-mochawesome-reporter` or mochawesome + **merge** + marge | 11.6 | HTML reports |\n| `cypress-image-snapshot` (or Percy SDK) | 9.6 | Visual — not built-in |\n| `cypress-parallel` | 9.8 | Multi-process on one machine |\n| `@testing-library/cypress` | 4.x | `findByRole` etc. |\n| `cypress-real-events` | 9.17 | closer pointer events |\n\n## Services, not just plugins\n\nSorry Cypress, Currents, Cypress Cloud, Applitools/Percy — Part 11 / 9.6.\n\n## Usually unnecessary now\n\n- `cypress-file-upload` — use `cy.selectFile`.\n- `cypress-iframe` — often wrap/origin; check current recipes.\n- `cypress-wait-until` — usually a smell; prefer `.should` / `@alias`.\n- Old `cypress-plugin-snapshots` without maintenance — check dates.\n\n## Plugin hygiene\n\nRegister in `support/e2e.ts` **and** `setupNodeEvents` when the plugin says so (grep). Pin versions. Read Cypress peerDependency on major bump.\n\n## Versus Playwright and Selenium\n\nPlaywright: grep, HTML report, screenshot matcher, trace — **core**. Selenium: a zoo of language bindings and Allure adapters. Cypress's plugin culture is closer to \"jQuery of test tools\" — powerful, easy to over-install.\n\nInterview line: \"Minimum set: grep, axe, report merge. Visual is a plugin because Cypress has no built-in matcher.\"",
  "blocks": [
    {
      "id": "cy-15-2-md-0",
      "type": "overview",
      "heading": "Taught in this manual (install these when you need the chapter)",
      "content": "| Plugin / package | Chapter | Role |\n|---|---|---|\n| `@cypress/grep` | 10.1 | Tags / smoke |\n| `cypress-axe` + `axe-core` | 9.7 | a11y |\n| `cypress-mochawesome-reporter` or mochawesome + **merge** + marge | 11.6 | HTML reports |\n| `cypress-image-snapshot` (or Percy SDK) | 9.6 | Visual — not built-in |\n| `cypress-parallel` | 9.8 | Multi-process on one machine |\n| `@testing-library/cypress` | 4.x | `findByRole` etc. |\n| `cypress-real-events` | 9.17 | closer pointer events |",
      "order": 0
    },
    {
      "id": "cy-15-2-md-1",
      "type": "overview",
      "heading": "Services, not just plugins",
      "content": "Sorry Cypress, Currents, Cypress Cloud, Applitools/Percy — Part 11 / 9.6.",
      "order": 1
    },
    {
      "id": "cy-15-2-md-2",
      "type": "overview",
      "heading": "Usually unnecessary now",
      "content": "- `cypress-file-upload` — use `cy.selectFile`.\n- `cypress-iframe` — often wrap/origin; check current recipes.\n- `cypress-wait-until` — usually a smell; prefer `.should` / `@alias`.\n- Old `cypress-plugin-snapshots` without maintenance — check dates.",
      "order": 2
    },
    {
      "id": "cy-15-2-md-3",
      "type": "overview",
      "heading": "Plugin hygiene",
      "content": "Register in `support/e2e.ts` **and** `setupNodeEvents` when the plugin says so (grep). Pin versions. Read Cypress peerDependency on major bump.",
      "order": 3
    },
    {
      "id": "cy-15-2-md-4",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright: grep, HTML report, screenshot matcher, trace — **core**. Selenium: a zoo of language bindings and Allure adapters. Cypress's plugin culture is closer to \"jQuery of test tools\" — powerful, easy to over-install.\n\nInterview line: \"Minimum set: grep, axe, report merge. Visual is a plugin because Cypress has no built-in matcher.\"",
      "order": 4
    }
  ],
  "advantages": [
    "B. Useful plugins — A plugin is a dependency you will debug on upgrade day."
  ],
  "limitations": [
    "B. Useful plugins is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
