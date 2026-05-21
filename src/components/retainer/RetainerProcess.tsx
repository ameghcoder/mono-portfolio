import { RETAINER_DATA } from "@/data/retainer";

export function RetainerProcess() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="section-index">[05]</span>
        <span className="label-mono">How It Works</span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px border border-border bg-border">
        {RETAINER_DATA.process.map((step) => (
          <div key={step.index} className="bg-background p-6 space-y-3">
            <span className="section-index text-accent">{step.index}</span>
            <h3 className="text-sm font-medium text-foreground">
              {step.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
