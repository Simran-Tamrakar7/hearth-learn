import type { ChapterRecord } from "../../../types";

/** 14.10 Sample Data & Practice Sites */
export const chapter = {
  "id": "cy-14-10-sample-data-practice-sites",
  "title": "14.10 Sample Data & Practice Sites",
  "minutes": 16,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "Practice on: Cypress Kitchen Sink / Real World App, the-internet.herokuapp.com (auth, frames, new windows — to feel the limits), JSONPlaceholder/Reqres for cy.request, and a Bizlevate-like HRM when you can. New-window pages exist to teach you 9.3 workarounds, not switchToTab. Do not run destructive tests against production payroll. Appium practice apps are a separate track.",
  "why": "You need safe places to fail. Production HRM is not that place. Kitchen sink does not teach domain judgment — you still need 13.1.",
  "when": "When learning a command, when demonstrating origin/tabs, and when you cannot use Bizlevate locally.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You want to rehearse cy.origin and a download without touching prod.",
    "pass": "You use Kitchen Sink / RWA plus the-internet for windows/frames, and fixtures for HRM-shaped data. You never point default baseUrl at production.",
    "fail": "You practice by clicking production payroll and committing real employee CSVs."
  },
  "tools": [],
  "customSummary": "- Kitchen Sink + Real World App for Cypress idioms.\n- the-internet for frames/windows/auth (and Cypress limits).\n- JSON APIs for cy.request; fixtures for HRM shapes.\n- Capstone app for portfolio (13.1).\n- Native: Appium sample apps, not Cypress.",
  "contentMarkdown": "## A practice map\n\n| Goal | Site / data |\n|---|---|\n| Commands, retry-ability | [example.cypress.io](https://example.cypress.io) Kitchen Sink |\n| Realistic Cypress app + CI patterns | Cypress Real World App (RWA) on GitHub |\n| `target=_blank`, frames, basic auth | [the-internet.herokuapp.com](https://the-internet.herokuapp.com) |\n| Forms / commerce happy paths | Sauce Demo, automationexercise.com (treat as toys) |\n| API-only | jsonplaceholder.typicode.com, reqres.in |\n| Domain | Bizlevate HRM local / staging with test users (10.2) |\n| a11y | your CT modal + axe |\n| Native | ApiDemos / TheApp — **Appium**, not Cypress |\n\n## Data\n\nHand-roll `cypress/fixtures/employees.json` with fake names. Do not export real staff. Deterministic seeds beat Faker-in-the-assert if you need stable text.\n\n## the-internet and tabs\n\nWhen a practice site opens a new window, do the 9.3 substitutes (href, `cy.request`, stub `window.open`). If the exercise is \"control two windows,\" switch to **Playwright** for that hour — that is the lesson. Selenium's window handles are the other contrast lab.\n\nKitchen Sink will not teach payroll. You still need the capstone (13.1). Never point default `baseUrl` at production.\n\nInterview line: \"I practice on RWA/Kitchen Sink and domain fixtures. I don't use production data. New-window labs prove Cypress has no switchToTab; Playwright and Selenium are how you actually drive two windows.\"",
  "blocks": [
    {
      "id": "cy-14-10-md-0",
      "type": "overview",
      "heading": "A practice map",
      "content": "| Goal | Site / data |\n|---|---|\n| Commands, retry-ability | [example.cypress.io](https://example.cypress.io) Kitchen Sink |\n| Realistic Cypress app + CI patterns | Cypress Real World App (RWA) on GitHub |\n| `target=_blank`, frames, basic auth | [the-internet.herokuapp.com](https://the-internet.herokuapp.com) |\n| Forms / commerce happy paths | Sauce Demo, automationexercise.com (treat as toys) |\n| API-only | jsonplaceholder.typicode.com, reqres.in |\n| Domain | Bizlevate HRM local / staging with test users (10.2) |\n| a11y | your CT modal + axe |\n| Native | ApiDemos / TheApp — **Appium**, not Cypress |",
      "order": 0
    },
    {
      "id": "cy-14-10-md-1",
      "type": "overview",
      "heading": "Data",
      "content": "Hand-roll `cypress/fixtures/employees.json` with fake names. Do not export real staff. Deterministic seeds beat Faker-in-the-assert if you need stable text.",
      "order": 1
    },
    {
      "id": "cy-14-10-md-2",
      "type": "overview",
      "heading": "the-internet and tabs",
      "content": "When a practice site opens a new window, do the 9.3 substitutes (href, `cy.request`, stub `window.open`). If the exercise is \"control two windows,\" switch to **Playwright** for that hour — that is the lesson. Selenium's window handles are the other contrast lab.\n\nKitchen Sink will not teach payroll. You still need the capstone (13.1). Never point default `baseUrl` at production.\n\nInterview line: \"I practice on RWA/Kitchen Sink and domain fixtures. I don't use production data. New-window labs prove Cypress has no switchToTab; Playwright and Selenium are how you actually drive two windows.\"",
      "order": 2
    }
  ],
  "advantages": [
    "14.10 Sample Data & Practice Sites — You need safe places to fail."
  ],
  "limitations": [
    "14.10 Sample Data & Practice Sites is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
