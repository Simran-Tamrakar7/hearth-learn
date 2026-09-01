import type { ChapterRecord } from "../../../types";

/** Checkpoint · Foundations */
export const chapter = {
  "id": "pw-cp-foundations",
  "title": "Checkpoint · Foundations",
  "minutes": 25,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "This checkpoint gates entry to Part 2 (Core Interactions). You should be able to explain Playwright's origin and why it exists (Part 0), set up a Python venv with pytest-playwright and browser binaries (Chapter 2), describe the Browser → BrowserContext → Page hierarchy and CDP connection (Chapter 3), and write a working first script that launches a browser, navigates, locates, acts, and asserts (Chapter 4) — all without notes. Part 2 assumes this floor; skipping it leads to confusion on locators, auto-waiting, and fixture scoping.",
  "why": "Checkpoints prevent compounding gaps. Part 2's locator chapter is the most important in the manual — if you don't understand context isolation or can't run a basic script, you'll attribute locator failures to 'Playwright being flaky' instead of fixing setup or hierarchy mistakes.",
  "when": "Complete the self-check quiz at the end of this chapter before opening Part 2, Chapter 5 (Locators Deep Dive). Revisit if Part 2 exercises feel unexpectedly hard — the gap is usually here, not in locators themselves.",
  "practical": {
    "app": "Self-assessment — Foundations checkpoint",
    "scenario": "Before starting Part 2, you cold-recall: (1) name two reasons Playwright was created vs Selenium, (2) run playwright install and pytest from a fresh venv, (3) explain why each test should get its own BrowserContext, (4) write a script that goto's a URL and asserts the title — without copying from notes.",
    "pass": "All four tasks complete in under 30 minutes; you can explain auto-waiting vs manual Selenium waits to a teammate.",
    "fail": "You open Part 2 locators but can't launch a browser or explain Context vs Page — every subsequent chapter feels like magic instead of mechanics."
  },
  "advantages": [
    "Validates Part 0 background knowledge is connected to Part 1 hands-on skills",
    "Cold-recall quiz catches gaps notes-reading hides",
    "Prevents wasted time in Part 2 debugging environment issues disguised as locator problems",
    "Sets explicit pass criteria — no ambiguity about readiness",
    "Self-paced — no external certification required",
    "Builds confidence before the manual's most important chapter (Locators Deep Dive)"
  ],
  "limitations": [
    "Self-check is honor-system — no automated grading",
    "Doesn't test Part 2 skills you haven't learned yet — only Part 0–1 floor",
    "Speed benchmark (30 minutes) varies by prior Python and automation experience",
    "Passing here doesn't guarantee Part 2 mastery — locators require separate deliberate practice",
    "Checkpoint content is thin by design — the value is in the self-quiz, not new material",
    "Teams may skip checkpoints under deadline pressure — the risk is real"
  ],
  "tools": [],
  "contentMarkdown": "## Checkpoint · Foundations\n\nGate before Part 2 (Core Interactions). Complete this cold — no notes, on a real practice site or example.com.\n\n### Pass criteria\n\nYou are ready for Part 2 when you can do all of the following:\n\n1. **Tool comparison** — Explain in one minute why Playwright uses CDP/WebSocket while Selenium uses WebDriver HTTP. Name one Cypress architectural limitation Playwright avoids.\n2. **Environment** — On a fresh machine: create venv, `pip install` dependencies, `playwright install`, run `pytest --co` and see tests discovered.\n3. **Hierarchy** — Draw Browser → Context → Page from memory. Explain why one context per test prevents cookie leakage.\n4. **Sync vs async** — State which API this manual uses and when you would need the async API instead.\n5. **First script** — Write a standalone script that launches headed, navigates to a URL, clicks a link via `get_by_role`, asserts the title or URL changed, and closes cleanly inside `sync_playwright()`.\n6. **Headless toggle** — Run the same script headless and confirm it still passes.\n\n### Self-check questions\n\n- What command downloads browser binaries after `pip install playwright`?\n- Why does Playwright ship its own Chromium instead of using your installed Chrome?\n- What is the Python equivalent of JS `page.getByRole('button')`?\n- What happens if you skip `browser.close()` and do not use a context manager?\n- Why is `expect(page).to_have_title(...)` better than `assert \"Example\" in page.title()` on a slow SPA?\n\n### If you cannot pass\n\nStay in Part 1. Part 2 adds locators, actions, assertions, and waits — layers that magnify bad habits. A script that navigates without assertions, or an environment missing browser binaries, will waste hours debugging Part 2 problems that are really Part 1 gaps.\n\nRe-read Chapters 2–4, fix your folder structure, and run the first script headed until you can explain every line.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
