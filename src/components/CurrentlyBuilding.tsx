import { PORTFOLIO_DATA } from "@/data/portfolio";

export function CurrentlyBuilding() {
  return (
    <section id="currently-building" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[01]</span>
        <span className="label-mono">Currently Building</span>
      </div>

      <div className="grid gap-4">
        {PORTFOLIO_DATA.currentlyBuilding.map((item) => (
          <div
            key={item.title}
            className="border border-border p-6 space-y-4 bg-card hover:border-highlight transition-colors duration-200"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-base font-medium tracking-tight text-foreground">
                {item.title}
              </h3>
              <span className="label-mono shrink-0 border border-border px-2 py-0.5">
                {item.label}
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
