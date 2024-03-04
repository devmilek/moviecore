import { Badge, badgeVariants } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VoteAverageCard from "@/components/vote-average-card";
import { fetcher } from "@/lib/fetcher";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { CollectionDetails, GenreList, MovieDetails } from "@/types";
import { StarIcon } from "lucide-react";
import moment from "moment";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

interface CollectionPageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = async ({
  params,
}: CollectionPageProps): Promise<Metadata> => {
  const collection: CollectionDetails = await fetcher({
    url: `/collection/${params.id}`,
    options: [],
  });
  return {
    title: collection.name,
    description: collection.overview,
    keywords: collection.parts.map((part) => part.title).join(", "),
    openGraph: {
      title: collection.name,
      description: collection.overview,
      type: "video.other",
      images: [
        {
          url: getImage(collection.backdrop_path, "backdrop", "w780"),
          width: 500,
          height: 750,
          alt: collection.name,
        },
      ],
    },
  };
};

const CollectionPage = async ({ params }: CollectionPageProps) => {
  const collection: CollectionDetails = await fetcher({
    url: `/collection/${params.id}`,
    options: [],
  });

  const genres: GenreList = await fetcher({
    url: "/genre/movie/list",
    options: [],
  });

  const collectionGenres = genres.genres.filter((genre) =>
    collection.parts.some((part) => part.genre_ids.includes(genre.id))
  );

  return (
    <div className="flex space-x-8">
      <section className="w-96 space-y-5">
        <Image
          src={getImage(collection.poster_path, "poster", "w780")}
          alt={collection.name}
          width={300}
          height={450}
          className="rounded-xl w-full"
        />
      </section>
      <section className="w-full space-y-8">
        <header>
          <h1 className="text-4xl font-bold">{collection.name}</h1>
          <div className="gap-2 flex flex-wrap mt-4">
            {collectionGenres.map((genre) => (
              <Link
                key={genre.id}
                className={badgeVariants({ variant: "outline" })}
                href={`/movie/genre/${genre.id}`}
              >
                {genre.name}
              </Link>
            ))}
          </div>
        </header>
        {collection.overview && (
          <section>
            <h2 className="text-2xl font-bold mt-6">Opis</h2>
            <p className="text-sm text-muted-foreground mt-2">
              {collection.overview}
            </p>
          </section>
        )}
        <section>
          <h2 className="text-2xl font-bold mb-4">
            Części ({collection.parts.length})
          </h2>
          <div className="space-y-6">
            {collection.parts.map((part) => (
              <article key={part.id} className="relative w-full">
                <div className="absolute w-full h-full p-8 bg-black/80 flex items-center space-x-4">
                  <Image
                    src={getImage(part.poster_path, "poster", "w780")}
                    alt={part.title}
                    width={300}
                    height={450}
                    className="rounded-lg h-full w-auto aspect-[2/3] object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {part.title}
                    </h3>
                    <div className="flex space-x-2">
                      <Badge variant="secondary">
                        <StarIcon className="h-3 w-3 mr-2" />{" "}
                        {part.vote_average.toPrecision(2)}
                      </Badge>
                      <Badge variant="outline">
                        {moment(part.release_date).format("LL")}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mt-3">
                      {part.overview}
                    </p>
                  </div>
                </div>
                <Image
                  src={getImage(part.backdrop_path, "backdrop", "w780")}
                  alt={part.title}
                  width={300}
                  height={450}
                  className="rounded-xl w-full h-96 object-cover"
                />
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default CollectionPage;
