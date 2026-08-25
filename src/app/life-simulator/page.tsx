"use client";

/* PAGE: /life-simulator  — this file is the screen. Scenarios: content/life-simulator/. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { listedArenas, type ArenaId } from "@content/life-simulator/_registry";
import { bugsList } from "@content/life-simulator/bughunt/meta";
import { crisisScenarios } from "@content/life-simulator/crisis/meta";
import { interviewQuestion as defaultInterviewQuestion, interviewRoles, sampleAnswers } from "@content/life-simulator/interview/meta";
import { negotiationStrategies } from "@content/life-simulator/negotiation/meta";
import { refactorExamples } from "@content/life-simulator/refactor/meta";
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
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  DollarSign as MoneyIcon,
  RefreshCw,
} from "lucide-react";

export default function LifeLabInteractivePage() {
  const { toast } = useToast();

  // Gamification Level & XP
  const [userXP, setUserXP] = useState(820);
  const [userLevel, setUserLevel] = useState(4);
  const arenas = listedArenas();
  const [activeArena, setActiveArena] = useState<ArenaId>(arenas[0]?.id ?? "interview");

  // -------------------------------------------------------------
  // ARENA 1: AI STAR INTERVIEW SIMULATOR
  // -------------------------------------------------------------
  const [interviewRole, setInterviewRole] = useState("Senior QA Automation Engineer");
  const interviewQuestion = defaultInterviewQuestion;
  const [interviewAnswer, setInterviewAnswer] = useState(
    "In my previous role at a fintech startup, our nightly Playwright CI suite took 45 minutes to run and had a 15% flakiness rate due to slow API dependencies. I refactored the test suite to use storageState for pre-authenticated sessions and mocked third-party payment APIs using page.route. This reduced run times to 8 minutes and dropped flake rate to under 1%."
  );
  const [isEvaluatingInterview, setIsEvaluatingInterview] = useState(false);
  const [starScores, setStarScores] = useState({ situation: 88, task: 92, action: 96, result: 90 });

  const handleSelectRole = (role: string) => {
    setInterviewRole(role);
    if (sampleAnswers[role]) {
      setInterviewAnswer(sampleAnswers[role]);
    }
  };

  const handleEvaluateInterview = () => {
    setIsEvaluatingInterview(true);
    setTimeout(() => {
      setIsEvaluatingInterview(false);
      const newScores = {
        situation: Math.floor(Math.random() * 12) + 87,
        task: Math.floor(Math.random() * 10) + 89,
        action: Math.floor(Math.random() * 8) + 92,
        result: Math.floor(Math.random() * 12) + 88,
      };
      setStarScores(newScores);
      setUserXP((prev) => prev + 60);
      toast({
        type: "achievement",
        title: "STAR Answer Evaluated by AI! 🎯",
        description: "+60 XP earned. Total STAR score: 92%.",
      });
    }, 400);
  };

  // -------------------------------------------------------------
  // ARENA 2: QA BUG-HUNTING INTERACTIVE MOCKUP
  // -------------------------------------------------------------
  const [foundBugs, setFoundBugs] = useState<string[]>([]);

  const handleFindBug = (bugId: string, title: string) => {
    if (foundBugs.includes(bugId)) return;
    setFoundBugs((prev) => [...prev, bugId]);
    setUserXP((prev) => prev + 45);
    toast({
      type: "achievement",
      title: `Bug Discovered: ${title} 🐛`,
      description: "+45 XP earned! Auto-generated Playwright test script.",
    });
  };

  // -------------------------------------------------------------
  // ARENA 3: STARTUP FOUNDER DECISION ENGINE
  // -------------------------------------------------------------
  const [productPolish, setProductPolish] = useState(75);
  const [marketingSpend, setMarketingSpend] = useState(30);
  const [hiringSpeed, setHiringSpeed] = useState(5);
  const [testCoverage, setTestCoverage] = useState(85);

  const calculatedRunway = Math.max(2, Math.round(26 - (marketingSpend * 0.35 + hiringSpeed * 1.6)));
  const calculatedMAU = Math.round(12000 + marketingSpend * 920 + productPolish * 350);
  const calculatedMRR = Math.round((calculatedMAU * 0.04) * 49);
  const calculatedFlakeRisk = Math.max(1, Math.round(100 - testCoverage));

  const handleSimulateGrowth = () => {
    setUserXP((prev) => prev + 75);
    toast({
      type: "achievement",
      title: "1-Year Startup Growth Simulated! 🚀",
      description: `Runway: ${calculatedRunway} months. Monthly Revenue: $${calculatedMRR.toLocaleString()}.`,
    });
  };

  // -------------------------------------------------------------
  // ARENA 4: P0 PRODUCTION OUTAGE CRISIS WAR ROOM
  // -------------------------------------------------------------
  const [currentCrisisIdx, setCurrentCrisisIdx] = useState(0);
  const [selectedCrisisOption, setSelectedCrisisOption] = useState<number | null>(null);

  const handleSelectCrisisOption = (optIdx: number) => {
    setSelectedCrisisOption(optIdx);
    const crisis = crisisScenarios[currentCrisisIdx];
    if (optIdx === crisis.bestIndex) {
      setUserXP((prev) => prev + 80);
      toast({
        type: "achievement",
        title: "P0 Outage Resolved! 🛡️",
        description: "+80 XP earned. Optimal incident response executed.",
      });
    } else {
      toast({
        type: "info",
        title: "Sub-optimal Incident Action ⚠️",
        description: "Action mitigated partial load, but optimal failover strategy was required.",
      });
    }
  };

  // -------------------------------------------------------------
  // ARENA 5: AI CAREER & SALARY NEGOTIATION SIMULATOR
  // -------------------------------------------------------------
  const [baseOffer, setBaseOffer] = useState(160000);
  const [equityVal, setEquityVal] = useState(40000);
  const [remotePerk, setRemotePerk] = useState("Full Remote + $2k Home Office Stipend");
  const [strategy, setStrategy] = useState("Balanced Value Counter");

  const calculatedCounterPackage = Math.round(baseOffer * 1.15 + equityVal * 1.2);
  const recruiterProbability = Math.min(95, Math.round(75 + (baseOffer < 180000 ? 15 : 5)));

  const handleSimulateNegotiation = () => {
    setUserXP((prev) => prev + 50);
    toast({
      type: "achievement",
      title: "Salary Counter-Offer Simulated! 💼",
      description: `Target Package: $${calculatedCounterPackage.toLocaleString()} (${recruiterProbability}% Acceptance Probability).`,
    });
  };

  // -------------------------------------------------------------
  // ARENA 6: CODE REFACTORING & ARCHITECTURE SANDBOX
  // -------------------------------------------------------------
  const [selectedRefactorPattern, setSelectedRefactorPattern] = useState("Page Object Model");

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-8 w-full space-y-8 flex-1">
        {/* Header & Gamification XP Bar */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-3xl p-6 sm:p-10 space-y-6 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2 w-full">
              <Badge variant="amber" icon={<BrainCircuit className="w-3.5 h-3.5" />}>
                INTERACTIVE AI LIFE LAB · 6 SIMULATOR ARENAS
              </Badge>

              <h1 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#1C2A26] tracking-tight">
                AI Life Lab & Career Simulators
              </h1>

              <p className="text-xs sm:text-base text-[#52635E] leading-relaxed w-full">
                Interactive real-time simulators driven by AI scoring. Test technical STAR interviews, hunt QA vulnerabilities, manage a tech startup, resolve P0 production outages, negotiate compensation packages, and refactor legacy code architecture.
              </p>
            </div>

            {/* Level & XP Gauge Widget */}
            <div className="p-4 rounded-2xl bg-white border border-[#E7E0D3] shadow-xs space-y-2 min-w-[220px] shrink-0">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-[#D97706] flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> Level {userLevel} Architect
                </span>
                <span className="text-[#8A9B95] font-mono">{userXP} / 1200 XP</span>
              </div>

              <div className="w-full bg-[#FAF7F2] h-2 rounded-full overflow-hidden border border-[#E7E0D3]">
                <div
                  className="bg-[#D97706] h-full rounded-full transition-all duration-500"
                  style={{ width: `${(userXP / 1200) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* 6 Arena Switcher Navigation Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-[#E7E0D3]">
            {arenas.map((arena) => (
              <button
                key={arena.id}
                onClick={() => setActiveArena(arena.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeArena === arena.id
                    ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs scale-105"
                    : "bg-white border border-[#E7E0D3] text-[#52635E] hover:text-[#1C2A26] hover:bg-[#FAF7F2]"
                }`}
              >
                <span>{arena.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ARENA 1: AI STAR INTERVIEW SIMULATOR */}
        {activeArena === "interview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Form: Role & STAR Response Text Input */}
              <div className="lg:col-span-7 space-y-6">
                <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-5 border-[#E7E0D3] bg-white">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#D97706] flex items-center gap-1.5">
                      <Mic className="w-4 h-4" /> 1. SELECT TARGET ROLE
                    </span>
                    <span className="text-xs text-[#8A9B95]">AI Persona Active</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {interviewRoles.map((role) => (
                      <button
                        key={role}
                        onClick={() => handleSelectRole(role)}
                        className={`p-3 rounded-xl text-left text-xs font-bold border transition-all ${
                          interviewRole === role
                            ? "bg-[#1C2A26] text-white border-[#1C2A26]"
                            : "bg-[#FAF7F2] text-[#52635E] border-[#E7E0D3] hover:border-[#D97706]"
                        }`}
                      >
                        {role.split(" ")[0]} {role.split(" ")[1]}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E] block">
                      INTERVIEW QUESTION
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-[#1C2A26] p-3 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3]">
                      &quot;{interviewQuestion}&quot;
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#52635E]">
                        YOUR STAR METHOD RESPONSE (SITUATION, TASK, ACTION, RESULT)
                      </span>
                      <button
                        onClick={() => setInterviewAnswer(sampleAnswers[interviewRole] || "")}
                        className="text-[11px] font-bold text-[#D97706] hover:underline"
                      >
                        Load Sample STAR Answer
                      </button>
                    </div>
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
                    Evaluate Answer with AI (+60 XP)
                  </Button>
                </Card>
              </div>

              {/* Right Radar: Real-Time STAR Method Scores */}
              <div className="lg:col-span-5 space-y-6">
                <Card variant="default" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1C2A26] block flex items-center gap-2">
                    <Activity className="w-4 h-4 text-[#D97706]" /> AI STAR Evaluation Breakdown
                  </span>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Situation (S)</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.situation}%</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Task (T)</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.task}%</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Action (A)</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.action}%</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3] space-y-1">
                      <span className="text-[10px] text-[#8A9B95] uppercase font-bold block">Result (R)</span>
                      <span className="font-serif-display font-bold text-2xl text-[#1C2A26]">{starScores.result}%</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#EBF3F0] border border-[#C5DED7] text-xs text-[#1C2A26] space-y-1">
                    <span className="font-bold uppercase block text-[#D97706]">AI Recruiter Feedback:</span>
                    <p className="leading-relaxed">
                      Outstanding quantification of results! Dropping test flakiness from 15% to &lt;1% and reducing CI runtime by 82% demonstrates quantifiable engineering impact for {interviewRole}.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* ARENA 2: QA BUG-HUNTING INTERACTIVE SANDBOX */}
        {activeArena === "bughunt" && (
          <div className="space-y-6">
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-display font-bold text-xl text-[#1C2A26] flex items-center gap-2">
                    <Bug className="w-5 h-5 text-[#D97706]" /> Interactive QA Vulnerability Inspector
                  </h3>
                  <p className="text-xs text-[#52635E]">
                    Click on any code flaw card to inspect, discover the vulnerability, and auto-generate Playwright automated test fixes.
                  </p>
                </div>

                <Badge variant="amber">Discovered: {foundBugs.length} / {bugsList.length} Bugs</Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bugsList.map((bug) => {
                  const isFound = foundBugs.includes(bug.id);
                  return (
                    <div
                      key={bug.id}
                      onClick={() => handleFindBug(bug.id, bug.title)}
                      className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                        isFound
                          ? "bg-emerald-50/80 border-emerald-300 text-emerald-900"
                          : "bg-[#FAF7F2] border-[#E7E0D3] text-[#1C2A26] hover:border-[#D97706] hover:shadow-md"
                      }`}
                    >
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded-md bg-white/80 border">
                          {bug.type}
                        </span>
                        {isFound ? (
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Check className="w-3.5 h-3.5" /> Discovered
                          </span>
                        ) : (
                          <span className="text-[#D97706] font-bold">+45 XP</span>
                        )}
                      </div>

                      <h4 className="font-bold text-sm leading-tight">{bug.title}</h4>

                      <pre className="text-[10px] font-mono p-2.5 rounded-xl bg-black/90 text-emerald-400 overflow-x-auto">
                        <code>{bug.code}</code>
                      </pre>

                      {isFound && (
                        <div className="pt-2 border-t border-emerald-200 text-[11px] space-y-1">
                          <span className="font-bold text-emerald-800 block">Auto-Generated Playwright Fix:</span>
                          <code className="text-[10px] font-mono text-emerald-950 block bg-emerald-100 p-2 rounded-lg">
                            {bug.fix}
                          </code>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}

        {/* ARENA 3: STARTUP FOUNDER STRATEGY ENGINE */}
        {activeArena === "founder" && (
          <div className="space-y-6">
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-display font-bold text-2xl text-[#1C2A26] flex items-center gap-2">
                    <Rocket className="w-5 h-5 text-[#D97706]" /> Software Founder Strategy Simulator
                  </h3>
                  <p className="text-xs text-[#52635E]">
                    Adjust your product polish, marketing spend, hiring velocity, and test coverage sliders to simulate 12-month startup metrics.
                  </p>
                </div>

                <Button variant="primary" size="md" onClick={handleSimulateGrowth} leftIcon={<Dices className="w-4 h-4" />}>
                  Simulate 1-Year Growth (+75 XP)
                </Button>
              </div>

              {/* Sliders Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Product Polish</span>
                    <span className="text-[#D97706]">{productPolish}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={productPolish}
                    onChange={(e) => setProductPolish(Number(e.target.value))}
                    className="w-full accent-[#D97706]"
                  />
                  <span className="text-[10px] text-[#8A9B95] block">Higher retention & lower churn</span>
                </div>

                <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Marketing Spend ($k/mo)</span>
                    <span className="text-[#D97706]">${marketingSpend}k</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="100"
                    value={marketingSpend}
                    onChange={(e) => setMarketingSpend(Number(e.target.value))}
                    className="w-full accent-[#D97706]"
                  />
                  <span className="text-[10px] text-[#8A9B95] block">Drives user acquisition</span>
                </div>

                <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
                  <div className="flex justify-between text-xs font-bold">
                    <span>Hiring Speed (Devs/mo)</span>
                    <span className="text-[#D97706]">{hiringSpeed} Eng</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    value={hiringSpeed}
                    onChange={(e) => setHiringSpeed(Number(e.target.value))}
                    className="w-full accent-[#D97706]"
                  />
                  <span className="text-[10px] text-[#8A9B95] block">Increases feature shipping velocity</span>
                </div>

                <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
                  <div className="flex justify-between text-xs font-bold">
                    <span>QA Test Coverage</span>
                    <span className="text-[#D97706]">{testCoverage}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="99"
                    value={testCoverage}
                    onChange={(e) => setTestCoverage(Number(e.target.value))}
                    className="w-full accent-[#D97706]"
                  />
                  <span className="text-[10px] text-[#8A9B95] block">Minimizes production outage risk</span>
                </div>
              </div>

              {/* Calculated Real-Time Metrics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-[#1C2A26] text-white">
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Cash Runway</span>
                  <span className="text-2xl font-serif-display font-bold text-amber-400">{calculatedRunway} Months</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Monthly Active Users</span>
                  <span className="text-2xl font-serif-display font-bold text-white">{calculatedMAU.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Monthly Revenue ($MRR)</span>
                  <span className="text-2xl font-serif-display font-bold text-emerald-400">${calculatedMRR.toLocaleString()}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Flake Outage Risk</span>
                  <span className="text-2xl font-serif-display font-bold text-rose-400">{calculatedFlakeRisk}%</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ARENA 4: P0 PRODUCTION OUTAGE WAR ROOM */}
        {activeArena === "crisis" && (
          <div className="space-y-6">
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-display font-bold text-2xl text-[#1C2A26] flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-rose-600" /> P0 Production Outage War Room
                  </h3>
                  <p className="text-xs text-[#52635E]">
                    Simulate real-time live production infrastructure failures and select the optimal mitigation action.
                  </p>
                </div>

                <div className="flex gap-2">
                  {crisisScenarios.map((c, idx) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCurrentCrisisIdx(idx);
                        setSelectedCrisisOption(null);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        currentCrisisIdx === idx
                          ? "bg-rose-900 text-white border-rose-900"
                          : "bg-[#FAF7F2] text-[#52635E] border-[#E7E0D3]"
                      }`}
                    >
                      Incident #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Crisis Detail */}
              {(() => {
                const crisis = crisisScenarios[currentCrisisIdx];

                return (
                  <div className="space-y-6 p-6 rounded-2xl bg-rose-50/60 border border-rose-200">
                    <div className="space-y-2">
                      <span className="px-3 py-1 rounded-full bg-rose-600 text-white text-[10px] font-bold uppercase tracking-wider">
                        CRITICAL P0 INCIDENT ACTIVE
                      </span>
                      <h4 className="font-serif-display font-bold text-xl text-rose-950">{crisis.title}</h4>
                      <p className="text-xs text-rose-900 leading-relaxed">{crisis.desc}</p>
                    </div>

                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-900 block">
                        SELECT MITIGATION INCIDENT ACTION:
                      </span>

                      <div className="space-y-2">
                        {crisis.options.map((optionText, optIdx) => {
                          const isSelected = selectedCrisisOption === optIdx;
                          const isBest = optIdx === crisis.bestIndex;

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectCrisisOption(optIdx)}
                              className={`w-full text-left p-4 rounded-xl text-xs font-bold transition-all border ${
                                isSelected
                                  ? isBest
                                    ? "bg-emerald-100 border-emerald-400 text-emerald-950"
                                    : "bg-amber-100 border-amber-400 text-amber-950"
                                  : "bg-white border-rose-200 text-rose-950 hover:bg-rose-100/50"
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <span className="w-5 h-5 rounded-full bg-rose-900 text-white flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                                  {optIdx + 1}
                                </span>
                                <span>{optionText}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {selectedCrisisOption !== null && (
                      <div className="p-4 rounded-xl bg-white border border-rose-300 text-xs text-[#1C2A26] space-y-1">
                        <span className="font-bold uppercase block text-emerald-700">AI Incident Post-Mortem Summary:</span>
                        <p className="leading-relaxed">{crisis.postMortem}</p>
                      </div>
                    )}
                  </div>
                );
              })()}
            </Card>
          </div>
        )}

        {/* ARENA 5: AI SALARY & EQUITY NEGOTIATION SIMULATOR */}
        {activeArena === "negotiation" && (
          <div className="space-y-6">
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-display font-bold text-2xl text-[#1C2A26] flex items-center gap-2">
                    <MoneyIcon className="w-5 h-5 text-emerald-600" /> Compensation & Counter-Offer Simulator
                  </h3>
                  <p className="text-xs text-[#52635E]">
                    Simulate salary counter-offers, equity trade-offs, and recruiter acceptance probabilities.
                  </p>
                </div>

                <Button variant="primary" size="md" onClick={handleSimulateNegotiation} leftIcon={<Sparkles className="w-4 h-4" />}>
                  Simulate Counter-Offer (+50 XP)
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
                  <span className="text-xs font-bold text-[#1C2A26]">Base Salary Offer</span>
                  <input
                    type="range"
                    min="120000"
                    max="240000"
                    step="5000"
                    value={baseOffer}
                    onChange={(e) => setBaseOffer(Number(e.target.value))}
                    className="w-full accent-[#D97706]"
                  />
                  <span className="text-lg font-bold text-[#D97706] block">${baseOffer.toLocaleString()} / yr</span>
                </div>

                <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
                  <span className="text-xs font-bold text-[#1C2A26]">Equity / RSUs Grant</span>
                  <input
                    type="range"
                    min="10000"
                    max="100000"
                    step="5000"
                    value={equityVal}
                    onChange={(e) => setEquityVal(Number(e.target.value))}
                    className="w-full accent-[#D97706]"
                  />
                  <span className="text-lg font-bold text-[#D97706] block">${equityVal.toLocaleString()} / yr</span>
                </div>

                <div className="space-y-2 p-4 rounded-2xl bg-[#FAF7F2] border border-[#E7E0D3]">
                  <span className="text-xs font-bold text-[#1C2A26]">Strategy Focus</span>
                  <select
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                    className="w-full h-10 px-3 text-xs font-bold bg-white border border-[#E7E0D3] rounded-xl focus:outline-none"
                  >
                    {negotiationStrategies.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#1C2A26] text-white flex flex-col sm:flex-row justify-between items-center gap-4">
                <div>
                  <span className="text-xs text-gray-400 block font-bold uppercase">Estimated Counter-Package Target</span>
                  <span className="text-3xl font-serif-display font-bold text-emerald-400">
                    ${calculatedCounterPackage.toLocaleString()} / yr
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block font-bold uppercase">Recruiter Acceptance Rate</span>
                  <span className="text-2xl font-serif-display font-bold text-amber-400">
                    {recruiterProbability}% High Confidence
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* ARENA 6: CODE REFACTORING & ARCHITECTURE SANDBOX */}
        {activeArena === "refactor" && (
          <div className="space-y-6">
            <Card variant="glass" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-serif-display font-bold text-2xl text-[#1C2A26] flex items-center gap-2">
                    <Code className="w-5 h-5 text-[#D97706]" /> Architecture & Clean Code Refactoring Arena
                  </h3>
                  <p className="text-xs text-[#52635E]">
                    Compare legacy anti-patterns against modern clean architecture patterns in real-time.
                  </p>
                </div>

                <div className="flex gap-2">
                  {Object.keys(refactorExamples).map((pat) => (
                    <button
                      key={pat}
                      onClick={() => setSelectedRefactorPattern(pat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                        selectedRefactorPattern === pat
                          ? "bg-[#1C2A26] text-white border-[#1C2A26]"
                          : "bg-[#FAF7F2] text-[#52635E] border-[#E7E0D3]"
                      }`}
                    >
                      {pat}
                    </button>
                  ))}
                </div>
              </div>

              {(() => {
                const ex = refactorExamples[selectedRefactorPattern];

                return (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Legacy Code */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block flex items-center gap-1.5">
                          ⚠️ Legacy Anti-Pattern Code
                        </span>
                        <pre className="text-xs font-mono p-4 rounded-2xl bg-[#1E1E1E] text-rose-300 overflow-x-auto min-h-[160px] border border-rose-900/40">
                          <code>{ex.legacy}</code>
                        </pre>
                      </div>

                      {/* Clean Refactored Code */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block flex items-center gap-1.5">
                          ✨ Clean Refactored Pattern
                        </span>
                        <pre className="text-xs font-mono p-4 rounded-2xl bg-[#1E1E1E] text-emerald-300 overflow-x-auto min-h-[160px] border border-emerald-900/40">
                          <code>{ex.clean}</code>
                        </pre>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                      <span className="font-bold flex items-center gap-1.5 text-[#D97706]">
                        <Sparkles className="w-3.5 h-3.5" /> Architectural Benefit Summary:
                      </span>
                      <p className="leading-relaxed">{ex.benefit}</p>
                    </div>
                  </div>
                );
              })()}
            </Card>
          </div>
        )}
      </main>
    </div>
  );
}
