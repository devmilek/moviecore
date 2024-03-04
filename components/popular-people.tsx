import { fetcher } from "@/lib/fetcher";
import { Cast, ResponseWithPage } from "@/types";
import React from "react";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import Image from "next/image";
import { getImage } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Link } from "@/lib/navigation";

const PopularPeople = async () => {
  const popularPeople: ResponseWithPage<Cast> = await fetcher({
    url: "/person/popular",
    options: [],
  });

  const peopleWithImages = popularPeople.results.filter(
    (person) => person.profile_path
  );

  const departmentMap = {
    acting: "Aktor",
  };

  return (
    <section>
      <h1 className="text-3xl font-bold mb-6">Popularne osoby</h1>
      <Carousel
        opts={{
          dragFree: true,
        }}
      >
        <CarouselContent>
          {peopleWithImages.map((person) => (
            <CarouselItem key={person.id} className="basis-[14%]">
              <Link href={`/people/${person.id}`} className="block">
                <Image
                  src={getImage(person.profile_path, "profile", "h632")}
                  alt={person.name}
                  width={300}
                  height={450}
                  className="rounded-xl w-60"
                />
                <h2 className="font-bold mt-4">{person.name}</h2>
                <p className="text-xs text-muted-foreground">
                  Znany/a z{" "}
                  <span className="text-foreground font-medium">
                    {departmentMap[
                      person.known_for_department.toLocaleLowerCase() as keyof typeof departmentMap
                    ] || "nieznane"}
                  </span>
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default PopularPeople;
