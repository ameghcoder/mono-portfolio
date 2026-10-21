import Link from "next/link";
import { Github, Globe, Terminal } from "lucide-react";
import { PORTFOLIO_DATA, type Project } from "@/data/portfolio";
import { CornerGlyph, HoverCard } from "@/components/ProjectGlyph";
import { StatusPill } from "@/components/StatusPill";
import { VideoEmbed } from "@/components/projects/VideoEmbed";
import { cn } from "@/lib/utils";

const oss = PORTFOLIO_DATA.projects.filter((p) => p.openSource);

function CardHeader({ project }: { project: Project }) {
  const { github, npm, live } = project.fullContent.links;
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-sm font-medium text-foreground">
            <Link
              href={`/projects/${project.slug}`}
              className="after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
            >
              {project.title}
            </Link>
          </h3>
          {project.status && <StatusPill status={project.status} />}
        </div>
        <span className="label-mono block">{project.type}</span>
      </div>

      <div className="relative z-10 flex gap-1 shrink-0">
        {github && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors duration-200"
          >
            <Github size={13} />
          </a>
        )}
        {npm && (
          <a
            href={npm}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on npm`}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors duration-200"
          >
            <Terminal size={13} />
          </a>
        )}
        {live && (
          <a
            href={live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site`}
            className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-background/60 transition-colors duration-200"
          >
            <Globe size={13} />
          </a>
        )}
      </div>
    </div>
  );
}

function CardFooter({ project }: { project: Project }) {
  return (
    <>
      <ul className="space-y-1">
        {project.fullContent.impact.slice(0, 2).map((item) => (
          <li
            key={item}
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
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <span
          aria-hidden="true"
          className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground group-hover:text-foreground transition-colors duration-200 shrink-0"
        >
          Details →
        </span>
      </div>
    </>
  );
}

export function OpenSource() {
  return (
    <section id="open-source" className="space-y-8 scroll-mt-20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="section-index">[03]</span>
          <span className="label-mono">Open Source</span>
        </div>
        <span className="label-mono">{oss.length} projects</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {oss.map((project, i) => {
          // Newest project leads full-width; the rest pair up below it.
          const lead = i === 0;
          const description = (
            <p className="text-sm text-muted-foreground leading-relaxed flex-1 max-w-xl">
              {project.description}
            </p>
          );

          return (
            <HoverCard
              key={project.slug}
              className={cn("group p-6 flex flex-col gap-4", lead && "sm:col-span-2")}
            >
              <CornerGlyph icon={project.icon} size={lead ? 150 : 110} />

              {lead && project.video ? (
                // Text left, video right on md+; on mobile the video sits
                // between the description and the impact list.
                <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] gap-x-6 gap-y-4">
                  <div className="space-y-4">
                    <CardHeader project={project} />
                    {description}
                  </div>
                  <VideoEmbed
                    video={project.video}
                    sizes="(min-width: 768px) 300px, 100vw"
                    className="z-10 md:col-start-2 md:row-start-1 md:row-span-2 md:self-center"
                  />
                  <div className="space-y-4">
                    <CardFooter project={project} />
                  </div>
                </div>
              ) : (
                <>
                  <CardHeader project={project} />
                  {description}
                  <CardFooter project={project} />
                </>
              )}
            </HoverCard>
          );
        })}
      </div>
    </section>
  );
}
