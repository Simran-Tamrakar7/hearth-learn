"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  Code,
  Copy,
  Check,
  Terminal,
  Sparkles,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";

export default function ToolkitsPage() {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toolkits = [
    {
      id: "prompt-json",
      category: "AI Engineering",
      title: "LLM Structured JSON Output Prompt",
      description: "Guarantees strict JSON schema responses from LLMs without markdown syntax wrapping.",
      code: `You are an expert system that returns ONLY valid JSON.
Do not wrap your response in markdown code blocks like \`\`\`json.
Your response must strictly match the following JSON Schema:

{
  "status": "success" | "error",
  "data": {
    "summary": "Concise summary",
    "keyTakeaways": ["item1", "item2"]
  }
}`,
    },
    {
      id: "rsc-optimistic",
      category: "Web Engineering",
      title: "React 19 useOptimistic Mutation Pattern",
      description: "Tactile UI update pattern for Server Actions before network roundtrip resolves.",
      code: `import { useOptimistic } from 'react';

export function ChapterToggle({ chapter, onToggle }: { chapter: Chapter, onToggle: Function }) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(
    chapter.isCompleted,
    (state, newStatus: boolean) => newStatus
  );

  const handleAction = async () => {
    setOptimisticStatus(!optimisticStatus);
    await onToggle(chapter.id);
  };

  return (
    <button onClick={handleAction}>
      {optimisticStatus ? "Completed" : "Incomplete"}
    </button>
  );
}`,
    },
    {
      id: "framer-springs",
      category: "Product Design",
      title: "Damped Spring Motion Tokens",
      description: "Natural, tactile physics spring configurations for Framer Motion transitions.",
      code: `// Gentle Card Hover
export const cardSpring = {
  type: "spring",
  stiffness: 400,
  damping: 25,
};

// Micro Button Press Feedback
export const buttonPress = {
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 500, damping: 25 },
};`,
    },
    {
      id: "system-design-math",
      category: "Architecture",
      title: "System Design Latency & Scale Cheat Sheet",
      description: "Quick back-of-the-envelope calculations for system architecture interviews & planning.",
      code: `// Latency Numbers Every Engineer Should Know:
- L1 Cache Reference: 0.5 ns
- Main Memory (RAM) Read: 100 ns
- NVMe SSD Read: 150 µs
- Round-Trip Data Center RTT: 500 µs
- Packet RTT US East to US West: 150 ms

// Scale Conversions:
- 1 Million DAU = ~12 Requests / Sec (Average)
- 10 Million DAU = ~120 Requests / Sec
- 100 Million DAU = ~1,200 Requests / Sec`,
    },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast({
      type: "success",
      title: "Copied to Clipboard! 📋",
      description: "Ready to paste into your codebase or prompts.",
    });

    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8 flex-1">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
            <Code className="w-4 h-4" /> Practical Reference Toolkits
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C2A26]">
            Cheat Sheets & Quick Cookbooks
          </h1>
          <p className="text-xs text-[#52635E]">
            Bite-sized, copy-pasteable reference snippets for fast lookup during development sessions.
          </p>
        </div>

        {/* Toolkits List */}
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
                <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                  {kit.title}
                </h3>
                <p className="text-xs text-[#52635E] mt-1">
                  {kit.description}
                </p>
              </div>

              {/* Code Snippet Box */}
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
