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
  "contentMarkdown": "## Checkpoint — CI/CD & Reporting\n\nUse this checkpoint to verify you can design, run, and debug a Playwright suite in a real CI pipeline. Answer each item from memory before moving to Part 6.\n\n## Self-check questions\n\n**CI/CD Integration**\n1. What file and directory does a GitHub Actions workflow live in?\n2. Why is `playwright install --with-deps` required on CI but often optional locally?\n3. What is the difference between triggering on `pull_request` vs `schedule`?\n4. Write the Jenkins `post` block that publishes JUnit XML results.\n5. Why does headed mode fail on a typical CI runner?\n\n**Test Reporting**\n6. What flag makes `pytest-html` produce a single self-contained file?\n7. What command generates and serves an Allure report locally?\n8. Where do you add `@allure.step` — in tests or page objects? Why?\n9. Why should artifact upload steps use `if: always()` instead of `if: failure()`?\n\n**Docker**\n10. Why must the Docker image tag match your `playwright` package version?\n11. What does `-v $(pwd):/app` accomplish when running tests in Docker?\n\n**Logging & Error Handling**\n12. Where should `logging.basicConfig` be called in a pytest project?\n13. Name three Playwright failure artifacts and what each is best for.\n14. When is `pytest-rerunfailures` appropriate — and when is it masking a real bug?\n\n## Practical exercise\n\nCreate a minimal GitHub Actions workflow that:\n- Triggers on pull requests to `main`\n- Installs dependencies and runs `playwright install --with-deps`\n- Runs `pytest --browser chromium -m smoke --html=report.html --self-contained-html`\n- Uploads `report.html` and `test-results/` as artifacts regardless of pass/fail\n\n```yaml\n# Your answer here — then compare against the solution below\nname: Playwright Smoke Tests\non:\n  pull_request:\n    branches: [main]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: \"3.11\"\n      - run: |\n          pip install -r requirements.txt\n          playwright install --with-deps\n      - run: pytest --browser chromium -m smoke --html=report.html --self-contained-html\n      - uses: actions/upload-artifact@v4\n        if: always()\n        with:\n          name: smoke-report\n          path: |\n            report.html\n            test-results/\n```\n\n## Pass criteria\n\nYou are ready for Part 6 if you can explain why CI failures often appear only in headless mode, produce an HTML or Allure report from a pytest run, upload artifacts from a workflow YAML file, and describe when Docker replaces `install --with-deps`. If any item above took more than 30 seconds to answer, revisit that chapter before continuing.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
