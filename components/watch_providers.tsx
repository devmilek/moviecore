import { getImage } from "@/lib/utils";
import { CountryProviders } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const WatchProviders = ({
  watchProviders,
}: {
  watchProviders: CountryProviders;
}) => {
  if (!watchProviders.PL) return null;
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold">Dostępne platformy</h2>
      {watchProviders.PL?.flatrate?.map((provider) => (
        <Link
          href={watchProviders.PL.link}
          target="_blank"
          rel="noreferrer"
          key={provider.provider_id}
          className="flex space-x-4 p-2 rounded-xl bg-white/5"
        >
          <Image
            src={getImage(provider.logo_path, "logo", "w92")}
            alt={provider.provider_name}
            width={50}
            height={50}
            className="rounded-xl"
          />
          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground">Oglądaj teraz</p>
            <h3 className="text-sm font-semibold">{provider.provider_name}</h3>
          </div>
        </Link>
      ))}
    </section>
  );
};

export default WatchProviders;
