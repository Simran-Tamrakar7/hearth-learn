import type { ChapterRecord } from "../../../types";

/** 3.3 Dead Code & TODOs */
export const chapter = {
  id: "hm-3-3",
  title: "3.3 Dead Code & TODOs",
  minutes: 20,
  level: "intermediate",
  phase: "Part 3 · Codebase Map",
  partName: "Part 3 · Codebase Map",
  overviewText: "Known stale areas: docs referencing 65 manuals and manuals/_content/, Book/ReadingProgress Prisma models unused in src/, /api/settings unused by settings page, /showcase route documented but missing (use /showcase-wall), Prisma trail slugs 404 on /manuals/[slug] redirect.",
  why: "Prevents wasted time debugging ghost features.",
  when: "Check before building on documented-but-removed paths.",
  practical: {"app":"Wire library reading progress","scenario":"Schema has ReadingProgress model.","pass":"You find no prisma.readingProgress in src/ — UI uses localStorage hearth_library_saved only.","fail":"You assume schema = implemented UI."},
  tools: [],
  contentMarkdown: "## Stale or unused (verified)\n\n| Item | Status |\n|------|--------|\n| docs/architecture.md \"65 manuals\" | **Stale** — 2 active: playwright, testing-types (+ hearth-manual when added) |\n| src/app/manuals/_content/ | **Removed** — use types/<slug>/ |\n| Book, ReadingProgress, Bookmark, Highlight models | **Schema only** — no src/ usage found |\n| /api/settings | **Exists** — settings page uses /api/me/prefs instead |\n| /showcase | **No page** — use /showcase-wall |\n| /trails/[slug] → /manuals/[slug] | **404** for Prisma trail slugs |\n\n## Recommended scan\n\n```bash\nrg \"TODO|FIXME\" src/ --glob \"*.ts\" --glob \"*.tsx\"\n```\n\n⚠️ Needs confirmation: full dead-code pass not run in CI.",
  exercises: [],
  resourceLinks: [],
  steps: [],
  learn: [],
} as ChapterRecord;
