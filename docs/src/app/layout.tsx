import type { Metadata } from "next";
import { Spline_Sans_Mono, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const displayFont = Spline_Sans_Mono({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

const bodyFont = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Secure Input Documentation",
  description: "WASM-powered input obfuscation library for preventing client-side scraping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`min-h-screen bg-background font-body antialiased ${bodyFont.variable} ${displayFont.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
