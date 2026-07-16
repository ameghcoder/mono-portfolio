import Link from "next/link";
import { Layers } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/blog-types";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-background hover:bg-card transition-colors duration-200 p-6"
    >
      <div className="flex items-center gap-3 flex-wrap mb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-highlight">
          {post.category}
        </span>
        <span className="text-border-dim" aria-hidden="true">
          ·
        </span>
        <time
          dateTime={post.publishedAt}
          className="font-mono text-[10px] tracking-wide text-muted-foreground"
        >
          {formatDate(post.publishedAt)}
        </time>
        <span className="text-border-dim" aria-hidden="true">
          ·
        </span>
        <span className="font-mono text-[10px] tracking-wide text-muted-foreground">
          {post.readingTimeMinutes} min read
        </span>
        {post.series && (
          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground border border-border rounded-full px-2 py-0.5">
            <Layers size={10} />
            {post.series}
          </span>
        )}
      </div>

      <h3 className="text-lg font-medium text-foreground leading-snug mb-2 group-hover:text-highlight transition-colors duration-200">
        {post.title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed max-w-xl mb-4">
        {post.summary}
      </p>

      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
