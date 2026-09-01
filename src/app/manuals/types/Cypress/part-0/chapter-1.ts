
import type { ChapterRecord } from "../../../types";

/** 1. Introduction to Cypress */
export const chapter = {
  id: "cy-intro",
  title: "1. Introduction to Cypress",
  minutes: 25,
  level: "beginner",
  phase: "Part 0 · Getting Started",
  partName: "Part 0 · Getting Started",
  overviewText: "Cypress is a JavaScript-based end-to-end testing framework built for modern web apps. Unlike WebDriver-based tools, Cypress runs inside the browser alongside your application, giving direct access to the DOM, network, and timing without manual wait management.",
  why: "Teams choose Cypress for fast feedback, readable specs, and built-in debugging. Understanding its in-browser architecture helps you explain trade-offs in interviews and avoid patterns that fight the tool.",
  when: "Read this before installing Cypress or writing your first spec. Revisit when comparing Cypress to Playwright or Selenium for a new project.",
  practical: {
    app: "E-commerce checkout",
    scenario: "Your team needs a smoke test that verifies add-to-cart and checkout without flaky explicit waits.",
    pass: "You explain Cypress runs in-browser with auto-waiting and can intercept network calls natively.",
    fail: "You say Cypress is 'just like Selenium' without mentioning architecture or scope limits.",
  },
  advantages: [
    "Real-time reload and time-travel debugging",
    "Automatic waiting on assertions and actions",
    "First-class network stubbing and spying",
  ],
  limitations: [
    "JavaScript/TypeScript only — no Python or Java bindings",
    "Same-origin constraints in older versions; limited multi-tab workflows",
    "Not designed for load testing or native mobile apps",
  ],
  tools: [],
  contentMarkdown: "## What is Cypress?\n\nCypress is an open-source E2E test runner optimized for developer experience.\n\n## Key concepts\n\n- **Commands** — chainable actions (`cy.visit`, `cy.get`, `cy.click`)\n- **Assertions** — built-in retries on `should()`\n- **Runner** — interactive UI for debugging",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
