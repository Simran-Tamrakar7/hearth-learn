"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(token ? "" : "Missing reset token.");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not reset password");
        return;
      }
      router.push("/login");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card hoverable={false} className="p-6 sm:p-8 shadow-lg">
      <form onSubmit={submit} className="space-y-4">
        <p className="text-xs text-[#52635E]">Choose a new password for your account.</p>
        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
          <input
            type="password"
            required
            minLength={4}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password"
            className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
          />
        </div>
        {error ? <p className="text-xs text-red-700">{error}</p> : null}
        <Button type="submit" variant="primary" fullWidth isLoading={busy} disabled={!token}>
          Set new password
        </Button>
      </form>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-[#52635E]">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">Set a new password</h1>
        <Suspense fallback={<Card className="p-8 text-xs text-[#8A9B95]">Loading…</Card>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
