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

export type ProjectStatus = "Live" | "Beta" | "Closed";

/** Keys into the icon map in `components/ProjectGlyph.tsx` — kept as strings so
 * this file stays plain data, importable from server and client components. */
export type ProjectIcon =
  | "support"
  | "video"
  | "gallery"
  | "workflow"
  | "topbar"
  | "registry"
  | "table"
  | "plugin"
  | "components";

/** A headline number. Real, sourced values only — no metric, no entry. */
export interface Metric {
  value: string;
  label: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
}

/** A YouTube demo. The poster is self-hosted so nothing loads from YouTube
 * until the visitor presses play. */
export interface Video {
  youtubeId: string;
  title: string;
  duration?: string;
  poster: Screenshot;
}

/** A dated point in a project's history, backed by a public post where one exists. */
export interface Milestone {
  date: string;
  title: string;
  detail: string;
  source?: string;
  /** Small inline screenshot backing the claim. */
  proof?: Screenshot;
}

export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  icon: ProjectIcon;
  // Homepage listing fields (present on featured projects)
  index?: string;
  metric?: string;
  tags: string[];
  featured: boolean;
  /** The one featured project rendered as the large card above the rest. */
  spotlight?: boolean;
  openSource: boolean;
  /** Only set when directly observable (e.g. a live link exists) — omit rather than guess. */
  status?: ProjectStatus;
  /** Short qualifier shown next to the status, e.g. "Operated until Aug 2026". */
  statusNote?: string;
  metrics?: Metric[];
  video?: Video;
  screenshots?: Screenshot[];
  timeline?: Milestone[];
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

export interface Principle {
  title: string;
  body: string;
}

export interface ExpertiseArea {
  area: string;
  skills: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    /** One-line statement shown large in the hero. */
    tagline: string;
    /** Short stack line under the tagline. */
    stackLine: string;
    headline: string;
    bio: string;
    location: string;
    availability: string;
    email: string;
    avatar: string;
    calendarUrl: string;
    resumeUrl: string;
    repoUrl: string;
    /** GitHub username for the hero contribution graph. */
    githubUser: string;
  };
  /** Hero stats tile — real, sourced numbers only. */
  heroStats: Metric[];
  /** Short capability phrases for the homepage "What I build" strip. */
  capabilities: string[];
  /** Homepage "How I Work" — one lead line plus a few short principles. */
  howIWork: {
    lead: string;
    principles: Principle[];
  };
  /** Short intro paragraphs for the /about page (first one doubles as its meta description). */
  intro: string[];
  /** "What I build" list for the /about page. */
  whatIBuild: string[];
  /** Stack for the /about page, grouped like the resume's skills section. */
  expertise: ExpertiseArea[];
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
    role: "Full-Stack Engineer · AI Systems · Backend & Product Engineering",
    tagline:
      "I build production software end to end, from UI and system architecture to deployment.",
    stackLine: "TypeScript · Next.js · Node.js · PostgreSQL · RAG & AI systems",
    headline:
      "Full-Stack Engineer building and shipping production software end to end, from UI and system architecture to deployment and maintenance. I work across TypeScript, Next.js, Node.js, PostgreSQL, and AI systems: RAG, retrieval, and automation.",
    bio: "3+ years shipping production software. Solandra is live. PixEarn reached 2.5M+ API requests/month. STL has 14k+ npm downloads.",
    location: "Rajasthan, India / Remote",
    availability: "// AVAILABLE FOR PROJECTS & COLLABORATIONS",
    email: "mintuser65@gmail.com",
    avatar: "/yrjdev.jpg",
    calendarUrl: "https://cal.com/yrjdev/lets-discuss",
    resumeUrl: "/resume/yashraj_fs_engineer.pdf",
    repoUrl: "https://github.com/ameghcoder/mono-portfolio",
    githubUser: "ameghcoder",
  },

  heroStats: [
    { value: "3+", label: "Years shipping" },
    { value: "2.5M+", label: "API req/mo · PixEarn" },
    { value: "14k+", label: "npm downloads · STL" },
  ],

  capabilities: [
    "AI-Powered SaaS",
    "RAG & Retrieval Systems",
    "Distributed Backends",
    "Queue-Based Architectures",
    "Developer Tools & CLIs",
    "Creator Platforms",
  ],

  howIWork: {
    lead: "I don't build features first. I design systems.",
    principles: [
      {
        title: "Built to keep working",
        body: "Clean code doesn't need babysitting. The PixEarn notification service ran for 4 months without me touching it.",
      },
      {
        title: "Check before I guess",
        body: "When a query timed out on a 6M-row table, the index wasn't the problem. The query was. I look at real numbers first, then fix.",
      },
      {
        title: "Cheap to run",
        body: "PixEarn handled 2.5M+ API requests a month on about $38 of infra. I care what my code costs to run.",
      },
      {
        title: "I own the whole thing",
        body: "UI, API, database, queues, deploy. When one person owns all of it, nothing gets lost in between.",
      },
    ],
  },

  intro: [
    "I'm Yashraj, a full-stack engineer from Rajasthan, India. I've been shipping production software for 3+ years, and I like owning all of it, from the UI down to the database and the deploy.",
    "I ran PixEarn solo until it had 2,200+ creators and 2.5M+ API requests a month. Now I'm building Solandra, an AI support tool that answers from your own docs. On the side I ship open source, and STL is at 14k+ npm downloads.",
  ],

  whatIBuild: [
    "AI products that answer from real data (RAG, retrieval)",
    "Backends with queues and background jobs",
    "PostgreSQL that holds up at millions of rows",
    "Developer tools: CLIs, npm packages, extensions",
    "Full-stack SaaS, from UI to deploy",
  ],

  expertise: [
    { area: "Languages", skills: ["TypeScript", "JavaScript", "Python", "SQL"] },
    { area: "Frontend", skills: ["React", "Next.js", "Tailwind CSS", "shadcn/ui"] },
    {
      area: "Backend",
      skills: ["Node.js", "Express", "PostgreSQL", "Redis", "pg-boss", "REST APIs"],
    },
    {
      area: "AI",
      skills: ["RAG", "LLM integration", "Qdrant", "Vector search", "Prompt engineering"],
    },
    {
      area: "Infra",
      skills: ["Docker", "Linux", "Railway", "Vercel", "Supabase", "AWS S3", "GitHub Actions"],
    },
  ],

  projects: [
    {
      slug: "solandra",
      title: "Solandra",
      type: "AI Customer Support & Knowledge Intelligence",
      description:
        "An AI customer support platform that answers website visitors from a business's own site and docs, shows the source pages behind each answer, and turns the questions it couldn't answer into a review list for the team.",
      icon: "support",
      featured: true,
      spotlight: true,
      openSource: false,
      index: "01",
      metric: "Hybrid retrieval: Qdrant vector search + PostgreSQL full-text",
      tags: ["Qdrant", "PostgreSQL", "Hybrid retrieval", "Next.js"],
      status: "Live",
      // TODO(architecture): conservative diagram built from the components
      // described below — verify/expand with the real service boundaries.
      architecture: `flowchart LR
    Site["Business Website<br/>& Docs"]
    Ingest["Crawler +<br/>Content Ingestion"]
    PG["PostgreSQL<br/>Tenants · Content<br/>Full-text Search"]
    Qdrant["Qdrant<br/>Vector Search"]
    Retrieval["Hybrid Retrieval"]
    LLM["LLM Answer Generation<br/>source-backed"]
    Widget["Embeddable<br/>Support Widget"]
    Gaps["Knowledge-Gap<br/>Detection"]
    Team["Business Team<br/>review list · escalation"]

    Site --> Ingest
    Ingest --> PG
    Ingest -->|embeddings| Qdrant
    Widget -->|visitor question| Retrieval
    Retrieval --> Qdrant
    Retrieval --> PG
    Retrieval --> LLM
    LLM -->|answer + sources| Widget
    LLM -->|unanswered| Gaps
    Gaps --> Team
    Widget -->|human escalation| Team

    classDef api fill:#1e293b,stroke:#94a3b8,color:#ffffff
    classDef ai fill:#7c3aed,stroke:#c4b5fd,color:#ffffff
    classDef data fill:#92400e,stroke:#fcd34d,color:#ffffff
    classDef client fill:#111827,stroke:#9ca3af,color:#ffffff

    class Site,Widget,Team client
    class Ingest,Retrieval,Gaps api
    class LLM ai
    class PG,Qdrant data
`,
      decisions: [
        {
          title: "Hybrid retrieval: Qdrant vector search + PostgreSQL full-text",
          why: "Answers have to come from the business's own content and point back to it, so retrieval quality decides answer quality.",
          approach:
            "Combines Qdrant vector search with PostgreSQL full-text search, then generates the answer with an LLM over the retrieved content and returns the source pages alongside it.",
        },
        {
          title: "Unanswered questions become a review list",
          why: "When a support bot can't answer a question, the question usually just disappears, and the gap in the documentation never gets fixed.",
          approach:
            "Knowledge-gap detection flags the questions Solandra couldn't answer and surfaces them to the business as a list to improve its documentation.",
        },
      ],
      fullContent: {
        overview:
          "Founded and independently built Solandra, an AI-powered customer support platform that answers visitor questions from a business's documentation and website content, with source-backed responses. I took it from architecture to a working private beta, and it is now live with paid plans.",
        challenge:
          "Setting up an AI support bot usually means writing and maintaining a knowledge base by hand, and the questions the bot can't answer vanish without anyone on the team seeing them.",
        solution:
          "Solandra crawls the business's website, ingests the content into a multi-tenant store, and answers through hybrid retrieval (Qdrant vectors + PostgreSQL full-text) with LLM answer generation that cites its sources. Questions it couldn't answer feed a knowledge-gap list so the team knows what to document next.",
        tech: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "PostgreSQL",
          "Qdrant",
          "OpenAI",
          "REST APIs",
          "Supabase",
        ],
        impact: [
          "Hybrid retrieval combining Qdrant vector search, PostgreSQL full-text search, and LLM answer generation",
          "Embeddable support chatbot with conversational context, configurable widget settings, and human escalation",
          "Automated knowledge-gap detection that turns unanswered questions into a documentation review list",
          "Website crawling, content ingestion, and multi-tenant data management",
          "Secure API integrations for the embeddable widget",
        ],
        links: {
          live: "https://solandra.io",
        },
      },
    },
    {
      slug: "creatorjot",
      title: "CreatorJot",
      type: "AI Content Automation Platform",
      description:
        "An AI content automation platform that turned YouTube transcripts into structured, platform-ready content through a multi-LLM pipeline (GPT, Claude, Gemini) running on background job queues.",
      icon: "video",
      featured: true,
      openSource: false,
      index: "02",
      metric: "~85% fewer tokens per LLM call via schema-based context compression",
      tags: ["pg-boss", "Multi-LLM", "Next.js 15"],
      status: "Closed",
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
        {
          title: "Schema-based context compression for LLM calls",
          why: "Running GPT, Claude, and Gemini over long transcripts made token usage the main cost to control.",
          approach:
            "Each stage writes structured, schema-versioned intermediate data that later calls reuse as compressed context, with per-call token and cost tracking.",
          outcome: "Roughly 85% lower token usage per call.",
        },
      ],
      fullContent: {
        overview:
          "Designed and built an AI content automation platform that turned YouTube video transcripts into structured content for multiple publishing channels: hooks, summaries, and key moments tailored to each platform. A multi-LLM pipeline orchestrated GPT, Claude, and Gemini through background job queues across a 5-node Railway deployment. CreatorJot is now closed.",
        challenge:
          "LLMs collapsed JSON structure, fabricated timestamps, and missed extraction targets when processing long-form transcripts — requiring a principled approach to prompt engineering and output validation.",
        solution:
          "Designed a custom 'Transcript Checkpoints' algorithm that partitions transcripts into discrete segments, each scored 1–10 by the model for relevance, automatically selecting the highest-signal angle. Paired with a pg-boss distributed job pipeline enforcing forbidden phrases, verbatim evidence usage, and platform-specific formatting constraints.",
        tech: [
          "Next.js 15",
          "TypeScript",
          "Node.js",
          "Express 5",
          "Supabase",
          "PostgreSQL",
          "pg-boss",
          "GPT",
          "Claude",
          "Gemini",
          "Railway",
          "Supabase Realtime",
          "SSE",
        ],
        impact: [
          "~85% lower per-call token usage via schema-based context compression",
          "Multi-LLM pipeline (GPT, Claude, Gemini) across a 5-node Railway deployment",
          "Job processing, schema versioning, and per-call token and cost tracking",
          "Structural prompt constraints eliminating JSON collapse and timestamp fabrication",
          "Real-time progress tracking via Supabase Realtime/SSE",
          "97+ Lighthouse score across the multi-service deployment",
        ],
        links: {},
      },
    },
    {
      slug: "pixearn",
      title: "PixEarn",
      type: "Creator Marketplace",
      description:
        "A creator marketplace for digital art and wallpapers that I designed, built, and ran solo, growing it to 2,200+ creators, 6,000+ artworks, and 15k+ monthly active users before it closed in Aug 2026.",
      icon: "gallery",
      featured: true,
      openSource: false,
      index: "03",
      metric: "2.5M+ API requests/month at sub-150ms on ~$38/month of infra",
      tags: ["Next.js", "PostgreSQL", "Supabase"],
      status: "Closed",
      statusNote: "Operated until Aug 2026",
      metrics: [
        { value: "2,200+", label: "Registered creators" },
        { value: "6,000+", label: "Artworks" },
        { value: "15k+", label: "Monthly active users" },
        { value: "6M", label: "Image impressions" },
        { value: "2.5M+", label: "API requests / month" },
        { value: "~$38", label: "Infra cost / month" },
      ],
      screenshots: [
        {
          src: "/projects/pixearn/feed.jpg",
          alt: "PixEarn's image feed at pixearn.com with tag filters and a wallpaper grid",
          width: 1920,
          height: 1440,
          caption: "The public feed",
        },
        {
          src: "/projects/pixearn/creator-profile.png",
          alt: "A PixEarn creator profile with follower counts, a Support button, and Images, Store, and About tabs",
          width: 1920,
          height: 1080,
          caption: "Creator profile",
        },
        {
          src: "/projects/pixearn/support-me-dashboard.png",
          alt: "PixEarn creator dashboard showing the Support Me editor with PayPal, UPI, Buy Me a Coffee, Ko-fi, Patreon, Wise, Paytm, and custom link options",
          width: 1920,
          height: 1080,
          caption: "Dashboard: Support Me links",
        },
        {
          src: "/projects/pixearn/analytics-jun-2026.png",
          alt: "Google Analytics for the 28 days to Jun 2026: 7.9K active users, 39K views, 2m 05s average session, 84.5% DAU/MAU",
          width: 1696,
          height: 558,
          caption: "Analytics, 28 days to Jun 2026",
        },
      ],
      timeline: [
        {
          date: "Apr 2026",
          title: "One creator's Story drove 5,400 views in a day",
          detail:
            "A single Instagram Story from a creator with 5.6K followers sent daily views to 5,400, up 773.8% on the comparison day. By then 100+ creators had pixearn.com in their bio, and the library held 3K+ wallpapers in up to 8K resolution.",
          source: "https://x.com/yrjdev/status/2044653478535188910",
        },
        {
          date: "Apr 2026",
          title: "Notification service: 4 months untouched, zero failures",
          detail:
            "The notification system, built with Express, Supabase, and Resend, ran for four months without a code change, an error, or a failed send.",
          source: "https://x.com/yrjdev/status/2046918508316143789",
        },
        {
          date: "May 2026",
          title: "Shipped the Support Me button",
          detail:
            "Creators could add PayPal, UPI, Paytm, or any custom link to their profile and get paid directly by their audience, with no platform cut and no hidden fees.",
          source: "https://x.com/pixearn/status/2054418458549600684",
        },
        {
          date: "May 2026",
          title: "4.1M image impressions, 12K+ MAU, 52K+ downloads",
          detail:
            "Team of one, working from a bedroom, $0 in funding. The impressions table had just passed 4.1M rows.",
          source: "https://x.com/yrjdev/status/2054850053898981559",
          proof: {
            src: "/projects/pixearn/impressions-table-4.1m.png",
            alt: "Database table view showing 4.1M records (estimated)",
            width: 420,
            height: 158,
          },
        },
        {
          date: "Jun 2026",
          title: "AdSense approved on the 25th application",
          detail:
            "After 24 rejections over a year, the 25th application was approved and view-based earnings came back for creators.",
          source: "https://x.com/yrjdev/status/2069275373972619471",
        },
        {
          date: "Aug 2026",
          title: "Statement timeouts on a 5.9M-row table",
          detail:
            "log_impression started throwing Postgres 57014 timeouts even though the table had the right index. Fixed the predicate, built indexes with CREATE INDEX CONCURRENTLY, and capped a retry loop that kept requeuing failed batches.",
          source: "https://x.com/yrjdev/status/2085918068753236302",
        },
        {
          date: "Aug 2026",
          title: "PixEarn closed",
          detail:
            "Shut down after running it solo, with 2,200+ creators, 6,000+ artworks, and 6M image impressions.",
        },
      ],
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
        {
          title: "Fraud detection for view-based earnings",
          why: "Creators earned from views, so view counts had to hold up against inflated traffic.",
          approach:
            "Fraud detection scored traffic using visitor fingerprints and IP-based signals.",
        },
        {
          title: "Sargable predicate + CREATE INDEX CONCURRENTLY on a hot table",
          why: "log_impression threw 57014 statement timeouts at 5.5M calls a month on a ~5.9M-row table that already had a matching index.",
          approach:
            "Rewrote the predicate so created_at stayed bare and usable as an index bound, built indexes with CREATE INDEX CONCURRENTLY by hand (the migration tool wraps everything in a transaction) and mirrored them with an IF NOT EXISTS migration, then capped the client retry loop at 40 ids per flush and 3 retries.",
          tradeoff:
            "CONCURRENTLY builds slower and can leave an invalid index if it fails partway, and the hand-run step sits outside the normal migration flow.",
          outcome: "Timeouts resolved. Full write-up in the related article.",
        },
      ],
      fullContent: {
        overview:
          "Independently designed, built, and operated PixEarn, a creator marketplace for digital art and wallpapers. It grew to 2,200+ registered creators, 6,000+ artworks, 15k+ monthly active users, and 6M image impressions, and ran until August 2026.",
        challenge:
          "Every image view was logged as an impression for creator analytics and earnings, so a solo-run platform had to absorb high-concurrency write traffic, keep each creator's data isolated, and stay cheap enough to run on a tiny budget.",
        solution:
          "Edge-optimized SSR, PostgreSQL row-level security with indexes tuned to the real query paths, and a Sharp image pipeline that cut storage costs by 40%. Creator payment workflows, a no-cut Support Me button, and fraud detection using visitor fingerprints and IP signals made earnings trustworthy. The whole platform ran on about $38/month of infrastructure.",
        tech: [
          "Next.js",
          "TypeScript",
          "Node.js",
          "Express",
          "Supabase",
          "PostgreSQL",
          "AWS S3",
          "Razorpay",
          "Resend",
          "Sharp",
          "Zustand",
          "Tailwind CSS",
          "Railway",
        ],
        impact: [
          "2.5M+ API requests and 1.2M+ database queries per month",
          "97%+ request success rate at sub-150ms latency",
          "~$38/month total infrastructure cost",
          "Creator payment workflows and a no-cut Support Me button",
          "Fraud detection using visitor fingerprints and IP-based signals",
          "98+ Lighthouse performance score",
        ],
        links: {},
      },
    },
    {
      slug: "flowforge",
      title: "FlowForge",
      type: "Node Abstraction Layer for Composable AI Workflows",
      description:
        "A config-driven orchestration system for building composable AI workflows, where all node types are defined as JSON and rendered by a single universal controller.",
      icon: "workflow",
      featured: true,
      openSource: false,
      index: "04",
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
      slug: "agent-bar",
      title: "AgentBar",
      type: "GNOME Extension for Claude Code",
      description:
        "Shows what your Claude Code sessions are doing in the GNOME top bar, so you can work in another window and still know when Claude needs you.",
      icon: "topbar",
      featured: false,
      openSource: true,
      tags: ["GNOME Shell", "GJS", "Claude Code Hooks"],
      status: "Beta",
      statusNote: "v0.2.0",
      video: {
        youtubeId: "XnhgjNQLooQ",
        title: "AgentBar: Know What Every Claude Code Session Is Doing, From Your GNOME Top Bar",
        duration: "60s",
        poster: {
          src: "/projects/agent-bar/launch-video-poster.jpg",
          alt: "AgentBar launch video: a 'Permission needed' banner and top-bar label for the agent-bar session",
          width: 1280,
          height: 720,
        },
      },
      screenshots: [
        {
          src: "/projects/agent-bar/topbar-menu.png",
          alt: "AgentBar menu open from the GNOME top bar, listing the agent-bar and solandra sessions as Ended, a 'No recent events' health line, and a Copy 'agentbar doctor' action",
          width: 493,
          height: 280,
          caption: "Top-bar menu: sessions, health line, doctor",
        },
      ],
      fullContent: {
        overview:
          "An MIT-licensed Linux desktop tool that monitors multiple Claude Code sessions from the GNOME top bar. The bar shows the session that matters most, its state, and how long ago it last did something. The menu lists every session, and clicking one brings its terminal or editor window to the front.",
        challenge:
          "With several Claude Code sessions running in different terminals, the only way to know whether one is waiting for input, needs permission, or failed is to keep checking each window.",
        solution:
          "An event-driven design: Claude Code hooks write session events to local JSON state, and a GNOME Shell extension renders it within a second of each event. Notifications fire only when Claude needs permission, is waiting, finishes a turn, or fails. States stay honest: a session with no news for 10 minutes says \"No updates\" instead of guessing, and a closed terminal reads \"Ended\".",
        tech: [
          "TypeScript",
          "Node.js",
          "GNOME Shell",
          "GJS",
          "Linux",
          "Claude Code Hooks",
        ],
        impact: [
          "Local-first: no account, no server, no telemetry",
          "Packaged for Ubuntu as a .deb installer",
          "Multi-session tracking, desktop notifications, and terminal window navigation",
          "install-hooks with a dry run and settings backup, plus an agentbar doctor diagnostic command",
        ],
        links: {
          github: "https://github.com/ameghcoder/agent-bar",
        },
      },
    },
    {
      slug: "regify",
      title: "Regify",
      type: "Component Registry CLI",
      description:
        "Automated registry generation engine for modern UI libraries, bridging the gap between source and discovery.",
      icon: "registry",
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
          "200+ npm downloads",
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
      icon: "table",
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
          "14k+ npm downloads",
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
      icon: "plugin",
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
          "13k+ npm downloads",
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
      icon: "components",
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
      company: "Independent",
      role: "Full-Stack Engineer · Self-Employed",
      period: "Jan 2025 — Present",
      metric:
        "Built Solandra and ran PixEarn solo. Open source on the side, STL has 14k+ npm downloads",
    },
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
