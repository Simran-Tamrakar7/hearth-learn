/** Playwright manual Part 2 — Core Interactions */
export const chapters = [
  {
    contentMarkdown: `## Ch5 Locators Deep Dive

Locators are the foundation of every Playwright test. A well-chosen locator survives CSS refactors, reads like user intent, and pairs with auto-retry so you rarely need manual waits. This chapter covers user-facing locators first, then CSS/XPath escapes, chaining, strictness, and the retry model.

### Why user-facing locators win

\`get_by_role\`, \`get_by_label\`, \`get_by_text\`, and \`get_by_placeholder\` query the accessibility tree — the same information screen readers use. Class names like \`.btn-primary-v2\` change every sprint; a button's role and visible label rarely do. Default to user-facing locators; reach for \`page.locator()\` only when no accessible hook exists.

---

### get_by_role

**What it does:** Finds an element by its ARIA role and optional accessible name. The recommended default for buttons, links, headings, checkboxes, and other interactive controls.

**Types/params:**
- \`role\` (str): ARIA role — \`"button"\`, \`"link"\`, \`"textbox"\`, \`"checkbox"\`, \`"heading"\`, \`"listitem"\`, \`"row"\`, etc.
- \`name\` (str | Pattern): Accessible name — visible text or \`aria-label\`. Supports regex via \`re.compile(...)\`.
- \`exact\` (bool): When \`True\`, name must match exactly, not as substring. Default \`False\`.
- \`checked\` (bool): For checkboxes/radios — filter by checked state.
- \`level\` (int): For headings — restrict to \`h1\`–\`h6\` via \`level=1\` etc.

**Pointers:**
- Prefer over CSS for anything with a meaningful role.
- Regex names handle dynamic labels: \`name=re.compile(r"Delete item \\d+")\`.
- If strict mode fires, tighten with a parent scope or \`.filter()\` — don't blindly add \`.first\`.

\`\`\`python
page.get_by_role("button", name="Submit").click()
page.get_by_role("checkbox", name="Remember me").check()
page.get_by_role("heading", name="Dashboard", level=1)
page.get_by_role("link", name=re.compile(r"View order #\\d+"))
\`\`\`

---

### get_by_text

**What it does:** Finds an element containing specific visible text. Good for static content, status messages, and table cells.

**Types/params:**
- \`text\` (str | Pattern): Text to match. Substring by default.
- \`exact\` (bool): Require full text match when \`True\`.

**Pointers:**
- Ambiguous on pages where the same string appears twice — scope with a parent locator or use \`.filter(has_text=...)\`.
- Pair with \`expect(...).to_contain_text()\` for assertions; use \`get_by_text\` when you need to click or interact.

\`\`\`python
page.get_by_text("Payment confirmed").is_visible()
page.get_by_text("Pending", exact=True)
\`\`\`

---

### get_by_label

**What it does:** Finds a form control by its associated \`<label>\` text. The best locator for inputs when markup is correct.

**Types/params:**
- \`text\` (str | Pattern): Label text (or \`aria-label\` on the input).
- \`exact\` (bool): Full label match when \`True\`.

**Pointers:**
- Requires proper \`<label for="...">\` or wrapping label markup. Broken labels mean this won't work — fall back to placeholder or \`data-testid\`.
- Chain inside a form scope to avoid cross-form collisions.

\`\`\`python
page.get_by_label("Email address").fill("user@example.com")
form = page.get_by_role("form", name="Login")
form.get_by_label("Password").fill("secret")
\`\`\`

---

### get_by_placeholder

**What it does:** Finds an input by its \`placeholder\` attribute.

**Types/params:**
- \`text\` (str | Pattern): Placeholder string.
- \`exact\` (bool): Full match when \`True\`.

**Pointers:**
- Weaker accessibility signal than a real label — use only when labels are missing.
- Placeholders disappear once the user types; don't rely on them for post-fill assertions.

\`\`\`python
page.get_by_placeholder("Search products...").fill("laptop")
\`\`\`

---

### page.locator

**What it does:** Creates a locator from a CSS selector, XPath string, or existing locator. Escape hatch when role/label/text aren't available.

**Types/params:**
- \`selector\` (str): CSS (\`"#id"\`, \`"[data-testid='x']"\`) or XPath (\`"xpath=//div[@class='foo']"\`).
- Chaining: \`parent_locator.locator(".child")\` scopes the search.

**Pointers:**
- Prefer \`data-testid\` over auto-generated CSS classes.
- XPath is powerful but brittle — last resort.
- \`page.locator("text=Submit")\` exists but \`get_by_text\` is clearer.

\`\`\`python
page.locator("[data-testid='legacy-widget']").click()
row = page.locator("tr", has_text="Jane Doe")
row.locator("button", has_text="Edit").click()
\`\`\`

---

### filter, nth, first, last

**What it does:** Narrows a locator set to one element or a subset.

**Types/params:**
- \`.filter(has_text=..., has=...)\`: Keep elements matching extra criteria or containing a child.
- \`.nth(index)\`: Zero-based index into the match set.
- \`.first\` / \`.last\`: Shorthand for index 0 and final match.

**Pointers:**
- \`.first\` silences strict-mode errors but may click the wrong row — prefer \`.filter()\` with unique text.
- \`.nth(2)\` is fragile when list order changes; filter by stable content instead.

\`\`\`python
page.get_by_role("listitem").filter(has_text="Pending").get_by_role("button", name="Approve").click()
page.get_by_role("row").filter(has=page.get_by_text("john@example.com")).get_by_role("button", name="Delete").click()
\`\`\`

---

### Strictness

**What it does:** By default, an action on a locator that matches multiple elements raises a strict mode violation instead of picking one silently.

**Types/params:**
- Strict mode is on by default for actions (\`click\`, \`fill\`, etc.).
- Disable per-call with \`force=True\` (skips actionability too — avoid unless intentional).

**Pointers:**
- Strict mode is a feature: it catches ambiguous locators at dev time.
- Fix by scoping, filtering, or using a more specific \`name\` — not by sprinkling \`.first\`.

\`\`\`python
# Fails if two "Submit" buttons exist — good
page.get_by_role("button", name="Submit").click()
\`\`\`

---

### Auto-retry

**What it does:** Locators re-query the DOM on every action and assertion until the element is found and actionable, or the timeout expires.

**Types/params:**
- Default timeout: 30 seconds (configurable via \`page.set_default_timeout()\` or test config).
- Applies to actions and \`expect()\` assertions — not bare Python \`assert\`.

**Pointers:**
- No stale-element exceptions — locators are lazy handles, not cached DOM nodes.
- Flaky tests with good locators usually mean a real timing/overlay bug, not "Playwright needs more wait."

\`\`\`python
# Re-queries until visible and enabled, then clicks
page.get_by_role("button", name="Save").click()
\`\`\``,
  },
  {
    contentMarkdown: `## Ch6 Actions

Playwright actions run the full actionability checklist before executing: attached, visible, stable, enabled, and not obscured. You rarely call a separate wait before \`click()\` — trust auto-waiting unless you have a specific state to poll for (Chapter 8).

---

### click

**What it does:** Performs a single left-click on the element.

**Types/params:**
- \`button\` (str): \`"left"\`, \`"right"\`, or \`"middle"\`. Default \`"left"\`.
- \`click_count\` (int): Number of clicks. Default 1.
- \`delay\` (float): Milliseconds between mousedown and mouseup.
- \`force\` (bool): Skip actionability checks. Default \`False\`.
- \`position\` (dict): \`{"x": 10, "y": 5}\` offset from top-left for canvas/custom widgets.
- \`modifiers\` (list): \`["Shift"]\`, \`["Control"]\`, etc.

**Pointers:**
- Timeouts usually mean wrong locator or an overlay — not "needs more sleep."
- \`force=True\` hides real UX bugs; use only for hidden inputs or known-safe cases.

\`\`\`python
page.get_by_role("button", name="Submit").click()
page.get_by_role("button", name="Options").click(button="right")
\`\`\`

---

### dblclick

**What it does:** Double-clicks the element.

**Types/params:** Same options as \`click\` (minus \`click_count\`).

**Pointers:** Uncommon in modern web apps — verify the UI actually uses dblclick before writing tests for it.

\`\`\`python
page.get_by_text("Rename").dblclick()
\`\`\`

---

### fill vs type (press_sequentially)

**What it does:**
- \`fill(value)\`: Clears the field, then sets the value in one shot. Fast and reliable for standard inputs.
- \`press_sequentially(text)\` (formerly \`type\`): Sends individual keystrokes with optional delay — triggers \`input\`/\`keydown\` events per character.

**Types/params:**
- \`fill\`: \`value\` (str), optional \`force\`, \`timeout\`.
- \`press_sequentially\`: \`text\` (str), optional \`delay\` (ms between keys).

**Pointers:**
- Default to \`fill\` for forms.
- Use \`press_sequentially\` when React/Vue controlled components ignore \`fill\`, or for autocomplete/typeahead that listens per keystroke.
- \`fill\` does not press Enter — call \`press("Enter")\` separately to submit.

\`\`\`python
page.get_by_label("Email").fill("user@example.com")
page.get_by_label("Search").press_sequentially("play", delay=100)  # autocomplete
\`\`\`

---

### press

**What it does:** Presses a key or key combination on the element (or focused element).

**Types/params:**
- \`key\` (str): \`"Enter"\`, \`"Tab"\`, \`"Control+A"\`, \`"Meta+Shift+P"\`, etc.

**Pointers:**
- Submits forms: \`locator.press("Enter")\` without finding the submit button.
- Clears fields: \`press("Control+A")\` then \`fill("new value")\`.

\`\`\`python
page.get_by_label("Password").fill("secret")
page.get_by_label("Password").press("Enter")
\`\`\`

---

### check / uncheck

**What it does:** Sets checkbox or radio state. \`check\` ensures checked; \`uncheck\` ensures unchecked.

**Types/params:**
- \`force\`, \`timeout\`, \`position\` — same as click.

**Pointers:**
- Prefer \`get_by_role("checkbox", name="...")\` over raw input selectors.
- Radios: \`check\` selects; you don't \`uncheck\` a radio — click a different one.

\`\`\`python
page.get_by_role("checkbox", name="Accept terms").check()
page.get_by_role("checkbox", name="Newsletter").uncheck()
\`\`\`

---

### select_option

**What it does:** Selects option(s) in a native \`<select>\` element.

**Types/params:**
- \`value\` (str | list): Match \`value\` attribute.
- \`label\` (str | list): Match visible option text.
- \`index\` (int | list): Zero-based option index.

**Pointers:**
- Only works on native \`<select>\` — custom dropdowns need click-based interaction.
- Multi-select: pass a list: \`select_option(label=["Red", "Blue"])\`.

\`\`\`python
page.get_by_label("Country").select_option(label="Canada")
page.get_by_label("Tags").select_option(value=["js", "python"])
\`\`\`

---

### hover

**What it does:** Moves the mouse over the element. Required for menus and tooltips that appear on mouseover.

**Types/params:**
- \`force\`, \`timeout\`, \`position\` — same as click.

**Pointers:**
- Hover the trigger, then click the revealed item — two separate locator actions.
- Touch-only mobile emulation may not support hover-dependent UI.

\`\`\`python
page.get_by_role("button", name="More").hover()
page.get_by_role("menuitem", name="Export CSV").click()
\`\`\`

---

### drag_to

**What it does:** Drags the source locator to the target locator.

**Types/params:**
- \`target\` (Locator): Destination element.
- \`source_position\`, \`target_position\` (dict): Optional offsets.
- \`force\`, \`timeout\`.

**Pointers:** Kanban boards and sortable lists are the common case. Verify the app uses HTML5 drag or a library that responds to Playwright's drag simulation.

\`\`\`python
page.locator("#task-42").drag_to(page.locator("#column-done"))
\`\`\`

---

### Keyboard and mouse low-level

**What it does:** \`page.keyboard\` and \`page.mouse\` expose raw input for cases locators don't cover.

**Types/params:**
- \`page.keyboard.press(key)\`, \`.type(text)\`, \`.down(key)\`, \`.up(key)\`.
- \`page.mouse.move(x, y)\`, \`.click(x, y)\`, \`.down()\`, \`.up()\`, \`.wheel(delta_x, delta_y)\`.

**Pointers:**
- Sends to whatever element currently has focus — wrong focus = wrong target.
- Prefer locator methods; low-level API is for canvas, games, or exotic widgets.

\`\`\`python
page.keyboard.press("Control+K")  # command palette
page.mouse.wheel(0, 500)          # scroll down
\`\`\``,
  },
  {
    contentMarkdown: `## Ch7 Assertions

Playwright's \`expect()\` assertions auto-retry until they pass or time out — the assertion equivalent of action auto-waiting. Never use bare Python \`assert\` on DOM state in an SPA; the condition may be true a moment later.

\`\`\`python
from playwright.sync_api import expect
\`\`\`

---

### expect(locator).to_be_visible()

**What it does:** Asserts the element is attached to the DOM and visible (non-zero size, not hidden).

**Types/params:**
- \`timeout\` (float): Override default timeout in milliseconds.
- \`visible\` (bool): When \`False\`, asserts hidden — same as \`to_be_hidden()\`.

**Pointers:**
- Most common assertion in E2E tests.
- Fails fast with a clear message showing the locator and timeout.
- Pair with good locators — \`to_be_visible()\` on a vague locator may pass on the wrong element.

\`\`\`python
expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
expect(page.get_by_text("Loading...")).to_be_hidden(timeout=10_000)
\`\`\`

---

### expect(locator).to_have_text()

**What it does:** Asserts the element's text content matches exactly (after normalization).

**Types/params:**
- \`expected\` (str | Pattern | list): Exact text or regex.
- \`timeout\` (float): Retry window.

**Pointers:**
- Exact match — whitespace is normalized but substring won't pass.
- For partial match, use \`to_contain_text()\`.
- Works on a single element; for lists use \`to_have_text\` with a list or \`to_have_count\` + individual checks.

\`\`\`python
expect(page.get_by_role("status")).to_have_text("Saved successfully")
expect(page.locator(".price")).to_have_text(re.compile(r"\\$\\d+\\.\\d{2}"))
\`\`\`

---

### expect(locator).to_contain_text()

**What it does:** Asserts the element's text includes the expected substring (or matches regex).

**Types/params:**
- \`expected\` (str | Pattern | list): Substring(s) or regex.
- \`timeout\` (float): Retry window.
- \`use_inner_text\` (bool): Use inner text vs text content. Default favors inner text.

**Pointers:**
- More forgiving than \`to_have_text\` — default for dynamic content with extra whitespace or icons.
- List form checks multiple substrings appear in order.

\`\`\`python
expect(page.get_by_role("alert")).to_contain_text("3 items added")
expect(page.locator("tbody")).to_contain_text(["Alice", "Bob"])
\`\`\`

---

### expect(locator).to_have_value()

**What it does:** Asserts an input, textarea, or select has the given value.

**Types/params:**
- \`value\` (str | Pattern): Expected \`value\` attribute / current input value.
- \`timeout\` (float): Retry window.

**Pointers:**
- For \`<select>\`, asserts the selected option's value.
- After \`fill()\`, value updates immediately — but async validation may change it; \`expect\` retries handle that.

\`\`\`python
expect(page.get_by_label("Email")).to_have_value("user@example.com")
expect(page.get_by_label("Quantity")).to_have_value("5")
\`\`\`

---

### expect.soft()

**What it does:** Soft assertion — records failure but continues the test. All soft failures are reported at the end.

**Types/params:**
- Wraps any \`expect\` matcher: \`expect.soft(locator).to_be_visible()\`.
- Available in sync and async APIs.

**Pointers:**
- Use for non-critical checks (cosmetic copy, optional banners) where you still want to verify primary flows.
- Don't soft-assert critical paths — a "passed" test with logged soft failures misleads CI.
- Hard assertions (default) stop immediately — preferred for gating logic.

\`\`\`python
expect.soft(page.get_by_text("Beta feature")).to_be_visible()
expect(page.get_by_role("button", name="Checkout")).to_be_enabled()  # hard — stops test if fails
\`\`\`

---

### Timeout override

**What it does:** Per-assertion or global timeout controls how long \`expect\` retries.

**Types/params:**
- Per call: \`expect(locator).to_be_visible(timeout=5_000)\` (milliseconds).
- Global: \`expect.set_options(timeout=10_000)\` in a scope.
- Test config: \`timeout\` in \`playwright.config\` or pytest marker.

**Pointers:**
- Shorter timeouts for fast-fail smoke checks; longer for slow backends.
- Increasing timeout without fixing the root cause just makes flaky tests slower.
- Actions also respect \`timeout\` on the locator: \`locator.click(timeout=5_000)\`.

\`\`\`python
expect(page.get_by_text("Report ready")).to_be_visible(timeout=60_000)
page.get_by_role("button", name="Generate").click(timeout=5_000)
\`\`\`

---

### Other matchers worth knowing

\`\`\`python
expect(page).to_have_url("**/dashboard")
expect(page).to_have_title("Dashboard | Acme")
expect(page.get_by_role("checkbox")).to_be_checked()
expect(page.locator("li")).to_have_count(3)
expect(page.get_by_role("button", name="Save")).to_be_enabled()
\`\`\`

**Pointers:** Page-level \`expect(page)\` is for URL/title. Locator matchers retry on DOM state. Bare \`assert page.title() == "..."\` fails instantly — always use \`expect\`.`,
  },
  {
    contentMarkdown: `## Ch8 Waits

Playwright's design goal: you should almost never write manual waits. Actions and \`expect()\` poll until conditions are met. This chapter explains what Playwright waits for automatically, when explicit waits are legitimate, and why \`time.sleep\` is an anti-pattern.

---

### The actionability checklist

Before every action (\`click\`, \`fill\`, \`check\`, etc.), Playwright verifies:

1. **Attached** — element exists in the DOM.
2. **Visible** — non-zero bounding box; not \`display:none\`, \`visibility:hidden\`, or \`opacity:0\`.
3. **Stable** — position unchanged for two consecutive animation frames (no ongoing layout shift).
4. **Enabled** — not \`disabled\` and not \`aria-disabled\`.
5. **Receives events** — not covered by another element (loading spinner, modal backdrop).

Playwright re-runs this checklist on every retry until all pass or timeout. That is why \`page.get_by_role("button", name="Submit").click()\` works on a slow SPA without a preceding wait.

**Pointers:**
- Action timeout failures often mean an overlay is blocking — fix the app or wait for the overlay to disappear, don't \`force=True\` through it.
- Animations shorter than two frames may still pass stability checks; long CSS transitions can delay actions legitimately.

\`\`\`python
# No explicit wait needed — actionability is built in
page.get_by_role("button", name="Submit").click()
\`\`\`

---

### wait_for_selector

**What it does:** Waits until an element matching the selector reaches a given state.

**Types/params:**
- \`selector\` (str): CSS or XPath selector.
- \`state\` (str): \`"attached"\`, \`"detached"\`, \`"visible"\`, \`"hidden"\`. Default \`"visible"\`.
- \`timeout\` (float): Max wait in ms.
- \`strict\` (bool): Fail if multiple elements match.

**Pointers:**
- Prefer locator + \`expect\` in modern tests: \`expect(page.locator(".spinner")).to_be_hidden()\`.
- \`wait_for_selector\` remains useful when you need imperative flow control before a block of actions.
- Waiting for \`state="hidden"\` on a spinner is a classic legitimate explicit wait.

\`\`\`python
page.wait_for_selector(".loading-spinner", state="hidden")
page.wait_for_selector(".results-table", state="visible", timeout=15_000)
\`\`\`

---

### wait_for_load_state

**What it does:** Waits for a page-level load event on the current page.

**Types/params:**
- \`state\` (str):
  - \`"load"\` — \`load\` event fired (images, stylesheets done).
  - \`"domcontentloaded"\` — HTML parsed, DOM ready.
  - \`"networkidle"\` — no more than 0 network connections for ~500ms.

**Pointers:**
- After \`page.goto()\`, Playwright already waits for \`load\` by default.
- \`networkidle\` is handy after actions that trigger background fetches with no specific element to target.
- **Avoid \`networkidle\` on dashboards** with polling, WebSockets, or analytics — the page never idles and the test times out.
- Prefer waiting on a specific element state over page-level idle.

\`\`\`python
page.goto("https://app.example.com/reports")
page.get_by_role("button", name="Run report").click()
page.wait_for_load_state("networkidle")  # only if no perpetual polling
expect(page.get_by_text("Report complete")).to_be_visible()
\`\`\`

---

### Anti-pattern: time.sleep

**What it does:** Blocks the test thread for a fixed duration regardless of app state.

**Why it's wrong:**
- Too short → flaky (app wasn't ready).
- Too long → every run wastes time even when the app responded in 200ms.
- Masks real bugs — the test passes at 3s sleep but users on slow networks fail.
- Doesn't compose — sleeps stack across a suite into minutes of dead time.

**What to do instead:**

| Instead of | Use |
|---|---|
| \`time.sleep(2); page.click(...)\` | \`page.get_by_role(...).click()\` (auto-waits) |
| \`time.sleep(5)\` after navigation | \`expect(page).to_have_url(...)\` |
| \`time.sleep(3)\` for spinner | \`expect(spinner).to_be_hidden()\` |
| \`time.sleep(1)\` between keystrokes | \`press_sequentially(..., delay=100)\` |

\`\`\`python
import time

# BAD — never do this
time.sleep(3)
page.get_by_role("button", name="Submit").click()

# GOOD
page.get_by_role("button", name="Submit").click()
expect(page.get_by_text("Success")).to_be_visible()
\`\`\`

**Pointers:** The only borderline case is debugging locally — even then, use \`page.pause()\` (Inspector) instead of sleeps. If you genuinely cannot find an element or state to wait on, that's a testability gap worth raising with the dev team.`,
  },
  {
    contentMarkdown: `## Ch9 Tabs and iFrames

Modern apps open new tabs for external links, OAuth flows, and print previews. Payment widgets and embedded editors live in iframes. Playwright treats each tab as a separate \`Page\` object and scopes iframe content via \`frame_locator\` — no Selenium-style \`switch_to.window\`.

---

### context.expect_page()

**What it does:** Context manager that captures a reference to a newly opened tab/window when an action triggers \`window.open\` or a \`target="_blank"\` link.

**Types/params:**
- \`predicate\` (callable, optional): Filter which page event to capture.
- \`timeout\` (float): Max wait for the new page.

**Pointers:**
- **Must wrap the triggering action** — register the listener before the click, or you race the event and miss the new tab.
- Returns a \`Page\` via \`.value\` on the info object.
- Call \`wait_for_load_state()\` on the new page before interacting.

\`\`\`python
with page.context.expect_page() as new_page_info:
    page.get_by_role("link", name="Open in new tab").click()
new_page = new_page_info.value
new_page.wait_for_load_state()
expect(new_page).to_have_title("External App")
new_page.get_by_role("button", name="Confirm").click()
\`\`\`

---

### page.bring_to_front()

**What it does:** Brings a specific tab to the visual foreground in headed mode.

**Types/params:** None.

**Pointers:**
- **Not required for automation** — you can call \`click()\` on a background tab's \`Page\` object directly.
- Useful when debugging with \`headless=False\` and you want to see which tab is active.
- Each \`Page\` in \`context.pages\` is independently addressable at all times.

\`\`\`python
pages = context.pages
dashboard = pages[0]
popup = pages[1]
popup.bring_to_front()  # cosmetic in headed mode
popup.get_by_role("button", name="Close").click()
dashboard.get_by_text("Welcome back").is_visible()  # works without bring_to_front
\`\`\`

---

### page.frame_locator(selector)

**What it does:** Returns a \`FrameLocator\` scoped inside an \`<iframe>\`. Locators chained on it search only within that frame's document.

**Types/params:**
- \`selector\` (str): CSS selector for the \`<iframe>\` element (e.g. \`"#payment-iframe"\`, \`"iframe[name='editor']"\`).

**Pointers:**
- Required whenever content lives inside an iframe — \`page.get_by_label(...)\` won't find it from the parent page.
- Chain for nested iframes: \`.frame_locator("#outer").frame_locator("#inner")\`.
- Stripe, PayPal, and reCAPTCHA are classic iframe cases.
- \`FrameLocator\` behaves like a locator factory — no "switch back" needed.

\`\`\`python
frame = page.frame_locator("#payment-iframe")
frame.get_by_label("Card number").fill("4242 4242 4242 4242")
frame.get_by_label("Expiry").fill("12/30")
frame.get_by_label("CVC").fill("123")
frame.get_by_role("button", name="Pay").click()

# Nested iframe
inner = page.frame_locator("#outer").frame_locator("#inner")
inner.get_by_role("button", name="Save").click()
\`\`\`

---

### Multi-tab workflow summary

\`\`\`python
def test_oauth_popup(page, context):
    page.goto("https://app.example.com/login")
    with context.expect_page() as popup_info:
        page.get_by_role("button", name="Sign in with Google").click()
    popup = popup_info.value
    popup.get_by_label("Email").fill("test@example.com")
    popup.get_by_role("button", name="Next").click()
    # popup may close itself; parent page redirects
    expect(page).to_have_url("**/dashboard")
\`\`\`

**Pointers:** Unlike Cypress (weak multi-tab), Playwright handles multiple pages natively. Store \`Page\` references — don't assume \`page\` always means the original tab.`,
  },
  {
    contentMarkdown: `## Ch10 File Uploads and Downloads

File inputs and download links are common in HR portals, document managers, and reporting tools. Playwright bypasses the OS file picker for uploads and intercepts browser downloads without touching the filesystem dialog.

---

### locator.set_input_files()

**What it does:** Sets file(s) on an \`<input type="file">\` element directly, without opening the native OS file picker.

**Types/params:**
- \`files\` (str | Path | list): File path(s) relative to test dir or absolute. Pass \`[]\` to clear.
- \`timeout\` (float): Action timeout.

**Pointers:**
- Works on **hidden** file inputs — the common pattern of a styled "Upload" button triggering a hidden \`<input type="file">\`.
- Use absolute paths or paths relative to the test file when files live in a \`fixtures/\` folder.
- Multiple files: pass a list for \`<input multiple>\`.
- No OS-level automation needed — CI-friendly.

\`\`\`python
# Single file
page.get_by_label("Upload resume").set_input_files("fixtures/resume.pdf")

# Multiple files
page.get_by_label("Attach files").set_input_files(["fixtures/doc1.png", "fixtures/doc2.png"])

# Clear selection
page.get_by_label("Upload resume").set_input_files([])

# Hidden input behind a custom button
page.locator("input[type='file']").set_input_files("fixtures/avatar.jpg")
page.get_by_role("button", name="Upload").click()
expect(page.get_by_text("Upload complete")).to_be_visible()
\`\`\`

---

### page.expect_download()

**What it does:** Context manager that captures a file download triggered by a subsequent action (click on a download link/button).

**Types/params:**
- \`predicate\` (callable, optional): Filter downloads by URL or suggested filename.
- \`timeout\` (float): Max wait for download to start.

**Pointers:**
- **Must wrap the triggering click** — same race-condition rule as \`expect_page()\`.
- Returns a \`Download\` object via \`.value\`.
- Download may still be in progress when captured — use \`save_as\` or \`path()\` to wait for completion.

\`\`\`python
with page.expect_download() as download_info:
    page.get_by_role("button", name="Download report").click()
download = download_info.value
print(download.suggested_filename)
download.save_as("output/report.pdf")
\`\`\`

---

### download.save_as() and related APIs

**What it does:**
- \`save_as(path)\`: Writes the downloaded file to a specified path on disk.
- \`suggested_filename\`: Browser-suggested name (from \`Content-Disposition\` or link).
- \`path()\`: Waits for download to finish and returns temp path (auto-deleted when object is garbage-collected).

**Types/params:**
- \`save_as(path)\`: \`str\` or \`Path\` — destination file path.

**Pointers:**
- Assert \`suggested_filename\` to verify naming logic without reading file bytes.
- \`save_as\` then open/parse the file when content matters (CSV rows, PDF text).
- Clean up saved files in test teardown or use pytest \`tmp_path\`.

\`\`\`python
with page.expect_download() as download_info:
    page.get_by_role("link", name="Export CSV").click()
download = download_info.value

assert download.suggested_filename == "employees-2026-09.csv"
download.save_as(tmp_path / "employees.csv")

content = (tmp_path / "employees.csv").read_text()
assert "email,department" in content
\`\`\`

---

### End-to-end upload + verify pattern

\`\`\`python
def test_bulk_import(page):
    page.goto("/admin/import")
    page.get_by_label("CSV file").set_input_files("fixtures/employees.csv")
    page.get_by_role("button", name="Import").click()
    expect(page.get_by_role("alert")).to_contain_text("42 records imported")
    expect(page.get_by_role("row")).to_have_count(42)
\`\`\`

**Pointers:** Upload tests need fixture files committed to the repo. Download tests need a writable temp directory — \`tmp_path\` in pytest is ideal.`,
  },
  {
    contentMarkdown: `## Ch11 Alerts and Dialogs

Native browser dialogs — \`alert()\`, \`confirm()\`, \`prompt()\` — block all JavaScript on the page until dismissed. Playwright cannot click them with normal locators; you must register a handler **before** the action that triggers the dialog.

---

### page.on("dialog", handler)

**What it does:** Registers a persistent listener that fires whenever a native dialog appears for the lifetime of the page.

**Types/params:**
- \`event\` (str): \`"dialog"\`.
- \`handler\` (callable): Receives a \`Dialog\` object. Must call \`accept()\` or \`dismiss()\`.

**Pointers:**
- If no handler is registered, the dialog blocks the page and the test times out.
- Handler runs synchronously in the dialog callback — keep logic simple.
- One handler handles **all** subsequent dialogs on that page until removed.

\`\`\`python
page.on("dialog", lambda dialog: dialog.accept())
page.get_by_role("button", name="Delete account").click()  # triggers confirm()
\`\`\`

---

### dialog.accept() / dialog.dismiss()

**What it does:**
- \`accept(prompt_text=None)\`: Clicks OK. For \`prompt()\` dialogs, \`prompt_text\` supplies the typed value.
- \`dismiss()\`: Clicks Cancel (for \`confirm()\` and \`prompt()\`).

**Types/params:**
- \`prompt_text\` (str, optional): Input value for \`prompt()\` dialogs only.

**Pointers:**
- Exactly one of \`accept\` or \`dismiss\` must be called per dialog — otherwise the page stays blocked forever.
- \`alert()\` only supports \`accept()\` (no cancel button).

\`\`\`python
# confirm() — accept
page.on("dialog", lambda dialog: dialog.accept())
page.get_by_role("button", name="Delete").click()

# confirm() — dismiss (cancel)
page.on("dialog", lambda dialog: dialog.dismiss())
page.get_by_role("button", name="Delete").click()
\`\`\`

---

### prompt() dialogs

**What it does:** \`prompt()\` shows a text input. Pass the desired text to \`accept()\`.

**Types/params:**
- \`dialog.accept("input text")\`: Submits the prompt with that value.
- \`dialog.dismiss()\`: Cancels without submitting.

**Pointers:**
- Read \`dialog.default_value\` if you need the pre-filled prompt text.
- Rare in modern apps (replaced by modal components) but still appears in legacy admin tools.

\`\`\`python
page.on("dialog", lambda dialog: dialog.accept("New folder name"))
page.get_by_role("button", name="Create folder").click()
\`\`\`

---

### dialog.message

**What it does:** Read-only property with the dialog's displayed text.

**Types/params:** No parameters — \`str\` property.

**Pointers:**
- Assert the message matches expected copy before accepting — catches wrong dialogs.
- Branch: accept only if message contains expected text; otherwise raise to fail intentionally.

\`\`\`python
def handle_delete(dialog):
    assert "permanently delete" in dialog.message.lower()
    dialog.accept()

page.on("dialog", handle_delete)
page.get_by_role("button", name="Delete").click()
\`\`\`

---

### page.once("dialog", handler)

**What it does:** Same as \`page.on("dialog", ...)\` but auto-unregisters after handling one dialog.

**Types/params:** Same as \`page.on\`.

**Pointers:**
- Use when only one dialog is expected — avoids a stale handler firing on an unexpected later dialog.
- Safer default for isolated delete-confirm tests.

\`\`\`python
page.once("dialog", lambda dialog: dialog.accept())
page.get_by_role("button", name="Delete row").click()
# handler is gone — a second dialog would block/timeout
\`\`\`

---

### Custom modals vs native dialogs

**Pointers:** React/Vue/Angular modal components are **not** native dialogs — they are regular DOM elements. Use normal locators:

\`\`\`python
# Custom modal — NOT page.on("dialog")
page.get_by_role("button", name="Delete").click()
expect(page.get_by_role("dialog", name="Confirm deletion")).to_be_visible()
page.get_by_role("button", name="Yes, delete").click()
\`\`\`

Native \`alert\`/\`confirm\`/\`prompt\` require \`page.on\`. ARIA \`role="dialog"\` modals use \`get_by_role\`. Confusing the two is a common beginner mistake.`,
  },
  {
    contentMarkdown: `## Checkpoint · Core Interactions

Gate before Part 3 (Frameworks & pytest). Complete this cold — no notes, on a real practice site.

### Pass criteria

You are ready for Part 3 when you can do all of the following:

1. **Locators** — Log in using only \`get_by_role\` and \`get_by_label\`. No CSS classes, no \`time.sleep\`.
2. **Actions** — Submit a form with \`fill\` + \`click\`. Handle a hover-reveal menu. Explain when you'd use \`press_sequentially\` instead of \`fill\`.
3. **Assertions** — Assert a dashboard heading with \`expect(...).to_be_visible()\`. Assert an input value with \`to_have_value\`. Articulate why bare \`assert\` fails on SPAs.
4. **Waits** — Recite the five actionability checks from memory. Complete a flow with zero \`time.sleep\`. Explain when \`networkidle\` is dangerous.
5. **Tabs** — Open a link in a new tab with \`context.expect_page()\`, interact with the new page, return to the original.
6. **iFrames** — Fill a form inside an iframe using \`frame_locator\`.
7. **Files** — Upload a fixture file with \`set_input_files\`. Capture a download with \`expect_download\` and verify \`suggested_filename\`.
8. **Dialogs** — Handle a \`confirm()\` with \`page.once("dialog", ...)\`. Distinguish native dialogs from custom modal components.

### Self-check questions

- What happens if two elements match your locator and you call \`click()\`?
- What is the difference between \`to_have_text\` and \`to_contain_text\`?
- Why must \`expect_page()\` wrap the click that opens a new tab?
- When is \`force=True\` acceptable on a click?

### If you can't pass

Stay in Part 2. Part 3 adds fixtures, Page Object Model, and CI — architectural layers that **magnify** bad habits. Brittle locators in a POM are still brittle locators, just in a class file.`,
  },
];
