import { RETAINER_DATA } from "@/data/retainer";

export function RetainerWhatIHandle() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="section-index">[02]</span>
        <span className="label-mono">What I Handle</span>
      </div>

      <div className="grid md:grid-cols-3 gap-px border border-border bg-border">
        {RETAINER_DATA.whatIHandle.map((col) => (
          <div key={col.title} className="bg-background p-6 space-y-4">
            <h3 className="text-sm font-medium text-foreground">
              {col.title}
            </h3>
            <ul className="space-y-2">
              {col.items.map((item, i) => (
                <li key={i} className="text-sm text-muted-foreground leading-relaxed">
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
