import type { ChapterRecord } from "../../../types";

/** White Box Testing */
export const chapter = {
  "id": "tt-white-box-testing",
  "overlayNo": 26,
  "title": "White Box Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 7 · By Knowledge",
  "partName": "Part 7 · By Knowledge",
  "overviewText": "White box testing examines and tests the internal structure, logic, and code paths of an application directly — the tester (usually a developer) has full visibility into the source code and designs tests specifically to exercise particular branches, conditions, and statements within it.",
  "why": "Some bugs only live inside logic that's invisible from the outside — an untested conditional branch, a loop that mishandles one specific edge case, an off-by-one error buried in a calculation. Black box testing can miss these entirely if the right input never happens to be tried; white box testing finds them directly by deliberately targeting every path through the code, and it's what makes code coverage a meaningful, measurable metric.",
  "when": "Continuously during development, primarily by the developers writing the code themselves — unit tests are the most common form of white box testing. It's run on every commit via CI, using coverage tools to confirm which parts of the codebase are (and aren't) actually being exercised by tests.",
  "practical": {
    "app": "HRMS Leave Balance Calculation Function",
    "scenario": "A coverage report shows the calculateRemainingLeave() function has 80% line coverage, but the branch handling a negative starting balance (a data correction scenario) is never exercised by any test.",
    "pass": "A new unit test specifically targeting the negative-balance branch is added, coverage rises to 96%, and the bug is caught and fixed before it ever reaches a real employee record.",
    "fail": "The untested branch contains a bug — it returns a positive number instead of correctly flagging the account for HR review — invisible until a real data-correction case eventually hits production."
  },
  "advantages": [
    "Directly targets internal logic paths that black box testing can miss entirely",
    "Coverage tools make 'how much of the code is actually tested' a concrete, measurable number",
    "Catches edge cases and boundary conditions buried deep inside functions, not just visible at the UI/API surface",
    "Tightly integrated into the development workflow — usually run automatically on every commit"
  ],
  "limitations": [
    "Requires source code access and programming knowledge — not something a non-technical tester can typically do",
    "High coverage percentage doesn't guarantee correctness — a line can be 'covered' without meaningful assertions",
    "Tests are tied to implementation details, so a significant refactor can require rewriting tests even if user-facing behavior didn't change",
    "Doesn't verify the user-facing experience at all — an internal unit can be 100% covered while the UI is broken"
  ],
  "tools": [
    {
      "name": "Istanbul (nyc)",
      "sub": "JavaScript Code & Branch Coverage Engine",
      "url": "https://istanbul.js.org",
      "desc": "A JavaScript code coverage tool that instruments code during test runs and reports exactly which lines, branches, functions, and statements were executed by the test suite — and which were missed.",
      "adv": [
        "Industry standard for Node.js and modern frontend frameworks (Jest, Vitest, Mocha)",
        "Provides interactive line-by-line HTML coverage heatmaps",
        "Strict threshold enforcement in CI (e.g. fail if branch coverage < 85%)",
        "Highlights uncovered ternary conditions and catch blocks"
      ],
      "lim": [
        "Adds minor instrumentation overhead during test execution"
      ],
      "steps": [
        {
          "t": "Step 1 — Run test suite with coverage instrumentation",
          "p": "Execute Jest or Vitest with the --coverage flag enabled.",
          "c": "npx jest --coverage --collectCoverageFrom=\"src/lib/**/*.ts\""
        },
        {
          "t": "Step 2 — Inspect branch coverage report",
          "p": "Review statement, branch, function, and line coverage percentages.",
          "c": "File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s\nleaveCalculator.ts    |   85.71 |    66.66 |     100 |   85.71 | 24-26 (Negative balance branch)"
        },
        {
          "t": "Step 3 — Write white box unit test for uncovered branch",
          "p": "Add test case supplying negative balance inputs to reach line 24.",
          "c": "test('flags HR review when starting balance is negative', () => {\n  const result = calculateRemainingLeave({ balance: -2, requested: 3 });\n  expect(result.status).toBe('NEEDS_HR_REVIEW');\n});"
        },
        {
          "t": "Step 4 — Enforce CI coverage thresholds in package.json",
          "p": "Fail build if coverage drops below specified quality bar.",
          "c": "\"jest\": {\n  \"coverageThreshold\": {\n    \"global\": {\n      \"branches\": 90,\n      \"functions\": 95,\n      \"lines\": 90\n    }\n  }\n}"
        }
      ]
    },
    {
      "name": "Coverage.py",
      "sub": "Python Code Execution & Branch Analyzer",
      "url": "https://coverage.readthedocs.io",
      "desc": "The equivalent coverage tool for Python — measures which lines and branches of code are executed during a test run (typically via PyTest) and produces an HTML or terminal report highlighting what's covered.",
      "adv": [
        "Seamless integration with PyTest via pytest-cov",
        "Generates visual line-by-line color-coded HTML reports",
        "Tracks conditional branch coverage with --branch flag"
      ],
      "lim": [
        "Requires separate Python virtualenv configuration"
      ],
      "steps": [
        {
          "t": "Step 1 — Run PyTest with coverage tracking",
          "p": "Execute test suite with branch coverage enabled.",
          "c": "pytest --cov=hrms_payroll --cov-branch --cov-report=html tests/"
        },
        {
          "t": "Step 2 — Open HTML coverage viewer",
          "p": "Inspect colored red lines representing untested exception handlers.",
          "c": "open htmlcov/index.html"
        },
        {
          "t": "Step 3 — Add targeted test case to hit uncovered branch",
          "p": "Verify 100% path coverage achieved across calculation module.",
          "c": "def test_negative_leave_balance():\n    assert calculate_leave(balance=-1, days=2) == Flag.HR_AUDIT"
        }
      ]
    }
  ],
  "contentMarkdown": "## Code & Branch Coverage Instrumentation\n\nInstrument test suites to measure statement, branch, function, and line coverage metrics.\n\n```\nnpm test -- --coverage --coverageThreshold='{\"global\":{\"branches\":90}}'\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
