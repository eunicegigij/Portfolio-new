import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorkspaceIntro } from "@/components/workspace-intro";
import { getSiteUrl, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = site.metaTitle;
const description = site.description;

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: title,
    template: "%s · Eunice Jacob",
  },
  description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  authors: [{ name: site.name, url: site.linkedin }],
};

const introScript = `(function(){try{if(sessionStorage.getItem("ej-intro")==="1"||window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.skipIntro="true";}}catch(e){}})();`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <WorkspaceIntro />
        <SiteHeader />
        <main id="main" data-inert-with-intro>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
