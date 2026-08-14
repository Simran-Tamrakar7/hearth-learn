export interface PlaywrightChapter {
  id: string;
  partIndex: string;
  partTitle: string;
  order: number;
  slug: string;
  title: string;
  estimatedMinutes: number;
  level: "Beginner" | "Intermediate" | "Advanced" | "Pro";
  summary: string;
  contentMarkdown: string;
  codeSnippet?: string;
  keyTakeaways: string[];
  exercise?: {
    prompt: string;
    starterCode: string;
    solutionCode: string;
  };
}

export const PLAYWRIGHT_PARTS = [
  { id: "part-0", title: "Part 0 · Background & Mental Model", totalTime: "~120 mins" },
  { id: "part-1", title: "Part 1 · Foundations & Environment Setup", totalTime: "~180 mins" },
  { id: "part-2", title: "Part 2 · Core Interactions & Assertions", totalTime: "~240 mins" },
  { id: "part-3", title: "Part 3 · Test Architecture & Page Object Model", totalTime: "~210 mins" },
  { id: "part-4", title: "Part 4 · Network Interception & API Testing", totalTime: "~240 mins" },
  { id: "part-5", title: "Part 5 · CI/CD Pipelines & Docker Automation", totalTime: "~180 mins" },
  { id: "part-6", title: "Part 6 · Capstone Project & Job Readiness", totalTime: "~270 mins" },
];

export const PLAYWRIGHT_CHAPTERS: PlaywrightChapter[] = [
  {
    id: "pw-01",
    partIndex: "part-0",
    partTitle: "Part 0 · Background & Mental Model",
    order: 1,
    slug: "what-is-playwright",
    title: "What is Playwright, Really?",
    estimatedMinutes: 20,
    level: "Beginner",
    summary: "Understand Playwright's CDP & WebDriver BiDi architecture, out-of-process automation driver, and why it runs faster than legacy tools.",
    contentMarkdown: `### Why Playwright was Created
Playwright is a modern end-to-end testing library created by Microsoft to automate Chromium, Firefox, and WebKit browsers using a single unified API. Unlike Selenium WebDriver which communicates through HTTP JSON Wire protocol, Playwright uses **Chrome DevTools Protocol (CDP)** and WebSockets for real-time bi-directional control.

#### Key Architectural Shift:
- **Single Process Driver**: Playwright communicates directly with browser binary processes over WebSockets.
- **Out-of-Process Execution**: Your test runner script runs in NodeJS/Python while controlling the browser engine out-of-process.
- **Multi-Context Isolation**: Create thousands of isolated browser contexts in milliseconds without launching fresh browser instances.`,
    codeSnippet: `from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=True)
    page = browser.new_page()
    page.goto("https://playwright.dev")
    print(f"Page title: {page.title()}")
    browser.close()`,
    keyTakeaways: [
      "Playwright uses WebSocket bi-directional CDP communication, eliminating artificial delays.",
      "Browser contexts isolate cookies and storage instantly without restarting browser binaries.",
      "Supports WebKit (Safari), Chromium (Chrome/Edge), and Firefox using identical code.",
    ],
    exercise: {
      prompt: "Write a Playwright script that navigates to 'https://demo.playwright.dev/todomvc' and asserts the page title contains 'TodoMVC'.",
      starterCode: `from playwright.sync_api import sync_playwright

def test_title():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        # TODO: Add navigation & assertion
        browser.close()`,
      solutionCode: `from playwright.sync_api import sync_playwright

def test_title():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        page.goto("https://demo.playwright.dev/todomvc")
        assert "TodoMVC" in page.title()
        browser.close()`,
    },
  },
  {
    id: "pw-02",
    partIndex: "part-0",
    partTitle: "Part 0 · Background & Mental Model",
    order: 2,
    slug: "where-playwright-is-used",
    title: "Where Playwright is Used in Industry",
    estimatedMinutes: 30,
    level: "Beginner",
    summary: "Discover real-world enterprise use cases: regression test suites, synthetic monitoring, web scraping, and visual testing.",
    contentMarkdown: `### Enterprise Use Cases for Playwright
Playwright isn't just for QA automation teams. Modern engineering organizations use Playwright across 4 primary domains:

1. **E2E Smoke & Regression Pipelines**: Automated PR validation before deployments.
2. **Synthetic Production Heartbeats**: Cron jobs that test live user login flows every 5 minutes.
3. **Automated PDF / Screenshot Rendering**: Generating high-fidelity invoice PDFs using WebKit rendering engine.
4. **Visual Regression Testing**: Detecting unwanted UI shifts using pixel-by-pixel snapshot comparisons.`,
    codeSnippet: `# Render PDF invoice using WebKit headless engine
page.goto("https://hearth.study/certificates/sample")
page.pdf(path="invoice.pdf", format="A4", print_background=True)`,
    keyTakeaways: [
      "Playwright automates real browser engines (Chromium, Firefox, WebKit) headless or headful.",
      "Used extensively for synthetic monitoring in production SRE alerts.",
      "Built-in PDF and screenshot rendering for server-side report generation.",
    ],
  },
  {
    id: "pw-03",
    partIndex: "part-1",
    partTitle: "Part 1 · Foundations & Environment Setup",
    order: 3,
    slug: "environment-setup",
    title: "Environment Setup (Node.js & Python venv)",
    estimatedMinutes: 45,
    level: "Beginner",
    summary: "Step-by-step setup of Virtualenvs, pytest-playwright plugin, and browser binary installation commands.",
    contentMarkdown: `### Setting Up Your Cabin Workspace
Follow these exact CLI commands to set up Python Playwright with pytest runner:

\`\`\`bash
# Create virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On macOS/Linux

# Install Playwright & Pytest plugin
pip install pytest-playwright

# Download browser binaries (Chromium, Firefox, WebKit)
playwright install
\`\`\`

#### Verifying Installation:
Run \`playwright codegen\` to launch the interactive selector inspector.`,
    codeSnippet: `# Launch Codegen Inspector
playwright codegen https://demo.playwright.dev/todomvc`,
    keyTakeaways: [
      "Always use virtual environments (.venv) to isolate test dependencies.",
      "playwright install downloads patched browser binaries matching Playwright API version.",
      "playwright codegen records user actions into clean Python test scripts.",
    ],
  },
  {
    id: "pw-04",
    partIndex: "part-2",
    partTitle: "Part 2 · Core Interactions & Assertions",
    order: 4,
    slug: "locators-deep-dive",
    title: "Locators Deep Dive (getByRole vs CSS)",
    estimatedMinutes: 60,
    level: "Beginner",
    summary: "Master Playwright's auto-waiting locators: getByRole, getByText, getByTestId, and chaining locators without flakiness.",
    contentMarkdown: `### The Golden Rule of Locators
**Never use brittle CSS paths** like \`div > div.btn-primary:nth-child(3)\`. CSS classes change during redesigns.

#### Prefer User-Facing Locators:
1. \`page.getByRole('button', { name: 'Submit' })\`: Matches accessible ARIA roles.
2. \`page.getByLabel('Email Address')\`: Matches form inputs by label text.
3. \`page.getByTestId('checkout-btn')\`: Explicit test data attributes.

\`\`\`python
# Chaining locators safely
card = page.locator(".product-card").filter(has_text="Coffee Beans")
card.get_by_role("button", name="Add to Cart").click()
\`\`\``,
    codeSnippet: `# Accessible locator examples
page.get_by_role("button", name="Pay Now").click()
page.get_by_label("Password").fill("Secret123!")
page.get_by_text("Order Confirmed").wait_for()`,
    keyTakeaways: [
      "getByRole mirrors how screen readers and real users perceive the web app.",
      "Playwright auto-waits for elements to become visible, enabled, and stable before clicking.",
      "Avoid hardcoded sleep statements like time.sleep(5); rely on auto-waiting assertions.",
    ],
    exercise: {
      prompt: "Write a locator using get_by_role to click a link named 'Browse Skill Trails'.",
      starterCode: `# Write locator expression below
button = page.get_by_...`,
      solutionCode: `button = page.get_by_role("link", name="Browse Skill Trails")
button.click()`,
    },
  },
  {
    id: "pw-05",
    partIndex: "part-3",
    partTitle: "Part 3 · Test Architecture & Page Object Model",
    order: 5,
    slug: "page-object-model",
    title: "Page Object Model (POM) Design Pattern",
    estimatedMinutes: 55,
    level: "Intermediate",
    summary: "Encapsulate UI page structure into maintainable, reusable object classes to prevent spec duplication.",
    contentMarkdown: `### Structuring Maintainable Test Suites
The **Page Object Model (POM)** pattern separates page layout details from test spec logic.

#### Benefits:
- **Single Source of Truth**: If button ID changes, update only 1 class file instead of 50 spec files.
- **Readable Specs**: Tests read like natural language domain actions.

\`\`\`python
class LoginPage:
    def __init__(self, page):
        self.page = page
        self.email_input = page.get_by_label("Email")
        self.password_input = page.get_by_label("Password")
        self.submit_btn = page.get_by_role("button", name="Sign In")

    def login(self, email, password):
        self.email_input.fill(email)
        self.password_input.fill(password)
        self.submit_btn.click()
\`\`\``,
    codeSnippet: `# Spec file using POM
def test_user_login(page):
    login_page = LoginPage(page)
    page.goto("https://hearth.study/login")
    login_page.login("rowan@hearth.study", "Pass123!")
    expect(page.get_by_text("Welcome back")).to_be_visible()`,
    keyTakeaways: [
      "Store locators and interactions inside page classes.",
      "Test files should focus on assertions and user flows.",
      "Pass page fixture into Page Object class constructors.",
    ],
  },
  {
    id: "pw-06",
    partIndex: "part-4",
    partTitle: "Part 4 · Network Interception & API Testing",
    order: 6,
    slug: "network-interception",
    title: "Network Interception & Mocking API Routes",
    estimatedMinutes: 50,
    level: "Advanced",
    summary: "Intercept HTTP requests, mock server responses (500 errors, slow latency), and test edge cases deterministically.",
    contentMarkdown: `### Controlling Network Responses
Playwright allows you to intercept outgoing browser HTTP requests using \`page.route()\`.

#### Common Use Cases:
- **Mocking 500 Outages**: Test how your frontend UI handles server failures without killing backend servers.
- **Fulfilling Mock JSON**: Return custom payload data instantly.
- **Aborting Slow Analytics**: Block external tracking scripts to speed up test execution by 40%.`,
    codeSnippet: `# Abort heavy image & analytics requests
def block_analytics(route):
    if "google-analytics" in route.request.url:
        route.abort()
    else:
        route.continue_()

page.route("**/*", block_analytics)`,
    keyTakeaways: [
      "page.route() matches URL glob patterns to intercept requests.",
      "Use route.fulfill() to return custom status codes, headers, and JSON bodies.",
      "Use route.abort() to speed up tests by disabling tracking scripts.",
    ],
  },
  {
    id: "pw-07",
    partIndex: "part-5",
    partTitle: "Part 5 · CI/CD Pipelines & Docker Automation",
    order: 7,
    slug: "github-actions-cicd",
    title: "GitHub Actions CI Pipeline Integration",
    estimatedMinutes: 50,
    level: "Pro",
    summary: "Run headless Playwright suites in parallel on GitHub Actions PR triggers with automated HTML artifact uploads.",
    contentMarkdown: `### Building a Production CI Pipeline
Integrate Playwright tests into your GitHub repository workflow (\`.github/workflows/playwright.yml\`).

\`\`\`yaml
name: Playwright E2E Tests
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
          python-version: '3.11'
      - name: Install dependencies
        run: |
          pip install pytest-playwright
          playwright install --with-deps
      - name: Run Playwright tests
        run: pytest --html=report.html
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: report.html
\`\`\``,
    codeSnippet: `# Run pytest with HTML report generator
pytest --html=report.html --self-contained-html`,
    keyTakeaways: [
      "Use playwright install --with-deps on Linux CI runners to install missing OS libraries.",
      "Always set if: always() on upload-artifact step so test reports are saved even when tests fail.",
      "Parallelize test execution across CPU cores using pytest -n auto.",
    ],
  },
];
