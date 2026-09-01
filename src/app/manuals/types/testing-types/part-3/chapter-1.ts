import type { ChapterRecord } from "../../../types";

/** Sanity Testing */
export const chapter = {
  "id": "tt-sanity-testing",
  "overlayNo": 9,
  "title": "Sanity Testing",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 3 · Functional",
  "partName": "Part 3 · Functional",
  "overviewText": "Sanity testing is a narrow, focused check run after a specific bug fix or minor change — not the whole application, just the area that changed and its immediate neighbors — to confirm the fix works and didn't break anything obviously adjacent, before committing to a fuller regression pass.",
  "why": "After a fix, the natural question is \"did that actually work, and did it break anything nearby?\" Running a full regression suite for every single small fix is wasteful when the change is narrow. Sanity testing answers that immediate question quickly, so a fix can be confidently merged or immediately flagged as incomplete without waiting on a full test cycle.",
  "when": "Right after a bug fix, a small config change, or a minor patch — before merging, and before (or sometimes instead of, for very low-risk changes) a full regression run. It's the quick \"does this look sane\" check between smoke testing and full regression.",
  "practical": {
    "app": "HRMS — Single Bug Fix Sanity Check",
    "scenario": "A developer fixes a bug where employee date of birth in the profile editor was saving with an off-by-one timezone offset. The tester runs a sanity check on the DOB picker, saves the profile, and checks adjacent fields (Join Date, Anniversary Date) to confirm the fix works and didn't break nearby date inputs.",
    "pass": "DOB saves correctly as 1995-04-12, Join Date and Anniversary fields remain intact and save without corruption.",
    "fail": "Fix for DOB inadvertently breaks Join Date parsing, causing 500 error on profile update — caught in minutes before full regression."
  },
  "advantages": [
    "Very fast — targeted at exactly the change, not the whole application",
    "Gives quick confidence that a specific fix actually resolved the issue",
    "Avoids the wasted cost of a full regression run on every small patch",
    "Naturally performed by whoever understands the change best"
  ],
  "limitations": [
    "Narrow by design — will not catch problems outside the checked area",
    "Relies heavily on the tester correctly judging what's 'adjacent' to the change",
    "No formal record or repeatability — it's judgment-based, not scripted",
    "Not a substitute for regression testing before a real release"
  ],
  "tools": [
    {
      "name": "Manual Testing",
      "sub": "Judgment-Based Verification",
      "url": null,
      "seeChapter": 5,
      "desc": "Sanity testing is inherently manual and judgment-based (see Chapter 5): a tester who understands the fix decides which handful of related checks actually matter, then runs exactly those — no script, because the scope is different every time.",
      "adv": [
        "Very fast — targeted at exactly the change, not the whole application",
        "Gives quick confidence that a specific fix actually resolved the issue",
        "Avoids the wasted cost of a full regression run on every small patch",
        "Naturally performed by whoever understands the change best"
      ],
      "lim": [
        "Narrow by design — will not catch problems outside the checked area",
        "Relies heavily on the tester correctly judging what's 'adjacent' to the change",
        "No formal record or repeatability — it's judgment-based, not scripted",
        "Not a substitute for regression testing before a real release"
      ],
      "steps": [
        {
          "t": "Step 1 — Read the fix description",
          "p": "Understand exactly which files, components, and database models were touched.",
          "c": "PR #412: \"Fix timezone offset on employee DOB datepicker\"\nChanged: components/DatePicker.tsx, utils/dateFormatter.ts"
        },
        {
          "t": "Step 2 — Identify target & adjacent functionality",
          "p": "Target: Profile DOB field. Adjacent: Join Date, Probation End Date, Age calculation widget.",
          "c": "Sanity Scope: 1. Edit DOB -> 2. Save -> 3. Reload Profile -> 4. Check Join Date -> 5. Verify Age Badge"
        },
        {
          "t": "Step 3 — Verify original bug is resolved",
          "p": "Reproduce exact conditions from original defect report.",
          "c": "Input: Select \"1992-06-15\" (UTC+5:45 timezone)\nExpected: Displayed as \"June 15, 1992\" after saving\nActual: Saved and displayed as June 15, 1992 (Fixed)"
        },
        {
          "t": "Step 4 — Spot-check adjacent fields",
          "p": "Verify neighboring date pickers and calculated fields still behave normally.",
          "c": "Join Date: \"2021-01-10\" remains uncorrupted\nCalculated Age: \"33 years\" updates dynamically"
        },
        {
          "t": "Step 5 — Confirm no regression in narrow area",
          "p": "Ensure profile form submissions still return HTTP 200 without console errors.",
          "c": "Network: PUT /api/employees/1042 -> 200 OK (38ms)\nConsole: 0 errors / 0 warnings"
        },
        {
          "t": "Step 6 — Sign off sanity gate",
          "p": "Mark fix as verified in PR comments, unblocking merge or promotion to staging.",
          "c": "Verdict: SANITY PASSED -> Safe to merge into develop branch"
        }
      ]
    }
  ],
  "contentMarkdown": "## Targeted Bug Verification\n\nExecute narrow sanity verifications directly targeting modified components and immediate dependencies.\n\n```\ngit diff main..feature-branch\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
