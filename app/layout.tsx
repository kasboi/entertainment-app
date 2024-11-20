"use client";

import "./globals.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className={`${inter.variable}`}>
        <body className="grid grid-cols-10">
          <Navbar />
          <main className="col-span-full bg-slate-800 px-6 py-4 min-h-svh">
            {children}
          </main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
