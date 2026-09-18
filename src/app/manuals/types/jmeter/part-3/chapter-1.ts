import type { ChapterRecord } from "../../../types";

/** 3.1 HTTP Request Defaults */
export const chapter = {
  "id": "jm-3-1-http-request-defaults",
  "title": "3.1 HTTP Request Defaults",
  "minutes": 18,
  "level": "intermediate",
  "phase": "Part 3 · Configuration Elements",
  "partName": "Part 3 · Configuration Elements",
  "overviewText": "Config Elements don't execute anything themselves — they sit in the tree and silently supply default values to samplers in scope. HTTP Request Defaults centralizes Server, Port, and Protocol so you change staging→prod in one place, like Playwright baseURL.",
  "why": "Retyping hrms.bizlevate.com on 30 samplers is how environment switches get missed. Defaults plus closest-scope override is the maintenance win.",
  "when": "The moment you have a second sampler on the same host, or when you switch environments.",
  "practical": {
    "app": "HRM Thread Group with leave + attendance samplers",
    "scenario": "Move the plan from staging to production host.",
    "pass": "You edit one HTTP Request Defaults (https, 443, host); blank sampler host fields inherit; one sampler can still override.",
    "fail": "You hunt-and-replace the hostname on every sampler."
  },
  "tools": [],
  "customSummary": "- Centralizes Server Name, Port, Protocol (and optionally base path) so you don't repeat them on every sampler.\n- Placed at Thread Group scope typically; individual samplers can still override specific fields.\n- Equivalent to setting baseURL once in a Playwright config instead of hardcoding it everywhere.\n- Major maintenance win: change environment (staging→prod) in one place instead of every sampler.",
  "contentMarkdown": "## Defaults, not a sampler\n\nConfig Elements, as introduced in Part 1, don't execute anything themselves — they sit in the tree and silently supply default values to whatever samplers fall within their scope. HTTP Request Defaults is the most commonly used one, and it exists to solve a very practical annoyance: if you're testing dozens of endpoints on the same server, retyping `hrms.bizlevate.com`, port 443, and protocol `https` into every single HTTP Request sampler is tedious and error-prone — and worse, if that server address ever changes (say, moving from a staging environment to production), you'd have to hunt down and update every sampler individually.\n\n## Inherit vs override\n\nInstead, you add one HTTP Request Defaults element — typically directly under the Thread Group, so it applies to every sampler beneath it — and fill in the fields that are common across all your requests: Server Name, Port, Protocol, and sometimes a common base path. Any individual HTTP Request sampler within that scope that leaves those fields blank will automatically inherit the default value; any sampler that explicitly fills in its own value overrides the default for just that request (the same \"closest scope wins\" rule from Part 1's hierarchy discussion applies here directly).\n\n```\nHTTP Request Defaults (placed under Thread Group):\n  Server Name: hrms.bizlevate.com\n  Port: 443\n  Protocol: https\n\nHTTP Request sampler (child, further down):\n  Method: POST\n  Path: /api/v1/leave/apply\n  (Server/Port/Protocol left blank → inherited from Defaults)\n```\n\n## Same idea as Playwright baseURL\n\nThe practical benefit compounds as your test plan grows — this is directly analogous to setting a `baseURL` once in a Playwright config (`playwright.config.ts`) rather than hardcoding the full URL in every `page.goto()` call throughout your test suite. It's a small thing in a 3-sampler test, but on a realistic test plan with 20–30 samplers across multiple modules (Employee Management, Attendance, Payroll), this single config element becomes the one place you touch when environments change — say, switching your entire test plan from a staging server to production by editing one field instead of thirty.",
  "blocks": [
    {
      "id": "jm-3-1-md-0",
      "type": "overview",
      "heading": "Defaults, not a sampler",
      "content": "Config Elements, as introduced in Part 1, don't execute anything themselves — they sit in the tree and silently supply default values to whatever samplers fall within their scope. HTTP Request Defaults is the most commonly used one, and it exists to solve a very practical annoyance: if you're testing dozens of endpoints on the same server, retyping `hrms.bizlevate.com`, port 443, and protocol `https` into every single HTTP Request sampler is tedious and error-prone — and worse, if that server address ever changes (say, moving from a staging environment to production), you'd have to hunt down and update every sampler individually.",
      "order": 0
    },
    {
      "id": "jm-3-1-md-1",
      "type": "overview",
      "heading": "Inherit vs override",
      "content": "Instead, you add one HTTP Request Defaults element — typically directly under the Thread Group, so it applies to every sampler beneath it — and fill in the fields that are common across all your requests: Server Name, Port, Protocol, and sometimes a common base path. Any individual HTTP Request sampler within that scope that leaves those fields blank will automatically inherit the default value; any sampler that explicitly fills in its own value overrides the default for just that request (the same \"closest scope wins\" rule from Part 1's hierarchy discussion applies here directly).\n\n```\nHTTP Request Defaults (placed under Thread Group):\n  Server Name: hrms.bizlevate.com\n  Port: 443\n  Protocol: https\n\nHTTP Request sampler (child, further down):\n  Method: POST\n  Path: /api/v1/leave/apply\n  (Server/Port/Protocol left blank → inherited from Defaults)\n```",
      "order": 1
    },
    {
      "id": "jm-3-1-md-2",
      "type": "overview",
      "heading": "Same idea as Playwright baseURL",
      "content": "The practical benefit compounds as your test plan grows — this is directly analogous to setting a `baseURL` once in a Playwright config (`playwright.config.ts`) rather than hardcoding the full URL in every `page.goto()` call throughout your test suite. It's a small thing in a 3-sampler test, but on a realistic test plan with 20–30 samplers across multiple modules (Employee Management, Attendance, Payroll), this single config element becomes the one place you touch when environments change — say, switching your entire test plan from a staging server to production by editing one field instead of thirty.",
      "order": 2
    }
  ],
  "advantages": [
    "3.1 HTTP Request Defaults — Retyping hrms."
  ],
  "limitations": [
    "3.1 HTTP Request Defaults is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
