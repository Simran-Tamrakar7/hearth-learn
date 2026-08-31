import type { CatalogStatus } from "../../_catalog";
import { KEPT_BUILTIN_SLUGS } from "../_lib/keptManuals";

import { pathwiseManual as testingTypes } from "./testing-types/compiled.body.ts";
import { pathwiseManual as playwright } from "./playwright/compiled.body.ts";

/** Builtin manuals. Listing + bodies. A folder is invisible until this file imports its data.js. */
export type ManualRegistryEntry = {
  id: string;
  title: string;
  tool: string;
  status: CatalogStatus;
  order: number;
  tags: string[];
  featured?: boolean;
  pinnable?: boolean;
  pinIcon?: string;
  /** Chapter body from ./<id>/data.js or compiled from part-N/chapter-N.md */
  body: Record<string, unknown>;
};

export { KEPT_BUILTIN_SLUGS as KEPT_MANUAL_SLUGS };

export const MANUALS: ManualRegistryEntry[] = [
  {
    id: "testing-types",
    title: "Testing Types & Levels",
    tool: "testing-types",
    status: "active",
    order: 1,
    tags: ["automation"],
    featured: false,
    pinnable: true,
    pinIcon: "🧪",
    body: testingTypes,
  },
  {
    id: "playwright",
    title: "Playwright with Python",
    tool: "playwright",
    status: "active",
    order: 2,
    tags: ["automation"],
    featured: true,
    pinnable: true,
    pinIcon: "🎭",
    body: playwright,
  },
];

export const activeManuals = () => MANUALS.filter((m) => m.status === "active");
export const activeManualSlugs = () => new Set(activeManuals().map((m) => m.id));
export const pinnableManuals = () =>
  activeManuals()
    .filter((m) => m.pinnable)
    .map((m) => ({
      id: `man-${m.id}`,
      title: m.title,
      slug: m.id,
      icon: m.pinIcon || "📘",
    }));
