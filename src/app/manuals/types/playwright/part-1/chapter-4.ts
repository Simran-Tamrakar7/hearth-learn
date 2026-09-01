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
  "contentMarkdown": "## 4. First Script\n\nYour first script completes the smallest useful automation loop: **launch → navigate → locate → act → assert → close**. Without an assertion, a script only demonstrates navigation — it does not fail when the app breaks.\n\nThis chapter uses `sync_playwright` directly. Part 3 switches to pytest-playwright fixtures once the raw loop is understood.\n\n### Launch headed (watch the browser)\n\nCreate `first_script.py` in your project root:\n\n```python\nfrom playwright.sync_api import sync_playwright\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=False)\n    page = browser.new_page()\n    page.goto(\"https://example.com\")\n    print(page.title())\n    browser.close()\n```\n\nRun it:\n\n```bash\npython first_script.py\n```\n\nA Chromium window opens, navigates to example.com, prints the title, and closes. `headless=False` lets you **see** what Playwright does — invaluable while learning.\n\n### Launch headless (CI mode)\n\nChange one argument for unattended execution:\n\n```python\nbrowser = p.chromium.launch(headless=True)  # default; no visible window\n```\n\nThe same code runs on Linux CI agents without a display server. Always verify headless after debugging headed — some issues appear only in one mode.\n\n### Navigate, locate, act, assert\n\nA complete script with user-facing locators and a real assertion:\n\n```python\nfrom playwright.sync_api import sync_playwright, expect\n\nwith sync_playwright() as p:\n    browser = p.chromium.launch(headless=False)\n    page = browser.new_page()\n\n    # Navigate\n    page.goto(\"https://example.com\")\n\n    # Assert page loaded\n    expect(page).to_have_title(\"Example Domain\")\n\n    # Locate by role (accessibility tree — survives CSS refactors)\n    link = page.get_by_role(\"link\", name=\"Learn more\")\n\n    # Act\n    link.click()\n\n    # Assert navigation occurred\n    expect(page).to_have_url(\"https://www.iana.org/help/example-domains\")\n\n    browser.close()\n```\n\n### Anatomy of the loop\n\n| Step | API | Purpose |\n|------|-----|---------|\n| Launch | `p.chromium.launch()` | Start browser process |\n| New page | `browser.new_page()` | Open a tab |\n| Navigate | `page.goto(url)` | Load a URL |\n| Locate | `page.get_by_role(...)` | Find element by accessibility |\n| Act | `.click()`, `.fill()` | Interact (auto-waits for readiness) |\n| Assert | `expect(page).to_have_title(...)` | Verify outcome (auto-retries) |\n| Close | `browser.close()` | Release resources |\n\n### Why `sync_playwright` as a context manager\n\nThe `with sync_playwright() as p:` block guarantees cleanup even if your script crashes mid-test. Skipping `browser.close()` leaks zombie browser processes — a common beginner mistake when copying snippets without the context manager.\n\n### Headed vs headless quick reference\n\n```python\n# Learning / debugging — watch the browser\nbrowser = p.chromium.launch(headless=False)\n\n# CI / batch runs — no display needed\nbrowser = p.chromium.launch()              # headless=True is default\nbrowser = p.chromium.launch(headless=True)\n```\n\n### What comes next\n\nThis standalone script does not scale. It has no pytest discovery, no parallel workers, no shared fixtures, no trace-on-failure. Part 3 replaces manual launch/teardown with pytest-playwright's `page` fixture. Part 2 deepens locators, actions, and assertions — the `get_by_role` and `expect()` patterns introduced here become second nature.\n\nRun this script headed once. Confirm your environment works. Then proceed to the Checkpoint before Part 2.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
