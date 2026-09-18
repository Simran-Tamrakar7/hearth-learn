import type { ChapterRecord } from "../../../types";

/** 7.3 Testing with Authentication (Bearer Tokens, Basic Auth, OAuth) */
export const chapter = {
  "id": "jm-7-3-testing-with-authentication-bearer-tokens-basic-",
  "title": "7.3 Testing with Authentication (Bearer Tokens, Basic Auth, OAuth)",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 7 · API & Protocol-Specific Testing",
  "partName": "Part 7 · API & Protocol-Specific Testing",
  "overviewText": "Auth is not one scheme. Bearer is Part 5 extraction + Header Manager. Basic Auth uses HTTP Authorization Manager (JMeter Base64s for you). OAuth Client Credentials is a token POST then Bearer. Interactive Authorization Code is usually a token obtained outside JMeter. Debug 401s with one thread + View Results Tree.",
  "why": "Misconfigured auth is the top reason a 'correct' plan 401s. Don't script a consent screen; feed a refresh token.",
  "when": "JWT APIs, old Basic admin tools, and OAuth client-credentials gateways.",
  "practical": {
    "app": "HRM OAuth token endpoint + API",
    "scenario": "Client credentials grant, then call leave apply.",
    "pass": "You POST /oauth/token, extract access_token, reuse Bearer pattern; for Authorization Code you paste a long-lived token from outside JMeter.",
    "fail": "You try to click through Okta consent inside JMeter, or skip Authorization Manager and hand-roll broken Basic encoding."
  },
  "tools": [],
  "customSummary": "- Bearer Token: extraction + Header Manager pattern from Part 5 — most common modern REST auth.\n- Basic Auth: username:password Base64-encoded into header; JMeter's HTTP Authorization Manager config element automates the encoding.\n- OAuth: multi-step protocol; Client Credentials grant (token endpoint + client ID/secret) converges into standard Bearer pattern once token is obtained.\n- Interactive OAuth flows (Authorization Code w/ consent screen) are impractical to automate directly — obtain a long-lived/refresh token outside JMeter and feed it in as a variable instead.\n- Universal auth debugging approach: single-thread run + View Results Tree, inspect exact request/response, let the actual error message guide diagnosis.",
  "contentMarkdown": "## Auth is several mechanisms\n\nAuthentication mechanics were introduced practically in Part 5 Chapter 3 (login flows, token extraction, cookie handling); this chapter rounds that out by covering the specific types of auth schemes you're likely to encounter and how each is configured in JMeter, since \"authentication\" isn't one uniform thing — the mechanism genuinely differs by system, and misconfiguring it is one of the most common reasons a JMeter test plan fails with 401/403 errors despite everything else being built correctly.\n\n## Bearer Token\n\nBearer Token authentication is the pattern already walked through in depth in Part 5 — a token (often a JWT) obtained from a login endpoint, then attached via an `Authorization: Bearer ${authToken}` header on subsequent requests, using a Header Manager and an earlier extraction step. This remains the single most common auth pattern for modern REST APIs, including most token-based HRM/enterprise system architectures.\n\n## Basic Auth\n\nBasic Auth is simpler and older — credentials (username and password) are combined and Base64-encoded directly into the request header, in the form `Authorization: Basic <base64(username:password)>`. JMeter has a dedicated HTTP Authorization Manager config element specifically for this: you add it to your test plan, specify the target base URL, username, and password, and JMeter automatically computes and attaches the correctly-encoded header to every matching request in scope — meaning you don't need to manually Base64-encode anything yourself via a JSR223 script, since the built-in element handles that mechanical step. Basic Auth is less common in modern systems (since the credentials, even encoded, travel on every single request, which is considered weaker practice than short-lived tokens) but still appears in some internal tools, admin panels, and simpler legacy integrations.\n\n## OAuth 2.0\n\nOAuth is the most involved of the three, since it's not a single request/response pattern but a multi-step protocol (typically OAuth 2.0) involving a separate authorization server, often a client ID/client secret, and one of several \"grant type\" flows depending on the integration style. For server-to-server or testing purposes, the most relevant flow is usually the Client Credentials grant, where your test plan makes a dedicated token-request call to the OAuth provider's token endpoint (e.g., `POST /oauth/token` with `grant_type=client_credentials`, `client_id`, and `client_secret` in the body), receives an access token in the response, and then uses that token exactly like a Bearer token in all subsequent requests — meaning structurally, once you have the token, OAuth converges back into the same Bearer Token pattern from Part 5, with the only real difference being how you initially obtained the token (a dedicated OAuth token endpoint with client credentials, rather than a simple username/password login endpoint).\n\nMore interactive OAuth flows (Authorization Code with a redirect and user consent screen) are genuinely difficult to automate in JMeter precisely because they're designed to require a real human clicking through a browser consent screen — for these, the practical real-world workaround is usually to obtain a long-lived token or refresh token once, outside of JMeter (manually, or via a setup script), and feed it into your test plan as a pre-existing variable or CSV value rather than trying to script the full interactive flow inside JMeter itself.\n\n## Debug the actual 401 body\n\nA closing practical note tying this chapter together: regardless of which auth scheme a given system uses, the debugging approach is identical — use View Results Tree (Part 1, Part 2) on a single-thread run to inspect the exact request being sent (confirming the header/body is actually formatted the way the API expects) and the exact response coming back (a 401 with a specific error message body, checked via the Response tab, almost always tells you precisely what's wrong — expired token, malformed header, wrong grant type — far faster than guessing), before assuming the problem lies in your broader test plan logic rather than in the specific auth configuration itself.",
  "blocks": [
    {
      "id": "jm-7-3-md-0",
      "type": "overview",
      "heading": "Auth is several mechanisms",
      "content": "Authentication mechanics were introduced practically in Part 5 Chapter 3 (login flows, token extraction, cookie handling); this chapter rounds that out by covering the specific types of auth schemes you're likely to encounter and how each is configured in JMeter, since \"authentication\" isn't one uniform thing — the mechanism genuinely differs by system, and misconfiguring it is one of the most common reasons a JMeter test plan fails with 401/403 errors despite everything else being built correctly.",
      "order": 0
    },
    {
      "id": "jm-7-3-md-1",
      "type": "overview",
      "heading": "Bearer Token",
      "content": "Bearer Token authentication is the pattern already walked through in depth in Part 5 — a token (often a JWT) obtained from a login endpoint, then attached via an `Authorization: Bearer ${authToken}` header on subsequent requests, using a Header Manager and an earlier extraction step. This remains the single most common auth pattern for modern REST APIs, including most token-based HRM/enterprise system architectures.",
      "order": 1
    },
    {
      "id": "jm-7-3-md-2",
      "type": "overview",
      "heading": "Basic Auth",
      "content": "Basic Auth is simpler and older — credentials (username and password) are combined and Base64-encoded directly into the request header, in the form `Authorization: Basic <base64(username:password)>`. JMeter has a dedicated HTTP Authorization Manager config element specifically for this: you add it to your test plan, specify the target base URL, username, and password, and JMeter automatically computes and attaches the correctly-encoded header to every matching request in scope — meaning you don't need to manually Base64-encode anything yourself via a JSR223 script, since the built-in element handles that mechanical step. Basic Auth is less common in modern systems (since the credentials, even encoded, travel on every single request, which is considered weaker practice than short-lived tokens) but still appears in some internal tools, admin panels, and simpler legacy integrations.",
      "order": 2
    },
    {
      "id": "jm-7-3-md-3",
      "type": "overview",
      "heading": "OAuth 2.0",
      "content": "OAuth is the most involved of the three, since it's not a single request/response pattern but a multi-step protocol (typically OAuth 2.0) involving a separate authorization server, often a client ID/client secret, and one of several \"grant type\" flows depending on the integration style. For server-to-server or testing purposes, the most relevant flow is usually the Client Credentials grant, where your test plan makes a dedicated token-request call to the OAuth provider's token endpoint (e.g., `POST /oauth/token` with `grant_type=client_credentials`, `client_id`, and `client_secret` in the body), receives an access token in the response, and then uses that token exactly like a Bearer token in all subsequent requests — meaning structurally, once you have the token, OAuth converges back into the same Bearer Token pattern from Part 5, with the only real difference being how you initially obtained the token (a dedicated OAuth token endpoint with client credentials, rather than a simple username/password login endpoint).\n\nMore interactive OAuth flows (Authorization Code with a redirect and user consent screen) are genuinely difficult to automate in JMeter precisely because they're designed to require a real human clicking through a browser consent screen — for these, the practical real-world workaround is usually to obtain a long-lived token or refresh token once, outside of JMeter (manually, or via a setup script), and feed it into your test plan as a pre-existing variable or CSV value rather than trying to script the full interactive flow inside JMeter itself.",
      "order": 3
    },
    {
      "id": "jm-7-3-md-4",
      "type": "overview",
      "heading": "Debug the actual 401 body",
      "content": "A closing practical note tying this chapter together: regardless of which auth scheme a given system uses, the debugging approach is identical — use View Results Tree (Part 1, Part 2) on a single-thread run to inspect the exact request being sent (confirming the header/body is actually formatted the way the API expects) and the exact response coming back (a 401 with a specific error message body, checked via the Response tab, almost always tells you precisely what's wrong — expired token, malformed header, wrong grant type — far faster than guessing), before assuming the problem lies in your broader test plan logic rather than in the specific auth configuration itself.",
      "order": 4
    }
  ],
  "advantages": [
    "7.3 Testing with Authentication (Bearer Tokens, Basic Auth, OAuth) — Misconfigured auth is the top reason a 'correct' plan 401s."
  ],
  "limitations": [
    "7.3 Testing with Authentication (Bearer Tokens, Basic Auth, OAuth) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
