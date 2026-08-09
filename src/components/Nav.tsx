"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

interface NavLink {
  label: string;
  href: string;
  sectionId?: string;
}

const links: NavLink[] = [
  { label: "Work", href: "/#systems", sectionId: "systems" },
  { label: "OSS", href: "/#open-source", sectionId: "open-source" },
  { label: "Building", href: "/#currently-building", sectionId: "currently-building" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveSection(null);
      return;
    }

    const sectionIds = links
      .map((l) => l.sectionId)
      .filter((id): id is string => Boolean(id));

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveSection(topMost.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  function isActiveLink({ href, sectionId }: NavLink): boolean {
    const isPageActive =
      (href === "/blog" || href === "/about") && pathname.startsWith(href);
    const isSectionActive =
      sectionId !== undefined && activeSection === sectionId && pathname === "/";
    return isPageActive || isSectionActive;
  }

  return (
    <header className="max-container flex items-center justify-between pt-10 pb-8">
      <Link
        href="/"
        aria-label="Home"
        className="flex items-center justify-center size-7 shrink-0 rounded-md border border-border font-mono text-[11px] font-semibold text-foreground hover:border-highlight hover:text-highlight transition-colors duration-200"
      >
        Y
      </Link>

      {/* Primary nav — full link set on desktop; mobile uses the fixed BottomTabBar instead */}
      <nav aria-label="Primary" className="hidden md:flex items-center gap-7">
        {links.map((link) => {
          const isActive = isActiveLink(link);
          return (
            <Link
              key={link.label}
              href={link.href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "font-mono text-[11px] uppercase tracking-widest transition-colors duration-200",
                isActive
                  ? "text-highlight"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <ThemeToggle />
    </header>
  );
}
