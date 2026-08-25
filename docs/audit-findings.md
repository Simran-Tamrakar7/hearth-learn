# Step 1 — Content audit (current state)

Scanned before any `/content` move. There is **no MDX**, **no CMS**, **no Contentlayer**. Catalog content is TypeScript/JavaScript object literals imported at build time, plus some Prisma models and browser `localStorage`.

Next.js config (`next.config.ts`) is empty of MDX loaders. Adding `.mdx` chapter files would require a new dependency (`@next/mdx` or similar) and a compile step. That conflicts with “no codegen / no build step to register an item.” **Target format: TypeScript `meta.ts` + chapter/snippet `.ts` files**, which this stack already loads with a plain import.

---

## Compatibility with hand-editing

| Constraint | Compatible? | Notes |
|---|---|---|
| No glob auto-scan | Yes | Registries are explicit arrays |
| No MDX | **Use `.ts`, not `.mdx`** | Stack cannot import `.mdx` today |
| Folder-move archive without touching imports | **Conflicts with static imports** | If `_registry.ts` `import`s each folder, `mv` to `_archive/` breaks the build. **Status lives only in the registry.** Archive = `status: "archived"`. Delete = remove the registry line, then `mv` the folder to `_archive/`. |
| One folder per game/recipe | **Do not** | 568 games + 534 recipes would be worse to edit by hand than one typed array |

---

## `/manuals` and `/manuals/[slug]`

**Where it lives**

| Layer | Path | What it is |
|---|---|---|
| Catalog index | `src/lib/pathwise-data/catalog.js` | Concatenates 16 JS modules → 65 manuals |
| Bundled sources | `src/lib/pathwise-data/manuals/*.js` | Several manuals per file (e.g. `foundations.js` = JS/TS/Python/SQL/Git) |
| Converter | `src/lib/pathwiseToHearth.ts` | Raw JS → `ManualItem` |
| Types / public API | `src/lib/manualsData.ts` | `MANUALS_DATA`, `findHearthManual` |
| Testing Types overlay | `src/components/manuals/TestingTypesInteractiveManual.tsx` + `testing-types-part*.ts` | Second copy of 92 types (`why`/`when`/`tools`) |
| Testing Types TOC | `src/lib/testing-types-outline.ts` | 15-chapter outline, `TESTING_TYPES_TOC_VERSION` |
| Reader merge | `src/components/manuals/testing-types-reader.ts` | Overlay + outline + pathwise |
| User manuals | `src/lib/userManuals.ts` | `localStorage` `hearth_user_manuals_v1` |
| Orphan | `testing-levels.js` | Not in catalog; aliases point at `testing-types` |
| Dead | `src/lib/playwrightData.ts`, `playwrightMasterData.ts` | Zero imports |
| Unused UI | `TestingTypesInteractiveManual` component, `TestingTypesGuide` iframe | Array export is used; component is not mounted |
| Static HTML | `public/guides/testing-types.html` | Not in the live reader path |

**Identity**

- Manual URL slug = pathwise `id` except `git` → `git-version-control`
- Hearth id = `manual-{rawId}`
- Chapter id = pathwise `ch.id` (e.g. `cy-intercept`); Testing Types reader also uses `ch-{n}`
- Pin id = `man-{slug}`

**Renders / would break if paths change**

- `src/app/manuals/page.tsx` — `MANUALS_DATA`, hardcoded `FEATURED_SLUGS`
- `src/app/manuals/[slug]/page.tsx` — `findHearthManual`, overlay, TOC, localStorage
- `src/app/dashboard/page.tsx` — `PINNABLE_MANUALS`
- `src/components/manuals/TestingTypesCatalogCard.tsx`
- `src/lib/pathwiseToHearth.ts` imports `catalog.js`
- Progress keys: `hearth_manual_progress_{manual.id}`, `hearth_manual_custom_data_{manual.id}`

**Duplication**

- Testing Types: pathwise JS (catalog body) **and** TS overlay (structured lesson). Part 17–23 exists in both `.js` and `.ts`.
- Playwright: live source is `playwright-python.js` (+ front/core submodules). Two unused TS files.
- `/trails/[slug]` redirects to `/manuals/[slug]` but Prisma trail slugs do not match manual slugs → broken dashboard “active trail” links.

**Scale:** 65 manuals, 635 chapters. Largest files: `testing-types.js` (~470KB), overlay TSX (~452KB), `playwright-python.js` (~297KB).

---

## `/library`

| | |
|---|---|
| Live catalog | `src/lib/pathwiseLibrary.ts` — 67 books, `id` kebab-case, outbound URLs |
| Page | `src/app/library/page.tsx` — search, shelves, `window.open(url)` |
| Saved list | `localStorage` `hearth_library_saved` = book `id[]` |
| Dead | `src/lib/realBooks/*`, `bookParser.ts` (inline Gutenberg text, unused) |
| Dead Prisma | `Book`, `ReadingProgress`, `Bookmark`, `Highlight` — no API, no seed, no UI |

No in-app epub/pdf reader. Romance books have `shelf: "romance"` but no Romance shelf tab.

---

## `/trails` and `/trails/[slug]`

Both pages **redirect** to `/manuals`. There is no trail reader UI.

**Second system (Prisma, not what `/manuals` shows):**

- `prisma/schema.prisma` `Trail` + `Chapter`
- `prisma/seed.ts` — 8 slugs (`nextjs-server-components`, `playwright-e2e-automation`, …)
- APIs: `/api/trails`, `/api/trails/[slug]`, `/api/progress/toggle`, `/api/user/dashboard`, certificates
- Consumers: dashboard, notes trail picker, showcase-wall trail picker, homepage featured cards

Zero slug overlap with the 65 pathwise manuals. Progress for Prisma trails is DB `Progress`; manuals progress is localStorage.

---

## `/life-simulator` (Life Lab)

All **hardcoded** in `src/app/life-simulator/page.tsx`. Arenas: `interview`, `bughunt`, `founder`, `crisis`, `negotiation`, `refactor`. No API, no localStorage. “AI scoring” is `setTimeout` + random. Reusable scenario copy is trapped in the page.

---

## `/notes`

Prisma `Note` via `/api/notes`. User-authored. No templates. Optional `trailId` from `/api/trails`. Tags exist on the model and `/tags` reads them, but the notes form never sets tags (mostly `"general"`). **Not a content library.**

---

## `/ai`

Hardcoded coach modes + canned `getResponseForMode()` in `src/app/ai/page.tsx`. Six CV layout names. Save CV toasts “stored locally” but **does not persist**. No API. Related: AI-generated *manuals* live in `userManuals.ts` / `/manuals`, not this page. **Personal tool.** CV templates could be extracted later.

---

## `/rest` (Break Room)

| Subroute | Content | Identity |
|---|---|---|
| `/rest` | Timer UI only | 5/10/15 minutes |
| `/rest/games` | `src/lib/gamesData.ts` — **568** generated games | Pin `g-{normalizedTitle}`; list keys are array indexes |
| `/rest/retro` | 5 vibes + 4 trivia facts in the page | vibe `id` |
| `/rest/cookbook` | `src/lib/cookbookData.ts` — **534** generated dishes | `id` e.g. `fh-1`; pin `dish-{id}` |

Games + recipes **are** reusable catalogs. Heart/bookmark on cookbook is React state only (lost on refresh). Pins use `hearth_pinned_items_v2`.

---

## `/showcase-wall` and `/showcase`

- **Wall:** `src/app/api/showcase/route.ts` `GITHUB_FEATURED_PROJECTS` (17 hardcoded repos, ids `gh-*`) merged with Prisma `ShowcaseItem` (user posts, UUID). Page: `src/app/showcase-wall/page.tsx`. Pins by item `id`.
- **`/showcase`:** design-system demo, not a catalog.

---

## `/profile`

`/api/user/profile` → Prisma User, Streak, Badge, Progress. Demo user `demo@hearth.study`. **User-state.**

---

## `/settings`

UI reads/writes `ThemeContext` → `hearth_theme`, `hearth_accent`, `hearth_fontSize`, `hearth_features`. `/api/settings` exists (Prisma theme/toggles, export, reset progress) but **the settings page does not call it**.

Navbar hides rooms using `hearth_features` (`library`, `lifeLab`, `notes`, `aiCoach`, `breakRoom`). Toolkits have a Prisma feature flag that **does not gate** `/toolkits`.

---

## `/toolkits`

**Inline array** in `src/app/toolkits/page.tsx` (4 items: `prompt-json`, `rsc-optimistic`, `framer-springs`, `system-design-math`). Linked from the homepage, not the navbar. No localStorage.

---

## Other routes that list content

| Route | Role |
|---|---|
| `/dashboard` | Aggregates Prisma trails + pins + first 8 games + first 6 dishes + hardcoded `PINNABLE_MANUALS` |
| `/tags` | Tag cloud over Prisma notes |
| `/certificates/[id]` | Prisma `TrailCertificate` + hardcoded print layout |
| `/` | Hardcoded 3 Prisma trail cards + toolkits CTA |

---

## localStorage keys (content-related)

| Key | What |
|---|---|
| `hearth_user_manuals_v1` | AI/user-created manuals |
| `hearth_manual_progress_{id}` | Completed chapter ids |
| `hearth_manual_custom_data_{id}` | TOC/header edits; Testing Types needs `tocCatalogVersion` |
| `hearth_pinned_items_v2` | Pins (manual, game, recipe, trail, showcase) |
| `hearth_library_saved` | Book ids |
| `hearth_theme` / `hearth_accent` / `hearth_fontSize` / `hearth_features` | Settings UI |
| `hearth_user_zodiac` | Dashboard horoscope |

---

## Migration implications (do not skip)

1. **Do not change manual `id` / slug / chapter `id`** — progress, pins, and custom TOC keys depend on them.
2. **Testing Types** must keep overlay + outline + `TESTING_TYPES_TOC_VERSION` or production users see the old 23-part TOC again.
3. **Prisma trails vs manuals** are two catalogs. Unifying them is a product decision, not a folder rename.
4. **Games/recipes** stay as typed arrays (or category files), not one folder per item.
5. **User notes / AI session / profile / settings / break-room timer** stay out of `/content` except extracted catalogs (games, recipes, Life Lab scenarios, showcase featured list).
