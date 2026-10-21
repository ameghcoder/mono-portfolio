"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { ContributionCalendar, ContributionDay } from "@/lib/github-types";
import { cn } from "@/lib/utils";

/** Monochrome ramp on the foreground token, so both themes stay on-palette. */
const LEVEL_CLASS = [
  "bg-foreground/[0.07]",
  "bg-foreground/25",
  "bg-foreground/45",
  "bg-foreground/70",
  "bg-foreground",
];

/** Phones show the most recent weeks only; sm+ shows the full year. */
const MOBILE_WEEKS = 20;

const fmtDay = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

const fmtMonth = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

const plural = (n: number) => `${n.toLocaleString("en-US")} contribution${n === 1 ? "" : "s"}`;

export function ContributionGraph({
  calendar,
  user,
}: {
  calendar: ContributionCalendar;
  user: string;
}) {
  const { weeks, total } = calendar;
  const [active, setActive] = useState<ContributionDay | null>(null);

  const { busiest, monthLabels } = useMemo(() => {
    let busiest: ContributionDay | null = null;
    const monthLabels: (string | null)[] = weeks.map(() => null);
    const labelAt: number[] = [];
    let lastMonth = "";
    weeks.forEach((week, i) => {
      for (const d of week) if (d && (!busiest || d.count > busiest.count)) busiest = d;
      const first = week.find((d): d is ContributionDay => d !== null);
      if (first && first.date.slice(0, 7) !== lastMonth) {
        lastMonth = first.date.slice(0, 7);
        monthLabels[i] = fmtMonth(first.date);
        labelAt.push(i);
      }
    });
    // A partial first month leaves its label too close to the next one;
    // drop it (as GitHub does) rather than the full month after it.
    if (labelAt.length > 1 && labelAt[1] - labelAt[0] < 3) monthLabels[labelAt[0]] = null;
    return { busiest: busiest as ContributionDay | null, monthLabels };
  }, [weeks]);

  const caption = active
    ? `${plural(active.count)} on ${fmtDay(active.date)}`
    : busiest && busiest.count > 0
      ? `Busiest day: ${fmtDay(busiest.date)} · ${plural(busiest.count)}`
      : "Hover a day to see its count";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-foreground">
          <span className="font-mono">{total.toLocaleString("en-US")}</span>{" "}
          <span className="text-muted-foreground">contributions in the last year</span>
        </p>
        <a
          href={`https://github.com/${user}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200 shrink-0"
        >
          @{user}
          <ArrowUpRight
            size={11}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </div>

      {/* Visual only — the total above and the caption below carry the information. */}
      <div
        role="img"
        aria-label={`GitHub contribution graph: ${plural(total)} in the last year`}
        className="grid grid-flow-col auto-cols-fr gap-[3px]"
        // Touch fires pointerleave right after the tap — keep the tapped day shown.
        onPointerLeave={(e) => e.pointerType === "mouse" && setActive(null)}
      >
        {weeks.map((week, i) => (
          <motion.div
            key={i}
            data-reveal
            className={cn(
              "flex flex-col gap-[3px] min-w-0",
              i < weeks.length - MOBILE_WEEKS && "hidden sm:flex"
            )}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.01 }}
          >
            <span aria-hidden="true" className="relative h-3.5">
              {monthLabels[i] && (
                <span className="absolute left-0 top-0 font-mono text-[9px] uppercase tracking-wider text-muted-foreground whitespace-nowrap">
                  {monthLabels[i]}
                </span>
              )}
            </span>
            {Array.from({ length: 7 }, (_, d) => {
              const day = week[d];
              if (!day) return <span key={d} className="aspect-square" aria-hidden="true" />;
              return (
                <span
                  key={d}
                  aria-hidden="true"
                  onPointerEnter={() => setActive(day)}
                  className={cn(
                    "aspect-square rounded-[3px] transition-transform duration-150 hover:scale-[1.35] hover:relative hover:z-10 hover:ring-1 hover:ring-foreground/40",
                    LEVEL_CLASS[day.level],
                    active?.date === day.date && "ring-1 ring-foreground/60"
                  )}
                />
              );
            })}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <p aria-live="polite" className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
          {caption}
        </p>
        <div aria-hidden="true" className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          Less
          {LEVEL_CLASS.map((cls) => (
            <span key={cls} className={cn("size-2.5 rounded-[3px]", cls)} />
          ))}
          More
        </div>
      </div>
    </div>
  );
}
