export interface CustomField {
  id: string;
  label: string;
  value: string;
  type: "callout" | "code" | "text" | "bullet";
}

export interface MasterChapter {
  id: string;
  partIndex: string;
  partTitle: string;
  order: number;
  slug: string;
  title: string;
  estimatedMinutes: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Pro" | "Reference";
  summary: string;
  contentMarkdown: string;
  codeSnippet?: string;
  codeSnippetLabel?: string;
  whyBother?: string;
  whatYoullLearn?: string[];
  keyTakeaways?: string[];
  customFields?: CustomField[];
  exercise?: {
    prompt: string;
    starterCode: string;
    solutionCode: string;
  };
}

export const PLAYWRIGHT_MASTER_PARTS = [
  { id: "part-0", title: "Part 0 · Background & Context", totalTime: "~120 mins" },
  { id: "part-1", title: "Part 1 · Foundations", totalTime: "~150 mins" },
  { id: "part-2", title: "Part 2 · Core Interactions & Function Reference", totalTime: "~360 mins" },
  { id: "part-3", title: "Part 3 · Test Structure & Framework", totalTime: "~280 mins" },
  { id: "part-4", title: "Part 4 · Advanced Techniques", totalTime: "~320 mins" },
  { id: "part-5", title: "Part 5 · CI/CD & Reporting", totalTime: "~240 mins" },
  { id: "part-6", title: "Part 6 · Pro-Level Practices", totalTime: "~220 mins" },
  { id: "part-7", title: "Part 7 · Real-World Project & Job Readiness", totalTime: "~300 mins" },
  { id: "part-8", title: "Part 8 · Resources & Reference Library", totalTime: "~180 mins" },
];

export const PLAYWRIGHT_MASTER_CHAPTERS: MasterChapter[] = [
  {
    id: "pw-0-what",
    partIndex: "part-0",
    partTitle: "Part 0 · Background & Context",
    order: 1,
    slug: "what-is-playwright-really",
    title: "What is Playwright, Really?",
    estimatedMinutes: 20,
    level: "Beginner",
    summary: "History, Microsoft backing, and gaps in legacy tools (Selenium/Puppeteer).",
    whatYoullLearn: [
      "Why Playwright was created by the original Puppeteer team",
      "CDP & WebSocket bi-directional driver architecture",
      "Why Microsoft backing guarantees enterprise stability",
    ],
    whyBother:
      "Different projects need different Playwright/pytest versions. Playwright runs out-of-process via WebSockets so you never manage manual HTTP drivers or sleep delays.",
    contentMarkdown: `### History — built by Microsoft, evolved from the Puppeteer team
Playwright's origin story matters more than it seems on the surface. The core engineers who built Playwright — most notably Andrey Lushnikov, Pavel Feldman, and Boris Yankov — were previously on the team at Google that built and maintained Puppeteer, the Node.js library for controlling headless Chrome. When they moved to Microsoft, they took everything they'd learned from Puppeteer's limitations and built something new instead of iterating on the old codebase.

This "second attempt by the same people" origin is why Playwright feels less like a patched-together tool and more like a deliberately designed one. Puppeteer was built specifically for Chrome/Chromium via Chrome DevTools Protocol (CDP). Playwright was designed from day one to solve cross-browser testing across Chromium, Firefox, and WebKit through a single API.

### Open-source, actively maintained, backed by Microsoft
Playwright is MIT-licensed and fully open-source on GitHub. "Backed by Microsoft" means:
- A dedicated, funded engineering team (not a side project maintained by volunteers in their spare time)
- A fast release cadence — new minor versions ship roughly every 2–4 weeks.
- Integration hooks with the broader Microsoft dev ecosystem (VS Code extension, Azure DevOps pipeline support).

### Why it was created (gaps in Selenium/Puppeteer)
Three concrete gaps drove Playwright's creation:
1. **Selenium's flakiness problem**: Manual wait management leads to flaky tests.
2. **Puppeteer's Chrome-only limitation**: Lacked native multi-browser support.
3. **Poor support for modern web patterns**: SPAs, shadow DOM, dynamic async requests.`,
    codeSnippetLabel: "LAUNCH HEADLESS PLAYWRIGHT IN PYTHON",
    codeSnippet: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://playwright.dev")
    print("Title:", page.title())
    browser.close()`,
    customFields: [
      {
        id: "field-1",
        label: "INTERVIEW PRO-TIP",
        value: "Mention that Playwright's CDP bi-directional architecture eliminates HTTP wire protocol latencies.",
        type: "callout",
      },
    ],
  },
  {
    id: "pw-1-setup",
    partIndex: "part-1",
    partTitle: "Part 1 · Foundations",
    order: 2,
    slug: "environment-setup",
    title: "Environment Setup (Python, pip, and venv)",
    estimatedMinutes: 35,
    level: "Beginner",
    summary: "Python venv, pip install pytest-playwright, and browser installation.",
    whatYoullLearn: [
      "Always use a virtual environment",
      "pip install vs playwright install",
      "Starter project layout",
    ],
    whyBother:
      "Different projects need different Playwright/pytest versions. Global installs become painful version conflicts. Get the habit now.",
    contentMarkdown: `### Python, pip, and virtual environments
Assuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment.

### Installing Playwright + browser binaries
Two separate steps that beginners often miss:
1. \`pip install pytest-playwright\`: Installs the Python API package.
2. \`playwright install --with-deps\`: Downloads the pinned browser binaries (Chromium, Firefox, WebKit).`,
    codeSnippetLabel: "CREATE AND ACTIVATE A VENV",
    codeSnippet: `python -m venv venv
source venv/bin/activate    # Mac/Linux
venv\\Scripts\\activate      # Windows

pip install pytest-playwright
playwright install --with-deps`,
    customFields: [
      {
        id: "field-2",
        label: "STARTER LAYOUT NOTES",
        value: "Keep tests/, pages/, conftest.py, and pytest.ini at the root level.",
        type: "text",
      },
    ],
  },
];
