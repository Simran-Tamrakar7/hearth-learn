import type { ChapterRecord } from "../../../types";

/** 6.2 Pre-Processors and Post-Processors */
export const chapter = {
  "id": "jm-6-2-pre-processors-and-post-processors",
  "title": "6.2 Pre-Processors and Post-Processors",
  "minutes": 26,
  "level": "intermediate",
  "phase": "Part 6 · Scripting in JMeter",
  "partName": "Part 6 · Scripting in JMeter",
  "overviewText": "JSR223 PreProcessor runs before the sampler (HMAC signatures, computed fields). JSR223 PostProcessor runs after (derived variables beyond JSONPath). Core API: vars, prev, log; props for cross-thread properties. These are the general-purpose cousins of Part 5 extractors.",
  "why": "JSON Extractor cannot 'if leaveBalance < 5 then leaveStatus=low.' PreProcessor is how payment-style signing exists at all in JMeter.",
  "when": "HMAC/timestamp signing, or transforming a parsed body into a new variable for an If Controller.",
  "practical": {
    "app": "Signed payroll gateway request",
    "scenario": "API requires HMAC-SHA256 of body+timestamp before POST.",
    "pass": "You compute signature in a JSR223 PreProcessor, vars.put signature/timestamp, then ${signature} in headers — PostProcessor only if you need derived flags from the response.",
    "fail": "You try to fold HMAC into a JSON Extractor field."
  },
  "tools": [],
  "customSummary": "- JSR223 PreProcessor: runs before a sampler fires — used for computing values too complex for simple variable substitution (e.g., HMAC request signing).\n- JSR223 PostProcessor: runs after response arrives — used for transformations/derived logic beyond what JSON/Regex/XPath Extractors can express in a single pattern field.\n- Core API trio: vars (thread-local variable store), prev (previous sampler's result), log (logging); props for cross-thread-persistent properties.\n- These are general-purpose scripted versions of the purpose-built extractors from Part 5.",
  "contentMarkdown": "## Lifecycle hooks\n\nScripting elements in JMeter attach at specific points in a sampler's lifecycle, and Pre-Processors and Post-Processors are the two general-purpose hooks that let you run logic before a request is sent and after its response arrives, respectively — without that logic itself being the request. You've technically already met Post-Processors in Part 5 (the Regular Expression Extractor, JSON Extractor, and XPath Extractor are all specific, purpose-built types of Post-Processor); this chapter covers the general-purpose scripted versions, JSR223 PreProcessor and JSR223 PostProcessor, which let you run arbitrary Groovy code at those same lifecycle points instead of being limited to a single extraction pattern.\n\n## JSR223 PreProcessor — HMAC example\n\nA JSR223 PreProcessor, placed as a child of a sampler, runs its script immediately before that sampler fires — useful for computing a value the request needs that's too complex for a simple variable substitution. A concrete, realistic example: some APIs require a request to be signed with an HMAC hash computed from the request body plus a secret key and timestamp, a pattern common in payment gateways and some enterprise API security models. No built-in JMeter element computes an HMAC signature, but a JSR223 PreProcessor can:\n\n```groovy\nimport javax.crypto.Mac\nimport javax.crypto.spec.SecretKeySpec\n\ndef secret = \"shared-secret-key\"\ndef timestamp = System.currentTimeMillis().toString()\ndef payload = vars.get(\"requestBody\") + timestamp\n\nMac mac = Mac.getInstance(\"HmacSHA256\")\nmac.init(new SecretKeySpec(secret.getBytes(), \"HmacSHA256\"))\ndef signature = mac.doFinal(payload.getBytes()).encodeHex().toString()\n\nvars.put(\"signature\", signature)\nvars.put(\"timestamp\", timestamp)\n```\n\nThe resulting `${signature}` and `${timestamp}` variables would then be referenced normally in the sampler's headers or body, exactly like any extracted variable from Part 5.\n\n## JSR223 PostProcessor — derived flags\n\nA JSR223 PostProcessor, by contrast, runs after the response arrives, and is the tool of choice when your data-transformation need goes beyond what JSON/Regex/XPath Extractors can express in their single-purpose pattern-matching fields — for example, extracting a value, then performing conditional logic on it, then storing a derived result (not just the raw extracted value) as a new variable:\n\n```groovy\nimport groovy.json.JsonSlurper\n\ndef json = new JsonSlurper().parseText(prev.getResponseDataAsString())\ndef leaveBalance = json.leaveBalance as Integer\n\nif (leaveBalance < 5) {\n    vars.put(\"leaveStatus\", \"low\")\n} else {\n    vars.put(\"leaveStatus\", \"sufficient\")\n}\n```\n\nHere, `prev` is a built-in JSR223 variable referring to the previous sampler's result (giving access to the full response, status code, headers, and timing), and `vars` is the built-in handle to JMeter's variable store — both available automatically inside any JSR223 element without needing to import or configure anything extra. This `prev`/`vars`/`log` trio (along with `props` for JMeter properties, which persist across threads unlike `vars`) forms the core API surface you'll use in nearly every scripting element, and it's worth memorizing early since you'll reference it constantly once scripting becomes a regular part of your test plans.",
  "blocks": [
    {
      "id": "jm-6-2-md-0",
      "type": "overview",
      "heading": "Lifecycle hooks",
      "content": "Scripting elements in JMeter attach at specific points in a sampler's lifecycle, and Pre-Processors and Post-Processors are the two general-purpose hooks that let you run logic before a request is sent and after its response arrives, respectively — without that logic itself being the request. You've technically already met Post-Processors in Part 5 (the Regular Expression Extractor, JSON Extractor, and XPath Extractor are all specific, purpose-built types of Post-Processor); this chapter covers the general-purpose scripted versions, JSR223 PreProcessor and JSR223 PostProcessor, which let you run arbitrary Groovy code at those same lifecycle points instead of being limited to a single extraction pattern.",
      "order": 0
    },
    {
      "id": "jm-6-2-md-1",
      "type": "overview",
      "heading": "JSR223 PreProcessor — HMAC example",
      "content": "A JSR223 PreProcessor, placed as a child of a sampler, runs its script immediately before that sampler fires — useful for computing a value the request needs that's too complex for a simple variable substitution. A concrete, realistic example: some APIs require a request to be signed with an HMAC hash computed from the request body plus a secret key and timestamp, a pattern common in payment gateways and some enterprise API security models. No built-in JMeter element computes an HMAC signature, but a JSR223 PreProcessor can:\n\n```groovy\nimport javax.crypto.Mac\nimport javax.crypto.spec.SecretKeySpec\n\ndef secret = \"shared-secret-key\"\ndef timestamp = System.currentTimeMillis().toString()\ndef payload = vars.get(\"requestBody\") + timestamp\n\nMac mac = Mac.getInstance(\"HmacSHA256\")\nmac.init(new SecretKeySpec(secret.getBytes(), \"HmacSHA256\"))\ndef signature = mac.doFinal(payload.getBytes()).encodeHex().toString()\n\nvars.put(\"signature\", signature)\nvars.put(\"timestamp\", timestamp)\n```\n\nThe resulting `${signature}` and `${timestamp}` variables would then be referenced normally in the sampler's headers or body, exactly like any extracted variable from Part 5.",
      "order": 1
    },
    {
      "id": "jm-6-2-md-2",
      "type": "overview",
      "heading": "JSR223 PostProcessor — derived flags",
      "content": "A JSR223 PostProcessor, by contrast, runs after the response arrives, and is the tool of choice when your data-transformation need goes beyond what JSON/Regex/XPath Extractors can express in their single-purpose pattern-matching fields — for example, extracting a value, then performing conditional logic on it, then storing a derived result (not just the raw extracted value) as a new variable:\n\n```groovy\nimport groovy.json.JsonSlurper\n\ndef json = new JsonSlurper().parseText(prev.getResponseDataAsString())\ndef leaveBalance = json.leaveBalance as Integer\n\nif (leaveBalance < 5) {\n    vars.put(\"leaveStatus\", \"low\")\n} else {\n    vars.put(\"leaveStatus\", \"sufficient\")\n}\n```\n\nHere, `prev` is a built-in JSR223 variable referring to the previous sampler's result (giving access to the full response, status code, headers, and timing), and `vars` is the built-in handle to JMeter's variable store — both available automatically inside any JSR223 element without needing to import or configure anything extra. This `prev`/`vars`/`log` trio (along with `props` for JMeter properties, which persist across threads unlike `vars`) forms the core API surface you'll use in nearly every scripting element, and it's worth memorizing early since you'll reference it constantly once scripting becomes a regular part of your test plans.",
      "order": 2
    }
  ],
  "advantages": [
    "6.2 Pre-Processors and Post-Processors — JSON Extractor cannot 'if leaveBalance < 5 then leaveStatus=low."
  ],
  "limitations": [
    "6.2 Pre-Processors and Post-Processors is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
