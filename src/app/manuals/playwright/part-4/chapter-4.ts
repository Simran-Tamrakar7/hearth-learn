import type { ChapterRecord } from "../../types";

/** 20. Authentication & Session Reuse */
export const chapter = {
  "id": "pw-4-auth",
  "title": "20. Authentication & Session Reuse",
  "minutes": 45,
  "level": "advanced",
  "phase": "Part 4 · Advanced Techniques",
  "partName": "Part 4 · Advanced Techniques",
  "overviewText": "",
  "tools": [],
  "contentMarkdown": "storage_state — saving/reusing login sessions # Log in once, save the resulting session context = browser.new_context() page = context.new_page() page.goto(\"https://app.example.com/login\") page.get_by_label(\"Username\").fill(\"testuser\") page.get_by_label(\"Password\").fill(\"testpass\") page.get_by_role(\"button\", name=\"Log in\").click() context.storage_state(path=\"auth_state.json\") # Reuse the saved ses\n\n## Overview\n\nstorage_state — saving/reusing login sessions\n\ncontext = browser.new_context() page = context.new_page()\n\n# Reuse the saved session — no login steps needed context = browser.new_context(storage_state=\"auth_state.json\") page = context.new_page()\n\nWhat it does: Saves the current context's cookies and localStorage to a JSON file (or returns it as a dict if no path given).\n\nTypes/params:\n\nPointers: Only captures cookies/localStorage — not sessionStorage or IndexedDB, so if an app's auth relies on those, this approach needs adjustment.\n\nWhat it does: Creates a new context pre-loaded with previously saved cookies/localStorage, skipping the need to log in via UI again.\n\nTypes/params:\n\nstate from a prior context.storage_state() call\n\nPointers: This is a major speed win across a large suite — logging in via UI once and reusing the state across hundreds of tests versus repeating a slow UI login flow every single test.\n\n```\npage.goto(\"https://app.example.com/login\")\npage.get_by_label(\"Username\").fill(\"testuser\")\npage.get_by_label(\"Password\").fill(\"testpass\")\npage.get_by_role(\"button\", name=\"Log in\").click()\n\ncontext.storage_state(path=\"auth_state.json\")\n\npage.goto(\"https://app.example.com/dashboard\")   # already logged in\n\ncontext.storage_state(path=...)\n\n# Log in once, save the resulting session\n```\n\n## Global setup for auth (login once, reuse everywhere)\n\nA common pattern with pytest is a session-scoped fixture that performs the login exactly once per test run and hands out the saved state file path to every test that needs it:\n\nPointers: Note the two different scopes working together — auth_state is\n\nsession-scoped (login happens once for the whole run), while authenticated_page\n\nis function-scoped (a fresh context per test, for isolation) — reusing the saved state, not the context itself, across tests. This combination gets you both speed and isolation simultaneously.\n\n```\n# conftest.py\n@pytest.fixture(scope=\"session\")\ndef auth_state(browser):\n    context = browser.new_context()\n    page = context.new_page()\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(\"testuser\")\n    page.get_by_label(\"Password\").fill(\"testpass\")\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    state_path = \"auth_state.json\"\n    context.storage_state(path=state_path)\n    context.close()\n    return state_path\n\n@pytest.fixture\ndef authenticated_page(browser, auth_state):\n    context = browser.new_context(storage_state=auth_state)\n    page = context.new_page()\n    yield page\n    context.close()\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
