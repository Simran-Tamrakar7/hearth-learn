---
id: "pw-5-logging"
title: "28. Logging & Error Handling"
minutes: 35
partName: "Part 5 · CI/CD & Reporting"
level: "advanced"
---

Custom logging setup import logging logging.basicConfig( level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s" ) logger = logging.getLogger(__name__) def test_login(page): logger.info("Starting login test") page.goto("https://app.example.com/login") logger.info("Navigated to login page") logging.basicConfig(level=..., format=...) What it does: Configures the root logger's minimum 

## Custom logging setup

level=logging.INFO,

format="%(asctime)s - %(levelname)s - %(message)s"

)

logger = logging.getLogger(__name__)

```
def test_login(page):

logger.info("Starting login test")

import logging

logging.basicConfig(
```

## page.goto("https://app.example.com/login")

What it does: Configures the root logger's minimum severity level and output format

Types/params:

logging.ERROR) — messages below this level are suppressed

(timestamp, level, message, etc.)

Pointers: INFO level is a reasonable default for test runs — enough to trace what a test

was doing without the noise of DEBUG-level internals. Custom logging like this gives

readable output beyond raw pytest console output, especially useful when a CI failure needs a narrative of "what happened right before it broke," not just a stack trace.

```
logger.info("Navigated to login page")

logging.basicConfig(level=..., format=...)

for the whole test run.
```

## Screenshot/video capture on failure

--screenshot / --video (pytest-playwright CLI flags)

What it does: Automatically captures a screenshot and/or video for each test, controllable by outcome.

Types/params:

Pointers: only-on-failure / retain-on-failure are the right defaults for most

suites — capturing on every single test ("on") generates large amounts of storage for passing tests you'll likely never look at, while still giving you full debugging evidence exactly when you need it (a failure).

```
# pytest-playwright supports this via CLI flags directly:

pytest --screenshot=only-on-failure --video=retain-on-failure
```

## Retry logic for flaky tests

What it does: Automatically re-runs a failed test up to a specified number of times before marking it as a genuine failure.

Types/params:

Pointers: Retry logic should be used carefully — it's meant for genuine environmental flakiness (a network blip, a race condition in test setup), not as a way to paper over a real, reproducible bug. A test that only passes 1-in-3 tries even with retries almost always indicates a real problem worth fixing rather than retrying around indefinitely; tracking which tests need reruns over time (tying back to Chapter 30's flaky-test diagnosis) is more valuable long-term than just cranking up the rerun count.

```
pip install pytest-rerunfailures

pytest --reruns 2 --reruns-delay 1

pytest --reruns <count> --reruns-delay <seconds>
```