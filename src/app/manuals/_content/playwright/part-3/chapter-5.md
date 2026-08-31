---
id: "pw-3-data"
title: "16. Test Data Management"
minutes: 40
partName: "Part 3 · Test Structure & Framework"
level: "intermediate"
---

Static fixtures (JSON/CSV/YAML) For predictable, reusable test data, store it in a file rather than hardcoding it inline across tests. json // test_data/users.json { "valid_user": {"username": "testuser", "password": "testpass"}, "invalid_user": {"username": "baduser", "password": "wrongpass"} } python import json @pytest.fixture def user_data(): with open("test_data/users.json") as f: return json

## Overview

Static fixtures (JSON/CSV/YAML) For predictable, reusable test data, store it in a file rather than hardcoding it inline across tests. json

// test_data/users.json

{

"valid_user": {"username": "testuser", "password": "testpass"},

"invalid_user": {"username": "baduser", "password": "wrongpass"}

} python

creds = user_data["valid_user"]

What it does: Parses a JSON file into a Python dictionary/list. Types/params:

Pointers: Keep test data files separate from test logic — this lets non-engineers (or future you) update test data without touching test code, and keeps large data sets from cluttering test files. Using faker for dynamic data For tests needing unique data every run (signup flows that reject duplicate emails, for example), generate realistic fake data on the fly instead of relying on static fixtures. python

fake = Faker()

"email": fake.email(),

"name": fake.name(),

"phone": fake.phone_number(),

## Overview (2)

}

Faker() and its generator methods (.email(), .name(), .phone_number(), etc.) What it does: Instantiates a fake-data generator; each method call produces a realistic random value of that type. Types/params:

their name (.email() → string email, .name() → string full name)

Pointers: Each call to a generator method returns a new random value — call it once and store the result in a variable if you need the same value used consistently across multiple steps in a test. Data cleanup strategies Tests that create data (a new user, a new leave request) need a plan for removing it afterward, or repeated test runs accumulate junk that can eventually cause unrelated failures (e.g., a "list should show exactly 3 items" test failing because 200 leftover test users are also in the list). python

Pointers: Cleanup via API (fast, direct) is generally preferable to cleanup via UI (slow, another thing that can flake) — this is a preview of the UI+API combination covered fully in Chapter 18. Using a fixture's yield pattern (Chapter 12) guarantees cleanup runs even if the test itself fails partway through, which a cleanup step placed only at the end of a test function would not guarantee.

## Overview



```
@pytest.fixture

def created_user(page, random_user):

# setup: create the user via UI or API

api_create_user(random_user)

yield random_user

# teardown: clean up after the test, regardless of pass/fail

api_delete_user(random_user["email"])

def test_signup(page, random_user):

page.get_by_label("Email").fill(random_user["email"])

page.get_by_label("Name").fill(random_user["name"])

import json

@pytest.fixture

def user_data():

with open("test_data/users.json") as f:

return json.load(f)

def test_login(page, user_data):
```