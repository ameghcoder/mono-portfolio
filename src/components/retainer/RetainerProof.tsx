import { RETAINER_DATA } from "@/data/retainer";

export function RetainerProof() {
  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <span className="section-index">[03]</span>
        <span className="label-mono">Proof</span>
      </div>

      <div className="border border-border p-8 space-y-6 bg-surface">
        <p className="text-base md:text-lg font-medium text-foreground leading-snug max-w-2xl">
          {RETAINER_DATA.proof.statement}
        </p>

        <ul className="space-y-3">
          {RETAINER_DATA.proof.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-secondary-foreground leading-relaxed"
            >
              <span className="text-accent shrink-0 font-mono">→</span>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
