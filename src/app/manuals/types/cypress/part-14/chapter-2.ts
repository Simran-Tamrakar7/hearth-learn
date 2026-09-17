import type { ChapterRecord } from "../../../types";

/** 14.2 Blogs & Written Tutorials */
export const chapter = {
  "id": "cy-14-2-blogs-written-tutorials",
  "title": "14.2 Blogs & Written Tutorials",
  "minutes": 16,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Official Cypress blog for releases; Gleb Bahmutov for deep recipes (grep, tasks, flake); Filip Hric and other practitioners for DX. Company engineering blogs for 'Cypress at scale' CI stories. Always check the Cypress major — cy.server, cy.route, and implicit video=true posts are fossils. Playwright/Selenium blogs are useful for contrast, not copy-paste.",
  "why": "Most Google results are Cypress 9. You will re-introduce flake if you follow a sleep-heavy tutorial into a Cypress 13+ suite.",
  "when": "When a new API ships (origin, session, CT) and when debugging a CI pattern someone else already solved.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You need a trustworthy post on cy.origin args and one on GitHub Action wait-on.",
    "pass": "You use official docs + a dated-recent Gleb or Cypress blog post, and you verify against your installed version.",
    "fail": "You copy the first SEO tutorial that uses cy.wait(5000) and cy.server()."
  },
  "tools": [],
  "customSummary": "- cypress.io/blog + docs first.\n- glebbahmutov.com for advanced, version-aware recipes.\n- Engineering blogs for Cloud/parallel war stories.\n- Check version; reject cy.server/route-era posts for new work.\n- Playwright blog for Trace/UI Mode contrast.",
  "contentMarkdown": "## A short allow-list\n\n- [Cypress blog](https://www.cypress.io/blog) — release notes in prose, CT, Cloud.\n- [Official recipes](https://docs.cypress.io/app/references/recipes) — origin, logging in, downloading files.\n- [Gleb Bahmutov](https://glebbahmutov.com/blog) — grep, `cy.task`, flake, plugins; assume high signal.\n- [Filip Hric](https://filiphric.com) — approachable Cypress DX, Studio caveats.\n- Company engineering blogs (search \"Cypress GitHub Actions flake\") — scale stories you will not find in getting-started posts.\n\n## How to read a random tutorial\n\nLook for: Cypress version, `cy.session`, intercept instead of `cy.route`, no `cy.wait(10000)`, `cy.origin` for SSO, GitHub `cypress-io/github-action`. If SSO is solved with `chromeWebSecurity: false` alone, close the tab. If they `await cy.get`, they mixed Playwright syntax into Cypress.\n\n## Contrast reading\n\nPlaywright's blog on Trace Viewer and UI Mode (9.11–9.12) will stop you from using those words wrongly in Cypress interviews. SeleniumHQ / Sauce Labs posts on Grid help you explain 9.8 without mixing \"workers\" and \"machines.\" Appium blog posts remind you viewport ≠ native.\n\n## Anti-allow-list\n\nSEO listicles titled \"Cypress vs Selenium 2019\" that claim Cypress cannot do cross-origin *at all* (pre-`cy.origin`). Visual-testing posts that call `cy.screenshot()` a matcher (9.6, 9.15).\n\nInterview line: \"I follow official + Gleb, version-check tutorials, and I read Playwright/Selenium posts for contrast — not for copy-paste into a Cypress spec.\"",
  "blocks": [
    {
      "id": "cy-14-2-md-0",
      "type": "overview",
      "heading": "A short allow-list",
      "content": "- [Cypress blog](https://www.cypress.io/blog) — release notes in prose, CT, Cloud.\n- [Official recipes](https://docs.cypress.io/app/references/recipes) — origin, logging in, downloading files.\n- [Gleb Bahmutov](https://glebbahmutov.com/blog) — grep, `cy.task`, flake, plugins; assume high signal.\n- [Filip Hric](https://filiphric.com) — approachable Cypress DX, Studio caveats.\n- Company engineering blogs (search \"Cypress GitHub Actions flake\") — scale stories you will not find in getting-started posts.",
      "order": 0
    },
    {
      "id": "cy-14-2-md-1",
      "type": "overview",
      "heading": "How to read a random tutorial",
      "content": "Look for: Cypress version, `cy.session`, intercept instead of `cy.route`, no `cy.wait(10000)`, `cy.origin` for SSO, GitHub `cypress-io/github-action`. If SSO is solved with `chromeWebSecurity: false` alone, close the tab. If they `await cy.get`, they mixed Playwright syntax into Cypress.",
      "order": 1
    },
    {
      "id": "cy-14-2-md-2",
      "type": "overview",
      "heading": "Contrast reading",
      "content": "Playwright's blog on Trace Viewer and UI Mode (9.11–9.12) will stop you from using those words wrongly in Cypress interviews. SeleniumHQ / Sauce Labs posts on Grid help you explain 9.8 without mixing \"workers\" and \"machines.\" Appium blog posts remind you viewport ≠ native.",
      "order": 2
    },
    {
      "id": "cy-14-2-md-3",
      "type": "overview",
      "heading": "Anti-allow-list",
      "content": "SEO listicles titled \"Cypress vs Selenium 2019\" that claim Cypress cannot do cross-origin *at all* (pre-`cy.origin`). Visual-testing posts that call `cy.screenshot()` a matcher (9.6, 9.15).\n\nInterview line: \"I follow official + Gleb, version-check tutorials, and I read Playwright/Selenium posts for contrast — not for copy-paste into a Cypress spec.\"",
      "order": 3
    }
  ],
  "advantages": [
    "14.2 Blogs & Written Tutorials — Most Google results are Cypress 9."
  ],
  "limitations": [
    "14.2 Blogs & Written Tutorials is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
