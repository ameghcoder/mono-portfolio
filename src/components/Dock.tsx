"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Boxes, Briefcase, Home, Mail, Newspaper, User, type LucideIcon } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LatestBlogBanner } from "./LatestBlogBanner";
import { cn } from "@/lib/utils";

interface DockLink {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Homepage section this link scroll-spies on. */
  sectionId?: string;
  /** Dropped on phones so the dock fits one row. */
  desktopOnly?: boolean;
}

const links: DockLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "Work", href: "/#systems", icon: Briefcase, sectionId: "systems" },
  { label: "OSS", href: "/#open-source", icon: Boxes, sectionId: "open-source", desktopOnly: true },
  { label: "Blog", href: "/blog", icon: Newspaper },
  { label: "About", href: "/about", icon: User },
  { label: "Contact", href: "/#contact", icon: Mail, sectionId: "contact" },
];

const SECTION_IDS = links.flatMap((l) => (l.sectionId ? [l.sectionId] : []));

/** Last homepage section whose top has crossed 40% of the viewport, or null at the hero. */
function currentSection(): string | null {
  let current: string | null = null;
  for (const id of SECTION_IDS) {
    const el = document.getElementById(id);
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
  }
  return current;
}

function activeHref(pathname: string, section: string | null): string | null {
  if (pathname.startsWith("/blog")) return "/blog";
  if (pathname.startsWith("/about")) return "/about";
  if (pathname.startsWith("/projects")) return "/#systems";
  if (pathname === "/") return links.find((l) => l.sectionId === section)?.href ?? "/";
  return null;
}

const isDesktop = () => window.matchMedia("(min-width: 768px)").matches;

/**
 * The site's only navigation, in two shapes:
 * - phones: an app-style tab bar attached to the bottom edge, always visible;
 * - md+: a floating dock that slides away while scrolling down and comes back
 *   on any scroll up, near the page end, or on keyboard focus (never hides
 *   with reduced motion).
 * The "latest post" pill lives in the same column so it follows the dock.
 */
export function Dock({ latestPost }: { latestPost?: { slug: string; title: string } }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [section, setSection] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const [dockHeight, setDockHeight] = useState(0);
  const navRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const ro = new ResizeObserver(([entry]) => setDockHeight(entry.borderBoxSize[0].blockSize));
    ro.observe(nav);
    return () => ro.disconnect();
  }, []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    const nearEnd = window.innerHeight + y >= document.documentElement.scrollHeight - 120;
    setHidden(!reduceMotion && isDesktop() && y > prev && y > 160 && !nearEnd);
    if (pathname === "/") setSection(currentSection());
  });

  // Re-sync after client navigation (no scroll event fires on arrival).
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setHidden(false);
      setSection(pathname === "/" ? currentSection() : null);
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  const active = activeHref(pathname, section);

  return (
    <div className="fixed inset-x-0 bottom-0 md:bottom-[calc(1.25rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-center md:px-4 pointer-events-none">
      {latestPost && (
        <LatestBlogBanner
          slug={latestPost.slug}
          title={latestPost.title}
          // mb-2 on the pill + the dock's height = exactly the dock's slot
          shiftY={hidden ? dockHeight + 8 : 0}
        />
      )}
      <motion.nav
        ref={navRef}
        aria-label="Primary"
        onFocus={() => setHidden(false)}
        className={cn(
          // Phone: full-width tab bar on the bottom edge, safe-area aware
          "grid w-full grid-cols-6 border-t border-border bg-background/90 backdrop-blur-md px-1 pt-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom))]",
          // md+: floating rounded dock
          "md:flex md:w-auto md:items-center md:gap-0.5 md:rounded-2xl md:border md:bg-popover/95 md:p-1.5 md:shadow-xl md:shadow-black/40",
          hidden ? "pointer-events-none" : "pointer-events-auto"
        )}
        initial={{ y: 24, opacity: 0 }}
        animate={hidden ? { y: "calc(100% + 24px)", opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      >
        {links.map(({ label, href, icon: Icon, desktopOnly }) => {
          const isActive = active === href;
          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "group relative flex flex-col items-center gap-1 py-1 touch-manipulation active:scale-95 transition-[color,transform] duration-200",
                "md:flex-row md:gap-1.5 md:rounded-xl md:px-3 md:py-2",
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                desktopOnly && "hidden md:flex"
              )}
            >
              {/* md+: one shared pill that slides behind the whole active link */}
              {isActive && (
                <motion.span
                  layoutId="dock-active-pill"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 hidden rounded-xl border border-foreground/10 bg-foreground/10 md:block"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              <span className="relative flex h-7 w-12 items-center justify-center md:h-auto md:w-auto">
                {/* Phone: app-style indicator pill behind the active icon */}
                {isActive && (
                  <motion.span
                    layoutId="tab-active-pill"
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-card border border-border md:hidden"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <Icon
                  aria-hidden="true"
                  strokeWidth={isActive ? 2.25 : 1.75}
                  className="size-[19px] md:size-3.5 transition-transform duration-200 md:group-hover:-translate-y-0.5"
                />
              </span>
              <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-wider md:tracking-widest">
                {label}
              </span>
            </Link>
          );
        })}

        <span aria-hidden="true" className="mx-1 hidden h-6 w-px bg-foreground/15 md:block" />
        <ThemeToggle
          label="Theme"
          className="size-auto w-full flex-col gap-1 py-1 rounded-none hover:bg-transparent md:size-9 md:flex-row md:gap-0 md:py-0 md:rounded-xl md:hover:bg-foreground/10"
        />
      </motion.nav>
    </div>
  );
}
