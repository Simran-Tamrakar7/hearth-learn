---
id: "pw-6-framework"
title: "29. Building a Scalable Framework from Scratch"
minutes: 60
partName: "Part 6 · Pro-Level Practices"
level: "pro"
---

Folder architecture for enterprise-grade projects Past a certain size, a flat tests/ + pages/ structure (Chapter 14) stops being enough. An enterprise-grade layout separates concerns clearly so new contributors can navigate it without a guided tour: project/ ├── tests/ │ ├── smoke/ │ ├── regression/ │ └── modules/ │ ├── test_leave.py │ ├── test_attendance.py │ └── test_payroll.py ├── pages/ │ ├── 

## Folder architecture for enterprise-grade projects

Past a certain size, a flat tests/ + pages/ structure (Chapter 14) stops being enough. An enterprise-grade layout separates concerns clearly so new contributors can navigate it without a guided tour:

project/

├── tests/

│ ├── smoke/

│ ├── regression/

│ └── modules/

│ ├── test_leave.py

│ ├── test_attendance.py

│ └── test_payroll.py

├── pages/

│ ├── base_page.py

│ └── modules/

│ ├── leave_page.py

│ └── attendance_page.py

├── utils/

│ ├── api_helpers.py

│ ├── data_generators.py

│ └── wait_helpers.py

├── config/

│ ├── environments.py

│ └── settings.py

├── test_data/

│ └── users.json

├── conftest.py

├── pytest.ini

└── requirements.txt

Pointers: The organizing principle is "a new engineer should be able to guess where something lives before searching for it." Grouping page objects and tests by feature module (mirroring your actual application's modules — e.g., matching Bizlevate's Leave/Attendance/Payroll structure) rather than by arbitrary file order keeps the mapping between app and test suite obvious.

## Utilities/helpers layer

A utils/ layer holds logic that doesn't belong in a page object (which should only know about its own page) or a test (which should read like a scenario, not implementation detail).

response = request.post("/users", json={"name": name, "email": email})

```
return response.json()["id"]

def delete_test_user(request, user_id):

request.delete(f"/users/{user_id}")

# utils/wait_helpers.py

def wait_for_toast_to_disappear(page, timeout=5000):

# utils/api_helpers.py

def create_test_user(request, name, email):
```

## Utility function pattern (utils/*.py — convention, not a Playwright API)

What it does: Groups reusable, cross-cutting logic (API setup helpers, custom wait conditions, data generation) that multiple page objects or test files need, without duplicating it in each.

Types/params: N/A — plain Python functions, organized by concern (e.g., api_helpers.py, wait_helpers.py, data_generators.py).

Pointers: A good test for whether something belongs in utils/ versus a page object: does it know about a specific page's UI? If yes, it's a page object method. Does it know about the API or a generic wait pattern usable across many pages? That's a utility.

## Config-driven test execution

Behavior (which environment, which browser, headless/headed) should be controlled by configuration, not hardcoded into test files, so the same framework runs anywhere without code changes.

```
# config/settings.py

import os

class Settings:
```

## BASE_URL = {

"dev": "https://dev.example.com",

"staging": "https://staging.example.com",

"prod": "https://app.example.com",

}[ENV]

## Settings class pattern (convention, not a Playwright API)

What it does: Centralizes all environment/execution configuration into one importable object, read once from environment variables at import time.

Types/params: N/A — a plain Python class with class-level attributes, typically populated via os.environ.get() (Chapter 15).

Pointers: Import Settings wherever configuration is needed (conftest.py, page objects, utilities) instead of scattering separate os.environ.get() calls throughout the codebase — one clear source of truth is easier to audit and change later.