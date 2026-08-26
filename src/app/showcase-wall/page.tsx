"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";

type Link = { label: string; url: string };
type Item = {
  id: string;
  title: string;
  description: string | null;
  category: string;
  visibility: string;
  thumbnail: string | null;
  links: Link[];
  sortOrder: number;
  author: { id: string; name: string | null; email: string; image: string | null };
};

function initials(name: string | null | undefined, email: string) {
  const src = (name || email || "?").trim();
  const parts = src.split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

export default function ShowcaseWallPage() {
  const { status } = useSession();
  const [tab, setTab] = useState<"mine" | "public">("mine");
  const [items, setItems] = useState<Item[]>([]);
  const [publicItems, setPublicItems] = useState<Item[]>([]);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("All");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState({
    title: "",
    description: "",
    category: "General",
    visibility: "PRIVATE",
    thumbnail: "",
    links: [{ label: "GitHub", url: "" }] as Link[],
  });
  const [newCat, setNewCat] = useState("");
  const [renaming, setRenaming] = useState<string | null>(null);
  const [renameTo, setRenameTo] = useState("");

  const load = useCallback(async () => {
    setError("");
    try {
      const mine = await fetch("/api/showcase", { cache: "no-store" });
      if (mine.ok) {
        const data = await mine.json();
        setItems(Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : []);
      } else if (mine.status === 401) {
        setItems([]);
      }
      const pub = await fetch("/api/showcase?scope=public", { cache: "no-store" });
      if (pub.ok) {
        const data = await pub.json();
        setPublicItems(Array.isArray(data.items) ? data.items : Array.isArray(data) ? data : []);
      }
    } catch {
      setError("Could not load showcase.");
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const mineCats = useMemo(() => {
    const set = new Set(items.map((i) => i.category || "General"));
    return ["All", ...Array.from(set).sort()];
  }, [items]);

  const shown = (tab === "mine" ? items : publicItems).filter(
    (i) => filter === "All" || i.category === filter,
  );
  const grouped = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const i of shown) {
      const key = i.category || "General";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(i);
    }
    return Array.from(map.entries());
  }, [shown]);

  async function saveItem(payload: Record<string, unknown>, id?: string) {
    const res = await fetch("/api/showcase", {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(id ? { id, ...payload } : payload),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Save failed");
    }
    await load();
  }

  async function addEntry() {
    if (!draft.title.trim()) return;
    try {
      await saveItem({
        title: draft.title,
        description: draft.description,
        category: draft.category,
        visibility: draft.visibility,
        thumbnail: draft.thumbnail,
        links: draft.links.filter((l) => l.url.trim()),
      });
      setDraft({
        title: "",
        description: "",
        category: draft.category,
        visibility: "PRIVATE",
        thumbnail: "",
        links: [{ label: "GitHub", url: "" }],
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    }
  }

  async function remove(id: string) {
    await fetch(`/api/showcase?id=${encodeURIComponent(id)}`, { method: "DELETE" });
    await load();
  }

  async function renameCategory(from: string, to: string) {
    const affected = items.filter((i) => i.category === from);
    await Promise.all(affected.map((i) => saveItem({ category: to }, i.id)));
    setRenaming(null);
  }

  async function deleteCategory(cat: string) {
    const affected = items.filter((i) => i.category === cat);
    await Promise.all(affected.map((i) => saveItem({ category: "General" }, i.id)));
  }

  async function move(item: Item, dir: -1 | 1) {
    const siblings = items.filter((i) => i.category === item.category).sort((a, b) => a.sortOrder - b.sortOrder);
    const idx = siblings.findIndex((i) => i.id === item.id);
    const swap = siblings[idx + dir];
    if (!swap) return;
    await saveItem({ sortOrder: swap.sortOrder }, item.id);
    await saveItem({ sortOrder: item.sortOrder }, swap.id);
  }

  if (status === "unauthenticated" && tab === "mine") {
    /* still show public */
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 space-y-8">
      <header>
        <p className="hearth-kicker">Portfolio</p>
        <h1 className="font-display text-4xl font-semibold">Showcase wall</h1>
        <p className="mt-2 max-w-2xl text-sm text-[var(--muted)]">
          Your curated work. Entries are private to you unless you mark them public. Manual content stays shared; this wall is yours.
        </p>
      </header>

      {error ? <p className="text-sm text-red-700">{error}</p> : null}

      <div className="flex flex-wrap gap-2">
        <button type="button" className={`hearth-chip ${tab === "mine" ? "hearth-chip-active" : ""}`} onClick={() => { setTab("mine"); setFilter("All"); }}>
          My wall
        </button>
        <button type="button" className={`hearth-chip ${tab === "public" ? "hearth-chip-active" : ""}`} onClick={() => { setTab("public"); setFilter("All"); }}>
          Public gallery
        </button>
      </div>

      {tab === "mine" && status === "authenticated" ? (
        <section className="hearth-panel space-y-3 p-4">
          <h2 className="font-display text-lg font-semibold">Add entry</h2>
          <input className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" placeholder="Title" value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
          <textarea className="w-full rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" rows={3} placeholder="Description" value={draft.description} onChange={(e) => setDraft({ ...draft, description: e.target.value })} />
          <div className="grid gap-2 sm:grid-cols-3">
            <input className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" placeholder="Category" value={draft.category} onChange={(e) => setDraft({ ...draft, category: e.target.value })} />
            <select className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" value={draft.visibility} onChange={(e) => setDraft({ ...draft, visibility: e.target.value })}>
              <option value="PRIVATE">Private</option>
              <option value="PUBLIC">Public</option>
            </select>
            <input className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" placeholder="Thumbnail URL" value={draft.thumbnail} onChange={(e) => setDraft({ ...draft, thumbnail: e.target.value })} />
          </div>
          {draft.links.map((link, i) => (
            <div key={i} className="grid gap-2 sm:grid-cols-[140px_1fr_auto]">
              <input className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" value={link.label} onChange={(e) => {
                const links = [...draft.links];
                links[i] = { ...link, label: e.target.value };
                setDraft({ ...draft, links });
              }} />
              <input className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" placeholder="https://…" value={link.url} onChange={(e) => {
                const links = [...draft.links];
                links[i] = { ...link, url: e.target.value };
                setDraft({ ...draft, links });
              }} />
              <button type="button" className="hearth-chip" onClick={() => setDraft({ ...draft, links: draft.links.filter((_, j) => j !== i) })}>Remove</button>
            </div>
          ))}
          <div className="flex gap-2">
            <button type="button" className="hearth-chip" onClick={() => setDraft({ ...draft, links: [...draft.links, { label: "Demo", url: "" }] })}>+ Link</button>
            <button type="button" className="hearth-chip hearth-chip-active" onClick={() => void addEntry()}>Save entry</button>
          </div>
        </section>
      ) : null}

      {tab === "mine" && status === "authenticated" ? (
        <section className="flex flex-wrap items-end gap-2">
          <input className="rounded-lg border border-[var(--line)] bg-[var(--paper)] px-3 py-2 text-sm" placeholder="New category" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
          <button type="button" className="hearth-chip" onClick={() => { if (newCat.trim()) setDraft({ ...draft, category: newCat.trim() }); setNewCat(""); }}>Use category</button>
        </section>
      ) : null}

      <div className="flex flex-wrap gap-2">
        {(tab === "mine" ? mineCats : ["All", ...Array.from(new Set(publicItems.map((i) => i.category)))]).map((c) => (
          <button key={c} type="button" className={`hearth-chip ${filter === c ? "hearth-chip-active" : ""}`} onClick={() => setFilter(c)}>{c}</button>
        ))}
      </div>

      {grouped.map(([cat, list]) => (
        <section key={cat} className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {renaming === cat ? (
              <>
                <input className="rounded-lg border border-[var(--line)] px-2 py-1 text-sm" value={renameTo} onChange={(e) => setRenameTo(e.target.value)} />
                <button type="button" className="hearth-chip hearth-chip-active" onClick={() => void renameCategory(cat, renameTo.trim() || cat)}>Save</button>
                <button type="button" className="hearth-chip" onClick={() => setRenaming(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h2 className="font-display text-xl font-semibold">{cat}</h2>
                {tab === "mine" && cat !== "All" ? (
                  <>
                    <button type="button" className="hearth-chip" onClick={() => { setRenaming(cat); setRenameTo(cat); }}>Rename</button>
                    {cat !== "General" ? <button type="button" className="hearth-chip" onClick={() => void deleteCategory(cat)}>Delete category</button> : null}
                  </>
                ) : null}
              </>
            )}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {list.map((item) => (
              <article key={item.id} className="hearth-panel overflow-hidden">
                {item.thumbnail ? <img src={item.thumbnail} alt="" className="h-32 w-full object-cover" /> : null}
                <div className="space-y-2 p-4">
                  {editingId === item.id ? (
                    <EditCard
                      item={item}
                      onCancel={() => setEditingId(null)}
                      onSave={async (payload) => {
                        await saveItem(payload, item.id);
                        setEditingId(null);
                      }}
                    />
                  ) : (
                    <>
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                        {tab === "public" ? (
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent-soft)] text-xs font-bold" title={item.author.name || item.author.email}>
                            {initials(item.author.name, item.author.email)}
                          </span>
                        ) : (
                          <span className="text-[10px] uppercase tracking-widest text-[var(--muted)]">{item.visibility.toLowerCase()}</span>
                        )}
                      </div>
                      {tab === "public" ? <p className="text-xs text-[var(--muted)]">{item.author.name || item.author.email}</p> : null}
                      <p className="text-sm text-[var(--ink)]/80">{item.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {item.links.map((l, i) => (
                          <a key={i} href={l.url} target="_blank" rel="noreferrer" className="hearth-chip">{l.label}</a>
                        ))}
                      </div>
                      {tab === "mine" ? (
                        <div className="flex flex-wrap gap-2 pt-2">
                          <button type="button" className="hearth-chip" onClick={() => setEditingId(item.id)}>Edit</button>
                          <button type="button" className="hearth-chip" onClick={() => void move(item, -1)}>Up</button>
                          <button type="button" className="hearth-chip" onClick={() => void move(item, 1)}>Down</button>
                          <button type="button" className="hearth-chip" onClick={() => void remove(item.id)}>Delete</button>
                        </div>
                      ) : null}
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
      </div>
    </div>
  );
}

function EditCard({
  item,
  onCancel,
  onSave,
}: {
  item: Item;
  onCancel: () => void;
  onSave: (payload: Record<string, unknown>) => Promise<void>;
}) {
  const [title, setTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description || "");
  const [category, setCategory] = useState(item.category);
  const [visibility, setVisibility] = useState(item.visibility);
  const [thumbnail, setThumbnail] = useState(item.thumbnail || "");
  const [links, setLinks] = useState<Link[]>(item.links.length ? item.links : [{ label: "Link", url: "" }]);
  return (
    <div className="space-y-2">
      <input className="w-full rounded-lg border border-[var(--line)] px-2 py-1 text-sm" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="w-full rounded-lg border border-[var(--line)] px-2 py-1 text-sm" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
      <input className="w-full rounded-lg border border-[var(--line)] px-2 py-1 text-sm" value={category} onChange={(e) => setCategory(e.target.value)} />
      <select className="w-full rounded-lg border border-[var(--line)] px-2 py-1 text-sm" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
        <option value="PRIVATE">Private</option>
        <option value="PUBLIC">Public</option>
      </select>
      <input className="w-full rounded-lg border border-[var(--line)] px-2 py-1 text-sm" placeholder="Thumbnail URL" value={thumbnail} onChange={(e) => setThumbnail(e.target.value)} />
      {links.map((l, i) => (
        <div key={i} className="grid grid-cols-2 gap-1">
          <input className="rounded border border-[var(--line)] px-2 py-1 text-sm" value={l.label} onChange={(e) => {
            const next = [...links];
            next[i] = { ...l, label: e.target.value };
            setLinks(next);
          }} />
          <input className="rounded border border-[var(--line)] px-2 py-1 text-sm" value={l.url} onChange={(e) => {
            const next = [...links];
            next[i] = { ...l, url: e.target.value };
            setLinks(next);
          }} />
        </div>
      ))}
      <div className="flex gap-2">
        <button type="button" className="hearth-chip hearth-chip-active" onClick={() => void onSave({ title, description, category, visibility, thumbnail, links })}>Save</button>
        <button type="button" className="hearth-chip" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
