import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google"
import "./globals.css";

import { cn } from "@/lib/utils"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Marathon 15.0 - Pathfinder",
  description: "Generated for Pathfinder",
};

export const dynamic = "force-dynamic"
export const revalidate = 0 
export const fetchCache = "only-no-store"
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >{children}</body>
    </html>
  );
}
