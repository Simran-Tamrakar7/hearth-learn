"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MoreVertical, Plus, ArrowRight, BookOpen, Clock, Pin } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { PinButton, manualPinId, togglePinnedItem } from "@/components/ui/PinButton";
import { useToast } from "@/components/ui/Toast";
import { useTheme } from "@/context/ThemeContext";
import type { ManualItem } from "@/app/manuals/types";
import { emptyManual, saveUserManual } from "@/app/manuals/features/local-storage";
import { listedCategories, subscribeCategories, TagInput } from "@/app/manuals/features/categorization";
import { getRecentManuals, getResume, type RecentManual } from "@/lib/readerMemory";

export type KebabItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
};

export function kebabItems(items: Array<KebabItem | false | null | undefined>): KebabItem[] {
  return items.filter((x): x is KebabItem => Boolean(x));
}

export function KebabMenu({ items, label, compact }: { items: KebabItem[]; label: string; compact?: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  if (!items.length) return null;

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`${compact ? "p-1" : "p-2"} rounded-xl bg-white/90 text-[#8A9B95] hover:text-[#1C2A26] hover:bg-white border border-[#E7E0D3]`}
      >
        <MoreVertical className={compact ? "w-3.5 h-3.5" : "w-4 h-4"} />
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1 z-30 min-w-[11rem] rounded-xl border border-[#E7E0D3] bg-white py-1 shadow-lg"
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (item.disabled) return;
                setOpen(false);
                item.onClick();
              }}
              className={`w-full text-left px-3 py-1.5 text-xs font-semibold disabled:opacity-40 ${
                item.danger ? "text-rose-700 hover:bg-rose-50" : "text-[#1C2A26] hover:bg-[#FAF7F2]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function ManualCard({
  manual,
  pinned,
  onDelete,
  onTagClick,
  canEdit,
  canDelete,
}: {
  manual: ManualItem;
  pinned?: boolean;
  onDelete?: () => void;
  onTagClick?: (tag: string) => void;
  canEdit?: boolean;
  canDelete?: boolean;
}) {
  const { toast } = useToast();
  const pinId = manualPinId(manual.slug);

  return (
    <motion.div whileHover={{ y: -6, scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
      <div className="relative h-full">
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1">
          <KebabMenu
            label={`Actions for ${manual.title}`}
            items={kebabItems([
              canEdit && {
                label: "Edit",
                onClick: () => {
                  window.location.href = `/manuals/${manual.slug}?edit=1`;
                },
              },
              {
                label: pinned ? "Unpin" : "Pin",
                onClick: () => {
                  const now = togglePinnedItem({
                    id: pinId,
                    title: manual.title,
                    category: manual.category,
                    type: "manual",
                    url: `/manuals/${manual.slug}`,
                  });
                  toast({
                    type: now ? "achievement" : "info",
                    title: now ? "Pinned to Dashboard! 📌" : "Unpinned Item",
                    description: now
                      ? `"${manual.title}" is pinned on Manuals and Dashboard.`
                      : `"${manual.title}" removed from pins.`,
                  });
                },
              },
              canDelete && {
                label: "Delete",
                danger: true,
                onClick: () => {
                  if (window.confirm(`Delete “${manual.title}”? This cannot be undone.`)) onDelete?.();
                },
              },
            ])}
          />
          <PinButton
            itemId={pinId}
            itemTitle={manual.title}
            itemCategory={manual.category}
            itemType="manual"
            itemUrl={`/manuals/${manual.slug}`}
            variant="icon"
          />
        </div>
        <Link href={`/manuals/${manual.slug}`} className="block h-full">
          <Card
            variant="default"
            hoverable={true}
            className={`h-full border-[#E7E0D3] bg-white rounded-2xl overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-lg transition-all group p-0 ${
              pinned ? "ring-2 ring-[#D97706]/70 border-[#D97706]" : ""
            }`}
          >
            <div>
              <div className="h-40 relative overflow-hidden bg-[#FAF7F2]">
                <img
                  src={manual.coverImage}
                  alt={manual.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#1C2A26] text-[#D97706] text-[10px] font-bold uppercase tracking-wider shadow-2xs">
                  {manual.category}
                </span>
                {pinned && (
                  <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold uppercase tracking-wider">
                    <Pin className="w-3 h-3 fill-current" /> Pinned
                  </span>
                )}
              </div>
              <div className="p-4 sm:p-5 space-y-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#8A9B95] font-semibold">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#D97706]" /> {manual.chapterCount} Chapters
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D97706]" /> {manual.estimatedTime}
                  </span>
                </div>
                <div className="space-y-1">
                  <h2 className="font-serif-display text-lg font-bold text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-snug">
                    {manual.title}
                  </h2>
                  <p className="text-xs text-[#52635E] line-clamp-2 leading-relaxed">{manual.description}</p>
                </div>
                {(manual.tags || []).length > 0 ? (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {(manual.tags || []).map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onTagClick?.(tag);
                        }}
                        className="px-2 py-0.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D3] text-[10px] font-bold text-[#52635E] hover:border-[#D97706] hover:text-[#D97706]"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="p-4 sm:p-5 pt-0 border-t border-transparent group-hover:border-[#FAF7F2] transition-colors">
              <div className="pt-2.5 flex items-center justify-between text-xs font-bold text-[#1C2A26] group-hover:text-[#D97706]">
                <span>Open Manual</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Card>
        </Link>
      </div>
    </motion.div>
  );
}

export function AddManualControl() {
  const router = useRouter();
  const { primaryColor } = useTheme();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Foundations");
  const [tags, setTags] = useState<string[]>([]);
  const [coverImage, setCoverImage] = useState("");
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
    const saved = saveUserManual(emptyManual(name, { category, tags, coverImage: coverImage.trim() || undefined }));
    setOpen(false);
    setTitle("");
    setTags([]);
    setCoverImage("");
    router.push(`/manuals/${saved.slug}?edit=1`);
  }

  if (!open) {
    return (
      <button
        type="button"
        aria-label="Add manual"
        onClick={() => setOpen(true)}
        className="shrink-0 inline-flex items-center justify-center h-11 w-11 rounded-2xl text-[#FAF7F2] hover:opacity-90 shadow-xs"
        style={{ backgroundColor: primaryColor }}
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
          className="h-11 px-4 rounded-2xl text-[#FAF7F2] text-xs font-semibold hover:opacity-90 shadow-xs"
          style={{ backgroundColor: primaryColor }}
        >
          Open
        </button>
      </div>
      <input
        value={coverImage}
        onChange={(e) => setCoverImage(e.target.value)}
        placeholder="Cover image URL (optional)"
        aria-label="Cover image URL"
        className="h-10 px-3 text-xs bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] w-full"
      />
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

export function RecentlyViewed() {
  const [recent, setRecent] = useState<RecentManual[]>([]);
  const [resumeSlug, setResumeSlug] = useState<string | null>(null);
  const [resumeIndex, setResumeIndex] = useState<number | null>(null);

  useEffect(() => {
    const list = getRecentManuals();
    setRecent(list);
    const first = list[0];
    if (first) {
      const r = getResume(first.slug);
      if (r) {
        setResumeSlug(first.slug);
        setResumeIndex(r.chapterIndex ?? 0);
      }
    }
  }, []);

  if (!recent.length) return null;

  return (
    <section className="space-y-3">
      {resumeSlug ? (
        <Link
          href={`/manuals/${resumeSlug}`}
          className="block p-4 rounded-2xl bg-[#1C2A26] text-[#FAF7F2]"
        >
          <p className="text-[10px] uppercase tracking-widest text-amber-300 font-bold">Continue where you left off</p>
          <p className="font-serif-display text-lg font-bold mt-1">{recent.find((r) => r.slug === resumeSlug)?.title}</p>
          <p className="text-xs opacity-80">Chapter {(resumeIndex || 0) + 1}</p>
        </Link>
      ) : null}
      <div>
        <h2 className="font-serif-display text-xl font-bold text-[#1C2A26]">Recently viewed</h2>
        <div className="mt-2 flex gap-2 overflow-x-auto pb-1">
          {recent.map((r) => (
            <Link
              key={r.slug}
              href={`/manuals/${r.slug}`}
              className="min-w-[180px] p-3 rounded-xl bg-white border border-[#E7E0D3] text-sm font-semibold"
            >
              {r.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
