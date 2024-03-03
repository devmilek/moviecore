import { getImage } from "@/lib/utils";
import { Movie } from "@/types";
import moment from "moment";
import Image from "next/image";
import React from "react";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <article className="overflow-hidden rounded-xl aspect-[2/3] relative group cursor-pointer">
      <div className="w-full h-full absolute p-4 flex items-center justify-center bg-black/60 flex-col text-center opacity-0 group-hover:opacity-100 transition-all">
        <h2 className="text-2xl font-bold">{movie.title}</h2>
        <p className="text-foreground/70">
          {moment(movie.release_date).format("LL")}
        </p>
      </div>
      <Image
        src={getImage(movie.poster_path, "poster", "w780")}
        alt={movie.title}
        width={300}
        height={450}
        className="h-full w-full"
      />
    </article>
  );
};

export default MovieCard;
