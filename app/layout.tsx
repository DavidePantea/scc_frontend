import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import AdSenseScript from "@/components/AdSenseScript";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Compară costul total de utilizare și descoperă cât de avantajos este să conduci un vehicul nou.",
  openGraph: {
    siteName: SITE_NAME,
    locale: "ro_RO",
    type: "website",
  },
  verification: {
    google: "P37NoUlD80XBLksPar0dvjFxLT2ZX-vaSwAv8onl3_A",
  },
  // AdSense site-ownership verification (shows no ads by itself).
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
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
        <AdSenseScript />
      </body>
    </html>
  );
}