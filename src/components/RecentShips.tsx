import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const SHIPS = PORTFOLIO_DATA.projects
  .filter((p) => p.featured || p.openSource)
  .slice(0, 5);

export function RecentShips() {
  return (
    <section className="space-y-8" id="recent-ships">
      <div className="flex items-center gap-4">
        <span className="section-index">[01]</span>
        <span className="label-mono">Recent Ships</span>
      </div>

      <ol className="space-y-px border border-border bg-border">
        {SHIPS.map((ship, i) => {
          const headline = ship.metric ?? ship.fullContent.impact[0];
          return (
            <li
              key={ship.slug}
              className="group bg-background hover:bg-card transition-colors duration-200 px-6 py-4 flex items-start gap-5"
            >
              <span className="font-mono text-[10px] text-muted-foreground pt-1 shrink-0 tabular-nums tracking-[0.12em]">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-sm font-medium text-foreground">
                    {ship.title}
                    <span className="label-mono ml-3 align-middle">
                      {ship.type}
                    </span>
                  </h3>
                  <Link
                    href={`/projects/${ship.slug}`}
                    aria-label={`Open ${ship.title} case study`}
                    className="shrink-0 text-muted-foreground group-hover:text-highlight transition-colors duration-200"
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>

                <p className="text-[11px] font-mono text-highlight tracking-wide leading-relaxed">
                  → {headline}
                </p>

                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.1em]">
                  {ship.tags.join(" · ")}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
