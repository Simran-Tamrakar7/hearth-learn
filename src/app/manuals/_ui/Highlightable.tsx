"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Highlighter, X } from "lucide-react";
import {
  HL_COLORS,
  type ChapterHighlight,
  type HighlightColor,
  type HighlightField,
  wrapHighlightHtml,
} from "@/app/manuals/_lib/highlights";

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
          <mark key={m[1] || i} data-hl={m[1]} style={{ backgroundColor: color }} className="rounded-sm px-0.5">
            {m[3]}
          </mark>
        );
      })}
    </>
  );
}

export function Highlightable({
  children,
  onAdd,
}: {
  children: ReactNode;
  onAdd: (text: string, color: HighlightColor) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [bar, setBar] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    const hide = () => setBar(null);
    document.addEventListener("mousedown", hide);
    return () => document.removeEventListener("mousedown", hide);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseUp={() => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !ref.current) {
          setBar(null);
          return;
        }
        const text = sel.toString().trim();
        if (!text || text.length > 500) return;
        const node = sel.anchorNode;
        if (!node || !ref.current.contains(node)) return;
        const range = sel.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const host = ref.current.getBoundingClientRect();
        setBar({
          x: Math.min(Math.max(rect.left - host.left + rect.width / 2, 24), host.width - 24),
          y: Math.max(rect.top - host.top - 8, 8),
          text,
        });
      }}
    >
      {children}
      {bar ? (
        <div
          className="absolute z-20 flex items-center gap-1 px-1.5 py-1 rounded-full bg-[#1C2A26] shadow-lg"
          style={{ left: bar.x, top: bar.y, transform: "translate(-50%, -100%)" }}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <Highlighter className="w-3 h-3 text-[#FAF7F2] ml-1" />
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              title={`Highlight ${color}`}
              aria-label={`Highlight ${color}`}
              onClick={() => {
                onAdd(bar.text, color);
                setBar(null);
                window.getSelection()?.removeAllRanges();
              }}
              className="w-4 h-4 rounded-full border border-white/40"
              style={{ backgroundColor: HL_COLORS[color] }}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function HighlightsList({
  rows,
  emptyLabel,
  onRemove,
}: {
  rows: ChapterHighlight[];
  emptyLabel: string;
  onRemove: (row: ChapterHighlight) => void;
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

export function fieldFromView(view: "full" | "summary" | "aiSummary"): HighlightField {
  return view;
}
