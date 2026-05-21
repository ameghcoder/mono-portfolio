import { RETAINER_DATA } from "@/data/retainer";

export function RetainerProblems() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="section-index">[01]</span>
        <span className="label-mono">The Problem I Solve</span>
      </div>

      <div className="space-y-px border border-border bg-border">
        {RETAINER_DATA.problems.map((item, i) => (
          <div
            key={i}
            className="bg-background p-6 grid md:grid-cols-2 gap-4 hover:bg-surface transition-colors duration-200"
          >
            <p className="text-sm font-medium text-foreground leading-snug">
              {item.problem}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              → {item.resolution}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
