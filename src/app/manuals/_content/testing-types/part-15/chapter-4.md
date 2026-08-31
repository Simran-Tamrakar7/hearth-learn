---
id: "tt-documentation-testing"
overlayNo: 60
title: "Documentation Testing"
minutes: 15
partName: "Part 15 · Environment, Migration & Disaster Recovery"
level: "beginner"
overviewText: "Documentation testing verifies that an application's supporting documentation — user guides, API documentation, help articles, installation instructions, README files — is accurate, complete, and actually works when followed exactly as written, rather than assuming documentation is correct simply because it exists."
why: "Documentation is often written once, early, and then never re-verified as the underlying application evolves — a screenshot goes stale, a described step no longer matches the current UI, an API example uses a field that's since been renamed. Users who follow inaccurate documentation don't just fail to complete their task; they often lose trust in the product entirely, assuming (reasonably) that if the documentation is wrong, the product itself might be too."
when: "Whenever documentation is written or updated, and periodically thereafter as the underlying application changes — especially important to re-verify after any UI change, API change, or feature update that the existing documentation describes, since documentation drift accumulates silently over time."
practical: {"app":"HRMS API Documentation","scenario":"A tester follows the public API documentation's example request for creating a leave request exactly as written.","pass":"The documentation is corrected to match the current field name, the exact documented example is re-tested and now succeeds as written, and a note is added to the release checklist to re-verify API docs on any field-naming change going forward.","fail":"The documented example uses a field named leave_type, but the actual current API expects type — the field was renamed three releases ago and the documentation was never updated, meaning every developer following the docs exactly as written gets an immediate, confusing 400 error."}
advantages: ["Catches user-facing blockers invisible to automated code tests when the software works but docs are wrong","Fresh-reader audits surface hidden domain assumptions the original developer overlooked","Directly protects customer trust and reduces costly customer support ticket volumes","API documentation testing acts as contract verification between developer teams"]
limitations: ["Purely manual and vulnerable to being deprioritized under tight delivery deadlines","Documentation drift re-accumulates quickly if not embedded in release checklists","Does not automatically scale across hundreds of localized help articles","Evaluating clarity and structure requires qualitative writing judgment rather than binary pass/fail checks"]
tools: [{"name":"Manual Documentation & API Verification","sub":"Literal Execution & Fresh-Reader Audit","url":"https://hearth-learn.vercel.app/manuals/testing-types","seeChapter":5,"desc":"A rigorous review practice (see Chapter 5) where an independent tester executes every code sample, cURL command, and UI click instruction verbatim without prior assumptions.","adv":["Guarantees every code sample in API docs executes successfully out-of-the-box","Audits documentation links, screenshots, and parameter schemas against live build"],"lim":["Requires dedicated manual review time on each feature release"],"steps":[{"t":"Step 1 — Execute documented API cURL snippet verbatim","p":"Copy exact JSON payload from docs portal and send request to staging endpoint.","c":"curl -X POST https://api.hrms.com/v1/leave \\\n  -H \"Authorization: Bearer <TOKEN>\" \\\n  -H \"Content-Type: application/json\" \\\n  -d '{\"type\": \"VACATION\", \"startDate\": \"2026-09-01\", \"days\": 3}'"},{"t":"Step 2 — Assert response matches documented schema","p":"Compare HTTP 201 response JSON with published docs example.","c":"Documented Schema: { \"id\": \"LV-104\", \"status\": \"PENDING\" }\nActual Server Response: { \"id\": \"LV-104\", \"status\": \"PENDING\" } -> 100% MATCH (PASS)"}]}]
---

## Verbatim Documentation Sample Execution

Copy and execute every code snippet, cURL command, and onboarding step from documentation verifying 100% accuracy.

```
npx dredd api-spec.yaml https://staging.hrms.com/api
```
