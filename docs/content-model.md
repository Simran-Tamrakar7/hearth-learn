# Content model

How catalogs differ. User notes, settings, and session tools are **not** this model — see [page-reference.md](./page-reference.md).

## Status (every catalog)

Set **only in that type’s `_registry.ts`** (library: optional `status` on the book; omit = active):

- `active` — listed in default nav/search
- `archived` — stays in place, hidden from default lists
- `deleted` — remove the registry line, then `mv` the folder to `_archive/`

`meta.ts` holds title, description, and display fields. It does not duplicate `status`, so a hide/show is **one line** in the registry.

## Manuals

Structured lessons with chapters, optional tools, optional Testing Types overlay.

- **Listing + bodies:** `src/app/manuals/_content/_registry.ts` (slug, flags, and a `body:` import of `./<slug>/data.js`)
- **Chapters:** `src/app/manuals/_content/<slug>/data.js`, converted by `_lib/pathwiseToHearth.ts`
- **Testing Types extra:** `src/app/manuals/_content/testing-types/` (`overlay.ts`, `outline.ts`, `data.js`)
- **Playwright:** `src/app/manuals/_content/playwright/data.js` (merged; not split across files)
- **User-created manuals:** `localStorage`, not the registry

Do not change manual / chapter ids.

Trails in the URL sense **are manuals**. Prisma `Trail` rows are a separate catalog (dashboard/API only).

## Library

Outbound bibliography (`id`, title, author, shelves, url). Not an in-app reader.

- **Registry:** `src/app/library/_content/_registry.ts` (the book list **is** the registry)
- One folder per book would be 67 copies of the same ~8 fields — worse to edit by hand

## Trails (Prisma)

Eight seeded SQLite trails. No shared slugs with manuals. Notes and showcase attach `trailId` to these.

- **Registry:** `src/app/trails/_content/_registry.ts` lists slugs for humans; runtime still uses Prisma

## Life Lab

Six arenas. Scenario copy lives in `src/app/life-simulator/_content/<arena>/meta.ts`. The page owns the interactive UI and still switches on arena id.

## Toolkits

One folder per cheat sheet: `src/app/toolkits/_content/<id>/meta.ts` (`meta` + `snippet`). `_registry.ts` lists them and statically imports each folder.

## Showcase (featured)

Seventeen hardcoded GitHub repos in `src/app/showcase-wall/_content/_registry.ts` (`SHOWCASE` ids + `SHOWCASE_FEATURED` bodies). One file on purpose — each entry is a small object. User-uploaded wall items stay Prisma.

## Break Room catalogs

Games (568) and recipes (534) are typed arrays in `src/app/rest/games/_content.ts` and `src/app/rest/cookbook/_content.ts`. **Not** one folder each.

## How Trails link to Manuals

They don’t, today. `/trails/[slug]` redirects to `/manuals/[slug]`. Prisma trail slugs 404 on the manual reader. Pins of type `trail` and type `manual` are separate. A trail chapter may later point at `src/app/manuals/_content/<slug>/snippets/...` by path; nothing does that yet. No duplicated trail↔manual lesson bodies were found in the audit.
