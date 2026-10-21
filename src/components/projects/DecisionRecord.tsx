import type { Decision } from "@/data/portfolio";
import { ChevronDown } from "lucide-react";

/** A single design decision. Native <details> — expands without JS, keyboard-native. */
export function DecisionRecord({ decision }: { decision: Decision }) {
  return (
    <details className="group card open:bg-card">
      <summary className="flex items-center justify-between gap-4 p-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span className="text-sm font-medium text-foreground">
          {decision.title}
        </span>
        <ChevronDown
          size={14}
          className="shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div className="px-5 pb-5 space-y-3 text-sm">
        <p className="text-muted-foreground leading-relaxed">
          <span className="label-mono text-foreground mr-2">Why</span>
          {decision.why}
        </p>

        {decision.alternatives && (
          <p className="text-muted-foreground leading-relaxed">
            <span className="label-mono text-foreground mr-2">Alternative</span>
            {decision.alternatives}
          </p>
        )}

        <p className="text-muted-foreground leading-relaxed">
          <span className="label-mono text-foreground mr-2">Approach</span>
          {decision.approach}
        </p>

        {decision.tradeoff && (
          <p className="text-muted-foreground leading-relaxed">
            <span className="label-mono text-foreground mr-2">Tradeoff</span>
            {decision.tradeoff}
          </p>
        )}

        {decision.outcome && (
          <p className="text-highlight leading-relaxed">
            <span className="label-mono text-foreground mr-2">Outcome</span>
            {decision.outcome}
          </p>
        )}
      </div>
    </details>
  );
}
