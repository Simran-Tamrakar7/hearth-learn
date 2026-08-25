"use client";

/* ============================================================================
 * HEADING: SHARED — Providers
 * Not a page. These pages all use this same file:
 *   EVERY page (wired from src/app/layout.tsx)
 * Session + theme + toasts.
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { ToastContainer } from "./ui/Toast";
import { ThemeProvider } from "@/context/ThemeContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </SessionProvider>
  );
}
