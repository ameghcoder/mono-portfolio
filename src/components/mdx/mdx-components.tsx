import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { ArchitectureViewer } from "@/components/ArchitectureViewer";
import { BlogImage } from "@/components/blog/BlogImage";

type CalloutKind = "note" | "tip" | "warn";

const calloutStyles: Record<CalloutKind, string> = {
  note: "border-info/60 bg-info/5",
  tip: "border-success/60 bg-success/5",
  warn: "border-warning/60 bg-warning/5",
};

const calloutLabel: Record<CalloutKind, string> = {
  note: "Note",
  tip: "Tip",
  warn: "Careful",
};

/** Author-facing callout: <Callout kind="warn">…</Callout> */
function Callout({
  kind = "note",
  children,
}: {
  kind?: CalloutKind;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={`not-prose my-6 border-l-2 ${calloutStyles[kind]} rounded-r-md px-4 py-3`}
    >
      <p className="label-mono mb-1">{calloutLabel[kind]}</p>
      <div className="text-sm text-foreground/90 leading-relaxed [&>p]:m-0">
        {children}
      </div>
    </aside>
  );
}

/**
 * Diagram host. Authors use a fenced ```mermaid block (rewritten by
 * rehype-mermaid into a <mermaid chart="…"> element); a single-line
 * <Mermaid chart="graph TD; A-->B" /> also works. Multi-line template-literal
 * props do NOT survive MDX serialization — always use a fenced block instead.
 *
 * Rendered through ArchitectureViewer so every diagram gets an inline render
 * plus a click-to-zoom / pan lightbox for a close look.
 */
function Mermaid({ chart }: { chart?: string }) {
  if (!chart) return null;
  return (
    <div className="not-prose my-8">
      <ArchitectureViewer
        source={chart}
        title="Diagram"
        caption={
          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
            Click to zoom · drag to pan
          </span>
        }
      />
    </div>
  );
}

/** Smart anchor: internal links use next/link, external open in a new tab. */
function Anchor({ href = "", ...props }: React.ComponentProps<"a">) {
  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props} />
    );
  }
  return <Link href={href} {...props} />;
}

export const mdxComponents: MDXComponents = {
  a: Anchor,
  img: BlogImage as MDXComponents["img"],
  Callout,
  Mermaid,
  // Lowercase element emitted by rehype-mermaid for fenced ```mermaid blocks.
  mermaid: Mermaid as MDXComponents["a"],
};
