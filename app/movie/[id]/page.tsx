import { Card } from "@/components/ShimmerCard";
import { TypeMovieDetails, TypeMovieCredits } from "@/types/ApiResponseTypes";
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const movie_id = (await params).id;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_TOKEN,
    },
  };

  // FETCH MOVIE DETAILS
  async function fetchMovieDetails() {
    const movieDetails = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
      options,
    );
    const movieData: TypeMovieDetails = await movieDetails.json();
    return movieData;
  }

  // FETCH MOVIE CASTS
  async function fetchCredits() {
    const credits = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`,
      options,
    );
    const creditsData: TypeMovieCredits = await credits.json();
    return creditsData;
  }

  // FETCH MOVIE BACKDROPS
  async function fetchBackdrops() {
    const backdrops = await fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/images`,
      options,
    );
    const backdropData = await backdrops.json();
    return backdropData.backdrops;
  }

  const [movieData, creditsData, backdropData] = await Promise.all([
    fetchMovieDetails(),
    fetchCredits(),
    fetchBackdrops(),
  ]);

  // EXTRACT POSTER IMAGE
  const poster_img = `https://image.tmdb.org/t/p/w780/${movieData.poster_path}`;

  return (
    <div className="max-w-screen-sm md:max-w-screen-xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-6 mx-auto border-2 border-blue-100/40 rounded-md px-4 py-2 md:py-6 md:px-8 lg:py-8">
      <div className="max-w-56 md:max-w-sm lg:max-w-max mx-auto">
        <Image
          src={poster_img}
          alt="poster image"
          width={500}
          height={750}
          priority={true}
          className="rounded-md"
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-6 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl">{movieData.title}</h2>
          <div className="flex items-center gap-4">
            <StarIcon className="size-6 text-yellow-600" />
            <span>{movieData.vote_average.toFixed(2)}</span>
          </div>
        </div>
        <div className="flex gap-1 flex-wrap">
          {movieData.genres.map((item) => {
            if (typeof item !== "number") {
              return (
                <span
                  className="inline-block bg-slate-900 rounded-2xl px-4 py-1 text-sm"
                  key={item.id}
                >
                  {item.name}
                </span>
              );
            }
          })}
        </div>
        <p className="text-sm">{movieData.overview}</p>
        <div>
          <span className="inline-block text-xl uppercase my-2">Cast</span>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 10 }).map((item, index) => {
              const castInfo = creditsData.cast[index];
              if (castInfo) {
                return (
                  <span
                    key={castInfo.id}
                    className="inline-block bg-slate-900 rounded-2xl px-4 py-1 text-sm"
                  >
                    {castInfo.name}
                  </span>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="col-span-2">
        <span className="inline-block text-xl uppercase my-2">Images</span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 10 }).map((item, i) => {
            const image = backdropData[i];
            if (image) {
              return (
                <Image
                  key={image.file_path}
                  src={`https://image.tmdb.org/t/p/w780/${image.file_path}`}
                  alt="backdrop photo"
                  width={image.width}
                  height={image.height}
                  className="rounded-sm"
                />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
}
