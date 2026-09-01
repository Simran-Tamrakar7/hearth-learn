import type { ChapterRecord } from "../../../types";

/** 9. Tabs, Windows, iFrames */
export const chapter = {
  "id": "pw-2-tabs",
  "title": "9. Tabs, Windows, iFrames",
  "minutes": 40,
  "level": "intermediate",
  "phase": "Part 2 · Core Interactions",
  "partName": "Part 2 · Core Interactions",
  "overviewText": "Real applications open new tabs, pop-up windows, and embed content in iframes — especially payment widgets (Stripe, PayPal) and legacy modules. Playwright handles new tabs with page.context.expect_page() as a context manager that registers the listener before the triggering click, avoiding race conditions. Each Page object is independently addressable — no Selenium-style switch_to.window(). Iframes are scoped with page.frame_locator(selector), chainable for nested frames.",
  "why": "New-tab and iframe bugs are common in enterprise apps but absent from tutorial sites. Getting the listener registration order wrong (click before expect_page) silently misses the new tab event. Iframe content is invisible to page-level locators — tests fail with 'element not found' when the element is actually inside #payment-iframe.",
  "when": "Apply this chapter when testing 'Open in new tab' links, OAuth pop-up flows, PDF preview windows, or any embedded payment/settings widget. Revisit expect_page() race-condition pattern whenever a new-tab test passes locally (slow) but fails on CI (fast).",
  "practical": {
    "app": "E-commerce checkout — Stripe iframe",
    "scenario": "Checkout embeds Stripe card fields inside #payment-iframe. A test tries page.get_by_label('Card number') and fails — the input is in the iframe, not the top document. page.frame_locator('#payment-iframe').get_by_label('Card number').fill('4242424242424242') succeeds. A separate 'View receipt' link opens a new tab — wrapped in expect_page() before the click.",
    "pass": "Iframe fill completes; new tab captured via expect_page(); both pages independently asserted.",
    "fail": "Test clicks 'Open receipt' then calls context.pages[-1] — race misses the tab on fast CI; test passes locally, flakes in pipeline."
  },
  "advantages": [
    "expect_page() context manager eliminates new-tab race conditions by design",
    "Each Page object is independently actionable — no window handle string management",
    "frame_locator() scopes locators inside iframes with familiar get_by_role syntax",
    "Nested iframes chain: .frame_locator('#outer').frame_locator('#inner')",
    "bring_to_front() aids headed debugging without affecting programmatic interaction",
    "Multi-tab tests run in one browser context — cheaper than multiple browser launches"
  ],
  "limitations": [
    "Cross-origin iframe restrictions may block access to third-party payment frames in some configs",
    "expect_page() must wrap the triggering action — easy to forget and hard to debug",
    "Many tabs in one test increase memory usage and complexity — prefer focused tests",
    "Sandboxed iframes without accessible names need CSS selector fallbacks inside frame_locator",
    "OAuth pop-ups that are true OS windows (not browser tabs) may need different handling",
    "bring_to_front() is cosmetic — doesn't affect headless CI execution"
  ],
  "tools": [
    {
      "name": "Playwright Multi-Page & Frame API",
      "sub": "Tabs, windows, iframes",
      "url": "https://playwright.dev/python/docs/pages",
      "desc": "Playwright models each tab as a Page within a BrowserContext. page.context.expect_page() captures newly opened pages; page.expect_popup() handles popup windows. page.frame_locator(css_selector) returns a FrameLocator for scoping actions inside iframes. All locator methods (get_by_role, fill, click) work on FrameLocator identically to Page.",
      "adv": [
        "No switch_to.window() — direct Page object references",
        "Context manager pattern prevents race on fast-opening tabs",
        "FrameLocator auto-waits and strict mode apply inside frames",
        "Same API surface for page and frame locators"
      ],
      "lim": [
        "Third-party cross-origin frames may be inaccessible depending on browser security",
        "Deeply nested iframe chains become hard to read and maintain",
        "expect_page() captures browser tabs only — not separate browser processes",
        "FrameLocator requires stable iframe selector — dynamic iframe IDs need data-testid"
      ],
      "steps": [
        {
          "t": "Step 1 — Capture a new tab",
          "p": "Register listener before click:",
          "c": "with page.context.expect_page() as new_page_info:\n    page.get_by_role(\"link\", name=\"Open in new tab\").click()\nnew_page = new_page_info.value\nnew_page.wait_for_load_state()\nprint(new_page.title())"
        },
        {
          "t": "Step 2 — Interact on both pages",
          "p": "Each Page is independent:",
          "c": "original_page.get_by_role(\"button\", name=\"Continue\").click()\nnew_page.get_by_role(\"button\", name=\"Confirm\").click()"
        },
        {
          "t": "Step 3 — Scope locators inside an iframe",
          "p": "Payment widget example:",
          "c": "frame = page.frame_locator(\"#payment-iframe\")\nframe.get_by_label(\"Card number\").fill(\"4242424242424242\")\nframe.get_by_role(\"button\", name=\"Pay\").click()"
        },
        {
          "t": "Step 4 — Nested iframes",
          "p": "Chain frame_locator calls:",
          "c": "inner = page.frame_locator(\"#outer\").frame_locator(\"#inner\")\ninner.get_by_role(\"button\", name=\"Submit\").click()"
        },
        {
          "t": "Step 5 — Debug with bring_to_front",
          "p": "Headed mode only — visual focus:",
          "c": "new_page.bring_to_front()  # optional for headed debugging"
        }
      ]
    }
  ],
  "contentMarkdown": "with page.context.expect_page() as new_page_info: page.get_by_role(\"link\", name=\"Open in new tab\").click() new_page = new_page_info.value new_page.wait_for_load_state() print(new_page.title()) The with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.\n\n## Overview\n\nnew_page = new_page_info.value\n\nThe with ... expect_page() pattern registers the listener for the new page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it.\n\n```\nwith page.context.expect_page() as new_page_info:\n\npage.get_by_role(\"link\", name=\"Open in new tab\").click()\n\nnew_page.wait_for_load_state()\n\nprint(new_page.title())\n```\n\n## page.context.expect_page()\n\nWhat it does: Context manager that captures a reference to a newly opened tab/page.\n\nTypes/params:\n\nPointers: Must wrap the action that triggers the new tab — registering after the click risks missing the event.\n\nOnce you have references to multiple pages, you simply call actions on whichever page object represents the tab you want — there's no \"switch to window\" concept like Selenium's\n\ntimes.\n\n```\noriginal_page.bring_to_front()   # optional — brings a page to the foreground visually\n\nnew_page.get_by_role(\"button\", name=\"Confirm\").click()\n\ndriver.switch_to.window(), since each Page object is independently addressable at all\n```\n\n## page.bring_to_front()\n\nWhat it does: Brings a specific page/tab to the visual foreground.\n\nTypes/params: No parameters.\n\nPointers: Mostly cosmetic for headed debugging — not required to interact with a background tab programmatically.\n\nframe = page.frame_locator(\"#payment-iframe\")\n\nCommon real-world case: third-party payment widgets (Stripe, PayPal) are almost always embedded via iframe for security/PCI-compliance reasons.\n\n```\nframe.get_by_label(\"Card number\").fill(\"4242 4242 4242 4242\")\n\nframe.get_by_role(\"button\", name=\"Pay\").click()\n```\n\n## page.frame_locator(selector)\n\nWhat it does: Returns a locator scoped inside a specific iframe.\n\nTypes/params:\n\ncontents)\n\nPointers: Required any time content lives inside an <iframe>. Chain for nested iframes: .frame_locator(\"#outer\").frame_locator(\"#inner\").",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
