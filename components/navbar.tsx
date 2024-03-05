import React from "react";
import { Button } from "./ui/button";
import { SearchIcon } from "lucide-react";
import SearchButton from "./search-button/search-button";
import LangSwitcher from "./lang-switcher";
import { Link } from "@/lib/navigation";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import MobileNav from "./mobile-nav";

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
        <nav className="space-x-4 ml-8 hidden lg:block">
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
        <div className="space-x-3 flex ml-auto">
          <SearchButton />
          <LangSwitcher />
          <MobileNav className="lg:hidden" />
          <div className="space-x-4 hidden lg:inline-flex">
            <Button variant={"ghost"}>{t("signIn")}</Button>
            <Button>{t("createAccount")}</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
