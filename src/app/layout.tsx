// Next Imports
import type { Metadata } from "next";
import { Inter } from "next/font/google";

// CSS Imports
import "./globals.css";

// UI Component Imports
import AppWrapper from "@/components/AppWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Query Docs",
  description: "One stop for all your questions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppWrapper>{children}</AppWrapper>
      </body>
    </html>
  );
}
