"use client";

import type { Metadata } from "next";
import "./globals.css";

import { BookmarkIcon, HomeIcon } from "@heroicons/react/20/solid";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// export const metadata: Metadata = {
//   title: "Entertainment App",
//   description: "Entertainment Web App for discovering popular movies",
// };

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
          <nav className="p-6 bg-slate-900 col-span-full flex items-center gap-4">
            <Link
              href={"/"}
              className="mr-auto flex gap-2 items-end transition-all active:scale-90"
            >
              <HomeIcon className="size-8" />
              <span>Homepage</span>
            </Link>
            <Link
              href={"/bookmarks"}
              className="flex gap-2 items-end transition-all active:scale-90"
            >
              <BookmarkIcon className="size-8" />
              <span>Bookmarks</span>
            </Link>
          </nav>
          <main className="col-span-full bg-slate-800 px-6 py-4">
            {children}
          </main>
        </body>
      </html>
    </QueryClientProvider>
  );
}
