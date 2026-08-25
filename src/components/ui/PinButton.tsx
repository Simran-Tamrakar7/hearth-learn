"use client";

/* SHARED: pin to dashboard. Used by manuals, games, recipes, showcase-wall. */


import React, { useState, useEffect } from "react";
import { Pin } from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface PinButtonProps {
  itemId: string;
  itemTitle: string;
  itemCategory?: string;
  itemType: "manual" | "game" | "recipe" | "trail" | "showcase";
  itemUrl: string;
  itemIcon?: string;
  className?: string;
  variant?: "badge" | "icon" | "button";
}

export interface PinnedItemMetadata {
  id: string;
  title: string;
  category?: string;
  type: "manual" | "game" | "recipe" | "trail" | "showcase";
  url: string;
  icon?: string;
  pinnedAt: number;
}

export function getPinnedItems(): PinnedItemMetadata[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("hearth_pinned_items_v2");
    if (raw) return JSON.parse(raw);

    // Fallback migration from old string array
    const oldRaw = localStorage.getItem("hearth_pinned_items");
    if (oldRaw) {
      const oldIds: string[] = JSON.parse(oldRaw);
      return oldIds.map((id) => ({
        id,
        title: id.replace(/^(man|g|dish|trail)-/, "").replace(/-/g, " "),
        type: id.startsWith("g-") ? "game" : id.startsWith("dish-") ? "recipe" : "manual",
        url: id.startsWith("g-") ? "/rest/games" : id.startsWith("dish-") ? "/rest/cookbook" : `/manuals/${id.replace("man-", "")}`,
        pinnedAt: Date.now(),
      }));
    }
  } catch (e) {
    console.error("Failed to parse pinned items:", e);
  }
  return [];
}

export function manualPinId(slug: string) {
  return `man-${String(slug || "").replace(/^man-/, "")}`;
}

export function isManualsCatalogPin(item: PinnedItemMetadata) {
  if (item.type === "manual" || item.type === "trail") return true;
  if (String(item.id || "").startsWith("man-") || String(item.id || "").startsWith("trail-")) return true;
  return String(item.url || "").includes("/manuals");
}

export function isShowcaseCatalogPin(item: PinnedItemMetadata) {
  return item.type === "showcase";
}

export function subscribePinnedItems(onChange: (items: PinnedItemMetadata[]) => void) {
  if (typeof window === "undefined") return () => {};
  const emit = () => onChange(getPinnedItems());
  emit();
  window.addEventListener("hearth_pins_updated", emit);
  window.addEventListener("storage", emit);
  window.addEventListener("focus", emit);
  return () => {
    window.removeEventListener("hearth_pins_updated", emit);
    window.removeEventListener("storage", emit);
    window.removeEventListener("focus", emit);
  };
}

export function savePinnedItems(items: PinnedItemMetadata[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("hearth_pinned_items_v2", JSON.stringify(items));
    window.dispatchEvent(new Event("hearth_pins_updated"));
  } catch (e) {
    console.error("Failed to save pinned items:", e);
  }
}

export function PinButton({
  itemId,
  itemTitle,
  itemCategory,
  itemType,
  itemUrl,
  itemIcon,
  className = "",
  variant = "icon",
}: PinButtonProps) {
  const { toast } = useToast();
  const [isPinned, setIsPinned] = useState(false);

  useEffect(() => {
    const checkPinState = () => {
      const items = getPinnedItems();
      setIsPinned(items.some((p) => p.id === itemId));
    };

    checkPinState();
    window.addEventListener("hearth_pins_updated", checkPinState);
    return () => window.removeEventListener("hearth_pins_updated", checkPinState);
  }, [itemId]);

  const togglePin = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const items = getPinnedItems();
    const existingIndex = items.findIndex((p) => p.id === itemId);

    let nextItems: PinnedItemMetadata[];
    let pinnedNow = false;

    if (existingIndex >= 0) {
      nextItems = items.filter((p) => p.id !== itemId);
    } else {
      nextItems = [
        ...items,
        {
          id: itemId,
          title: itemTitle,
          category: itemCategory,
          type: itemType,
          url: itemUrl,
          icon: itemIcon,
          pinnedAt: Date.now(),
        },
      ];
      pinnedNow = true;
    }

    savePinnedItems(nextItems);
    setIsPinned(pinnedNow);

    toast({
      type: pinnedNow ? "achievement" : "info",
      title: pinnedNow ? "Pinned to Dashboard! 📌" : "Unpinned Item",
      description: pinnedNow
        ? `"${itemTitle}" is pinned on Manuals and Dashboard.`
        : `"${itemTitle}" removed from pins.`,
    });
  };

  if (variant === "button") {
    return (
      <button
        type="button"
        onClick={togglePin}
        className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
          isPinned
            ? "bg-[#FEF3C7] border-[#D97706] text-[#D97706] shadow-2xs"
            : "bg-white border-[#E7E0D3] text-[#52635E] hover:border-[#1C2A26] hover:text-[#1C2A26]"
        } ${className}`}
        title={isPinned ? "Unpin from Dashboard" : "Pin to Dashboard"}
      >
        <Pin className={`w-3.5 h-3.5 ${isPinned ? "fill-current text-[#D97706]" : ""}`} />
        <span>{isPinned ? "Pinned" : "Pin"}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={togglePin}
      className={`p-2 rounded-xl transition-all ${
        isPinned
          ? "bg-[#FEF3C7] text-[#D97706] border border-[#D97706]/40 shadow-2xs"
          : "bg-white/80 text-[#8A9B95] hover:text-[#D97706] hover:bg-white border border-[#E7E0D3]"
      } ${className}`}
      title={isPinned ? "Unpin from Dashboard" : "Pin to Dashboard"}
    >
      <Pin className={`w-4 h-4 ${isPinned ? "fill-current text-[#D97706]" : ""}`} />
    </button>
  );
}
