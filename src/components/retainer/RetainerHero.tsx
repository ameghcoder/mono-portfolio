import { RETAINER_DATA } from "@/data/retainer";

export function RetainerHero() {
  const lines = RETAINER_DATA.headline.split("\n");

  return (
    <section className="pt-20 pb-16 space-y-8">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.08] text-foreground">
        {lines.map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h1>

      <p className="text-base md:text-lg text-secondary-foreground leading-relaxed max-w-xl">
        {RETAINER_DATA.subline}
      </p>

      <a
        href="#pricing"
        className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-accent-foreground font-mono text-[11px] uppercase tracking-[0.1em] transition-opacity duration-200 hover:opacity-80"
      >
        Check Availability →
      </a>
    </section>
  );
}
