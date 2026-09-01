/** Playwright manual Part 4 — Advanced Techniques */
export const chapters = [
  {
    contentMarkdown: `## Intercepting Network Requests

\`page.route()\` registers a handler that runs **before** a matching request leaves the browser. You can inspect the request, modify it, replace the response entirely, or block it. This is Playwright's built-in mocking layer — no external proxy or WireMock server required.

Register routes **before** the action that triggers the request:

\`\`\`python
def test_mocked_api_response(page):
    def handle(route):
        route.fulfill(
            status=200,
            content_type="application/json",
            body='{"users": [{"id": 1, "name": "Alice"}]}',
        )

    page.route("**/api/users", handle)
    page.goto("/users")
    expect(page.get_by_text("Alice")).to_be_visible()
\`\`\`

## Three Handler Actions

Every intercepted request must be resolved with exactly one action:

| Action | Method | Effect |
|--------|--------|--------|
| Mock response | \`route.fulfill(...)\` | Return custom status/body without hitting the server |
| Pass through | \`route.continue_()\` | Forward to the real server (optionally modified) |
| Block | \`route.abort()\` | Cancel the request — simulates network failure |

### fulfill — Replace the Response

\`\`\`python
def test_server_error_banner(page):
    page.route(
        "**/api/employees",
        lambda route: route.fulfill(status=500, body='{"error": "Internal server error"}'),
    )
    page.goto("/employees")
    expect(page.get_by_role("alert")).to_contain_text("Something went wrong")
\`\`\`

You control \`status\`, \`headers\`, \`content_type\`, and \`body\`. Use this for error states, empty lists, and slow-response simulation.

### continue_ — Modify and Forward

\`\`\`python
def test_adds_auth_header(page):
    def handle(route):
        headers = {**route.request.headers, "X-Test-Mode": "true"}
        route.continue_(headers=headers)

    page.route("**/api/**", handle)
    page.goto("/dashboard")
\`\`\`

\`continue_()\` sends the request to the real backend. Useful for injecting headers or logging without replacing responses.

### abort — Simulate Network Failure

\`\`\`python
def test_offline_message(page):
    page.route("**/api/**", lambda route: route.abort("failed"))
    page.goto("/dashboard")
    expect(page.get_by_text("Unable to connect")).to_be_visible()
\`\`\`

## URL Patterns

Patterns are glob-style strings or compiled regex:

\`\`\`python
page.route("**/api/users", handler)       # any host, path ending in /api/users
page.route("https://cdn.example.com/**", handler)  # specific CDN
page.route(re.compile(r"\\.png$"), handler)        # regex: all PNG files
\`\`\`

## Blocking Images and Trackers

Speed up suites that do not need visual rendering by aborting non-essential resources:

\`\`\`python
BLOCKED_TYPES = {"image", "media", "font"}

def test_fast_load_without_images(page):
    page.route("**/*", lambda route: (
        route.abort()
        if route.request.resource_type in BLOCKED_TYPES
        else route.continue_()
    ))
    page.goto("/dashboard")
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
\`\`\`

**Do not block images** in visual regression tests (Chapter 19) — screenshots will be blank.

## Inspecting Requests

\`route.request\` exposes the full request object:

\`\`\`python
def test_posts_correct_payload(page):
    captured = []

    def handle(route):
        captured.append(route.request.post_data_json)
        route.continue_()

    page.route("**/api/orders", handle)
    page.get_by_role("button", name="Place order").click()
    assert captured[0]["quantity"] == 2
\`\`\`

## Common Pitfalls

- **Unresolved routes hang forever** — every matched request must call \`fulfill\`, \`continue_\`, or \`abort\`.
- **Register before navigation** — routes set after \`goto\` miss the initial page load requests.
- **Mock drift** — update mock payloads when the API contract changes.

## Key Takeaways

- \`page.route()\` intercepts requests before they leave the browser.
- \`fulfill\` mocks responses; \`continue_\` forwards; \`abort\` blocks.
- Block images/fonts to speed up non-visual tests.
- Always resolve every intercepted request.`,
  },
  {
    contentMarkdown: `## API Testing with Playwright

Playwright is not only a browser tool. The **APIRequestContext** sends HTTP requests directly — no browser window needed. Use it for fast API contract tests, data seeding, and hybrid flows that combine API setup with UI verification.

## Creating a Request Context

The \`playwright\` fixture (session-scoped) can create standalone API contexts:

\`\`\`python
import pytest
from playwright.sync_api import Playwright, APIRequestContext

@pytest.fixture(scope="session")
def api_context(playwright: Playwright, base_url) -> APIRequestContext:
    context = playwright.request.new_context(
        base_url=base_url,
        extra_http_headers={"Authorization": f"Bearer {os.environ['API_TOKEN']}"},
    )
    yield context
    context.dispose()
\`\`\`

Or use the built-in \`request\` fixture from pytest-playwright for per-test contexts.

## GET — Read Resources

\`\`\`python
def test_list_employees(api_context):
    response = api_context.get("/api/employees")
    assert response.ok
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "name" in data[0]
\`\`\`

Inspect the response object:

\`\`\`python
response = api_context.get("/api/employees/42")
assert response.status == 200
assert response.headers["content-type"] == "application/json"
body = response.json()
assert body["name"] == "Alice"
text = response.text()       # raw string body
\`\`\`

## POST — Create Resources

\`\`\`python
def test_create_employee(api_context, fake):
    payload = {
        "name": fake.name(),
        "email": fake.unique.email(),
        "department": "Engineering",
    }
    response = api_context.post("/api/employees", data=payload)
    assert response.status == 201
    created = response.json()
    assert created["id"]
    assert created["email"] == payload["email"]

    # cleanup
    api_context.delete(f"/api/employees/{created['id']}")
\`\`\`

Pass JSON with \`data=\` (auto-serialized) or raw body with \`json=\`.

## PUT — Full Replacement

\`\`\`python
def test_replace_employee(api_context):
    response = api_context.put(
        "/api/employees/42",
        data={"name": "Bob Updated", "email": "bob@example.com", "department": "Sales"},
    )
    assert response.ok
    assert response.json()["department"] == "Sales"
\`\`\`

PUT replaces the entire resource. Missing fields may be cleared depending on API design.

## PATCH — Partial Update

\`\`\`python
def test_patch_employee_department(api_context):
    response = api_context.patch(
        "/api/employees/42",
        data={"department": "Quality Assurance"},
    )
    assert response.ok
    assert response.json()["department"] == "Quality Assurance"
\`\`\`

PATCH sends only the changed fields — preferred for partial updates.

## DELETE — Remove Resources

\`\`\`python
def test_delete_employee(api_context, fake):
    # create first
    create_resp = api_context.post("/api/employees", data={
        "name": fake.name(), "email": fake.unique.email(),
    })
    emp_id = create_resp.json()["id"]

    # delete
    delete_resp = api_context.delete(f"/api/employees/{emp_id}")
    assert delete_resp.status == 204

    # verify gone
    get_resp = api_context.get(f"/api/employees/{emp_id}")
    assert get_resp.status == 404
\`\`\`

## Response Object Reference

| Property / Method | Description |
|-------------------|-------------|
| \`response.status\` | HTTP status code (200, 404, 500, …) |
| \`response.ok\` | \`True\` if status is 2xx |
| \`response.headers\` | Response headers dict |
| \`response.json()\` | Parse body as JSON |
| \`response.text()\` | Raw body as string |
| \`response.body()\` | Raw body as bytes |

## UI + API Hybrid Pattern

Seed data via API, verify in the browser:

\`\`\`python
def test_employee_appears_in_ui(api_context, page, base_url, fake):
    # API: create employee
    resp = api_context.post("/api/employees", data={
        "name": "Carol", "email": fake.unique.email(),
    })
    emp_id = resp.json()["id"]

    # UI: verify employee visible
    page.goto(f"{base_url}/employees")
    expect(page.get_by_text("Carol")).to_be_visible()

    # API: cleanup
    api_context.delete(f"/api/employees/{emp_id}")
\`\`\`

This pattern is faster and more reliable than clicking through a multi-step UI form just to set up test state.

## Error Handling

\`\`\`python
def test_unauthorized_returns_401(api_context):
    unauth = api_context  # context without auth header
    response = unauth.get("/api/admin/settings")
    assert response.status == 401
\`\`\`

Test both happy paths and error responses. API tests run in milliseconds — add them liberally.

## Key Takeaways

- \`APIRequestContext\` sends GET/POST/PUT/PATCH/DELETE without a browser.
- Use API calls to seed and clean up test data; use the browser to verify UI behavior.
- Inspect \`response.status\`, \`.json()\`, and \`.ok\` for assertions.
- Hybrid API + UI tests are faster and more stable than UI-only setup.`,
  },
  {
    contentMarkdown: `## Visual Regression Testing

Visual regression catches unintended UI changes — a shifted button, wrong color, missing icon — that functional assertions miss. Playwright's \`to_have_screenshot()\` compares the current render against a committed baseline image.

## First Run — Generate Baselines

\`\`\`python
from playwright.sync_api import Page, expect

def test_homepage_looks_correct(page: Page):
    page.goto("/")
    expect(page).to_have_screenshot("homepage.png")
\`\`\`

On first run, Playwright saves \`homepage.png\` to a \`test_<name>_chromium_\` snapshot directory. Commit these baselines to version control. Subsequent runs compare pixel-by-pixel.

Update baselines when changes are intentional:

\`\`\`bash
pytest --update-snapshots
\`\`\`

## Element-Level Screenshots

Capture a single component instead of the full page:

\`\`\`python
def test_login_form_appearance(page):
    page.goto("/login")
    card = page.locator(".login-card")
    expect(card).to_have_screenshot("login-card.png")
\`\`\`

Element screenshots are less flaky than full-page captures because they ignore unrelated layout shifts elsewhere on the page.

## Masking Dynamic Content

Timestamps, avatars, and ads change every run. **Mask** regions so they are ignored during comparison:

\`\`\`python
def test_dashboard_with_masked_clock(page):
    page.goto("/dashboard")
    expect(page).to_have_screenshot(
        "dashboard.png",
        mask=[page.locator(".live-clock"), page.locator(".user-avatar")],
    )
\`\`\`

Masked areas are painted pink in diff reports, making it obvious what was excluded.

## Screenshot Options

\`\`\`python
expect(page).to_have_screenshot(
    "footer.png",
    full_page=True,           # capture below the fold
    max_diff_pixels=100,      # allow small anti-aliasing differences
    threshold=0.2,            # per-pixel color tolerance (0.0–1.0)
    animations="disabled",    # stop CSS animations before capture
)
\`\`\`

Tune \`max_diff_pixels\` and \`threshold\` to reduce false positives on different CI machines. Start strict; loosen only when diffs are clearly environmental (font rendering, sub-pixel rounding).

## Accessibility Testing with axe-core

Functional tests verify behavior; accessibility tests verify everyone can use the app. Integrate **axe-core** via the \`axe-playwright-python\` package:

\`\`\`bash
pip install axe-playwright-python
\`\`\`

\`\`\`python
from axe_playwright_python.sync_playwright import Axe

def test_homepage_has_no_a11y_violations(page):
    page.goto("/")
    axe = Axe()
    results = axe.run(page)
    assert results.violations == [], format_violations(results.violations)

def format_violations(violations):
    return "\\n".join(
        f"{v['id']}: {v['description']} ({len(v['nodes'])} nodes)"
        for v in violations
    )
\`\`\`

axe checks WCAG rules: missing alt text, insufficient color contrast, missing form labels, improper heading hierarchy, and dozens more.

## Scoped Accessibility Scans

Scan a single component or exclude third-party widgets:

\`\`\`python
def test_modal_accessibility(page):
    page.goto("/settings")
    page.get_by_role("button", name="Delete account").click()
    modal = page.locator("[role='dialog']")

    axe = Axe()
    results = axe.run(page, context=modal)
    assert results.violations == []
\`\`\`

## Combining Visual and Accessibility

A page can pass all functional assertions, fail visual regression, and still have accessibility violations. Layer all three:

1. **Functional** — \`expect(element).to_be_visible()\`
2. **Visual** — \`expect(page).to_have_screenshot()\`
3. **Accessibility** — \`axe.run(page)\` with zero violations

## CI Considerations

- Commit snapshot baselines; review image diffs in PRs.
- Run visual tests on a consistent OS and browser in CI (Linux + Chromium is standard).
- Use \`mask\` aggressively for dynamic content.
- Accessibility scans are fast and deterministic — run them on every PR.

## Key Takeaways

- \`to_have_screenshot()\` compares renders against committed baselines.
- Use \`mask\` for dynamic regions; tune \`max_diff_pixels\` for CI stability.
- axe-core finds WCAG violations that functional tests miss.
- Layer functional, visual, and accessibility checks for comprehensive coverage.`,
  },
  {
    contentMarkdown: `## The Authentication Problem

Logging in through the UI before every test adds 5–15 seconds of overhead and breaks when the login form changes. **storage_state** saves cookies and localStorage after a single login, then replays them in every subsequent test — skipping the UI entirely.

## Saving Storage State

Authenticate once and write the state to disk:

\`\`\`python
from playwright.sync_api import sync_playwright

def save_auth_state():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.goto("https://staging.example.com/login")
        page.get_by_label("Email").fill("admin@example.com")
        page.get_by_label("Password").fill("secret")
        page.get_by_role("button", name="Sign in").click()
        page.wait_for_url("**/dashboard")
        context.storage_state(path="auth/admin.json")
        browser.close()

if __name__ == "__main__":
    save_auth_state()
\`\`\`

The JSON file contains cookies, origins, and localStorage entries.

## Loading Storage State in Tests

Configure pytest-playwright to use the saved state for every test context:

\`\`\`python
# tests/conftest.py
import pytest

@pytest.fixture(scope="session")
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "storage_state": "auth/admin.json",
    }
\`\`\`

Every test starts already authenticated:

\`\`\`python
def test_dashboard_widgets(page):
    page.goto("/dashboard")  # no login needed
    expect(page.get_by_text("Leave balance")).to_be_visible()
\`\`\`

## Global Setup Fixture Pattern

For CI, generate auth state once before the suite runs. Use a session-scoped fixture with \`autouse\`:

\`\`\`python
import os
import pytest
from playwright.sync_api import sync_playwright

AUTH_FILE = "auth/admin.json"

@pytest.fixture(scope="session", autouse=True)
def ensure_auth_state(base_url):
    if os.path.exists(AUTH_FILE):
        return  # already generated

    os.makedirs("auth", exist_ok=True)
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.goto(f"{base_url}/login")
        page.get_by_label("Email").fill(os.environ["ADMIN_EMAIL"])
        page.get_by_label("Password").fill(os.environ["ADMIN_PASSWORD"])
        page.get_by_role("button", name="Sign in").click()
        page.wait_for_url("**/dashboard")
        context.storage_state(path=AUTH_FILE)
        browser.close()
\`\`\`

This runs once per pytest session. If \`auth/admin.json\` already exists (cached in CI), it skips regeneration.

## Multiple Roles

Different user roles need separate storage state files:

\`\`\`python
ROLES = {
    "admin": "auth/admin.json",
    "employee": "auth/employee.json",
    "manager": "auth/manager.json",
}

@pytest.fixture(params=["admin", "employee"])
def authed_context(browser, base_url, request):
    role = request.param
    context = browser.new_context(storage_state=ROLES[role])
    yield context
    context.close()

def test_permissions(authed_context):
    page = authed_context.new_page()
    page.goto("/settings")
    # assertions differ per role via parametrize
\`\`\`

## Token Refresh and Expiry

Storage state captures cookies at a point in time. If sessions expire after 30 minutes and your suite runs longer, add a refresh step:

\`\`\`python
@pytest.fixture(scope="session", autouse=True)
def ensure_fresh_auth(base_url):
    if not auth_is_expired("auth/admin.json"):
        return
    regenerate_auth_state(base_url, "auth/admin.json")
\`\`\`

Check the cookie expiry timestamp in the JSON file before deciding to regenerate.

## Security Notes

- Add \`auth/\` to \`.gitignore\` — storage state contains session tokens.
- In CI, generate auth state in a setup step using secrets, not committed files.
- Never use production credentials in test storage state.

## Key Takeaways

- \`context.storage_state(path=...)\` saves cookies and localStorage to a JSON file.
- Load it via \`browser_context_args\` to skip UI login in every test.
- Use a session-scoped global setup fixture to generate auth state once per run.
- Keep auth files out of version control; regenerate in CI with secrets.`,
  },
  {
    contentMarkdown: `## What Is Shadow DOM?

Many modern component libraries (Lit, Stencil, Shoelace, some Angular and Web Components) encapsulate their markup inside a **Shadow DOM** — a hidden subtree attached to a host element. Styles and structure inside the shadow root are isolated from the main document.

Playwright's locators **automatically pierce open shadow roots**. You do not need special syntax for most components.

## Auto-Pierce with Standard Locators

\`\`\`python
def test_shoelace_button(page):
    page.goto("/components")
    # Playwright pierces the open shadow root automatically
    page.get_by_role("button", name="Save").click()
    expect(page.get_by_text("Saved successfully")).to_be_visible()
\`\`\`

Role, text, and label locators traverse open shadow boundaries transparently. Write tests the same way you would for light DOM.

## Custom Web Components

A typical web component renders inside \`#shadow-root (open)\`:

\`\`\`html
<user-card data-testid="card-1">
  #shadow-root (open)
    <div class="card">
      <h2>Alice</h2>
      <button>View profile</button>
    </div>
</user-card>
\`\`\`

Test it with familiar locators:

\`\`\`python
def test_user_card(page):
    page.goto("/team")
    card = page.get_by_test_id("card-1")
    expect(card.get_by_role("heading", name="Alice")).to_be_visible()
    card.get_by_role("button", name="View profile").click()
\`\`\`

Scoping locators to the host element (\`card.get_by_role(...)\`) narrows the search and avoids matching similar elements elsewhere on the page.

## Piercing Nested Shadow Roots

Components can nest shadow roots (a card inside a list inside a panel). Playwright pierces all open shadow boundaries in the chain:

\`\`\`python
def test_nested_components(page):
    page.goto("/dashboard")
    panel = page.locator("dashboard-panel")
    expect(panel.get_by_text("Revenue")).to_be_visible()
    panel.get_by_role("button", name="Refresh").click()
\`\`\`

## Closed Shadow Roots

Some components use \`mode: 'closed'\` in \`attachShadow()\`. Closed roots are intentionally hidden from \`element.shadowRoot\` and cannot be pierced by any automation tool — this is by design in the Web Components spec.

Strategies for closed shadow DOM:

1. **Ask the development team** to switch to \`mode: 'open'\` for testability — the most sustainable fix.
2. **Use wrapper attributes** — if the team adds \`data-testid\` on the host element, interact via events on the host itself.
3. **Test via API or public methods** — some components expose a JavaScript API on the host element.
4. **Avoid testing implementation details** — test the component's observable output (text, events, ARIA attributes on the host) rather than internal shadow markup.

\`\`\`python
# closed shadow — pierce fails; interact with the host
def test_closed_component_via_host(page):
    page.goto("/app")
    host = page.locator("secure-input")
    host.click()  # focuses the host; keyboard events may propagate inside
    page.keyboard.type("hello")
    expect(host).to_have_attribute("value", "hello")
\`\`\`

## locator() vs pierce Selector

For advanced cases, CSS \`>>>\` and \`>>\` pierce shadow DOM in selector strings:

\`\`\`python
page.locator("user-card").locator("css=button.save").click()
\`\`\`

Prefer role and label locators over deep CSS chains — they survive internal refactors.

## iframe + Shadow DOM

If a component lives inside an iframe **and** uses shadow DOM, combine \`frame_locator\` with standard locators:

\`\`\`python
frame = page.frame_locator("#widget-iframe")
frame.get_by_role("button", name="Submit").click()
\`\`\`

Playwright pierces shadow roots inside frames automatically.

## Key Takeaways

- Open shadow DOM is transparent — use normal \`get_by_role\`, \`get_by_text\`, and \`get_by_test_id\` locators.
- Scope locators to the host element for precision in complex pages.
- Closed shadow roots cannot be pierced — negotiate \`mode: 'open'\` or test via the host element.
- Combine \`frame_locator\` with shadow-piercing locators for iframe-embedded components.`,
  },
  {
    contentMarkdown: `## Why Parallel Execution?

A 200-test suite running sequentially at 30 seconds each takes 100 minutes. Run those same tests across four workers and the wall-clock time drops to roughly 25 minutes. **pytest-xdist** distributes tests across multiple CPU cores or machines.

## Installing and Running with xdist

\`\`\`bash
pip install pytest-xdist
pytest -n auto          # one worker per CPU core
pytest -n 4             # exactly 4 workers
\`\`\`

Each worker is a separate Python process with its own browser instance. Tests must be **isolated** — no shared mutable state, no hard-coded emails that collide.

## Test Isolation Requirements

Parallel-safe tests:

- Create unique data per test (Faker, UUID suffixes).
- Clean up after themselves (yield fixtures).
- Do not depend on test execution order.
- Do not write to shared files without locks.

\`\`\`python
@pytest.fixture
def unique_user(fake):
  return {"email": fake.unique.email(), "name": fake.name()}
\`\`\`

## Combining xdist with Markers

Run smoke tests in parallel on every PR; reserve full regression for nightly:

\`\`\`bash
pytest -n auto -m smoke
pytest -n 4 -m regression
\`\`\`

## Sharding — Split Across CI Machines

When one machine is not enough, **shard** the suite across multiple CI jobs. Each job runs a slice of the test collection:

\`\`\`bash
# Job 1 of 4
pytest --shard=1/4 -n 2

# Job 2 of 4
pytest --shard=2/4 -n 2

# Job 3 of 4
pytest --shard=3/4 -n 2

# Job 4 of 4
pytest --shard=4/4 -n 2
\`\`\`

Sharding requires pytest-playwright 0.4+ or the \`pytest-shard\` plugin. Each shard runs a disjoint subset — no test runs twice.

## CI Matrix Example

\`\`\`yaml
jobs:
  test:
    strategy:
      matrix:
        shard: [1, 2, 3, 4]
    steps:
      - run: pytest --shard=\${{ matrix.shard }}/4 -n 2 --browser chromium
\`\`\`

Four machines × two workers each = eight concurrent browsers.

## Reporting Across Workers

xdist collects results from all workers into a single report. For HTML reports:

\`\`\`bash
pip install pytest-html
pytest -n auto --html=report.html --self-contained-html
\`\`\`

Each worker writes partial results; pytest merges them at the end.

## Debugging Parallel Failures

Parallel failures are often data-collision issues, not timing bugs:

1. Re-run the failing test alone: \`pytest tests/test_foo.py::test_bar\`.
2. If it passes in isolation, suspect shared state — duplicate emails, un-cleaned records, file locks.
3. Add \`--dist loadscope\` to group tests from the same file on one worker (slower but safer during debugging).

\`\`\`bash
pytest -n 4 --dist loadscope   # same-file tests stay on one worker
\`\`\`

## Playwright-Specific Considerations

- Each worker launches its own browser — budget RAM accordingly (≈300 MB per Chromium instance).
- Use \`scope="session"\` browser fixtures carefully; they are per-worker, not global.
- Traces and screenshots from parallel runs include the worker ID in the filename.

## Key Takeaways

- \`pytest -n auto\` runs tests in parallel across CPU cores.
- Tests must use unique data and clean up after themselves.
- \`--shard=N/M\` splits the suite across CI machines for massive suites.
- Failures that pass in isolation usually mean shared-state collisions.`,
  },
  {
    contentMarkdown: `## Cross-Browser Testing

Playwright ships three browser engines: **Chromium**, **Firefox**, and **WebKit** (Safari's engine). A test that passes in Chromium may fail in Firefox due to CSS differences, missing APIs, or timing variations. Run critical paths across all three.

## Browser Selection via CLI

\`\`\`bash
pytest --browser chromium     # default
pytest --browser firefox
pytest --browser webkit
pytest --browser chromium --browser firefox --browser webkit  # all three
\`\`\`

When multiple browsers are specified, pytest parametrizes each test across them — tripling the test count.

## Parametrizing Browser in conftest.py

For finer control, override the browser fixture:

\`\`\`python
import pytest

@pytest.fixture(params=["chromium", "firefox", "webkit"], scope="session")
def browser_name(request):
    return request.param
\`\`\`

Mark browser-specific tests:

\`\`\`python
@pytest.mark.skip_browser("webkit")  # WebKit lacks a specific API
def test_file_upload(page):
    page.set_input_files("input[type='file']", "fixtures/doc.pdf")
\`\`\`

## Device Descriptors

Mobile testing uses preset device profiles with viewport, user agent, and touch settings:

\`\`\`python
import pytest

@pytest.fixture
def mobile_context(browser, base_url):
    iphone = browser.new_context(**pytest.playwright.devices["iPhone 13"])
    yield iphone
    iphone.close()

def test_mobile_navigation(mobile_context):
    page = mobile_context.new_page()
    page.goto("/")
    expect(page.get_by_role("navigation")).to_be_visible()
\`\`\`

Built-in devices include iPhone, Pixel, iPad, and Galaxy profiles. List them:

\`\`\`python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    print(p.devices.keys())
\`\`\`

## Custom Device Profiles

\`\`\`python
@pytest.fixture
def tablet_context(browser):
    context = browser.new_context(
        viewport={"width": 1024, "height": 768},
        is_mobile=True,
        has_touch=True,
        user_agent="Mozilla/5.0 (iPad; ...)",
    )
    yield context
    context.close()
\`\`\`

## Geolocation and Permissions

Test location-aware features by granting permissions and setting coordinates:

\`\`\`python
def test_nearby_stores(page, context):
    context.grant_permissions(["geolocation"])
    context.set_geolocation({"latitude": 27.7172, "longitude": 85.3240})  # Kathmandu
    page.goto("/stores/nearby")
    expect(page.get_by_text("Showing stores near you")).to_be_visible()
\`\`\`

Other grantable permissions: \`notifications\`, \`camera\`, \`microphone\`, \`clipboard-read\`.

\`\`\`python
context.grant_permissions(["notifications"])
context.grant_permissions(["clipboard-read", "clipboard-write"])
\`\`\`

## Locale and Timezone

\`\`\`python
@pytest.fixture
def browser_context_args(browser_context_args):
    return {
        **browser_context_args,
        "locale": "ne-NP",
        "timezone_id": "Asia/Kathmandu",
    }
\`\`\`

Verify date formatting and translated strings match the target locale.

## CI Strategy

Running all tests × three browsers × two devices is expensive. A pragmatic approach:

| Suite | Browsers | Devices | When |
|-------|----------|---------|------|
| Smoke | Chromium | Desktop | Every PR |
| Regression | Chromium + Firefox | Desktop | Nightly |
| Full matrix | All three | Desktop + mobile | Pre-release |

\`\`\`bash
# PR check — fast
pytest -m smoke --browser chromium

# Nightly — broader
pytest -m regression --browser chromium --browser firefox

# Release candidate
pytest --browser chromium --browser firefox --browser webkit
\`\`\`

## Key Takeaways

- Pass \`--browser firefox\` or \`--browser webkit\` to test across engines.
- Use device descriptors for mobile and tablet viewports.
- Grant geolocation and other permissions via \`context.grant_permissions()\`.
- Run the full browser matrix pre-release; stick to Chromium for fast PR feedback.`,
  },
  {
    contentMarkdown: `## Debugging Failing Tests

Playwright failures often leave you staring at a timeout message with no visual context. The debugging toolkit — **PWDEBUG**, the **Trace Viewer**, and **Codegen** — turns opaque timeouts into actionable screenshots, network logs, and recorded traces.

## PWDEBUG — Interactive Debugger

Set the environment variable to pause execution and open the Playwright Inspector:

\`\`\`bash
PWDEBUG=1 pytest tests/e2e/test_login.py::test_valid_login -s
\`\`\`

The Inspector shows:

- The current page state with a live screenshot.
- Every locator query and its match count.
- Step-by-step execution controls (step over, resume, explore).

Use PWDEBUG when a locator matches zero or too many elements and you need to experiment interactively.

## Playwright Inspector (headed + slowmo)

An alternative to PWDEBUG for quick local debugging:

\`\`\`bash
pytest --headed --slowmo 1000 tests/e2e/test_login.py -s
\`\`\`

\`--headed\` opens a visible browser window. \`--slowmo 1000\` adds a one-second pause between actions so you can watch what happens. The \`-s\` flag shows \`print()\` output in the terminal.

## Trace Viewer — Post-Mortem Analysis

Traces record every action, network request, console message, and DOM snapshot. Enable tracing in config or CLI:

\`\`\`ini
# pytest.ini
[pytest]
addopts = --tracing retain-on-failure
\`\`\`

\`\`\`bash
pytest --tracing on                    # trace every test
pytest --tracing retain-on-failure     # trace only failures (recommended)
\`\`\`

After a failure, open the trace:

\`\`\`bash
playwright show-trace test-results/tests-e2e-test-login-chromium/trace.zip
\`\`\`

The Trace Viewer timeline shows:

- **Actions** — clicks, fills, navigations with before/after DOM snapshots.
- **Network** — every request and response with headers and body.
- **Console** — JavaScript errors and \`console.log\` output.
- **Source** — test source code with the failing line highlighted.

Traces are the single most useful artifact for debugging CI failures you cannot reproduce locally.

## Screenshots and Video on Failure

\`\`\`bash
pytest --screenshot only-on-failure --video retain-on-failure
\`\`\`

Artifacts land in \`test-results/\`. Attach them to CI job output for quick visual inspection without downloading traces.

## Codegen — Record Tests Interactively

Codegen opens a browser and records your actions as Playwright code:

\`\`\`bash
playwright codegen https://staging.example.com/login
\`\`\`

Click through the flow; codegen writes locators and actions in real time. Copy the generated code into a test file, then refactor into page objects.

Codegen is excellent for:

- Discovering the correct locator for a tricky element.
- Bootstrapping a new test quickly.
- Exploring an unfamiliar application.

It is not a substitute for structured tests — recorded scripts need cleanup, assertions, and fixture integration.

## page.pause() — Inline Breakpoint

Add a programmatic pause anywhere in a test:

\`\`\`python
def test_checkout_flow(page):
    page.goto("/cart")
    page.get_by_role("button", name="Checkout").click()
    page.pause()  # opens Inspector; remove before committing
    expect(page.get_by_text("Order confirmed")).to_be_visible()
\`\`\`

\`page.pause()\` works with \`PWDEBUG=1\` or \`--headed\`. Remove it before pushing — it will hang headless CI.

## Console and Network Logging

Capture browser console output in tests:

\`\`\`python
def test_no_console_errors(page):
    errors = []
    page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)
    page.goto("/dashboard")
    assert errors == [], f"Console errors: {errors}"
\`\`\`

## Debugging Checklist

1. **Re-run locally with \`--headed --slowmo 500\`** — watch the failure happen.
2. **Check the trace** — \`playwright show-trace <path>\`.
3. **Use PWDEBUG** for locator experimentation.
4. **Use codegen** to find the right selector for a new element.
5. **Check screenshots** in \`test-results/\` for visual state at failure time.

## Key Takeaways

- \`PWDEBUG=1\` opens the interactive Inspector for step-by-step debugging.
- \`--tracing retain-on-failure\` records traces you open with \`playwright show-trace\`.
- \`playwright codegen\` bootstraps tests by recording browser actions.
- Remove \`page.pause()\` before committing — it hangs CI.`,
  },
  {
    contentMarkdown: `## Checkpoint — Advanced

Confirm you can apply Part 4 techniques before considering the manual complete.

- [ ] I can mock an API response with \`page.route()\` and \`route.fulfill()\`.
- [ ] I can block images with \`route.abort()\` to speed up non-visual tests.
- [ ] I have written at least one \`APIRequestContext\` test (GET or POST).
- [ ] I use API calls to seed data and the browser to verify UI behavior.
- [ ] I have a visual regression test using \`to_have_screenshot()\` with committed baselines.
- [ ] I have run an axe-core accessibility scan and fixed any violations.
- [ ] Auth state is saved with \`storage_state\` and loaded via \`browser_context_args\`.
- [ ] I can interact with open shadow DOM using standard locators.
- [ ] I have run tests in parallel with \`pytest -n auto\`.
- [ ] I can open a trace file with \`playwright show-trace\` and read the timeline.

**Score:** 8–10 checked — you have solid advanced Playwright skills. 5–7 — revisit specific chapters. Below 5 — work through Part 4 hands-on before moving on.`,
  },
];
