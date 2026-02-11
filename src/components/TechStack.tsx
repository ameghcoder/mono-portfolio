"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function TechStack() {
    return (
        <section id="tech-stack" className="space-y-12 px-4 scroll-mt-32">
            <h2 className="text-[10px] font-mono uppercase tracking-[0.4em] text-noir-muted">
                Technical Inventory
            </h2>
            <div className="grid gap-12 md:grid-cols-3">
                {PORTFOLIO_DATA.skills.map((skillGroup) => (
                    <div key={skillGroup.category} className="space-y-5">
                        <h3 className="text-sm font-bold tracking-wider text-white border-b border-noir-border pb-2">
                            {skillGroup.category.toUpperCase()}
                        </h3>
                        <ul className="space-y-2.5">
                            {skillGroup.items.map((item) => (
                                <li key={item} className="text-xs text-noir-muted font-mono leading-relaxed flex items-center gap-2 group">
                                    <div className="w-1 h-1 rounded-full bg-noir-border group-hover:bg-white transition-colors" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
}
