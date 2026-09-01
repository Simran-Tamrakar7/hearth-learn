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
  "contentMarkdown": "Actionability checklist, explicit waits for spinner/load states, and why time.sleep is a lose-lose.\n\n## The actionability checklist\n\nBefore performing most actions, Playwright runs through an actionability checklist on the target element:\n\n1. Attached — is it in the DOM at all?\n2. Visible — non-zero size, not display:none / visibility:hidden?\n3. Stable — stopped moving/animating (checked across at least two animation frames)?\n4. Enabled — not disabled?\n5. Receives events — not covered by another element (e.g., a loading spinner overlay)?\n\nPlaywright re-checks this list repeatedly until all conditions pass or the timeout is hit. This is exactly why you rarely need manual waits.\n\n## Explicit waits when you need them\n\nUse state-based waits for cases auto-waiting doesn’t cover directly — e.g., waiting for a spinner to hit “hidden” before checking results underneath.\n\nwait_for_load_state covers load, domcontentloaded, and networkidle (no network for ~500ms). networkidle is handy after actions that trigger background calls with no specific element to target — but avoid it on pages with continuous polling (dashboards), since it’ll never go idle and will time out.\n\n```\npage.wait_for_selector(\".spinner\", state=\"hidden\")\npage.wait_for_selector(\".results\", state=\"visible\")\npage.wait_for_load_state(\"domcontentloaded\")\n```\n\n## Avoid time.sleep\n\nA hard sleep() is a lose-lose: too short and the test is flaky; too long and every run wastes time even when the app responded instantly. Auto-waiting solves both problems simultaneously. The only legitimate reasons to add explicit waits are the state-based cases above — never as a blanket “just in case” habit.\n\n```\n# Avoid:\n# time.sleep(3)\n# page.click(\".submit-button\")\n\n# Prefer:\npage.get_by_role(\"button\", name=\"Submit\").click()  # auto-waits already\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
