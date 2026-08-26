"use client";

/* ============================================================================
 * HEADING: SHARED — Navbar
 * Not a page. These pages all use this same file:
 *   /  /manuals  /manuals/[slug]  /library  /life-simulator  /toolkits
 *   /notes  /ai  /rest  /rest/games  /rest/cookbook  /rest/retro
 *   /showcase-wall  /dashboard  /profile  /settings  /tags  /certificates/[id]
 * Not used by /login or /showcase.
 * Changing this file changes all of those pages at once.
 * ========================================================================== */

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";
import {
  Flame,
  Compass,
  BookOpen,
  Book,
  Coffee,
  Menu,
  X,
  LogOut,
  Settings as SettingsIcon,
  BrainCircuit,
  Globe,
  Sparkles,
  Shield,
} from "lucide-react";

function initials(name?: string | null, email?: string | null) {
  const src = (name || email || "?").trim();
  const parts = src.split(/[\s@]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { features } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isRestMode, setIsRestMode] = useState(false);

  const toggleRestMode = () => {
    const nextRest = !isRestMode;
    setIsRestMode(nextRest);
    if (nextRest) {
      document.body.classList.add("rest-mode");
    } else {
      document.body.classList.remove("rest-mode");
    }
  };

  const allNavLinks = [
    { href: "/manuals", label: "Manuals", icon: Compass, featureKey: null },
    { href: "/library", label: "Library", icon: Book, featureKey: "library" as const },
    { href: "/life-simulator", label: "Life Lab", icon: BrainCircuit, featureKey: "lifeLab" as const },
    { href: "/notes", label: "Notes", icon: BookOpen, featureKey: "notes" as const },
    { href: "/ai", label: "AI", icon: Sparkles, featureKey: "aiCoach" as const },
    { href: "/rest", label: "Break Room", icon: Coffee, featureKey: "breakRoom" as const },
    { href: "/showcase-wall", label: "Showcase Wall", icon: Globe, featureKey: null },
    { href: "/settings", label: "Settings", icon: SettingsIcon, featureKey: null },
  ];

  const navLinks = [
    ...allNavLinks.filter((link) => link.featureKey === null || features[link.featureKey]),
    ...(session?.user?.role === "ADMIN" ? [{ href: "/admin", label: "Admin", icon: Shield, featureKey: null }] : []),
  ];

  const avatar = session?.user?.image;
  const letters = initials(session?.user?.name, session?.user?.email);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7E0D3] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-xl bg-[#1C2A26] flex items-center justify-center text-[#D97706] shadow-xs group-hover:scale-105 transition-transform">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif-display font-bold text-lg text-[#1C2A26] tracking-tight leading-none">
              Hearth
            </span>
            <span className="text-[10px] font-sans text-[#8A9B95] tracking-widest uppercase">
              Study Cabin
            </span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  isActive
                    ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs font-bold"
                    : "text-[#52635E] hover:text-[#1C2A26] hover:bg-[#EFE8DC]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleRestMode}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border inline-flex items-center gap-1.5 ${
              isRestMode
                ? "bg-[#D97706] text-white border-[#D97706]"
                : "bg-white border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
            }`}
            title="Rest mode — dim the cabin lights"
            aria-label="Rest mode — dim the cabin lights"
          >
            <Coffee className="w-4 h-4" />
            <span className="hidden sm:inline">Rest</span>
          </button>

          {session?.user ? (
            <div className="hidden sm:flex items-center gap-2">
              <Link
                href="/profile"
                title="Profile"
                aria-label="Open profile"
                className={`h-9 w-9 rounded-full overflow-hidden border flex items-center justify-center text-[11px] font-bold shrink-0 ${
                  pathname === "/profile" ? "border-[#1C2A26] ring-2 ring-[#D97706]/40" : "border-[#E7E0D3]"
                }`}
              >
                {avatar ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="bg-[#1C2A26] text-[#D97706] h-full w-full flex items-center justify-center">{letters}</span>
                )}
              </Link>
              <button
                onClick={() => signOut()}
                className="p-2 text-[#52635E] hover:text-[#1C2A26] transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link href="/login" className="hidden sm:block">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#E7E0D3] text-[#1C2A26]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#FAF7F2] border-b border-[#E7E0D3] px-4 py-4 space-y-2"
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 ${
                    isActive
                      ? "bg-[#1C2A26] text-[#FAF7F2] font-bold"
                      : "text-[#52635E] hover:text-[#1C2A26] hover:bg-[#EFE8DC]"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
            {session?.user ? (
              <Link
                href="/profile"
                onClick={() => setMobileOpen(false)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 text-[#52635E]"
              >
                <span className="h-6 w-6 rounded-full bg-[#1C2A26] text-[#D97706] flex items-center justify-center text-[10px] font-bold">
                  {letters}
                </span>
                Profile
              </Link>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
