# Code for this page: `/manuals`

This folder **is** Manuals. Screen, helpers, and chapter text all live here.

| What you want to change | Open this file |
|---|---|
| The catalog grid (search, categories, cards) | `page.tsx` ← **this is the `/manuals` screen** |
| The reader after you click a manual | `[slug]/page.tsx` ← **this is `/manuals/cypress` etc.** |
| Tool chips inside a chapter | `_ui/ToolSwitcher.tsx` |
| Inline chapter editor (write/preview toolbar) | `_ui/LessonContentEditor.tsx` |
| Playwright roadmap download | `_lib/roadmapData.ts` |
| TOC part helpers | `_lib/manualParts.ts` |
| User / AI manuals (`localStorage`) | `_lib/userManuals.ts` |
| Remove a manual from the catalog (trash on every card) | `_lib/userManuals.ts` (`removeCatalogManual`) |
| Convert body JS → Hearth shape | `_lib/pathwiseToHearth.ts` |
| Chapter **text** of a builtin manual | `_content/<slug>/data.js` |
| Testing Types overlay + 15-chapter TOC | `_content/testing-types/` |
| Playwright chapters | `_content/playwright/data.js` |
| Hide / feature / pin a builtin, or wire a new `data.js` | `_content/_registry.ts` |
| AI “generate a manual from notes” API | `src/app/api/manuals/generate/route.ts` |
| Top nav (every page) | `src/components/layout/Navbar.tsx` |
