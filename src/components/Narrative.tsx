import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Reveal } from "@/components/motion/Reveal";

export function HowIWork() {
  const { lead, principles } = PORTFOLIO_DATA.howIWork;
  return (
    <section id="how-i-work" className="space-y-6 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[04]</span>
        <span className="label-mono">How I Work</span>
      </div>

      <p className="text-xl md:text-2xl font-medium tracking-tight text-foreground leading-snug max-w-xl">
        {lead}
      </p>

      <ul className="grid sm:grid-cols-2 gap-3">
        {principles.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={i * 0.05} className="h-full">
              <div className="card card-interactive h-full p-5 space-y-2 hover:-translate-y-0.5 transition-[transform,border-color,background-color] duration-200">
                <span className="font-mono text-[10px] text-highlight">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-medium text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
