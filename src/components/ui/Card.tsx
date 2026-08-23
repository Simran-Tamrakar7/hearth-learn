"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface CardProps extends HTMLMotionProps<"div"> {
  hoverable?: boolean;
  variant?: "default" | "subtle" | "glass" | "rest";
  children: React.ReactNode;
  className?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Card({
  hoverable = true,
  variant = "default",
  children,
  className,
  imageSrc,
  imageAlt = "Card image",
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-white border-[#E7E0D3] text-[#1C2A26]",
    subtle: "bg-[#F5EFE6] border-[#E7E0D3] text-[#1C2A26]",
    glass: "bg-white/80 backdrop-blur-md border-[#E7E0D3] text-[#1C2A26]",
    rest: "bg-[#F5F2ED] border-[#E0D9CE] text-[#2A3633]",
  };

  return (
    <motion.div
      whileHover={
        hoverable
          ? {
              y: -3,
              scale: 1.008,
              boxShadow: "0 12px 24px -6px rgba(28, 42, 38, 0.08)",
            }
          : undefined
      }
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={twMerge(
        clsx(
          "group relative rounded-2xl border transition-colors duration-200 overflow-hidden",
          !imageSrc && !className?.includes("p-") && "p-5 sm:p-6",
          variantClasses[variant],
          className
        )
      )}
      {...props}
    >
      {imageSrc ? (
        <>
          <div className="relative w-full h-44 overflow-hidden bg-[#F5EFE6]">
            <motion.img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="p-4 sm:p-5">{children}</div>
        </>
      ) : (
        children
      )}
    </motion.div>
  );
}
