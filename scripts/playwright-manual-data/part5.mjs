/** Playwright manual Part 5 — CI/CD & Reporting */
export const chapters = [
  {
    contentMarkdown: `## GitHub Actions workflow setup

A GitHub Actions workflow is a YAML file in \`.github/workflows/\` that defines when tests run and what steps execute. For Playwright with pytest, the standard pattern checks out code, installs Python dependencies, installs browsers with OS libraries, runs tests, and uploads artifacts on failure.

\`\`\`yaml
# .github/workflows/playwright.yml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: |
          pip install -r requirements.txt
          playwright install --with-deps

      - name: Run Playwright tests
        env:
          BASE_URL: \${{ secrets.STAGING_URL }}
        run: pytest --browser chromium -m smoke

      - name: Upload report on failure
        if: failure()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: |
            report.html
            test-results/
\`\`\`

The \`on:\` block controls triggers. \`pull_request\` gives fast feedback before merge; \`schedule\` (cron) is useful for nightly full-regression runs that do not block day-to-day development.

## playwright install --with-deps

On a fresh CI runner, browser binaries alone are not enough. Chromium and Firefox need system libraries (fonts, libgbm, libnss3, etc.) that your laptop already has. The \`--with-deps\` flag installs both browsers and the OS packages they require.

\`\`\`bash
# Local dev — often works without --with-deps if you already ran it once
playwright install chromium

# CI — always use --with-deps on Ubuntu runners
playwright install --with-deps chromium
\`\`\`

Skipping \`--with-deps\` is the single most common cause of "works locally, fails in CI" browser launch errors. If you see \`Browser closed unexpectedly\` or missing shared library errors in CI logs, this is the first thing to check.

## Jenkins pipeline basics

Jenkins uses a \`Jenkinsfile\` (Groovy DSL) to define pipeline stages. Enterprise teams often prefer Jenkins for self-hosted runners with access to internal staging environments.

\`\`\`groovy
// Jenkinsfile
pipeline {
    agent any

    environment {
        BASE_URL = credentials('staging-url')
    }

    stages {
        stage('Install') {
            steps {
                sh 'pip install -r requirements.txt'
                sh 'playwright install --with-deps'
            }
        }
        stage('Test') {
            steps {
                sh 'pytest --browser chromium --junitxml=results.xml'
            }
        }
    }

    post {
        always {
            junit 'results.xml'
            archiveArtifacts artifacts: 'report.html', allowEmptyArchive: true
        }
    }
}
\`\`\`

The \`--junitxml=results.xml\` flag produces output Jenkins understands natively. The \`junit\` post-step renders pass/fail trends over time in the Jenkins dashboard — the Jenkins equivalent of GitHub Actions' built-in test summary.

## Running headless in CI

CI runners have no display server. pytest-playwright defaults to headless mode, but being explicit prevents surprises when someone adds \`--headed\` locally and commits a conftest override.

\`\`\`python
# conftest.py — explicit headless default
import pytest

@pytest.fixture(scope="session")
def browser_type_launch_args(browser_type_launch_args):
    return {**browser_type_launch_args, "headless": True}
\`\`\`

\`\`\`bash
# Explicit CLI — headless is default, but document intent in CI scripts
pytest --browser chromium

# Headed mode fails on typical CI unless xvfb is configured — avoid it
# pytest --headed  # will fail on ubuntu-latest without a virtual display
\`\`\`

Headless execution is faster and more stable in CI. Reserve headed mode for local debugging only.

## Environment secrets and selective runs

Store staging URLs and credentials in GitHub Secrets or Jenkins credentials — never commit them to the repo.

\`\`\`yaml
env:
  BASE_URL: \${{ secrets.STAGING_URL }}
  TEST_USER: \${{ secrets.TEST_USER }}
  TEST_PASSWORD: \${{ secrets.TEST_PASSWORD }}
\`\`\`

Use pytest markers to keep PR checks fast (\`-m smoke\`) while running the full suite on a schedule or before release.`,
  },
  {
    contentMarkdown: `## pytest-html — quick HTML reports

\`pytest-html\` generates a self-contained HTML report from any pytest run. It requires zero configuration for basic use and produces a file you can open in a browser or attach to a bug ticket.

\`\`\`bash
pip install pytest-html
\`\`\`

\`\`\`bash
# Generate report.html in the project root
pytest --html=report.html --self-contained-html

# --self-contained-html embeds CSS/JS inline — single file, easy to email or upload
\`\`\`

\`\`\`python
# conftest.py — attach screenshot to HTML report on failure
import pytest

@pytest.hookimpl(hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    if report.when == "call" and report.failed:
        page = item.funcargs.get("page")
        if page:
            screenshot = page.screenshot()
            import pytest_html
            extra = getattr(report, "extra", [])
            extra.append(pytest_html.extras.png(screenshot, "Failure screenshot"))
            report.extra = extra
\`\`\`

The hook above embeds a failure screenshot directly into the HTML report — invaluable when debugging CI failures without re-running locally.

## Allure reporting

Allure produces rich, interactive reports with history, trends, categories, and step-level detail. It is the standard choice for teams that need stakeholder-friendly dashboards.

\`\`\`bash
pip install allure-pytest
\`\`\`

\`\`\`bash
# Run tests with Allure results directory
pytest --alluredir=allure-results

# Generate and open the HTML report locally
allure serve allure-results
\`\`\`

\`\`\`python
# pytest.ini
[pytest]
addopts = --alluredir=allure-results
\`\`\`

Allure reports group tests by feature, show duration trends across runs, and link attachments (screenshots, logs) to specific steps — far more navigable than a flat HTML table for large suites.

## @allure.step — structured test narration

\`@allure.step\` decorates functions and methods so Allure renders them as expandable steps in the report. Page object methods are the natural place to add steps.

\`\`\`python
import allure
from playwright.sync_api import Page

class LeavePage:
    def __init__(self, page: Page):
        self.page = page

    @allure.step("Navigate to leave request form")
    def open_new_request(self):
        self.page.goto("/leave/new")
        self.page.get_by_role("button", name="New Request").click()

    @allure.step("Submit leave request: {leave_type} from {start} to {end}")
    def submit_request(self, leave_type: str, start: str, end: str):
        self.page.get_by_label("Leave Type").select_option(leave_type)
        self.page.get_by_label("Start Date").fill(start)
        self.page.get_by_label("End Date").fill(end)
        self.page.get_by_role("button", name="Submit").click()
\`\`\`

When a test fails at \`submit_request\`, the Allure report shows exactly which step broke and with what parameters — no log-diving required.

## CI artifact upload

Reports are useless in CI if they disappear when the runner shuts down. Upload them as artifacts on every run, especially on failure.

\`\`\`yaml
# GitHub Actions — upload multiple report types
- name: Upload test artifacts
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: test-reports-\${{ github.run_number }}
    path: |
      report.html
      allure-results/
      test-results/
    retention-days: 14
\`\`\`

\`\`\`bash
# Jenkins — archive in post block
archiveArtifacts artifacts: 'report.html, allure-results/**', allowEmptyArchive: true
\`\`\`

Set \`if: always()\` (GitHub Actions) or use a \`post { always { ... } }\` block (Jenkins) so reports upload even when tests fail — that is precisely when you need them most.

## Choosing a reporting strategy

Use \`pytest-html\` for quick, zero-setup reports on small teams. Adopt Allure when the suite grows past ~50 tests, multiple contributors need to triage failures, or stakeholders want trend dashboards. Many teams run both: pytest-html for fast PR artifact review, Allure for nightly trend analysis.`,
  },
  {
    contentMarkdown: `## Official Playwright Docker image

Microsoft publishes maintained Docker images with browsers and all system dependencies pre-installed. Using the official image eliminates the "install browsers on CI" step entirely and guarantees a consistent environment across local, CI, and cloud runners.

\`\`\`bash
# Pull the image matching your Playwright version
docker pull mcr.microsoft.com/playwright/python:v1.49.0-noble

# Run tests inside the container
docker run --rm -v $(pwd):/app -w /app \\
  mcr.microsoft.com/playwright/python:v1.49.0-noble \\
  pytest --browser chromium
\`\`\`

Always pin the image tag to your \`playwright\` package version. A mismatch between the Python package and the Docker image browser version causes subtle, hard-to-debug failures.

## Dockerfile example

For teams that need custom dependencies (internal packages, database clients, test data generators), build a thin layer on top of the official image.

\`\`\`dockerfile
# Dockerfile
FROM mcr.microsoft.com/playwright/python:v1.49.0-noble

WORKDIR /app

# Install Python dependencies first — cached layer on rebuild
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy test suite
COPY . .

# Default command — override in CI or docker-compose
CMD ["pytest", "--browser", "chromium", "-m", "smoke"]
\`\`\`

\`\`\`bash
# Build and run
docker build -t playwright-tests .
docker run --rm \\
  -e BASE_URL=https://staging.example.com \\
  -e TEST_USER=testuser \\
  -e TEST_PASSWORD=secret \\
  playwright-tests
\`\`\`

## docker-compose for local parity

docker-compose makes it easy for any developer to run the full suite without installing browsers locally.

\`\`\`yaml
# docker-compose.yml
services:
  tests:
    build: .
    environment:
      BASE_URL: \${BASE_URL:-http://host.docker.internal:3000}
      TEST_USER: \${TEST_USER}
      TEST_PASSWORD: \${TEST_PASSWORD}
    volumes:
      - ./test-results:/app/test-results
      - ./report.html:/app/report.html
\`\`\`

\`\`\`bash
docker compose run --rm tests pytest --browser chromium -m regression
\`\`\`

Mounting \`test-results/\` preserves screenshots, videos, and traces on the host after the container exits.

## CI integration with Docker

In GitHub Actions, run tests inside the Playwright container instead of installing browsers on the runner.

\`\`\`yaml
jobs:
  test:
    runs-on: ubuntu-latest
    container:
      image: mcr.microsoft.com/playwright/python:v1.49.0-noble
    steps:
      - uses: actions/checkout@v4
      - run: pip install -r requirements.txt
      - run: pytest --browser chromium --junitxml=results.xml
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: test-results/
\`\`\`

## When to use Docker vs install --with-deps

Use \`playwright install --with-deps\` on bare CI runners when you want the simplest setup with no Docker knowledge required. Use the official Docker image when you need reproducible environments across developers, CI, and cloud providers, or when your test suite has non-standard system dependencies. Both approaches are production-valid — pick one and standardize on it across the team.`,
  },
  {
    contentMarkdown: `## Structured logging with logging.basicConfig

Playwright tests fail in CI with minimal console output unless you configure logging explicitly. Set up logging once in \`conftest.py\` so every test emits timestamped, leveled messages.

\`\`\`python
# conftest.py
import logging
import pytest

def pytest_configure(config):
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S",
    )

@pytest.fixture(autouse=True)
def log_test_name(request):
    logger = logging.getLogger("playwright.tests")
    logger.info("START: %s", request.node.name)
    yield
    logger.info("END: %s", request.node.name)
\`\`\`

Use module-level loggers in page objects and utilities rather than \`print()\` — log levels let you dial verbosity up in CI (\`--log-cli-level=DEBUG\`) without changing code.

\`\`\`python
import logging

logger = logging.getLogger(__name__)

class LoginPage:
    def login(self, page, username: str, password: str):
        logger.info("Logging in as %s", username)
        page.goto("/login")
        page.get_by_label("Username").fill(username)
        page.get_by_label("Password").fill(password)
        page.get_by_role("button", name="Sign in").click()
        logger.info("Login submitted, waiting for dashboard")
\`\`\`

## Screenshot on failure

pytest-playwright captures screenshots automatically when configured in \`conftest.py\` or via CLI flags.

\`\`\`python
# conftest.py
import pytest

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "record_video_dir": "test-results/videos/",
    }
\`\`\`

\`\`\`bash
# CLI flags — screenshot and video on failure
pytest --screenshot=only-on-failure --video=retain-on-failure

# Trace on first retry — best debugging artifact Playwright offers
pytest --tracing=retain-on-failure
\`\`\`

\`\`\`python
# conftest.py — programmatic screenshot in a hook
@pytest.hookimpl(tryfirst=True, hookwrapper=True)
def pytest_runtest_makereport(item, call):
    outcome = yield
    report = outcome.get_result()
    if report.when == "call" and report.failed:
        page = item.funcargs.get("page")
        if page and page.context.pages:
            path = f"test-results/{item.nodeid.replace('::', '_')}.png"
            page.screenshot(path=path, full_page=True)
\`\`\`

Screenshots answer "what did the page look like when it broke?" Traces answer "what happened step by step?" — capture both on failure in CI.

## Video recording

Videos are heavier than screenshots but invaluable for timing-related failures and animations.

\`\`\`python
# conftest.py
@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "record_video_dir": "test-results/videos/",
        "record_video_size": {"width": 1280, "height": 720},
    }
\`\`\`

\`\`\`bash
pytest --video=retain-on-failure
\`\`\`

Upload \`test-results/\` as a CI artifact so videos survive runner teardown. A 30-second failure video often saves 30 minutes of local reproduction.

## pytest-rerunfailures for transient flakes

\`pytest-rerunfailures\` automatically retries failed tests a configurable number of times before marking them as failed. Use it as a safety net, not a substitute for fixing root causes.

\`\`\`bash
pip install pytest-rerunfailures
\`\`\`

\`\`\`bash
# Retry each failure up to 2 times
pytest --reruns 2 --reruns-delay 1

# Retry only tests marked @pytest.mark.flaky
pytest --reruns 2 --only-rerun flaky
\`\`\`

\`\`\`python
import pytest

@pytest.mark.flaky(reruns=2, reruns_delay=1)
def test_dashboard_loads(page):
    page.goto("/dashboard")
    page.get_by_text("Welcome").wait_for(state="visible", timeout=5000)
\`\`\`

Pair reruns with trace capture on the final failure (\`--tracing=retain-on-failure\`) so you still get a debug artifact when all retries exhaust.

## Error handling patterns

Wrap API setup and teardown in try/finally blocks so a failed assertion does not leave orphaned test data.

\`\`\`python
def test_approve_leave_request(page, api_client, leave_factory):
    leave_id = None
    try:
        leave_id = leave_factory.create(status="pending")
        page.goto(f"/admin/leave/{leave_id}")
        page.get_by_role("button", name="Approve").click()
        page.get_by_text("Approved").wait_for()
    finally:
        if leave_id:
            api_client.delete(f"/api/leave/{leave_id}")
\`\`\`

Clean logging, failure artifacts, controlled reruns, and reliable teardown together make CI failures diagnosable in minutes instead of hours.`,
  },
  {
    contentMarkdown: `## Checkpoint — CI/CD & Reporting

Use this checkpoint to verify you can design, run, and debug a Playwright suite in a real CI pipeline. Answer each item from memory before moving to Part 6.

## Self-check questions

**CI/CD Integration**
1. What file and directory does a GitHub Actions workflow live in?
2. Why is \`playwright install --with-deps\` required on CI but often optional locally?
3. What is the difference between triggering on \`pull_request\` vs \`schedule\`?
4. Write the Jenkins \`post\` block that publishes JUnit XML results.
5. Why does headed mode fail on a typical CI runner?

**Test Reporting**
6. What flag makes \`pytest-html\` produce a single self-contained file?
7. What command generates and serves an Allure report locally?
8. Where do you add \`@allure.step\` — in tests or page objects? Why?
9. Why should artifact upload steps use \`if: always()\` instead of \`if: failure()\`?

**Docker**
10. Why must the Docker image tag match your \`playwright\` package version?
11. What does \`-v $(pwd):/app\` accomplish when running tests in Docker?

**Logging & Error Handling**
12. Where should \`logging.basicConfig\` be called in a pytest project?
13. Name three Playwright failure artifacts and what each is best for.
14. When is \`pytest-rerunfailures\` appropriate — and when is it masking a real bug?

## Practical exercise

Create a minimal GitHub Actions workflow that:
- Triggers on pull requests to \`main\`
- Installs dependencies and runs \`playwright install --with-deps\`
- Runs \`pytest --browser chromium -m smoke --html=report.html --self-contained-html\`
- Uploads \`report.html\` and \`test-results/\` as artifacts regardless of pass/fail

\`\`\`yaml
# Your answer here — then compare against the solution below
name: Playwright Smoke Tests
on:
  pull_request:
    branches: [main]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"
      - run: |
          pip install -r requirements.txt
          playwright install --with-deps
      - run: pytest --browser chromium -m smoke --html=report.html --self-contained-html
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: smoke-report
          path: |
            report.html
            test-results/
\`\`\`

## Pass criteria

You are ready for Part 6 if you can explain why CI failures often appear only in headless mode, produce an HTML or Allure report from a pytest run, upload artifacts from a workflow YAML file, and describe when Docker replaces \`install --with-deps\`. If any item above took more than 30 seconds to answer, revisit that chapter before continuing.`,
  },
];
