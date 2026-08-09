import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getPostBySlug } from "@/lib/blog";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Github, Globe, Terminal } from "lucide-react";
import type { Metadata } from "next";
import { ArchitectureViewer } from "@/components/ArchitectureViewer";
import { DecisionRecord } from "@/components/projects/DecisionRecord";

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
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
    },
  };
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
    ...(project.architecture ? [{ id: "architecture", label: "Architecture" }] : []),
    ...(project.decisions?.length ? [{ id: "decisions", label: "Decisions" }] : []),
    { id: "impact", label: "Impact" },
    ...(relatedArticle ? [{ id: "writing", label: "Writing" }] : []),
  ];

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
      <header className="space-y-5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="label-mono">{project.type}</span>
          {project.status && (
            <>
              <span className="text-border-dim" aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                <span className="size-1.5 rounded-full bg-success shrink-0" aria-hidden="true" />
                {project.status}
              </span>
            </>
          )}
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

          <div className="flex gap-2 shrink-0">
            {fullContent.links.live && (
              <a
                href={fullContent.links.live}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Live site"
                className="p-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
              >
                <Globe size={15} />
              </a>
            )}
            {fullContent.links.github && (
              <a
                href={fullContent.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
              >
                <Github size={15} />
              </a>
            )}
            {fullContent.links.npm && (
              <a
                href={fullContent.links.npm}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="npm package"
                className="p-2.5 border border-border text-muted-foreground hover:text-foreground hover:border-foreground transition-colors duration-200"
              >
                <Terminal size={15} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Contextual nav — only sections that exist */}
      <nav
        aria-label="Sections"
        className="flex flex-wrap gap-x-6 gap-y-2 py-3 border-y border-border-dim font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
      >
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="hover:text-foreground transition-colors duration-200">
            {s.label}
          </a>
        ))}
      </nav>

      {/* Content + sidebar */}
      <div className="grid md:grid-cols-[1fr_220px] gap-14 items-start">
        <div className="space-y-14">
          {/* Overview */}
          <div id="overview" className="space-y-4 scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="section-index">[01]</span>
              <span className="label-mono">Overview</span>
            </div>
            <p className="text-base text-foreground leading-relaxed opacity-80">
              {fullContent.overview}
            </p>

            <div className="grid md:grid-cols-2 gap-10 pt-2">
              <div className="space-y-2">
                <span className="label-mono">Challenge</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fullContent.challenge}
                </p>
              </div>
              <div className="space-y-2">
                <span className="label-mono">Solution</span>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fullContent.solution}
                </p>
              </div>
            </div>
          </div>

          {/* Architecture */}
          {project.architecture && (
            <div id="architecture" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="section-index">[02]</span>
                <span className="label-mono">Architecture</span>
              </div>
              <ArchitectureViewer
                source={project.architecture}
                title={`${project.slug} — architecture.mmd`}
                caption={
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
                    Click to zoom · drag to pan
                  </span>
                }
              />
            </div>
          )}

          {/* Decisions */}
          {project.decisions && project.decisions.length > 0 && (
            <div id="decisions" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="section-index">[03]</span>
                <span className="label-mono">Decisions</span>
              </div>
              <div className="space-y-px">
                {project.decisions.map((d) => (
                  <DecisionRecord key={d.title} decision={d} />
                ))}
              </div>
            </div>
          )}

          {/* Impact */}
          <div id="impact" className="space-y-5 scroll-mt-24">
            <div className="flex items-center gap-3">
              <span className="section-index">[04]</span>
              <span className="label-mono">Impact</span>
            </div>
            <ul className="space-y-3">
              {fullContent.impact.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-foreground leading-relaxed"
                >
                  <span className="text-highlight shrink-0 font-mono mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Related writing */}
          {relatedArticle && (
            <div id="writing" className="space-y-4 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="section-index">[05]</span>
                <span className="label-mono">Writing</span>
              </div>
              <Link
                href={`/blog/${relatedArticle.slug}`}
                className="group block border border-border p-5 hover:border-highlight transition-colors duration-200"
              >
                <span className="label-mono">Related article</span>
                <h3 className="text-base font-medium text-foreground mt-2 group-hover:text-highlight transition-colors duration-200">
                  {relatedArticle.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">
                  {relatedArticle.summary}
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="md:sticky md:top-20 space-y-5">
          <div className="border border-border p-5 space-y-4 bg-card">
            <span className="label-mono">Tech Stack</span>
            <div className="flex flex-wrap gap-2">
              {fullContent.tech.map((t) => (
                <span key={t} className="tag">{t}</span>
              ))}
            </div>
          </div>
        </aside>
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
