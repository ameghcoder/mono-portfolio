"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

/** `label` renders a caption under the icon on phones, so the toggle reads
 * as one more tab in the mobile tab bar. */
export function ThemeToggle({ label, className }: { label?: string; className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // ignore — private mode / storage disabled
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={cn(
        "inline-flex items-center justify-center size-9 rounded-xl overflow-hidden text-muted-foreground hover:text-foreground hover:bg-card active:scale-90 transition-[color,background-color,transform] duration-200",
        className
      )}
    >
      {/* Render a stable icon until mounted to avoid hydration mismatch;
          after that the icons swap with a small rotate. */}
      <span className="flex h-7 items-center justify-center md:h-auto">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mounted && theme === "dark" ? "sun" : "moon"}
            className="inline-flex"
            initial={{ rotate: -90, scale: 0.6, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.6, opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {mounted && theme === "dark" ? (
              <Sun className="size-[19px] md:size-[15px]" />
            ) : (
              <Moon className="size-[19px] md:size-[15px]" />
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      {label && (
        <span className="md:hidden font-mono text-[9px] uppercase tracking-wider">{label}</span>
      )}
    </button>
  );
}
