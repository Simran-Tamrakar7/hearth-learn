"use client";

import React from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ProgressBarProps {
  value: number; // 0 to 100
  size?: "sm" | "md" | "lg";
  variant?: "amber" | "pine" | "emerald";
  showLabel?: boolean;
  className?: string;
  labelPosition?: "right" | "top";
  vertical?: boolean;
}

export function ProgressBar({
  value,
  size = "md",
  variant = "amber",
  showLabel = false,
  className,
  labelPosition = "right",
  vertical = false,
}: ProgressBarProps) {
  const clampedValue = Math.min(100, Math.max(0, value));

  const variantBar = {
    amber: "bg-[#D97706]",
    pine: "bg-[#1C2A26]",
    emerald: "bg-emerald-600",
  };

  const sizeClasses = {
    sm: vertical ? "w-1.5" : "h-1.5",
    md: vertical ? "w-2.5" : "h-2.5",
    lg: vertical ? "w-4" : "h-4",
  };

  if (vertical) {
    return (
      <div className={twMerge("flex flex-col items-center gap-2", className)}>
        <div
          className={clsx(
            "relative bg-[#E7E0D3] rounded-full overflow-hidden flex-1 w-2.5",
            sizeClasses[size]
          )}
        >
          <motion.div
            initial={{ height: "0%" }}
            animate={{ height: `${clampedValue}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={clsx("w-full rounded-full", variantBar[variant])}
          />
        </div>
        {showLabel && (
          <span className="text-xs font-semibold text-[#52635E]">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    );
  }

  return (
    <div className={twMerge("w-full", className)}>
      {showLabel && labelPosition === "top" && (
        <div className="flex justify-between items-center mb-1.5 text-xs text-[#52635E]">
          <span className="font-medium">Progress</span>
          <span className="font-semibold text-[#1C2A26]">
            {Math.round(clampedValue)}%
          </span>
        </div>
      )}

      <div className="flex items-center gap-3">
        <div
          className={clsx(
            "relative w-full bg-[#E7E0D3] rounded-full overflow-hidden",
            sizeClasses[size]
          )}
        >
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${clampedValue}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={clsx("h-full rounded-full", variantBar[variant])}
          />
        </div>

        {showLabel && labelPosition === "right" && (
          <span className="text-xs font-semibold text-[#52635E] min-w-[36px] text-right">
            {Math.round(clampedValue)}%
          </span>
        )}
      </div>
    </div>
  );
}
