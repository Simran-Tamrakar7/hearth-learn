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

import React, { useEffect, useRef, useState } from "react";
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
  User,
} from "lucide-react";

function initials(name?: string | null, email?: string | null) {
  const src = (name || email || "?").trim();
  const parts = src.split(/[\s@]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { features } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const isAdmin = session?.user?.role === "ADMIN";

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const allNavLinks = [
    { href: "/manuals", label: "Manuals", icon: Compass, featureKey: null },
    { href: "/library", label: "Library", icon: Book, featureKey: "library" as const },
    { href: "/life-simulator", label: "Life Lab", icon: BrainCircuit, featureKey: "lifeLab" as const },
    { href: "/notes", label: "Notes", icon: BookOpen, featureKey: "notes" as const },
    { href: "/ai", label: "AI", icon: Sparkles, featureKey: "aiCoach" as const },
    { href: "/showcase-wall", label: "Showcase Wall", icon: Globe, featureKey: null },
  ];

  const navLinks = allNavLinks.filter(
    (link) => link.featureKey === null || features[link.featureKey]
  );

  const restOn = features.breakRoom !== false;
  const restActive = pathname === "/rest" || pathname.startsWith("/rest/");
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
          {restOn ? (
            <Link
              href="/rest"
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all border inline-flex items-center gap-1.5 ${
                restActive
                  ? "bg-[#1C2A26] text-[#FAF7F2] border-[#1C2A26]"
                  : "bg-white border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
              }`}
              title="Break Room"
              aria-label="Open Break Room"
            >
              <Coffee className="w-4 h-4" />
              <span className="hidden sm:inline">Rest</span>
            </Link>
          ) : null}

          {status === "loading" ? (
            <div className="hidden sm:block h-9 w-9 rounded-full bg-[#E7E0D3] animate-pulse" aria-hidden />
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  title="Account"
                  aria-label="Open account menu"
                  aria-expanded={menuOpen}
                  className={`h-9 w-9 rounded-full overflow-hidden border flex items-center justify-center text-[11px] font-bold shrink-0 ${
                    pathname === "/profile" || pathname === "/admin" || pathname.startsWith("/settings")
                      ? "border-[#1C2A26] ring-2 ring-[#D97706]/40"
                      : "border-[#E7E0D3]"
                  }`}
                >
                  {avatar ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={avatar} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="bg-[#1C2A26] text-[#D97706] h-full w-full flex items-center justify-center">
                      {letters}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {menuOpen ? (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute right-0 mt-2 w-48 rounded-2xl border border-[#E7E0D3] bg-white shadow-lg py-1 z-50"
                    >
                      <Link
                        href="/profile"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#52635E] hover:bg-[#FAF7F2] hover:text-[#1C2A26]"
                      >
                        <User className="w-3.5 h-3.5" /> Profile
                      </Link>
                      {isAdmin ? (
                        <Link
                          href="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#52635E] hover:bg-[#FAF7F2] hover:text-[#1C2A26]"
                        >
                          <Shield className="w-3.5 h-3.5" /> Admin
                        </Link>
                      ) : null}
                      <Link
                        href="/settings"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#52635E] hover:bg-[#FAF7F2] hover:text-[#1C2A26]"
                      >
                        <SettingsIcon className="w-3.5 h-3.5" /> Settings
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          setMenuOpen(false);
                          void signOut();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2.5 text-xs font-semibold text-[#52635E] hover:bg-[#FAF7F2] hover:text-[#1C2A26]"
                      >
                        <LogOut className="w-3.5 h-3.5" /> Sign out
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
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
            {restOn ? (
              <Link
                href="/rest"
                onClick={() => setMobileOpen(false)}
                className={`w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-3 ${
                  restActive
                    ? "bg-[#1C2A26] text-[#FAF7F2] font-bold"
                    : "text-[#52635E] hover:text-[#1C2A26] hover:bg-[#EFE8DC]"
                }`}
              >
                <Coffee className="w-4 h-4" /> Rest · Break Room
              </Link>
            ) : null}
            {!session?.user ? (
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-3 text-[#52635E] border border-[#E7E0D3]"
              >
                Sign In
              </Link>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
