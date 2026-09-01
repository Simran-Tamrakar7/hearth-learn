/* API: /api/manuals/generate  — AI notes→manual for PAGE /manuals. Map: page_details-code_routes.md */

import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/roles";
import { chatCompletion } from "@/lib/openai";

const SYSTEM = `You are a manual-formatting assistant. Convert raw, unstructured content into a structured manual for Hearth's TypeScript chapter model.

STRUCTURE:
- Break content into logical PARTS (major sections), each titled "Part N: [Title]" with a one-line summary
- Break each Part into numbered CHAPTERS (N.1, N.2, ...)
- Use step-by-step instructions for processes, bullets for lists
- Clear, concise, instructional tone — not conversational
- Do not skip or shorten meaning — reorganize and clarify only

OUTPUT FORMAT (each chapter will become part-N/chapter-M.ts with fields: overviewText, why, when, practical, advantages, limitations, contentMarkdown):

Part [N]: [Title]
[One-line summary]

[N.1] [Chapter Title]
[Reformatted content]

[N.2] [Chapter Title]
[Reformatted content]
(repeat for all)

Rules:
- Keep the author's facts. Do not invent tools, URLs, or product names they did not mention.
- Split into 2–8 parts when the notes support it. Never dump everything into a single chapter if it can be grouped.
- Output the structured manual only. No preamble.`;

export async function POST(req: Request) {
  const gate = await requirePermission("canUseAI");
  if (!gate.ok) {
    return NextResponse.json({ error: "You do not have permission to generate manuals." }, { status: gate.status || 403 });
  }

  let notes = "";
  let title = "";
  try {
    const body = await req.json();
    notes = typeof body?.notes === "string" ? body.notes.trim() : "";
    title = typeof body?.title === "string" ? body.title.trim() : "";
  } catch {
    return NextResponse.json({ error: "Expected JSON { notes, title? }" }, { status: 400 });
  }

  if (!notes) {
    return NextResponse.json({ error: "Paste some notes first." }, { status: 400 });
  }

  const user = title ? `Forced title: ${title}\n\n${notes}` : notes;
  const result = await chatCompletion(SYSTEM, user, 0.3);
  if (!result.usedAI) {
    return NextResponse.json({ fallback: true });
  }
  return NextResponse.json({ markdown: result.text, usedAI: true });
}
