"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ChevronDown, ChevronRight, Copy, GripVertical, Trash2 } from "lucide-react";
import type { BlockAccent, BlockFont, ChapterBlock } from "@/app/manuals/features/blocks/types";
import {
  BLOCK_ACCENTS,
  BLOCK_FONTS,
  blockDisplayName,
  blockPublishIssue,
} from "@/app/manuals/features/blocks/types";

type DragHandle = {
  attributes: object;
  listeners?: object;
};

export function BlockShell({
  block,
  catalogLabel,
  index,
  total,
  dragHandle,
  onChange,
  onMove,
  onDuplicate,
  onDelete,
  children,
}: {
  block: ChapterBlock;
  catalogLabel: string;
  index: number;
  total: number;
  dragHandle?: DragHandle;
  onChange: (next: ChapterBlock) => void;
  onMove: (dir: -1 | 1) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  children: ReactNode;
}) {
  const issue = blockPublishIssue(block);
  const collapsed = Boolean(block.collapsed);

  return (
    <fieldset id={`block-${block.id}`} className="p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2">
      <legend className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1">
        <button
          type="button"
          className="cursor-grab active:cursor-grabbing p-0.5 rounded text-[#C4B8A8] hover:text-[#52635E] touch-none"
          title="Drag to reorder"
          aria-label="Drag to reorder"
          {...(dragHandle?.attributes as ButtonHTMLAttributes<HTMLButtonElement>)}
          {...(dragHandle?.listeners as ButtonHTMLAttributes<HTMLButtonElement> | undefined)}
        >
          <GripVertical className="w-3.5 h-3.5" />
        </button>
        {blockDisplayName(block, catalogLabel)}
        <span className="font-normal normal-case tracking-normal text-[#8A9B95]">({catalogLabel})</span>
        {issue ? (
          <span className="normal-case tracking-normal font-medium text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
            Incomplete
          </span>
        ) : null}
      </legend>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
        <label className="block space-y-0.5 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">Rename</span>
          <input
            value={block.heading || ""}
            onChange={(e) => onChange({ ...block, heading: e.target.value })}
            placeholder={catalogLabel}
            className="w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg"
          />
        </label>
        <label className="block space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">Color</span>
          <div className="flex flex-wrap gap-1 p-1.5 bg-white border border-[#E7E0D3] rounded-lg">
            {BLOCK_ACCENTS.map((a) => (
              <button
                key={a.id}
                type="button"
                title={a.label}
                onClick={() => onChange({ ...block, accent: a.id as BlockAccent })}
                className={`w-6 h-6 rounded-full border-2 ${
                  (block.accent || "amber") === a.id ? "border-[#1C2A26]" : "border-transparent"
                }`}
                style={{ backgroundColor: a.swatch }}
              />
            ))}
          </div>
        </label>
        <label className="block space-y-0.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">Font</span>
          <select
            value={block.font || "sans"}
            onChange={(e) => onChange({ ...block, font: e.target.value as BlockFont })}
            className="w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg"
          >
            {BLOCK_FONTS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-wrap justify-end gap-1">
        <button
          type="button"
          title={collapsed ? "Expand" : "Collapse"}
          onClick={() => onChange({ ...block, collapsed: !collapsed })}
          className="text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E7E0D3] inline-flex items-center gap-1"
        >
          {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {collapsed ? "Expand" : "Collapse"}
        </button>
        <button
          type="button"
          disabled={index === 0}
          onClick={() => onMove(-1)}
          className="text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E7E0D3] disabled:opacity-40"
        >
          Up
        </button>
        <button
          type="button"
          disabled={index === total - 1}
          onClick={() => onMove(1)}
          className="text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E7E0D3] disabled:opacity-40"
        >
          Down
        </button>
        <button
          type="button"
          onClick={onDuplicate}
          className="text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E7E0D3] inline-flex items-center gap-1"
        >
          <Copy className="w-3 h-3" /> Duplicate
        </button>
        <button
          type="button"
          onClick={onDelete}
          className="text-[10px] font-bold px-2 py-1 rounded-lg border border-rose-200 text-rose-700 inline-flex items-center gap-1"
        >
          <Trash2 className="w-3 h-3" /> Delete
        </button>
      </div>

      {collapsed ? null : children}
    </fieldset>
  );
}
