import { MovieList } from "@/types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "./ui/button";
import { fetcher } from "@/lib/fetcher";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";
import { getImage } from "@/lib/utils";
import { useTranslations } from "next-intl";

const Hero = async () => {
  const t = await getTranslations("Index");
  const nowPlaying: MovieList = await fetcher({
    url: "/movie/now_playing",
    options: [],
  });

  return (
    <div className="">
      <Carousel className="w-full">
        <CarouselContent className="h-[86vh]">
          {nowPlaying.results.map((movie) => (
            <CarouselItem key={movie.id} className="h-full">
              <div className="relative overflow-hidden rounded-xl h-full">
                <div className="absolute py-10 px-20 w-full h-full bg-gradient-to-r from-black/70 flex flex-col justify-center items-start">
                  <div className="max-w-3xl">
                    <h2 className="text-4xl font-bold">{movie.title}</h2>
                    <p className="mt-2 text-white/70 text-md line-clamp-3">
                      {movie.overview}
                    </p>
                    <Button className="mt-6" asChild>
                      <Link href={`/movie/${movie.id}`}>{t("seeMore")}</Link>
                    </Button>
                  </div>
                </div>
                <Image
                  src={getImage(movie.backdrop_path, "backdrop", "w1280")}
                  alt={movie.title}
                  width={1280}
                  height={720}
                  className="w-full object-cover h-full"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
};

export default Hero;
