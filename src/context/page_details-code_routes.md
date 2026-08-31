# Theme (settings + every page)

`ThemeContext.tsx` starts with **HEADING: SHARED** listing the pages.

- **Every page** gets theme via `Providers` in `src/app/layout.tsx`
- **UI to change it:** `/settings` (`src/app/settings/page.tsx`)
- **Persisted:** `/api/me/prefs` when signed in (localStorage cache for instant paint)
- **Navbar** reads Admin global room flags from `/api/me/prefs` → `features`
