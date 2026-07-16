/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Clock, Layers } from "lucide-react";
import {
  getAllPosts,
  getPostBySlug,
  getSeriesNav,
  formatDate,
} from "@/lib/blog";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SITE_URL, AUTHOR, personSchema } from "@/lib/site";
import { Mdx } from "@/components/mdx/Mdx";
import { Toc } from "@/components/blog/Toc";
import { AskAI } from "@/components/blog/AskAI";
import { Footer } from "@/components/Footer";
import Image from "next/image";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    keywords: [...post.tags, post.category, PORTFOLIO_DATA.profile.name],
    authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.summary,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [AUTHOR.name],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      creator: "@yrjdev",
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const series = getSeriesNav(post);
  const url = `${SITE_URL}/blog/${post.slug}`;
  const coverImageUrl = post.coverImage ? `${SITE_URL}${post.coverImage?.startsWith("/") ? post.coverImage : `/${post.coverImage}`}` : null;


  // schema.org BlogPosting — the primary structured-data signal for Google rich
  // results and for LLMs deciding how to attribute/cite this post.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: personSchema,
    publisher: personSchema,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    ...(coverImageUrl && {
      image: {
        "@type": "ImageObject",
        "url": coverImageUrl,
        "caption": post.coverImageCaption ?? `An cover image of ${post.title}`,
        "representativeOfPage": true,
        "width": {
          "@type": "QuantitativeValue",
          "value": post.coverImageW && 1200
        },
        "height": {
          "@type": "QuantitativeValue",
          "value": post.coverImageH && 630
        }
      }
    }),
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  return (
    <div className="wide-container pt-8 pb-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/blog"
        className="group inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <ArrowLeft
          size={12}
          className="transition-transform duration-200 group-hover:-translate-x-1"
        />
        All writing
      </Link>

      {/* Header */}
      <header className="mt-8 space-y-5">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-highlight">
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
          <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-muted-foreground">
            <Clock size={11} />
            {post.readingTimeMinutes} min read
          </span>
        </div>

        <h1 className="text-3xl md:text-[2.6rem] font-medium tracking-tight text-foreground leading-[1.1]">
          {post.title}
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {post.summary}
        </p>

        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {post.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="pt-3">
          <AskAI title={post.title} url={url} markdown={post.content} />
        </div>
      </header>

      {
        coverImageUrl &&
        <div className="w-full my-4">
          <img src={coverImageUrl} alt={post.coverImageCaption ?? `An cover image of ${post.title}`} />
        </div>
      }

      {/* Series banner */}
      {series && (
        <div className="mt-8 max-w-180 border border-border rounded-lg bg-card p-5">
          <div className="flex items-center gap-2 label-mono mb-3">
            <Layers size={12} />
            {series.name} · Part {series.index} of {series.total}
          </div>
          <ol className="space-y-1.5">
            {series.siblings.map((s, i) => {
              const isCurrent = s.slug === post.slug;
              return (
                <li key={s.slug} className="flex items-baseline gap-2 text-sm">
                  <span className="font-mono text-[11px] text-muted-foreground shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {isCurrent ? (
                    <span className="text-foreground">{s.title}</span>
                  ) : (
                    <Link
                      href={`/blog/${s.slug}`}
                      className="text-muted-foreground hover:text-highlight transition-colors duration-200"
                    >
                      {s.title}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      )}

      <div className="mt-10 divider" />

      {/* Article + TOC */}
      <div className="mt-10 grid lg:grid-cols-[minmax(0,720px)_200px] gap-12 items-start">
        <article className="prose min-w-0">
          <Mdx source={post.content} />
        </article>

        <aside className="hidden lg:block sticky top-20">
          <Toc entries={post.toc} />
        </aside>
      </div>

      {/* Series prev/next */}
      {series && (series.prev || series.next) && (
        <div className="mt-14 max-w-[720px] grid sm:grid-cols-2 gap-3">
          {series.prev ? (
            <Link
              href={`/blog/${series.prev.slug}`}
              className="group border border-border rounded-lg p-4 hover:border-highlight transition-colors duration-200"
            >
              <span className="label-mono flex items-center gap-1.5">
                <ArrowLeft size={11} /> Previous
              </span>
              <span className="block mt-2 text-sm text-foreground group-hover:text-highlight transition-colors">
                {series.prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {series.next && (
            <Link
              href={`/blog/${series.next.slug}`}
              className="group border border-border rounded-lg p-4 hover:border-highlight transition-colors duration-200 sm:text-right"
            >
              <span className="label-mono flex items-center gap-1.5 sm:justify-end">
                Next <ArrowRight size={11} />
              </span>
              <span className="block mt-2 text-sm text-foreground group-hover:text-highlight transition-colors">
                {series.next.title}
              </span>
            </Link>
          )}
        </div>
      )}

      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
}
