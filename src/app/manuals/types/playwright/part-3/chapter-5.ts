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
  "contentMarkdown": "## Separating Test Data from Test Logic\n\nTests that embed `\"qa@example.com\"` and `\"SuperSecret123\"` inline are hard to update and impossible to share across environments. **Test data management** keeps inputs in dedicated files or factories, loads them through fixtures, and cleans up created records after each test.\n\n## JSON Fixtures\n\nStore static data in `tests/e2e/data/`:\n\n```json\n{\n  \"valid_user\": {\n    \"email\": \"qa@example.com\",\n    \"password\": \"TestPass123!\",\n    \"display_name\": \"QA User\"\n  },\n  \"invalid_users\": [\n    {\"email\": \"\", \"password\": \"secret\", \"error\": \"Email is required\"},\n    {\"email\": \"bad@\", \"password\": \"secret\", \"error\": \"Invalid email\"}\n  ]\n}\n```\n\nLoad with a fixture:\n\n```python\nimport json\nimport pytest\nfrom pathlib import Path\n\nDATA_DIR = Path(__file__).parent / \"data\"\n\n@pytest.fixture(scope=\"session\")\ndef users_data():\n    with open(DATA_DIR / \"users.json\") as f:\n        return json.load(f)\n\ndef test_login_with_valid_user(page, users_data, login_page):\n    user = users_data[\"valid_user\"]\n    login_page.open()\n    login_page.sign_in(user[\"email\"], user[\"password\"])\n    login_page.expect_redirect_to_dashboard()\n```\n\nJSON fixtures work well for static, version-controlled data. Commit them alongside tests so PRs show data changes explicitly.\n\n## Dynamic Data with Faker\n\nStatic emails collide when tests run in parallel — two tests creating `qa@example.com` cause unique-constraint failures. Generate unique values with **Faker**:\n\n```bash\npip install faker\n```\n\n```python\nimport pytest\nfrom faker import Faker\n\n@pytest.fixture\ndef fake() -> Faker:\n    return Faker()\n\n@pytest.fixture\ndef new_user(fake):\n    return {\n        \"email\": fake.unique.email(),\n        \"password\": fake.password(length=16),\n        \"first_name\": fake.first_name(),\n        \"last_name\": fake.last_name(),\n    }\n\ndef test_register_new_user(page, new_user):\n    page.goto(\"/register\")\n    page.get_by_label(\"Email\").fill(new_user[\"email\"])\n    page.get_by_label(\"Password\").fill(new_user[\"password\"])\n    page.get_by_role(\"button\", name=\"Create account\").click()\n    expect(page.get_by_text(\"Welcome\")).to_be_visible()\n```\n\n`fake.unique` ensures no duplicate emails within a single test run.\n\n## API Seeding — Create Data Before UI Tests\n\nFor complex entities (orders, projects, leave requests), seed via API instead of clicking through the UI:\n\n```python\nimport pytest\nimport requests\n\n@pytest.fixture\ndef api_client(base_url):\n    session = requests.Session()\n    session.headers[\"Authorization\"] = f\"Bearer {os.environ['API_TOKEN']}\"\n    session.base_url = base_url\n    return session\n\n@pytest.fixture\ndef seeded_project(api_client, fake):\n    payload = {\"name\": fake.company(), \"status\": \"active\"}\n    resp = api_client.post(f\"{api_client.base_url}/api/projects\", json=payload)\n    resp.raise_for_status()\n    project = resp.json()\n    yield project\n    # cleanup\n    api_client.delete(f\"{api_client.base_url}/api/projects/{project['id']}\")\n```\n\nThe UI test starts on a page that already has data:\n\n```python\ndef test_project_dashboard(page, base_url, seeded_project):\n    page.goto(f\"{base_url}/projects/{seeded_project['id']}\")\n    expect(page.get_by_role(\"heading\")).to_contain_text(seeded_project[\"name\"])\n```\n\n## Cleanup with yield Fixtures\n\n**Always clean up data your test creates.** A `yield` fixture guarantees teardown runs after pass or fail:\n\n```python\n@pytest.fixture\ndef created_employee(api_client, fake):\n    employee = {\n        \"email\": fake.unique.email(),\n        \"department\": \"Engineering\",\n    }\n    resp = api_client.post(\"/api/employees\", json=employee)\n    resp.raise_for_status()\n    employee[\"id\"] = resp.json()[\"id\"]\n\n    yield employee\n\n    api_client.delete(f\"/api/employees/{employee['id']}\")\n```\n\nIf the test fails mid-flow, pytest still executes the code after `yield`. This prevents orphaned records from polluting the next run.\n\n## Combining JSON and Faker\n\nA common pattern: JSON provides the template, Faker provides uniqueness:\n\n```python\n@pytest.fixture\ndef employee_payload(users_data, fake):\n    template = users_data[\"employee_template\"].copy()\n    template[\"email\"] = fake.unique.email()\n    template[\"employee_id\"] = fake.uuid4()\n    return template\n```\n\n## Data Directory Conventions\n\n```\ntests/e2e/data/\n  users.json           # static user accounts\n  products.json        # catalog items for e-commerce tests\n  api_responses/       # mock response bodies (used with page.route)\n    empty_search.json\n    server_error.json\n```\n\nKeep sensitive production data out of the repo. Generate synthetic data with Faker or use dedicated test-environment accounts.\n\n## Key Takeaways\n\n- Static data in JSON files; dynamic unique values from Faker.\n- Seed complex state via API fixtures, not UI clicks.\n- Use `yield` fixtures for guaranteed cleanup — teardown runs on failure too.\n- Never commit real user passwords or production data to version control.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
