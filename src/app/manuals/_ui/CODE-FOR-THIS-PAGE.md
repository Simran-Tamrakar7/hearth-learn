# Manuals page pieces (not URLs)

These files are imported by `../page.tsx`, `../[slug]/page.tsx`, `/library`, and `/admin`.

`LessonContentEditor.tsx` is the in-place write/preview toolbar for a chapter (not a dialog).
`AddManualControl.tsx` is the `+` name → category → tags flow.
`ManualCard.tsx` is the catalog card (kebab + pin + tags).
`Highlightable.tsx` is the selection toolbar + mark wrap.
`CategoryManager.tsx` is the admin category CRUD.

The `_` prefix means Next will not create a `/manuals/_ui` route.
