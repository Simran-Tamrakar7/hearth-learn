import type { ChapterRecord } from "../../../types";

/** GUI Testing */
export const chapter = {
  "id": "tt-gui-testing",
  "overlayNo": 47,
  "title": "GUI Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 12 · Code Quality, Techniques & Visual UI",
  "partName": "Part 12 · Code Quality, Techniques & Visual UI",
  "overviewText": "GUI testing verifies the graphical user interface itself — buttons, forms, menus, layout, visual elements, and their interactive behavior — checking that what's rendered looks and behaves correctly, distinct from testing the underlying business logic those UI elements happen to trigger.",
  "why": "The UI is what a user actually sees and touches, and a perfectly correct backend can still fail a real user if a button is misaligned, a dropdown doesn't open, a form field doesn't accept expected input, or a modal fails to close — none of which necessarily reflects a business logic bug at all, just a UI-layer defect. GUI testing focuses specifically on this visible, interactive surface, which is exactly where most real users spend all of their attention.",
  "when": "Throughout UI development, on every new screen or component, and again during full regression passes before release — particularly important after any UI framework upgrade, redesign, or styling change, since these can silently break visual or interactive elements without touching any underlying logic at all.",
  "practical": {
    "app": "HRMS Leave Request Submit Button",
    "scenario": "A GUI test both clicks the 'Submit' button (functional) and visually snapshots the button's appearance (visual) after a recent styling update.",
    "pass": "The button's contrast is corrected, the visual snapshot matches an updated approved baseline, and both the functional click and visual appearance are confirmed correct together.",
    "fail": "The button correctly submits the form, but the visual snapshot shows it's now rendered in a low-contrast gray-on-gray color scheme following a recent style change — technically functional, but visually broken in a way only the visual comparison catches."
  },
  "advantages": [
    "Directly verifies the exact surface real users interact with and judge the product by",
    "Applitools' visual AI meaningfully reduces false positives compared to simple pixel-diff comparisons",
    "Selenium/Playwright interaction testing catches functional GUI defects (unresponsive buttons, broken dropdowns)",
    "Can be automated and run continuously in CI pipelines"
  ],
  "limitations": [
    "Purely functional GUI tests won't catch visual-only issues like misaligned text that is still clickable",
    "Applitools free tier limits visual checkpoints/snapshots available per month",
    "GUI tests require more maintenance than API tests as visual design evolves",
    "Doesn't evaluate whether the GUI is intuitive — that is Usability Testing's scope (Chapter 12)"
  ],
  "tools": [
    {
      "name": "Selenium GUI Driver",
      "sub": "Functional DOM & Interactive Element Automation",
      "url": "https://www.selenium.dev",
      "seeChapter": 6,
      "desc": "Automates interaction with GUI elements directly (see Chapter 6) — clicking buttons, filling forms, opening menus — verifying they respond correctly to real interaction, the core of functional GUI testing.",
      "adv": [
        "Simulates real user mouse clicks, keyboard strokes, drag-and-drop, and hover interactions",
        "Explicit WebDriverWait handles dynamic AJAX element rendering smoothly"
      ],
      "lim": [
        "Does not detect visual color contrast or layout misalignment issues on its own"
      ],
      "steps": [
        {
          "t": "Step 1 — Locate and interact with GUI dropdown components",
          "p": "Select option from interactive leave type dropdown menu.",
          "c": "WebElement dropdown = driver.findElement(By.id(\"leave-type-select\"));\nSelect select = new Select(dropdown);\nselect.selectByVisibleText(\"Annual Leave\");"
        },
        {
          "t": "Step 2 — Verify modal dialog opens and closes smoothly",
          "p": "Click trigger and assert modal overlay visibility in the DOM.",
          "c": "driver.findElement(By.id(\"open-policy-modal\")).click();\nWebElement modal = wait.until(ExpectedConditions.visibilityOfElementLocated(By.id(\"policy-modal\")));\nassertTrue(modal.isDisplayed());"
        }
      ]
    },
    {
      "name": "Applitools Eyes",
      "sub": "AI-Powered Visual GUI & Contrast Validation",
      "url": "https://applitools.com",
      "desc": "An AI-powered visual testing platform that goes beyond functional interaction to compare how a UI actually looks against a baseline, using visual AI to intelligently distinguish meaningful visual changes from harmless rendering noise.",
      "adv": [
        "Visual AI algorithm ignores pixel anti-aliasing noise and focuses on real human-visible discrepancies",
        "Automated cross-browser and cross-device visual layout checks in cloud Ultrafast Grid",
        "Automated WCAG color contrast compliance verification built into visual snapshots"
      ],
      "lim": [
        "Free tier limited to 100 visual checkpoints per month"
      ],
      "steps": [
        {
          "t": "Step 1 — Initialize Applitools Eyes in test suite",
          "p": "Configure API key and open visual session.",
          "c": "import { Eyes, Target } from '@applitools/eyes-playwright';\nconst eyes = new Eyes();\nawait eyes.open(page, 'HRMS App', 'Leave Form GUI Check');"
        },
        {
          "t": "Step 2 — Capture visual snapshot of interactive form",
          "p": "Check entire DOM snapshot against AI baseline.",
          "c": "await page.goto('/leave/apply');\nawait eyes.check('Apply Leave Form Initial View', Target.window().fully());\nawait eyes.close();"
        },
        {
          "t": "Step 3 — Review AI visual diff in Applitools dashboard",
          "p": "Inspect highlighted color contrast defect on primary CTA button.",
          "c": "Dashboard:\n- Flagged Defect: Submit button contrast ratio 2.1:1 (Fails WCAG AA minimum 4.5:1)\n- Action: Update button background from #CCCCCC to #1C2A26 -> Re-run -> 100% Match"
        }
      ]
    }
  ],
  "contentMarkdown": "## Interactive GUI Component Verification\n\nScript clicks, hovers, modal triggers, and form validations verifying UI responsiveness and visual appearance.\n\n```\nnpx eyes-playwright test tests/gui/components.spec.ts\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
