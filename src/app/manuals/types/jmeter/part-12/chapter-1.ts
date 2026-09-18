import type { ChapterRecord } from "../../../types";

/** A. Common errors & troubleshooting */
export const chapter = {
  "id": "jm-12-1-common-errors-troubleshooting",
  "title": "A. Common errors & troubleshooting",
  "minutes": 22,
  "level": "intermediate",
  "phase": "Part 12 · Appendices",
  "partName": "Part 12 · Appendices",
  "overviewText": "ConnectException is often host/port, firewall, or exhausted connections under load. 401/403 is auth — one thread + View Results Tree. Literal ${variable} means extraction order or match failed. OOM is almost always GUI listeners. CSV 'same row' is Sharing mode. Rule out JMeter before blaming the server.",
  "why": "These six failures eat most real debugging time. Visible extractor defaults and CLI mode prevent the worst of them.",
  "when": "Any red sample, OOM, or 'impossible' variance — before rewriting the HTTP Request.",
  "practical": {
    "app": "Failing HRM leave plan",
    "scenario": "401s, literal ${authToken}, or JMeter crash at 200 users.",
    "pass": "You check Header Manager scope, TOKEN_NOT_FOUND, disable View Results Tree / switch to CLI, then Sharing mode — in that spirit.",
    "fail": "You retune JVM heap first while View Results Tree is still on in GUI load."
  },
  "tools": [],
  "customSummary": "- ConnectException → wrong server/port, server down, or (under load) exhausted connections — sometimes a genuine capacity finding.\n- 401/403 → auth problem; single-thread + View Results Tree + response body error message is the fast diagnostic path.\n- Literal ${variable} in requests → extractor ran too late, on wrong sampler, or silently failed to match (always set visible Default Values).\n- Out of Memory → almost always GUI-mode listeners (View Results Tree) at real load volumes — switch to CLI.\n- \"Impossible\" variance → rule out GUI mode, misconfigured pacing, or a resource-starved JMeter machine before blaming the target system.\n- CSV not varying → check Sharing Mode and file row count vs thread count.",
  "contentMarkdown": "## ConnectException\n\n\"Non HTTP response code: java.net.ConnectException\" — This typically means JMeter couldn't establish a connection to the target server at all, before ever getting an HTTP response. The most common causes are a wrong server name/port in HTTP Request Defaults (Part 3) or the target sampler itself, the target server simply being down or unreachable from wherever JMeter is running (worth checking network/firewall rules, especially relevant if you're running distributed tests per Part 9, where agent machines might not have the same network access as your local machine), or — during heavy load tests specifically — the target server's connection pool or OS-level socket limits being exhausted, which is itself a meaningful finding about the system's capacity, not just a test configuration problem.\n\n## 401 and 403\n\n\"Response code: 401\" (or 403) — Nearly always an authentication problem, and the debugging path is exactly what Part 7 Chapter 3 established: drop to a single thread, enable View Results Tree, inspect the Request tab to confirm the auth header/cookie is actually present and correctly formatted, and check the Response tab's body for the server's specific error message, which almost always names the precise issue (expired token, missing scope, malformed header) far faster than guessing. A frequent root cause specifically is a scoping mistake from Part 1 — a Header Manager placed in the wrong part of the tree, so the Authorization header simply isn't reaching the sampler that needs it.\n\n## Literal ${variableName}\n\nVariables not substituting — literal `${variableName}` appears in the request — This means JMeter never resolved the variable, usually because the extractor that was supposed to set it either ran after the sampler that needs it (an ordering problem, Part 5 Chapter 2) rather than before, ran on the wrong sampler's response, or silently failed to match anything and fell through to its Default Value (which is exactly why Part 5 recommended always setting an obvious placeholder default like `TOKEN_NOT_FOUND` — if you see that literal text in a later request, you immediately know extraction failed upstream, versus a blank value which is more ambiguous to diagnose).\n\n## Out of Memory\n\nOut of Memory errors during a run — This is very often a GUI-mode problem specifically (Part 9 Chapter 3) — View Results Tree or similar listeners retaining full response bodies for every sample at real load volumes. The fix is almost always structural, not a JVM tuning tweak: remove heavy listeners, switch to CLI mode, and let the `.jtl` file (Part 10) be the only place results actually accumulate during the run.\n\n## Impossible-looking variance\n\nInconsistent or \"impossible\" looking results (huge variance for no apparent reason) — Before suspecting your target system, rule out JMeter-side causes first: confirm you're not accidentally running in GUI mode at meaningful thread counts (Part 9), confirm think time/pacing (Part 8) is configured as intended rather than accidentally left at defaults, and check whether the machine running JMeter itself is resource-constrained (CPU-starved JMeter threads produce artificially inflated, misleading response times that have nothing to do with your target server).\n\n## CSV not varying\n\nCSV Data Set Config not varying data / all threads getting the same row — Usually a Sharing Mode misconfiguration (Part 3 Chapter 4) — confirm it's set appropriately for your Thread Group structure, and confirm the CSV file itself genuinely has enough distinct rows for your thread count, especially if Recycle on EOF is disabled.",
  "blocks": [
    {
      "id": "jm-12-1-md-0",
      "type": "overview",
      "heading": "ConnectException",
      "content": "\"Non HTTP response code: java.net.ConnectException\" — This typically means JMeter couldn't establish a connection to the target server at all, before ever getting an HTTP response. The most common causes are a wrong server name/port in HTTP Request Defaults (Part 3) or the target sampler itself, the target server simply being down or unreachable from wherever JMeter is running (worth checking network/firewall rules, especially relevant if you're running distributed tests per Part 9, where agent machines might not have the same network access as your local machine), or — during heavy load tests specifically — the target server's connection pool or OS-level socket limits being exhausted, which is itself a meaningful finding about the system's capacity, not just a test configuration problem.",
      "order": 0
    },
    {
      "id": "jm-12-1-md-1",
      "type": "overview",
      "heading": "401 and 403",
      "content": "\"Response code: 401\" (or 403) — Nearly always an authentication problem, and the debugging path is exactly what Part 7 Chapter 3 established: drop to a single thread, enable View Results Tree, inspect the Request tab to confirm the auth header/cookie is actually present and correctly formatted, and check the Response tab's body for the server's specific error message, which almost always names the precise issue (expired token, missing scope, malformed header) far faster than guessing. A frequent root cause specifically is a scoping mistake from Part 1 — a Header Manager placed in the wrong part of the tree, so the Authorization header simply isn't reaching the sampler that needs it.",
      "order": 1
    },
    {
      "id": "jm-12-1-md-2",
      "type": "overview",
      "heading": "Literal ${variableName}",
      "content": "Variables not substituting — literal `${variableName}` appears in the request — This means JMeter never resolved the variable, usually because the extractor that was supposed to set it either ran after the sampler that needs it (an ordering problem, Part 5 Chapter 2) rather than before, ran on the wrong sampler's response, or silently failed to match anything and fell through to its Default Value (which is exactly why Part 5 recommended always setting an obvious placeholder default like `TOKEN_NOT_FOUND` — if you see that literal text in a later request, you immediately know extraction failed upstream, versus a blank value which is more ambiguous to diagnose).",
      "order": 2
    },
    {
      "id": "jm-12-1-md-3",
      "type": "overview",
      "heading": "Out of Memory",
      "content": "Out of Memory errors during a run — This is very often a GUI-mode problem specifically (Part 9 Chapter 3) — View Results Tree or similar listeners retaining full response bodies for every sample at real load volumes. The fix is almost always structural, not a JVM tuning tweak: remove heavy listeners, switch to CLI mode, and let the `.jtl` file (Part 10) be the only place results actually accumulate during the run.",
      "order": 3
    },
    {
      "id": "jm-12-1-md-4",
      "type": "overview",
      "heading": "Impossible-looking variance",
      "content": "Inconsistent or \"impossible\" looking results (huge variance for no apparent reason) — Before suspecting your target system, rule out JMeter-side causes first: confirm you're not accidentally running in GUI mode at meaningful thread counts (Part 9), confirm think time/pacing (Part 8) is configured as intended rather than accidentally left at defaults, and check whether the machine running JMeter itself is resource-constrained (CPU-starved JMeter threads produce artificially inflated, misleading response times that have nothing to do with your target server).",
      "order": 4
    },
    {
      "id": "jm-12-1-md-5",
      "type": "overview",
      "heading": "CSV not varying",
      "content": "CSV Data Set Config not varying data / all threads getting the same row — Usually a Sharing Mode misconfiguration (Part 3 Chapter 4) — confirm it's set appropriately for your Thread Group structure, and confirm the CSV file itself genuinely has enough distinct rows for your thread count, especially if Recycle on EOF is disabled.",
      "order": 5
    }
  ],
  "advantages": [
    "A. Common errors & troubleshooting — These six failures eat most real debugging time."
  ],
  "limitations": [
    "A. Common errors & troubleshooting is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
