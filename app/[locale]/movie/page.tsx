import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { Link } from "@/lib/navigation";
import { GenreList } from "@/types";
import React from "react";

const MoviePage = async () => {
  const genres: GenreList = await fetcher({
    url: "/genre/movie/list",
    options: [],
  });
  return (
    <div>
      <section>
        <h1>Kategorie</h1>
        <div className="flex items-center flex-wrap justify-center gap-2">
          {genres.genres.map((genre) => (
            <Button variant="outline" size="lg" key={genre.id}>
              <Link href={`/movie/genre/${genre.id}`}>{genre.name}</Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MoviePage;
