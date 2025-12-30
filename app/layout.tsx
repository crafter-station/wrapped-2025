import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Crafter Station | 2025 Wrapped",
  description: "A year of open source building. Sky is the limit.",
  openGraph: {
    title: "Crafter Station | 2025 Wrapped",
    description: "A year of open source building. Sky is the limit.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crafter Station | 2025 Wrapped",
    description: "A year of open source building. Sky is the limit.",
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
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
