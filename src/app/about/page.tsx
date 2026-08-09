import type { Metadata } from "next";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Expertise } from "@/components/Expertise";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
export const metadata: Metadata = {
  title: "About",
  description: PORTFOLIO_DATA.intro,
  alternates: { canonical: "/about" },
};
export default function AboutPage() {
  return (
    <div className="max-container pt-8 pb-16 space-y-16">
      {/* Intro */}
      <header className="space-y-5">
        <span className="label-mono">About</span>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
          {PORTFOLIO_DATA.profile.name}
        </h1>
        <p className="text-base md:text-lg text-foreground/90 leading-relaxed">
          {PORTFOLIO_DATA.intro}
        </p>
      </header>

      {/* What I Build */}
      <section id="what-i-build" className="space-y-8 scroll-mt-20">
        <div className="flex items-center gap-4">
          <span className="section-index">[01]</span>
          <span className="label-mono">What I Build</span>
        </div>
        <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
          {PORTFOLIO_DATA.whatIBuild.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-foreground/90 leading-relaxed"
            >
              <span className="text-highlight font-mono shrink-0 mt-0.5">→</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Technical Expertise */}
      <Expertise />

      {/* Experience */}
      <Experience />
      <Footer />
    </div>
  );
}
