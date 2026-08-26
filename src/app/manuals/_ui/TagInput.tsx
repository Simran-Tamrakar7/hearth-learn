"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { addTag } from "@/app/manuals/_lib/tags";

export function TagInput({
  tags,
  onChange,
  placeholder = "Add tag and press Enter",
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");

  function commit(raw: string) {
    const next = addTag(tags, raw);
    if (next !== tags) onChange(next);
    setDraft("");
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5 min-h-11 px-2 py-1.5 bg-white border border-[#E7E0D3] rounded-2xl focus-within:border-[#D97706]">
      {tags.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FAF7F2] text-[11px] font-semibold text-[#1C2A26]"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onChange(tags.filter((t) => t !== tag))}
            className="text-[#8A9B95] hover:text-rose-700"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit(draft);
          } else if (e.key === "Backspace" && !draft && tags.length) {
            onChange(tags.slice(0, -1));
          }
        }}
        onBlur={() => {
          if (draft.trim()) commit(draft);
        }}
        placeholder={tags.length ? "" : placeholder}
        aria-label="Tags"
        className="flex-1 min-w-[8rem] h-7 px-1 text-xs bg-transparent focus:outline-none"
      />
    </div>
  );
}
