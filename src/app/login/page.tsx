"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Flame, Mail, Lock, User as UserIcon, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/Toast";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const { toast } = useToast();

  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorMsg(data.error || "Failed to create account");
          setIsLoading(false);
          return;
        }

        setIsSuccess(true);
        toast({
          type: "achievement",
          title: "Account Created! 🎉",
          description: "Welcome to Hearth study cabin. Signing you in...",
        });

        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          router.push(callbackUrl);
        } else {
          setErrorMsg(result?.error || "Error signing in automatically");
        }
      } else {
        const result = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          setIsSuccess(true);
          toast({
            type: "success",
            title: "Welcome back!",
            description: "Resuming your personal study session...",
          });
          router.push(callbackUrl);
        } else {
          setErrorMsg(result?.error || "Invalid email or password");
        }
      }
    } catch (err: any) {
      setErrorMsg("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setIsLoading(true);
    setErrorMsg("");
    try {
      const result = await signIn("credentials", {
        email: "demo@hearth.study",
        password: "demopassword",
        redirect: false,
      });

      if (!result?.ok) {
        await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Rowan Vance",
            email: "demo@hearth.study",
            password: "demopassword",
          }),
        });

        await signIn("credentials", {
          email: "demo@hearth.study",
          password: "demopassword",
          redirect: false,
        });
      }

      toast({
        type: "success",
        title: "Signed in as Demo User",
        description: "Exploring Hearth with Rowan Vance's study cabin.",
      });
      router.push("/dashboard");
    } catch (err) {
      setErrorMsg("Demo login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card variant="default" hoverable={false} className="shadow-lg shadow-[#1C2A26]/5 p-6 sm:p-8">
      {/* Tab Switcher */}
      <div className="relative flex p-1 bg-[#F5EFE6] rounded-xl mb-6">
        <motion.div
          layoutId="activeAuthTab"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className={`absolute top-1 bottom-1 ${
            isSignUp ? "left-[50%] right-1" : "left-1 right-[50%]"
          } bg-white rounded-lg shadow-sm`}
        />
        <button
          type="button"
          onClick={() => {
            setIsSignUp(false);
            setErrorMsg("");
          }}
          className={`relative z-10 flex-1 py-2 text-xs font-semibold text-center transition-colors ${
            !isSignUp ? "text-[#1C2A26]" : "text-[#8A9B95]"
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setIsSignUp(true);
            setErrorMsg("");
          }}
          className={`relative z-10 flex-1 py-2 text-xs font-semibold text-center transition-colors ${
            isSignUp ? "text-[#1C2A26]" : "text-[#8A9B95]"
          }`}
        >
          Create Account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <AnimatePresence mode="popLayout">
          {isSignUp && (
            <motion.div
              key="nameField"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-1.5"
            >
              <label className="block text-xs font-semibold text-[#52635E]">
                Your Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
                <input
                  type="text"
                  required={isSignUp}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rowan Vance"
                  className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white transition-all duration-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#52635E]">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rowan@example.com"
              className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#52635E]">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 pl-10 pr-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white transition-all duration-200"
            />
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, y: -6, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -6, height: 0 }}
              className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success indicator */}
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 p-3 bg-[#EBF3F0] text-[#1C2A26] text-xs font-semibold rounded-xl"
            >
              <CheckCircle2 className="w-4 h-4 text-[#2D4A43]" />
              <span>Success! Redirecting...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="mt-2"
        >
          {isSignUp ? "Create Cabin Account" : "Sign In to Hearth"}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#E7E0D3]" />
        </div>
        <span className="relative bg-white px-3 text-[11px] font-semibold text-[#8A9B95] uppercase tracking-wider">
          Or Instant Demo Access
        </span>
      </div>

      {/* Quick Demo Login Button */}
      <Button
        type="button"
        variant="amber"
        fullWidth
        onClick={handleDemoLogin}
        isLoading={isLoading}
        leftIcon={<Flame className="w-4 h-4" />}
      >
        Enter Demo Cabin (1-Click)
      </Button>
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
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10 space-y-6"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#52635E] hover:text-[#1C2A26] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Hearth
        </Link>

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#1C2A26] text-[#D97706] shadow-sm shadow-[#1C2A26]/10 mb-2">
            <Flame className="w-6 h-6 fill-[#D97706]/20" />
          </div>
          <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">
            Welcome to Hearth
          </h1>
          <p className="text-xs text-[#52635E]">
            Resume your bite-sized trails and daily progress streak.
          </p>
        </div>

        <Suspense fallback={<Card className="p-8 text-center text-xs text-[#8A9B95]">Loading login form...</Card>}>
          <LoginFormContent />
        </Suspense>
      </motion.div>
    </div>
  );
}
