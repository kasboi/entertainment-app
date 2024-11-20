import Image from "next/image";

import { ClockIcon, StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkedIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { MovieCardType, LocalstorageType } from "@/types/ApiResponse";

export default function MovieCard({
  id,
  imgSrc,
  title,
  release_date,
  rating,
}: MovieCardType) {
  const URL = `https://image.tmdb.org/t/p/w780/${imgSrc}`;

  const [toggled, setToggled] = useState<Boolean>(false);

  useEffect(() => {
    let bookmarked = localStorage.getItem("bookmarked_movies");
    if (bookmarked) {
      const parsed_bookmark: LocalstorageType = JSON.parse(bookmarked);
      if (parsed_bookmark[id]) {
        setToggled(true);
      }
    }
  }, []);

  const handleToggle = () => {
    const newToggle = !toggled;
    setToggled(newToggle);

    if (newToggle) {
      const movieDetails = {
        id,
        imgSrc,
        title,
        release_date,
        rating,
      };

      const container: Record<number, MovieCardType> = {};
      container[id] = movieDetails;

      // Bookmarked movies
      let bookmark = localStorage.getItem("bookmarked_movies");
      if (bookmark) {
        const parsed_bookmark: LocalstorageType = JSON.parse(bookmark);
        const newBookmark = { ...parsed_bookmark, ...container };
        localStorage.setItem("bookmarked_movies", JSON.stringify(newBookmark));
      } else {
        localStorage.setItem("bookmarked_movies", JSON.stringify(container));
      }
    } else {
      console.log("To be deleted");

      // Bookmarked movies
      let bookmark = localStorage.getItem("bookmarked_movies");
      if (bookmark) {
        const parsed_bookmark: LocalstorageType = JSON.parse(bookmark);
        delete parsed_bookmark[id];
        localStorage.setItem(
          "bookmarked_movies",
          JSON.stringify(parsed_bookmark),
        );
      }
    }
  };

  return (
    <div className="rounded-lg relative overflow-hidden lg:transition-all lg:duration-300 lg:hover:scale-110">
      <Image
        src={URL}
        alt="poster image"
        width={750}
        height={1125}
        className="w-full"
      />
      <Link href={`/movie/${id}`}>
        <div className="flex justify-between items-center px-4 py-6 bg-black/45 absolute bottom-0 w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg sm:text-xl font-medium">{title}</h2>
            <div className="flex items-center gap-2 text-lg font-light">
              <ClockIcon className="size-4 sm:size-6" />
              <span className="font-medium text-sm sm:text-base">
                {release_date}
              </span>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <StarIcon className="size-6 text-yellow-500" />
            <span className="text-lg sm:text-xl font-medium">
              {rating.toFixed(2)}
            </span>
          </div>
        </div>
      </Link>
      <button
        className="absolute right-4 top-4 bg-black/50 w-10 h-10 rounded-full flex justify-center items-center"
        onClick={handleToggle}
      >
        {toggled ? (
          <BookmarkedIcon className="size-6" />
        ) : (
          <BookmarkIcon className="size-6" />
        )}
      </button>
    </div>
  );
}
