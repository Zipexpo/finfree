import { Inter } from "next/font/google";
import React from "react";
import "./globals.scss";
import Header from "@/components/Header";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Finfree",
  description: "Personal Financial Planing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className,'flex min-h-screen w-full flex-col bg-muted/40')}>
        <Header />
        {children}
      </body>
    </html>
  );
}
