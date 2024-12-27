import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./customClasses.css";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QuickRoom",
  description:
    "Create a chatroom in seconds with just a 4-digit code. Share it with your friends and start chatting instantly—no login required.",
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
