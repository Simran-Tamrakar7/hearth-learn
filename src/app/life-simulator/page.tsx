"use client";

/* PAGE: /life-simulator  — this file is the screen. Scenarios: ./_content/. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/Badge";
import { listedArenas, type ArenaId } from "@/app/life-simulator/_content/_registry";
import { interviewRoles } from "@/app/life-simulator/_content/interview/meta";
import { ArenaStudio } from "@/app/life-simulator/_ui/ArenaStudio";
import { BrainCircuit, Trophy } from "lucide-react";

const XP_KEY = "hearth_lifelab_xp";

export default function LifeLabInteractivePage() {
  const arenas = listedArenas();
  const [activeArena, setActiveArena] = useState<ArenaId>(arenas[0]?.id ?? "interview");
  const [userXP, setUserXP] = useState(0);
  const [role, setRole] = useState(interviewRoles[0] || "Senior QA Automation Engineer");
  const [difficulty, setDifficulty] = useState("mid");
  const [focus, setFocus] = useState("core skills");

  useEffect(() => {
    try {
      const n = Number(localStorage.getItem(XP_KEY) || 0);
      if (Number.isFinite(n)) setUserXP(n);
    } catch {
      /* ignore */
    }
    fetch("/api/life-lab")
      .then((r) => r.json())
      .then((data) => {
        const attempts = Array.isArray(data.attempts) ? data.attempts : [];
        const sum = attempts.reduce((acc: number, a: { xp?: number }) => acc + Number(a.xp || 0), 0);
        if (sum) {
          setUserXP(sum);
          localStorage.setItem(XP_KEY, String(sum));
        }
      })
      .catch(() => {});
  }, []);

  const userLevel = Math.max(1, Math.floor(userXP / 300) + 1);

  function addXp(xp: number) {
    setUserXP((prev) => {
      const next = prev + xp;
      localStorage.setItem(XP_KEY, String(next));
      return next;
    });
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />
      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 w-full space-y-8 flex-1">
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 w-full">
              <Badge variant="amber" icon={<BrainCircuit className="w-3.5 h-3.5" />}>
                INTERACTIVE AI LIFE LAB · 6 SIMULATOR ARENAS
              </Badge>
              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold tracking-tight">AI Life Lab & Career Simulators</h1>
              <p className="text-sm text-[#52635E] max-w-2xl">
                AI generates a fresh scenario for each arena. Evaluation scores the answer you actually wrote. XP follows that score — not a flat click bonus.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-[#E7E0D3] space-y-2 min-w-[220px]">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#D97706] flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Level {userLevel}
                </span>
                <span className="text-[#8A9B95] font-mono">{userXP} XP</span>
              </div>
              <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#E7E0D3]">
                <div className="bg-[#D97706] h-full" style={{ width: `${Math.min(100, (userXP % 300) / 3)}%` }} />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E7E0D3]">
            {arenas.map((arena) => (
              <button
                key={arena.id}
                onClick={() => setActiveArena(arena.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold ${
                  activeArena === arena.id ? "bg-[#1C2A26] text-[#FAF7F2]" : "bg-white border border-[#E7E0D3] text-[#52635E]"
                }`}
              >
                {arena.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className="text-xs font-semibold text-[#52635E]">Role
            <input className="mt-1 w-full h-10 px-3 rounded-xl border border-[#E7E0D3]" value={role} onChange={(e) => setRole(e.target.value)} list="lifelab-roles" />
            <datalist id="lifelab-roles">
              {interviewRoles.map((r) => (
                <option key={r} value={r} />
              ))}
            </datalist>
          </label>
          <label className="text-xs font-semibold text-[#52635E]">Difficulty
            <select className="mt-1 w-full h-10 px-3 rounded-xl border border-[#E7E0D3]" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </label>
          <label className="text-xs font-semibold text-[#52635E]">Focus area
            <input className="mt-1 w-full h-10 px-3 rounded-xl border border-[#E7E0D3]" value={focus} onChange={(e) => setFocus(e.target.value)} />
          </label>
        </div>

        <ArenaStudio key={activeArena} arenaId={activeArena} role={role} difficulty={difficulty} focus={focus} onXp={addXp} />
      </main>
    </div>
  );
}
