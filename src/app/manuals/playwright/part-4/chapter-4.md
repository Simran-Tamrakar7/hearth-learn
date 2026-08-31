---
id: "pw-4-auth"
title: "20. Authentication & Session Reuse"
minutes: 45
partName: "Part 4 · Advanced Techniques"
level: "advanced"
---

storage_state — saving/reusing login sessions # Log in once, save the resulting session context = browser.new_context() page = context.new_page() page.goto("https://app.example.com/login") page.get_by_label("Username").fill("testuser") page.get_by_label("Password").fill("testpass") page.get_by_role("button", name="Log in").click() context.storage_state(path="auth_state.json") # Reuse the saved ses

## Overview

storage_state — saving/reusing login sessions

context = browser.new_context() page = context.new_page()

# Reuse the saved session — no login steps needed context = browser.new_context(storage_state="auth_state.json") page = context.new_page()

What it does: Saves the current context's cookies and localStorage to a JSON file (or returns it as a dict if no path given).

Types/params:

Pointers: Only captures cookies/localStorage — not sessionStorage or IndexedDB, so if an app's auth relies on those, this approach needs adjustment.

What it does: Creates a new context pre-loaded with previously saved cookies/localStorage, skipping the need to log in via UI again.

Types/params:

state from a prior context.storage_state() call

Pointers: This is a major speed win across a large suite — logging in via UI once and reusing the state across hundreds of tests versus repeating a slow UI login flow every single test.

```
page.goto("https://app.example.com/login")
page.get_by_label("Username").fill("testuser")
page.get_by_label("Password").fill("testpass")
page.get_by_role("button", name="Log in").click()

context.storage_state(path="auth_state.json")

page.goto("https://app.example.com/dashboard")   # already logged in

context.storage_state(path=...)

# Log in once, save the resulting session
```

## Global setup for auth (login once, reuse everywhere)

A common pattern with pytest is a session-scoped fixture that performs the login exactly once per test run and hands out the saved state file path to every test that needs it:

Pointers: Note the two different scopes working together — auth_state is

session-scoped (login happens once for the whole run), while authenticated_page

is function-scoped (a fresh context per test, for isolation) — reusing the saved state, not the context itself, across tests. This combination gets you both speed and isolation simultaneously.

```
# conftest.py
@pytest.fixture(scope="session")
def auth_state(browser):
    context = browser.new_context()
    page = context.new_page()
    page.goto("https://app.example.com/login")
    page.get_by_label("Username").fill("testuser")
    page.get_by_label("Password").fill("testpass")
    page.get_by_role("button", name="Log in").click()
    state_path = "auth_state.json"
    context.storage_state(path=state_path)
    context.close()
    return state_path

@pytest.fixture
def authenticated_page(browser, auth_state):
    context = browser.new_context(storage_state=auth_state)
    page = context.new_page()
    yield page
    context.close()
```