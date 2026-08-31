---
id: "pw-3-pytest"
title: "12. Pytest Basics for Playwright"
minutes: 50
partName: "Part 3 · Test Structure & Framework"
level: "intermediate"
---

This is where scripts stop being one-off files and start becoming a real test framework. Everything in this chapter is pytest itself — Playwright plugs into it via pytest-playwright, it doesn't replace it.

## Overview

This is where scripts stop being one-off files and start becoming a real test framework. Everything in this chapter is pytest itself — Playwright plugs into it via

Fixtures A fixture is a reusable block of setup (and optional teardown) code that a test can request just by naming it as a parameter. Instead of copy-pasting login steps into every test function, you write it once as a fixture and every test that needs a logged-in user just asks for it. python

```
import pytest

@pytest.fixture

def logged_in_page(page):

pytest-playwright, it doesn't replace it.
```

## page.goto("https://app.example.com/login")

# teardown (runs after the test finishes) — anything after yield

testuser")).to_be_visible()

What it does: Marks a function as a reusable setup/teardown block that tests can request by parameter name. Types/params:

Pointers: Code after yield is teardown — it runs after the test completes (pass or fail), making fixtures the right place for cleanup logic (logging out, deleting test data) rather than scattering try/finally blocks through every test. conftest.py and fixture scope conftest.py is a special pytest file — fixtures defined there are automatically available to every test file in the same folder (and subfolders) without any import statement. This is how shared setup (like a logged_in_page fixture used across dozens of test files) gets centralized in one place instead of duplicated or manually imported everywhere. python

```
# conftest.py

import pytest

@pytest.fixture(scope="session")

def api_base_url():

return "https://api.example.com"

@pytest.fixture(scope="function")

def clean_page(page):

page.get_by_label("Username").fill("testuser")

page.get_by_label("Password").fill("testpass")

page.get_by_role("button", name="Log in").click()

yield page

page.get_by_role("button", name="Log out").click()

def test_dashboard_shows_welcome_message(logged_in_page):

expect(logged_in_page.get_by_text("Welcome,
```

## page.goto("https://app.example.com")

Scope choice matters for speed: a session-scoped login fixture (log in once, reuse the saved session for every test — tying into storage_state in Chapter 20) can save enormous amounts of time versus a function-scoped one that logs in fresh before every single test. But scope should match reality — if tests mutate shared state (e.g., one test changes a setting another test depends on being default), a broader scope than function can cause tests to interfere with each other in ways that are painful to debug.

conftest.py (concept, not a function) What it does: A special filename pytest auto-discovers; fixtures defined here are shared across all test files in that directory and below, with no import needed. Types/params: N/A — it's a file location convention, not a callable. Pointers: Put widely-shared fixtures (base URL, login, browser context config) here. Test-file-specific fixtures can stay local to that file instead, to avoid a bloated global conftest.py.

Installing pytest-playwright automatically gives you a page fixture (and browser, context) ready to use in any test, with no setup code required: python

```
pytest-playwright plugin basics

def test_homepage_title(page):

yield page
```

## expect(page).to_have_title("Example Domain")

The plugin also adds useful command-line flags: bash

Chromium

watching a test run

page, browser, context (pytest-playwright built-in fixtures) What it does: Automatically provided fixtures giving you a ready-to-use Page/Browser/BrowserContext in any test function, without manual setup. Types/params: N/A — request by naming them as test function parameters, e.g. def

Pointers: page is by far the most commonly used — it comes with a fresh BrowserContext per test by default, giving you test isolation automatically (see Part 1, Chapter 3 on the Browser/Context/Page hierarchy).

```
pytest --headed              # run visibly instead of headless

pytest --browser firefox     # run against Firefox instead of default

pytest --slowmo 500          # slow down actions by 500ms, helpful for

test_x(page):.
```