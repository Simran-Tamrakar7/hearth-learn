"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PasswordInput } from "@/components/ui/PasswordInput";

type Step = "email" | "verify" | "password";

function ForgotForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [devCode, setDevCode] = useState("");

  async function sendCode(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setError("");
    setInfo("");
    setDevCode("");
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not send code");
        return;
      }
      setInfo(data.message || "If that account exists, we sent a verification code.");
      if (typeof data.devCode === "string") setDevCode(data.devCode);
      setStep("verify");
    } finally {
      setBusy(false);
    }
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not verify code");
        return;
      }
      setResetToken(data.resetToken || "");
      setStep("password");
    } finally {
      setBusy(false);
    }
  }

  async function setNewPassword(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setBusy(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: resetToken, password, confirmPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not reset password");
        return;
      }
      router.push("/login?reset=1");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Card hoverable={false} className="p-6 sm:p-8 shadow-lg">
      {step === "email" ? (
        <form onSubmit={sendCode} className="space-y-4">
          <p className="text-xs text-[#52635E]">
            Enter the Gmail (or email) on your account. We’ll send a 6-digit verification code — not a
            reset link.
          </p>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
            <input
              type="text"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@gmail.com"
              className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
            />
          </div>
          {error ? <p className="text-xs text-red-700">{error}</p> : null}
          <Button type="submit" variant="primary" fullWidth isLoading={busy}>
            Send verification code
          </Button>
        </form>
      ) : null}

      {step === "verify" ? (
        <form onSubmit={verifyCode} className="space-y-4">
          <p className="text-xs text-[#52635E]">
            Enter the 6-digit code we sent to <span className="font-semibold text-[#1C2A26]">{email}</span>.
            It expires in about 15 minutes.
          </p>
          <div className="relative">
            <ShieldCheck className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
            <input
              type="text"
              inputMode="numeric"
              pattern="\d{6}"
              maxLength={6}
              required
              autoComplete="one-time-code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="123456"
              className="w-full h-11 pl-10 pr-4 text-sm tracking-[0.3em] font-semibold bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
            />
          </div>
          {info ? <p className="text-xs text-[#1C2A26]">{info}</p> : null}
          {devCode ? (
            <p className="text-xs text-[#52635E]">
              Dev code (no Resend key): <span className="font-mono font-semibold text-[#D97706]">{devCode}</span>
            </p>
          ) : null}
          {error ? <p className="text-xs text-red-700">{error}</p> : null}
          <Button type="submit" variant="primary" fullWidth isLoading={busy} disabled={code.length !== 6}>
            Verify code
          </Button>
          <button
            type="button"
            disabled={busy}
            onClick={() => void sendCode()}
            className="w-full text-[11px] font-semibold text-[#D97706] hover:underline disabled:opacity-50"
          >
            Resend code
          </button>
          <button
            type="button"
            onClick={() => {
              setStep("email");
              setCode("");
              setError("");
              setInfo("");
              setDevCode("");
            }}
            className="w-full text-[11px] font-semibold text-[#52635E] hover:underline"
          >
            Use a different email
          </button>
        </form>
      ) : null}

      {step === "password" ? (
        <form onSubmit={setNewPassword} className="space-y-4">
          <p className="text-xs text-[#52635E]">Choose a new password for your account.</p>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#52635E]">New password</label>
            <PasswordInput
              value={password}
              onChange={setPassword}
              required
              minLength={4}
              placeholder="New password"
              autoComplete="new-password"
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#52635E]">Confirm new password</label>
            <PasswordInput
              value={confirmPassword}
              onChange={setConfirmPassword}
              required
              minLength={4}
              placeholder="Confirm new password"
              autoComplete="new-password"
            />
          </div>
          {error ? <p className="text-xs text-red-700">{error}</p> : null}
          <Button type="submit" variant="primary" fullWidth isLoading={busy} disabled={!resetToken}>
            Save new password
          </Button>
        </form>
      ) : null}
    </Card>
  );
}

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-[#52635E]">
          <ArrowLeft className="w-4 h-4" /> Back to sign in
        </Link>
        <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">Forgot password</h1>
        <Suspense fallback={<Card className="p-8 text-xs text-[#8A9B95]">Loading…</Card>}>
          <ForgotForm />
        </Suspense>
      </div>
    </div>
  );
}
