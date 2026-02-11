"use client";

import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Footer() {
    return (
        <footer className="pt-24 pb-16 space-y-16 px-4">
            <div className="divider" />
            <div className="grid gap-12 lg:grid-cols-2 items-end">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold tracking-tight text-white/95">Let&apos;s engineer <br /> something resilient.</h2>
                    <a href={`mailto:${PORTFOLIO_DATA.profile.email}`} className="editorial-link text-lg block font-light">
                        {PORTFOLIO_DATA.profile.email}
                    </a>
                </div>

                <div className="flex flex-wrap gap-8 justify-start lg:justify-end">
                    {PORTFOLIO_DATA.socials.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            className="font-mono text-[9px] uppercase tracking-widest text-noir-muted hover:text-white transition-all pb-1 border-b border-transparent hover:border-white/20"
                            target="_blank"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center text-[8px] font-mono text-noir-muted uppercase tracking-[0.3em] pt-8 opacity-40">
                <span>{PORTFOLIO_DATA.profile.name} {"//"} LOG_2026</span>
                <a
                    href={PORTFOLIO_DATA.repoUrl}
                    target="_blank"
                    className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5"
                >
                    USE_THIS_TEMPLATE
                </a>
                <span>LATENCY_IS_A_CHOICE {"//"} DESIGN_v2.0</span>
            </div>
        </footer>
    );
}
