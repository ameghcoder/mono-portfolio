"use client";

import { useEffect, useState } from "react";

const ROLES = ["AI Engineer", "Full-Stack Dev", "System Designer"];

const TYPING_MS = 75;
const DELETING_MS = 35;
const HOLD_AFTER_TYPED_MS = 1500;
const HOLD_AFTER_DELETED_MS = 350;

export function TypewriterRole({ className }: { className?: string }) {
  const [text, setText] = useState(ROLES[0]);
  const [roleIndex, setRoleIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting" | "switching">("holding");
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const current = ROLES[roleIndex];

    if (phase === "holding") {
      const t = setTimeout(() => setPhase("deleting"), HOLD_AFTER_TYPED_MS);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (text === "") {
        setPhase("switching");
        return;
      }
      const t = setTimeout(() => setText((s) => s.slice(0, -1)), DELETING_MS);
      return () => clearTimeout(t);
    }

    if (phase === "switching") {
      const t = setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setPhase("typing");
      }, HOLD_AFTER_DELETED_MS);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (text === current) {
        setPhase("holding");
        return;
      }
      const t = setTimeout(() => setText(current.slice(0, text.length + 1)), TYPING_MS);
      return () => clearTimeout(t);
    }
  }, [text, phase, roleIndex, reduceMotion]);

  const longest = ROLES.reduce((a, b) => (a.length > b.length ? a : b));

  return (
    <span className={className}>
      <span className="sr-only">Roles I work as: {ROLES.join(", ")}.</span>
      <span aria-hidden="true" className="inline-flex items-baseline">
        <span style={{ minWidth: `${longest.length}ch` }} className="inline-block">
          {text}
          <span className="inline-block w-[1px] h-[0.9em] bg-current ml-0.5 align-middle animate-pulse" />
        </span>
      </span>
    </span>
  );
}
