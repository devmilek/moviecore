import React from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import SearchButton from "./search-button/search-button";
import LangSwitcher from "./lang-switcher";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";

const Navbar = () => {
  const t = useTranslations("Index");
  const navItems = [
    { name: t("movies"), href: "/movie" },
    { name: t("tvShows"), href: "/tv" },
    { name: t("cast"), href: "/cast" },
  ];
  return (
    <header className="fixed w-full z-50 bg-background">
      <div className="container py-3 flex items-center">
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
          <LangSwitcher />
          <Button variant={"ghost"}>{t("signIn")}</Button>
          <Button>{t("createAccount")}</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
