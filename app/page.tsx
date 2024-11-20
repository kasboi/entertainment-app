"use client";

import MovieCard from "@/components/MovieCard";
import { ApiResponse, PopularMovieResponse } from "@/types/ApiResponse";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Home() {
  async function fetchPopularMovies({ pageParam }: { pageParam: number }) {
    const res = await fetch(`/api/search?query=${pageParam}`);
    const data: PopularMovieResponse = await res.json();

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
    getNextPageParam: (lastPage, pages) =>
      lastPage.page <= lastPage.total_pages ? lastPage.page + 1 : null,
  });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (status === "pending") {
    return <p>Loading...</p>;
  }

  if (status === "error") {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className="">
      <form className="relative">
        <input
          type="text"
          className="w-full py-3.5 pl-12 rounded-lg bg-slate-700/70 border-2 border-slate-900"
          placeholder="Filter movie list"
        />
        <MagnifyingGlassIcon className="size-6 absolute top-3.5 left-3" />
      </form>
      <h1 className="text-3xl my-4">Popular Movies</h1>
      {/* CARD */}
      <div className="py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-screen-lg mx-auto custom-scrollbar rounded-lg">
        {data.pages.map((page) =>
          page.results.map((result) => (
            <MovieCard
              key={result.id}
              id={result.id}
              imgSrc={result.poster_path}
              title={result.title}
              release_date={result.release_date}
              rating={result.vote_average}
            />
          )),
        )}
      </div>
      <button
        className="bg-slate-600 rounded-md py-3 px-6 block max-w-screen-sm mx-auto transition-all active:scale-90"
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
  );
}
