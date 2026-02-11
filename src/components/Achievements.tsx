"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Achievements() {
    return (
        <section id="achievements" className="grid gap-16 md:grid-cols-2 px-4 scroll-mt-32">
            <div className="space-y-10">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-noir-muted">
                    Achievements
                </h2>
                <ul className="space-y-4">
                    {PORTFOLIO_DATA.achievements.map((ach, i) => (
                        <li key={i} className="text-sm text-noir-muted flex gap-4 italic font-light">
                            <span className="font-mono text-[9px] opacity-20 not-italic">({i + 1})</span>
                            {ach}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="space-y-10">
                <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-noir-muted">
                    Education
                </h2>
                <div className="space-y-8">
                    {PORTFOLIO_DATA.education.map((edu) => (
                        <div key={edu.institution} className="space-y-3">
                            <div className="flex justify-between items-baseline gap-4">
                                <h3 className="text-base font-bold text-white/90">{edu.institution}</h3>
                                <span className="font-mono text-[9px] text-noir-muted">{edu.period}</span>
                            </div>
                            <p className="text-sm text-noir-muted font-light">{edu.degree}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
