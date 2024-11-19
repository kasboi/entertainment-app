import Image from "next/image";

import { ClockIcon, StarIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

type propType = {
  id: number;
  imgSrc: string;
  title: string;
  release_date: string;
  rating: number;
};

export default async function MovieCard({
  id,
  imgSrc,
  title,
  release_date,
  rating,
}: propType) {
  const URL = `https://image.tmdb.org/t/p/w780/${imgSrc}`;

  return (
    <Link href={`/movie/${id}`}>
      <div className="rounded-lg relative overflow-hidden">
        <Image
          src={URL}
          alt="poster image"
          width={750}
          height={1125}
          className="w-full"
        />
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
      </div>
    </Link>
  );
}
