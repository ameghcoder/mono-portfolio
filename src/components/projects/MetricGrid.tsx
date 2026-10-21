import type { Metric } from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";

export function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {metrics.map((m, i) => (
        <li key={m.label}>
          <Reveal delay={Math.min(i, 5) * 0.05} className="h-full">
            <div className="card h-full p-4 md:p-5 space-y-1">
              <span className="block font-mono text-2xl md:text-[28px] tracking-tight text-foreground">
                {m.value}
              </span>
              <span className="label-mono block">{m.label}</span>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}
