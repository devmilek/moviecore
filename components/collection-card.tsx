import { Collection } from "@/types";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import { getImage } from "@/lib/utils";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";

const CollectionCard = async ({
  collection,
}: {
  collection: Collection | null;
}) => {
  const t = await getTranslations("Index");
  if (!collection) {
    return null;
  }
  return (
    <section className="relative rounded-xl overflow-hidden h-96">
      <div className="absolute w-full h-full p-10 flex flex-col justify-center items-start bg-gradient-to-r from-black/60 to-black/0">
        <h2 className="text-2xl font-bold text-white">{collection.name}</h2>
        <p>{t("seeAllCollectionEpisodes")}</p>
        <Button variant="secondary" className="mt-4" asChild>
          <Link href={`/collection/${collection.id}`}>{t("seeMore")}</Link>
        </Button>
      </div>
      <Image
        src={getImage(collection.backdrop_path, "backdrop", "w780")}
        alt={collection.name}
        width={300}
        height={450}
        className="w-full h-full object-cover"
      />
    </section>
  );
};

export default CollectionCard;
