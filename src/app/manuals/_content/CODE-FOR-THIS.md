# Builtin manuals (this folder)

Chapter text for `/manuals`. The screen is the sibling `page.tsx` / `[slug]/page.tsx`. `_content` is not a URL (underscore folder).

| File | What it is |
|---|---|
| `_registry.ts` | Hide / feature / pin / order + `body:` import of each `data.js` |
| `_helpers.js` | `ch()`, `genres`, title numbering |
| `<slug>/data.js` | That manual’s chapters |
| `testing-types/part-N/chapter-M.md` | **Source of truth** — full chapter record in frontmatter (`why`, `when`, `tools`, `practical`, …) + markdown body |
| `testing-types/overlay.ts` | Legacy merge layer (prefer MD frontmatter; used as fallback only) |
| `playwright/data.js` | Merged Playwright manual (not split across files) |
| `_archive/` | Soft-deleted or unused bodies |

Converter (not data): `../_lib/pathwiseToHearth.ts`.
