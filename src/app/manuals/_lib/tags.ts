export function normalizeTag(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 32);
}

export function addTag(tags: string[], value: string): string[] {
  const t = normalizeTag(value);
  if (!t) return tags;
  if (tags.some((x) => x.toLowerCase() === t.toLowerCase())) return tags;
  return [...tags, t];
}
