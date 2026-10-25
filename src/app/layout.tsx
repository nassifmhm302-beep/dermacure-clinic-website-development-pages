import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Alexandria, Marcellus } from "next/font/google";
import { siteConfig } from "@/data/siteConfig";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import "./globals.css";

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-alexandria",
  display: "swap",
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.nameAr} | ${siteConfig.nameEn} — عيادات الجلدية والتجميل`,
    template: `%s | ${siteConfig.nameAr} — DermaCure`,
  },
  description: siteConfig.description,
  keywords: [
    "ديرماكيور",
    "DermaCure",
    "عيادة جلدية",
    "تجميل",
    "ليزر",
    "ابها",
    "السعودية",
  ],
  openGraph: {
    type: "website",
    locale: "ar_SA",
    siteName: siteConfig.name,
    title: `${siteConfig.nameAr} | DermaCure`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.nameAr} | DermaCure`,
    description: siteConfig.description,
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "." },
};

export const viewport: Viewport = {
  themeColor: "#F7F5EF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${alexandria.variable} ${marcellus.variable}`}>
      <body className="min-h-screen bg-cream text-ink antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:right-4 focus:top-4 focus:rounded-full focus:bg-ink focus:px-6 focus:py-3 focus:text-white"
        >
          تخطَّ إلى المحتوى الرئيسي
        </a>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
