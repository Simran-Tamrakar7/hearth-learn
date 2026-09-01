import type { ChapterRecord } from "../../../types";

/** Progressive Web App (PWA) Testing */
export const chapter = {
  "id": "tt-pwa-testing",
  "overlayNo": 88,
  "title": "Progressive Web App (PWA) Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 22 · Content, Session, OO & PWA",
  "partName": "Part 22 · Content, Session, OO & PWA",
  "overviewText": "PWA testing verifies the specific capabilities that distinguish a Progressive Web App from an ordinary website — offline functionality via a service worker, installability to a device's home screen, and overall responsiveness and reliability — checking that the app genuinely delivers on the native-app-like experience a PWA is specifically built to promise.",
  "why": "A web application can be technically configured as a PWA (the right manifest file, a registered service worker) while still failing to actually deliver the experience that configuration promises — an \"offline\" mode that shows a blank error screen the moment connectivity drops, an install prompt that never appears or leads to a broken shortcut. PWA testing is what specifically verifies the promised capabilities genuinely work in practice, since a PWA that merely looks configured correctly but doesn't function as one offers no real advantage over an ordinary website.",
  "when": "After implementing or updating PWA-specific functionality (service worker caching logic, the web app manifest, offline handling) — tested deliberately under real offline and install conditions, not merely inferred from the presence of the correct configuration files.",
  "practical": {
    "app": "HRMS Mobile Attendance Check-In (Offline)",
    "scenario": "Bizlevate's mobile web app is tested with the network set to Offline in Chrome DevTools while attempting to view the employee's schedule.",
    "fail": "With the network disabled, the schedule screen shows a generic browser \"no internet connection\" error page instead of the app's own interface — the service worker was registered and passed Lighthouse's automated audit, but its caching logic didn't actually include the schedule data needed to render anything meaningful offline.",
    "pass": "The service worker is updated to cache the employee's most recently loaded schedule data specifically for offline access; re-testing with the network disabled now shows the last-synced schedule with a clear \"offline — showing last synced data\" indicator, instead of a broken error page.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Directly verifies the app delivers the native-app-like experience a PWA is specifically supposed to provide, not just that it's technically configured as one",
    "Free, built directly into Chrome, and requires no additional setup or tooling",
    "Gives a specific, scored, actionable checklist rather than a vague pass/fail impression",
    "Manually testing offline mode and the install flow catches gaps a passing Lighthouse score alone can miss, since the audit checks configuration more than lived experience"
  ],
  "limitations": [
    "A high Lighthouse score confirms the PWA criteria are technically met, but doesn't guarantee the offline experience is actually well-designed or usable, only that it exists",
    "Manually testing the install flow requires a real mobile device (or realistic emulation) for a fully trustworthy result",
    "Service worker caching logic can be genuinely tricky to get right, and Lighthouse won't catch every subtle caching bug (stale content served incorrectly, for instance)",
    "Offline testing only covers the specific offline scenario tested — a partially degraded connection can behave differently from a fully offline one"
  ],
  "tools": [
    {
      "name": "Lighthouse",
      "sub": "PWA audit in Chrome DevTools",
      "url": "https://developer.chrome.com/docs/lighthouse",
      "seeChapter": 41,
      "desc": "A free, automated auditing tool built directly into Chrome DevTools — runs a structured audit specifically against recognized PWA criteria (manifest correctness, service worker presence, offline behavior, installability) and returns a scored checklist of exactly what's met and what's missing.",
      "adv": [
        "Verifies the promised PWA experience, not just config files",
        "Free, built into Chrome, no extra setup",
        "Scored, actionable checklist",
        "Manual offline and install checks catch gaps the score misses"
      ],
      "lim": [
        "A high score is not a well-designed offline UX",
        "Install flow needs a real device (or solid emulation)",
        "Subtle stale-cache bugs slip past Lighthouse",
        "Fully offline ≠ a flaky partial connection"
      ],
      "steps": [
        {
          "t": "Step 1 — Lighthouse tab, PWA category",
          "p": "Run the audit in Chrome DevTools."
        },
        {
          "t": "Step 2 — Work the scored checklist",
          "p": "Address every flagged criterion the app fails."
        },
        {
          "t": "Step 3 — Network → Offline",
          "p": "App still functions or degrades gracefully — not a blank error page."
        },
        {
          "t": "Step 4 — Add to Home Screen on a real device",
          "p": "Prompt appears, installs, and launches from the icon."
        },
        {
          "t": "Step 5 — Mobile network conditions",
          "p": "PWAs are often used on variable connectivity, not only fast desktop."
        },
        {
          "t": "Step 6 — Re-audit after SW or manifest changes",
          "p": "Confirm the PWA score has not regressed."
        }
      ]
    }
  ],
  "contentMarkdown": "## Audit, then live offline and install\n\nLighthouse score is configuration; offline and home-screen are lived experience.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
