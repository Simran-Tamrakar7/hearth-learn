"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type ArenaId = "interview" | "bughunt" | "founder" | "crisis" | "negotiation" | "refactor";

type Attempt = {
  id: string;
  arenaId: string;
  prompt: string;
  answer: string;
  scores: string;
  xp: number;
  createdAt: string;
};

export function ArenaStudio({
  arenaId,
  role,
  difficulty = "mid",
  focus = "core skills",
  onXp,
}: {
  arenaId: ArenaId;
  role: string;
  difficulty?: string;
  focus?: string;
  onXp: (xp: number) => void;
}) {
  const { status } = useSession();
  const signedIn = status === "authenticated";
  const [tab, setTab] = useState<"practice" | "history">("practice");
  const [prompt, setPrompt] = useState("");
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [scores, setScores] = useState<{ situation?: number; task?: number; action?: number; result?: number } | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  async function loadHistory() {
    const res = await fetch(`/api/life-lab?arenaId=${arenaId}`, { cache: "no-store" });
    if (!res.ok) return;
    const data = await res.json();
    setAttempts(Array.isArray(data.attempts) ? data.attempts : []);
  }

  useEffect(() => {
    void loadHistory();
  }, [arenaId]);

  async function newQuestion() {
    if (!signedIn) {
      setError("Sign in to generate AI scenarios.");
      return;
    }
    setBusy("generate");
    setError("");
    const res = await fetch("/api/life-lab", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "generate", arenaId, role, difficulty, focus }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy("");
    if (!res.ok) {
      setError(data.error || "Could not generate a question.");
      return;
    }
    setPrompt(data.prompt || "");
    setAnswer("");
    setFeedback("");
    setScores(null);
  }

  async function evaluate() {
    if (!signedIn) {
      setError("Sign in to evaluate your answer.");
      return;
    }
    setBusy("evaluate");
    setError("");
    const res = await fetch("/api/life-lab", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "evaluate", arenaId, prompt, answer }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy("");
    if (!res.ok) {
      setError(data.error || "Could not evaluate.");
      return;
    }
    setScores(data.scores || null);
    setFeedback(data.feedback || data.scores?.feedback || "");
    if (typeof data.xp === "number") onXp(data.xp);
    void loadHistory();
  }

  return (
    <Card variant="glass" hoverable={false} className="p-6 space-y-4 border-[#E7E0D3]">
      <div className="flex gap-2">
        <button type="button" className={`px-3 py-1.5 rounded-full text-xs font-bold ${tab === "practice" ? "bg-[#1C2A26] text-white" : "border border-[#E7E0D3]"}`} onClick={() => setTab("practice")}>
          Practice
        </button>
        <button type="button" className={`px-3 py-1.5 rounded-full text-xs font-bold ${tab === "history" ? "bg-[#1C2A26] text-white" : "border border-[#E7E0D3]"}`} onClick={() => setTab("history")}>
          Past Attempts
        </button>
      </div>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
      {!signedIn && status !== "loading" ? (
        <p className="text-sm text-[#52635E]">
          <Link href="/login" className="font-semibold text-[#D97706] hover:underline">Sign in</Link> to generate scenarios and save your attempt history.
        </p>
      ) : null}

      {tab === "practice" ? (
        <>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => void newQuestion()} isLoading={busy === "generate"}>
              New Question
            </Button>
          </div>
          <p className="text-sm font-semibold p-3 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] min-h-[4rem]">
            {prompt || "Click New Question for an AI scenario based on role, difficulty, and focus."}
          </p>
          <textarea
            rows={6}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Write your answer…"
            className="w-full p-4 text-sm bg-white border border-[#E7E0D3] rounded-2xl"
          />
          <Button variant="primary" size="sm" onClick={() => void evaluate()} isLoading={busy === "evaluate"} disabled={!answer.trim()}>
            Evaluate Answer with AI
          </Button>
          {scores ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["situation", "task", "action", "result"] as const).map((k) => (
                <div key={k} className="p-3 rounded-xl bg-[#FAF7F2] border border-[#E7E0D3] text-center">
                  <p className="text-[10px] uppercase text-[#8A9B95]">{k}</p>
                  <p className="font-serif-display text-xl font-bold">{Number(scores[k] || 0)}</p>
                </div>
              ))}
            </div>
          ) : null}
          {feedback ? <p className="text-sm leading-relaxed">{feedback}</p> : null}
        </>
      ) : (
        <ul className="space-y-3">
          {attempts.length === 0 ? <li className="text-sm text-[#8A9B95]">No attempts yet.</li> : null}
          {attempts.map((a) => (
            <li key={a.id} className="p-3 rounded-xl border border-[#E7E0D3] space-y-1">
              <p className="text-xs text-[#8A9B95]">{new Date(a.createdAt).toLocaleString()} · +{a.xp} XP</p>
              <p className="text-sm font-semibold">{a.prompt}</p>
              <p className="text-xs text-[#52635E] line-clamp-3">{a.answer}</p>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
