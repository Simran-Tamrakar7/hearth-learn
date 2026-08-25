"use client";

/* PAGE: /toolkits  — this file is the screen. Snippets: ./_content/<id>/meta.ts. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { listedToolkits } from "@/app/toolkits/_content/_registry";
import { Code, Copy, Check } from "lucide-react";

export default function ToolkitsPage() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const toolkits = listedToolkits();

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      type: "success",
      title: "Copied to Clipboard! 📋",
      description: "Ready to paste into your codebase or prompts.",
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8 flex-1">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
            <Code className="w-4 h-4" /> Practical Reference Toolkits
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C2A26]">Cheat Sheets & Quick Cookbooks</h1>
          <p className="text-xs text-[#52635E]">
            Bite-sized, copy-pasteable reference snippets for fast lookup during development sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {toolkits.map((kit) => (
            <Card key={kit.id} hoverable={false} className="p-6 space-y-4 bg-white border-[#E7E0D3]">
              <div className="flex justify-between items-start">
                <Badge variant="category">{kit.category}</Badge>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleCopy(kit.id, kit.code)}
                  leftIcon={copiedId === kit.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                >
                  {copiedId === kit.id ? "Copied!" : "Copy Snippet"}
                </Button>
              </div>
              <div>
                <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">{kit.title}</h3>
                <p className="text-xs text-[#52635E] mt-1">{kit.description}</p>
              </div>
              <div className="relative rounded-xl bg-[#1C2A26] text-[#FAF7F2] p-4 font-mono text-xs overflow-x-auto border border-[#2A3E39]">
                <pre>{kit.code}</pre>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
