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
  "contentMarkdown": "Structuring a GitHub repo for recruiters your-playwright-framework/ ├── .github/workflows/playwright.yml ├── pages/ ├── tests/ ├── utils/ ├── config/ ├── conftest.py ├── pytest.ini ├── requirements.txt ├── README.md └── docs/ └── architecture.md Pointers: A recruiter or hiring manager typically skims a repo for under a minute before deciding whether to look closer — a clean, familiar structure (ma\n\n## GitHub repo for recruiters\n\nyour-playwright-framework/\n\n├── .github/workflows/playwright.yml\n\n├── pages/\n\n├── tests/\n\n├── utils/\n\n├── config/\n\n├── conftest.py\n\n├── pytest.ini\n\n├── requirements.txt\n\n├── README.md\n\n└── docs/\n\n└── architecture.md\n\nPointers: A recruiter or hiring manager typically skims a repo for under a minute before deciding whether to look closer — a clean, familiar structure (matching the enterprise-grade layout from Chapter 29) signals competence immediately, before they've read a single line of actual test code.\n\n## Writing a README that showcases the framework\n\nA strong README answers, in order: what this project demonstrates, how to run it, and why it's built the way it is — not just \"how to run tests.\"\n\nA full-stack UI + API test automation framework built with Playwright and pytest,\n\ndemonstrating Page Object Model architecture, CI/CD integration, and\n\ncombined UI/API validation.\n\n- Page Object Model with a shared base page\n\n- Auth session reuse via storage_state (fast, no repeated logins)\n\n- Combined UI + API testing for full-stack validation\n\n- GitHub Actions CI pipeline with HTML reporting\n\n- Data-driven tests via pytest parametrize\n\n```\n# Playwright + Python Test Automation Framework\n\n## What this demonstrates\n\n## Running locally\n```\n\n## 3. `pytest --browser chromium --html=report.html`\n\nSee `docs/architecture.md` for folder structure and design decisions.\n\nPointers: Explicitly naming the patterns demonstrated (POM, session reuse, CI integration) in the README does real work — it's often the first and only place a time-pressed reviewer looks to judge whether you understand the \"why,\" not just the \"how.\"\n\n```\n## Architecture\n```\n\n## Recording a short demo walkthrough\n\nA 2–3 minute screen recording showing: the suite running in the terminal, a quick look at the folder structure, and maybe the HTML/Allure report it produces.\n\nPointers: This is a low-effort, high-impact addition — most candidate repos don't include one, so it's a genuine differentiator, and it lets a reviewer \"see it work\" without needing to clone and set the project up themselves.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
