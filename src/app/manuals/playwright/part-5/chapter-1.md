---
id: "pw-5-ci"
title: "25. CI/CD Integration"
minutes: 50
partName: "Part 5 · CI/CD & Reporting"
level: "advanced"
---

GitHub Actions workflow setup A GitHub Actions workflow is a YAML file living in .github/workflows/ that defines when tests run (e.g., on every pull request) and what steps to execute. # .github/workflows/playwright.yml name: Playwright Tests on: push: branches: [main] pull_request: branches: [main] jobs: test: runs-on: ubuntu-latest steps: - uses: actions/checkout@v4 - uses: actions/setup-python@

## GitHub Actions workflow setup

A GitHub Actions workflow is a YAML file living in .github/workflows/ that defines when tests run (e.g., on every pull request) and what steps to execute.

push:

branches: [main]

pull_request:

branches: [main]

test:

runs-on: ubuntu-latest

with:

python-version: '3.11'

- name: Install dependencies

- name: Run tests

What it does: Defines which events cause the workflow to run.

Types/params:

Pointers: Running on pull_request is the most common setup for catching

regressions before merge; schedule is useful for a nightly full-regression run separate from a fast pull_request smoke-test run.

What it does: Installs browser binaries plus the OS-level system dependencies (fonts, libraries) those browsers need to actually run on a fresh CI machine.

Types/params: No required params; --with-deps is the key flag for CI environments specifically.

Pointers: On a fresh CI runner (unlike your local dev machine), the OS-level dependencies genuinely aren't present — skipping --with-deps is a very common cause of "works locally, fails in CI" browser launch errors.

```
run: |

pip install -r requirements.txt

playwright install --with-deps

steps:

- uses: actions/checkout@v4

- uses: actions/setup-python@v5

# .github/workflows/playwright.yml

name: Playwright Tests

on:
```

## Jenkins pipeline basics

Jenkins uses a Jenkinsfile (Groovy-based) to define pipeline stages, more common in traditional enterprise environments than GitHub Actions.

// Jenkinsfile

pipeline {

agent any

stages {

steps {

sh 'pip install -r requirements.txt'

sh 'playwright install --with-deps'

}

}

steps {

sh 'pytest --browser chromium --junitxml=results.xml'

}

}

}

post {

always {

junit 'results.xml'

}

}

}

pipeline { agent ... stages { ... } post { ... } } (Jenkinsfile structure)

What it does: Defines the overall pipeline: where it runs (agent), what steps execute

in order (stages), and cleanup/reporting actions that always run afterward (post).

Types/params:

plugin calls)

Pointers: --junitxml=results.xml produces a report format Jenkins natively

understands and can render as pass/fail trends over time via the junit post-step — this is Jenkins' equivalent of GitHub Actions' built-in test summary UI.

```
stage('Install') {

stage('Test') {
```

## Running headless in CI

Pointers: CI runners have no display server, so headless isn't optional — attempting to run headed (--headed) on a typical CI machine will fail outright unless a virtual display (like xvfb) is specifically configured, which is rarely worth the added complexity when headless works and is faster anyway.

```
# pytest-playwright defaults to headless=True already, but explicit is safer:

pytest --browser chromium  # headless by default
```