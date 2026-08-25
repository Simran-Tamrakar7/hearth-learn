# Code for this page: `/manuals`

This folder **is** the Manuals page. Everything that exists only for Manuals lives here (`page.tsx`, `_ui/`, `_lib/`).

| What you want to change | Open this file |
|---|---|
| The catalog grid (search, categories, cards) | `page.tsx` ← **this is the `/manuals` screen** |
| The reader after you click a manual | `[slug]/page.tsx` ← **this is `/manuals/cypress` etc.** |
| Testing Types featured card | `_ui/TestingTypesCatalogCard.tsx` |
| Tool chips inside a chapter | `_ui/ToolSwitcher.tsx` |
| Playwright roadmap download | `_lib/roadmapData.ts` |
| TOC part helpers | `_lib/manualParts.ts` |
| User / AI manuals (`localStorage`) | `_lib/userManuals.ts` |
| Testing Types 15-chapter outline | `_lib/testing-types-outline.ts` |
| Convert pathwise JS → Hearth shape | `_lib/pathwiseToHearth.ts` |
| Chapter **text** of a builtin manual | `_lib/pathwise-data/manuals/` |
| Hide / feature / pin a builtin manual | `content/manuals/_registry.ts` |
| AI “generate a manual from notes” API | `src/app/api/manuals/generate/route.ts` |
| Top nav (every page) | `src/components/layout/Navbar.tsx` |

`src/lib/manualsData.ts` (and a few other `src/lib/*` files) are **one-line shims** so old imports still work. Edit the real files in this folder, not the shim.
