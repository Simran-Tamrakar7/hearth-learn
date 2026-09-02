"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Bold,
  List,
  ListOrdered,
  Quote,
  Code,
  FileText,
  Eye,
} from "lucide-react";
import { applyLessonFormat, type LessonFormatKind } from "./lessonFormat";

const TOOLS: { kind: LessonFormatKind; label: string; Icon: typeof Heading1 }[] = [
  { kind: "h1", label: "H1", Icon: Heading1 },
  { kind: "h2", label: "H2", Icon: Heading2 },
  { kind: "h3", label: "H3", Icon: Heading3 },
  { kind: "bold", label: "Bold", Icon: Bold },
  { kind: "list", label: "List", Icon: List },
  { kind: "num", label: "Steps", Icon: ListOrdered },
  { kind: "quote", label: "Note", Icon: Quote },
  { kind: "code", label: "Code block", Icon: Code },
  { kind: "inline", label: "Inline code", Icon: FileText },
];

/** Write/Preview lesson markdown. Sits in the same slot as the rendered chapter body. */
export function LessonContentEditor({
  value,
  onChange,
  onAdd,
  preview,
  label = "Lesson content",
}: {
  value: string;
  onChange: (next: string) => void;
  /** Toolbar insertions (headings, lists, code blocks) — distinct from typing edits. */
  onAdd?: (next: string) => void;
  preview: (text: string) => ReactNode;
  label?: string;
}) {
  const [view, setView] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);

  const format = (kind: LessonFormatKind) => {
    const el = ref.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    const { next, innerStart, innerLen } = applyLessonFormat(value, start, end, kind);
    (onAdd ?? onChange)(next);
    requestAnimationFrame(() => {
      const node = ref.current;
      if (!node) return;
      node.focus();
      node.setSelectionRange(innerStart, innerStart + innerLen);
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">{label}</span>
        <div className="flex items-center bg-[#FAF7F2] border border-[#E7E0D3] rounded-lg p-0.5 text-[11px]">
          <button
            type="button"
            onClick={() => setView("write")}
            className={`px-2.5 py-1 rounded-md font-bold ${view === "write" ? "bg-[#1C2A26] text-white" : "text-[#52635E]"}`}
          >
            Write
          </button>
          <button
            type="button"
            onClick={() => setView("preview")}
            className={`px-2.5 py-1 rounded-md font-bold flex items-center gap-1 ${
              view === "preview" ? "bg-[#1C2A26] text-white" : "text-[#52635E]"
            }`}
          >
            <Eye className="w-3 h-3" />
            Preview
          </button>
        </div>
      </div>

      {view === "write" ? (
        <>
          <div className="flex flex-wrap gap-1.5">
            {TOOLS.map(({ kind, label, Icon }) => (
              <button
                key={kind}
                type="button"
                title={label}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => format(kind)}
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-[#E7E0D3] bg-white text-[11px] font-bold text-[#52635E] hover:border-[#D97706] hover:text-[#1C2A26]"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>
          <textarea
            ref={ref}
            rows={14}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={"# Heading\n\nLesson text…\n\n```\ncode\n```"}
            className="w-full min-h-[16rem] p-0 sm:p-0 bg-transparent font-sans text-xs sm:text-sm leading-relaxed text-[#52635E] focus:outline-none resize-y"
          />
        </>
      ) : (
        <div className="min-h-[16rem]">
          {value.trim() ? preview(value) : <p className="text-xs text-[#8A9B95]">Nothing to preview yet.</p>}
        </div>
      )}
    </div>
  );
}
