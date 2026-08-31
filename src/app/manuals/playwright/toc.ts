/* Playwright manual TOC — ordering only. Content lives in part-N/chapter-M.md */

export const PLAYWRIGHT_TOC_VERSION = 1;

export type PlaywrightTocPart = {
  partNo: number;
  name: string;
  items: { title: string }[];
};

export const PLAYWRIGHT_TOC: PlaywrightTocPart[] = [
  {
    "partNo": 0,
    "name": "Background",
    "items": [
      {
        "title": "0. What is Playwright, Really"
      },
      {
        "title": "1. Where Playwright is Used"
      },
      {
        "title": "2. What Playwright Can Do"
      },
      {
        "title": "3. Why Companies Choose Playwright Over Alternatives"
      },
      {
        "title": "4. What This Manual Will NOT Cover"
      }
    ]
  },
  {
    "partNo": 1,
    "name": "Foundations",
    "items": [
      {
        "title": "1. Introduction to Playwright"
      },
      {
        "title": "2. Environment Setup"
      },
      {
        "title": "3. Playwright Architecture"
      },
      {
        "title": "4. First Script"
      },
      {
        "title": "Checkpoint · Foundations"
      }
    ]
  },
  {
    "partNo": 2,
    "name": "Core Interactions",
    "items": [
      {
        "title": "5. Locators Deep Dive"
      },
      {
        "title": "6. Actions"
      },
      {
        "title": "7. Assertions with expect()"
      },
      {
        "title": "8. Waits & Auto-waiting"
      },
      {
        "title": "9. Tabs, Windows, iFrames"
      },
      {
        "title": "10. File Uploads & Downloads"
      },
      {
        "title": "11. Alerts, Dialogs, Popups"
      },
      {
        "title": "Checkpoint · Core Interactions"
      }
    ]
  },
  {
    "partNo": 3,
    "name": "Test Structure & Framework",
    "items": [
      {
        "title": "12. Pytest Basics for Playwright"
      },
      {
        "title": "13. Test Organization"
      },
      {
        "title": "14. Page Object Model (POM)"
      },
      {
        "title": "15. Configuration Management"
      },
      {
        "title": "16. Test Data Management"
      },
      {
        "title": "Checkpoint — Framework"
      }
    ]
  },
  {
    "partNo": 4,
    "name": "Advanced Techniques",
    "items": [
      {
        "title": "17. Network Interception & Mocking"
      },
      {
        "title": "18. API Testing with Playwright"
      },
      {
        "title": "19. Visual & Accessibility Testing"
      },
      {
        "title": "20. Authentication & Session Reuse"
      },
      {
        "title": "21. Shadow DOM & Complex Components"
      },
      {
        "title": "22. Parallel Execution & Sharding"
      },
      {
        "title": "23. Cross-browser & Cross-device Testing"
      },
      {
        "title": "24. Debugging Tools"
      },
      {
        "title": "Checkpoint — Advanced"
      }
    ]
  },
  {
    "partNo": 5,
    "name": "CI/CD & Reporting",
    "items": [
      {
        "title": "25. CI/CD Integration"
      },
      {
        "title": "26. Test Reporting"
      },
      {
        "title": "27. Dockerizing Playwright Tests"
      },
      {
        "title": "28. Logging & Error Handling"
      },
      {
        "title": "Checkpoint — CI/CD"
      }
    ]
  },
  {
    "partNo": 6,
    "name": "Pro-Level Practices",
    "items": [
      {
        "title": "29. Building a Scalable Framework from Scratch"
      },
      {
        "title": "30. Managing Test Suites at Scale"
      },
      {
        "title": "31. Code Review & Best Practices"
      },
      {
        "title": "32. Performance Considerations"
      },
      {
        "title": "Checkpoint — Pro Practices"
      }
    ]
  },
  {
    "partNo": 7,
    "name": "Real-World Project & Job Readiness",
    "items": [
      {
        "title": "33. Real-World Capstone Project"
      },
      {
        "title": "34. Portfolio Building"
      },
      {
        "title": "35. Interview Prep"
      },
      {
        "title": "36. Career Positioning"
      },
      {
        "title": "Checkpoint — Job Ready"
      }
    ]
  },
  {
    "partNo": 8,
    "name": "Resources",
    "items": [
      {
        "title": "52. Books & Long-Form Reading"
      },
      {
        "title": "53. Blogs & Written Tutorials"
      },
      {
        "title": "54. Newsletters"
      },
      {
        "title": "55. Podcasts"
      },
      {
        "title": "56. Courses & Structured Learning Platforms"
      },
      {
        "title": "57. Certifications"
      },
      {
        "title": "58. Conferences & Talks"
      },
      {
        "title": "59. Social & Real-Time Communities"
      },
      {
        "title": "60. Browser Extensions & Developer Tools"
      },
      {
        "title": "61. Comparison & Decision-Making References"
      },
      {
        "title": "62. Glossary of Terms"
      },
      {
        "title": "63. Sample Data & Practice Sites"
      },
      {
        "title": "64. Staying Plugged Into the Ecosystem"
      }
    ]
  }
];
