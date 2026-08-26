"use client";

/* PAGE: /notes  — this file is the screen. Map: ./CODE-FOR-THIS-PAGE.md */

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import {
  FileText,
  Plus,
  Trash2,
  Search,
  CheckCircle2,
  AlertCircle,
  BookOpen,
  Sparkles,
  X,
  Tag,
} from "lucide-react";

interface NoteItem {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  trail?: {
    id: string;
    title: string;
    category: string;
  };
}

function NotesContent() {
  const searchParams = useSearchParams();
  const initialTrailId = searchParams.get("trailId") || "";
  const initialChapter = searchParams.get("chapter") || "";

  const { toast } = useToast();
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [trailsList, setTrailsList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Form states
  const [title, setTitle] = useState(
    initialChapter ? `Chapter ${initialChapter} Reflection Notes` : ""
  );
  const [body, setBody] = useState("");
  const [selectedTrailId, setSelectedTrailId] = useState(initialTrailId);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formError, setFormError] = useState("");
  const [dueReviews, setDueReviews] = useState<{ id: string; text: string; chapterId: string }[]>([]);

  useEffect(() => {
    fetchNotesAndTrails();
  }, []);

  const fetchNotesAndTrails = async () => {
    try {
      const [notesRes, trailsRes] = await Promise.all([
        fetch("/api/notes"),
        fetch("/api/trails"),
      ]);

      const notesData = await notesRes.json();
      const trailsData = await trailsRes.json();

      if (notesData.notes) setNotes(notesData.notes);
      if (trailsData.trails) setTrailsList(trailsData.trails);
      const dueRes = await fetch("/api/highlights?due=1");
      if (dueRes.ok) {
        const dueData = await dueRes.json();
        setDueReviews(Array.isArray(dueData.highlights) ? dueData.highlights : []);
      }
    } catch (err) {
      console.error("Failed to load notes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!title.trim()) {
      setFormError("Please enter a title for your note.");
      return;
    }
    if (!body.trim()) {
      setFormError("Note body content cannot be empty.");
      return;
    }

    setIsSaving(true);
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          body,
          trailId: selectedTrailId || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setFormError(data.error || "Failed to save note");
        return;
      }

      setSaveSuccess(true);
      toast({
        type: "success",
        title: "Study Note Saved! 📝",
        description: "Added to your study cabin archives.",
      });

      setNotes((prev) => [data.note, ...prev]);

      setTimeout(() => {
        setTitle("");
        setBody("");
        setSelectedTrailId("");
        setIsCreating(false);
        setSaveSuccess(false);
      }, 1000);
    } catch (err) {
      setFormError("Unexpected error occurred while saving.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    try {
      await fetch(`/api/notes?id=${id}`, { method: "DELETE" });
      setNotes((prev) => prev.filter((n) => n.id !== id));
      toast({
        type: "info",
        title: "Note Removed",
        description: "Study note deleted from archives.",
      });
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.trail && n.trail.title.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
            <FileText className="w-4 h-4" /> Personal Learning Sanctuary
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C2A26]">
            Study Cabin Notes
          </h1>
          <p className="text-xs text-[#52635E]">
            Capture key insights, code snippets, and mental models tied to your skill trails.
          </p>
        </div>

        <Button
          variant="primary"
          onClick={() => setIsCreating(!isCreating)}
          leftIcon={isCreating ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        >
          {isCreating ? "Close Editor" : "New Study Note"}
        </Button>
      </div>

      {dueReviews.length > 0 ? (
        <Card variant="default" hoverable={false} className="p-4 space-y-2">
          <h2 className="font-serif-display font-bold">Review later — due now</h2>
          <ul className="space-y-1 text-sm">
            {dueReviews.map((h) => (
              <li key={h.id}>“{h.text}”</li>
            ))}
          </ul>
        </Card>
      ) : null}

      {/* Animated Note Creation Form Card */}
      <AnimatePresence mode="popLayout">
        {isCreating && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -12 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card variant="default" hoverable={false} className="p-6 sm:p-8 space-y-6 shadow-md border-[#E7E0D3]">
              <div className="flex justify-between items-center pb-4 border-b border-[#E7E0D3]">
                <h3 className="font-serif-display font-semibold text-lg text-[#1C2A26] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#D97706]" />
                  Author Study Note
                </h3>
                <span className="text-xs text-[#8A9B95]">Markdown formatted</span>
              </div>

              <form onSubmit={handleCreateNote} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#52635E]">
                    Note Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (formError) setFormError("");
                    }}
                    placeholder="e.g. Server Components vs Client Components Rules"
                    className="w-full h-11 px-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white transition-all duration-200"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#52635E] flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" /> Associate with Skill Trail (Optional)
                  </label>
                  <select
                    value={selectedTrailId}
                    onChange={(e) => setSelectedTrailId(e.target.value)}
                    className="w-full h-11 px-4 text-xs bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white transition-all text-[#1C2A26]"
                  >
                    <option value="">-- General Study Note (No Trail) --</option>
                    {trailsList.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title} ({t.category})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-[#52635E]">
                    Note Body / Key Insights
                  </label>
                  <textarea
                    rows={5}
                    value={body}
                    onChange={(e) => {
                      setBody(e.target.value);
                      if (formError) setFormError("");
                    }}
                    placeholder="Write your study notes here... Key takeaways, code blocks, or reminders for tomorrow's session."
                    className="w-full p-4 text-sm bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white transition-all duration-200 resize-none font-sans-body"
                  />
                </div>

                <AnimatePresence>
                  {formError && (
                    <motion.div
                      initial={{ opacity: 0, y: -6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: "auto" }}
                      exit={{ opacity: 0, y: -6, height: 0 }}
                      className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {saveSuccess && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center justify-center gap-2 p-3 bg-[#EBF3F0] text-[#1C2A26] text-xs font-semibold rounded-xl"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#2D4A43]" />
                      <span>Note Saved Successfully!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex justify-end gap-3 pt-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsCreating(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="amber"
                    size="sm"
                    isLoading={isSaving}
                  >
                    Save Study Note
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#E7E0D3]">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A9B95]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by keyword or title..."
            className="w-full h-10 pl-9 pr-8 text-xs bg-[#FAF7F2] border border-[#E7E0D3] rounded-xl focus:outline-none focus:border-[#D97706] focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8A9B95] hover:text-[#1C2A26]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <span className="text-xs text-[#8A9B95] font-semibold hidden sm:inline">
          {filteredNotes.length} Notes Stored
        </span>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Card key={i} className="h-44 animate-pulse bg-white/50">
              <div className="text-xs text-transparent">Loading note...</div>
            </Card>
          ))}
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-[#E7E0D3] p-8 space-y-3">
          <BookOpen className="w-8 h-8 text-[#8A9B95] mx-auto" />
          <h3 className="font-serif-display font-semibold text-lg">No study notes found</h3>
          <p className="text-xs text-[#52635E]">
            Create a new study note or complete trail chapters to log insights.
          </p>
          <Button variant="primary" size="sm" onClick={() => setIsCreating(true)}>
            Author First Note
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredNotes.map((note) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="h-full flex flex-col justify-between p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    {note.trail ? (
                      <Badge variant="category">{note.trail.title}</Badge>
                    ) : (
                      <Badge variant="pine">General Study Note</Badge>
                    )}
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-[#8A9B95] hover:text-red-600 transition-colors p-1"
                      aria-label="Delete note"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                    {note.title}
                  </h3>
                  <p className="text-xs text-[#52635E] leading-relaxed whitespace-pre-line">
                    {note.body}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7E0D3] flex justify-between items-center text-[11px] text-[#8A9B95]">
                  <span>
                    Saved on {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NotesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12 py-10 w-full flex-1">
        <Suspense fallback={<div className="p-8 text-center text-xs text-[#8A9B95]">Loading notes...</div>}>
          <NotesContent />
        </Suspense>
      </main>
    </div>
  );
}
