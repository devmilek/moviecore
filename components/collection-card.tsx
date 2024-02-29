import { getPoster } from "@/lib/utils";
import { Collection } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const CollectionCard = ({ collection }: { collection: Collection | null }) => {
  if (!collection) {
    return null;
  }
  return (
    <section className="relative rounded-xl overflow-hidden h-96">
      <div className="absolute w-full h-full p-10 flex flex-col justify-center items-start bg-gradient-to-r from-black/60 to-black/0">
        <h2 className="text-2xl font-bold text-white">{collection.name}</h2>
        <p>Zobacz wszystkie części serii</p>
        <Button variant="secondary" className="mt-4">
          Zobacz więcej
        </Button>
      </div>
      <Image
        src={getPoster(collection.backdrop_path, "w780")}
        alt={collection.name}
        width={300}
        height={450}
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default CollectionCard;