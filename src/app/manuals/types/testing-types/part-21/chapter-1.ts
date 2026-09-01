import type { ChapterRecord } from "../../../types";

/** Statement/Branch/Path Coverage Testing */
export const chapter = {
  "id": "tt-coverage-testing",
  "overlayNo": 81,
  "title": "Statement/Branch/Path Coverage Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 21 · Coverage, OAT, Cloud & Golden Master",
  "partName": "Part 21 · Coverage, OAT, Cloud & Golden Master",
  "overviewText": "Coverage testing measures, in concrete percentages, how much of the underlying source code a test suite actually exercises when it runs — statement coverage (has this line executed at all?), branch coverage (has each side of every if/else executed?), and path coverage (have all the distinct combinations of branches through a function executed?) — each a progressively stricter measure of the same underlying question.",
  "why": "A test suite can pass every single test and still leave large parts of the actual code never executed at all — an entire error-handling branch, an else clause nobody wrote a test for, a rare combination of conditions nobody thought to construct. Coverage testing makes that gap visible and measurable instead of a matter of guesswork, turning \"I think we test this pretty well\" into a specific, actionable number and a specific list of exactly which lines and branches are untested.",
  "when": "Continuously, as a standard part of the test suite's own reporting — reviewed especially closely for business-critical logic (calculations, approval workflows, financial code), where an untested branch represents genuine, concrete risk rather than an abstract metric.",
  "practical": {
    "app": "HRMS Leave Approval Logic",
    "scenario": "Coverage.py reveals the leave-approval function's else branch — handling a manager who has since left the company — has zero coverage.",
    "fail": "The existing test suite passes at 100% green, but the never-executed branch contains a bug: when the assigned approving manager has been deactivated, the function throws an unhandled exception instead of routing to a fallback approver — invisible until a real employee's leave request genuinely hits that exact scenario in production.",
    "pass": "A test case is added specifically exercising the deactivated-manager branch, the fallback-approver logic is corrected, and the coverage report confirms the previously-red branch is now green and correctly verified.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Converts a vague sense of \"we probably test this reasonably well\" into a specific, objective, line-level number",
    "Directly identifies exactly which lines/branches need a new test, rather than leaving the tester to guess",
    "Both tools are free, well-established, and integrate directly into standard JS/Python test workflows",
    "Branch coverage specifically catches the common and risky gap of an entirely untested else/error-handling path"
  ],
  "limitations": [
    "A high coverage percentage confirms code was executed, not that it was correctly verified — a test can execute a line without meaningfully asserting on its result",
    "Chasing 100% coverage as a goal in itself can produce low-value tests written purely to hit an uncovered line, not to verify real behavior",
    "Path coverage in particular can grow combinatorially explosive for functions with many conditions, making full path coverage impractical for complex logic",
    "Coverage tooling measures code that ran, not code that's missing entirely — it can't reveal a scenario nobody wrote any code path for"
  ],
  "tools": [
    {
      "name": "Istanbul (nyc)",
      "sub": "JavaScript coverage",
      "url": "https://istanbul.js.org",
      "seeChapter": 26,
      "desc": "A free, open-source JavaScript code-coverage tool — typically run via its nyc command-line wrapper, or built directly into a test runner like Jest — that instruments code during a test run and produces a detailed report of exactly which statements, branches, and lines were and weren't executed.",
      "adv": [
        "Line-level number instead of a vague sense of coverage",
        "Shows exactly which branches still need a test",
        "Free and built into Jest via --coverage",
        "Branch coverage catches untested else/error paths"
      ],
      "lim": [
        "Executed is not the same as correctly asserted",
        "Chasing 100% produces low-value tests",
        "Full path coverage explodes combinatorially",
        "Cannot reveal a scenario nobody wrote a path for"
      ],
      "steps": [
        {
          "t": "Step 1 — Run the suite through Istanbul",
          "p": "nyc <test command> or jest --coverage.",
          "c": "npx jest --coverage"
        },
        {
          "t": "Step 2 — Open the HTML report",
          "p": "Clearest, most navigable view of what ran."
        },
        {
          "t": "Step 3 — Hunt red, not just the percentage",
          "p": "Uncovered lines and branches."
        },
        {
          "t": "Step 4 — Write a test for each uncovered branch",
          "p": "The else clause, the error-handling block — that exact path."
        },
        {
          "t": "Step 5 — Re-run to confirm green",
          "p": "Previously-red lines should now be covered."
        },
        {
          "t": "Step 6 — Track the percentage as a trend",
          "p": "Not a single point-in-time snapshot."
        }
      ]
    },
    {
      "name": "Coverage.py",
      "sub": "Python coverage",
      "url": "https://coverage.readthedocs.io",
      "seeChapter": 26,
      "desc": "The equivalent free, well-established coverage tool for Python — instruments code during a pytest (or other test runner) execution and produces both a terminal summary and a detailed, navigable HTML report of exactly what was and wasn't exercised.",
      "adv": [
        "Terminal summary plus navigable HTML",
        "Prioritize business-critical uncovered branches first",
        "--branch measures more than statement coverage",
        "Free and standard in Python test workflows"
      ],
      "lim": [
        "Executed is not verified",
        "100% as a goal produces noise tests",
        "Full path coverage is often impractical",
        "Missing code paths stay invisible"
      ],
      "steps": [
        {
          "t": "Step 1 — Instrument the run",
          "p": "coverage run -m pytest",
          "c": "coverage run -m pytest\ncoverage report\ncoverage html --branch"
        },
        {
          "t": "Step 2 — Terminal or HTML",
          "p": "coverage report for a summary; coverage html for a browsable view."
        },
        {
          "t": "Step 3 — Module by module, red lines first",
          "p": "Especially in calculations and financial code."
        },
        {
          "t": "Step 4 — Prefer --branch",
          "p": "Statement coverage alone can hide an untested else."
        },
        {
          "t": "Step 5 — Add tests, re-check the report",
          "p": "Confirm the gap actually closed."
        }
      ]
    }
  ],
  "contentMarkdown": "## Report, then write the missing branch test\n\nPrefer branch coverage over statement-only.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
