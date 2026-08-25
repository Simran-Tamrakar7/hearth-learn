# Hearth Learn

Learning cabin at [hearth-learn.vercel.app](https://hearth-learn.vercel.app). Each page’s copy lives in that page’s folder (`src/app/<url>/`). How to add, hide, or restore items is in `/docs`.

## Docs

- [Where to edit](docs/where-to-edit.md) — URL → that page’s folder
- [Architecture](docs/architecture.md) — stack, folders, every route
- [Content model](docs/content-model.md) — manuals vs library vs trails vs Life Lab vs toolkits vs showcase
- [Page reference](docs/page-reference.md) — what each URL reads and writes
- [Adding content](docs/adding-content.md) — hand-edit steps (no generate script)
- [Archiving and deleting](docs/archiving-deleting.md) — one-line hide, folder-move soft-delete
- [Local development](docs/local-dev.md) — install, run, env
- [Audit findings](docs/audit-findings.md) — where content lived before this layout

## Run locally

```bash
npm install
npx prisma generate
npm run dev
```

Details: [docs/local-dev.md](docs/local-dev.md).
