# Code for this page: `/settings`

| What you want to change | Open this file |
|---|---|
| Settings UI (theme, type, highlight legend) | `page.tsx` |
| Theme state + account persist | `src/context/ThemeContext.tsx` |
| Prefs API | `src/app/api/me/prefs/route.ts` |

Room feature flags are Admin global (`/admin` + `/api/admin/features`), not per-user.
