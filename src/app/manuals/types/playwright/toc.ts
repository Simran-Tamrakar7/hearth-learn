/* Playwright manual TOC — ordering only. Content lives in part-N/chapter-M.ts */

/** Bump when chapter catalog changes so stale browser localStorage is not restored. */
export const PLAYWRIGHT_TOC_VERSION = 3;

export type PlaywrightTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const PLAYWRIGHT_TOC: PlaywrightTocPart[] = [
  {
    partNo: 0,
    name: "Background & Context",
    items: [
      { title: "0. What is Playwright, Really" },
      { title: "1. Where Playwright is Used" },
      { title: "2. What Playwright Can Do" },
      { title: "3. Why Companies Choose Playwright Over Alternatives" },
      { title: "4. What This Manual Will NOT Cover" },
      { title: "5. The Testing Pyramid & Where UI Automation Fits" },
      { title: "6. When (and When Not) to Automate" },
      { title: "7. The Playwright Tooling Ecosystem" },
      { title: "8. How to Use This Manual" },
    ],
  },
  {
    partNo: 1,
    name: "Foundations",
    items: [
      { title: "9. Introduction to Playwright" },
      { title: "10. Environment Setup" },
      { title: "11. Playwright Architecture" },
      { title: "12. First Script" },
    ],
  },
  {
    partNo: 2,
    name: "Core Interactions",
    items: [
      { title: "13. Locators Deep Dive" },
      { title: "14. Actions" },
      { title: "15. Assertions with expect()" },
      { title: "16. Waits & Auto-waiting" },
      { title: "17. Tabs, Windows, iFrames" },
      { title: "18. File Uploads & Downloads" },
      { title: "19. Alerts, Dialogs, Popups" },
    ],
  },
  {
    partNo: 3,
    name: "Test Structure & Framework",
    items: [
      { title: "20. Pytest Basics for Playwright" },
      { title: "21. Fixtures Deep Dive" },
      { title: "22. Test Organization" },
      { title: "23. Page Object Model (POM)" },
      { title: "24. Configuration Management" },
      { title: "25. Test Data Management" },
    ],
  },
  {
    partNo: 4,
    name: "Advanced Techniques",
    items: [
      { title: "26. Network Interception & Mocking" },
      { title: "27. API Testing with Playwright" },
      { title: "28. Component Testing" },
      { title: "29. Visual & Accessibility Testing" },
      { title: "30. Authentication & Session Reuse" },
      { title: "31. Shadow DOM & Complex Components" },
      { title: "32. Parallel Execution & Sharding" },
      { title: "33. Cross-browser & Cross-device Testing" },
      { title: "34. Localization / i18n Testing" },
      { title: "35. Debugging Tools" },
      { title: "36. UI Mode" },
      { title: "37. Trace Viewer & Post-Mortem Debugging" },
      { title: "38. Flaky Test Management" },
    ],
  },
  {
    partNo: 5,
    name: "CI/CD & Reporting",
    items: [
      { title: "39. CI/CD Integration" },
      { title: "40. Test Reporting" },
      { title: "41. Dockerizing Playwright Tests" },
      { title: "42. Logging & Error Handling" },
    ],
  },
  {
    partNo: 6,
    name: "Pro-Level Practices",
    items: [
      { title: "43. Building a Scalable Framework from Scratch" },
      { title: "44. Managing Test Suites at Scale" },
      { title: "45. Code Review & Best Practices" },
      { title: "46. Performance Considerations" },
    ],
  },
  {
    partNo: 7,
    name: "Real-World Project & Job Readiness",
    items: [
      { title: "47. Real-World Capstone Project" },
      { title: "48. Portfolio Building" },
      { title: "49. Interview Prep" },
      { title: "50. Career Positioning" },
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
      { title: "60. Comparison & Decision-Making References" },
      { title: "61. Glossary of Terms" },
      { title: "62. Sample Data & Practice Sites" },
      { title: "63. Quick-Reference Cheat Sheet" },
    ],
  }
];
