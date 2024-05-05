"use client";
import Link from "next/link";
import { CircleUser, Menu, Package2 } from "lucide-react";
import Image from "next/image";
import { SIDENAV_ITEMS_PUBLIC } from "@/components/navbar/constants";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import HeaderMobile from "@/components/navbar/header-mobile";

const Header = () => {
  const search = usePathname();

  return (
    <div className="sticky top-0 flex w-full flex-col just z-20 bg-background">
      <div className=" border-b px-4 md:px-6  flex justify-center">
        <header className=" flex items-center h-20 w-full gap-4  md:max-w-[1450px]">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <div className="sm:text-nowrap">
              Philippine Chung Hua School Inc.
            </div>
          </Link>

          <div className="flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4 ">
            <div className="ml-auto flex-1 sm:flex-initial" />
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm whitespace-nowrap">
              <Link
                href="/"
                className={clsx("transition-colors hover:text-foreground", {
                  "text-foreground border-b-4 border-custom-blue-button translate-y-0.5 py-7":
                    search === "/",
                  "text-muted-foreground": search !== "/",
                })}
              >
                Home
              </Link>
              <Link
                href="/admission"
                className={clsx("transition-colors hover:text-foreground", {
                  "text-foreground border-b-4 border-custom-blue-button translate-y-0.5 py-7":
                    search === "/admission",
                  "text-muted-foreground": search !== "/admission",
                })}
              >
                Admission
              </Link>
              <Link
                href="#contact"
                className={clsx("transition-colors hover:text-foreground", {
                  "text-foreground border-b-4 border-custom-blue-button translate-y-0.5 py-7":
                    search === "/contact",
                  "text-muted-foreground": search !== "/contact",
                })}
              >
                Contact Us
              </Link>
            </nav>
            <Separator
              orientation="vertical"
              className="h-10 hidden md:block"
            />
            <Link href="/auth/login">
              <Button variant="customButton" className="hidden md:block">
                Admin
              </Button>
            </Link>
            <HeaderMobile
              SideNavItem={SIDENAV_ITEMS_PUBLIC}
              className="top-[30px]"
            />
          </div>
        </header>
      </div>
    </div>
  );
};

export default Header;
