import type { CatalogStatus } from "../../_catalog";
import { meta as promptJson, snippet as promptJsonSnippet } from "./prompt-json/meta";
import { meta as rscOptimistic, snippet as rscOptimisticSnippet } from "./rsc-optimistic/meta";
import { meta as framerSprings, snippet as framerSpringsSnippet } from "./framer-springs/meta";
import { meta as systemDesignMath, snippet as systemDesignMathSnippet } from "./system-design-math/meta";

export type ToolkitRegistryEntry = {
  id: string;
  title: string;
  tool: string;
  status: CatalogStatus;
  order: number;
  category: string;
  description: string;
  snippet: string;
};

/**
 * Plain rows you can copy. Next.js also needs a static `import` at the top
 * for the new folder — it will not pick up a directory on its own.
 */
export const TOOLKITS: ToolkitRegistryEntry[] = [
  { id: "prompt-json", title: "LLM Structured JSON Output Prompt", tool: "openai", status: "active", order: 1, category: promptJson.category, description: promptJson.description, snippet: promptJsonSnippet },
  { id: "rsc-optimistic", title: "React 19 useOptimistic Mutation Pattern", tool: "react", status: "active", order: 2, category: rscOptimistic.category, description: rscOptimistic.description, snippet: rscOptimisticSnippet },
  { id: "framer-springs", title: "Damped Spring Motion Tokens", tool: "framer-motion", status: "active", order: 3, category: framerSprings.category, description: framerSprings.description, snippet: framerSpringsSnippet },
  { id: "system-design-math", title: "System Design Latency & Scale Cheat Sheet", tool: "architecture", status: "active", order: 4, category: systemDesignMath.category, description: systemDesignMath.description, snippet: systemDesignMathSnippet },
];

export function listedToolkits() {
  return TOOLKITS.filter((t) => t.status === "active")
    .sort((a, b) => a.order - b.order)
    .map((t) => ({
      id: t.id,
      title: t.title,
      category: t.category,
      description: t.description,
      code: t.snippet,
    }));
}
