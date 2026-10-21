"use client";

import { motion } from "framer-motion";

/**
 * Fades + lifts its children in once, the first time they scroll into view.
 * `data-reveal` lets the <noscript> rule in layout.tsx force it visible when
 * JS is off, since framer-motion server-renders the hidden initial state.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0, 0, 1] }}
    >
      {children}
    </motion.div>
  );
}
