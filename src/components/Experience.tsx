"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Experience() {
    return (
        <section id="experience" className="space-y-12 px-4 scroll-mt-32">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-noir-muted">
                Professional Log
            </h2>
            <div className="space-y-16">
                {PORTFOLIO_DATA.experience.map((exp) => (
                    <div key={exp.company} className="grid md:grid-cols-[200px_1fr] gap-8">
                        <div className="space-y-1">
                            <span className="font-mono text-[9px] text-noir-muted block uppercase">{exp.period}</span>
                            <span className="text-white font-bold">{exp.company}</span>
                        </div>
                        <div className="space-y-4">
                            <p className="font-mono text-[10px] uppercase text-brand-accent tracking-widest border border-noir-border w-fit px-2 py-0.5">
                                {exp.role}
                            </p>
                            <ul className="space-y-3">
                                {exp.description.map((item, j) => (
                                    <li key={j} className="text-sm text-noir-muted leading-relaxed flex gap-3">
                                        <span className="opacity-20 text-white shrink-0">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
