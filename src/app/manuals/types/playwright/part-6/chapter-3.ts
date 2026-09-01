import type { ChapterRecord } from "../../../types";

/** 31. Code Review & Best Practices */
export const chapter = {
  "id": "pw-6-review",
  "title": "31. Code Review & Best Practices",
  "minutes": 40,
  "level": "pro",
  "phase": "Part 6 · Pro-Level Practices",
  "partName": "Part 6 · Pro-Level Practices",
  "overviewText": "Code review for Playwright test automation is the practice of systematically evaluating test code for naming clarity, DRY violations, anti-patterns, and documentation quality before it merges. A test name should describe the scenario and expected outcome well enough that a failure notification alone tells a reader roughly what broke — test_login_fails_with_incorrect_password is reviewable; test1 is not. DRY in automation means: if the same locator or action sequence appears in three or more tests, it belongs in a page object method or utility function, not copy-pasted. Common anti-patterns include hardcoded sleeps (time.sleep or wait_for_timeout 'just in case'), CSS/XPath locators that break on every markup refactor, test interdependencies (Test B relying on data Test A created), and assertion-free tests that click through a flow without verifying anything. A framework other engineers will onboard onto needs a README, inline docstrings on non-obvious utilities, and a docs/architecture.md explaining folder structure decisions.",
  "why": "Test code is production code — it runs on every merge and blocks releases when it fails. Poorly written tests are worse than no tests: they create false confidence, fail unpredictably, and become too scary to refactor. A test named test1 that fails in CI tells nobody what broke. A hardcoded sleep adds dead time across the whole suite for zero benefit. Test interdependencies break under parallel execution and make debugging a failure in Test B require reading Test A in a different file. Code review is the mechanism that prevents these problems from accumulating into an unmaintainable suite.",
  "when": "Establish code review habits as soon as a second person contributes to the framework — even informal review before merge. Apply the anti-patterns checklist (hardcoded sleeps, CSS locators, test interdependencies, assertion-free tests) on every PR from day one. Write docs/architecture.md when the framework structure is stable enough to document (after Chapter 29's restructure). Review documentation quality with the same rigor as test logic — a framework with excellent coverage but no docs is nearly as hard to maintain as one with poor coverage.",
  "practical": {
    "app": "Bizlevate HRMS — Framework PR review",
    "scenario": "A junior QA engineer submits a PR with three new leave-module tests. The reviewer finds test1 and test2 with non-descriptive names, a time.sleep(3) before clicking the Approve button, and a CSS locator div.container > ul.list > li:nth-child(3) that duplicates logic already in leave_page.py.",
    "pass": "The reviewer requests renames to test_leave_approval_succeeds_for_valid_request and test_leave_approval_fails_for_insufficient_balance, replaces time.sleep with the existing wait_for_toast_to_disappear utility, and moves the duplicated click logic into leave_page.approve_request(). The PR merges cleanly and the tests survive the next UI refactor.",
    "fail": "The PR merges without review. Three months later, a CSS class rename breaks the nth-child locator in 4 tests across 2 files. Nobody knows which tests cover leave approval because the names are test1 and test2. Fixing the locator requires reading every test file manually."
  },
  "advantages": [
    "Descriptive test names make CI failure notifications self-explanatory",
    "DRY page object methods mean locator changes update one file, not every test",
    "Anti-pattern checklist catches hardcoded sleeps and fragile locators before they merge",
    "Documentation standards make framework onboarding fast for new contributors",
    "Code review culture prevents test interdependencies that break under parallel execution",
    "Reviewing for assertion quality catches tests that click through flows without verifying outcomes"
  ],
  "limitations": [
    "Code review adds latency to PR merges — balance thoroughness with velocity",
    "Anti-pattern rules require reviewer knowledge — inconsistent review quality if only one person reviews",
    "Documentation standards are only valuable if kept current — stale docs are worse than none",
    "DRY can be over-applied — extracting a one-off action into a page object method adds indirection with no reuse benefit",
    "Review habits are cultural — they erode under deadline pressure without team commitment"
  ],
  "tools": [
    {
      "name": "GitHub Pull Request Reviews",
      "sub": "Code Review",
      "url": "https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/reviewing-changes-in-pull-requests",
      "desc": "GitHub Pull Request reviews are the standard mechanism for code review in most teams. Reviewers leave inline comments on specific lines, request changes, or approve. For Playwright frameworks, a PR review checklist covers: descriptive test names, no hardcoded sleeps, role-based locators preferred over CSS/XPath, no duplicated locator strings, assertions present on every test, and no test interdependencies. Branch protection rules can require at least one approval before merge.",
      "adv": [
        "Inline comments on specific lines — precise feedback on exact problems",
        "Branch protection rules enforce review before merge automatically",
        "Review history is permanent — useful for onboarding new reviewers",
        "Integrates with CI status checks — review and test pass both required before merge"
      ],
      "lim": [
        "Review quality depends entirely on reviewer knowledge and thoroughness",
        "No built-in automation checklist — must be maintained as team documentation",
        "Large PRs with many test files are harder to review thoroughly",
        "Requires GitHub (or equivalent) — not applicable to local-only workflows"
      ],
      "steps": [
        {
          "t": "Step 1 — Create a PR review checklist",
          "p": "Add to docs/ or the PR template:",
          "c": "## Test PR Checklist\n- [ ] Test names describe scenario and expected outcome\n- [ ] No time.sleep or wait_for_timeout 'just in case'\n- [ ] Role-based locators used (get_by_role, get_by_label)\n- [ ] No duplicated locator strings — use page object methods\n- [ ] Every test has at least one assertion\n- [ ] No test depends on data created by another test"
        },
        {
          "t": "Step 2 — Enable branch protection",
          "p": "Require review before merge:",
          "c": "# GitHub → Settings → Branches → Branch protection rules\n# Require a pull request before merging: ✓\n# Require approvals: 1"
        },
        {
          "t": "Step 3 — Review a test PR using the checklist",
          "p": "Leave inline comments on specific violations:",
          "c": "# Inline comment on time.sleep(3):\n# \"Replace with wait_for_toast_to_disappear() from utils/wait_helpers.py\"\n\n# Inline comment on def test1(page):\n# \"Rename to test_leave_approval_fails_for_insufficient_balance\""
        }
      ]
    }
  ],
  "contentMarkdown": "Naming conventions, DRY principles # Avoid: def test1(page): ... # Prefer: descriptive, scenario-revealing names def test_login_fails_with_incorrect_password(page): ...\n\n## Naming conventions, DRY principles\n\n...\n\n...\n\nPointers: A test name should describe the scenario and expected outcome well enough that a failure notification alone (just the test name, no need to open the code) tells a reader roughly what broke. DRY (Don't Repeat Yourself) in this context mainly means:\n\nobject method (Chapter 14) or a utility function (Chapter 29), not copy-pasted.\n\n```\n# Prefer: descriptive, scenario-revealing names\n\ndef test_login_fails_with_incorrect_password(page):\n\nif the same locator or action sequence appears in three or more tests, it belongs in a page\n\n# Avoid:\n\ndef test1(page):\n```\n\n## Common anti-patterns in automation\n\nexplicit state-based waits (Chapter 8).\n\nevery minor markup refactor.\n\n(e.g., relying on data another test created). This breaks under parallel execution\n\n(Chapter 22) and makes debugging a failure much harder, since the \"real\" cause\n\nmight be in an unrelated test file.\n\ncorrect behavior.\n\nlogical grouping, instead of organized-by-feature files (Chapter 29's folder\n architecture).\n\n## Documentation standards for shared frameworks\n\nA framework other engineers will onboard onto needs:\n\nonly this file.\n\nshopping cart as a side effect\").\n\npatterns, and folder structure decisions — so contributors don't reinvent or\n\ndiverge from established patterns.\n\nPointers: This chapter plays directly to your existing QA documentation strength — a framework with excellent test coverage but no documentation is nearly as hard to maintain as one with poor coverage, since new contributors can't safely extend what they don't understand.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
