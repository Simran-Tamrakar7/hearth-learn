import type { ChapterRecord } from "../../../types";

/** 9.10 Localization / i18n Testing */
export const chapter = {
  "id": "cy-9-10-localization-i18n-testing",
  "title": "9.10 Localization / i18n Testing",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "i18n tests fail for the wrong reason when they assert English copy that marketing will change. Prefer stable locators (data-cy), assert translation keys or lang-specific fixtures, and control locale via URL, cookie, header, or app setting — not by hoping the CI machine is en-US. Playwright can set locale/timezone on a context at launch; Cypress sets the browser you launched and then drives the app's own i18n switch.",
  "why": "Bizlevate HRM ships English and Nepali (or Spanish) for leave types and payroll labels. A suite that `contains('Submit leave')` breaks on the Nepali build even when the feature works.",
  "when": "When adding a second language, when CI agents have unexpected OS locales, or when dates/currency formats differ (en-US 9/16/2026 vs en-GB 16/09/2026).",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "Leave submit must work in en and ne-NP: same data-cy, different visible strings from fixtures.",
    "pass": "You switch locale the way the app does (query, cookie, user profile), load strings from a fixture, and assert with data-cy plus fixture text — not hardcoded English only.",
    "fail": "You assert cy.contains('Submit') in every spec and never set the app language."
  },
  "tools": [],
  "customSummary": "- Do not couple specs to English marketing copy; use data-cy and fixture strings.\n- Drive locale through the product (profile, ?lang=, cookie), then cy.visit.\n- Dates, currency, and collation flake under OS locale — pin TZ and format in assertions.\n- Playwright: browser.newContext({ locale, timezoneId }). Cypress: no equivalent context factory; control the app and the OS/container.\n- Selenium: similar to Cypress — capabilities/chrome options, then the app.",
  "contentMarkdown": "## Locale is an app feature, not a Cypress command\n\n```js\ncy.visit('/leave?lang=ne');\n// or\ncy.setCookie('locale', 'ne-NP');\ncy.visit('/leave');\n```\n\nCypress does not offer Playwright's `newContext({ locale: 'de-DE', timezoneId: 'Europe/Berlin' })` because it does not manufacture isolated browser contexts that way. You launch a browser and then make the HRM app render Nepali — the same way a user would (language picker, profile, subdomain).\n\nFor `Accept-Language` at first document request:\n\n```js\ncy.visit('/leave', { headers: { 'Accept-Language': 'ne-NP,ne;q=0.9' } });\n```\n\nHeaders on `cy.visit` help if the *document* is localized server-side. Client-only i18n still needs the app switch.\n\n## Assert like a translator won't fire you\n\n```js\ncy.fixture('i18n/ne-NP.json').then((t) => {\n  cy.get('[data-cy=submit]').should('have.text', t.leave.submit);\n});\n```\n\n`data-cy=submit` stays stable. The fixture is the contract with the translation file. Optionally assert `html[lang=\"ne\"]`.\n\nHard-coded `cy.contains('Start date')` is an English unit test in disguise.\n\n## Dates and money\n\nPayroll will show `Rs.` vs `$ `, and `16/09/2026` vs `9/16/2026`. Freeze time with `cy.clock(new Date('2026-09-16T00:00:00Z'))` and compare against formatted fixtures, not against `new Date()` on the runner.\n\nCI containers should set `TZ=UTC` so screenshot/i18n tests do not drift with the GitHub runner region.\n\n## Versus Playwright and Selenium\n\nPlaywright's context locale/timezone/geolocation is the cleanest *browser-level* i18n hook. Selenium can pass Chrome prefs (`intl.accept_languages`). Cypress sits in the middle: some visit headers, mostly application-level control. All three still need non-English locators that are not the visible string.\n\nInterview line: \"I don't assert English. I switch the app locale, use `data-cy`, and compare against translation fixtures. Cypress has no Playwright-style locale context.\"",
  "blocks": [
    {
      "id": "cy-9-10-md-0",
      "type": "overview",
      "heading": "Locale is an app feature, not a Cypress command",
      "content": "```js\ncy.visit('/leave?lang=ne');\n// or\ncy.setCookie('locale', 'ne-NP');\ncy.visit('/leave');\n```\n\nCypress does not offer Playwright's `newContext({ locale: 'de-DE', timezoneId: 'Europe/Berlin' })` because it does not manufacture isolated browser contexts that way. You launch a browser and then make the HRM app render Nepali — the same way a user would (language picker, profile, subdomain).\n\nFor `Accept-Language` at first document request:\n\n```js\ncy.visit('/leave', { headers: { 'Accept-Language': 'ne-NP,ne;q=0.9' } });\n```\n\nHeaders on `cy.visit` help if the *document* is localized server-side. Client-only i18n still needs the app switch.",
      "order": 0
    },
    {
      "id": "cy-9-10-md-1",
      "type": "overview",
      "heading": "Assert like a translator won't fire you",
      "content": "```js\ncy.fixture('i18n/ne-NP.json').then((t) => {\n  cy.get('[data-cy=submit]').should('have.text', t.leave.submit);\n});\n```\n\n`data-cy=submit` stays stable. The fixture is the contract with the translation file. Optionally assert `html[lang=\"ne\"]`.\n\nHard-coded `cy.contains('Start date')` is an English unit test in disguise.",
      "order": 1
    },
    {
      "id": "cy-9-10-md-2",
      "type": "overview",
      "heading": "Dates and money",
      "content": "Payroll will show `Rs.` vs `$ `, and `16/09/2026` vs `9/16/2026`. Freeze time with `cy.clock(new Date('2026-09-16T00:00:00Z'))` and compare against formatted fixtures, not against `new Date()` on the runner.\n\nCI containers should set `TZ=UTC` so screenshot/i18n tests do not drift with the GitHub runner region.",
      "order": 2
    },
    {
      "id": "cy-9-10-md-3",
      "type": "overview",
      "heading": "Versus Playwright and Selenium",
      "content": "Playwright's context locale/timezone/geolocation is the cleanest *browser-level* i18n hook. Selenium can pass Chrome prefs (`intl.accept_languages`). Cypress sits in the middle: some visit headers, mostly application-level control. All three still need non-English locators that are not the visible string.\n\nInterview line: \"I don't assert English. I switch the app locale, use `data-cy`, and compare against translation fixtures. Cypress has no Playwright-style locale context.\"",
      "order": 3
    }
  ],
  "advantages": [
    "9.10 Localization / i18n Testing — Bizlevate HRM ships English and Nepali (or Spanish) for leave types and payroll labels."
  ],
  "limitations": [
    "9.10 Localization / i18n Testing is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
