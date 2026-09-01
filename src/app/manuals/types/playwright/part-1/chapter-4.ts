import type { ChapterRecord } from "../../../types";

/** 4. First Script */
export const chapter = {
  "id": "pw-1-first",
  "title": "4. First Script",
  "minutes": 45,
  "level": "beginner",
  "phase": "Part 1 · Foundations",
  "partName": "Part 1 · Foundations",
  "overviewText": "Your first Playwright script completes the smallest useful automation loop: launch a browser (headed to watch, headless for CI), open a page, navigate with page.goto, locate an element with user-facing locators (get_by_role, get_by_label), perform an action (click, fill), and assert something meaningful (title, URL, visible text). Without an assertion, a script only demonstrates navigation — it doesn't fail when the app breaks. This chapter uses sync_playwright directly; Part 3 switches to pytest-playwright fixtures once the raw loop is understood.",
  "why": "The first script proves your environment works and cements the navigate → locate → act → assert rhythm every subsequent chapter builds on. Running headed (headless=False) while learning lets you see exactly what Playwright is doing — mismatched locators and timing issues become obvious instead of cryptic CI log lines.",
  "when": "Complete this immediately after environment setup (Chapter 2) and before Part 2 locators deep dive. Revisit headed vs headless when debugging a failing CI test locally — reproduce headless first, then flip to headed to watch the failure.",
  "practical": {
    "app": "Example.com — hello-world smoke test",
    "scenario": "You write a script that launches Chromium headed, navigates to https://example.com, clicks the 'More information' link via get_by_role, and asserts the title still contains 'Example'. Running headed, you watch the click happen; flipping headless=True, the same code passes in CI without a display server.",
    "pass": "Script prints title, click succeeds, assert passes in both headed and headless modes.",
    "fail": "Script navigates and clicks but has no assert — a broken redirect to a 404 page goes unnoticed because nothing checks the outcome."
  },
  "advantages": [
    "Smallest complete loop — launch, goto, locate, act, assert — maps to every future test",
    "get_by_role locators match accessibility tree — survive markup refactors better than CSS",
    "Headed mode makes debugging visual — see exactly which element Playwright targets",
    "sync_playwright context manager ensures browser.close() even on exceptions",
    "Same code runs headless in CI with one argument change — no rewrite needed",
    "Foundation for expect() assertions introduced in Part 2, Chapter 7"
  ],
  "limitations": [
    "Raw sync_playwright script doesn't scale — Part 3 fixtures replace manual launch/teardown",
    "assert \"Example\" in page.title() fails instantly on slow loads — Part 2 expect() auto-retries",
    "example.com is static — real apps need waits, login, and network mocking covered later",
    "No pytest discovery, reporting, or parallelization — standalone script only",
    "Single-page script doesn't demonstrate context isolation or multi-tab patterns",
    "Headed mode unavailable on typical Linux CI agents — must verify headless separately"
  ],
  "tools": [
    {
      "name": "Playwright",
      "sub": "First script — sync_api",
      "url": "https://playwright.dev/python/docs/intro",
      "desc": "The playwright.sync_api module provides sync_playwright(), browser launch, page navigation, locators, and actions. This is the lowest-level entry point before pytest-playwright abstracts launch/teardown into fixtures. Understanding the raw loop helps when fixtures misbehave or when writing one-off automation scripts outside the test suite.",
      "adv": [
        "Immediate feedback — run a .py file directly without pytest overhead",
        "headless=False shows the browser window for visual debugging",
        "Auto-waiting applies even in standalone scripts — click waits for actionability",
        "Direct path to understanding what pytest-playwright fixtures do under the hood"
      ],
      "lim": [
        "Manual browser.close() required — easy to leak processes if context manager skipped",
        "No built-in retry on assert — bare Python assert fails immediately",
        "Doesn't integrate with CI test runners without wrapping in pytest",
        "One script per browser launch — no parallelization or shared fixtures"
      ],
      "steps": [
        {
          "t": "Step 1 — Launch a headed browser",
          "p": "Create first_script.py:",
          "c": "from playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=False)\n    page = browser.new_page()\n    page.goto(\"https://example.com\")\n    print(page.title())\n    browser.close()"
        },
        {
          "t": "Step 2 — Locate and click a link",
          "p": "Use get_by_role for user-facing selection:",
          "c": "page.get_by_role(\"link\", name=\"More information\").click()"
        },
        {
          "t": "Step 3 — Assert something meaningful",
          "p": "Without assert, failures go silent:",
          "c": "assert \"Example\" in page.title()\n# Part 2 upgrades this to:\n# from playwright.sync_api import expect\n# expect(page).to_have_title(re.compile(\"Example\"))"
        },
        {
          "t": "Step 4 — Switch to headless for CI",
          "p": "Same script, no visible window:",
          "c": "browser = p.chromium.launch(headless=True)  # or omit — True is default"
        },
        {
          "t": "Step 5 — Run and verify",
          "p": "Execute directly:",
          "c": "python first_script.py\n# Expected: prints title, assert passes, browser closes cleanly"
        }
      ]
    }
  ],
  "contentMarkdown": "Launch headed/headless, open a page, navigate, locate, click/fill, assert — the smallest complete Playwright loop in Python.\n\n## Launching a browser (headless vs headed)\n\nheadless=True (the default) runs with no visible window — faster and what CI environments require. headless=False opens an actual visible browser window — invaluable while you’re first writing a test and want to watch what’s happening. A common workflow: write and debug with headless=False, then flip to True (or just remove the argument) once the test is stable and you’re ready to commit it.\n\n```\nfrom playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=False)  # headed — visible window\n    page = browser.new_page()\n    page.goto(\"https://example.com\")\n    print(page.title())\n    browser.close()\n```\n\n## Navigate, locate, act\n\npage.goto opens a URL and waits for a load state. Locators find elements the way users perceive them — prefer get_by_role and get_by_text over brittle CSS when you can. Actions like click and fill auto-wait for actionability.\n\n```\npage.get_by_role(\"link\", name=\"More information\").click()\n# or on a form-like page:\n# page.get_by_label(\"Email\").fill(\"you@example.com\")\n# page.get_by_role(\"button\", name=\"Submit\").click()\n```\n\n## Assert something true\n\nA script that only clicks isn’t a test. Assert on URL, title, or visible text so failures mean something. In pytest you’ll use expect() from playwright.sync_api — Part 2 covers that in depth.\n\n```\nassert \"Example\" in page.title()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
