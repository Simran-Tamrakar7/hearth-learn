import type { ChapterRecord } from "../../types";

/** Incremental Integration Testing */
export const chapter = {
  "id": "tt-incremental-integration-testing",
  "overlayNo": 89,
  "title": "Incremental Integration Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 23 · Incremental Integration, Spike, Session & Voice",
  "partName": "Part 23 · Incremental Integration, Spike, Session & Voice",
  "overviewText": "Incremental integration testing adds modules one at a time to an already-tested core, verifying each newly joined piece against what is already known-good before the next module is introduced — the opposite of Big Bang integration (Chapter 64), which waits until every module is ready and then combines them all at once.",
  "why": "When every module is wired together in a single Big Bang pass, a failure can live in any of them, or in any interaction between them, and isolating the cause means re-examining the entire assembled system from scratch. Incremental integration shrinks that search space to the single module just added and its boundary with the already-tested core, so defects are caught early — while the new piece is still small, fresh, and easy to fix — instead of after the whole chain is already live and entangled.",
  "when": "Whenever independently developed modules have a clear dependency order and can be integrated gradually — Attendance before Leave before Payroll, authentication before the features that depend on it — which is the default, more disciplined strategy for any system with separable modules. Use Big Bang (Chapter 64) only when modules genuinely cannot be meaningfully exercised until they all exist, or when schedule pressure leaves no room for a sequenced build-up.",
  "practical": {
    "app": "HRMS Attendance → Leave → Payroll Chain",
    "scenario": "Bizlevate integrates the Attendance, Leave, and Payroll modules incrementally: Attendance is tested as the core first, Leave is added against that verified core, then Payroll is added against both.",
    "fail": "Leave is joined to the already-tested Attendance core. Clock-in/out hours are not converted to the same unit Leave uses for deduction, so a full working day records as 8 hours in Attendance but only 0.33 days of leave — caught immediately at this step, before Payroll is ever wired in.",
    "failLabel": "Fail (caught early)",
    "pass": "The unit conversion is fixed at the Attendance–Leave boundary and re-verified against the same core. Payroll is added only after that step is green, so payslip calculations inherit a known-good hours-to-leave mapping instead of inheriting the unit bug.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Pinpoints a new defect to the single module just added, rather than the entire assembled system",
    "Catches integration bugs early, while the new piece is still small and cheap to fix",
    "Builds confidence in the core progressively — each green step is a known-good base for the next",
    "Does not require every module to be finished before any integration testing can begin"
  ],
  "limitations": [
    "Requires a planned sequence, stubs or drivers for modules not yet joined, and the discipline to stop and verify at each step",
    "Takes more calendar time than a single Big Bang pass, because each addition is a testing stage of its own",
    "A poorly chosen order (integrating a leaf before its dependency) recreates Big Bang confusion in miniature",
    "Stubs that do not faithfully stand in for the real module can hide the very boundary bugs the sequence is meant to find"
  ],
  "tools": [
    {
      "name": "Selenium",
      "sub": "Sequenced module chain",
      "url": "https://selenium.dev",
      "seeChapter": 6,
      "desc": "The same browser-automation suite from Automated Testing (Chapter 6), used here to drive a staged UI chain — Attendance, then Leave against Attendance, then Payroll against both — rather than a single Big Bang script that only runs once every module is present (contrast Chapter 64).",
      "adv": [
        "Each stage is a focused script against a known-good core plus one new module",
        "A red run at stage N localizes the fault to the module just added",
        "Broadest browser and language support of any automation tool",
        "Fits teams that already invest in Selenium for regression (Chapter 6)"
      ],
      "lim": [
        "Needs a planned sequence and enough of a UI (or test driver) at each stage to exercise the new boundary",
        "Stubs for not-yet-joined modules have to be maintained until the real module arrives",
        "No auto-waiting — flaky without disciplined explicit waits (Chapter 6)",
        "A single combined script that skips the intermediate asserts is Big Bang in disguise"
      ],
      "steps": [
        {
          "t": "Step 1 — Name the core and the order",
          "p": "Pick the first known-good module (Attendance) and the sequence it will grow by (Leave, then Payroll)."
        },
        {
          "t": "Step 2 — Automate the core alone",
          "p": "A Selenium script that clock-in / clock-out records a full working day correctly, with no Leave or Payroll UI involved yet.",
          "c": "def test_stage1_attendance_core(driver):\n    clock_in(driver, \"09:00\")\n    clock_out(driver, \"18:00\")\n    assert hours_worked(driver) == 8.0"
        },
        {
          "t": "Step 3 — Add the next module only",
          "p": "Join Leave to that verified core. Assert the new boundary — hours convert to leave days — before touching Payroll.",
          "c": "def test_stage2_attendance_plus_leave(driver):\n    clock_in(driver, \"09:00\")\n    clock_out(driver, \"18:00\")\n    apply_leave(driver, days=1)\n    assert leave_deducted_days(driver) == 1.0  # not 0.33 from raw hours"
        },
        {
          "t": "Step 4 — Stop on red",
          "p": "A failure here is in Leave or the Attendance–Leave boundary — not in Payroll, which is not in the build yet."
        },
        {
          "t": "Step 5 — Add Payroll only after stage 2 is green",
          "p": "Payslip assertions inherit the already-verified hours-to-leave mapping.",
          "c": "def test_stage3_attendance_leave_payroll(driver):\n    # core + leave already green\n    run_payroll(driver)\n    assert payslip_leave_days(driver) == 1.0"
        },
        {
          "t": "Step 6 — Keep the stages, do not collapse them",
          "p": "CI should still run stage 1, then 2, then 3 — a single all-modules script is Big Bang (Chapter 64), not incremental."
        }
      ]
    }
  ],
  "contentMarkdown": "## Add one module to a known-good core\n\nStop on red before the next join. Do not collapse stages into one Big Bang script.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
