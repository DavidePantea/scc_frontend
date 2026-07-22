import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the new Header
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

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
        {/* The global header sits at the very top */}
        <Header />

        {/* Main page content grows to fill available space */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* The true footer sits at the bottom */}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}