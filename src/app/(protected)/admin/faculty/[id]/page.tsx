import SettingForm from "@/components/(protected)/setting-form";
import { getAdminType } from "@/server/secure";
import { getAdminById } from "@/server/utils";
import React from "react";

const page = async ({ params }: { params: { id: string } }) => {
  const plaintext = await getAdminType();

  const admin = await getAdminById(params.id);
  return <SettingForm admin={admin} adminType={plaintext} />;
};

export default page;
