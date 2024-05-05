import AdminHeader from "@/components/navbar/admin-header";
import HeaderMobile from "@/components/navbar/header-mobile";
import AdminSideNav from "@/components/navbar/admin-side-nav";
import AdminPageWrapper from "@/components/navbar/admin-page-wrapper";
import AdminMarginWidthWrapper from "@/components/navbar/admin-margin-width-wrapper";
import { cookies } from "next/headers";
import {
  SIDENAV_ITEMS_ADMIN,
  SIDENAV_ITEMS_SUPER_ADMIN,
} from "@/components/navbar/constants";
import { getAdminType } from "@/server/secure";
const PublicLayout = async ({ children }: { children: React.ReactNode }) => {
  const plaintext = await getAdminType();
  const SideNavItem =
    plaintext === "SuperAdmin"
      ? SIDENAV_ITEMS_SUPER_ADMIN
      : SIDENAV_ITEMS_ADMIN;

  return (
    <div className="flex">
      <AdminSideNav SideNavItem={SideNavItem} />

      <main className="flex-1">
        <AdminMarginWidthWrapper>
          <AdminHeader />
          <HeaderMobile SideNavItem={SideNavItem} className="top-[40px]" />
          <AdminPageWrapper>{children}</AdminPageWrapper>
        </AdminMarginWidthWrapper>
      </main>
    </div>
  );
};

export default PublicLayout;
