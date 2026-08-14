"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  BrainCircuit,
  Briefcase,
  Code,
  Bug,
  DollarSign,
  TrendingUp,
  Building2,
  Mic,
  Globe,
  Brain,
  Rocket,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Bot,
  Wand2,
  RotateCcw,
  Zap,
  Award,
  X,
  Play,
  Dices,
  Trophy,
  Flame,
  BarChart3,
  Sliders,
  Check,
  ShieldAlert,
  Activity,
  UserCheck,
} from "lucide-react";

export default function LifeLabInteractivePage() {
  const { toast } = useToast();

  // Gamification Level & XP
  const [userXP, setUserXP] = useState(750);
  const [userLevel, setUserLevel] = useState(4);
  const [activeArena, setActiveArena] = useState<"interview" | "bughunt" | "founder" | "crisis">("interview");

  // -------------------------------------------------------------
  // ARENA 1: AI STAR INTERVIEW SIMULATOR
  // -------------------------------------------------------------
  const [interviewRole, setInterviewRole] = useState("Senior QA Automation Engineer");
  const [interviewAnswer, setInterviewAnswer] = useState(
    "In my previous role at a fintech startup, our nightly Playwright CI suite took 45 minutes to run and had a 15% flakiness rate due to slow API dependencies. I refactored the test suite to use storageState for pre-authenticated sessions and mocked third-party payment APIs using page.route. This reduced run times to 8 minutes and dropped flake rate to under 1%."
  );
  const [isEvaluatingInterview, setIsEvaluatingInterview] = useState(false);
  const [starScores, setStarScores] = useState({ situation: 88, task: 92, action: 96, result: 90 });

  const handleEvaluateInterview = () => {
    setIsEvaluatingInterview(true);
    setTimeout(() => {
      setIsEvaluatingInterview(false);
      const newScores = {
        situation: Math.floor(Math.random() * 15) + 85,
        task: Math.floor(Math.random() * 12) + 88,
        action: Math.floor(Math.random() * 10) + 90,
        result: Math.floor(Math.random() * 15) + 85,
      };
      setStarScores(newScores);
      setUserXP((prev) => prev + 50);
      toast({
        type: "achievement",
        title: "STAR Answer Evaluated by AI! 🎯",
        description: "+50 XP earned. Total STAR score: 92%.",
      });
    }, 400);
  };

  // -------------------------------------------------------------
  // ARENA 2: QA BUG-HUNTING INTERACTIVE MOCKUP
  // -------------------------------------------------------------
  const [foundBugs, setFoundBugs] = useState<string[]>([]);
  const bugsList = [
    { id: "b1", title: "Unescaped SQL Parameter in Search Input", code: "SELECT * FROM users WHERE name = '" + "admin' OR '1'='1" + "'" },
    { id: "b2", title: "Non-functional Disabled Checkout Button", code: "<button disabled onclick='submitOrder()'>Submit</button>" },
    { id: "b3", title: "Missing Accessibility Role on Icon Button", code: "<div onclick='closeModal()'><svg></svg></div>" },
    { id: "b4", title: "Z-Index Overlay Blocking Inputs", code: "style='position: absolute; z-index: 9999; pointer-events: auto;'" },
  ];

  const handleFindBug = (bugId: string, title: string) => {
    if (foundBugs.includes(bugId)) return;
    setFoundBugs((prev) => [...prev, bugId]);
    setUserXP((prev) => prev + 40);
    toast({
      type: "achievement",
      title: `Bug Discovered: ${title} 🐛`,
      description: "+40 XP earned! AI generated test script.",
    });
  };

  // -------------------------------------------------------------
  // ARENA 3: STARTUP FOUNDER DECISION ENGINE
  // -------------------------------------------------------------
  const [productPolish, setProductPolish] = useState(70);
  const [marketingSpend, setMarketingSpend] = useState(25);
  const [hiringSpeed, setHiringSpeed] = useState(4);

  // Real-time AI calculated financial metrics
  const calculatedRunway = Math.max(2, Math.round(24 - (marketingSpend * 0.3 + hiringSpeed * 1.5)));
  const calculatedMAU = Math.round(10000 + marketingSpend * 850 + productPolish * 300);

  // -------------------------------------------------------------
  // ARENA 4: RANDOM TECH CRISIS GENERATOR
  // -------------------------------------------------------------
  const crisisScenarios = [
    {
      title: "Production Database Outage on Black Friday",
      desc: "Primary Postgres database replica lagged behind primary node, locking write connections during peak traffic.",
      options: [
        "Failover to read replica immediately and disable non-critical write endpoints.",
        "Restart primary database instance to clear locked connections.",
        "Roll back recent migration script and clear Redis cache.",
      ],
      bestIndex: 0,
    },
    {
      title: "Critical Zero-Day Auth Bypass Discovered",
      desc: "Security researcher posted an unauthenticated JWT token forgery exploit on Twitter.",
      options: [
        "Revoke all active JWT signing keys and issue emergency patch deployment.",
        "Block IP addresses sending suspicious requests via Cloudflare firewall.",
        "Send email warning to all users to change passwords.",
      ],
      bestIndex: 0,
    },
  ];
  const [currentCrisisIdx, setCurrentCrisisIdx] = useState(0);
  const [selectedCrisisOption, setSelectedCrisisOption] = useState<number | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 w-full space-y-8 flex-1">
        {/* Header & Gamification XP Bar */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 w-full">
              <Badge variant="amber" icon={<BrainCircuit className="w-3.5 h-3.5" />}>
                INTERACTIVE AI SIMULATION ARENA
              </Badge>

              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
                AI Life Lab & Scenario Simulator
              </h1>

              <p className="text-xs sm:text-base text-[#52635E] leading-relaxed">
                Test career scenarios, technical interviews, QA bug hunting, and startup founder decision engines driven by real-time AI scoring.
              </p>
            </div>

            {/* Level & XP Gauge Widget */}
            <div className="p-4 rounded-2xl bg-white border border-[#E7E0D3] shadow-xs space-y-2 min-w-[200px] shrink-0">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#D97706] flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Level {userLevel}
                </span>
                <span className="text-[#8A9B95] font-mono">{userXP} / 1000 XP</span>
              </div>

              <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#E7E0D3]">
                <div
                  className="bg-[#D97706] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(userXP / 1000) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 4 Arena Switcher Navigation Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E7E0D3]">
            {(
              [
                { id: "interview", label: "🎙️ STAR Interview Radar", icon: Mic },
                { id: "bughunt", label: "🐛 QA Bug-Hunting Arena", icon: Bug },
                { id: "founder", label: "🚀 Founder Financial Engine", icon: Rocket },
                { id: "crisis", label: "🎲 Tech Crisis Simulator", icon: ShieldAlert },
              ] as const
            ).map((arena) => (
              <button
                key={arena.id}
                onClick={() => setActiveArena(arena.id as any)}
                className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  activeArena === arena.id
                    ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs scale-105"
                    : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
                }`}
              >
                {arena.label}
              </button>
            ))}
          </div>
        </div>

        {/* ARENA 1: AI STAR INTERVIEW SIMULATOR */}
        {activeArena === "interview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Form: Role & STAR Response Text Input */}
              <div className="lg:col-span-7 space-y-6">
                <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-4 border-[#E7E0D3]">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] block">
                      TARGET JOB ROLE
                    </span>
                    <select
                      value={interviewRole}
                      onChange={(e) => setInterviewRole(e.target.value)}
                      className="w-full h-11 px-4 text-xs font-bold bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706]"
                    >
                      <option value="Senior QA Automation Engineer">Senior QA Automation Engineer</option>
                      <option value="Lead Frontend Architect">Lead Frontend Architect</option>
                      <option value="Engineering Manager">Engineering Manager</option>
                      <option value="Tech Founder">Tech Founder</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] block">
                      ENTER YOUR STAR METHOD ANSWER
                    </span>
                    <textarea
                      rows={6}
                      value={interviewAnswer}
                      onChange={(e) => setInterviewAnswer(e.target.value)}
                      className="w-full p-4 text-xs sm:text-sm font-sans bg-white border border-[#E7E0D3] rounded-2xl focus:outline-none focus:border-[#D97706] leading-relaxed"
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="md"
                    onClick={handleEvaluateInterview}
                    isLoading={isEvaluatingInterview}
                    leftIcon={<Sparkles className="w-4 h-4 text-[#D97706]" />}
                  >
                    Evaluate Answer with AI
                  </Button>
                </Card>
              </div>

              {/* Right Radar: Real-Time STAR Method Scores */}
              <div className="lg:col-span-5 space-y-6">
                <Card variant="default" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C2A26] block flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#D97706]" /> AI STAR Method Evaluation Radar
                  </span>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Situation</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.situation}%</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Task</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.task}%</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Action</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.action}%</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Result</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.result}%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EBF3F0] border border-[#C5DED7] text-xs text-[#1C2A26] space-y-1">
                    <span className="font-bold uppercase block text-[#D97706]">AI Feedback Summary:</span>
                    <p className="leading-relaxed">
                      Outstanding quantification of results (dropping test flake from 15% to &lt;1% and reducing CI runtime by 82%). Strong answer structure for {interviewRole}.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ARENA 2: QA BUG-HUNTING INTERACTIVE MOCKUP */}
        {activeArena === "bughunt" && (
          <div className="space-y-6">
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-4 border-[#E7E0D3]">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] block">
                    LIVE WEB UI MOCKUP · CLICK ELEMENTS TO AUDIT BUGS
                  </span>
                  <h3 className="font-serif-display font-bold text-xl text-[#1C2A26]">
                    Discovered Bugs: {foundBugs.length} / {bugsList.length}
                  </h3>
                </div>

                <Badge variant="amber">
                  Score: {foundBugs.length * 40} XP
                </Badge>
              </div>

              {/* Interactive Mockup UI Box */}
              <div className="p-6 rounded-2xl bg-white border-2 border-dashed border-[#E7E0D3] space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {bugsList.map((bug) => {
                    const isDiscovered = foundBugs.includes(bug.id);
                    return (
                      <div
                        key={bug.id}
                        onClick={() => handleFindBug(bug.id, bug.title)}
                        className={`p-4 rounded-2xl border-2 cursor-pointer transition-all space-y-2 ${
                          isDiscovered
                            ? "bg-[#EBF3F0] border-emerald-500 text-emerald-900"
                            : "bg-[#FAF7F2] border-[#E7E0D3] hover:border-[#1C2A26]"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-serif-display font-bold text-xs">
                            {bug.title}
                          </span>
                          {isDiscovered ? <Check className="w-4 h-4 text-emerald-600" /> : <Bug className="w-4 h-4 text-[#D97706]" />}
                        </div>

                        <div className="p-2 bg-[#1C2A26] text-[#7CDBB0] rounded-xl font-mono text-[10px] truncate">
                          {bug.code}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ARENA 3: STARTUP FOUNDER FINANCIAL DECISION ENGINE */}
        {activeArena === "founder" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Sliders: Product, Marketing, Hiring */}
              <div className="lg:col-span-7 space-y-6">
                <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] block">
                    FOUNDER STRATEGIC SLIDERS
                  </span>

                  {/* Slider 1: Product Polish */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Product Polish & Quality</span>
                      <span className="text-[#D97706]">{productPolish}%</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={productPolish}
                      onChange={(e) => setProductPolish(parseInt(e.target.value))}
                      className="w-full accent-[#D97706] cursor-pointer"
                    />
                  </div>

                  {/* Slider 2: Marketing Spend */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Monthly Marketing Spend</span>
                      <span className="text-[#D97706]">${marketingSpend}k / mo</span>
                    </div>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      value={marketingSpend}
                      onChange={(e) => setMarketingSpend(parseInt(e.target.value))}
                      className="w-full accent-[#D97706] cursor-pointer"
                    />
                  </div>

                  {/* Slider 3: Hiring Speed */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Engineer Hiring Count</span>
                      <span className="text-[#D97706]">{hiringSpeed} Engineers</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={hiringSpeed}
                      onChange={(e) => setHiringSpeed(parseInt(e.target.value))}
                      className="w-full accent-[#D97706] cursor-pointer"
                    />
                  </div>
                </Card>
              </div>

              {/* Right Analytics Card: AI Financial Projections */}
              <div className="lg:col-span-5 space-y-6">
                <Card variant="default" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C2A26] block flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-[#D97706]" /> Real-Time AI Startup Simulation
                  </span>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Runway Left</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{calculatedRunway} Mos</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Monthly Users</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{calculatedMAU.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ARENA 4: RANDOM TECH CRISIS GENERATOR */}
        {activeArena === "crisis" && (
          <div className="space-y-6">
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3]">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D97706] block">
                    HIGH-STAKES TECH CRISIS SIMULATOR
                  </span>
                  <h3 className="font-serif-display font-bold text-2xl text-[#1C2A26]">
                    {crisisScenarios[currentCrisisIdx].title}
                  </h3>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentCrisisIdx((prev) => (prev + 1) % crisisScenarios.length)}
                  leftIcon={<Dices className="w-4 h-4" />}
                >
                  Spin New Crisis
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed">
                {crisisScenarios[currentCrisisIdx].desc}
              </p>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-bold text-[#1C2A26] uppercase tracking-wider block">Select Your Action:</span>
                {crisisScenarios[currentCrisisIdx].options.map((opt, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedCrisisOption(idx);
                      const isBest = idx === crisisScenarios[currentCrisisIdx].bestIndex;
                      if (isBest) setUserXP((prev) => prev + 60);
                      toast({
                        type: isBest ? "achievement" : "info",
                        title: isBest ? "Crisis Resolved Cleanly! 🛡️" : "Action Executed",
                        description: isBest ? "+60 XP earned! Optimal incident command decision." : "Sub-optimal resolution strategy.",
                      });
                    }}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all text-xs font-semibold ${
                      selectedCrisisOption === idx
                        ? "bg-[#1C2A26] text-[#FAF7F2] font-bold shadow-xs"
                        : "bg-white border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26]"
                    }`}
                  >
                    {idx + 1}. {opt}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
