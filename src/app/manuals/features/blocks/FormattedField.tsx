"use client";

import { useRef } from "react";
import { Bold, Italic, Underline } from "lucide-react";
import { applyLessonFormat } from "@/app/manuals/features/edit/lessonFormat";

/**
 * Compact rich-text field for block body copy.
 * Markdown: **bold**, *italic*; underline via <u>…</u> (rendered by markdown path when present).
 */
export function FormattedField({
  value,
  onChange,
  rows = 3,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (next: string) => void;
  rows?: number;
  placeholder?: string;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  const wrap = (kind: "bold" | "italic" | "underline") => {
    const el = ref.current;
    const start = el?.selectionStart ?? value.length;
    const end = el?.selectionEnd ?? value.length;
    if (kind === "underline") {
      const selected = value.slice(start, end) || "text";
      const insert = `<u>${selected}</u>`;
      const next = value.slice(0, start) + insert + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        node.focus();
        node.setSelectionRange(start + 3, start + 3 + selected.length);
      });
      return;
    }
    if (kind === "italic") {
      const selected = value.slice(start, end) || "text";
      const insert = `*${selected}*`;
      const next = value.slice(0, start) + insert + value.slice(end);
      onChange(next);
      requestAnimationFrame(() => {
        const node = ref.current;
        if (!node) return;
        node.focus();
        node.setSelectionRange(start + 1, start + 1 + selected.length);
      });
      return;
    }
    const { next, innerStart, innerLen } = applyLessonFormat(value, start, end, "bold");
    onChange(next);
    requestAnimationFrame(() => {
      const node = ref.current;
      if (!node) return;
      node.focus();
      node.setSelectionRange(innerStart, innerStart + innerLen);
    });
  };

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap gap-1">
        {(
          [
            { kind: "bold" as const, Icon: Bold, title: "Bold" },
            { kind: "italic" as const, Icon: Italic, title: "Italic" },
            { kind: "underline" as const, Icon: Underline, title: "Underline" },
          ] as const
        ).map(({ kind, Icon, title }) => (
          <button
            key={kind}
            type="button"
            title={title}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => wrap(kind)}
            className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-[#E7E0D3] bg-white text-[#52635E] hover:border-[#D97706]"
          >
            <Icon className="w-3.5 h-3.5" />
          </button>
        ))}
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        className={`w-full p-2 text-sm bg-white border border-[#E7E0D3] rounded-lg font-sans ${className}`}
      />
    </div>
  );
}
