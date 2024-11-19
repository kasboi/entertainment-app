import MovieCard from "@/components/MovieCard";
import { ApiResponse } from "@/types/ApiResponse";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default async function Home() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_TOKEN,
    },
  };

  const res = await fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options,
  );
  const data: { results: ApiResponse[] } = await res.json();

  return (
    <div className="">
      <form className="relative">
        <input
          type="text"
          className="w-full py-3.5 pl-12 rounded-lg bg-slate-800"
          placeholder="Filter"
        />
        <MagnifyingGlassIcon className="size-6 absolute top-3.5 left-3" />
      </form>
      <h1 className="text-3xl my-4">Popular Movies</h1>
      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 custom-scrollbar rounded-lg">
        {data.results.map((result) => (
          <MovieCard
            key={result.id}
            id={result.id}
            imgSrc={result.poster_path}
            title={result.title}
            release_date={result.release_date}
            rating={result.vote_average}
          />
        ))}
      </div>
    </div>
  );
}
