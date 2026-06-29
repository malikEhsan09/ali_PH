import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Outfit } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/components/common/ThemeProvider";
import GrainOverlay from "@/components/common/GrainOverlay";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "ALI Paint & Hardware | Premium Paints & Hardware Solutions",
  description:
    "ALI Paint & Hardware — Authorized Gobis Paints dealer. Premium paints, coatings, and hardware solutions for residential, commercial, and industrial projects in Pakistan.",
  keywords: [
    "paint",
    "hardware",
    "Gobis Paints",
    "ALI Paint",
    "interior paint",
    "exterior paint",
    "Pakistan",
    "Islamabad",
  ],
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "ALI Paint & Hardware | Premium Paints & Hardware Solutions",
    description:
      "Authorized Gobis Paints dealer. Premium paints, coatings, and hardware solutions.",
    type: "website",
    images: [{ url: "/logo.svg", width: 64, height: 64, alt: "Ali Paint & Hardware" }],
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
      className={`${inter.variable} ${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var s=localStorage.getItem('ali-paint-theme');if(s){var d=JSON.parse(s);if(d.state&&d.state.theme==='dark')document.documentElement.classList.add('dark');}}catch(e){}})();`}
        </Script>
        <ThemeProvider>
          <GrainOverlay />
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
