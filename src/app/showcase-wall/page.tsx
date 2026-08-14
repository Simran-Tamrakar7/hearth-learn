"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  ExternalLink,
  Plus,
  Globe,
  Sparkles,
  Layers,
  BookOpen,
  X,
  AlertCircle,
  CheckCircle2,
  Code,
} from "lucide-react";

interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  linkUrl: string;
  createdAt: string;
  trail?: {
    title: string;
    category: string;
  };
}

export default function ShowcaseWallPage() {
  const { toast } = useToast();
  const [projects, setProjects] = useState<ShowcaseProject[]>([]);
  const [trailsList, setTrailsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedTrailId, setSelectedTrailId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetchShowcaseAndTrails();
  }, []);

  const fetchShowcaseAndTrails = async () => {
    try {
      const [showcaseRes, trailsRes] = await Promise.all([
        fetch("/api/showcase"),
        fetch("/api/trails"),
      ]);

      const showcaseData = await showcaseRes.json();
      const trailsData = await trailsRes.json();

      if (showcaseData.items) setProjects(showcaseData.items);
      if (trailsData.trails) setTrailsList(trailsData.trails);
    } catch (err) {
      console.error("Error loading showcase wall:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Please enter a project title.");
      return;
    }
    if (!linkUrl.trim()) {
      setFormError("Please provide a repository or project link URL.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/showcase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          linkUrl,
          trailId: selectedTrailId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to save project");
        return;
      }

      setProjects((prev) => [data.item, ...prev]);
      toast({
        type: "achievement",
        title: "Project Logged to Wall! 🚀",
        description: "Your proof of work has been recorded.",
      });

      setTitle("");
      setDescription("");
      setLinkUrl("");
      setSelectedTrailId("");
      setIsCreating(false);
    } catch (err) {
      setFormError("Unexpected error occurred.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8 flex-1">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> Personal Proof of Work
            </div>
            <h1 className="font-serif-display text-3xl font-bold text-[#1C2A26]">
              Showcase Wall (&quot;What You&apos;ve Built&quot;)
            </h1>
            <p className="text-xs text-[#52635E]">
              Log GitHub repos, Figma designs, and live apps completed while mastering your skill trails.
            </p>
          </div>

          <Button
            variant="amber"
            onClick={() => setIsCreating(!isCreating)}
            leftIcon={isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          >
            {isCreating ? "Close Form" : "Log New Project"}
          </Button>
        </div>

        {/* Create Form Card */}
        <AnimatePresence>
          {isCreating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card variant="default" hoverable={false} className="p-6 sm:p-8 space-y-6 border-[#E7E0D3]">
                <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                  Log Built Project / Portfolio Output
                </h3>

                <form onSubmit={handleCreateProject} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Project Name / Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Next.js Server Components Micro-LMS"
                      className="w-full h-11 px-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Project URL (GitHub Repo, Figma, or Live App)
                    </label>
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://github.com/username/my-project"
                      className="w-full h-11 px-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Associated Trail (Optional)
                    </label>
                    <select
                      value={selectedTrailId}
                      onChange={(e) => setSelectedTrailId(e.target.value)}
                      className="w-full h-11 px-4 text-xs bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl"
                    >
                      <option value="">-- General Project (No Specific Trail) --</option>
                      {trailsList.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Brief Description / What You Built
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Short summary of key architectural patterns implemented..."
                      className="w-full p-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  {formError && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <Button variant="ghost" size="sm" onClick={() => setIsCreating(false)}>
                      Cancel
                    </Button>
                    <Button variant="amber" size="sm" isLoading={isSaving}>
                      Log to Showcase Wall
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <Card key={i} className="h-44 animate-pulse bg-white/50">
                <div className="text-xs text-transparent">Loading project...</div>
              </Card>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E7E0D3] p-8 space-y-3">
            <Globe className="w-8 h-8 text-[#8A9B95] mx-auto" />
            <h3 className="font-serif-display font-semibold text-lg">No projects logged yet</h3>
            <p className="text-xs text-[#52635E]">
              Log a GitHub repo, demo URL, or design file created during your skill trail sessions.
            </p>
            <Button variant="primary" size="sm" onClick={() => setIsCreating(true)}>
              Log Your First Project
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj) => (
              <Card key={proj.id} className="h-full flex flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    {proj.trail ? (
                      <Badge variant="category">{proj.trail.title}</Badge>
                    ) : (
                      <Badge variant="pine">Independent Build</Badge>
                    )}
                    <a
                      href={proj.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-[#FAF7F2] text-[#D97706] hover:bg-[#FEF3C7] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-[#52635E] leading-relaxed">
                    {proj.description || "No description provided."}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E0D3] flex justify-between items-center text-[11px] text-[#8A9B95]">
                  <span className="font-mono text-[#D97706] truncate max-w-[240px]">
                    {proj.linkUrl}
                  </span>
                  <span>Logged {new Date(proj.createdAt).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
