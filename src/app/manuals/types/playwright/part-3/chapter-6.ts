import type { ChapterRecord } from "../../../types";

/** Checkpoint — Framework */
export const chapter = {
  "id": "pw-cp-framework",
  "title": "Checkpoint — Framework",
  "minutes": 45,
  "level": "checkpoint",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "This checkpoint validates that you can structure a Playwright Python suite as a maintainable test framework — not just write individual browser scripts. You should be able to explain and demonstrate pytest fixtures with yield-based teardown, marker-based test selection, the Page Object Model with a BasePage hierarchy, environment-aware configuration via pytest.ini and conftest.py, and data-driven tests using static fixtures and Faker. Together these patterns transform a collection of scripts into a suite that scales with the application: new tests reuse existing fixtures and page objects, CI runs smoke subsets in minutes, and UI changes require fixes in one page class instead of dozens of test files.",
  "why": "Parts 1 and 2 taught Playwright interactions; Part 3 taught the scaffolding that keeps a growing suite from collapsing under its own weight. Without these framework skills, teams hit a wall around 30–50 tests: duplication explodes, CI times balloon, and every UI tweak becomes a multi-file archaeology exercise. This checkpoint confirms you have the structural foundation before Part 4's advanced techniques (network mocking, API testing, auth reuse) build on top of it.",
  "when": "Complete this checkpoint after finishing Chapters 12–16 and before starting Part 4. Revisit if you notice test files growing beyond 150 lines, login code appearing in more than two places, or CI runs taking longer than 15 minutes for a smoke-equivalent subset.",
  "practical": {
    "app": "HRMS — Full framework review",
    "scenario": "Given a fresh HRMS test project, you scaffold conftest.py with logged_in_page and base_url fixtures, create LoginPage and DashboardPage in pages/, register smoke/regression markers in pytest.ini, load credentials from test_data/users.json, and write three tests — one smoke login, one parametrized validation, one dashboard check using page objects.",
    "pass": "pytest -m smoke runs in under 2 minutes; login button rename requires editing one file in pages/; a failing test still triggers fixture teardown cleanup.",
    "fail": "Tests hardcode URLs and credentials; no markers exist so CI runs everything; login locators are copy-pasted across six test functions."
  },
  "advantages": [
    "Confirms readiness for Part 4 advanced topics that assume solid framework structure",
    "Validates understanding of the full Part 3 toolchain as an integrated system",
    "Identifies gaps (missing cleanup, no markers, inline locators) before they compound",
    "Establishes team conventions early — easier than retrofitting later"
  ],
  "limitations": [
    "Self-assessment — no automated grader verifies your project structure",
    "Checkpoint criteria are minimum bar — production suites need additional patterns from later parts",
    "Framework patterns evolve — revisit after Part 6 best practices",
    "Does not cover CI integration — that comes in later parts"
  ],
  "tools": [],
  "contentMarkdown": "## Checkpoint — Framework\n\nVerify you can apply Part 3 concepts before moving to advanced topics.\n\n- [ ] I can write a Playwright test that requests the `page` fixture and runs with `pytest`.\n- [ ] I have a `conftest.py` with at least one shared fixture using `yield` teardown.\n- [ ] I understand fixture scopes and default to `function` unless I have a measured reason not to.\n- [ ] I can run `pytest -m smoke` and `pytest -m regression` with markers registered in `pytest.ini`.\n- [ ] I have used `@pytest.mark.parametrize` for at least one data-driven test.\n- [ ] My project has a `pages/` folder with a `BasePage` and at least one page object class.\n- [ ] Tests call page-object methods, not raw locators scattered in test files.\n- [ ] `BASE_URL` is read from an environment variable, not hard-coded.\n- [ ] Test data lives in JSON files or Faker-generated fixtures, not inline strings.\n- [ ] Created test data is cleaned up via a `yield` fixture after each test.\n\n**Score:** 8–10 checked — ready for Part 4. 5–7 — revisit the gaps. Below 5 — rework Part 3 before continuing.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
