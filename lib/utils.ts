import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Sizes = typeof sizes;
type SizeType = { [K in keyof Sizes]: Sizes[K][number] };

const sizes = {
  backdrop: ["w300", "w780", "w1280", "original"] as const,
  logo: ["w45", "w92", "w154", "w185", "w300", "w500", "original"] as const,
  poster: ["w92", "w154", "w185", "w342", "w500", "w780", "original"] as const,
  profile: ["w45", "w185", "h632", "original"] as const,
  still: ["w92", "w185", "w300", "original"] as const,
};

export const getImage = <T extends keyof Sizes>(
  path: string,
  type: T,
  size: SizeType[T] = "original"
) => `https://image.tmdb.org/t/p/${size}${path}`;
