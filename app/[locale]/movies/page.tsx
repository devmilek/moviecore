import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import UniversalCard from "@/components/universal-card";
import UniversalFeed from "@/components/universal-feed";
import { fetcher } from "@/lib/fetcher";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { GenreList, Movie, MovieList } from "@/types";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const MoviePage = async () => {
  const locale = await getLocale();
  const genres: GenreList = await fetcher({
    url: "/genre/movie/list",
    options: [],
  });

  const popularMovies: MovieList = await fetcher({
    url: "/movie/popular",
    options: [],
  });

  const topRatedMovies: MovieList = await fetcher({
    url: "/movie/top_rated",
    options: [`region=${locale}`],
  });

  const upcomingMovies: MovieList = await fetcher({
    url: "/movie/upcoming",
    options: [`region=${locale}`],
  });

  return (
    <div className="space-y-12">
      <UniversalFeed heading="Popularne filmy" items={popularMovies.results} />
      <section className="p-6 bg-foreground/5 rounded-xl border">
        <h1 className="text-3xl font-bold mb-6">Kategorie</h1>
        <div className="flex items-center flex-wrap justify-center gap-2">
          {genres.genres.map((genre) => (
            <Button variant="outline" size="lg" key={genre.id} asChild>
              <Link href={`/movies/genre/${genre.id}`}>{genre.name}</Link>
            </Button>
          ))}
        </div>
      </section>
      <UniversalFeed
        heading="Najwyżej oceniane"
        items={topRatedMovies.results}
      />
      <UniversalFeed
        heading="Nadchodzące filmy"
        items={upcomingMovies.results}
      />
    </div>
  );
};

export default MoviePage;
