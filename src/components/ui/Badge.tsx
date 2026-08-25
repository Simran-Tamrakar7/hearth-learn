"use client";

/* ============================================================================
 * HEADING: SHARED — Badge
 * Not a page. These pages all use this same file:
 *   /  /manuals  /manuals/[slug]  /library  /life-simulator  /toolkits  /notes  /ai
 *   /rest  /rest/games  /rest/cookbook  /rest/retro  /showcase-wall  /showcase
 *   /dashboard  /profile  /tags  /certificates/[id]
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "category" | "amber" | "pine" | "subtle" | "outline";
  size?: "sm" | "md";
  animateUnlock?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "category",
  size = "sm",
  animateUnlock = false,
  className,
  icon,
}: BadgeProps) {
  const variantStyles = {
    category:
      "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]/60 font-medium",
    amber:
      "bg-[#D97706] text-white font-medium shadow-sm shadow-[#D97706]/20",
    pine:
      "bg-[#EBF3F0] text-[#1C2A26] border border-[#C5DED7] font-medium",
    subtle:
      "bg-[#F5EFE6] text-[#52635E] border border-[#E7E0D3] font-medium",
    outline:
      "bg-transparent text-[#1C2A26] border border-[#E7E0D3] font-medium",
  };

  const sizeStyles = {
    sm: "px-2.5 py-1 text-xs rounded-full gap-1.5",
    md: "px-3.5 py-1.5 text-xs rounded-full gap-2",
  };

  if (animateUnlock) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        className="relative inline-flex"
      >
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.6, 0.2, 0],
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0 rounded-full bg-[#D97706]/40 blur-sm pointer-events-none"
        />
        <span
          className={twMerge(
            clsx(
              "inline-flex items-center justify-center tracking-wide",
              variantStyles[variant],
              sizeStyles[size],
              className
            )
          )}
        >
          {icon && <span className="shrink-0">{icon}</span>}
          {children}
        </span>
      </motion.div>
    );
  }

  return (
    <span
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center tracking-wide transition-colors duration-200",
          variantStyles[variant],
          sizeStyles[size],
          className
        )
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
