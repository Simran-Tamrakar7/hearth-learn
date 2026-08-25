/** Chapter body for /manuals/mobile-testing. Listing/status: ../_registry.ts */
export const pathwiseManual = {
  "id": "mobile-testing",
  "title": "Mobile Testing",
  "tagline": "Phones aren’t small desktops — gestures, networks, and interrupts change everything.",
  "category": "quality",
  "accent": "#0F5C4C",
  "cover": "covers/test-automation-cover.png",
  "duration": "2–4 weeks",
  "levelSpan": "Beginner → Intermediate",
  "who": "QA covering iOS/Android apps or responsive web on real devices.",
  "outcomes": [
    "Build a mobile test matrix that isn’t “every phone ever”",
    "Catch gesture, interrupt, and offline bugs",
    "Know when to automate vs explore on device"
  ],
  "chapters": [
    {
      "id": "mob-matrix",
      "kind": "guide",
      "phase": "Start",
      "level": "beginner",
      "title": "Devices, OS, and risk",
      "minutes": 25,
      "overview": "You can’t test every device. You can cover risk: top OS versions, screen sizes, and fragile flows.",
      "learn": [
        "Risk-based matrix",
        "Emulator vs real device",
        "WebView traps"
      ],
      "steps": [
        {
          "title": "Draft a matrix",
          "body": "Rows: flows. Columns: OS/device class. Mark must / nice / skip.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Publish a one-page matrix for your product.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Matrix drafted",
        "Must-cover devices named"
      ],
      "durationLabel": null,
      "parentId": null,
      "overviewText": "You can’t test every device. You can cover risk: top OS versions, screen sizes, and fragile flows.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mob-gestures",
      "phase": "A · Real conditions",
      "level": "beginner",
      "title": "Gestures & layout",
      "minutes": 30,
      "overview": "Touch targets, safe areas, rotation, and scroll physics. Desktop thinking fails here.",
      "learn": [
        "Hit targets",
        "Orientation",
        "Safe areas"
      ],
      "steps": [
        {
          "title": "Fat finger pass",
          "body": "Use the app one-handed. Note cramped controls and accidental taps.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "File one touch-target defect or confirm none on key screens.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "One-handed pass done",
        "Rotation checked on key screens"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Touch targets, safe areas, rotation, and scroll physics. Desktop thinking fails here.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mob-network",
      "phase": "A · Real conditions",
      "level": "intermediate",
      "title": "Network, battery, interrupts",
      "minutes": 35,
      "overview": "Airplane mode, flaky LTE, incoming calls, backgrounding — reality for users.",
      "learn": [
        "Offline UX",
        "App switch resume",
        "Permission prompts"
      ],
      "steps": [
        {
          "title": "Chaos lite",
          "body": "Kill network mid-flow. Background during upload. Deny a permission.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Log three outcomes with expected vs actual.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Offline behavior noted",
        "Background resume checked"
      ],
      "durationLabel": null,
      "kind": "chapter",
      "parentId": null,
      "overviewText": "Airplane mode, flaky LTE, incoming calls, backgrounding — reality for users.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "practice": null,
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    },
    {
      "id": "mob-cp",
      "kind": "checkpoint",
      "phase": "B · Ship confidence",
      "level": "intermediate",
      "title": "Checkpoint: mobile smoke",
      "minutes": 40,
      "durationLabel": "Gate",
      "overview": "Run a release smoke on one real device + one emulator: install, login, core flow, interrupt, offline.",
      "learn": [
        "Smoke packaging"
      ],
      "steps": [
        {
          "title": "Execute & report",
          "body": "Pass/fail table. Screenshots for fails. Device details at top.",
          "learnMore": null,
          "image": null,
          "resources": [],
          "quiz": null,
          "tryIt": null,
          "doThis": "Ship the smoke report.",
          "tip": null,
          "code": null,
          "codeTitle": null,
          "items": null,
          "callout": null,
          "aside": null
        }
      ],
      "checklist": [
        "Real device covered",
        "Interrupt + offline covered",
        "Report done"
      ],
      "practice": {
        "title": "Smoke day",
        "brief": "Complete the checkpoint on staging or a public demo app."
      },
      "parentId": null,
      "overviewText": "Run a release smoke on one real device + one emulator: install, login, core flow, interrupt, offline.",
      "why": null,
      "when": null,
      "practical": null,
      "tools": [],
      "links": [],
      "citations": [],
      "resources": [],
      "note": null,
      "partIntro": null
    }
  ],
  "resources": {
    "docs": [
      {
        "name": "Android testing docs",
        "url": "https://developer.android.com/training/testing"
      },
      {
        "name": "XCTest",
        "url": "https://developer.apple.com/documentation/xctest"
      }
    ],
    "tools": [
      "BrowserStack / Sauce (optional)",
      "Android Emulator",
      "Xcode Simulator"
    ],
    "books": [],
    "practice": [],
    "videos": []
  }
};
