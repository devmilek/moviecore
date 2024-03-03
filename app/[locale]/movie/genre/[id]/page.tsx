import MovieCard from "@/components/movie-card";
import { fetcher } from "@/lib/fetcher";
import { DiscoverMovies, GenreList } from "@/types";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import React from "react";

interface MovieGenrePageProps {
  params: {
    id: string;
  };
}

const MovieGenrePage = async ({ params }: MovieGenrePageProps) => {
  const locale = await getLocale();

  const genres: GenreList = await fetcher({
    url: "/genre/movie/list",
    options: [],
  });

  const genre = genres.genres.find((genre) => genre.id === parseInt(params.id));

  if (!genre) {
    return notFound();
  }

  const movies: DiscoverMovies = await fetcher({
    url: "/discover/movie",
    options: [
      `with_genres=${params.id}`,
      "sort_by=popularity.desc",
      "include_adult=false",
      "page=1",
    ],
  });

  return (
    <div>
      <header className="mb-10">
        <h2 className="text-muted-foreground mb-1">Filmy z kategorią</h2>
        <h1 className="text-5xl font-bold">{genre?.name}</h1>
      </header>
      <section className="grid grid-cols-5 gap-4">
        {movies.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </div>
  );
};

export default MovieGenrePage;
