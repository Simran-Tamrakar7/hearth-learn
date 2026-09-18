import type { ChapterRecord } from "../../../types";

/** D. Useful plugins */
export const chapter = {
  "id": "jm-12-4-useful-plugins",
  "title": "D. Useful plugins",
  "minutes": 22,
  "level": "intermediate",
  "phase": "Part 12 · Appendices",
  "partName": "Part 12 · Appendices",
  "overviewText": "Plugins Manager is one JAR in lib/ext then Options → Plugins Manager. Ultimate Thread Group for multi-stage days. Throughput Shaping Timer for ramping RPS. PerfMon for server CPU/memory vs client times. Extra graphs for deeper viz. Default to core; add plugins for a named gap.",
  "why": "Standard Thread Group cannot express morning peak / midday lull / afternoon peak. PerfMon answers 'was it the server or JMeter?'",
  "when": "You need staged profiles, dynamic stress rates, or host metrics next to p95.",
  "practical": {
    "app": "Full-day HRM traffic shape",
    "scenario": "Morning peak, lull, afternoon peak, then find the RPS cliff.",
    "pass": "You install Plugins Manager, Ultimate Thread Group for stages, Throughput Shaping for rising RPS, PerfMon if you need server correlation.",
    "fail": "You install every plugin 'just in case' and stack awkward standard Thread Groups for a day shape."
  },
  "tools": [],
  "customSummary": "- JMeter Plugins Manager: single JAR install, GUI-based plugin browser/installer.\n- Ultimate Thread Group: multi-stage load profiles beyond standard single ramp/hold/stop.\n- Throughput Shaping Timer: dynamic (changing-over-time) throughput targets, useful for stress testing.\n- PerfMon: correlates server-side resource metrics (CPU/memory) with client-observed response times.\n- Custom/Additional Graphs: extra visualization options beyond the standard dashboard.\n- Default to built-in elements first; add plugins deliberately for genuine gaps, not preemptively.",
  "contentMarkdown": "## JMeter Plugins Manager\n\nJMeter's core distribution deliberately doesn't include every useful element — a healthy plugin ecosystem exists specifically to extend it, and the JMeter Plugins Manager (flagged briefly back in Part 0 Chapter 2) is the entry point to nearly all of it. It's installed by downloading a single `.jar` file from the JMeter-Plugins.org project page and dropping it into JMeter's `lib/ext` folder, after which a new \"Plugins Manager\" option appears in JMeter's Options menu, giving you a searchable, checkbox-based interface to install additional plugins without manually hunting down and placing individual JAR files yourself.\n\n## Custom Thread Groups\n\nCustom Thread Groups (part of the \"jpgc - Custom Thread Groups\" plugin set) address a real limitation of the standard Thread Group covered in Part 1 — its ramp-up/steady-state/ramp-down shape (Part 8 Chapter 2) is fundamentally a single linear ramp up, hold, then implicit stop. The Ultimate Thread Group plugin lets you define multiple distinct load stages in a table — ramp up to X, hold, ramp up further to Y, hold, ramp down partially, hold again, ramp down to zero — enabling genuinely complex, multi-stage load profiles (useful for modeling a realistic full-day traffic pattern with a morning peak, midday lull, and afternoon peak, rather than one flat plateau) that the standard Thread Group simply cannot express without stacking multiple Thread Groups awkwardly.\n\n## Throughput Shaping Timer\n\nThroughput Shaping Timer (also jpgc) extends the pacing concept from Part 8 Chapter 3 beyond the built-in Constant Throughput Timer's single fixed target — letting you define a throughput target that itself changes over time (e.g., ramp target throughput from 10/sec to 200/sec over 10 minutes), which is particularly valuable for stress testing (Part 8 Chapter 1) where you specifically want to probe an increasing rate until you find where the system starts failing, rather than testing at one fixed rate throughout.\n\n## PerfMon\n\nPerfMon (Server Performance Monitoring) plugin adds the ability to collect server-side resource metrics (CPU, memory, disk I/O on the target system itself) directly into your JMeter results, correlating client-observed response times (Part 10) with what was actually happening on the server at that same moment — genuinely valuable for root-causing why a slow period occurred (was the server CPU-bound? Memory-constrained? Or was the slowness actually on JMeter's own side, tying back to Appendix A's troubleshooting guidance) rather than only ever seeing the symptom from the client side.\n\n## Extra graphs — and plugin discipline\n\nCustom Graphs / Additional Graphs plugins extend the visualization options beyond what's built into the standard dashboard (Part 10 Chapter 3) — response-time-over-time graphs, connect-time distributions, and other visualizations useful for deeper analysis when the standard HTML dashboard's summary view doesn't answer a specific question you're investigating.\n\nA practical closing note on plugin usage generally: because plugins add dependencies and complexity beyond JMeter's well-documented core, it's worth defaulting to built-in elements (everything covered in Parts 1–7) for the majority of test plans, and reaching for specific plugins deliberately when a genuine gap appears — Custom Thread Groups for realistic multi-stage load shapes, Throughput Shaping Timer for dynamic-rate stress testing, PerfMon when server-side correlation is specifically needed — rather than installing plugins broadly \"just in case,\" which mirrors the same discipline established in Part 6 about not reaching for JSR223 scripting until the built-in declarative elements genuinely can't express what you need.",
  "blocks": [
    {
      "id": "jm-12-4-md-0",
      "type": "overview",
      "heading": "JMeter Plugins Manager",
      "content": "JMeter's core distribution deliberately doesn't include every useful element — a healthy plugin ecosystem exists specifically to extend it, and the JMeter Plugins Manager (flagged briefly back in Part 0 Chapter 2) is the entry point to nearly all of it. It's installed by downloading a single `.jar` file from the JMeter-Plugins.org project page and dropping it into JMeter's `lib/ext` folder, after which a new \"Plugins Manager\" option appears in JMeter's Options menu, giving you a searchable, checkbox-based interface to install additional plugins without manually hunting down and placing individual JAR files yourself.",
      "order": 0
    },
    {
      "id": "jm-12-4-md-1",
      "type": "overview",
      "heading": "Custom Thread Groups",
      "content": "Custom Thread Groups (part of the \"jpgc - Custom Thread Groups\" plugin set) address a real limitation of the standard Thread Group covered in Part 1 — its ramp-up/steady-state/ramp-down shape (Part 8 Chapter 2) is fundamentally a single linear ramp up, hold, then implicit stop. The Ultimate Thread Group plugin lets you define multiple distinct load stages in a table — ramp up to X, hold, ramp up further to Y, hold, ramp down partially, hold again, ramp down to zero — enabling genuinely complex, multi-stage load profiles (useful for modeling a realistic full-day traffic pattern with a morning peak, midday lull, and afternoon peak, rather than one flat plateau) that the standard Thread Group simply cannot express without stacking multiple Thread Groups awkwardly.",
      "order": 1
    },
    {
      "id": "jm-12-4-md-2",
      "type": "overview",
      "heading": "Throughput Shaping Timer",
      "content": "Throughput Shaping Timer (also jpgc) extends the pacing concept from Part 8 Chapter 3 beyond the built-in Constant Throughput Timer's single fixed target — letting you define a throughput target that itself changes over time (e.g., ramp target throughput from 10/sec to 200/sec over 10 minutes), which is particularly valuable for stress testing (Part 8 Chapter 1) where you specifically want to probe an increasing rate until you find where the system starts failing, rather than testing at one fixed rate throughout.",
      "order": 2
    },
    {
      "id": "jm-12-4-md-3",
      "type": "overview",
      "heading": "PerfMon",
      "content": "PerfMon (Server Performance Monitoring) plugin adds the ability to collect server-side resource metrics (CPU, memory, disk I/O on the target system itself) directly into your JMeter results, correlating client-observed response times (Part 10) with what was actually happening on the server at that same moment — genuinely valuable for root-causing why a slow period occurred (was the server CPU-bound? Memory-constrained? Or was the slowness actually on JMeter's own side, tying back to Appendix A's troubleshooting guidance) rather than only ever seeing the symptom from the client side.",
      "order": 3
    },
    {
      "id": "jm-12-4-md-4",
      "type": "overview",
      "heading": "Extra graphs — and plugin discipline",
      "content": "Custom Graphs / Additional Graphs plugins extend the visualization options beyond what's built into the standard dashboard (Part 10 Chapter 3) — response-time-over-time graphs, connect-time distributions, and other visualizations useful for deeper analysis when the standard HTML dashboard's summary view doesn't answer a specific question you're investigating.\n\nA practical closing note on plugin usage generally: because plugins add dependencies and complexity beyond JMeter's well-documented core, it's worth defaulting to built-in elements (everything covered in Parts 1–7) for the majority of test plans, and reaching for specific plugins deliberately when a genuine gap appears — Custom Thread Groups for realistic multi-stage load shapes, Throughput Shaping Timer for dynamic-rate stress testing, PerfMon when server-side correlation is specifically needed — rather than installing plugins broadly \"just in case,\" which mirrors the same discipline established in Part 6 about not reaching for JSR223 scripting until the built-in declarative elements genuinely can't express what you need.",
      "order": 4
    }
  ],
  "advantages": [
    "D. Useful plugins — Standard Thread Group cannot express morning peak / midday lull / afternoon peak."
  ],
  "limitations": [
    "D. Useful plugins is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
