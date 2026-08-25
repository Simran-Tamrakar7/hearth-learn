# Shared code (not a page)

These files are used by **many** screens. Do not move them into one page folder.

| File | What it is | Used by |
|---|---|---|
| `auth.ts` | next-auth options | `/login`, every `/api/*` that needs a session |
| `prisma.ts` | database client | every Prisma API |
| `manualsData.ts` | **shim** → `src/app/manuals/_lib/manualsData.ts` | manuals + dashboard pins |
| `userManuals.ts` | **shim** → manuals `_lib` | `/manuals` |
| `manualParts.ts` | **shim** → manuals `_lib` | manual reader |
| `testing-types-outline.ts` | **shim** → manuals `_lib` | Testing Types TOC |
| `pathwiseToHearth.ts` | **shim** → manuals `_lib` | builtin catalog |
| `pathwiseLibrary.ts` | **shim** → `content/library/_registry.ts` | `/library` |
| `gamesData.ts` | **shim** → `content/break-room/games.ts` | `/rest/games`, dashboard |
| `cookbookData.ts` | **shim** → `content/break-room/cookbook.ts` | `/rest/cookbook`, dashboard |
| `_unused/` | dead code (old Playwright dumps, Gutenberg parsers). Not imported. | — |
