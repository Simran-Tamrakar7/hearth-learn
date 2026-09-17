import type { ChapterRecord } from "../../../types";

/** 14.1 Books & Long-Form Reading */
export const chapter = {
  "id": "cy-14-1-books-long-form-reading",
  "title": "14.1 Books & Long-Form Reading",
  "minutes": 18,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Cypress print books age faster than the runner. Primary long-form is the official Cypress docs (Guides, API, migration notes). Pair with lasting testing strategy books (Agile Testing, Explore It!, Working Effectively with Legacy Code for testability) and Gleb Bahmutov's long essays. Playwright and Selenium books do not teach cy.origin — they teach the other architectures you must compare.",
  "why": "Strategy outlasts `cy.intercept` syntax. Interview depth often comes from testing literature, not a 2020 Cypress cookbook that still uses `cy.server()`.",
  "when": "When you want depth beyond API lookup, and when a book still uses deprecated Cypress 9 syntax — discard the snippets, keep the ideas.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You want a reading list for a six-month HRM automation rotation.",
    "pass": "You put docs.cypress.io first, one strategy book, Gleb's blog as long-form, and you treat cookbooks as historical.",
    "fail": "You buy only a Selenium 2 era print book and assume the APIs match Cypress."
  },
  "tools": [],
  "customSummary": "- Official Cypress Guides/API/changelog — source of truth.\n- Strategy: Agile Testing, Explore It!, testability/legacy-code ideas.\n- Gleb Bahmutov essays for advanced Cypress.\n- Playwright docs for Trace/WebKit contrast; Appium docs for native.\n- Skip stale cookbooks that still show cy.server / wait(n) as style.",
  "contentMarkdown": "## Start here (canonical)\n\n- [Cypress documentation](https://docs.cypress.io) — Guides (core concepts, retry-ability, origin, CT, CI) then API. This is the book.\n- [Cypress changelog / migration guides](https://docs.cypress.io/guides/references/changelog) — video default, origin, session: these break tutorials.\n- [Cypress GitHub](https://github.com/cypress-io/cypress) — issues are often more honest than marketing about WebKit and tabs.\n\nPrint \"Cypress\" cookbooks lag the runner. If the table of contents still shows `cy.server()` / `cy.route()`, keep the *ideas* (page objects vs app actions) and throw away the snippets.\n\n## Strategy books that still pay rent\n\n- *Agile Testing* (Gregory/Crispin) — whole-team quality; explains why CT+E2E coexist (9.5).\n- *Explore It!* (Hendrickson) — charters; your `@smoke` vs deep regression (10.1).\n- *Working Effectively with Legacy Code* (Feathers) — seams; why `data-cy` and testable components matter.\n- *Continuous Delivery* (Humble/Farley) — why CI artifacts and fast smoke exist (Part 11).\n- *xUnit Test Patterns* (Meszaros) — fixture smell; maps to Cypress isolation + `cy.session`.\n\nNone of these are Cypress manuals. That is the point: judgment outlives API churn.\n\n## Cypress-shaped long-form (not always a book)\n\nGleb Bahmutov's essays are the unofficial advanced book: grep plugin, `cy.task`, flake, CT, parallel. Read dated-recent posts, not a 2018 Packt chapter copied onto a blog.\n\nOfficial Cypress blog long-reads on Component Testing and Cloud are fine if you remember Cloud is paid orchestration (11.3), not extra commands.\n\n## Comparison long-form\n\n- Playwright docs: Trace Viewer, webkit, locators, `toHaveScreenshot` — required contrast for 9.6, 9.9, 9.12.\n- Selenium WebDriver docs: window handles, Grid — required contrast for 9.3, 9.8, 9.16.\n- Appium docs: native vs mobile web — 9.17.\n\nA library that only contains Cypress will make you lose the \"when not Cypress\" interview.\n\nInterview line: \"I treat Cypress docs + changelog as the book. Strategy texts for judgment. Playwright/Selenium/Appium docs for the comparison table.\"",
  "blocks": [
    {
      "id": "cy-14-1-md-0",
      "type": "overview",
      "heading": "Start here (canonical)",
      "content": "- [Cypress documentation](https://docs.cypress.io) — Guides (core concepts, retry-ability, origin, CT, CI) then API. This is the book.\n- [Cypress changelog / migration guides](https://docs.cypress.io/guides/references/changelog) — video default, origin, session: these break tutorials.\n- [Cypress GitHub](https://github.com/cypress-io/cypress) — issues are often more honest than marketing about WebKit and tabs.\n\nPrint \"Cypress\" cookbooks lag the runner. If the table of contents still shows `cy.server()` / `cy.route()`, keep the *ideas* (page objects vs app actions) and throw away the snippets.",
      "order": 0
    },
    {
      "id": "cy-14-1-md-1",
      "type": "overview",
      "heading": "Strategy books that still pay rent",
      "content": "- *Agile Testing* (Gregory/Crispin) — whole-team quality; explains why CT+E2E coexist (9.5).\n- *Explore It!* (Hendrickson) — charters; your `@smoke` vs deep regression (10.1).\n- *Working Effectively with Legacy Code* (Feathers) — seams; why `data-cy` and testable components matter.\n- *Continuous Delivery* (Humble/Farley) — why CI artifacts and fast smoke exist (Part 11).\n- *xUnit Test Patterns* (Meszaros) — fixture smell; maps to Cypress isolation + `cy.session`.\n\nNone of these are Cypress manuals. That is the point: judgment outlives API churn.",
      "order": 1
    },
    {
      "id": "cy-14-1-md-2",
      "type": "overview",
      "heading": "Cypress-shaped long-form (not always a book)",
      "content": "Gleb Bahmutov's essays are the unofficial advanced book: grep plugin, `cy.task`, flake, CT, parallel. Read dated-recent posts, not a 2018 Packt chapter copied onto a blog.\n\nOfficial Cypress blog long-reads on Component Testing and Cloud are fine if you remember Cloud is paid orchestration (11.3), not extra commands.",
      "order": 2
    },
    {
      "id": "cy-14-1-md-3",
      "type": "overview",
      "heading": "Comparison long-form",
      "content": "- Playwright docs: Trace Viewer, webkit, locators, `toHaveScreenshot` — required contrast for 9.6, 9.9, 9.12.\n- Selenium WebDriver docs: window handles, Grid — required contrast for 9.3, 9.8, 9.16.\n- Appium docs: native vs mobile web — 9.17.\n\nA library that only contains Cypress will make you lose the \"when not Cypress\" interview.\n\nInterview line: \"I treat Cypress docs + changelog as the book. Strategy texts for judgment. Playwright/Selenium/Appium docs for the comparison table.\"",
      "order": 3
    }
  ],
  "advantages": [
    "14.1 Books & Long-Form Reading — Strategy outlasts `cy."
  ],
  "limitations": [
    "14.1 Books & Long-Form Reading is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
