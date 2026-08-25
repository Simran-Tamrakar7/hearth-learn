# Shared code (not a page)

Each file starts with **HEADING: SHARED** and lists the pages (or APIs) that use it.

| File | What it is | Used by |
|---|---|---|
| `auth.ts` | next-auth options | `/login` + session APIs |
| `prisma.ts` | database client | every Prisma API |
| `manualsData.ts` | **shim** → `src/app/manuals/_lib/manualsData.ts` | `/manuals` `/manuals/[slug]` `/dashboard` |
| `userManuals.ts` | **shim** → manuals `_lib` | `/manuals` `/manuals/[slug]` |
| `manualParts.ts` | **shim** → manuals `_lib` | `/manuals/[slug]` |
| `testing-types-outline.ts` | **shim** → manuals `_lib` | `/manuals/[slug]` |
| `pathwiseToHearth.ts` | **shim** → manuals `_lib` | builtin catalog |
| `pathwiseLibrary.ts` | **shim** → `content/library/_registry.ts` | `/library` |
| `gamesData.ts` | **shim** → `content/break-room/games.ts` | `/rest/games` `/dashboard` |
| `cookbookData.ts` | **shim** → `content/break-room/cookbook.ts` | `/rest/cookbook` `/dashboard` |
| `_unused/` | dead code. Not imported. | — |

