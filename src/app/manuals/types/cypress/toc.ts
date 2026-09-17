/* Cypress manual TOC — ordering only. Content lives in part-N/chapter-M.ts */

/** Bump when chapter catalog changes so stale browser localStorage is not restored. */
export const CYPRESS_TOC_VERSION = 3;

export type CypressTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const CYPRESS_TOC: CypressTocPart[] = [
  {
    partNo: 0,
    name: "Orientation",
    items: [
      { title: "0.1 What is Cypress, Really" },
      { title: "0.2 Where Cypress is Used" },
      { title: "0.3 What Cypress Can Do" },
      { title: "0.4 Why Companies Choose Cypress Over Alternatives" },
      { title: "0.5 Architecture — Runs Inside the Browser" },
      { title: "0.6 Supported Browsers & Core Limitations" },
      { title: "0.7 Cypress Test Runner / Cypress App Overview" },
      { title: "0.8 What This Manual Will NOT Cover" },
    ],
  },
  {
    partNo: 1,
    name: "Setup & Project Structure",
    items: [
      { title: "1.1 Introduction to Cypress" },
      { title: "1.2 Installation & Environment Setup" },
      { title: "1.3 Folder Structure" },
      { title: "1.4 First Test" },
      { title: "1.5 cypress.config.js/ts" },
      { title: "1.6 cypress.env.json & Config Overrides" },
      { title: "1.7 Opening the App: cypress open vs cypress run" },
      { title: "1.8 TypeScript Setup" },
      { title: "1.9 Node Event Setup — setupNodeEvents & Plugins" },
      { title: "1.10 Quick Steps" },
    ],
  },
  {
    partNo: 2,
    name: "Core Syntax & Commands",
    items: [
      { title: "2.1 Test Structure Syntax" },
      { title: "2.2 cy.visit, cy.get, cy.contains, cy.find" },
      { title: "2.3 Chaining & the Command Queue" },
      { title: "2.4 Retry-ability" },
      { title: "2.5 Aliases" },
      { title: "2.6 Assertions — implicit vs explicit" },
      { title: "2.7 cy.wrap()" },
    ],
  },
  {
    partNo: 3,
    name: "Interacting with Elements",
    items: [
      { title: "3.1 Clicks, Typing, Clearing, Checkboxes/Radios, Selects" },
      { title: "3.2 Forms & Inputs" },
      { title: "3.3 Dropdowns" },
      { title: "3.4 Hover, Drag-and-Drop, Scrolling" },
      { title: "3.5 Tables, Lists & Dynamic Content" },
      { title: "3.6 Handling iframes" },
      { title: "3.7 File Uploads" },
      { title: "3.8 File Downloads & Verification" },
      { title: "3.9 Handling alert, confirm, prompt" },
      { title: "3.10 Cookies & Local/Session Storage" },
      { title: "3.11 Waiting Strategies" },
      { title: "3.12 Mocking Dates & Timers" },
      { title: "3.13 Spies & Stubs" },
      { title: "3.14 Event Handling — Cypress.on() / cy.on()" },
    ],
  },
  {
    partNo: 4,
    name: "Locator Strategy",
    items: [
      { title: "4.1 Selector Strategies" },
      { title: "4.2 cy.contains() vs cy.get()" },
      { title: "4.3 DOM Traversal" },
      { title: "4.4 Custom Selectors / Testing Library Plugin" },
    ],
  },
  {
    partNo: 5,
    name: "Network & Data Handling",
    items: [
      { title: "5.1 Network Interception & Mocking" },
      { title: "5.2 Fixtures" },
      { title: "5.3 Aliases for Elements, Requests, and Data" },
    ],
  },
  {
    partNo: 6,
    name: "API Testing with Cypress",
    items: [
      { title: "6.1 cy.request() Deep Dive" },
      { title: "6.2 Schema Validation" },
      { title: "6.3 Combining UI + API Tests" },
    ],
  },
  {
    partNo: 7,
    name: "State Management & Test Isolation",
    items: [
      { title: "7.1 Cookies, Local Storage, Session Storage" },
      { title: "7.2 cy.session() for Login Caching" },
      { title: "7.3 Test Isolation & Reset-per-Test Behavior" },
      { title: "7.4 Handling Authentication" },
    ],
  },
  {
    partNo: 8,
    name: "Custom Commands & Reusability",
    items: [
      { title: "8.1 Writing Custom Commands" },
      { title: "8.2 Overwriting Existing Commands" },
      { title: "8.3 Support Files" },
      { title: "8.4 Page Object Model vs App Actions" },
    ],
  },
  {
    partNo: 9,
    name: "Advanced Topics",
    items: [
      { title: "9.1 Cross-Origin Testing (cy.origin())" },
      { title: "9.2 Working Around Cypress's Architectural Limits" },
      { title: "9.3 Multi-Tab / New Window Limitations & Workarounds" },
      { title: "9.4 Shadow DOM Support" },
      { title: "9.5 Component Testing (Cypress CT)" },
      { title: "9.6 Visual Regression Testing" },
      { title: "9.7 Accessibility Testing (cypress-axe)" },
      { title: "9.8 Parallelization & Sharding" },
      { title: "9.9 Cross-Browser & Cross-Device Testing" },
      { title: "9.10 Localization / i18n Testing" },
      { title: "9.11 UI Mode" },
      { title: "9.12 Trace Viewer & Post-Mortem Debugging" },
      { title: "9.13 Flaky Test Management" },
      { title: "9.14 Data-Driven / Looped Tests" },
      { title: "9.15 cy.screenshot() API" },
      { title: "9.16 Migrating from Protractor/Selenium to Cypress" },
      { title: "9.17 Mobile Testing — Real Limitations" },
    ],
  },
  {
    partNo: 10,
    name: "Test Organization & Execution",
    items: [
      { title: "10.1 Tags, Grep Plugin, Conditional Test Running" },
      { title: "10.2 Environment Variables & Multiple Environments" },
      { title: "10.3 Retries" },
      { title: "10.4 Headless vs Headed Runs, Viewport/Device Testing" },
    ],
  },
  {
    partNo: 11,
    name: "CI/CD Integration",
    items: [
      { title: "11.1 Running Cypress in GitHub Actions / GitLab CI / Jenkins" },
      { title: "11.2 Docker Images for Cypress" },
      { title: "11.3 Cypress Cloud — Recorded Runs, Dashboards, Analytics" },
      { title: "11.4 Cypress Cloud AI Features" },
      { title: "11.5 Cypress Cloud Alternatives" },
      { title: "11.6 Test Reporting" },
      { title: "11.7 Logging & Error Handling" },
      { title: "11.8 Artifacts: Screenshots & Videos on Failure" },
    ],
  },
  {
    partNo: 12,
    name: "Debugging & Best Practices",
    items: [
      { title: "12.1 Debugging Tools" },
      { title: "12.2 Common Anti-Patterns" },
      { title: "12.3 Flaky Test Root Causes & Fixes" },
      { title: "12.4 Performance — Speeding Up Suites" },
    ],
  },
  {
    partNo: 13,
    name: "Real-World Project & Job Readiness",
    items: [
      { title: "13.1 Real-World Capstone Project" },
      { title: "13.2 Portfolio Building" },
      { title: "13.3 Interview Prep" },
      { title: "13.4 Career Positioning" },
    ],
  },
  {
    partNo: 14,
    name: "Resources, Citations & Reference Library",
    items: [
      { title: "14.1 Books & Long-Form Reading" },
      { title: "14.2 Blogs & Written Tutorials" },
      { title: "14.3 Newsletters" },
      { title: "14.4 Podcasts" },
      { title: "14.5 Courses & Structured Learning Platforms" },
      { title: "14.6 Certifications" },
      { title: "14.7 Conferences & Talks" },
      { title: "14.8 Social & Real-Time Communities" },
      { title: "14.9 Browser Extensions & Developer Tools" },
      { title: "14.10 Sample Data & Practice Sites" },
    ],
  },
  {
    partNo: 15,
    name: "Appendices",
    items: [
      { title: "A. Cypress vs Playwright vs Selenium — comparison table" },
      { title: "B. Useful plugins" },
      { title: "C. Cheat sheet of commands" },
      { title: "D. Common error messages & fixes" },
    ],
  },
];
