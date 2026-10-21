import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Expertise() {
  return (
    <section id="expertise" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[02]</span>
        <span className="label-mono">Stack</span>
      </div>

      <div className="space-y-px border border-border bg-border rounded-2xl overflow-hidden">
        {PORTFOLIO_DATA.expertise.map(({ area, skills }) => (
          <div
            key={area}
            className="bg-background px-6 py-4 grid md:grid-cols-[120px_1fr] gap-3 md:gap-4 items-center"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-foreground pt-0.5">
              {area}
            </span>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
