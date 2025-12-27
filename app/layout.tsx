import type { Metadata } from "next";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";

export const metadata: Metadata = {
  title: "Cortex | Master Engineering Thinking",
  description: "AI-powered training platform for engineers to develop critical thinking, system design, and architectural skills.",
  keywords: ["engineering", "system design", "critical thinking", "architecture", "training", "AI"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AppLayout>
          {children}
        </AppLayout>
      </body>
    </html>
  );
}
