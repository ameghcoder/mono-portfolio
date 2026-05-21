const SKILLS: Record<string, string[]> = {
  "AI & ML": ["RAG Systems", "Multi-model Routing", "Gemini AI", "Claude AI", "Agent Workflows"],
  "Frontend": ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "ReactFlow"],
  "Backend": ["Node.js", "Express", "PostgreSQL", "Supabase", "pg-boss"],
  "Infrastructure": ["Railway", "Docker", "Supabase Realtime", "SSE", "Edge Functions"],
  "Tooling": ["Zustand", "ts-morph", "Turborepo", "Commander.js", "MDX"],
};

export function Skills() {
  const entries = Object.entries(SKILLS);

  return (
    <section id="skills" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[05]</span>
        <span className="label-mono">Tech Stack</span>
      </div>

      <div className="space-y-px border border-border bg-border">
        {entries.map(([category, techs], i) => {
          const isPrimary = i === 0;
          return (
            <div
              key={category}
              className={[
                "px-6 py-4 grid md:grid-cols-[140px_1fr] gap-4 items-start transition-colors duration-200",
                isPrimary
                  ? "bg-card border-l-2 border-l-highlight"
                  : "bg-background",
              ].join(" ")}
            >
              <div className="flex items-center gap-2 pt-0.5">
                <span
                  className={[
                    "font-mono text-[10px] uppercase tracking-[0.12em]",
                    isPrimary ? "text-foreground" : "text-muted-foreground",
                  ].join(" ")}
                >
                  {category}
                </span>
                {isPrimary && (
                  <span className="font-mono text-[9px] tracking-[0.18em] text-highlight uppercase">
                    Primary
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {techs.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
