# Code for this page: `/manuals`

This folder **is** the Manuals page. Open a file here when you want to change how Manuals looks or behaves.

| What you want to change | Open this file |
|---|---|
| The catalog grid (search, categories, cards) | `page.tsx` ← **this is the `/manuals` screen** |
| The reader after you click a manual (TOC, chapters, edit) | `[slug]/page.tsx` ← **this is `/manuals/cypress` etc.** |
| Testing Types featured card on the catalog | `_ui/TestingTypesCatalogCard.tsx` |
| Tool chips inside a chapter | `_ui/ToolSwitcher.tsx` |
| Playwright roadmap download on a manual | `_lib/roadmapData.ts` |
| Hide / feature / pin a builtin manual | `content/manuals/_registry.ts` |
| Chapter **text** of a builtin manual | `src/lib/pathwise-data/manuals/` (bundled JS until per-slug split) |
| Testing Types extra lesson overlay | `_ui/testing-types-reader.ts` + `_ui/TestingTypesInteractiveManual.tsx` |
| Testing Types 15-chapter outline | `src/lib/testing-types-outline.ts` |
| User-created / AI manuals | `src/lib/userManuals.ts` |
| Top nav (shared by every page) | `src/components/layout/Navbar.tsx` |

`_ui/` and `_lib/` are **not** URLs. Next ignores folders that start with `_`. They only exist so manuals code sits next to the manuals page instead of `src/components/manuals`.

Shared buttons/cards live in `src/components/ui/` — those are used on many pages, not just this one.
