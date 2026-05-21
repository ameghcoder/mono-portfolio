import { RETAINER_DATA } from "@/data/retainer";

export function RetainerCTA() {
  const { finalCta } = RETAINER_DATA;

  return (
    <section className="pt-8 pb-16 space-y-8">
      <div className="divider" />

      <div className="space-y-6">
        <p className="label-mono">Ready to work together?</p>
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
          {finalCta.headline}
        </h2>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href={finalCta.calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-accent-foreground font-mono text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-80"
        >
          Book a 20-min call
        </a>
        <a
          href={`mailto:${finalCta.email}`}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-secondary-foreground font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 hover:border-muted hover:text-foreground"
        >
          Email me directly
        </a>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
        {finalCta.responseNote}
      </p>
    </section>
  );
}
