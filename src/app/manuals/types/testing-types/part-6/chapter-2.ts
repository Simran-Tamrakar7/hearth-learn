import type { ChapterRecord } from "../../types";

/** Exploratory Testing */
export const chapter = {
  "id": "tt-exploratory-testing",
  "overlayNo": 22,
  "title": "Exploratory Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 6 · Other Testing Types",
  "partName": "Part 6 · Other Testing Types",
  "overviewText": "Exploratory testing is simultaneous learning, test design, and test execution — a tester actively explores the application without a predefined script, using their own judgment, curiosity, and growing understanding of the system to hunt for bugs that scripted tests were never written to find.",
  "why": "Scripted tests only find what they were explicitly written to check. A skilled tester exploring freely — trying unusual input combinations, unexpected navigation paths, or edge cases nobody thought to script — routinely finds real bugs that every other testing type in this manual misses entirely, simply because no one anticipated that specific scenario in advance.",
  "when": "Continuously, alongside scripted testing rather than instead of it — especially valuable on new features (before enough is known to write good scripts yet), and as a periodic supplement even on mature, heavily-scripted areas of the application.",
  "practical": {
    "app": "HRMS Leave Request Form",
    "scenario": "During a 90-minute exploratory session on the newly built leave request feature, a tester tries submitting the form with the browser's back button mid-submission, then resubmitting.",
    "pass": "The bug is fixed, and a new scripted regression test is added specifically for back-button resubmission, so exploratory testing effectively expanded the regression suite's coverage.",
    "fail": "Using back-then-resubmit creates two duplicate leave requests for the same dates, silently — no script had ever been written to check this specific navigation pattern, because no one anticipated it during scripted test design."
  },
  "advantages": [
    "Finds real bugs that no scripted test was ever written to catch, since it isn't limited by a predefined script",
    "Cheap to start — needs no tooling or setup, only a skilled, curious tester and time",
    "Builds deep, first-hand understanding of the application that improves the quality of future scripted tests too",
    "Particularly effective early on new features, before there's enough stability to script against yet"
  ],
  "limitations": [
    "Not repeatable or automatable by nature — the same session run twice can turn up different findings",
    "Effectiveness depends heavily on the individual tester's skill, domain knowledge, and curiosity",
    "No formal coverage guarantee — there's no way to confirm every important area was actually explored",
    "Hard to measure or report on in the same structured way as pass/fail scripted results"
  ],
  "tools": [
    {
      "name": "Manual (Unscripted Exploration)",
      "sub": "Time-Boxed Charter & Heuristic Bug Hunting",
      "url": "https://www.agilealliance.org/glossary/exploratory-testing/",
      "seeChapter": 5,
      "desc": "Exploratory testing is inherently manual and unscripted by definition (see Chapter 5) — a dedicated tool would defeat the point, since the value comes from a human's real-time judgment and curiosity, not a repeatable script.",
      "adv": [
        "Freedom to follow intuitive hunches and investigate subtle UI/logic glitches",
        "Zero script maintenance overhead",
        "Uncovers unexpected race conditions, duplicate submissions, and navigation edge cases"
      ],
      "lim": [
        "Non-deterministic execution requires diligent session recording for repros"
      ],
      "steps": [
        {
          "t": "Step 1 — Define a focused Session Charter",
          "p": "Set a 60–90 minute timebox with a specific exploratory scope.",
          "c": "Charter: Explore edge cases in leave submission workflows with aggressive back/forward navigation and double clicks.\nDuration: 75 Minutes"
        },
        {
          "t": "Step 2 — Apply creative testing heuristics",
          "p": "Test boundary values, rapid input changes, tab switching, and session timeouts.",
          "c": "Heuristics Applied:\n- SFDPOT (Structure, Function, Data, Platform, Operations, Time)\n- Interrupt-driven actions (Back button, Refresh mid-POST, Double Submit)"
        },
        {
          "t": "Step 3 — Log real-time observations and anomalies",
          "p": "Record video or take timestamped notes of unexpected behaviors.",
          "c": "Observation: Clicking Submit -> Back -> Submit creates duplicate record with ID #9081 and #9082 without validation error"
        },
        {
          "t": "Step 4 — File bug report and convert to automated regression",
          "p": "Document reproducible steps and add a scripted Playwright/Cypress test.",
          "c": "Created Jira: BUG-519 (Duplicate leave request on browser back-navigation)\nAdded Automated Test: tests/e2e/leave-duplicate-prevent.spec.ts"
        }
      ]
    }
  ],
  "contentMarkdown": "## Charter-Based Exploratory Session\n\nExecute time-boxed unscripted exploratory sessions targeting boundary disruptions and navigational race conditions.\n\n```\n# Session charter notes recorded in QA test log\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
