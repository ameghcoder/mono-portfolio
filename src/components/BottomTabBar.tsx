"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Briefcase, Home, Mail, Newspaper, User } from "lucide-react";

interface TabLink {
  label: string;
  href: string;
  icon: typeof Home;
  match: (pathname: string) => boolean;
}

const tabs: TabLink[] = [
  { label: "Home", href: "/", icon: Home, match: (p) => p === "/" },
  { label: "Work", href: "/#systems", icon: Briefcase, match: () => false },
  { label: "Blog", href: "/blog", icon: Newspaper, match: (p) => p.startsWith("/blog") },
  { label: "About", href: "/about", icon: User, match: (p) => p.startsWith("/about") },
  { label: "Contact", href: "/#contact", icon: Mail, match: () => false },
];

/**
 * Fixed bottom tab bar — mobile only (`md:hidden`). Replaces the old
 * hamburger dropdown with the thumb-reachable app pattern. The top header's
 * full link set (incl. OSS/Building anchors) stays desktop-only; this
 * surfaces the five primary destinations.
 */
export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary (mobile)"
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border-dim pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-5">
        {tabs.map(({ label, href, icon: Icon, match }) => {
          const isActive = match(pathname);
          return (
            <Link
              key={label}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={[
                "flex flex-col items-center justify-center gap-1 py-2.5 touch-manipulation transition-colors duration-200",
                isActive
                  ? "text-highlight"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <Icon size={18} strokeWidth={isActive ? 2.25 : 1.75} aria-hidden="true" />
              <span className="font-mono text-[9px] uppercase tracking-wider">
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
