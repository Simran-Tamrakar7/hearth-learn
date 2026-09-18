import type { ChapterRecord } from "../../../types";

/** 9.3 Why GUI Mode Is Bad for Actual Load Generation */
export const chapter = {
  "id": "jm-9-3-why-gui-mode-is-bad-for-actual-load-generation",
  "title": "9.3 Why GUI Mode Is Bad for Actual Load Generation",
  "minutes": 20,
  "level": "advanced",
  "phase": "Part 9 · Distributed Testing",
  "partName": "Part 9 · Distributed Testing",
  "overviewText": "UI redraw and listeners starve virtual-user threads. View Results Tree memory scales with every sample and can crash JMeter. GUI overhead vs thread count is not linear — low-thread GUI numbers are not a scaled preview of high load. GUI = correctness (1–2 threads); CLI/distributed = scale.",
  "why": "This is the most common structural beginner mistake: one green Start for both 'does it work' and 'how does prod feel.' Those are different jobs.",
  "when": "Whenever it's tempting to keep the GUI open because you already used it to build the tree.",
  "practical": {
    "app": "Validated leave plan, ready for 500 users",
    "scenario": "Colleague suggests just clicking Start to 'see live graphs.'",
    "pass": "You refuse GUI load, run CLI, generate the dashboard; you know live GUI graphs at 500 users would measure JMeter's UI.",
    "fail": "You keep View Results Tree on 'just this once' at 500 threads."
  },
  "tools": [],
  "customSummary": "- UI rendering/listener updates compete for the same CPU/memory that virtual user threads need — starves real load generation as thread count climbs.\n- View Results Tree and similar listeners store full request/response data per sample — memory usage scales badly, can crash JMeter at real volumes.\n- GUI overhead doesn't scale predictably with thread count — low-thread-count GUI results are NOT a safe, valid preview of higher-scale behavior.\n- Core rule: GUI mode = test plan correctness (needs only 1-2 threads); CLI/distributed mode = real-scale test execution — conflating the two is the most common beginner mistake.",
  "contentMarkdown": "## Why the rule exists, mechanically\n\nThis closing chapter consolidates and makes explicit a theme that's been repeated in pieces since Part 0 — worth doing deliberately, because \"don't use the GUI for real load\" is exactly the kind of rule that's easy to nod along with in the abstract but still accidentally violate in practice once you're deep in building a test plan and it's convenient to just hit the green Start button you've been using the whole time.\n\nThe concrete mechanisms behind why GUI mode degrades results are worth naming specifically, not just asserted as a rule to trust blindly. Every visual tree update, every listener rendering results live, every bit of Java Swing UI redraw logic competes directly for the same CPU cycles and memory your virtual user threads need to actually generate accurate, unthrottled load — so as thread count climbs, JMeter's own UI machinery increasingly starves the very threads meant to be hammering your target system, meaning response times you observe may reflect JMeter's internal contention rather than your server's genuine behavior.\n\nListeners like View Results Tree (Part 1, Part 2) make this dramatically worse, since storing full request/response bodies for every single sample in memory scales linearly (or worse) with total sample count — at real load test volumes (thousands or millions of samples across a sustained run), this can exhaust available memory entirely, crashing JMeter itself well before you've learned anything about your actual target system's limits.\n\n## Not a scaled-down preview\n\nThere's also a subtler point worth understanding: because GUI mode's overhead scales with thread count and sample volume in ways that are hard to predict precisely, a test that behaves fine in GUI mode at low thread counts can become invalid, not just slower, at higher counts — meaning you can't simply say \"GUI mode is fine, just slower\" and treat its numbers as a scaled-down but still-valid preview of real behavior. The relationship between GUI overhead and thread count isn't linear or predictable enough to extrapolate from safely, which is exactly why the discipline established in Part 2 (validate correctness with 1–2 threads in GUI mode) and reinforced in Chapter 2 above (run all real load through CLI) isn't just tidiness — it's the difference between a load test that tells you something true about your system and one that mostly tells you about JMeter's own resource ceiling.\n\n## Two jobs, two modes\n\nThe practical rule that ties this whole Part together: GUI mode exists for test plan correctness (does this sampler send the right request, does this assertion catch the right failure, does this extractor pull the right value) — questions that genuinely only need one or two threads to answer. CLI mode, potentially distributed across multiple agent machines (Chapter 1), exists for test execution at real scale — questions about how your system behaves under dozens, hundreds, or thousands of concurrent users. Conflating these two purposes, or trying to get both answers from the same GUI run, is the single most common structural mistake beginners make with JMeter, and avoiding it is less about memorizing a rule than about internalizing why the tool is built this way in the first place.",
  "blocks": [
    {
      "id": "jm-9-3-md-0",
      "type": "overview",
      "heading": "Why the rule exists, mechanically",
      "content": "This closing chapter consolidates and makes explicit a theme that's been repeated in pieces since Part 0 — worth doing deliberately, because \"don't use the GUI for real load\" is exactly the kind of rule that's easy to nod along with in the abstract but still accidentally violate in practice once you're deep in building a test plan and it's convenient to just hit the green Start button you've been using the whole time.\n\nThe concrete mechanisms behind why GUI mode degrades results are worth naming specifically, not just asserted as a rule to trust blindly. Every visual tree update, every listener rendering results live, every bit of Java Swing UI redraw logic competes directly for the same CPU cycles and memory your virtual user threads need to actually generate accurate, unthrottled load — so as thread count climbs, JMeter's own UI machinery increasingly starves the very threads meant to be hammering your target system, meaning response times you observe may reflect JMeter's internal contention rather than your server's genuine behavior.\n\nListeners like View Results Tree (Part 1, Part 2) make this dramatically worse, since storing full request/response bodies for every single sample in memory scales linearly (or worse) with total sample count — at real load test volumes (thousands or millions of samples across a sustained run), this can exhaust available memory entirely, crashing JMeter itself well before you've learned anything about your actual target system's limits.",
      "order": 0
    },
    {
      "id": "jm-9-3-md-1",
      "type": "overview",
      "heading": "Not a scaled-down preview",
      "content": "There's also a subtler point worth understanding: because GUI mode's overhead scales with thread count and sample volume in ways that are hard to predict precisely, a test that behaves fine in GUI mode at low thread counts can become invalid, not just slower, at higher counts — meaning you can't simply say \"GUI mode is fine, just slower\" and treat its numbers as a scaled-down but still-valid preview of real behavior. The relationship between GUI overhead and thread count isn't linear or predictable enough to extrapolate from safely, which is exactly why the discipline established in Part 2 (validate correctness with 1–2 threads in GUI mode) and reinforced in Chapter 2 above (run all real load through CLI) isn't just tidiness — it's the difference between a load test that tells you something true about your system and one that mostly tells you about JMeter's own resource ceiling.",
      "order": 1
    },
    {
      "id": "jm-9-3-md-2",
      "type": "overview",
      "heading": "Two jobs, two modes",
      "content": "The practical rule that ties this whole Part together: GUI mode exists for test plan correctness (does this sampler send the right request, does this assertion catch the right failure, does this extractor pull the right value) — questions that genuinely only need one or two threads to answer. CLI mode, potentially distributed across multiple agent machines (Chapter 1), exists for test execution at real scale — questions about how your system behaves under dozens, hundreds, or thousands of concurrent users. Conflating these two purposes, or trying to get both answers from the same GUI run, is the single most common structural mistake beginners make with JMeter, and avoiding it is less about memorizing a rule than about internalizing why the tool is built this way in the first place.",
      "order": 2
    }
  ],
  "advantages": [
    "9.3 Why GUI Mode Is Bad for Actual Load Generation — This is the most common structural beginner mistake: one green Start for both 'does it work' and 'how does prod feel."
  ],
  "limitations": [
    "9.3 Why GUI Mode Is Bad for Actual Load Generation is this Part's slice only; later chapters go deeper rather than repeating this one."
  ],
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
