# Feature status (user-facing)

Last verified against `main` — September 2026.

## Manuals (`/manuals`, `/manuals/[slug]`)

- **Catalog:** add manual with title, category, tags, cover URL; Add button uses active theme color.
- **Cypress builtin:** 108 chapters under Parts 0–14 plus Appendices (`types/cypress/`). Catalog JSON lives in `scripts/cypress-manual-data/`; bump `CYPRESS_TOC_VERSION` when catalog/layout of chapters changes so stale localStorage is dropped. Catalog card title is **Cypress E2E Testing** (`/manuals/cypress`). Kept builtins cannot be hidden from this browser’s catalog.
- **JMeter builtin:** 43 chapters under Parts 0–11 plus Appendices (`types/jmeter/`). Catalog JSON lives in `scripts/jmeter-manual-data/`; bump `JMETER_TOC_VERSION` when catalog changes. Catalog card title is **Apache JMeter** (`/manuals/jmeter`). Production deploy of the first JMeter PR failed TypeScript (`LegacyChapterFields` missing `contentMarkdown`); that field is required for the topic-block path.
- **SQL for QA builtin:** 69 chapters under Parts 0–12 plus Appendices A–F (`types/sql-qa/`). Catalog JSON lives in `scripts/sql-qa-manual-data/`; rebuild with `python3 scripts/build-sql-qa-catalog.py` (from `scripts/sql-qa-source.md`, gitignored) then `node scripts/rebuild-sql-qa-manual.mjs`. Bump `SQL_QA_TOC_VERSION` when catalog changes. Catalog card title is **SQL for QA** (`/manuals/sql-qa`).
- **Reader (all slugs):** Full Content / Summary / Quiz & Activities tabs; no AI Summary tab.
- **Full Content insights:** `blocks[]` via a `<BlockShell>` + registry (new types = Body + catalog entry). Per-row 1/2/3-column `blockLayout` with drag between rows/columns (`@dnd-kit`). Manual settings `allowedBlockTypes` filters the Add menu only. Incomplete blocks save as drafts. When `blocks` is unset, `##` topics in `contentMarkdown` become blocks; `###` stays inside that section. Pipe tables render as HTML tables (not joined paragraphs); a heading whose body is only a table is one table card. Chapter titles that already include a number (`0.1`, `A.`) show that number once. Parts keep their stored index (Orientation is Part 0). Cypress/JMeter catalogs were rebuilt with TOC bumps so stale `###` cards in localStorage are dropped. SQL for QA is a sixth builtin (`SQL_QA_TOC_VERSION`).
- **Edit:** pencil icon on chapter header and catalog cards; markdown toolbar (H1–H3, bold, lists, code) on Summary and Full Content.
- **TOC edit:** move up/down, merge, delete chapters; delete whole manual while TOC edit is open.
- **Export:** PDF, DOCX, Print from header on every manual.
- **Highlights:** select text per tab; no highlights footer block.

## Library (`/library`)

- Books and shelf tags only — **no manuals section** (manuals live on `/manuals`).
- User CRUD: add/edit books (title, author, URL, cover URL, blurb, shelf); hide built-ins or delete user books.
- Edit via pencil on book detail — not a kebab menu.

## Life Lab (`/life-simulator`)

- Sign-in and permission errors surfaced in the arena UI.
- Requires `OPENAI_API_KEY` and `canUseAI` permission.

## AI Coach (`/ai`)

- Switching mode or editing input clears the previous AI result.

## Showcase Wall (`/showcase-wall`)

- Save requires sign-in; PATCH/POST via `/api/showcase`.
- Admins see public gallery featured items merged into **My wall** with edit/delete on owned entries.

## Navigation & profile

- **Settings:** avatar menu only (desktop + mobile); no top navbar Settings link.
- **Profile:** loading skeleton — no “not logged in” flash while session resolves.

## Break Room (`/rest/*`)

- **Games & cookbook:** built-in registry + user add/edit/delete via `src/lib/userCatalog.ts`.
- **Retro:** master volume slider wired to Web Audio gain.

## Settings (`/settings`)

- Theme, reading prefs, categories (admin). Open from avatar → Settings.
