"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [resetUrl, setResetUrl] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setResetUrl("");
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message || "If that account exists, we sent a reset link.");
      if (typeof data.resetUrl === "string") setResetUrl(data.resetUrl);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-[#52635E]">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">Forgot password</h1>
        <Card hoverable={false} className="p-6 sm:p-8 shadow-lg">
          <form onSubmit={submit} className="space-y-4">
            <p className="text-xs text-[#52635E]">We’ll email a reset link to your registered address.</p>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin  or  you@example.com"
                className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
              />
            </div>
            <Button type="submit" variant="primary" fullWidth isLoading={busy}>
              Send reset link
            </Button>
            {message ? <p className="text-xs text-[#1C2A26]">{message}</p> : null}
            {resetUrl ? (
              <p className="text-xs text-[#52635E] break-all">
                Dev link:{" "}
                <Link href={resetUrl} className="text-[#D97706] font-semibold">
                  {resetUrl}
                </Link>
              </p>
            ) : null}
          </form>
        </Card>
      </div>
    </div>
  );
}
