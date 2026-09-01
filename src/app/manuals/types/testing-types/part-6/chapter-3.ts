import type { ChapterRecord } from "../../types";

/** Localization Testing */
export const chapter = {
  "id": "tt-localization-testing",
  "overlayNo": 23,
  "title": "Localization Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 6 · Other Testing Types",
  "partName": "Part 6 · Other Testing Types",
  "overviewText": "Localization testing verifies that an application works correctly when adapted for a specific language, region, or culture — checking not just that text is translated, but that dates, currencies, number formats, text direction, and layout all behave correctly for each target locale.",
  "why": "Translation alone isn't localization — a correctly translated app can still show dates in the wrong format, truncate text that's longer in the target language than in English, mishandle currency symbols, or break layout entirely in a right-to-left language. These issues are invisible to anyone testing only in the original language, yet directly affect every user in the target locale.",
  "when": "As soon as a locale is added or planned, and again whenever UI text changes (since new strings need translation and re-verification) — checked specifically in each supported locale, not assumed to work based on the default-locale testing already done.",
  "practical": {
    "app": "HRMS Payslip Page (German locale)",
    "scenario": "The payslip page, which shows 'Net Salary' as a button label, is checked in the German locale where the translated label is significantly longer.",
    "pass": "The button is resized to accommodate longer translated text, and the layout is re-verified across all supported locales to confirm no other label overflows.",
    "fail": "'Netto-Gehalt anzeigen' overflows its button and wraps awkwardly onto two lines, overlapping the amount displayed below it."
  },
  "advantages": [
    "Catches real, user-facing localization bugs that reviewing translation files alone would miss entirely",
    "Manual locale switching requires no special tooling, just the application's existing locale settings",
    "Surfaces layout bugs (truncation, RTL mirroring) that are highly visible and damaging to trust once shipped",
    "Builds a reusable checklist per locale that scales as more languages are added"
  ],
  "limitations": [
    "Manual and time-consuming — scales linearly with the number of supported locales",
    "Requires either a native speaker or a professional translation review to properly validate — machine translation spot-checks aren't sufficient on their own",
    "Easy to miss a locale-specific edge case (an unusual date format, an uncommon currency symbol) without a native reviewer's eye",
    "Doesn't automatically re-verify itself when new strings are added — needs to be repeated on every content change"
  ],
  "tools": [
    {
      "name": "Manual Locale Switching",
      "sub": "In-App Locale & RTL Layout Verification",
      "url": "https://developer.mozilla.org/en-US/docs/Mozilla/Localization",
      "seeChapter": 5,
      "desc": "The core of localization testing is manually walking through the application (see Chapter 5) with each supported locale selected, since layout, date, and formatting issues only appear with real locale-specific data.",
      "adv": [
        "Evaluates exact pixel layout, text overflow, and line-breaking behaviors",
        "Validates date/time formatting (DD/MM/YYYY vs MM/DD/YYYY) and currency symbols",
        "Verifies Right-to-Left (RTL) mirroring for Arabic and Hebrew locales"
      ],
      "lim": [
        "Manual regression pass required whenever UI strings or layouts change"
      ],
      "steps": [
        {
          "t": "Step 1 — Switch active locale in application settings",
          "p": "Select German (de-DE), Japanese (ja-JP), and Arabic (ar-SA).",
          "c": "Locale Switch: de-DE (German) | Currency: EUR (€) | Date: DD.MM.YYYY"
        },
        {
          "t": "Step 2 — Inspect text expansion & button truncation",
          "p": "Ensure German compound nouns (e.g. Urlaubsantragsformular) do not overflow button boundaries.",
          "c": "Inspected: Button width dynamically expands with flexbox; no CSS overflow: hidden truncation"
        },
        {
          "t": "Step 3 — Validate date, time, and numeric formatting",
          "p": "Check currency separators (e.g. 1.234,56 € vs $1,234.56) and calendar weeks.",
          "c": "Formatted Output: € 4.500,00 | Date: 23.08.2026 -> Verified"
        },
        {
          "t": "Step 4 — Verify Right-to-Left (RTL) layout mirroring",
          "p": "Switch to Arabic and verify navigation menus, sidebars, and icons mirror to dir=\"rtl\".",
          "c": "Check: <html dir=\"rtl\"> correctly flips flex-direction and text-align"
        },
        {
          "t": "Step 5 — Detect untranslated raw i18n keys",
          "p": "Search DOM for missing key fallbacks (e.g. leave.request.submit_button).",
          "c": "Audit: 0 raw string keys detected in rendered HTML -> PASS"
        }
      ]
    },
    {
      "name": "Google Translate (Spot-Check Only)",
      "sub": "Sanity Verification for Translated Strings",
      "url": "https://translate.google.com",
      "desc": "Used only as a rough sanity check on translated strings, not as a translation source — to catch obviously wrong or nonsensical translations before flagging them to an actual translator for a proper review.",
      "adv": [
        "Instant spot-checking of unfamiliar languages during QA testing",
        "Detects obviously corrupted encodings or reversed translations"
      ],
      "lim": [
        "Cannot replace professional human translation or native domain review"
      ],
      "steps": [
        {
          "t": "Step 1 — Paste suspicious UI copy into Google Translate",
          "p": "Check if translated button label reflects expected action context.",
          "c": "Input (DE): 'Urlaub einreichen' -> Output (EN): 'Submit leave' (Context matches)"
        },
        {
          "t": "Step 2 — Flag ambiguous translations for native review",
          "p": "Create translation review tickets for native localization specialists.",
          "c": "Ticket: L10N-104: Review German payslip tax deduction phrasing with HR compliance"
        }
      ]
    }
  ],
  "contentMarkdown": "## Multi-Locale & RTL Validation\n\nVerify text expansion, currency/date internationalization, and Right-to-Left layout mirroring.\n\n```\nnpx playwright test --grep @l10n\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
