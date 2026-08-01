import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SoundManager from "@/components/SoundManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "SecondLife | AI-Powered Circular Economy Platform",
  description: "Nothing valuable should become waste. Scan items with AI to repair, donate, recycle, upcycle or resell. Support communities and track environmental carbon impact.",
  keywords: "circular economy, AI recycling, waste reduction, carbon savings, upcycling, donate electronics, repair electronics, sustainable platform",
  openGraph: {
    title: "SecondLife | AI-Powered Circular Economy Platform",
    description: "Nothing valuable should become waste. Repair, donate, recycle or resell items with AI scanning.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased dark`}
      style={{ colorScheme: "dark" }}
    >
      <body className="min-h-full flex flex-col bg-bg-dark text-text-white selection:bg-accent-cyan/30 selection:text-white">
        {/* Noise overlay */}
        <div className="noise-overlay" />
        
        {/* Custom cursor overlay */}
        <CustomCursor />
        
        {/* Sound manager global handler & mute toggle */}
        <SoundManager />
        
        {children}
      </body>
    </html>
  );
}
