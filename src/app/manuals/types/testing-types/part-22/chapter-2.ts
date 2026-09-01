import type { ChapterRecord } from "../../types";

/** Cookie / Session Testing */
export const chapter = {
  "id": "tt-cookie-session-testing",
  "overlayNo": 86,
  "title": "Cookie / Session Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 22 · Content, Session, OO & PWA",
  "partName": "Part 22 · Content, Session, OO & PWA",
  "overviewText": "Cookie and session testing verifies that an application creates, stores, expires, and secures cookies and session data correctly — checking session-related security flags, timeout behavior, and consistency across tabs/devices for the same logged-in user, an area with both functional and genuine security implications.",
  "why": "Session handling sits directly at the intersection of usability and security — a session that expires too aggressively frustrates legitimate users, one that never expires or is missing basic security flags creates a genuine attack surface, and inconsistent behavior across multiple open tabs or devices for the same user can produce confusing, hard-to-reproduce bugs. Cookie/session testing is what deliberately verifies this specific, easy-to-overlook layer is both usable and secure, rather than left as an unverified assumption sitting underneath every other feature in the application.",
  "when": "Whenever authentication or session-handling logic is built or changed — checked specifically, since session bugs are often invisible during normal single-tab, single-session functional testing and only surface under multi-tab or extended-duration conditions.",
  "practical": {
    "app": "HRMS Admin Session Timeout",
    "scenario": "An admin's Bizlevate session is inspected in Chrome DevTools after logging in, and the configured 30-minute idle timeout is tested directly.",
    "fail": "The session cookie is missing the Secure flag entirely, meaning it could theoretically be transmitted over an unencrypted connection, and manually waiting past the configured 30-minute timeout shows the admin dashboard remains fully interactive with no re-authentication prompt at all — the timeout is configured but never actually enforced.",
    "pass": "The Secure flag is added to the session cookie and the timeout is correctly wired to force re-authentication after 30 minutes of inactivity; re-testing both in DevTools confirms the flag is present and the timeout is now genuinely enforced.",
    "passLabel": "Pass (after fix)"
  },
  "advantages": [
    "Confirms session tokens are handled with appropriate security flags, directly reducing a real attack surface",
    "Free and built directly into the browser — no extra tooling or setup required",
    "Catches session-timeout and multi-tab consistency bugs that standard single-session functional testing naturally misses",
    "Manually tampering with the cookie is a cheap, immediate way to verify graceful handling of an invalid/expired session"
  ],
  "limitations": [
    "DevTools inspection is inherently manual, tab-by-tab — not easily automated at scale without additional scripting",
    "Verifying long-timeout behavior (e.g. an 8-hour session expiry) realistically can require genuinely waiting, or manually manipulating the system clock/cookie",
    "Doesn't cover server-side session storage/validation logic directly — only what's observable from the client side",
    "Security flag correctness (Secure, HttpOnly) is necessary but not sufficient on its own for full session security; it's one check among several"
  ],
  "tools": [
    {
      "name": "Chrome DevTools",
      "sub": "Application → Cookies",
      "url": "https://developer.chrome.com/docs/devtools",
      "seeChapter": 18,
      "desc": "Built directly into Chrome at no cost — the Application panel gives direct visibility into every cookie the application sets, including its security-relevant flags, letting session behavior be inspected and verified with no additional tooling required.",
      "adv": [
        "Security flags on the session token, for free",
        "No extra tooling — already in the browser",
        "Catches timeout and multi-tab bugs single-tab tests miss",
        "Tampering with the cookie checks invalid-session handling"
      ],
      "lim": [
        "Manual, tab-by-tab — not easy at scale",
        "Long timeouts may need clock/cookie manipulation",
        "Client-side only — not server session storage",
        "Secure/HttpOnly is necessary, not sufficient"
      ],
      "steps": [
        {
          "t": "Step 1 — Application panel → Cookies",
          "p": "For the target site, after login."
        },
        {
          "t": "Step 2 — Inspect security flags",
          "p": "Secure and HttpOnly set as expected for a session token."
        },
        {
          "t": "Step 3 — Check expiry vs intended timeout",
          "p": "Cookie expiry matches the designed session duration."
        },
        {
          "t": "Step 4 — Second tab, same user",
          "p": "Session consistent — or the intended \"log out everywhere\" behavior."
        },
        {
          "t": "Step 5 — Wait or simulate timeout",
          "p": "Logout or re-auth prompt; not a silent failure."
        },
        {
          "t": "Step 6 — Delete or edit the cookie",
          "p": "Invalid session handled gracefully, not an unexpected error."
        }
      ]
    }
  ],
  "contentMarkdown": "## Flags, second tab, timeout, tamper\n\nApplication panel → Cookies.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
