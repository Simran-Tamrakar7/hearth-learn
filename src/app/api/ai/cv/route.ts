/* API: /api/ai/cv  — used by PAGE /ai (CV Maker). Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { chatCompletion, requireSessionUser } from "@/lib/openai";

export async function POST(req: Request) {
  const gate = await requireSessionUser();
  if (!gate.ok) return NextResponse.json({ error: "Sign in required." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const template = String(body.template || "Classic");
  const notes = String(body.notes || "").trim();
  const basics = body.basics && typeof body.basics === "object" ? body.basics : {};
  if (!notes && !basics.fullName) {
    return NextResponse.json({ error: "Add a name or paste experience notes." }, { status: 400 });
  }

  const system = `You write resumes. Output plain text sections: SUMMARY, EXPERIENCE, SKILLS, EDUCATION. Match the "${template}" template tone. Do not invent employers the user did not mention. No # markdown headings.`;
  const result = await chatCompletion(
    system,
    `Template: ${template}\nBasics: ${JSON.stringify(basics)}\nNotes:\n${notes || "(use basics only)"}`,
    0.3
  );
  if (!result.usedAI) {
    return NextResponse.json({ error: result.error || "AI is not configured." }, { status: 503 });
  }
  return NextResponse.json({ text: result.text, usedAI: true, template });
}
