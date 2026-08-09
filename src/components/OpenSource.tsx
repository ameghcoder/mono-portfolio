import Link from "next/link";
import { Github, Globe, Terminal } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const oss = PORTFOLIO_DATA.projects.filter((p) => p.openSource);

export function OpenSource() {
  return (
    <section id="open-source" className="space-y-8 scroll-mt-20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="section-index">[04]</span>
          <span className="label-mono">Open Source</span>
        </div>
        <span className="label-mono">{oss.length} packages published</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-px border border-border bg-border">
        {oss.map((project) => (
          <div
            key={project.slug}
            className="bg-background hover:bg-card p-6 space-y-4 flex flex-col transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">
                  {project.title}
                </h3>
                <span className="label-mono">{project.type}</span>
              </div>

              <div className="flex gap-1 shrink-0">
                {project.fullContent.links.github && (
                  <a
                    href={project.fullContent.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Github size={13} />
                  </a>
                )}
                {project.fullContent.links.npm && (
                  <a
                    href={project.fullContent.links.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="npm"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Terminal size={13} />
                  </a>
                )}
                {project.fullContent.links.live && (
                  <a
                    href={project.fullContent.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live site"
                    className="p-1.5 text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <Globe size={13} />
                  </a>
                )}
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
              {project.description}
            </p>

            <ul className="space-y-1">
              {project.fullContent.impact.slice(0, 2).map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-[11px] font-mono text-highlight leading-snug"
                >
                  <span className="shrink-0 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-border-dim">
              <div className="flex flex-wrap gap-1.5">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
              >
                Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
