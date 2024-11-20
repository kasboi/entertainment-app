import { HomeIcon, BookmarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function Navbar() {
  return (
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
        <span>Favourites</span>
      </Link>
    </nav>
  );
}
