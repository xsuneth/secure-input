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
  metadataBase: new URL("https://secure-input.vercel.app"),
  title: {
    default: "Secure Input | Prevent Client-Side Scraping",
    template: "%s | Secure Input",
  },
  description: "WASM-powered input obfuscation library for React and Vanilla JS. Stop browser extensions like Honey from scraping and leaking your e-commerce discount codes.",
  keywords: ["coupon code protection", "block honey extension", "prevent promo code scraping", "secure checkout input", "react secure input", "wasm encryption", "web worker obfuscation", "e-commerce security"],
  authors: [{ name: "Suneth Chathuranga", url: "https://github.com/xSuneth" }],
  creator: "Suneth Chathuranga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://secure-input.vercel.app",
    title: "Secure Input | Protect Checkout & Block Coupon Scraping",
    description: "Stop browser extensions like Honey from scraping and leaking your e-commerce discount codes.",
    siteName: "Secure Input Documentation",
  },
  twitter: {
    card: "summary_large_image",
    title: "Secure Input | Protect Checkout & Block Coupon Scraping",
    description: "Stop browser extensions like Honey from scraping and leaking your e-commerce discount codes.",
  },
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
