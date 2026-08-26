"use client";

/* ============================================================================
 * HEADING: SHARED — Providers
 * Not a page. These pages all use this same file:
 *   EVERY page (wired from src/app/layout.tsx)
 * Session + theme + toasts.
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { ToastContainer } from "./ui/Toast";
import { ThemeProvider } from "@/context/ThemeContext";
import { setAppUserId } from "@/lib/userScope";

function UserScopeSync() {
  const { data, status } = useSession();
  useEffect(() => {
    if (status === "loading") return;
    setAppUserId(data?.user?.id || "anon");
  }, [data?.user?.id, status]);
  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <UserScopeSync />
      <ThemeProvider>
        {children}
        <ToastContainer />
      </ThemeProvider>
    </SessionProvider>
  );
}
