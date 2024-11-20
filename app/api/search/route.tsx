import { TypePopularMovie } from "@/types/ApiResponseTypes";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageParam = searchParams.get("query");
  // pageParam is "hello" for /api/search?query=hello

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + process.env.TMDB_TOKEN,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageParam}`,
    options,
  );
  const data: TypePopularMovie = await res.json();

  return Response.json(data);
}
