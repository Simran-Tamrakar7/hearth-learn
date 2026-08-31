---
id: "tt-interoperability-testing"
overlayNo: 74
title: "Interoperability Testing"
minutes: 25
partName: "Part 19 · Continuous, Interop, Conformance & Globalization"
level: "intermediate"
overviewText: "Interoperability testing verifies real exchanges with independent systems you do not control — partners, third-party APIs — not mocks of them."
why: "Chapter 2 integration tests against mocks cannot catch a real mismatch between what you assume a partner does and what they actually do."
when: "Whenever the app exchanges data with an external system — bank files, tax APIs, SSO — against a real or sandboxed instance."
practical: {"app":"HRMS Bank File Export","scenario":"Payroll export tested against a client's banking import sandbox.","pass":"Export matches the bank's fixed-width spec; sandbox import is clean.","fail":"Internal validation passes; the bank rejects a variable-width routing number."}
---

## Hit the real partner

Save the exchange as a Postman collection.
