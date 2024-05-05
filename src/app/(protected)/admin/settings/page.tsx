import SettingForm from "@/components/(protected)/setting-form";
import { CookiesSchema } from "@/schemas";
import { decryptSymmetric, getAdminType } from "@/server/secure";
import { getSelfAdmin } from "@/server/utils";
import { cookies } from "next/headers";
import React from "react";

const page = async () => {
  const plaintext = await getAdminType();
  const admin = await getSelfAdmin();
  return <SettingForm admin={admin} adminType={plaintext} />;
};

export default page;
