"use client";

import { useEffect, useRef, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, Plus } from "lucide-react";
import type { BlockType, ChapterBlock } from "@/app/manuals/features/blocks/types";
import {
  BLOCK_CATEGORIES,
  BLOCK_CATALOG,
  blockTypesForMenu,
  duplicateBlock,
  emptyBlock,
  withOrder,
} from "@/app/manuals/features/blocks/types";
import { BlockShell } from "@/app/manuals/features/blocks/BlockShell";
import { BlockBody, BLOCK_REGISTRY } from "@/app/manuals/features/blocks/registry";

export type BlockChangeKind = "edit" | "add";

function SortableBlock({
  block,
  index,
  total,
  onChange,
  onMove,
  onDuplicate,
  onDelete,
}: {
  block: ChapterBlock;
  index: number;
  total: number;
  onChange: (next: ChapterBlock) => void;
  onMove: (dir: -1 | 1) => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: block.id });
  const entry = BLOCK_REGISTRY[block.type];
  const catalogLabel = entry?.label || block.type;

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={isDragging ? "opacity-80 z-10" : undefined}
    >
      <BlockShell
        block={block}
        catalogLabel={catalogLabel}
        index={index}
        total={total}
        dragHandle={{ attributes, listeners }}
        onChange={onChange}
        onMove={onMove}
        onDuplicate={onDuplicate}
        onDelete={onDelete}
      >
        <BlockBody block={block} onChange={onChange} />
      </BlockShell>
    </div>
  );
}

export function AddBlockMenu({
  allowedBlockTypes,
  onAdd,
}: {
  allowedBlockTypes?: BlockType[] | null;
  onAdd: (type: BlockType) => void;
}) {
  const [open, setOpen] = useState(false);
  const catalog = blockTypesForMenu(allowedBlockTypes);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] text-[#1C2A26] hover:border-[#D97706]"
      >
        <Plus className="w-3.5 h-3.5 text-[#D97706]" />
        Add Block
        <ChevronDown className="w-3.5 h-3.5 text-[#8A9B95]" />
      </button>
      {open ? (
        <>
          <button type="button" className="fixed inset-0 z-20 cursor-default" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-30 mt-1 w-[min(100vw-2rem,22rem)] max-h-[24rem] overflow-y-auto rounded-xl border border-[#E7E0D3] bg-white shadow-lg p-2 space-y-2">
            {BLOCK_CATEGORIES.map((cat) => {
              const items = catalog.filter((c) => c.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">{cat}</p>
                  <div className="space-y-0.5">
                    {items.map((item) => (
                      <button
                        key={item.type}
                        type="button"
                        onClick={() => {
                          onAdd(item.type);
                          setOpen(false);
                        }}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#FAF7F2] space-y-0.5"
                      >
                        <span className="block text-xs font-bold text-[#1C2A26]">{item.label}</span>
                        <span className="block text-[10px] text-[#8A9B95]">{item.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ChapterBlocksEditor({
  blocks,
  allowedBlockTypes,
  onChange,
}: {
  blocks: ChapterBlock[];
  allowedBlockTypes?: BlockType[] | null;
  onChange: (next: ChapterBlock[], kind?: BlockChangeKind) => void;
}) {
  const focusId = useRef<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (!focusId.current) return;
    const root = document.getElementById(`block-${focusId.current}`);
    root?.scrollIntoView({ behavior: "smooth", block: "center" });
    const field = root?.querySelector<HTMLElement>("input, textarea, select");
    field?.focus();
    focusId.current = null;
  }, [blocks]);

  const commit = (next: ChapterBlock[], kind: BlockChangeKind = "edit") => onChange(withOrder(next), kind);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    commit(arrayMove(blocks, oldIndex, newIndex), "add");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Content blocks</p>
        <AddBlockMenu
          allowedBlockTypes={allowedBlockTypes}
          onAdd={(type) => {
            const next = emptyBlock(type);
            focusId.current = next.id;
            commit([...blocks, next], "add");
          }}
        />
      </div>

      {blocks.length === 0 ? (
        <p className="text-xs text-[#8A9B95] border border-dashed border-[#E7E0D3] rounded-xl p-4">
          No blocks yet. Use <strong>Add Block</strong> to create one — then rename, recolor, or add columns.
        </p>
      ) : null}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          {blocks.map((block, idx) => (
            <SortableBlock
              key={block.id}
              block={block}
              index={idx}
              total={blocks.length}
              onChange={(nextBlock) => {
                const next = [...blocks];
                next[idx] = nextBlock;
                commit(next, "edit");
              }}
              onMove={(dir) => {
                const swap = idx + dir;
                if (swap < 0 || swap >= blocks.length) return;
                const next = [...blocks];
                [next[idx], next[swap]] = [next[swap], next[idx]];
                commit(next, "add");
              }}
              onDuplicate={() => {
                const copy = duplicateBlock(block);
                focusId.current = copy.id;
                const next = [...blocks];
                next.splice(idx + 1, 0, copy);
                commit(next, "add");
              }}
              onDelete={() => commit(blocks.filter((_, i) => i !== idx), "add")}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}

export function AllowedBlockTypesEditor({
  value,
  onChange,
}: {
  value?: BlockType[] | null;
  onChange: (next: BlockType[] | null) => void;
}) {
  const allOn = !value?.length;
  const enabled = new Set(allOn ? BLOCK_CATALOG.map((c) => c.type) : value);

  return (
    <div className="space-y-2 p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Allowed Add Block types</p>
        <button type="button" onClick={() => onChange(null)} className="text-[10px] font-bold text-[#0F766E] hover:underline">
          Enable all
        </button>
      </div>
      <p className="text-[11px] text-[#8A9B95] leading-relaxed">
        Filters the Add Block menu only — existing chapter blocks are never hidden or removed.
      </p>
      <div className="space-y-2 max-h-56 overflow-y-auto">
        {BLOCK_CATEGORIES.map((cat) => {
          const items = BLOCK_CATALOG.filter((c) => c.category === cat);
          return (
            <div key={cat}>
              <p className="px-1 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">{cat}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {items.map((item) => {
                  const checked = enabled.has(item.type);
                  return (
                    <label key={item.type} className="flex items-center gap-2 text-xs text-[#1C2A26] px-1 py-0.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          const next = new Set(enabled);
                          if (checked) next.delete(item.type);
                          else next.add(item.type);
                          const arr = BLOCK_CATALOG.map((c) => c.type).filter((t) => next.has(t));
                          onChange(arr.length === BLOCK_CATALOG.length ? null : arr);
                        }}
                      />
                      <span className="font-medium">{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
