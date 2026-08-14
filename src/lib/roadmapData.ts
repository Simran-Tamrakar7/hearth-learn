export interface RoadmapNode {
  num: string;
  title: string;
  time: string;
  type: "Chapter" | "Guide" | "Checkpoint";
  level: "Beginner" | "Mid" | "Advanced";
  chapterIndex?: number;
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
      { num: "01", title: "What is Playwright, Really", time: "Day 1", type: "Chapter", level: "Beginner", chapterIndex: 0 },
      { num: "02", title: "Where Playwright is Used", time: "~30 min", type: "Chapter", level: "Beginner", chapterIndex: 1 },
      { num: "03", title: "What Playwright Can Do", time: "~35 min", type: "Chapter", level: "Beginner", chapterIndex: 2 },
      { num: "04", title: "Why Companies Choose Playwright Over Alternatives", time: "~30 min", type: "Chapter", level: "Beginner", chapterIndex: 3 },
      { num: "05", title: "What This Manual Will NOT Cover", time: "~20 min", type: "Chapter", level: "Beginner", chapterIndex: 4 },
    ],
  },
  {
    id: "p1",
    phaseNum: "02",
    title: "Part 1 · Foundations",
    stepCount: "5 steps",
    nodes: [
      { num: "06", title: "Introduction to Playwright", time: "Week 1", type: "Chapter", level: "Beginner", chapterIndex: 5 },
      { num: "07", title: "Environment Setup", time: "~45 min", type: "Chapter", level: "Beginner", chapterIndex: 6 },
      { num: "08", title: "Playwright Architecture", time: "~40 min", type: "Chapter", level: "Beginner", chapterIndex: 7 },
      { num: "09", title: "First Script", time: "~45 min", type: "Chapter", level: "Beginner", chapterIndex: 8 },
      { num: "10", title: "Checkpoint · Foundations", time: "~25 min", type: "Checkpoint", level: "Beginner", chapterIndex: 9 },
    ],
  },
  {
    id: "p2",
    phaseNum: "03",
    title: "Part 2 · Core Interactions",
    stepCount: "8 steps",
    nodes: [
      { num: "11", title: "Locators Deep Dive", time: "~60 min", type: "Chapter", level: "Mid", chapterIndex: 10 },
      { num: "12", title: "Actions", time: "~45 min", type: "Chapter", level: "Mid", chapterIndex: 11 },
      { num: "13", title: "Assertions with expect()", time: "~40 min", type: "Chapter", level: "Mid", chapterIndex: 12 },
      { num: "14", title: "Waits & Auto-waiting", time: "~40 min", type: "Chapter", level: "Mid", chapterIndex: 13 },
      { num: "15", title: "Tabs, Windows, iFrames", time: "~40 min", type: "Chapter", level: "Mid", chapterIndex: 14 },
      { num: "16", title: "File Uploads & Downloads", time: "~35 min", type: "Chapter", level: "Mid", chapterIndex: 15 },
      { num: "17", title: "Alerts, Dialogs, Popups", time: "~35 min", type: "Chapter", level: "Mid", chapterIndex: 16 },
      { num: "18", title: "Checkpoint · Core Interactions", time: "~25 min", type: "Checkpoint", level: "Mid", chapterIndex: 17 },
    ],
  },
  {
    id: "p3",
    phaseNum: "04",
    title: "Part 3 · Test Structure & Framework",
    stepCount: "5 steps",
    nodes: [
      { num: "19", title: "Pytest Basics for Playwright", time: "~50 min", type: "Chapter", level: "Mid", chapterIndex: 18 },
      { num: "20", title: "Test Organization", time: "~40 min", type: "Chapter", level: "Mid", chapterIndex: 19 },
      { num: "21", title: "Page Object Model (POM)", time: "~55 min", type: "Chapter", level: "Mid", chapterIndex: 20 },
      { num: "22", title: "Configuration Management", time: "~40 min", type: "Chapter", level: "Mid", chapterIndex: 21 },
      { num: "23", title: "Test Data Management", time: "~40 min", type: "Chapter", level: "Mid", chapterIndex: 22 },
    ],
  },
  {
    id: "p3-cp",
    phaseNum: "05",
    title: "Part 3 · Framework Checkpoint",
    stepCount: "1 step",
    nodes: [
      { num: "24", title: "Checkpoint — Framework", time: "~45 min", type: "Checkpoint", level: "Mid", chapterIndex: 23 },
    ],
  },
  {
    id: "p4",
    phaseNum: "06",
    title: "Part 4 · Advanced Techniques",
    stepCount: "8 steps",
    nodes: [
      { num: "25", title: "Network Interception & Mocking", time: "~50 min", type: "Chapter", level: "Advanced", chapterIndex: 24 },
      { num: "26", title: "API Testing with Playwright", time: "~50 min", type: "Chapter", level: "Advanced", chapterIndex: 25 },
      { num: "27", title: "Visual & Accessibility Testing", time: "~45 min", type: "Chapter", level: "Advanced", chapterIndex: 26 },
      { num: "28", title: "Authentication & Session Reuse", time: "~45 min", type: "Chapter", level: "Advanced", chapterIndex: 27 },
      { num: "29", title: "Shadow DOM & Complex Components", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 28 },
      { num: "30", title: "Parallel Execution & Sharding", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 29 },
      { num: "31", title: "Cross-browser & Cross-device Testing", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 30 },
      { num: "32", title: "Debugging Tools", time: "~45 min", type: "Chapter", level: "Advanced", chapterIndex: 31 },
    ],
  },
  {
    id: "p4-cp",
    phaseNum: "07",
    title: "Part 4 · Advanced Checkpoint",
    stepCount: "1 step",
    nodes: [
      { num: "33", title: "Checkpoint — Advanced", time: "~45 min", type: "Checkpoint", level: "Advanced", chapterIndex: 32 },
    ],
  },
  {
    id: "p5",
    phaseNum: "08",
    title: "Part 5 · CI/CD & Reporting",
    stepCount: "4 steps",
    nodes: [
      { num: "34", title: "CI/CD Integration", time: "~50 min", type: "Chapter", level: "Advanced", chapterIndex: 33 },
      { num: "35", title: "Test Reporting", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 34 },
      { num: "36", title: "Dockerizing Playwright Tests", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 35 },
      { num: "37", title: "Logging & Error Handling", time: "~35 min", type: "Chapter", level: "Advanced", chapterIndex: 36 },
    ],
  },
  {
    id: "p5-cp",
    phaseNum: "09",
    title: "Part 5 · CI/CD Checkpoint",
    stepCount: "1 step",
    nodes: [
      { num: "38", title: "Checkpoint — CI/CD", time: "~45 min", type: "Checkpoint", level: "Advanced", chapterIndex: 37 },
    ],
  },
  {
    id: "p6",
    phaseNum: "10",
    title: "Part 6 · Pro-Level Practices",
    stepCount: "4 steps",
    nodes: [
      { num: "39", title: "Building a Scalable Framework from Scratch", time: "~60 min", type: "Chapter", level: "Advanced", chapterIndex: 38 },
      { num: "40", title: "Managing Test Suites at Scale", time: "~45 min", type: "Chapter", level: "Advanced", chapterIndex: 39 },
      { num: "41", title: "Code Review & Best Practices", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 40 },
      { num: "42", title: "Performance Considerations", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 41 },
    ],
  },
  {
    id: "p6-cp",
    phaseNum: "11",
    title: "Part 6 · Pro Practices Checkpoint",
    stepCount: "1 step",
    nodes: [
      { num: "43", title: "Checkpoint — Pro Practices", time: "~45 min", type: "Checkpoint", level: "Advanced", chapterIndex: 42 },
    ],
  },
  {
    id: "p7",
    phaseNum: "12",
    title: "Part 7 · Real-World Project & Job Readiness",
    stepCount: "4 steps",
    nodes: [
      { num: "44", title: "Real-World Capstone Project", time: "~90 min", type: "Chapter", level: "Advanced", chapterIndex: 43 },
      { num: "45", title: "Portfolio Building", time: "~45 min", type: "Chapter", level: "Advanced", chapterIndex: 44 },
      { num: "46", title: "Interview Prep", time: "~50 min", type: "Chapter", level: "Advanced", chapterIndex: 45 },
      { num: "47", title: "Career Positioning", time: "~40 min", type: "Chapter", level: "Advanced", chapterIndex: 46 },
    ],
  },
  {
    id: "p7-cp",
    phaseNum: "13",
    title: "Part 7 · Job Ready Checkpoint",
    stepCount: "1 step",
    nodes: [
      { num: "48", title: "Checkpoint — Job Ready", time: "~45 min", type: "Checkpoint", level: "Advanced", chapterIndex: 47 },
    ],
  },
  {
    id: "p8",
    phaseNum: "14",
    title: "Part 8 · Resources & Ecosystem",
    stepCount: "13 steps",
    nodes: [
      { num: "49", title: "Books & Long-Form Reading", time: "~20 min", type: "Guide", level: "Mid", chapterIndex: 48 },
      { num: "50", title: "Blogs & Written Tutorials", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 49 },
      { num: "51", title: "Newsletters", time: "~10 min", type: "Guide", level: "Mid", chapterIndex: 50 },
      { num: "52", title: "Podcasts", time: "~10 min", type: "Guide", level: "Mid", chapterIndex: 51 },
      { num: "53", title: "Courses & Structured Learning Platforms", time: "~20 min", type: "Guide", level: "Mid", chapterIndex: 52 },
      { num: "54", title: "Certifications", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 53 },
      { num: "55", title: "Conferences & Talks", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 54 },
      { num: "56", title: "Social & Real-Time Communities", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 55 },
      { num: "57", title: "Browser Extensions & Developer Tools", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 56 },
      { num: "58", title: "Comparison & Decision-Making References", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 57 },
      { num: "59", title: "Glossary of Terms", time: "~20 min", type: "Guide", level: "Mid", chapterIndex: 58 },
      { num: "60", title: "Sample Data & Practice Sites", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 59 },
      { num: "61", title: "Staying Plugged Into the Ecosystem", time: "~15 min", type: "Guide", level: "Mid", chapterIndex: 60 },
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
