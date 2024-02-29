import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPoster = (
  path: string,
  size: "w300" | "w780" | "w1280" | "original" = "w300"
) => `https://image.tmdb.org/t/p/${size}${path}`;
