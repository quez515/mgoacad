import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OfferOS | AI Offer Engineering & Growth Infrastructure",
  description: "AI-powered strategic business infrastructure for offer engineering, pricing optimization, and premium growth systems."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-radial-premium`}>{children}</body>
    </html>
  );
}
