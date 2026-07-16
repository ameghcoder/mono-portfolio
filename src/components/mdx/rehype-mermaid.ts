/**
 * Rehype transform: rewrite fenced ```mermaid code blocks into a custom
 * <mermaid> element carrying the diagram source as a plain string `chart`
 * property (mapped to the Mermaid client component).
 *
 * Why this exists: passing multi-line diagram source through an MDX JSX
 * expression attribute (`chart={`...`}`) does NOT survive serialization to the
 * client component — the value is silently dropped. A plain string property on
 * a rehype-created element serializes fine. It also gives authors the natural
 * ```mermaid fenced-block syntax. Must run BEFORE rehype-pretty-code so the
 * block isn't tokenized as code.
 */

interface HNode {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HNode[];
}

function collectText(node: HNode): string {
  if (node.type === "text") return node.value ?? "";
  return (node.children ?? []).map(collectText).join("");
}

function isMermaidPre(node: HNode): boolean {
  if (node.tagName !== "pre") return false;
  const code = node.children?.find((c) => c.tagName === "code");
  const className = code?.properties?.className;
  const classes = Array.isArray(className) ? className : [];
  return classes.includes("language-mermaid");
}

export function rehypeMermaid() {
  return (tree: HNode): void => {
    const walk = (node: HNode): void => {
      if (!node.children) return;
      node.children.forEach((child, i) => {
        if (isMermaidPre(child)) {
          const code = child.children!.find((c) => c.tagName === "code")!;
          node.children![i] = {
            type: "element",
            tagName: "mermaid",
            properties: { chart: collectText(code).replace(/\n$/, "") },
            children: [],
          };
        } else {
          walk(child);
        }
      });
    };
    walk(tree);
  };
}
