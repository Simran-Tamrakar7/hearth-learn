import type { ChapterRecord } from "../../../types";

/** 5.1 Extracting Values — Regular Expression, JSON, and XPath Extractors */
export const chapter = {
  "id": "jm-5-1-extracting-values-regular-expression-json-and-xp",
  "title": "5.1 Extracting Values — Regular Expression, JSON, and XPath Extractors",
  "minutes": 28,
  "level": "intermediate",
  "phase": "Part 5 · Correlation & Dynamic Data",
  "partName": "Part 5 · Correlation & Dynamic Data",
  "overviewText": "Correlation means capturing server-generated values (tokens, IDs) instead of hardcoding them. Extractors are Post-Processors. JSON Extractor for JSON APIs, XPath for XML/HTML, Regex as the flexible fallback. Always set a visible Default Value like TOKEN_NOT_FOUND.",
  "why": "A recorded JWT works once. Format dictates extractor type — regex on JSON is how whitespace breaks a still-valid payload.",
  "when": "Any login token, CSRF, created order ID, or SOAP employee record — before you replay the next sampler.",
  "practical": {
    "app": "POST /api/v1/auth/login returning { data: { token } }",
    "scenario": "Capture the JWT for later Bearer headers.",
    "pass": "You use JSON Extractor Reference Name authToken, JSON Path $.data.token, Default TOKEN_NOT_FOUND — not a fragile \"token\":\"(.+?)\" unless you must.",
    "fail": "You paste yesterday's JWT into the Header Manager."
  },
  "tools": [],
  "customSummary": "- Correlation = capturing dynamic server-generated values (tokens, IDs) instead of hardcoding them, since hardcoded values expire/break on replay.\n- Extractors are Post-Processors — they run after a sampler's response arrives and store a value as a variable.\n- Regular Expression Extractor: general-purpose, works on any text response, uses regex + capture group; always set a Default Value for debuggability.\n- JSON Extractor: preferred for JSON APIs, uses JSONPath — more robust than regex against structurally-identical formatting differences.\n- XPath Extractor: for XML/HTML responses (SOAP services, server-rendered pages) — less common in modern JSON-REST-heavy work.\n- Choice is dictated by response format, not preference.",
  "contentMarkdown": "## What correlation is\n\n\"Correlation\" is the term performance testers use for a specific, unavoidable problem: many values in a real application are dynamic — generated fresh by the server on every request — and a test that hardcodes them will work exactly once, then break. A session token, a CSRF token, an order ID returned after creation, an auth JWT — none of these can be typed into your HTTP Request sampler as a static string, because the value that was valid when you recorded or built the test will have expired or simply won't exist anymore by the time you run it again.\n\nExtractors (technically called Post-Processors in JMeter's element taxonomy, since they run after a sampler receives its response) solve this by reading a value out of a response and storing it in a JMeter variable, which later samplers can then reference via the `${variableName}` syntax you've been using since Part 3.\n\n## Regular Expression Extractor\n\nRegular Expression Extractor is the most general-purpose and works on any text response — JSON, HTML, XML, or plain text — by matching a regex pattern against the response body (or headers) and capturing a specific group. You define a \"Reference Name\" (the variable name you'll use later), the regex pattern itself with a capture group in parentheses, which \"Match Number\" to use if the pattern could match multiple times (1 for the first match, -1 to grab all matches into an indexed variable set), and a default value to fall back to if no match is found (critically useful for debugging — a default like `TOKEN_NOT_FOUND` immediately tells you in later results that extraction failed, rather than silently passing an empty string into subsequent requests and producing a confusing downstream failure).\n\n```\nRegular Expression Extractor example:\n  Reference Name: authToken\n  Regular Expression: \"token\":\"(.+?)\"\n  Template: $1$\n  Match Number: 1\n  Default Value: TOKEN_NOT_FOUND\n```\n\n## JSON Extractor\n\nJSON Extractor is purpose-built for JSON responses and is generally preferred over Regular Expression Extractor when your API returns JSON (which, for most modern REST APIs like the HRM system's endpoints, is the overwhelming majority of the time), because it uses JSONPath expressions rather than fragile regex pattern-matching — meaning it correctly parses the actual JSON structure instead of pattern-matching against raw text, which can break if whitespace, key order, or nesting shifts slightly even though the JSON is still semantically identical.\n\n```\nJSON Extractor example:\n  Reference Name: authToken\n  JSON Path Expression: $.data.token\n  Match Number: 1\n  Default Value: TOKEN_NOT_FOUND\n```\n\nThis is the direct JMeter equivalent of writing `const token = responseBody.data.token;` after parsing a JSON response in a Playwright API test — same intent (pull a nested field out by its structural path), different mechanism (JSONPath string vs. object property access).\n\n## XPath Extractor\n\nXPath Extractor serves the same role but for XML or HTML responses, using XPath expressions to navigate the document structure — relevant if you're testing SOAP-based services (common in older enterprise systems, covered further in Part 7) or scraping values out of server-rendered HTML pages rather than a JSON API. Since most current-generation testing you'd do involves JSON REST APIs, XPath Extractor sees comparatively less use in modern JMeter work, but it remains essential the moment SOAP or XML-based systems are in scope.\n\n## Pick by format, not taste\n\nChoosing between these three isn't really a matter of preference — it's dictated entirely by your response format: JSON body → JSON Extractor; XML/HTML → XPath Extractor; anything else, or a value embedded in a non-JSON/XML text response (like a plain-text header value or a loosely structured legacy response), or a case where the built-in path-based extractors can't express what you need → Regular Expression Extractor as the flexible fallback.",
  "blocks": [
    {
      "id": "jm-5-1-md-0",
      "type": "overview",
      "heading": "What correlation is",
      "content": "\"Correlation\" is the term performance testers use for a specific, unavoidable problem: many values in a real application are dynamic — generated fresh by the server on every request — and a test that hardcodes them will work exactly once, then break. A session token, a CSRF token, an order ID returned after creation, an auth JWT — none of these can be typed into your HTTP Request sampler as a static string, because the value that was valid when you recorded or built the test will have expired or simply won't exist anymore by the time you run it again.\n\nExtractors (technically called Post-Processors in JMeter's element taxonomy, since they run after a sampler receives its response) solve this by reading a value out of a response and storing it in a JMeter variable, which later samplers can then reference via the `${variableName}` syntax you've been using since Part 3.",
      "order": 0
    },
    {
      "id": "jm-5-1-md-1",
      "type": "overview",
      "heading": "Regular Expression Extractor",
      "content": "Regular Expression Extractor is the most general-purpose and works on any text response — JSON, HTML, XML, or plain text — by matching a regex pattern against the response body (or headers) and capturing a specific group. You define a \"Reference Name\" (the variable name you'll use later), the regex pattern itself with a capture group in parentheses, which \"Match Number\" to use if the pattern could match multiple times (1 for the first match, -1 to grab all matches into an indexed variable set), and a default value to fall back to if no match is found (critically useful for debugging — a default like `TOKEN_NOT_FOUND` immediately tells you in later results that extraction failed, rather than silently passing an empty string into subsequent requests and producing a confusing downstream failure).\n\n```\nRegular Expression Extractor example:\n  Reference Name: authToken\n  Regular Expression: \"token\":\"(.+?)\"\n  Template: $1$\n  Match Number: 1\n  Default Value: TOKEN_NOT_FOUND\n```",
      "order": 1
    },
    {
      "id": "jm-5-1-md-2",
      "type": "overview",
      "heading": "JSON Extractor",
      "content": "JSON Extractor is purpose-built for JSON responses and is generally preferred over Regular Expression Extractor when your API returns JSON (which, for most modern REST APIs like the HRM system's endpoints, is the overwhelming majority of the time), because it uses JSONPath expressions rather than fragile regex pattern-matching — meaning it correctly parses the actual JSON structure instead of pattern-matching against raw text, which can break if whitespace, key order, or nesting shifts slightly even though the JSON is still semantically identical.\n\n```\nJSON Extractor example:\n  Reference Name: authToken\n  JSON Path Expression: $.data.token\n  Match Number: 1\n  Default Value: TOKEN_NOT_FOUND\n```\n\nThis is the direct JMeter equivalent of writing `const token = responseBody.data.token;` after parsing a JSON response in a Playwright API test — same intent (pull a nested field out by its structural path), different mechanism (JSONPath string vs. object property access).",
      "order": 2
    },
    {
      "id": "jm-5-1-md-3",
      "type": "overview",
      "heading": "XPath Extractor",
      "content": "XPath Extractor serves the same role but for XML or HTML responses, using XPath expressions to navigate the document structure — relevant if you're testing SOAP-based services (common in older enterprise systems, covered further in Part 7) or scraping values out of server-rendered HTML pages rather than a JSON API. Since most current-generation testing you'd do involves JSON REST APIs, XPath Extractor sees comparatively less use in modern JMeter work, but it remains essential the moment SOAP or XML-based systems are in scope.",
      "order": 3
    },
    {
      "id": "jm-5-1-md-4",
      "type": "overview",
      "heading": "Pick by format, not taste",
      "content": "Choosing between these three isn't really a matter of preference — it's dictated entirely by your response format: JSON body → JSON Extractor; XML/HTML → XPath Extractor; anything else, or a value embedded in a non-JSON/XML text response (like a plain-text header value or a loosely structured legacy response), or a case where the built-in path-based extractors can't express what you need → Regular Expression Extractor as the flexible fallback.",
      "order": 4
    }
  ],
  "advantages": [
    "5.1 Extracting Values — Regular Expression, JSON, and XPath Extractors — A recorded JWT works once."
  ],
  "limitations": [
    "5.1 Extracting Values — Regular Expression, JSON, and XPath Extractors is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
