import { PORTFOLIO_DATA } from "@/data/portfolio";

export function HowIThink() {
  const [lead, ...rest] = PORTFOLIO_DATA.howIThink;
  return (
    <section id="how-i-think" className="space-y-6 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[04]</span>
        <span className="label-mono">How I Think</span>
      </div>

      <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug max-w-xl">
        {lead}
      </p>

      <div className="space-y-4 max-w-xl">
        {rest.map((para) => (
          <p key={para} className="text-sm text-muted-foreground leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}

export function WhatMakesDifferent() {
  return (
    <section id="what-makes-me-different" className="space-y-6 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[05]</span>
        <span className="label-mono">What Makes Me Different</span>
      </div>

      <div className="space-y-4 max-w-xl">
        {PORTFOLIO_DATA.whatMakesDifferent.map((para) => (
          <p key={para} className="text-sm text-muted-foreground leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
