import { RETAINER_DATA } from "@/data/retainer";

export function RetainerPricing() {
  const { tiers, note } = RETAINER_DATA.pricing;
  const oneTime = RETAINER_DATA.oneTimeProject;

  return (
    <section id="pricing" className="space-y-10 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[04]</span>
        <span className="label-mono">Pricing</span>
      </div>

      {/* Three pricing tiers */}
      <div className="grid md:grid-cols-3 gap-4 md:gap-3 pt-2">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={[
              "relative border p-6 space-y-6 flex flex-col transition-colors duration-200",
              tier.highlighted
                ? "border-foreground bg-card"
                : "border-border bg-background hover:border-highlight",
            ].join(" ")}
          >
            {tier.highlighted && (
              <span className="absolute -top-2.5 left-6 inline-flex items-center bg-foreground text-background px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em]">
                Most Popular
              </span>
            )}

            <div className="space-y-1">
              <h3 className="text-base font-medium text-foreground">
                {tier.name}
              </h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-medium tracking-tight text-foreground">
                  ${tier.price}
                </span>
                <span className="label-mono">/mo</span>
              </div>
              <span className="label-mono">{tier.hours}</span>
            </div>

            <ul className="space-y-2 flex-1">
              {tier.features.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="text-foreground shrink-0 font-mono text-xs mt-0.5">
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p className="text-[11px] font-mono text-muted-foreground leading-snug border-t border-border-dim pt-4">
              Best for: {tier.bestFor}
            </p>
          </div>
        ))}
      </div>

      {/* Note below all three cards — centred, subtle */}
      <div className="text-center space-y-1.5 max-w-md mx-auto pt-2">
        {note.map((line, i) => (
          <p
            key={i}
            className="text-xs font-mono text-muted-foreground leading-relaxed opacity-70"
          >
            {line}
          </p>
        ))}
      </div>

      {/* Subtle divider before the secondary card */}
      <div className="divider" />

      {/* One-time project — secondary, footnote-weight card */}
      <div className="border border-border-dim bg-card/40 p-6 md:p-7 space-y-5 md:space-y-0 md:grid md:grid-cols-[1fr_auto] md:gap-10 md:items-end">
        <div className="space-y-3">
          <div className="space-y-1.5">
            <span className="label-mono">{oneTime.label}</span>
            <h3 className="text-base font-medium text-foreground">
              {oneTime.tagline}
            </h3>
          </div>
          <div className="space-y-2 max-w-md">
            {oneTime.description.map((line, i) => (
              <p
                key={i}
                className="text-sm text-muted-foreground leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="space-y-3 md:flex md:flex-col md:items-end">
          <a
            href={oneTime.calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost w-fit"
          >
            {oneTime.buttonText}
          </a>
          <p className="text-[11px] font-mono text-muted-foreground leading-relaxed max-w-[240px] md:text-right opacity-80">
            {oneTime.footnote}
          </p>
        </div>
      </div>
    </section>
  );
}
