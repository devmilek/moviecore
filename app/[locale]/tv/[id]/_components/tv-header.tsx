import TrailerButton from "@/components/trailer-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { MovieDetails, TvDetails } from "@/types";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const TvHeader = async ({ tv }: { tv: TvDetails }) => {
  const locale = await getLocale();
  const localeVideo = tv.videos.results.find(
    (tv) => tv.iso_639_1.toLocaleLowerCase() === locale
  );
  return (
    <>
      <header>
        <div className="flex flex-col xs:flex-row xs:space-x-4 md:space-x-0">
          <Image
            src={getImage(tv.poster_path, "poster", "w500")}
            alt={tv.name}
            width={300}
            height={450}
            className="rounded-xl w-full xs:w-32 aspect-[2/3] flex-shrink-0 object-cover md:hidden mb-8 xs:mb-0"
          />
          <div className="w-full">
            <h1 className="text-4xl font-bold">
              {tv.name}{" "}
              <span className="text-2xl font-semibold text-foreground/70">
                ({tv.first_air_date.split("-")[0]})
              </span>
            </h1>
            {tv.tagline && (
              <p className="text-muted-foreground sm:text-lg mt-2">
                {tv.tagline}
              </p>
            )}
            <div className="gap-2 flex flex-wrap mt-4">
              {tv.genres.map((genre) => (
                <Badge variant="outline" key={genre.id}>
                  <Link href={`/movie/genre/${genre.id}`}>{genre.name}</Link>
                </Badge>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button>Zapisz na liście</Button>
              {localeVideo && <TrailerButton video={localeVideo} />}
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold mt-6">Opis</h2>
          <p className="text-sm text-muted-foreground mt-2">{tv.overview}</p>
        </div>
      </header>
    </>
  );
};

export default TvHeader;
