import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

import { PORTFOLIO_DATA } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `${PORTFOLIO_DATA.profile.name} | ${PORTFOLIO_DATA.profile.role.split('|')[0].trim()}`,
  description: PORTFOLIO_DATA.profile.bio,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark scroll-smooth ${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}


