export interface ProjectLinks {
  live?: string;
  github?: string;
  npm?: string;
}

/** A single design decision, restructured from real overview/challenge/solution
 * copy — never invented. `alternatives` is only set when the prior/rejected
 * approach is explicitly stated in that project's real content. */
export interface Decision {
  title: string;
  why: string;
  approach: string;
  alternatives?: string;
  tradeoff?: string;
  outcome?: string;
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
  /** Only set when directly observable (e.g. a live link exists) — omit rather than guess. */
  status?: string;
  /** Mermaid source for the project's real architecture — omit if not documented yet. */
  architecture?: string;
  decisions?: Decision[];
  /** Blog post slug this project is directly discussed in, if any (bidirectional cross-link). */
  relatedArticleSlug?: string;
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

export interface ExpertiseArea {
  area: string;
  skills: string[];
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
    avatar: string;
    calendarUrl: string;
    repoUrl: string;
  };
  /** Short capability phrases for the homepage "What I build" strip. */
  capabilities: string[];
  /** Homepage narrative — "How I Think" (paragraphs). */
  howIThink: string[];
  /** Homepage narrative — "What Makes Me Different" (paragraphs). */
  whatMakesDifferent: string[];
  /** Long intro paragraph for the /about page. */
  intro: string;
  /** Full "What I Build" list for the /about page. */
  whatIBuild: string[];
  /** Categorized technical expertise for the /about page. */
  expertise: ExpertiseArea[];
  currentlyBuilding: CurrentlyBuilding[];
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
      "AI Engineer and Full-Stack Developer building production-ready AI products end to end. I turn complexity into simple, reliable systems.",
    bio: "4+ years building production systems. 45,000+ monthly users. I own the full stack.",
    location: "Rajasthan, India / Remote",
    availability: "// AVAILABLE FOR PROJECTS & COLLABORATIONS",
    email: "mintuser65@gmail.com",
    avatar: "/yrjdev.jpg",
    calendarUrl: "https://cal.com/yrjdev/lets-discuss",
    repoUrl: "https://github.com/ameghcoder/mono-portfolio",
  },

  capabilities: [
    "AI-Powered SaaS",
    "RAG & Retrieval Systems",
    "Distributed Backends",
    "Queue-Based Architectures",
    "Developer Tools & CLIs",
    "Creator Platforms",
  ],

  howIThink: [
    "I don't build features first. I design systems.",
    "Every project starts by understanding the problem, identifying bottlenecks, and creating an architecture that can survive future growth instead of just today's requirements. I prefer modular systems, clear boundaries, schema-driven design, event-driven workflows, and infrastructure that scales without becoming difficult to maintain.",
    "Whether it's an AI product, a developer tool, or a SaaS platform, I optimize for simplicity, reliability, and long-term maintainability over short-term hacks.",
  ],

  whatMakesDifferent: [
    "I don't consider myself just a frontend or backend engineer. I enjoy solving difficult engineering problems by designing systems that remain understandable years later.",
    "I think deeply about architecture before implementation, optimize for maintainability over cleverness, and build software that scales without requiring complete rewrites. My interests sit at the intersection of AI engineering, backend systems, developer experience, and product architecture — where software becomes a platform rather than just an application.",
  ],

  intro:
    "I'm an AI Engineer, Full-Stack Developer, and System Designer focused on building production-ready AI products from the ground up. I design scalable architectures, distributed backend systems, RAG pipelines, intelligent developer tooling, and creator platforms that solve real-world problems. My work spans the entire stack — from system architecture, databases, APIs, background workers, queues, and infrastructure to intuitive user experiences and deployment. I've built AI content pipelines, creator monetization platforms, open-source developer tools, component registries, and retrieval systems, while shipping products used by thousands of users and serving millions of requests. I enjoy breaking complex problems into simple, maintainable systems that are fast, reliable, and built to evolve over time.",

  whatIBuild: [
    "AI-powered SaaS products",
    "Retrieval-Augmented Generation (RAG) systems",
    "Agent workflows & multi-model AI pipelines",
    "Distributed background job systems",
    "Queue-based architectures",
    "API-first backend platforms",
    "Production PostgreSQL & Supabase infrastructure",
    "Creator economy platforms",
    "Open-source developer tools",
    "Component registries & CLIs",
    "Schema-driven frameworks",
    "Modern full-stack web applications",
    "Internal developer platforms",
    "High-performance data pipelines",
  ],

  expertise: [
    {
      area: "AI Engineering",
      skills: [
        "Production RAG architectures",
        "AI content generation pipelines",
        "Multi-model routing",
        "Prompt engineering",
        "AI workflow orchestration",
        "Embedding pipelines",
        "Semantic search",
        "LLM integrations",
        "Knowledge indexing",
        "Retrieval optimization",
      ],
    },
    {
      area: "Backend Engineering",
      skills: [
        "Node.js",
        "Python",
        "TypeScript",
        "Express",
        "REST APIs",
        "Background Workers",
        "Queue Systems (pg-boss)",
        "PostgreSQL",
        "Supabase",
        "Database schema design",
        "Authentication systems",
        "Real-time (SSE / WebSockets)",
        "File processing pipelines",
        "Edge Functions",
      ],
    },
    {
      area: "System Design",
      skills: [
        "Distributed architecture",
        "Event-driven systems",
        "Modular monoliths",
        "API architecture",
        "Scalable infrastructure",
        "Workflow orchestration",
        "Schema-driven systems",
        "Runtime registries",
        "Domain modeling",
        "Caching strategies",
        "Performance optimization",
      ],
    },
    {
      area: "Frontend",
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "React Flow",
        "Zustand",
        "MDX",
        "Design systems",
        "Component architecture",
      ],
    },
    {
      area: "Infrastructure",
      skills: [
        "Railway",
        "Docker",
        "Supabase",
        "PostgreSQL",
        "CI/CD",
        "Multi-service deployments",
        "Environment management",
      ],
    },
  ],

  currentlyBuilding: [
    {
      title: "SupportGPT",
      label: "IN BUILD",
      description:
        "An AI customer support platform that automatically crawls websites, builds a knowledge base, and answers customer questions through an advanced RAG pipeline — automated ingestion, semantic indexing, intelligent retrieval, and multi-model routing that eliminates manual documentation setup.",
      tags: ["RAG", "Multi-model routing", "Semantic indexing"],
    },
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
      status: "Live",
      // TODO(architecture): source is the real production diagram, kept in
      // sync manually — update here if the system changes.
      architecture: `flowchart TB
    %% CLIENT LAYER
    Client["Client App<br/>Web / Dashboard / API Consumer"]

    %% API SERVER
    subgraph API["API Server - Express + TypeScript"]
        direction TB

        Routes["Routes Layer<br/>video.route.ts<br/>jobs.route.ts<br/>health.route.ts"]

        Middleware["Middleware<br/>Auth JWT<br/>Rate Limit<br/>Validation<br/>Error Handler"]

        JobService["JobManagementService"]

        QueueManager["QueueManager<br/>pg-boss Wrapper"]

        NotificationService["NotificationService<br/>WebSocket → SSE → Email"]

        Routes --> Middleware
        Middleware --> JobService
        JobService --> QueueManager
    end

    %% WORKERS
    subgraph Workers["Background Workers"]
        direction LR

        TranscriptWorker["TranscriptWorker<br/>- Fetch Transcript<br/>- Store Transcript<br/>- Generate Summary<br/>- Update Database"]

        GenerationWorker["GenerationWorker<br/>- Read Summary<br/>- Generate Content<br/>- Save Generations<br/>- Send Notifications"]
    end

    %% AI SERVICES
    subgraph AI["AI Processing"]
        direction TB

        Gemini["Gemini AI<br/>Transcript Summary<br/>Key Points"]

        Claude["Claude AI<br/>Platform Content Generation"]
    end

    %% STORAGE & DATABASE
    subgraph Data["Supabase Infrastructure"]
        direction TB

        PostgreSQL["PostgreSQL Database<br/>Users<br/>Sessions<br/>Payloads<br/>Jobs<br/>Generations"]

        Storage["Supabase Storage<br/>Transcript Files"]

        PgBoss["pg-boss Queues<br/>transcript-queue<br/>generation-queue"]
    end

    %% FLOW
    Client -->|"POST /api/v1/yt"| API

    QueueManager --> PgBoss

    PgBoss --> TranscriptWorker
    PgBoss --> GenerationWorker

    TranscriptWorker -->|"Fetch / Save"| Storage
    TranscriptWorker -->|"Read / Write"| PostgreSQL
    TranscriptWorker --> Gemini

    GenerationWorker -->|"Read / Write"| PostgreSQL
    GenerationWorker --> Claude
    GenerationWorker --> NotificationService

    NotificationService --> Client

    %% STYLING
    classDef api fill:#1e293b,stroke:#94a3b8,color:#ffffff
    classDef worker fill:#0f766e,stroke:#5eead4,color:#ffffff
    classDef ai fill:#7c3aed,stroke:#c4b5fd,color:#ffffff
    classDef data fill:#92400e,stroke:#fcd34d,color:#ffffff
    classDef client fill:#111827,stroke:#9ca3af,color:#ffffff

    class API,Routes,Middleware,JobService,QueueManager,NotificationService api
    class Workers,TranscriptWorker,GenerationWorker worker
    class AI,Gemini,Claude ai
    class Data,PostgreSQL,Storage,PgBoss data
    class Client client
`,
      // TODO(experiments): no baseline->change->result data captured for this
      // project yet — add here if/when a real experiment is run.
      decisions: [
        {
          title:
            "Score-and-select transcript segmentation over single-pass prompting",
          why: "Full-transcript prompting collapsed JSON structure, fabricated timestamps, and missed extraction targets on long-form input.",
          alternatives: "A single prompt over the entire transcript",
          approach:
            "The 'Transcript Checkpoints' algorithm partitions transcripts into discrete segments, each scored 1–10 by the model for relevance, automatically selecting the highest-signal angle.",
          tradeoff:
            "Adds a scoring/selection pass and more pipeline complexity than a single call.",
          outcome:
            "In production — structural prompt constraints eliminated JSON collapse and timestamp fabrication.",
        },
        {
          title:
            "Distributed pg-boss job pipeline over inline request handling",
          why: "AI transcript extraction and content generation run long enough that handling them inline would block API responses.",
          approach:
            "A pg-boss distributed job pipeline separates the API, transcript workers, and generation workers into independent processes, with progress reported back over Supabase Realtime/SSE.",
          tradeoff:
            "5 independent services to deploy and operate instead of one.",
          outcome:
            "97+ Lighthouse score across the multi-service Railway deployment.",
        },
      ],
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
      // TODO(architecture): conservative diagram built from the described
      // mechanics below — verify/expand with the real module boundaries.
      architecture: `flowchart LR
    Config["Node Config<br/>JSON Definition"]
    Controller["NodeController<br/>Universal Renderer"]
    Registry["Field Registry<br/>registerField / getField"]
    Store["Zustand Store"]
    Canvas["ReactFlow Canvas"]
    Handles["Dynamic Handles<br/>{{variable}} regex diff"]

    Config --> Controller
    Controller --> Registry
    Registry -->|resolves component| Controller
    Controller --> Canvas
    Canvas <--> Store
    Controller --> Handles
    Handles --> Canvas

    classDef core fill:#1e293b,stroke:#94a3b8,color:#ffffff
    classDef ui fill:#0f766e,stroke:#5eead4,color:#ffffff

    class Config,Controller,Registry core
    class Store,Canvas,Handles ui
`,
      // TODO(experiments): no baseline->change->result data captured for this
      // project yet — add here if/when a real experiment is run.
      decisions: [
        {
          title: "Type-based field registry over per-node components",
          why: "Traditional node-based workflow builders require a React component per node type, creating scaling friction as new node types are added and making runtime extensibility difficult.",
          alternatives: "A dedicated React component per node type",
          approach:
            "A field registry (registerField/getField) maps field type strings to React components at runtime, so new field types plug in without touching rendering logic.",
          outcome:
            "Zero per-node component boilerplate via a single universal NodeController.",
        },
        {
          title: "Regex-diff parsing for dynamic handle generation",
          why: "Workflow nodes need input handles that update live as a user types template variables.",
          approach:
            "Dynamic ReactFlow handle generation auto-spawns input handles as users type {{variable}} syntax, parsed via regex diff against the prior textarea state.",
          outcome:
            "Handles stay in sync with node config with no manual wiring.",
        },
      ],
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
      status: "Live",
      relatedArticleSlug:
        "i-had-the-index-my-postgres-query-was-still-timing-out",
      // TODO(architecture): conservative diagram built from the stack
      // described below — verify/expand with the real service boundaries.
      architecture: `flowchart LR
    Client["Client<br/>Creator / Viewer"]
    Edge["Next.js<br/>Edge-Optimized SSR"]
    API["API Routes<br/>Node.js"]
    PG["PostgreSQL<br/>Row-Level Security + Custom Indexes"]
    Sharp["Sharp Pipeline<br/>Image Processing"]
    Storage["Supabase Storage"]

    Client -->|request| Edge
    Edge --> API
    API -->|tenant-scoped queries| PG
    API -->|upload| Sharp
    Sharp --> Storage
    PG -->|analytics reads| API
    API -->|response| Client

    classDef api fill:#1e293b,stroke:#94a3b8,color:#ffffff
    classDef data fill:#92400e,stroke:#fcd34d,color:#ffffff
    classDef client fill:#111827,stroke:#9ca3af,color:#ffffff

    class Client client
    class Edge,API api
    class PG,Sharp,Storage data
`,
      // TODO(experiments): no baseline->change->result data captured for this
      // project yet — add here if/when a real experiment is run.
      decisions: [
        {
          title: "PostgreSQL row-level security for tenant isolation",
          why: "High-concurrency creator/viewer traffic needed per-creator data isolation enforced consistently.",
          approach:
            "PostgreSQL RLS policies enforce row-level access control alongside custom indexing for the analytics query paths.",
          outcome: "1.2M+ monthly queries at <150ms avg response.",
        },
        {
          title: "Sharp-driven image pipeline for storage cost",
          why: "Storage costs scaled directly with creator uploads.",
          approach:
            "A Sharp-based image processing pipeline handles uploads before they hit storage.",
          outcome: "40% reduction in storage costs.",
        },
      ],
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
