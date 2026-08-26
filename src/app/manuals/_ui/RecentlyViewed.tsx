"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentManuals, getResume, type RecentManual } from "@/lib/readerMemory";

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
