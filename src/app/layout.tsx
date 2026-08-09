import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { BottomTabBar } from "@/components/BottomTabBar";
import { LatestBlogBanner } from "@/components/LatestBlogBanner";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SITE_URL, AUTHOR } from "@/lib/site";
import { getAllPostMeta } from "@/lib/blog";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-heading",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const TITLE = `${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${PORTFOLIO_DATA.profile.name}`,
  },
  description: PORTFOLIO_DATA.profile.headline,
  applicationName: `${PORTFOLIO_DATA.profile.name} — Portfolio`,
  authors: [{ name: AUTHOR.name, url: AUTHOR.url }],
  creator: AUTHOR.name,
  keywords: [
    "AI Engineer",
    "Full-Stack Developer",
    "System Designer",
    "RAG",
    "Retrieval-Augmented Generation",
    "Next.js",
    "PostgreSQL",
    "Distributed Systems",
    PORTFOLIO_DATA.profile.name,
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: PORTFOLIO_DATA.profile.headline,
    url: SITE_URL,
    siteName: PORTFOLIO_DATA.profile.name,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: PORTFOLIO_DATA.profile.headline,
    creator: "@yrjdev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

// Runs before paint: resolve stored/system theme and stamp <html data-theme>
// so the first frame is already in the correct palette (no flash).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [latestPost] = getAllPostMeta();

  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${bricolage.variable} ${jakarta.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:text-background"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main-content" className="pb-16 md:pb-0">
          {children}
        </main>
        <BottomTabBar />
        {latestPost && (
          <LatestBlogBanner slug={latestPost.slug} title={latestPost.title} />
        )}
      </body>
    </html>
  );
}
