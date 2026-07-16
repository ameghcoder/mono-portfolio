"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Copy, ExternalLink, Sparkles } from "lucide-react";

/**
 * "Read with AI" dropdown (right-aligned). Copy-for-LLM ships the full post
 * markdown to the clipboard (works with any model). The provider items deep-link
 * a new chat with a prompt pointing at the canonical URL — ChatGPT and Claude
 * accept a `?q=` prefill; Gemini has no prefill param, so we copy the prompt and
 * open the app for a paste.
 */
export function AskAI({
  title,
  url,
  markdown,
}: {
  title: string;
  url: string;
  markdown: string;
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState<null | "doc" | "gemini">(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const prompt = `Read this article and give me a concise summary of its key ideas, then I'll ask follow-up questions.\n\n"${title}"\n${url}`;
  const fullDoc = `# ${title}\n\nSource: ${url}\n\n${markdown}`;

  const chatgpt = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  const claude = `https://claude.ai/new?q=${encodeURIComponent(prompt)}`;

  async function copy(text: string, which: "doc" | "gemini") {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(which);
      setTimeout(() => setCopied((c) => (c === which ? null : c)), 2000);
    } catch {
      // clipboard unavailable — no-op
    }
  }

  const item =
    "flex items-center justify-between gap-4 w-full px-3 py-2 text-left text-[13px] text-muted-foreground hover:text-foreground hover:bg-card transition-colors duration-150";

  return (
    <div className="flex justify-end">
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-haspopup="menu"
          aria-expanded={open}
          className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground hover:border-highlight transition-colors duration-200"
        >
          <Sparkles size={12} className="text-highlight" />
          Read with AI
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 z-20 mt-2 w-56 overflow-hidden rounded-lg border border-border bg-popover shadow-lg"
          >
            <button
              type="button"
              role="menuitem"
              onClick={() => copy(fullDoc, "doc")}
              className={item}
            >
              <span className="inline-flex items-center gap-2">
                {copied === "doc" ? (
                  <Check size={13} className="text-success" />
                ) : (
                  <Copy size={13} />
                )}
                {copied === "doc" ? "Copied to clipboard" : "Copy for LLM"}
              </span>
            </button>

            <div className="h-px bg-border-dim" />

            <a
              role="menuitem"
              href={chatgpt}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={item}
            >
              Open in ChatGPT
              <ExternalLink size={12} className="opacity-60" />
            </a>
            <a
              role="menuitem"
              href={claude}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className={item}
            >
              Open in Claude
              <ExternalLink size={12} className="opacity-60" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
