import type { ChapterRecord } from "../../../types";

/** 33. Real-World Capstone Project */
export const chapter = {
  "id": "pw-7-capstone",
  "title": "33. Real-World Capstone Project",
  "minutes": 90,
  "level": "pro",
  "phase": "Part 7 · Real-World Project & Job Readiness",
  "partName": "Part 7 · Real-World Project & Job Readiness",
  "overviewText": "The capstone project ties together nearly every prior chapter into one cohesive, portfolio-worthy Playwright framework rather than isolated exercises. A solid scope covers login using Page Object Model with session-reuse fixtures (Chapter 20), a full CRUD flow through the UI (Create, Read, Update, Delete), and API validation confirming data was correctly persisted server-side — not just that the UI looked right. The full picture wires conftest.py with session-scoped auth fixtures, the request fixture for API calls (Chapter 18), and a GitHub Actions workflow (Chapter 25) that runs automatically on every push, publishing an HTML or Allure report as an artifact (Chapter 26). Getting this pipeline green end-to-end — not just passing locally — is the real milestone. The API-validation steps are what elevate this from 'a UI clicker' to a genuine full-stack test.",
  "why": "Interviewers and hiring managers do not evaluate automation candidates on whether they can write a single test — they evaluate whether they can build and maintain a framework. A capstone project demonstrates end-to-end competence: POM architecture, fixture design, API validation, CI integration, and the ability to debug CI-only failures. The friction of getting something to run correctly in CI that worked fine locally (missing --with-deps, environment variable differences, headless quirks) is where a huge amount of practical learning happens. Skipping the CI push means skipping that learning.",
  "when": "Build the capstone after completing Parts 1–6 — you need POM (Chapter 14), fixtures (Chapter 15), API testing (Chapter 18), session reuse (Chapter 20), CI/CD (Chapter 25), and reporting (Chapter 26) before starting. Allocate 2–3 focused sessions: one for the framework structure and CRUD tests, one for CI integration and getting the pipeline green, one for the refactor pass against Chapter 31's anti-patterns checklist. Push to GitHub and watch Actions run it before considering the capstone complete.",
  "practical": {
    "app": "Task Manager App — Portfolio capstone",
    "scenario": "You build a Playwright framework covering login, task CRUD (Create, Read, Update, Delete), and API validation for a task management app. After each UI action, an API call confirms the data layer state matches what the UI showed.",
    "pass": "test_create_read_update_delete_task passes locally and in GitHub Actions. After creating a task via UI, request.get('/api/tasks?title=Finish QA report') confirms the task exists with the correct due_date. After deletion, the API confirms the task is gone. The GitHub Actions workflow publishes an Allure report artifact.",
    "fail": "Tests pass locally but fail in CI because playwright install --with-deps was omitted. The developer debugs locally (passes), gives up on CI, and the capstone repo shows a red X on every push — undermining the portfolio value of the project."
  },
  "advantages": [
    "Demonstrates end-to-end framework competence in a single reviewable project",
    "API validation steps show full-stack testing understanding — a detail interviewers specifically listen for",
    "CI-green pipeline proves ability to debug environment-specific failures",
    "Refactor pass against anti-patterns checklist produces a concrete before/after improvement story for interviews",
    "Combines POM, fixtures, API testing, session reuse, CI, and reporting in one cohesive suite",
    "Portfolio repo URL is directly shareable with recruiters and interviewers"
  ],
  "limitations": [
    "Capstone scope must be bounded — a full app test suite is months of work, not a portfolio project",
    "CI-green requirement adds significant time beyond local development",
    "API validation requires a backend with accessible API endpoints — not all practice apps provide this",
    "Refactor pass is easy to skip under time pressure — but it is where the best interview stories come from"
  ],
  "tools": [
    {
      "name": "GitHub Actions",
      "sub": "Capstone CI Pipeline",
      "url": "https://github.com/features/actions",
      "desc": "The capstone CI pipeline runs the full test suite on every push via a GitHub Actions workflow. It must include playwright install --with-deps, pytest execution, and artifact upload for the Allure or HTML report. Getting this pipeline green is a required capstone milestone — not optional.",
      "adv": [
        "Green CI badge on the repo is immediate portfolio credibility",
        "Artifact upload makes failure reports downloadable for debugging",
        "PR status checks demonstrate CI integration competence to interviewers"
      ],
      "lim": [
        "Requires pushing to GitHub — local-only capstone is incomplete",
        "First CI green run often requires multiple iterations to resolve environment issues"
      ],
      "steps": [
        {
          "t": "Step 1 — Build the CRUD test with API validation",
          "p": "Combine UI actions with API assertions:",
          "c": "def test_create_read_update_delete_task(authenticated_page, request):\n    tasks_page = TasksPage(authenticated_page)\n\n    # Create\n    tasks_page.create_task(\"Finish QA report\", due_date=\"2026-08-10\")\n    response = request.get(\"/api/tasks?title=Finish QA report\")\n    assert response.json()[\"tasks\"][0][\"due_date\"] == \"2026-08-10\"\n\n    # Delete\n    tasks_page.delete_task(\"Finish QA report\")\n    response = request.get(\"/api/tasks?title=Finish QA report\")\n    assert response.json()[\"tasks\"] == []"
        },
        {
          "t": "Step 2 — Push and verify CI pipeline",
          "p": "Push to GitHub and confirm the workflow runs green:",
          "c": "git push origin main\n# GitHub Actions → verify green checkmark\n# Artifacts → download and review report"
        },
        {
          "t": "Step 3 — Refactor pass against anti-patterns checklist",
          "p": "Review the capstone against Chapter 31's checklist before calling it done:",
          "c": "# Checklist:\n# ✓ Descriptive test names\n# ✓ No hardcoded sleeps\n# ✓ Role-based locators\n# ✓ API validation on every CRUD step\n# ✓ Session reuse fixture\n# ✓ CI pipeline green"
        }
      ]
    }
  ],
  "contentMarkdown": "## 33. Real-World Capstone Project\n\nThe capstone ties together nearly every prior chapter into one portfolio-worthy Playwright framework — not isolated exercises.\n\n### Scope\n\nA solid capstone covers:\n\n- **Login** — Page Object Model (Chapter 14) with a session-reuse fixture (Chapter 20) so login runs once per session, not once per test.\n- **CRUD flow** — Create, Read, Update, Delete through the UI.\n- **API validation** — After each UI action, confirm data persisted server-side — not just that the UI looked right.\n\n### CRUD + API validation example\n\n```python\n# tests/test_task_crud.py\nfrom pages.tasks_page import TasksPage\n\ndef test_create_read_update_delete_task(authenticated_page, request):\n    tasks_page = TasksPage(authenticated_page)\n\n    # Create\n    tasks_page.create_task(\"Finish QA report\", due_date=\"2026-08-10\")\n    expect(authenticated_page.get_by_text(\"Finish QA report\")).to_be_visible()\n    response = request.get(\"/api/tasks?title=Finish QA report\")\n    assert response.json()[\"tasks\"][0][\"due_date\"] == \"2026-08-10\"\n\n    # Update\n    tasks_page.edit_task(\"Finish QA report\", new_title=\"Finish QA report v2\")\n    expect(authenticated_page.get_by_text(\"Finish QA report v2\")).to_be_visible()\n\n    # Delete\n    tasks_page.delete_task(\"Finish QA report v2\")\n    expect(authenticated_page.get_by_text(\"Finish QA report v2\")).not_to_be_visible()\n    response = request.get(\"/api/tasks?title=Finish QA report v2\")\n    assert response.json()[\"tasks\"] == []\n```\n\nThe API-validation steps elevate this from \"a UI clicker\" to a genuine full-stack test — interviewers specifically listen for this.\n\n### CI integration\n\nWire `conftest.py` with session-scoped auth fixtures, the `request` fixture for API calls (Chapter 18), and a GitHub Actions workflow (Chapter 25) that runs on every push and publishes an HTML or Allure report (Chapter 26).\n\n```yaml\n# .github/workflows/playwright.yml\nname: Playwright Tests\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: \"3.12\"\n      - run: pip install -r requirements.txt\n      - run: playwright install --with-deps\n      - run: pytest --headed=false --tracing=retain-on-failure\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: playwright-report\n          path: playwright-report/\n```\n\nGetting the pipeline **green end-to-end** — not just passing locally — is the real milestone. Missing `playwright install --with-deps`, environment variable differences, and headless-only quirks are where practical learning happens.\n\n### Refactor pass\n\nOnce the capstone works, revisit it against Chapter 31's anti-patterns checklist:\n\n- Descriptive test names\n- No hardcoded sleeps\n- Role-based locators\n- API validation on every CRUD step\n- Session reuse fixture\n- CI pipeline green\n\nThis refactor pass is itself a showable skill — a concrete before/after is a strong interview answer.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
