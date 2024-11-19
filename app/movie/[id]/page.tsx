import { ApiResponse } from "@/types/ApiResponse";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const movie_id = (await params).id;

  type TypeCredits = {
    id: number;
    cast: {
      adult: boolean;
      gender: number;
      id: number;
      known_for_department: string;
      name: string;
      original_name: string;
      popularity: number;
      profile_path: string;
      cast_id: number;
      character: string;
      credit_id: string;
      order: number;
    }[];
  };

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_TOKEN,
    },
  };

  const movieDetails = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
    options,
  );
  const movieData: ApiResponse = await movieDetails.json();

  const credits = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/credits?language=en-US`,
    options,
  );
  const creditsData: TypeCredits = await credits.json();

  const poster_img = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;

  return (
    <div className="max-w-screen-sm md:max-w-screen-md md:grid md:grid-flow-col md:gap-4 md:items-center mx-auto border-2 border-blue-100/40 rounded-md px-4 py-2">
      <div className="max-w-56 mx-auto">
        <Image
          src={poster_img}
          alt="poster image"
          width={500}
          height={750}
          priority={true}
        />
      </div>
      <div className="flex flex-col gap-4 md:gap-6 py-4">
        <h2 className="text-3xl">{movieData.title}</h2>
        <div className="flex gap-1">
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
          <span className="inline-block uppercase mb-2">Cast</span>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((item, index) => (
              <span
                key={creditsData.cast[index].id}
                className="inline-block bg-slate-900 rounded-2xl px-4 py-1 text-sm"
              >
                {creditsData.cast[index].name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
