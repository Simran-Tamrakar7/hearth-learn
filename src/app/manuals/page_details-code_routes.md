# Manuals — routes, files, and what to edit

## Routes

| URL | Main file |
|---|---|
| `/manuals` | `page.tsx` |
| `/manuals/[slug]` | `[slug]/page.tsx` |

## Folder layout

```
manuals/
├── page_details-code_routes.md   ← this file
├── page.tsx                      ← catalog grid
├── [slug]/page.tsx               ← reader + edit mode
├── testing-types/                ← builtin manual (MD source of truth)
│   ├── toc.ts                    ← 15-part TOC ordering only
│   ├── meta.json
│   ├── compiled.body.ts          ← auto-generated at build
│   └── part-N/chapter-M.md       ← frontmatter + body + tools code
├── playwright/                   ← same pattern (61 chapters)
├── _content/                     ← other catalog manuals (data.js)
│   └── _registry.ts              ← lists builtins + imports compiled.body
├── _lib/                         ← loaders, user manuals, export, parts
├── _ui/                          ← catalog/reader UI (ToolSwitcher, cards, …)
└── features/edit/                ← inline chapter editors
    ├── ChapterContentEditor.tsx
    ├── LessonContentEditor.tsx
    └── lessonFormat.ts
```

## What to edit for X

| What you want to change | Open this file |
|---|---|
| Catalog grid (search, categories, cards) | `page.tsx` |
| Reader after clicking a manual | `[slug]/page.tsx` |
| Tool tabs inside a chapter (JUnit/PyTest/Jest) | `_ui/ToolSwitcher.tsx` — data comes from chapter MD `tools:` frontmatter |
| Inline chapter editor (write/preview toolbar) | `features/edit/LessonContentEditor.tsx` |
| Chapter field editor shell | `features/edit/ChapterContentEditor.tsx` |
| Testing Types chapter **content** | `testing-types/part-N/chapter-M.md` |
| Testing Types TOC order / nesting | `testing-types/toc.ts` |
| Playwright chapter **content** | `playwright/part-N/chapter-M.md` |
| Playwright TOC | `playwright/toc.ts` |
| Rebuild compiled bodies after MD edits | `node scripts/compile-manuals-from-md.mjs` (runs on `npm run dev`) |
| Other builtin manual chapters | `_content/<slug>/data.js` |
| Registry (hide/feature/pin/order) | `_content/_registry.ts` |
| User / AI manuals (`localStorage`) | `_lib/userManuals.ts` |
| Add blank manual (`+` on `/manuals` and `/library`) | `_ui/AddManualControl.tsx` |
| AI notes → manual formatting | `/api/manuals/generate` |
| Playwright roadmap download | `_lib/roadmapData.ts` |
| TOC part helpers | `_lib/manualParts.ts` |
| Export PDF/DOCX | `_lib/manualExport.ts` |
| Highlights | `_ui/Highlightable.tsx` + `_lib/highlights.ts` + `/api/highlights` |
| Top nav (every page) | `src/components/layout/Navbar.tsx` |

## New manual convention

Every disk-backed manual uses **one folder**, **one `toc.ts`** (ordering only), and **one `.md` per chapter** with everything in frontmatter + body:

```
<slug>/
├── toc.ts
├── meta.json
├── part-0/chapter-1.md   ← why/when/tools/practical in YAML frontmatter
└── part-0/chapter-2.md
```

Never split into separate `overlay.ts` or snippet files. Register in `_content/_registry.ts` and run `compile-manuals-from-md.mjs`.
