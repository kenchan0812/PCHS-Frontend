"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import Image from "next/image";

import useScroll from "@/components/navbar/hooks/use-scroll";

import { cn } from "@/lib/utils";
import { HeaderPagePros } from "@/components/navbar/types";
const AdminHeader = () => {
  const scrolled = useScroll(5);
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
  return (
    <div
      className={cn(
        `sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200`,
        {
          "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
          "border-b border-gray-200 bg-white": segment,
        }
      )}
    >
      <div className="flex h-[100px] items-center ml-16 px-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/admin/dashboard"
            className="flex flex-row space-x-3 items-center justify-center md:hidden"
          >
            <Image src={"/logo.png"} alt="logo" width={40} height={40} />
            <div className="sm:text-nowrap">Philippine Chung Hua School</div>
          </Link>
        </div>
        <div className="hidden md:block">
          <span className=" font-medium text-4xl">{PageList[pathname]}</span>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;

const PageList: HeaderPagePros = {
  "/admin/dashboard": "Overview",
  "/admin/student-list/enrolled": "Enrolled Students List",
  "/admin/student-list/enrollee": "Enrollee List",
  "/admin/faculty": "Faculty List",
  "/admin/account": "Account Settings",
  "/admin/register": "Create Account",
};
