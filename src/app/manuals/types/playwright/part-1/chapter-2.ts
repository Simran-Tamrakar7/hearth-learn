import type { ChapterRecord } from "../../../types";

/** 10. Environment Setup */
export const chapter = {
  id: "pw-10-setup",
  title: "10. Environment Setup",
  minutes: 35,
  level: "beginner",
  phase: "Part 1 · Foundations",
  partName: "Part 1 · Foundations",
  overviewText: "Set up Python venv, pip install pytest-playwright, run playwright install for browser binaries, and verify with pytest --headed on a smoke test.",
  why: "Beginners conflate pip install with browser binary download — both steps are required and distinct.",
  when: "Read during first project setup. Revisit when CI agents fail with browser-not-found errors.",
  practical: { app: "New Playwright project", scenario: "Teammate runs tests after pip install only — browser executable not found.", pass: "Explain playwright install downloads matched Chromium/Firefox/WebKit binaries.", fail: "Tell them to install Chrome manually and point Playwright at it." },
  tools: [],
  contentMarkdown: "## 10. Environment Setup\n\nInstalling Python, pip, and virtual environments. Assuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment:\n\n```bash\npython -m venv venv\nsource venv/bin/activate      # Mac/Linux\nvenv\\Scripts\\activate         # Windows\n```\n\nWhy this matters beyond \"best practice\" advice: different projects may need different Playwright/pytest versions, and installing everything globally eventually causes version conflicts that are painful to debug. Get in the habit now, before you have multiple projects to manage. Installing Playwright and browser binaries. Two separate steps that beginners often miss the distinction between:\n\n```bash\npip install pytest-playwright\nplaywright install\n```\n\nThe first installs the Python package (the API you write code against). The second downloads the actual browser binaries (Chromium, Firefox, WebKit) — Playwright doesn't use your system-installed Chrome; it ships its own pinned browser builds. This is deliberate: it guarantees every developer and every CI machine runs the exact same browser version, eliminating \"works on my machine\" bugs caused by browser version drift. If you skip playwright install, your tests will fail immediately with a clear error telling you the browser executable wasn't found. Project folder structure. Even a simple starting structure pays off later (this is a preview of Chapter 23's POM and Chapter 43's scalable architecture):\n\n```\nproject/\n├── tests/\n├── pages/          (page object classes — comes later)\n├── conftest.py\n├── pytest.ini\n└── requirements.txt\n```\n\nStarting with even this loose structure — rather than dumping every test file flat in one folder — means you won't need a painful reorganization once the suite grows past a handful of tests.",
  customSummary: "## 10. Environment Setup\n\n- Use a virtual environment (venv) per project to avoid version conflicts.\n- pip install pytest-playwright installs the API; playwright install downloads pinned browser binaries — both steps required, and skipping the second causes an immediate clear error.\n- Pinned browser binaries eliminate \"works on my machine\" version-drift bugs.\n- Start with a basic folder structure (tests/, pages/, conftest.py, pytest.ini, requirements.txt) to avoid painful reorganization later.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
