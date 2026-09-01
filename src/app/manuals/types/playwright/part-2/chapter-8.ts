import type { ChapterRecord } from "../../../types";

/** Checkpoint · Core Interactions */
export const chapter = {
  "id": "pw-cp-core",
  "title": "Checkpoint · Core Interactions",
  "minutes": 25,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "This checkpoint gates entry to Part 3 (Frameworks & pytest integration). You should be able to write user-facing locators (get_by_role, get_by_label), perform actions trusting auto-waiting, assert with expect() instead of bare assert, avoid time.sleep(), and handle tabs, iframes, file uploads, downloads, and native dialogs — all on a practice site without notes. Part 3 assumes you can interact with a real UI reliably; it teaches how to structure those interactions into maintainable test suites.",
  "why": "Part 3 introduces fixtures, conftest.py, Page Object Model, and CI integration — architectural layers that magnify existing bad habits. If locators are brittle or sleeps are everywhere, POM just organizes flaky tests into classes. This checkpoint ensures Part 2 skills are solid before adding framework complexity.",
  "when": "Complete the cold self-check before opening Part 3, Chapter 1. Revisit if pytest fixtures feel confusing but the real issue is locator timeouts — fix interaction skills first, then framework patterns.",
  "practical": {
    "app": "Self-assessment — Core Interactions checkpoint",
    "scenario": "On a practice site, cold-demonstrate: (1) login using get_by_role locators only, (2) assert dashboard heading with expect().to_be_visible(), (3) upload a file and verify success message without time.sleep(), (4) handle a confirm() dialog on delete, (5) explain why expect() beats bare assert on an SPA.",
    "pass": "All five tasks complete; you can articulate the actionability checklist and when to use frame_locator vs page locator.",
    "fail": "You add time.sleep() during the self-check or can't capture a download — Part 3 POM work will encode these gaps into hard-to-fix suite patterns."
  },
  "advantages": [
    "Validates Part 2's full interaction toolkit — locators through dialogs",
    "Cold practice on a real site exposes gaps reading alone hides",
    "Explicit gate before framework chapters prevents compounding errors",
    "Self-check criteria map directly to on-the-job E2E skills",
    "Passing means auto-waiting mental model is internalized — not just read",
    "Confidence boost before Part 3's architectural leap"
  ],
  "limitations": [
    "Honor-system self-assessment — no automated verification",
    "Practice site may not cover every edge case (nested iframes, prompt dialogs)",
    "Doesn't validate Part 3 pytest skills — only Part 2 interaction floor",
    "Speed and fluency vary by prior web testing experience",
    "Passing checkpoint doesn't mean production-app readiness — real apps add auth, API deps, and CI constraints",
    "Easy to skip under schedule pressure — risk of weak Part 3 foundation"
  ],
  "tools": [],
  "contentMarkdown": "## Checkpoint · Core Interactions\n\nGate before Part 3 (Frameworks & pytest). Complete this cold — no notes, on a real practice site.\n\n### Pass criteria\n\nYou are ready for Part 3 when you can do all of the following:\n\n1. **Locators** — Log in using only `get_by_role` and `get_by_label`. No CSS classes, no `time.sleep`.\n2. **Actions** — Submit a form with `fill` + `click`. Handle a hover-reveal menu. Explain when you'd use `press_sequentially` instead of `fill`.\n3. **Assertions** — Assert a dashboard heading with `expect(...).to_be_visible()`. Assert an input value with `to_have_value`. Articulate why bare `assert` fails on SPAs.\n4. **Waits** — Recite the five actionability checks from memory. Complete a flow with zero `time.sleep`. Explain when `networkidle` is dangerous.\n5. **Tabs** — Open a link in a new tab with `context.expect_page()`, interact with the new page, return to the original.\n6. **iFrames** — Fill a form inside an iframe using `frame_locator`.\n7. **Files** — Upload a fixture file with `set_input_files`. Capture a download with `expect_download` and verify `suggested_filename`.\n8. **Dialogs** — Handle a `confirm()` with `page.once(\"dialog\", ...)`. Distinguish native dialogs from custom modal components.\n\n### Self-check questions\n\n- What happens if two elements match your locator and you call `click()`?\n- What is the difference between `to_have_text` and `to_contain_text`?\n- Why must `expect_page()` wrap the click that opens a new tab?\n- When is `force=True` acceptable on a click?\n\n### If you can't pass\n\nStay in Part 2. Part 3 adds fixtures, Page Object Model, and CI — architectural layers that **magnify** bad habits. Brittle locators in a POM are still brittle locators, just in a class file.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
