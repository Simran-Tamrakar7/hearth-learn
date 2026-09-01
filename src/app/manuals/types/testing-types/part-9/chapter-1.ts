import type { ChapterRecord } from "../../../types";

/** A/B Testing */
export const chapter = {
  "id": "tt-ab-testing",
  "overlayNo": 33,
  "title": "A/B Testing",
  "minutes": 20,
  "level": "intermediate",
  "phase": "Part 9 · Modern Engineering & Integrations",
  "partName": "Part 9 · Modern Engineering & Integrations",
  "overviewText": "A/B testing compares two (or more) versions of a feature — shown to different segments of real users simultaneously — to measure which version actually performs better against a specific, predefined metric (conversion rate, engagement, completion rate), rather than deciding through opinion or internal debate.",
  "why": "Teams often disagree about which of two designs, copy choices, or flows is 'better,' and that disagreement is frequently unresolvable through discussion alone — different people have genuinely different intuitions. A/B testing replaces that debate with real evidence: actual user behavior, measured against a specific metric, decides the outcome. It also catches cases where a change that feels like an improvement to the team actually performs worse with real users.",
  "when": "When there's a genuine, specific decision to make between two or more concrete alternatives, and enough traffic/users to reach a statistically meaningful result in a reasonable timeframe. Not useful for low-traffic features or purely subjective creative decisions with no clear success metric to measure against.",
  "practical": {
    "app": "HRMS Leave Request Form Length",
    "scenario": "The team hypothesizes that removing the optional 'Additional Comments' field from the leave request form will increase completion rate, but disagrees on whether it's worth the loss of context for approvers.",
    "pass": "The shorter form variant shows a statistically significant 9% increase in completion rate over two weeks, with no measurable increase in approval-stage back-and-forth — settling the debate with evidence rather than opinion.",
    "fail": "Teams spend 3 weeks debating in meeting rooms without data, while completion rates drop on unoptimized legacy forms."
  },
  "advantages": [
    "Replaces subjective opinion with real, measured user behavior on a specific metric",
    "Free, self-hostable, and integrates with feature-flagging, so variants can be toggled without a redeploy",
    "Statistical significance reporting prevents decisions based on noise or too-small samples",
    "Builds an organizational record of what's actually been tried and what the real outcome was"
  ],
  "limitations": [
    "Requires meaningful traffic/user volume to reach significance in a reasonable time",
    "Only measures the specific metric chosen — can miss secondary qualitative impacts",
    "Running many simultaneous experiments on overlapping segments can create interaction effects",
    "Requires real discipline to wait for statistical significance rather than reacting prematurely"
  ],
  "tools": [
    {
      "name": "GrowthBook",
      "sub": "Open-Source Feature Flagging & Experimentation Platform",
      "url": "https://growthbook.io",
      "desc": "An open-source feature flagging and A/B testing platform — lets a team split real users into variant groups, serve each group a different version of a feature, and analyze which variant wins against a chosen metric, with a self-hostable free tier.",
      "adv": [
        "Self-hostable open-source engine with zero vendor lock-in",
        "Built-in Bayesian and Frequentist statistical calculation engines",
        "SDK support for Next.js, React, Node.js, Python, iOS, and Android",
        "Connects directly to your data warehouse (Postgres, BigQuery, Snowflake)"
      ],
      "lim": [
        "Requires connecting an analytics data warehouse for automated metric queries"
      ],
      "steps": [
        {
          "t": "Step 1 — Initialize GrowthBook SDK in Next.js frontend",
          "p": "Load feature flags and assign user to variant group based on user UUID.",
          "c": "import { GrowthBook } from '@growthbook/growthbook-react';\nconst gb = new GrowthBook({\n  apiHost: 'https://growthbook.company.com',\n  clientKey: 'sdk-prod-key-1892'\n});"
        },
        {
          "t": "Step 2 — Define variant feature flag in code",
          "p": "Branch form layout based on experiment feature flag value.",
          "c": "const formVariant = gb.getFeatureValue('hrms_leave_form_length', 'control');\n// 'control' -> Full form | 'variant_compact' -> Compact 1-step form"
        },
        {
          "t": "Step 3 — Track conversion event on form submission",
          "p": "Dispatch completed_leave_request telemetry event to analytics pipeline.",
          "c": "analytics.track('leave_request_completed', {\n  userId: user.id,\n  durationMs: elapsedTime,\n  variant: formVariant\n});"
        },
        {
          "t": "Step 4 — Evaluate statistical significance in dashboard",
          "p": "Review p-value and confidence interval before declaring winner.",
          "c": "GrowthBook Dashboard:\n- Variant Compact: +9.2% Conversion (p = 0.003 -> 99.7% Statistically Significant)\n- Action: Promote Variant Compact to 100% rollout"
        }
      ]
    }
  ],
  "contentMarkdown": "## Feature Flag Experimentation & Statistical Analysis\n\nImplement multivariate feature branches and track conversion telemetry to achieve statistically validated optimizations.\n\n```\nnpm run test -- tests/analytics/ab-tracking.spec.ts\n```",
  "exercises": [],
  "resourceLinks": [],
  "steps": [],
  "learn": []
} as ChapterRecord;
