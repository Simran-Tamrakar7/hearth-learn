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
  "contentMarkdown": "## Naming conventions\n\nConsistent naming makes tests readable in reports, code review, and CI logs without opening the source file.\n\n```python\n# Test functions — describe behavior, not implementation\n# Good\ndef test_admin_can_approve_pending_leave_request(page, leave_page): ...\ndef test_employee_cannot_approve_own_leave_request(page, leave_page): ...\n\n# Bad\ndef test_leave_1(page): ...\ndef test_click_approve_button(page): ...\n```\n\n```python\n# Page objects — {Feature}Page, methods are verbs\nclass LeaveApprovalPage:\n    def open_pending_queue(self): ...\n    def approve_request(self, employee_name: str): ...\n    def reject_request(self, employee_name: str, reason: str): ...\n```\n\n```python\n# Locators — prefer role and label over CSS\n# Good\npage.get_by_role(\"button\", name=\"Approve\")\npage.get_by_label(\"Rejection reason\")\n\n# Bad\npage.locator(\"#btn-approve-123\")\npage.locator(\"div.modal > form > textarea:nth-child(2)\")\n```\n\nFile names: `test_{feature}.py` for tests, `{feature}_page.py` for page objects. Match the application module name so navigation is intuitive.\n\n## Anti-patterns to reject in code review\n\n**Hardcoded waits**\n\n```python\n# Anti-pattern\nimport time\npage.click(\"#submit\")\ntime.sleep(3)\nassert page.locator(\".success\").is_visible()\n\n# Correct\npage.get_by_role(\"button\", name=\"Submit\").click()\npage.get_by_text(\"Success\").wait_for(state=\"visible\")\n```\n\n**Locators in test files**\n\n```python\n# Anti-pattern — locator leaks into test\ndef test_approve_leave(page):\n    page.locator(\"[data-testid=approve-btn]\").click()\n\n# Correct — locator lives in page object\ndef test_approve_leave(page, leave_page):\n    leave_page.approve_pending_request(\"Jane Doe\")\n```\n\n**Tests that depend on execution order**\n\n```python\n# Anti-pattern — test_b fails if test_a did not run first\ncreated_id = None\n\ndef test_a_create_user(page):\n    global created_id\n    created_id = create_user()\n\ndef test_b_delete_user(page):\n    delete_user(created_id)  # breaks under parallel execution\n```\n\nEach test must set up and tear down its own data. Shared state across tests breaks parallel runs and produces order-dependent flakes.\n\n**Assertion-free tests**\n\n```python\n# Anti-pattern — no assertion, always passes\ndef test_dashboard_loads(page):\n    page.goto(\"/dashboard\")\n\n# Correct\ndef test_dashboard_loads(page):\n    page.goto(\"/dashboard\")\n    page.get_by_role(\"heading\", name=\"Dashboard\").wait_for()\n```\n\n**Over-mocking in E2E tests**\n\nIf every API call is stubbed, you are testing the frontend in isolation — that is a component test, not an E2E test. Reserve API mocking for error-path scenarios and slow third-party services.\n\n## Documentation standards\n\nEvery page object method that is not self-evident gets a one-line docstring. Every marker gets a description in `pytest.ini`. Every environment variable gets a row in the project README.\n\n```python\nclass LeavePage(BasePage):\n    def submit_request(self, leave_type: str, start: str, end: str) -> None:\n        \"\"\"Fill and submit a new leave request form.\n\n        Args:\n            leave_type: One of 'Annual', 'Sick', 'Personal'.\n            start: ISO date string (YYYY-MM-DD).\n            end: ISO date string (YYYY-MM-DD).\n        \"\"\"\n        ...\n```\n\n```markdown\n## Environment Variables\n\n| Variable | Required | Default | Description |\n|----------|----------|---------|-------------|\n| BASE_URL | Yes | — | Application under test |\n| TEST_USER | Yes | — | Login email for test account |\n| TEST_PASSWORD | Yes | — | Login password for test account |\n| HEADLESS | No | true | Run browsers headless |\n```\n\n## Code review checklist\n\nBefore approving a Playwright PR, verify:\n\n1. No `time.sleep()` — all waits are Playwright-native\n2. Locators use role/label/testid, not CSS chains\n3. Test sets up and tears down its own data\n4. No hardcoded URLs or credentials — uses `Settings`\n5. New tests have appropriate markers (`smoke`, `regression`, module)\n6. Page object methods are reused, not duplicated\n7. At least one meaningful assertion per test\n8. Failure artifacts configured (screenshot/trace on failure)\n\nReject PRs that add tests without assertions or that copy-paste login flows instead of using fixtures.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
