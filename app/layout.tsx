import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";

// latin-ext carries the Romanian diacritics (ă, â, î, ș, ț).
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin", "latin-ext"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "SmartCarCompare",
  description: "Compară costul total de utilizare și descoperă cât de avantajos este să conduci un vehicul nou.",
  verification: {
    google: "P37NoUlD80XBLksPar0dvjFxLT2ZX-vaSwAv8onl3_A",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${bricolage.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas font-sans text-ink">
        <LanguageProvider>
          <AuthProvider>
            <Header />

            <main className="flex-grow">
              {children}
            </main>

            <Footer />
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5647173051825914"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}