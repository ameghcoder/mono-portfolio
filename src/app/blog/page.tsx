import type { Metadata } from "next";
import { getAllPostMeta, getCategoryCounts } from "@/lib/blog";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { Footer } from "@/components/Footer";
import { SITE_URL, personSchema } from "@/lib/site";

const DESCRIPTION =
  "Notes on AI engineering, backend practice, databases, and system design — lessons from building and scaling production systems.";

export const metadata: Metadata = {
  title: "Writing",
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  keywords: [
    "AI engineering blog",
    "RAG",
    "system design",
    "backend engineering",
    "PostgreSQL",
    PORTFOLIO_DATA.profile.name,
  ],
  openGraph: {
    title: `Writing — ${PORTFOLIO_DATA.profile.name}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPostMeta();
  const counts = getCategoryCounts();

  // schema.org Blog with each post as a BlogPosting — helps Google surface the
  // collection and gives LLMs a clean, structured index to cite.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `Writing — ${PORTFOLIO_DATA.profile.name}`,
    description: DESCRIPTION,
    url: `${SITE_URL}/blog`,
    author: personSchema,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.summary,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.publishedAt,
      dateModified: p.updatedAt ?? p.publishedAt,
      keywords: p.tags.join(", "),
      articleSection: p.category,
    })),
  };

  return (
    <div className="wide-container pt-8 pb-16 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="space-y-4">
        <span className="label-mono">Notes &amp; Learnings</span>
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-foreground">
          Writing
        </h1>
        <p className="text-base text-muted-foreground leading-relaxed max-w-xl">
          Field notes from building and scaling production systems — AI
          engineering, backend practice, database internals, and system design,
          written to be the reference I wish I&apos;d had.
        </p>
      </header>

      <BlogIndex posts={posts} counts={counts} />

      <Footer />
    </div>
  );
}
