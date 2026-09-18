import type { ChapterRecord } from "../../../types";

/** 6.3 Custom Logic with JSR223 Sampler */
export const chapter = {
  "id": "jm-6-3-custom-logic-with-jsr223-sampler",
  "title": "6.3 Custom Logic with JSR223 Sampler",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 6 · Scripting in JMeter",
  "partName": "Part 6 · Scripting in JMeter",
  "overviewText": "JSR223 Sampler is itself a sampler — the timed action, not a hook around HTTP Request. Use it for custom libraries or non-HTTP work you want measured. SampleResult lets you set success and response data. Least-needed of the three hooks: default to built-in elements first.",
  "why": "Scripting everything because you like Groovy makes plans unreadable for teammates. HTTP Request + Pre/Post already covers most APIs.",
  "when": "A genuine gap: custom Java library call, or one timed unit that isn't a clean HTTP/JDBC sampler.",
  "practical": {
    "app": "Custom employee-id library used by payroll",
    "scenario": "You need one timed step that isn't a REST call.",
    "pass": "You use JSR223 Sampler, set SampleResult success/data, time the call — you did not replace every HTTP Request with Groovy HTTP.",
    "fail": "You rewrite the whole leave flow as Groovy because you prefer code."
  },
  "tools": [],
  "customSummary": "- JSR223 Sampler IS a sampler — generates the \"request\"/action itself, not just supporting logic around one.\n- Used for non-standard interactions: custom library calls, orchestrated multi-step logic measured as one unit, non-HTTP/JDBC/FTP protocols.\n- SampleResult object gives full manual control over what gets reported (response data, success/failure).\n- Least commonly needed scripting hook — default to built-in elements first; use JSR223 only for genuine gaps, not out of habit, to keep test plans maintainable.",
  "contentMarkdown": "## Sampler, not a hook\n\nWhere JSR223 PreProcessor and PostProcessor attach around an existing sampler, the JSR223 Sampler is itself a sampler — meaning it can be the request-generating action, not just supporting logic around one. This is the right tool when you need to generate load against something that isn't a clean HTTP/JDBC/FTP call that JMeter's built-in samplers already model — for example, calling a custom Java library directly, running arbitrary computation you want measured as part of your test's timing, or orchestrating multiple internal steps as one logical, custom-timed unit.\n\n```groovy\nimport groovy.json.JsonSlurper\n\ndef startTime = System.currentTimeMillis()\n\n// Example: custom computation or non-HTTP interaction\ndef result = someCustomLibraryCall(vars.get(\"employeeId\"))\n\ndef duration = System.currentTimeMillis() - startTime\nlog.info(\"Custom operation took ${duration}ms for employee ${vars.get('employeeId')}\")\n\nSampleResult.setResponseData(result.toString(), \"UTF-8\")\nSampleResult.setSuccessful(result != null)\n```\n\nIn this example, `SampleResult` is the built-in object representing this sampler's own result — you can manually set its response data, success/failure status, and other properties, meaning a JSR223 Sampler gives you complete control over what JMeter reports for that \"request,\" even though there's no literal network call happening at all if you don't want one (though in the overwhelming majority of realistic use cases, a JSR223 Sampler does still make an HTTP call internally via Groovy's HTTP capabilities or a Java HTTP client, just with more custom logic wrapped around it than JMeter's built-in HTTP Request sampler alone could express).\n\n## Last resort, not a habit\n\nIt's worth being honest about how often you'll actually reach for JSR223 Sampler versus the other scripting hooks: in practice, it's the least commonly needed of the three, precisely because JMeter's built-in HTTP Request sampler plus Pre/Post-Processors already cover the overwhelming majority of real testing needs. The general guidance is to default to built-in elements first — Config Elements, standard samplers, standard extractors, standard assertions — and only drop into JSR223 scripting (Sampler, PreProcessor, or PostProcessor) when you hit a genuine gap that the declarative GUI elements can't express, rather than scripting everything simply because you're comfortable with code. This mirrors good practice in Playwright too — you wouldn't hand-roll a custom wait loop when `expect().toBeVisible()` already does what you need — and it keeps your JMeter test plans more maintainable and readable for teammates who may not be as comfortable digging through embedded Groovy scripts scattered across the tree.",
  "blocks": [
    {
      "id": "jm-6-3-md-0",
      "type": "overview",
      "heading": "Sampler, not a hook",
      "content": "Where JSR223 PreProcessor and PostProcessor attach around an existing sampler, the JSR223 Sampler is itself a sampler — meaning it can be the request-generating action, not just supporting logic around one. This is the right tool when you need to generate load against something that isn't a clean HTTP/JDBC/FTP call that JMeter's built-in samplers already model — for example, calling a custom Java library directly, running arbitrary computation you want measured as part of your test's timing, or orchestrating multiple internal steps as one logical, custom-timed unit.\n\n```groovy\nimport groovy.json.JsonSlurper\n\ndef startTime = System.currentTimeMillis()\n\n// Example: custom computation or non-HTTP interaction\ndef result = someCustomLibraryCall(vars.get(\"employeeId\"))\n\ndef duration = System.currentTimeMillis() - startTime\nlog.info(\"Custom operation took ${duration}ms for employee ${vars.get('employeeId')}\")\n\nSampleResult.setResponseData(result.toString(), \"UTF-8\")\nSampleResult.setSuccessful(result != null)\n```\n\nIn this example, `SampleResult` is the built-in object representing this sampler's own result — you can manually set its response data, success/failure status, and other properties, meaning a JSR223 Sampler gives you complete control over what JMeter reports for that \"request,\" even though there's no literal network call happening at all if you don't want one (though in the overwhelming majority of realistic use cases, a JSR223 Sampler does still make an HTTP call internally via Groovy's HTTP capabilities or a Java HTTP client, just with more custom logic wrapped around it than JMeter's built-in HTTP Request sampler alone could express).",
      "order": 0
    },
    {
      "id": "jm-6-3-md-1",
      "type": "overview",
      "heading": "Last resort, not a habit",
      "content": "It's worth being honest about how often you'll actually reach for JSR223 Sampler versus the other scripting hooks: in practice, it's the least commonly needed of the three, precisely because JMeter's built-in HTTP Request sampler plus Pre/Post-Processors already cover the overwhelming majority of real testing needs. The general guidance is to default to built-in elements first — Config Elements, standard samplers, standard extractors, standard assertions — and only drop into JSR223 scripting (Sampler, PreProcessor, or PostProcessor) when you hit a genuine gap that the declarative GUI elements can't express, rather than scripting everything simply because you're comfortable with code. This mirrors good practice in Playwright too — you wouldn't hand-roll a custom wait loop when `expect().toBeVisible()` already does what you need — and it keeps your JMeter test plans more maintainable and readable for teammates who may not be as comfortable digging through embedded Groovy scripts scattered across the tree.",
      "order": 1
    }
  ],
  "advantages": [
    "6.3 Custom Logic with JSR223 Sampler — Scripting everything because you like Groovy makes plans unreadable for teammates."
  ],
  "limitations": [
    "6.3 Custom Logic with JSR223 Sampler is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
