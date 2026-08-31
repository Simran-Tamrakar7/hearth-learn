# Code for this page: `/login`

| What you want to change | Open this file |
|---|---|
| Login UI | `page.tsx` |
| Sign up | `src/app/login/signup/page.tsx` → `/login/signup` |
| Forgot / reset password | `src/app/login/forgot-password/page.tsx` → `/login/forgot-password` (email → code → new password) |
| Legacy reset link | `src/app/login/reset-password/page.tsx` → `/login/reset-password` (redirects to forgot flow) |
| Change password | `/profile` (Edit Profile) |
| Approvals + per-user permissions | `src/app/admin/page.tsx` |
| Manage categories | `src/app/admin/page.tsx` |
| Auth options, seed admin | `src/lib/auth.ts` |
| Mail (Resend) + reset codes | `src/lib/mail.ts`, `src/lib/passwordReset.ts` |
| Permission flags | `src/lib/permissions.ts` |
| Route gate | `src/proxy.ts` |
