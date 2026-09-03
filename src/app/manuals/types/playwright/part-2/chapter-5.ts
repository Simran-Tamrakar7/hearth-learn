import type { ChapterRecord } from "../../../types";

/** 17. Tabs, Windows, iFrames */
export const chapter = {
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
  tools: [],
  contentMarkdown: "## 17. Tabs, Windows, iFrames\n\n```python\npage.context.expect_page() captures a newly opened tab.\nwith page.context.expect_page() as new_page_info:\n    page.get_by_role(\"link\", name=\"Open in new tab\").click()\n```\n\n\nnew_page = new_page_info.value\n```python\nnew_page.wait_for_load_state()\nprint(new_page.title())\n```\n\n\nUsed as a context manager (with page.context.expect_page() as info:), with info.value (accessed after the block) giving the new Page object. This pattern registers the listener for the new-page event before the click happens, avoiding a race condition where the new tab opens before you started listening for it — registering after the click risks missing the event entirely.\nMultiple pages are addressed independently — there's no \"switch to window\" step.\n```python\noriginal_page.bring_to_front()   # optional — brings a page to the foreground visually\nnew_page.get_by_role(\"button\", name=\"Confirm\").click()\n```\n\n\nOnce you have references to multiple pages, you simply call actions on whichever page object represents the tab you want. There's no driver.switch_to.window()-style concept like Selenium's, since each Page object is independently addressable at all times. .bring_to_front() takes no parameters and is mostly cosmetic for headed debugging — it's not required to interact with a background tab programmatically.\n```python\npage.frame_locator() scopes locators inside an iframe.\nframe = page.frame_locator(\"#payment-iframe\")\nframe.get_by_label(\"Card number\").fill(\"4242 4242 4242 4242\")\nframe.get_by_role(\"button\", name=\"Pay\").click()\n```\n\n\nselector (string, required) is a CSS selector identifying the iframe element itself, not its contents. This is required any time content lives inside an <iframe>, and chains cleanly for nested iframes: .frame_locator(\"#outer\").frame_locator(\"#inner\"). A common real-world case: third-party payment widgets (Stripe, PayPal) are almost always embedded via iframe for security/PCI-compliance reasons, so this pattern comes up constantly in checkout-flow testing.",
  customSummary: "## 17. Tabs, Windows, iFrames\n\npage.context.expect_page() (context manager) captures a new tab — must wrap the triggering action to avoid a race condition.\nNo \"switch to window\" step — every Page object is independently addressable; .bring_to_front() is just cosmetic.\npage.frame_locator(selector) scopes locators inside an iframe; chainable for nested iframes. Common for payment widgets (Stripe/PayPal).",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
