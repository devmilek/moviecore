import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/navigation";

const MobileNav = async ({ className }: { className?: string }) => {
  const t = await getTranslations("Index");
  const navItems = [
    { name: t("movies"), href: "/movie" },
    { name: t("tvShows"), href: "/tv" },
    { name: t("cast"), href: "/cast" },
  ];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <MenuIcon className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full">
        <nav className="grid gap-4">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className="justify-start"
            >
              <Link key={item.href} href={item.href}>
                {item.name}
              </Link>
            </Button>
          ))}
          <Button variant={"outline"}>{t("signIn")}</Button>
          <Button>{t("createAccount")}</Button>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
