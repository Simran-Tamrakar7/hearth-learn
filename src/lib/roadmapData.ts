export interface RoadmapNode {
  num: string;
  title: string;
  time: string;
  type: "Chapter" | "Guide" | "Checkpoint";
  level: "Beginner" | "Mid" | "Advanced";
  chapterIndex?: number;
  description?: string;
  keyObjective?: string;
}

export interface RoadmapPhase {
  id: string;
  phaseNum: string;
  title: string;
  stepCount: string;
  nodes: RoadmapNode[];
}

export const PLAYWRIGHT_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    id: "p0",
    phaseNum: "01",
    title: "Part 0 · Background",
    stepCount: "5 steps",
    nodes: [
      {
        num: "01",
        title: "What is Playwright, Really",
        time: "Day 1",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 0,
        description: "Core architecture principles of Playwright's CDP / WebSocket engine.",
        keyObjective: "Understand single-pipe WebSocket browser context isolation.",
      },
      {
        num: "02",
        title: "Where Playwright is Used",
        time: "~30 min",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 1,
        description: "Enterprise adoption patterns across modern tech stacks.",
        keyObjective: "Analyze industry case studies & regression test suits.",
      },
      {
        num: "03",
        title: "What Playwright Can Do",
        time: "~35 min",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 2,
        description: "Comprehensive capability overview: UI, API, Visual, and Network Interception.",
        keyObjective: "Master the multi-browser & mobile emulation engine.",
      },
      {
        num: "04",
        title: "Why Companies Choose Playwright Over Alternatives",
        time: "~30 min",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 3,
        description: "Comparative benchmark: Playwright vs Cypress vs Selenium vs Puppeteer.",
        keyObjective: "Evaluate auto-waiting, parallel execution speed & zero-flakiness.",
      },
      {
        num: "05",
        title: "What This Manual Will NOT Cover",
        time: "~20 min",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 4,
        description: "Scope boundaries & prerequisites.",
        keyObjective: "Align expectations on manual scope & foundational JS/TS prerequisites.",
      },
    ],
  },
  {
    id: "p1",
    phaseNum: "02",
    title: "Part 1 · Foundations",
    stepCount: "5 steps",
    nodes: [
      {
        num: "06",
        title: "Introduction to Playwright",
        time: "Week 1",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 5,
        description: "Getting started with node.js & Playwright test runner.",
        keyObjective: "Initialize your first npm playwright project environment.",
      },
      {
        num: "07",
        title: "Environment Setup",
        time: "~45 min",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 6,
        description: "CLI setup, browser binaries installation & vscode extension.",
        keyObjective: "Configure npx playwright install and VS Code extension tooling.",
      },
      {
        num: "08",
        title: "Playwright Architecture",
        time: "~40 min",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 7,
        description: "Browser, BrowserContext, and Page objects hierarchy.",
        keyObjective: "Master the 3-level isolation hierarchy for parallel execution.",
      },
      {
        num: "09",
        title: "First Script",
        time: "~45 min",
        type: "Chapter",
        level: "Beginner",
        chapterIndex: 8,
        description: "Writing and running your first automated test script.",
        keyObjective: "Write page.goto(), locator click, and expect assertions.",
      },
      {
        num: "10",
        title: "Checkpoint · Foundations",
        time: "~25 min",
        type: "Checkpoint",
        level: "Beginner",
        chapterIndex: 9,
        description: "Interactive assessment of foundational concepts.",
        keyObjective: "Verify setup, architecture knowledge, and first script execution.",
      },
    ],
  },
  {
    id: "p2",
    phaseNum: "03",
    title: "Part 2 · Core Interactions",
    stepCount: "8 steps",
    nodes: [
      {
        num: "11",
        title: "Locators Deep Dive",
        time: "~60 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 10,
        description: "Role, Text, Label, Placeholder, and CSS/XPath selectors.",
        keyObjective: "Master getByRole, getByText, getByTestId locator strategies.",
      },
      {
        num: "12",
        title: "Actions",
        time: "~45 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 11,
        description: "Click, Type, Fill, Check, Select, Press, Hover & Drag.",
        keyObjective: "Perform resilient user interactions with automatic actionability checks.",
      },
      {
        num: "13",
        title: "Assertions with expect()",
        time: "~40 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 12,
        description: "Web-first retrying assertions.",
        keyObjective: "Write expect(locator).toBeVisible() retrying assertions.",
      },
      {
        num: "14",
        title: "Waits & Auto-waiting",
        time: "~40 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 13,
        description: "Playwright auto-waiting algorithm vs hard sleeps.",
        keyObjective: "Eliminate flaky tests with automatic actionability checks.",
      },
      {
        num: "15",
        title: "Tabs, Windows, iFrames",
        time: "~40 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 14,
        description: "Handling multi-page popups and embedded frameLocators.",
        keyObjective: "Handle context.waitForEvent('page') and page.frameLocator().",
      },
      {
        num: "16",
        title: "File Uploads & Downloads",
        time: "~35 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 15,
        description: "Handling file input setFiles() and page.waitForEvent('download').",
        keyObjective: "Automate file uploads and verify downloaded attachments.",
      },
      {
        num: "17",
        title: "Alerts, Dialogs, Popups",
        time: "~35 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 16,
        description: "Native browser dialog listeners (page.on('dialog')).",
        keyObjective: "Accept/dismiss JS alerts, prompts, and modal dialogs.",
      },
      {
        num: "18",
        title: "Checkpoint · Core Interactions",
        time: "~25 min",
        type: "Checkpoint",
        level: "Mid",
        chapterIndex: 17,
        description: "Practical assessment of locators, actions, and assertions.",
        keyObjective: "Build a complete end-to-end user journey test script.",
      },
    ],
  },
  {
    id: "p3",
    phaseNum: "04",
    title: "Part 3 · Test Structure & Framework",
    stepCount: "5 steps",
    nodes: [
      {
        num: "19",
        title: "Pytest Basics for Playwright",
        time: "~50 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 18,
        description: "Using Playwright with Python Pytest test runner plugin.",
        keyObjective: "Utilize pytest fixtures for page & browser context.",
      },
      {
        num: "20",
        title: "Test Organization",
        time: "~40 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 19,
        description: "Grouping tests with test.describe and step hooks.",
        keyObjective: "Organize test suites with clean hooks & describe blocks.",
      },
      {
        num: "21",
        title: "Page Object Model (POM)",
        time: "~55 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 20,
        description: "Designing reusable object-oriented Page Classes.",
        keyObjective: "Decouple locator selectors from test assertion logic.",
      },
      {
        num: "22",
        title: "Configuration Management",
        time: "~40 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 21,
        description: "playwright.config.ts multi-project setup & environment vars.",
        keyObjective: "Configure baseURL, trace modes, screenshots, and timeouts.",
      },
      {
        num: "23",
        title: "Test Data Management",
        time: "~40 min",
        type: "Chapter",
        level: "Mid",
        chapterIndex: 22,
        description: "JSON fixtures, factories, and synthetic test data generators.",
        keyObjective: "Manage dynamic test datasets with zero data pollution.",
      },
    ],
  },
  {
    id: "p3-cp",
    phaseNum: "05",
    title: "Part 3 · Framework Checkpoint",
    stepCount: "1 step",
    nodes: [
      {
        num: "24",
        title: "Checkpoint — Framework",
        time: "~45 min",
        type: "Checkpoint",
        level: "Mid",
        chapterIndex: 23,
        description: "Assessment of Page Object Model & Test Config.",
        keyObjective: "Refactor a monolithic script into a clean POM framework.",
      },
    ],
  },
  {
    id: "p4",
    phaseNum: "06",
    title: "Part 4 · Advanced Techniques",
    stepCount: "8 steps",
    nodes: [
      {
        num: "25",
        title: "Network Interception & Mocking",
        time: "~50 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 24,
        description: "page.route() network mocking & API response fulfillment.",
        keyObjective: "Intercept REST endpoints and fulfill custom JSON payloads.",
      },
      {
        num: "26",
        title: "API Testing with Playwright",
        time: "~50 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 25,
        description: "Using request.get() and request.post() for direct HTTP testing.",
        keyObjective: "Validate REST API status codes, headers, and JSON schemas.",
      },
      {
        num: "27",
        title: "Visual & Accessibility Testing",
        time: "~45 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 26,
        description: "toHaveScreenshot() visual diffing & axe-core accessibility audits.",
        keyObjective: "Prevent UI regressions with pixel diffing & WCAG audits.",
      },
      {
        num: "28",
        title: "Authentication & Session Reuse",
        time: "~45 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 27,
        description: "Bypassing repetitive login with storageState auth reuse.",
        keyObjective: "Save & reuse authentication cookies across test suites.",
      },
      {
        num: "29",
        title: "Shadow DOM & Complex Components",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 28,
        description: "Piercing open/closed Shadow DOM roots effortlessly.",
        keyObjective: "Locate elements inside complex Web Components & Shadow DOM.",
      },
      {
        num: "30",
        title: "Parallel Execution & Sharding",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 29,
        description: "Running tests across multiple worker processes & CI shards.",
        keyObjective: "Scale test execution speed with 4x worker concurrency.",
      },
      {
        num: "31",
        title: "Cross-browser & Cross-device Testing",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 30,
        description: "Testing on Chromium, Firefox, WebKit, and mobile viewports.",
        keyObjective: "Verify web application responsiveness on iPhone & Pixel viewports.",
      },
      {
        num: "32",
        title: "Debugging Tools",
        time: "~45 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 31,
        description: "Playwright Inspector, Trace Viewer & Codegen tool.",
        keyObjective: "Inspect step execution timeline using npx playwright show-trace.",
      },
    ],
  },
  {
    id: "p4-cp",
    phaseNum: "07",
    title: "Part 4 · Advanced Checkpoint",
    stepCount: "1 step",
    nodes: [
      {
        num: "33",
        title: "Checkpoint — Advanced",
        time: "~45 min",
        type: "Checkpoint",
        level: "Advanced",
        chapterIndex: 32,
        description: "Assessment of Network Mocking & StorageState.",
        keyObjective: "Mock slow third-party APIs and verify visual diffing.",
      },
    ],
  },
  {
    id: "p5",
    phaseNum: "08",
    title: "Part 5 · CI/CD & Reporting",
    stepCount: "4 steps",
    nodes: [
      {
        num: "34",
        title: "CI/CD Integration",
        time: "~50 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 33,
        description: "GitHub Actions workflow YAML automation for PR checks.",
        keyObjective: "Build a GitHub Actions workflow to run tests on pull requests.",
      },
      {
        num: "35",
        title: "Test Reporting",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 34,
        description: "HTML reporter, Allure reports, and Slack notification webhooks.",
        keyObjective: "Publish interactive HTML reports with video & trace links.",
      },
      {
        num: "36",
        title: "Dockerizing Playwright Tests",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 35,
        description: "Running tests inside official mcr.microsoft.com/playwright Docker images.",
        keyObjective: "Guarantee 100% reproducible test environment in Docker.",
      },
      {
        num: "37",
        title: "Logging & Error Handling",
        time: "~35 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 36,
        description: "Structured Winston/Pino logging and screenshot failure attachments.",
        keyObjective: "Capture precise stack traces and DOM snapshots on test failures.",
      },
    ],
  },
  {
    id: "p5-cp",
    phaseNum: "09",
    title: "Part 5 · CI/CD Checkpoint",
    stepCount: "1 step",
    nodes: [
      {
        num: "38",
        title: "Checkpoint — CI/CD",
        time: "~45 min",
        type: "Checkpoint",
        level: "Advanced",
        chapterIndex: 37,
        description: "Assessment of CI/CD Pipelines & Docker Containers.",
        keyObjective: "Verify automated test runs on GitHub Actions CI.",
      },
    ],
  },
  {
    id: "p6",
    phaseNum: "10",
    title: "Part 6 · Pro-Level Practices",
    stepCount: "4 steps",
    nodes: [
      {
        num: "39",
        title: "Building a Scalable Framework from Scratch",
        time: "~60 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 38,
        description: "Architecting an enterprise-grade QA Automation core library.",
        keyObjective: "Design modular helper utilities, custom matchers, and reporter plugins.",
      },
      {
        num: "40",
        title: "Managing Test Suites at Scale",
        time: "~45 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 39,
        description: "Handling 10,000+ test cases across microservice teams.",
        keyObjective: "Implement test tags (@smoke, @regression) & dynamic suite filtering.",
      },
      {
        num: "41",
        title: "Code Review & Best Practices",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 40,
        description: "Code review checklist for automation test PRs.",
        keyObjective: "Enforce strict coding standards & eliminate flaky test anti-patterns.",
      },
      {
        num: "42",
        title: "Performance Considerations",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 41,
        description: "Optimizing memory usage and browser context disposal speeds.",
        keyObjective: "Reduce total suite runtime by 60% through aggressive caching.",
      },
    ],
  },
  {
    id: "p6-cp",
    phaseNum: "11",
    title: "Part 6 · Pro Practices Checkpoint",
    stepCount: "1 step",
    nodes: [
      {
        num: "43",
        title: "Checkpoint — Pro Practices",
        time: "~45 min",
        type: "Checkpoint",
        level: "Advanced",
        chapterIndex: 42,
        description: "Assessment of Enterprise Architecture & Scalability.",
        keyObjective: "Perform a code review audit on legacy automation scripts.",
      },
    ],
  },
  {
    id: "p7",
    phaseNum: "12",
    title: "Part 7 · Real-World Project & Job Readiness",
    stepCount: "4 steps",
    nodes: [
      {
        num: "44",
        title: "Real-World Capstone Project",
        time: "~90 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 43,
        description: "Building an end-to-end test framework for a live SaaS product.",
        keyObjective: "Deploy a complete CI-backed Playwright framework on GitHub.",
      },
      {
        num: "45",
        title: "Portfolio Building",
        time: "~45 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 44,
        description: "Formatting your GitHub repository & documentation for recruiters.",
        keyObjective: "Create a standout README with badges, architecture diagrams & live reports.",
      },
      {
        num: "46",
        title: "Interview Prep",
        time: "~50 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 45,
        description: "Top 50 Senior QA / SDET technical interview questions & live coding tasks.",
        keyObjective: "Ace technical interview questions on Playwright, async JS, and architecture.",
      },
      {
        num: "47",
        title: "Career Positioning",
        time: "~40 min",
        type: "Chapter",
        level: "Advanced",
        chapterIndex: 46,
        description: "Positioning yourself as a high-value SDET / Test Automation Lead.",
        keyObjective: "Craft your resume and LinkedIn profile for senior automation roles.",
      },
    ],
  },
  {
    id: "p7-cp",
    phaseNum: "13",
    title: "Part 7 · Job Ready Checkpoint",
    stepCount: "1 step",
    nodes: [
      {
        num: "48",
        title: "Checkpoint — Job Ready",
        time: "~45 min",
        type: "Checkpoint",
        level: "Advanced",
        chapterIndex: 47,
        description: "Final capstone review & portfolio audit.",
        keyObjective: "Complete mock technical interview & receive job-ready certification.",
      },
    ],
  },
  {
    id: "p8",
    phaseNum: "14",
    title: "Part 8 · Resources & Ecosystem",
    stepCount: "13 steps",
    nodes: [
      { num: "49", title: "Books & Long-Form Reading", time: "~20 min", type: "Guide", level: "Mid", chapterIndex: 48, description: "Essential SDET books on testing patterns.", keyObjective: "Read recommended software testing & architecture books." },
      { num: "50", title: "Blogs & Written Tutorials", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 49, description: "Top Playwright engineering blogs & articles.", keyObjective: "Follow official Microsoft Playwright release notes." },
      { num: "51", title: "Newsletters", time: "~10 min", type: "Guide", level: "Mid", chapterIndex: 50, description: "Weekly test automation newsletters.", keyObjective: "Subscribe to QA automation weekly digests." },
      { num: "52", title: "Podcasts", time: "~10 min", type: "Guide", level: "Mid", chapterIndex: 51, description: "Audio interviews with top SDET leads.", keyObjective: "Listen to test automation podcast episodes." },
      { num: "53", title: "Courses & Structured Learning Platforms", time: "~20 min", type: "Guide", level: "Mid", chapterIndex: 52, description: "Curated online learning tracks.", keyObjective: "Explore supplementary deep-dive video courses." },
      { num: "54", title: "Certifications", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 53, description: "Recognized QA automation certifications.", keyObjective: "Prepare for official automation engineering certifications." },
      { num: "55", title: "Conferences & Talks", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 54, description: "Recorded talks from Playwright Conf.", keyObjective: "Watch keynote presentations from core maintainers." },
      { num: "56", title: "Social & Real-Time Communities", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 55, description: "Discord, Slack, and Reddit automation channels.", keyObjective: "Join real-time Playwright Discord & Slack channels." },
      { num: "57", title: "Browser Extensions & Developer Tools", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 56, description: "Chrome extensions for test generation.", keyObjective: "Use locator generator extensions to speed up dev." },
      { num: "58", title: "Comparison & Decision-Making References", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 57, description: "Architectural decision trees for framework migration.", keyObjective: "Use decision matrix when evaluating framework migrations." },
      { num: "59", title: "Glossary of Terms", time: "~20 min", type: "Guide", level: "Mid", chapterIndex: 58, description: "Comprehensive SDET & Playwright vocabulary.", keyObjective: "Master core testing terminology & definitions." },
      { num: "60", title: "Sample Data & Practice Sites", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 59, description: "Mock e-commerce, CRM, and banking test targets.", keyObjective: "Practice locator scripting on live sandbox sites." },
      { num: "61", title: "Staying Plugged Into the Ecosystem", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 60, description: "Continuous learning & community contribution.", keyObjective: "Contribute to open-source Playwright plugins & tools." },
    ],
  },
];

export function downloadRoadmapSVG() {
  const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1600" width="100%" height="100%" style="background-color: #1C2A26; font-family: system-ui, -apple-system, sans-serif;">
  <defs>
    <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D97706" />
      <stop offset="100%" stop-color="#F59E0B" />
    </linearGradient>
  </defs>

  <!-- Header -->
  <rect x="40" y="40" width="1120" height="140" rx="24" fill="url(#headerGrad)" />
  <text x="80" y="95" fill="#FFFFFF" font-size="36" font-weight="bold">Playwright Automation Learning Roadmap</text>
  <text x="80" y="135" fill="#FEF3C7" font-size="20">8.5 Hours Total · 61 Nodes across 14 Phases · Hearth Learning Manuals</text>

  <!-- Legend -->
  <rect x="40" y="200" width="1120" height="60" rx="16" fill="#243530" stroke="#374E47" stroke-width="1.5" />
  <circle cx="80" cy="230" r="8" fill="#10B981" />
  <text x="100" y="235" fill="#A7F3D0" font-size="16" font-weight="bold">Beginner</text>

  <circle cx="240" cy="230" r="8" fill="#F59E0B" />
  <text x="260" y="235" fill="#FDE68A" font-size="16" font-weight="bold">Mid-Level</text>

  <circle cx="400" cy="230" r="8" fill="#8B5CF6" />
  <text x="420" y="235" fill="#DDD6FE" font-size="16" font-weight="bold">Advanced / Pro</text>

  <!-- Phase Grid preview -->
  <text x="60" y="320" fill="#D97706" font-size="22" font-weight="bold">Part 0 · Background (Nodes 01 - 05)</text>
  <rect x="60" y="340" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="380" fill="#FFFFFF" font-size="16">01 What is Playwright | 02 Where Used | 03 Capabilities | 04 Why Alternatives | 05 Scope</text>

  <text x="60" y="450" fill="#D97706" font-size="22" font-weight="bold">Part 1 · Foundations (Nodes 06 - 10)</text>
  <rect x="60" y="470" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="510" fill="#FFFFFF" font-size="16">06 Intro | 07 Setup | 08 Architecture | 09 First Script | 10 Checkpoint Foundations</text>

  <text x="60" y="580" fill="#D97706" font-size="22" font-weight="bold">Part 2 · Core Interactions (Nodes 11 - 18)</text>
  <rect x="60" y="600" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="640" fill="#FFFFFF" font-size="16">11 Locators | 12 Actions | 13 expect() | 14 Auto-waits | 15 iFrames | 16 Uploads | 17 Dialogs | 18 Checkpoint</text>

  <text x="60" y="710" fill="#D97706" font-size="22" font-weight="bold">Part 3 · Test Structure &amp; POM (Nodes 19 - 24)</text>
  <rect x="60" y="730" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="770" fill="#FFFFFF" font-size="16">19 Pytest | 20 Organization | 21 Page Object Model | 22 Config | 23 Test Data | 24 Checkpoint</text>

  <text x="60" y="840" fill="#D97706" font-size="22" font-weight="bold">Part 4 · Advanced Techniques (Nodes 25 - 33)</text>
  <rect x="60" y="860" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="900" fill="#FFFFFF" font-size="16">25 Interception | 26 API Testing | 27 Visual/a11y | 28 Auth Reuse | 29 Shadow DOM | 30 Parallel | 31 Cross-Browser | 32 Debugging | 33 Checkpoint</text>

  <text x="60" y="970" fill="#D97706" font-size="22" font-weight="bold">Part 5 · CI/CD &amp; Docker (Nodes 34 - 38)</text>
  <rect x="60" y="990" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="1030" fill="#FFFFFF" font-size="16">34 CI/CD Pipelines | 35 HTML Reports | 36 Dockerizing Tests | 37 Error Logging | 38 Checkpoint</text>

  <text x="60" y="1100" fill="#D97706" font-size="22" font-weight="bold">Part 6 · Pro Practices &amp; Scalability (Nodes 39 - 43)</text>
  <rect x="60" y="1120" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="1160" fill="#FFFFFF" font-size="16">39 Scalable Framework | 40 Suite Management | 41 Code Review | 42 Performance | 43 Checkpoint</text>

  <text x="60" y="1230" fill="#D97706" font-size="22" font-weight="bold">Part 7 · Capstone &amp; Career Readiness (Nodes 44 - 48)</text>
  <rect x="60" y="1250" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="1290" fill="#FFFFFF" font-size="16">44 Capstone Project | 45 Portfolio | 46 Interview Prep | 47 Career Strategy | 48 Job Ready Checkpoint</text>

  <text x="60" y="1360" fill="#D97706" font-size="22" font-weight="bold">Part 8 · Ecosystem &amp; Resources (Nodes 49 - 61)</text>
  <rect x="60" y="1380" width="1080" height="70" rx="12" fill="#243530" stroke="#D97706" stroke-width="1" />
  <text x="80" y="1420" fill="#FFFFFF" font-size="16">49 Books | 50 Blogs | 51 Newsletters | 52 Podcasts | 53 Courses | 54 Certs | 55 Talks | 56 Communities | 57 DevTools | 58 References | 59 Glossary | 60 Practice | 61 Ecosystem</text>

  <text x="60" y="1530" fill="#8A9B95" font-size="14">Generated by Hearth Manuals · https://hearth-learn.vercel.app/manuals/playwright</text>
</svg>
  `.trim();

  const blob = new Blob([svgContent], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "playwright-roadmap.svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
