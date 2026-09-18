import type { ChapterRecord } from "../../../types";

/** B. JMeter vs other tools (k6, Gatling, Locust) */
export const chapter = {
  "id": "jm-12-2-jmeter-vs-other-tools-k6-gatling-locust",
  "title": "B. JMeter vs other tools (k6, Gatling, Locust)",
  "minutes": 24,
  "level": "intermediate",
  "phase": "Part 12 · Appendices",
  "partName": "Part 12 · Appendices",
  "overviewText": "None is universally better. JMeter: GUI + broad protocols (SOAP, JDBC, JMS) + enterprise default. k6: JS/TS, Grafana, lighter per machine. Gatling: Scala, high throughput. Locust: Python, simpler distributed HTTP. With a Playwright/JS and some Python background, k6 or Locust may feel faster to write — JMeter is still the skill this manual is for.",
  "why": "Tool-choice interviews need fit (language, protocol, GUI vs code), not a winner. HRM SOAP/JDBC is why JMeter stays on the table.",
  "when": "Selecting a load tool for a team, or answering 'why not k6?'",
  "practical": {
    "app": "New performance practice at Bizlevate",
    "scenario": "Team is JS-fluent, also has a SOAP payroll stub.",
    "pass": "You map k6 for HTTP/JS comfort, JMeter if SOAP/JDBC/GUI/enterprise standard matters — not 'JMeter is always best.'",
    "fail": "You pick a tool only because a blog ranked it #1."
  },
  "tools": [],
  "customSummary": "- k6: JavaScript-based, lightweight, strong Grafana integration — natural fit for JS-fluent teams.\n- Gatling: Scala-based, very high per-machine throughput — best with existing JVM/Scala familiarity.\n- Locust: Python-based, simpler distributed setup, HTTP-focused — good fit for Python-fluent teams.\n- JMeter: broadest built-in protocol support (SOAP, JDBC, JMS), GUI-first, enterprise-standard maturity.\n- Choice depends on team language fluency and protocol breadth needed, not a universal \"best\" tool.",
  "contentMarkdown": "## k6\n\nk6, built by Grafana Labs, is a modern, JavaScript-scripted load testing tool that has become extremely popular, particularly among teams already comfortable writing code rather than building GUI trees. Test scripts are plain JavaScript (or TypeScript), which is a meaningfully lower barrier for a team already fluent in JS (as you are, given your Playwright background) compared to learning JMeter's GUI-tree paradigm and occasional Groovy scripting (Part 6). k6 is generally lighter-weight and faster at generating raw load per machine than JMeter, and it has excellent native integrations with Grafana/Prometheus for real-time metrics visualization, arguably more modern-feeling than JMeter's HTML dashboard (Part 10). Where JMeter still has an edge: broader built-in protocol support out of the box (JDBC, JMS, FTP, SOAP — Part 7 — without needing extensions), a vastly larger ecosystem of GUI-based plugins (Appendix D) for teams that prefer visual test-building over scripting, and a longer track record in enterprise environments where JMeter is often already an established standard.\n\n## Gatling\n\nGatling, written in Scala, targets a similar audience to k6 — code-first, developer-centric load testing — but uses Scala's DSL for test definition rather than JavaScript. Gatling is well-regarded for its performance efficiency (built on an asynchronous, non-blocking architecture that can generate very high load per machine) and produces polished HTML reports out of the box, comparable in spirit to JMeter's dashboard (Part 10). Its main practical barrier for many teams is Scala itself — a less commonly known language on typical QA/testing teams compared to JavaScript or Python, making k6 often the more approachable code-first alternative unless a team already has Scala/JVM expertise.\n\n## Locust\n\nLocust, written in Python, uses plain Python code to define user behavior (`@task`-decorated methods on a \"User\" class), making it a natural fit for teams comfortable in Python — directly relevant if you're doing Python/pytest-based automation elsewhere (as noted in your API testing manual work). Locust's distributed testing model (spreading load across multiple worker processes/machines) is conceptually similar to JMeter's controller-agent setup (Part 9) but often considered simpler to configure. Locust's ecosystem and built-in protocol support are narrower than JMeter's — it's primarily HTTP-focused — so for testing non-HTTP protocols (JDBC, JMS, SOAP) JMeter remains the more complete out-of-box option.\n\n## Comparison table\n\n| Tool | Scripting | Best fit when... |\n|---|---|---|\n| JMeter | GUI tree + optional Groovy | Broad protocol needs (SOAP, JDBC, JMS), team prefers visual building, existing enterprise standard |\n| k6 | JavaScript/TypeScript | Team is JS-fluent, wants lightweight/fast tooling, strong Grafana integration desired |\n| Gatling | Scala | Team has JVM/Scala familiarity, wants very high per-machine throughput |\n| Locust | Python | Team is Python-fluent, mostly HTTP-based testing, wants simple distributed setup |\n\nThe honest takeaway: none of these is universally \"better\" — the right choice depends heavily on team language fluency, protocol breadth needed, and whether a GUI-based or code-based workflow fits the team's existing habits better. Given your background (QA, Playwright/JS, some Python), k6 or Locust would likely feel more immediately familiar than JMeter's GUI-first paradigm — but JMeter's maturity, protocol breadth, and enterprise ubiquity (plus this manual) make it a genuinely valuable, widely-applicable skill regardless.",
  "blocks": [
    {
      "id": "jm-12-2-md-0",
      "type": "overview",
      "heading": "k6",
      "content": "k6, built by Grafana Labs, is a modern, JavaScript-scripted load testing tool that has become extremely popular, particularly among teams already comfortable writing code rather than building GUI trees. Test scripts are plain JavaScript (or TypeScript), which is a meaningfully lower barrier for a team already fluent in JS (as you are, given your Playwright background) compared to learning JMeter's GUI-tree paradigm and occasional Groovy scripting (Part 6). k6 is generally lighter-weight and faster at generating raw load per machine than JMeter, and it has excellent native integrations with Grafana/Prometheus for real-time metrics visualization, arguably more modern-feeling than JMeter's HTML dashboard (Part 10). Where JMeter still has an edge: broader built-in protocol support out of the box (JDBC, JMS, FTP, SOAP — Part 7 — without needing extensions), a vastly larger ecosystem of GUI-based plugins (Appendix D) for teams that prefer visual test-building over scripting, and a longer track record in enterprise environments where JMeter is often already an established standard.",
      "order": 0
    },
    {
      "id": "jm-12-2-md-1",
      "type": "overview",
      "heading": "Gatling",
      "content": "Gatling, written in Scala, targets a similar audience to k6 — code-first, developer-centric load testing — but uses Scala's DSL for test definition rather than JavaScript. Gatling is well-regarded for its performance efficiency (built on an asynchronous, non-blocking architecture that can generate very high load per machine) and produces polished HTML reports out of the box, comparable in spirit to JMeter's dashboard (Part 10). Its main practical barrier for many teams is Scala itself — a less commonly known language on typical QA/testing teams compared to JavaScript or Python, making k6 often the more approachable code-first alternative unless a team already has Scala/JVM expertise.",
      "order": 1
    },
    {
      "id": "jm-12-2-md-2",
      "type": "overview",
      "heading": "Locust",
      "content": "Locust, written in Python, uses plain Python code to define user behavior (`@task`-decorated methods on a \"User\" class), making it a natural fit for teams comfortable in Python — directly relevant if you're doing Python/pytest-based automation elsewhere (as noted in your API testing manual work). Locust's distributed testing model (spreading load across multiple worker processes/machines) is conceptually similar to JMeter's controller-agent setup (Part 9) but often considered simpler to configure. Locust's ecosystem and built-in protocol support are narrower than JMeter's — it's primarily HTTP-focused — so for testing non-HTTP protocols (JDBC, JMS, SOAP) JMeter remains the more complete out-of-box option.",
      "order": 2
    },
    {
      "id": "jm-12-2-md-3",
      "type": "overview",
      "heading": "Comparison table",
      "content": "| Tool | Scripting | Best fit when... |\n|---|---|---|\n| JMeter | GUI tree + optional Groovy | Broad protocol needs (SOAP, JDBC, JMS), team prefers visual building, existing enterprise standard |\n| k6 | JavaScript/TypeScript | Team is JS-fluent, wants lightweight/fast tooling, strong Grafana integration desired |\n| Gatling | Scala | Team has JVM/Scala familiarity, wants very high per-machine throughput |\n| Locust | Python | Team is Python-fluent, mostly HTTP-based testing, wants simple distributed setup |\n\nThe honest takeaway: none of these is universally \"better\" — the right choice depends heavily on team language fluency, protocol breadth needed, and whether a GUI-based or code-based workflow fits the team's existing habits better. Given your background (QA, Playwright/JS, some Python), k6 or Locust would likely feel more immediately familiar than JMeter's GUI-first paradigm — but JMeter's maturity, protocol breadth, and enterprise ubiquity (plus this manual) make it a genuinely valuable, widely-applicable skill regardless.",
      "order": 3
    }
  ],
  "advantages": [
    "B. JMeter vs other tools (k6, Gatling, Locust) — Tool-choice interviews need fit (language, protocol, GUI vs code), not a winner."
  ],
  "limitations": [
    "B. JMeter vs other tools (k6, Gatling, Locust) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
