# Code for this page: `/settings`

| What you want to change | Open this file |
|---|---|
| Settings UI (sidebar menu: appearance, reading, data, admin cabin) | `page.tsx` |
| Theme state + account persist | `src/context/ThemeContext.tsx` |
| Prefs API | `src/app/api/me/prefs/route.ts` |
| Cabin room flags (admin) | `/api/admin/features` — also in Settings → Cabin rooms |
| Categories (admin) | `src/app/manuals/features/categorization.tsx` via Settings → Categories |
| Users & approvals | `/admin` (avatar menu → Admin) |

Profile (`/profile`) is user data only. Navbar: Rest opens Break Room (`/rest`); Admin is under the avatar menu, not the main nav.
