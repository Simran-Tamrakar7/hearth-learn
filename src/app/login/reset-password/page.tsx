"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/Card";

/** Legacy link-token page — password reset now uses email verification codes. */
function RedirectLegacy() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  useEffect(() => {
    // Old email links land here; send people to the code flow.
    router.replace("/login/forgot-password");
  }, [router, token]);

  return (
    <Card className="p-8 text-xs text-[#8A9B95]">
      Redirecting to verification-code reset…
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#FBF8F3] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Link href="/login/forgot-password" className="inline-flex items-center gap-2 text-xs font-semibold text-[#52635E]">
          <ArrowLeft className="w-4 h-4" /> Forgot password
        </Link>
        <Suspense fallback={<Card className="p-8 text-xs text-[#8A9B95]">Loading…</Card>}>
          <RedirectLegacy />
        </Suspense>
      </div>
    </div>
  );
}
