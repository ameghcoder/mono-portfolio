import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getPostBySlug } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Github, Globe, Terminal } from "lucide-react";
import type { Metadata } from "next";
import { ArchitectureViewer } from "@/components/ArchitectureViewer";
import { DecisionRecord } from "@/components/projects/DecisionRecord";
import { MetricGrid } from "@/components/projects/MetricGrid";
import { ScreenshotGallery } from "@/components/projects/ScreenshotGallery";
import { Timeline } from "@/components/projects/Timeline";
import { VideoEmbed } from "@/components/projects/VideoEmbed";
import { CornerGlyph } from "@/components/ProjectGlyph";
import { StatusPill } from "@/components/StatusPill";

export async function generateStaticParams() {
  return PORTFOLIO_DATA.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
  if (!project) return {};
  const cover = project.video?.poster ?? project.screenshots?.[0];
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      ...(cover && {
        images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }],
      }),
    },
  };
}

function SectionLabel({ index, label }: { index: string; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="section-index">[{index}]</span>
      <span className="label-mono">{label}</span>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const { fullContent } = project;
  const relatedArticle = project.relatedArticleSlug
    ? getPostBySlug(project.relatedArticleSlug)
    : undefined;

  const featured = PORTFOLIO_DATA.projects.filter((p) => p.featured);
  const currentIndex = featured.findIndex((p) => p.slug === project.slug);
  const nextProject =
    currentIndex === -1 ? undefined : featured[(currentIndex + 1) % featured.length];

  const sections = [
    { id: "overview", label: "Overview" },
    ...(project.video ? [{ id: "demo", label: "Demo" }] : []),
    ...(project.screenshots?.length ? [{ id: "screens", label: "Screens" }] : []),
    ...(project.architecture ? [{ id: "architecture", label: "Architecture" }] : []),
    ...(project.decisions?.length ? [{ id: "decisions", label: "Decisions" }] : []),
    ...(project.timeline?.length ? [{ id: "timeline", label: "Timeline" }] : []),
    { id: "impact", label: "Impact" },
    ...(relatedArticle ? [{ id: "writing", label: "Writing" }] : []),
  ];
  // Section numbers follow the sections that actually render — no gaps.
  const indexOf = (id: string) =>
    String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  const links = [
    fullContent.links.live && { href: fullContent.links.live, label: "Live site", icon: Globe },
    fullContent.links.github && { href: fullContent.links.github, label: "GitHub", icon: Github },
    fullContent.links.npm && { href: fullContent.links.npm, label: "npm package", icon: Terminal },
  ].filter((l) => !!l);

  return (
    <div className="max-container py-16 space-y-14">
      {/* Back link */}
      <Link
        href="/#systems"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
        Back
      </Link>

      {/* Header */}
      <header className="card isolate overflow-hidden p-6 md:p-8 space-y-5">
        <div
          aria-hidden="true"
          className="dot-grid absolute -z-10 inset-y-0 right-0 w-2/3 [--dot-mask:radial-gradient(ellipse_70%_80%_at_90%_20%,#000_10%,transparent_70%)]"
        />
        <CornerGlyph icon={project.icon} size={200} className="-right-10 -bottom-12" standalone />

        <div className="flex items-center gap-3 flex-wrap">
          {project.status && <StatusPill status={project.status} note={project.statusNote} />}
          <span className="label-mono">{project.type}</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-[1.05]">
              {project.title}
            </h1>
            <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
              {project.description}
            </p>
          </div>

          {links.length > 0 && (
            <div className="flex gap-2 shrink-0">
              {links.map(({ href, label, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-xl border border-border bg-background/60 text-muted-foreground hover:text-foreground hover:border-foreground active:scale-95 transition-[color,border-color,transform] duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      {project.metrics && project.metrics.length > 0 && <MetricGrid metrics={project.metrics} />}

      {/* Contextual nav — only sections that exist */}
      <nav
        aria-label="Sections"
        className="sticky top-3 z-30 flex gap-1 p-1.5 overflow-x-auto [scrollbar-width:none] rounded-2xl border border-border bg-background/85 backdrop-blur-md font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="shrink-0 px-3 py-1.5 rounded-xl hover:text-foreground hover:bg-card transition-colors duration-200"
          >
            {s.label}
          </a>
        ))}
      </nav>

      <div className="space-y-14">
        {/* Overview */}
        <section id="overview" className="space-y-4 scroll-mt-24">
          <SectionLabel index={indexOf("overview")} label="Overview" />
          <p className="text-base text-foreground leading-relaxed opacity-80">
            {fullContent.overview}
          </p>

          <div className="grid md:grid-cols-2 gap-3 pt-2">
            <div className="card p-5 space-y-2">
              <span className="label-mono">Challenge</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fullContent.challenge}
              </p>
            </div>
            <div className="card p-5 space-y-2">
              <span className="label-mono">Solution</span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fullContent.solution}
              </p>
            </div>
          </div>

          <div className="card p-5 space-y-4">
            <span className="label-mono">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {fullContent.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Demo */}
        {project.video && (
          <section id="demo" className="space-y-4 scroll-mt-24">
            <SectionLabel index={indexOf("demo")} label="Demo" />
            <VideoEmbed video={project.video} className="rounded-2xl" />
            <a
              href={`https://youtu.be/${project.video.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 px-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              Watch on YouTube
              <ArrowUpRight
                size={11}
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </a>
          </section>
        )}

        {/* Screens */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section id="screens" className="space-y-4 scroll-mt-24">
            <SectionLabel index={indexOf("screens")} label="Screens" />
            <ScreenshotGallery shots={project.screenshots} />
          </section>
        )}

        {/* Architecture */}
        {project.architecture && (
          <section id="architecture" className="space-y-4 scroll-mt-24">
            <SectionLabel index={indexOf("architecture")} label="Architecture" />
            <ArchitectureViewer
              source={project.architecture}
              title={`${project.slug} — architecture.mmd`}
              caption={
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                  Click to zoom · drag to pan
                </span>
              }
            />
          </section>
        )}

        {/* Decisions */}
        {project.decisions && project.decisions.length > 0 && (
          <section id="decisions" className="space-y-4 scroll-mt-24">
            <SectionLabel index={indexOf("decisions")} label="Decisions" />
            <div className="space-y-2">
              {project.decisions.map((d) => (
                <DecisionRecord key={d.title} decision={d} />
              ))}
            </div>
          </section>
        )}

        {/* Timeline */}
        {project.timeline && project.timeline.length > 0 && (
          <section id="timeline" className="space-y-4 scroll-mt-24">
            <SectionLabel index={indexOf("timeline")} label="Timeline" />
            <Timeline items={project.timeline} />
          </section>
        )}

        {/* Impact */}
        <section id="impact" className="space-y-5 scroll-mt-24">
          <SectionLabel index={indexOf("impact")} label="Impact" />
          <ul className="card p-5 md:p-6 space-y-3">
            {fullContent.impact.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm text-foreground leading-relaxed"
              >
                <span className="text-highlight shrink-0 font-mono mt-0.5">→</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Related writing */}
        {relatedArticle && (
          <section id="writing" className="space-y-4 scroll-mt-24">
            <SectionLabel index={indexOf("writing")} label="Writing" />
            <Link
              href={`/blog/${relatedArticle.slug}`}
              className="group card card-interactive block p-5 hover:-translate-y-0.5 transition-[transform,border-color,background-color] duration-200"
            >
              <span className="label-mono inline-flex items-center gap-1">
                Related article
                <ArrowUpRight
                  size={11}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </span>
              <h3 className="text-base font-medium text-foreground mt-2 group-hover:text-highlight transition-colors duration-200">
                {relatedArticle.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                {relatedArticle.summary}
              </p>
            </Link>
          </section>
        )}
      </div>

      {/* Footer nav */}
      <div className="pt-6 border-t border-border flex items-center justify-between gap-4">
        <Link
          href="/#systems"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to work
        </Link>

        {nextProject && (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Next — {nextProject.title}
            <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
