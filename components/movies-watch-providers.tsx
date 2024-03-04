import { fetcher } from "@/lib/fetcher";
import { getImage } from "@/lib/utils";
import { AvailableWatchProviders } from "@/types";
import { PlusIcon } from "lucide-react";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import React from "react";

const MoviesWatchProvider = async () => {
  const locale = await getLocale();
  const watchProviders: AvailableWatchProviders = await fetcher({
    url: "/watch/providers/movie",
    options: [`watch_region=${locale}`],
  });

  const sortedProviders = watchProviders.results.sort(
    (a, b) => a.display_priority - b.display_priority
  );

  const MAX_PROVIDERS = 25;

  return (
    <section>
      <h1 className="text-3xl font-bold mb-4">Serwisy streamingowe</h1>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-[15] gap-4">
        {sortedProviders.slice(0, MAX_PROVIDERS).map((provider) => (
          <div key={provider.provider_id}>
            <Image
              src={getImage(provider.logo_path, "logo", "w300")}
              alt={provider.provider_name}
              width={300}
              height={300}
              className="aspect-square w-full rounded-lg"
            />
          </div>
        ))}
        <div className="aspect-square w-full rounded-lg bg-foreground/5 border flex items-center justify-center font-semibold">
          + {sortedProviders.length - MAX_PROVIDERS}
        </div>
      </div>
    </section>
  );
};

export default MoviesWatchProvider;
