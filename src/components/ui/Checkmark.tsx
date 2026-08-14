"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";

export interface CheckmarkProps {
  checked: boolean;
  onToggle?: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

export function Checkmark({
  checked,
  onToggle,
  size = "md",
  className,
  disabled = false,
}: CheckmarkProps) {
  const sizeMap = {
    sm: "w-5 h-5",
    md: "w-6 h-6",
    lg: "w-8 h-8",
  };

  const svgSize = {
    sm: 16,
    md: 20,
    lg: 26,
  };

  return (
    <motion.button
      type="button"
      onClick={disabled ? undefined : onToggle}
      whileTap={disabled ? undefined : { scale: 0.88 }}
      transition={{ type: "spring", stiffness: 500, damping: 25 }}
      disabled={disabled}
      className={clsx(
        "relative shrink-0 flex items-center justify-center rounded-full border-2 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706]",
        checked
          ? "bg-[#1C2A26] border-[#1C2A26] text-white"
          : "bg-white border-[#D4CBBB] hover:border-[#1C2A26] text-transparent",
        disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer",
        sizeMap[size],
        className
      )}
      aria-label={checked ? "Mark uncompleted" : "Mark completed"}
    >
      {checked && (
        <svg
          width={svgSize[size]}
          height={svgSize[size]}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="animate-checkmark"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </motion.button>
  );
}
