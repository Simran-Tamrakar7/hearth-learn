import type { ChapterRecord } from "../../types";

/** 34. Portfolio Building */
export const chapter = {
  "id": "pw-7-portfolio",
  "title": "34. Portfolio Building",
  "minutes": 45,
  "level": "pro",
  "phase": "Part 7 · Real-World Project & Job Readiness",
  "partName": "Part 7 · Real-World Project & Job Readiness",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "Structuring a GitHub repo for recruiters your-playwright-framework/ ├── .github/workflows/playwright.yml ├── pages/ ├── tests/ ├── utils/ ├── config/ ├── conftest.py ├── pytest.ini ├── requirements.txt ├── README.md └── docs/ └── architecture.md Pointers: A recruiter or hiring manager typically skims a repo for under a minute before deciding whether to look closer — a clean, familiar structure (ma\n\n## GitHub repo for recruiters\n\nyour-playwright-framework/\n\n├── .github/workflows/playwright.yml\n\n├── pages/\n\n├── tests/\n\n├── utils/\n\n├── config/\n\n├── conftest.py\n\n├── pytest.ini\n\n├── requirements.txt\n\n├── README.md\n\n└── docs/\n\n└── architecture.md\n\nPointers: A recruiter or hiring manager typically skims a repo for under a minute before deciding whether to look closer — a clean, familiar structure (matching the enterprise-grade layout from Chapter 29) signals competence immediately, before they've read a single line of actual test code.\n\n## Writing a README that showcases the framework\n\nA strong README answers, in order: what this project demonstrates, how to run it, and why it's built the way it is — not just \"how to run tests.\"\n\nA full-stack UI + API test automation framework built with Playwright and pytest,\n\ndemonstrating Page Object Model architecture, CI/CD integration, and\n\ncombined UI/API validation.\n\n- Page Object Model with a shared base page\n\n- Auth session reuse via storage_state (fast, no repeated logins)\n\n- Combined UI + API testing for full-stack validation\n\n- GitHub Actions CI pipeline with HTML reporting\n\n- Data-driven tests via pytest parametrize\n\n```\n# Playwright + Python Test Automation Framework\n\n## What this demonstrates\n\n## Running locally\n```\n\n## 3. `pytest --browser chromium --html=report.html`\n\nSee `docs/architecture.md` for folder structure and design decisions.\n\nPointers: Explicitly naming the patterns demonstrated (POM, session reuse, CI integration) in the README does real work — it's often the first and only place a time-pressed reviewer looks to judge whether you understand the \"why,\" not just the \"how.\"\n\n```\n## Architecture\n```\n\n## Recording a short demo walkthrough\n\nA 2–3 minute screen recording showing: the suite running in the terminal, a quick look at the folder structure, and maybe the HTML/Allure report it produces.\n\nPointers: This is a low-effort, high-impact addition — most candidate repos don't include one, so it's a genuine differentiator, and it lets a reviewer \"see it work\" without needing to clone and set the project up themselves.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
