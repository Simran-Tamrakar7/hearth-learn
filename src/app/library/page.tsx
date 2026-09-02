"use client";

/* PAGE: /library  — this file is the screen. Books: ./_content/_registry.ts. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  listedLibraryBooks,
  shelves,
  gutenbergCoverUrl,
  type LibraryBook,
} from "@/app/library/_content/_registry";
import {
  emptyLibraryBook,
  isBuiltinBook,
  mergeLibraryBooks,
  removeLibraryBook,
  saveUserLibraryBook,
} from "@/app/library/user-books";
import {
  BookOpen,
  Search,
  Bookmark as BookmarkIcon,
  X,
  Library as LibraryIcon,
  ExternalLink,
  Play,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";
import {
  librarySavedStoreKey,
  readScopedRaw,
  subscribeUserScope,
  writeScopedRaw,
} from "@/lib/userScope";
import { subscribeUserCatalog } from "@/lib/userCatalog";

function loadSaved(): Set<string> {
  try {
    const raw = readScopedRaw(librarySavedStoreKey());
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function BookCover({ book, compact = false }: { book: LibraryBook; compact?: boolean }) {
  const src = book.coverUrl?.trim() || gutenbergCoverUrl(book);
  const [broken, setBroken] = useState(!src);

  if (broken || !src) {
    const isStudy = book.shelf === "study-guides";
    const isFiction = book.shelf === "tech-fiction";
    const isClassic = book.shelf === "engineering-classics";
    const isLeadership = book.shelf === "career-leadership";

    const bgGradient = isStudy
      ? "from-[#0F172A] via-[#1E293B] to-[#334155] border-amber-500/30"
      : isFiction
      ? "from-[#18181B] via-[#27272A] to-[#3F3F46] border-emerald-500/30"
      : isClassic
      ? "from-[#1C2A26] via-[#243530] to-[#2D3F3A] border-amber-400/40"
      : isLeadership
      ? "from-[#2E1065] via-[#3B0764] to-[#581C87] border-purple-300/30"
      : "from-[#1C2A26] to-[#2D3E38] border-[#E7E0D3]";

    const shelfTag = isStudy
      ? "STUDY GUIDE"
      : isFiction
      ? "TECH FICTION"
      : isClassic
      ? "CLASSIC"
      : isLeadership
      ? "LEADERSHIP"
      : book.shelf.toUpperCase();

    if (compact) {
      return (
        <div className={`h-20 w-14 rounded-lg bg-gradient-to-b ${bgGradient} text-[#FAF7F2] p-2 flex flex-col justify-between shadow-sm border relative overflow-hidden shrink-0`}>
          <span className="text-[7px] font-mono font-bold tracking-wider px-1 py-0.5 rounded bg-white/10 text-amber-300 truncate">
            {shelfTag}
          </span>
          <h4 className="font-serif-display font-bold text-[10px] leading-tight line-clamp-2 text-white">
            {book.title}
          </h4>
        </div>
      );
    }

    return (
      <div className={`h-48 w-32 rounded-xl bg-gradient-to-b ${bgGradient} text-[#FAF7F2] p-3.5 flex flex-col justify-between shadow-md border relative overflow-hidden group-hover:scale-105 transition-transform duration-300 shrink-0`}>
        <div className="space-y-1 z-10">
          <span className="inline-block text-[8px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-white/10 text-amber-300 border border-white/15">
            {shelfTag}
          </span>
          <h4 className="font-serif-display font-bold text-xs sm:text-sm leading-snug line-clamp-3 text-white">
            {book.title}
          </h4>
        </div>

        <div className="z-10 pt-1.5 border-t border-white/10">
          <p className="text-[9px] text-amber-200 font-semibold truncate">{book.author}</p>
          {book.year && <p className="text-[8px] text-teal-200/80 font-mono">{book.year}</p>}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt=""
      onError={() => setBroken(true)}
      className={`${compact ? "h-20 w-14" : "h-48 w-32"} object-cover rounded-xl shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#E7E0D3] shrink-0`}
    />
  );
}

function filterBooks(all: LibraryBook[], query: string, shelfId: string) {
  const q = query.trim().toLowerCase();
  let list =
    !shelfId || shelfId === "all"
      ? all
      : all.filter((b) => (b.shelves || [b.shelf]).includes(shelfId));
  if (!q) return list;
  return list.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q) ||
      b.blurb.toLowerCase().includes(q) ||
      b.source.toLowerCase().includes(q),
  );
}

export default function LibraryPage() {
  const { toast } = useToast();
  const [shelf, setShelf] = useState("all");
  const [q, setQ] = useState("");
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [detail, setDetail] = useState<LibraryBook | null>(null);
  const [catalog, setCatalog] = useState<LibraryBook[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<LibraryBook | null>(null);
  const [draft, setDraft] = useState<LibraryBook>(() => emptyLibraryBook(""));

  useEffect(() => {
    const refresh = () => {
      setSaved(loadSaved());
      setCatalog(mergeLibraryBooks());
    };
    refresh();
    const unsub = subscribeUserScope(refresh);
    const unsubCat = subscribeUserCatalog(refresh);
    return () => {
      unsub();
      unsubCat();
    };
  }, []);

  const books = useMemo(() => {
    let list = filterBooks(catalog, q, shelf);
    if (savedOnly) list = list.filter((b) => saved.has(b.id));
    return list;
  }, [catalog, q, shelf, savedOnly, saved]);

  const savedBooks = useMemo(
    () => catalog.filter((b) => saved.has(b.id)),
    [catalog, saved]
  );

  const activeShelf = shelves.find((s) => s.id === shelf) || shelves[0];

  function toggleSave(id: string) {
    const next = new Set(saved);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSaved(next);
    writeScopedRaw(librarySavedStoreKey(), JSON.stringify([...next]));
    toast({
      type: next.has(id) ? "achievement" : "info",
      title: next.has(id) ? "Saved to your shelf" : "Removed from saved",
    });
  }

  function openAddForm() {
    setEditing(null);
    setDraft(emptyLibraryBook(""));
    setFormOpen(true);
  }

  function openEditForm(book: LibraryBook) {
    if (isBuiltinBook(book.id)) {
      const copy = { ...book, id: `user-${book.id}-${Date.now().toString(36)}`, source: book.source || "My shelf" };
      setEditing(null);
      setDraft(copy);
    } else {
      setEditing(book);
      setDraft({ ...book });
    }
    setFormOpen(true);
    setDetail(null);
  }

  function saveBook() {
    if (!draft.title.trim()) {
      toast({ type: "error", title: "Title required" });
      return;
    }
    const id = editing?.id || draft.id || emptyLibraryBook(draft.title).id;
    saveUserLibraryBook({ ...draft, id, title: draft.title.trim() });
    setCatalog(mergeLibraryBooks());
    setFormOpen(false);
    toast({ type: "achievement", title: editing ? "Book updated" : "Book added" });
  }

  function deleteBook(id: string) {
    removeLibraryBook(id);
    setCatalog(mergeLibraryBooks());
    setDetail(null);
    toast({ type: "info", title: isBuiltinBook(id) ? "Book hidden from your library" : "Book deleted" });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 w-full space-y-8 flex-1">
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-4 shadow-sm">
          <div className="flex items-center gap-2">
            <Badge variant="amber" icon={<LibraryIcon className="w-3.5 h-3.5" />}>
              LIBRARY
            </Badge>
            <span className="text-xs font-semibold text-[#8A9B95]">
              Free to read · legal links only
            </span>
          </div>

          <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
            The Library
          </h1>

          <p className="text-xs sm:text-base text-[#52635E] leading-relaxed max-w-2xl">
            Shelves of tech fiction, DevOps novels, engineering classics, study guides, and public-domain literature. Open a title or blueprint — then return to your course manual.
          </p>

          <p className="text-xs font-semibold text-[#8A9B95]">
            {catalog.length} titles · {shelves.length - 1} shelves · {saved.size} saved here
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <div className="relative flex-1 sm:max-w-md">
              <Search className="w-4 h-4 text-[#8A9B95] absolute left-4 top-3.5" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search title, author, source…"
                className="w-full h-11 pl-11 pr-4 text-xs sm:text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
              />
            </div>
            <label className="flex items-center gap-2 text-xs font-bold text-[#52635E] whitespace-nowrap cursor-pointer">
              <input
                type="checkbox"
                checked={savedOnly}
                onChange={(e) => setSavedOnly(e.target.checked)}
                className="accent-[#D97706]"
              />
              Saved only
            </label>
            <Button variant="primary" size="sm" onClick={openAddForm} leftIcon={<Plus className="w-4 h-4" />}>
              Add book
            </Button>
          </div>
        </div>

        {savedBooks.length > 0 && !savedOnly && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] block">
              Saved on your shelf
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedBooks.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => setDetail(b)}
                  className="bg-white border border-[#E7E0D3] rounded-2xl p-4 flex gap-4 items-center text-left cursor-pointer hover:border-[#1C2A26] transition-all shadow-xs"
                >
                  <div className="h-20 shrink-0 flex items-center overflow-hidden">
                    <BookCover book={b} compact={true} />
                  </div>
                  <div className="min-w-0 space-y-1">
                    <h4 className="font-serif-display font-bold text-xs text-[#1C2A26] truncate">{b.title}</h4>
                    <p className="text-[10px] text-[#8A9B95] truncate">By {b.author}</p>
                    <p className="text-[10px] text-[#52635E]">{b.source}{b.year ? ` · ${b.year}` : ""}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2 border-b border-[#E7E0D3] pb-4">
            {shelves.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setShelf(s.id)}
                className={`px-5 py-2 rounded-2xl text-xs font-bold transition-all ${
                  shelf === s.id
                    ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs"
                    : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <p className="text-xs text-[#8A9B95]">{activeShelf.blurb}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <motion.div
              key={book.id}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setDetail(book)}
              className="bg-white border border-[#E7E0D3] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="h-64 relative overflow-hidden bg-[#FAF7F2] p-4 flex items-center justify-center">
                  <BookCover book={book} />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#1C2A26] text-[#34D399] text-[9px] font-bold uppercase tracking-wider">
                    {book.source}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-[#8A9B95] font-medium">
                    <span>{book.author}</span>
                    <span>{book.year || "Open"}</span>
                  </div>
                  <h3 className="font-serif-display font-bold text-base text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-snug">
                    {book.title}
                  </h3>
                  <p className="text-xs text-[#52635E] leading-relaxed line-clamp-2">{book.blurb}</p>
                </div>
              </div>
              <div className="p-5 pt-0 text-xs font-bold text-[#1C2A26] group-hover:text-[#D97706] flex items-center justify-between border-t border-[#F5EFE6]">
                <span>Read</span>
                <BookOpen className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>

        {!books.length && (
          <p className="text-sm text-[#52635E]">Nothing on this shelf matches. Try another shelf or clear search.</p>
        )}
      </main>

      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A26]/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setDetail(null)}
              className="absolute top-6 right-6 text-[#8A9B95] hover:text-[#1C2A26]"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex gap-6 items-start">
              <div className="h-40 shrink-0">
                <BookCover book={detail} />
              </div>
              <div className="space-y-2 min-w-0">
                <Badge variant="amber">{detail.source}</Badge>
                <h3 className="font-serif-display font-bold text-xl text-[#1C2A26]">{detail.title}</h3>
                <p className="text-xs text-[#8A9B95]">
                  By {detail.author}
                  {detail.year ? ` · ${detail.year}` : ""}
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E7E0D3]">
              <span className="text-xs font-bold text-[#1C2A26] uppercase tracking-wider block">Description</span>
              <p className="text-xs text-[#52635E] leading-relaxed">{detail.blurb}</p>
            </div>

            <div className="flex justify-end gap-3 pt-2 flex-wrap">
              <Button variant="outline" size="md" onClick={() => openEditForm(detail)} leftIcon={<Pencil className="w-4 h-4" />}>
                Edit
              </Button>
              <Button variant="outline" size="md" onClick={() => deleteBook(detail.id)} leftIcon={<Trash2 className="w-4 h-4" />}>
                {isBuiltinBook(detail.id) ? "Hide" : "Delete"}
              </Button>
              <Button
                variant="outline"
                size="md"
                onClick={() => toggleSave(detail.id)}
                leftIcon={<BookmarkIcon className="w-4 h-4 text-[#D97706]" />}
              >
                {saved.has(detail.id) ? "Saved" : "Save"}
              </Button>
              {detail.url ? (
              <Button
                variant="primary"
                size="md"
                onClick={() => window.open(detail.url, "_blank", "noopener,noreferrer")}
                leftIcon={<Play className="w-4 h-4 text-[#D97706] fill-current" />}
                rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
              >
                Read
              </Button>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1C2A26]/40 backdrop-blur-xs">
          <div className="bg-white border border-[#E7E0D3] rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl relative">
            <button type="button" onClick={() => setFormOpen(false)} className="absolute top-6 right-6 text-[#8A9B95] hover:text-[#1C2A26]">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif-display font-bold text-xl">{editing ? "Edit book" : "Add book"}</h3>
            {(["title", "author", "url", "coverUrl", "blurb", "source", "year"] as const).map((field) =>
              field === "blurb" ? (
                <textarea key={field} rows={3} value={draft[field] || ""} onChange={(e) => setDraft({ ...draft, blurb: e.target.value })} placeholder="Description" className="w-full p-3 text-sm border border-[#E7E0D3] rounded-xl" />
              ) : (
                <input key={field} value={String((draft as unknown as Record<string, string | undefined>)[field] || "")} onChange={(e) => setDraft({ ...draft, [field]: e.target.value })} placeholder={field === "coverUrl" ? "Cover image URL (optional)" : field.charAt(0).toUpperCase() + field.slice(1)} className="w-full h-11 px-3 text-sm border border-[#E7E0D3] rounded-xl" />
              )
            )}
            <select value={draft.shelf} onChange={(e) => setDraft({ ...draft, shelf: e.target.value })} className="w-full h-11 px-3 text-sm border border-[#E7E0D3] rounded-xl">
              {shelves.filter((s) => s.id !== "all").map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setFormOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={saveBook}>{editing ? "Save" : "Add"}</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
