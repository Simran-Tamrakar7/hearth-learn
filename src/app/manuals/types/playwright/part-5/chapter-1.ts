import type { ChapterRecord } from "../../../types";

/** 25. CI/CD Integration */
export const chapter = {
  "id": "pw-5-ci",
  "title": "25. CI/CD Integration",
  "minutes": 50,
  "level": "advanced",
  "phase": "Part 5 · CI/CD & Reporting",
  "partName": "Part 5 · CI/CD & Reporting",
  "overviewText": "CI/CD integration is the practice of running your Playwright test suite automatically on every code change — typically on every pull request and push to main — inside a continuous integration pipeline rather than relying on developers to remember to run tests locally. A CI pipeline is defined as a YAML workflow file (GitHub Actions) or a Jenkinsfile (Jenkins) that specifies exactly when tests run, which machine they run on, and what steps execute: checking out code, installing Python dependencies, installing Playwright browsers with OS-level system dependencies, running pytest, and publishing results. The critical difference between local and CI execution is that CI runners have no display server — tests must run headless — and fresh machines lack the browser libraries your laptop already has installed, which is why playwright install --with-deps is non-negotiable in CI. Getting tests green in CI is often where the real learning happens: environment variables, missing dependencies, and headless-only quirks that never appear locally.",
  "why": "Tests that only run on a developer's laptop are not a safety net — they are a suggestion. A bug merged to main because nobody ran the suite before pushing costs the whole team time in hotfixes, rollbacks, and lost trust in the release process. CI integration means every pull request is automatically validated before merge, regressions are caught within minutes of being introduced, and the team has a single authoritative pass/fail signal rather than conflicting local results. For Playwright specifically, CI is where headless execution, browser dependency installation, and artifact publishing become real operational concerns rather than theoretical topics.",
  "when": "Set up CI integration as soon as you have a stable smoke or regression suite worth blocking merges on — typically after Page Object Model structure and conftest.py fixtures are in place (Chapters 14–20). Run on every pull_request to main for fast feedback, and optionally add a scheduled nightly run for the full regression suite. Revisit the workflow whenever you add new dependencies, change browser versions, or introduce parallel execution — each change can break CI in ways that local runs won't reveal.",
  "practical": {
    "app": "Bizlevate HRMS — Leave module regression suite",
    "scenario": "A developer pushes a CSS change to the leave-approval page. The GitHub Actions workflow triggers on the pull request, installs dependencies, runs playwright install --with-deps, and executes pytest --browser chromium against the staging environment.",
    "pass": "All 47 Playwright tests pass in CI within 8 minutes. The PR shows a green checkmark, the merge is unblocked, and the team merges confidently knowing the leave-approval flow still works end-to-end.",
    "fail": "Three tests fail in CI with 'Browser closed unexpectedly' because the workflow skipped playwright install --with-deps. Locally the developer's machine already had the libraries installed, so tests passed there. The CI failure blocks the merge until --with-deps is added to the workflow YAML."
  },
  "advantages": [
    "Every pull request is automatically validated — no reliance on developers remembering to run tests",
    "Catches environment-specific bugs (missing OS libraries, headless quirks) that local runs miss",
    "Provides a single authoritative pass/fail signal the whole team trusts",
    "GitHub Actions and Jenkins both integrate natively with pull request status checks",
    "JUnit XML output enables pass/fail trend tracking over time in Jenkins dashboards",
    "Scheduled nightly runs catch regressions from upstream dependency changes without blocking day-to-day merges"
  ],
  "limitations": [
    "CI runners have no display — headed mode fails unless xvfb is configured, which adds complexity",
    "Fresh CI machines lack browser OS dependencies — skipping --with-deps is the most common CI failure cause",
    "CI minutes cost money on hosted runners — long suites need parallelization or selective marker runs",
    "Environment differences (staging URLs, API keys, test data) require careful secrets management via GitHub Secrets or Jenkins credentials",
    "Flaky tests that pass locally intermittently become CI blockers — they must be fixed or quarantined, not ignored"
  ],
  "tools": [
    {
      "name": "GitHub Actions",
      "sub": "CI/CD",
      "url": "https://github.com/features/actions",
      "desc": "GitHub Actions is a built-in CI/CD platform that runs workflows defined as YAML files in .github/workflows/. For Playwright, the standard workflow checks out code, sets up Python, installs dependencies, runs playwright install --with-deps to install browser binaries plus all OS-level libraries, executes pytest, and optionally uploads HTML reports or trace files as downloadable artifacts. Workflows trigger on push, pull_request, or schedule events. GitHub Actions is free for public repos and includes a generous minutes allowance for private repos.",
      "adv": [
        "Native integration with GitHub pull requests — pass/fail shows directly on the PR",
        "actions/upload-artifact makes test reports and traces downloadable after every run",
        "Matrix strategy runs the same suite across multiple browsers in parallel",
        "Zero infrastructure to manage — GitHub hosts the runners"
      ],
      "lim": [
        "Tied to GitHub — teams on GitLab or Bitbucket need a different CI platform",
        "Hosted runner minutes are limited on free private repo tiers",
        "Debugging CI-only failures requires reading logs or downloading artifacts — no local-like debugging without re-running"
      ],
      "steps": [
        {
          "t": "Step 1 — Create the workflow file",
          "p": "Create .github/workflows/playwright.yml:",
          "c": "name: Playwright Tests\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-python@v5\n        with:\n          python-version: '3.11'\n      - name: Install dependencies\n        run: |\n          pip install -r requirements.txt\n          playwright install --with-deps\n      - name: Run tests\n        run: pytest --browser chromium"
        },
        {
          "t": "Step 2 — Add environment secrets",
          "p": "Store staging URL and credentials in GitHub Secrets (Settings → Secrets → Actions):",
          "c": "# In workflow YAML:\nenv:\n  BASE_URL: ${{ secrets.STAGING_URL }}\n  TEST_USER: ${{ secrets.TEST_USER }}\n  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}"
        },
        {
          "t": "Step 3 — Upload test report as artifact",
          "p": "Add an upload step that runs even when tests fail:",
          "c": "- name: Upload test report\n  if: always()\n  uses: actions/upload-artifact@v4\n  with:\n    name: playwright-report\n    path: report.html"
        },
        {
          "t": "Step 4 — Verify on a pull request",
          "p": "Push a branch and open a PR — the Actions tab shows the workflow run and pass/fail status on the PR itself.",
          "c": "# PR checks panel shows:\n# ✓ Playwright Tests — 47 passed in 8m 12s"
        }
      ]
    },
    {
      "name": "Jenkins",
      "sub": "CI/CD",
      "url": "https://www.jenkins.io",
      "desc": "Jenkins is an open-source automation server widely used in enterprise environments. Playwright tests integrate via a Jenkinsfile — a Groovy-based pipeline definition — that defines install and test stages. Jenkins natively understands JUnit XML output via the junit post-step, rendering pass/fail trends over time in its dashboard. Jenkins is self-hosted, giving teams full control over runner hardware, browser versions, and network access to internal staging environments.",
      "adv": [
        "Self-hosted — full control over runner hardware, network, and browser versions",
        "JUnit XML integration renders pass/fail trends natively in the Jenkins dashboard",
        "Mature plugin ecosystem for Slack notifications, TestRail integration, and credential management",
        "Common in enterprise environments where GitHub Actions is not the standard"
      ],
      "lim": [
        "Requires infrastructure to host and maintain the Jenkins server",
        "Jenkinsfile Groovy syntax has a steeper learning curve than GitHub Actions YAML",
        "Pipeline debugging is slower than cloud-native CI — failed stages require log diving"
      ],
      "steps": [
        {
          "t": "Step 1 — Create a Jenkinsfile",
          "p": "Add Jenkinsfile to the repo root:",
          "c": "pipeline {\n    agent any\n    stages {\n        stage('Install') {\n            steps {\n                sh 'pip install -r requirements.txt'\n                sh 'playwright install --with-deps'\n            }\n        }\n        stage('Test') {\n            steps {\n                sh 'pytest --browser chromium --junitxml=results.xml'\n            }\n        }\n    }\n    post {\n        always {\n            junit 'results.xml'\n        }\n    }\n}"
        },
        {
          "t": "Step 2 — Create a Jenkins pipeline job",
          "p": "In Jenkins UI: New Item → Pipeline → point to the Jenkinsfile in the repo.",
          "c": "# Pipeline script from SCM:\n# Repository URL: https://github.com/your-org/your-repo\n# Script Path: Jenkinsfile"
        },
        {
          "t": "Step 3 — Run and review JUnit trends",
          "p": "After the first run, Jenkins renders pass/fail history from results.xml in the Test Result tab.",
          "c": "# Jenkins Test Result tab shows:\n# 47 tests, 0 failures, 0 skipped\n# Trend graph over last 30 builds"
        }
      ]
    }
  ],
  "contentMarkdown": "## GitHub Actions workflow setup\n\nA GitHub Actions workflow is a YAML file in `.github/workflows/` that defines when tests run and what steps execute. For Playwright with pytest, the standard pattern checks out code, installs Python dependencies, installs browsers with OS libraries, runs tests, and uploads artifacts on failure.\n\n```yaml\n# .github/workflows/playwright.yml\nname: Playwright Tests\n\non:\n  push:\n    branches: [main]\n  pull_request:\n    branches: [main]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n\n      - uses: actions/setup-python@v5\n        with:\n          python-version: \"3.11\"\n\n      - name: Install dependencies\n        run: |\n          pip install -r requirements.txt\n          playwright install --with-deps\n\n      - name: Run Playwright tests\n        env:\n          BASE_URL: ${{ secrets.STAGING_URL }}\n        run: pytest --browser chromium -m smoke\n\n      - name: Upload report on failure\n        if: failure()\n        uses: actions/upload-artifact@v4\n        with:\n          name: playwright-report\n          path: |\n            report.html\n            test-results/\n```\n\nThe `on:` block controls triggers. `pull_request` gives fast feedback before merge; `schedule` (cron) is useful for nightly full-regression runs that do not block day-to-day development.\n\n## playwright install --with-deps\n\nOn a fresh CI runner, browser binaries alone are not enough. Chromium and Firefox need system libraries (fonts, libgbm, libnss3, etc.) that your laptop already has. The `--with-deps` flag installs both browsers and the OS packages they require.\n\n```bash\n# Local dev — often works without --with-deps if you already ran it once\nplaywright install chromium\n\n# CI — always use --with-deps on Ubuntu runners\nplaywright install --with-deps chromium\n```\n\nSkipping `--with-deps` is the single most common cause of \"works locally, fails in CI\" browser launch errors. If you see `Browser closed unexpectedly` or missing shared library errors in CI logs, this is the first thing to check.\n\n## Jenkins pipeline basics\n\nJenkins uses a `Jenkinsfile` (Groovy DSL) to define pipeline stages. Enterprise teams often prefer Jenkins for self-hosted runners with access to internal staging environments.\n\n```groovy\n// Jenkinsfile\npipeline {\n    agent any\n\n    environment {\n        BASE_URL = credentials('staging-url')\n    }\n\n    stages {\n        stage('Install') {\n            steps {\n                sh 'pip install -r requirements.txt'\n                sh 'playwright install --with-deps'\n            }\n        }\n        stage('Test') {\n            steps {\n                sh 'pytest --browser chromium --junitxml=results.xml'\n            }\n        }\n    }\n\n    post {\n        always {\n            junit 'results.xml'\n            archiveArtifacts artifacts: 'report.html', allowEmptyArchive: true\n        }\n    }\n}\n```\n\nThe `--junitxml=results.xml` flag produces output Jenkins understands natively. The `junit` post-step renders pass/fail trends over time in the Jenkins dashboard — the Jenkins equivalent of GitHub Actions' built-in test summary.\n\n## Running headless in CI\n\nCI runners have no display server. pytest-playwright defaults to headless mode, but being explicit prevents surprises when someone adds `--headed` locally and commits a conftest override.\n\n```python\n# conftest.py — explicit headless default\nimport pytest\n\n@pytest.fixture(scope=\"session\")\ndef browser_type_launch_args(browser_type_launch_args):\n    return {**browser_type_launch_args, \"headless\": True}\n```\n\n```bash\n# Explicit CLI — headless is default, but document intent in CI scripts\npytest --browser chromium\n\n# Headed mode fails on typical CI unless xvfb is configured — avoid it\n# pytest --headed  # will fail on ubuntu-latest without a virtual display\n```\n\nHeadless execution is faster and more stable in CI. Reserve headed mode for local debugging only.\n\n## Environment secrets and selective runs\n\nStore staging URLs and credentials in GitHub Secrets or Jenkins credentials — never commit them to the repo.\n\n```yaml\nenv:\n  BASE_URL: ${{ secrets.STAGING_URL }}\n  TEST_USER: ${{ secrets.TEST_USER }}\n  TEST_PASSWORD: ${{ secrets.TEST_PASSWORD }}\n```\n\nUse pytest markers to keep PR checks fast (`-m smoke`) while running the full suite on a schedule or before release.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
