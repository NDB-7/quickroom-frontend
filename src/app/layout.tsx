import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Full-Stack Web App",
  description: "Forked from Nathan's Full-Stack Template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}