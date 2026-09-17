import type { ChapterRecord } from "../../../types";

/** 14.3 Newsletters */
export const chapter = {
  "id": "cy-14-3-newsletters",
  "title": "14.3 Newsletters",
  "minutes": 12,
  "level": "advanced",
  "phase": "Part 14 · Resources, Citations & Reference Library",
  "partName": "Part 14 · Resources, Citations & Reference Library",
  "overviewText": "There is no required paid Cypress newsletter. Practical subscriptions: Cypress changelog/blog RSS, Gleb's posts via RSS, Ministry of Testing, and a general JS testing digest. Newsletters that promise 'AI writes all your Cypress tests' are marketing (11.4). Playwright and Selenium also ship release notes — subscribe if you position as multi-tool (13.4).",
  "why": "Release notes tell you video defaults flipped (Cypress 13) before CI silently stops uploading MP4s.",
  "when": "Once, when setting up RSS; revisit when a major Cypress version lands.",
  "practical": {
    "app": "Bizlevate HRM",
    "scenario": "You want to hear about breaking Cypress defaults without living on Twitter.",
    "pass": "You subscribe to Cypress changelog/blog RSS and one testing community newsletter (MoT or similar).",
    "fail": "You rely on random LinkedIn carousels for API changes."
  },
  "tools": [],
  "customSummary": "- Changelog/blog RSS is the Cypress newsletter that matters.\n- Ministry of Testing / quality-engineering newsletters for process.\n- Skip AI-automation spam.\n- Playwright release notes if you keep that stack.\n- Appium/browser driver notes if you do native or Safari clouds.",
  "contentMarkdown": "## What to subscribe to\n\n- Cypress docs changelog + [Cypress blog](https://www.cypress.io/blog) via RSS or GitHub releases. This is how you learn `video` defaulted to `false` in Cypress 13 (11.8) before CI silently stops uploading MP4s.\n- [Ministry of Testing](https://www.ministryoftesting.com) — community, not vendor-locked; useful for flake culture (9.13) and career (13.4).\n- Optional: Gleb Bahmutov RSS; a general JS digest if you also own unit/CT culture.\n- Playwright release notes RSS if you keep that stack (traces, webkit).\n- Selenium / Appium release notes if you sit near Grid or native.\n\nThere is no required paid \"Cypress newsletter.\"\n\n## What to ignore\n\nDaily \"50 Cypress interview questions\" and \"AI writes all your tests\" funnels (11.4). They still say Cypress cannot do cross-origin, or that it includes visual testing natively, or that it has a Trace Viewer.\n\n## How newsletters differ by tool\n\n| Tool | What the mailing list is actually for |\n|---|---|\n| Cypress | Defaults and Cloud product; OSS APIs change slowly but *defaults* bite CI |\n| Playwright | Frequent runner/trace features — OSS changelog is the product |\n| Selenium | Driver/W3C spec drift; Grid/vendor noise |\n\nInterview line: \"I watch the Cypress changelog, not a hype newsletter. I also watch Playwright/Selenium notes so I don't invent features Cypress doesn't have.\"",
  "blocks": [
    {
      "id": "cy-14-3-md-0",
      "type": "overview",
      "heading": "What to subscribe to",
      "content": "- Cypress docs changelog + [Cypress blog](https://www.cypress.io/blog) via RSS or GitHub releases. This is how you learn `video` defaulted to `false` in Cypress 13 (11.8) before CI silently stops uploading MP4s.\n- [Ministry of Testing](https://www.ministryoftesting.com) — community, not vendor-locked; useful for flake culture (9.13) and career (13.4).\n- Optional: Gleb Bahmutov RSS; a general JS digest if you also own unit/CT culture.\n- Playwright release notes RSS if you keep that stack (traces, webkit).\n- Selenium / Appium release notes if you sit near Grid or native.\n\nThere is no required paid \"Cypress newsletter.\"",
      "order": 0
    },
    {
      "id": "cy-14-3-md-1",
      "type": "overview",
      "heading": "What to ignore",
      "content": "Daily \"50 Cypress interview questions\" and \"AI writes all your tests\" funnels (11.4). They still say Cypress cannot do cross-origin, or that it includes visual testing natively, or that it has a Trace Viewer.",
      "order": 1
    },
    {
      "id": "cy-14-3-md-2",
      "type": "overview",
      "heading": "How newsletters differ by tool",
      "content": "| Tool | What the mailing list is actually for |\n|---|---|\n| Cypress | Defaults and Cloud product; OSS APIs change slowly but *defaults* bite CI |\n| Playwright | Frequent runner/trace features — OSS changelog is the product |\n| Selenium | Driver/W3C spec drift; Grid/vendor noise |\n\nInterview line: \"I watch the Cypress changelog, not a hype newsletter. I also watch Playwright/Selenium notes so I don't invent features Cypress doesn't have.\"",
      "order": 2
    }
  ],
  "advantages": [
    "14.3 Newsletters — Release notes tell you video defaults flipped (Cypress 13) before CI silently stops uploading MP4s."
  ],
  "limitations": [
    "14.3 Newsletters is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
