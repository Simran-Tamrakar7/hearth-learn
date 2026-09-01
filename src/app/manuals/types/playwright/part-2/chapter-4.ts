import type { ChapterRecord } from "../../../types";

/** 8. Waits & Auto-waiting */
export const chapter = {
  "id": "pw-2-waits",
  "title": "8. Waits & Auto-waiting",
  "minutes": 40,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "Playwright auto-waits through an actionability checklist before every action: element attached to DOM, visible (non-zero size, not hidden), stable (not animating), enabled, and able to receive events (not covered by an overlay). Explicit waits — wait_for_selector, wait_for_load_state — cover cases auto-waiting doesn't: waiting for a spinner to disappear before asserting results, or for network activity to settle after an action with no specific element to target. time.sleep() is always the wrong default: too short causes flakes, too long wastes time on every run.",
  "why": "Auto-waiting is Playwright's killer feature versus Selenium — but only if you trust it and stop adding sleep(). Explicit waits are for state-based conditions (spinner hidden, network idle), not blanket 'just in case' delays. Understanding the actionability checklist explains 90% of click timeout errors: usually an overlay, animation, or disabled state, not 'Playwright is too fast.'",
  "when": "Reference this chapter whenever a click or fill times out, when asserting content behind a loading spinner, or when reviewing a teammate's PR that adds time.sleep(). Revisit networkidle cautions before using it on dashboard pages with continuous polling — it will never go idle and will timeout.",
  "practical": {
    "app": "Payroll dashboard — async data load",
    "scenario": "After selecting 'March 2026', a spinner overlays the salary table for 1–3 seconds while the API returns. A test immediately asserts row count and fails because rows aren't rendered yet. wait_for_selector('.spinner', state='hidden') followed by expect(rows).to_have_count(50) passes reliably — no sleep needed.",
    "pass": "Spinner wait → assertion passes in 1–3s depending on API speed; zero wasted idle time.",
    "fail": "time.sleep(5) added 'to be safe' — every run wastes 2+ seconds even when API responds in 500ms; still flakes when API takes 6s."
  },
  "advantages": [
    "Actionability checklist runs automatically on every action — no author-managed wait lists",
    "wait_for_selector with state='hidden' cleanly handles loading overlays",
    "wait_for_load_state('domcontentloaded') covers full-page navigations",
    "Clear timeout errors name which actionability condition failed",
    "Eliminates the Selenium explicit WebDriverWait boilerplate entirely for standard interactions",
    "State-based waits scale with actual app speed — fast when app is fast, patient when slow"
  ],
  "limitations": [
    "networkidle fails on pages with WebSocket polling or analytics beacons — never idle",
    "Auto-waiting can't wait for arbitrary JavaScript conditions — need page.wait_for_function",
    "Spinner selectors tied to CSS classes break on redesign — same locator discipline applies",
    "Long default timeouts (30s) make genuinely broken tests slow to fail",
    "time.sleep habit from Selenium teams dies hard — code review needed to enforce",
    "Animation 'stable' check may fail on infinitely animating loaders — need to mock or hide via route"
  ],
  "tools": [
    {
      "name": "Playwright Wait APIs",
      "sub": "Auto-wait and explicit waits",
      "url": "https://playwright.dev/python/docs/actionability",
      "desc": "Playwright combines implicit auto-waiting (before actions and expect assertions) with explicit wait methods: locator.wait_for(), page.wait_for_selector(), page.wait_for_load_state(), and page.wait_for_function(). The actionability model checks attached, visible, stable, enabled, and receivesEvents. Configure default timeout globally via page.set_default_timeout() or per-call with timeout= parameter.",
      "adv": [
        "Auto-wait eliminates 90% of explicit wait code Selenium suites required",
        "wait_for_selector state parameter (visible, hidden, attached, detached) covers spinner patterns",
        "Timeout errors are actionable — 'element not stable' vs generic timeout",
        "Consistent timeout= parameter across actions, expects, and explicit waits"
      ],
      "lim": [
        "networkidle is unreliable on modern SPAs — prefer element-based waits",
        "wait_for_function requires JavaScript string — harder to maintain than locator waits",
        "Global timeout changes affect all operations — easy to mask bugs with long timeouts",
        "Doesn't replace proper test data setup — waiting can't fix missing seed data"
      ],
      "steps": [
        {
          "t": "Step 1 — Trust auto-waiting on actions",
          "p": "No sleep before click — Playwright handles it:",
          "c": "page.get_by_role(\"button\", name=\"Submit\").click()  # auto-waits already"
        },
        {
          "t": "Step 2 — Wait for spinner to disappear",
          "p": "Before asserting content behind overlay:",
          "c": "page.wait_for_selector(\".spinner\", state=\"hidden\")\nexpect(page.get_by_role(\"row\")).to_have_count(10)"
        },
        {
          "t": "Step 3 — Wait for results to appear",
          "p": "Positive wait for content:",
          "c": "page.wait_for_selector(\".results\", state=\"visible\")"
        },
        {
          "t": "Step 4 — Page load states",
          "p": "After full navigation:",
          "c": "page.wait_for_load_state(\"domcontentloaded\")\n# Avoid networkidle on polling dashboards"
        },
        {
          "t": "Step 5 — Delete time.sleep from your codebase",
          "p": "Replace anti-pattern:",
          "c": "# Avoid:\n# import time; time.sleep(3)\n# Prefer locator/action auto-wait or explicit state wait above"
        }
      ]
    }
  ],
  "contentMarkdown": "## Ch8 Waits\n\nPlaywright's design goal: you should almost never write manual waits. Actions and `expect()` poll until conditions are met. This chapter explains what Playwright waits for automatically, when explicit waits are legitimate, and why `time.sleep` is an anti-pattern.\n\n---\n\n### The actionability checklist\n\nBefore every action (`click`, `fill`, `check`, etc.), Playwright verifies:\n\n1. **Attached** — element exists in the DOM.\n2. **Visible** — non-zero bounding box; not `display:none`, `visibility:hidden`, or `opacity:0`.\n3. **Stable** — position unchanged for two consecutive animation frames (no ongoing layout shift).\n4. **Enabled** — not `disabled` and not `aria-disabled`.\n5. **Receives events** — not covered by another element (loading spinner, modal backdrop).\n\nPlaywright re-runs this checklist on every retry until all pass or timeout. That is why `page.get_by_role(\"button\", name=\"Submit\").click()` works on a slow SPA without a preceding wait.\n\n**Pointers:**\n- Action timeout failures often mean an overlay is blocking — fix the app or wait for the overlay to disappear, don't `force=True` through it.\n- Animations shorter than two frames may still pass stability checks; long CSS transitions can delay actions legitimately.\n\n```python\n# No explicit wait needed — actionability is built in\npage.get_by_role(\"button\", name=\"Submit\").click()\n```\n\n---\n\n### wait_for_selector\n\n**What it does:** Waits until an element matching the selector reaches a given state.\n\n**Types/params:**\n- `selector` (str): CSS or XPath selector.\n- `state` (str): `\"attached\"`, `\"detached\"`, `\"visible\"`, `\"hidden\"`. Default `\"visible\"`.\n- `timeout` (float): Max wait in ms.\n- `strict` (bool): Fail if multiple elements match.\n\n**Pointers:**\n- Prefer locator + `expect` in modern tests: `expect(page.locator(\".spinner\")).to_be_hidden()`.\n- `wait_for_selector` remains useful when you need imperative flow control before a block of actions.\n- Waiting for `state=\"hidden\"` on a spinner is a classic legitimate explicit wait.\n\n```python\npage.wait_for_selector(\".loading-spinner\", state=\"hidden\")\npage.wait_for_selector(\".results-table\", state=\"visible\", timeout=15_000)\n```\n\n---\n\n### wait_for_load_state\n\n**What it does:** Waits for a page-level load event on the current page.\n\n**Types/params:**\n- `state` (str):\n  - `\"load\"` — `load` event fired (images, stylesheets done).\n  - `\"domcontentloaded\"` — HTML parsed, DOM ready.\n  - `\"networkidle\"` — no more than 0 network connections for ~500ms.\n\n**Pointers:**\n- After `page.goto()`, Playwright already waits for `load` by default.\n- `networkidle` is handy after actions that trigger background fetches with no specific element to target.\n- **Avoid `networkidle` on dashboards** with polling, WebSockets, or analytics — the page never idles and the test times out.\n- Prefer waiting on a specific element state over page-level idle.\n\n```python\npage.goto(\"https://app.example.com/reports\")\npage.get_by_role(\"button\", name=\"Run report\").click()\npage.wait_for_load_state(\"networkidle\")  # only if no perpetual polling\nexpect(page.get_by_text(\"Report complete\")).to_be_visible()\n```\n\n---\n\n### Anti-pattern: time.sleep\n\n**What it does:** Blocks the test thread for a fixed duration regardless of app state.\n\n**Why it's wrong:**\n- Too short → flaky (app wasn't ready).\n- Too long → every run wastes time even when the app responded in 200ms.\n- Masks real bugs — the test passes at 3s sleep but users on slow networks fail.\n- Doesn't compose — sleeps stack across a suite into minutes of dead time.\n\n**What to do instead:**\n\n| Instead of | Use |\n|---|---|\n| `time.sleep(2); page.click(...)` | `page.get_by_role(...).click()` (auto-waits) |\n| `time.sleep(5)` after navigation | `expect(page).to_have_url(...)` |\n| `time.sleep(3)` for spinner | `expect(spinner).to_be_hidden()` |\n| `time.sleep(1)` between keystrokes | `press_sequentially(..., delay=100)` |\n\n```python\nimport time\n\n# BAD — never do this\ntime.sleep(3)\npage.get_by_role(\"button\", name=\"Submit\").click()\n\n# GOOD\npage.get_by_role(\"button\", name=\"Submit\").click()\nexpect(page.get_by_text(\"Success\")).to_be_visible()\n```\n\n**Pointers:** The only borderline case is debugging locally — even then, use `page.pause()` (Inspector) instead of sleeps. If you genuinely cannot find an element or state to wait on, that's a testability gap worth raising with the dev team.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
