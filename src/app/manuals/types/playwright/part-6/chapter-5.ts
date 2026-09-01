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
  "contentMarkdown": "Framework layout, suite governance, review habits, and performance tradeoffs are intentional.\n\n## Pass criteria\n\nFramework layout, suite governance, review habits, and performance tradeoffs are intentional.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
