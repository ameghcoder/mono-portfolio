import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Expertise() {
  return (
    <section id="expertise" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[02]</span>
        <span className="label-mono">Technical Expertise</span>
      </div>

      <div className="space-y-px border border-border bg-border rounded-lg overflow-hidden">
        {PORTFOLIO_DATA.expertise.map(({ area, skills }) => (
          <div
            key={area}
            className="bg-background px-6 py-5 grid md:grid-cols-[160px_1fr] gap-4 items-start"
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
