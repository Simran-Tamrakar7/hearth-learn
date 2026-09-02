/* API: /api/ai/quiz  — chapter retention quiz. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { chatCompletion, requireSessionUser } from "@/lib/openai";

function localQuiz(title: string, content: string) {
  const lines = content
    .split(/\n+/)
    .map((l) => l.replace(/^#+\s*/, "").trim())
    .map(stripListPrefix)
    .filter((l) => l.length > 24)
    .slice(0, 5);

  if (lines.length === 0) {
    return [
      `Practice quiz — ${title}`,
      "",
      "1. In one sentence, what is this chapter about?",
      "2. What is one idea you would explain to a teammate?",
      "3. What would you try first in a real project?",
      "",
      "(Offline mode — add OPENAI_API_KEY on the server for AI-generated multiple-choice questions.)",
    ].join("\n");
  }

  const questions = lines.map((line, i) => {
    const bit = line.length > 100 ? `${line.slice(0, 97)}…` : line;
    return `${i + 1}. Explain or apply: ${bit}`;
  });

  return [
    `Practice quiz — ${title}`,
    "",
    ...questions,
    "",
    "(Offline mode — add OPENAI_API_KEY on the server for AI-generated multiple-choice questions.)",
  ].join("\n");
}

function stripListPrefix(line: string) {
  return line.replace(/^[-*•]\s+/, "").replace(/^\d+[.)]\s+/, "").trim();
}

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
    return NextResponse.json({
      text: localQuiz(title, content),
      usedAI: false,
      fallback: true,
      hint: result.error,
    });
  }
  return NextResponse.json({ text: result.text, usedAI: true });
}
