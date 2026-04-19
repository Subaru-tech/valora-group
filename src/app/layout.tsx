import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import FilmGrain from "@/components/FilmGrain";
import GlobalNetworkBg from "@/components/GlobalNetworkBg";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import PageTransition from "@/components/PageTransition";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata: Metadata = {
  title: "Valora Group | Elite Security & Intelligence",
  description: "Advanced digital security for a world under constant threat. Deploy the ultimate intelligence architecture.",
  keywords: ["cybersecurity", "intelligence", "threat detection", "zero-day", "security agency", "digital security", "Valora Group"],
  authors: [{ name: "Valora Operations" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://valoragroup.com",
    title: "Valora Group | Elite Security",
    description: "Advanced digital security. Command the perimeter with zero compromise.",
    siteName: "Valora Group",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Valora Group Dashboard" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Valora Group | Elite Security",
    description: "Command the perimeter with zero compromise. Advanced threat detection.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-accent-base/50 relative`}>
        <FilmGrain />
        <GlobalNetworkBg />
        <Preloader />
        <CustomCursor />
        <ScrollProgressBar />
        <Navbar />
        <PageTransition>
          {children}
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
