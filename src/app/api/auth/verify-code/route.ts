/* API: /api/auth/verify-code  — used by PAGE /forgot-password. Map: ../../CODE-FOR-THIS-API.md */

import { NextResponse } from "next/server";
import { checkResetCode } from "@/lib/resetCode";
import { purgeExpiredResetTokens } from "@/lib/mail";

export async function POST(req: Request) {
  let email = "";
  let code = "";
  try {
    const body = await req.json();
    email = typeof body?.email === "string" ? body.email.trim() : "";
    code = typeof body?.code === "string" ? body.code.trim() : "";
  } catch {
    return NextResponse.json({ error: "Expected JSON { email, code }" }, { status: 400 });
  }

  if (!email || !code) {
    return NextResponse.json({ error: "Email and code are required." }, { status: 400 });
  }

  await purgeExpiredResetTokens();
  const result = await checkResetCode(email, code);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ ok: true });
}
