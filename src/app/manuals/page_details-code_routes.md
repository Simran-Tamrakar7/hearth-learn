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
├── types.ts                      ← ManualItem, ManualChapter, ChapterRecord
├── registry.ts                   ← builtin catalog + path helpers (genres, stripLeadingNumber, …)
├── archive/                      ← archived manual data (not code)
├── features/
│   ├── reader.tsx                ← pathwise loader, TOC reader, ToolSwitcher, part helpers
│   ├── catalog.tsx               ← ManualCard, AddManualControl, KebabMenu, RecentlyViewed
│   ├── categorization.tsx        ← categories, tags, CategoryManager, TagInput
│   ├── export.tsx                ← PDF/DOCX export + ManualExportMenu
│   ├── highlights.tsx            ← highlight store + Highlightable UI
│   ├── local-storage.ts          ← user manuals in localStorage
│   └── edit/
│       ├── ChapterContentEditor.tsx  ← field editor + in-session undo
│       ├── LessonContentEditor.tsx   ← markdown toolbar (Add) vs typing (Edit)
│       ├── lessonFormat.ts
│       ├── editHistory.ts            ← undo stack (in-memory, per edit session)
│       └── chapterDisk.ts            ← manualChapterToRecord + saveChapterToDisk
├── testing-types/
│   ├── toc.ts                    ← 15-part TOC + part/reorder helpers
│   ├── meta.json
│   ├── chapters-index.ts         ← auto-generated imports of all chapter modules
│   ├── chapter-paths.ts          ← auto-generated id → part-N/chapter-M.ts map
│   ├── TestingTypesGuide.tsx
│   └── part-N/chapter-M.ts       ← one self-contained module per chapter
└── playwright/                   ← same pattern (61 chapters)
    ├── toc.ts
    ├── roadmapData.ts
    └── part-N/chapter-M.ts
```

## What to edit for X

| What you want to change | Open this file |
|---|---|
| Catalog grid (search, categories, cards) | `page.tsx` |
| Reader after clicking a manual | `[slug]/page.tsx` |
| Tool tabs inside a chapter (JUnit/PyTest/Jest) | `features/reader.tsx` (`ToolSwitcher`) — data in chapter `tools[]` |
| Inline chapter editor (write/preview toolbar) | `features/edit/LessonContentEditor.tsx` |
| Chapter field editor shell + undo | `features/edit/ChapterContentEditor.tsx` |
| Testing Types chapter **content** | `testing-types/part-N/chapter-M.ts` |
| Testing Types TOC order / nesting | `testing-types/toc.ts` |
| Playwright chapter **content** | `playwright/part-N/chapter-M.ts` |
| Playwright TOC | `playwright/toc.ts` |
| Regenerate chapter index after adding files | `node scripts/generate-chapter-index.mjs` |
| Registry (hide/feature/pin/order) | `registry.ts` |
| User / AI manuals (`localStorage`) | `features/local-storage.ts` |
| Add blank manual (`+` on `/manuals` and `/library`) | `features/catalog.tsx` |
| AI notes → manual formatting | `/api/manuals/generate` |
| Playwright roadmap download | `playwright/roadmapData.ts` |
| TOC part helpers | `testing-types/toc.ts` and `playwright/toc.ts` (re-exported via `features/reader.tsx`) |
| Export PDF/DOCX | `features/export.tsx` |
| Highlights | `features/highlights.tsx` + `/api/highlights` |
| Top nav (every page) | `src/components/layout/Navbar.tsx` |

## Chapter editor: save, rebuild, undo

| Topic | Detail |
|---|---|
| **Disk write target** | `testing-types/part-N/chapter-M.ts` or `playwright/part-N/chapter-M.ts` — one file per chapter, resolved via `chapter-paths.ts` → `ManualChapter.sourceFile` |
| **API** | `POST /api/manuals/chapter` with `{ slug, sourceFile, chapter }` — writes only that `.ts` file; never touches siblings or `toc.ts` |
| **When save runs** | Debounced chapter edit in `[slug]/page.tsx` → `commitPending()` → `saveChapterToDisk()` for builtin slugs (`testing-types`, `playwright`) |
| **Rebuild needed?** | No MD compile step. After adding new chapter files, run `node scripts/generate-chapter-index.mjs` to refresh `chapters-index.ts` + `chapter-paths.ts` |
| **Undo state** | `features/edit/editHistory.ts` — in-memory stack inside `ChapterContentEditor` (max 50 steps). Toolbar inserts in `LessonContentEditor` use `onAdd` (kind `"add"`); field typing uses kind `"edit"`. Lost on reload. Page-level TOC undo remains separate in `[slug]/page.tsx`. |

## New manual convention

Every disk-backed manual uses **one folder**, **one `toc.ts`** (ordering + part helpers), and **one `.ts` per chapter**:

```
<slug>/
├── toc.ts
├── meta.json
├── chapters-index.ts      ← generated
├── chapter-paths.ts       ← generated
├── part-0/chapter-1.ts    ← export const chapter = { … } as ChapterRecord
└── part-0/chapter-2.ts
```

Register in `registry.ts`. No `compiled.body.ts`, no overlay layer, no per-chapter `.check.ts` files.
