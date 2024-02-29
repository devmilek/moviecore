import Hero from "@/components/hero";
import TrendingToday from "@/components/trending-today";
import Image from "next/image";

export default function Home() {
  return (
    <main className="space-y-12">
      <Hero />
      <TrendingToday />
    </main>
  );
}
