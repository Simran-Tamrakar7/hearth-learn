import type { ChapterRecord } from "../../../types";

/** Contract Testing */
export const chapter = {
  "id": "tt-contract-testing",
  "overlayNo": 55,
  "title": "Contract Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "partName": "Part 14 · Advanced Resilience, Chaos & Contracts",
  "overviewText": "Contract testing verifies that two independently developed services — a consumer (e.g. a frontend or another microservice) and a provider (e.g. an API) — agree on the exact shape of their interaction, without requiring either side to run against a full, live instance of the other, by checking each side independently against a shared, explicit contract.",
  "why": "In a microservices or multi-team architecture, spinning up every real dependent service just to test one integration point is slow, brittle, and doesn't scale — but skipping integration verification entirely risks exactly the kind of silent contract-breaking change interface testing (Chapter 11) exists to catch. Contract testing solves this by letting each side test independently against a shared, versioned agreement, catching breaking changes without ever needing a full, live, integrated environment.",
  "when": "In any architecture with multiple independently deployed services or teams that depend on each other's APIs — run in CI on both the consumer and provider sides whenever either changes, specifically before either side is deployed, to catch a contract break before it reaches a real integrated environment.",
  "practical": {
    "app": "HRMS Payroll Frontend and Payslip API",
    "scenario": "The HRMS frontend team defines a Pact contract expecting the /payslip/{id}/latest endpoint to always return net_salary as a number (directly echoing Chapter 11's interface testing example, verified here without needing the frontend and backend running together).",
    "pass": "The backend reverts the field back to a number, Pact verification passes, and both teams can deploy independently with confidence the contract still holds.",
    "fail": "The backend team's Pact verification run fails after a change accidentally starts returning net_salary as a string — caught in the backend team's own CI, before their deploy, without the frontend team's environment needing to be involved at all."
  },
  "advantages": [
    "Verifies real integration compatibility without needing a full live integrated environment",
    "Scales cleanly across dozens of microservices and independent team release cadences",
    "Catches breaking API schema changes immediately in CI before code is deployed",
    "The generated contract acts as living, versioned documentation of API expectations"
  ],
  "limitations": [
    "Requires both consumer and provider teams to adopt and maintain Pact contracts",
    "Does not verify full end-to-end multi-service business logic — complements E2E testing",
    "Upfront setup cost for Pact Broker infrastructure and CI workflows",
    "Contracts must be actively versioned as APIs evolve to avoid schema drift"
  ],
  "tools": [
    {
      "name": "Pact Framework & Pact Broker",
      "sub": "Consumer-Driven Contract Testing Standard",
      "url": "https://pact.io",
      "desc": "An open-source contract testing framework where the consumer defines its expectations of the provider as an explicit, shareable contract file, and the provider then verifies independently that it actually satisfies that same contract.",
      "adv": [
        "Consumer-driven contract generation in JavaScript, Java, Python, Go, and .NET",
        "Pact Broker ('can-i-deploy' CLI tool) prevents deployments if contract verification fails",
        "Eliminates flaky, slow end-to-end integration test environments in CI"
      ],
      "lim": [
        "Requires hosting or using hosted Pact Broker (PactFlow)"
      ],
      "steps": [
        {
          "t": "Step 1 — Consumer defines API expectations in Pact test",
          "p": "Frontend tests define expected JSON structure and publish contract to Pact Broker.",
          "c": "await pact.addInteraction({\n  state: 'a valid employee exists',\n  uponReceiving: 'a request for latest payslip',\n  withRequest: { method: 'GET', path: '/api/payslip/1042/latest' },\n  willRespondWith: {\n    status: 200,\n    body: { net_salary: MatchersV3.number(4500.00) }\n  }\n});"
        },
        {
          "t": "Step 2 — Provider verifies contract independently in CI",
          "p": "Backend runs Pact verification test against its local API server.",
          "c": "npx pact-provider-verifier --provider-base-url=http://localhost:8080 --broker-url=https://pact.internal\nResult: 1 interaction verified successfully (0 contract breaks)"
        },
        {
          "t": "Step 3 — Run can-i-deploy gatekeeper before production release",
          "p": "Verify both frontend and backend versions satisfy compatible contracts.",
          "c": "pact-broker can-i-deploy --pacticipant HRMS-Frontend --version 2.4.0 --to-environment production\nResult: Computer says YES. Safe to deploy."
        }
      ]
    }
  ],
  "contentMarkdown": "## Consumer-Driven Contract Generation & Verification\n\nAuthor consumer contract expectations and execute automated provider verification in CI pipelines.\n\n```\nnpx pact-provider-verifier --provider-base-url=http://localhost:3001 --pact-urls=./pacts/frontend-backend.json\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
