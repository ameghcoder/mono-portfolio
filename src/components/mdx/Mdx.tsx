import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePretty, { type Options as PrettyOptions } from "rehype-pretty-code";
import { mdxComponents } from "./mdx-components";
import { rehypeMermaid } from "./rehype-mermaid";

// Dual-theme highlighting. `keepBackground: false` lets our own tokens own the
// code-block surface; token colours swap on `html[data-theme]` (see prose CSS).
const prettyOptions: PrettyOptions = {
  theme: { dark: "github-dark-dimmed", light: "github-light" },
  keepBackground: false,
};

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          // rehypeMermaid must precede rehypePretty so mermaid blocks are
          // pulled out before the highlighter tokenizes them.
          rehypePlugins: [
            rehypeSlug,
            rehypeMermaid,
            [rehypePretty, prettyOptions],
          ],
        },
      }}
    />
  );
}
