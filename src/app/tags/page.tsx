"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Tag, BookOpen, Search, ArrowRight, FileText } from "lucide-react";

interface NoteItem {
  id: string;
  title: string;
  body: string;
  tags: string;
  createdAt: string;
  trail?: {
    title: string;
  };
}

export default function TagsPage() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [selectedTag, setSelectedTag] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await fetch("/api/notes");
      const data = await res.json();
      if (data.notes) setNotes(data.notes);
    } catch (err) {
      console.error("Failed to load notes:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Derive unique tag list with counts
  const tagCounts: { [key: string]: number } = { all: notes.length };
  notes.forEach((n) => {
    const noteTags = n.tags ? n.tags.split(",").map((t) => t.trim().toLowerCase()) : ["general"];
    noteTags.forEach((t) => {
      if (t) tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const availableTags = Object.keys(tagCounts).sort();

  const filteredNotes = notes.filter((n) => {
    if (selectedTag === "all") return true;
    const noteTags = n.tags ? n.tags.split(",").map((t) => t.trim().toLowerCase()) : ["general"];
    return noteTags.includes(selectedTag);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C2A26]">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full space-y-8 flex-1">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] uppercase tracking-wider">
            <Tag className="w-4 h-4" /> Categorized Knowledge Base
          </div>
          <h1 className="font-serif-display text-3xl font-bold text-[#1C2A26]">
            Study Note Tag Index
          </h1>
          <p className="text-xs text-[#52635E]">
            Browse your accumulated study notes by topic tags across all skill trails.
          </p>
        </div>

        {/* Tag Cloud Selector */}
        <Card variant="glass" hoverable={false} className="p-6 space-y-3 border-[#E7E0D3]">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8A9B95] block mb-2">
            Filter by Topic Tag
          </span>

          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => {
              const isSelected = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-[#1C2A26] text-[#FAF7F2] shadow-xs"
                      : "bg-[#F5EFE6] text-[#52635E] hover:text-[#1C2A26] hover:bg-[#EBE3D7]"
                  }`}
                >
                  <span>#{tag}</span>
                  <span
                    className={`px-1.5 py-0.2 text-[10px] rounded-full ${
                      isSelected ? "bg-[#D97706] text-white" : "bg-[#E7E0D3] text-[#52635E]"
                    }`}
                  >
                    {tagCounts[tag]}
                  </span>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Notes Grid List for Selected Tag */}
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
            <h3 className="font-serif-display font-semibold text-lg">No notes found for #{selectedTag}</h3>
            <p className="text-xs text-[#52635E]">Try selecting another tag or authoring a new study note.</p>
            <Link href="/notes">
              <Button variant="primary" size="sm">
                Author Note with Tag
              </Button>
            </Link>
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
                      <Badge variant="category">#{selectedTag}</Badge>
                      {note.trail && (
                        <span className="text-xs text-[#8A9B95] font-medium truncate">
                          {note.trail.title}
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif-display font-bold text-lg text-[#1C2A26]">
                      {note.title}
                    </h3>
                    <p className="text-xs text-[#52635E] leading-relaxed whitespace-pre-line">
                      {note.body}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E7E0D3] flex justify-between items-center text-[11px] text-[#8A9B95]">
                    <span>Saved on {new Date(note.createdAt).toLocaleDateString()}</span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
