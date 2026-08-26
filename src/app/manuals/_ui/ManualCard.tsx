"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { PinButton, manualPinId, togglePinnedItem } from "@/components/ui/PinButton";
import { kebabItems, KebabMenu } from "@/app/manuals/_ui/KebabMenu";
import { ArrowRight, BookOpen, Clock, Pin } from "lucide-react";
import type { ManualItem } from "@/app/manuals/_lib/manualsData";
import { useToast } from "@/components/ui/Toast";

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
