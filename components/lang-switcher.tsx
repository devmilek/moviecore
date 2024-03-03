import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { getLocale } from "next-intl/server";
import { Link } from "@/lib/navigation";

const LangSwitcher = async () => {
  const locale = await getLocale();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="uppercase">
          {locale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href="/" locale="pl">
            PL
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/" locale="en">
            EN
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LangSwitcher;
