# Adding content by hand

Do this in a text editor. There is **no generate script**. After you save, `next dev` hot-reloads.

`status` lives **only** in that type’s `_registry.ts`. Omit it on library books and they count as `active`.

This stack has **no MDX loader**. Chapter and snippet files are `.ts` (string exports), not `.mdx`.

Next.js will not auto-scan folders. A new folder is invisible until `_registry.ts` imports it (same for toolkits / Life Lab).

---

## New builtin manual

One folder per slug under `src/app/manuals/_content/`. Playwright is `playwright/data.js` (one file). Testing Types is `testing-types/` (body + overlay + outline).

1. Create `src/app/manuals/_content/<slug>/` (kebab-case, same as the URL).
2. Copy an existing `data.js`. Keep `pathwiseManual.id` equal to the folder name (exception: Git’s body id is `git`, folder / URL is `git-version-control`).
3. Open `src/app/manuals/_content/_registry.ts`. Add one import at the top, then copy a `MANUALS` row with `body:` pointing at that import (same pattern as Cypress):

```ts
import { pathwiseManual as jest } from "./jest/data.js";
```

```ts
{
  id: "jest",
  title: "Jest Testing",
  tool: "jest",
  status: "active",
  order: 66,
  tags: ["automation"],
  featured: false,
  pinnable: false,
  body: jest,
}
```

4. `id` **is** the URL slug (`/manuals/jest`). Do not reuse an id. A folder with no import + `body:` is invisible.
5. Only if the URL must differ from the body’s `id`, add a row to `SLUG` in `src/app/manuals/_lib/pathwiseToHearth.ts` (today only `git` → `git-version-control`).
6. Save. Open `/manuals/jest`.

Pin ids: `man-<slug>`, except Git which is `man-git` (do not change that). Set `pinnable: true` and `pinIcon` if it should appear in the dashboard pin picker.

### Snippets (optional)

Put runnable examples in `src/app/manuals/_content/<slug>/snippets/intercept-network-request.ts`:

```ts
export const interceptNetworkRequest = `cy.intercept("GET", "/api/users", { fixture: "users.json" });`;
```

Import that export from the chapter file. Searching the repo for `cy.intercept` then hits the snippet file, not a 2000-line dump.

---

## New library book

1. Open `src/app/library/_content/_registry.ts`.
2. Copy a book object. Set a unique kebab-case `id` (this is what `hearth_library_saved` stores).
3. Set `url` to the public page (Gutenberg, Standard Ebooks, …).
4. Use a `shelf` / `shelves` that exists in `shelves` at the top of the same file, or add a shelf object there too.
5. Leave `status` off (means active). To hide later, add `status: "archived"` on that book.

---

## New Prisma trail

These are **not** manuals. They show up via `/api/trails` (notes picker, dashboard). `/trails/<slug>` still redirects to `/manuals/<slug>` and will 404 unless a manual has that slug.

1. Add a row in `prisma/seed.ts` (slug, title, chapters with markdown `content`).
2. Copy a line in `src/app/trails/_content/_registry.ts` so the human-readable list stays in sync.
3. Run `npx prisma db seed` locally. That **resets** local SQLite seed data. Do not run it against a database you care about.

---

## New Life Lab arena

The page still has one UI block per arena id. A registry row without that block will show a pill that opens an empty main area.

1. Create `src/app/life-simulator/_content/<arena-id>/meta.ts`. Copy `interview/meta.ts`. Keep `meta` fields in this order: `id`, `title`, `description`, `icon`.
2. Put scenario lists in that same file (see `bughunt/meta.ts` / `crisis/meta.ts`) or a `logic.ts` next to it.
3. Open `src/app/life-simulator/_content/_registry.ts`. Copy an `ARENAS` row. Set `id` (kebab-case, same as the folder), `title`, `label` (pill text), `tool`, `status: "active"`, `order`.
4. Open `src/app/life-simulator/page.tsx`. Import the new data and add `{activeArena === "<id>" && ( ... )}` by copying an existing arena block. Also extend `ArenaId` in the registry if you added a new id.

---

## New toolkit

1. Create folder `src/app/toolkits/_content/<id>/` (kebab-case, same as the registry `id`).
2. Copy `src/app/toolkits/_content/prompt-json/meta.ts` into that folder. Same fields, same order: `id`, `title`, `description`, `icon`, `category`. Keep the cheat sheet in `export const snippet = \`...\`;` in that file.
3. Open `src/app/toolkits/_content/_registry.ts`.
4. Add one import at the top:

```ts
import { meta as jestKit, snippet as jestSnippet } from "./jest/meta";
```

5. Copy a `TOOLKITS` object. Paste it in the array. Fill `id`, `title`, `tool`, `status: "active"`, `order`, then point `category` / `description` / `snippet` at the new import (same pattern as the other four).
6. Save. Open `/toolkits`.

---

## New showcase featured repo

1. Open `src/app/showcase-wall/_content/_registry.ts`.
2. Copy a `SHOWCASE` row (`id` like `gh-my-repo`, `status: "active"`).
3. Copy a matching object in `SHOWCASE_FEATURED` (description, GitHub URL, stars, …). Both `id`s must match.
4. User-uploaded wall items are Prisma, not this file.

---

## New Break Room game or recipe

Do **not** create a folder per game or dish (500+ items). Open `src/app/rest/games/_content.ts` or `src/app/rest/cookbook/_content.ts` and copy an existing object. Pin ids: `g-{normalizedTitle}` for games, `dish-{id}` for recipes.
