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
import { Badge } from "@/components/ui/Badge";
import { useTheme } from "@/context/ThemeContext";
import {
  Flame,
  Compass,
  LayoutDashboard,
  BookOpen,
  Book,
  Coffee,
  User,
  Menu,
  X,
  LogOut,
  Settings as SettingsIcon,
  BrainCircuit,
  Globe,
  Sparkles,
  Shield,
} from "lucide-react";

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

  // Dynamic Filtering based on Settings -> Features Toggles
  const allNavLinks = [
    { href: "/manuals", label: "Manuals", icon: Compass, featureKey: null },
    { href: "/library", label: "Library", icon: Book, featureKey: "library" as const },
    { href: "/life-simulator", label: "Life Lab", icon: BrainCircuit, featureKey: "lifeLab" as const },
    { href: "/notes", label: "Notes", icon: BookOpen, featureKey: "notes" as const },
    { href: "/ai", label: "AI", icon: Sparkles, featureKey: "aiCoach" as const },
    { href: "/rest", label: "Break Room", icon: Coffee, featureKey: "breakRoom" as const },
    { href: "/showcase-wall", label: "Showcase Wall", icon: Globe, featureKey: null },
    { href: "/profile", label: "Profile", icon: User, featureKey: null },
    { href: "/settings", label: "Settings", icon: SettingsIcon, featureKey: null },
  ];

  const navLinks = [
    ...allNavLinks.filter((link) => link.featureKey === null || features[link.featureKey]),
    ...(session?.user?.role === "ADMIN" ? [{ href: "/admin", label: "Admin", icon: Shield, featureKey: null }] : []),
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E7E0D3] transition-colors">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 h-16 flex items-center justify-between">
        {/* Brand Logo */}
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

        {/* Desktop Nav Links */}
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

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleRestMode}
            className={`p-2 rounded-xl text-xs font-bold transition-all border ${
              isRestMode
                ? "bg-[#D97706] text-white border-[#D97706]"
                : "bg-white border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
            }`}
            title="Toggle Rest Mode"
          >
            <Coffee className="w-4 h-4" />
          </button>

          {session?.user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold text-[#1C2A26]">
                {session.user.name || session.user.email?.split("@")[0]}
                {session.user.role === "ADMIN" ? (
                  <span className="ml-1.5 text-[10px] font-bold uppercase tracking-wider text-[#D97706]">Admin</span>
                ) : null}
              </span>
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

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-xl border border-[#E7E0D3] text-[#1C2A26]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
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
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
