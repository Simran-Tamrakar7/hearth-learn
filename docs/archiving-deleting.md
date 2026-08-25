# Archiving and deleting

**Pick: status lives only in `_registry.ts`.** `meta.ts` does not have a status field. Hide/show is one line. That is simpler on this stack because a static `import` of a folder would break if you `mv` the folder while the import remains.

## Hide (archive)

In that content type’s `_registry.ts`, change:

```ts
status: "active",
```

to:

```ts
status: "archived",
```

Leave the folder where it is. Default lists skip `archived`. Direct URLs to a builtin manual still work (progress keys stay valid).

Library books: add `status: "archived"` on that book object (they do not have status today; omitted means active).

## Soft-delete

1. Delete that object from `_registry.ts`.
2. If that registry file `import`s the folder (manuals, toolkits, Life Lab arenas), delete that import line too.
3. Move the folder:

```bash
mv src/app/toolkits/_content/my-slug src/app/toolkits/_content/_archive/my-slug
```

Do **not** leave `import "./my-slug/meta"` or `import "./my-slug/data.js"` after the move — Next will fail to compile. For a builtin manual, delete its import and `MANUALS` row in `_registry.ts`, then:

```bash
mv src/app/manuals/_content/my-slug src/app/manuals/_content/_archive/my-slug
```

## Restore

1. `mv src/app/<page>/_content/_archive/my-slug src/app/<page>/_content/my-slug`
2. Paste the registry object back with `status: "active"`.
3. Restore the static import if that type uses one.

## Testing Types TOC

If you archive the whole Testing Types manual, leave `TESTING_TYPES_TOC_VERSION` alone unless you intentionally reset saved TOCs. Bumping that version drops everyone’s saved Testing Types outline.
