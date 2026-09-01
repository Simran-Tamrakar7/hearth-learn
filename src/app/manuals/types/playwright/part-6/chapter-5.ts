import type { ChapterRecord } from "../../../types";

/** Checkpoint — Pro Practices */
export const chapter = {
  "id": "pw-cp-pro",
  "title": "Checkpoint — Pro Practices",
  "minutes": 45,
  "level": "checkpoint",
  "phase": "Part 6 · Pro-Level Practices",
  "partName": "Part 6 · Pro-Level Practices",
  "overviewText": "This checkpoint validates that your Playwright framework is built for a real team, not just a solo developer. The pass criteria require intentional decisions across four dimensions: framework layout follows the enterprise-grade structure from Chapter 29, suite governance includes marker-based selective execution and flaky-test awareness, code review habits are established with a documented checklist, and performance tradeoffs have been measured rather than guessed. These are the practices that separate a portfolio project from a production-grade automation framework.",
  "why": "Completing Part 5 gave you a working CI pipeline. Part 6 asks whether that pipeline will still be maintainable in six months when the suite has 150 tests and two new contributors. Checkpoints exist because teams consistently skip pro-level practices under deadline pressure and pay for it later with unmaintainable suites, untrusted CI builds, and frameworks that only one person can modify. Passing this checkpoint means you have made the structural decisions that prevent those outcomes.",
  "when": "Complete this checkpoint after finishing Chapters 29–32 and before starting Part 7 (Real-World Project & Job Readiness). You should have the enterprise folder structure in place, at least two marker dimensions defined, a PR review checklist documented, and one measured performance optimization applied.",
  "practical": {
    "app": "Bizlevate HRMS — Team-ready framework",
    "scenario": "You invite a colleague to contribute a new test module to your framework. They clone the repo, read docs/architecture.md, create files in the correct locations following existing patterns, and submit a PR that passes your review checklist — all without a walkthrough meeting.",
    "pass": "The colleague's PR follows the enterprise folder structure, uses descriptive test names, imports Settings from config/settings.py, and passes the review checklist. pytest -m smoke runs in under 5 minutes. docs/architecture.md explains where to add new modules.",
    "fail": "The colleague asks 'where do I put the new test file?' because the repo has a flat tests/ folder with no documentation. Their PR includes time.sleep(2) and a hardcoded staging URL. The review checklist does not exist."
  },
  "advantages": [
    "Validates framework readiness for team contribution, not just solo use",
    "Forces documentation of structural decisions before they become tribal knowledge",
    "Measured performance optimization produces a baseline for future tuning",
    "Review checklist establishes quality standards that survive team growth"
  ],
  "limitations": [
    "Checkpoint criteria are structural — they do not validate test coverage depth or assertion quality",
    "Flaky-test tracking requires CI history that may not exist yet for new projects",
    "Performance targets are team-specific — 5-minute smoke run is a guideline, not a universal rule"
  ],
  "tools": [
    {
      "name": "pytest markers",
      "sub": "Suite Governance Validation",
      "url": "https://docs.pytest.org/en/stable/reference/reference.html#globalvar-pytest.mark",
      "desc": "Verify that marker-based selective execution works: pytest -m smoke runs a subset in under 5 minutes, and pytest -m \"not quarantine\" excludes any quarantined flaky tests from CI blocking runs.",
      "adv": [
        "Immediate validation — run the command and check the test count and duration",
        "No additional tooling required beyond pytest.ini marker registration"
      ],
      "lim": [
        "Requires tests to be marked — unmarked tests are excluded from selective runs"
      ],
      "steps": [
        {
          "t": "Checkpoint Step 1 — Verify folder structure",
          "p": "Confirm tests/, pages/, utils/, config/, test_data/ directories exist with module subdirectories.",
          "c": "ls tests/modules/ pages/modules/ utils/ config/"
        },
        {
          "t": "Checkpoint Step 2 — Verify selective execution",
          "p": "Run smoke subset and confirm it completes quickly:",
          "c": "pytest -m smoke -v  # should complete in under 5 minutes"
        },
        {
          "t": "Checkpoint Step 3 — Verify review checklist exists",
          "p": "Confirm docs/ or PR template contains the anti-patterns checklist from Chapter 31.",
          "c": "cat docs/review-checklist.md"
        }
      ]
    }
  ],
  "contentMarkdown": "## Checkpoint — Pro-Level Practices\n\nUse this checkpoint to confirm you can design, scale, and maintain an enterprise Playwright framework. Answer from memory before considering the manual complete.\n\n## Self-check questions\n\n**Scalable Framework**\n1. Name the five top-level directories in the enterprise layout and what each holds.\n2. What belongs in `utils/` vs `pages/` vs `tests/`?\n3. Why should `Settings` be a frozen dataclass reading from environment variables?\n4. What does `BasePage` eliminate across feature page objects?\n\n**Managing Suites at Scale**\n5. Write the pytest command to run smoke tests excluding flaky ones.\n6. What are the three most common causes of flaky Playwright tests?\n7. Which pytest hook modifies the test collection before execution?\n8. What file format does TestRail ingest from pytest?\n\n**Code Review & Best Practices**\n9. Why is `time.sleep()` an anti-pattern in Playwright tests?\n10. What makes a test unsafe for parallel execution?\n11. Name four items on the code review checklist.\n\n**Performance**\n12. What is the single biggest runtime win for a multi-test suite?\n13. When should you set up test data via API instead of the UI?\n14. What is the recommended locator priority order?\n15. What does `pytest -n auto` do?\n\n## Practical exercise\n\nGiven a flat project with 60 tests, login logic copy-pasted in 40 files, and a 90-minute CI runtime, list the five changes you would make in priority order.\n\n```\n1. Extract Settings class and remove hardcoded URLs/credentials\n2. Implement auth state reuse (storage_state fixture) — eliminates 40 UI logins\n3. Restructure into pages/modules/, tests/modules/, utils/ layout\n4. Add smoke/regression markers; run smoke on PR, regression nightly\n5. Enable pytest-xdist (-n auto) with per-worker auth state files\n```\n\nEstimate the runtime impact of each change:\n\n| Change | Estimated savings |\n|--------|------------------|\n| Auth reuse | ~10–15 sec × 40 tests = 7–10 min |\n| API setup for preconditions | ~5–20 sec × 30 tests = 2.5–10 min |\n| Parallel (-n 4) | ~60–70% of remaining time |\n| Smoke-only on PR | Runs 15 tests instead of 60 |\n\n## Architecture diagram\n\n```\n┌─────────────┐     ┌──────────────┐     ┌─────────────┐\n│   tests/    │────▶│  pages/      │────▶│  Playwright │\n│  (scenarios)│     │ (page logic) │     │  (browser)  │\n└──────┬──────┘     └──────────────┘     └─────────────┘\n       │\n       ▼\n┌─────────────┐     ┌──────────────┐\n│   utils/    │────▶│  config/     │\n│ (API, data) │     │ (Settings)   │\n└─────────────┘     └──────────────┘\n```\n\n## Pass criteria\n\nYou have completed the Playwright manual if you can: draw the enterprise folder layout from memory, write a `Settings` class and `storage_state` auth fixture, compose a marker expression for selective CI runs, identify three anti-patterns in a code review, and explain how auth reuse plus API setup plus parallel execution compound to cut suite runtime by 70% or more. If any section above required more than one re-read, revisit that chapter — the patterns compound, and gaps here become expensive at scale.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
