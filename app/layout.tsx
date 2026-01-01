import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "@excalidraw/excalidraw/index.css";
import AppLayout from "@/components/layout/AppLayout";

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
      </body>
    </html>
  );
}
