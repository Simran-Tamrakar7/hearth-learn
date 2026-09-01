/** Playwright manual Part 1 — Foundations */
export const chapters = [
  {
    contentMarkdown: `## 1. Introduction to Playwright

Part 1 is where reading stops and doing starts. Part 0 explained *why* Playwright exists; from here forward, every chapter teaches *how* to use it with Python and pytest-playwright.

### What is Playwright (hands-on framing)

Playwright is a browser automation library that controls Chromium, Firefox, and WebKit through one API. You write Python code that launches a browser, opens pages, finds elements, performs actions, and asserts outcomes. The same conceptual model applies whether you are writing a one-off script or a thousand-test CI suite.

The mental shift entering Part 1: stop evaluating tools, start touching the tool.

### Playwright vs Selenium vs Cypress

This comparison is a near-guaranteed interview question. Internalize the architectural differences, not just the feature checklist.

| Dimension | Selenium | Cypress | Playwright |
|-----------|----------|---------|------------|
| **Protocol** | WebDriver over HTTP | In-browser JS execution | CDP over WebSocket |
| **Browsers** | Many via separate drivers | Chromium-family primary | Chromium, Firefox, WebKit native |
| **Auto-waiting** | Manual (explicit waits) | Yes (assertion retry) | Yes (actions + expect) |
| **Multi-tab** | Clunky window handles | Weak by architecture | Native Page objects |
| **Languages** | Java, Python, C#, Ruby, JS… | JavaScript/TypeScript only | JS/TS, Python, Java, .NET |
| **Speed** | Slower (HTTP round-trips) | Fast (shared event loop) | Fast (persistent WebSocket) |

**Why Cypress struggles with multi-tab:** Cypress executes test code *inside* the browser, in the same JavaScript context as the page. That gives zero-latency DOM access and time-travel debugging — but binds tests to same-origin rules and makes true multi-tab workflows structurally awkward. Playwright runs *outside* the browser and drives it externally — holding references to multiple \`Page\` objects in one process is trivial.

**Why Selenium flakes:** WebDriver requires the test author to manage timing. Miss a wait and you click before the SPA finishes rendering. Playwright auto-waits on every action and \`expect()\` assertion.

### Supported browsers

| Engine | Covers | Notes |
|--------|--------|-------|
| **Chromium** | Chrome, Edge, Opera | Default for most teams |
| **Firefox** | Firefox | Patched build via \`playwright install\` |
| **WebKit** | Safari's engine | Test Safari-like behavior on Linux/Windows CI |

Playwright ships its own browser binaries — version-matched to the library. You are not automating the user's installed Chrome; you are automating Playwright's pinned Chromium. That trades "exact user browser" for consistency across machines.

### Supported languages

- **JavaScript/TypeScript** — original binding, hosts \`@playwright/test\` runner
- **Python** — this manual's language; near-complete API mirror of JS
- **Java** and **.NET/C#** — enterprise adoption

Python's API maps one-to-one to JavaScript with mechanical translation:

\`\`\`javascript
// JavaScript
await page.getByRole('button', { name: 'Submit' }).click();
\`\`\`

\`\`\`python
# Python (sync)
page.get_by_role("button", name="Submit").click()
\`\`\`

Snake_case instead of camelCase. No \`await\` in the sync API. The behavior is identical — which means the official Playwright docs (JS-first) are usable with minimal mental translation throughout this manual.`,
  },
  {
    contentMarkdown: `## 2. Environment Setup

A working Playwright Python environment requires four distinct steps beginners often conflate: Python itself, an isolated virtual environment, Python packages, and browser binaries. Get all four right once; every subsequent chapter depends on it.

### Step 1 — Create and activate a virtual environment

Never install Playwright into system Python. Use \`venv\` for project isolation:

\`\`\`bash
# From your project root
python -m venv venv

# Activate — Mac/Linux
source venv/bin/activate

# Activate — Windows
# venv\\Scripts\\activate
\`\`\`

Your shell prompt should show \`(venv)\`. All \`pip install\` commands below run inside this environment.

### Step 2 — Install Python packages

\`\`\`bash
pip install playwright pytest pytest-playwright
\`\`\`

| Package | Role |
|---------|------|
| \`playwright\` | Core browser automation library |
| \`pytest\` | Test runner — discovers \`test_*\` functions |
| \`pytest-playwright\` | Wires Playwright fixtures (\`page\`, \`browser\`, \`context\`) into pytest |

Pin versions for reproducibility:

\`\`\`bash
pip freeze > requirements.txt
\`\`\`

Teammates and CI agents run \`pip install -r requirements.txt\` for identical dependencies.

### Step 3 — Install browser binaries

Python packages alone are not enough. Browsers are separate downloads:

\`\`\`bash
playwright install
\`\`\`

This downloads Chromium, Firefox, and WebKit binaries (~300MB per engine). To install only Chromium during initial setup:

\`\`\`bash
playwright install chromium
\`\`\`

**Re-run \`playwright install\` after every major Playwright version upgrade.** The cryptic error \`Executable doesn't exist\` almost always means binaries are missing or version-mismatched.

### Step 4 — Verify the installation

\`\`\`bash
python -c "from playwright.sync_api import sync_playwright; print('OK')"
playwright --version
\`\`\`

### Recommended folder structure

Create this layout on day one — it scales into Page Object Model (Part 3) without a painful mid-project reorganization:

\`\`\`text
my-playwright-project/
├── venv/                  # virtual environment (gitignore)
├── tests/
│   ├── conftest.py        # shared pytest fixtures
│   └── test_example.py    # test files
├── pages/                 # Page Object classes (later)
├── pytest.ini             # pytest + playwright config
├── requirements.txt       # pinned dependencies
└── README.md
\`\`\`

**pytest.ini** starter:

\`\`\`ini
[pytest]
testpaths = tests
addopts = -v --browser chromium
\`\`\`

The empty \`pages/\` folder feels premature for a hello-world project — create it anyway. Refactoring a flat \`tests/\` dump into Page Objects after twenty files is painful discipline avoided.

### Common setup failures

| Error | Fix |
|-------|-----|
| \`Executable doesn't exist\` | Run \`playwright install\` |
| Import errors for \`playwright\` | Activate venv, re-run \`pip install\` |
| Tests not discovered | Ensure files are named \`test_*.py\`, functions \`test_*\` |
| Corporate proxy blocks downloads | Whitelist Playwright CDN with IT |

With setup complete, you are ready for architecture concepts (Chapter 3) and your first script (Chapter 4).`,
  },
  {
    contentMarkdown: `## 3. Playwright Architecture

Browser → BrowserContext → Page is the conceptual backbone of the entire tool. Misunderstanding this hierarchy causes the two most common beginner bugs: launching a new browser per test (slow, memory-heavy) and sharing cookies between tests (state leakage).

### The three-level hierarchy

\`\`\`text
Browser                    # One browser process (expensive to launch)
 └── BrowserContext        # Isolated session (cheap — like incognito)
      └── Page             # One tab within a context
\`\`\`

**Browser** — one actual browser process (e.g., one Chromium instance). Launching is relatively expensive (2–5 seconds, hundreds of MB). Launch **one per test session**, not one per test.

**BrowserContext** — an isolated session within that browser. Each context has its own cookies, local storage, cache, and permissions — completely separate from other contexts in the same browser. Creating a context is fast. The recommended pattern: **one browser per session, one fresh context per test** for isolation.

**Page** — one tab within a context. A context can hold multiple pages simultaneously — this is how multi-tab testing works (Part 2, Chapter 9).

### Why the hierarchy matters

Playwright can simulate multiple independent users without launching multiple browser processes — open multiple contexts in one browser. Test isolation is easy by default: if every test gets a fresh context, login state from one test cannot leak into another.

\`\`\`python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Two isolated users in one browser
    admin_context = browser.new_context()
    employee_context = browser.new_context()

    admin_page = admin_context.new_page()
    employee_page = employee_context.new_page()

    admin_page.goto("https://app.example.com/admin")
    employee_page.goto("https://app.example.com/dashboard")

    browser.close()
\`\`\`

### Sync API vs Async API

Python Playwright offers two flavors:

**Sync API** — code reads top-to-bottom, no \`await\`. This is what pytest-playwright uses by default and what this manual uses throughout. Ideal for test automation.

\`\`\`python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://example.com")
    browser.close()
\`\`\`

**Async API** — uses \`async def\` and \`await\`. Required for integration into existing asyncio applications (scrapers, FastAPI services). For pure test work, you rarely need it — but recognize it when reading online examples.

\`\`\`python
from playwright.async_api import async_playwright
import asyncio

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://example.com")
        await browser.close()

asyncio.run(main())
\`\`\`

### How Playwright talks to browsers (CDP, WebSocket)

Playwright launches a browser process and connects via the **Chrome DevTools Protocol (CDP)** over a persistent **WebSocket** connection. CDP is the same protocol Chrome DevTools uses internally — Playwright has access to deep browser internals: network events, DOM mutations, console messages, performance data.

This is structurally different from Selenium's HTTP request/response to a WebDriver server. The persistent WebSocket is why Playwright is faster and capable of real-time network interception that Selenium cannot match.

For **Firefox** and **WebKit**, Playwright uses patched browser builds with equivalent protocol support — neither natively speaks CDP. That is why \`playwright install\` downloads its own binaries rather than using system browsers.

### pytest-playwright defaults

The pytest-playwright plugin handles hierarchy for you:

| Fixture | Scope | What you get |
|---------|-------|--------------|
| \`browser\` | session | One launched browser |
| \`context\` | function | Fresh context per test |
| \`page\` | function | One page in that context |

You write \`def test_login(page):\` — the plugin launches, isolates, and tears down. Understanding the hierarchy underneath helps when customizing \`conftest.py\` in Part 3.`,
  },
  {
    contentMarkdown: `## 4. First Script

Your first script completes the smallest useful automation loop: **launch → navigate → locate → act → assert → close**. Without an assertion, a script only demonstrates navigation — it does not fail when the app breaks.

This chapter uses \`sync_playwright\` directly. Part 3 switches to pytest-playwright fixtures once the raw loop is understood.

### Launch headed (watch the browser)

Create \`first_script.py\` in your project root:

\`\`\`python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://example.com")
    print(page.title())
    browser.close()
\`\`\`

Run it:

\`\`\`bash
python first_script.py
\`\`\`

A Chromium window opens, navigates to example.com, prints the title, and closes. \`headless=False\` lets you **see** what Playwright does — invaluable while learning.

### Launch headless (CI mode)

Change one argument for unattended execution:

\`\`\`python
browser = p.chromium.launch(headless=True)  # default; no visible window
\`\`\`

The same code runs on Linux CI agents without a display server. Always verify headless after debugging headed — some issues appear only in one mode.

### Navigate, locate, act, assert

A complete script with user-facing locators and a real assertion:

\`\`\`python
from playwright.sync_api import sync_playwright, expect

with sync_playwright() as p:
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()

    # Navigate
    page.goto("https://example.com")

    # Assert page loaded
    expect(page).to_have_title("Example Domain")

    # Locate by role (accessibility tree — survives CSS refactors)
    link = page.get_by_role("link", name="Learn more")

    # Act
    link.click()

    # Assert navigation occurred
    expect(page).to_have_url("https://www.iana.org/help/example-domains")

    browser.close()
\`\`\`

### Anatomy of the loop

| Step | API | Purpose |
|------|-----|---------|
| Launch | \`p.chromium.launch()\` | Start browser process |
| New page | \`browser.new_page()\` | Open a tab |
| Navigate | \`page.goto(url)\` | Load a URL |
| Locate | \`page.get_by_role(...)\` | Find element by accessibility |
| Act | \`.click()\`, \`.fill()\` | Interact (auto-waits for readiness) |
| Assert | \`expect(page).to_have_title(...)\` | Verify outcome (auto-retries) |
| Close | \`browser.close()\` | Release resources |

### Why \`sync_playwright\` as a context manager

The \`with sync_playwright() as p:\` block guarantees cleanup even if your script crashes mid-test. Skipping \`browser.close()\` leaks zombie browser processes — a common beginner mistake when copying snippets without the context manager.

### Headed vs headless quick reference

\`\`\`python
# Learning / debugging — watch the browser
browser = p.chromium.launch(headless=False)

# CI / batch runs — no display needed
browser = p.chromium.launch()              # headless=True is default
browser = p.chromium.launch(headless=True)
\`\`\`

### What comes next

This standalone script does not scale. It has no pytest discovery, no parallel workers, no shared fixtures, no trace-on-failure. Part 3 replaces manual launch/teardown with pytest-playwright's \`page\` fixture. Part 2 deepens locators, actions, and assertions — the \`get_by_role\` and \`expect()\` patterns introduced here become second nature.

Run this script headed once. Confirm your environment works. Then proceed to the Checkpoint before Part 2.`,
  },
  {
    contentMarkdown: `## Checkpoint · Foundations

Gate before Part 2 (Core Interactions). Complete this cold — no notes, on a real practice site or example.com.

### Pass criteria

You are ready for Part 2 when you can do all of the following:

1. **Tool comparison** — Explain in one minute why Playwright uses CDP/WebSocket while Selenium uses WebDriver HTTP. Name one Cypress architectural limitation Playwright avoids.
2. **Environment** — On a fresh machine: create venv, \`pip install\` dependencies, \`playwright install\`, run \`pytest --co\` and see tests discovered.
3. **Hierarchy** — Draw Browser → Context → Page from memory. Explain why one context per test prevents cookie leakage.
4. **Sync vs async** — State which API this manual uses and when you would need the async API instead.
5. **First script** — Write a standalone script that launches headed, navigates to a URL, clicks a link via \`get_by_role\`, asserts the title or URL changed, and closes cleanly inside \`sync_playwright()\`.
6. **Headless toggle** — Run the same script headless and confirm it still passes.

### Self-check questions

- What command downloads browser binaries after \`pip install playwright\`?
- Why does Playwright ship its own Chromium instead of using your installed Chrome?
- What is the Python equivalent of JS \`page.getByRole('button')\`?
- What happens if you skip \`browser.close()\` and do not use a context manager?
- Why is \`expect(page).to_have_title(...)\` better than \`assert "Example" in page.title()\` on a slow SPA?

### If you cannot pass

Stay in Part 1. Part 2 adds locators, actions, assertions, and waits — layers that magnify bad habits. A script that navigates without assertions, or an environment missing browser binaries, will waste hours debugging Part 2 problems that are really Part 1 gaps.

Re-read Chapters 2–4, fix your folder structure, and run the first script headed until you can explain every line.`,
  },
];
