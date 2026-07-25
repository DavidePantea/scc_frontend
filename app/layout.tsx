import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the new Header
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import { AuthProvider } from "@/lib/auth-context";
import { LanguageProvider } from "@/lib/language-context";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
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
      className={`${montserrat.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC] font-sans">
        <LanguageProvider>
          <AuthProvider>
            {/* The global header sits at the very top */}
            <Header />

            {/* Main page content grows to fill available space */}
            <main className="flex-grow">
              {children}
            </main>

            {/* The true footer sits at the bottom */}
            <Footer />
          </AuthProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}