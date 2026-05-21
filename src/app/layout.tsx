import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { PORTFOLIO_DATA } from "@/data/portfolio";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const TITLE = `${PORTFOLIO_DATA.profile.name} — ${PORTFOLIO_DATA.profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: PORTFOLIO_DATA.profile.headline,
  openGraph: {
    title: TITLE,
    description: PORTFOLIO_DATA.profile.headline,
    url: SITE_URL,
    siteName: PORTFOLIO_DATA.profile.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: PORTFOLIO_DATA.profile.headline,
    creator: "@yrjdev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="antialiased min-h-screen">
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
