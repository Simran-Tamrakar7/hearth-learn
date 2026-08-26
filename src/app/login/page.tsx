"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Flame, Mail, Lock, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

function GoogleIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.6-2.5-5.6-5.6S8.9 6.2 12 6.2c1.8 0 3 .7 3.7 1.4l2.5-2.4C16.7 3.7 14.6 2.8 12 2.8 6.9 2.8 2.8 6.9 2.8 12S6.9 21.2 12 21.2c5.3 0 8.8-3.7 8.8-8.9 0-.6 0-1.1-.1-1.6H12z" />
    </svg>
  );
}

function loginError(raw?: string | null) {
  const msg = raw || "Invalid email or password";
  if (/prisma|DATABASE_URL|invocation|Environment variable/i.test(msg)) {
    return "Could not sign in. Please try again.";
  }
  return msg;
}

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { toast } = useToast();

  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const resetOk = searchParams.get("reset") === "1";
  const [errorMsg, setErrorMsg] = useState(
    searchParams.get("pending")
      ? "Your account is waiting for admin approval."
      : searchParams.get("rejected")
        ? "Your signup was not approved."
        : ""
  );
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);
    try {
      const result = await signIn("credentials", { email, password, redirect: false });
      if (result?.ok) {
        setIsSuccess(true);
        toast({ type: "success", title: "Welcome back!", description: "Resuming your personal study session..." });
        router.push(callbackUrl);
        router.refresh();
      } else {
        setErrorMsg(loginError(result?.error));
      }
    } catch {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="default" hoverable={false} className="shadow-lg shadow-[#1C2A26]/5 p-6 sm:p-8">
      {resetOk ? (
        <div className="mb-4 flex items-center gap-2 p-3 bg-[#EBF3F0] text-[#1C2A26] text-xs font-semibold rounded-xl">
          <CheckCircle2 className="w-4 h-4 text-[#2D4A43] shrink-0" />
          <span>Password updated. Sign in with your new password.</span>
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#52635E]">Email or username</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
            <input
              type="text"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin  or  you@example.com"
              className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold text-[#52635E]">Password</label>
            <Link
              href={email.trim() ? `/forgot-password?email=${encodeURIComponent(email.trim())}` : "/forgot-password"}
              className="text-[11px] font-semibold text-[#D97706] hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white"
            />
          </div>
        </div>

        <AnimatePresence>
          {errorMsg ? (
            <motion.div
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <AnimatePresence>
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 p-3 bg-[#EBF3F0] text-[#1C2A26] text-xs font-semibold rounded-xl"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2D4A43]" />
              <span>Success! Redirecting...</span>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <Button type="submit" variant="primary" fullWidth isLoading={isLoading} className="mt-2">
          Sign In to Hearth
        </Button>
      </form>

      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E7E0D3]" />
        </div>
        <span className="relative bg-white px-3 text-[11px] font-semibold text-[#8A9B95] uppercase tracking-wider">
          Or
        </span>
      </div>

      <Button
        type="button"
        variant="outline"
        fullWidth
        leftIcon={<GoogleIcon />}
        onClick={() => signIn("google", { callbackUrl })}
      >
        Sign in with Google
      </Button>

      <p className="text-center text-xs text-[#52635E] mt-5">
        New here?{" "}
        <Link href="/signup" className="font-semibold text-[#D97706] hover:underline">
          Create an account
        </Link>
      </p>
    </Card>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] text-[#1C2A26] flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D97706]/10 rounded-full blur-3xl pointer-events-none" />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10 space-y-6"
      >
        <Link href="/login" className="inline-flex items-center gap-2 text-xs font-semibold text-[#52635E] hover:text-[#1C2A26]">
          <ArrowLeft className="w-4 h-4" /> Hearth
        </Link>
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1C2A26] text-[#D97706] mb-2">
            <Flame className="w-6 h-6 fill-[#D97706]/20" />
          </div>
          <h1 className="font-serif-display text-2xl font-bold">Welcome to Hearth</h1>
          <p className="text-xs text-[#52635E]">Sign in to continue your study cabin.</p>
        </div>
        <Suspense fallback={<Card className="p-8 text-center text-xs text-[#8A9B95]">Loading login form...</Card>}>
          <LoginFormContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
