# Page reference

## `/manuals`

Catalog of 65 builtin manuals + user manuals. Reads `MANUALS_DATA` filtered by `content/manuals/_registry.ts` (`status: "active"`). Featured cards and dashboard pins also come from that registry. Writes nothing to the server. Pins and user manuals use `localStorage`.

Key UI: `src/app/manuals/page.tsx` (labeled **PAGE: /manuals**). Other manuals-only files sit in `src/app/manuals/_ui/`. Map: `src/app/manuals/CODE-FOR-THIS-PAGE.md`. Site-wide index: [where-to-edit.md](./where-to-edit.md).

## `/manuals/[slug]`

Reader + TOC editor. Builtin: `findHearthManual`. User: `getUserManual`. Testing Types: overlay + outline. Writes `hearth_manual_custom_data_*` and progress keys.

Key UI: `src/app/manuals/[slug]/page.tsx` (labeled **PAGE: /manuals/[slug]**), `_ui/ToolSwitcher`, `src/lib/manualParts.ts`.

## `/library`

Reads `listedLibraryBooks()` from `content/library/_registry.ts` (via `src/lib/pathwiseLibrary.ts`). Writes `hearth_library_saved`. Opens `book.url` in a new tab.

## `/trails`, `/trails/[slug]`

Redirects. Prisma trail APIs still used by dashboard, notes, showcase-wall.

## `/life-simulator`

Client-only arenas. Pills from `listedArenas()`. Scenario lists in `content/life-simulator/<arena>/meta.ts`. UI stays in `src/app/life-simulator/page.tsx`.

## `/notes`

Prisma via `/api/notes`. Optional trail from `/api/trails`. No templates.

## `/ai`

Canned coach + CV layouts in the page. No persistence despite the save toast.

## `/rest`

Timer. Subpages: games (`content/break-room/games.ts`), cookbook (`content/break-room/cookbook.ts`), retro (inline vibes).

## `/toolkits`

Reads `content/toolkits/_registry.ts`. Copy-to-clipboard only.

## `/showcase-wall`

GET/POST `/api/showcase` — featured list from `content/showcase/_registry.ts` plus Prisma user posts.

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
