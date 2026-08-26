"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Flame, Mail, Lock, User as UserIcon, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not create account");
        return;
      }
      setDone(true);
    } catch {
      setError("Could not create account");
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
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1C2A26] text-[#D97706]">
            <Flame className="w-6 h-6" />
          </div>
          <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">Create an account</h1>
          <p className="text-xs text-[#52635E]">An admin must approve you before you can sign in.</p>
        </div>
        <Card hoverable={false} className="p-6 sm:p-8 shadow-lg">
          {done ? (
            <div className="flex items-start gap-2 p-3 rounded-xl bg-[#EBF3F0] text-sm text-[#1C2A26]">
              <CheckCircle2 className="w-4 h-4 mt-0.5 text-[#2D4A43]" />
              <span>Request sent. We’ll email you when an admin approves your account.</span>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <label className="block space-y-1.5 text-xs font-semibold text-[#52635E]">
                Your name
                <span className="relative block">
                  <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 text-sm font-normal bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                  />
                </span>
              </label>
              <label className="block space-y-1.5 text-xs font-semibold text-[#52635E]">
                Email
                <span className="relative block">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 text-sm font-normal bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                  />
                </span>
              </label>
              <label className="block space-y-1.5 text-xs font-semibold text-[#52635E]">
                Password
                <span className="relative block">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-10 pr-4 text-sm font-normal bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                  />
                </span>
              </label>
              {error ? (
                <p className="flex items-center gap-2 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4" /> {error}
                </p>
              ) : null}
              <Button type="submit" variant="primary" fullWidth isLoading={busy}>
                Request access
              </Button>
              <Button type="button" variant="outline" fullWidth onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
                Sign up with Google
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  );
}
