import { Movie, ResponseWithPage, Tv } from "@/types";
import React, { Suspense } from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import UniversalCard from "./universal-card";
import { Skeleton } from "./ui/skeleton";

const UniversalFeed = async ({
  heading,
  // items,
  getFn,
}: {
  heading: string;
  // items: Movie[] | Tv[];
  getFn: () => Promise<ResponseWithPage<Movie>>;
}) => {
  const items = await getFn();
  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">{heading}</h1>
      <Suspense fallback={<div>loagind</div>}>
        <Carousel className="w-full">
          <CarouselContent>
            {items.results.map((item) => (
              <CarouselItem key={item.id} className="basis-1/5">
                <UniversalCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Suspense>
    </section>
  );
};

const UniversalFeedSkeleton = () => {
  return (
    <section>
      <Skeleton className="w-1/3 h-9 mb-6"></Skeleton>
      <Carousel className="w-full">
        <CarouselContent>
          {[...Array(5)].map((_, i) => (
            <CarouselItem key={i} className="basis-1/5">
              <Skeleton
                key={i}
                className="aspect-[2/3] w-full rounded-xl"
              ></Skeleton>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export { UniversalFeedSkeleton };
export default UniversalFeed;
