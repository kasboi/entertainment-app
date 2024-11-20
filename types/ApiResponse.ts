export type ApiResponse = {
  adult: boolean;
  backdrop_path: string;
  genres: number[] | { id: number; name: string }[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type PopularMovieResponse = {
  page: number;
  results: ApiResponse[];
  total_pages: number;
  total_results: number;
};

export type MovieCardType = {
  id: number;
  imgSrc: string;
  title: string;
  release_date: string;
  rating: number;
};

export type LocalstorageType = {
  [id: string]: MovieCardType;
};
