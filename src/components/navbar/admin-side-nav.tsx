"use client";

import React, { useState, useTransition } from "react";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { SideNavItem } from "./types";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoutAction } from "@/server/action";
import { toast } from "@/components/ui/use-toast";

const AdminSideNav = ({ SideNavItem }: { SideNavItem: SideNavItem[] }) => {
  const [error, setError] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = async () => {
    setError("");
    //server side
    startTransition(async () => {
      LogoutAction().then((data) => {
        setError(data.error);
        if (!data.error) {
          toast({
            description: data.success,
          });
          router.refresh();
        } else {
          toast({
            description: data.error,
          });
        }
      });
    });
  };
  return (
    <div className="md:w-80 bg-white h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-20 w-full h-full">
        <Link
          href="/admin/dashboard"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 w-full h-[101px]"
        >
          <Image src={"/logo.png"} alt="logo" width={40} height={40} />
          <div className="sm:text-nowrap">Philippine Chung Hua School</div>
        </Link>
        <div className="flex flex-col space-y-10  md:px-6">
          {SideNavItem.map((item, idx) => {
            return <MenuItem key={idx} item={item} />;
          })}
        </div>
        <div className="flex flex-col md:px-6 pt-56 ">
          <Button
            onClick={onSubmit}
            loading={isPending}
            variant="customDestructive"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              {item.icon}
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          {item.icon}
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
