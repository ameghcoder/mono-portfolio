import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Milestone } from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";

/** Vertical project history. Each entry links to the public post it came from. */
export function Timeline({ items }: { items: Milestone[] }) {
  return (
    <ol className="relative space-y-3 pl-6">
      {/* Rail */}
      <span
        aria-hidden="true"
        className="absolute left-[5px] top-3 bottom-3 w-px bg-gradient-to-b from-border via-border to-transparent"
      />
      {items.map((item, i) => (
        <li key={`${item.date}-${item.title}`} className="relative">
          <span
            aria-hidden="true"
            className="absolute -left-6 top-6 size-[11px] rounded-full border border-input bg-background"
          />
          <Reveal delay={Math.min(i, 4) * 0.05}>
            <div className="card p-5 space-y-2">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-highlight">
                  {item.date}
                </span>
                {item.source && (
                  <a
                    href={item.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    View post
                    <ArrowUpRight
                      size={11}
                      aria-hidden="true"
                      className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </a>
                )}
              </div>
              <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.detail}</p>
              {item.proof && (
                <Image
                  src={item.proof.src}
                  alt={item.proof.alt}
                  width={item.proof.width}
                  height={item.proof.height}
                  className="mt-2 rounded-xl border border-border w-full max-w-[260px] h-auto"
                />
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
