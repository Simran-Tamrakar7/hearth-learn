import type { ChapterRecord } from "../../../types";

/** Retesting (Confirmation Testing) */
export const chapter = {
  "id": "tt-retesting",
  "overlayNo": 31,
  "title": "Retesting (Confirmation Testing)",
  "minutes": 15,
  "level": "beginner",
  "phase": "Part 8 · Release & Quality",
  "partName": "Part 8 · Release & Quality",
  "overviewText": "Retesting — also called confirmation testing — re-runs the exact test case that originally found a specific bug, after a fix has been applied, to confirm that specific bug is actually resolved. It's distinct from regression testing (Chapter 10): retesting checks only the one thing that was reported broken, not the surrounding application.",
  "why": "A fix that looks correct in code review can still fail to actually resolve the reported issue — the wrong root cause was targeted, the fix was incomplete, or it only worked for some of the originally reported scenarios. Without retesting, a bug can be marked 'fixed' and closed based on developer confidence alone, only for the exact same reported behavior to resurface in front of a user.",
  "when": "Every time a bug fix is submitted for verification — before the associated ticket is closed, and always alongside (not instead of) a related sanity or regression check of nearby functionality.",
  "practical": {
    "app": "HRMS Duplicate Leave Request Bug",
    "scenario": "A previously reported bug — submitting a leave request twice via double-click created two duplicate entries — is fixed and sent back for verification.",
    "pass": "Retesting the exact same steps on both Chrome and Firefox confirms only a single leave request is created in either case, and the ticket is closed with confidence.",
    "fail": "Retesting the exact original repro (double-clicking Submit) still creates a duplicate on Firefox, even though the fix was verified as working on Chrome — the fix only addressed one browser's event timing."
  },
  "advantages": [
    "Directly confirms the specific reported problem is actually resolved, not just assumed fixed based on the code change",
    "Very fast and targeted — reruns one specific case, not a broader suite",
    "Prevents prematurely closed bugs from silently resurfacing in front of real users",
    "Catches partial fixes that resolve only some of several originally reported variations"
  ],
  "limitations": [
    "Narrow by design — confirms only the specific reported bug, says nothing about surrounding functionality (that's what sanity/regression testing is for)",
    "Relies on the original bug report having clear, accurate, reproducible steps to retest against",
    "No formal automation — typically manual, since it's tied to one specific historical report each time",
    "Easy to skip under time pressure, which is exactly when a fix is most likely to be incomplete"
  ],
  "tools": [
    {
      "name": "Manual (Exact Repro Confirmation)",
      "sub": "Defect Verification & Closure Protocol",
      "url": "https://en.wikipedia.org/wiki/Software_testing#Retesting",
      "seeChapter": 5,
      "desc": "Retesting is inherently manual and specific (see Chapter 5): a tester reproduces the exact original steps that triggered the bug, using the exact original data and conditions where possible, to directly confirm the fix.",
      "adv": [
        "Definitively verifies bug resolution against original reported steps",
        "Validates across multiple reported platform variations (Chrome, Firefox, Safari)"
      ],
      "lim": [
        "Does not detect secondary side-effects or regressions in neighboring components"
      ],
      "steps": [
        {
          "t": "Step 1 — Open resolved defect ticket and read reproduction steps",
          "p": "Verify exact test preconditions, test data, and user environment.",
          "c": "Ticket: BUG-404: Rapid double-click on 'Apply Leave' inserts duplicate database row."
        },
        {
          "t": "Step 2 — Execute exact reproduction on patched build",
          "p": "Attempt rapid double-clicking on submit button across multiple browsers.",
          "c": "Action: Double click 'Apply Leave' (Delay: 40ms between clicks)\nResult: Button disables on first click; only 1 request sent."
        },
        {
          "t": "Step 3 — Verify across reported cross-browser variations",
          "p": "Retest on Chrome 128, Firefox 129, and Safari 17.",
          "c": "Chrome: PASS (1 record)\nFirefox: PASS (1 record)\nSafari: PASS (1 record)"
        },
        {
          "t": "Step 4 — Update ticket status to Verified / Closed",
          "p": "Attach screen recording proof and close ticket.",
          "c": "Status: VERIFIED FIXED -> Closed on Build v1.4.0-rc2"
        }
      ]
    }
  ],
  "contentMarkdown": "## Defect Verification & Closure Protocol\n\nRe-run exact original defect reproduction scripts against patched staging builds.\n\n```\nnpm run test -- tests/retest/bug-404.spec.ts\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
