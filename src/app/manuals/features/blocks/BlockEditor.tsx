"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  pointerWithin,
  useDroppable,
  useSensor,
  useSensors,
  type CollisionDetection,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import type { BlockLayout, BlockType, ChapterBlock, RowColumns } from "@/app/manuals/features/blocks/types";
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
import {
  addBlockToRow,
  addRow,
  appendBlockRow,
  applyDrop,
  blockMoveFlags,
  duplicateBlockInLayout,
  layoutBlockOrder,
  persistableLayout,
  removeBlockFromLayout,
  removeRow,
  rowGridClass,
  sanitizeLayout,
  setRowColumns,
  moveBlockStep,
} from "@/app/manuals/features/blocks/layout";

export type BlockChangeKind = "edit" | "add";

const collision: CollisionDetection = (args) => {
  const hits = pointerWithin(args);
  return hits.length ? hits : closestCorners(args);
};

function SortableBlock({
  block,
  canMove,
  onChange,
  onMove,
  onDuplicate,
  onDelete,
}: {
  block: ChapterBlock;
  canMove: { up: boolean; down: boolean; left: boolean; right: boolean };
  onChange: (next: ChapterBlock) => void;
  onMove: (dir: "up" | "down" | "left" | "right") => void;
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
        dragHandle={{ attributes, listeners }}
        canMove={canMove}
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

function RowDroppable({
  rowId,
  className,
  children,
}: {
  rowId: string;
  className?: string;
  children: ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `row:${rowId}` });
  return (
    <div
      ref={setNodeRef}
      className={`${className || ""} ${isOver ? "ring-1 ring-[#D97706] rounded-xl" : ""}`.trim()}
    >
      {children}
    </div>
  );
}

function SlotDroppable({ rowId, index }: { rowId: string; index: number }) {
  const { setNodeRef, isOver } = useDroppable({ id: `slot:${rowId}:${index}` });
  return (
    <div
      ref={setNodeRef}
      className={`min-h-[4.5rem] rounded-xl border border-dashed ${
        isOver ? "border-[#D97706] bg-[#FEF3C7]/40" : "border-[#E7E0D3] bg-white/50"
      }`}
    />
  );
}

function RowColumnsToggle({
  value,
  onChange,
}: {
  value: RowColumns;
  onChange: (n: RowColumns) => void;
}) {
  return (
    <div className="inline-flex items-center gap-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">Layout</span>
      {([1, 2, 3] as const).map((n) => (
        <button
          key={n}
          type="button"
          title={`${n} column${n === 1 ? "" : "s"}`}
          aria-label={`${n} column${n === 1 ? "" : "s"}`}
          aria-pressed={value === n}
          onClick={() => onChange(n)}
          className={`min-w-7 h-7 px-1.5 text-[11px] font-bold rounded-lg border ${
            value === n
              ? "border-[#D97706] bg-[#FEF3C7] text-[#1C2A26]"
              : "border-[#E7E0D3] bg-white text-[#52635E] hover:border-[#D97706]"
          }`}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

export function AddBlockMenu({
  allowedBlockTypes,
  onAdd,
  label = "Add Block",
}: {
  allowedBlockTypes?: BlockType[] | null;
  onAdd: (type: BlockType) => void;
  label?: string;
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
        {label}
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

function AddRowMenu({ onAdd }: { onAdd: (columns: RowColumns) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl border border-dashed border-[#E7E0D3] bg-white text-[#1C2A26] hover:border-[#D97706]"
      >
        <Plus className="w-3.5 h-3.5 text-[#D97706]" />
        Add Row
        <ChevronDown className="w-3.5 h-3.5 text-[#8A9B95]" />
      </button>
      {open ? (
        <>
          <button type="button" className="fixed inset-0 z-20 cursor-default" aria-label="Close" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-30 mt-1 w-44 rounded-xl border border-[#E7E0D3] bg-white shadow-lg p-1">
            {([1, 2, 3] as const).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => {
                  onAdd(n);
                  setOpen(false);
                }}
                className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#FAF7F2] text-xs font-bold text-[#1C2A26]"
              >
                {n} Column{n === 1 ? "" : "s"}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ChapterBlocksEditor({
  blocks,
  layout: savedLayout,
  allowedBlockTypes,
  onChange,
}: {
  blocks: ChapterBlock[];
  layout?: BlockLayout | null;
  allowedBlockTypes?: BlockType[] | null;
  onChange: (next: { blocks: ChapterBlock[]; blockLayout?: BlockLayout }, kind?: BlockChangeKind) => void;
}) {
  const focusId = useRef<string | null>(null);
  const layout = useMemo(
    () => sanitizeLayout(savedLayout, blocks.map((b) => b.id)),
    [savedLayout, blocks]
  );
  const byId = useMemo(() => new Map(blocks.map((b) => [b.id, b])), [blocks]);
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

  const commit = (nextBlocks: ChapterBlock[], nextLayout: BlockLayout, kind: BlockChangeKind = "edit") => {
    const ids = nextBlocks.map((b) => b.id);
    const sanitized = sanitizeLayout(nextLayout, ids);
    const order = layoutBlockOrder(sanitized);
    const map = new Map(nextBlocks.map((b) => [b.id, b]));
    const ordered = withOrder(order.map((id) => map.get(id)).filter((b): b is ChapterBlock => Boolean(b)));
    onChange({ blocks: ordered, blockLayout: persistableLayout(savedLayout, sanitized, ordered.map((b) => b.id)) }, kind);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    commit(blocks, applyDrop(layout, String(active.id), String(over.id)), "add");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Content blocks</p>
        <div className="flex items-center gap-2 flex-wrap">
          <AddBlockMenu
            allowedBlockTypes={allowedBlockTypes}
            onAdd={(type) => {
              const next = emptyBlock(type);
              focusId.current = next.id;
              commit([...blocks, next], appendBlockRow(layout, next.id), "add");
            }}
          />
          <AddRowMenu onAdd={(columns) => commit(blocks, addRow(layout, columns), "add")} />
        </div>
      </div>

      {blocks.length === 0 && layout.rows.length === 0 ? (
        <p className="text-xs text-[#8A9B95] border border-dashed border-[#E7E0D3] rounded-xl p-4">
          No blocks yet. Use <strong>Add Block</strong> to place one, or <strong>Add Row</strong> for a 1–3 column layout.
        </p>
      ) : null}

      <DndContext sensors={sensors} collisionDetection={collision} onDragEnd={onDragEnd}>
        <div className="space-y-3">
          {layout.rows.map((row) => {
            const slots = Math.max(0, row.columns - row.blockIds.length);
            return (
              <div key={row.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <RowColumnsToggle
                    value={row.columns}
                    onChange={(n) => commit(blocks, setRowColumns(layout, row.id, n), "add")}
                  />
                  <div className="flex items-center gap-1.5">
                    <AddBlockMenu
                      allowedBlockTypes={allowedBlockTypes}
                      label="Add to row"
                      onAdd={(type) => {
                        const next = emptyBlock(type);
                        focusId.current = next.id;
                        commit([...blocks, next], addBlockToRow(layout, next.id, row.id), "add");
                      }}
                    />
                    {row.blockIds.length === 0 ? (
                      <button
                        type="button"
                        onClick={() => commit(blocks, removeRow(layout, row.id), "add")}
                        className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-lg border border-rose-200 text-rose-700"
                      >
                        <Trash2 className="w-3 h-3" /> Remove row
                      </button>
                    ) : null}
                  </div>
                </div>
                <RowDroppable rowId={row.id} className={rowGridClass(row.columns)}>
                  <SortableContext
                    items={row.blockIds}
                    strategy={row.columns === 1 ? verticalListSortingStrategy : rectSortingStrategy}
                  >
                    {row.blockIds.map((id) => {
                      const block = byId.get(id);
                      if (!block) return null;
                      return (
                        <SortableBlock
                          key={block.id}
                          block={block}
                          canMove={blockMoveFlags(layout, block.id)}
                          onChange={(nextBlock) => {
                            commit(
                              blocks.map((b) => (b.id === nextBlock.id ? nextBlock : b)),
                              layout,
                              "edit"
                            );
                          }}
                          onMove={(dir) => commit(blocks, moveBlockStep(layout, block.id, dir), "add")}
                          onDuplicate={() => {
                            const copy = duplicateBlock(block);
                            focusId.current = copy.id;
                            commit([...blocks, copy], duplicateBlockInLayout(layout, block.id, copy.id), "add");
                          }}
                          onDelete={() =>
                            commit(
                              blocks.filter((b) => b.id !== block.id),
                              removeBlockFromLayout(layout, block.id),
                              "add"
                            )
                          }
                        />
                      );
                    })}
                    {Array.from({ length: slots }, (_, i) => (
                      <SlotDroppable key={`${row.id}-slot-${i}`} rowId={row.id} index={row.blockIds.length + i} />
                    ))}
                  </SortableContext>
                </RowDroppable>
              </div>
            );
          })}
        </div>
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
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#1C2A26]">Manual settings</p>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Allowed Add Block Types</p>
        <button type="button" onClick={() => onChange(null)} className="text-[10px] font-bold text-[#0F766E] hover:underline">
          Enable all
        </button>
      </div>
      <p className="text-[11px] text-[#8A9B95] leading-relaxed">
        Filters the Add Block menu only — existing chapter blocks are never hidden or removed. Enable or disable types here; the chapter editor only uses them.
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
