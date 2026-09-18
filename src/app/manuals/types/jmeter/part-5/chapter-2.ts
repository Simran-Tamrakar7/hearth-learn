import type { ChapterRecord } from "../../../types";

/** 5.2 Passing Extracted Values Between Requests */
export const chapter = {
  "id": "jm-5-2-passing-extracted-values-between-requests",
  "title": "5.2 Passing Extracted Values Between Requests",
  "minutes": 22,
  "level": "intermediate",
  "phase": "Part 5 · Correlation & Dynamic Data",
  "partName": "Part 5 · Correlation & Dynamic Data",
  "overviewText": "Extraction only matters when a later sampler uses ${variableName}. Variables are thread-local and only exist after the extractor ran. Login → token → profile → employeeId → leave apply is the dependency chain. Debug downstream 401s by checking the earlier extractor first.",
  "why": "Most 'broken' later samplers are bad upstream variables. View Results Tree's JMeter Variables pane is the first stop, not rewriting the failing POST.",
  "when": "Any multi-step authenticated flow; whenever ${authToken} appears literally in the request.",
  "practical": {
    "app": "Login, GET /employee/me, POST leave apply",
    "scenario": "Leave apply 401s after a 'successful' login sample.",
    "pass": "You inspect the login JSON Extractor (default TOKEN_NOT_FOUND?), then Header Manager Bearer ${authToken}, then employeeId from profile into the body.",
    "fail": "You only edit the leave sampler path."
  },
  "tools": [],
  "customSummary": "- Extracted variables are available only to samplers after extraction, within the same thread — each thread has isolated variable scope.\n- Build multi-step dependency chains: login → extract token → use token to fetch profile → extract employeeId → use employeeId to submit request.\n- Debugging rule: when a downstream sampler fails, check the earlier extraction step first (via View Results Tree's JMeter Variables pane) before assuming the failing sampler itself is misconfigured.",
  "contentMarkdown": "## After, same thread, not before\n\nExtraction alone accomplishes nothing on its own — the entire point is to use the captured value in a later sampler, which is where the `${variableName}` substitution pattern you've seen throughout this manual becomes load-bearing rather than cosmetic. Once a Post-Processor extractor runs on a sampler's response and stores a value under a Reference Name, that variable becomes available to every sampler that comes after it in the same thread's execution — critically, not before it, and not in other threads (each thread has its own isolated variable scope by default, which is exactly what you want, since Thread A's session token should never leak into Thread B's requests).\n\n## A three-step chain\n\nConsider a realistic three-step flow: log in, fetch employee profile, submit a leave request using that employee's ID.\n\n**Step 1 — Login sampler:**\n`POST /api/v1/auth/login` with body `{\"username\": \"${username}\", \"password\": \"${password}\"}` and a JSON Extractor Post-Processor: Reference Name `authToken`, JSON Path `$.token`.\n\n**Step 2 — Get Profile sampler:**\n`GET /api/v1/employee/me` with Header Manager `Authorization: Bearer ${authToken}` and a JSON Extractor: Reference Name `employeeId`, JSON Path `$.employeeId`.\n\n**Step 3 — Submit Leave Request sampler:**\n`POST /api/v1/leave/apply` with the same Bearer header and body `{\"employeeId\": \"${employeeId}\", \"leaveType\": \"sick\", ...}`.\n\nNotice how the chain works: Step 1's output variable (`authToken`) feeds Step 2's header, and Step 2's own extracted output (`employeeId`) feeds Step 3's body — a genuine dependency chain, exactly mirroring how a real browser session actually works (you can't view your profile without being logged in, and you can't submit a leave request without knowing whose leave it is). This chaining is the essence of \"correlation\" as a discipline: identifying every point in a real user flow where a later step depends on a value only the server can produce, and making sure your test plan captures and forwards that value rather than assuming it can be hardcoded.\n\n## Debug upstream first\n\nA debugging habit worth building here: whenever a downstream sampler in a chain like this starts failing, the very first thing to check — before assuming the sampler itself is misconfigured — is whether the variable it depends on was actually extracted correctly one or more steps earlier. Re-enable View Results Tree (Part 1) temporarily, inspect the extractor's own debug output (JMeter's extractors show what they captured directly in the tree under a \"JMeter Variables\" pane when Results Tree is active), and confirm the value looks sane before assuming the problem lies anywhere else. A huge proportion of real-world JMeter debugging time is spent exactly here — not in the failing sampler itself, but in an earlier extraction step that silently grabbed the wrong value (or the default fallback) and passed a bad value quietly downstream.",
  "blocks": [
    {
      "id": "jm-5-2-md-0",
      "type": "overview",
      "heading": "After, same thread, not before",
      "content": "Extraction alone accomplishes nothing on its own — the entire point is to use the captured value in a later sampler, which is where the `${variableName}` substitution pattern you've seen throughout this manual becomes load-bearing rather than cosmetic. Once a Post-Processor extractor runs on a sampler's response and stores a value under a Reference Name, that variable becomes available to every sampler that comes after it in the same thread's execution — critically, not before it, and not in other threads (each thread has its own isolated variable scope by default, which is exactly what you want, since Thread A's session token should never leak into Thread B's requests).",
      "order": 0
    },
    {
      "id": "jm-5-2-md-1",
      "type": "overview",
      "heading": "A three-step chain",
      "content": "Consider a realistic three-step flow: log in, fetch employee profile, submit a leave request using that employee's ID.\n\n**Step 1 — Login sampler:**\n`POST /api/v1/auth/login` with body `{\"username\": \"${username}\", \"password\": \"${password}\"}` and a JSON Extractor Post-Processor: Reference Name `authToken`, JSON Path `$.token`.\n\n**Step 2 — Get Profile sampler:**\n`GET /api/v1/employee/me` with Header Manager `Authorization: Bearer ${authToken}` and a JSON Extractor: Reference Name `employeeId`, JSON Path `$.employeeId`.\n\n**Step 3 — Submit Leave Request sampler:**\n`POST /api/v1/leave/apply` with the same Bearer header and body `{\"employeeId\": \"${employeeId}\", \"leaveType\": \"sick\", ...}`.\n\nNotice how the chain works: Step 1's output variable (`authToken`) feeds Step 2's header, and Step 2's own extracted output (`employeeId`) feeds Step 3's body — a genuine dependency chain, exactly mirroring how a real browser session actually works (you can't view your profile without being logged in, and you can't submit a leave request without knowing whose leave it is). This chaining is the essence of \"correlation\" as a discipline: identifying every point in a real user flow where a later step depends on a value only the server can produce, and making sure your test plan captures and forwards that value rather than assuming it can be hardcoded.",
      "order": 1
    },
    {
      "id": "jm-5-2-md-2",
      "type": "overview",
      "heading": "Debug upstream first",
      "content": "A debugging habit worth building here: whenever a downstream sampler in a chain like this starts failing, the very first thing to check — before assuming the sampler itself is misconfigured — is whether the variable it depends on was actually extracted correctly one or more steps earlier. Re-enable View Results Tree (Part 1) temporarily, inspect the extractor's own debug output (JMeter's extractors show what they captured directly in the tree under a \"JMeter Variables\" pane when Results Tree is active), and confirm the value looks sane before assuming the problem lies anywhere else. A huge proportion of real-world JMeter debugging time is spent exactly here — not in the failing sampler itself, but in an earlier extraction step that silently grabbed the wrong value (or the default fallback) and passed a bad value quietly downstream.",
      "order": 2
    }
  ],
  "advantages": [
    "5.2 Passing Extracted Values Between Requests — Most 'broken' later samplers are bad upstream variables."
  ],
  "limitations": [
    "5.2 Passing Extracted Values Between Requests is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
