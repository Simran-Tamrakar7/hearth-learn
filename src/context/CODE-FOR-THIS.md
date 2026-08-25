# Theme (settings + every page)

`ThemeContext.tsx` is the light/dark/accent/font/room-toggle state.

- **UI to change it:** `src/app/settings/page.tsx`
- **Wired globally from:** `src/components/Providers.tsx`
- **Navbar** reads room toggles from here to hide Library / Life Lab / etc.
