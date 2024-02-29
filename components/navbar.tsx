import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import SearchButton from "./search-button";

const Navbar = () => {
  const navItems = [
    { name: "Filmy", href: "/movies" },
    { name: "Seriale", href: "/series" },
    { name: "Obsada", href: "/cast" },
  ];
  return (
    <header className="fixed w-full z-50">
      <div className="container py-3 flex items-center bg-background">
        <Link href="/" className="text-xl font-bold">
          Moviecore
        </Link>
        <nav className="space-x-4 ml-8">
          {navItems.map((item) => (
            <Link
              className="text-white/80 text-sm hover:text-white/100 transition-colors"
              key={item.href}
              href={item.href}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="space-x-4 flex ml-auto">
          <SearchButton />
          <Button variant={"ghost"}>Zaloguj się</Button>
          <Button>Utwórz konto</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
