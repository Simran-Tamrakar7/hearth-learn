"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { emptyManual, saveUserManual } from "@/app/manuals/_lib/userManuals";
import { addCategory, listedCategories, subscribeCategories } from "@/app/manuals/_lib/categories";
import { TagInput } from "@/app/manuals/_ui/TagInput";
import { ImageField } from "@/components/ui/ImageField";

type Panel = "menu" | "manual" | "category" | null;

export function AddManualControl() {
  const router = useRouter();
  const [panel, setPanel] = useState<Panel>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Foundations");
  const [newCategory, setNewCategory] = useState("");
  const [useNewCategory, setUseNewCategory] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [cover, setCover] = useState("");
  const [catName, setCatName] = useState("");
  const [cats, setCats] = useState<string[]>(() => listedCategories());
  const wrapRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const catRef = useRef<HTMLInputElement>(null);

  useEffect(() => subscribeCategories(setCats), []);
  useEffect(() => {
    if (panel === "manual") nameRef.current?.focus();
    if (panel === "category") catRef.current?.focus();
  }, [panel]);

  useEffect(() => {
    if (panel !== "menu") return;
    const close = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setPanel(null);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [panel]);

  function resetManual() {
    setTitle("");
    setTags([]);
    setCover("");
    setUseNewCategory(false);
    setNewCategory("");
  }

  function submitManual(e: React.FormEvent) {
    e.preventDefault();
    const name = title.trim();
    if (!name) {
      nameRef.current?.focus();
      return;
    }
    const cat = useNewCategory ? addCategory(newCategory) : category;
    if (!cat) {
      return;
    }
    const saved = saveUserManual(
      emptyManual(name, { category: cat, tags, coverImage: cover.trim() || undefined })
    );
    resetManual();
    setPanel(null);
    router.push(`/manuals/${saved.slug}?edit=1`);
  }

  function submitCategory(e: React.FormEvent) {
    e.preventDefault();
    if (!addCategory(catName)) {
      catRef.current?.focus();
      return;
    }
    setCatName("");
    setPanel(null);
  }

  return (
    <div className="shrink-0 flex flex-col items-end gap-2 w-full sm:w-auto" ref={wrapRef}>
      <div className="relative">
        <button
          type="button"
          aria-label="Add"
          aria-haspopup="menu"
          aria-expanded={panel === "menu"}
          onClick={() => setPanel((p) => (p === "menu" ? null : "menu"))}
          className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] hover:bg-[#243530] shadow-xs"
        >
          <Plus className="w-5 h-5" />
        </button>
        {panel === "menu" ? (
          <div
            role="menu"
            className="absolute right-0 top-full mt-1 z-30 min-w-[12rem] rounded-xl border border-[#E7E0D3] bg-white py-1 shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => setPanel("manual")}
              className="w-full text-left px-3 py-1.5 text-xs font-semibold text-[#1C2A26] hover:bg-[#FAF7F2]"
            >
              Add Manual
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={() => setPanel("category")}
              className="w-full text-left px-3 py-1.5 text-xs font-semibold text-[#1C2A26] hover:bg-[#FAF7F2]"
            >
              Add Category
            </button>
          </div>
        ) : null}
      </div>

      {panel === "manual" ? (
        <form onSubmit={submitManual} className="w-full sm:w-80 flex flex-col gap-2">
          <input
            ref={nameRef}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                resetManual();
                setPanel(null);
              }
            }}
            placeholder="Manual name"
            aria-label="Manual name"
            className="h-11 px-3 text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
          />
          <select
            value={useNewCategory ? "__new__" : cats.includes(category) ? category : cats[0] || category}
            onChange={(e) => {
              if (e.target.value === "__new__") {
                setUseNewCategory(true);
                return;
              }
              setUseNewCategory(false);
              setCategory(e.target.value);
            }}
            aria-label="Category"
            className="h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
          >
            {cats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value="__new__">+ New category…</option>
          </select>
          {useNewCategory ? (
            <input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              aria-label="New category name"
              className="h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
            />
          ) : null}
          <TagInput tags={tags} onChange={setTags} />
          <ImageField value={cover} onChange={setCover} label="Cover image" />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                resetManual();
                setPanel(null);
              }}
              className="h-10 px-3 rounded-2xl text-xs font-semibold text-[#52635E] hover:text-[#1C2A26]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="h-10 px-4 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] text-xs font-semibold hover:bg-[#243530] shadow-xs"
            >
              Open
            </button>
          </div>
        </form>
      ) : null}

      {panel === "category" ? (
        <form onSubmit={submitCategory} className="w-full sm:w-80 flex items-center gap-2">
          <input
            ref={catRef}
            value={catName}
            onChange={(e) => setCatName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setCatName("");
                setPanel(null);
              }
            }}
            placeholder="Category name"
            aria-label="Category name"
            className="h-11 flex-1 px-3 text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
          />
          <button
            type="submit"
            className="h-11 px-4 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] text-xs font-semibold hover:bg-[#243530] shadow-xs"
          >
            Add
          </button>
        </form>
      ) : null}
    </div>
  );
}
