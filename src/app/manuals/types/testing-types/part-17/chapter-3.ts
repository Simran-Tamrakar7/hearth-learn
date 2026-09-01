import type { ChapterRecord } from "../../types";

/** Model-Based Testing */
export const chapter = {
  "id": "tt-model-based-testing",
  "overlayNo": 67,
  "title": "Model-Based Testing",
  "minutes": 25,
  "level": "advanced",
  "phase": "Part 17 · Data-Driven, Keyword, Model & Risk",
  "partName": "Part 17 · Data-Driven, Keyword, Model & Risk",
  "overviewText": "Model-based testing builds an abstract model of the application's expected behavior — typically as a state diagram or graph, showing the possible states a system can be in and the valid transitions between them — and then automatically generates test cases by systematically exploring paths through that model, rather than a human manually designing each individual test case by hand.",
  "why": "Manually designing test cases for a system with many possible states and transitions (a multi-step approval workflow, a booking system with many valid state changes) becomes exhausting and error-prone to do by hand, and it's genuinely difficult for a human to be confident every meaningful path has actually been considered. Model-based testing formalizes the system's behavior explicitly as a model first, then leverages that formal structure to automatically and systematically generate test cases covering paths a human might never think to manually enumerate.",
  "when": "Particularly valuable for systems with complex, well-defined state machines — multi-step workflows, approval processes with several possible states and transitions, or any system where \"what state can this be in, and what's a valid transition from here\" is a meaningful, well-defined question with a clear, finite answer.",
  "practical": {
    "app": "HRMS Leave Request State Machine",
    "scenario": "The leave request lifecycle (Draft → Submitted → Approved/Rejected → Cancelled) is modeled in GraphWalker, which then generates test paths covering every valid transition at least once.",
    "pass": "",
    "fail": "One of the generated paths attempts to transition directly from Approved to Draft (an edge that shouldn't exist in a correct model) — attempting it against the real application reveals the backend actually allows this invalid transition via a leftover API endpoint, letting an approved request be silently reset to draft status.",
    "failLabel": "Found",
    "value": "The invalid transition is blocked at the API level, and the corrected model (with the invalid edge properly removed) is used to regenerate a clean, accurate test suite going forward."
  },
  "advantages": [
    "Automatically and systematically generates test coverage across complex state spaces that would be genuinely difficult for a human to fully enumerate by hand",
    "The model itself becomes clear, explicit documentation of the system's intended states and valid transitions",
    "Different coverage strategies (every edge, every state, random walk) can be applied to the same model without redesigning test cases from scratch",
    "Particularly effective at finding invalid or unexpected transitions a manual test designer might not think to specifically try"
  ],
  "limitations": [
    "Building an accurate model in the first place requires real upfront effort and a genuinely clear understanding of the system's actual states and transitions",
    "Connecting each abstract modeled step to real, executable automation code is additional engineering work beyond the model itself",
    "Best suited specifically to systems with well-defined, discrete states — less naturally applicable to more continuous or unstructured behavior",
    "An inaccurate or incomplete model produces test coverage that only reflects the model's own gaps, not the real system's actual full behavior"
  ],
  "tools": [
    {
      "name": "GraphWalker",
      "sub": "Model-based path generation",
      "url": "https://graphwalker.github.io",
      "desc": "A free, open-source model-based testing tool — takes a graph model of an application's states and transitions (often drawn visually) and automatically generates test paths through it using various configurable algorithms (e.g. covering every edge, every state, or a random walk), which can then be executed against the real application.",
      "adv": [
        "Systematically generates coverage across complex state spaces",
        "The model is explicit documentation of intended states and transitions",
        "Coverage strategies can be swapped on the same model",
        "Effective at finding invalid or unexpected transitions"
      ],
      "lim": [
        "Building an accurate model takes real upfront effort",
        "Binding abstract steps to real automation is extra engineering",
        "Best for discrete, well-defined states",
        "A wrong model only tests the model's own gaps"
      ],
      "steps": [
        {
          "t": "Step 1 — Model states and transitions",
          "p": "Nodes are states (Draft, Pending Approval, Approved, Rejected); edges are valid actions (Submit, Approve, Reject)."
        },
        {
          "t": "Step 2 — Build the model in GraphWalker",
          "p": "Use the visual editor or a supported graph format."
        },
        {
          "t": "Step 3 — Pick a path strategy",
          "p": "Cover every transition at least once, every state at least once, or a random walk."
        },
        {
          "t": "Step 4 — Generate the abstract steps",
          "p": "GraphWalker emits the sequence needed to hit that coverage."
        },
        {
          "t": "Step 5 — Bind steps to real automation",
          "p": "Map each abstract action to Selenium (or similar) against the live app."
        },
        {
          "t": "Step 6 — Run and treat failures as model vs reality",
          "p": "A mismatch is either a product bug or a wrong model — both are worth finding."
        }
      ]
    }
  ],
  "contentMarkdown": "## Model then generate\n\nBind abstract steps to real automation.",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
