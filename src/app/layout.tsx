import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SITE_URL, AUTHOR } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
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

// Runs before paint: resolve stored/system theme and stamp <html data-theme>
// so the first frame is already in the correct palette (no flash).
const themeScript = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="antialiased min-h-screen">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
