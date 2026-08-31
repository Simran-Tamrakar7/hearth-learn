---
id: "pw-6-scale"
title: "30. Managing Test Suites at Scale"
minutes: 45
partName: "Part 6 · Pro-Level Practices"
level: "pro"
---

Test tagging and selective execution across large suites Building directly on Chapter 13's markers, at scale you typically layer multiple tagging dimensions rather than one flat list: @pytest.mark.smoke @pytest.mark.module_leave @pytest.mark.critical def test_leave_request_approval_flow(): ... pytest -m "smoke and module_leave" # only smoke tests for the Leave module pytest -m "critical and not sl

## Test tagging and selective execution across large suites

Building directly on Chapter 13's markers, at scale you typically layer multiple tagging dimensions rather than one flat list:

...

Pointers: Combine markers with boolean expressions (and, or, not) for precise slicing — e.g., running just the critical-path tests for one module before a targeted deploy, without running the entire suite.

```
pytest -m "smoke and module_leave"        # only smoke tests for the Leave module

pytest -m "critical and not slow"          # critical tests, excluding known-slow ones

@pytest.mark.smoke

@pytest.mark.module_leave

@pytest.mark.critical

def test_leave_request_approval_flow():
```

## Diagnosing and managing flaky tests systematically

Rather than just re-running a failing test until it passes, track flakiness data over time to distinguish "genuinely flaky" from "actually broken."

Pointers: A dedicated flaky-test dashboard (many teams build this from CI history, or use a plugin/tool that tracks pass rate per test over many runs) is the professional approach — a test with an 80% pass rate over the last 50 runs is a real signal worth investigating (race condition, bad wait, shared test data), not something to just keep re-running around. Quarantining chronically flaky tests (marking them separately so

they don't block CI while being actively fixed) is a common practice rather than letting them erode trust in the whole suite.

```
# A simple pattern: log every retry attempt with pytest-rerunfailures

pytest --reruns 2 --reruns-delay 1 -v
```

## Writing custom reporters/plugins

Pytest's plugin system (hooks) lets you customize behavior beyond built-in options — e.g., posting results to a team Slack channel, or reshaping output for a specific tool.

What it does: A hook function pytest automatically calls after each test phase (setup/call/teardown), letting you react to results programmatically.

Types/params:

("setup"/"call"/"teardown"), .outcome, .passed/.failed/.skipped,

.nodeid (the test's identifier)

Pointers: Custom hooks are pytest's extension mechanism — worth knowing they exist even if you don't write one immediately, since they're how most third-party pytest plugins (including pytest-html, pytest-rerunfailures themselves) are actually built.

```
# conftest.py

def pytest_runtest_logreport(report):

if report.when == "call" and report.failed:

# e.g., send a Slack notification, log to a custom system, etc.

print(f"FAILED: {report.nodeid}")

pytest_runtest_logreport(report) (pytest hook)
```

## Integrating with test management tools (TestRail, Xray)

These tools track manually-written test cases and requirements; integration links automated test results back to that tracking, so a stakeholder can see "requirement X is covered by automated test Y, currently passing."

...

Pointers: This is a strong area to lean into given your QA documentation background — the mapping between manual test cases (which you likely already know how to write well) and automated test IDs is often the piece automation-only engineers overlook, and it's exactly the kind of cross-functional value a QA-background-plus-automation-skills profile brings to a team.

```
# Common pattern: tag tests with the TestRail/Xray case ID

@pytest.mark.testrail_id("C1234")

def test_leave_request_approval_flow():
```