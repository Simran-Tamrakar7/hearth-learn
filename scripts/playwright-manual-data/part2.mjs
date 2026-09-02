/** Playwright manual Part 2 — Core Interactions */
export const chapters = [
  {
    id: "pw-13-locators",
    title: "13. Locators Deep Dive",
    minutes: 45,
    level: "intermediate",
    phase: "Part 2 · Core Interactions",
    partName: "Part 2 · Core Interactions",
    overviewText: "The most important chapter in the manual — user-facing locators (get_by_role, get_by_label, get_by_text, get_by_placeholder), get_by_test_id, CSS/XPath fallbacks, .filter(), .nth/.first/.last, .all()/.count(), strictness, and auto-retry.",
    why: "Nearly every flake traces back to a brittle locator. Mastering Playwright's locator philosophy — accessibility-first, live retry — separates stable suites from maintenance nightmares.",
    when: "Read before writing your second spec. Revisit when strict-mode violations fire or when refactoring selectors into a Page Object Model.",
    practical: { app: "HRMS employee list", scenario: "Delete button matches 12 rows — strict mode violation on .click().", pass: "Scope with .filter(has=page.get_by_text('john@example.com')) then click Delete within that row.", fail: "Add .first blindly or switch to fragile CSS .btn-delete:nth-child(3)." },
    advantages: ["get_by_role mirrors screen-reader perception — doubles as light a11y check", "Locators auto-retry until timeout — no manual polling loops", "get_by_test_id survives CSS refactors when devs maintain data-testid", ".filter(has=...) scopes table rows without brittle nth-child", "Strict mode catches ambiguous selectors before wrong-element clicks", "Chaining locators narrows scope progressively like nested .locator()"],
    limitations: ["get_by_label fails on apps with broken label markup", "CSS/XPath tied to DOM structure — breaks on redesigns", ".nth() and .first order-dependent when list order shifts", ".count() is a one-time read — no auto-retry unlike expect().to_have_count()", "get_by_text ambiguous when same string repeats on page", "Shadow DOM piercing requires special locator strategies (Part 4)"],
    contentMarkdown: `## 13. Locators Deep Dive

This is the most important chapter in the entire manual — nearly everything else builds on writing good locators.
### get_by_role, get_by_text, get_by_label, get_by_placeholder are "user-facing" locators.

They find elements the way a real user (or screen reader) would identify them, rather than by internal implementation details like CSS classes. This is deliberate philosophy, not just convenience: implementation details (class names, DOM structure) change often as developers refactor CSS/markup, but the role and visible text of a button rarely change. Locators built on them break far less often.
\`\`\`python
page.get_by_role("button", name="Submit").click()
page.get_by_role("link", name="Home").click()
page.get_by_role("checkbox", name="Remember me").check()

page.get_by_text("Welcome back").is_visible()

page.get_by_label("Email address").fill("user@example.com")

page.get_by_placeholder("Search products...").fill("laptop")
\`\`\`


### get_by_role(role, name=...) matches ARIA role plus accessible name.

role (string, required) covers values like "button" (clickable buttons), "link" (<a> tags), "checkbox", "textbox" (text inputs/textareas), "heading" (<h1>–<h6>), "listitem", and "row" (table rows). name (string or regex, optional) matches the accessible name — a string does substring matching by default, while a regex like re.compile("Delete.*") handles partially dynamic text. exact (boolean, default False) forces a full match instead of substring matching when True. checked (boolean, optional, checkboxes/radios only) filters to only-checked or only-unchecked elements. level (integer 1–6, optional, headings only) narrows to a specific heading level, e.g. level=1 matches only <h1>. This is the best-practice default locator — it mirrors how screen readers perceive the page, so it doubles as a light accessibility check, and should be preferred over CSS/XPath whenever the element has a clear role.
### get_by_text(text) matches visible text content anywhere on the page.

text (string or regex, required) does substring matching by default with a string, or flexible pattern matching with a regex like re.compile("Order #\\\\d+"). exact (boolean, default False) requires the full element text to match exactly when True. This is good for non-interactive content checks (confirmation messages, headings without a clear role), but can be ambiguous on pages that repeat similar text — combine with .filter() or scope to a parent when needed.
### get_by_label(label_text) matches a form input by its associated <label>.

label_text (string or regex, required) matches label text, substring by default. exact (boolean, default False) requires a full match when True. This requires the app to use proper <label for="..."> markup — if it doesn't, this won't work and you'll need get_by_placeholder or CSS as a fallback. When it does work cleanly, it's also a good accessibility signal for the app itself.
### get_by_placeholder(text) matches an input by its placeholder attribute.

text (string or regex, required) substring-matches by default, and exact (boolean, default False) forces a full match. This is a fallback for inputs without proper labels — fragile since placeholder text is often decorative/example text likely to change. Prefer get_by_label when both exist.
### get_by_test_id(test_id) matches a dedicated test-hook attribute.

This locator targets a data-testid (or configured equivalent) attribute added specifically for testing purposes, independent of visible text, role, or CSS structure — e.g. page.get_by_test_id("submit-order-button").click(). test_id (string or regex, required) matches the attribute's value. The key tradeoff versus role/text-based locators: get_by_test_id requires developers to deliberately add these attributes to the markup, which means it needs buy-in from the dev team, but once added it's arguably the most stable locator type available — completely decoupled from both visual text (which might get translated or reworded) and CSS/DOM structure (which changes during refactors). It's especially valuable in apps with heavy internationalization, where get_by_text/get_by_label would break across locales but a data-testid stays constant. Worth raising this as a suggestion during dev collaboration if your app doesn't use test IDs yet, particularly for critical, frequently-automated flows.
CSS and XPath locators remain available and are sometimes necessary.
\`\`\`python
page.locator("css=.submit-btn").click()
page.locator("#login-form input[type='email']").fill("test@example.com")
page.locator("xpath=//button[contains(text(), 'Submit')]").click()
\`\`\`


page.locator(selector) is a general-purpose locator: a plain string is treated as CSS by default (e.g. ".submit-btn", "#login-form input"), a "xpath=..." prefix is treated as XPath, and a "text=..." prefix uses Playwright's own older text-engine syntax as an alternative to get_by_text. This is a fallback for poorly-built markup that lacks proper roles/labels (unfortunately common in older or hastily-built internal tools) — the tradeoff is that CSS/XPath locators are tied to DOM structure and class names, both of which change more often than visible text/roles do, making them more brittle. A Page Object Model (Chapter 23) helps contain this breakage to one place when it happens.
### .filter() narrows a locator by additional text or a sub-locator.

\`\`\`python
page.get_by_role("listitem").filter(has_text="Product A").click()

row = page.get_by_role("row").filter(has=page.get_by_text("john@example.com"))
row.get_by_role("button", name="Delete").click()
\`\`\`


has_text (string or regex, optional) keeps only matches containing that text anywhere within the element. has (Locator object, optional) keeps only matches that themselves contain an element matching that sub-locator — commonly used for row-scoping, as in the example above: find the row containing a specific email, then act only within that row. Both parameters can be combined in one call. This pattern is essential for tables and lists, and you'll use it constantly in real test suites.
### .nth(index) selects one specific match by position.

index (integer, required, 0-based) — 0 is the first match; unlike Python lists, -1 is not supported, so use .last instead for the final match. This is order-dependent and breaks if list order changes, so prefer .filter() when content-based selection is possible.
### .first and .last are shortcuts for the first/last match.

Both are accessed as properties, not called with (). .first is equivalent to .nth(0); .last is equivalent to the final match regardless of total count. They carry the same brittleness caveat as .nth() — fine for "top of a freshly-sorted list" checks, risky if order can change between runs.
\`\`\`python
page.get_by_role("listitem").nth(2).click()
page.get_by_role("button", name="Add to cart").first.click()
page.locator(".comment").last.scroll_into_view_if_needed()
\`\`\`


### .all() returns every currently-matched element as a list of locators.

page.get_by_role("listitem").all() returns a Python list of individual Locator objects, one per match, letting you iterate over them directly — e.g. looping through every row in a table to check each one's text. Unlike a single-element locator, .all() performs a snapshot at the moment it's called rather than staying "live" — if the list changes after you've called .all() (e.g. an item gets deleted), the list you're holding won't reflect that change. Use this when you genuinely need to loop through multiple elements individually; for a simple count, .count() below is cheaper and clearer.
### .count() returns the number of current matches as an integer.

\`\`\`python
assert page.get_by_role("listitem").count() == 5
\`\`\`


This is a plain, non-retrying integer read — it checks the count once, right now, rather than polling like expect() does. If you need to assert on a count with retry/auto-wait behavior (e.g., waiting for a list to finish loading to exactly 5 items), prefer expect(locator).to_have_count(5) (covered in the assertions addendum below) instead of a plain assert on .count().
### .evaluate() and .evaluate_all() run raw JavaScript against matched element(s).

\`\`\`python
text_content = page.locator(".price").evaluate("el => el.textContent")
all_prices = page.locator(".price").evaluate_all("els => els.map(el => el.textContent)")
\`\`\`


.evaluate(js_function) runs the given JS function with the single matched DOM element passed in as its argument, returning whatever the function returns. .evaluate_all(js_function) does the same but passes the entire array of matched elements at once, useful for bulk operations (e.g., collecting every price on a page in one call rather than looping with .all()). These are an escape hatch for the rare cases where Playwright's own API doesn't expose something you need (a computed style property, a custom DOM attribute, direct manipulation of an element's internal state) — use them sparingly, since heavy reliance on raw JS evaluation starts to erode the main benefit of using a browser-automation framework with a clean, typed API in the first place.
### .bounding_box() and .highlight() support visual/positional debugging and assertions.

\`\`\`python
box = page.get_by_role("button", name="Submit").bounding_box()
print(box)  # {"x": 100, "y": 200, "width": 80, "height": 32}

page.get_by_role("button", name="Submit").highlight()
\`\`\`


.bounding_box() returns a dictionary with the element's x, y, width, and height in pixels relative to the page's viewport, or None if the element isn't visible. This is useful for layout-sensitive assertions — confirming an element is positioned within an expected region, or that two elements don't overlap. .highlight() draws a visible highlight box around the element directly in the browser (only meaningful in headed mode or when inspecting via UI Mode/Trace Viewer) — a quick way to visually confirm "is this locator actually finding the element I think it is" while debugging, without needing to add a print() and match output manually.
### Locator strictness prevents accidentally acting on the wrong element.

### # Throws an error if there are multiple matches

\`\`\`python
page.get_by_role("button", name="Delete").click()
# strict mode violation: resolved to 3 elements
\`\`\`


If a locator matches more than one element and you call an action on it directly (without .first/.nth()/.filter()), Playwright throws an error instead of silently acting on whichever element happened to be first. This is a deliberate safety feature — it forces you to be precise rather than accidentally clicking the wrong "Submit" button on a page with three of them.
### Locators auto-retry because they're a live recipe, not a one-time lookup.

A locator defined before an element even exists on the page yet (e.g., before an API response resolves) will still work, because Playwright re-evaluates the lookup every time you call an action or assertion on it, retrying until the element appears or the timeout expires. This is the technical foundation underneath the "no manual waits needed" claim from Part 0.
### Locator strategy: prefer stable selectors, treat CSS/XPath as a last resort.

A practical priority order, from most to least stable: get_by_role / get_by_label (tied to accessibility semantics, rarely change) → get_by_test_id (stable if the dev team maintains it, immune to text/locale changes) → get_by_text / get_by_placeholder (reasonably stable, but breaks on copy changes or translation) → CSS/XPath (most brittle, tied directly to markup structure). A common anti-pattern worth naming explicitly: writing long, deeply-nested XPath expressions generated by "copy XPath" browser dev-tools features (e.g. //div[3]/div[1]/span[2]/button) — these encode the exact current DOM structure and will silently break the moment a developer adds one wrapper <div> anywhere upstream, even though nothing about the button itself changed. Another anti-pattern is relying on auto-generated or utility CSS class names (common with frameworks like Tailwind or CSS-in-JS solutions that hash class names per build) — these can change on every deploy even without a visual or structural change. When CSS is unavoidable, prefer attribute-based selectors ([type="submit"], [name="email"]) over class-name selectors, since attributes tend to be more intentional and stable than styling classes.`,
    customSummary: `## 13. Locators Deep Dive

get_by_role, get_by_text, get_by_label, get_by_placeholder are user-facing locators — tied to accessible role/text, not brittle DOM structure. get_by_role is the best-practice default.
get_by_test_id matches a dedicated data-testid attribute — most stable option if devs maintain it, especially valuable in i18n apps.
CSS/XPath (page.locator()) are fallbacks — brittle since tied to class names/DOM structure; use attribute selectors over class selectors when CSS is unavoidable.
.filter(has_text=..., has=...) narrows matches — essential for table/row scoping.
.nth(index), .first, .last select by position — order-dependent, prefer .filter() when possible.
.all() returns a snapshot list of locators to loop over; .count() gives a one-time integer count (use expect().to_have_count() instead if you need retrying behavior).
.evaluate() / .evaluate_all() run raw JS against matched element(s) — escape hatch, use sparingly.
.bounding_box() returns position/size; .highlight() visually flags an element for debugging.
Locators are strict (error on multiple unhandled matches) and auto-retry (re-evaluated live until found or timeout).
Strategy: prefer role/label → test-id → text/placeholder → CSS/XPath last. Avoid copy-pasted deep XPath and auto-generated/hashed CSS classes — both break easily.`,
    chapterNum: 13,
  },
  {
    id: "pw-14-actions",
    title: "14. Actions",
    minutes: 40,
    level: "intermediate",
    phase: "Part 2 · Core Interactions",
    partName: "Part 2 · Core Interactions",
    overviewText: "Comprehensive coverage of .click(), .dblclick(), .fill(), .type(), .press(), .check()/.uncheck(), .select_option(), .hover(), and .drag_to() with parameters, actionability checks, and when to use each.",
    why: "Actions look simple but .fill() vs .type(), .check() vs .click(), and force=True each have distinct semantics that cause real bugs when misused.",
    when: "Read when implementing form flows, keyboard shortcuts, drag-and-drop, or debounced search inputs.",
    practical: { app: "E-commerce search with live autocomplete", scenario: "Autocomplete dropdown never appears after .fill() on search box.", pass: "Use .press_sequentially() or .type(delay=100) to fire per-keystroke events.", fail: "Add time.sleep(2) waiting for dropdown that never triggers." },
    advantages: [".fill() fast and correct for 95% of form fields", ".check()/.uncheck() idempotent — guaranteed end state", ".press() handles Enter/Tab/shortcuts without visible buttons", "Auto-waiting on every action — element must pass actionability checks", ".type(delay=N) fires real keydown events for debounced inputs", ".drag_to() native drag-and-drop without coordinate math"],
    limitations: [".fill() skips per-keystroke JS events — breaks live validators", "force=True bypasses actionability — masks real UI bugs", ".click() on checkbox toggles state — use .check() for guaranteed on", ".type() slower than .fill() — avoid unless events matter", ".hover() unreliable on touch-only mobile emulation", "Custom drag libraries may need evaluate() workaround"],
    contentMarkdown: `## 14. Actions

### .click() and .dblclick() simulate mouse clicks.

\`\`\`python
page.get_by_role("button", name="Submit").click()
page.locator(".card").dblclick()
\`\`\`


button (string, default "left") selects "left", "right", or "middle". click_count (integer, default 1 for click) is rarely changed manually. delay (number, ms, optional) sets the delay between mousedown and mouseup, useful for UI that distinguishes click duration. modifiers (list of strings, optional) — e.g. ["Shift"], ["Control", "Alt"] — are held during the click, for shift-click/ctrl-click behavior. force (boolean, default False) skips actionability checks entirely when True; the normal, recommended default is False, and forcing should be avoided unless you're certain the "not actionable" state is a false positive.
### .fill() sets a value directly; .type() simulates real keystrokes.

\`\`\`python
page.get_by_label("Username").fill("simran")
page.get_by_label("Search").type("laptop", delay=100)
\`\`\`


.fill(value) clears the field and sets its value directly — fast and correct for 95% of form-filling, but it doesn't fire per-keystroke JS events. .type(text, delay=...) types character-by-character, firing real keydown/keyup events for each character; delay (ms, default 0) adds a pause between keystrokes, set higher (e.g. 100) for debounced/live-search inputs. The distinction matters because a field with a live autocomplete or character-count validator listening to individual keydown events might not respond correctly to .fill() — reach for .type() specifically in that situation, not by default, since it's slower.
### .press() sends a single keyboard key or combination.

\`\`\`python
page.get_by_label("Search").press("Enter")
\`\`\`


key (string, required) accepts single keys ("Enter", "Tab", "Escape", "ArrowDown") or combinations joined with + ("Control+A", "Shift+Tab"). Useful for submitting forms via Enter or triggering keyboard shortcuts without a visible button to click.
### .check() and .uncheck() set a checkbox/radio to a guaranteed state.

\`\`\`python
page.get_by_label("Remember me").check()
page.get_by_label("Subscribe to newsletter").uncheck()
assert page.get_by_label("Remember me").is_checked()
\`\`\`


force (boolean, default False) skips actionability checks when True. These are idempotent — calling .check() on an already-checked box does nothing (no error), unlike .click() on a checkbox, which would toggle it. Prefer .check()/.uncheck() over .click() for checkboxes whenever you want a guaranteed end state regardless of current state.
### .select_option() chooses option(s) in a native <select> dropdown.

\`\`\`python
page.get_by_label("Country").select_option(label="Nepal")
page.get_by_label("Country").select_option(value="NP")
page.get_by_label("Skills").select_option(["Python", "Playwright"])
\`\`\`


value (string, optional) matches the option's value attribute; label (string, optional) matches the option's visible display text; a list form (list of strings, optional) selects multiple options at once for a <select multiple> element. This only works on native <select> elements — many modern UIs use custom-built dropdowns (a styled <div> acting like a select), which need click-to-open-then-click-option handling instead, treated like any other clickable element.
### .hover() moves the mouse without clicking.

\`\`\`python
page.get_by_text("Account menu").hover()  # reveals a dropdown menu, for example
\`\`\`


position (dict {x, y}, optional) targets a specific coordinate within the element's bounding box rather than its center. This is commonly needed just to reveal an element before you can interact with what it reveals — a dropdown menu, a tooltip.
### .drag_to() performs a full drag-and-drop sequence.

\`\`\`python
page.locator("#source-item").drag_to(page.locator("#drop-zone"))
\`\`\`


target_locator (Locator object, required) is the destination element. This handles the full mousedown → mousemove → mouseup sequence internally, and works well for standard HTML5 drag-and-drop; especially custom drag implementations may need a fallback to manual mouse events (below).
Low-level keyboard control via page.keyboard.
\`\`\`python
page.keyboard.press("Control+A")
page.keyboard.type("Hello world")
page.keyboard.down("Shift")
page.keyboard.up("Shift")
\`\`\`


.press(key) and .type(text) mirror the element-scoped versions but act on whatever's currently focused. .down(key) holds a key down without releasing it, and .up(key) releases a previously held-down key. You'll reach for .down()/.up() specifically for compound interactions — hold Shift, click two items, release Shift — that the convenience methods can't express on their own.
Low-level mouse control via page.mouse.
\`\`\`python
page.mouse.move(100, 200)
page.mouse.down()
page.mouse.move(300, 400)
page.mouse.up()
\`\`\`


.move(x, y) takes absolute page coordinates as integers; .down() presses the mouse button (default left) at the current position with no parameters; .up() releases it, also with no parameters. This is the fallback for custom drag implementations where .drag_to() doesn't produce the expected event sequence, and for testing keyboard shortcuts or shift-click multi-select behavior more generally.`,
    customSummary: `## 14. Actions

.click()/.dblclick() support button, click_count, delay, modifiers, and force (skip actionability checks — avoid unless certain).
.fill() sets value directly (fast, no keystroke events); .type() simulates real keystrokes (needed for autocomplete/character-count listeners).
.press() sends a key or combo (e.g. "Enter", "Control+A").
.check()/.uncheck() are idempotent — safer than .click() for guaranteed checkbox state.
.select_option() works only on native <select>; custom dropdowns need click-to-open-then-click.
.hover() reveals hover-triggered UI; .drag_to() handles standard HTML5 drag-and-drop.
page.keyboard/page.mouse give low-level control for compound interactions (shift-click, custom drag) that convenience methods can't express.`,
    chapterNum: 14,
  },
  {
    id: "pw-15-assertions",
    title: "15. Assertions with expect()",
    minutes: 42,
    level: "intermediate",
    phase: "Part 2 · Core Interactions",
    partName: "Part 2 · Core Interactions",
    overviewText: "expect() auto-retrying assertions: to_be_visible, to_be_hidden, to_be_enabled/disabled, to_have_text, to_contain_text, to_have_value, to_be_checked, to_have_count, to_have_attribute, to_have_class, and negation with .not.",
    why: "Bare Python assert fails once on SPAs still loading. expect() re-queries and re-checks until pass or timeout — the core anti-flake mechanism.",
    when: "Read immediately after Actions. Revisit when choosing between to_have_text and to_contain_text or debugging assertion timeouts.",
    practical: { app: "Dashboard SPA", scenario: "assert page.locator('.total').text_content() == '$49.99' fails intermittently.", pass: "expect(page.locator('.total')).to_have_text('$49.99') — auto-retries until rendered.", fail: "Wrap bare assert in time.sleep(3) loop." },
    advantages: ["Auto-retry until timeout — no manual polling", "to_contain_text substring vs to_have_text exact — pick deliberately", "expect(locator).not.to_be_visible() clean negation syntax", "Soft assertions (expect.soft) collect multiple failures per test", "to_have_count() retries unlike bare .count()", "Readable failure messages show expected vs actual"],
    limitations: ["Bare assert has zero retry — fails on first async render miss", "to_have_text exact match breaks on whitespace changes", "Soft assertions need explicit handling of collected failures", "No built-in visual assertion in this chapter — see Part 4", "Regex matchers require re.compile import", "Over-specific assertions brittle on copy changes"],
    contentMarkdown: `## 15. Assertions with expect()

\`\`\`python
from playwright.sync_api import expect

expect(page.get_by_role("button", name="Submit")).to_be_visible()
expect(page.get_by_role("button", name="Submit")).to_be_enabled()
expect(page.get_by_text("Order confirmed")).to_be_visible()
expect(page.get_by_label("Email")).to_have_value("user@example.com")
expect(page.locator(".error-message")).to_have_text("Invalid password")
expect(page.locator(".cart-count")).to_have_text("3")

expect() is auto-retrying, unlike a plain Python assert.
\`\`\`

The critical distinction: expect() polls repeatedly for a few seconds (default ~5000ms, configurable) instead of checking once and failing instantly, because a real element might take a moment to appear after a click triggers an API call. This is a classic source of flaky-test elimination — the exact same philosophy as auto-waiting on actions, just applied to verification instead of interaction. A plain assert page.locator(".cart-count").text_content() == "3" checks the DOM state at that exact instant and fails immediately if the count hasn't updated yet, even if it would have updated a fraction of a second later — this is precisely the kind of unnecessary flakiness expect() was built to eliminate, and it's why expect() should be the default choice over plain assert for anything reading live page state.
to_be_visible(), to_be_enabled(), to_be_checked() assert element state.
timeout (number, ms, optional, overrides the default ~5000ms) can be raised for known-slow elements or lowered for a quick negative check. These retry repeatedly within the timeout window instead of checking once, eliminating most "not ready yet" flaky failures.
to_have_text() and to_contain_text() assert text content.
The required argument (string or regex) with to_have_text must match the full text exactly; with to_contain_text it matches as a substring; a regex works flexibly with either. Use to_contain_text when surrounding text varies (timestamps, dynamic IDs) but the key phrase is stable.
to_have_value() asserts an input's current value.
The required string argument is the exact value expected in the input. Use this after .fill() to confirm the value actually stuck — it catches input masks or validation logic silently rejecting or reformatting your input.
to_have_url(), to_have_title(), to_have_count() assert page- and collection-level state.
\`\`\`python
expect(page).to_have_url("https://example.com/dashboard")
expect(page).to_have_title("Dashboard | MyApp")
expect(page.get_by_role("listitem")).to_have_count(5)
\`\`\`


to_have_url(url) and to_have_title(title) are called on the page object itself rather than a locator, and accept a string or regex — useful for confirming navigation actually landed where expected after a click or form submit. to_have_count(count) is called on a multi-match locator and asserts the exact number of matches, retrying until the count is correct or the timeout expires — this is the auto-retrying counterpart to the plain .count() read mentioned in Chapter 13, and is the right choice whenever you're waiting for a list to finish loading to a specific size.
to_have_attribute(), to_have_class(), to_have_css(), to_have_id() assert element properties.
\`\`\`python
expect(page.get_by_role("link", name="Home")).to_have_attribute("href", "/home")
expect(page.locator(".status-badge")).to_have_class("active")
expect(page.locator(".modal")).to_have_css("display", "block")
expect(page.locator("#main-form")).to_have_id("main-form")
\`\`\`


to_have_attribute(name, value) checks a specific HTML attribute's value. to_have_class(class_name) checks the element's class list (can accept a regex for partial matching, since elements often have multiple classes). to_have_css(property, value) checks a computed CSS style value — handy for confirming a modal is actually visible (display: block) versus just present in the DOM but hidden. to_have_id(id) checks the element's id attribute directly. These are especially useful for state-driven UI (a "selected" class toggling, an aria-expanded attribute flipping) where the visible text doesn't change but an underlying property does.
to_be_empty(), to_be_focused(), to_be_editable(), to_be_in_viewport() assert additional element states.
\`\`\`python
expect(page.locator(".cart-items")).to_be_empty()
expect(page.get_by_label("Email")).to_be_focused()
expect(page.get_by_label("Notes")).to_be_editable()
expect(page.locator("#footer")).to_be_in_viewport()
\`\`\`


to_be_empty() asserts an element (commonly a container or input) has no text content or child elements. to_be_focused() asserts a specific element currently has keyboard focus — useful for confirming tab order or that a modal correctly auto-focuses its first input. to_be_editable() asserts an input is both enabled and not read-only. to_be_in_viewport() asserts the element is currently scrolled into the visible viewport, not just present somewhere on a long page — useful for confirming a "scroll to element" or "scroll into view" action actually worked.
Negation flips any assertion using expect(locator).not_to_....
\`\`\`python
expect(page.get_by_text("Error")).not_to_be_visible()
expect(page.get_by_role("button", name="Submit")).not_to_be_enabled()
\`\`\`


Every assertion method above has a not_to_... counterpart, retrying until the negative condition holds true (or timing out if it never does) rather than asserting the positive case failed just once. This matters because a naive negative check written as a plain assertion at a single point in time can pass by accident — e.g., checking an error message "is not visible" one frame before it actually appears would give a false pass. not_to_be_visible() instead keeps polling for the full timeout window to make sure the element genuinely never becomes visible, which is a meaningfully stronger and more honest check.
Soft assertions let a test keep running after a failure.
\`\`\`python
expect.soft(page.get_by_text("Name")).to_be_visible()
expect.soft(page.get_by_text("Email")).to_be_visible()
expect.soft(page.get_by_text("Phone")).to_be_visible()
# test continues even if one fails — all failures reported together at the end
\`\`\`


Normal assertions stop test execution on the first failure. expect.soft(locator) uses the same chained methods and arguments as regular expect(), but doesn't halt the test — pytest-playwright automatically collects and reports every soft-assertion failure together at the end of the test. Use this when checking several independent things in one test (e.g., verifying an entire form's fields are all present) so one missing field doesn't hide information about the other two.
Overriding the default timeout for known-slow elements.
\`\`\`python
expect(page.get_by_text("Report generated")).to_be_visible(timeout=15000)
\`\`\`


This is useful for legitimately slow operations — report generation, large file processing — where the default timeout would produce a false failure. The key discipline: only extend timeouts for elements you know are legitimately slow, never as a lazy fix for a genuinely flaky or poorly-targeted locator, since that just makes a real bug take longer to surface.`,
    customSummary: `## 15. Assertions with expect()

expect() auto-retries (~5s default) instead of checking once like plain assert — eliminates timing-based flakiness.
to_be_visible()/enabled()/checked() — state checks with configurable timeout.
to_have_text() (exact) vs to_contain_text() (substring) — use contain for text with variable parts.
to_have_value() — confirms input value stuck after .fill().
to_have_url()/to_have_title() (page-level) and to_have_count() (retrying, multi-match) — prefer to_have_count() over plain .count() when waiting on a list to settle.
to_have_attribute()/class()/css()/id() — check element properties, useful for state-driven UI.
to_be_empty()/focused()/editable()/in_viewport() — additional state checks.
Every assertion has a not_to_... negation that retries for the full timeout, avoiding false-pass timing bugs.
expect.soft() collects multiple failures without halting the test — good for checking several independent things at once.
Override timeout= only for genuinely slow elements, never to mask a flaky locator.`,
    chapterNum: 15,
  },
  {
    id: "pw-16-waits",
    title: "16. Waits & Auto-waiting",
    minutes: 35,
    level: "intermediate",
    phase: "Part 2 · Core Interactions",
    partName: "Part 2 · Core Interactions",
    overviewText: "Playwright's five actionability checks, built-in auto-waiting on actions and expect(), page.wait_for_load_state(), page.wait_for_selector(), page.wait_for_url(), and why time.sleep() is an anti-pattern.",
    why: "Understanding auto-waiting internals explains 80% of Playwright-vs-Selenium flake differences. Explicit waits are escape hatches, not defaults.",
    when: "Read when tempted to add time.sleep(). Revisit for SPA navigation timing and networkidle pitfalls.",
    practical: { app: "React SPA with client-side routing", scenario: "Test passes locally, flakes in CI after clicking nav link.", pass: "expect(page).to_have_url(re.compile(r'/dashboard')) — auto-waits for route.", fail: "time.sleep(5) after every navigation click." },
    advantages: ["Five actionability checks before every click/fill", "expect() and actions share same retry engine", "wait_for_url() handles SPA client-side routing", "wait_for_selector(state='hidden') for spinners", "Default timeout configurable globally in playwright.config", "Zero sleep needed for 90% of real-world flows"],
    limitations: ["networkidle dangerous on SPAs with persistent websockets", "wait_for_load_state('networkidle') often never resolves", "Explicit waits can mask missing assertions", "time.sleep() still tempting for beginners — always wrong", "Custom loading indicators need locator-based waits not load_state", "Race conditions still possible across multiple tabs"],
    contentMarkdown: `## 16. Waits & Auto-waiting

Playwright runs an actionability checklist before most actions.
Before performing most actions, Playwright checks that the target element is: Attached (present in the DOM at all), Visible (non-zero size, not display: none/visibility: hidden), Stable (stopped moving/animating, checked across at least two animation frames), Enabled (not disabled), and able to receive events (not covered by another element, like a loading spinner overlay). Playwright re-checks this list repeatedly until all conditions pass or the timeout is hit — this is exactly why you rarely need manual waits.
wait_for_selector() waits for an element to reach a specific state.
\`\`\`python
page.wait_for_selector(".spinner", state="hidden")   # wait for loading spinner to disappear
page.wait_for_selector(".results", state="visible")
\`\`\`


selector (string, required) is a CSS/XPath selector for the target element. state (string, optional, default "visible") can be "attached" (present in DOM regardless of visibility), "detached" (removed from DOM), "visible" (present and visibly rendered), or "hidden" (present but not visible, or removed entirely). Use this for state-based waits that plain auto-waiting doesn't cover directly — e.g., waiting for a spinner to hit "hidden" before checking the results underneath it.
wait_for_load_state() waits for a page-level loading milestone.
\`\`\`python
page.wait_for_load_state("networkidle")   # no network activity for 500ms
page.wait_for_load_state("domcontentloaded")
page.wait_for_load_state("load")
\`\`\`


state (string, optional, default "load") can be "load" (the full page load event has fired), "domcontentloaded" (HTML parsed, DOM ready, before images/styles finish), or "networkidle" (no network connections for at least 500ms). "networkidle" is handy after actions that trigger background calls with no specific element to target as a wait signal — but avoid it on pages with continuous polling (common in dashboards), since the network will never go fully idle and the wait will simply time out.
### Manual sleep() should essentially never be used.

\`\`\`python
# Avoid this:
\`\`\`

time.sleep(3)
\`\`\`python
page.click(".submit-button")

# Prefer this:
page.get_by_role("button", name="Submit").click()   # auto-waits already
\`\`\`


A hard sleep() is a lose-lose: too short and the test is flaky; too long and every run wastes time even when the app responded instantly. Auto-waiting solves both problems simultaneously. The only legitimate reasons to add explicit waits are the state-based cases above (wait_for_selector, wait_for_load_state) — never as a blanket "just in case" habit.`,
    customSummary: `## 16. Waits & Auto-waiting

Before most actions, Playwright checks: attached, visible, stable, enabled, receives events — retried until timeout.
wait_for_selector(selector, state=...) — waits for attached/detached/visible/hidden state.
wait_for_load_state(state) — "load", "domcontentloaded", "networkidle" (avoid on pages with continuous polling).
Never use time.sleep() — always too short (flaky) or too long (wastes time); rely on auto-waiting or the state-based waits above.`,
    chapterNum: 16,
  },
  {
    id: "pw-17-tabs",
    title: "17. Tabs, Windows, iFrames",
    minutes: 38,
    level: "intermediate",
    phase: "Part 2 · Core Interactions",
    partName: "Part 2 · Core Interactions",
    overviewText: "Multi-tab workflows with context.expect_page(), page.bring_to_front(), cross-origin navigation, frame_locator() for iframes, and page.frame() for direct frame access.",
    why: "Multi-tab and iframe handling is where Playwright's external-driver architecture shines over Cypress. These patterns appear in payment embeds, SSO, and document viewers.",
    when: "Read when testing links that open new tabs, payment iframes, or embedded widgets.",
    practical: { app: "HRMS with Stripe payment iframe", scenario: "Need to fill card details inside nested payment iframe.", pass: "page.frame_locator('#payment-frame').get_by_label('Card number').fill('4242...')", fail: "page.locator('#card-number') on parent page — element not found." },
    advantages: ["context.expect_page() wraps click that opens new tab", "Multiple Page objects in one context — trivial multi-tab", "frame_locator() chains like regular locators inside iframe", "Cross-origin navigation transparent — no cy.origin() ceremony", "bring_to_front() switches active tab for screenshots", "Nested iframes supported via chained frame_locator"],
    limitations: ["expect_page() must wrap the triggering click — timing critical", "Deeply nested iframes slow and fragile", "Third-party iframe content may block automation (CAPTCHA)", "Popup blockers can prevent new tab tests in headed mode", "frame() by name/url less stable than frame_locator by selector", "Safari WebKit iframe behavior differs slightly from Chromium"],
    contentMarkdown: `## 17. Tabs, Windows, iFrames

\`\`\`python
page.context.expect_page() captures a newly opened tab.
with page.context.expect_page() as new_page_info:
    page.get_by_role("link", name="Open in new tab").click()
\`\`\`


new_page = new_page_info.value
\`\`\`python
new_page.wait_for_load_state()
print(new_page.title())
\`\`\`


Used as a context manager (with page.context.expect_page() as info:), with info.value (accessed after the block) giving the new Page object. This pattern registers the listener for the new-page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it — registering after the click risks missing the event entirely.
Multiple pages are addressed independently — there's no "switch to window" step.
\`\`\`python
original_page.bring_to_front()   # optional — brings a page to the foreground visually
new_page.get_by_role("button", name="Confirm").click()
\`\`\`


Once you have references to multiple pages, you simply call actions on whichever page object represents the tab you want. There's no driver.switch_to.window()-style concept like Selenium's, since each Page object is independently addressable at all times. .bring_to_front() takes no parameters and is mostly cosmetic for headed debugging — it's not required to interact with a background tab programmatically.
\`\`\`python
page.frame_locator() scopes locators inside an iframe.
frame = page.frame_locator("#payment-iframe")
frame.get_by_label("Card number").fill("4242 4242 4242 4242")
frame.get_by_role("button", name="Pay").click()
\`\`\`


selector (string, required) is a CSS selector identifying the iframe element itself, not its contents. This is required any time content lives inside an <iframe>, and chains cleanly for nested iframes: .frame_locator("#outer").frame_locator("#inner"). A common real-world case: third-party payment widgets (Stripe, PayPal) are almost always embedded via iframe for security/PCI-compliance reasons, so this pattern comes up constantly in checkout-flow testing.`,
    customSummary: `## 17. Tabs, Windows, iFrames

page.context.expect_page() (context manager) captures a new tab — must wrap the triggering action to avoid a race condition.
No "switch to window" step — every Page object is independently addressable; .bring_to_front() is just cosmetic.
page.frame_locator(selector) scopes locators inside an iframe; chainable for nested iframes. Common for payment widgets (Stripe/PayPal).`,
    chapterNum: 17,
  },
  {
    id: "pw-18-files",
    title: "18. File Uploads & Downloads",
    minutes: 32,
    level: "intermediate",
    phase: "Part 2 · Core Interactions",
    partName: "Part 2 · Core Interactions",
    overviewText: "set_input_files() for uploads (single, multiple, directory), expect_download() for capturing downloads, and verifying suggested_filename and save_as().",
    why: "File upload/download flows appear in HRMS document modules, expense receipts, and export features — common interview and real-project scenarios.",
    when: "Read when testing CSV import, profile photo upload, or PDF export download.",
    practical: { app: "HRMS document upload", scenario: "Upload employee CSV and verify import confirmation.", pass: "page.set_input_files('input[type=file]', 'fixtures/employees.csv') then expect success message.", fail: "Try to type file path into a text input instead of using file chooser." },
    advantages: ["set_input_files() bypasses OS file dialog — headless-safe", "Multiple files via list argument", "Directory upload with path to folder", "expect_download() captures without disk clutter", "save_as() writes to specific path for content verification", "Works identically in headed and headless CI"],
    limitations: ["Drag-and-drop file upload needs separate evaluate() approach", "Custom file-picker UI may hide real input[type=file]", "Large files slow upload tests — use small fixtures", "Download path permissions differ across CI agents", "Some browsers prompt on download — expect_download handles it", "Cloud storage direct-upload flows bypass input[type=file]"],
    contentMarkdown: `## 18. File Uploads & Downloads

.set_input_files() sets files on an input directly, bypassing the OS picker.
\`\`\`python
page.get_by_label("Upload resume").set_input_files("resume.pdf")
page.get_by_label("Attach files").set_input_files(["file1.png", "file2.png"])
page.get_by_label("Upload resume").set_input_files([])  # clear selection
\`\`\`


paths accepts a single string path (uploads one file), a list of string paths (uploads multiple, if the input supports it), or an empty list (clears the current selection). This works even on hidden file inputs — a styled "Upload" button triggering a hidden <input type="file"> — with no OS-level file-picker automation needed at all, since it sets the value directly on the element.
\`\`\`python
page.expect_download() captures a triggered file download.
with page.expect_download() as download_info:
    page.get_by_role("button", name="Download report").click()

download = download_info.value
print(download.suggested_filename)
download.save_as("/path/to/save/report.pdf")
\`\`\`


Used as a context manager, with info.value giving the Download object after the block. As with new-tab handling, this must wrap the triggering click, for the same race-condition reasoning as expect_page(). download.save_as(path) takes a required destination string path; download.suggested_filename is a read-only string property exposing the browser's suggested filename. Check suggested_filename to assert naming logic, and save + inspect contents when you need to verify actual file data, not just that a download happened.`,
    customSummary: `## 18. File Uploads & Downloads

.set_input_files(paths) sets file(s) directly on an input — works even on hidden inputs, no OS picker needed; empty list clears selection.
page.expect_download() (context manager) captures a download — must wrap the triggering click.
download.save_as(path) saves the file; download.suggested_filename exposes the browser's suggested name for naming-logic checks.`,
    chapterNum: 18,
  },
  {
    id: "pw-19-dialogs",
    title: "19. Alerts, Dialogs, Popups",
    minutes: 35,
    level: "intermediate",
    phase: "Part 2 · Core Interactions",
    partName: "Part 2 · Core Interactions",
    overviewText: "Native alert/confirm/prompt handling with page.on('dialog') and page.once('dialog'), dialog.accept()/dismiss(), dialog.message assertions, and distinguishing native dialogs from ARIA modal components.",
    why: "Confusing native window.alert() with React modal components is a top beginner mistake. Each requires completely different handling.",
    when: "Read when testing delete confirmations, legacy admin tools with prompt(), or custom modal dialogs.",
    practical: { app: "Admin panel with delete confirmation", scenario: "Delete button triggers confirm() — test times out.", pass: "page.once('dialog', lambda d: d.accept()) registered BEFORE click.", fail: "Try page.get_by_role('button', name='OK') on native confirm dialog." },
    advantages: ["page.once() auto-unregisters after one dialog — safer default", "dialog.message readable for assertion before accept", "dialog.accept('text') handles prompt() input", "Handler must register before trigger — forces correct test order", "Custom modals use normal get_by_role('dialog') — clean separation", "Works for alert, confirm, and prompt dialog types"],
    limitations: ["Missing handler blocks page forever — cryptic timeout", "page.on() persists — stale handler fires on wrong dialog", "Native dialogs block all JS — cannot inspect with normal locators", "Multiple sequential dialogs need careful handler management", "beforeunload dialogs require special accept handling", "Modern apps rarely use native dialogs — modals dominate"],
    contentMarkdown: `## 19. Alerts, Dialogs, Popups

Native dialogs block JavaScript execution until a handler responds.
\`\`\`python
page.on("dialog", lambda dialog: dialog.accept())
page.get_by_role("button", name="Delete account").click()  # triggers confirm()
\`\`\`


Native browser dialogs (alert(), confirm(), prompt()) block all further JavaScript execution until dismissed. page.on("dialog", handler) registers a persistent listener that fires whenever a native dialog appears — "dialog" (string, required) is the event name, and handler (function, required) receives the dialog object as its argument. This must be registered before the triggering action, or the dialog blocks the page indefinitely and your test times out waiting.
Accepting, dismissing, and reading dialogs.
\`\`\`python
page.on("dialog", lambda dialog: dialog.accept())
page.on("dialog", lambda dialog: dialog.dismiss())
page.on("dialog", lambda dialog: dialog.accept("my input text"))

def handle_dialog(dialog):
    print(dialog.message)   # e.g., "Are you sure you want to delete this?"
    dialog.accept()

page.on("dialog", handle_dialog)
\`\`\`


dialog.accept(prompt_text=None) clicks OK; prompt_text (string, optional) only applies to prompt() dialogs and supplies the "typed" input value. dialog.dismiss() clicks Cancel and takes no parameters. Exactly one of accept/dismiss must be called per dialog, or the page stays blocked indefinitely. dialog.message is a read-only string property exposing the dialog's displayed text, useful to log or branch on — e.g., accepting only if the confirm text matches an expected pattern, otherwise failing intentionally.
\`\`\`python
page.on() is persistent for the whole session; page.once() fires only once.
page.on("dialog", handler) stays registered for every dialog for the rest of the page's session. page.once("dialog", handler) uses the same signature but auto-unregisters itself after firing a single time — use this when you expect (and want to handle) only one dialog occurrence rather than every dialog that might appear afterward.
\`\`\`

Cookie management lets you inspect, set, and clear session state directly.
\`\`\`python
cookies = page.context.cookies()
print(cookies)

page.context.add_cookies([{
\`\`\`

    "name": "session_token",
    "value": "abc123",
    "domain": "example.com",
    "path": "/"
}])

\`\`\`python
page.context.clear_cookies()
\`\`\`


page.context.cookies() returns the current list of cookies for the context, each as a dictionary with fields like name, value, domain, path, and expiry. page.context.add_cookies([...]) injects one or more cookies directly, without going through a login UI flow at all — each dictionary needs at minimum name, value, and either url or both domain/path. page.context.clear_cookies() removes all cookies from the context. The practical value here is significant: instead of driving a full login form through the UI at the start of every single test (slow, and coupling every test to the login flow's own stability), you can programmatically inject a valid session cookie once and land directly on an authenticated page — this ties directly into the storage-state/session-reuse pattern covered later in Part 3 (Configuration Management) and Part 4 (Authentication & Session Reuse).
\`\`\`python
page.evaluate() runs raw JavaScript at the page level.
page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

user_agent = page.evaluate("() => navigator.userAgent")

page.evaluate("(msg) => console.log(msg)", "hello from Playwright")
\`\`\`


Unlike the locator-scoped .evaluate() from Chapter 13 (which runs JS against a specific matched DOM element), page.evaluate(js) runs arbitrary JavaScript in the context of the whole page — no element required. This is useful for page-level actions with no dedicated Playwright API: scrolling to the bottom of an infinite-scroll page, reading a global JS variable the app exposes (feature flags, app version), or manipulating localStorage/sessionStorage directly. It optionally accepts a second argument passed into the JS function as a parameter, as shown in the third example. As with the locator-level version, this is an escape hatch — reach for it when Playwright's own API genuinely doesn't cover what you need, not as a default way of interacting with the page.`,
    customSummary: `## 19. Alerts, Dialogs, Popups

Native dialogs (alert/confirm/prompt) block JS until handled — register page.on("dialog", handler) before the triggering action.
dialog.accept(prompt_text=None) / dialog.dismiss() — exactly one must be called per dialog; dialog.message exposes its text.
page.once("dialog", ...) auto-unregisters after one use, vs page.on() which persists for the session.
Cookie management: page.context.cookies(), add_cookies([...]), clear_cookies() — lets you inject a session directly instead of driving login UI every test (ties into Part 4's session reuse).
page.evaluate(js) runs raw JS at the page level (no element needed) — for scrolling, reading globals, or localStorage access; an escape hatch, not a default tool.`,
    chapterNum: 19,
  },
];
