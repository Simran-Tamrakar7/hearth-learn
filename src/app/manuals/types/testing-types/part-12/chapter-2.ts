import type { ChapterRecord } from "../../../types";

/** Dynamic Testing */
export const chapter = {
  "id": "tt-dynamic-testing",
  "overlayNo": 46,
  "title": "Dynamic Testing",
  "minutes": 20,
  "level": "beginner",
  "phase": "Part 12 · Code Quality, Techniques & Visual UI",
  "partName": "Part 12 · Code Quality, Techniques & Visual UI",
  "overviewText": "Dynamic testing evaluates an application by actually executing it with real inputs and observing real outputs and behavior — the umbrella category covering nearly every testing type elsewhere in this manual that involves running the software, in direct contrast to static testing's code-only, no-execution approach.",
  "why": "Static testing can catch a real class of issues before execution, but it fundamentally cannot verify that the application actually behaves correctly for a real user — that requires actually running it. Dynamic testing is where functional correctness, real performance, real user experience, and real integration between components are all ultimately proven, since no amount of code review alone can substitute for observing the actual running system.",
  "when": "Throughout the entire testing process, essentially anywhere the application is actually running and being interacted with — this chapter names the category rather than introducing a new activity, since functional, system, performance, and most other chapters in this manual are all forms of dynamic testing.",
  "practical": {
    "app": "HRMS Leave Balance Function (Dynamic Execution)",
    "scenario": "The same calculateRemainingLeave() function from Chapter 45's static example is dynamically tested by actually calling it with real employee data across a range of scenarios.",
    "pass": "Re-running the same dynamic test with a zero balance now correctly returns a blocked request, verified by actually executing the function rather than just reading it.",
    "fail": "Calling the function with a leave balance of exactly zero returns a negative number instead of correctly blocking the request — a runtime behavior bug that static analysis, which only reviewed the code's structure, never caught since the code was syntactically fine."
  },
  "advantages": [
    "The only way to verify actual runtime behavior — no amount of code review substitutes for observing the real running system",
    "Directly validates the real user experience, network requests, and database transactions",
    "Covers the vast majority of meaningful testing activity, since most bugs that matter to users only manifest at runtime",
    "Encompasses nearly every specific testing type covered elsewhere in this manual"
  ],
  "limitations": [
    "Requires a running, executable application and configured test environment — cannot be done from source alone",
    "Slower and more resource-intensive than static analysis",
    "Test coverage depends strictly on which scenarios are executed — unexecuted execution paths remain untested",
    "Best paired with static testing rather than used in isolation"
  ],
  "tools": [
    {
      "name": "Playwright Dynamic Test Engine",
      "sub": "Cross-Browser Dynamic Runtime Execution Framework",
      "url": "https://playwright.dev",
      "seeChapter": 6,
      "desc": "Automates dynamic testing directly (see Chapter 6 and Chapter 36) — driving a real, running browser through real interactions and observing real resulting behavior, the defining characteristic of dynamic testing.",
      "adv": [
        "Interacts with real DOM nodes, WebSockets, cookies, and local storage",
        "Asserts live network responses and dynamic client-side state transitions"
      ],
      "lim": [
        "Requires compiled and running frontend/backend servers"
      ],
      "steps": [
        {
          "t": "Step 1 — Execute live browser interaction script",
          "p": "Drive real browser session through leave submission workflow.",
          "c": "await page.goto('http://localhost:3000/dashboard');\nawait page.click('#apply-leave-btn');\nawait page.fill('#days-input', '0');\nawait page.click('#submit-btn');"
        },
        {
          "t": "Step 2 — Assert runtime error handling and DOM validation",
          "p": "Confirm application dynamically blocks 0-day submission with visible toast error.",
          "c": "await expect(page.locator('.toast-error')).toHaveText('Leave days must be at least 1');\nawait expect(page.locator('#leave-balance')).toHaveText('10 Days Remaining');"
        }
      ]
    },
    {
      "name": "Selenium WebDriver",
      "sub": "Industry Standard Browser Automation Protocol",
      "url": "https://www.selenium.dev",
      "seeChapter": 6,
      "desc": "Drives real browsers across native operating systems (see Chapter 6) executing dynamic test assertions against live web applications.",
      "adv": [
        "W3C standard WebDriver protocol supported across all major browsers",
        "Direct multi-language bindings for Java, Python, C#, and Ruby"
      ],
      "lim": [
        "Requires external driver binaries (chromedriver, geckodriver)"
      ],
      "steps": [
        {
          "t": "Step 1 — Launch WebDriver instance and navigate to target",
          "p": "Initialize browser driver and execute dynamic HTTP request.",
          "c": "WebDriver driver = new ChromeDriver();\ndriver.get(\"https://hrms.internal/login\");"
        },
        {
          "t": "Step 2 — Execute dynamic form interaction",
          "p": "Interact with live DOM elements and assert page title change.",
          "c": "driver.findElement(By.id(\"username\")).sendKeys(\"admin\");\ndriver.findElement(By.id(\"submit\")).click();\nassertEquals(\"Dashboard\", driver.getTitle());"
        }
      ]
    }
  ],
  "contentMarkdown": "## Live Runtime Execution & Boundary Assertion\n\nExecute running application binaries stimulating real boundary conditions and validating HTTP state transitions.\n\n```\nnpx playwright test tests/dynamic/leave-boundary.spec.ts\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
