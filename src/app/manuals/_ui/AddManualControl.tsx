"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { emptyManual, saveUserManual } from "@/app/manuals/_lib/userManuals";
import { listedCategories, subscribeCategories } from "@/app/manuals/_lib/categories";
import { TagInput } from "@/app/manuals/_ui/TagInput";

export function AddManualControl() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Foundations");
  const [tags, setTags] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>(() => listedCategories());
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => subscribeCategories(setCats), []);
  useEffect(() => {
    if (open) nameRef.current?.focus();
  }, [open]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = title.trim();
    if (!name) {
      nameRef.current?.focus();
      return;
    }
    const saved = saveUserManual(emptyManual(name, { category, tags }));
    setOpen(false);
    setTitle("");
    setTags([]);
    router.push(`/manuals/${saved.slug}?edit=1`);
  }

  if (!open) {
    return (
      <button
        type="button"
        aria-label="Add manual"
        onClick={() => setOpen(true)}
        className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] hover:bg-[#243530] shadow-xs"
      >
        <Plus className="w-5 h-5" />
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="shrink-0 flex flex-col gap-2 w-full sm:w-80">
      <div className="flex items-center gap-2">
        <input
          ref={nameRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              setTitle("");
              setTags([]);
            }
          }}
          placeholder="Manual name"
          aria-label="Manual name"
          className="h-11 flex-1 px-3 text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
        />
        <button
          type="submit"
          className="h-11 px-4 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] text-xs font-semibold hover:bg-[#243530] shadow-xs"
        >
          Open
        </button>
      </div>
      <select
        value={cats.includes(category) ? category : cats[0] || category}
        onChange={(e) => setCategory(e.target.value)}
        aria-label="Category"
        className="h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
      >
        {cats.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <TagInput tags={tags} onChange={setTags} />
    </form>
  );
}
