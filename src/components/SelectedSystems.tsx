import Link from "next/link";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const featured = PORTFOLIO_DATA.projects.filter((p) => p.featured);

export function SelectedSystems() {
  return (
    <section id="systems" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[02]</span>
        <span className="label-mono">Selected Work</span>
      </div>

      <div className="space-y-px border border-border bg-border">
        {featured.map((project) => (
          <div
            key={project.slug}
            className="group bg-background hover:bg-card transition-colors duration-200"
          >
            {/* Visual header — gradient + faded index + dot grid */}
            <div className="relative h-24 border-b border-border bg-gradient-to-br from-highlight/15 to-transparent overflow-hidden transition-all duration-300 group-hover:from-highlight/25">
              <span
                className="absolute -top-2 left-5 font-mono text-[5rem] font-light tracking-tighter text-foreground/15 select-none leading-none"
                aria-hidden="true"
              >
                {project.index}
              </span>
              <div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, currentColor 1px, transparent 1px)",
                  backgroundSize: "14px 14px",
                  color: "var(--color-foreground)",
                }}
                aria-hidden="true"
              />
            </div>

            {/* Body */}
            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3 flex-wrap">
                    <h3 className="text-base font-medium text-foreground">
                      {project.title}
                    </h3>
                    <span className="label-mono">{project.type}</span>
                  </div>
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0 border-b border-border hover:border-foreground pb-0.5"
                >
                  Case study →
                </Link>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-lg">
                {project.description}
              </p>

              <p className="text-[11px] font-mono text-highlight tracking-wide mb-4">
                → {project.metric}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
