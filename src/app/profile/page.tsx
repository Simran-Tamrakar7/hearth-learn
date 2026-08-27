"use client";

/* PAGE: /profile  — this file is the screen. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { useSession } from "next-auth/react";
import { PERMISSION_LABELS, PERMISSION_KEYS, parsePermissions, type Permissions } from "@/lib/permissions";
import {
  Flame,
  Trophy,
  Clock,
  CheckCircle2,
  ShieldCheck,
  Pencil,
} from "lucide-react";

interface BadgeData {
  id: string;
  name: string;
  title: string;
  description: string;
  icon: string;
  earnedAt: string;
}

interface ProfileUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role?: string;
  status?: string;
  permissions?: Permissions | string;
  createdAt: string;
  streak: { currentCount: number; longestCount: number };
  badges: BadgeData[];
  totalChaptersDone: number;
  totalHoursStudied: string;
}

function initials(name?: string | null, email?: string | null) {
  const src = (name || email || "?").trim();
  const parts = src.split(/[\s@]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

export default function ProfilePage() {
  const { toast } = useToast();
  const { status } = useSession();
  const [user, setUser] = useState<ProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/api/user/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          setName(data.user.name || "");
          setImage(data.user.image || "");
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  async function saveProfile() {
    const res = await fetch("/api/user/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image, ...(password.length >= 4 ? { password } : {}) }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      toast({ type: "error", title: "Could not save profile", description: data.error || "Try again." });
      return;
    }
    setUser((prev) => (prev ? { ...prev, name: data.user.name, image: data.user.image } : prev));
    setPassword("");
    setEditing(false);
    toast({ type: "success", title: "Profile updated" });
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF8F3]">
        <Navbar />
        <div className="max-w-4xl mx-auto p-8 space-y-6">
          <div className="h-20 bg-white rounded-2xl animate-pulse" />
          <div className="h-64 bg-white rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  if (status === "unauthenticated" || !user) {
    return (
      <div className="min-h-screen bg-[#FBF8F3]">
        <Navbar />
        <main className="max-w-lg mx-auto px-6 py-16">
          <h1 className="font-serif-display text-2xl font-bold">Sign in to view your profile</h1>
        </main>
      </div>
    );
  }

  const perms = parsePermissions(user.permissions, user.role);
  const letters = initials(user.name, user.email);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 w-full space-y-10 flex-1">
        <Card variant="glass" hoverable={false} className="p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#1C2A26] text-[#D97706] flex items-center justify-center font-bold text-2xl shadow-sm">
              {user.image ? <img src={user.image} alt="" className="h-full w-full object-cover" /> : letters}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">{user.name || user.email}</h1>
                <Badge variant="amber" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
                  Active Cabin Member
                </Badge>
              </div>
              <p className="text-xs text-[#52635E] mt-0.5">{user.email}</p>
              <p className="text-[11px] text-[#8A9B95] mt-1">
                Cabin member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={() => setEditing((v) => !v)} leftIcon={<Pencil className="w-4 h-4" />}>
            {editing ? "Close editor" : "Edit Profile"}
          </Button>
        </Card>

        {editing ? (
          <Card variant="default" hoverable={false} className="p-6 space-y-3">
            <h2 className="font-serif-display text-lg font-bold">Edit Profile</h2>
            <label className="block text-xs font-semibold text-[#52635E]">Name
              <input className="mt-1 w-full h-11 px-3 rounded-xl border border-[#E7E0D3]" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label className="block text-xs font-semibold text-[#52635E]">Avatar URL
              <input className="mt-1 w-full h-11 px-3 rounded-xl border border-[#E7E0D3]" value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://…" />
            </label>
            <label className="block text-xs font-semibold text-[#52635E]">New password (optional)
              <div className="mt-1">
                <PasswordInput
                  value={password}
                  onChange={setPassword}
                  placeholder="Leave blank to keep current"
                  autoComplete="new-password"
                />
              </div>
            </label>
            <div className="flex gap-2">
              <Button variant="primary" size="sm" onClick={() => void saveProfile()}>Save</Button>
              <Button variant="outline" size="sm" onClick={() => setEditing(false)}>Cancel</Button>
            </div>
          </Card>
        ) : null}

        <Card variant="default" hoverable={false} className="p-6 space-y-2">
          <h2 className="font-serif-display text-lg font-bold">Account</h2>
          <p className="text-sm">Role: <strong>{user.role || "USER"}</strong></p>
          <p className="text-sm">Date joined: {new Date(user.createdAt).toLocaleDateString()}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            {PERMISSION_KEYS.map((key) => (
              <span key={key} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${perms[key] ? "bg-[#1C2A26] text-[#FAF7F2] border-[#1C2A26]" : "bg-white text-[#8A9B95] border-[#E7E0D3]"}`}>
                {PERMISSION_LABELS[key]}: {perms[key] ? "on" : "off"}
              </span>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Card variant="subtle" hoverable={false} className="p-6 space-y-2 text-center">
            <Flame className="w-6 h-6 text-[#D97706] mx-auto" />
            <span className="font-serif-display text-3xl font-bold text-[#1C2A26]">{user.streak?.currentCount || 0} Days</span>
            <span className="text-xs text-[#52635E] block font-medium">Current Habit Streak</span>
          </Card>
          <Card variant="subtle" hoverable={false} className="p-6 space-y-2 text-center">
            <CheckCircle2 className="w-6 h-6 text-[#2D4A43] mx-auto" />
            <span className="font-serif-display text-3xl font-bold text-[#1C2A26]">{user.totalChaptersDone || 0}</span>
            <span className="text-xs text-[#52635E] block font-medium">Chapters Completed</span>
          </Card>
          <Card variant="subtle" hoverable={false} className="p-6 space-y-2 text-center">
            <Clock className="w-6 h-6 text-[#D97706] mx-auto" />
            <span className="font-serif-display text-3xl font-bold text-[#1C2A26]">{user.totalHoursStudied || "0"} Hours</span>
            <span className="text-xs text-[#52635E] block font-medium">Total Quiet Study Time</span>
          </Card>
        </div>

        <div className="space-y-4">
          <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
            <Trophy className="w-5 h-5 text-[#D97706]" />
            Unlocked Achievement Badges ({user.badges.length})
          </h2>
          {user.badges.length === 0 ? (
            <p className="text-sm text-[#8A9B95]">No badges yet — complete chapters to earn them.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {user.badges.map((b) => (
                <Card key={b.id} variant="default" hoverable={false} className="p-6 space-y-3 bg-white">
                  <div className="flex justify-between items-start">
                    <Badge variant="pine">{b.title}</Badge>
                    <span className="text-[10px] text-[#8A9B95]">{new Date(b.earnedAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="font-serif-display font-bold text-base text-[#1C2A26]">{b.title}</h3>
                  <p className="text-xs text-[#52635E] leading-relaxed">{b.description}</p>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
