# Page reference

## `/manuals`

Catalog of 65 builtin manuals + user manuals. Reads `MANUALS_DATA` filtered by `src/app/manuals/_content/_registry.ts` (`status: "active"`). Featured cards and dashboard pins also come from that registry. Writes nothing to the server. Pins, user manuals, categories, and tags use `localStorage`. `+` add is `AddManualControl` (name + category + tags).

Key UI: `src/app/manuals/page.tsx` (labeled **PAGE: /manuals**). Other manuals-only files sit in `src/app/manuals/_ui/`. Map: `src/app/manuals/CODE-FOR-THIS-PAGE.md`. Site-wide index: [where-to-edit.md](./where-to-edit.md).

## `/manuals/[slug]`

Reader + TOC editor + inline chapter edit (no dialog). Builtin: `findHearthManual`. User: `getUserManual`. Testing Types: overlay + outline. Writes `hearth_manual_custom_data_*` (debounced while editing) and progress keys. Highlights: localStorage plus `POST /api/highlights` (userId, chapterId, tabType, text, start). Click an existing mark to remove it. Three tabs (Full Content / Summary / AI Summary) keep highlights separate. TOC shows minutes per chapter and scrolls the active row into view. Resume + recently viewed dual-write to account prefs. Related manuals by category/tags at the end.

Key UI: `src/app/manuals/[slug]/page.tsx` (labeled **PAGE: /manuals/[slug]**), `_ui/LessonContentEditor`, `_ui/ToolSwitcher`, `_ui/Highlightable`, `_lib/manualParts.ts`.

## `/library`

Reads `listedLibraryBooks()` from `src/app/library/_content/_registry.ts`. Writes `hearth_library_saved`. Opens `book.url` in a new tab. Also lists the manuals catalog with the same `+` / pin / kebab Edit as `/manuals`. Recently viewed + Continue card shared with `/manuals`.

## `/trails`, `/trails/[slug]`

Redirects. Prisma trail APIs still used by dashboard, notes, showcase-wall.

## `/life-simulator`

Client arenas. Pills from `listedArenas()`. AI generate/evaluate via `/api/life-lab`. UI: `src/app/life-simulator/page.tsx` + `_ui/ArenaStudio.tsx`. Attempts stored per user.

## `/notes`

Prisma via `/api/notes`. Optional trail from `/api/trails`. Due “review later” highlights from `/api/highlights?due=1`.

## `/ai`

Coach `POST /api/ai/coach` and CV Maker `POST /api/ai/cv`. Needs `OPENAI_API_KEY`.

## `/rest`

Timer. Subpages: games (`src/app/rest/games/_content.ts`), cookbook (`src/app/rest/cookbook/_content.ts`), retro (inline vibes).

## `/toolkits`

Reads `src/app/toolkits/_content/_registry.ts`. Copy-to-clipboard only.

## `/showcase-wall`

GET/POST/PATCH/DELETE `/api/showcase` — per-user portfolio (private/public) plus featured GitHub in the public gallery.

## `/showcase`

UI kit demo. Not catalog content.

## `/profile`

User data only: name, email, avatar, stats, badges. Change password from Edit Profile (`POST /api/auth/change-password`). Open from the avatar menu.

## `/settings`

Sidebar menu: Appearance, Reading, Data (`ThemeContext` → `/api/me/prefs`). Admins also see Cabin rooms (global feature flags) and Categories. Users & approvals stay on `/admin` (avatar → Admin).

## `/admin`

Admin-only users table (search/filter, bulk, detail with permissions + activity). Cabin flags/categories live under Settings. Map: `src/app/admin/CODE-FOR-THIS-PAGE.md`.

## `/login`

Credentials + Google (only when OAuth env vars are set). “Forgot Password?” opens `/forgot-password` (email prefilled). `?reset=1` shows a success banner after a code-based reset.

## `/forgot-password`

Three steps: email → 6-digit verification code (15 min, Resend) → new password + confirm (min 8 chars). APIs: `POST /api/auth/forgot`, `/api/auth/verify-code`, `/api/auth/reset`. Resend is rate-limited (60s cooldown, 5/hour). If Resend isn’t configured in production, the send step returns an error instead of pretending the email went out. Legacy `/reset-password` redirects here.

## `/dashboard`

GET `/api/user/dashboard`, pins, `pinnableManuals()` from the manuals registry, sample games/recipes.

## `/tags`

GET `/api/notes`, group by `tags`.

## `/certificates/[id]`

POST `/api/certificates/generate`. Layout is hardcoded in the page.
