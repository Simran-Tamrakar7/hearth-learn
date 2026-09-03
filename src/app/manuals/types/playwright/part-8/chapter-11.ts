import type { ChapterRecord } from "../../../types";

/** 61. Glossary of Terms */
export const chapter = {
  id: "pw-61-glossary",
  title: "61. Glossary of Terms",
  minutes: 25,
  level: "beginner",
  phase: "Part 8 · Resources",
  partName: "Part 8 · Resources",
  overviewText: "Definitions for Browser, Context, Page, Locator, Fixture, Auto-waiting, Trace, storage_state, and other terms used consistently throughout this manual.",
  why: "Shared vocabulary prevents miscommunication in code review and interviews. Terms like 'context' mean specific things in Playwright.",
  when: "Reference when a term is unfamiliar; read once after Part 1 for vocabulary alignment.",
  practical: { app: "Team onboarding", scenario: "Junior asks difference between Browser and BrowserContext.", pass: "Point to glossary; explain isolation model with concrete example.", fail: "Use terms interchangeably in documentation causing confusion." },
  tools: [],
  contentMarkdown: "## Glossary of Terms\n\nA dedicated glossary matters specifically because this manual introduces genuinely dense, overlapping terminology across eight parts. Terms like \"context,\" \"fixture,\" \"locator,\" \"trace,\" and \"flaky\" have been used precisely and consistently throughout this manual, but a reader dipping back in months later (or using this as an interview-prep refresher, per Chapter 49) benefits from a single alphabetized reference rather than needing to re-locate the chapter where a term was first defined.\n\nThe glossary should be compiled from this manual's own definitions, not written fresh, to guarantee consistency. Practically, this means each entry should trace back to (and match) the definition given at first use earlier in the manual — e.g., \"BrowserContext: an isolated session within a Browser, roughly equivalent to an incognito window, with its own cookies/storage/cache (Part 1, Chapter 3)\" — rather than introducing a subtly different phrasing that could create confusion between the glossary and the body text.\n\nThis entry is intentionally left as a pointer rather than a full compiled list here, since the highest-value version of this glossary is generated directly from this manual's own text once all parts are finalized. Worth treating Chapter 61 as a \"build this last\" chapter: once Parts 0–8 are complete, extracting every bolded/defined term across all chapters into one alphabetized list is a mechanical task best done in a single dedicated pass over the finished manual, rather than attempted piecemeal alongside each part.",
  customSummary: "## Glossary of Terms\n\nA single alphabetized glossary is needed because terminology is dense and reused across all 8 parts.\nMust be compiled directly from this manual's own first-use definitions to stay consistent — best done as one dedicated pass after all parts are finalized, not piecemeal.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
