"use client";

import { MotionConfig } from "framer-motion";

/** Site-wide motion defaults. `reducedMotion="user"` turns transform
 * animations off when the OS asks for reduced motion (opacity still fades). */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.3, ease: [0.2, 0, 0, 1] }}>
      {children}
    </MotionConfig>
  );
}
