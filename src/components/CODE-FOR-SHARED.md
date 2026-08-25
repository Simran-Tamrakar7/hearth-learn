# Shared UI (not a page)

Buttons, cards, pins, toasts. Used on **many** URLs. Changing `Button.tsx` changes every page.

| File | What |
|---|---|
| `layout/Navbar.tsx` | Top nav on almost every screen |
| `layout/PageTransition.tsx` | Route animation |
| `Providers.tsx` | Session + theme + toast (wired from `src/app/layout.tsx`) |
| `ui/Button.tsx` `Card.tsx` `Badge.tsx` | Common controls |
| `ui/PinButton.tsx` | Pin to dashboard (`localStorage`) |
| `ui/Toast.tsx` `ProgressBar.tsx` `Checkmark.tsx` `WatchDesk.tsx` | The rest |

Page-specific UI lives next to the page (example: `src/app/manuals/_ui/`).
