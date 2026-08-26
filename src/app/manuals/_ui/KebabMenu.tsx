"use client";

import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";

export type KebabItem = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  danger?: boolean;
};

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
