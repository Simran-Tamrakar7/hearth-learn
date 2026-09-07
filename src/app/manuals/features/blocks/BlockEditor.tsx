"use client";

import { useState } from "react";
import {
  ChevronDown,
  Copy,
  GripVertical,
  Plus,
  Trash2,
} from "lucide-react";
import type {
  ChapterBlock,
  BlockType,
  TreeNode,
  PracticalColumn,
  ColumnTone,
  BlockAccent,
  BlockFont,
} from "@/app/manuals/features/blocks/types";
import {
  BLOCK_ACCENTS,
  BLOCK_CATEGORIES,
  BLOCK_CATALOG,
  BLOCK_FONTS,
  COLUMN_TONES,
  blockDisplayName,
  blockTypesForMenu,
  emptyBlock,
  newBlockId,
  resolvePracticalColumns,
} from "@/app/manuals/features/blocks/types";
import { FormattedField } from "@/app/manuals/features/blocks/FormattedField";

function linesToList(text: string): string[] {
  return text
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((_, i, arr) => !(i === arr.length - 1 && arr[i] === "") || arr.length === 1);
}

function listField(value: string[], onChange: (next: string[]) => void, placeholder: string, rows = 4) {
  return (
    <textarea
      value={value.join("\n")}
      onChange={(e) => onChange(linesToList(e.target.value))}
      rows={rows}
      placeholder={placeholder}
      className="w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg font-mono"
    />
  );
}

function treeToText(nodes: TreeNode[], depth = 0): string {
  return nodes
    .map((n) => {
      const line = `${"  ".repeat(depth)}${n.label}`;
      const kids = n.children?.length ? "\n" + treeToText(n.children, depth + 1) : "";
      return line + kids;
    })
    .join("\n");
}

function textToTree(text: string): TreeNode[] {
  const lines = text.split("\n").filter((l) => l.trim().length || l.length > 0);
  const root: TreeNode[] = [];
  const stack: { depth: number; node: TreeNode }[] = [];
  for (const raw of lines) {
    const m = raw.match(/^(\s*)(.*)$/);
    if (!m) continue;
    const depth = Math.floor((m[1].replace(/\t/g, "  ").length) / 2);
    const label = m[2];
    const node: TreeNode = { label, children: [] };
    while (stack.length && stack[stack.length - 1].depth >= depth) stack.pop();
    if (!stack.length) root.push(node);
    else {
      const parent = stack[stack.length - 1].node;
      parent.children = parent.children || [];
      parent.children.push(node);
    }
    stack.push({ depth, node });
  }
  return root.length ? root : [{ label: "", children: [] }];
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

function PracticalColumnsEditor({
  block,
  onChange,
  inputClass,
}: {
  block: Extract<ChapterBlock, { type: "practical" }>;
  onChange: (next: ChapterBlock) => void;
  inputClass: string;
}) {
  const p = block.practical;
  const columns = resolvePracticalColumns(p);

  const setPractical = (next: typeof p) => onChange({ ...block, practical: next });
  const setColumns = (cols: PracticalColumn[]) =>
    setPractical({
      ...p,
      columns: cols,
      // keep legacy mirrors in sync for first rose/emerald if present
      fail: cols.find((c) => c.tone === "rose")?.content ?? p.fail,
      pass: cols.find((c) => c.tone === "emerald")?.content ?? p.pass,
    });

  return (
    <div className="space-y-3">
      <input
        value={p.app}
        onChange={(e) => setPractical({ ...p, app: e.target.value })}
        placeholder="App / context"
        className={inputClass}
      />
      <FormattedField
        value={p.scenario}
        onChange={(scenario) => setPractical({ ...p, scenario })}
        rows={2}
        placeholder="Scenario"
      />

      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#0062D2]">Columns</p>
        <button
          type="button"
          onClick={() =>
            setColumns([
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
                    setColumns(next);
                  }}
                  placeholder="Column name"
                  className={`flex-1 p-1.5 text-[11px] font-mono font-bold uppercase tracking-wider rounded-md border ${tone.border} ${tone.text}`}
                />
                <select
                  value={col.tone || "neutral"}
                  onChange={(e) => {
                    const next = [...columns];
                    next[idx] = { ...col, tone: e.target.value as ColumnTone };
                    setColumns(next);
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
                <button
                  type="button"
                  title="Delete column"
                  onClick={() => setColumns(columns.filter((_, i) => i !== idx))}
                  className="p-1.5 rounded-md border border-rose-200 text-rose-700"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
              <FormattedField
                value={col.content}
                onChange={(content) => {
                  const next = [...columns];
                  next[idx] = { ...col, content };
                  setColumns(next);
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

function BlockEditorFields({
  block,
  onChange,
}: {
  block: ChapterBlock;
  onChange: (next: ChapterBlock) => void;
}) {
  const input = "w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg";
  const area = `${input} font-sans`;

  switch (block.type) {
    case "overview":
    case "why":
    case "when":
    case "keyDifference":
      return (
        <FormattedField
          value={block.content}
          onChange={(content) => onChange({ ...block, content })}
          rows={4}
        />
      );
    case "tip":
    case "warning":
      return (
        <div className="space-y-2">
          <input
            value={block.title || ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Optional title"
            className={input}
          />
          <FormattedField
            value={block.content}
            onChange={(content) => onChange({ ...block, content })}
            rows={3}
          />
        </div>
      );
    case "practical":
      return <PracticalColumnsEditor block={block} onChange={onChange} inputClass={input} />;
    case "tradeoffs":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {listField(block.advantages, (advantages) => onChange({ ...block, advantages }), "Advantages — one per line")}
          {listField(
            block.limitations,
            (limitations) => onChange({ ...block, limitations }),
            "Limitations — one per line"
          )}
        </div>
      );
    case "comparison":
      return (
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <input
              value={block.headers?.lever || ""}
              onChange={(e) =>
                onChange({ ...block, headers: { lever: e.target.value, equivalent: block.headers?.equivalent || "" } })
              }
              placeholder="Lever header"
              className={input}
            />
            <input
              value={block.headers?.equivalent || ""}
              onChange={(e) =>
                onChange({ ...block, headers: { lever: block.headers?.lever || "", equivalent: e.target.value } })
              }
              placeholder="Equivalent header"
              className={input}
            />
          </div>
          <textarea
            value={JSON.stringify(block.rows, null, 2)}
            onChange={(e) => {
              try {
                const rows = JSON.parse(e.target.value || "[]");
                if (Array.isArray(rows)) onChange({ ...block, rows });
              } catch {
                /* mid-edit */
              }
            }}
            rows={6}
            className={`${input} font-mono text-xs`}
          />
        </div>
      );
    case "code":
      return (
        <div className="space-y-2">
          <input
            value={block.label}
            onChange={(e) => onChange({ ...block, label: e.target.value })}
            placeholder="Label"
            className={input}
          />
          <textarea
            value={block.code}
            onChange={(e) => onChange({ ...block, code: e.target.value })}
            rows={6}
            className="w-full p-3 bg-[#1C2A26] text-[#A7F3D0] rounded-xl font-mono text-xs border border-[#2D3F3A]"
          />
        </div>
      );
    case "steps":
    case "checklist":
    case "bullets":
      return (
        <div className="space-y-2">
          <input
            value={block.title || ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Optional title"
            className={input}
          />
          {listField(block.items, (items) => onChange({ ...block, items }), "One item per line", 5)}
        </div>
      );
    case "definition":
      return (
        <div className="space-y-2">
          <input
            value={block.term}
            onChange={(e) => onChange({ ...block, term: e.target.value })}
            placeholder="Term"
            className={input}
          />
          <textarea
            value={block.definition}
            onChange={(e) => onChange({ ...block, definition: e.target.value })}
            rows={3}
            placeholder="Definition"
            className={area}
          />
        </div>
      );
    case "resources":
      return (
        <textarea
          value={JSON.stringify(block.items, null, 2)}
          onChange={(e) => {
            try {
              const items = JSON.parse(e.target.value || "[]");
              if (Array.isArray(items)) onChange({ ...block, items });
            } catch {
              /* mid-edit */
            }
          }}
          rows={5}
          className={`${input} font-mono text-xs`}
          placeholder='[{"title":"","url":"","description":""}]'
        />
      );
    case "quote":
      return (
        <div className="space-y-2">
          <textarea
            value={block.text}
            onChange={(e) => onChange({ ...block, text: e.target.value })}
            rows={3}
            placeholder="Quote text"
            className={area}
          />
          <input
            value={block.attribution || ""}
            onChange={(e) => onChange({ ...block, attribution: e.target.value })}
            placeholder="Attribution"
            className={input}
          />
        </div>
      );
    case "image":
      return (
        <div className="space-y-2">
          <input
            value={block.src}
            onChange={(e) => onChange({ ...block, src: e.target.value })}
            placeholder="Image URL"
            className={input}
          />
          <input
            value={block.alt || ""}
            onChange={(e) => onChange({ ...block, alt: e.target.value })}
            placeholder="Alt text"
            className={input}
          />
          <input
            value={block.caption || ""}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Caption"
            className={input}
          />
        </div>
      );
    case "table":
      return (
        <div className="space-y-2">
          <input
            value={block.caption || ""}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Caption"
            className={input}
          />
          <textarea
            value={JSON.stringify({ headers: block.headers, rows: block.rows }, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value || "{}");
                if (Array.isArray(parsed.headers) && Array.isArray(parsed.rows)) {
                  onChange({ ...block, headers: parsed.headers, rows: parsed.rows });
                }
              } catch {
                /* mid-edit */
              }
            }}
            rows={6}
            className={`${input} font-mono text-xs`}
          />
        </div>
      );
    case "video":
      return (
        <div className="space-y-2">
          <input
            value={block.url}
            onChange={(e) => onChange({ ...block, url: e.target.value })}
            placeholder="YouTube or .mp4 URL"
            className={input}
          />
          <input
            value={block.caption || ""}
            onChange={(e) => onChange({ ...block, caption: e.target.value })}
            placeholder="Caption"
            className={input}
          />
        </div>
      );
    case "tree":
      return (
        <div className="space-y-2">
          <input
            value={block.title || ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Optional title"
            className={input}
          />
          <textarea
            value={treeToText(block.nodes)}
            onChange={(e) => onChange({ ...block, nodes: textToTree(e.target.value) })}
            rows={6}
            placeholder={"Root\n  Child\n    Grandchild"}
            className={`${input} font-mono text-xs`}
          />
          <p className="text-[10px] text-[#8A9B95]">Indent with 2 spaces per nesting level.</p>
        </div>
      );
    case "featureMapping":
      return (
        <div className="space-y-2">
          <input
            value={block.title || ""}
            onChange={(e) => onChange({ ...block, title: e.target.value })}
            placeholder="Optional title"
            className={input}
          />
          <div className="grid grid-cols-2 gap-2">
            <input
              value={block.sourceHeader || ""}
              onChange={(e) => onChange({ ...block, sourceHeader: e.target.value })}
              placeholder="Source header"
              className={input}
            />
            <input
              value={block.targetHeader || ""}
              onChange={(e) => onChange({ ...block, targetHeader: e.target.value })}
              placeholder="Target header"
              className={input}
            />
          </div>
          <textarea
            value={block.rows.map((r) => `${r.source}\t${r.target}`).join("\n")}
            onChange={(e) =>
              onChange({
                ...block,
                rows: e.target.value.split("\n").map((line) => {
                  const [source, ...rest] = line.split("\t");
                  return { source: source || "", target: rest.join("\t") || "" };
                }),
              })
            }
            rows={5}
            placeholder={"Source item\tMaps to item"}
            className={`${input} font-mono text-xs`}
          />
          <p className="text-[10px] text-[#8A9B95]">One mapping per line, tab-separated.</p>
        </div>
      );
    case "gap":
      return (
        <div className="space-y-2">
          <textarea
            value={block.content}
            onChange={(e) => onChange({ ...block, content: e.target.value })}
            rows={3}
            placeholder="What isn't available"
            className={area}
          />
          <input
            value={block.alternative || ""}
            onChange={(e) => onChange({ ...block, alternative: e.target.value })}
            placeholder="Closest alternative (optional)"
            className={input}
          />
        </div>
      );
    case "curatedResources":
      return (
        <div className="space-y-2">
          <input
            value={block.category}
            onChange={(e) => onChange({ ...block, category: e.target.value })}
            placeholder="Category label"
            className={input}
          />
          <textarea
            value={JSON.stringify(block.items, null, 2)}
            onChange={(e) => {
              try {
                const items = JSON.parse(e.target.value || "[]");
                if (Array.isArray(items)) onChange({ ...block, items });
              } catch {
                /* mid-edit */
              }
            }}
            rows={7}
            className={`${input} font-mono text-xs`}
          />
        </div>
      );
    case "tier":
      return (
        <div className="space-y-2">
          <div className="flex gap-2">
            <select
              value={block.kind || "free"}
              onChange={(e) =>
                onChange({ ...block, kind: e.target.value as "free" | "paid" | "cloud" })
              }
              className={input}
            >
              <option value="free">Free</option>
              <option value="paid">Paid</option>
              <option value="cloud">Cloud-only</option>
            </select>
            <input
              value={block.label}
              onChange={(e) => onChange({ ...block, label: e.target.value })}
              placeholder="Label"
              className={input}
            />
          </div>
          <input
            value={block.detail || ""}
            onChange={(e) => onChange({ ...block, detail: e.target.value })}
            placeholder="Optional detail"
            className={input}
          />
        </div>
      );
    default:
      return null;
  }
}

export function ChapterBlocksEditor({
  blocks,
  allowedBlockTypes,
  onChange,
}: {
  blocks: ChapterBlock[];
  allowedBlockTypes?: BlockType[] | null;
  onChange: (next: ChapterBlock[]) => void;
}) {
  const meta = (type: BlockType) => BLOCK_CATALOG.find((c) => c.type === type);

  const patchAt = (idx: number, nextBlock: ChapterBlock) => {
    const next = [...blocks];
    next[idx] = nextBlock;
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">Content blocks</p>
        <AddBlockMenu
          allowedBlockTypes={allowedBlockTypes}
          onAdd={(type) => onChange([...blocks, emptyBlock(type)])}
        />
      </div>

      {blocks.length === 0 ? (
        <p className="text-xs text-[#8A9B95] border border-dashed border-[#E7E0D3] rounded-xl p-4">
          No blocks yet. Use <strong>Add Block</strong> to create one — then rename, recolor, or add columns.
        </p>
      ) : null}

      {blocks.map((block, idx) => {
        const catalogLabel = meta(block.type)?.label || block.type;
        return (
          <fieldset key={block.id} className="p-3 rounded-xl border border-[#E7E0D3] bg-[#FAF7F2] space-y-2">
            <legend className="px-1 text-[10px] font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1">
              <GripVertical className="w-3 h-3 text-[#C4B8A8]" />
              {blockDisplayName(block, catalogLabel)}
              <span className="font-normal normal-case tracking-normal text-[#8A9B95]">({catalogLabel})</span>
            </legend>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <label className="block space-y-0.5 sm:col-span-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A9B95]">Rename</span>
                <input
                  value={block.heading || ""}
                  onChange={(e) => patchAt(idx, { ...block, heading: e.target.value })}
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
                      onClick={() => patchAt(idx, { ...block, accent: a.id as BlockAccent })}
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
                  onChange={(e) => patchAt(idx, { ...block, font: e.target.value as BlockFont })}
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
                disabled={idx === 0}
                onClick={() => {
                  const next = [...blocks];
                  [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                  onChange(next);
                }}
                className="text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E7E0D3] disabled:opacity-40"
              >
                Up
              </button>
              <button
                type="button"
                disabled={idx === blocks.length - 1}
                onClick={() => {
                  const next = [...blocks];
                  [next[idx + 1], next[idx]] = [next[idx], next[idx + 1]];
                  onChange(next);
                }}
                className="text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E7E0D3] disabled:opacity-40"
              >
                Down
              </button>
              <button
                type="button"
                onClick={() => {
                  const copy: ChapterBlock = {
                    ...structuredClone(block),
                    id: newBlockId(block.type),
                    heading: `${blockDisplayName(block, catalogLabel)} (copy)`,
                  };
                  const next = [...blocks];
                  next.splice(idx + 1, 0, copy);
                  onChange(next);
                }}
                className="text-[10px] font-bold px-2 py-1 rounded-lg border border-[#E7E0D3] inline-flex items-center gap-1"
              >
                <Copy className="w-3 h-3" /> Duplicate
              </button>
              <button
                type="button"
                onClick={() => onChange(blocks.filter((_, i) => i !== idx))}
                className="text-[10px] font-bold px-2 py-1 rounded-lg border border-rose-200 text-rose-700 inline-flex items-center gap-1"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>

            <BlockEditorFields block={block} onChange={(nextBlock) => patchAt(idx, nextBlock)} />
          </fieldset>
        );
      })}
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
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
          Allowed Add Block types
        </p>
        <button
          type="button"
          onClick={() => onChange(null)}
          className="text-[10px] font-bold text-[#0F766E] hover:underline"
        >
          Enable all
        </button>
      </div>
      <p className="text-[11px] text-[#8A9B95] leading-relaxed">
        Filters the Add Block menu only — existing chapter blocks are never hidden or removed.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-48 overflow-y-auto">
        {BLOCK_CATALOG.map((item) => {
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
              <span>
                <span className="font-medium">{item.label}</span>
                <span className="text-[#8A9B95]"> · {item.category}</span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
