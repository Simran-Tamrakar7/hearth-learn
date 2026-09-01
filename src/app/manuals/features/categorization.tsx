"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { mapUserManuals } from "@/app/manuals/features/local-storage";

export const UNCATEGORIZED = "Uncategorized";

export const DEFAULT_CATEGORIES = [
  "Foundations",
  "Automation & Testing",
  "Quality Craft",
  "Delivery & Process",
  "Design",
  "AI & Prompting",
  "Ops & Systems",
  "Career",
  "Soft Skills",
  UNCATEGORIZED,
];

const STORE = "hearth_manual_categories";
const EVENT = "hearth_manual_categories_updated";
const CUSTOM_PREFIX = "hearth_manual_custom_data_";

export function normalizeCategoryName(name: string) {
  return name.replace(/\s+/g, " ").trim();
}

export function withUncategorized(list: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of [...list, UNCATEGORIZED]) {
    const n = normalizeCategoryName(raw);
    if (!n) continue;
    const key = n.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(n);
  }
  return out;
}

export function renameInList(list: string[], from: string, to: string): string[] {
  const next = normalizeCategoryName(to);
  if (!next) return withUncategorized(list);
  return withUncategorized(list.map((c) => (c === from ? next : c)));
}

export function removeFromList(list: string[], name: string): string[] {
  if (name === UNCATEGORIZED) return withUncategorized(list);
  return withUncategorized(list.filter((c) => c !== name));
}

function readList(): string[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORE);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : null;
  } catch {
    return null;
  }
}

function writeList(list: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORE, JSON.stringify(withUncategorized(list)));
  window.dispatchEvent(new Event(EVENT));
}

export function listedCategories(): string[] {
  return withUncategorized(readList() || DEFAULT_CATEGORIES);
}

export function addCategory(name: string): string | null {
  const n = normalizeCategoryName(name);
  if (!n) return null;
  const list = listedCategories();
  if (list.some((c) => c.toLowerCase() === n.toLowerCase())) return n;
  writeList([...list, n]);
  return n;
}

function retargetCustomData(from: string, to: string) {
  if (typeof window === "undefined") return;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith(CUSTOM_PREFIX)) continue;
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || "null");
      if (!parsed || typeof parsed !== "object" || parsed.category !== from) continue;
      localStorage.setItem(key, JSON.stringify({ ...parsed, category: to }));
    } catch {
      /* skip bad rows */
    }
  }
}

function retargetUserManuals(from: string, to: string) {
  mapUserManuals((m) => (m.category === from ? { ...m, category: to } : m));
}

export function renameCategory(from: string, to: string): string | null {
  const next = normalizeCategoryName(to);
  if (!from || !next || from === UNCATEGORIZED) return null;
  writeList(renameInList(listedCategories(), from, next));
  retargetUserManuals(from, next);
  retargetCustomData(from, next);
  return next;
}

export function deleteCategory(name: string): boolean {
  if (!name || name === UNCATEGORIZED) return false;
  writeList(removeFromList(listedCategories(), name));
  retargetUserManuals(name, UNCATEGORIZED);
  retargetCustomData(name, UNCATEGORIZED);
  return true;
}

export function subscribeCategories(onChange: (items: string[]) => void) {
  if (typeof window === "undefined") return () => {};
  const emit = () => onChange(listedCategories());
  emit();
  window.addEventListener(EVENT, emit);
  window.addEventListener("storage", emit);
  return () => {
    window.removeEventListener(EVENT, emit);
    window.removeEventListener("storage", emit);
  };
}

export function normalizeTag(value: string) {
  return value.replace(/\s+/g, " ").trim().slice(0, 32);
}

export function addTag(tags: string[], value: string): string[] {
  const t = normalizeTag(value);
  if (!t) return tags;
  if (tags.some((x) => x.toLowerCase() === t.toLowerCase())) return tags;
  return [...tags, t];
}

export function CategoryManager() {
  const [cats, setCats] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState("");

  useEffect(() => subscribeCategories(setCats), []);

  return (
    <section className="space-y-3">
      <div>
        <h2 className="font-serif-display text-xl font-bold">Manage categories</h2>
        <p className="text-xs text-[#8A9B95] mt-1">
          One primary grouping per manual. Deleting a category moves its manuals to {UNCATEGORIZED}.
        </p>
      </div>
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const added = addCategory(name);
          setHint(added ? `Added “${added}”.` : "Name a category first.");
          setName("");
        }}
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category"
          aria-label="New category"
          className="h-10 px-3 text-sm bg-white border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
        />
        <Button type="submit" size="sm" variant="primary">
          Add category
        </Button>
      </form>
      {hint ? <p className="text-xs text-[#52635E]">{hint}</p> : null}
      <div className="space-y-2">
        {cats.map((cat) => (
          <Card key={cat} hoverable={false} className="p-3 flex flex-wrap items-center justify-between gap-2">
            {editing === cat ? (
              <form
                className="flex flex-wrap items-center gap-2 flex-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  const next = renameCategory(cat, draft);
                  setHint(next ? `Renamed to “${next}”.` : "Could not rename.");
                  setEditing(null);
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="h-9 px-3 text-sm bg-white border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                  aria-label={`Rename ${cat}`}
                />
                <Button type="submit" size="sm" variant="primary">
                  Save
                </Button>
                <Button type="button" size="sm" variant="outline" onClick={() => setEditing(null)}>
                  Cancel
                </Button>
              </form>
            ) : (
              <p className="text-sm font-semibold">{cat}</p>
            )}
            <div className="flex gap-2">
              {cat !== UNCATEGORIZED && editing !== cat ? (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditing(cat);
                      setDraft(cat);
                    }}
                  >
                    Rename
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      if (!window.confirm(`Delete “${cat}”? Manuals in it move to ${UNCATEGORIZED}.`)) return;
                      deleteCategory(cat);
                      setHint(`Deleted “${cat}”. Manuals moved to ${UNCATEGORIZED}.`);
                    }}
                  >
                    Delete
                  </Button>
                </>
              ) : null}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

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
