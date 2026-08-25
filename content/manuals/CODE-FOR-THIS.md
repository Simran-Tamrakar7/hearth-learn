# Builtin manuals

One folder per URL slug. Listing/status is `_registry.ts`. Bodies load through `_bodies.js` (one explicit import per folder — no glob).

| File | What it is |
|---|---|
| `_registry.ts` | Hide / feature / pin / order |
| `_bodies.js` | Static import of every `data.js` |
| `_helpers.js` | `ch()`, `genres`, title numbering |
| `<slug>/data.js` | That manual’s chapters |
| `testing-types/` | Pathwise body **and** overlay + 15-chapter TOC |
| `playwright/data.js` | Merged Playwright manual (not split across files) |
| `_archive/` | Soft-deleted or unused bodies |

Converter (not data): `src/app/manuals/_lib/pathwiseToHearth.ts`.
