import { PORTFOLIO_DATA } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe, Terminal } from "lucide-react";
import type { Metadata } from "next";

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
        <span className="label-mono">{project.type}</span>
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

      <div className="divider" />

      {/* Content + sidebar */}
      <div className="grid md:grid-cols-[1fr_220px] gap-14 items-start">
        <div className="space-y-12">
          {/* Overview */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="section-index">[01]</span>
              <span className="label-mono">Overview</span>
            </div>
            <p className="text-base text-foreground leading-relaxed opacity-80">
              {fullContent.overview}
            </p>
          </div>

          <div className="divider" />

          {/* Challenge + Solution */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="section-index">[02]</span>
                <span className="label-mono">Challenge</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fullContent.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="section-index">[03]</span>
                <span className="label-mono">Solution</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {fullContent.solution}
              </p>
            </div>
          </div>

          <div className="divider" />

          {/* Impact */}
          <div className="space-y-5">
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

          <p className="text-[11px] font-mono text-muted-foreground leading-relaxed px-1">
            Full architecture docs available on request.
          </p>
        </aside>
      </div>

      <div className="pt-6 border-t border-border">
        <Link
          href="/#systems"
          className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          <ArrowLeft size={12} className="transition-transform duration-200 group-hover:-translate-x-1" />
          Back to work
        </Link>
      </div>
    </div>
  );
}
