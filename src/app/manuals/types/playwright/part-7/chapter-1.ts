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
  "contentMarkdown": "End-to-end framework build (login, CRUD flow, API validation) The capstone ties together nearly every prior chapter into one cohesive project rather than isolated exercises. A solid scope for a portfolio-worthy capstone: ● Login — using POM (Chapter 14), with a session-reuse fixture (Chapter 20) so login only happens once per run, not once per test.\n\n## End-to-end framework build (login, CRUD flow, API validation)\n\nThe capstone ties together nearly every prior chapter into one cohesive project rather than isolated exercises. A solid scope for a portfolio-worthy capstone:\n\nlogin only happens once per run, not once per test.\n\ncover Create, Read, Update, Delete end-to-end through the UI.\n\ncorrectly server-side, not just that the UI looked right.\n\ntasks_page = TasksPage(authenticated_page)\n\nresponse = request.get(\"/api/tasks?title=Finish QA report\")\n\ntask_id = response.json()[\"tasks\"][0][\"id\"]\n\nfollow_up = request.get(f\"/api/tasks/{task_id}\")\n\nPointers: The API-validation steps are what elevate this from \"a UI clicker\" to a genuine full-stack test — it's a detail interviewers specifically listen for, since it demonstrates you understand that UI success and data-layer success are two different things worth verifying independently.\n\n```\nassert response.json()[\"tasks\"][0][\"due_date\"] == \"2026-08-10\"\n\n# Update\n\ntasks_page.edit_task(\"Finish QA report\", new_title=\"Finish QA report v2\")\n\nexpect(authenticated_page.get_by_text(\"Finish QA report v2\")).to_be_visible()\n\n# Delete\n\ntasks_page.delete_task(\"Finish QA report v2\")\n\nexpect(authenticated_page.get_by_text(\"Finish QA report v2\")).not_to_be_visible()\n\n# API validation of deletion\n\n# Create\n\ntasks_page.create_task(\"Finish QA report\", due_date=\"2026-08-10\")\n\nexpect(authenticated_page.get_by_text(\"Finish QA report\")).to_be_visible()\n\n# API validation of creation\n\n# tests/test_task_crud.py\n\nfrom pages.tasks_page import TasksPage\n\ndef test_create_read_update_delete_task(authenticated_page, request):\n```\n\n## Combining UI + API + auth + CI/CD in one suite\n\nThe full picture: conftest.py wires together the session-scoped auth fixture (Chapter\n\n20), the request fixture for API calls (Chapter 18), and the whole thing runs automatically via a GitHub Actions workflow (Chapter 25) on every push, publishing an HTML or Allure report as an artifact (Chapter 26).\n\nPointers: Getting this pipeline green end-to-end — not just passing locally — is the real milestone. A huge amount of practical learning happens specifically in the friction of getting something to run correctly in CI that worked fine locally (missing --with-deps, environment variable differences, headless-only quirks) — don't skip actually pushing this to GitHub and watching Actions run it.\n\n## Code review and refactor pass\n\nOnce the capstone works, deliberately revisit it against Chapter 31's anti-patterns checklist:\n\nPointers: This refactor pass is itself a valuable, showable skill — if you're asked in an interview \"tell me about a time you improved code quality,\" a concrete before/after from this exact refactor pass is a strong, specific answer.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
