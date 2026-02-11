"use client";

import Image from "next/image";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Hero() {
    return (
        <section className="relative w-full space-y-12 animate-in fade-in duration-1000">
            <div className="flex flex-col items-center gap-8">
                {/* Quick Nav Above Avatar */}
                <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 px-4">
                    {[
                        ["Stack", "#tech-stack"],
                        ["Systems", "#systems"],
                        ["Meetings", "#consultation"],
                        ["Log", "#experience"],
                        ["Awards", "#achievements"],
                    ].map(([label, href]) => (
                        <a
                            key={label}
                            href={href}
                            className="font-mono text-[9px] uppercase tracking-[0.4em] text-noir-muted hover:text-white transition-colors border-b border-transparent hover:border-noir-border pb-1"
                        >
                            {label}
                        </a>
                    ))}
                </nav>

                {/* Symmetrical Avatar Placement */}
                <div className="relative w-32 h-32 md:w-36 md:h-36 rounded-full border border-noir-border p-2 bg-noir-bg shadow-2xl overflow-hidden group">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                        <Image
                            src={PORTFOLIO_DATA.profile.avatar}
                            fill
                            alt="Profile"
                            className="object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* Identity & Bio */}
            <div className="pt-16 flex flex-col items-center text-center space-y-6">
                <div className="space-y-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.6em] text-noir-muted block">
                        {PORTFOLIO_DATA.profile.role.split('|')[0].trim()}
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white/95 leading-none">
                        {PORTFOLIO_DATA.profile.name}
                    </h1>
                </div>

                <p className="text-base md:text-lg text-noir-muted leading-relaxed font-light max-w-2xl px-4">
                    {PORTFOLIO_DATA.profile.bio}
                </p>

                {/* Symmetrical Metadata */}
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-[9px] font-mono text-noir-muted uppercase tracking-widest border-t border-noir-border pt-8 w-full max-w-lg mx-auto">
                    <div className="flex items-center gap-2">
                        <span className="opacity-75">LOCATION //</span>
                        <span className="text-white/80">{PORTFOLIO_DATA.profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="opacity-75">AVAILABILITY //</span>
                        <span className="text-white/80">{PORTFOLIO_DATA.profile.availability}</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
