---
id: "pw-1-first"
title: "4. First Script"
minutes: 45
partName: "Part 1 · Foundations"
level: "beginner"
---

Launch headed/headless, open a page, navigate, locate, click/fill, assert — the smallest complete Playwright loop in Python.

## Launching a browser (headless vs headed)

headless=True (the default) runs with no visible window — faster and what CI environments require. headless=False opens an actual visible browser window — invaluable while you’re first writing a test and want to watch what’s happening. A common workflow: write and debug with headless=False, then flip to True (or just remove the argument) once the test is stable and you’re ready to commit it.

```
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)  # headed — visible window
    page = browser.new_page()
    page.goto("https://example.com")
    print(page.title())
    browser.close()
```

## Navigate, locate, act

page.goto opens a URL and waits for a load state. Locators find elements the way users perceive them — prefer get_by_role and get_by_text over brittle CSS when you can. Actions like click and fill auto-wait for actionability.

```
page.get_by_role("link", name="More information").click()
# or on a form-like page:
# page.get_by_label("Email").fill("you@example.com")
# page.get_by_role("button", name="Submit").click()
```

## Assert something true

A script that only clicks isn’t a test. Assert on URL, title, or visible text so failures mean something. In pytest you’ll use expect() from playwright.sync_api — Part 2 covers that in depth.

```
assert "Example" in page.title()
```