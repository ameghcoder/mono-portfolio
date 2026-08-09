import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { TypewriterRole } from "@/components/TypewriterRole";
import { icons } from "./Contact";

const HANDLE = "@yrjdev";

export function Hero() {
  const { name, headline, bio, location, availability, avatar } =
    PORTFOLIO_DATA.profile;

  return (
    <section className="space-y-6">
      {/* Identity row — avatar is the only photography; everything else is typographic */}
      <div className="flex items-center gap-4">
        <Image
          src={avatar}
          alt={name}
          width={56}
          height={56}
          priority
          className="rounded-full block size-14 object-cover border border-border shrink-0"
        />
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground leading-tight">
            {name}
          </h1>
          <p className="text-sm font-mono text-muted-foreground truncate">
            {HANDLE}
            <span className="opacity-40 px-2">·</span>
            <TypewriterRole />
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-5 ml-auto shrink-0">
          {PORTFOLIO_DATA.socials.map((social) => (
            <a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {icons[social.icon]}
            </a>
          ))}
        </div>
      </div>

      {/* Positioning statement */}
      <p className="text-sm text-muted-foreground leading-relaxed max-w-lg">
        {headline}
      </p>

      {/* Short factual signal line */}
      <p className="font-mono text-sm text-muted-foreground">{bio}</p>

      {/* Meta row — location · status */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="inline-flex items-center gap-1.5 label-mono">
          <MapPin size={11} className="opacity-70" aria-hidden="true" />
          {location}
        </span>
        <span className="hidden sm:inline label-mono opacity-40" aria-hidden="true">
          ·
        </span>
        <span className="status-indicator">
          {availability.replace("// ", "")}
        </span>
      </div>

      {/* Social links — mobile only (desktop pair lives in the identity row) */}
      <div className="flex sm:hidden items-center gap-5">
        {PORTFOLIO_DATA.socials.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            className="text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            {icons[social.icon]}
          </a>
        ))}
      </div>

      {/* CTAs */}
      <div className="flex flex-wrap gap-2 pt-1">
        <Link href="/#systems" className="btn-primary">
          See My Work
        </Link>
        <Link href="/blog" className="btn-ghost">
          Read the Blog
        </Link>
      </div>
    </section>
  );
}
