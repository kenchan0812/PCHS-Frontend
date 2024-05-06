import { SideNavItem } from "@/components/navbar/types";
import {
  AppWindow,
  BookUser,
  FileSliders,
  Home,
  Mail,
  Settings,
  SquareUserRound,
} from "lucide-react";

function YearRange() {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  const formattedString = `${currentYear}-${nextYear}`;

  return formattedString;
}

const generateSideNavItems = (isAdmin: boolean) => [
  {
    title: "Dashboard",
    path: `/admin/dashboard?year=${YearRange()}`,
    icon: <Home />,
  },
  {
    title: "Student List",
    path: "/admin/student-list",
    icon: <BookUser />,
    submenu: true,
    subMenuItems: [
      {
        title: "Enrolled",
        path: `/admin/student-list/enrolled?year=${YearRange()}`,
      },
      {
        title: "Enrollee",
        path: `/admin/student-list/enrollee?year=${YearRange()}`,
      },
    ],
  },
  {
    title: "Faculty",
    path: "/admin/faculty",
    icon: <FileSliders />,
  },
  ...(isAdmin
    ? [
        {
          title: "Settings",
          path: "/admin/settings",
          icon: <Settings />,
        },
      ]
    : [
        {
          title: "Settings",
          path: "/admin/settings/super",
          icon: <Settings />,
        },
      ]),
];

export const SIDENAV_ITEMS_ADMIN = generateSideNavItems(true);
export const SIDENAV_ITEMS_SUPER_ADMIN = generateSideNavItems(false);

export const SIDENAV_ITEMS_PUBLIC: SideNavItem[] = [
  {
    title: "Home",
    path: "/",
    icon: <Home />,
  },
  {
    title: "Admission",
    path: "/admission",
    icon: <AppWindow />,
  },
  {
    title: "Contact",
    path: "#contact",
    icon: <Mail />,
  },
];
