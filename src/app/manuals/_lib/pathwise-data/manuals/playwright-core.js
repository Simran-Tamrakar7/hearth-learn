import { ch } from '../helpers.js'

const docs = [
  { label: 'Docs', url: 'https://playwright.dev/python/docs/locators', kind: 'Docs' },
]
const resDoc = {
  type: 'doc',
  name: 'Playwright Locators',
  url: 'https://playwright.dev/python/docs/locators',
  lang: 'EN',
  free: true,
}

/**
 * Part 2 core chapters deepened from the PDF — overrides stubs with empty bodies.
 */
export const playwrightCoreChapters = [
  ch({
    id: 'pw-2-locators',
    phase: 'Part 2 · Core Interactions',
    level: 'beginner',
    title: '5. Locators Deep Dive',
    minutes: 60,
    overview:
      'The most important chapter in the manual. Prefer user-facing locators (role, label, text) over brittle CSS/XPath so tests survive markup refactors.',
    learn: [
      'User-facing locator philosophy',
      'get_by_role / text / label / placeholder',
      'CSS/XPath as escapes',
      'Chaining, filtering, strictness',
    ],
    steps: [
      {
        title: 'Why locators are the whole game',
        aside: 'Everything else builds on this',
        body: 'This is the most important chapter in the entire manual — nearly everything else builds on writing good locators.\n\nThese are “user-facing” locators — they find elements the way a real user (or screen reader) would identify them, rather than by internal implementation details like CSS classes. This is deliberate philosophy, not just convenience: implementation details (class names, DOM structure) change often as developers refactor CSS/markup, but the role and visible text of a button rarely change. Locators built on them break far less often.',
        callout: {
          label: 'Default habit',
          tone: 'tip',
          body: 'Reach for get_by_role first. Fall back to label/placeholder/text. Use CSS/XPath only when the page gives you no accessible hook.',
        },
        quiz: {
          question: 'Preferred Playwright locator style is…',
          options: [
            'Deep XPath only',
            'User-facing get_by_role / label / text',
            'Random CSS hashes',
            'Sleep then click coords',
          ],
          answer: 1,
          explain: 'User-facing locators track how users and assistive tech see the page.',
        },
        resources: docs,
      },
      {
        title: 'get_by_role — ARIA role + accessible name',
        body: 'Finds an element by its ARIA role and optionally its accessible name. Best-practice default — matches how screen readers see the page, so it doubles as a light accessibility check.\n\nCommon roles: button, link, checkbox, textbox, heading, listitem, row. Optional name can be a string or regex (e.g. re.compile("Delete.*")). Use exact=True when substring matching is too loose. For headings, level=1..6 narrows to a specific level. For checkboxes/radios, checked=True/False filters by state.',
        codeTitle: 'Role locators',
        code: 'page.get_by_role("button", name="Submit").click()\npage.get_by_role("link", name="Home").click()\npage.get_by_role("checkbox", name="Remember me").check()\npage.get_by_role("heading", name="Dashboard", level=1)',
        tip: 'If get_by_role fails, the app may be missing accessible names — that’s a product bug worth filing, not just a test problem.',
        resources: docs,
      },
      {
        title: 'get_by_text, get_by_label, get_by_placeholder',
        body: 'get_by_text finds an element containing specific visible text. Good for non-interactive content checks (confirmation messages). Can be ambiguous when text repeats — combine with .filter() or a parent scope.\n\nget_by_label finds a form input by its associated <label> text. Requires proper label markup; if the app skips labels, this won’t work and you’ll need placeholder or CSS.\n\nget_by_placeholder finds an input by its placeholder attribute. Handy when labels are missing, but placeholders are weaker a11y signals than real labels.',
        codeTitle: 'Text, label, placeholder',
        code: 'page.get_by_text("Welcome back").is_visible()\npage.get_by_label("Email address").fill("user@example.com")\npage.get_by_placeholder("Search products...").fill("laptop")',
        resources: docs,
      },
      {
        title: 'CSS, XPath, chaining, and strictness',
        body: 'CSS and XPath still work via page.locator(...) when you must target implementation details — treat them as escapes, not defaults.\n\nChaining and filtering let you narrow: locate a section, then a button inside it. Playwright locators are strict by default when an action would hit multiple elements — that’s a feature. Tighten the locator instead of grabbing .first unless you truly mean “any of these.”\n\nLocators auto-retry until timeout while waiting for the element to become actionable — which is why good locators plus auto-waiting beat sleep-based scripts.',
        codeTitle: 'Scope a locator',
        code: 'form = page.get_by_role("form", name="Login")\nform.get_by_label("Password").fill("secret")\nform.get_by_role("button", name="Sign in").click()',
        callout: {
          label: 'Strict mode',
          tone: 'warn',
          body: 'Ambiguous locators fail loudly. Don’t silence that with .first — fix the selector.',
        },
        doThis: 'Rewrite one CSS-heavy locator in a practice site to get_by_role + name.',
        resources: docs,
      },
    ],
    checklist: [
      'I default to get_by_role',
      'I can explain when label vs placeholder is appropriate',
      'I treat strict-mode failures as locator bugs',
    ],
    practice: {
      title: 'Locator drill',
      brief: 'On a public demo site, automate login or search using only user-facing locators — no CSS classes.',
    },
    resources: [resDoc],
  }),

  ch({
    id: 'pw-2-actions',
    phase: 'Part 2 · Core Interactions',
    level: 'beginner',
    title: '6. Actions',
    minutes: 45,
    overview:
      'Click, fill, check, select, hover, keyboard — every action auto-waits for actionability before running.',
    learn: [
      'click / fill / type differences',
      'check, select_option, hover',
      'keyboard and modifier chords',
    ],
    steps: [
      {
        title: 'Clicks and fills',
        body: 'click() waits until the target is actionable, then clicks the center (or a position you specify). Prefer role/name locators so you’re clicking what the user sees.\n\nfill() clears the field and sets the value in one shot — usually what you want for forms. type() / press_sequentially() send keystrokes and are better when the app listens to individual input events.',
        codeTitle: 'Click and fill',
        code: 'page.get_by_role("button", name="Submit").click()\npage.get_by_label("Email").fill("you@example.com")',
        resources: [
          { label: 'Docs', url: 'https://playwright.dev/python/docs/input', kind: 'Docs' },
        ],
      },
      {
        title: 'Checks, selects, hover, keyboard',
        body: 'check() / uncheck() are for checkboxes and radios. select_option() works with <select> by value, label, or index. hover() is useful before menus that only appear on mouseover.\n\nkeyboard.press and locator.press cover shortcuts (Control+A, Enter). Prefer locator-targeted presses when focus matters.',
        codeTitle: 'Common actions',
        code: 'page.get_by_label("Remember me").check()\npage.get_by_label("Country").select_option(label="Nepal")\npage.get_by_role("button", name="Account").hover()\npage.get_by_placeholder("Search").press("Enter")',
        tip: 'If click flakes because something overlays the button, fix the wait for that overlay — don’t add time.sleep.',
        doThis: 'Automate a small form: fill, select, check, submit — all user-facing locators.',
        resources: [
          { label: 'Docs', url: 'https://playwright.dev/python/docs/input', kind: 'Docs' },
        ],
      },
    ],
    checklist: [
      'I know fill vs press_sequentially',
      'I can select_option by label',
      'I didn’t introduce a sleep to make a click pass',
    ],
    practice: {
      title: 'Form actions',
      brief: 'Write one test that fills a multi-field form and asserts the success message.',
    },
    resources: [
      {
        type: 'doc',
        name: 'Actions',
        url: 'https://playwright.dev/python/docs/input',
        lang: 'EN',
        free: true,
      },
    ],
  }),

  ch({
    id: 'pw-2-expect',
    phase: 'Part 2 · Core Interactions',
    level: 'beginner',
    title: '7. Assertions with expect()',
    minutes: 40,
    overview:
      'Playwright expect() auto-retries assertions until they pass or time out — pair it with locators instead of instant assert.',
    learn: [
      'expect(locator).to_be_visible()',
      'Text, URL, and attribute asserts',
      'Why expect beats bare assert',
    ],
    steps: [
      {
        title: 'Retrying assertions',
        body: 'A bare assert page.title() == "…" fails immediately if the title hasn’t updated yet. expect() from playwright.sync_api keeps polling until the condition is true or the timeout expires — the same philosophy as auto-waiting for actions.\n\nUse expect on locators for visibility, text content, CSS, and attributes. Use expect(page) for URL and title.',
        codeTitle: 'expect patterns',
        code: 'from playwright.sync_api import expect\n\nexpect(page.get_by_role("heading", name="Dashboard")).to_be_visible()\nexpect(page.get_by_text("Saved")).to_be_visible()\nexpect(page).to_have_url("**/dashboard")\nexpect(page).to_have_title("Dashboard")',
        callout: {
          label: 'Habit',
          tone: 'tip',
          body: 'If you wrote assert + sleep, rewrite it as expect(...). The sleep is almost always unnecessary.',
        },
        resources: [
          { label: 'Docs', url: 'https://playwright.dev/python/docs/test-assertions', kind: 'Docs' },
        ],
      },
      {
        title: 'Useful matchers',
        body: 'to_be_visible / to_be_hidden, to_have_text / to_contain_text, to_have_value, to_be_checked, to_have_attribute, to_have_count for lists. Soft assertions exist in some runners; with pytest you’ll usually fail fast on the first expect timeout — that’s fine for learning.',
        doThis: 'Replace three raw asserts in your practice repo with expect().',
        resources: [
          { label: 'Docs', url: 'https://playwright.dev/python/docs/test-assertions', kind: 'Docs' },
        ],
      },
    ],
    checklist: [
      'I import expect from playwright.sync_api',
      'I assert visibility/text with expect, not sleep',
      'I can assert URL with expect(page)',
    ],
    practice: {
      title: 'Expect rewrite',
      brief: 'Take yesterday’s script and convert every success check to expect().',
    },
    resources: [
      {
        type: 'doc',
        name: 'Assertions',
        url: 'https://playwright.dev/python/docs/test-assertions',
        lang: 'EN',
        free: true,
      },
    ],
  }),

  ch({
    id: 'pw-2-waits',
    phase: 'Part 2 · Core Interactions',
    level: 'beginner',
    title: '8. Waits & Auto-waiting',
    minutes: 40,
    overview:
      'Actionability checklist, explicit waits for spinner/load states, and why time.sleep is a lose-lose.',
    learn: [
      'Actionability conditions',
      'wait_for_selector / wait_for_load_state',
      'Never sleep “just in case”',
    ],
    steps: [
      {
        title: 'The actionability checklist',
        body: 'Before performing most actions, Playwright runs through an actionability checklist on the target element:\n\n1. Attached — is it in the DOM at all?\n2. Visible — non-zero size, not display:none / visibility:hidden?\n3. Stable — stopped moving/animating (checked across at least two animation frames)?\n4. Enabled — not disabled?\n5. Receives events — not covered by another element (e.g., a loading spinner overlay)?\n\nPlaywright re-checks this list repeatedly until all conditions pass or the timeout is hit. This is exactly why you rarely need manual waits.',
        callout: {
          label: 'Gate concept',
          tone: 'note',
          body: 'If one idea must be rock-solid before leaving Part 2, it’s this checklist.',
        },
        resources: [
          { label: 'Docs', url: 'https://playwright.dev/python/docs/actionability', kind: 'Docs' },
        ],
      },
      {
        title: 'Explicit waits when you need them',
        body: 'Use state-based waits for cases auto-waiting doesn’t cover directly — e.g., waiting for a spinner to hit “hidden” before checking results underneath.\n\nwait_for_load_state covers load, domcontentloaded, and networkidle (no network for ~500ms). networkidle is handy after actions that trigger background calls with no specific element to target — but avoid it on pages with continuous polling (dashboards), since it’ll never go idle and will time out.',
        codeTitle: 'State waits',
        code: 'page.wait_for_selector(".spinner", state="hidden")\npage.wait_for_selector(".results", state="visible")\npage.wait_for_load_state("domcontentloaded")',
        resources: [
          { label: 'Docs', url: 'https://playwright.dev/python/docs/api/class-page', kind: 'Docs' },
        ],
      },
      {
        title: 'Avoid time.sleep',
        body: 'A hard sleep() is a lose-lose: too short and the test is flaky; too long and every run wastes time even when the app responded instantly. Auto-waiting solves both problems simultaneously. The only legitimate reasons to add explicit waits are the state-based cases above — never as a blanket “just in case” habit.',
        codeTitle: 'Prefer auto-wait',
        code: '# Avoid:\n# time.sleep(3)\n# page.click(".submit-button")\n\n# Prefer:\npage.get_by_role("button", name="Submit").click()  # auto-waits already',
        doThis: 'grep your practice repo for sleep( and delete or replace each hit.',
        resources: [
          { label: 'Docs', url: 'https://playwright.dev/python/docs/actionability', kind: 'Docs' },
        ],
      },
    ],
    checklist: [
      'I can recite the five actionability checks',
      'I know when networkidle is dangerous',
      'Zero unjustified sleeps in my practice code',
    ],
    practice: {
      title: 'Spinner wait',
      brief: 'Write a flow that waits for a loading indicator to hide, then expects results — no sleep.',
    },
    resources: [
      {
        type: 'doc',
        name: 'Actionability',
        url: 'https://playwright.dev/python/docs/actionability',
        lang: 'EN',
        free: true,
      },
    ],
  }),

  ch({
    id: 'pw-cp-core',
    phase: 'Part 2 · Core Interactions',
    kind: 'checkpoint',
    level: 'beginner',
    title: 'Checkpoint · Core Interactions',
    minutes: 25,
    overview:
      'Gate before frameworks: locators, actions, expect, and auto-waiting without sleeps.',
    learn: ['Locator defaults', 'expect fluency', 'No sleep habit'],
    steps: [
      {
        title: 'Pass criteria',
        body: 'You are ready for Part 3 when you can do all of the following on a practice site.',
        items: [
          'Automate a multi-step UI flow using only user-facing locators',
          'Assert with expect() on visibility, text, and URL',
          'Explain the actionability checklist without notes',
          'Show a grep proving no time.sleep in your suite',
        ],
        callout: {
          label: 'Honest gate',
          tone: 'warn',
          body: 'POM and pytest fixtures will not save flaky locators. Fix Part 2 before scaling structure.',
        },
      },
      {
        title: 'Self-check',
        body: 'Cold quiz before opening Part 3.',
        quiz: {
          question: 'Auto-waiting checks that an element can receive events. That mainly means…',
          options: [
            'It has a CSS id',
            'It isn’t covered by another element',
            'The browser is headed',
            'pytest collected the test',
          ],
          answer: 1,
          explain: 'Overlays/spinners block events even when the element exists in the DOM.',
        },
        doThis: 'Record a 2-minute loom of your green Part 2 flow.',
      },
    ],
    checklist: [
      'Pass criteria met',
      'Demo recorded or peer-reviewed',
      'LEARNING.md updated for Part 2',
    ],
    practice: {
      title: 'Core sign-off',
      brief: 'Paste pass criteria into LEARNING.md with links to your practice commits.',
    },
    resources: [resDoc],
  }),
]
