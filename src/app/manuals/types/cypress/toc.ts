/* Cypress manual TOC — ordering only. Content lives in part-N/chapter-M.ts */

export const CYPRESS_TOC_VERSION = 1;

export type CypressTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const CYPRESS_TOC: CypressTocPart[] = [
  {
    partNo: 0,
    name: "Background",
    items: [
      { title: "0. What is Cypress, Really" },
      { title: "1. Where Cypress is Used" },
      { title: "2. What Cypress Can Do" },
      { title: "3. Why Companies Choose Cypress Over Alternatives" },
      { title: "4. What This Manual Will NOT Cover" },
    ],
  },
  {
    partNo: 1,
    name: "Foundations",
    items: [
      { title: "5. Introduction to Cypress" },
      { title: "6. Installation & Environment Setup" },
      { title: "7. Cypress Test Runner / Cypress App Walkthrough" },
      { title: "8. First Test" },
      { title: "9. cypress.config.js" },
    ],
  },
  {
    partNo: 2,
    name: "Core Commands",
    items: [
      { title: "10. cy.visit, cy.get, cy.contains, cy.find" },
      { title: "11. Selector Strategies" },
      { title: "12. Command Chaining & Retry-ability" },
      { title: "13. Aliases" },
      { title: "14. Assertions" },
    ],
  },
  {
    partNo: 3,
    name: "Actions",
    items: [
      { title: "15. Interacting with Elements" },
      { title: "16. Forms & Inputs" },
      { title: "17. Checkboxes, Radio Buttons, Dropdowns" },
      { title: "18. iframes" },
      { title: "19. File Uploads & Downloads" },
      { title: "20. Alerts, Confirms, Prompts" },
      { title: "21. Cookies & Local Storage" },
      { title: "22. Waiting Strategies" },
    ],
  },
  {
    partNo: 4,
    name: "Advanced",
    items: [
      { title: "23. Network Interception & Mocking" },
      { title: "24. API Testing with Cypress" },
      { title: "25. Visual & Accessibility Testing" },
      { title: "26. Authentication & Session Reuse" },
      { title: "27. Working Around Cypress's Architectural Limits" },
      { title: "28. Component Testing" },
      { title: "29. Parallelization & Sharding" },
      { title: "30. Cross-browser Testing" },
      { title: "31. Debugging Tools" },
      { title: "32. Parallel Execution & Sharding (Cypress)" },
      { title: "33. Cross-browser & Cross-device Testing (Cypress)" },
      { title: "34. Localization / i18n Testing (Cypress)" },
      { title: "35. Debugging Tools Expanded (Cypress)" },
      { title: "36. UI Mode (Cypress)" },
      { title: "37. Trace Viewer & Post-Mortem Debugging (Cypress)" },
      { title: "38. Flaky Test Management (Cypress)" },
    ],
  },
  {
    partNo: 5,
    name: "CI/CD & Reporting",
    items: [
      { title: "39. CI/CD Integration (Cypress)" },
      { title: "40. Test Reporting (Cypress)" },
      { title: "41. Dockerizing Cypress Tests" },
      { title: "42. Logging & Error Handling (Cypress)" },
    ],
  },
  {
    partNo: 6,
    name: "Pro-Level Practices",
    items: [
      { title: "43. Building a Scalable Framework from Scratch (Cypress)" },
      { title: "44. Managing Test Suites at Scale (Cypress)" },
      { title: "45. Code Review & Best Practices (Cypress)" },
      { title: "46. Performance Considerations (Cypress)" },
    ],
  },
  {
    partNo: 7,
    name: "Real-World Project & Job Readiness",
    items: [
      { title: "47. Real-World Capstone Project (Cypress)" },
      { title: "48. Portfolio Building (Cypress)" },
      { title: "49. Interview Prep (Cypress)" },
      { title: "50. Career Positioning (Cypress)" },
    ],
  },
  {
    partNo: 8,
    name: "Resources, Citations & Reference Library",
    items: [
      { title: "51. Books & Long-Form Reading" },
      { title: "52. Blogs & Written Tutorials" },
      { title: "53. Newsletters" },
      { title: "54. Podcasts" },
      { title: "55. Courses & Structured Learning Platforms" },
      { title: "56. Certifications" },
      { title: "57. Conferences & Talks" },
      { title: "58. Social & Real-Time Communities" },
      { title: "59. Browser Extensions & Developer Tools" },
      { title: "62. Sample Data & Practice Sites" },
    ],
  },
];
