"use client";

/* ============================================================================
 * HEADING: SHARED — Button
 * Not a page. These pages all use this same file:
 *   /  /manuals/[slug]  /library  /life-simulator  /toolkits  /notes  /ai
 *   /rest  /rest/games  /rest/cookbook  /rest/retro  /showcase-wall  /showcase
 *   /dashboard  /profile  /settings  /login  /tags  /certificates/[id]
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  variant?: "primary" | "amber" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      fullWidth = false,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary:
        "bg-[#1C2A26] text-[#FAF7F2] hover:bg-[#2A3E39] shadow-sm shadow-[#1C2A26]/10 active:bg-[#15201D]",
      amber:
        "bg-[#D97706] text-white hover:bg-[#B45309] shadow-sm shadow-[#D97706]/20 active:bg-[#92400E]",
      secondary:
        "bg-[#F5EFE6] text-[#1C2A26] hover:bg-[#EBE3D7] border border-[#E7E0D3] active:bg-[#E0D7C9]",
      outline:
        "bg-transparent text-[#1C2A26] border border-[#E7E0D3] hover:border-[#1C2A26] hover:bg-[#F5EFE6]/50 active:bg-[#F5EFE6]",
      ghost:
        "bg-transparent text-[#52635E] hover:text-[#1C2A26] hover:bg-[#F5EFE6] active:bg-[#EBE3D7]",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs rounded-xl font-medium gap-1.5",
      md: "h-11 px-5 text-sm rounded-2xl font-semibold gap-2",
      lg: "h-13 px-7 text-base rounded-2xl font-semibold gap-2.5",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={disabled || isLoading ? undefined : { scale: 0.97 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        disabled={disabled || isLoading}
        className={twMerge(
          clsx(
            "relative inline-flex items-center justify-center transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none",
            variantStyles[variant],
            sizeStyles[size],
            fullWidth ? "w-full" : "",
            className
          )
        )}
        {...props}
      >
        {/* Fixed container for loading state to prevent width jumps */}
        <span
          className={clsx(
            "inline-flex items-center justify-center gap-2 transition-opacity duration-200",
            isLoading ? "opacity-0" : "opacity-100"
          )}
        >
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </span>

        {/* Loading Spinner */}
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin text-current" />
          </span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
