import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, FileText, MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { getContributions } from "@/lib/github";
import { TypewriterRole } from "@/components/TypewriterRole";
import { CornerGlyph, HoverCard } from "@/components/ProjectGlyph";
import { StatusPill } from "@/components/StatusPill";
import { ContributionGraph } from "@/components/hero/ContributionGraph";
import { Reveal } from "@/components/motion/Reveal";
import { icons } from "./Contact";

const HANDLE = "@yrjdev";

const spotlight = PORTFOLIO_DATA.projects.find((p) => p.spotlight);

/**
 * Bento hero. The identity tile renders without an entrance animation so the
 * positioning is readable on first paint; the supporting tiles stagger in.
 * Mobile: identity → [live | stats] → contribution graph.
 */
export async function Hero() {
  const { name, tagline, stackLine, location, availability, avatar, resumeUrl, githubUser } =
    PORTFOLIO_DATA.profile;
  const contributions = await getContributions(githubUser);

  return (
    <section
      aria-label="Introduction"
      className="grid grid-cols-2 md:grid-cols-[minmax(0,1fr)_220px] gap-3"
    >
      {/* Identity */}
      <div className="card isolate overflow-hidden col-span-2 md:col-span-1 md:row-span-2 p-6 md:p-7 flex flex-col justify-between gap-7">
        <div
          aria-hidden="true"
          className="dot-grid absolute -z-10 inset-0 [--dot-mask:radial-gradient(ellipse_75%_70%_at_0%_0%,#000_10%,transparent_70%)]"
        />

        <div className="flex items-center gap-4">
          <Image
            src={avatar}
            alt={name}
            width={56}
            height={56}
            priority
            className="rounded-2xl block size-12 sm:size-14 object-cover border border-border shrink-0 transition-transform duration-300 hover:-rotate-3 hover:scale-105"
          />
          <div className="min-w-0">
            <h1 className="text-2xl md:text-[28px] font-medium tracking-tight text-foreground leading-tight">
              {name}
            </h1>
            <p className="text-xs sm:text-sm font-mono text-muted-foreground truncate">
              {HANDLE}
              <span className="opacity-40 px-1.5 sm:px-2">·</span>
              <TypewriterRole />
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xl md:text-2xl text-foreground leading-snug tracking-tight max-w-md">
            {tagline}
          </p>
          <p className="font-mono text-[11px] tracking-wide text-muted-foreground">{stackLine}</p>
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5 label-mono">
              <MapPin size={11} className="opacity-70" aria-hidden="true" />
              {location}
            </span>
            <span className="status-indicator">{availability.replace("// ", "")}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              <Link href="/#systems" className="btn-primary">
                See My Work
              </Link>
              <Link href="/blog" className="btn-ghost bg-background/60">
                Blog
              </Link>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost bg-background/60"
              >
                <FileText size={12} aria-hidden="true" />
                Resume
              </a>
            </div>
            <div className="flex items-center gap-1">
              {PORTFOLIO_DATA.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-card active:scale-90 transition-[color,background-color,transform] duration-200"
                >
                  {icons[social.icon]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Live product */}
      {spotlight && (
        <Reveal delay={0.05} className="col-span-1">
          <HoverCard className="group h-full p-5 flex flex-col justify-between gap-5">
            <CornerGlyph icon={spotlight.icon} size={96} className="-right-5 -bottom-6" />
            <div className="space-y-3">
              {spotlight.status && <StatusPill status={spotlight.status} />}
              <div className="space-y-1">
                <span className="label-mono block">Now</span>
                <Link
                  href={`/projects/${spotlight.slug}`}
                  className="block text-lg font-medium tracking-tight text-foreground after:absolute after:inset-0 after:rounded-2xl focus-visible:outline-none"
                >
                  {spotlight.title}
                </Link>
                <p className="text-xs text-muted-foreground leading-relaxed">{spotlight.type}</p>
              </div>
            </div>
            {spotlight.fullContent.links.live && (
              <a
                href={spotlight.fullContent.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 w-fit inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {new URL(spotlight.fullContent.links.live).hostname}
                <ArrowUpRight size={11} aria-hidden="true" />
              </a>
            )}
          </HoverCard>
        </Reveal>
      )}

      {/* Stats */}
      <Reveal delay={0.1} className={spotlight ? "col-span-1" : "col-span-2 md:col-span-1"}>
        <div className="card h-full p-5">
          <ul className="space-y-3.5">
            {PORTFOLIO_DATA.heroStats.map((stat) => (
              <li key={stat.label}>
                <span className="block font-mono text-xl tracking-tight text-foreground">
                  {stat.value}
                </span>
                <span className="label-mono">{stat.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* GitHub activity — omitted entirely if GitHub couldn't be reached at build/revalidate */}
      {contributions && (
        <Reveal delay={0.15} className="col-span-2">
          <div className="card p-5 md:p-6">
            <ContributionGraph calendar={contributions} user={githubUser} />
          </div>
        </Reveal>
      )}
    </section>
  );
}
