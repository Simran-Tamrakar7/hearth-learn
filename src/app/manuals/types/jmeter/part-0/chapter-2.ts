import type { ChapterRecord } from "../../../types";

/** 0.2 Installing JMeter */
export const chapter = {
  "id": "jm-0-2-installing-jmeter",
  "title": "0.2 Installing JMeter",
  "minutes": 22,
  "level": "beginner",
  "phase": "Part 0 · Orientation",
  "partName": "Part 0 · Orientation",
  "overviewText": "JMeter is a Java application, so the first prerequisite is a JDK — not just a JRE — since JMeter needs it for some plugin and scripting functionality. Installation is extract-and-run: download the binary archive, open bin/jmeter.sh or jmeter.bat, and treat the GUI as a design tool, not a load generator.",
  "why": "A common first-week mistake is running a 500-user test in the GUI. You need the JDK vs JRE distinction, the bin/ scripts, and the GUI-vs-CLI split on day one so later results are actually about the server.",
  "when": "Before your first launch, when Java isn't on PATH, or when someone wants to hammer staging from the Swing window.",
  "practical": {
    "app": "Local JMeter install on Mac/Windows",
    "scenario": "You download JMeter to start designing an HRM leave-apply load test.",
    "pass": "You confirm Java 11+, extract the binary (not source), launch from bin/, and plan real load for CLI -n later — Plugins Manager early.",
    "fail": "You install only a JRE, run the source zip, or start a 500-thread test in the GUI on day one."
  },
  "tools": [],
  "customSummary": "- Requires JDK (Java 8+, ideally 11+); check with java -version.\n- Download binary .zip/.tgz from Apache JMeter site, extract, no installer needed.\n- Launch via bin/jmeter.sh (Mac/Linux) or bin/jmeter.bat (Windows) — opens GUI.\n- GUI mode = design/debug only; real load tests run via CLI (-n flag, covered in Part 9).\n- Never run heavy load tests inside the GUI — it skews results by consuming its own CPU/memory.\n- Install JMeter Plugins Manager early for commonly needed non-core elements.",
  "contentMarkdown": "## JDK first\n\nJMeter is a Java application, so the first prerequisite is a JDK (Java Development Kit) — not just a JRE — since JMeter needs it for some plugin and scripting functionality. You'll want at least Java 8, though Java 11+ is recommended for current JMeter versions. You can check your installed version with `java -version` in a terminal.\n\n## Download and extract — no installer\n\nOnce Java is confirmed, installation itself is straightforward: download the binary archive (not the source) from the official Apache JMeter website — you'll get a `.zip` (Windows) or `.tgz` (Mac/Linux) file. Extract it anywhere; there's no installer/setup wizard. Inside the extracted folder, the important subfolder is `bin/`, which contains the executable scripts: `jmeter.bat` for Windows and `jmeter.sh` for Mac/Linux. Running that script launches the JMeter GUI.\n\n```bash\n# Mac/Linux\ncd apache-jmeter-5.6.3/bin\n./jmeter.sh\n\n# Windows\ncd apache-jmeter-5.6.3\\bin\njmeter.bat\n```\n\n## GUI vs CLI from day one\n\nA key distinction to understand from day one is GUI mode vs CLI (non-GUI) mode. The GUI is what opens when you run the script above — a Java Swing interface where you build your test plan visually, similar to how you might build a Playwright test by clicking through Codegen.\n\nBut JMeter's GUI is explicitly not meant to be used for actually generating load; it's a design/debugging tool only. Real load runs happen from the command line using the `-n` flag, which we'll cover properly in Part 9 (Distributed Testing) — but it's worth knowing this distinction exists from the very start, because a common beginner mistake is running a 500-user load test directly in the GUI, which will make JMeter itself consume so much CPU/memory that your results become meaningless (you'd be measuring JMeter's own struggle, not your server's).\n\n## Plugins Manager early\n\nAfter installation, it's worth installing the JMeter Plugins Manager (covered in Appendix D) early, since many commonly used elements (like Custom Thread Groups for realistic load shapes, or the Throughput Shaping Timer) aren't in JMeter core and need to be added via this plugin manager.",
  "blocks": [
    {
      "id": "jm-0-2-md-0",
      "type": "overview",
      "heading": "JDK first",
      "content": "JMeter is a Java application, so the first prerequisite is a JDK (Java Development Kit) — not just a JRE — since JMeter needs it for some plugin and scripting functionality. You'll want at least Java 8, though Java 11+ is recommended for current JMeter versions. You can check your installed version with `java -version` in a terminal.",
      "order": 0
    },
    {
      "id": "jm-0-2-md-1",
      "type": "overview",
      "heading": "Download and extract — no installer",
      "content": "Once Java is confirmed, installation itself is straightforward: download the binary archive (not the source) from the official Apache JMeter website — you'll get a `.zip` (Windows) or `.tgz` (Mac/Linux) file. Extract it anywhere; there's no installer/setup wizard. Inside the extracted folder, the important subfolder is `bin/`, which contains the executable scripts: `jmeter.bat` for Windows and `jmeter.sh` for Mac/Linux. Running that script launches the JMeter GUI.\n\n```bash\n# Mac/Linux\ncd apache-jmeter-5.6.3/bin\n./jmeter.sh\n\n# Windows\ncd apache-jmeter-5.6.3\\bin\njmeter.bat\n```",
      "order": 1
    },
    {
      "id": "jm-0-2-md-2",
      "type": "overview",
      "heading": "GUI vs CLI from day one",
      "content": "A key distinction to understand from day one is GUI mode vs CLI (non-GUI) mode. The GUI is what opens when you run the script above — a Java Swing interface where you build your test plan visually, similar to how you might build a Playwright test by clicking through Codegen.\n\nBut JMeter's GUI is explicitly not meant to be used for actually generating load; it's a design/debugging tool only. Real load runs happen from the command line using the `-n` flag, which we'll cover properly in Part 9 (Distributed Testing) — but it's worth knowing this distinction exists from the very start, because a common beginner mistake is running a 500-user load test directly in the GUI, which will make JMeter itself consume so much CPU/memory that your results become meaningless (you'd be measuring JMeter's own struggle, not your server's).",
      "order": 2
    },
    {
      "id": "jm-0-2-md-3",
      "type": "overview",
      "heading": "Plugins Manager early",
      "content": "After installation, it's worth installing the JMeter Plugins Manager (covered in Appendix D) early, since many commonly used elements (like Custom Thread Groups for realistic load shapes, or the Throughput Shaping Timer) aren't in JMeter core and need to be added via this plugin manager.",
      "order": 3
    }
  ],
  "advantages": [
    "0.2 Installing JMeter — A common first-week mistake is running a 500-user test in the GUI."
  ],
  "limitations": [
    "0.2 Installing JMeter is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
