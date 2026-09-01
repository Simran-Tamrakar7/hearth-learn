import type { ChapterRecord } from "../../../types";

/** 34. Portfolio Building */
export const chapter = {
  "id": "pw-7-portfolio",
  "title": "34. Portfolio Building",
  "minutes": 45,
  "level": "pro",
  "phase": "Part 7 · Real-World Project & Job Readiness",
  "partName": "Part 7 · Real-World Project & Job Readiness",
  "overviewText": "Portfolio building for Playwright automation means structuring your GitHub repo so a recruiter or hiring manager can evaluate your competence in under a minute — before reading a single line of test code. The repo structure should match the enterprise-grade layout from Chapter 29: .github/workflows/ for CI, pages/ and tests/ for the framework, utils/ and config/ for supporting code, and docs/architecture.md for design decisions. The README is the most important file — it must answer, in order: what this project demonstrates, how to run it, and why it is built the way it is. Explicitly naming the patterns demonstrated (POM, session reuse, CI integration, API validation) in the README does real work — it is often the first and only place a time-pressed reviewer looks to judge whether you understand the 'why,' not just the 'how.' A 2–3 minute screen recording showing the suite running, the folder structure, and the HTML report is a low-effort, high-impact differentiator most candidate repos do not include.",
  "why": "Hiring managers reviewing automation candidates face the same problem as code reviewers: they have limited time and many applicants. A repo with no README, a flat file structure, and no CI badge requires the reviewer to clone, install dependencies, and figure out what they are looking at — most will not. A well-structured repo with a clear README, green CI badge, and architecture doc lets a reviewer evaluate your competence in 60 seconds. For candidates transitioning from manual QA to automation, the portfolio repo is often the primary evidence of automation skill — more important than certifications or course completions.",
  "when": "Build the portfolio repo presentation immediately after the capstone (Chapter 33) is CI-green. Write the README before sharing the repo link with anyone — a repo without a README is worse than no repo at all. Record the demo walkthrough once the README and CI pipeline are complete. Update the README whenever you add significant new patterns or modules to the framework.",
  "practical": {
    "app": "Playwright Task Manager Framework — Portfolio repo",
    "scenario": "A hiring manager receives your resume with a GitHub link. They open the repo, see a green CI badge, read the README listing POM architecture, session reuse, API validation, and GitHub Actions CI, skim docs/architecture.md, and watch the 2-minute demo video.",
    "pass": "The hiring manager understands within 60 seconds what the project demonstrates, sees the green CI badge, and clicks through to the demo video. They add you to the interview shortlist based on the repo alone.",
    "fail": "The hiring manager opens the repo, finds no README, a flat tests/ folder with 15 files, no CI badge, and closes the tab. Your automation skills are never evaluated because the repo did not communicate them."
  },
  "advantages": [
    "Clean repo structure signals competence before a reviewer reads any test code",
    "README with named patterns (POM, session reuse, CI) answers 'does this person understand why?' immediately",
    "Green CI badge on the repo is passive, always-on proof the suite works",
    "Demo video lets reviewers see the framework run without cloning and setting up",
    "docs/architecture.md explains design decisions — shows engineering thinking, not just coding",
    "Portfolio repo URL is directly pasteable into resume, LinkedIn, and cover letters"
  ],
  "limitations": [
    "Portfolio quality depends on capstone quality — a poorly built framework with good README still fails under interview scrutiny",
    "Demo video requires basic screen recording tooling and takes time to produce well",
    "Repo structure conventions vary by team — some reviewers prefer different layouts",
    "A portfolio repo without real CI green runs is worse than no badge at all"
  ],
  "tools": [
    {
      "name": "GitHub",
      "sub": "Portfolio Hosting",
      "url": "https://github.com",
      "desc": "GitHub hosts the portfolio repo and provides the CI badge, README rendering, and Actions tab that hiring managers evaluate. The repo should be public (or accessible via link) with a descriptive name like playwright-task-manager-framework rather than a generic name like test-project. Pin the repo on your GitHub profile. Enable GitHub Pages optionally for hosting the Allure report history.",
      "adv": [
        "README renders automatically on the repo homepage — first thing reviewers see",
        "CI badge embeddable in README with one markdown line",
        "Public repos are indexable — recruiters searching for Playwright examples may find yours",
        "GitHub profile pin feature puts the portfolio repo at the top of your profile"
      ],
      "lim": [
        "Public repos expose all commit history — ensure no secrets were ever committed",
        "GitHub Pages Allure hosting requires a separate workflow step",
        "Private repos require reviewers to have access granted manually"
      ],
      "steps": [
        {
          "t": "Step 1 — Write the README",
          "p": "Answer what, how, and why in order:",
          "c": "# Playwright + Python Test Automation Framework\n\n## What this demonstrates\n- Page Object Model with a shared base page\n- Auth session reuse via storage_state\n- Combined UI + API testing for full-stack validation\n- GitHub Actions CI pipeline with HTML reporting\n\n## Running locally\npip install -r requirements.txt\nplaywright install --with-deps\npytest --browser chromium --html=report.html\n\n## Architecture\nSee docs/architecture.md for folder structure and design decisions."
        },
        {
          "t": "Step 2 — Add CI badge to README",
          "p": "Embed the GitHub Actions status badge:",
          "c": "![Playwright Tests](https://github.com/yourusername/your-repo/actions/workflows/playwright.yml/badge.svg)"
        },
        {
          "t": "Step 3 — Record and link the demo video",
          "p": "2–3 minute screen recording showing: terminal test run, folder structure, HTML report.",
          "c": "## Demo\n[Watch a 2-minute walkthrough](https://www.youtube.com/watch?v=...)"
        }
      ]
    }
  ],
  "contentMarkdown": "## 34. Portfolio Building\n\nYour GitHub repo is often the first thing a hiring manager opens. Structure it like a professional framework, not a homework dump.\n\n### Recommended repo structure\n\n```\nplaywright-capstone/\n├── .github/workflows/playwright.yml   # CI runs on every push\n├── pages/                             # Page Object Model classes\n│   ├── login_page.py\n│   └── tasks_page.py\n├── tests/\n│   ├── conftest.py                    # Fixtures (auth, API context)\n│   └── test_task_crud.py\n├── fixtures/                          # Test data (JSON, factories)\n├── playwright.config.py               # Or pytest.ini + conftest\n├── requirements.txt\n├── README.md                          # First impression — make it count\n└── .gitignore                         # Exclude .env, traces, __pycache__\n```\n\n### README template\n\nYour README should answer four questions in under two minutes of reading:\n\n1. **What does this test?** — One sentence on the app and scope (login + CRUD + API validation).\n2. **How do I run it?** — Copy-paste commands that actually work:\n   ```bash\n   pip install -r requirements.txt\n   playwright install\n   pytest\n   ```\n3. **What's the architecture?** — Brief note on POM, fixtures, and CI.\n4. **Proof it works** — Screenshot of a green CI run or link to Actions badge.\n\n```markdown\n# Task Manager — Playwright Capstone\n\nEnd-to-end Playwright + pytest suite covering login, task CRUD, and API validation.\n\n## Quick start\npip install -r requirements.txt && playwright install && pytest\n\n## Architecture\n- Page Object Model in `pages/`\n- Session-scoped auth fixture in `conftest.py`\n- GitHub Actions CI on every push\n\n## CI status\n![Playwright Tests](https://github.com/yourname/playwright-capstone/actions/workflows/playwright.yml/badge.svg)\n```\n\n### Demo video (2–3 minutes)\n\nRecord a short walkthrough showing:\n\n1. Repo structure (30 seconds)\n2. One test running locally with trace on failure (60 seconds)\n3. Green GitHub Actions run + report artifact (30 seconds)\n\nUpload to YouTube (unlisted) or Loom and link from the README. Recruiters rarely clone repos — a video proves you built it and can explain it.\n\n### What to highlight\n\n- API validation alongside UI assertions\n- Session reuse (not logging in every test)\n- CI that actually runs (green badge, not red X)\n- Clean locator strategy (roles/labels, not XPath soup)",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
