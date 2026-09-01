import type { ChapterRecord } from "../../../types";

/** Monkey Testing */
export const chapter = {
  "id": "tt-monkey-testing",
  "overlayNo": 53,
  "title": "Monkey Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "partName": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "overviewText": "Monkey testing bombards an application with random, unstructured input — random taps, random keystrokes, random navigation — generated automatically and at high volume, with no logic or intent behind any individual action, specifically to find crashes and stability issues through sheer volume rather than targeted design.",
  "why": "Some crashes only surface after an enormous number of interactions in unpredictable sequences — combinations no human tester would ever manually think to try, let alone repeat thousands of times. Monkey testing trades precision for volume: it doesn't know what it's looking for, but by generating vast quantities of random interaction, it reliably finds the kind of raw stability bugs (crashes, freezes, memory issues) that accumulate under real, chaotic, high-volume usage.",
  "when": "Particularly valuable for mobile apps before release, as a cheap, automatable stability stress-check — run for extended periods against a build to catch crashes before real, high-volume usage in the wild finds them first.",
  "practical": {
    "app": "HRMS Mobile App Stability",
    "scenario": "Android Monkey is run against the HRMS mobile app with 100,000 random events over several hours.",
    "pass": "The resource leak is fixed, and a repeat 100,000-event run completes without a crash, giving real confidence in the app's stability under sustained, unpredictable usage.",
    "fail": "The app crashes after approximately 40,000 events with an out-of-memory error, traced to a screen transition animation that wasn't properly releasing image resources on repeated rapid navigation — a leak that would only become noticeable after extensive real-world usage."
  },
  "advantages": [
    "Extremely cheap to run — zero test case design or maintenance required, just a target event count",
    "Finds real stability bugs through sheer volume that manual testing would never stumble onto",
    "Android Monkey requires zero setup beyond having the standard Android SDK installed",
    "Runs unattended overnight or in CI without ongoing manual effort"
  ],
  "limitations": [
    "Completely unstructured — cannot verify business logic or expected outputs, only raw crash stability",
    "Crashes found can be hard to reproduce since random interaction streams are not always cleanly recorded",
    "Does not test realistic user journeys — purely random clicks rarely resemble real user behavior",
    "May generate impossible UI sequences that real users would never encounter"
  ],
  "tools": [
    {
      "name": "Android Monkey (adb monkey)",
      "sub": "Built-In Android SDK Pseudo-Random Event Injector",
      "url": "https://developer.android.com/studio/test/other-testing-tools/monkey",
      "desc": "A built-in Android SDK tool that generates a specified (often very large) number of pseudo-random user events — taps, gestures, system events — directly against an app, requiring zero setup beyond having the Android SDK installed.",
      "adv": [
        "Built directly into Android OS/SDK with zero dependencies",
        "Injects thousands of touch events, keypresses, and orientation changes per minute",
        "Configurable throttle delays and seed parameters for pseudo-random repeatability"
      ],
      "lim": [
        "Confined to Android platforms (requires Appium/XCUITest for iOS)"
      ],
      "steps": [
        {
          "t": "Step 1 — Launch Android Monkey against HRMS package",
          "p": "Execute adb monkey command targeting app package with 50,000 events.",
          "c": "adb shell monkey -p com.hrms.mobile --throttle 100 -v -v -v 50000 > monkey_log.txt"
        },
        {
          "t": "Step 2 — Monitor logcat for ANRs and native crash dumps",
          "p": "Search generated log for OutOfMemoryError and NullPointerExceptions.",
          "c": "// CRASH: com.hrms.mobile (pid 14202)\n// Short Msg: java.lang.OutOfMemoryError: Failed to allocate a 32MB bitmap\n// Long Msg: java.lang.OutOfMemoryError in DashboardActivity.onTransition()"
        },
        {
          "t": "Step 3 — Reproduce and patch bitmap allocation leak",
          "p": "Release cached bitmap drawables in onDestroy() and re-run Monkey with same random seed.",
          "c": "adb shell monkey -p com.hrms.mobile -s 12345 50000 -> 0 Crashes -> STABILITY VERIFIED"
        }
      ]
    },
    {
      "name": "Appium Chaos & Monkey Scripts",
      "sub": "Cross-Platform Random UI Navigation Generator",
      "url": "https://appium.io",
      "seeChapter": 38,
      "desc": "Can be configured to generate random interaction sequences programmatically (see Chapter 38) across both iOS and Android apps.",
      "adv": [
        "Works uniformly across iOS and Android mobile applications",
        "Restricts random clicks to valid interactive elements within the DOM tree"
      ],
      "lim": [
        "Slower event generation speed compared to native adb monkey"
      ],
      "steps": [
        {
          "t": "Step 1 — Execute Appium random element traversal loop",
          "p": "Query interactive buttons and randomly click elements for 1,000 iterations.",
          "c": "const elements = await driver.$$('button, a, input');\nconst randomEl = elements[Math.floor(Math.random() * elements.length)];\nawait randomEl.click();"
        }
      ]
    }
  ],
  "contentMarkdown": "## High-Volume Unstructured Random Event Bombardment\n\nInject 50,000+ random tap, gesture, and keyboard events into mobile app runtimes auditing memory stability.\n\n```\nadb shell monkey -p com.hrms.mobile -v 50000\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
