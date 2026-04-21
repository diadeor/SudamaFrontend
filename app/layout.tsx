import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
