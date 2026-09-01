import type { ChapterRecord } from "../../types";

/** Globalization Testing */
export const chapter = {
  "id": "tt-globalization-testing",
  "overlayNo": 76,
  "title": "Globalization Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 19 · Continuous, Interop, Conformance & Globalization",
  "partName": "Part 19 · Continuous, Interop, Conformance & Globalization",
  "overviewText": "Globalization testing verifies that an application's underlying design and codebase are actually built to support being adapted to multiple languages and regions in the first place — checking the foundation itself (no hard-coded strings, flexible layout, proper character encoding) — distinct from localization testing (Chapter 23), which checks a specific already-translated locale.",
  "why": "An application can be fully, correctly translated into a new language and still fail badly in practice if the underlying codebase was never actually built to support that — a hard-coded date format, a UI layout that assumes short English words and breaks when a translated label runs twice as long, text rendered with an encoding that can't display certain characters at all. Globalization testing catches these foundational gaps before real translation work begins, so localization efforts aren't undermined by problems baked into the code itself.",
  "when": "Early, ideally during initial design and development — retrofitting genuine globalization support into a codebase that was never built with it is significantly more expensive than building it in from the start, and this check is what verifies that foundation is actually in place before any specific locale gets built on top of it.",
  "practical": {
    "app": "HRMS Sales Pipeline Module",
    "scenario": "Bizlevate's Sales Pipeline module is scanned with i18n-ally ahead of a planned expansion into new regional markets.",
    "fail": "The scan reveals several UI labels are hard-coded directly into component files rather than pulled from a translation resource, and manually testing with lengthened placeholder text shows the \"Deal Stage\" column header overlapping adjacent columns once text length roughly doubles.",
    "pass": "The hard-coded labels are moved into proper translation resource files and the column layout is adjusted to accommodate longer text gracefully; re-running both the i18n-ally scan and the lengthened-placeholder layout check confirms the module is now genuinely ready for translation into a new locale.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Catches foundational internationalization gaps before they're compounded by actual translation and localization work built on top of them",
    "Automated string-scanning finds hard-coded text far more reliably and completely than manual code review alone",
    "Much cheaper to fix at this stage than to retrofit after the codebase has grown around the assumption of a single hard-coded language",
    "Directly de-risks future expansion into new markets, which frequently arrives later as a business requirement with a tight timeline"
  ],
  "limitations": [
    "Automated scanning for hard-coded strings can still produce false positives/negatives depending on how the codebase is structured",
    "Testing with an artificially lengthened placeholder locale approximates, but doesn't perfectly predict, how every real target language will actually behave",
    "Doesn't verify translation quality or cultural appropriateness at all — that's the separate concern of localization testing (Chapter 23)",
    "Requires genuine buy-in to fix flagged issues structurally, rather than working around them locally each time they cause a visible problem"
  ],
  "tools": [
    {
      "name": "i18n-ally",
      "sub": "Hard-coded string scan",
      "url": "https://github.com/lokalise/i18n-ally",
      "seeChapter": 23,
      "desc": "A free, open-source VS Code extension that automatically scans a codebase for hard-coded, non-internationalized strings and highlights them directly in the editor, rather than relying purely on a human reviewer to spot every instance by eye.",
      "adv": [
        "Finds hard-coded UI text more completely than review by eye",
        "Cheaper to fix before translation work starts",
        "De-risks later market expansion under a tight timeline",
        "Pairs with a lengthened-placeholder layout check"
      ],
      "lim": [
        "False positives/negatives depending on project structure",
        "Doubled strings only approximate real target languages",
        "Does not judge translation quality (Chapter 23)",
        "Needs buy-in to fix structurally, not locally each time"
      ],
      "steps": [
        {
          "t": "Step 1 — Install and point at the repo",
          "p": "i18n-ally in VS Code against the project codebase."
        },
        {
          "t": "Step 2 — Scan for hard-coded UI text",
          "p": "Strings that are not pulled from a translation resource."
        },
        {
          "t": "Step 3 — Move genuine UI copy into resources",
          "p": "Review each flag; keep non-UI strings that should stay in code."
        },
        {
          "t": "Step 4 — Lengthened placeholder locale",
          "p": "Double string length and confirm layouts do not break."
        },
        {
          "t": "Step 5 — Unicode end to end",
          "p": "Input, stored data, and rendered output — not just display text."
        },
        {
          "t": "Step 6 — Locale-aware numbers and dates",
          "p": "Formatting functions, not one region's hard-coded format."
        }
      ]
    }
  ],
  "contentMarkdown": "## Scan then lengthen\n\nMove UI copy into resources; test a doubled placeholder locale.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
