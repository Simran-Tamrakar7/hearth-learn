"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ChangePasswordPage() {
  const router = useRouter();
  const { update } = useSession();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Could not update password");
        return;
      }
      await update();
      router.push("/dashboard");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF8F3]">
      <Navbar />
      <main className="max-w-md mx-auto px-6 py-12 space-y-4">
        <h1 className="font-serif-display text-2xl font-bold text-[#1C2A26]">Change your password</h1>
        <p className="text-xs text-[#52635E]">
          The seed admin password is temporary. Set a new one before using the cabin.
        </p>
        <Card hoverable={false} className="p-6 space-y-4">
          <form onSubmit={submit} className="space-y-3">
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password"
              className="w-full h-11 px-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
            />
            <input
              type="password"
              required
              minLength={4}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full h-11 px-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
            />
            {error ? <p className="text-xs text-red-700">{error}</p> : null}
            <Button type="submit" variant="primary" fullWidth isLoading={busy}>
              Save password
            </Button>
          </form>
        </Card>
      </main>
    </div>
  );
}
