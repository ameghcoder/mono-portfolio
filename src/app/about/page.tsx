import type { Metadata } from "next";
import Image from "next/image";
import { FileText } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { Expertise } from "@/components/Expertise";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About",
  description: PORTFOLIO_DATA.intro[0],
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { name, avatar, resumeUrl } = PORTFOLIO_DATA.profile;

  return (
    <div className="max-container pt-10 md:pt-16 pb-16 space-y-16">
      {/* Intro */}
      <header className="card isolate overflow-hidden p-6 md:p-8 space-y-6">
        <div
          aria-hidden="true"
          className="dot-grid absolute -z-10 inset-0 [--dot-mask:radial-gradient(ellipse_70%_70%_at_100%_0%,#000_10%,transparent_70%)]"
        />
        <div className="flex items-center gap-4">
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            priority
            className="rounded-2xl block size-14 object-cover border border-border shrink-0"
          />
          <div>
            <span className="label-mono block">About</span>
            <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground">
              {name}
            </h1>
          </div>
        </div>

        <div className="space-y-4 max-w-xl">
          {PORTFOLIO_DATA.intro.map((para) => (
            <p key={para} className="text-base text-foreground/90 leading-relaxed">
              {para}
            </p>
          ))}
        </div>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost bg-background/60 w-fit"
        >
          <FileText size={12} aria-hidden="true" />
          Resume
        </a>
      </header>

      {/* What I Build */}
      <Reveal>
        <section id="what-i-build" className="space-y-8 scroll-mt-20">
          <div className="flex items-center gap-4">
            <span className="section-index">[01]</span>
            <span className="label-mono">What I Build</span>
          </div>
          <ul className="grid sm:grid-cols-2 gap-3">
            {PORTFOLIO_DATA.whatIBuild.map((item) => (
              <li
                key={item}
                className="card px-5 py-4 flex items-start gap-3 text-sm text-foreground/90 leading-relaxed sm:odd:last:col-span-2"
              >
                <span className="text-highlight font-mono shrink-0">→</span>
                {item}
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      <Reveal>
        <Expertise />
      </Reveal>

      <Reveal>
        <Experience />
      </Reveal>
      <Footer />
    </div>
  );
}
