import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPostMeta, formatDate } from "@/lib/blog";

/** Homepage writing preview — real published posts only; section omits itself if there are none. */
export function RecentWriting() {
  const posts = getAllPostMeta().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="writing" className="space-y-8 scroll-mt-20">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="section-index">[02]</span>
          <span className="label-mono">Writing</span>
        </div>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground transition-colors duration-200"
        >
          All writing
          <ArrowUpRight
            size={12}
            className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group card card-interactive block p-6 hover:-translate-y-0.5 transition-[transform,border-color,background-color] duration-200"
          >
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-highlight">
                {post.category}
              </span>
              <span className="text-border-dim" aria-hidden="true">·</span>
              <time dateTime={post.publishedAt} className="font-mono text-[10px] tracking-wide text-muted-foreground">
                {formatDate(post.publishedAt)}
              </time>
              <span className="text-border-dim" aria-hidden="true">·</span>
              <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
                {post.readingTimeMinutes} min read
              </span>
            </div>
            <h3 className="text-base font-medium text-foreground group-hover:text-highlight transition-colors duration-200">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed mt-1 max-w-xl">
              {post.summary}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
