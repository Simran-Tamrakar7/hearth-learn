/* API: /api/manuals/generate  — AI notes→manual for PAGE /manuals. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { requirePermission } from "@/lib/roles";

const SYSTEM = `You are a manual-formatting assistant. Convert raw, unstructured content into a structured manual:

STRUCTURE:
- Break content into logical PARTS (major sections), each titled "Part N: [Title]" with a one-line summary
- Break each Part into numbered CHAPTERS (N.1, N.2, ...)
- Use step-by-step instructions for processes, bullets for lists
- Clear, concise, instructional tone — not conversational
- Do not skip or shorten meaning — reorganize and clarify only

OUTPUT FORMAT:
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

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({ fallback: true });
  }

  try {
    const user = title ? `Forced title: ${title}\n\n${notes}` : notes;
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: user },
        ],
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ fallback: true });
    }
    const data = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const markdown = data.choices?.[0]?.message?.content?.trim();
    if (!markdown) {
      return NextResponse.json({ fallback: true });
    }
    return NextResponse.json({ markdown, usedAI: true });
  } catch {
    return NextResponse.json({ fallback: true });
  }
}
