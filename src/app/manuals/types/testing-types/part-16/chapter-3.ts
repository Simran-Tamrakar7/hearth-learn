import type { ChapterRecord } from "../../../types";

/** Parallel Testing */
export const chapter = {
  "id": "tt-parallel-testing",
  "overlayNo": 63,
  "title": "Parallel Testing",
  "minutes": 25,
  "level": "intermediate",
  "phase": "Part 16 · Governance, Deployment Strategies & Integration",
  "partName": "Part 16 · Governance, Deployment Strategies & Integration",
  "overviewText": "Parallel testing runs the old and new versions of a system side by side, processing the exact same real input through both simultaneously, and directly compares their outputs — verifying the new system produces correct, equivalent results before fully cutting over and retiring the old one.",
  "why": "When replacing a critical system — especially one handling financial calculations, payroll, or other high-stakes logic — trusting the new system's correctness based on its own tests alone can be risky if the old system has years of real-world-proven behavior, including undocumented edge-case handling nobody fully wrote down. Parallel testing sidesteps that risk entirely: instead of trusting the new system's tests in isolation, it directly proves the new system produces the same results as the trusted old one, using real production input, before the old system is ever turned off.",
  "when": "When replacing a critical, high-stakes system with real financial, legal, or safety consequences if the replacement gets something subtly wrong — run for a defined period processing real, live input through both systems before fully committing to the cutover and decommissioning the old system.",
  "practical": {
    "app": "HRMS Payroll Calculation Migration",
    "scenario": "The new HRMS's payroll calculation engine is run in parallel with the legacy system for two full monthly payroll cycles, with the legacy system's output remaining the one actually used to pay employees.",
    "pass": "The new system's rounding logic is corrected to match the legacy system's documented (and legally required) rounding rule, a repeat parallel run shows zero discrepancies across two full cycles, and the team proceeds to cut over with genuine confidence.",
    "fail": "A comparison script flags a discrepancy for 8 employees with overtime hours — the new system calculates overtime pay using a slightly different rounding rule than the legacy system, a subtle difference invisible in the new system's own unit tests, which had rounded consistently but not identically to the old system's real behavior."
  },
  "advantages": [
    "Directly proves correctness against a battle-tested legacy system using real production payloads",
    "Catches subtle arithmetic, rounding, and business logic discrepancies invisible in standalone unit tests",
    "Zero business risk during evaluation since legacy system remains the authoritative source of truth",
    "Gives executive stakeholders empirical mathematical proof before authorizing legacy retirement"
  ],
  "limitations": [
    "High infrastructure and operational cost maintaining two live systems simultaneously",
    "Comparison script is only as good as the assertions it encodes — uncompared fields can harbor bugs",
    "Intended feature changes require manual triage so expected improvements aren't flagged as errors",
    "Significantly extends migration timelines by requiring multiple parallel billing/payroll cycles"
  ],
  "tools": [
    {
      "name": "Custom Dual-Run Comparison Scripts",
      "sub": "Automated Python & SQL Discrepancy Diffing",
      "url": "https://hearth-learn.vercel.app/manuals/testing-types",
      "desc": "Automated scripts that feed identical input batches to legacy and modern systems simultaneously, diffing every resulting field in milliseconds.",
      "adv": [
        "Compares thousands of financial records down to the cent in seconds",
        "Generates granular CSV discrepancy logs for accounting teams"
      ],
      "lim": [
        "Requires writing custom diffing scripts tailored to both schemas"
      ],
      "steps": [
        {
          "t": "Step 1 — Feed identical monthly timesheet batch to both engines",
          "p": "Execute payroll calculation in Legacy HRMS and New Cloud HRMS simultaneously.",
          "c": "python3 run_parallel_payroll.py --month=2026-08 --employees=14250"
        },
        {
          "t": "Step 2 — Execute automated SQL diff query in DBeaver",
          "p": "Audit net_salary, tax_deduction, and overtime_pay across both calculation tables.",
          "c": "SELECT l.emp_id, l.net_pay AS legacy_pay, n.net_pay AS new_pay, (n.net_pay - l.net_pay) AS diff\nFROM legacy_payroll l\nJOIN new_payroll n ON l.emp_id = n.emp_id\nWHERE abs(n.net_pay - l.net_pay) > 0.001;"
        },
        {
          "t": "Step 3 — Analyze discrepancy output",
          "p": "Confirm 0 discrepancies across all 14,250 records across 2 consecutive months.",
          "c": "Result: 0 rows returned | 100.00% Net Salary Match -> AUTHORIZED FOR CUTOVER"
        }
      ]
    }
  ],
  "contentMarkdown": "## Dual-Engine Output Comparison & Diff Auditing\n\nFeed identical input transaction streams to legacy and replacement engines asserting identical calculated values.\n\n```\npython3 scripts/diff_parallel_runs.py --legacy-output=old.csv --new-output=new.csv\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
