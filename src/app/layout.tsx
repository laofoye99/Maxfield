import type { Metadata } from "next";

import { ThemeProvider  } from "@/components/providers/ThemeProvider";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import "katex/dist/katex.min.css";
import "./globals.css";





export const metadata: Metadata = {
  title: {
    default:  siteConfig.meta.title,
    template: `%s · ${siteConfig.meta.title}`,
  },
  description:  siteConfig.meta.description,
  metadataBase: new URL(siteConfig.meta.url),
  openGraph: {
    type:        "website",
    siteName:    siteConfig.meta.title,
    description: siteConfig.meta.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        {/*
          Google AdSense — uncomment after approval:
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossOrigin="anonymous" />
        */}
      </head>
      <body
        style={{ background: "var(--bg)" }}
        className={`font-sans antialiased transition-colors`}
      >
        <ThemeProvider>
          <LocaleProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
