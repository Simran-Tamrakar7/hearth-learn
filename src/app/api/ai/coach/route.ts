/* API: /api/ai/coach  — used by PAGE /ai. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { chatCompletion, requireSessionUser } from "@/lib/openai";

const SYSTEMS: Record<string, string> = {
  Explain: "You are a precise technical tutor. Explain the user's topic or pasted notes clearly, with principles and a short practice tip. No markdown headings with #. Plain text with short paragraphs.",
  ELI5: "Explain like the reader is five: one vivid analogy, then one sentence tying it back. No jargon unless you define it. Plain text.",
  Summarize: "Summarize as bullets: core idea, why it matters, one practice, one check. Plain text, no # headings.",
  Quiz: "Write 5 multiple-choice questions (A–D) about the user's topic. After the questions, print ANSWERS with the correct letter and a one-line why. Plain text.",
  Flashcards: "Write 6 flashcards as lines: Front: … → Back: …. Based only on the user's topic. Plain text.",
  "Study notes": "Write study notes: definition, why companies care, do-next. Use the user's actual content. Plain text, no # headings.",
  "Next topic": "Recommend the single best next topic after this one, with a 3-item prerequisite checklist. Plain text.",
  "7-day plan": "Write a 7-day study plan for THIS topic only. Day 1–7, each with a concrete task based on the user's input. Plain text.",
};

export async function POST(req: Request) {
  const gate = await requireSessionUser();
  if (!gate.ok) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const mode = String(body.mode || "Explain");
  const input = String(body.input || "").trim();
  if (!input) return NextResponse.json({ error: "Enter a topic or paste notes." }, { status: 400 });

  const system = SYSTEMS[mode] || SYSTEMS.Explain;
  const result = await chatCompletion(system, `Mode: ${mode}\n\n${input}`, 0.5);
  if (!result.usedAI) {
    return NextResponse.json({ error: result.error || "AI is not configured." }, { status: 503 });
  }
  return NextResponse.json({ text: result.text, usedAI: true, mode });
}
