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
    ],
  }
];
