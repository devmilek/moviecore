import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VoteAverageCard from "@/components/vote-average-card";
import { fetcher } from "@/lib/fetcher";
import { getPoster } from "@/lib/utils";
import { CollectionDetails } from "@/types";
import Image from "next/image";
import React from "react";

interface CollectionPageProps {
  params: {
    id: string;
  };
}

const CollectionPage = async ({ params }: CollectionPageProps) => {
  const collection: CollectionDetails = await fetcher({
    url: `/collection/${params.id}`,
    lang: "pl",
    options: [],
  });
  return (
    <div className="flex space-x-8">
      <section className="w-96 space-y-5">
        <Image
          src={getPoster(collection.poster_path, "w780")}
          alt={collection.name}
          width={300}
          height={450}
          className="rounded-xl w-full"
        />
      </section>
      <section className="w-full space-y-8">
        <header>
          <h1 className="text-4xl font-bold">{collection.name}</h1>
          <Button className="mt-4">Zapisz na liście</Button>
        </header>
        <section>
          <h2 className="text-2xl font-bold mt-6">Opis</h2>
          <p className="text-sm text-muted-foreground mt-2">
            {collection.overview}
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Części</h2>
          <div className="space-y-6">
            {collection.parts.map((part) => (
              <article key={part.id} className="relative w-full">
                <div className="absolute w-full h-full p-8 bg-black/80 flex items-center space-x-4">
                  <Image
                    src={getPoster(part.poster_path, "w780")}
                    alt={part.title}
                    width={300}
                    height={450}
                    className="rounded-lg h-full w-auto aspect-[2/3] object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {part.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-3">
                      {part.overview}
                    </p>
                  </div>
                </div>
                <Image
                  src={getPoster(part.backdrop_path, "w780")}
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
