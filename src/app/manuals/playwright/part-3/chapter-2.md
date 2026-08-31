---
id: "pw-3-org"
title: "13. Test Organization"
minutes: 40
partName: "Part 3 · Test Structure & Framework"
level: "intermediate"
---

Markers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python import pytest @pytest.mark.smoke def test_login_works(): ...

## Overview

Markers Markers tag tests so you can selectively run subsets instead of the entire suite every time. python

...

...

bash

Custom markers need to be registered in pytest.ini (Chapter 15) or pytest will emit a warning about unknown markers.

What it does: Attaches a tag to a test function, usable later to filter which tests run. Types/params:

Pointers: Use consistent, small marker vocabulary across the team (smoke, regression, critical) rather than ad-hoc one-off tags — otherwise -m filtering becomes unreliable. Parametrized tests Instead of writing near-identical test functions for different inputs, parametrize one test function to run multiple times with different data. python

("", "validpass", "Username is required"),

("validuser", "", "Password is required"),

("validuser", "wrongpass", "Invalid credentials"),

])

This runs as three separate test cases in the report, each clearly showing which input combination passed/failed — far more maintainable than three nearly-identical copy-pasted test functions.

## Overview (2)

What it does: Runs the same test function once per set of provided argument values. Types/params:

function will receive, e.g. "username,password,expected_error"

Pointers: Each parameter set shows up as a distinct test in reports (e.g., test_login_validation[validuser-wrongpass-Invalid credentials]), making failures easy to pinpoint to a specific data combination. Grouping/tagging tests (smoke, regression) Beyond individual markers, teams typically organize entire folders by test type or feature area:

tests/

├── smoke/

│ └── test_critical_paths.py

├── regression/

│ └── test_edge_cases.py

└── modules/

├── test_leave_management.py

└── test_attendance.py

Combined with markers, this gives two independent ways to slice the suite — by folder (pytest tests/smoke/) or by tag (pytest -m smoke) — useful since a "smoke" test might live logically inside a feature folder but still need to run as part of a fast pre-deploy check.

## Overview



```
def test_login_validation(page, username, password, expected_error):

page.get_by_label("Username").fill(username)

page.get_by_label("Password").fill(password)

page.get_by_role("button", name="Log in").click()

expect(page.get_by_text(expected_error)).to_be_visible()

pytest -m smoke        # run only smoke-tagged tests

pytest -m "not regression"   # run everything except regression tests

@pytest.mark.regression

def test_edge_case_special_characters_in_username():
```