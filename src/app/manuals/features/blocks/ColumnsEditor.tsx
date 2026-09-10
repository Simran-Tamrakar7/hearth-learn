"use client";

import { Plus, Trash2 } from "lucide-react";
import type { ColumnTone, PracticalColumn } from "@/app/manuals/features/blocks/types";
import { COLUMN_TONES, newBlockId } from "@/app/manuals/features/blocks/types";
import { FormattedField } from "@/app/manuals/features/blocks/FormattedField";

export function ColumnsEditor({
  columns,
  onChange,
  minColumns = 2,
}: {
  columns: PracticalColumn[];
  onChange: (next: PracticalColumn[]) => void;
  minColumns?: number;
}) {
  const canDelete = columns.length > minColumns;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#0062D2]">Columns</p>
        <button
          type="button"
          onClick={() =>
            onChange([
              ...columns,
              {
                id: newBlockId("col"),
                label: `Column ${columns.length + 1}`,
                content: "",
                tone: "neutral",
              },
            ])
          }
          className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border border-[#D0E2FF] bg-white text-[#0062D2]"
        >
          <Plus className="w-3 h-3" /> Add column
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {columns.map((col, idx) => {
          const tone = COLUMN_TONES.find((t) => t.id === (col.tone || "neutral")) || COLUMN_TONES[4];
          return (
            <div key={col.id} className={`p-2.5 rounded-xl border bg-white space-y-2 ${tone.border} border-t-2 ${tone.top}`}>
              <div className="flex gap-1.5 items-center">
                <input
                  value={col.label}
                  onChange={(e) => {
                    const next = [...columns];
                    next[idx] = { ...col, label: e.target.value };
                    onChange(next);
                  }}
                  placeholder="Column name"
                  className={`flex-1 p-1.5 text-[11px] font-mono font-bold uppercase tracking-wider rounded-md border ${tone.border} ${tone.text}`}
                />
                <select
                  value={col.tone || "neutral"}
                  onChange={(e) => {
                    const next = [...columns];
                    next[idx] = { ...col, tone: e.target.value as ColumnTone };
                    onChange(next);
                  }}
                  className="text-[10px] font-bold border border-[#E7E0D3] rounded-md px-1.5 py-1 bg-white"
                  title="Column color"
                >
                  {COLUMN_TONES.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
                {canDelete ? (
                  <button
                    type="button"
                    title="Delete column"
                    onClick={() => onChange(columns.filter((_, i) => i !== idx))}
                    className="p-1.5 rounded-md border border-rose-200 text-rose-700"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                ) : null}
              </div>
              <FormattedField
                value={col.content}
                onChange={(content) => {
                  const next = [...columns];
                  next[idx] = { ...col, content };
                  onChange(next);
                }}
                rows={3}
                placeholder="Column content"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
