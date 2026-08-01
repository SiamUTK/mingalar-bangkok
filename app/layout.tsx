import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { PageTransitionProvider } from "@/components/ui/page-transition-provider";
import { Toaster } from "@/components/ui/sonner";
import { StickyAiWidget } from "@/components/ai/sticky-ai-widget"; // ⭐ Import Sticky AI Widget

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mingalarbangkok.com"),

  title: {
    default: "Mingalar Bangkok",
    template: "%s | Mingalar Bangkok",
  },

  description:
    "AI-powered platform for the Myanmar community in Thailand. Discover businesses, jobs, housing, travel services, events and AI assistance.",

  keywords: [
    "Myanmar Thailand",
    "Myanmar Community",
    "Bangkok",
    "Jobs",
    "Housing",
    "Business Directory",
    "Travel",
    "AI",
  ],

  openGraph: {
    title: "Mingalar Bangkok",
    description: "AI-powered platform for the Myanmar community in Thailand.",
    url: "https://mingalarbangkok.com",
    siteName: "Mingalar Bangkok",
    locale: "en_US",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  twitter: {
    card: "summary_large_image",
    title: "Mingalar Bangkok",
    description: "AI-powered platform for the Myanmar community in Thailand.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PageTransitionProvider>{children}</PageTransitionProvider>

          {/* ⭐ Universal Sticky Floating AI Chat Widget */}
          <StickyAiWidget />

          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
