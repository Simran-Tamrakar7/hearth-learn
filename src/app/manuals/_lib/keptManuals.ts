/** Builtin manuals kept in the catalog (all others removed). */
export const KEPT_BUILTIN_SLUGS = ["playwright", "testing-types"] as const;

export function isKeptBuiltinSlug(slug: string) {
  return (KEPT_BUILTIN_SLUGS as readonly string[]).includes(slug);
}
