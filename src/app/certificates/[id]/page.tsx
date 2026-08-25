"use client";

/* PAGE: /certificates/[id]  — this file is the screen. Map: ../CODE-FOR-THIS-PAGE.md */

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Flame, Printer, Award, ArrowLeft, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";

export default function CertificatePage() {
  const params = useParams();
  const certId = params.id as string;
  const [certData, setCertData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCertificate();
  }, [certId]);

  const fetchCertificate = async () => {
    try {
      // Fallback demo certificate if parameter is direct slug or id
      const res = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trailId: certId }),
      });
      const data = await res.json();
      if (data.certificate) setCertData(data.certificate);
    } catch (err) {
      console.error("Certificate load error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FBF8F3]">
        <Navbar />
        <div className="max-w-4xl mx-auto p-12 text-center text-xs text-[#8A9B95]">
          Generating Completion Certificate...
        </div>
      </div>
    );
  }

  const user = certData?.user || { name: "Rowan Vance" };
  const trail = certData?.trail || { title: "Modern Web Architecture with Next.js", category: "Engineering", estimatedHours: 3 };
  const code = certData?.certificateCode || "HEARTH-CERT-2026-X892";
  const date = certData?.issuedAt ? new Date(certData.issuedAt).toLocaleDateString() : new Date().toLocaleDateString();

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 w-full space-y-6 flex-1">
        {/* Navigation & Print Action Header */}
        <div className="flex justify-between items-center print:hidden">
          <Link href="/trails" className="inline-flex items-center gap-2 text-xs font-semibold text-[#52635E] hover:text-[#1C2A26]">
            <ArrowLeft className="w-4 h-4" /> Back to Skill Trails
          </Link>

          <Button variant="amber" size="sm" onClick={handlePrint} leftIcon={<Printer className="w-4 h-4" />}>
            Print / Save Certificate PDF
          </Button>
        </div>

        {/* Certificate Card Printable Template */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative bg-[#FFFDF9] border-8 border-[#1C2A26] rounded-3xl p-8 sm:p-14 text-center space-y-8 shadow-2xl overflow-hidden print:shadow-none print:border-4">
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D97706]" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D97706]" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D97706]" />
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D97706]" />

            {/* Header Brand Seal */}
            <div className="space-y-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#1C2A26] text-[#D97706] shadow-sm mb-2">
                <Flame className="w-7 h-7 fill-[#D97706]/20" />
              </div>
              <span className="block text-xs font-bold uppercase tracking-[0.25em] text-[#D97706]">
                Hearth Personal Study Sanctuary
              </span>
              <h1 className="font-serif-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1C2A26]">
                Certificate of Skill Completion
              </h1>
            </div>

            <div className="w-24 h-0.5 bg-[#D97706] mx-auto rounded-full" />

            {/* Recipient & Statement */}
            <div className="space-y-3 max-w-xl mx-auto">
              <p className="text-xs text-[#52635E] uppercase tracking-wider font-semibold">
                This is proudly presented to
              </p>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1C2A26] underline decoration-[#D97706]/30 underline-offset-8">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed pt-2">
                for successfully working through all structured lesson chapters and completing the self-paced skill path:
              </p>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#D97706] pt-1">
                &ldquo;{trail.title}&rdquo;
              </h3>
            </div>

            {/* Footer Verification Details */}
            <div className="pt-8 border-t border-[#E7E0D3] flex flex-col sm:flex-row justify-between items-center gap-4 max-w-2xl mx-auto text-xs text-[#52635E]">
              <div className="text-left space-y-0.5">
                <span className="font-bold block text-[#1C2A26]">Hearth Sanctuary Seal</span>
                <span className="text-[11px] text-[#8A9B95]">Personal Learning Record</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF7F2] border border-[#E7E0D3] font-mono text-[11px]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D97706]" /> {code}
              </div>

              <div className="text-right space-y-0.5">
                <span className="font-bold block text-[#1C2A26]">Date Issued</span>
                <span className="text-[11px] text-[#8A9B95]">{date}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
