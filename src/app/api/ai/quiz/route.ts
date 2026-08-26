/* API: /api/ai/quiz  — chapter retention quiz. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { chatCompletion, requireSessionUser } from "@/lib/openai";

export async function POST(req: Request) {
  const gate = await requireSessionUser();
  if (!gate.ok) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const title = String(body.title || "this chapter");
  const content = String(body.content || "").trim().slice(0, 6000);
  if (!content) return NextResponse.json({ error: "Chapter content is required." }, { status: 400 });

  const result = await chatCompletion(
    "Write 5 multiple-choice questions (A–D) that test recall of THIS chapter only. After the questions, print ANSWERS with the correct letter and a one-line why. Plain text, no # headings.",
    `Chapter: ${title}\n\n${content}`,
    0.4
  );
  if (!result.usedAI) {
    return NextResponse.json({ error: result.error || "AI is not configured." }, { status: 503 });
  }
  return NextResponse.json({ text: result.text, usedAI: true });
}
