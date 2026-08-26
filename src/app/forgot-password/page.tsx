"use client";

/* PAGE: /forgot-password  — this file is the screen. Map: ./CODE-FOR-THIS-PAGE.md */

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PasswordField } from "@/components/ui/PasswordField";
import { passwordError } from "@/lib/password";

type Step = "email" | "code" | "password";

function ForgotForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState(params.get("email") || "");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [devCode, setDevCode] = useState("");
  const [resendAt, setResendAt] = useState(0);
  const [now, setNow] = useState(Date.now());
  const sending = useRef(false);

  useEffect(() => {
    if (resendAt <= Date.now()) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [resendAt]);

  async function sendCode() {
    if (sending.current) return false;
    sending.current = true;
    setBusy(true);
    setError("");
    setMessage("");
    setDevCode("");
    try {
      const res = await fetch("/api/auth/forgot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.status === 429) {
        setError(data.error || "Please wait before requesting another code.");
        return false;
      }
      if (!res.ok) {
        setError(data.error || "Could not send a code.");
        return false;
      }
      setMessage(data.message || "If that account exists, we sent a verification code.");
      if (typeof data.code === "string") {
        setDevCode(data.code);
        setCode(data.code);
      } else {
        setCode("");
      }
      setResendAt(Date.now() + 60_000);
      return true;
    } finally {
      sending.current = false;
      setBusy(false);
    }
  }

  async function submitEmail(e: React.FormEvent) {
    e.preventDefault();
    if (await sendCode()) setStep("code");
  }

  async function submitCode(e: React.FormEvent) {
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
        setError(data.error || "Incorrect code.");
        return;
      }
      setStep("password");
    } finally {
      setBusy(false);
    }
  }

  async function submitPassword(e: React.FormEvent) {
    e.preventDefault();
    const invalid = passwordError(password, confirm);
    if (invalid) {
      setError(invalid);
      return;
    }
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, password, confirmPassword: confirm }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not reset password.");
        return;
      }
      router.push("/login?reset=1");
    } finally {
      setBusy(false);
    }
  }

  const canResend = now >= resendAt;

  return (
    <Card hoverable={false} className="p-6 sm:p-8 shadow-lg">
      {step === "email" ? (
        <form onSubmit={submitEmail} className="space-y-4">
          <p className="text-xs text-[#52635E]">
            We’ll email a 6-digit verification code to the Gmail address on this account. It expires in 15 minutes.
          </p>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
            <input
              type="text"
              required
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

      {step === "code" ? (
        <form onSubmit={submitCode} className="space-y-4">
          <p className="text-xs text-[#52635E]">
            Enter the 6-digit code we sent to the email on file for <strong>{email}</strong>.
          </p>
          {message ? <p className="text-xs text-[#1C2A26]">{message}</p> : null}
          {devCode ? (
            <p className="text-xs text-[#52635E]">
              Dev code: <span className="font-semibold text-[#D97706]">{devCode}</span>
            </p>
          ) : null}
          <input
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="6-digit code"
            className="w-full h-11 px-3 text-sm tracking-[0.3em] text-center bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
          />
          {error ? <p className="text-xs text-red-700">{error}</p> : null}
          <Button type="submit" variant="primary" fullWidth isLoading={busy} disabled={code.length !== 6}>
            Verify code
          </Button>
          <Button
            type="button"
            variant="outline"
            fullWidth
            disabled={!canResend || busy}
            onClick={() => void sendCode()}
          >
            {canResend ? "Resend code" : "Resend available in a minute"}
          </Button>
        </form>
      ) : null}

      {step === "password" ? (
        <form onSubmit={submitPassword} className="space-y-4">
          <p className="text-xs text-[#52635E]">Choose a new password (at least 8 characters).</p>
          <PasswordField
            label="New password"
            value={password}
            onChange={setPassword}
            autoComplete="new-password"
            required
          />
          <PasswordField
            label="Confirm new password"
            value={confirm}
            onChange={setConfirm}
            autoComplete="new-password"
            required
          />
          {error ? <p className="text-xs text-red-700">{error}</p> : null}
          <Button type="submit" variant="primary" fullWidth isLoading={busy}>
            Set new password
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
