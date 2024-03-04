import { Movie, Tv } from "@/types";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import UniversalCard from "./universal-card";

const UniversalFeed = ({
  heading,
  items,
}: {
  heading: string;
  items: Movie[] | Tv[];
}) => {
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">{heading}</h1>
      <Carousel className="w-full">
        <CarouselContent>
          {items.slice(0, 8).map((item) => (
            <CarouselItem key={item.id} className="basis-1/5">
              <UniversalCard item={item} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default UniversalFeed;
