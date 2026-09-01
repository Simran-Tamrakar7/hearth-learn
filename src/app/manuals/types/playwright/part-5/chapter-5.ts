import type { ChapterRecord } from "../../../types";

/** Checkpoint — CI/CD */
export const chapter = {
  "id": "pw-cp-cicd",
  "title": "Checkpoint — CI/CD",
  "minutes": 45,
  "level": "checkpoint",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "This checkpoint validates that you can take a Playwright test suite from local-only execution to a fully automated CI/CD pipeline with structured reporting, optional Docker packaging, and useful failure diagnostics. The pass criteria are concrete: the suite runs in CI (GitHub Actions or Jenkins), produces a downloadable HTML or Allure report as an artifact, optionally runs inside Docker, and captures screenshots or logs on failure. These are not theoretical goals — they are the minimum bar for a test suite that a team can actually rely on in a real project.",
  "why": "A test suite that only runs locally is a personal habit, not an engineering practice. The checkpoint exists because teams consistently discover — often painfully — that tests passing on one developer's machine fail silently in CI due to missing browser dependencies, headless quirks, or environment variable differences. Completing this checkpoint means you have personally resolved those friction points, not just read about them. That experience is what separates someone who can set up automation from someone who can maintain it.",
  "when": "Complete this checkpoint after finishing Chapters 25–28 and before starting Part 6 (Pro-Level Practices). You should have a working GitHub Actions or Jenkins workflow, at least one published report artifact, and evidence of a failure being debugged using logs or screenshots rather than a local re-run.",
  "practical": {
    "app": "Bizlevate HRMS — Full regression suite",
    "scenario": "You push your Playwright framework to GitHub, open a pull request, and verify the complete CI/CD pipeline end-to-end: workflow triggers, tests run headless, a report artifact is uploaded, and a deliberate test failure produces a downloadable screenshot.",
    "pass": "GitHub Actions workflow runs on the PR, all smoke tests pass, report.html is downloadable from the Artifacts tab, and a forced failure produces a screenshot artifact showing the UI state at the moment of failure.",
    "fail": "The workflow runs but no artifact is uploaded because if: always() was omitted — when a test fails, the upload step is skipped and the team has no report to debug from."
  },
  "advantages": [
    "Validates the complete CI/CD pipeline end-to-end, not just individual concepts",
    "Forces hands-on experience with the most common CI failure causes (missing --with-deps, headless mode, artifact upload)",
    "Produces a working GitHub repo that doubles as a portfolio piece",
    "Debugging a real CI failure during the checkpoint builds confidence for production incidents"
  ],
  "limitations": [
    "Checkpoint criteria are minimum bar — production teams need secrets management, parallel execution, and flaky-test quarantine on top",
    "A green checkpoint does not mean the suite is fast — performance tuning is Part 6",
    "Docker is optional in the checkpoint — teams without Docker experience can pass with GitHub Actions alone"
  ],
  "tools": [
    {
      "name": "GitHub Actions",
      "sub": "CI/CD Validation",
      "url": "https://github.com/features/actions",
      "desc": "Use GitHub Actions as the primary CI platform for this checkpoint. A passing checkpoint requires a workflow that triggers on pull_request, runs playwright install --with-deps, executes pytest headlessly, and uploads a report artifact with if: always().",
      "adv": [
        "Free for public repos — ideal for portfolio projects",
        "PR status checks provide immediate pass/fail feedback",
        "Artifacts tab makes reports downloadable without extra tooling"
      ],
      "lim": [
        "Requires a GitHub repo — local-only validation is not sufficient for this checkpoint"
      ],
      "steps": [
        {
          "t": "Checkpoint Step 1 — Verify workflow triggers on PR",
          "p": "Open a pull request and confirm the Actions tab shows a running workflow.",
          "c": "# PR checks: ✓ Playwright Tests"
        },
        {
          "t": "Checkpoint Step 2 — Verify report artifact exists",
          "p": "After the run completes, download the report from Artifacts.",
          "c": "# Actions → Run → Artifacts → playwright-report → report.html"
        },
        {
          "t": "Checkpoint Step 3 — Verify failure evidence",
          "p": "Temporarily break a test, push, and confirm a screenshot or log is captured.",
          "c": "pytest --screenshot=only-on-failure  # screenshot in test-results/ on failure"
        }
      ]
    }
  ],
  "contentMarkdown": "Suite runs in CI with reports, optional Docker, and useful failure logs.\n\n## Pass criteria\n\nSuite runs in CI with reports, optional Docker, and useful failure logs.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
