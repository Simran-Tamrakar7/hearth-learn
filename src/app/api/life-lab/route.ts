/* API: /api/life-lab  — used by PAGE /life-simulator. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { chatCompletion } from "@/lib/openai";
import { requireSessionUser } from "@/lib/apiSession";
import { arenaGeneratePrompt } from "@/app/life-simulator/_content/arenaPrompts";

function parseJson(text: string) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) return { prompt: text };
  try {
    return JSON.parse(text.slice(start, end + 1));
  } catch {
    return { prompt: text };
  }
}

export async function GET(req: Request) {
  const gate = await requireSessionUser();
  if (!gate.ok) return NextResponse.json({ attempts: [] });
  const { searchParams } = new URL(req.url);
  const arenaId = searchParams.get("arenaId") || undefined;
  const attempts = await prisma.lifeLabAttempt.findMany({
    where: { userId: gate.userId, ...(arenaId ? { arenaId } : {}) },
    orderBy: { createdAt: "desc" },
    take: 30,
  });
  return NextResponse.json({ attempts });
}

export async function POST(req: Request) {
  const gate = await requireSessionUser();
  if (!gate.ok) return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const action = String(body.action || "generate");
  const arenaId = String(body.arenaId || "interview");

  if (action === "generate") {
    const system = arenaGeneratePrompt(arenaId);
    const user = `Role: ${body.role || "generalist"}\nDifficulty: ${body.difficulty || "mid"}\nFocus: ${body.focus || "core skills"}`;
    const result = await chatCompletion(system, user, 0.7);
    if (!result.usedAI) return NextResponse.json({ error: result.error || "AI is not configured." }, { status: 503 });
    return NextResponse.json({ ...parseJson(result.text), usedAI: true });
  }

  if (action === "evaluate") {
    const prompt = String(body.prompt || "");
    const answer = String(body.answer || "");
    if (!answer.trim()) return NextResponse.json({ error: "Write an answer first." }, { status: 400 });
    const system =
      "Score the answer 0-100 for situation, task, action, result (STAR). Return JSON only: {\"situation\":n,\"task\":n,\"action\":n,\"result\":n,\"feedback\":\"2-4 sentences on THIS answer\"}.";
    const result = await chatCompletion(system, `Prompt:\n${prompt}\n\nAnswer:\n${answer}`, 0.2);
    if (!result.usedAI) return NextResponse.json({ error: result.error || "AI is not configured." }, { status: 503 });
    const scores = parseJson(result.text);
    const avg = Math.round(
      (Number(scores.situation || 0) + Number(scores.task || 0) + Number(scores.action || 0) + Number(scores.result || 0)) / 4
    );
    const xp = Math.max(5, Math.min(100, avg));
    const row = await prisma.lifeLabAttempt.create({
      data: {
        userId: gate.userId!,
        arenaId,
        prompt,
        answer,
        scores: JSON.stringify(scores),
        xp,
      },
    });
    return NextResponse.json({ scores, feedback: scores.feedback || "", xp, attempt: row, usedAI: true });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
