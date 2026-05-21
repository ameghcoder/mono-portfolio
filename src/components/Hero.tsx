import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { TypewriterRole } from "@/components/TypewriterRole";
import { icons } from "./Contact";

const HANDLE = "@yrjdev";

export function Hero() {
  const { name, headline, location, availability, avatar } =
    PORTFOLIO_DATA.profile;

  return (
    <section className="space-y-5">
      <div className="relative">
        {/* Banner — edge-to-edge on mobile, container-width above */}
        <div className="relative aspect-3/1 overflow-hidden bg-card">
          <Image
            src="/banner02.jpeg"
            alt=""
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 720px"
            className="object-cover rounded-xl z-0"
          />
        </div>

        {/* Avatar row — avatar overlaps banner, buttons sit top-right on md+ */}
        <div className="flex items-end justify-between gap-4 absolute bottom-2 md:bottom-4 left-2 md:left-4">
          <div className="shrink-0 rounded-lg border-8 border-background bg-background shadow-md">
            <Image
              src={avatar}
              alt={name}
              width={96}
              height={96}
              priority
              className="rounded-lg block size-20 md:size-24 object-cover"
            />
          </div>

        </div>
      </div>

      {/* Identity — name + handle/role */}
      <div className="space-y-1 pt-1">
        {/* Social links */}
        <div className="flex items-center justify-end gap-5 pb-2">
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
        <h1 className="text-2xl md:text-3xl font-medium tracking-tight text-foreground leading-tight">
          {name}
        </h1>
        <p className="text-sm font-mono text-muted-foreground">
          {HANDLE}
          <span className="opacity-40 px-2">·</span>
          <TypewriterRole />
        </p>
        <div className="hidden md:flex gap-2 mt-6">
          <Link href="/#systems" className="btn-primary">
            See My Work
          </Link>
          <Link href="/retainer" className="btn-ghost">
            View Retainer
          </Link>
        </div>
      </div>

      {/* Bio */}
      <p className="text-base text-foreground leading-relaxed max-w-md opacity-90">
        {headline}
      </p>

      {/* Meta row — location · status */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
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

      {/* Buttons — mobile only (desktop pair lives in the avatar row) */}
      <div className="flex md:hidden flex-wrap gap-2 pt-3">
        <Link href="/#systems" className="btn-primary">
          See My Work
        </Link>
        <Link href="/retainer" className="btn-ghost">
          View Retainer
        </Link>
      </div>
    </section>
  );
}
