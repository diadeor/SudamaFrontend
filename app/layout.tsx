import type { Metadata } from "next";
import { Manrope, Newsreader, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { validateUser } from "@/components/functions/request";
import AuthProvider from "@/components/providers/AuthContext";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await validateUser();
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={cn(manrope.variable, newsreader.variable, "font-sans", geist.variable)}
    >
      <body
        suppressHydrationWarning={true}
        className="bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed font-label antialiased"
      >
        <AuthProvider userData={user}>{children}</AuthProvider>
      </body>
    </html>
  );
}
