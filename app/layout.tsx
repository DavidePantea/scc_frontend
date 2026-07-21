import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Import the new Header
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8FAFC]">
        {/* The global header sits at the very top */}
        <Header />

        {/* Main page content grows to fill available space */}
        <main className="flex-grow">
          {children}
        </main>
        
        {/* The true footer sits at the bottom */}
        <Footer />
      </body>
    </html>
  );
}