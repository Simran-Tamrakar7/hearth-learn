import type { ChapterRecord } from "../../../types";

/** 5.3 Handling Tokens and Session IDs (Login Flows) */
export const chapter = {
  "id": "jm-5-3-handling-tokens-and-session-ids-login-flows",
  "title": "5.3 Handling Tokens and Session IDs (Login Flows)",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 5 · Correlation & Dynamic Data",
  "partName": "Part 5 · Correlation & Dynamic Data",
  "overviewText": "The reusable login pattern: Login sampler (often in a Transaction Controller) → extractor → Thread-Group Header Manager injects Bearer ${authToken}. Cookie Manager still handles Set-Cookie. Hybrid apps need both. Soak tests must re-auth before JWT expiry or you get false 401s.",
  "why": "Auth is the most common correlation pattern. Confirm cookie vs Bearer vs hybrid in DevTools before building. Token TTL is a test-plan problem on long soaks, not a server bug.",
  "when": "Every authenticated HRM/TADA plan, and any test longer than the JWT lifetime.",
  "practical": {
    "app": "HRM API + dashboard cookie",
    "scenario": "Login returns Set-Cookie and a JSON token; soak runs 3 hours with 30-minute JWTs.",
    "pass": "You use Cookie Manager + JSON Extractor + group Header Manager, and re-login each Loop (or If on expiry) so 401s aren't 'performance.'",
    "fail": "You extract once at thread start and watch 401s after 30 minutes on a soak."
  },
  "tools": [],
  "customSummary": "- Standard reusable pattern: Login sampler (often in its own Transaction Controller) → extractor captures token → Thread-Group-level Header Manager injects Authorization: Bearer ${authToken} into all later requests automatically.\n- Cookie-based sessions: handled transparently by HTTP Cookie Manager, no manual extraction needed.\n- Many real systems use a hybrid: both cookie-based session state and a separate bearer token — confirm actual mechanism via DevTools/recording before building.\n- Token expiry matters for long soak tests: structure re-authentication inside a Loop/If Controller so tokens refresh periodically rather than expiring mid-test and causing false 401 failures unrelated to actual system performance.",
  "contentMarkdown": "## Standard Bearer login shape\n\nBringing together everything from this Part, the login-and-authenticate flow deserves treatment as its own topic, because it's the single most common correlation pattern you'll build, and getting it structured cleanly pays off across every other test plan you write from here on, since nearly every meaningful test against a real system (HRM, TADA, or otherwise) starts with some form of authentication.\n\nThe standard, reusable structure looks like this: a login sampler sits early in the Thread Group (often inside its own Transaction Controller named \"Login,\" per Part 4, so it reports cleanly as one logical step), with a JSON Extractor (or Regular Expression Extractor, depending on response format) pulling the token into a variable immediately as its Post-Processor. An HTTP Header Manager placed at Thread-Group scope (Part 3) then references `${authToken}` in an `Authorization: Bearer ${authToken}` header, meaning every sampler for the rest of that thread's flow automatically carries the token without needing to configure it individually on each one — you set it up once, correctly, at the top of the tree, and every subsequent sampler inherits it through normal scoping rules.\n\n## Cookies, tokens, and hybrids\n\nFor systems using cookie-based sessions instead of (or alongside) bearer tokens, recall from Part 3 that the HTTP Cookie Manager handles this transparently — no explicit extraction needed, since JMeter auto-captures and reattaches Set-Cookie values. But it's common for real systems, including many modern HRM and enterprise apps, to use a hybrid model: a session cookie for general web-app state, plus a separate bearer token specifically for API calls — meaning you may need both the Cookie Manager and manual token extraction/header-injection working together in the same test plan, each handling a different piece of the app's actual auth architecture.\n\nConfirming which mechanism(s) your specific target application actually uses — by inspecting real login responses/headers in browser DevTools or in a captured JMeter recording — is a necessary first step before building this pattern, rather than assuming one approach blindly.\n\n## Token expiry on soak tests\n\nA performance-specific wrinkle worth flagging: tokens often have expiry windows (e.g., a JWT valid for 15 or 30 minutes). For a short load test, this rarely matters — your test finishes well before expiry. But for longer soak tests (Part 8, tests running for hours to check for memory leaks or gradual degradation), a token captured once at the start of a thread's very first iteration could expire mid-test, causing every subsequent request in that thread to start failing with 401s partway through — a failure that has nothing to do with your system's actual performance and everything to do with your test plan not re-authenticating periodically.\n\nThe fix is structural: either wrap the login step inside the same Loop Controller that repeats the main user flow (so re-authentication happens every iteration, not just once per thread), or use an If Controller checking a token-expiry timestamp variable and conditionally triggering a re-login sampler when needed — a design decision that connects directly back to the Logic Controllers covered in Part 4, and a good concrete example of why those controllers matter beyond simple branching.",
  "blocks": [
    {
      "id": "jm-5-3-md-0",
      "type": "overview",
      "heading": "Standard Bearer login shape",
      "content": "Bringing together everything from this Part, the login-and-authenticate flow deserves treatment as its own topic, because it's the single most common correlation pattern you'll build, and getting it structured cleanly pays off across every other test plan you write from here on, since nearly every meaningful test against a real system (HRM, TADA, or otherwise) starts with some form of authentication.\n\nThe standard, reusable structure looks like this: a login sampler sits early in the Thread Group (often inside its own Transaction Controller named \"Login,\" per Part 4, so it reports cleanly as one logical step), with a JSON Extractor (or Regular Expression Extractor, depending on response format) pulling the token into a variable immediately as its Post-Processor. An HTTP Header Manager placed at Thread-Group scope (Part 3) then references `${authToken}` in an `Authorization: Bearer ${authToken}` header, meaning every sampler for the rest of that thread's flow automatically carries the token without needing to configure it individually on each one — you set it up once, correctly, at the top of the tree, and every subsequent sampler inherits it through normal scoping rules.",
      "order": 0
    },
    {
      "id": "jm-5-3-md-1",
      "type": "overview",
      "heading": "Cookies, tokens, and hybrids",
      "content": "For systems using cookie-based sessions instead of (or alongside) bearer tokens, recall from Part 3 that the HTTP Cookie Manager handles this transparently — no explicit extraction needed, since JMeter auto-captures and reattaches Set-Cookie values. But it's common for real systems, including many modern HRM and enterprise apps, to use a hybrid model: a session cookie for general web-app state, plus a separate bearer token specifically for API calls — meaning you may need both the Cookie Manager and manual token extraction/header-injection working together in the same test plan, each handling a different piece of the app's actual auth architecture.\n\nConfirming which mechanism(s) your specific target application actually uses — by inspecting real login responses/headers in browser DevTools or in a captured JMeter recording — is a necessary first step before building this pattern, rather than assuming one approach blindly.",
      "order": 1
    },
    {
      "id": "jm-5-3-md-2",
      "type": "overview",
      "heading": "Token expiry on soak tests",
      "content": "A performance-specific wrinkle worth flagging: tokens often have expiry windows (e.g., a JWT valid for 15 or 30 minutes). For a short load test, this rarely matters — your test finishes well before expiry. But for longer soak tests (Part 8, tests running for hours to check for memory leaks or gradual degradation), a token captured once at the start of a thread's very first iteration could expire mid-test, causing every subsequent request in that thread to start failing with 401s partway through — a failure that has nothing to do with your system's actual performance and everything to do with your test plan not re-authenticating periodically.\n\nThe fix is structural: either wrap the login step inside the same Loop Controller that repeats the main user flow (so re-authentication happens every iteration, not just once per thread), or use an If Controller checking a token-expiry timestamp variable and conditionally triggering a re-login sampler when needed — a design decision that connects directly back to the Logic Controllers covered in Part 4, and a good concrete example of why those controllers matter beyond simple branching.",
      "order": 2
    }
  ],
  "advantages": [
    "5.3 Handling Tokens and Session IDs (Login Flows) — Auth is the most common correlation pattern."
  ],
  "limitations": [
    "5.3 Handling Tokens and Session IDs (Login Flows) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
