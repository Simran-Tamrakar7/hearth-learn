import type { ChapterRecord } from "../../../types";

/** Snapshot Testing */
export const chapter = {
  "id": "tt-snapshot-testing",
  "overlayNo": 71,
  "title": "Snapshot Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 18 · Backend, Network, Snapshot & Soak",
  "partName": "Part 18 · Backend, Network, Snapshot & Soak",
  "overviewText": "Snapshot testing captures the rendered output of a component or function — typically a serialized representation of UI structure, not a visual screenshot — the first time a test runs, saves it as a reference snapshot, and then automatically compares future test runs against that saved snapshot, flagging any difference for review.",
  "why": "For UI components with complex output (deeply nested structure, many conditional branches), writing individual assertions to check every possible detail of the rendered output by hand is tedious and easy to under-specify — something can change without any specific assertion catching it. Snapshot testing sidesteps that by capturing the entire actual output at once and letting any future difference, however small, surface automatically for a human to review and explicitly approve or reject.",
  "when": "Particularly well suited to UI component testing (especially in component-based frameworks like React) where the rendered structure is complex enough that manually asserting on every detail would be impractical — used alongside, not instead of, more targeted functional/interaction tests for the same component.",
  "practical": {
    "app": "HRMS Employee Card Component",
    "scenario": "A snapshot test captures the rendered output of the employee summary card component used throughout the HRMS dashboard.",
    "fail": "After an unrelated styling change to a shared component, the snapshot test fails, revealing the employee card's rendered output now unexpectedly includes an extra, unintended wrapping div — an accidental structural regression caught immediately, which no individual hand-written assertion had been specifically checking for.",
    "failLabel": "Fail (caught)",
    "pass": "The unintended wrapping div is removed, the snapshot test passes again against the original, correct reference snapshot, confirming the styling change didn't unintentionally alter this component's structure.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Catches any unintended change to a component's output automatically, without needing to write and maintain individual assertions for every possible detail",
    "Very fast to write initially — a single line captures comprehensive coverage of the entire current output",
    "Makes the review process explicit: every actual change requires a deliberate accept/reject decision, rather than silently passing or silently failing",
    "Particularly efficient for components with large, complex, deeply nested output structures"
  ],
  "limitations": [
    "Can create a habit of blindly approving/updating snapshots without genuinely reviewing what changed, which defeats the entire purpose of the technique",
    "A snapshot failure indicates that something changed, but not why it changed or whether that change is actually correct — still requires human judgment every time",
    "Large, complex snapshots can be hard for a human to meaningfully review in detail, especially as they grow",
    "Doesn't test actual interactive behavior at all — pairs with, but doesn't replace, functional/interaction testing of the same component"
  ],
  "tools": [
    {
      "name": "Jest",
      "sub": "toMatchSnapshot()",
      "url": "https://jestjs.io",
      "seeChapter": 1,
      "desc": "A JavaScript testing framework with built-in snapshot testing support — automatically serializes a component's rendered output, saves it to a snapshot file on first run, and on every subsequent run compares the current output against that saved file, failing the test if anything has changed.",
      "adv": [
        "Catches unintended output changes without asserting every detail by hand",
        "One line of setup covers the entire current output",
        "Every change requires an explicit accept or reject",
        "Efficient for large, nested component trees"
      ],
      "lim": [
        "Blind snapshot updates defeat the technique",
        "A failure says that something changed, not whether it is correct",
        "Large snapshots are hard to review in detail",
        "Does not test interactive behavior"
      ],
      "steps": [
        {
          "t": "Step 1 — Render the output in a test",
          "p": "The component or function whose structure you want locked."
        },
        {
          "t": "Step 2 — Call toMatchSnapshot()",
          "p": "First run saves the current output as the accepted reference file.",
          "c": "test(\"employee card structure\", () => {\n  const tree = renderer.create(<EmployeeCard employee={fixture} />).toJSON();\n  expect(tree).toMatchSnapshot();\n});"
        },
        {
          "t": "Step 3 — Re-run — Jest diffs against the file",
          "p": "Any difference fails the test."
        },
        {
          "t": "Step 4 — Read the diff",
          "p": "Intentional component update, or accidental regression?"
        },
        {
          "t": "Step 5 — If intentional, update the snapshot",
          "p": "Jest's update command accepts the new output as the reference going forward."
        },
        {
          "t": "Step 6 — If unintentional, fix the component",
          "p": "Do not blindly update the snapshot."
        }
      ]
    }
  ],
  "contentMarkdown": "## toMatchSnapshot then review diffs\n\nNever blindly update.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
