import type { ChapterRecord } from "../../types";

/** 2. Environment Setup */
export const chapter = {
  "id": "pw-1-setup",
  "title": "2. Environment Setup",
  "minutes": 45,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "venv hygiene, install pytest-playwright + browser binaries, and a starter folder structure that won’t fight you when POM arrives.\n\n## Python, pip, and virtual environments\n\nAssuming Python is installed, the critical habit here is virtual environments (venv). Every project should get its own isolated environment.\n\n```\npython -m venv venv\nsource venv/bin/activate      # Mac/Linux\nvenv\\Scripts\\activate         # Windows\n```\n\n## Installing Playwright + browser binaries\n\nTwo separate steps that beginners often miss the distinction between.\n\n## Project folder structure\n\nEven a simple starting structure pays off later (preview of Chapter 14’s POM and Chapter 29’s scalable architecture). Starting with this loose structure — rather than dumping every test file flat in one folder — means you won’t need a painful reorganization once the suite grows past a handful of tests.\n\n```\nproject/\n├── tests/\n├── pages/          # page object classes — comes later\n├── conftest.py\n├── pytest.ini\n└── requirements.txt\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
