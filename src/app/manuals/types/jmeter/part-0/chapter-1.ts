import type { ChapterRecord } from "../../../types";

/** 0.1 What JMeter Is and When to Use It */
export const chapter = {
  "id": "jm-0-1-what-jmeter-is-and-when-to-use-it",
  "title": "0.1 What JMeter Is and When to Use It",
  "minutes": 28,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "Apache JMeter is an open-source, Java-based tool originally built by the Apache Software Foundation to test the performance of web applications, but it has grown into a general-purpose tool for functional testing, load testing, stress testing, and even API testing. The core idea is simple: JMeter simulates many virtual users hitting your application at once, and measures how the system behaves under that simulated load.",
  "why": "You need a protocol-level load tool, not another browser driver. Interviewers and stakeholders will ask how JMeter differs from Playwright — the answer is architecture (threads vs browsers), not a feature list.",
  "when": "Reach for this chapter before installing JMeter, when someone asks you to 'just run Selenium at 500 users,' or when scoping an HRM 9 AM check-in spike versus a functional leave-request spec.",
  "practical": {
    "app": "Bizlevate HRM — attendance check-in at 9 AM",
    "scenario": "Vatsalya asks whether Playwright can prove the portal survives everyone logging in at once.",
    "pass": "You explain JMeter sends raw HTTP (no JS render), so one machine can simulate thousands of threads, and you name the question it answers: how the system performs under load, not whether the feature works for one user.",
    "fail": "You treat JMeter as a browser automation tool, or claim it replaces Playwright for UI correctness."
  },
  "tools": [],
  "customSummary": "- Open-source Java tool for load/performance/stress testing; also usable for API functional testing.\n- Operates at protocol level (HTTP, TCP, JDBC, etc.), not browser/DOM level like Selenium/Playwright.\n- Simulates many virtual users using lightweight threads instead of full browser instances.\n- Use it to answer \"how does the system perform under load?\" not \"does this feature work?\"\n- Selenium/Playwright = functional correctness; JMeter = performance under concurrent load.",
  "contentMarkdown": "## What Apache JMeter is\n\nApache JMeter is an open-source, Java-based tool originally built by the Apache Software Foundation to test the performance of web applications, but it has grown into a general-purpose tool for functional testing, load testing, stress testing, and even API testing. It was first designed to test Apache Tomcat, but today it supports HTTP, HTTPS, SOAP, REST, FTP, JDBC (databases), LDAP, JMS, TCP, and more.\n\nThe core idea is simple: JMeter simulates many virtual users hitting your application at once, and measures how the system behaves under that simulated load — how fast it responds, how many requests fail, and where the bottlenecks are.\n\n## Not Selenium or Playwright\n\nIt's important to separate JMeter's role from tools you already know like Selenium and Playwright. Selenium and Playwright are functional/UI automation tools — they drive a real browser, click buttons, fill forms, and verify that the application behaves correctly from a user's perspective.\n\nJMeter, by contrast, does not render a browser or execute JavaScript by default — it works at the protocol level, sending raw HTTP requests (or other protocol requests) directly to the server and inspecting the raw response. This makes JMeter dramatically lighter weight: you can spin up thousands of virtual \"users\" from a single machine because each virtual user isn't a full browser instance, it's just a thread making HTTP calls.\n\n## Comparison — browser tools vs JMeter\n\n| Aspect | Selenium/Playwright | JMeter |\n|---|---|---|\n| Primary purpose | Functional/UI testing | Load/performance testing (also usable for API functional testing) |\n| Operates at | Browser/DOM level | Protocol level (HTTP, TCP, JDBC, etc.) |\n| Renders JavaScript | Yes | No (by default) |\n| Resource cost per \"user\" | High (full browser instance) | Low (a thread) |\n| Typical scale | Tens of parallel browsers | Thousands of virtual users |\n| Output | Pass/fail, screenshots, DOM assertions | Response times, throughput, error rate, percentiles |\n\n## When you reach for JMeter\n\nYou'll reach for JMeter specifically when the question is \"how does the system perform under load?\" rather than \"does the feature work correctly?\" — though JMeter can also do basic functional/API checks (assertions on response body/status code), which is why Part 7 later covers using it for REST/SOAP API testing, not just load generation.\n\nIn your world, this is the natural next tool after Playwright/API testing: Playwright verifies correctness for one user at a time; JMeter verifies the system holds up when hundreds or thousands of users hit it simultaneously — directly relevant to something like the HRM system's attendance check-in at 9 AM when everyone logs in at once, or TADA during month-end expense submission spikes.",
  "blocks": [
    {
      "id": "jm-0-1-md-0",
      "type": "overview",
      "heading": "What Apache JMeter is",
      "content": "Apache JMeter is an open-source, Java-based tool originally built by the Apache Software Foundation to test the performance of web applications, but it has grown into a general-purpose tool for functional testing, load testing, stress testing, and even API testing. It was first designed to test Apache Tomcat, but today it supports HTTP, HTTPS, SOAP, REST, FTP, JDBC (databases), LDAP, JMS, TCP, and more.\n\nThe core idea is simple: JMeter simulates many virtual users hitting your application at once, and measures how the system behaves under that simulated load — how fast it responds, how many requests fail, and where the bottlenecks are.",
      "order": 0
    },
    {
      "id": "jm-0-1-md-1",
      "type": "overview",
      "heading": "Not Selenium or Playwright",
      "content": "It's important to separate JMeter's role from tools you already know like Selenium and Playwright. Selenium and Playwright are functional/UI automation tools — they drive a real browser, click buttons, fill forms, and verify that the application behaves correctly from a user's perspective.\n\nJMeter, by contrast, does not render a browser or execute JavaScript by default — it works at the protocol level, sending raw HTTP requests (or other protocol requests) directly to the server and inspecting the raw response. This makes JMeter dramatically lighter weight: you can spin up thousands of virtual \"users\" from a single machine because each virtual user isn't a full browser instance, it's just a thread making HTTP calls.",
      "order": 1
    },
    {
      "id": "jm-0-1-md-2",
      "type": "overview",
      "heading": "Comparison — browser tools vs JMeter",
      "content": "| Aspect | Selenium/Playwright | JMeter |\n|---|---|---|\n| Primary purpose | Functional/UI testing | Load/performance testing (also usable for API functional testing) |\n| Operates at | Browser/DOM level | Protocol level (HTTP, TCP, JDBC, etc.) |\n| Renders JavaScript | Yes | No (by default) |\n| Resource cost per \"user\" | High (full browser instance) | Low (a thread) |\n| Typical scale | Tens of parallel browsers | Thousands of virtual users |\n| Output | Pass/fail, screenshots, DOM assertions | Response times, throughput, error rate, percentiles |",
      "order": 2
    },
    {
      "id": "jm-0-1-md-3",
      "type": "overview",
      "heading": "When you reach for JMeter",
      "content": "You'll reach for JMeter specifically when the question is \"how does the system perform under load?\" rather than \"does the feature work correctly?\" — though JMeter can also do basic functional/API checks (assertions on response body/status code), which is why Part 7 later covers using it for REST/SOAP API testing, not just load generation.\n\nIn your world, this is the natural next tool after Playwright/API testing: Playwright verifies correctness for one user at a time; JMeter verifies the system holds up when hundreds or thousands of users hit it simultaneously — directly relevant to something like the HRM system's attendance check-in at 9 AM when everyone logs in at once, or TADA during month-end expense submission spikes.",
      "order": 3
    }
  ],
  "advantages": [
    "0.1 What JMeter Is and When to Use It — You need a protocol-level load tool, not another browser driver."
  ],
  "limitations": [
    "0.1 What JMeter Is and When to Use It is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
