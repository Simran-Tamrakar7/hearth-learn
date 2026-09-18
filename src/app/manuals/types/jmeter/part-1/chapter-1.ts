import type { ChapterRecord } from "../../../types";

/** 1.1 Test Plan Structure and Hierarchy */
export const chapter = {
  "id": "jm-1-1-test-plan-structure-and-hierarchy",
  "title": "1.1 Test Plan Structure and Hierarchy",
  "minutes": 24,
  "level": "beginner",
  "phase": "Part 1 · Core Building Blocks",
  "partName": "Part 1 · Core Building Blocks",
  "overviewText": "Every JMeter test starts with a Test Plan — the root node of the tree. Unlike a linear Playwright script, everything is organized as a literal tree, and execution order and scope both depend on where an element sits. Closest scope wins for config; Config Elements don't execute in sequence — they passively configure.",
  "why": "A shockingly common real-world JMeter bug is 'why isn't my header being sent,' and the answer is almost always a scoping/ordering mistake in the tree — not a missing HTTP Request field.",
  "when": "When you nest Header Managers, Defaults, or Listeners, and whenever a sampler seems to ignore a config element you 'definitely added.'",
  "practical": {
    "app": "HRM test plan with two Thread Groups",
    "scenario": "A Content-Type header is on one POST but not on a sibling GET, and you cannot see why.",
    "pass": "You check nesting: Thread-Group Header Manager vs sampler-child override, top-to-bottom order, and remember Config Elements don't fire as samples.",
    "fail": "You duplicate the header on every sampler without checking tree scope."
  },
  "tools": [],
  "customSummary": "- Test Plan = root node; holds global vars, thread-group-order setting, classpath config.\n- Tree structure: Thread Groups nest under Test Plan; everything else nests under Thread Groups.\n- Scoping rule: elements apply to their level and below; more specific/nested elements override broader ones (\"closest scope wins\").\n- Execution order = top-to-bottom within a level; Config Elements don't \"execute,\" they passively configure scope.",
  "contentMarkdown": "## Test Plan as the root\n\nEvery JMeter test starts with a Test Plan — the root node of the tree, analogous to a Playwright project's root config or a `.spec.ts` file's top-level `describe()`. But unlike a linear script, everything in JMeter is organized as a literal tree in the GUI's left-hand panel, and — critically — execution order and scope both depend on where an element sits in that tree, which is one of the most important and most confusing things for beginners coming from linear scripting tools.\n\nThe Test Plan itself holds global settings: user-defined variables that apply across the whole test, a checkbox for \"Run thread groups consecutively\" (by default, multiple Thread Groups run in parallel; checking this makes them run one after another), and classpath settings for any custom JARs (e.g., a JDBC driver you need for database sampling in later parts). Below the Test Plan, you nest Thread Groups, and below each Thread Group you nest everything else — Config Elements, Controllers, Samplers, Assertions, Listeners.\n\n## Closest scope wins\n\nThe hierarchy rule that matters most: elements apply to whatever is at or below their level, left-to-right, top-to-bottom in execution, but scoped by nesting for configuration. For example, an HTTP Header Manager placed directly under a Thread Group applies to every sampler within that Thread Group. But if you place a second HTTP Header Manager inside just one specific HTTP Request sampler, it overrides the broader one for that specific request only, following a \"closest scope wins\" principle.\n\nThis is conceptually similar to CSS specificity, or to how a `beforeEach` at a describe-block level in Playwright applies to all tests within it, but can be overridden by a more specific setup inside an individual test. Understanding this scoping rule now will save you real debugging pain later — a shockingly common real-world JMeter bug is \"why isn't my header being sent,\" and the answer is almost always a scoping/ordering mistake in the tree.\n\n## Execution order vs Config Elements\n\nExecution order within a single level follows simple top-to-bottom visual order — if you have three HTTP Request samplers stacked under a Thread Group, they fire in that visual order, once per loop, per thread. Config Elements (covered in Part 3) are the exception — they don't \"execute\" in sequence at all; they passively configure whatever is below/after them in scope, similar to how a fixture in pytest doesn't run inline in a test's logic but silently provides setup data to it.",
  "blocks": [
    {
      "id": "jm-1-1-md-0",
      "type": "overview",
      "heading": "Test Plan as the root",
      "content": "Every JMeter test starts with a Test Plan — the root node of the tree, analogous to a Playwright project's root config or a `.spec.ts` file's top-level `describe()`. But unlike a linear script, everything in JMeter is organized as a literal tree in the GUI's left-hand panel, and — critically — execution order and scope both depend on where an element sits in that tree, which is one of the most important and most confusing things for beginners coming from linear scripting tools.\n\nThe Test Plan itself holds global settings: user-defined variables that apply across the whole test, a checkbox for \"Run thread groups consecutively\" (by default, multiple Thread Groups run in parallel; checking this makes them run one after another), and classpath settings for any custom JARs (e.g., a JDBC driver you need for database sampling in later parts). Below the Test Plan, you nest Thread Groups, and below each Thread Group you nest everything else — Config Elements, Controllers, Samplers, Assertions, Listeners.",
      "order": 0
    },
    {
      "id": "jm-1-1-md-1",
      "type": "overview",
      "heading": "Closest scope wins",
      "content": "The hierarchy rule that matters most: elements apply to whatever is at or below their level, left-to-right, top-to-bottom in execution, but scoped by nesting for configuration. For example, an HTTP Header Manager placed directly under a Thread Group applies to every sampler within that Thread Group. But if you place a second HTTP Header Manager inside just one specific HTTP Request sampler, it overrides the broader one for that specific request only, following a \"closest scope wins\" principle.\n\nThis is conceptually similar to CSS specificity, or to how a `beforeEach` at a describe-block level in Playwright applies to all tests within it, but can be overridden by a more specific setup inside an individual test. Understanding this scoping rule now will save you real debugging pain later — a shockingly common real-world JMeter bug is \"why isn't my header being sent,\" and the answer is almost always a scoping/ordering mistake in the tree.",
      "order": 1
    },
    {
      "id": "jm-1-1-md-2",
      "type": "overview",
      "heading": "Execution order vs Config Elements",
      "content": "Execution order within a single level follows simple top-to-bottom visual order — if you have three HTTP Request samplers stacked under a Thread Group, they fire in that visual order, once per loop, per thread. Config Elements (covered in Part 3) are the exception — they don't \"execute\" in sequence at all; they passively configure whatever is below/after them in scope, similar to how a fixture in pytest doesn't run inline in a test's logic but silently provides setup data to it.",
      "order": 2
    }
  ],
  "advantages": [
    "1.1 Test Plan Structure and Hierarchy — A shockingly common real-world JMeter bug is 'why isn't my header being sent,' and the answer is almost always a scoping/ordering mistake in the tree — not a missing HTTP Request field."
  ],
  "limitations": [
    "1.1 Test Plan Structure and Hierarchy is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
