import type { ChapterRecord } from "../../../types";

/** 9.2 Working Around Cypress's Architectural Limits */
export const chapter = {
  "id": "cy-9-2-working-around-cypress-s-architectural-limits",
  "title": "9.2 Working Around Cypress's Architectural Limits",
  "minutes": 28,
  "level": "advanced",
  "phase": "Part 9 · Advanced Topics",
  "partName": "Part 9 · Advanced Topics",
  "overviewText": "Every famous Cypress limitation — cross-origin, multi-tab, one browser per run, no first-class WebKit, no in-process parallel browsers — is a consequence of 'the test lives in the page,' not a missing checkbox on the roadmap. Senior work is matching the limitation to a substitute (origin block, cy.request, href assertion, separate suite in Playwright) instead of fighting the iframe.",
  "why": "Teams waste months trying to make Cypress behave like an external driver. Knowing which walls are architectural keeps Bizlevate's suite honest and keeps interview answers from sounding like tool tribalism.",
  "when": "When a ticket says 'also assert the PDF tab' or 'login is on another domain,' before writing a plugin. Revisit when flake traces back to chromeWebSecurity or a target=_blank click.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "A product manager wants one Cypress spec to: log in via Okta, open a payslip PDF in a new tab, and compare two employees side by side.",
    "pass": "You split the work: cy.origin for Okta, cy.request or href checks for the PDF, and you say the side-by-side tab requires Playwright (or two sequential visits). You do not promise cy.switchToTab().",
    "fail": "You disable web security, add cy.wait(5000), and claim Cypress will 'soon' do multi-tab because Playwright does."
  },
  "tools": [],
  "customSummary": "- In-page architecture ⇒ same-origin wall, one privileged iframe at a time, no two live tab DOMs.\n- Substitutes: cy.origin, cy.request, assert href/target, stub window.open, visit the URL in the same tab.\n- chromeWebSecurity: false and 'just use Electron' are not architecture workarounds.\n- Playwright/Selenium win when the product's critical path is multi-tab, Safari/WebKit, or non-JS bindings.\n- Choosing Playwright for one suite is a senior call, not a Cypress failure.",
  "contentMarkdown": "## The constraint, restated mechanically\n\nCypress owns one browser, one runner page, one app iframe, one command queue. Privileged access is into *that* iframe's JavaScript realm. Anything that would require the test process to hold two page handles at once (two tabs, two unrelated origins without `cy.origin`, a native WebView) is outside the model.\n\nSelenium's `switchTo().window(handle)` and Playwright's `Page` objects exist because those tools are external observers. Asking Cypress for the same API is asking it to stop being Cypress.\n\n## A substitution table you can actually use\n\n| Product behavior | Cypress substitute | When the substitute is not enough |\n|---|---|---|\n| Redirect through Okta | `cy.origin` (9.1) | IdP uses a popup + opener messaging you cannot observe |\n| `target=\"_blank\"` payslip | Assert `href` + `target`, or `cy.request(href)` | You must *read rendered PDF pixels in the new tab* |\n| `window.open` compare-employees | Stub `window.open`, then `cy.visit` the URL | Two live DOMs must stay open and interact |\n| Third-party chat widget iframe | `cy.origin` or isolate it out of E2E | Closed shadow + cross-origin + popup together |\n| Safari/iOS web-view bug | Do not pretend: no first-class WebKit | That bug is the test's reason to exist |\n| Native iOS/Android HRM app | Out of scope — Appium | Always |\n\n## Patterns that look like workarounds but are not\n\n**Sleep.** `cy.wait(8000)` after an SSO redirect does not restore privileged access.\n\n**`chromeWebSecurity: false`.** Turns off a browser guarantee. Breaks Firefox parity. Hides real product bugs (mixed content, CORS).\n\n**Conditional `if (Cypress.$('okta-form').length)`.** You are querying the *old* origin's DOM. The Okta form is not there.\n\n**Electron-only CI.** Electron is bundled Chromium, not \"all browsers.\" It does not fix origin or tabs.\n\n## The senior decision\n\nIf a large fraction of Bizlevate's *revenue-critical* journeys are multi-tab document compare, Safari-only bugs, or popup OAuth, put *those* journeys in Playwright (or Selenium, if the org is already there). Keep Cypress for in-app HRM journeys and component tests. That split is cheaper than a year of origin-callback archaeology.\n\nInterview line: \"I don't work around architecture with sleeps. I substitute (`cy.origin`, `cy.request`, href) or I change tools for that path.\"",
  "blocks": [
    {
      "id": "cy-9-2-md-0",
      "type": "overview",
      "heading": "The constraint, restated mechanically",
      "content": "Cypress owns one browser, one runner page, one app iframe, one command queue. Privileged access is into *that* iframe's JavaScript realm. Anything that would require the test process to hold two page handles at once (two tabs, two unrelated origins without `cy.origin`, a native WebView) is outside the model.\n\nSelenium's `switchTo().window(handle)` and Playwright's `Page` objects exist because those tools are external observers. Asking Cypress for the same API is asking it to stop being Cypress.",
      "order": 0
    },
    {
      "id": "cy-9-2-md-1",
      "type": "overview",
      "heading": "A substitution table you can actually use",
      "content": "| Product behavior | Cypress substitute | When the substitute is not enough |\n|---|---|---|\n| Redirect through Okta | `cy.origin` (9.1) | IdP uses a popup + opener messaging you cannot observe |\n| `target=\"_blank\"` payslip | Assert `href` + `target`, or `cy.request(href)` | You must *read rendered PDF pixels in the new tab* |\n| `window.open` compare-employees | Stub `window.open`, then `cy.visit` the URL | Two live DOMs must stay open and interact |\n| Third-party chat widget iframe | `cy.origin` or isolate it out of E2E | Closed shadow + cross-origin + popup together |\n| Safari/iOS web-view bug | Do not pretend: no first-class WebKit | That bug is the test's reason to exist |\n| Native iOS/Android HRM app | Out of scope — Appium | Always |",
      "order": 1
    },
    {
      "id": "cy-9-2-md-2",
      "type": "overview",
      "heading": "Patterns that look like workarounds but are not",
      "content": "**Sleep.** `cy.wait(8000)` after an SSO redirect does not restore privileged access.\n\n**`chromeWebSecurity: false`.** Turns off a browser guarantee. Breaks Firefox parity. Hides real product bugs (mixed content, CORS).\n\n**Conditional `if (Cypress.$('okta-form').length)`.** You are querying the *old* origin's DOM. The Okta form is not there.\n\n**Electron-only CI.** Electron is bundled Chromium, not \"all browsers.\" It does not fix origin or tabs.",
      "order": 2
    },
    {
      "id": "cy-9-2-md-3",
      "type": "overview",
      "heading": "The senior decision",
      "content": "If a large fraction of Bizlevate's *revenue-critical* journeys are multi-tab document compare, Safari-only bugs, or popup OAuth, put *those* journeys in Playwright (or Selenium, if the org is already there). Keep Cypress for in-app HRM journeys and component tests. That split is cheaper than a year of origin-callback archaeology.\n\nInterview line: \"I don't work around architecture with sleeps. I substitute (`cy.origin`, `cy.request`, href) or I change tools for that path.\"",
      "order": 3
    }
  ],
  "advantages": [
    "9.2 Working Around Cypress's Architectural Limits — Teams waste months trying to make Cypress behave like an external driver."
  ],
  "limitations": [
    "9.2 Working Around Cypress's Architectural Limits is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
