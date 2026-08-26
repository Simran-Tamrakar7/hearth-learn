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
| Add a blank manual (`+` dropdown → Add Manual / Add Category) | `_ui/AddManualControl.tsx` (inline form, not a modal; saves via `emptyManual`, opens `[slug]/page.tsx`) |
| Catalog card (kebab Edit / Pin / Delete, tags, cover) | `_ui/ManualCard.tsx` |
| Categories (add from `+` dropdown, rename / delete on `/admin`) | `_lib/categories.ts` |
| Cover image (URL or upload) | `src/components/ui/ImageField.tsx` — also on reader edit |
| Tags on add/edit | `_ui/TagInput.tsx` + `_lib/tags.ts` |
| Recently viewed / Continue | `_ui/RecentlyViewed.tsx` + `src/lib/readerMemory.ts` |
| Highlights (select → color dots → save; click mark to remove) | `_ui/Highlightable.tsx` + `_lib/highlights.ts` + `/api/highlights` |
| Convert body JS → Hearth shape | `_lib/pathwiseToHearth.ts` |
| Chapter **text** of a builtin manual | `_content/<slug>/data.js` |
| Testing Types overlay + 15-chapter TOC | `_content/testing-types/` |
| Playwright chapters | `_content/playwright/data.js` |
| Hide / feature / pin a builtin, or wire a new `data.js` | `_content/_registry.ts` |
| Remove a manual from the catalog | `_lib/userManuals.ts` (`removeCatalogManual`) |
| Top nav (every page) | `src/components/layout/Navbar.tsx` |
