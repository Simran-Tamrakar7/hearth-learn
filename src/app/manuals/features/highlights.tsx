"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Highlighter, X } from "lucide-react";

export const HL_COLORS = {
  yellow: "#FEF08A",
  green: "#BBF7D0",
  pink: "#FBCFE8",
  blue: "#BFDBFE",
} as const;

export type HighlightColor = keyof typeof HL_COLORS;
export type HighlightField = "full" | "summary" | "activities" | "aiSummary";
export type HighlightTabType = "fullContent" | "summary" | "activities" | "aiSummary";

export type ChapterHighlight = {
  id: string;
  text: string;
  color: HighlightColor;
  field: HighlightField;
  chapterId: string;
  start?: number;
  reviewLater?: boolean;
  reviewAt?: string | null;
};

export type HighlightStore = Record<string, ChapterHighlight[]>;

export function isHighlightColor(value: string): value is HighlightColor {
  return value in HL_COLORS;
}

export function fieldToTabType(field: HighlightField): HighlightTabType {
  if (field === "summary") return "summary";
  if (field === "activities" || field === "aiSummary") return "activities";
  return "fullContent";
}

export function tabTypeToField(tab: string): HighlightField {
  if (tab === "summary") return "summary";
  if (tab === "activities" || tab === "aiSummary") return "activities";
  return "full";
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
    field: row.field === "summary" || row.field === "activities" || row.field === "aiSummary" ? (row.field === "aiSummary" ? "activities" : row.field) : "full",
    chapterId,
    start: typeof row.start === "number" && row.start >= 0 ? row.start : 0,
    reviewLater: Boolean(row.reviewLater),
    reviewAt: row.reviewAt || null,
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
  return (rows || []).filter((h) => {
    if (field === "activities") return h.field === "activities" || h.field === "aiSummary";
    return h.field === field;
  });
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
        reviewLater: Boolean(row.reviewLater),
        reviewAt: row.reviewAt ? String(row.reviewAt) : null,
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
        reviewLater: Boolean(row.reviewLater),
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

const COLORS = Object.keys(HL_COLORS) as HighlightColor[];

export function MarkedText({ text, highlights }: { text: string; highlights: ChapterHighlight[] }) {
  const html = wrapHighlightHtml(text, highlights);
  const parts = html.split(/(<mark data-hl="[^"]*" data-c="[^"]*">[\s\S]*?<\/mark>)/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = /^<mark data-hl="([^"]*)" data-c="([^"]*)">([\s\S]*?)<\/mark>$/.exec(part);
        if (!m) return <span key={i}>{part}</span>;
        const color = m[2] in HL_COLORS ? HL_COLORS[m[2] as HighlightColor] : HL_COLORS.yellow;
        return (
          <mark
            key={m[1] || i}
            data-hl={m[1]}
            data-c={m[2]}
            style={{ backgroundColor: color }}
            className="rounded-sm px-0.5 cursor-pointer"
            title="Click to remove highlight"
          >
            {m[3]}
          </mark>
        );
      })}
    </>
  );
}

type Bar =
  | { kind: "add"; x: number; y: number; text: string; start: number }
  | { kind: "edit"; x: number; y: number; id: string };

export function Highlightable({
  children,
  onAdd,
  onRemove,
  defaultColor = "yellow",
}: {
  children: ReactNode;
  onAdd: (text: string, color: HighlightColor, start: number) => void;
  onRemove?: (id: string) => void;
  defaultColor?: HighlightColor;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<Bar | null>(null);

  useEffect(() => {
    const hide = (e: Event) => {
      if (barRef.current?.contains(e.target as Node)) return;
      setBar(null);
    };
    document.addEventListener("mousedown", hide);
    return () => document.removeEventListener("mousedown", hide);
  }, []);

  function showFromSelection() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !ref.current) return;
    const text = sel.toString().trim();
    if (!text || text.length > 500) return;
    const node = sel.anchorNode;
    if (!node || !ref.current.contains(node)) return;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const host = ref.current.getBoundingClientRect();
    const full = ref.current.textContent || "";
    const start = Math.max(0, full.indexOf(text));
    setBar({
      kind: "add",
      x: Math.min(Math.max(rect.left - host.left + rect.width / 2, 24), Math.max(host.width - 24, 24)),
      y: Math.max(rect.top - host.top - 8, 8),
      text,
      start,
    });
  }

  function onClick(e: React.MouseEvent) {
    const mark = (e.target as HTMLElement).closest("mark[data-hl]") as HTMLElement | null;
    if (!mark || !ref.current) return;
    const id = mark.getAttribute("data-hl");
    if (!id) return;
    const rect = mark.getBoundingClientRect();
    const host = ref.current.getBoundingClientRect();
    setBar({
      kind: "edit",
      id,
      x: Math.min(Math.max(rect.left - host.left + rect.width / 2, 24), Math.max(host.width - 24, 24)),
      y: Math.max(rect.top - host.top - 8, 8),
    });
  }

  return (
    <div ref={ref} className="relative" onMouseUp={showFromSelection} onClick={onClick}>
      {children}
      {bar ? (
        <div
          ref={barRef}
          className="absolute z-20 flex items-center gap-1 px-1.5 py-1 rounded-full bg-[#1C2A26] shadow-lg text-[#FAF7F2]"
          style={{ left: bar.x, top: bar.y, transform: "translate(-50%, -100%)" }}
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {bar.kind === "add" ? (
            <>
              <Highlighter className="w-3 h-3 ml-1" />
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  title={`Highlight ${color}`}
                  aria-label={`Highlight ${color}`}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    onAdd(bar.text, color || defaultColor, bar.start);
                    setBar(null);
                    window.getSelection()?.removeAllRanges();
                  }}
                  className={`w-4 h-4 rounded-full border ${color === defaultColor ? "border-white" : "border-white/40"}`}
                  style={{ backgroundColor: HL_COLORS[color] }}
                />
              ))}
            </>
          ) : (
            <button
              type="button"
              className="flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold"
              onClick={() => {
                onRemove?.(bar.id);
                setBar(null);
              }}
            >
              <X className="w-3 h-3" /> Remove highlight
            </button>
          )}
        </div>
      ) : null}
    </div>
  );
}

export function HighlightsList({
  rows,
  emptyLabel,
  onRemove,
  onReviewLater,
}: {
  rows: ChapterHighlight[];
  emptyLabel: string;
  onRemove: (row: ChapterHighlight) => void;
  onReviewLater?: (row: ChapterHighlight) => void;
}) {
  if (rows.length === 0) {
    return <p className="text-[11px] text-[#8A9B95]">{emptyLabel}</p>;
  }
  return (
    <ul className="space-y-1.5">
      {rows.map((row) => (
        <li key={row.id} className="flex items-start gap-2 text-xs text-[#1C2A26]">
          <span
            className="mt-1 w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: HL_COLORS[row.color] }}
          />
          <span className="flex-1 min-w-0 leading-relaxed">“{row.text}”</span>
          {onReviewLater ? (
            <button type="button" className="text-[10px] font-bold text-[#D97706] shrink-0" onClick={() => onReviewLater(row)}>
              {row.reviewLater ? "Queued" : "Review later"}
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onRemove(row)}
            className="p-0.5 text-[#8A9B95] hover:text-rose-700"
            aria-label="Remove highlight"
            title="Remove highlight"
          >
            <X className="w-3 h-3" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export function fieldFromView(view: "full" | "summary" | "activities"): HighlightField {
  return view;
}
