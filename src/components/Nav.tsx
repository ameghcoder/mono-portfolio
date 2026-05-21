"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  sectionId?: string;
  hideOnMobile?: boolean;
}

const links: NavLink[] = [
  { label: "Work", href: "/#systems", sectionId: "systems", hideOnMobile: true },
  { label: "OSS", href: "/#open-source", sectionId: "open-source", hideOnMobile: true },
  { label: "Building", href: "/#currently-building", sectionId: "currently-building", hideOnMobile: true },
  { label: "Skills", href: "/#skills", sectionId: "skills", hideOnMobile: true },
  { label: "Experience", href: "/#experience", sectionId: "experience", hideOnMobile: true },
  { label: "Retainer", href: "/retainer" },
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

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-sm">
      <div className="max-container flex items-center justify-center h-11">
        <nav className="flex items-center gap-5 md:gap-7">
          {links.map(({ label, href, sectionId, hideOnMobile }) => {
            const isPageActive = href === "/retainer" && pathname === "/retainer";
            const isSectionActive =
              sectionId !== undefined &&
              activeSection === sectionId &&
              pathname === "/";
            const isActive = isPageActive || isSectionActive;

            return (
              <Link
                key={label}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "font-mono text-[11px] uppercase tracking-widest transition-colors duration-200",
                  hideOnMobile ? "hidden md:inline" : "",
                  isActive
                    ? "text-highlight"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
