# Builtin manuals

One folder per URL slug. Listing, status, and the static `data.js` import all live in `_registry.ts` (no glob; a folder is invisible until imported).

Do **not** put a `src/` page inside each manual folder. Next.js needs routes under `src/app/`. One reader at `/manuals/[slug]` serves every book.

| File | What it is |
|---|---|
| `_registry.ts` | Hide / feature / pin / order + `body:` import of each `data.js` |
| `_helpers.js` | `ch()`, `genres`, title numbering |
| `<slug>/data.js` | That manual’s chapters |
| `testing-types/` | Pathwise body **and** overlay + 15-chapter TOC |
| `playwright/data.js` | Merged Playwright manual (not split across files) |
| `_archive/` | Soft-deleted or unused bodies |

Converter (not data): `src/app/manuals/_lib/pathwiseToHearth.ts`.
