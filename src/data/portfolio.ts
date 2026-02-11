export interface Project {
  slug: string;
  title: string;
  type: string;
  description: string;
  fullContent: {
    overview: string;
    challenge: string;
    solution: string;
    tech: string[];
    impact: string[];
    links: {
      live?: string;
      github?: string;
      npm?: string;
    };
  };
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    role: string;
    bio: string;
    location: string;
    availability: string;
    email: string;
    resume: string;
    avatar: string;
  };
  calendarUrl: string;
  repoUrl: string;
  projects: Project[];
  skills: {
    category: string;
    items: string[];
  }[];
  experience: Experience[];
  achievements: string[];
  education: {
    degree: string;
    institution: string;
    period: string;
  }[];
  socials: { label: string; url: string }[];
}

export const PORTFOLIO_DATA: PortfolioData = {
  profile: {
    name: "Yashraj Yadav",
    role: "Full-Stack Developer | Next.js • TypeScript • System Design",
    bio: "Full-Stack Developer with 4+ years of experience building production web applications serving 45,000+ monthly users. Expert in system architecture, database optimization, and high-performance engineering.",
    location: "Rajasthan, India / Remote",
    availability: "Available for high-impact engineering roles",
    email: "mintuser65@gmail.com",
    resume:
      "https://docs.google.com/document/d/1ylZ9VDIYun6N5o0oD1ixMI2ZL2P4DSCv7vUOqx5Fg3w/edit?usp=sharing",
    avatar: "/yrjdev.jpg",
  },
  calendarUrl: "dojo-agency/founder-mvp-website-clarity-call",
  repoUrl: "https://github.com/ameghcoder/mono-portfolio",
  projects: [
    {
      slug: "pixearn",
      title: "PixEarn",
      type: "Creator Monetization Platform",
      description:
        "A production-grade platform serving 45,000+ Monthly Views & 19,000+ Monthly Active Users with real-time analytics, revenue distribution and more.",
      fullContent: {
        overview:
          "Designed and deployed a creator platform handling 1.2M+ queries monthly with <100-150ms average response time.",
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
          "1200+ Creators Joined",
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
  skills: [
    {
      category: "Frontend Development",
      items: [
        "React",
        "Next.js (App & Pages)",
        "TypeScript",
        "Zustand",
        "Tailwind CSS",
        "Framer Motion",
      ],
    },
    {
      category: "Backend & Database",
      items: [
        "Node.js",
        "Express.js",
        "PostgreSQL",
        "Supabase (RLS, Auth)",
        "Database Modeling",
        "RESTful API Design",
      ],
    },
    {
      category: "DevOps & Systems",
      items: [
        "Turborepo",
        "PNPM",
        "Docker (Basic)",
        "GitHub Actions (CI/CD)",
        "CLI Development",
        "Linux/Unix",
      ],
    },
  ],
  experience: [
    {
      company: "Vidharat Marketing",
      role: "Senior Full-Stack Developer",
      period: "Mar 2024 — Dec 2024",
      description: [
        "Led rebuild of e-commerce platform serving 10k+ products, improving conversion by 25%.",
        "Integrated AR-based virtual try-on and 3D visualization, increasing engagement by 40%.",
        "Built a custom product search engine handling 5k+ concurrent users with <200ms response time.",
        "Optimized SEO scores to 95+ resulting in 150% increase in organic traffic.",
      ],
    },
    {
      company: "Empowering Tomorrow",
      role: "Full-Stack Developer",
      period: "Mar 2024 — Present",
      description: [
        "Developed donation-enabled fundraising platform with integrated Razorpay/Stripe payments.",
        "Achieved 92+ Lighthouse score and increased donor retention by 30% through performance tuning.",
        "Improved donation conversion funnel by 35% via cross-functional collaboration on UX.",
      ],
    },
    {
      company: "Ashiv Diamonds",
      role: "Full-Stack Developer",
      period: "Oct 2022 — Apr 2023",
      description: [
        "Revamped product catalog with 2,000+ listings and an advanced multi-filter system.",
        "Reduced page load time by 70% (from 8s to 2.4s) via WebP conversion and CDN implementation.",
        "Built custom CMS admin panel for staff to manage 100+ product updates monthly.",
      ],
    },
  ],
  achievements: [
    "Scaled PixEarn to 45,000+ monthly views, 19,000+ monthly active users, 1.2M+ monthly queries and 1,200+ creators.",
    "Published 4+ npm packages and open-source CLI tools with 1,500+ downloads.",
    "Consistently maintain 95+ performance scores across all production applications.",
    "Shipped multiple production systems independently from concept to full deployment.",
  ],
  education: [
    {
      degree: "Higher Secondary (Physics/Mathematics)",
      institution: "Aditya Institute, Alwar",
      period: "Scored: 85%",
    },
  ],
  socials: [
    { label: "LinkedIn", url: "https://linkedin.com/in/yrjdeveloper" },
    { label: "GitHub", url: "https://github.com/ameghcoder" },
    { label: "Twitter", url: "https://x.com/yrjdev" },
  ],
};
