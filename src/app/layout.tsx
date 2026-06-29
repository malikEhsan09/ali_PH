import type { Metadata } from "next";
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
    "Lahore",
  ],
  openGraph: {
    title: "ALI Paint & Hardware | Premium Paints & Hardware Solutions",
    description:
      "Authorized Gobis Paints dealer. Premium paints, coatings, and hardware solutions.",
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
      className={`${inter.variable} ${outfit.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=localStorage.getItem('ali-paint-theme');if(s){var d=JSON.parse(s);if(d.state&&d.state.theme==='dark')document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen bg-bg-primary text-text-primary overflow-x-hidden">
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
