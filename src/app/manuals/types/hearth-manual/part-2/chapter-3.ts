import type { ChapterRecord } from "../../../types";

/** 3.3 Dead Code & TODOs */
export const chapter = {
  id: "hm-3-3",
  title: "3.3 Dead Code & TODOs",
  minutes: 20,
  level: "intermediate",
  phase: "Part 3 · Codebase Map",
  partName: "Part 3 · Codebase Map",
  overviewText: "Known stale areas: older docs that still say 65 manuals, unused Book/ReadingProgress Prisma models, /api/settings unused by the settings page, Prisma trail slugs 404 on /manuals/[slug] redirect. Builtin catalog is 4 manuals in registry.ts.",
  why: "Prevents wasted time debugging ghost features.",
  when: "Check before building on documented-but-removed paths.",
  practical: {"app":"Wire library reading progress","scenario":"Schema has ReadingProgress model.","pass":"You find no prisma.readingProgress in src/ — UI uses localStorage hearth_library_saved only.","fail":"You assume schema = implemented UI."},
  advantages: ["Explicit ⚠️ flags reduce wrong assumptions","audit-findings.md has historical context"],
  limitations: ["TODO comments not exhaustively listed — run ripgrep TODO for fresh scan"],
  tools: [],
  contentMarkdown: "## Stale or unused (verified)\n\n| Item | Status |\n|------|--------|\n| docs/architecture.md manual count | **Updated** — 4 active: playwright, testing-types, cypress, hearth-manual |\n| src/app/manuals/_content/ | **Removed** — use types/<slug>/ |\n| Book, ReadingProgress, Bookmark, Highlight models | **Schema only** — no src/ usage found |\n| /api/settings | **Exists** — settings page uses /api/me/prefs instead |\n| /showcase | **No page** — use /showcase-wall |\n| /trails/[slug] → /manuals/[slug] | **404** for Prisma trail slugs |\n\n## Recommended scan\n\n```bash\nrg \"TODO|FIXME\" src/ --glob \"*.ts\" --glob \"*.tsx\"\n```\n\n⚠️ Needs confirmation: full dead-code pass not run in CI.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
