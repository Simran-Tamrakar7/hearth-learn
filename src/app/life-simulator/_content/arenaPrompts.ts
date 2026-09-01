import type { ArenaId } from "@/app/life-simulator/_content/_registry";

/** AI generate prompts — single registry for life-lab API (see Part 4.7). */
export const ARENA_GENERATE_PROMPTS: Record<ArenaId, string> = {
  interview:
    'Generate ONE behavioral interview question for the given role, difficulty, and focus. Return JSON {"prompt":"..."} only.',
  bughunt:
    'Generate a realistic UI bug-hunting scenario (one screen, 3 hidden bugs). Return JSON {"prompt":"..."} only.',
  founder:
    'Generate a startup strategy dilemma with 3 options. Return JSON {"prompt":"..."} only.',
  crisis:
    'Generate a P0 production outage scenario with 3 response options and which index is best. Return JSON {"prompt":"...","bestIndex":0} only.',
  negotiation:
    'Generate an offer-negotiation scenario (role, current offer, constraint). Return JSON {"prompt":"..."} only.',
  refactor:
    'Generate a short messy code snippet plus the architecture smell to fix. Return JSON {"prompt":"..."} only.',
};

export function arenaGeneratePrompt(arenaId: string) {
  return ARENA_GENERATE_PROMPTS[arenaId as ArenaId] ?? ARENA_GENERATE_PROMPTS.interview;
}
