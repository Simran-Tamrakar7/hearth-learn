#!/usr/bin/env python3
"""Generate playwright-manual-data/part4.mjs from transcript content."""
import json
import re
import subprocess
from pathlib import Path

RAW = Path("/Users/macminim2/Projects/hearth/scripts/playwright-manual-data/raw-user-content.txt")
OUT = Path("/Users/macminim2/Projects/hearth/scripts/playwright-manual-data/part4.mjs")

text = RAW.read_text()

SECTIONS = {
    "p4_full": (
        text.find("Part 4: Advanced Techniques — Full Expanded Version"),
        text.find("Part 4: Advanced Techniques — Full Summarized Version"),
    ),
    "p4_sum": (
        text.find("Part 4: Advanced Techniques — Full Summarized Version"),
        text.find("Part 5: CI/CD & Reporting — Full Summarized Version"),
    ),
}


def get_section(key):
    start, end = SECTIONS[key]
    return text[start:end].strip()


def split_chapters(content, chapter_nums):
    chapters = {}
    lines = content.split("\n")
    pattern = re.compile(r"^(\d+)\.\s+(.+)$")
    starts = []
    for i, line in enumerate(lines):
        m = pattern.match(line.strip())
        if m and int(m.group(1)) in chapter_nums:
            starts.append((i, int(m.group(1)), m.group(2).strip()))
    for idx, (line_num, num, title) in enumerate(starts):
        end = starts[idx + 1][0] if idx + 1 < len(starts) else len(lines)
        body = "\n".join(lines[line_num + 1 : end]).strip()
        chapters[num] = {"title": title, "content": body}
    return chapters


def is_prose_line(s):
    if re.search(
        r"\b(simulate|sets a value|sends a|chooses option|moves the mouse|performs a|returns a|returns every|is a plain|is the|are |was |will |should |can |cannot |only works|This is|These are|Both are|Here,|A fixture|Fixtures |params \(|scope \(|autouse \(|key \(string|button \(string|text \(string|target_locator|index \(integer|force \(boolean|delay \(number|modifiers \(list|value \(string|label \(string|position \(dict|If a locator|A locator defined|A practical priority|Another anti-pattern|Low-level keyboard|Low-level mouse|registers an|creates a|gives you|lets you|lets a request|useful for|worth knowing|worth flagging|worth distinguishing|worth noting|worth understanding|Mounting|Screenshot comparison|Accessibility testing|Visual baselines|Storage state|Shadow DOM|Closed shadow|Parallel execution|Cross-browser|Localization|Browser launch|Locale, timezone|page\.clock lets|Console and page-error|DB-level assertions|UI Mode|Trace Viewer|Flaky test|A flaky test|Detection:|Common causes:|Quarantining|pytest-rerunfailures|Currently JS/TS|Hybrid pattern|Combining API|WebSocket message|Mocking is a deliberate|API calls are a fast|Component testing in Playwright|expect\(page\)\.to_have_screenshot|to_match_aria_snapshot|context\.storage_state|browser\.new_context\(storage_state|Playwright pierces|pytest-xdist|Run the identical|locale context option|timezone_id affects|Launch options|OAuth popups|Playwright Inspector|retain-on-failure|playwright show-trace|page\.route\(\) intercepts|APIRequestContext sends|p\.request\.new_context|GET, POST, PUT|error_code \(string|status \(integer|headers, method|headers \(dict|data \(dict|base_url \(string|slow_mo \(number|color_scheme \(string|url_pattern \(string|handler \(function|route\.fulfill\(\) returns|route\.abort\(\) simulates|route\.continue_\(\) lets|to_have_screenshot\(name\)|Unlike axe-core|Important scope note|Rather than loading|Component testing sits|// Example shown|expect\(page\)\.to_match|When a screenshot|A subtlety worth)",
        s,
    ):
        return True
    if s.startswith("// ") or s.startswith("Rather than") or s.startswith("Unlike "):
        return True
    if re.search(r"\(integer|\(string|\(dict|\(list|\(function|\(optional|\(required|\(ms,|\(bool", s):
        return True
    if s.endswith(".") and not s.endswith("()") and not s.endswith('")') and not s.endswith("')"):
        if not re.match(r"^(page\.|expect\(|assert |import |from |def |@|#|route\.|response |request_context|browser |context |PWDEBUG|pytest )", s):
            return True
    return False


def is_code_line(line):
    s = line.strip()
    if not s:
        return False
    if is_prose_line(s):
        return False
    if s == "...":
        return True
    if re.match(r"^\s{4}\.\.\.$", line):
        return True
    if re.match(r"^\s+(self\.|def |return |yield |page\.|expect\(|assert |route\.|response |headers |captured|row =|leave_id|user_id|axe |results\.|ws\.|on_framesent|on_framereceived|modify_headers|handle_route|handle_websocket|BLOCKED|BLOCK )", line):
        return True
    if re.match(r"^\[pytest\]|^markers =|^addopts =", s):
        return True
    if s.startswith("#") and not s.startswith("##"):
        return True
    if re.match(
        r"^(page|expect|assert|def |import |from |with |for |if |return |class |@|browser|context|playwright|pytest|conftest|locator|dialog|download|upload|frame|await |print\(|lambda |yield |@pytest|route\.|response |request_context|Axe|axe |p\.|sync_playwright|PWDEBUG|npx |npm |pip |row =|captured|BLOCKED|BLOCK|iphone |device |results\.|ws\.|on_|modify_|handle_|storage_state|browser_context|playwright\.devices|devices\[|to_have_screenshot|to_match_aria|db_connection|leave_id|user_id)",
        s,
    ):
        return True
    if re.match(r"^(page\.|expect\(|assert |\.click\(|\.fill\(|\.check\(|\.press\(|\.select_option|\.hover\(|\.drag_to|\.set_input_files|\.on\(|\.once\(|\.evaluate|\.locator|\.get_by_|route\.|response\.|request_context\.|context\.|browser\.|p\.request|p\.chromium|sync_playwright|playwright\.devices)", s):
        return True
    if re.match(r"^[a-z_]+\s*=\s*(page\.|expect\(|p\.|sync_playwright|browser|context|request_context|Axe|playwright)", s):
        return True
    if re.match(r"^page\.", s) or re.match(r"^expect\(", s) or re.match(r"^route\.", s):
        return True
    if s.startswith("row =") or s.startswith("box =") or s.startswith("form =") or s.startswith("iphone ="):
        return True
    if re.match(r"^[a-z_]+\.[a-z_]+\(", s) and any(
        kw in s
        for kw in [
            "page",
            "expect",
            "route",
            "context",
            "browser",
            "request",
            "response",
            "storage_state",
            "devices",
            "clock",
            "on(",
            "fulfill",
            "continue_",
            "abort",
            "axe",
            "Axe",
        ]
    ):
        return True
    if s.endswith(")") and "(" in s:
        if any(
            kw in s
            for kw in [
                "page.",
                "expect(",
                "assert ",
                ".click",
                ".fill",
                ".route",
                "route.",
                "fulfill",
                "continue_",
                "abort",
                "storage_state",
                "new_context",
                "devices",
                "clock",
                ".on(",
                "to_have_screenshot",
                "to_match_aria",
                "request_context",
                "sync_playwright",
                "p.request",
                "p.chromium",
                "Axe(",
                "axe.",
            ]
        ):
            return True
    if re.match(r"^(status=|content_type=|body=|headers=|method=|post_data=|url=|error_code=|\)|\}\)|\]\))", s):
        return True
    if re.match(r"^(test\(|const |await component|await expect|await mount)", s):
        return True
    if re.match(r"^(source |# Activate|# From|python -m|pip install|pytest |PWDEBUG)", s):
        return True
    if re.match(r"^pytest -n|^pytest --tracing|^pytest --reruns", s):
        return True
    return False


def format_markdown(num, title, content):
    lines = content.split("\n")
    result = [f"## {num}. {title}", ""]
    code_buffer = []

    def flush_code():
        nonlocal code_buffer
        if code_buffer:
            lang = "ini" if any(l.strip().startswith("[pytest]") for l in code_buffer) else "python"
            result.append(f"```{lang}")
            result.extend(code_buffer)
            result.append("```")
            result.append("")
            code_buffer = []

    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        if not stripped:
            if code_buffer:
                j = i + 1
                while j < len(lines) and not lines[j].strip():
                    j += 1
                if j < len(lines) and is_code_line(lines[j]):
                    code_buffer.append("")
                    i += 1
                    continue
                flush_code()
            result.append("")
            i += 1
            continue
        if code_buffer or is_code_line(line):
            if is_code_line(line) or (code_buffer and (line.startswith("    ") or line.startswith("\t") or re.match(r"^[)\]}]", line.strip()) or re.match(r"^(status|content_type|body|headers|method|post_data|url)=", line.strip()))):
                code_buffer.append(line.rstrip())
                i += 1
                continue
        flush_code()
        if (
            len(stripped) < 100
            and (
                stripped.endswith(":")
                or re.match(r"^get_by_", stripped)
                or re.match(r"^\.(click|fill|check|press|select|hover|drag|nth|first|last|all|count|filter|evaluate|bounding|highlight|type|uncheck)", stripped)
            )
        ):
            result.append(f"### {stripped.rstrip(':')}")
            result.append("")
        else:
            result.append(line)
        i += 1
    flush_code()
    return "\n".join(result).strip()


def format_summary(num, title, content):
    return f"## {num}. {title}\n\n{content.strip()}"


PART4_META = [
    {
        "id": "pw-26-network",
        "title": "26. Network Interception & Mocking",
        "minutes": 50,
        "level": "advanced",
        "chapterNum": 26,
        "overviewText": "page.route() intercepts HTTP requests before they leave the browser, letting you fulfill() custom responses, continue_() with modifications, or abort() to simulate failures. Mock edge cases (500 errors, empty lists, slow responses) without backend cooperation. WebSocket traffic can be observed via page.on('websocket') with framesent/framereceived listeners but cannot be mocked like HTTP.",
        "why": "Many UI states are nearly impossible to trigger from a real backend on demand. Network mocking puts error states, empty data, and slow responses under test control — deterministic, repeatable, and fast.",
        "when": "Use route.fulfill() for error states and edge-case payloads. Use route.continue_() to inject headers. Use route.abort() for network-failure UX. Reserve heavy mocking for edge cases; keep core happy-path tests on the real backend.",
        "practical": {
            "app": "HRMS — Employee list error handling",
            "scenario": "Test that a 500 on /api/employees shows an error banner without breaking staging.",
            "pass": "page.route('**/api/employees', lambda r: r.fulfill(status=500, body='{\"error\":\"Server error\"}')) — deterministic error banner test.",
            "fail": "Wait for staging to be manually broken; test passes when backend happens to be down.",
        },
        "advantages": [
            "Test error states without backend changes",
            "Deterministic mock payloads every run",
            "Built into Playwright — no external proxy",
            "route.continue_() injects headers without replacing responses",
            "Block analytics/ads to speed non-visual tests",
            "WebSocket frame observation for real-time apps",
        ],
        "limitations": [
            "Mocked responses may drift from real API contracts",
            "Every matched request must be resolved or it hangs",
            "WebSocket messages cannot be fulfilled like HTTP",
            "Over-mocking reduces true E2E confidence",
            "Routes must register before the triggering action",
            "Glob patterns can accidentally match unintended URLs",
        ],
    },
    {
        "id": "pw-27-api",
        "title": "27. API Testing with Playwright",
        "minutes": 50,
        "level": "advanced",
        "chapterNum": 27,
        "overviewText": "APIRequestContext (p.request.new_context) sends GET/POST/PUT/DELETE without a browser. The hybrid pattern seeds test data via API (fast) and uses the UI only for the feature under test. Use page.context.request when API calls must share the browser session's cookies.",
        "why": "UI-based setup is slow and flake-prone. API calls take milliseconds and remove unrelated UI flows from tests that only care about one screen's behavior.",
        "when": "Default to API for create/delete setup when endpoints exist. Write pure API tests for backend-only contracts. Use page.context.request for authenticated hybrid tests.",
        "practical": {
            "app": "HRMS — Leave request admin view",
            "scenario": "POST a leave request via API, verify it appears in admin UI, DELETE via API teardown.",
            "pass": "request_context.post('/leave-requests', data={...}) then page.goto detail URL — under 5 seconds.",
            "fail": "Walk through 6-step UI submission for every test needing a leave record.",
        },
        "advantages": [
            "API setup 10–100x faster than equivalent UI flows",
            "request fixture works without browser launch",
            "Hybrid tests focus browser time on UI behavior",
            "response.json() parses bodies directly",
            "Same pytest project for API and UI tests",
            "page.context.request shares session cookies",
        ],
        "limitations": [
            "Requires documented backend endpoints",
            "API contract changes break tests silently",
            "Cannot test purely visual behavior via API",
            "Standalone context lacks browser cookies by default",
            "POST is not idempotent — retries create duplicates",
            "Multipart uploads more verbose than dedicated HTTP clients",
        ],
    },
    {
        "id": "pw-28-component",
        "title": "28. Component Testing",
        "minutes": 35,
        "level": "advanced",
        "chapterNum": 28,
        "overviewText": "Component testing mounts a single React/Vue/Svelte component in a real browser — faster than full E2E, more realistic than pure unit tests. Playwright's @playwright/experimental-ct-* is JavaScript/TypeScript only with no Python equivalent; know the boundary when reading official docs.",
        "why": "Design-system components need fast feedback on edge-case props and states. Full E2E is too slow; Jest/Vitest lacks real browser rendering. Component testing fills the middle of the pyramid.",
        "when": "Use in JS/TS projects for component libraries. For Python E2E suites, rely on targeted E2E or accept component testing as a separate toolchain if the team adopts it.",
        "practical": {
            "app": "HRMS design system — Date picker component",
            "scenario": "Test 12 calendar edge cases (leap year, disabled dates) without loading the full HRMS app.",
            "pass": "CT mount with props; assert role-based locators in isolated browser — seconds per case.",
            "fail": "Spin up full app + login for every date-picker variant — minutes per case.",
        },
        "advantages": [
            "Real browser rendering without full app boot",
            "Same Playwright locator API as E2E",
            "Faster feedback on component edge cases",
            "Sits in the middle of the Testing Pyramid",
            "Webpack/Vite integration for hot reload",
            "Complements rather than replaces E2E",
        ],
        "limitations": [
            "No Python/pytest-playwright component testing API",
            "Separate toolchain from Python E2E suite",
            "Requires Vite bundler integration setup",
            "Does not test cross-component integration",
            "Mocking providers/routers adds boilerplate",
            "Official docs skew JavaScript-first",
        ],
    },
    {
        "id": "pw-29-visual",
        "title": "29. Visual & Accessibility Testing",
        "minutes": 45,
        "level": "advanced",
        "chapterNum": 29,
        "overviewText": "expect(page).to_have_screenshot() compares against committed baselines. axe-core via axe-playwright-python scans WCAG violations. to_match_aria_snapshot() snapshot-tests accessibility tree structure. Review diffs before updating baselines.",
        "why": "Functional tests miss layout breaks, color shifts, and accessibility violations. Visual and a11y testing catch regressions assertions cannot see.",
        "when": "Add screenshots after CSS or component-library upgrades. Run axe on every user-facing form. Mask dynamic content before first baseline. Regenerate baselines in dedicated PRs only.",
        "practical": {
            "app": "HRMS — Dashboard and login page",
            "scenario": "CSS refactor shifts card spacing; axe finds date-picker missing aria-label.",
            "pass": "to_have_screenshot with mask on timestamps; axe returns zero critical violations.",
            "fail": "No visual tests — spacing ships broken; no axe — keyboard users blocked.",
        },
        "advantages": [
            "Catches visual regressions functional tests miss",
            "Baselines provide pixel evidence in PR reviews",
            "axe-core covers dozens of WCAG rules in seconds",
            "to_match_aria_snapshot catches structural a11y regressions",
            "mask parameter excludes dynamic content",
            "Violations triaged by impact level",
        ],
        "limitations": [
            "Visual tests brittle across OS rendering differences",
            "Blind baseline updates hide real regressions",
            "axe catches automated rules only — manual review still needed",
            "Screenshot storage grows with suite size",
            "Dynamic SPAs need masking or API mocking first",
            "to_match_aria_snapshot sensitive to intentional copy changes",
        ],
    },
    {
        "id": "pw-30-auth",
        "title": "30. Authentication & Session Reuse",
        "minutes": 45,
        "level": "advanced",
        "chapterNum": 30,
        "overviewText": "storage_state saves cookies/localStorage after one login; browser.new_context(storage_state=path) reuses it. Maintain one saved state per role for RBAC tests. Regenerate when sessions expire — not a permanent committed artifact.",
        "why": "Repeated UI login in large suites wastes minutes per run. storage_state logs in once and loads state in milliseconds per test.",
        "when": "Implement when more than five tests need authentication. Session-scoped save, function-scoped load. One state file per role. Regenerate in global setup each CI run.",
        "practical": {
            "app": "HRMS — Authenticated dashboard tests",
            "scenario": "120 tests each repeat 12-second login; storage_state cuts login overhead to one 12-second run.",
            "pass": "authenticated_page loads auth_state.json; navigates directly to /dashboard.",
            "fail": "Every test inlines full login flow — 24 minutes of redundant login.",
        },
        "advantages": [
            "One login per run instead of per test",
            "Function-scoped context with saved state isolates tests",
            "Works with cookie/localStorage auth mechanisms",
            "Portable auth_state.json across local and CI",
            "One state file per role for RBAC coverage",
            "Combines with pytest fixture scopes from Chapter 21",
        ],
        "limitations": [
            "Only cookies and localStorage — not sessionStorage/IndexedDB",
            "Saved state expires when server sessions time out",
            "Token refresh may invalidate mid-run state",
            "Each role needs its own state file",
            "Auth flow changes require regenerating state",
            "Never commit production credentials in state files",
        ],
    },
    {
        "id": "pw-31-shadow",
        "title": "31. Shadow DOM & Complex Components",
        "minutes": 40,
        "level": "advanced",
        "chapterNum": 31,
        "overviewText": "Playwright pierces open shadow DOM automatically — standard get_by_role/get_by_text locators work without special syntax. Closed shadow roots are inaccessible by design. Complex components (date pickers, rich text) may need keyboard.type() instead of fill().",
        "why": "Design systems increasingly use web components. Playwright's automatic piercing means the same locator strategy works inside shadow roots.",
        "when": "Use role/text locators first inside custom components. Chain page.locator('tag').get_by_role() when needed. Escalate closed shadow roots to dev team for ARIA hooks.",
        "practical": {
            "app": "HRMS — Design system date picker",
            "scenario": "Custom hrms-date-picker uses open shadow DOM; get_by_label still works via accessibility tree.",
            "pass": "page.get_by_role('button', name='Save').click() inside component.",
            "fail": "page.locator('#shadow-internal-btn') — cannot cross shadow boundary.",
        },
        "advantages": [
            "Automatic open shadow DOM piercing",
            "Role locators work via accessibility tree",
            "Chained locators cross shadow boundaries explicitly",
            "Same strategy as non-shadow pages",
            "No JavaScript shadowRoot injection needed",
            "Built for modern component-based UIs",
        ],
        "limitations": [
            "Closed shadow roots impenetrable — no workaround",
            "Deeply nested shadow slows locator resolution",
            "CSS selectors do not cross shadow boundaries",
            "Components without ARIA lack accessible names",
            "contenteditable needs keyboard.type() not fill()",
            "Custom date pickers rarely behave like native inputs",
        ],
    },
    {
        "id": "pw-32-parallel",
        "title": "32. Parallel Execution & Sharding",
        "minutes": 40,
        "level": "advanced",
        "chapterNum": 32,
        "overviewText": "pytest-xdist (-n auto or -n 4) runs tests across worker processes. Parallelization exposes hidden shared-state bugs. Sharding splits suites across CI machines for very large suites. Diminishing returns past optimal worker count.",
        "why": "Sequential 400-test suites take hours. Parallel workers cut wall-clock time dramatically when tests are properly isolated.",
        "when": "Enable when sequential time exceeds 15 minutes. Start with pytest -n auto. Ensure unique test data per worker. Shard via CI matrix when single-machine parallelism is insufficient.",
        "practical": {
            "app": "HRMS — Full regression suite",
            "scenario": "380 tests at 25s each — 2.6 hours sequential; pytest -n 4 finishes in ~42 minutes.",
            "pass": "pytest -n auto with Faker unique data and API teardown per test.",
            "fail": "pytest -n 8 on 2-core machine thrashes; shared /tmp file corrupts parallel runs.",
        },
        "advantages": [
            "Near-linear speedup for isolated suites",
            "pytest -n auto needs zero tuning",
            "Exposes hidden test coupling",
            "Combines with markers: pytest -n 4 -m smoke",
            "Sharding scales beyond single-machine limits",
            "Per-test BrowserContext isolation is parallel-safe",
        ],
        "limitations": [
            "Not linear — worker overhead caps gains",
            "Shared state/files cause random parallel failures",
            "Each worker consumes significant RAM",
            "Parallel failures harder to reproduce sequentially",
            "Sharding requires CI platform configuration",
            "Over-parallelizing small suites adds complexity for little gain",
        ],
    },
    {
        "id": "pw-33-cross-browser",
        "title": "33. Cross-browser & Cross-device Testing",
        "minutes": 40,
        "level": "advanced",
        "chapterNum": 33,
        "overviewText": "pytest --browser chromium|firefox|webkit runs the same suite on three engines. playwright.devices presets emulate mobile viewports, touch, and user-agent. geolocation and permissions options simulate GPS and camera without real hardware.",
        "why": "Chrome-only testing ships WebKit and Firefox bugs to 30–40% of users. Mobile emulation catches responsive and touch issues desktop tests miss.",
        "when": "Run smoke against all three browsers on every PR; full suite nightly. Use device presets for phone/tablet pages. Set permissions=['geolocation'] for location features.",
        "practical": {
            "app": "HRMS — Leave request form",
            "scenario": "Date picker overflows in WebKit; submit button below fold on iPhone 13 emulation.",
            "pass": "CI matrix runs chromium/firefox/webkit; iPhone 13 test confirms submit reachable.",
            "fail": "Chromium-only — Safari layout and mobile usability bugs ship.",
        },
        "advantages": [
            "Three engines from one test codebase",
            "CI matrix runs browsers concurrently",
            "Device presets realistic mobile viewport/touch/UA",
            "Geolocation emulation without physical GPS",
            "Same locators work across all browsers",
            "permissions option grants camera/notifications in tests",
        ],
        "limitations": [
            "Triples CI time without matrix parallelism",
            "WebKit on Linux ≠ real Safari on iOS",
            "Emulation not a substitute for real devices",
            "Some bugs only on specific OS versions",
            "Geolocation requires explicit permissions",
            "Full cross-product matrix expensive for large suites",
        ],
    },
    {
        "id": "pw-34-i18n",
        "title": "34. Localization / i18n Testing",
        "minutes": 35,
        "level": "advanced",
        "chapterNum": 34,
        "overviewText": "locale and timezone_id context options serve translated content and locale-specific date formats. Use data-testid for stable locators across languages. RTL layouts (Arabic/Hebrew) need visual regression since no dedicated RTL assertion API exists.",
        "why": "HRMS apps serve multilingual users. Text-based locators break when copy changes language. Date formats and RTL layouts need explicit testing.",
        "when": "Set locale in browser.new_context for translated UI tests. Test representative timezones for date formatting. Combine locale emulation with to_have_screenshot for RTL layout checks.",
        "practical": {
            "app": "HRMS — Nepali and Arabic locales",
            "scenario": "Leave balance shows wrong date order in ja-JP; RTL header overlaps sidebar in ar locale.",
            "pass": "context with locale='ja-JP' + get_by_test_id locators; ar locale visual baseline.",
            "fail": "get_by_text('Submit') only — breaks in every non-English locale.",
        },
        "advantages": [
            "locale option switches UI language without code changes",
            "timezone_id tests date/time formatting edge cases",
            "data-testid stable across translated copy",
            "Same test logic runs in multiple locales",
            "RTL issues caught with visual regression",
            "No separate i18n test framework needed",
        ],
        "limitations": [
            "get_by_text breaks when copy translates",
            "Cannot test all locale combinations — sample strategically",
            "RTL layout bugs need visual not functional assertions",
            "Translation files must exist in test environment",
            "Date format bugs subtle — easy to miss without locale context",
            "No built-in RTL-specific assertion API",
        ],
    },
    {
        "id": "pw-35-debug",
        "title": "35. Debugging Tools",
        "minutes": 50,
        "level": "advanced",
        "chapterNum": 35,
        "overviewText": "Browser launch options (slow_mo, devtools), locale/timezone/color_scheme emulation, page.clock for time control, console/pageerror listeners, DB-level assertions, BDD with pytest-bdd, OAuth popup handling, and choosing Inspector vs UI Mode vs Trace Viewer.",
        "why": "CI failures with bare timeouts give zero context. Debugging tools surface DOM state, JS errors, and timing issues that assertions alone cannot explain.",
        "when": "Use PWDEBUG=1 Inspector while authoring tests. Wire page.on('pageerror') as autouse fixture. Use page.clock for time-dependent features. Open traces after CI failures.",
        "practical": {
            "app": "HRMS — Flaky login in CI",
            "scenario": "Spinner overlay blocks welcome text for 8 seconds — trace reveals it; fix waits for spinner hidden.",
            "pass": "playwright show-trace ci-trace.zip shows overlay at failure step.",
            "fail": "time.sleep(10) blind fix — passes sometimes, fails on slow CI.",
        },
        "advantages": [
            "slow_mo makes headed debugging followable",
            "page.clock tests expiry without real-time waits",
            "pageerror listener catches silent JS failures",
            "DB assertions verify persistence not just UI",
            "Inspector generates locators by pointing",
            "OAuth popup handling via expect_page pattern",
        ],
        "limitations": [
            "Inspector requires headed mode — not for CI",
            "page.clock does not mock server-side time",
            "DB assertions couple tests to schema",
            "BDD adds Gherkin maintenance overhead",
            "OAuth flows vary by provider — no one pattern",
            "Too many debug hooks slow test execution",
        ],
    },
    {
        "id": "pw-36-ui-mode",
        "title": "36. UI Mode",
        "minutes": 30,
        "level": "advanced",
        "chapterNum": 36,
        "overviewText": "UI Mode is Playwright's visual interactive test runner: browse tests, watch mode on save, pick-locator on click, and live time-travel through steps. JavaScript/TypeScript native — Python relies on Inspector and Trace Viewer instead.",
        "why": "Visual test exploration accelerates authoring and debugging for developers who think in timelines and live DOM, not stack traces.",
        "when": "Use in JS/TS projects via npx playwright test --ui. For Python suites, use PWDEBUG=1 Inspector and Trace Viewer as equivalents.",
        "practical": {
            "app": "JS/TS Playwright project alongside Python E2E",
            "scenario": "Developer uses UI Mode pick-locator to draft selectors, ports pattern to Python POM.",
            "pass": "UI Mode watch mode reruns affected spec on save — instant feedback loop.",
            "fail": "Assume UI Mode works with pytest-playwright — it does not.",
        },
        "advantages": [
            "Visual test tree with pass/fail at a glance",
            "Watch mode reruns on file save",
            "Pick-locator generates code on element click",
            "Time-travel scrubs through step timeline",
            "No PWDEBUG env var needed for exploration",
            "Integrated with @playwright/test runner",
        ],
        "limitations": [
            "No Python/pytest-playwright UI Mode equivalent",
            "Requires @playwright/test JavaScript project",
            "Not available in CI headless pipelines",
            "Generated locators need POM refactoring",
            "Large suites slow to load in UI Mode",
            "Separate from Python E2E workflow",
        ],
    },
    {
        "id": "pw-37-trace",
        "title": "37. Trace Viewer & Post-Mortem Debugging",
        "minutes": 40,
        "level": "advanced",
        "chapterNum": 37,
        "overviewText": "pytest --tracing on/retain-on-failure records DOM snapshots, network, console, and screenshots per step into trace.zip. playwright show-trace opens interactive replay — the primary tool for diagnosing CI failures you cannot reproduce locally.",
        "why": "A CI timeout tells you nothing about what the page looked like. Traces replay the exact sequence with full context.",
        "when": "Enable retain-on-failure in CI. Use --tracing on locally when debugging a specific flaky test. Upload trace.zip as CI artifact on failure.",
        "practical": {
            "app": "HRMS — CI-only failure",
            "scenario": "test_dashboard passes locally, times out in CI. Trace shows slow API call left spinner visible 12 seconds.",
            "pass": "retain-on-failure artifact + show-trace reveals spinner blocking assertion.",
            "fail": "Re-run CI 10 times hoping to reproduce; add arbitrary sleep.",
        },
        "advantages": [
            "Full timeline: DOM, network, console per step",
            "retain-on-failure saves storage on passing tests",
            "show-trace works offline with local zip file",
            "No re-run needed to inspect failure state",
            "Screenshots at every action for visual context",
            "Network tab shows slow/failed API calls",
        ],
        "limitations": [
            "Trace files large — full tracing on every test costly",
            "Requires download from CI before local viewing",
            "Not web-based — needs playwright CLI installed",
            "Does not capture server-side logs",
            "Sensitive data may appear in network/console traces",
            "Python tracing config less documented than JS runner",
        ],
    },
    {
        "id": "pw-38-flaky",
        "title": "38. Flaky Test Management",
        "minutes": 45,
        "level": "advanced",
        "chapterNum": 38,
        "overviewText": "Flaky tests fail intermittently without code changes — usually a test problem, not the app. Detect via CI history, quarantine chronic offenders, use pytest-rerunfailures as mitigation not fix, and root-cause with traces and repeated local runs.",
        "why": "One flaky test erodes trust in the entire suite. Teams start ignoring red builds. Systematic flaky management is a senior QA responsibility.",
        "when": "Track pass/fail history in CI reporting. Quarantine tests failing >5% of runs. Fix root cause before removing quarantine. Use --reruns only while actively debugging.",
        "practical": {
            "app": "HRMS — 400-test CI suite",
            "scenario": "test_leave_approval fails 8% of runs due to race on toast notification. Trace shows toast dismissed before assertion.",
            "pass": "expect(toast).to_be_visible() with proper auto-retry; quarantine removed after 50 clean runs.",
            "fail": "pytest --reruns 3 on entire suite — hides 12 flaky tests permanently.",
        },
        "advantages": [
            "Quarantine prevents flaky tests blocking releases",
            "CI history reveals intermittent patterns",
            "Traces root-cause timing races quickly",
            "pytest-repeat reproduces flakes locally fast",
            "Fixing flakes improves whole-suite trust",
            "Documented flaky registry tracks known issues",
        ],
        "limitations": [
            "Quarantine without fix deadline accumulates debt",
            "Reruns mask problems in pass-rate metrics",
            "Flake detection needs CI history tooling",
            "Some flakes only appear under load",
            "Root-cause can take longer than the flake symptom",
            "Team culture may normalize reruns instead of fixes",
        ],
    },
]


def js_str(s):
    return json.dumps(s, ensure_ascii=False)


def write_part():
    p4_full = split_chapters(get_section("p4_full"), range(26, 39))
    p4_sum = split_chapters(get_section("p4_sum"), range(26, 39))
    phase = "Part 4 · Advanced Techniques"
    lines = ["/** Playwright manual Part 4 — Advanced Techniques */", "export const chapters = ["]
    for m, num in zip(PART4_META, range(26, 39)):
        full = p4_full[num]
        summ = p4_sum[num]
        content_md = format_markdown(num, full["title"], full["content"])
        custom_sum = format_summary(num, summ["title"], summ["content"])
        p = m["practical"]
        lines.append("  {")
        lines.append(f'    id: {js_str(m["id"])},')
        lines.append(f'    title: {js_str(m["title"])},')
        lines.append(f'    minutes: {m["minutes"]},')
        lines.append(f'    level: {js_str(m["level"])},')
        lines.append(f'    phase: {js_str(phase)},')
        lines.append(f'    partName: {js_str(phase)},')
        lines.append(f'    overviewText: {js_str(m["overviewText"])},')
        lines.append(f'    why: {js_str(m["why"])},')
        lines.append(f'    when: {js_str(m["when"])},')
        lines.append(
            f"    practical: {{ app: {js_str(p['app'])}, scenario: {js_str(p['scenario'])}, pass: {js_str(p['pass'])}, fail: {js_str(p['fail'])} }},"
        )
        lines.append(f"    advantages: {js_str(m['advantages'])},")
        lines.append(f"    limitations: {js_str(m['limitations'])},")
        lines.append(f"    contentMarkdown: {js_str(content_md)},")
        lines.append(f"    customSummary: {js_str(custom_sum)},")
        lines.append(f"    chapterNum: {m['chapterNum']},")
        lines.append("  },")
    lines.append("];")
    lines.append("")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    return OUT


out = write_part()
r = subprocess.run(["node", "--check", str(out)], capture_output=True, text=True)
print(f"Wrote {out} ({out.stat().st_size:,} bytes, 13 chapters)")
print(f"Syntax check: {'OK' if r.returncode == 0 else r.stderr}")
