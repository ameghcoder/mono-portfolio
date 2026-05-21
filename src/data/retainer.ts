export interface PricingTier {
  name: string;
  price: number;
  hours: string;
  features: string[];
  bestFor: string;
  highlighted: boolean;
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface HandleColumn {
  title: string;
  items: string[];
}

export interface RetainerProblem {
  problem: string;
  resolution: string;
}

export interface OneTimeProject {
  label: string;
  tagline: string;
  description: string[];
  buttonText: string;
  calendarUrl: string;
  footnote: string;
}

export interface RetainerData {
  headline: string;
  subline: string;
  availability: string;
  problems: RetainerProblem[];
  whatIHandle: HandleColumn[];
  proof: {
    statement: string;
    points: string[];
  };
  pricing: {
    tiers: PricingTier[];
    note: string[];
  };
  oneTimeProject: OneTimeProject;
  process: ProcessStep[];
  finalCta: {
    headline: string;
    calendarUrl: string;
    email: string;
    responseNote: string;
  };
}

export const RETAINER_DATA: RetainerData = {
  headline: "Your part-time senior dev.\nNo hiring. No onboarding. Just shipping.",
  subline:
    "I work with 2–3 SaaS teams as a monthly technical retainer — full-stack development, database architecture, DevOps, and ongoing support. Async-first.",
  availability: "// Currently have 1 open spot for an Active or Fractional retainer client.",

  problems: [
    {
      problem: "Infra is breaking and nobody owns it",
      resolution: "I monitor, fix, and improve your stack every month.",
    },
    {
      problem: "AI features keep getting deprioritized",
      resolution:
        "I build RAG pipelines, chatbots, and AI integrations as part of your regular sprint.",
    },
    {
      problem: "You need a senior dev but can't afford full-time",
      resolution:
        "One monthly fee. Cancel anytime. I already know your stack before week 2.",
    },
  ],

  whatIHandle: [
    {
      title: "Full-Stack Development",
      items: [
        "Next.js · React · Node.js · TypeScript",
        "API design · Auth",
        "Third-party integrations",
      ],
    },
    {
      title: "Database & Infrastructure",
      items: [
        "PostgreSQL · Supabase · DB modeling",
        "Docker · GitHub Actions · CI/CD",
        "Linux server management",
      ],
    },
    {
      title: "AI Integration",
      items: [
        "RAG pipelines · Multi-model routing",
        "Agent workflows · Embeddings",
        "Vector DBs · LLM integration",
      ],
    },
  ],

  proof: {
    statement:
      "I've shipped production systems serving 45,000+ monthly users independently — from architecture to deployment.",
    points: [
      "Reduced page load 70% for a 2,000+ product catalog",
      "95+ Lighthouse scores maintained across all apps",
      "Built and scaled platforms to 1.2M+ monthly queries solo",
    ],
  },

  pricing: {
    tiers: [
      {
        name: "Support",
        price: 250,
        hours: "~10 hrs/month",
        features: [
          "Bug fixes & small features",
          "DevOps monitoring",
          "1 weekly async check-in",
        ],
        bestFor: "Stable products needing reliable maintenance",
        highlighted: false,
      },
      {
        name: "Active",
        price: 500,
        hours: "~20 hrs/month",
        features: [
          "Ongoing features + infra + support",
          "New integrations & DB optimization",
          "Regular shipping cadence",
        ],
        bestFor: "Growing products adding features monthly",
        highlighted: true,
      },
      {
        name: "Fractional",
        price: 950,
        hours: "~40 hrs/month",
        features: [
          "Near full-time technical ownership",
          "Full-stack + AI integrations",
          "Architecture decisions",
        ],
        bestFor: "Founders who need a technical co-pilot",
        highlighted: false,
      },
    ],
    note: [
      "All plans are month-to-month. No contracts. Cancel with 2 weeks notice.",
      "Rates are introductory — locked in for existing clients when prices increase.",
    ],
  },

  oneTimeProject: {
    label: "One-Time Project",
    tagline: "No monthly commitment",
    description: [
      "For a specific fix, feature, or integration you've been putting off.",
      "We scope it together, agree on a fixed price, and I ship it.",
    ],
    buttonText: "Book a scoping call →",
    calendarUrl: "https://cal.com/yrjdev/let-s-talk-about-your-stack",
    footnote: "Most one-time projects convert to retainers. No pressure either way.",
  },

  process: [
    {
      index: "01",
      title: "20-min call",
      description: "Understand your stack and needs",
    },
    {
      index: "02",
      title: "Proposal",
      description: "Scope, hours, and price confirmed in 24hrs",
    },
    {
      index: "03",
      title: "Start",
      description: "Async onboarding, no lengthy setup",
    },
    {
      index: "04",
      title: "Ship",
      description: "Weekly updates, monthly review",
    },
  ],

  finalCta: {
    headline: "Let's talk about your stack.",
    calendarUrl: "https://cal.com/yrjdev/let-s-talk-about-your-stack",
    email: "mintuser65@gmail.com",
    responseNote: "I respond within 24 hours. No sales process. Just a direct conversation.",
  },
};
