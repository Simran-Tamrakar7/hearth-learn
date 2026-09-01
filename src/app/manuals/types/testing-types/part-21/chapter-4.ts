import type { ChapterRecord } from "../../../types";

/** Diff / Golden Master Testing */
export const chapter = {
  "id": "tt-golden-master-testing",
  "overlayNo": 84,
  "title": "Diff / Golden Master Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 21 · Coverage, OAT, Cloud & Golden Master",
  "partName": "Part 21 · Coverage, OAT, Cloud & Golden Master",
  "overviewText": "Golden master testing (also called characterization testing) captures a known-good, trusted output — the \"golden master\" — for a given set of inputs, then automatically diffs all future output against that saved reference, flagging any difference for review, without requiring the tester to actually understand or hand-write individual assertions about why that output is correct.",
  "why": "Legacy code with little or no existing test coverage is often too risky to refactor confidently, precisely because nobody fully understands every rule buried inside it well enough to write correct assertions from scratch — but a golden master doesn't require that understanding at all; it only requires that the current output be trusted as correct, which can then act as a safety net protecting against any unintended change during refactoring, even without fully understanding every rule that produced it.",
  "when": "Specifically before refactoring legacy or poorly-understood code that lacks adequate existing test coverage — as a protective safety net during the refactor itself, not as a long-term substitute for genuine, understood test coverage once the refactor is complete.",
  "practical": {
    "app": "HRMS Legacy Tax Calculation Engine",
    "scenario": "Before refactoring Bizlevate's old, sparsely-documented tax-calculation engine, the team captures its current output as a golden master across a representative range of salary inputs.",
    "fail": "After the refactor, running the same inputs and diffing against the golden master reveals the new code produces a different result for salaries exactly at a tax-bracket boundary — an accidental regression in boundary-handling logic introduced during the refactor, which nobody on the team fully understood well enough to have written a targeted assertion for in advance.",
    "failLabel": "Fail (caught)",
    "pass": "The boundary-handling bug is corrected in the refactored code; re-running the same representative inputs and diffing against the golden master shows zero differences, confirming the refactor preserved the exact original behavior.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Protects legacy code during a refactor without requiring the refactoring team to first fully reverse-engineer every business rule inside it",
    "Very low setup cost — no need to write assertions from scratch, only to capture and trust the existing output",
    "The plain-text diff tools required are free and already present on virtually every development machine",
    "Provides genuine, concrete confidence during a refactor that would otherwise be an unverified leap of faith"
  ],
  "limitations": [
    "Only as trustworthy as the assumption that the original captured output was actually correct — a golden master captured from already-buggy output simply preserves that bug",
    "A flagged diff shows that something changed, not why, or whether the change is actually correct — still requires human judgment every time",
    "Doesn't explain or document the underlying business rules at all — it's a safety net for refactoring, not a substitute for genuinely understanding and testing the logic",
    "Large or highly complex outputs can produce diffs that are tedious and error-prone for a human to meaningfully review in full"
  ],
  "tools": [
    {
      "name": "script diff",
      "sub": "diff / git diff",
      "url": null,
      "desc": "The command-line comparison tools already present on virtually every development machine — free, universal, and sufficient for text-based output without needing any specialized tooling. For a small number of outputs, comparing current output against the saved reference by eye remains a valid, zero-setup starting point.",
      "adv": [
        "No reverse-engineering every buried rule first",
        "Capture trusted output — no assertions from scratch",
        "diff and git diff are already on the machine",
        "Concrete confidence during an otherwise unverified refactor"
      ],
      "lim": [
        "A buggy original becomes a preserved bug",
        "A diff shows that, not why or whether it is correct",
        "Not a substitute for understanding the logic",
        "Large outputs are hard for a human to review in full"
      ],
      "steps": [
        {
          "t": "Step 1 — Save trusted output",
          "p": "Representative inputs → reference golden master file."
        },
        {
          "t": "Step 2 — After a change, save new output",
          "p": "Same inputs, separate file.",
          "c": "diff old_output.txt new_output.txt"
        },
        {
          "t": "Step 3 — Diff line by line",
          "p": "diff or git diff if both files are tracked."
        },
        {
          "t": "Step 4 — Classify each difference",
          "p": "Intentional consequence, or accidental regression?"
        },
        {
          "t": "Step 5 — If intentional, update the master",
          "p": "New output becomes the reference going forward."
        },
        {
          "t": "Step 6 — If unintentional, fix the code",
          "p": "Do not patch the reference file to hide a refactor bug."
        }
      ]
    }
  ],
  "contentMarkdown": "## Capture, change, diff\n\nIf unintentional, fix the code, not the master.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
