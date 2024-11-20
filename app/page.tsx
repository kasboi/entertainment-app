"use client";

import MovieCard from "@/components/MovieCard";
import ShimmerCard from "@/components/ShimmerCard";
import { TypePopularMovie } from "@/types/ApiResponseTypes";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  // Fetch function
  async function fetchPopularMovies({ pageParam }: { pageParam: number }) {
    const res = await fetch(`/api/search?query=${pageParam}`);
    const data: TypePopularMovie = await res.json();
    return data;
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["popular"],
    queryFn: fetchPopularMovies,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.page <= lastPage.total_pages ? lastPage.page + 1 : null,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  // Combine and deduplicate all fetched movies
  const allMovies = data?.pages.flatMap((page) => page.results) || [];
  const uniqueMovies = Array.from(
    new Map(allMovies.map((movie) => [movie.id, movie])).values(),
  );

  // Filter movies based on the search query
  const filteredMovies = uniqueMovies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (status === "pending") {
    return <ShimmerCard />;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Search Form */}
      <form className="relative mb-4 max-w-screen-lg mx-auto">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          className="w-full py-3.5 pl-12 rounded-lg bg-slate-700/70 border-2 border-slate-900"
          placeholder="Filter movie list"
        />
        <MagnifyingGlassIcon className="size-6 absolute top-3.5 left-3" />
      </form>

      <h1 className="text-2xl lg:text-3xl my-4">Popular Movies</h1>

      {/* Movie Cards */}
      <div className="py-4 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-screen-lg mx-auto custom-scrollbar rounded-lg">
        {filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((result) => (
            <MovieCard
              key={result.id}
              id={result.id}
              imgSrc={result.poster_path}
              title={result.title}
              release_date={result.release_date}
              rating={result.vote_average}
            />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-400">
            No movies found
          </p>
        )}
      </div>

      {/* Load More Button — Hide when using the filter to prevent unnecessary data fetching */}
      <div
        className={`${
          searchQuery.length > 0 ? "hidden" : "inline-block"
        } flex justify-center py-4`}
      >
        <button
          className={`bg-slate-600 rounded-md py-3 px-6 block max-w-screen-sm mx-auto transition-all active:scale-90`}
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load more"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
}
