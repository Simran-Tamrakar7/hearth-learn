# Code for this page: `/admin`

Admin-only. Route gate is `src/proxy.ts` (`role === ADMIN`). Open from the avatar menu — not main nav.

| What you want to change | Open this file |
|---|---|
| Users table, detail, bulk approve/permissions | `page.tsx` |
| Users API | `src/app/api/admin/users/route.ts` |
| Global room flags | Settings → Cabin rooms (`/settings?section=cabin`) + `/api/admin/features` |
| Categories | Settings → Categories (`/settings?section=categories`) |
| Who counts as admin | `src/lib/permissions.ts` / `src/lib/roles.ts` |
