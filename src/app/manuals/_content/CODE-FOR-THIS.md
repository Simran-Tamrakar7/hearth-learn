# Builtin manuals (this folder)

Chapter text for `/manuals`. The screen is the sibling `page.tsx` / `[slug]/page.tsx`. `_content` is not a URL (underscore folder).

| File | What it is |
|---|---|
| `_registry.ts` | Hide / feature / pin / order + `body:` import of each `data.js` |
| `_helpers.js` | `ch()`, `genres`, title numbering |
| `<slug>/data.js` | That manual’s chapters |
| `testing-types/` | Pathwise body **and** overlay + 15-chapter TOC |
| `playwright/data.js` | Merged Playwright manual (not split across files) |
| `_archive/` | Soft-deleted or unused bodies |

Converter (not data): `../_lib/pathwiseToHearth.ts`.
