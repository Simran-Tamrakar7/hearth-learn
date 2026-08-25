"use client";

/* PAGE: /showcase-wall  — this file is the screen. Featured repos: content/showcase/_registry.ts. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { PinButton, getPinnedItems, PinnedItemMetadata } from "@/components/ui/PinButton";
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
  Code2,
  Star,
  GitFork,
  Filter,
  Terminal,
  Cpu,
  Pin,
} from "lucide-react";

interface ShowcaseProject {
  id: string;
  title: string;
  description: string;
  linkUrl: string;
  createdAt: string;
  language?: string;
  category?: string;
  stars?: number;
  forks?: number;
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
  const [activeCategoryFilter, setActiveCategoryFilter] = useState("All");

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [selectedTrailId, setSelectedTrailId] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [pinnedProjects, setPinnedProjects] = useState<PinnedItemMetadata[]>([]);

  useEffect(() => {
    fetchShowcaseAndTrails();
  }, []);

  useEffect(() => {
    const updatePins = () => {
      setPinnedProjects(getPinnedItems().filter((p) => p.type === "showcase"));
    };
    updatePins();
    window.addEventListener("hearth_pins_updated", updatePins);
    return () => window.removeEventListener("hearth_pins_updated", updatePins);
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
        description: "Your proof of work has been recorded on the Showcase Wall.",
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

  const categories = ["All", "QA Automation", "Full Stack & React", "Python / CLI & Tools"];

  const filteredProjects = projects.filter((proj) => {
    if (activeCategoryFilter === "All") return true;
    if (activeCategoryFilter === "QA Automation") return proj.category === "QA Automation" || proj.title.toLowerCase().includes("cypress") || proj.title.toLowerCase().includes("selenium");
    if (activeCategoryFilter === "Full Stack & React") return proj.category === "Full Stack & React" || proj.language?.includes("TypeScript") || proj.language?.includes("React");
    if (activeCategoryFilter === "Python / CLI & Tools") return proj.language?.includes("Python") || proj.language?.includes("C++") || proj.category?.includes("CLI");
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 w-full space-y-6 flex-1">
        {/* Header Banner */}
        <div className="bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] border border-[#E7E0D3] rounded-2xl p-5 sm:p-7 space-y-3 shadow-2xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div className="space-y-1.5 w-full">
              <Badge variant="amber" icon={<Code2 className="w-3.5 h-3.5" />}>
                GITHUB PROOF OF WORK WALL
              </Badge>

              <h1 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#1C2A26] tracking-tight">
                Simran Tamrakar&apos;s Showcase Wall
              </h1>

              <p className="text-xs sm:text-sm text-[#52635E] leading-relaxed w-full">
                Extracted directly from GitHub (<a href="https://github.com/Simran-Tamrakar7" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#D97706]">github.com/Simran-Tamrakar7</a>). Featuring 17 open-source repositories spanning Playwright automation, Cypress POM frameworks, Next.js 16 full-stack apps, and Python tools. Click any card to open the repository.
              </p>
            </div>

            <Button
              variant="amber"
              size="sm"
              onClick={() => setIsCreating(!isCreating)}
              leftIcon={isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              className="shrink-0"
            >
              {isCreating ? "Close Form" : "Log New Project"}
            </Button>
          </div>
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
              <Card variant="default" hoverable={false} className="p-5 sm:p-6 space-y-4 border-[#E7E0D3] rounded-2xl">
                <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#1C2A26]">
                  Log Custom Built Project to Showcase Wall
                </h3>

                <form onSubmit={handleCreateProject} className="space-y-3">
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Project Name / Title
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Next.js Server Components Micro-LMS"
                      className="w-full h-9 px-3 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Project URL (GitHub Repo, Figma, or Live App)
                    </label>
                    <input
                      type="url"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://github.com/Simran-Tamrakar7/my-project"
                      className="w-full h-9 px-3 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Associated Trail (Optional)
                    </label>
                    <select
                      value={selectedTrailId}
                      onChange={(e) => setSelectedTrailId(e.target.value)}
                      className="w-full h-9 px-3 text-xs bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl"
                    >
                      <option value="">-- General Project (No Specific Trail) --</option>
                      {trailsList.map((t) => (
                        <option key={t.id} value={t.id}>
                          {t.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-[#52635E]">
                      Brief Description / What You Built
                    </label>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Short summary of key architectural patterns implemented..."
                      className="w-full p-3 text-xs sm:text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706]"
                    />
                  </div>

                  {formError && (
                    <div className="flex items-center gap-2 p-2.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="flex justify-end gap-2.5 pt-1">
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

        {pinnedProjects.length > 0 && (
          <div className="space-y-4 bg-gradient-to-br from-white via-[#FAF7F2] to-[#FEF3C7]/40 border border-[#E7E0D3] rounded-3xl p-6 shadow-xs">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-xl font-bold text-[#1C2A26] flex items-center gap-2">
                <Pin className="w-5 h-5 text-[#D97706]" />
                <span>Your Pinned Showcase Links ({pinnedProjects.length})</span>
              </h2>
              <span className="text-xs text-[#8A9B95] font-semibold">Opens in a new tab</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {pinnedProjects.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-[#E7E0D3] rounded-2xl p-4 flex flex-col justify-between space-y-3 shadow-2xs hover:border-[#1C2A26] transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <Code2 className="w-4 h-4 text-[#D97706]" />
                      <PinButton
                        itemId={item.id}
                        itemTitle={item.title}
                        itemCategory={item.category}
                        itemType="showcase"
                        itemUrl={item.url}
                        itemIcon={item.icon}
                        variant="icon"
                      />
                    </div>
                    <h3 className="font-serif-display font-bold text-base text-[#1C2A26] truncate pt-1">
                      {item.title}
                    </h3>
                    {item.category && (
                      <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-wider block">
                        {item.category}
                      </span>
                    )}
                  </div>

                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 w-full h-9 px-3 rounded-xl bg-[#D97706] text-white text-xs font-semibold hover:bg-[#b45309] transition-colors"
                  >
                    Open Link
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E7E0D3] pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#8A9B95] uppercase tracking-wider flex items-center gap-1 mr-1">
              <Filter className="w-3.5 h-3.5" /> Filter Category:
            </span>
            {categories.map((cat) => {
              const count = projCountForCat(projects, cat);
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                    activeCategoryFilter === cat
                      ? "bg-[#1C2A26] text-white shadow-xs"
                      : "bg-white text-[#52635E] border border-[#E7E0D3] hover:border-[#D97706]"
                  }`}
                >
                  {cat} <span className="opacity-60 font-mono text-[10px]">({count})</span>
                </button>
              );
            })}
          </div>

          <a
            href="https://github.com/Simran-Tamrakar7"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#D97706] hover:underline"
          >
            <Code2 className="w-4 h-4" /> View Full Profile on GitHub →
          </a>
        </div>

        {/* Projects Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-40 animate-pulse bg-white/50">
                <div className="text-xs text-transparent">Loading GitHub repository...</div>
              </Card>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-[#E7E0D3] p-6 space-y-2">
            <Globe className="w-7 h-7 text-[#8A9B95] mx-auto" />
            <h3 className="font-serif-display font-semibold text-base">No projects match filter</h3>
            <p className="text-xs text-[#52635E]">
              Try selecting &quot;All&quot; to view all 17 public GitHub repositories.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredProjects.map((proj) => (
              <a
                key={proj.id}
                href={proj.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D97706] rounded-2xl group"
              >
                <Card
                  hoverable
                  className="h-full flex flex-col justify-between p-5 space-y-3.5 border-[#E7E0D3] bg-white group-hover:border-[#D97706] group-hover:shadow-md transition-all rounded-2xl"
                >
                  <div className="space-y-2.5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#D97706]" />
                        {proj.language && (
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#FAF7F2] text-[#52635E] border border-[#E7E0D3]">
                            {proj.language}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <PinButton
                          itemId={proj.id}
                          itemTitle={proj.title}
                          itemCategory={proj.category || proj.trail?.category}
                          itemType="showcase"
                          itemUrl={proj.linkUrl}
                          variant="icon"
                        />
                        <span
                          className="p-1.5 rounded-xl bg-[#FAF7F2] text-[#D97706] group-hover:bg-[#FEF3C7] transition-colors"
                          title="Open project link"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <h3 className="font-serif-display font-bold text-base sm:text-lg text-[#1C2A26] group-hover:text-[#D97706] transition-colors leading-snug">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-[#52635E] leading-relaxed line-clamp-3">
                      {proj.description || "No description provided."}
                    </p>

                    <p className="text-[11px] font-semibold text-[#D97706] truncate underline-offset-2 group-hover:underline">
                      {proj.linkUrl.replace(/^https?:\/\//, "")}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7E0D3] flex items-center justify-between text-[11px] text-[#8A9B95]">
                    <div className="flex items-center gap-3 font-mono text-[10px]">
                      {proj.stars !== undefined && (
                        <span className="flex items-center gap-1 text-[#D97706] font-semibold">
                          <Star className="w-3 h-3 fill-[#D97706]" /> {proj.stars}
                        </span>
                      )}
                      {proj.forks !== undefined && (
                        <span className="flex items-center gap-1 text-[#52635E]">
                          <GitFork className="w-3 h-3" /> {proj.forks}
                        </span>
                      )}
                    </div>
                    <span className="truncate max-w-[120px]">{new Date(proj.createdAt).toLocaleDateString()}</span>
                  </div>
                </Card>
              </a>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}

function projCountForCat(projects: ShowcaseProject[], cat: string): number {
  if (cat === "All") return projects.length;
  if (cat === "QA Automation") return projects.filter((p) => p.category === "QA Automation" || p.title.toLowerCase().includes("cypress") || p.title.toLowerCase().includes("selenium")).length;
  if (cat === "Full Stack & React") return projects.filter((p) => p.category === "Full Stack & React" || p.language?.includes("TypeScript") || p.language?.includes("React")).length;
  if (cat === "Python / CLI & Tools") return projects.filter((p) => p.language?.includes("Python") || p.language?.includes("C++") || p.category?.includes("CLI")).length;
  return 0;
}
