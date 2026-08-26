export const HL_COLORS = {
  yellow: "#FEF08A",
  green: "#BBF7D0",
  pink: "#FBCFE8",
  blue: "#BFDBFE",
} as const;

export type HighlightColor = keyof typeof HL_COLORS;
export type HighlightField = "full" | "summary" | "aiSummary";
export type HighlightTabType = "fullContent" | "summary" | "aiSummary";

export type ChapterHighlight = {
  id: string;
  text: string;
  color: HighlightColor;
  field: HighlightField;
  chapterId: string;
  start?: number;
};

export type HighlightStore = Record<string, ChapterHighlight[]>;

export function isHighlightColor(value: string): value is HighlightColor {
  return value in HL_COLORS;
}

export function fieldToTabType(field: HighlightField): HighlightTabType {
  return field === "summary" ? "summary" : field === "aiSummary" ? "aiSummary" : "fullContent";
}

export function tabTypeToField(tab: string): HighlightField {
  return tab === "summary" ? "summary" : tab === "aiSummary" ? "aiSummary" : "full";
}

export function wrapHighlightHtml(text: string, highlights: ChapterHighlight[]): string {
  if (!text || highlights.length === 0) return text;
  const sorted = [...highlights].sort((a, b) => (b.text?.length || 0) - (a.text?.length || 0));
  let out = text;
  for (const h of sorted) {
    const quote = h.text?.trim();
    if (!quote || out.includes(`data-hl="${h.id}"`)) continue;
    const from = typeof h.start === "number" && h.start >= 0 ? h.start : 0;
    let i = from < out.length ? out.indexOf(quote, from) : -1;
    if (i < 0) i = out.indexOf(quote);
    if (i < 0) continue;
    out = `${out.slice(0, i)}<mark data-hl="${h.id}" data-c="${h.color}">${quote}</mark>${out.slice(i + quote.length)}`;
  }
  return out;
}

function asRow(row: ChapterHighlight, chapterId: string): ChapterHighlight {
  return {
    id: row.id,
    text: String(row.text || "").slice(0, 500),
    color: isHighlightColor(row.color) ? row.color : "yellow",
    field: row.field === "summary" || row.field === "aiSummary" ? row.field : "full",
    chapterId,
    start: typeof row.start === "number" && row.start >= 0 ? row.start : 0,
  };
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
        .map((row) => asRow(row, chapterId));
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
  field: HighlightField,
  start = 0
): HighlightStore {
  const quote = text.trim();
  if (!quote) return store;
  const row: ChapterHighlight = {
    id: `hl-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    text: quote.slice(0, 500),
    color,
    field,
    chapterId,
    start: start >= 0 ? start : 0,
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

export function storeFromRows(rows: ChapterHighlight[]): HighlightStore {
  const out: HighlightStore = {};
  for (const row of rows) {
    if (!row?.id || !row.chapterId || !row.text) continue;
    (out[row.chapterId] ||= []).push(asRow(row, row.chapterId));
  }
  return out;
}

export function mergeHighlightStores(local: HighlightStore, remote: HighlightStore): HighlightStore {
  const out: HighlightStore = { ...local };
  for (const [chapterId, rows] of Object.entries(remote)) {
    const existing = out[chapterId] || [];
    const ids = new Set(existing.map((r) => r.id));
    const keys = new Set(existing.map((r) => `${r.field}|${r.text}|${r.color}`));
    const extra = rows.filter((r) => !ids.has(r.id) && !keys.has(`${r.field}|${r.text}|${r.color}`));
    if (extra.length) out[chapterId] = [...existing, ...extra];
    else if (!out[chapterId] && rows.length) out[chapterId] = rows;
  }
  return out;
}

export function lastAdded(store: HighlightStore, chapterId: string): ChapterHighlight | undefined {
  const rows = store[chapterId];
  return rows?.[rows.length - 1];
}

export async function fetchManualHighlights(chapterIds: string[]): Promise<HighlightStore> {
  if (typeof window === "undefined" || chapterIds.length === 0) return {};
  try {
    const qs = new URLSearchParams({ chapterIds: chapterIds.join(",") });
    const res = await fetch(`/api/highlights?${qs}`);
    if (!res.ok) return {};
    const data = await res.json();
    const rows = Array.isArray(data.highlights) ? data.highlights : [];
    return storeFromRows(
      rows.map((row: Record<string, unknown>) => ({
        id: String(row.id || ""),
        text: String(row.text || ""),
        color: isHighlightColor(String(row.color)) ? String(row.color) : "yellow",
        field: tabTypeToField(String(row.tabType || "fullContent")),
        chapterId: String(row.chapterId || ""),
        start: typeof row.start === "number" ? row.start : 0,
      }))
    );
  } catch {
    return {};
  }
}

export async function postManualHighlight(row: ChapterHighlight) {
  if (typeof window === "undefined") return;
  try {
    await fetch("/api/highlights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: row.id,
        chapterId: row.chapterId,
        tabType: fieldToTabType(row.field),
        text: row.text,
        color: row.color,
        start: row.start ?? 0,
      }),
    });
  } catch {
    /* ponytail: localStorage is the durable copy on ephemeral Vercel sqlite */
  }
}

export async function deleteManualHighlight(id: string) {
  if (typeof window === "undefined" || !id) return;
  try {
    await fetch(`/api/highlights?id=${encodeURIComponent(id)}`, { method: "DELETE" });
  } catch {
    /* local copy already dropped */
  }
}
