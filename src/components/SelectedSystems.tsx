import Link from "next/link";
import { ArrowUpRight, Github, Globe, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const featured = PORTFOLIO_DATA.projects.filter((p) => p.featured);

export function SelectedSystems() {
  return (
    <section id="systems" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[02]</span>
        <span className="label-mono">Selected Work</span>
      </div>

      <div className="space-y-px border border-border bg-border rounded-lg overflow-hidden">
        {featured.map((project) => {
          const { live, github, npm } = project.fullContent.links;
          return (
            <div
              key={project.slug}
              className="group bg-background hover:bg-card transition-colors duration-200 p-6"
            >
              <div className="flex items-baseline justify-between gap-4 mb-3">
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-mono text-[11px] text-highlight shrink-0">
                    {project.index}
                  </span>
                  <h3 className="text-base font-medium text-foreground truncate">
                    {project.title}
                  </h3>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {live && (
                    <a
                      href={live}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live site`}
                      className="p-1.5 text-muted-foreground hover:text-highlight transition-colors duration-200"
                    >
                      <Globe size={14} />
                    </a>
                  )}
                  {github && (
                    <a
                      href={github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="p-1.5 text-muted-foreground hover:text-highlight transition-colors duration-200"
                    >
                      <Github size={14} />
                    </a>
                  )}
                  {npm && (
                    <a
                      href={npm}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} on npm`}
                      className="p-1.5 text-muted-foreground hover:text-highlight transition-colors duration-200"
                    >
                      <Terminal size={14} />
                    </a>
                  )}
                </div>
              </div>

              <p className="label-mono mb-3">{project.type}</p>

              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
                {project.description}
              </p>

              <p className="text-[11px] font-mono text-highlight tracking-wide mb-4">
                → {project.metric}
              </p>

              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/link inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
                >
                  Case study
                  <ArrowUpRight
                    size={12}
                    className="transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
