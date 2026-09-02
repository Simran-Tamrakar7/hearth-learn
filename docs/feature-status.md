# Feature status (user-facing)

Last verified against `main` — March 2026.

## Manuals (`/manuals`, `/manuals/[slug]`)

- **Catalog:** add manual with title, category, tags, cover URL; Add button uses active theme color.
- **Reader (all slugs):** Full Content / Summary / Quiz & Activities tabs; no AI Summary tab.
- **Edit:** pencil icon on chapter header and catalog cards; markdown toolbar (H1–H3, bold, lists, code) on Summary and Full Content.
- **TOC edit:** move up/down, merge, delete chapters; delete whole manual while TOC edit is open.
- **Export:** PDF (text file download), DOCX, and Print from the reader header on every manual.
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
