import type { ChapterRecord } from "../../../types";

/** 6.1 BeanShell vs JSR223 (Groovy) — Why Groovy Is Preferred */
export const chapter = {
  "id": "jm-6-1-beanshell-vs-jsr223-groovy-why-groovy-is-preferr",
  "title": "6.1 BeanShell vs JSR223 (Groovy) — Why Groovy Is Preferred",
  "minutes": 22,
  "level": "intermediate",
  "phase": "Part 6 · Scripting in JMeter",
  "partName": "Part 6 · Scripting in JMeter",
  "overviewText": "Most needs stay GUI-only, but signed hashes and awkward transforms need code. BeanShell is the slow legacy interpreter. JSR223 + Groovy compiles and caches — Apache and the community say: new plans use Groovy, not BeanShell.",
  "why": "BeanShell at thousands of executions/sec contaminates measurements the same way GUI mode does. Groovy is close to Java and approachable from JS/Python.",
  "when": "Any new scripted element; only open BeanShell to migrate someone else's old plan.",
  "practical": {
    "app": "New HRM test plan needing a token-null check",
    "scenario": "You need a few lines of logic before a sampler.",
    "pass": "You add JSR223 + Groovy, vars.get(\"authToken\"), log.error if empty — you do not add a BeanShell PreProcessor because a blog from 2014 said so.",
    "fail": "You copy BeanShell into a high-throughput soak."
  },
  "tools": [],
  "customSummary": "- BeanShell = legacy scripting option, interpreted fresh every execution → slow, can bottleneck high-throughput tests.\n- JSR223 + Groovy = modern standard, compiled/cached scripts → significantly faster, community-recommended default.\n- Groovy syntax is close to Java, approachable from JS/Python background.\n- Rule: always use JSR223/Groovy for new work; only touch BeanShell when maintaining legacy test plans.",
  "contentMarkdown": "## When GUI elements are not enough\n\nEverything covered so far — Config Elements, Controllers, Assertions, Extractors — handles the vast majority of testing needs through GUI configuration alone, without writing a single line of code. But real-world test plans inevitably hit scenarios the built-in elements can't express: generating a complex signed request hash, transforming extracted data before reuse, implementing custom conditional logic too intricate for an If Controller's expression field, or calling out to an external library. For these cases, JMeter supports embedding actual scripting code directly inside elements, and understanding which scripting language to reach for is the first decision to get right.\n\n## BeanShell — legacy and slow\n\nBeanShell was JMeter's original scripting option, using a Java-like syntax interpreted at runtime. Historically, it was the default choice for years, and you'll still encounter plenty of older JMeter test plans, tutorials, and Stack Overflow answers built entirely around BeanShell elements (BeanShell Sampler, BeanShell PreProcessor, BeanShell PostProcessor, BeanShell Assertion).\n\nHowever, BeanShell has a well-documented, significant downside: it's slow. Because it's interpreted fresh on every single execution rather than compiled and cached, a BeanShell script running inside a high-throughput load test — where it might execute thousands of times per second across many threads — can become a meaningful performance bottleneck in the test tooling itself, which is exactly the kind of measurement contamination you want to avoid (recall from Part 0 that running JMeter's GUI during real load tests has this same \"the tool itself becomes the bottleneck\" problem — BeanShell scripting can reintroduce a milder version of it even from CLI mode).\n\n## JSR223 + Groovy — the default\n\nJSR223, using Groovy as its scripting language, is the modern, strongly recommended replacement. JSR223 is a standard Java scripting API, and JMeter's implementation compiles and caches Groovy scripts, making repeated execution dramatically faster than BeanShell's fresh-interpretation approach — Apache's own documentation and the broader JMeter community consensus have settled firmly on \"always use JSR223 + Groovy, never BeanShell, for any new test plan\" as a near-universal best practice.\n\nGroovy itself is a JVM language with syntax very close to Java but with scripting-friendly conveniences (optional semicolons, simplified closures, built-in JSON/collection helpers) — if you've ever written Java, Groovy will feel immediately familiar, and even without Java experience, its syntax is approachable coming from JavaScript/Python, which you already use in Playwright and pytest-based work.\n\n```groovy\n// JSR223 example: simple Groovy script\ndef token = vars.get(\"authToken\")\nif (token == null || token.isEmpty()) {\n    log.error(\"Auth token missing — aborting flow\")\n}\n```\n\nThe practical guidance going forward in this manual (and in your own real test plans) is simple: whenever you need scripting, reach for a JSR223 element and write Groovy. The only reason to ever touch BeanShell is maintaining a legacy test plan someone else built years ago that hasn't been migrated — and even then, migrating it to JSR223 is usually a worthwhile investment before extending it further.",
  "blocks": [
    {
      "id": "jm-6-1-md-0",
      "type": "overview",
      "heading": "When GUI elements are not enough",
      "content": "Everything covered so far — Config Elements, Controllers, Assertions, Extractors — handles the vast majority of testing needs through GUI configuration alone, without writing a single line of code. But real-world test plans inevitably hit scenarios the built-in elements can't express: generating a complex signed request hash, transforming extracted data before reuse, implementing custom conditional logic too intricate for an If Controller's expression field, or calling out to an external library. For these cases, JMeter supports embedding actual scripting code directly inside elements, and understanding which scripting language to reach for is the first decision to get right.",
      "order": 0
    },
    {
      "id": "jm-6-1-md-1",
      "type": "overview",
      "heading": "BeanShell — legacy and slow",
      "content": "BeanShell was JMeter's original scripting option, using a Java-like syntax interpreted at runtime. Historically, it was the default choice for years, and you'll still encounter plenty of older JMeter test plans, tutorials, and Stack Overflow answers built entirely around BeanShell elements (BeanShell Sampler, BeanShell PreProcessor, BeanShell PostProcessor, BeanShell Assertion).\n\nHowever, BeanShell has a well-documented, significant downside: it's slow. Because it's interpreted fresh on every single execution rather than compiled and cached, a BeanShell script running inside a high-throughput load test — where it might execute thousands of times per second across many threads — can become a meaningful performance bottleneck in the test tooling itself, which is exactly the kind of measurement contamination you want to avoid (recall from Part 0 that running JMeter's GUI during real load tests has this same \"the tool itself becomes the bottleneck\" problem — BeanShell scripting can reintroduce a milder version of it even from CLI mode).",
      "order": 1
    },
    {
      "id": "jm-6-1-md-2",
      "type": "overview",
      "heading": "JSR223 + Groovy — the default",
      "content": "JSR223, using Groovy as its scripting language, is the modern, strongly recommended replacement. JSR223 is a standard Java scripting API, and JMeter's implementation compiles and caches Groovy scripts, making repeated execution dramatically faster than BeanShell's fresh-interpretation approach — Apache's own documentation and the broader JMeter community consensus have settled firmly on \"always use JSR223 + Groovy, never BeanShell, for any new test plan\" as a near-universal best practice.\n\nGroovy itself is a JVM language with syntax very close to Java but with scripting-friendly conveniences (optional semicolons, simplified closures, built-in JSON/collection helpers) — if you've ever written Java, Groovy will feel immediately familiar, and even without Java experience, its syntax is approachable coming from JavaScript/Python, which you already use in Playwright and pytest-based work.\n\n```groovy\n// JSR223 example: simple Groovy script\ndef token = vars.get(\"authToken\")\nif (token == null || token.isEmpty()) {\n    log.error(\"Auth token missing — aborting flow\")\n}\n```\n\nThe practical guidance going forward in this manual (and in your own real test plans) is simple: whenever you need scripting, reach for a JSR223 element and write Groovy. The only reason to ever touch BeanShell is maintaining a legacy test plan someone else built years ago that hasn't been migrated — and even then, migrating it to JSR223 is usually a worthwhile investment before extending it further.",
      "order": 2
    }
  ],
  "advantages": [
    "6.1 BeanShell vs JSR223 (Groovy) — Why Groovy Is Preferred — BeanShell at thousands of executions/sec contaminates measurements the same way GUI mode does."
  ],
  "limitations": [
    "6.1 BeanShell vs JSR223 (Groovy) — Why Groovy Is Preferred is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
