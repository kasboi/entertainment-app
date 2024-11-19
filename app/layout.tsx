import type { Metadata } from "next";
import "./globals.css";

import { BookmarkIcon, TvIcon, HomeIcon } from "@heroicons/react/20/solid";
import { FilmIcon } from "@heroicons/react/24/outline";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Entertainment App",
  description: "Entertainment Web App for discovering popular movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="grid grid-cols-10">
        <nav className="p-6 bg-slate-900 col-span-full flex items-center gap-4">
          <HomeIcon className="size-8 mr-auto" />
          <FilmIcon className="size-8" />
          <BookmarkIcon className="size-8" />
          <TvIcon className="size-8" />
        </nav>
        <main className="col-span-full bg-slate-800 px-6 py-4">{children}</main>
      </body>
    </html>
  );
}
