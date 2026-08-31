# Builtin manuals (this folder)

Chapter text for `/manuals`. The screen is the sibling `page.tsx` / `[slug]/page.tsx`. `_content` is not a URL (underscore folder).

| File | What it is |
|---|---|
| `_registry.ts` | Hide / feature / pin / order + `body:` import of each manual’s `compiled.body.ts` |
| `_helpers.js` | `ch()`, `genres`, title numbering |
| `<slug>/meta.json` | Manual title, category, tagline |
| `<slug>/part-N/chapter-M.md` | **Source of truth** — full chapter record in frontmatter + markdown body |
| `testing-types/outline.ts` | **TOC structure** — 15 parts, 92 types; reader walks this and loads bodies by `overlayNo` / `typeNo` |
| `testing-types/catalog.ts` | Flat catalog view derived from compiled MD (legacy interactive export) |
| `playwright/part-N/chapter-M.md` | Playwright chapters (compiled to `compiled.body.ts`) |
| `_archive/` | Soft-deleted or unused bodies |

Build: `node scripts/compile-manuals-from-md.mjs` (runs on `dev` / `build`).

Converter (not data): `../_lib/pathwiseToHearth.ts`.
