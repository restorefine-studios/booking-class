import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QueryProvider } from "@/providers/query-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masala Moves - Bollywood Dance Classes in Glasgow",
  description: "Join Luna Shree for authentic Bollywood fusion dance classes in Glasgow. Experience the joy of movement, rhythm, and culture through dance.",
  keywords: "bollywood dance, glasgow, dance classes, luna shree, masala moves, fusion dance",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryProvider>
          <Header />
          <main className="pt-16">{children}</main>
          <Footer />
        </QueryProvider>
      </body>
    </html>
  );
}

// test
