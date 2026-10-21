import Link from "next/link";
import { ArrowUpRight, Github, Globe, Terminal } from "lucide-react";
import { PORTFOLIO_DATA, type Project } from "@/data/portfolio";
import { CornerGlyph, HoverCard } from "@/components/ProjectGlyph";
import { StatusPill } from "@/components/StatusPill";

const featured = PORTFOLIO_DATA.projects.filter((p) => p.featured);
const spotlight = featured.find((p) => p.spotlight);
const rest = featured.filter((p) => !p.spotlight);

function ExternalLinks({ project }: { project: Project }) {
  const { live, github, npm } = project.fullContent.links;
  const links = [
    live && { href: live, label: `${project.title} live site`, icon: Globe },
    github && { href: github, label: `${project.title} on GitHub`, icon: Github },
    npm && { href: npm, label: `${project.title} on npm`, icon: Terminal },
  ].filter((l) => !!l);

  if (links.length === 0) return null;
  return (
    // `relative z-10` lifts these above the card's stretched case-study link.
    <div className="relative z-10 flex items-center gap-1 shrink-0">
      {links.map(({ href, label, icon: Icon }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="p-1.5 rounded-lg text-muted-foreground hover:text-highlight hover:bg-background/60 transition-colors duration-200"
        >
          <Icon size={14} />
        </a>
      ))}
    </div>
  );
}

function SpotlightCard({ project }: { project: Project }) {
  const { live } = project.fullContent.links;
  return (
    <HoverCard className="p-6 md:p-8">
      <div
        aria-hidden="true"
        className="dot-grid absolute inset-y-0 right-0 w-2/3 -z-10 [--dot-mask:radial-gradient(ellipse_70%_80%_at_85%_30%,#000_15%,transparent_75%)]"
      />
      <CornerGlyph icon={project.icon} size={190} className="-right-10 -bottom-12" />

      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          {project.status && <StatusPill status={project.status} note={project.statusNote} />}
          <span className="label-mono">
            {project.index} · {project.type}
          </span>
        </div>

        <div className="space-y-3">
          <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed max-w-xl">
            {project.description}
          </p>
        </div>

        {project.metric && (
          <p className="text-[11px] font-mono text-highlight tracking-wide">→ {project.metric}</p>
        )}

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="tag bg-background/60">
              {tag}
            </span>
          ))}
        </div>

        <div className="relative z-10 flex flex-wrap gap-2 pt-1">
          {live && (
            <a href={live} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Visit {new URL(live).hostname}
              <ArrowUpRight size={12} />
            </a>
          )}
          <Link href={`/projects/${project.slug}`} className="btn-ghost bg-background/60">
            Case study
          </Link>
        </div>
      </div>
    </HoverCard>
  );
}

function WorkCard({ project }: { project: Project }) {
  return (
    <HoverCard className="group p-6">
      <CornerGlyph icon={project.icon} />

      <div>
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 min-w-0">
            <span className="font-mono text-[11px] text-highlight shrink-0">{project.index}</span>
            <h3 className="text-base font-medium text-foreground">
              <Link
                href={`/projects/${project.slug}`}
                className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
              >
                {project.title}
              </Link>
            </h3>
            {project.status && <StatusPill status={project.status} note={project.statusNote} />}
          </div>
          <ExternalLinks project={project} />
        </div>

        <p className="label-mono mb-3">{project.type}</p>

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-xl">
          {project.description}
        </p>

        {project.metric && (
          <p className="text-[11px] font-mono text-highlight tracking-wide mb-4">→ {project.metric}</p>
        )}

        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <span
            aria-hidden="true"
            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0"
          >
            Case study
            <ArrowUpRight
              size={12}
              className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </div>
    </HoverCard>
  );
}

export function SelectedSystems() {
  return (
    <section id="systems" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[01]</span>
        <span className="label-mono">Selected Work</span>
      </div>

      <div className="space-y-3">
        {spotlight && <SpotlightCard project={spotlight} />}
        {rest.map((project) => (
          <WorkCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
