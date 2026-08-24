import { NextResponse } from "next/server";

const SYSTEM = `You turn raw notes into a Hearth Learn study manual as Markdown.

Use this exact structure (parts are a plain "Part N · Name" line, chapters are ## headings):

# <Manual Title>
<one-paragraph description of the whole manual>

Part 1 · <Part name>
## <Chapter title>
<overview paragraph>

<any extra notes for this chapter>

## Why it matters
<short paragraph>

## When to use it
<short paragraph>

Part 2 · <Part name>
## <Chapter title>
...

Rules:
- Keep the author's facts. Do not invent tools, URLs, or product names they did not mention.
- Split into 2–8 parts when the notes support it. Never dump everything into a single chapter if it can be grouped.
- Every chapter is a ## heading. Never number chapters in the heading (no "Chapter 1:").
- Output markdown only. No preamble.`;

export async function POST(req: Request) {
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
