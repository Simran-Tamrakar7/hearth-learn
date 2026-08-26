import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function chatCompletion(system: string, user: string, temperature = 0.4): Promise<{ text: string; usedAI: boolean; error?: string }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return { text: "", usedAI: false, error: "OPENAI_API_KEY is not set on the server." };
  }
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      return { text: "", usedAI: false, error: err.slice(0, 240) };
    }
    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const text = data.choices?.[0]?.message?.content?.trim() || "";
    if (!text) return { text: "", usedAI: false, error: "Empty model response." };
    return { text, usedAI: true };
  } catch (e) {
    return { text: "", usedAI: false, error: e instanceof Error ? e.message : "AI request failed." };
  }
}

export async function requireSessionUser() {
  const session = await getServerSession(authOptions);
  const id = session?.user?.id;
  if (!id || session.user.status === "PENDING" || session.user.status === "REJECTED") {
    return { ok: false as const, session, userId: null as string | null };
  }
  return { ok: true as const, session, userId: id };
}
