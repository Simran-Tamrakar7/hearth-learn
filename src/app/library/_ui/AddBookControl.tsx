"use client";

import { useEffect, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { shelves } from "@/app/library/_content/_registry";
import { emptyBook, isUserBook, patchBook, saveBook, type UserBook } from "@/app/library/_lib/userBooks";
import { ImageField } from "@/components/ui/ImageField";

const shelfOptions = shelves.filter((s) => s.id !== "all");

export function AddBookControl({
  editing,
  onCloseEdit,
}: {
  editing?: UserBook | null;
  onCloseEdit?: () => void;
}) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [shelf, setShelf] = useState("fiction");
  const [blurb, setBlurb] = useState("");
  const [cover, setCover] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) {
      setOpen(true);
      setTitle(editing.title);
      setAuthor(editing.author);
      setUrl(editing.url === "#" ? "" : editing.url);
      setShelf(editing.shelf || "fiction");
      setBlurb(editing.blurb);
      setCover(editing.coverUrl || "");
    }
  }, [editing]);

  useEffect(() => {
    if (open) nameRef.current?.focus();
  }, [open]);

  function reset() {
    setTitle("");
    setAuthor("");
    setUrl("");
    setShelf("fiction");
    setBlurb("");
    setCover("");
    setOpen(false);
    onCloseEdit?.();
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const name = title.trim();
    if (!name) {
      nameRef.current?.focus();
      return;
    }
    const fields = {
      title: name,
      author: author.trim() || "Unknown",
      url: url.trim() || "#",
      shelf,
      blurb: blurb.trim(),
      coverUrl: cover.trim() || null,
    };
    if (editing) {
      if (isUserBook(editing.id)) saveBook({ ...editing, ...fields });
      else patchBook(editing.id, fields);
    } else {
      saveBook(emptyBook({ title: name, author, url, shelf, blurb, coverUrl: cover }));
    }
    reset();
  }

  if (!open) {
    return (
      <button
        type="button"
        aria-label="Add book"
        onClick={() => setOpen(true)}
        className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] hover:bg-[#243530] shadow-xs"
      >
        <Plus className="w-5 h-5" />
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="shrink-0 flex flex-col gap-2 w-full sm:w-80">
      <input
        ref={nameRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Escape") reset();
        }}
        placeholder="Book title"
        aria-label="Book title"
        className="h-11 px-3 text-sm bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] shadow-xs"
      />
      <input
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Author"
        aria-label="Author"
        className="h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
      />
      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Link to read (URL)"
        aria-label="Book URL"
        className="h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
      />
      <select
        value={shelfOptions.some((s) => s.id === shelf) ? shelf : "fiction"}
        onChange={(e) => setShelf(e.target.value)}
        aria-label="Shelf"
        className="h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
      >
        {shelfOptions.map((s) => (
          <option key={s.id} value={s.id}>
            {s.label}
          </option>
        ))}
      </select>
      <textarea
        rows={2}
        value={blurb}
        onChange={(e) => setBlurb(e.target.value)}
        placeholder="Short blurb"
        aria-label="Blurb"
        className="px-3 py-2 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] resize-none"
      />
      <ImageField value={cover} onChange={setCover} label="Cover image" />
      <div className="flex justify-end gap-2">
        <button type="button" onClick={reset} className="h-10 px-3 rounded-2xl text-xs font-semibold text-[#52635E]">
          Cancel
        </button>
        <button
          type="submit"
          className="h-10 px-4 rounded-2xl bg-[#1C2A26] text-[#FAF7F2] text-xs font-semibold hover:bg-[#243530] shadow-xs"
        >
          {editing ? "Save" : "Add book"}
        </button>
      </div>
    </form>
  );
}
