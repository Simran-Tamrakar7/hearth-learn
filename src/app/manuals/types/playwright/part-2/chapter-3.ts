import type { ChapterRecord } from "../../../types";

/** 7. Assertions with expect() */
export const chapter = {
  "id": "pw-2-expect",
  "title": "7. Assertions with expect()",
  "minutes": 40,
  "level": "beginner",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "Playwright's expect() assertion library auto-retries conditions until they pass or a timeout expires — the assertion equivalent of auto-waiting on actions. A bare assert page.title() == 'Dashboard' fails instantly if the SPA hasn't updated the title yet; expect(page).to_have_title('Dashboard') polls until true. Use expect on locators for visibility, text, values, attributes, and count; use expect(page) for URL and title. This retrying behavior is what makes Playwright assertions reliable on async UIs without time.sleep().",
  "why": "Tests without retrying assertions are flaky by design on modern SPAs. The title, URL, and visible text change asynchronously after clicks — instant Python asserts race the UI and fail randomly. expect() is the difference between a suite that passes consistently and one that passes locally but fails on CI.",
  "when": "Replace every bare assert on page/locator state with expect() starting in this chapter. Use to_be_visible after navigation, to_have_url after redirects, to_contain_text for confirmation messages, and to_have_count when verifying list lengths. Pair with locators from Chapter 5, not raw CSS strings.",
  "practical": {
    "app": "Leave management — submit confirmation",
    "scenario": "After clicking 'Submit Leave Request', the SPA shows a toast 'Request submitted' and redirects to /leave/history without a full page reload. assert 'Request submitted' in page.content() fails intermittently because the toast appears 200ms later. expect(page.get_by_text('Request submitted')).to_be_visible() retries until the toast renders or times out with a clear message.",
    "pass": "expect() passes reliably on CI; failure message shows expected vs actual text and timeout duration.",
    "fail": "Bare assert fails 30% of CI runs; team adds time.sleep(1) — suite slows by 40 seconds total per run."
  },
  "advantages": [
    "Auto-retry until timeout — assertions sync with async UI updates",
    "Clear failure messages show expected vs actual values and which condition timed out",
    "Rich matcher set: visibility, text, value, checked state, attribute, count, URL, title",
    "Consistent philosophy with action auto-waiting — one mental model for waits",
    "to_contain_text handles partial matches — useful for dynamic content with IDs",
    "Integrates directly with locators — expect(locator).to_be_visible() not expect(page.locator(...))"
  ],
  "limitations": [
    "Default timeout (often 5s) may be too short for slow backend operations — configure per assertion",
    "No built-in soft assertions in pytest by default — first expect failure stops the test",
    "to_have_text requires exact match — use to_contain_text for partial or use regex",
    "Polling assertions on fast-fading toasts need tight timeouts or locator stability tricks",
    "expect doesn't replace waiting for spinners to disappear — combine with wait_for_selector",
    "Over-using long timeouts on every expect masks genuine performance problems"
  ],
  "tools": [
    {
      "name": "Playwright expect()",
      "sub": "Auto-retrying assertions",
      "url": "https://playwright.dev/python/docs/test-assertions",
      "desc": "Import expect from playwright.sync_api. It wraps locators and pages with assertion methods that poll until the condition is met or timeout. Unlike pytest's assert, expect understands Playwright's async rendering model and retries intelligently. Common matchers: to_be_visible(), to_be_hidden(), to_have_text(), to_contain_text(), to_have_value(), to_be_checked(), to_have_attribute(), to_have_count(), to_have_url(), to_have_title().",
      "adv": [
        "Eliminates timing-based flakes on SPAs without sleep()",
        "Failure output includes locator description and timeout — faster debugging",
        "Works with regex: to_have_text(re.compile('Order #\\\\d+'))",
        "Same API across Python, JS, Java, .NET"
      ],
      "lim": [
        "Only works on Playwright locators/pages — not arbitrary Python values",
        "Timeout configuration is per-call or global — no per-suite profiles without conftest",
        "Not a replacement for API-level contract validation",
        "Soft assert patterns require pytest plugins or manual collection"
      ],
      "steps": [
        {
          "t": "Step 1 — Import and basic visibility check",
          "p": "After an action that reveals content:",
          "c": "from playwright.sync_api import expect\n\nexpect(page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()"
        },
        {
          "t": "Step 2 — Assert URL and title",
          "p": "After navigation or redirect:",
          "c": "expect(page).to_have_url(\"**/dashboard\")\nexpect(page).to_have_title(\"Dashboard\")"
        },
        {
          "t": "Step 3 — Text and value matchers",
          "p": "Confirmation messages and form state:",
          "c": "expect(page.get_by_text(\"Saved\")).to_be_visible()\nexpect(page.get_by_label(\"Email\")).to_have_value(\"user@example.com\")"
        },
        {
          "t": "Step 4 — List count and checked state",
          "p": "Verify table rows or checkbox state:",
          "c": "expect(page.get_by_role(\"row\")).to_have_count(5)\nexpect(page.get_by_label(\"Agree to terms\")).to_be_checked()"
        },
        {
          "t": "Step 5 — Custom timeout for slow operations",
          "p": "Extend timeout for known-slow backend:",
          "c": "expect(page.get_by_text(\"Report ready\")).to_be_visible(timeout=30000)"
        }
      ]
    }
  ],
  "contentMarkdown": "Playwright expect() auto-retries assertions until they pass or time out — pair it with locators instead of instant assert.\n\n## Retrying assertions\n\nA bare assert page.title() == \"…\" fails immediately if the title hasn’t updated yet. expect() from playwright.sync_api keeps polling until the condition is true or the timeout expires — the same philosophy as auto-waiting for actions.\n\nUse expect on locators for visibility, text content, CSS, and attributes. Use expect(page) for URL and title.\n\n```\nfrom playwright.sync_api import expect\n\nexpect(page.get_by_role(\"heading\", name=\"Dashboard\")).to_be_visible()\nexpect(page.get_by_text(\"Saved\")).to_be_visible()\nexpect(page).to_have_url(\"**/dashboard\")\nexpect(page).to_have_title(\"Dashboard\")\n```\n\n## Useful matchers\n\nto_be_visible / to_be_hidden, to_have_text / to_contain_text, to_have_value, to_be_checked, to_have_attribute, to_have_count for lists. Soft assertions exist in some runners; with pytest you’ll usually fail fast on the first expect timeout — that’s fine for learning.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
