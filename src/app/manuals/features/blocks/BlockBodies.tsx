"use client";

import type { ChapterBlock, TreeNode } from "@/app/manuals/features/blocks/types";
import { applyColumns, editorColumns, isColumnBlockType } from "@/app/manuals/features/blocks/types";
import { ColumnsEditor } from "@/app/manuals/features/blocks/ColumnsEditor";
import { FormattedField } from "@/app/manuals/features/blocks/FormattedField";

export type BlockBodyProps = {
  block: ChapterBlock;
  onChange: (next: ChapterBlock) => void;
};

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
    const depth = Math.floor(m[1].replace(/\t/g, "  ").length / 2);
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

const input = "w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg";
const area = `${input} font-sans`;

export function ColumnsBody({ block, onChange }: BlockBodyProps) {
  if (!isColumnBlockType(block.type)) return null;
  return (
    <div className="space-y-3">
      {block.type === "practical" ? (
        <>
          <input
            value={block.practical.app}
            onChange={(e) => onChange({ ...block, practical: { ...block.practical, app: e.target.value } })}
            placeholder="App / context"
            className={input}
          />
          <FormattedField
            value={block.practical.scenario}
            onChange={(scenario) => onChange({ ...block, practical: { ...block.practical, scenario } })}
            rows={2}
            placeholder="Scenario"
          />
        </>
      ) : null}
      <ColumnsEditor columns={editorColumns(block)} onChange={(cols) => onChange(applyColumns(block, cols))} minColumns={2} />
    </div>
  );
}

export function RichTextBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "overview" && block.type !== "why" && block.type !== "when") return null;
  return <FormattedField value={block.content} onChange={(content) => onChange({ ...block, content })} rows={4} />;
}

export function TipNoteBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "tip" && block.type !== "warning") return null;
  return (
    <div className="space-y-2">
      <input
        value={block.title || ""}
        onChange={(e) => onChange({ ...block, title: e.target.value })}
        placeholder="Optional title"
        className={input}
      />
      <FormattedField value={block.content} onChange={(content) => onChange({ ...block, content })} rows={3} />
    </div>
  );
}

export function QuoteReferenceBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "quote") return null;
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
}

export function ListBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "checklist" && block.type !== "bullets") return null;
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
}

export function DefinitionBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "definition") return null;
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
}

export function CodeBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "code") return null;
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
}

export function ResourcesBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "resources") return null;
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
}

export function ImageBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "image") return null;
  return (
    <div className="space-y-2">
      <input value={block.src} onChange={(e) => onChange({ ...block, src: e.target.value })} placeholder="Image URL" className={input} />
      <input value={block.alt || ""} onChange={(e) => onChange({ ...block, alt: e.target.value })} placeholder="Alt text" className={input} />
      <input
        value={block.caption || ""}
        onChange={(e) => onChange({ ...block, caption: e.target.value })}
        placeholder="Caption"
        className={input}
      />
    </div>
  );
}

export function TableBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "table") return null;
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
}

export function VideoBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "video") return null;
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
}

export function TreeBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "tree") return null;
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
}

export function GapBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "gap") return null;
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
}

export function CuratedResourcesBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "curatedResources") return null;
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
}

export function TierBody({ block, onChange }: BlockBodyProps) {
  if (block.type !== "tier") return null;
  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <select
          value={block.kind || "free"}
          onChange={(e) => onChange({ ...block, kind: e.target.value as "free" | "paid" | "cloud" })}
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
}
