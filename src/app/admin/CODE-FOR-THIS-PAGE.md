# Code for this page: `/admin`

Admin-only. Route gate is `src/proxy.ts` (`role === ADMIN`).

| What you want to change | Open this file |
|---|---|
| Users table, detail, bulk approve/permissions, site feature flags | `page.tsx` ← **this is the `/admin` screen** |
| Category add / rename / delete | `page.tsx` (renders `src/app/manuals/_ui/CategoryManager.tsx`) |
| Category store | `src/app/manuals/_lib/categories.ts` |
| Users API | `src/app/api/admin/users/route.ts` |
| Global room flags | `src/app/api/admin/features/route.ts` |
| Who counts as admin | `src/lib/permissions.ts` / `src/lib/roles.ts` |
