import { MovieDetails, MovieList, ResponseWithPage, Tv } from "@/types";
import { fetcher } from "./fetcher";
import { getLocale } from "next-intl/server";

export const getNowPlaying = async () => {
  const locale = await getLocale();
  const res = await fetcher({
    url: "/movie/now_playing",
    options: [`region=${locale}`],
  });

  return res;
};

export const getPopularMovies = async () => {
  const locale = await getLocale();
  const res: MovieList = await fetcher({
    url: "/movie/popular",
    options: [`region=${locale}`],
  });

  return res;
};

export const getTopRatedMovies = async () => {
  const locale = await getLocale();
  const res: MovieList = await fetcher({
    url: "/movie/top_rated",
    options: [`region=${locale}`],
  });

  return res;
};

export const getUpcomingMovies = async () => {
  const locale = await getLocale();
  const res: MovieList = await fetcher({
    url: "/movie/upcoming",
    options: [`region=${locale}`],
  });

  return res;
};

export const getAiringToday = async (timezone?: string) => {
  const res: ResponseWithPage<Tv> = await fetcher({
    url: "/tv/airing_today",
    options: [`timezone=${timezone}`],
  });

  return res;
};

export const getOnTheAir = async (timezone?: string) => {
  const res = await fetcher({
    url: "/tv/on_the_air",
    options: [`timezone=${timezone}`],
  });

  return res;
};

export const getPopularTv = async () => {
  const res = await fetcher({
    url: "/tv/popular",
    options: [],
  });

  return res;
};

export const getTopRatedTv = async () => {
  const res = await fetcher({
    url: "/tv/top_rated",
    options: [],
  });

  return res;
};
