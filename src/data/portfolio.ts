export interface ProjectLinks {
  live?: string;
  github?: string;
  npm?: string;
}

export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  // Homepage listing fields (present on featured projects)
  index?: string;
  metric?: string;
  tags: string[];
  featured: boolean;
  openSource: boolean;
  // Detail page content
  fullContent: {
    overview: string;
    challenge: string;
    solution: string;
    tech: string[];
    impact: string[];
    links: ProjectLinks;
  };
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  metric: string;
}

export interface CurrentlyBuilding {
  title: string;
  label: string;
  description: string;
  tags: string[];
}

export interface ProofStat {
  value: string;
  label: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    headline: string;
    bio: string;
    location: string;
    availability: string;
    email: string;
    resume: string;
    avatar: string;
    calendarUrl: string;
    repoUrl: string;
  };
  currentlyBuilding: CurrentlyBuilding[];
  proofStrip: ProofStat[];
  projects: Project[];
  experience: Experience[];
  socials: {
    label: string;
    url: string;
    icon: "linkedin" | "github" | "twitter";
  }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Yashraj Yadav",
    role: "AI Engineer & Full-Stack Developer",
    headline:
      "I build AI-powered systems and production infrastructure for SaaS teams — from architecture to deployment.",
    bio: "4+ years building production systems. 45,000+ monthly users. I own the full stack.",
    location: "Rajasthan, India / Remote",
    availability: "// AVAILABLE FOR RETAINER & PROJECTS",
    email: "mintuser65@gmail.com",
    resume:
      "https://docs.google.com/document/d/1iF_eRrJdFLTWHE0vuzUMElzyc7VQyWfSZRs8iLpOOec/edit?usp=sharing",
    avatar: "/yrjdev.jpg",
    calendarUrl: "https://cal.com/yrjdev/let-s-talk-about-your-stack",
    repoUrl: "https://github.com/ameghcoder/mono-portfolio",
  },

  currentlyBuilding: [
    {
      title: "SupportIQ",
      label: "IN BUILD",
      description:
        "AI support widget that auto-crawls your site and answers user questions. Zero manual setup.",
      tags: ["RAG", "Multi-model routing", "Drop-in widget"],
    },
    {
      title: "Cliy",
      label: "IN BUILD",
      description:
        "Component registry infrastructure for AI agents. Verified assembly over generation.",
      tags: ["AST extraction", "pgvector", "Agent SDK"],
    },
  ],

  proofStrip: [
    { value: "50k+", label: "Monthly Users" },
    { value: "4.3M+", label: "Image Impressions" },
    { value: "1.2M+", label: "Monthly Queries" },
    { value: "4+", label: "Open Source Packages" },
  ],

  projects: [
    {
      slug: "creatorjot",
      title: "CreatorJot",
      type: "AI Content Pipeline for YouTube Content Repurpose",
      description:
        "An AI-powered pipeline that repurposes YouTube content into platform-ready assets using a custom transcript segmentation algorithm and distributed job orchestration.",
      featured: true,
      openSource: false,
      index: "01",
      metric: "97+ Lighthouse score across multi-service Railway deployment",
      tags: ["Next.js 15", "pg-boss", "Gemini AI"],
      fullContent: {
        overview:
          "Designed and built an end-to-end AI content repurposing system that extracts high-signal angles from YouTube transcripts and generates hooks, summaries, and key moments tailored to each platform.",
        challenge:
          "LLMs collapsed JSON structure, fabricated timestamps, and missed extraction targets when processing long-form transcripts — requiring a principled approach to prompt engineering and output validation.",
        solution:
          "Designed a custom 'Transcript Checkpoints' algorithm that partitions transcripts into discrete segments, each scored 1–10 by the model for relevance, automatically selecting the highest-signal angle. Paired with a pg-boss distributed job pipeline enforcing forbidden phrases, verbatim evidence usage, and platform-specific formatting constraints.",
        tech: [
          "Next.js 15",
          "TypeScript",
          "Express 5",
          "Supabase",
          "PostgreSQL",
          "pg-boss",
          "Gemini AI",
          "Claude AI",
          "Railway",
          "Supabase Realtime",
          "SSE",
        ],
        impact: [
          "97+ Lighthouse score across multi-service Railway deployment",
          "5 independent nodes: API, workers, frontend",
          "Real-time progress tracking via Supabase Realtime/SSE",
          "Structural prompt constraints eliminating JSON collapse and timestamp fabrication",
          "Concurrent AI transcript extraction and content generation via distributed job pipeline",
        ],
        links: {
          live: "https://creatorjot.com",
        },
      },
    },
    {
      slug: "flowforge",
      title: "FlowForge",
      type: "Node Abstraction Layer for Composable AI Workflows",
      description:
        "A config-driven orchestration system for building composable AI workflows, where all node types are defined as JSON and rendered by a single universal controller.",
      featured: true,
      openSource: false,
      index: "02",
      metric:
        "Zero per-node component boilerplate via universal NodeController",
      tags: ["ReactFlow", "Zustand", "Runtime registry"],
      fullContent: {
        overview:
          "FlowForge is a data-driven node abstraction layer that eliminates per-node component boilerplate by defining all node types as JSON config rendered through a single universal NodeController.",
        challenge:
          "Traditional node-based workflow builders require per-node React components, creating scaling friction as new node types are added and making runtime extensibility difficult.",
        solution:
          "Engineered a type-based field registry (registerField/getField) mapping field type strings to React components at runtime, so new field types plug in without touching rendering logic. Dynamic ReactFlow handle generation auto-spawns input handles as users type {{variable}} syntax, parsed via regex diff against prior textarea state.",
        tech: ["JavaScript", "React", "ReactFlow", "Zustand", "Tailwind CSS"],
        impact: [
          "Zero per-node component boilerplate via universal NodeController",
          "Runtime-extensible field registry — new field types require no rendering changes",
          "Dynamic handle generation from {{variable}} syntax via regex diff parsing",
        ],
        links: {},
      },
    },
    {
      slug: "pixearn",
      title: "PixEarn",
      type: "Creator Monetization Platform",
      description:
        "A production-grade platform serving 45,000+ Monthly Views & 19,000+ Monthly Active Users with real-time analytics, revenue distribution and more.",
      featured: true,
      openSource: false,
      index: "03",
      metric: "1.2M+ monthly queries at <150ms avg response",
      tags: ["Next.js", "Supabase", "PostgreSQL"],
      fullContent: {
        overview:
          "Designed and deployed a creator platform handling 1.2M+ queries monthly with <100–150ms average response time.",
        challenge:
          "Built and scaled real-time impression and engagement analytics, handling high-concurrency database traffic while enforcing row-level security with PostgreSQL RLS.",
        solution:
          "Implemented edge-optimized SSR, custom database indexing, and a Sharp-driven image processing pipeline reducing storage costs by 40%.",
        tech: [
          "Next.js",
          "TypeScript",
          "Supabase",
          "PostgreSQL",
          "Zustand",
          "Tailwind CSS",
          "Sharp",
          "Node.js",
          "Railway",
        ],
        impact: [
          "45,000+ Monthly Views",
          "19,000+ Monthly Active Users",
          "1.2M+ Monthly Queries",
          "98+ Lighthouse Performance Score",
          "1,200+ Creators Joined",
        ],
        links: {
          live: "https://pixearn.com",
        },
      },
    },
    {
      slug: "regify",
      title: "Regify",
      type: "Component Registry CLI",
      description:
        "Automated registry generation engine for modern UI libraries, bridging the gap between source and discovery.",
      featured: false,
      openSource: true,
      tags: ["Node.js", "TypeScript", "ts-morph"],
      fullContent: {
        overview:
          "A CLI tool for generating component registries compatible with shadcn/ui CLI, automating registry.json creation.",
        challenge:
          "Parsed complex React component ASTs to extract metadata and dependency relationships, enabling clean component separation and registry management.",
        solution:
          "Built a robust parser using ts-morph for deep AST manipulation and custom scaffolding logic for maintainers.",
        tech: ["Node.js", "TypeScript", "Commander.js", "ts-morph"],
        impact: [
          "100+ Downloads",
          "Used by UI libraries",
          "95% reduction in manual effort",
        ],
        links: {
          npm: "https://www.npmjs.com/package/regify",
          live: "https://regify-cli.vercel.app",
          github: "https://github.com/ameghcoder/regify",
        },
      },
    },
    {
      slug: "stl",
      title: "STL",
      type: "Structured Table Language",
      description:
        "Framework-agnostic DSL for building clean, interactive tables with schema-driven architecture.",
      featured: false,
      openSource: true,
      tags: ["TypeScript", "Node.js", "DSL"],
      fullContent: {
        overview:
          "A domain-specific language that converts STL syntax to structured JSON for programmatic table generation.",
        challenge:
          "Creating a parsing engine that remains flexible across React, Vue, and vanilla JavaScript environments.",
        solution:
          "Developed a core parser and CLI tool that reduces table boilerplate code by 70% for developers.",
        tech: ["TypeScript", "Node.js", "Commander.js", "npm"],
        impact: [
          "70% reduction in boilerplate",
          "Version control-friendly table definitions",
          "Sanity CMS plugin integration",
        ],
        links: {
          github: "https://github.com/ameghcoder/structured-table",
          live: "https://stl-table.vercel.app",
          npm: "https://www.npmjs.com/package/structured-table",
        },
      },
    },
    {
      slug: "sanity-plugin-stl-table",
      title: "Sanity CMS Table Plugin",
      type: "Sanity CMS Plugin",
      description:
        "A Sanity Studio plugin that enables content creators to author complex, flexible tables using Structured Table Language (STL) with live preview support.",
      featured: false,
      openSource: true,
      tags: ["TypeScript", "Sanity Studio", "React"],
      fullContent: {
        overview:
          "A Sanity Studio plugin that introduces a dedicated STL editor and live preview for building complex tables beyond the limitations of standard Portable Text tables. Table data is stored as raw STL strings and rendered using the structured-table core package.",
        challenge:
          "Sanity's default table blocks struggle with advanced layouts such as merged cells, multi-level headers, and rich formatting, making complex tables difficult to author and maintain.",
        solution:
          "Integrated Structured Table Language into Sanity Studio via a custom input and preview workflow, allowing editors to write STL directly while leveraging the structured-table package for parsing and rendering both in Studio and on the frontend.",
        tech: [
          "TypeScript",
          "Sanity Studio",
          "React",
          "structured-table",
          "structured-table-cli",
        ],
        impact: [
          "Enabled complex table layouts with row spans, column spans, header, footer, rich cells and more",
          "Improved editor experience with real-time table previews inside Sanity Studio",
          "Version-control-friendly table definitions stored as readable STL strings",
          "Seamless SSR-compatible rendering for frontend frameworks like Next.js",
        ],
        links: {
          github: "https://github.com/ameghcoder/sanity-plugin-stl-table",
          live: "https://stl-table.vercel.app/docs/integration/sanity-studio",
          npm: "https://www.npmjs.com/package/sanity-plugin-stl-table",
        },
      },
    },
    {
      slug: "fysk",
      title: "Fysk",
      type: "Smart Component Library",
      description:
        "Intelligent UI kit built on top of shadcn/ui with state-aware components and automated adaptation.",
      featured: false,
      openSource: true,
      tags: ["Next.js", "Turborepo", "shadcn/ui"],
      fullContent: {
        overview:
          "A premium UI library featuring an interactive component preview system and custom registry integration.",
        challenge:
          "Architecting a monorepo structure that balances documentation, package distribution, and performance.",
        solution:
          "Optimized monorepo builds using Turborepo and PNPM workspaces, with custom automation to convert components into registry-ready files.",
        tech: [
          "Next.js",
          "Tailwind CSS",
          "Turborepo",
          "PNPM",
          "shadcn/ui",
          "MDX",
        ],
        impact: [
          "Zero-config installation flow",
          "Live state visualization system",
          "Integrated documentation site",
        ],
        links: {
          live: "https://fysk.dev",
        },
      },
    },
  ],

  experience: [
    {
      company: "Vidharat Marketing",
      role: "Senior Full-Stack Developer",
      period: "Mar 2024 — Dec 2024",
      metric:
        "150% increase in organic traffic via 95+ SEO scores across 10k+ product catalog",
    },
    {
      company: "Ashiv Diamonds",
      role: "Full-Stack Developer",
      period: "Oct 2022 — Apr 2023",
      metric:
        "70% reduction in page load time (8s → 2.4s) for 2,000+ product catalog",
    },
  ],

  socials: [
    {
      label: "LinkedIn",
      url: "https://linkedin.com/in/yrjdeveloper",
      icon: "linkedin",
    },
    { label: "GitHub", url: "https://github.com/ameghcoder", icon: "github" },
    { label: "Twitter", url: "https://x.com/yrjdev", icon: "twitter" },
  ],
};
