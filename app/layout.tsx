import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import SmoothProviders from "@/components/ui/SmoothProviders";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Najib - Fullstack Developer",
  description:
    "Portfolio of Najib, a Fullstack Developer and Informatics Student from Surakarta, Indonesia.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "var(--background)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <SmoothProviders>{children}</SmoothProviders>
      </body>
    </html>
  );
}
