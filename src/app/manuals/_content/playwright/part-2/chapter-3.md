---
id: "pw-2-expect"
title: "7. Assertions with expect()"
minutes: 40
partName: "Part 2 · Core Interactions"
level: "beginner"
---

Playwright expect() auto-retries assertions until they pass or time out — pair it with locators instead of instant assert.

## Retrying assertions

A bare assert page.title() == "…" fails immediately if the title hasn’t updated yet. expect() from playwright.sync_api keeps polling until the condition is true or the timeout expires — the same philosophy as auto-waiting for actions.

Use expect on locators for visibility, text content, CSS, and attributes. Use expect(page) for URL and title.

```
from playwright.sync_api import expect

expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
expect(page.get_by_text("Saved")).to_be_visible()
expect(page).to_have_url("**/dashboard")
expect(page).to_have_title("Dashboard")
```

## Useful matchers

to_be_visible / to_be_hidden, to_have_text / to_contain_text, to_have_value, to_be_checked, to_have_attribute, to_have_count for lists. Soft assertions exist in some runners; with pytest you’ll usually fail fast on the first expect timeout — that’s fine for learning.