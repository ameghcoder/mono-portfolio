"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Projects() {
    return (
        <section id="systems" className="space-y-12 px-4 scroll-mt-32">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-noir-muted">
                Production Systems
            </h2>
            <div className="divide-y divide-noir-border">
                {PORTFOLIO_DATA.projects.map((project, i) => (
                    <div key={project.slug} className="group py-12 grid gap-8 md:grid-cols-[200px_1fr]">
                        <div className="space-y-3">
                            <span className="font-mono text-xs text-noir-muted opacity-75">INDEX_0{i + 1}</span>
                            <span className="badge-type block w-fit border-noir-border text-[9px]">
                                {project.type.toUpperCase()}
                            </span>
                        </div>

                        <div className="space-y-5 flex flex-col md:flex-row md:items-start md:justify-between group">
                            <div className="space-y-4 max-w-xl">
                                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white group-hover:text-noir-muted transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-base text-noir-muted leading-relaxed font-light">
                                    {project.description}
                                </p>
                            </div>
                            <Link
                                href={`/projects/${project.slug}`}
                                className="editorial-link shrink-0 text-[10px] font-mono uppercase tracking-widest flex items-center gap-2 mt-6 md:mt-2 group-hover:text-white"
                            >
                                VIEW_ARCHITECTURE
                                <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
