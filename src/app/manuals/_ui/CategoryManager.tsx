"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  UNCATEGORIZED,
  addCategory,
  deleteCategory,
  listedCategories,
  renameCategory,
  subscribeCategories,
} from "@/app/manuals/_lib/categories";

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
