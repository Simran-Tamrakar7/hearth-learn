# Page reference

## `/manuals`

Catalog of 65 builtin manuals + user manuals. Reads `MANUALS_DATA` filtered by `src/app/manuals/_content/_registry.ts` (`status: "active"`). Featured cards and dashboard pins also come from that registry. Writes nothing to the server. Pins and user manuals use `localStorage`.

Key UI: `src/app/manuals/page.tsx` (labeled **PAGE: /manuals**). Other manuals-only files sit in `src/app/manuals/_ui/`. Map: `src/app/manuals/CODE-FOR-THIS-PAGE.md`. Site-wide index: [where-to-edit.md](./where-to-edit.md).

## `/manuals/[slug]`

Reader + TOC editor + inline chapter edit (no dialog). Builtin: `findHearthManual`. User: `getUserManual`. Testing Types: overlay + outline. Writes `hearth_manual_custom_data_*` (debounced while editing) and progress keys.

Key UI: `src/app/manuals/[slug]/page.tsx` (labeled **PAGE: /manuals/[slug]**), `_ui/LessonContentEditor`, `_ui/ToolSwitcher`, `_lib/manualParts.ts`.

## `/library`

Reads `listedLibraryBooks()` from `src/app/library/_content/_registry.ts`. Writes `hearth_library_saved`. Opens `book.url` in a new tab.

## `/trails`, `/trails/[slug]`

Redirects. Prisma trail APIs still used by dashboard, notes, showcase-wall.

## `/life-simulator`

Client-only arenas. Pills from `listedArenas()`. Scenario lists in `src/app/life-simulator/_content/<arena>/meta.ts`. UI stays in `src/app/life-simulator/page.tsx`.

## `/notes`

Prisma via `/api/notes`. Optional trail from `/api/trails`. No templates.

## `/ai`

Canned coach + CV layouts in the page. No persistence despite the save toast.

## `/rest`

Timer. Subpages: games (`src/app/rest/games/_content.ts`), cookbook (`src/app/rest/cookbook/_content.ts`), retro (inline vibes).

## `/toolkits`

Reads `src/app/toolkits/_content/_registry.ts`. Copy-to-clipboard only.

## `/showcase-wall`

GET/POST `/api/showcase` — featured list from `src/app/showcase-wall/_content/_registry.ts` plus Prisma user posts.

## `/showcase`

UI kit demo. Not catalog content.

## `/profile`

GET `/api/user/profile`.

## `/settings`

`ThemeContext` + localStorage. Prisma `/api/settings` is unused by this page.

## `/dashboard`

GET `/api/user/dashboard`, pins, `pinnableManuals()` from the manuals registry, sample games/recipes.

## `/tags`

GET `/api/notes`, group by `tags`.

## `/certificates/[id]`

POST `/api/certificates/generate`. Layout is hardcoded in the page.
