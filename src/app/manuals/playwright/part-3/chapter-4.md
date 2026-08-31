---
id: "pw-3-config"
title: "15. Configuration Management"
minutes: 40
partName: "Part 3 · Test Structure & Framework"
level: "intermediate"
---

pytest.ini / conftest.py as config equivalent Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini # pytest.ini [pytest] markers = smoke: quick critical-path tests regression: full regression suite

## Overview

Since Python Playwright has no built-in config file (unlike the JS test runner's playwright.config.ts), pytest.ini fills that role for pytest-level settings, and conftest.py handles anything needing actual code (like environment-based fixture values). ini

[pytest]

markers =

smoke: quick critical-path tests

regression: full regression suite

addopts = --headed --browser chromium

What it does: Central place for pytest-level settings: registered markers, default command-line options, test discovery rules. Types/params:

Pointers: Registering markers here (Chapter 13) is what keeps @pytest.mark.smoke from producing warnings and documents what each marker means for the rest of the team. Environment variables, base URLs python

bash BASE_URL=https://prod.example.com pytest

What it does: Reads an environment variable, falling back to a default if it isn't set. Types/params:

Pointers: This is the standard pattern for making a test suite environment-aware without hardcoding URLs, so the exact same test code runs against dev, staging, or prod depending on how it's invoked. Managing multiple environments (dev/staging/prod) A common pattern is separate .env-style files or a small config dictionary keyed by environment name: python

```
# conftest.py

import os

import pytest

@pytest.fixture(scope="session")

def base_url():

return os.environ.get("BASE_URL", "https://staging.example.com")

pytest.ini [pytest] section (config file, not a function)

pytest.ini / conftest.py as config equivalent
```

## ENVIRONMENTS = {

"dev": "https://dev.example.com",

"staging": "https://staging.example.com",

"prod": "https://app.example.com",

}

env = os.environ.get("TEST_ENV", "staging")

bash TEST_ENV=prod pytest # careful — running full suites against prod is usually restricted to read-only smoke tests Pointer worth flagging: running write-heavy tests (creating/deleting data) against production is a common real-world mistake — most teams restrict prod runs to smoke-tagged, non-destructive tests only, enforced by combining TEST_ENV with markers from Chapter 13.

```
@pytest.fixture(scope="session")

def base_url():

return ENVIRONMENTS[env]
```