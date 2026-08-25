# Shared UI (not a page)

Every file here starts with a **HEADING: SHARED** comment that lists the pages that use it.

Changing a SHARED file changes **all of those pages at once**. Page-only UI lives next to the page (`src/app/manuals/_ui/`).

| File | Pages |
|---|---|
| `layout/Navbar.tsx` | almost every screen except `/login` and `/showcase` |
| `Providers.tsx` | every page (via `layout.tsx`) |
| `ui/Button.tsx` `Card.tsx` `Badge.tsx` `Toast.tsx` | most screens |
| `ui/PinButton.tsx` | `/manuals` `/dashboard` `/showcase-wall` `/rest/games` `/rest/cookbook` |
| `ui/ProgressBar.tsx` | `/` `/dashboard` `/showcase` |
| `ui/WatchDesk.tsx` | `/` only |
| `ui/Checkmark.tsx` | `/showcase` only |
| `layout/PageTransition.tsx` | not mounted yet |
