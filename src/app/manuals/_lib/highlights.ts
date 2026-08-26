export const HL_COLORS = {
  yellow: "#FEF08A",
  green: "#BBF7D0",
  pink: "#FBCFE8",
  blue: "#BFDBFE",
} as const;

export type HighlightColor = keyof typeof HL_COLORS;
export type HighlightField = "full" | "summary" | "aiSummary";

export type ChapterHighlight = {
  id: string;
  text: string;
  color: HighlightColor;
  field: HighlightField;
  chapterId: string;
};

export type HighlightStore = Record<string, ChapterHighlight[]>;

export function isHighlightColor(value: string): value is HighlightColor {
  return value in HL_COLORS;
}

export function wrapHighlightHtml(text: string, highlights: ChapterHighlight[]): string {
  if (!text || highlights.length === 0) return text;
  let out = text;
  for (const h of highlights) {
    const quote = h.text?.trim();
    if (!quote || out.includes(`data-hl="${h.id}"`)) continue;
    const i = out.indexOf(quote);
    if (i < 0) continue;
    out = `${out.slice(0, i)}<mark data-hl="${h.id}" data-c="${h.color}">${quote}</mark>${out.slice(i + quote.length)}`;
  }
  return out;
}

export function parseHighlightStore(raw: string | null): HighlightStore {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    const out: HighlightStore = {};
    for (const [chapterId, rows] of Object.entries(parsed as Record<string, unknown>)) {
      if (!Array.isArray(rows)) continue;
      out[chapterId] = rows
        .filter((row): row is ChapterHighlight => {
          if (!row || typeof row !== "object") return false;
          const r = row as ChapterHighlight;
          return Boolean(r.id && r.text && isHighlightColor(String(r.color)));
        })
        .map((row) => ({
          ...row,
          chapterId,
          color: isHighlightColor(row.color) ? row.color : "yellow",
          field: row.field === "summary" || row.field === "aiSummary" ? row.field : "full",
        }));
    }
    return out;
  } catch {
    return {};
  }
}

export function addHighlight(
  store: HighlightStore,
  chapterId: string,
  text: string,
  color: HighlightColor,
  field: HighlightField
): HighlightStore {
  const quote = text.trim();
  if (!quote) return store;
  const row: ChapterHighlight = {
    id: `hl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    text: quote.slice(0, 500),
    color,
    field,
    chapterId,
  };
  return { ...store, [chapterId]: [...(store[chapterId] || []), row] };
}

export function removeHighlight(store: HighlightStore, chapterId: string, id: string): HighlightStore {
  const next = (store[chapterId] || []).filter((h) => h.id !== id);
  const copy = { ...store };
  if (next.length) copy[chapterId] = next;
  else delete copy[chapterId];
  return copy;
}

export function highlightsForField(rows: ChapterHighlight[] | undefined, field: HighlightField) {
  return (rows || []).filter((h) => h.field === field);
}

export function allHighlights(store: HighlightStore): ChapterHighlight[] {
  return Object.values(store).flat();
}
