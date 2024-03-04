import { MovieDetails, MovieList } from "@/types";
import { fetcher } from "./fetcher";

export const getNowPlaying = async () => {
  const res = await fetcher({
    url: "/movie/now_playing",
    options: [],
  });

  return res;
};

export const getPopularMovies = async () => {
  const res: MovieList = await fetcher({
    url: "/movie/popular",
    options: [],
  });

  return res;
};

export const getTopRatedMovies = async () => {
  const res: MovieList = await fetcher({
    url: "/movie/top_rated",
    options: [],
  });

  return res;
};

export const getUpcomingMovies = async () => {
  const res: MovieList = await fetcher({
    url: "/movie/upcoming",
    options: [],
  });

  return res;
};
