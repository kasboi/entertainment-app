"use client";
import MovieCard from "@/components/MovieCard";
import { LocalstorageType, TypeMovieCard } from "@/types/ApiResponseTypes";
import { useEffect, useState } from "react";

export default function Page() {
  const [movies, setMovies] = useState<TypeMovieCard[]>();
  const [trigger, setTrigger] = useState(0);
  useEffect(() => {
    const bookmarked = localStorage.getItem("bookmarked_movies");
    if (bookmarked) {
      const parsed_bookmark: LocalstorageType = JSON.parse(bookmarked);
      const movies_details = Object.keys(parsed_bookmark).map(
        (key) => parsed_bookmark[key],
      );
      setMovies(movies_details);
      console.log(movies_details);
    }
  }, [trigger]);

  // Render when the localStorage property is null or empty
  if (!movies || !movies.length) {
    return (
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-3xl text-yellow-400">
          Nothing to see here for now
        </h2>
        <p>Click the bookmark icon to add movies to your favourites.</p>
      </div>
    );
  }

  return (
    <div className="py-4 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-screen-lg mx-auto custom-scrollbar rounded-lg">
      {movies.map((movie) => (
        <div onClick={() => setTrigger(trigger + 1)} key={movie.id}>
          <MovieCard
            id={movie.id}
            imgSrc={movie.imgSrc}
            title={movie.title}
            release_date={movie.release_date}
            rating={movie.rating}
          />
        </div>
      ))}
    </div>
  );
}
