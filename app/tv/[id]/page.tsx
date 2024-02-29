import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetcher } from "@/lib/fetcher";
import { getPoster } from "@/lib/utils";
import { TvDetails } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import SeasonSection from "./_components/seasons-section";

const TvPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const tv: TvDetails = await fetcher({
    url: `/tv/${params.id}`,
    lang: "pl",
    options: [],
  });

  if (!tv) {
    return notFound();
  }
  return (
    <div className="flex space-x-8">
      <section className="w-96 space-y-5">
        <Image
          src={getPoster(tv.poster_path, "w780")}
          alt={tv.name}
          width={300}
          height={450}
          className="rounded-xl w-full"
        />
        {/* <section className="space-y-4">
          <h2 className="text-xl font-bold">Dostępne platformy</h2>
          {movie["watch/providers"].results.PL?.flatrate?.map((provider) => (
            <Link
              href={movie["watch/providers"].results.PL.link}
              target="_blank"
              rel="noreferrer"
              key={provider.provider_id}
              className="flex space-x-4 p-2 rounded-xl bg-white/5"
            >
              <Image
                src={getPoster(provider.logo_path, "original")}
                alt={provider.provider_name}
                width={50}
                height={50}
                className="rounded-xl"
              />
              <div className="flex flex-col justify-center">
                <p className="text-sm text-muted-foreground">Oglądaj teraz</p>
                <h3 className="text-sm font-semibold">
                  {provider.provider_name}
                </h3>
              </div>
            </Link>
          ))}
        </section> */}
        <section>
          <h2 className="text-xl font-bold">Ocena</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {tv.vote_average} / 10
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold">Data premiery</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {tv.first_air_date}
          </p>
        </section>
        {/* <section>
          <h2 className="text-xl font-bold">Czas trwania</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {movie.runtime} min
          </p>
        </section> */}
      </section>
      <section className="w-full space-y-8">
        <header>
          <h1 className="text-4xl font-bold">
            {tv.name}{" "}
            <span className="text-2xl font-semibold text-foreground/70">
              ({tv.first_air_date.split("-")[0]})
            </span>
          </h1>
          <p className="mt-1 text-muted-foreground">{tv.tagline}</p>
          <div className="gap-2 flex flex-wrap mt-4">
            {tv.genres.map((genre) => (
              <Badge variant="outline" key={genre.id}>
                {genre.name}
              </Badge>
            ))}
          </div>
          <Button className="mt-4">Zapisz na liście</Button>
        </header>
        <section>
          <h2 className="text-2xl font-bold mt-6">Opis</h2>
          <p className="text-sm text-muted-foreground mt-2">{tv.overview}</p>
        </section>
        <SeasonSection seasons={tv.seasons} />
        {/* <CollectionCard collection={movie.belongs_to_collection} />
        <CastSection cast={movie.credits.cast} /> */}
      </section>
    </div>
  );
};

export default TvPage;
