import { PORTFOLIO_DATA } from "@/data/portfolio";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Terminal, Globe, Cpu } from "lucide-react";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const project = PORTFOLIO_DATA.projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="max-container py-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Editorial Header */}
            <header className="space-y-12 mb-20">
                <Link
                    href="/"
                    className="group inline-flex items-center gap-3 text-[10px] font-mono text-noir-muted uppercase tracking-[0.3em] hover:text-white transition-colors"
                >
                    <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
                    RETURN_TO_INDEX
                </Link>

                <div className="space-y-8">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                        <div className="space-y-4">
                            <span className="badge-type block w-fit border-noir-border text-[10px] opacity-60">
                                {project.type.toUpperCase()}
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white/95">
                                {project.title}
                            </h1>
                        </div>

                        <div className="flex gap-4">
                            {project.fullContent.links.live && (
                                <a href={project.fullContent.links.live} target="_blank" className="p-3 border border-noir-border hover:border-white transition-colors group">
                                    <Globe size={18} className="text-noir-muted group-hover:text-white" />
                                </a>
                            )}
                            {project.fullContent.links.github && (
                                <a href={project.fullContent.links.github} target="_blank" className="p-3 border border-noir-border hover:border-white transition-colors group">
                                    <Github size={18} className="text-noir-muted group-hover:text-white" />
                                </a>
                            )}
                            {project.fullContent.links.npm && (
                                <a href={project.fullContent.links.npm} target="_blank" className="p-3 border border-noir-border hover:border-white transition-colors group">
                                    <Terminal size={18} className="text-noir-muted group-hover:text-white" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="divider mb-20" />

            {/* Structured Content Grid */}
            <div className="grid gap-20 lg:grid-cols-[1fr_300px]">
                <main className="space-y-24">
                    <section className="space-y-6">
                        <h2 className="text-[10px] font-mono text-noir-muted uppercase tracking-[0.4em] border-l-2 border-noir-border pl-4">
                            01 // Overview
                        </h2>
                        <p className="text-xl md:text-2xl leading-relaxed text-white/90 font-light italic">
                            &quot;{project.fullContent.overview}&quot;
                        </p>
                    </section>

                    <section className="space-y-12">
                        <div className="grid gap-12 md:grid-cols-2">
                            <div className="space-y-6">
                                <h2 className="text-[10px] font-mono text-noir-muted uppercase tracking-[0.4em] border-l-2 border-noir-border pl-4">
                                    02 // The Challenge
                                </h2>
                                <p className="text-base text-noir-muted leading-relaxed">
                                    {project.fullContent.challenge}
                                </p>
                            </div>
                            <div className="space-y-6">
                                <h2 className="text-[10px] font-mono text-noir-muted uppercase tracking-[0.4em] border-l-2 border-noir-border pl-4">
                                    03 // The Solution
                                </h2>
                                <p className="text-base text-noir-muted leading-relaxed">
                                    {project.fullContent.solution}
                                </p>
                            </div>
                        </div>
                    </section>
                </main>

                {/* Technical Sidebar */}
                <aside className="space-y-16">
                    <div className="space-y-8 p-8 border border-noir-border bg-noir-surface/5">
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-mono text-noir-muted uppercase tracking-[0.4em] flex items-center gap-2">
                                <Cpu size={12} /> Tech_Stack
                            </h3>
                            <ul className="flex flex-wrap gap-2">
                                {project.fullContent.tech.map((t) => (
                                    <li key={t} className="text-[10px] font-mono border border-noir-border px-2 py-1 text-white/60">
                                        {t.toUpperCase()}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="divider opacity-75" />

                        <div className="space-y-6">
                            <h3 className="text-[10px] font-mono text-noir-muted uppercase tracking-[0.4em]">
                                Impact_Metrics
                            </h3>
                            <ul className="space-y-4">
                                {project.fullContent.impact.map((i) => (
                                    <li key={i} className="space-y-1">
                                        <span className="text-[9px] font-mono text-noir-muted uppercase block opacity-40">System_Result</span>
                                        <span className="text-xs font-bold text-white tracking-widest">{i}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6 px-4">
                        <h3 className="text-[10px] font-mono text-noir-muted uppercase tracking-[0.4em]">
                            Documentation
                        </h3>
                        <div className="space-y-4">
                            <p className="text-[11px] text-noir-muted leading-relaxed italic">
                                Architectural patterns and system logs are kept in a separate secure repository. Contact for full technical documentation.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Editorial Navigation Footer */}
            <footer className="mt-40 pt-16 border-t border-noir-border">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <Link
                        href="/"
                        className="editorial-link text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-3"
                    >
                        <ArrowLeft size={14} />
                        BACK_TO_CENTRAL_LOG
                    </Link>

                    <div className="text-[9px] font-mono text-noir-muted uppercase tracking-[0.3em] opacity-40">
                        {project.title} {"//"} ARCHITECTURE_V{project.slug.length}.0
                    </div>
                </div>
            </footer>
        </div>
    );
}
