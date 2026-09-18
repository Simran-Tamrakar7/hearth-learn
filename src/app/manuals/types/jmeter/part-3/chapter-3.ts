import type { ChapterRecord } from "../../../types";

/** 3.3 HTTP Cookie Manager */
export const chapter = {
  "id": "jm-3-3-http-cookie-manager",
  "title": "3.3 HTTP Cookie Manager",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 3 · Configuration Elements",
  "partName": "Part 3 · Configuration Elements",
  "overviewText": "The HTTP Cookie Manager stores Set-Cookie values and reattaches them on later requests from the same thread — like a browser. Tokens in JSON still need extractors. Enable Clear cookies each iteration so loops actually re-login instead of riding a cached session.",
  "why": "Without clearing cookies, you may think you load-tested login N times while only hitting auth once per thread. Hybrid cookie + Bearer apps need both managers.",
  "when": "Any dashboard session cookie, and soak tests that loop login → work → logout.",
  "practical": {
    "app": "HRM web session after login",
    "scenario": "Login returns Set-Cookie: sessionId; later GETs must carry it; loops should re-auth.",
    "pass": "You add Cookie Manager at Thread Group, turn on Clear cookies each iteration, and still extract JWT if APIs use Bearer.",
    "fail": "You manually copy a cookie into every sampler, or leave cookies sticky across Forever loops."
  },
  "tools": [],
  "customSummary": "- Automatically captures Set-Cookie responses and reattaches them as Cookie headers on later requests — mimics real browser behavior.\n- No manual extraction needed (unlike token-based auth, which does require explicit extraction).\n- \"Clear cookies each iteration\" setting: enable for realistic multi-user simulation so each loop genuinely re-authenticates rather than reusing a cached session.\n- Policy setting rarely needs touching outside edge-case cookie-matching bugs.",
  "contentMarkdown": "## Automatic Set-Cookie handling\n\nMany web applications — including most HRM-style dashboards that maintain a logged-in session — use cookies (like a session ID) to track authentication state across requests, separately from or alongside token-based auth in headers. The HTTP Cookie Manager handles this automatically: once added to your test plan (again, usually at the Thread Group level so it covers the whole user flow), it stores any Set-Cookie headers returned by the server after a request (e.g., after login) and automatically attaches them as a Cookie header on all subsequent requests from that same thread — exactly mimicking what a real browser does silently in the background.\n\n## Cookies vs Bearer tokens\n\nThis is important to understand because it removes a step you might expect to have to do manually. If your login endpoint responds with `Set-Cookie: sessionId=abc123; Path=/`, you do not need to manually extract that cookie value and stitch it into later requests — the Cookie Manager handles it transparently, as long as it's present in the test plan and in scope for those samplers.\n\nThis is a meaningful difference from token-based auth (like the `${authToken}` Bearer pattern above), which does require explicit extraction and variable substitution, because tokens are typically returned in the JSON response body, not as a cookie header, and JMeter has no built-in \"watch the body for a token and auto-attach it\" behavior the way it does for cookies.\n\n## Clear cookies each iteration\n\nA setting worth knowing on the Cookie Manager is \"Clear cookies each iteration\", which determines whether a virtual user's cookies persist across loop iterations or get wiped clean at the start of each loop. For a realistic simulation of many different users (each looping through login → do work → logout), you typically want cookies cleared each iteration so each loop genuinely re-authenticates rather than silently reusing a stale session — otherwise you might think you're load-testing your login endpoint N times, but really only exercising it once per thread with cached cookies carrying every subsequent loop for free, which would badly understate load on your actual authentication service.\n\nThere's also a policy setting (Standard, Compatibility, RFC 2109, etc.) controlling exactly how strictly JMeter parses and matches cookies per domain/path rules — in the overwhelming majority of cases the default works fine, and you'd only dig into this if you hit a specific bug where a cookie set on one path mysteriously isn't attaching to requests on a different path of the same domain.",
  "blocks": [
    {
      "id": "jm-3-3-md-0",
      "type": "overview",
      "heading": "Automatic Set-Cookie handling",
      "content": "Many web applications — including most HRM-style dashboards that maintain a logged-in session — use cookies (like a session ID) to track authentication state across requests, separately from or alongside token-based auth in headers. The HTTP Cookie Manager handles this automatically: once added to your test plan (again, usually at the Thread Group level so it covers the whole user flow), it stores any Set-Cookie headers returned by the server after a request (e.g., after login) and automatically attaches them as a Cookie header on all subsequent requests from that same thread — exactly mimicking what a real browser does silently in the background.",
      "order": 0
    },
    {
      "id": "jm-3-3-md-1",
      "type": "overview",
      "heading": "Cookies vs Bearer tokens",
      "content": "This is important to understand because it removes a step you might expect to have to do manually. If your login endpoint responds with `Set-Cookie: sessionId=abc123; Path=/`, you do not need to manually extract that cookie value and stitch it into later requests — the Cookie Manager handles it transparently, as long as it's present in the test plan and in scope for those samplers.\n\nThis is a meaningful difference from token-based auth (like the `${authToken}` Bearer pattern above), which does require explicit extraction and variable substitution, because tokens are typically returned in the JSON response body, not as a cookie header, and JMeter has no built-in \"watch the body for a token and auto-attach it\" behavior the way it does for cookies.",
      "order": 1
    },
    {
      "id": "jm-3-3-md-2",
      "type": "overview",
      "heading": "Clear cookies each iteration",
      "content": "A setting worth knowing on the Cookie Manager is \"Clear cookies each iteration\", which determines whether a virtual user's cookies persist across loop iterations or get wiped clean at the start of each loop. For a realistic simulation of many different users (each looping through login → do work → logout), you typically want cookies cleared each iteration so each loop genuinely re-authenticates rather than silently reusing a stale session — otherwise you might think you're load-testing your login endpoint N times, but really only exercising it once per thread with cached cookies carrying every subsequent loop for free, which would badly understate load on your actual authentication service.\n\nThere's also a policy setting (Standard, Compatibility, RFC 2109, etc.) controlling exactly how strictly JMeter parses and matches cookies per domain/path rules — in the overwhelming majority of cases the default works fine, and you'd only dig into this if you hit a specific bug where a cookie set on one path mysteriously isn't attaching to requests on a different path of the same domain.",
      "order": 2
    }
  ],
  "advantages": [
    "3.3 HTTP Cookie Manager — Without clearing cookies, you may think you load-tested login N times while only hitting auth once per thread."
  ],
  "limitations": [
    "3.3 HTTP Cookie Manager is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
