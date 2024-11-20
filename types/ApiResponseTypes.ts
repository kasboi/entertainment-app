export type TypeMovieDetails = {
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

export type TypeMovieCredits = {
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

export type TypePopularMovie = {
  page: number;
  results: TypeMovieDetails[];
  total_pages: number;
  total_results: number;
};

export type TypeMovieCard = {
  id: number;
  imgSrc: string;
  title: string;
  release_date: string;
  rating: number;
};

export type LocalstorageType = {
  [id: string]: TypeMovieCard;
};
