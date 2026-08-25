import type { CatalogStatus } from "../types";

export type ArenaId = "interview" | "bughunt" | "founder" | "crisis" | "negotiation" | "refactor";

export type ArenaRegistryEntry = {
  id: ArenaId;
  title: string;
  label: string;
  tool: string;
  status: CatalogStatus;
  order: number;
};

export const ARENAS: ArenaRegistryEntry[] = [
  { id: "interview", title: "STAR Interview Radar", label: "🎙️ STAR Interview Radar", tool: "interview", status: "active", order: 1 },
  { id: "bughunt", title: "QA Bug-Hunting Sandbox", label: "🐛 QA Bug-Hunting Sandbox", tool: "qa", status: "active", order: 2 },
  { id: "founder", title: "Founder Strategy Engine", label: "🚀 Founder Strategy Engine", tool: "startup", status: "active", order: 3 },
  { id: "crisis", title: "P0 Outage War Room", label: "🛡️ P0 Outage War Room", tool: "sre", status: "active", order: 4 },
  { id: "negotiation", title: "Offer Negotiation Sim", label: "💼 Offer Negotiation Sim", tool: "career", status: "active", order: 5 },
  { id: "refactor", title: "Code Architecture Refactor", label: "⚡ Code Architecture Refactor", tool: "code", status: "active", order: 6 },
];

export function listedArenas() {
  return ARENAS.filter((a) => a.status === "active").sort((a, b) => a.order - b.order);
}
