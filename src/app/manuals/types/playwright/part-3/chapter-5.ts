import type { ChapterRecord } from "../../../types";

/** 16. Test Data Management */
export const chapter = {
  "id": "pw-3-data",
  "title": "16. Test Data Management",
  "minutes": 40,
  "level": "intermediate",
  "phase": "Part 3 · Test Structure & Framework",
  "partName": "Part 3 · Test Structure & Framework",
  "overviewText": "Test data management separates the data a test uses from the test logic itself, so the same test function can run against many inputs without hardcoding values inline. Static fixtures store predictable, reusable data in JSON, CSV, or YAML files (test_data/users.json) loaded by pytest fixtures — non-engineers can update test data without touching Python. Faker generates unique realistic data on every run (emails, names, phone numbers) for flows that reject duplicates like signup. Data cleanup is non-negotiable for tests that create resources: a fixture's yield pattern guarantees teardown runs even when the test fails, preventing accumulated junk that eventually breaks unrelated tests. API-based cleanup (Chapter 18) is faster and more reliable than UI-based deletion.",
  "why": "Hardcoded credentials and user data scattered across test files mean a password rotation breaks every test independently. Static JSON fixtures centralize test data — update users.json once, every test using the user_data fixture gets the new values. Without cleanup, tests that create leave requests or user accounts leave behind data that makes 'list shows exactly 3 items' assertions fail after 200 test runs. Faker prevents 'email already registered' failures when the same static email is reused across parallel workers.",
  "when": "Move data to external files when the same credentials or form inputs appear in three or more tests. Use Faker for any test that creates unique resources (signup, order placement, ticket creation). Add cleanup fixtures the moment a test creates server-side data — not after the third flaky failure from leftover records.",
  "practical": {
    "app": "HRMS — Employee signup and leave request tests",
    "scenario": "A signup test creates a new employee via UI but never deletes them. After 50 CI runs, 50 'Test User' accounts exist and the admin user-list test fails because it expects exactly one new hire this week. A created_user fixture with API teardown (api_delete_user after yield) keeps the database clean regardless of test outcome.",
    "pass": "random_user fixture generates fake.email() once per test; created_user fixture yields the user then api_delete_user(email) in teardown.",
    "fail": "Static email test@example.com reused across parallel xdist workers — second worker gets 'email already registered' and the failure looks like a product bug."
  },
  "advantages": [
    "External JSON/CSV files let non-engineers update test data without code changes",
    "Faker produces unique data every run — safe for parallel execution and repeat runs",
    "Fixture yield teardown guarantees cleanup even when tests fail mid-flow",
    "API cleanup is faster and more reliable than clicking through UI delete flows",
    "Static fixtures provide predictable data for deterministic assertions"
  ],
  "limitations": [
    "Static fixtures go stale when the application's valid data rules change",
    "Faker data is random — cannot assert on specific values unless stored in a variable first",
    "JSON fixtures lack schema validation — malformed data causes confusing test failures",
    "Cleanup via API requires API endpoints to exist — not all apps expose delete APIs for test data"
  ],
  "tools": [
    {
      "name": "Static JSON fixtures",
      "sub": "File-based test data",
      "url": "https://docs.pytest.org/en/stable/how-to/fixtures.html",
      "desc": "Static fixtures load predictable test data from external files into pytest fixtures. A test_data/users.json file holds credentials, form inputs, or expected outputs. A @pytest.fixture def user_data() function opens and json.load()s the file, returning a dictionary tests index into (user_data['valid_user']). Keeping data separate from logic means updating a password requires editing one JSON file, not grep-ing every test.",
      "adv": [
        "Non-engineers can maintain test data in familiar JSON/CSV format",
        "Version-controlled alongside tests — data changes are reviewable in PRs",
        "Same fixture serves many tests with consistent data",
        "Large datasets stay out of test files, keeping tests readable"
      ],
      "lim": [
        "No built-in schema validation — typos in JSON cause runtime KeyErrors",
        "Static data conflicts with parallel tests that need unique values",
        "File path resolution depends on working directory — use pathlib for reliability",
        "Updating data rules in the app requires manually syncing JSON files"
      ],
      "steps": [
        {
          "t": "Step 1 — Create test_data/users.json",
          "p": "Store credentials and user profiles:",
          "c": "{\n  \"valid_user\": {\"username\": \"testuser\", \"password\": \"testpass\"},\n  \"invalid_user\": {\"username\": \"baduser\", \"password\": \"wrongpass\"},\n  \"admin_user\": {\"username\": \"admin\", \"password\": \"adminpass\"}\n}"
        },
        {
          "t": "Step 2 — Create a fixture to load the file",
          "p": "In conftest.py or the test file:",
          "c": "import json\nimport pytest\n\n@pytest.fixture\ndef user_data():\n    with open(\"test_data/users.json\") as f:\n        return json.load(f)"
        },
        {
          "t": "Step 3 — Use fixture data in tests",
          "p": "Index into the loaded dictionary:",
          "c": "def test_login(page, user_data):\n    creds = user_data[\"valid_user\"]\n    page.goto(\"https://app.example.com/login\")\n    page.get_by_label(\"Username\").fill(creds[\"username\"])\n    page.get_by_label(\"Password\").fill(creds[\"password\"])\n    page.get_by_role(\"button\", name=\"Log in\").click()\n    expect(page.get_by_text(\"Welcome\")).to_be_visible()"
        }
      ]
    },
    {
      "name": "Faker",
      "sub": "Dynamic fake data",
      "url": "https://faker.readthedocs.io",
      "desc": "Faker is a Python library that generates realistic fake data — names, emails, phone numbers, addresses, dates — on every call. In Playwright tests it solves the duplicate-data problem: signup flows, order creation, and any resource with uniqueness constraints need fresh data each run, especially under parallel execution with pytest-xdist. Each generator method (.email(), .name()) returns a new random value; store the result in a variable if you need the same value across multiple steps in one test.",
      "adv": [
        "Unique data every run — safe for parallel workers and repeat CI executions",
        "Realistic values make debug screenshots look like real usage",
        "Locale support generates region-appropriate names and addresses",
        "Simple API — Faker().email() is one line"
      ],
      "lim": [
        "Random values cannot be used in deterministic assertions without storing first",
        "Adds a dependency (pip install Faker)",
        "Generated data may accidentally match real production patterns if not prefixed (e.g., test- prefix)",
        "Does not replace static fixtures for tests needing exact known values"
      ],
      "steps": [
        {
          "t": "Step 1 — Install and create a random_user fixture",
          "p": "Generate fresh user data per test:",
          "c": "pip install Faker\n\nimport pytest\nfrom faker import Faker\n\n@pytest.fixture\ndef random_user():\n    fake = Faker()\n    return {\n        \"email\": fake.email(),\n        \"name\": fake.name(),\n        \"phone\": fake.phone_number(),\n    }"
        },
        {
          "t": "Step 2 — Use in a signup test",
          "p": "Fill form fields with generated data:",
          "c": "def test_signup(page, random_user):\n    page.goto(\"https://app.example.com/signup\")\n    page.get_by_label(\"Email\").fill(random_user[\"email\"])\n    page.get_by_label(\"Name\").fill(random_user[\"name\"])\n    page.get_by_role(\"button\", name=\"Register\").click()\n    expect(page.get_by_text(\"Account created\")).to_be_visible()"
        },
        {
          "t": "Step 3 — Add cleanup with yield pattern",
          "p": "Delete created user via API after test, pass or fail:",
          "c": "@pytest.fixture\ndef created_user(request, random_user):\n    api_create_user(random_user)\n    yield random_user\n    api_delete_user(random_user[\"email\"])"
        }
      ]
    }
  ],
  "contentMarkdown": "Static fixtures (JSON/CSV/YAML) For predictable, reusable test data, store it in a file rather than hardcoding it inline across tests. json // test_data/users.json { \"valid_user\": {\"username\": \"testuser\", \"password\": \"testpass\"}, \"invalid_user\": {\"username\": \"baduser\", \"password\": \"wrongpass\"} } python import json @pytest.fixture def user_data(): with open(\"test_data/users.json\") as f: return json\n\n## Overview\n\nStatic fixtures (JSON/CSV/YAML) For predictable, reusable test data, store it in a file rather than hardcoding it inline across tests. json\n\n// test_data/users.json\n\n{\n\n\"valid_user\": {\"username\": \"testuser\", \"password\": \"testpass\"},\n\n\"invalid_user\": {\"username\": \"baduser\", \"password\": \"wrongpass\"}\n\n} python\n\ncreds = user_data[\"valid_user\"]\n\nWhat it does: Parses a JSON file into a Python dictionary/list. Types/params:\n\nPointers: Keep test data files separate from test logic — this lets non-engineers (or future you) update test data without touching test code, and keeps large data sets from cluttering test files. Using faker for dynamic data For tests needing unique data every run (signup flows that reject duplicate emails, for example), generate realistic fake data on the fly instead of relying on static fixtures. python\n\nfake = Faker()\n\n\"email\": fake.email(),\n\n\"name\": fake.name(),\n\n\"phone\": fake.phone_number(),\n\n## Overview (2)\n\n}\n\nFaker() and its generator methods (.email(), .name(), .phone_number(), etc.) What it does: Instantiates a fake-data generator; each method call produces a realistic random value of that type. Types/params:\n\ntheir name (.email() → string email, .name() → string full name)\n\nPointers: Each call to a generator method returns a new random value — call it once and store the result in a variable if you need the same value used consistently across multiple steps in a test. Data cleanup strategies Tests that create data (a new user, a new leave request) need a plan for removing it afterward, or repeated test runs accumulate junk that can eventually cause unrelated failures (e.g., a \"list should show exactly 3 items\" test failing because 200 leftover test users are also in the list). python\n\nPointers: Cleanup via API (fast, direct) is generally preferable to cleanup via UI (slow, another thing that can flake) — this is a preview of the UI+API combination covered fully in Chapter 18. Using a fixture's yield pattern (Chapter 12) guarantees cleanup runs even if the test itself fails partway through, which a cleanup step placed only at the end of a test function would not guarantee.\n\n## Overview\n\n\n\n```\n@pytest.fixture\n\ndef created_user(page, random_user):\n\n# setup: create the user via UI or API\n\napi_create_user(random_user)\n\nyield random_user\n\n# teardown: clean up after the test, regardless of pass/fail\n\napi_delete_user(random_user[\"email\"])\n\ndef test_signup(page, random_user):\n\npage.get_by_label(\"Email\").fill(random_user[\"email\"])\n\npage.get_by_label(\"Name\").fill(random_user[\"name\"])\n\nimport json\n\n@pytest.fixture\n\ndef user_data():\n\nwith open(\"test_data/users.json\") as f:\n\nreturn json.load(f)\n\ndef test_login(page, user_data):\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
