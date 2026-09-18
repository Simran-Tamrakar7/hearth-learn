import type { ChapterRecord } from "../../../types";

/** 9.2 Running Tests from CLI (Non-GUI Mode) */
export const chapter = {
  "id": "jm-9-2-running-tests-from-cli-non-gui-mode",
  "title": "9.2 Running Tests from CLI (Non-GUI Mode)",
  "minutes": 22,
  "level": "advanced",
  "phase": "Part 9 · Distributed Testing",
  "partName": "Part 9 · Distributed Testing",
  "overviewText": "The core command is jmeter -n -t plan.jmx -l results.jtl -e -o /report. GUI vs CLI is not a small speed difference — it changes numbers. Workflow: debug in GUI at 1 thread, execute real runs in CLI. CLI is what CI can call, like npx playwright test.",
  "why": "The green Start button is convenience that invalidates load numbers. -l is the source of truth for Part 10/11.",
  "when": "Every load/stress/soak after the plan is validated; every pipeline.",
  "practical": {
    "app": "leave_request_load_test.jmx",
    "scenario": "Run the validated plan for real and keep a dashboard.",
    "pass": "You use -n -t -l -e -o, no View Results Tree, same .jmx you debugged at 1 thread.",
    "fail": "You hit Start in the GUI with 200 threads because the plan is 'ready.'"
  },
  "tools": [],
  "customSummary": "- Core command: jmeter -n -t test_plan.jmx -l results.jtl -e -o /path/to/report.\n- -n = non-GUI, -t = test plan file (.jmx), -l = raw results log (.jtl), -e -o = generate HTML dashboard report (Part 10).\n- CLI mode has dramatically lower overhead than GUI mode — same test plan can produce meaningfully different results between the two.\n- Standard workflow: build/debug in GUI with trivial thread count → execute all real runs via CLI.\n- CLI mode enables automation — fits into scripts, scheduled jobs, CI/CD pipelines (Part 11), unlike the GUI.",
  "contentMarkdown": "## The command\n\nThis chapter formalizes something flagged as a rule-to-remember all the way back in Part 0 Chapter 2 — that the JMeter GUI is a design and debugging tool, and real load generation belongs in CLI (non-GUI) mode — by actually walking through how it works and why it matters so much more than a passing best-practice tip.\n\nThe core command is straightforward:\n\n```bash\njmeter -n -t test_plan.jmx -l results.jtl -e -o /path/to/report\n```\n\nBreaking down each flag: `-n` tells JMeter to run in non-GUI mode. `-t` specifies the path to your test plan file (JMeter saves test plans as `.jmx` files — XML under the hood, though you'll almost never hand-edit them directly given the GUI's tree-building approach). `-l` specifies the output log file (`.jtl`, typically CSV or XML format) where every sample result gets recorded — this file is the raw data source for all your later analysis, and it's worth understanding that GUI listeners like Summary Report or Aggregate Report are essentially just live views into data that, in CLI mode, gets written straight to this log file instead. The `-e -o` combination (covered in more depth in Part 10) tells JMeter to additionally generate a full HTML dashboard report from the results once the test completes, writing it to the specified output directory.\n\n## GUI vs CLI is not 'just slower'\n\nThe performance difference between GUI and CLI mode isn't marginal — it's dramatic. The GUI's tree rendering, live listener updates, and general Java Swing overhead consume meaningful CPU and memory that has nothing to do with your actual test logic, meaning the same test plan, run via GUI versus CLI, can produce measurably different results purely due to tooling overhead — and at higher thread counts, a GUI run may simply become unstable or crash long before CLI mode would hit any comparable limit.\n\nThis is why the standard, non-negotiable real-world workflow is: build and debug in GUI mode with a trivial thread count (as established in Part 2), then execute every actual load/stress/soak run via CLI mode, treating the GUI purely as a design surface you never touch again once a test plan is validated and ready to run for real.\n\nIt's also worth knowing that CLI mode is what makes JMeter genuinely automatable — since it's just a command with flags and file paths, it fits naturally into scripts, scheduled jobs, and (directly relevant to Part 11) CI/CD pipelines, in a way that a GUI application fundamentally cannot. This is a meaningful parallel to how you'd run Playwright tests in CI via `npx playwright test` rather than manually clicking through the Playwright UI mode — the interactive tool is for development, the CLI is for real, repeatable, automatable execution.",
  "blocks": [
    {
      "id": "jm-9-2-md-0",
      "type": "overview",
      "heading": "The command",
      "content": "This chapter formalizes something flagged as a rule-to-remember all the way back in Part 0 Chapter 2 — that the JMeter GUI is a design and debugging tool, and real load generation belongs in CLI (non-GUI) mode — by actually walking through how it works and why it matters so much more than a passing best-practice tip.\n\nThe core command is straightforward:\n\n```bash\njmeter -n -t test_plan.jmx -l results.jtl -e -o /path/to/report\n```\n\nBreaking down each flag: `-n` tells JMeter to run in non-GUI mode. `-t` specifies the path to your test plan file (JMeter saves test plans as `.jmx` files — XML under the hood, though you'll almost never hand-edit them directly given the GUI's tree-building approach). `-l` specifies the output log file (`.jtl`, typically CSV or XML format) where every sample result gets recorded — this file is the raw data source for all your later analysis, and it's worth understanding that GUI listeners like Summary Report or Aggregate Report are essentially just live views into data that, in CLI mode, gets written straight to this log file instead. The `-e -o` combination (covered in more depth in Part 10) tells JMeter to additionally generate a full HTML dashboard report from the results once the test completes, writing it to the specified output directory.",
      "order": 0
    },
    {
      "id": "jm-9-2-md-1",
      "type": "overview",
      "heading": "GUI vs CLI is not 'just slower'",
      "content": "The performance difference between GUI and CLI mode isn't marginal — it's dramatic. The GUI's tree rendering, live listener updates, and general Java Swing overhead consume meaningful CPU and memory that has nothing to do with your actual test logic, meaning the same test plan, run via GUI versus CLI, can produce measurably different results purely due to tooling overhead — and at higher thread counts, a GUI run may simply become unstable or crash long before CLI mode would hit any comparable limit.\n\nThis is why the standard, non-negotiable real-world workflow is: build and debug in GUI mode with a trivial thread count (as established in Part 2), then execute every actual load/stress/soak run via CLI mode, treating the GUI purely as a design surface you never touch again once a test plan is validated and ready to run for real.\n\nIt's also worth knowing that CLI mode is what makes JMeter genuinely automatable — since it's just a command with flags and file paths, it fits naturally into scripts, scheduled jobs, and (directly relevant to Part 11) CI/CD pipelines, in a way that a GUI application fundamentally cannot. This is a meaningful parallel to how you'd run Playwright tests in CI via `npx playwright test` rather than manually clicking through the Playwright UI mode — the interactive tool is for development, the CLI is for real, repeatable, automatable execution.",
      "order": 1
    }
  ],
  "advantages": [
    "9.2 Running Tests from CLI (Non-GUI Mode) — The green Start button is convenience that invalidates load numbers."
  ],
  "limitations": [
    "9.2 Running Tests from CLI (Non-GUI Mode) is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
