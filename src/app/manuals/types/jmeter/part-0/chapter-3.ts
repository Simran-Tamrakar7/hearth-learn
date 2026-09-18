import type { ChapterRecord } from "../../../types";

/** 0.3 JMeter's Execution Model — Thread Groups, Samplers, Listeners, Controllers */
export const chapter = {
  "id": "jm-0-3-jmeter-s-execution-model-thread-groups-samplers-",
  "title": "0.3 JMeter's Execution Model — Thread Groups, Samplers, Listeners, Controllers",
  "minutes": 26,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "Before writing a single test, you need a mental model of how a JMeter Test Plan is structured. Thread Group is virtual users; Samplers are the requests; Listeners collect results; Logic Controllers decide order and conditions. Hang every later chapter on Thread Group → Controllers/Samplers → Sample Results → Listeners.",
  "why": "Coming from linear Playwright scripts, the tree model is the first conceptual jump. Mixing up samplers and logic controllers is the classic beginner trap this chapter exists to prevent.",
  "when": "Before you add your first HTTP Request, and whenever a test plan 'does nothing' because a listener was mistaken for a sampler.",
  "practical": {
    "app": "Empty JMeter Test Plan tree",
    "scenario": "You must explain the four building blocks before recording an HRM login flow.",
    "pass": "You map Thread Group = users, Sampler = HTTP call, Listener = reporter, Logic Controller = if/for — and say View Results Tree must not stay on during real load.",
    "fail": "You call HTTP Request a controller, or think Listeners generate traffic."
  },
  "tools": [],
  "customSummary": "- Thread Group: top-level container = virtual users; configured via thread count, ramp-up time, loop count.\n- Samplers: actual requests sent (HTTP Request most common); also JDBC, FTP, SOAP, JSR223, TCP.\n- Listeners: display/collect results only, don't affect logic (View Results Tree for debugging, Aggregate/Summary Report for load analysis).\n- Controllers: Logic Controllers (Loop, If, Transaction, etc.) control order/conditions of execution — separate from Samplers, which generate the actual load.\n- Mental model: Thread Group → Controllers/Samplers → Sample Results → Listeners.\n- Analogy to Playwright: Thread Group = parallel user loop, Controllers = if/for logic, Samplers = actions, Listeners = test reporting.",
  "contentMarkdown": "## Thread Group — virtual users\n\nThread Group is the top-level container that represents your virtual users. Each \"thread\" in JMeter literally represents one simulated user. When you configure a Thread Group, you set three critical numbers: the number of threads (users), the ramp-up period (how long JMeter takes to start all those threads — e.g., 100 users ramped up over 50 seconds means JMeter starts 2 new users every second, rather than firing all 100 simultaneously, which more realistically mimics real-world traffic), and the loop count (how many times each thread repeats the test — or \"infinite\" for time-based tests). Everything you put inside a Thread Group — every sampler, controller, config element — runs once per thread, per loop.\n\n## Samplers — the actual requests\n\nSamplers are the actual requests being sent — this is the equivalent of a Playwright `page.goto()` or an API test's `request.get()`. The most common is the HTTP Request sampler, where you specify method (GET/POST/PUT/DELETE), server, path, and body. But JMeter has samplers for many protocols: JDBC Request (databases), FTP Request, SOAP/XML-RPC Request, TCP Sampler, and JSR223 Sampler (for custom scripted logic, covered in Part 6).\n\nSamplers are the nodes that actually generate load and produce a measurable \"sample result\" — response time, response code, bytes transferred.\n\n## Listeners — how you see results\n\nListeners are how you see results. They don't affect test execution logic; they just collect and display data — response times, pass/fail status, error messages. Common listeners include View Results Tree (shows full request/response detail per sample — extremely useful for debugging, similar to inspecting a network tab in browser dev tools, but must be disabled during actual load runs because it consumes huge memory storing every single response), Summary Report, and Aggregate Report (both give statistical rollups — average, min, max, percentiles, error % — and are what you'd actually use to analyze a load test, covered in depth in Part 10).\n\n## Controllers — order and conditions, not traffic\n\nControllers come in two flavors, and this distinction trips up a lot of beginners. Sampler Controllers generate requests (the HTTP Request sampler above is technically a type of sampler, not a controller). Logic Controllers control the order and conditions under which samplers execute — they don't generate requests themselves.\n\nExamples: Loop Controller (repeat a set of samplers N times), If Controller (conditionally execute based on a variable), Transaction Controller (group multiple samplers together and measure their combined response time as one logical \"transaction\" — e.g., grouping a Login + Dashboard Load into one \"Login Flow\" metric).\n\nLogic Controllers are covered in depth in Part 4, but understanding now that Thread Groups → contain → Controllers/Samplers → produce → Sample Results → get displayed by → Listeners is the skeleton you'll hang every other concept on for the rest of this manual.\n\n## Playwright analogy\n\nIf you think of a Playwright test file as a linear script of `page.click()`, `page.fill()`, `expect()` calls, a JMeter Test Plan is a tree — Thread Group is the outer loop (parallel users), Controllers are your if/for logic, Samplers are your actual actions, and Listeners are like your test reporter (HTML report, JSON output) — except in JMeter, results reporting is a first-class visual/tree element rather than a config flag.",
  "blocks": [
    {
      "id": "jm-0-3-md-0",
      "type": "overview",
      "heading": "Thread Group — virtual users",
      "content": "Thread Group is the top-level container that represents your virtual users. Each \"thread\" in JMeter literally represents one simulated user. When you configure a Thread Group, you set three critical numbers: the number of threads (users), the ramp-up period (how long JMeter takes to start all those threads — e.g., 100 users ramped up over 50 seconds means JMeter starts 2 new users every second, rather than firing all 100 simultaneously, which more realistically mimics real-world traffic), and the loop count (how many times each thread repeats the test — or \"infinite\" for time-based tests). Everything you put inside a Thread Group — every sampler, controller, config element — runs once per thread, per loop.",
      "order": 0
    },
    {
      "id": "jm-0-3-md-1",
      "type": "overview",
      "heading": "Samplers — the actual requests",
      "content": "Samplers are the actual requests being sent — this is the equivalent of a Playwright `page.goto()` or an API test's `request.get()`. The most common is the HTTP Request sampler, where you specify method (GET/POST/PUT/DELETE), server, path, and body. But JMeter has samplers for many protocols: JDBC Request (databases), FTP Request, SOAP/XML-RPC Request, TCP Sampler, and JSR223 Sampler (for custom scripted logic, covered in Part 6).\n\nSamplers are the nodes that actually generate load and produce a measurable \"sample result\" — response time, response code, bytes transferred.",
      "order": 1
    },
    {
      "id": "jm-0-3-md-2",
      "type": "overview",
      "heading": "Listeners — how you see results",
      "content": "Listeners are how you see results. They don't affect test execution logic; they just collect and display data — response times, pass/fail status, error messages. Common listeners include View Results Tree (shows full request/response detail per sample — extremely useful for debugging, similar to inspecting a network tab in browser dev tools, but must be disabled during actual load runs because it consumes huge memory storing every single response), Summary Report, and Aggregate Report (both give statistical rollups — average, min, max, percentiles, error % — and are what you'd actually use to analyze a load test, covered in depth in Part 10).",
      "order": 2
    },
    {
      "id": "jm-0-3-md-3",
      "type": "overview",
      "heading": "Controllers — order and conditions, not traffic",
      "content": "Controllers come in two flavors, and this distinction trips up a lot of beginners. Sampler Controllers generate requests (the HTTP Request sampler above is technically a type of sampler, not a controller). Logic Controllers control the order and conditions under which samplers execute — they don't generate requests themselves.\n\nExamples: Loop Controller (repeat a set of samplers N times), If Controller (conditionally execute based on a variable), Transaction Controller (group multiple samplers together and measure their combined response time as one logical \"transaction\" — e.g., grouping a Login + Dashboard Load into one \"Login Flow\" metric).\n\nLogic Controllers are covered in depth in Part 4, but understanding now that Thread Groups → contain → Controllers/Samplers → produce → Sample Results → get displayed by → Listeners is the skeleton you'll hang every other concept on for the rest of this manual.",
      "order": 3
    },
    {
      "id": "jm-0-3-md-4",
      "type": "overview",
      "heading": "Playwright analogy",
      "content": "If you think of a Playwright test file as a linear script of `page.click()`, `page.fill()`, `expect()` calls, a JMeter Test Plan is a tree — Thread Group is the outer loop (parallel users), Controllers are your if/for logic, Samplers are your actual actions, and Listeners are like your test reporter (HTML report, JSON output) — except in JMeter, results reporting is a first-class visual/tree element rather than a config flag.",
      "order": 4
    }
  ],
  "advantages": [
    "0.3 JMeter's Execution Model — Thread Groups, Samplers, Listeners, Controllers — Coming from linear Playwright scripts, the tree model is the first conceptual jump."
  ],
  "limitations": [
    "0.3 JMeter's Execution Model — Thread Groups, Samplers, Listeners, Controllers is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
