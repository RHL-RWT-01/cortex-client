import AppLayout from "@/components/layout/AppLayout";
import "@excalidraw/excalidraw/index.css";
import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif"
});

export const metadata: Metadata = {
  title: "Cortex | Master Engineering Thinking",
  description: "AI-powered training platform for engineers to develop critical thinking, system design, and architectural skills.",
  keywords: ["engineering", "system design", "critical thinking", "architecture", "training", "AI"],
};

import { Toaster } from "sonner";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${instrumentSerif.variable} antialiased`}>
        <AppLayout>
          {children}
        </AppLayout>
        <Toaster position="bottom-right" theme="dark" closeButton richColors />
        <Script
          src="https://api.usecrow.org/static/crow-widget.js"
          data-api-url="https://api.usecrow.org"
          data-product-id={process.env.NEXT_PUBLIC_CROW_PRODUCT_ID}
          data-agent-name="Cortex Support"
        />
        <Analytics />
      </body>
    </html>
  );
}
