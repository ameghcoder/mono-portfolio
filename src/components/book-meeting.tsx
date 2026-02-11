/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { PORTFOLIO_DATA } from '@/data/portfolio';
import { useEffect, useRef } from 'react';

export default function Booker() {
    const calInitialized = useRef(false);

    useEffect(() => {
        // Prevent double initialization
        if (calInitialized.current) return;

        // Cal.com embed script initialization
        (function (C: Window & { Cal?: any }, A: string, L: string) {
            const p = function (a: any, ar: any) {
                a.q.push(ar);
            };

            const d = C.document;

            C.Cal =
                C.Cal ||
                function (...args: any[]) {
                    const cal = C.Cal!;
                    if (!cal.loaded) {
                        cal.ns = {};
                        cal.q = cal.q || [];
                        const script = d.createElement("script");
                        script.src = A;
                        script.async = true;
                        d.head.appendChild(script);
                        cal.loaded = true;
                    }
                    if (args[0] === L) {
                        const api = function (...apiArgs: any[]) {
                            p(api, apiArgs);
                        };
                        const namespace = args[1];
                        (api as any).q = (api as any).q || [];
                        if (typeof namespace === "string") {
                            cal.ns[namespace] = cal.ns[namespace] || api;
                            p(cal.ns[namespace], args);
                            p(cal, ["initNamespace", namespace]);
                        } else {
                            p(cal, args);
                        }
                        return;
                    }
                    p(cal, args);
                };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        // Initialize Cal
        (window as any).Cal("init", "dojo-booking", { origin: "https://cal.com" });

        // Create the inline embed
        (window as any).Cal.ns["dojo-booking"]("inline", {
            elementOrSelector: "#cal-booking-embed",
            calLink: PORTFOLIO_DATA.calendarUrl,
            layout: "month_view",
        });

        // Style the embed to match noir theme
        (window as any).Cal.ns["dojo-booking"]("ui", {
            theme: "dark",
            cssVarsPerTheme: {
                dark: {
                    "cal-brand": "#FFFFFF",
                    "cal-bg": "#000000",
                    "cal-text": "#FFFFFF",
                    "cal-text-muted": "#888888",
                    "cal-border": "#1A1A1A"
                },
            },
            hideEventTypeDetails: false,
            layout: "month_view",
        });

        calInitialized.current = true;
    }, []);

    return (
        <section id="consultation" className="space-y-12 px-4 scroll-mt-24">
            <div className="text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.4em] text-noir-muted border border-noir-border">
                    LOG_V03 // MEETING_SCHEDULER
                </div>
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                    Schedule a <span className="text-noir-muted font-light italic">Technical Consultation</span>
                </h2>
                <p className="text-noir-muted text-base md:text-lg max-w-xl mx-auto font-light leading-relaxed">
                    Select a time for a deep-dive session into your system architecture or development requirements.
                </p>
            </div>

            {/* Cal.com inline embed container with noir styling */}
            <div
                id="cal-booking-embed"
                className="w-full min-h-[650px] border border-noir-border bg-noir-surface/10 grayscale contrast-125"
            />
        </section>
    );
}