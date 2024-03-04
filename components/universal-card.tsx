import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { Movie, Tv } from "@/types";
import moment from "moment";
import Image from "next/image";
import React from "react";

const UniversalCard = ({ item }: { item: Movie | Tv }) => {
  const isMovie = "title" in item;
  return (
    <Link
      href={isMovie ? `/movie/${item.id}` : `/tv/${item.id}`}
      className="overflow-hidden rounded-xl aspect-[2/3] relative group cursor-pointer block"
    >
      <div className="w-full h-full absolute p-4 flex items-center justify-center bg-black/60 flex-col text-center opacity-0 group-hover:opacity-100 transition-all">
        <h2 className="text-2xl font-bold">
          {isMovie ? (item as Movie).title : (item as Tv).name}
        </h2>
        <p className="text-foreground/70">
          {moment(
            isMovie ? (item as Movie).release_date : (item as Tv).first_air_date
          ).format("LL")}
        </p>
      </div>
      <Image
        src={getImage(item.poster_path, "poster", "w780")}
        alt={isMovie ? (item as Movie).title : (item as Tv).name}
        width={300}
        height={450}
        className="h-full w-full"
      />
    </Link>
  );
};

export default UniversalCard;
