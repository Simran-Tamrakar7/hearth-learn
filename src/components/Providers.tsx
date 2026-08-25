"use client";

/* SHARED: session + theme + toasts. Wired from src/app/layout.tsx */

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
