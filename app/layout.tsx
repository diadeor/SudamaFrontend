import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Font Configuration
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sudama Plant Store",
  description: "Curating living sculptures that breathe life into your architectural sanctuary.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${manrope.variable} ${newsreader.variable}`}
    >
      <body
        suppressHydrationWarning={true}
        className="text-on-surface bg-background selection:bg-primary-fixed selection:text-on-primary-fixed font-label antialiased"
      >
        <Navbar />
        <main className="pt-25">{children}</main>
        <Footer />
        {/* Global Support FAB */}
        {/* <button className="fixed bottom-8 right-8 bg-primary text-on-primary w-14 h-14 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40">
          <span className="material-symbols-outlined">contact_support</span>
        </button> */}
      </body>
    </html>
  );
}
