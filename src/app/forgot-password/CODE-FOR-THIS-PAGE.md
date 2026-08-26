# Code for this page: `/forgot-password`

| What you want to change | Open this file |
|---|---|
| Forgot / verify-code / new-password UI | `page.tsx` |
| Send code | `src/app/api/auth/forgot/route.ts` |
| Verify code | `src/app/api/auth/verify-code/route.ts` |
| Set password after code | `src/app/api/auth/reset/route.ts` |
| Email sender (Resend) | `src/lib/mail.ts` |
| Login link into this flow | `src/app/login/page.tsx` |
